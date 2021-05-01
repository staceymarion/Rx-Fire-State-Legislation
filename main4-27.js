(function(){

//pseudo-global variables
var attrArray = ["Acres Burned", "Permit Application Fee", "Time to Obtain Permit", "State-Certified Burn Program", "Trend Direction", "State Liability Law", "Permit Requirement", "State Fire Council"];
var expressed = attrArray[0];

var arrayAcres = ["<1,000", "1,001-50,000", "50,001-250,000", "250,001-1,000,000", ">1,000,000"];
var arrayFee = ["N/A", "Not Required", "Sometimes", "Required"];
var arrayTime = ["N/A", "Day of Burn", "More than 1 Day"];
var arrayProgram = ["Yes", "No"];
var arrayTrends = ["Down", "Same", "Up"];
var arrayLaw = ["Strict Liability", "Simple Negligence", "Gross Negligence", "No Law"];
var arrayPermit = ["Required", "Not Required"];
var arrayCouncil = ["Yes", "No", "Regional"];
    
//color
var colorize;
var currentColors = [];

var colorArrayAcres = ["#b3cde0",       //<1,000
                       "#6497b1",       //1,001-50,000
                       "#005b96",       //50,001-250,000
                       "#03396c",       //250,001-1,000,000
                       "#011f4b"];      //>1,000,000

var colorArrayFee = ["#6497b1",         //N/A
                     "#005b96",         //Not Required
                     "#03396c",         //Sometimes
                     "#011f4b"];        //Required
    
var colorArrayTime = ["#b3cde0",        //N/A
                      "#005b96",        //Day of Burn
                      "#011f4b"];       //More than 1 Day
    
var colorArrayProgram = ["#b3cde0",     //Yes
                         "#011f4b"];    //No
    
var colorArrayTrends = ["#b3cde0",      //Down
                         "#005b96",     //Same
                         "#011f4b"];    //Up
    
var colorArrayLaw = ["#6497b1",         //Strict Liability
                         "#005b96",     //Simple Negligence
                         "#03396c",     //Gross Negligence
                         "#011f4b"];    //No Law
    
var colorArrayPermit = ["#b3cde0",      //Required
                         "#011f4b"];    //Not Required
    
var colorArrayCouncil = ["#b3cde0",     //Yes
                         "#005b96",     //No
                         "#011f4b"];    //Regional
    
//colorscale
var currentColors = [];
var currentArray = [];

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
    
    $.getJSON("data/usaStates1.topojson", callback);

    function callback(data){
        var usa = data;
        console.log(usa);

        var americanStates = topojson.feature(usa, usa.objects.usaStates1).features;
        console.log(americanStates);
        colorize = colorScale(americanStates)

        var states = map.selectAll(".states")
            .data(americanStates)
            .enter()
            .append("path")
            .attr("class", function(d){
                return "states " + d.properties.name;
            })
            .style("fill", function(d){
                return choropleth(d, colorize);
            })
            .attr("d", function(d) {
                return path(d);
            })
        var statesColor = states.append("desc")
            .text(function(d) {
                return choropleth(d, colorize);
            })
        
        //var colorScale = makeColorScale(americanStates.properties);
        drawMenu();
        
        function drawMenu(){
            
            $(".acres-burned").click(function(){ 
            expressed = Category[0];
            $('.stepBackward').prop('disabled', true);
            $('.play').prop('disabled', true);
            $('.pause').prop('disabled', true);
            $('.stepForward').prop('disabled', true);
            d3.selectAll(".menu-options div").style({'background-color': '#e1e1e1','color': '#969696'});
            d3.selectAll(".states").style("fill", function(d){
                    return choropleth(d, colorize);
                })
                .select("desc")
                    .text(function(d) {
                        return choropleth(d, colorize);
                });
            createMenu(arrayOverview, colorArrayOverview, "Grading Scale: ", textArray[0], linkArray[0]);
            $(".Overview").css({'background-color': '#CCCCCC','color': '#333333'});
            });     
        }
    };
    
    function colorScale(data){
        // this if/else statement determines which variable is currently being expressed and assigns the appropriate color scheme to currentColors
        if (expressed === "Acres Burned") {   
            currentColors = colorArrayAcres;
            currentArray = arrayAcres;
        } else if (expressed === "Permit Application Fee") {
            currentColors = colorArrayFee;
            currentArray = arrayFee;
        } else if (expressed === "Time to Obtain Permit") {
            currentColors = colorArrayTime;
            currentArray = arrayTime;
        } else if (expressed === "State-Certified Burn Program") {
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
        };

        colorScale = d3.scaleOrdinal()
                    .range(currentColors)
                    .domain(currentArray); //sets the range of colors and domain of values based on the currently selected 
        return colorScale(expressed);
    };

    function choropleth(d, colorize){
        var data = d.properties ? d.properties[expressed] : d;
        return colorScale(data);
    };
    
        //Accordion menu
        $(function() {
            var Accordion = function(el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;
        
            var dropdownlink = this.el.find('.dropdownlink');
            dropdownlink.on('click',
                            { el: this.el, multiple: this.multiple },
                            this.dropdown);
            };
        
            Accordion.prototype.dropdown = function(e) {
            var $el = e.data.el,
                $this = $(this),
                $next = $this.next();
        
            $next.slideToggle();
            $this.parent().toggleClass('open');
        
            if(!e.data.multiple) {
              $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
            }
            }
        
            var accordion = new Accordion($('.accordion-menu'), false);
            })
        };

})();
