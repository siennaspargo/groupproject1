  $(document).ready(function () {

    function createTable(response){
        var table = $('<table>').addClass('table');
        var header = $("<tr>");
        var header1 = $("<th>").text("Weekday");
        var header2 = $("<th>").text("Date");
        var header3 = $("<th>").text("Time");
        var header4 = $("<th>").text("Duration (minutes)");
        header.append(header1, header2, header3, header4);
        table.append(header);
        for (var i = 0; i < response.response.length; i++) {
            var rise = response.response[i].risetime;
            //console.log(rise);

            rise = moment.unix(rise).format("dddd, MMMM Do, YYYY h:mm:ss A");
            var dur = response.response[i].duration;
            var parts = rise.split(',');
            var time = parts[2].split(' ');

            dur = Math.round(dur / 60 * 100) / 100;


            var row = $("<tr>");
            var column = $('<td>').text(parts[0]);
            var column3 = $('<td>').text(parts[1] + " " + time[1]);
            var column4 = $('<td>').text(time[2] + " " + time[3]);

            var column2 = $("<td>").text(dur);
            row.append(column, column3, column4, column2);
            table.append(row);
        }



        $('#tableHere').append(table);

    }

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
            createTable(response); 
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

   
      $("#search-current").on("click", function () {
          $("#tableHere").text("") 
          getCoor();

      });

      $("#search-elsewhere").on("click", function(){
          var weHaveSuccess = false;
          $("#tableHere").text("") 
          var search = $("#search-input").val(); 
          search = search.split(","); 
          lat = search[0];
          long = search[1]; 
          console.log(lat, long);
          var queryURL = "http://api.open-notify.org/iss-pass.json?lat=" + lat + "&lon=" + long;
        
          $.ajax({
              url: "https://floating-brushlands-91043.herokuapp.com/cors",
              data: {
                  url: queryURL,
                  key: "6C365355271AF5033FE78FCCE1DA65A85E4193B7A5C95E92F3904ED0407F9D79"
              },
              method: "POST",
              success: function(){
                  weHaveSuccess = true; 
              },
              error: function(xhr){
                  console.log(xhr.status); 
              },
              complete: function(){
                  if(!weHaveSuccess){
                      alert("Invalid input"); 
                  }
              }
              
            
          })
          .then(function (response) {
            createTable(response); 


          }); 
      })
    
//getCoor();
})