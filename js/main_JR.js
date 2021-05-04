(function(){

//pseudo-global variables
var attrArray = ["Acres_2017", 
                 "Acres_2018", 
                 "Acres_2019", 
                 "BurnProgr", 
                 "FireCounci", 
                 "LiabilityL", 
                 "Link", 
                 "PermitFee", 
                 "PermitReq", 
                 "Time4Peri", 
                 "Trend_2017", 
                 "Trend_2018", 
                 "Trend_2019", 
                 "fcName"];
// for simplicity, consider just using most recent date. for ex: Acres_2019

var expressed = attrArray[0]; // initial attribute expressed

var attrcol = {
    Acres_2017: {1: "#b3cde0", 2: "#6497b1", 3: "#005b96", 4: "#03396c", 5: "#011f4b" },
    Acres_2018: {1: "#b3cde0", 2: "#6497b1", 3: "#005b96", 4: "#03396c", 5: "#011f4b" }, //skip
    Acres_2019: {1: "#b3cde0", 2: "#6497b1", 3: "#005b96", 4: "#03396c", 5: "#011f4b" }, //skip
    BurnProgr: { "Yes": "#b3cde0", "No": "#011f4b" },
    FireCounci: { "Yes": "#b3cde0", "No": "#005b96", "Regional":"#011f4b"},
    LiabilityL: { 1:"#6497b1", 2:"#005b96", 3:"#03396c", 4:"#011f4b" },
    Link: {},  // dont need
    PermitFee: {"N/A":"#6497b1" , "Not Required":"#005b96" , "Sometimes":"#03396c" , "Required":"#011f4b" },
    PermitReq: {"Required":"#b3cde0" , "Not Required":"#011f4b"},
    Time4Peri: {1:"#b3cde0" , 2:"#005b96"  , 3:"#011f4b"},
    Trend_2017: {"Down":"#b3cde0" , "Same":"#005b96" , "Up":"#011f4b" }, // skip
    Trend_2018: {"Down":"#b3cde0" , "Same":"#005b96" , "Up":"#011f4b" }, //skip
    Trend_2019: {"Down":"#b3cde0" , "Same":"#005b96" , "Up":"#011f4b" },
};
console.log(attrcol.Acres_2017[1]);
window.onload = setMap();

//set up choropleth map
function setMap(){ 

    var width = 900,
        height = 500;
    
    var map = d3.select(".map") // class map in bootstrap column 
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geoAlbersUsa()
        .scale(900)
        .translate([width / 2, height / 2]);
        
    var path = d3.geoPath() //path generator
        .projection(projection);
    
    $.getJSON("data/usaStates1.topojson", callback); // all data joined in topojson

    function callback(data){
        var usa = data;

        var americanStates = topojson.feature(usa, usa.objects.usaStates1).features;
        //console.log(americanStates); //works

        setEnumerationUnits(americanStates, map, path); // remove colorScale (when using consolidated array)
        
    }; // end of callback

    //accordion menu
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
        };
    
        var accordion = new Accordion($('.accordion-menu'), false);
    });    
};

function setEnumerationUnits(americanStates, map, path) {
    var states = map.selectAll(".states")
        .data(americanStates)
        .enter()
        .append("path")
        .attr("class", function (d) {
            return "states " + d.properties.name; // working! 
        })
        .attr("d", path)  // added
        .style("fill", function(d){
            var value = d.properties[expressed];   // working!!!!!!!!
            console.log(value);
            console.log(expressed); 
            if(value) {
                //console.log(attrcol[expressed][d.properties[expressed]]);
                return attrcol[expressed][d.properties[expressed]];  // working!!!!!!
            } else {
                return "#ccc";  // returning ccc for all
            }    
        })
        .on("mouseover", function(event, d){
            highlight(d.properties);
        })
        .on("mouseout", function(event, d){
            dehighlight(d.properties);
        });
    var desc = states.append("desc")
        .text('{"stroke": "#000", "stroke-width": "0.5px"}');
};

function highlight(props){
    //change stroke
    var selected = d3.selectAll("." + props.name)
        .style("stroke", "blue")
        .style("stroke-width", "2");
    console.log(props.name);
};

function dehighlight(props){
    var selected = d3.selectAll("." + props.name)
        .style("stroke", function(){
            return getStyle(this, "stroke")
        })
        .style("stroke-width", function(){
            return getStyle(this, "stroke-width")
        });

    function getStyle(element, styleName){
        var styleText = d3.select(element)
            .select("desc")
            .text();

        var styleObject = JSON.parse(styleText);

        return styleObject[styleName];
    };
};


})(); // last line of main.js

// update function
// use if else statement to redefine attr1, attrcolor1

// to add: card panels to compare states.  model = eviction lab