// // var resp;
// // var long;
// // var lat;
// // var date; 
// // var seconds;
// var sol;  

$(document).ready(function () {
//     function marsWeather(){
//         var queryURL = "https://api.maas2.jiinxt.com/";
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         })
//             .then(function (response) {
//                 console.log(response);
//                 $("#sol").html(response.sol);
//                 $("#weather").html(response.atmo_opacity);
//                 $("#max").html(response.max_temp);
//                 $("#min").html(response.min_temp);
                
//                 for(var i = 1; i < 5; i++){
//                     sol = response.sol - i; 
//                      var queryURL = "https://api.maas2.jiinxt.com/" + sol;
//                     $.ajax({
//                         url: queryURL,
//                         method: "GET"
//                     })
//                     .then(function(response){ 
//                        $("#firstRow").append($("<tr>")).append(
//                            $("<th>").text(sol),
//                            $("<th>").text(response.atmo_opacity),
//                            $("<th>").text(response.max_temp),
//                            $("<th>").text(response.min_temp)
//                        ); 
//                     })

//                 }
//             })
//     }
    
//     marsWeather();

//     function nearEarth(){
//         var today = new Date(); 
//         var dd = today.getDate(); 
//         var mm = today.getMonth()+1; 
//         var yyyy = today.getFullYear(); 
//         console.log(yyyy, mm, dd); 
//         var queryURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+ yyyy + "-" + mm +"-"+ dd + "&end_date=" +  yyyy + "-" + mm +"-"+ dd + "&api_key=sLG0TmrFvMdBmB42maQG6BN9AeqD35vYHbXKaQaJ"; 

//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         })
//             .then(function (response) {
//                 console.log(response);
//             })
//     }

//     nearEarth(); 

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
            // console.log(response);
            // date = response.response[0].risetime;
            // seconds = response.response[0].duration; 
            // console.log(date);
            // console.log(seconds);
        
            console.log(moment().format("dddd, MMMM Do, YYYY h:mm:ss A"));
            var table = $('<table>').addClass('table');
            var header = $("<tr>");
            var header1 = $("<th>").text("Weekday"); 
            var header2 = $("<th>").text("Date"); 
            var header3 = $("<th>").text("Time");
            var header4 = $("<th>").text("Duration (minutes)");
            header.append(header1, header2, header3, header4); 
            table.append(header);
             for(var i = 0; i < response.response.length; i++){
                var rise = response.response[i].risetime;
                //console.log(rise);
                
                 rise = moment.unix(rise).format("dddd, MMMM Do, YYYY h:mm:ss A");
                 var dur = response.response[i].duration;
                 var parts = rise.split(','); 
                 var time = parts[2].split(' ');
                 console.log(time);
                 console.log(parts); 
                 dur = Math.round(dur/60 * 100)/100; 
                 console.log(rise, dur);
                 
                 var row = $("<tr>"); 
                 var column = $('<td>').text(parts[0]);
                 var column3 = $('<td>').text(parts[1] + " " + time[1]);
                 var column4 = $('<td>').text(time[2] + " " + time[3]);

                 var column2 = $("<td>").text(dur); 
                 row.append(column, column3, column4, column2);
                table.append(row); 
            }
            
            

            $('.tableHere').append(table);

                        // date = moment.unix(date).format("MM/DD/YYYY");
                        // console.log(date);
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