import scrapy


class SsenseSpider(scrapy.Spider):
    name = "ssense"
    start_urls = None
    # start_urls = [
    #     'https://www.ssense.com/en-us/men/designers/apc',
    # ]

    def __init__(self, *args, **kwargs): 
      super(SsenseSpider, self).__init__(*args, **kwargs) 

      self.start_urls = [kwargs.get('start_url')] 

    def parse(self, response):
        # #page = response.url.split("/")[-2]
        # filename = 'ssense.html'
        # with open(filename, 'wb') as f:
        #     f.write(response.body)
        # self.log('Saved file %s' % filename)
        for product in response.css('figure.browsing-product-item'):
            yield {
                'brand': product.css('p.bold::text').extract_first(),
                'item': product.css('p.hidden-smartphone-landscape::text').extract_first(),
                'price': product.css('span.price::text').extract_first(),
            }

        next_page = response.xpath("//link[@rel='next']/@href")[0].extract()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)