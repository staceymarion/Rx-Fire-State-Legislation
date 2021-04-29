
var attrArray = ["Acres Burned", 
                 "Permit Application Fee", 
                 "Time to Obtain Permit", 
                 "State-Certified Burn Program", 
                 "Trend Direction", 
                 "State Liability Law", 
                 "Permit Requirement", 
                 "State Fire Council",
                ];

var expressed = attrArray[0];
var categories;

//global variable
var colorClasses = ["#b3cde0", "#6497b1", "#005b96", "#03396c", "#011f4b"];

window.onload = setMap();

//set up choropleth map
function setMap(){

    var width = 900,
        height = 500;
    
    var map = d3
        .select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    var projection = d3
        .geoAlbersUsa()
        .scale(1000);
        
    var path = d3.geoPath().projection(projection);

    //use Promise.all to parallelize asynchronous data loading
    var promises = [d3.csv("data/acres_burned.csv"),
                    d3.csv("data/application_fee.csv"),
                    d3.csv("data/authorization_time.csv"),
                    d3.csv("data/burn_programs.csv"),
                    d3.csv("data/fire_trends.csv"),
                    d3.csv("data/liability_law.csv"),
                    d3.csv("data/permit_requirements.csv"),
                    d3.csv("data/state_fire_council.csv"),
                    d3.json("data/usaStates.topojson"),                                
                    ];    
    Promise.all(promises).then(callback); 

    function callback(data){
        var csv1 = data[0], 
            csv2 = data[1], 
            csv3 = data[2], 
            csv4 = data[3], 
            csv5 = data[4], 
            csv6 = data[5], 
            csv7 = data[6], 
            csv8 = data[7], 
            usa = data[8];
      
        
        // This code isn't doing anything. The id_code comes out as undefined, 
        // as the properties of the TopoJSON only have "name" included in them 
        // and we don't have some array that we are pulling ID numbers from.

        /* for (var i = 0; i < usa.objects.usaStates.geometries.length; i++) {
                var prop = usa.objects.usaStates.geometries[i].properties;
                console.log(prop);
                var id_code = usa.objects.usaStates.geometries[i].id_code;
                prop["id_code"] = id_code;
            }; */
             

        var americanStates = topojson.feature(usa, usa.objects.usaStates).features;

        var csvArray = [csv1, csv2, csv3, csv4, csv5, csv6, csv7, csv8];

        for (csv in csvArray){
            joinData(usa, csvArray[csv]);
        };
        
            function joinData(usa, csvData){
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

    //function to create color scale generator
    function makeColorScale(data) {

        //create color scale generator
        var colorScale = d3.scaleThreshold().range(colorClasses);

        //build array of all values of the expressed attribute
        var domainArray = [];
        for (var i = 0; i < data.length; i++) {
            var val = parseFloat(data[i][expressed]);
            domainArray.push(val);
        }

        //cluster data using ckmeans clustering algorithm to create natural breaks
        var clusters = ss.ckmeans(domainArray, 5);
        //reset domain array to cluster minimums
       
        domainArray = clusters.map(function (d) {
            return d3.min(d);
        });

        //remove first value from domain array to create class breakpoints
        domainArray.shift();

        //assign array of last 4 cluster minimums as domain
        colorScale.domain(domainArray);
        return colorScale;
    }
  
    function setEnumerationUnits(usa, map, path, colorScale) {
        //add Spain regions to map
        var regions = map
            .selectAll(".regions")
            .data(usa)
            .enter()
            .append("path")
            .attr("class", function (d) {
                return "regions " + d.properties.id_code;
            })
            .attr("d", path)
            .style("fill", function (d) {
                var value = d.properties[expressed];
                if (value) {
                    return colorScale(d.properties[expressed]);
                } else {
                    return "#ccc";
                }
             })

        var desc = regions.append("desc")
        .text('{"stroke": "#000", "stroke-width": "0.5px"}');
    }
    
    $(function() {
    var Accordion = function(el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var dropdownlink = this.el.find('.dropdownlink');
    dropdownlink.on('click',
    { el: this.el, multiple: this.multiple },
    this.dropdown);
    };

    Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el,
    $this = $(this),
    //this is the ul.submenuItems
    $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if(!e.data.multiple) {
    //show only one menu at the same time
    $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
    }
    }

    var accordion = new Accordion($('.accordion-menu'), false);
    })
    
};
