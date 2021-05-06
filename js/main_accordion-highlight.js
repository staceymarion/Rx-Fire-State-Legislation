(function(){

//pseudo-global variables
var attrArray = ["Acres_2017", 
                 "Acres_2018", 
                 "Acres_2019", 
                 "PermitFee",
                 "Time4Permi",
                 "BurnProgra", 
                 "Trend_2017", 
                 "Trend_2018", 
                 "Trend_2019", 
                 "LiabilityL", 
                 "PermitRequ", 
                 "FireCounci",  
                 "fcName", 
                 "Link"];


var expressed = attrArray[11]; // initial attribute expressed

var attrcol = {
    Acres_2017: {1: "#b3cde0", 2: "#6497b1", 3: "#005b96", 4: "#03396c", 5: "#011f4b"},
    Acres_2018: {1: "#b3cde0", 2: "#6497b1", 3: "#005b96", 4: "#03396c", 5: "#011f4b"}, 
    Acres_2019: {1: "#b3cde0", 2: "#6497b1", 3: "#005b96", 4: "#03396c", 5: "#011f4b"}, 
    BurnProgra: {"Yes": "#011f4b", "No": "#b3cde081"},
    FireCounci: {"Yes": "#005b96", "No": "#b3cde081", "Regional":"#011f4b"},
    LiabilityL: {1:"#6497b1", 2:"#005b96", 3:"#011f4b", 4:"#b3cde081" },//"#03396c"
    PermitFee: {"N/A":"#b3cde081", "Not Required":"#011f4b", "Sometimes":"#005b96", "Required":"#011f4b"},  //"#011f4b" "#005b96"
    PermitRequ: {"Required":"#b3cde0", "Not Required":"#011f4b"},
    Time4Permi: {1:"#b3cde081", 2:"#011f4b", 3:"#005b96"},
    Trend_2017: {"Down":"#b3cde0", "Same":"#005b96", "Up":"#011f4b"}, 
    Trend_2018: {"Down":"#b3cde0", "Same":"#005b96", "Up":"#011f4b"}, 
    Trend_2019: {"Down":"#b3cde0", "Same":"#005b96", "Up":"#011f4b"},
    //Link: {" ": "#ccc"},  // if any value - color . skip for now
    //fcName: {},  // if any value - color. skip for now
};
//console.log(attrcol.Acres_2017[1]);
window.onload = setMap();

//set up choropleth map
function setMap(){ 

    var width = 700,
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
    
    createLegend(expressed); // call under the updateMap instead. 

    $.getJSON("data/usaStates1.topojson", callback); // all data joined in topojson
    
     /* var chartTitle = map.append("text") // use in the updateMap function to change with different menu selection
        .attr("x", 10)
        .attr("y", 30)
        .attr("class", "chartTitle")
        .text("" + expressed + ""); */ 
    
        function callback(data){
        var usa = data;

        var americanStates = topojson.feature(usa, usa.objects.usaStates1).features;
        //console.log(americanStates); //works

        setEnumerationUnits(americanStates, map, path); 
        
        //createDropdown(usa); // used dropdown menu as intermediate test of coloring fxn

        // update map when li items in accordion is clicked
        $(".attrli").on("click", function () {
            var id = $(this).attr("id");
            //console.log(id);
            updateMap(id);
        });

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
        
            if (!e.data.multiple) {
                //show only one menu at the same time
                $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
                $el.find('.dropdownlink').not($this).parent().removeClass('open'); //!@#$%^&*^%$#@$%^&%$#@$%^&*^%$#%^&*^%$#@ //new code that should be dehighlighting
            };
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
            return "states " + d.properties.name;
            //console.log("states " + d.properties.name.replace(".","")); 
        })
        .attr("d", path)  // added
        .style("fill", function(d){
            var value = d.properties[expressed];   
            //console.log(value);
            //console.log(expressed); 
            if(value) {
                //console.log(attrcol[expressed][d.properties[expressed]]);
                return attrcol[expressed][d.properties[expressed]];  
            } else {
                return "#ccc";  
            }    
        })
        .on("mouseover", function(event, d){
            highlight(d.properties);
        })
        .on("mouseout", function(event, d){
            dehighlight(d.properties);
        });
        //.on("mousemove", moveLabel)
        var desc = states.append("desc")
            .text('{"stroke": "#ffffff", "stroke-width": "1px"}') // upon mouseover, style returns to stroke #ccc
};

function highlight(props){
    var propsName = props.name.replace(" ",".")
    //console.log(propsName);
    var selected = d3.selectAll("." + propsName).raise() // issue with both "Virginia" and "West Virginia" highlighting at the same time
        .style("stroke", "white")
        .style("stroke-width", "3");
    //console.log(props.name);           
    //console.log(selected); 
     
    //dynamic map title
    //setLabel(props); 
    
    //dynamic info label pop-up
    var labelName = props.name;
    var labelAttribute;

    if (expressed == "Acres_2017") {
        if (props[expressed] == 1) {
            labelAttribute = "<1,000 forestry acres burned in 2017";
        } else if (props[expressed] == 2) {
            labelAttribute = "1,001-50,000 forestry acres burned in 2017";
        } else if (props[expressed] == 3) {
            labelAttribute = "50,001-250,000 forestry acres burned in 2017";
        } else if (props[expressed] == 4) {
            labelAttribute = "250,001-1,000,000 forestry acres burned in 2017";
        } else if (props[expressed] == 5) {
            labelAttribute = ">1,000,000 forestry acres burned in 2017";
        };
    } else if (expressed == "Acres_2018") {
        if (props[expressed] == 1) {
            labelAttribute = "<1,000 forestry acres burned in 2018";
        } else if (props[expressed] == 2) {
            labelAttribute = "1,001-50,000 forestry acres burned in 2018";
        } else if (props[expressed] == 3) {
            labelAttribute = "50,001-250,000 forestry acres burned in 2018";
        } else if (props[expressed] == 4) {
            labelAttribute = "250,001-1,000,000 forestry acres burned in 2018";
        } else if (props[expressed] == 5) {
            labelAttribute = ">1,000,000 forestry acres burned in 2018";
        };
    } else if (expressed == "Acres_2019") {
        if (props[expressed] == 1) {
            labelAttribute = "<1,000 forestry acres burned in 2019";
        } else if (props[expressed] == 2) {
            labelAttribute = "1,001-50,000 forestry acres burned in 2019";
        } else if (props[expressed] == 3) {
            labelAttribute = "50,001-250,000 forestry acres burned in 2019";
        } else if (props[expressed] == 4) {
            labelAttribute = "250,001-1,000,000 forestry acres burned in 2019";
        } else if (props[expressed] == 5) {
            labelAttribute = ">1,000,000 forestry acres burned in 2019";
        };
    } else if (expressed == "PermitFee") {
        if (props[expressed] == "Required") {
            labelAttribute = "Fee required with permit application";
        } else if (props[expressed] == "Sometimes") {
            labelAttribute = "Fee sometimes required with permit application";
        } else if (props[expressed] == "Not Required") {
            labelAttribute = "No fee with permit application";
        } else if (props[expressed] == "N/A") {
            labelAttribute = "Not applicable";
        };
    } else if (expressed == "Time4Permi") {
        if (props[expressed] == 1) {
            labelAttribute = "Not applicable";
        } else if (props[expressed] == 2) {
            labelAttribute = "Permit must be obtained at least day of burn";
        } else if (props[expressed] == 3) {
            labelAttribute = "Permit must be obtained more than 1 day before burn";
        };
    } else if (expressed == "BurnProgra") {
        if (props[expressed] == "Yes") {
            labelAttribute = "Has a state-certified burn program"; 
        } else if (props[expressed] == "No") {
            labelAttribute = "Does not have state-certified burn program";
        };
    } else if (expressed == "Trend_2017") {
        labelAttribute = "Trend in forestry acres burned, 2017: " + props[expressed];
    } else if (expressed == "Trend_2018") {
        labelAttribute = "Trend in forestry acres burned, 2018: " + props[expressed];
    } else if (expressed == "Trend_2019") {
        labelAttribute = "Trend in forestry acres burned, 2019: " + props[expressed];
    } else if (expressed == "LiabilityL") {
        if (props[expressed] == 1) {
            labelAttribute = "Strict Liability";
        } else if (props[expressed] == 2) {
            labelAttribute = "Simple Negligence";
        } else if (props[expressed] == 3) {
            labelAttribute = "Gross Negligence";
        } else if (props[expressed] == 4) {
            labelAttribute = "No law pertaining to fire liability or unknown";
        };
    } else if (expressed == "PermitRequ") {
        labelAttribute = "Permit " + props[expressed] + " to burn";
    } else if (expressed == "FireCounci") {
        if (props[expressed] == "Yes" ) {   
            //expressed = "fcName";         
            labelAttribute = "State fire council: " + props["fcName"]; //+ " " + props["Link"];
        } else if (props[expressed] == "No") {
            labelAttribute = "No state fire council";
        } else if (props[expressed] == "Regional") {
            labelAttribute = "Multiple regional fire councils: " + props["fcName"]; //+ " " + props["Link"]; 
        };
    };

    var infoLabel = d3.select(".map")
        .append("div")
        .attr("class", "infoLabel")
        .attr("id", props.name + "_label");
    //console.log(infoLabel);
    var labelTitle = infoLabel.html(labelName) 
        .attr("class", "labelTitle");
    //console.log(labelTitle);
    var labelContent = labelTitle.append("div")
        .html(labelAttribute)
        .attr("class", "labelContent");
    //console.log(labelContent);
}; 

function dehighlight(props){
    var propsName = props.name.replace(" ",".")
    var selected = d3.selectAll("." + propsName)
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
    //remove label info with mouseout 
    d3.select(".infoLabel")
        .remove(); 
    d3.select(".labelTitle")
        .remove(); 
    d3.select(".labelContent")
        .remove();   
};

//function to create dynamic label, activated under function highlight -- move to fxn related to menu selection 
/* function setLabel(props){
    //label content
    //expressed = attribute;
    var labelAttribute = "<h1>" + props[expressed]; 
    //+ "</h1><b>" + expressed + "</b>";

    //create info label div
    var infolabel = d3.select(".map")
        .append("map")
        .attr("class", "infolabel")
        .attr("id", props.name + "_label")  //.attr("id", props.name + "_label")
        .html(labelAttribute);

    var regionName = infolabel.append("div")
        .attr("class", "labelname")
        .html(props.name); 
}; */ 

//function to create a dropdown menu for attribute selection
/* function createDropdown(usa){
    //add select element
    var dropdown = d3.select("body") // might need to change for bootstrap structure
        .append("select")
        .attr("class", "dropdown")
        .on("change", function(){
            updateMap(this.value, usa) // usa instead of csvData
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Select Attribute");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(attrArray)
        .enter()
        .append("option")
        .attr("value", function(d){ return d })
        .text(function(d){ return d });
}; */

//code for da legend
function createLegend(expressed) {
    //var legendText = expressed;
    var svg = d3.select(".legend")   //.legend
        .append("svg")
        .attr("width", 240)
        .attr("height", 400)
        .attr("class", "svg");
    
    //if, else if statement to choose the legend to be shown that corresponds with expressed
    if (expressed == "Acres_2017") {  
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#6497b1");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 220).attr("r", 6).style("fill", "#03396c");
        svg.append("circle").attr("cx", 10).attr("cy", 250).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Acres Burned").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("<1,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("1,001-50,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("50,001-250,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 220).text("250,001-1,000,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 250).text(">1,000,000").style("font-size", "15px").attr("alignment-baseline","middle");
    } else if (expressed == "Acres_2018") {  
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#6497b1");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 220).attr("r", 6).style("fill", "#03396c");
        svg.append("circle").attr("cx", 10).attr("cy", 250).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Acres Burned").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("<1,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("1,001-50,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("50,001-250,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 220).text("250,001-1,000,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 250).text(">1,000,000").style("font-size", "15px").attr("alignment-baseline","middle");
    } else if (expressed == "Acres_2019") {  
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#6497b1");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 220).attr("r", 6).style("fill", "#03396c");
        svg.append("circle").attr("cx", 10).attr("cy", 250).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Acres Burned").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("<1,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("1,001-50,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("50,001-250,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 220).text("250,001-1,000,000").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 250).text(">1,000,000").style("font-size", "15px").attr("alignment-baseline","middle");
    } else if (expressed == "PermitFee") {
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#6497b1");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#03396c");
        svg.append("circle").attr("cx", 10).attr("cy", 220).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Application Fee").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("N/A").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("Not Required").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("Sometimes").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 220).text("Required").style("font-size", "15px").attr("alignment-baseline","middle");
    } else if (expressed == "Time4Permi") {
        svg.append("circle").attr("cx", 10).attr("cy" ,130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Authorization Time").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("N/A").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("Day of Burn").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("More than 1 Day").style("font-size", "15px").attr("alignment-baseline","middle");
    } else if (expressed == "BurnProgra") {
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#011f4b");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#b3cde0");
        svg.append("text").attr("x", 30).attr("y", 100).text("Burn Programs").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("Yes").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("No").style("font-size", "15px").attr("alignment-baseline","middle");
    } else if (expressed == "Trend_2017") {
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Fire Trends").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("Down").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("Same").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("Up").style("font-size", "15px").attr("alignment-baseline","middle"); 
    } else if (expressed == "Trend_2018") {
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Fire Trends").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("Down").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("Same").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("Up").style("font-size", "15px").attr("alignment-baseline","middle"); 
    } else if (expressed == "Trend_2019") {
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Fire Trends").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("Down").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("Same").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("Up").style("font-size", "15px").attr("alignment-baseline","middle"); 
    } else if (expressed == "LiabilityL") {
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#6497b1");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#03396c");
        svg.append("circle").attr("cx", 10).attr("cy", 220).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Liability Law").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("Strict Liability").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("Simple Negligence").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("Gross Negligence").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 220).text("No Law").style("font-size", "15px").attr("alignment-baseline","middle");
    } else if (expressed == "PermitRequ") {
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("Permit Requirements").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("Required").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("Not Required").style("font-size", "15px").attr("alignment-baseline","middle");
    } else if (expressed == "FireCounci") {
        svg.append("circle").attr("cx", 10).attr("cy", 130).attr("r", 6).style("fill", "#b3cde0");
        svg.append("circle").attr("cx", 10).attr("cy", 160).attr("r", 6).style("fill", "#005b96");
        svg.append("circle").attr("cx", 10).attr("cy", 190).attr("r", 6).style("fill", "#011f4b");
        svg.append("text").attr("x", 30).attr("y", 100).text("State Fire Council").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 130).text("Yes").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 160).text("No").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 30).attr("y", 190).text("Regional").style("font-size", "15px").attr("alignment-baseline","middle");
    };

};

//dropdown change event handler
function updateMap(attribute, usa) { // dont actually use usa
    //change the expressed attribute
    expressed = attribute;

    //recreate the color scale
    //var colorScale = makeColorScale(usa); // dont need makeColorScale; manual assignment

    //recolor enumeration units
    var states = d3.selectAll(".states ")
        .transition()
        .duration(1000)
        .style("fill", function(d){
            var value = d.properties[expressed];   
            if(value) {
                return attrcol[expressed][d.properties[expressed]]; 
            } else {
                return "#ccc";  
            }    
    });

  /*   //code for adding dynamic map title. comment out if you dont want
    var map = d3.select(".map")
    var chartTitle = map.append("text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("class", "chartTitle")
        .text("" + expressed + "");  */
    
    //update legend
    var legend = d3.select(".legend")
    var legendText = legend.append("text")
        //.append("legendText")
        //.attr("x", 10)
        //.attr("y", 30)
        .attr("class", "legendText")
        //.text("" + expressed + "")  // calling createLegend(expressed) and is returning undefined  */
        .style ("fill", function(d) {
            var value = expressed;
                if(value) {
                    d3.select(".svg").remove();
                    return createLegend(expressed);
                } else {
                    return "#ccc";
                }
        });
 /*     var legendSvg = legend.append("svg")
        .attr("class", "legendSvg")
        .append("svg")
        .attr("width", 240)
        .attr("height", 400)  
        .style ("fill", function(d) {
        var value = expressed;
            if(value) {
                return createLegend(expressed);
            } else {
                return "#ccc";
            }
    }); */

};

})(); // last line of main.js

// add pop-up with additional information (ex. link for fire councils)

// add legend

// add card panels to compare states.  model = eviction lab