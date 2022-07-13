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
        url: "http://api.cctv.malangkota.go.id/records/cameras",
        dataType: "JSON",
        success: function(res) {
            for (i = 0; i < res.records.length; i++) {
                L.marker([res.records[i].latitude, res.records[i].longitude])
                    .addTo(map)
                    .bindPopup(
                        `<a target="_blank" href="http://proxy.cctv.malangkota.go.id/image?host=${res.records[i].host}&t=${res.records[i].id}" class="btn btn-link">${res.records[i].name}</a><p>${res.records[i].address}</p>`
                    )
                    .openPopup();

                // console.log(res.records[i]);
            }
        },
    });
});

function cctv(id) {
    console.log(id);

    var modal = $("#modal");
    modal.modal("show");

    let videoSRC =
        // "http://proxy.cctv.malangkota.go.id/image?host=10.0.2.192&t=1657160267";

        (videoSRCauto = videoSRC + "?autoplay=1");
    $("#modal iframe").attr("src", videoSRCauto);
    modal.on("hidden.bs.modal", function() {
        $("#modal iframe").removeAttr("src");
    });
}
