/**
 * Get your position and execute the main code
 */
function geoFindMe() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, geo_options);
    } else {
        alert("Geolocation services are not supported by your web browser.");
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var altitude = position.coords.altitude;
        var accuracy = position.coords.accuracy;

        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude;
        callAjax(url, false, function (data) {
            var adr = JSON.parse(data);
            document.querySelector("#addr").innerHTML = adr.results[0].formatted_address;
            var arret = getClosest(latitude, longitude);
            document.querySelector("#arret").innerHTML = arret.nom;

            //Adress Google only, doesn't open any app on any device
            // document.querySelector("#maps").href = "https://google.com/maps/dir/"+latitude +","+longitude+"/" + arret.latitude + "," + arret.longitude+"/@"+latitude+","+longitude+"/data=4m2!4m1!3e2";

            //Adress for all (Apple redirect the link on google if it's not IOS)
            document.querySelector("#maps").href = "http://maps.apple.com/?saddr=48.6877703,6.1801504&daddr=48.689175,6.177648&directionsmode=walking";

            //Adress for IOS only
            // document.querySelector("#maps").href = "maps://?saddr="+latitude +","+longitude+"&daddr=" + arret.latitude + "," + arret.longitude+"&directionsmode=walking";
            

            document.querySelector("#dist").innerHTML = " à " + arret.dist.toFixed(2) + " km";

            callAjax("./parseHours.php?&arret=" + arret.nom, true, function (data) {

                var passages = JSON.parse(data);
                var pasE = document.querySelector("#passagesE");
                var pasV = document.querySelector("#passagesV");
                for (var h in passages.Essey) {
                    var coupe = passages.Essey[h].indexOf("direction");
                    if(coupe != -1)
                        pasE.innerHTML += "- "+passages.Essey[h].substr(0,coupe-2) + "</br>";
                }

                for (var h in passages.Vandoeuvre) {
                    var coupe = passages.Essey[h].indexOf("direction");
                    if(coupe != -1)
                        pasV.innerHTML += "- "+passages.Vandoeuvre[h].substr(0,coupe-2) + "</br>";
                }

                for (var i = document.getElementsByClassName("loading").length - 1; i >= 0; i--) {
                    document.getElementsByClassName("loading")[i].style.display = "none";
                }
            });
        });
    }

    function error(error) {
        alert("Unable to retrieve your location due to " + error.code + " : " + error.message);
    };

    var geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };
}

/**
 * Return the closest tram station
 * @param latitude "Your latitude"
 * @param longitude "Your longitude"
 * @return {arret}
 */
function getClosest(latitude, longitude) {
    var request = new XMLHttpRequest();
    request.open("GET", "./arrets.json", false);
    request.send(null);
    var arrets = JSON.parse(request.responseText);
    var dist = 1000;
    var closestStation;
    for (var arret in arrets) {
        //console.log(arrets[arret]);
        var calc = distance(latitude, longitude, arrets[arret].latitude, arrets[arret].longitude);
        if (calc < dist) {
            dist = calc;
            closestStation = arrets[arret];
        }
    }
    closestStation.dist = dist;
    return closestStation;
}

/**
 * Calculate the distance between 2 points
 * @param lat1 "First point latitude"
 * @param lon1 "First point longitude"
 * @param lat2 "Second point latitude"
 * @param lon2 "Second point longitude"
 * @param unit "The unit of the returned value, can be 'K'ilometers ...
 * @returns {number}
 */
function distance(lat1, lon1, lat2, lon2, unit) {
    unit = "K";
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var radlon1 = Math.PI * lon1 / 180
    var radlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}

/**
 * Ajax request JS
 * @param url
 * @param callback
 */
function callAjax(url, loading, callback) {
    var xmlhttp;
    if (loading){
        for (var i = document.getElementsByClassName("loading").length - 1; i >= 0; i--) {
            document.getElementsByClassName("loading")[i].style.display = "block";
        }
    }
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

geoFindMe();

function goBlanc(){
    document.getElementsByClassName("icone-chrono")[0].setAttribute("class", "icone-chrono-vert txtmiddle");
}

function goVert(){
    document.getElementsByClassName("icone-chrono-vert")[0].setAttribute("class", "icone-chrono txtmiddle");
}

function refreshPage(){
    for (var i = document.getElementsByClassName("horaires").length - 1; i >= 0; i--) {
        document.getElementsByClassName("horaires")[i].innerHTML = "";
    }
    for (var i = document.getElementsByClassName("loading").length - 1; i >= 0; i--) {
        document.getElementsByClassName("loading")[i].style.display = "block";
    }
    geoFindMe();
}