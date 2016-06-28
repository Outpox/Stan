var locales = {
    fr: {
        mode: 'Fonctionnement :',
        modeCode: {
            normal: 'Normal',
            holidays: 'Vacances',
            free: 'Gratuit'
        },
        status: 'Statut :',
        statusCode: {
            normal: 'Normal',
            strike: 'Grève',
            perturbation: 'Perturbations',
            undefined: 'Inconnu'
        },
        error: {
            noGeoLoc: 'La géolocalisation n\'est pas disponible avec votre navigateur.',
            geoLocCode1: 'Vous devez activer le GPS pour récupérer votre position automatiquement.',
            geoLocCodeX: 'Impossible de récupérer votre position à cause de l\'erreur {code} : {msg}'
        }
    },
    en: {
        mode: 'Mode: ',
        modeCode: {
            normal: 'Normal',
            holidays: 'Holidays',
            free: 'Free'
        },
        status: 'Status:',
        statusCode: {
            normal: 'Normal',
            strike: 'Strike',
            perturbation: 'Perturbations',
            undefined: 'Unknown'
        },
        error: {
            noGeoLoc: 'Geolocation services are not supported by your web browser.',
            geoLocCode1: 'It is mandatory to activate the GPS to automatically retrieve your position.',
            geoLocCodeX: 'Unable to retrieve your location due to {code} : {msg}'
        }
    }
};

Vue.config.lang = 'en';

Object.keys(locales).forEach(function (lang) {
    Vue.locale(lang, locales[lang])
});

var app = new Vue({
    el: '#app',
    data: {
        status: 'normal',
        mode: 'holidays',
        statusClass: {},
        modeClass: {},
        position: {
            latitude: '',
            longitude: ''
        },
        address: '',
        stops: {},
        error: false
    },
    ready: function () {
        var self = this;
        self.statusClass = {
            'is-success': self.status == 'normal',
            'is-danger': self.status == 'strike',
            'is-warning': self.status == 'perturbation',
            'is-light': self.status == 'undefined'
        };
        self.modeClass = {
            'is-success': self.status == 'normal',
            'is-info': self.status == 'holidays',
            'is-primary': self.status == 'free'
        };
        self.geoFindMe();
    },
    methods: {
        geoFindMe: function () {
            var self = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true, timeout: 5000});
            } else {
                alert(Vue.t('error.noGeoLoc'));
            }
            function success(position) {
                self.position.latitude = position.coords.latitude;
                self.position.longitude = position.coords.longitude;
                var mapsApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + self.position.latitude + "," + self.position.longitude + "&key=AIzaSyCNJqWDbXed3S7vYSi2GXYfDr5sPsVd4dE";
                // self.callAjax(mapsApiUrl, function (data) {
                //     var result = JSON.parse(data);
                //     self.address = result.results[0].formatted_address || 'Unable to retrieve your address.';
                self.address = '13 Rue de Mon Désert, 54000 Nancy, France';
                // });

                self.stops = self.getClosestTramStop(self.position.latitude, self.position.longitude);
                console.log(self.stops);

            }

            function error(error) {
                if (error.code == 1) {
                    alert(Vue.t('error.geoLocCode1'));
                }
                else {
                    alert(Vue.t('error.geoLocCodeX', {code: error.code, msg: error.message}));
                }
            }
        },
        /**
         * Retrieve the closest tram station based on your location and direction.
         * Tram stops are 'cached' in the browser localStorage in order to prevent downloading it every time.
         * Those are data which are unlikely to change even in the far future. (Well except when we can teleport ourselves and this shit is deprecated.)
         * @param latitude
         * @param longitude
         */
        getClosestTramStop: function (latitude, longitude) {
            var self = this,
                request,
                arretsEssey = {},
                arretsVandoeuvre = {},
                i,
                stop,
                distance,
                maxDist = 1000,
                stops = {
                    closestEssey: {},
                    closestVandoeuvre: {}
                };

            if (localStorage.getItem('arretsEssey') === null) {
                request = new XMLHttpRequest();
                request.open("GET", "../data/arrets_direction_essey.json", false);
                request.send(null);
                arretsEssey = JSON.parse(request.responseText);
                console.log(arretsEssey);
                localStorage.setItem('arretsEssey', JSON.stringify(arretsEssey));
            }
            else {
                arretsEssey = JSON.parse(localStorage.getItem('arretsEssey'));
            }

            if (localStorage.getItem('arretsVandoeuvre') === null) {
                request = new XMLHttpRequest();
                request.open("GET", "../data/arrets_direction_vandoeuvre.json", false);
                request.send(null);
                arretsVandoeuvre = JSON.parse(request.responseText);
                localStorage.setItem('arretsVandoeuvre', JSON.stringify(arretsVandoeuvre));
            }
            else {
                arretsVandoeuvre = JSON.parse(localStorage.getItem('arretsVandoeuvre'));
            }

            for (i in arretsEssey) {
                stop = arretsEssey[i];
                distance = self.calculateDistance(latitude, longitude, stop.Latitude, stop.Longitude);
                if (distance < maxDist) {
                    maxDist = distance;
                    stops.closestEssey = stop;
                }
            }
            stops.closestEssey.Distance = maxDist.toFixed(2);

            maxDist = 1000;

            for (i in arretsVandoeuvre) {
                stop = arretsVandoeuvre[i];
                distance = self.calculateDistance(latitude, longitude, stop.Latitude, stop.Longitude);
                if (distance < maxDist) {
                    maxDist = distance;
                    stops.closestVandoeuvre = stop;
                }
            }
            stops.closestVandoeuvre.Distance = maxDist.toFixed(2);

            if (maxDist = 1000) self.error = true;

            return stops;
        },
        callAjax: function (url, callback) {
            var xmlhttp;
            // compatible with IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    callback(xmlhttp.responseText);
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        },
        /**
         * Calculate the distance between 2 points
         * @param lat1 "First point latitude"
         * @param lon1 "First point longitude"
         * @param lat2 "Second point latitude"
         * @param lon2 "Second point longitude"
         * @param unit "The unit of the returned value, can be 'K'ilometers ...
         * @returns {number}
         */
        calculateDistance: function (lat1, lon1, lat2, lon2, unit) {
            unit = "K";
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var radlon1 = Math.PI * lon1 / 180;
            var radlon2 = Math.PI * lon2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") {
                dist = dist * 1.609344
            }
            if (unit == "N") {
                dist = dist * 0.8684
            }
            return dist
        },
        generateMapsUrl: function (stop) {
            var os = this.getMobileOperatingSystem();
            console.log(os);
            switch (os) {
                case('Android'):
                    return 'geo:' + stop.Latitude + ',' + stop.Longitude;
                    break;
                case('iOS'):
                    return  'http://maps.apple.com/?ll=' + stop.Latitude + ',' + stop.Longitude;
                    break;
                default:
                    return 'http://maps.google.com/?q=' + stop.Latitude + ',' + stop.Longitude;
            }
        },
        getMobileOperatingSystem: function () {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
                return 'iOS';

            } else if (userAgent.match(/Android/i)) {

                return 'Android';
            } else {
                return 'Desktop';
            }
        },
        //Source: http://www.creativejuiz.fr/blog/javascript/recuperer-parametres-get-url-javascript
        $_GET: function (param) {
            var vars = {};
            window.location.href.replace(
                /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
                function (m, key, value) { // callback
                    vars[key] = value !== undefined ? value : '';
                }
            );

            if (param) {
                return vars[param] ? vars[param] : null;
            }
            return vars;
        }
    }
});