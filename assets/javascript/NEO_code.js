$(document).ready(function () {

    function nearEarth() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var date = yyyy + '-' + mm + '-' + dd;
        console.log(typeof date);
        // console.log(yyyy, mm, dd);


        var queryURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + yyyy + "-" + mm + "-" + dd + "&end_date=" + yyyy + "-" + mm + "-" + dd + "&api_key=yEo7d7kUAgz1lz8MdKkUFkf57rtYmtU5QltoxUSv";
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);

                var asteroids = response.near_earth_objects[date]
                console.log(asteroids.length);



                for (var i = 0; i < asteroids.length; i++) {

                    var nameA = response.near_earth_objects[date][i].name
                    console.log(nameA)

                    var hazmat = response.near_earth_objects[date][i].is_potentially_hazardous_asteroid
                    console.log(hazmat);

                    var sizeA = response.near_earth_objects[date][i].estimated_diameter.meters.estimated_diameter_max
                    console.log(sizeA);

                    var speedA = response.near_earth_objects[date][i].close_approach_data[0].relative_velocity.kilometers_per_hour
                    console.log(speedA);

                    var distanceA = response.near_earth_objects[date][i].close_approach_data[0].miss_distance.kilometers
                    console.log(distanceA);

                    var nasaURL = response.near_earth_objects[date][i].nasa_jpl_url
                    console.log(nasaURL);

                    function neoTable() {
                        var table = document.getElementById("neoTable");
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);

                        
                        if (hazmat == true) {
                            cell1.innerHTML = "<span style=" + "color:#FF0000><strong>" + nameA + "</strong></span>";
                            cell2.innerHTML = "<span style=" + "color:#FF0000><strong>" + hazmat + "</strong></span>";
                            cell3.innerHTML = "<span style=" + "color:#FF0000><strong>" + sizeA + "</strong></span>";
                            cell4.innerHTML = "<span style=" + "color:#FF0000><strong>" + speedA + "</strong></span>";
                            cell5.innerHTML = "<span style=" + "color:#FF0000><strong>" + distanceA + "</strong></span>";
                            cell6.innerHTML = "<a href='" + nasaURL + "'" + "target='_blank'> URL </a>";

                        }
                        else {
                            cell1.innerHTML = nameA;
                            cell2.innerHTML = hazmat;
                            cell3.innerHTML = sizeA;
                            cell4.innerHTML = speedA;
                            cell5.innerHTML = distanceA;
                            cell6.innerHTML = "<a href='" + nasaURL + "'" + "target='_blank'> URL </a>";
                        }

                    }

                    neoTable()


                }


                var table = document.getElementById("neoTable");
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);

                cell1.innerHTML = "Near Earth Object Name";
                cell2.innerHTML = "Is it hazardous?";
                cell3.innerHTML = "Size in M";
                cell4.innerHTML = "Speed in KPH";
                cell5.innerHTML = "Distance in KM";
                cell6.innerHTML = "Nasa URL for more information";
            })
    }

    nearEarth();
});