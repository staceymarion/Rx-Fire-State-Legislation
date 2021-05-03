//completed:
//data digitization and classification 
//data join
//initial map loading
//color scale in progress..
//web page creation with bootstrapping
//web content creation
//web styling

//group to-do:
//link choropleth color scale to accordian menu
//check functionality of all menu items
//highlight by hover
//popup by hover
//card panel compare tool. reference: https://evictionlab.org/map/#/2016?geography=states&bounds=-190.672,8.216,-44.648,62.55&type=er
// final map styling

(function(){

//pseudo-global variables
//var attrArray = ["Acres Burned", "Permit Application Fee", "Time to Obtain Permit", "State-Certified Burn Program", "Trend Direction", "State Liability Law", "Permit Requirement", "State Fire Council"];
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

//color scale
//var scale; // for use with the var scale = d3.ordinalScale, line 219
//var colorScale;  // changed colorize --> colorScale. not sure if needed as psuedo global
// under callback, following D3 lab logic
//var currentColors = [];
//var currentArray = [];

/* //var arrayAcres = ["<1,000", "1,001-50,000", "50,001-250,000", "250,001-1,000,000", ">1,000,000"];
var arrayAcres = [1, 2, 3, 4, 5];
var arrayFee = ["N/A", "Not Required", "Sometimes", "Required"];
var arrayTime = [1, 2, 3];
var arrayProgram = ["Yes", "No"];
var arrayTrends = ["Down", "Same", "Up"];
var arrayLaw = [1, 2, 3, 4];
var arrayPermit = ["Required", "Not Required"];
var arrayCouncil = ["Yes", "No", "Regional"];

// individual arrays for each attribute -- for legend generation. different number of categories for each
var colorArrayAcres = ["#b3cde0",       //<1,000    1
                       "#6497b1",       //1,001-50,000    2
                       "#005b96",       //50,001-250,000     3
                       "#03396c",       //250,001-1,000,000     4
                       "#011f4b"];      //>1,000,000    5

var colorArrayFee = ["#6497b1",         //N/A
                     "#005b96",         //Not Required
                     "#03396c",         //Sometimes
                     "#011f4b"];        //Required
    
var colorArrayTime = ["#b3cde0",        //N/A    1
                      "#005b96",        //Day of Burn     2
                      "#011f4b"];       //More than 1 Day    3
    
var colorArrayProgram = ["#b3cde0",     //Yes
                         "#011f4b"];    //No
    
var colorArrayTrends = ["#b3cde0",      //Down
                         "#005b96",     //Same
                         "#011f4b"];    //Up
    
var colorArrayLaw = ["#6497b1",         //Strict Liability    1
                         "#005b96",     //Simple Negligence    2
                         "#03396c",     //Gross Negligence     3
                         "#011f4b"];    //No Law       4
    
var colorArrayPermit = ["#b3cde0",      //Required
                         "#011f4b"];    //Not Required
    
var colorArrayCouncil = ["#b3cde0",     //Yes
                         "#005b96",     //No
                         "#011f4b"];    //Regional */
    
// replace above two arrays to a single array attrcol1 = {attr1: color1, attr2: color2, …}


var attrcol = {
    Acres_2017: { 1: "#b3cde0", 2: "#6497b1", 3: "#005b96", 4: "#03396c", 5: "#011f4b" },
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

        //var colorScale = makeColorScale(usa); //makeColorScale not a fxn in this code
        
        //colorize = colorScale(americanStates) // colorize fxn defined below  // where do we call colorize?
        
        setEnumerationUnits(americanStates, map, path); // remove colorScale (when using consolidated array)
        
        //drawMenu(); //create menu //for right now, not using drawMenu code
        
        
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


/* function drawMenu(){
            
    $(".Acres").click(function(){ 
    expressed = Category[0];
    $('.stepBackward').prop('disabled', true);
    $('.play').prop('disabled', true);
    $('.pause').prop('disabled', true);
    $('.stepForward').prop('disabled', true);
    d3.selectAll(".menu-options div").style({'background-color': '#e1e1e1','color': '#969696'});
    d3.selectAll(".states").style("fill", function(d){
            return choropleth(d, colorScale);
        })
        .select("desc")
            .text(function(d) {
                return choropleth(d, colorScale);
        });
    createMenu(arrayOverview, colorArrayOverview, "Grading Scale: ", textArray[0], linkArray[0]);
    $(".Overview").css({'background-color': '#CCCCCC','color': '#333333'});
    });     
}; */

// can remove makeColorScale fxn 

/* function makeColorScale(data){
    // this if/else statement determines which variable is currently being expressed and assigns the appropriate color scheme to currentColors
    // currentColors, currentArray, and attribute arrays are defined as psuedo global
    if (expressed === "Acres_2017") {   
        currentColors = colorArrayAcres;
        currentArray = arrayAcres;
    } else if (expressed === "Permit Application Fee") {
        currentColors = colorArrayFee;
        currentArray = arrayFee;
    } else if (expressed === "Time to Obtain Permit") {
        currentColors = colorArrayTime;
        currentArray = arrayTime;
    } else if (expressed === "BurnProgra") {
        currentColors = colorArrayProgram;
        currentArray = arrayProgram;
    } else if (expressed === "Trend Direction") {
         currentColors = colorArrayTrends;
         currentArray = arrayTrends;
    } else if (expressed === "State Liability Law") {
         currentColors = colorArrayLaw;
         currentArray = arrayLaw;
    } else if (expressed === "Permit Requirement") {
         currentColors = colorArrayPermit;
         currentArray = arrayPermit;    
    } else if (expressed === "State Fire Council") {
        currentColors = colorArrayCouncil;
        currentArray = arrayCouncil;
    } else {
        currentColors = "#ccc";
    };

    var colorScale = d3.scaleOrdinal()   // sm: changed colorScale --> 
                .range(currentColors) // array of colors
                .domain(currentArray); // array of possible domain values --  sets the range of colors and domain of values based on the currently selected 
    return colorScale;
}; */

function setEnumerationUnits(americanStates, map, path) {
    var states = map.selectAll(".states")
        .data(americanStates)
        .enter()
        .append("path")
        .attr("class", function (d) {
            return "states " + d.properties.name; // working! 
        })
        .attr("d", path)  // added
        /* .style("fill", function (d) {
            // attrcol previously defined
            return attrcol[expressed][d.properties[expressed]]; // not returing, d not defined
        }); */
        //console.log(d.properties[expressed]);
        //console.log(attrcol[expressed]); // results {1:#b3cde0, etc.}  
        .style("fill", function(d){
            var value = d.properties[expressed];   // not working
            console.log(value); 
            if(value) {
                attrcol[expressed][d.properties[expressed]];  //not working
            } else {
                return "#ccc";  // returning ccc for all
            }    
        })
        // old code below
    /*     .style("fill", function(d){
            var value = d.properties[expressed];
            if(value) {
                return choropleth(d, colorScale);  // set color; 
            } else {
                return "#ccc";
            }    
        }) */

      /*   .style(“fill”, function(d) {
            var color = attrcol1[d.properties[attr1]];  // find corresponding color value from attr1 
            return color;
          })
           */  // could do by index from dropdown , alternative to if else 

          // on clikc, change expressed value replace attr1 with whatever selected ; 
          // need if, else.   

        /* .attr("d", function(d) {
            return path(d);
        }) */

    /* var statesColor = states.append("desc")  //for mouseover
        .text(function(d) {
            return choropleth(d, colorScale);
        }) */
};

function choropleth(d, colorScale){
    var data = d.properties ? d.properties[expressed] : d;
    return colorScale(data);
}; 

})(); // last line of main.js

// update function
// use if else statement to redefine attr1, attrcolor1

// to add: card panels to compare states.  model = eviction lab