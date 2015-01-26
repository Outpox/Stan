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

            var os = getMobileOperatingSystem();

            var lien_map_ios = "http://maps.apple.com/?saddr="+latitude+","+longitude+"&daddr="+arret.latitude+","+arret.longitude+"&directionsmode=walking&dirflg=w";
            var lien_map_android = "geo:"+latitude+","+longitude+"?saddr=("+latitude+","+longitude+")&daddr=("+arret.latitude+","+arret.longitude+")&directionsmode=walking";
            var lien_map_default = "http://maps.google.com/maps?saddr="+latitude+","+longitude+"&daddr="+arret.latitude+","+arret.longitude+"&directionsmode=walking&dirflg=w";

            var lien_map = lien_map_default;
            if(os == "iOS"){
                lien_map = lien_map_ios;
            }else if(os == "Android"){
                // Ne fonctionne pas
                // lien_map = lien_map_android;
            }
            
            document.querySelector("#maps").href = lien_map;

            document.querySelector("#dist").innerHTML = " à " + arret.dist.toFixed(2) + " km";

            callAjax("./parseHours.php?&arret=" + arret.nom, true, function (data) {
                var passages = JSON.parse(data);
                var pasE = document.querySelector("#passagesE");
                var pasV = document.querySelector("#passagesV");
                for (var h in passages.Essey) {
                    pasE.innerHTML += "- "+passages.Essey[h] + "</br>";
                }

                //Affichage des erreurs
                if(passages.ErrorE.length > 0){
                    var listErrorE = document.getElementById("errorE");
                    listErrorE.style.display = "block";

                    for (var e in passages.ErrorE) {
                        listErrorE.innerHTML += "<div class='row ss-bloc-like'><span class='col txtmiddle'><span class='icone-alert'></span></span><span class='col txtmiddle'>"+passages.ErrorE[e]+"</span></div>";
                    }
                }

                for (var h in passages.Vandoeuvre) {
                    pasV.innerHTML += "- "+passages.Vandoeuvre[h] + "</br>";
                }

                //Affichage des erreurs
                if(passages.ErrorV.length > 0){
                    var listErrorV = document.getElementById("errorV");
                    listErrorV.style.display = "block";

                    for (var e in passages.ErrorV) {
                        listErrorV.innerHTML += "<div class='row ss-bloc-like'><span class='col txtmiddle'><span class='icone-alert'></span></span><span class='col txtmiddle'>"+passages.ErrorV[e]+"</span></div>";
                    }
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

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
    return 'iOS';

  }else if( userAgent.match( /Android/i ) ){

    return 'Android';
  }else{
    return 'unknown';
  }
}