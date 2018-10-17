var resp;
var long;
var lat;
var date; 
var seconds; 
$(document).ready(function () {

    function handleIpStackResponse(response) {
        resp = response;
        long = response.longitude;
        lat = response.latitude;

        var queryURL = "http://api.open-notify.org/iss-pass.json?lat=" + lat + "&lon=" + long;
        $.ajax({
            url: "https://floating-brushlands-91043.herokuapp.com/cors",
            data: {
                url: queryURL,
                key: "6C365355271AF5033FE78FCCE1DA65A85E4193B7A5C95E92F3904ED0407F9D79"
            },
            method: "POST"
        }).then(function (response) {
            // Get reference to existing tbody element, create a new table row element
            console.log(response);
            date = response.response[0].risetime;
            seconds = response.response[0].duration; 
            console.log(date);
            console.log(seconds);
            date = moment.unix(date).format("MM/DD/YYYY");
            console.log(date);
        });
    }

    function getCoor() {
        var queryURL = "http://api.ipstack.com/check?access_key=fdaee2744bdd8dd531effb2b6c9e23da";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(handleIpStackResponse)
    }
    getCoor();


});