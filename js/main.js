//insert code here!
window.onload = setMap();

//set up choropleth map
function setMap(){

    var width = 900,
        height = 500;
    
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geoAlbersUsa()
        .scale(900);
        
    var path = d3.geoPath()
        .projection(projection);

    //use Promise.all to parallelize asynchronous data loading
    var promises = [d3.csv("data/acres_burned.csv"),
                    d3.csv("data/application_fee.csv"),
                    d3.csv("data/authorization_time.csv"),
                    d3.csv("data/burn_programs.csv"),
                    d3.csv("data/fire_trends.csv"),
                    d3.csv("data/liability_law.csv"),
                    d3.csv("data/permit_requirements.csv"),
                    /* d3.csv("data/report_card.csv"), */
                    d3.csv("data/state_fire_council.csv"),
                    d3.json("data/usaStates.topojson")                                
                    ];    
    Promise.all(promises).then(callback);

    function callback(data){
        csv1 = data[0];
        csv2 = data[1];
        csv3 = data[2];
        csv4 = data[3];
        csv5 = data[4];
        csv6 = data[5];
        csv7 = data[6];
        csv8 = data[7];
        uSA = data[8];

        var americanStates = topojson.feature(uSA, uSA.objects.usaStates).features;

        var states = map.selectAll(".states")
            .data(americanStates)
            .enter()
            .append("path")
            .attr("class", function(d){
                return "states " + d.properties.name;
            })
            .attr("d", path);
    }
};