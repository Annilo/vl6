(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let kell = date.getHours();
            let h = date.getHours() % 12;
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;

            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            if (kell > 12) {
                c.innerHTML = h + ":" + m + ":" + s + "PL";
            }
            else if (kell < 12) {
                c.innerHTML = h + ":" + m + ":" + s + "EL";
            }

        };

    });

    // forms
    document.getElementById("first-name").addEventListener("submit", estimateDelivery);
    document.getElementById("form").addEventListener("submit", estimateDelivery);


    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    let tulemus = 0;

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perekonnanimi = document.getElementById("lname");
        let vaartus1 = document.getElementById("yks").checked;
        let vaartus2 = document.getElementById("kaks").checked;
        if (eesnimi.value === "") {
            alert("Sisestage eesnimi");
        }
        else if (perekonnanimi.value === "") {
            alert("Sisestage perekonnanimi");
        }
        if (vaartus1 === false && vaartus2 === false) {
            alert("Vali makseviis");
        }
        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;


        } else {
            switch (linn.value) {
                case trt:
                    tulemus = tulemus + 2.50;
                    break;
                case prn:
                    tulemus = tulemus + 3.00;
                    break;
            }

            e.innerHTML = "x,xx &euro;";

        }

        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    let centerPoint2 = new Microsoft.Maps.Location(58.26707, 26.46857);

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    var infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);


    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });
    pushpin.metadata = {
        title: 'Pin Title',
        description: 'Pin discription'
    };
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);

    map.entities.push(pushpin);
    let pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, { // loome markeri

        title: 'Observatoorium',
        //subTitle: '',
        //text: 'UT'

    });
    pushpin2.metadata = {
        title: 'Pin Title',
        description: 'Pin discription'
    };
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    map.entities.push(pushpin2);

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
