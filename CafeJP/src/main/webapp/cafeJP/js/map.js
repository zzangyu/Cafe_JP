function fetchPage(){
    $.ajax({
  	url: 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=79eb47654869941a&keyword=cafe&large_area=Z011&count=100&format=jsonp',
  	type: 'GET',
  	dataType: 'jsonp',
  	jsonpCallback: 'callback',
	}).done(function(data) {
		var data = data;
		var result = data.results
		var shop = result.shop
		let name = shop.map(function(element){
  			return `${element.name} ${element.wifi}`;
		})
		console.log(name)
	}).fail(function() {
		console.log('fail')
	});
}
// url: 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=79eb47654869941a&keyword=cafe&large_area=Z011&format=jsonp',