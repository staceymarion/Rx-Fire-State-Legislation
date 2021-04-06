# *Rx-Fire-State-Legislation*
#### By: Stacey Marion, Josh Riebe, Theodore Nguyen

## Final Project Proposal

## Persona/Scenario

**Persona: Wisconsin Prescribed Fire Council Legislative Committee member, policy advocate**

The higher-level goal of the legislative committee is to engage with lawmakers to suggest changes to Wisconsin state legislation regarding prescribed fire activity. Current laws are outdated and do not reflect our new recognition of the need for prescribed fire for ecological good, i.e., climate resiliency. The Wisconsin Department of Natural Resources (WDNR) traditionally opposes changes to current legislation because the proposed legislations are perceived to undermine WDNR authority and create risks for wildfire. However, the Wisconsin Prescribed Fire Council believes that current state laws are not supported by data. Given limited available data within the state, we believe that **comparing** Wisconsin’s fire laws to those of other states will express clearly that Wisconsin is slow to adopt progressive fire policies, which provide barriers to implementing prescribed fire to the level recommended for the resiliency of our natural plant communities. Other states with more progressive laws accomplish much more burning, even states with extremely high wildfire risk such as Florida. Our objective is to **compare**, **filter**, and **rank** Wisconsin’s fire-related laws to those of other states and compare outcomes, i.e., prescribed fire accomplished. While this domain of information is already available, an interactive map provides a quick and simple mechanism of obtaining the information, while also providing enough information to allow new investigative **insights**.

**Scenario:**

A Fire Council member has requested an audience with a State Representative and wants to brush up on her knowledge of discrepancies in state burn legislation, liability, and certification programs. As she opens the interactive map, the overview shows the entire US map (choropleth) with report card grades and annual acreage burned (proportional symbol). With her primary objective to refresh her memory of Wisconsin’s burn-related laws, she clicks on the state of Wisconsin to **#retrieve** state-specific attributes. She recalls that within the retrieval panel/pop-up, there are links to supplemental information about each current law and the Fire Council’s proposed changes. She clicks on the link to open a new browser where she quickly refreshes her memory. After accomplishing her initial info-seeking task, she then settles down to explore some of the attributes she is less familiar with, hoping to gain novel **insight** that she can share for her upcoming meeting with Representative Youngton. She is curious about the establishment of certified burn programs. She navigates to the “State-certified burn program” layer **menu** item and clicks the down arrow to expand an accordion **menu** revealing several year ranges: “Within last 1 year”, “Established 2-5 years ago”, “Established 5-10 years ago”, and “Established > 10 years ago”. She clicks each layer checkbox to reveal all 4 layers, categorized by different colors. She **identifies** some **#patterns** such as the South establishing burn programs much earlier than the West Coast or Midwest. Interestingly, Minnesota, Illinois, and Michigan all established certified burn programs within the last 5 years. She clicks on Illinois to **#retrieve** additional information and follow a link in the Illinois pop-up to the Illinois Prescribed Fire Council webpage on the state’s new burn certification program. 

Keywords: #expert #repeat-user #high-domain-knowledge #speed-of-use #compare #rank #associate #insight #context #menu-selection #identify #filter #high-motivation #high-map-reading-skill


## Requirements Document

### Representation

| Layer         | Source           | Proposed Symbolization  |
| ------------- |:----------------:| -----------------------:|
| Basemap | US states, Natural Earth | Generalized state boundary outlines. Adapt for different maps |
| Legend | 2020 National Rx Fire Report | Text content |
| State Fire Councils | 2020 National Rx Fire Report | Choropleth - nominal. + Text context/popup content as link |
| State Certified Burn Programs | 2020 National Rx Fire Report | Choropleth - nominal |
| Acres Burned Per State | 2020 National Rx Fire Report | Proportional symbol |
| State Burn Permit Requirements | 2020 National Rx Fire Report | Choropleth - nominal |
| State Burn Authorization Time | 2020 National Rx Fire Report | Choropleth - nominal |
| Rx Fire Trends | 2020 National Rx Fire Report | Choropleth - nominal |
| State Liability Law | 2020 National Rx Fire Report | Choropleth - nominal |
| Regional Summaries | 2020 National Rx Fire Report | Choropleth - nominal |
| State Rx Fire Legislation | Multiple. Internal: WhatOtherStatesAreDoing.wordx | Text context or popup content |
| State Fire Dashboards | Multiple. Internal: WhatOtherStatesAreDoing.wordx | Text context or popup content as link |
| Fire Regime | LANDFIRE | Overlay |
| Wildfire Potential? | TBD | Isopleth |
| State Budget | https://www.stateforesters.org/ | Proportional Symbol |
| Fire Risk (Actuarial Data) | Mitchell and XX 2006 https://prescribedfire.org/wp-content/uploads/2018/02/WIPFC-LiabilityLetter.pdf | Isopleth |
| New Legislation | TBD | Symbol or highlight  for new legislation (within 1 or 2 years?); provide link to law or brief on law update |
| Text Introduction | Ancillary information about prescribed burning | Text box |
| Report Card Grade | Develop scoring systems | Panel |
| Case Study | Consider having a pre-made case study | Create pre-guided case study using sequenced pop-ups |

### Interaction

| Name          | Description      | Operator                | Operand |
| ------------- |:----------------:| -----------------------:| -------:|
| State Hover | Hover over a state to trigger a popup with the state name and its associated attributes. | Retrieve: Objects | What: state name, associated attributes |
| Attribute (Accordion) Menu | Vertical side panel serves as tabs for maps with a single attribute. | Resymbolize: Attributes | What: tabs with single attribute |
| Query Panel | Modify the prepopulated parameters displayed on the map to reveal only states with specified number of fire legislations. | Filter: Location | Where: location of state |
| Results Panel | Display results from the query panel on the states which match the users' criterion. | Sequence: Objects | What: results from user's input |
| Compare | Comparison tool allows qualitative visualization of varying states of interest, i.e., comparing to states with more burning. Visualization utilizing a side-by-side panel represents each state with a number of key attributes, which can be ranked. | Filter, Retrieve: Objects | Where: Location, Who: name of the state, What: comparison of different states by filtering and ranking different attributes |
| Timeline | Scroll through different years to receive information on the year in which fire legislations were created by state. | Sequence: Objects | When: year that fire legislation was created (ex: 2018) |
| Share | Create a URL to share the map at its current modifications, which can be copied manually by the user. | Export: Location & attributes | What: user may use url to save work |

3. Wireframes

Host image url on imgur

<img src="https://i.imgur.com/WnKBZ3K.jpeg" width="250" height="250">

## **Dependencies:**
* [JQuery 3.5.1](https://jquery.com/)
* [D3 6.6.0](https://d3js.org/)

## **Code Version:**
Last Updated: 2 April, 2021

## **Description:**
This interactive choropleth and proportional symbol map, built using D3 and JQuery, demonstrates the fire legislation in various cities across the U.S.

