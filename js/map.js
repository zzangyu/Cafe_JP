function fetchPage(lngs, lats){
    $.ajax({
  	url: 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=79eb47654869941a&keyword=cafe&count=100&format=jsonp&range=5&lng='+lngs+'&lat='+lats,
  	type: 'GET',
  	dataType: 'jsonp',
	}).done(function(data) {
		var data = data;
		var result = data.results;
		var shop = result.shop;
		var name = shop.map(function(element){
  			return `${element.name}`;
		})
		var wifi = shop.map(function(element){
  			return `${element.wifi}`;
		})
		var lat = shop.map(function(element){ // 위도
  			return `${element.lat}`;
		})
		var lng = shop.map(function(element){ // 경도
  			return `${element.lng}`;
		})
		var urls = shop.map(function(element){
  			return `${element.urls.pc}`;
		})
		var i = 0;
		var tags = "";
		while(i < name.length) {			
			// tags = tags + '<div>'+name[i]+','+wifi[i]+'</div>';
			i = i + 1;
		}
		// document.querySelector('#cafe_list').innerHTML = tags;
		
		mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuY2hhbmd5dSIsImEiOiJjbDZmb3h4d2Iwa2VnM2pvcjh3ZWI0c3h5In0.3sdZR_Tj6t5ZHWJgOinBdQ';
		// 맵 다시 로드
		
		const map = new mapboxgl.Map({
			container: 'map', // container ID
		    style: 'mapbox://styles/hanchangyu/cl6g6vdi3000215nwl6y2wchb', // style URL
		    center: [lngs, lats], // starting position [lng, lat]
		    zoom: 14.5 // starting zoom
		})
		var j = 0;
		while(j < lng.length){
		const geojson  = {
			'features': [
				{
					'type': 'Feature',
					'geometry': {
						'type': 'Point',
						'coordinates': [lng[j], lat[j]]
					},
					'properties': {
					'title': name[j],
					'description': 'Washington, D.C.'
					},
				},
			]
		}
		for (const feature of geojson.features) {
			// create a HTML element for each feature
			const el = document.createElement('div');
			el.className = 'marker';
			new mapboxgl.Marker(el)
				.setLngLat(feature.geometry.coordinates)
				.setPopup(
				new mapboxgl.Popup({ offset: 25 }) // add popups
					.setHTML(
					`<h3>${feature.properties.title}</h3><a href="${urls[j]}" target="#">HomePage</a>`
					)
				)
			.addTo(map);
			}
			j = j + 1;
		}
		map.on('dragend', () => {
			const center = map.getCenter();
			document.querySelector('#kokode_bt').innerHTML = '<div onclick="fetchPage('+center.lng+', '+center.lat+')">ここを探そう</div>'
		});
			
	}).fail(function() {
		console.log('fail')
	});
}