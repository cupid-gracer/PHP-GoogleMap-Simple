function MapView() {
    var geocoder = new google.maps.Geocoder();
    const img_point = 'https://www.postoffice.co.uk/.resources/pol-module-main/img/branch-finder/mylocation.png';
    const img_marker = 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/128/Map-Marker-Marker-Outside-Pink-icon.png';
    var bounds = new google.maps.LatLngBounds();
    var currentInfoWindow;
    var map;
    var latlng = new google.maps.LatLng(52.2654532, 2.6694238);
    var myOptions = {
        zoom: 8,
        center: latlng,
        styles: [{
            "featureType": "poi",
            "stylers": [
                { "visibility": "off" }
            ]
        }]
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    let postcode = $("#postcode").val();

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
        geocoder.geocode({
            address: postcode,
        }, function(result, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (status == 'OK' && result.length > 0) {
                    const marker = new google.maps.Marker({ map: map, icon: img_point });
                    map.setCenter(result[0].geometry.location);
                    marker.setPlace({
                        placeId: result[0].place_id,
                        location: result[0].geometry.location,
                    });
                    marker.setVisible(true)
                }
            }
        });
    });

    let counter = 0;

    cinemas.forEach(cinema => {
        const idx = ++counter;
        if (!isMore) {
            if (idx > 5) return;
        }
        var _postcode = cinema.postcode;
        google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
            geocoder.geocode({
                address: _postcode,
            }, function(result, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status == 'OK' && result.length > 0) {
                        var contentString = `<div class="row" style="width:180px; height:100px; text-align:left;">
                                            <div style="font-size: 1.1em;font-weight: bold;">${cinema.cinema}</div>
                                            <div>${ cinema.address1 + ", " + cinema.address2 }</div>
                                            <div>${cinema.postcode}</div>
                                            <div style="color:#e90006">${cinema.distance.toFixed(2)}km</div>
                                            </div>
                                            `;
                        const infowindow = new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 400,
                        });

                        const marker = new google.maps.Marker({
                            map: map,
                            icon: {
                                url: img_marker,
                                scaledSize: {
                                    width: 45,
                                    height: 55
                                }
                            },
                            label: {
                                className: 'marker',
                                text: idx.toString(),
                                color: "white",
                                fontSize: '1.2em',
                                fontWeight: 'bold'
                            },
                            position: new google.maps.LatLng(result[0].geometry.location.lat(), result[0].geometry.location.lng())
                        });

                        bounds.extend(marker.position);
                        map.fitBounds(bounds);

                        marker.addListener("click", () => {
                            if (currentInfoWindow != null) {
                                currentInfoWindow.close();
                            }

                            currentInfoWindow = infowindow;
                            infowindow.open({
                                anchor: marker,
                                map,
                                shouldFocus: true,
                            });
                        });

                        marker.setPlace({
                            placeId: result[0].place_id,
                            location: result[0].geometry.location,
                        });
                        marker.setVisible(true)
                    }
                }
            });
        });
    });

}

