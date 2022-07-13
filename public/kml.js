$(function() {
    var map = L.map("map").setView([-7.977014, 112.634056], 14);

    var tiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
    ).addTo(map);

    $.ajax({
        type: "GET",
        url: "/datakml",
        dataType: "JSON",
        success: function(data) {
            for (i = 0; i < data.length; i++) {
                fetch(data[i].file)
                    .then((res) => res.text())
                    .then((kmltext) => {
                        // Create new kml overlay
                        const parser = new DOMParser();
                        const kml = parser.parseFromString(kmltext, "text/xml");
                        const track = new L.KML(kml);
                        map.addLayer(track);
                        // Adjust map to show the kml
                        const bounds = track.getBounds();
                        map.fitBounds(bounds);
                    });
            }
        },
    });
});
