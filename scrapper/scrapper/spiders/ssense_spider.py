import scrapy


class SsenseSpider(scrapy.Spider):
    name = "ssense"
    start_urls = [
        'https://www.ssense.com/en-us/men/designers/acne-studios',
        'https://www.ssense.com/en-us/men/designers/acne-studios?page=2',
        'https://www.ssense.com/en-us/men/designers/acne-studios?page=3',
    ]

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