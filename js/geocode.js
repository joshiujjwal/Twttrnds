/* function someFunction(addresses,resultsMap, callback) {
    var coords = [];
    for(var i = 0; i < addresses.length; i++) {
        currAddress = addresses[i];
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
		console.log(currAddress + 'currAddress');
            geocoder.geocode({'address':currAddress}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    coords.push(results[0].geometry.location);
					var marker = new google.maps.Marker({
					map: resultsMap,
					position: results[0].geometry.location
				  });
                    if(coords.length == addresses.length) {
                        if( typeof callback == 'function' ) {
                            callback();
                        }
                    }
                } 
                else {
                    throw('No results found: ' + status);
                }
            });
        }
     }
  }

function initMap() {
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 3,
    center: {lat: 0, lng: 0}
  });
  var geocoder = new google.maps.Geocoder();

	var arr_map = $_GET['arr_map'];
	console.log(arr_map);
	someFunction(arr_map,map);
}
google.maps.event.addDomListener(window, "load", initMap);

$(function() {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCd1l-gzuzKLA1LGAa-MDDYVV7TLGTLYsE&signed_in=true&callback=initMap";
    document.body.appendChild(script);
}); */




$(document).ready(function () {
    var map;
    var elevator;
    var myOptions = {
        zoom: 1,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: 'terrain'
    };
    map = new google.maps.Map($('#map_canvas')[0], myOptions);

    var addresses = ['Norway', 'Africa', 'Asia','North America','South America'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
            var p = data.results[0].geometry.location
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            new google.maps.Marker({
                position: latlng,
                map: map
            });

        });
    }

});
