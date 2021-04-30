(function(){


//pseudo-global variables
var attrArray = ["Acres Burned", "Permit Application Fee", "Time to Obtain Permit", "State-Certified Burn Program", "Trend Direction", "State Liability Law", "Permit Requirement", "State Fire Council"];
var expressed = attrArray[0];

var arrayAcres = ["<1,000", "1,001-50,000", "50,001-250,000", "250,001-1,000,000", ">1,000,000"];
var arrayFee = 


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

        var states = map.selectAll(".states")
            .data(americanStates)
            .enter()
            .append("path")
            .attr("class", function(d){
                return "states " + d.properties.name;
            })
            .attr("d", path);
        console.log(americanStates.properties);
        var colorScale = makeColorScale(americanStates.properties);

        setEnumerationUnits(americanStates, map, path, colorScale);
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
};





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


})();