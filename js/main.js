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
                    d3.csv("data/state_fire_council.csv"),
                    d3.json("data/usaStates.topojson")                                
                    ];    
    Promise.all(promises).then(callback); 

    function callback(data){
        var csv1 = data[0], csv2 = data[1], csv3 = data[2], csv4 = data[3], csv5 = data[4], csv6 = data[5], csv7 = data[6], csv8 = data[7], usa = data[8];
        
        var americanStates = topojson.feature(usa, usa.objects.usaStates).features;

        var csvArray = [csv1, csv2, csv3, csv4, csv5, csv6, csv7, csv8];

        var attrArray = ["acresBurned", "applicationFee", "authorizationTime", "burnPrograms", "fireTrends", "liabilityLaw", "permitRequirements", "stateFireCouncil"];

        for (csv in csvArray){
            joinData(usa, csvArray[csv], attrArray[csv]);
        };

        function joinData(usa, csvData, attribute){
            //loop through csv to assign each set of csv attribute values to geojson country
            for (var i = 0; i < csvData.length; i++){
                var csvRegion = csvData[i]; //the current state
                var csvKey = csvRegion.State; //the CSV primary key
            
                //loop through geojson westAfricaCountries to find correct country
                for (var a = 0; a < americanStates.length; a++){
                    var geojsonProps = americanStates[a].properties; //the current country geojson properties
                    var geojsonKey = geojsonProps.name; //the geojson primary key
                    
                    //where primary keys match, transfer csv data to geojson properties object
                    if (geojsonKey == csvKey){

                        //assign all attributes and values
                        attrArray.forEach(function(attr){
                            var val = csvRegion[attr]; //get csv attribute value
                            console.log(csvRegion[attr]);
                            geojsonProps[attr] = val; //assign attribute and value to geojson properties
                            
                        });
                    };
                };
            };
            
            //returns joined data for implementation
            /* return americanStates; */
        };



        var states = map.selectAll(".states")
            .data(americanStates)
            .enter()
            .append("path")
            .attr("class", function(d){
                return "states " + d.properties.name;
            })
            .attr("d", path);
    };
};