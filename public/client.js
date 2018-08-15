//client side code 

console.log("client side running");
const button = document.getElementById('myButton');
const valueBar1 = document.getElementById('myTextField');
const valueBar2 = document.getElementById('myTextField2');
const valueBar3 = document.getElementById('myTextField3');
const valueBar4 = document.getElementById('myTextField4');

button.addEventListener('click', function(e) {
    var data = {
        'item_name': valueBar1.value,
        'brand': valueBar2.value,
        'sales': valueBar3.value,
        'websites': valueBar4.value
    };

    var json = JSON.stringify(data);
    console.log(json);

	fetch('/clicked', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: json // body data type must match "Content-Type" header
	})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        //console.log(response.json());
        //var parsedJson = JSON.parse(response.json());
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});