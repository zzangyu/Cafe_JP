function fetchPage(lngs, lats){
    $.ajax({
  	url: 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=79eb47654869941a&keyword=cafe&type=special&count=100&format=jsonp&range=3&lng='+lngs+'&lat='+lats,
  	type: 'GET',
  	dataType: 'jsonp',
	}).done(function(data) {
		var data = data;
		var result = data.results;
		var shop = result.shop;
		var name = shop.map(function(element){
  			return `${element.name}`;
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
		var photo = shop.map(function(element){
			return `${element.photo.pc.l}`;
	 	})
		var logo_image = shop.map(function(element){
			return `${element.logo_image}`;
	 	})
		var midnight = shop.map(function(element){
			return `${element.midnight}`;
	 	})
		var wifi = shop.map(function(element){
  			return `${element.wifi}`;
		})
		var access = shop.map(function(element){
  			return `${element.access}`;
		})
		var open = shop.map(function(element){
  			return `${element.open}`;
		})
		var close = shop.map(function(element){
  			return `${element.close}`;
		})
		var private_room = shop.map(function(element){
  			return `${element.private_room}`;
		})
		var card = shop.map(function(element){
  			return `${element.card}`;
		})
		var smoking = shop.map(function(element){
  			return `${element.non_smoking}`;
		})
		var parking = shop.map(function(element){
  			return `${element.parking}`;
		})
		var pet = shop.map(function(element){
  			return `${element.pet}`;
		})
		var coupon = shop.map(function(element){
  			return `${element.coupon_urls.pc}`;
		})
		var sp = shop.map(function(element){
  			return `${element.catch}`;
		})
		console.log(sp)

		var logo_none = 'https://imgfp.hotp.jp/SYS/cmn/images/common/diary/custom/m30_img_noimage.gif';
		var check = true;
		if(name[0] === undefined) {
			check = false;
		}
		var i = 0;
		var tags = "";
		if(check) {
			while(i < name.length) {
				if(logo_image[i] == logo_none) {
					logo_image[i] = '../img/none.jpeg';
				}
				tags = tags + '<div class="cafe_slide"><div><img src="'+logo_image[i]+'"><h3 class="cafe_name" onclick="openModal('+i+')">'+name[i]+'</h3></div></div>'
				+'<div class="modal" id="'+i+'"><div class="modal_body">'
				+'<div class="modal_title"><div>'+name[i]+'</div><button class="exit_bt" onclick="exitModal('+i+')">X</button></div>'
				+'<div class="modal_title_under"><div class="modal_info_wrap"><div class="modal_img"><img src="'+photo[i]+'"></div>'
				+'</div>'
				+'<div class="modal_info">'
				+'<div class="modal_info_n_a"><div class="modal_info_name">✔ Access</div><div class="modal_info_answer">'+access[i]+'</div></div>'
				+'<div class="modal_info_n_a"><div class="modal_info_name">✔ Open</div><div class="modal_info_answer">'+open[i]+'</div></div>'
				+'<div class="modal_info_n_a"><div class="modal_info_name">✔ Close</div><div class="modal_info_answer">'+close[i]+'</div></div>'
				+'<div class="modal_info_n_a"><div class="modal_info_name">✔ Wifi</div><div class="modal_info_answer">'+wifi[i]+'</div></div>'
				+'<div class="modal_info_n_a"><div class="modal_info_name">✔ Card</div><div class="modal_info_answer">'+card[i]+'</div></div>'
				+'<div class="modal_info_n_a"><div class="modal_info_name">✔ Parking</div><div class="modal_info_answer">'+parking[i]+'</div></div>'
				+'<div class="modal_info_n_a"><div class="modal_info_name">✔ Coupon</div><div class="modal_info_answer"><a href="'+coupon[i]+'">クリックしてダウンロードする</a></div></div>'
				+'<div class="modal_info_n_a"><div class="modal_info_name">✔ Hotpepper</div><div class="modal_info_answer"><a href="'+urls[i]+'">クリックして移動する</a></div></div>'
				+'</div>'
				+'</div></div></div>';
				i = i + 1;
			}
		} else {
			tags = '<div id="misenai"><img src="../img/uu.jpg"><h3>この辺には店がありません。</h3></div>';
			document.querySelector('.cafe_slide_wrap').style.height = '100%';
		}
		document.querySelector('.cafe_slide_wrap').innerHTML = tags;

		  // 맵 다시 로드
		mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuY2hhbmd5dSIsImEiOiJjbDZmb3h4d2Iwa2VnM2pvcjh3ZWI0c3h5In0.3sdZR_Tj6t5ZHWJgOinBdQ';
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
					`<h3>${feature.properties.title}</h3>`
					)
				)
			.addTo(map);
			}
			j = j + 1;
		}
		map.on('dragend', () => {
			const center = map.getCenter();
			var center_lat = center.lat; 
			var center_lng = center.lng; 
			fetchPage(center_lng, center_lat);
		});
			
	}).fail(function() {
		console.log('fail')
	});
}
// modal
function openModal(index) {
	var modal = index;
	var mo = '#'+modal;
	$(mo).css('display','flex').hide().fadeIn();
}
function exitModal(index) {
	var modal = index;
	var mo = '#'+modal;
	$(mo).fadeOut();
}