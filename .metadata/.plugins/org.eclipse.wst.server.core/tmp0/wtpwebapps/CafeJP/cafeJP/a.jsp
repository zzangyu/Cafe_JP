<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>cafe in japan</title>
<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js"></script>	
<script type="text/javascript" src="js/map.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/map.css"/>
<link rel="shortcut icon" href="#">

</head>
<body>
	<div id="map"></div>
	<div style="width: 100px; height: 100px; background-color: red;" onclick="fetchPage()"></div>
	<script type="text/javascript">
		mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuY2hhbmd5dSIsImEiOiJjbDZmb3h4d2Iwa2VnM2pvcjh3ZWI0c3h5In0.3sdZR_Tj6t5ZHWJgOinBdQ'; // 계정에 있는 Public Access Token 입력

		const map = new mapboxgl.Map({
			container: 'map', // container ID
		    style: 'mapbox://styles/mapbox/streets-v11', // style URL
		    center: [139.7, 35.7], // starting position [lng, lat]
		    zoom: 12 // starting zoom
		});
	</script>
</body>
</html>