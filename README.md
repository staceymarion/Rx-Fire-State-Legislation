# Team Name: *Rx-Fire-State-Legislation*

### Team Members: 
Stacey Marion, Josh Riebe, Theodore Nguyen

### FINAL PROJECT PROPOSAL:

1. Persona/Scenario

Persona 1: Insurance agent, policy stakeholder
Jeb Sharp is an agent with Embers Insurance Agency, Inc, a Midwest-based agency that brokers a variety of insurance services. A prospective client, working as a small land management contractor, approaches Sharp about acquiring insurance to cover a new service that they are offering: prescribed burning. Embers has never previously connected a client with a burn insurance underwriter. Sharp has heard of prescribed burning; however, he is unfamiliar with how it is performed and what kinds of risks are involved. To negotiate a burn insurance carrier for clients, he will need to evaluate the risk of prescribed burning and determine whether there is reasonable client potential to warrant further investigation. Sharp first aims to identify #where burning is taking place, and where prescribed burning is #trending up, to generate #insight on where his potential target market is. Since Embers’ current clients are spread across the Midwest, Sharp additionally aims to #identify and #compare burn-related legislation and liability laws in his service states. Then, Sharp aims to assess the risk associated with prescribed burning to get a sense of reasonable insurance rates.

Scenario 1: 
Sharp’s client recommends that he look for guidance from the Wisconsin Prescribed Fire Council through their webpage link: https://prescribedfire.org/. Upon reading a short text introduction, he learns that getting burn insurance is a barrier for many small businesses, and sees an opportunity for market expansion. Excited about his prospects, he scrolls to the overview map showing the relative amount of burning. He notices that Midwest states are in the middle of the range. He then toggles the legend in the top left panel from “Prescribed fire burned acres” to “Prescribed Fire Trends” and gains #insight that the Midwest is trending up. Seeing the potential for a market, he then wants to #identify state’s burn-related legislation and liability laws. He #selects from the layer menu “Liability” and #compares different liability laws across the country. He notices that Wisconsin and Minnesota have strict liability, whereas Michigan has a gross negligence law. He then uses the #comparison tool, by selecting specific states of interest, to compare and #rank Wisconsin, Minnesota, Illinois, and Michigan. A report card of each state expands on the screen, #ranked by the state with the most burned acreage to the least burned acreage. After identifying these Midwest states as viable candidates for potential customers, he then moves to determine burn risk. He #selects “Rx Fire Risk and Damages” for the layer menu, filtering the map to just this specified attribute. He notices, qualitatively, that risks are greater in the South and West than in the Midwest, and determines that prescribed fire is moderately safe in the Midwest. He clicks on Wisconsin (Embers headquarters) to #identify specific risk in Wisconsin, and sees a link in the pop-up to an actuarial report of prescribed fire risk in 8 states.

Reference: https://prescribedfire.org/wp-content/uploads/2018/02/WIPFC-LiabilityLetter.pdf (2006)
Keywords: #compare #rank #associate #insight #context #menu-selection #identify #filter #qualitative-assessment #presentation, #exploration #low-domain-knowledge #tech-skills-unknown


Persona 2: State representative, policymaker
A member of the Wisconsin Prescribed Fire Council requests an audience with Representative Lauren Youngton (Assembly District 92) to discuss proposed changes to prescribed fire-related laws. The Fire Council member claims to represent multiple small businesses who believe that current laws are antiquated and antagonistic toward businesses. In preparation for their meeting, a Fire Council member shares a link to an interactive map showing state prescribed fire-related liability, legislation, burn certification programs, and prescribed fire outcomes (burned acreage). Representative Youngton wants to know how Wisconsin laws stack up with other states; and if in need of revision, Youngton sets intentions to identify states with model legislation and burn programs. 

Scenario 2: 
Representative Youngton first wants to #identify what burn legislation is in question. Upon looking at the overview map, she notices that Wisconsin has a report card of C, whereas nearby states like Illinois and Michigan have report card grades of A. Curious about why Wisconsin #ranks poorly, she uses the #compare tool, to compare Wisconsin to a few nearby states who rank better. She scans over the limited number of attributes in the comparison panels and notices that Minnesota accomplishes nearly twice as much burning as Wisconsin and #associates the amount of accomplished burning with one key difference in legislation compared to Wisconsin: Minnesota has a state-certified burn program. Curious about this association, she navigates to the layer menu selection “State burn certification programs”. The map refreshes to show a categorial choropleth map showing states with or without a burn certification program, overlaid with proportional symbols representing prescribed burn acres. Youngton notices a #trend that states with burn certification programs generally accomplish more burning. She makes note of this finding as she readies herself for her upcoming meeting. 

Keywords: #presentation #compare #rank #associate #trend #identify #entry-level #low-motivation #limited-time-investment


Persona 3: Wisconsin Prescribed Fire Council Legislative Committee member, policy advocate
The higher-level goal of the legislative committee is to engage with lawmakers to suggest changes to Wisconsin state legislation regarding prescribed fire activity. Current laws are outdated and do not reflect our new recognition of the need for prescribed fire for ecological good, i.e., climate resiliency. The Wisconsin Department of Natural Resources (WDNR) traditionally opposes changes to current legislation because the proposed legislations are perceived to undermine WDNR authority and create risks for wildfire. However, the Wisconsin Prescribed Fire Council believes that current state laws are not supported by data. Given limited available data within the state, we believe that comparing Wisconsin’s fire laws to those of other states will express clearly that Wisconsin is slow to adopt progressive fire policies, which provide barriers to implementing prescribed fire to the level recommended for the resiliency of our natural plant communities. Other states with more progressive laws accomplish much more burning, even states with extremely high wildfire risk such as Florida. Our objective is to compare Wisconsin’s fire-related laws to those of other states and compare outcomes, i.e., prescribed fire accomplished. While this domain of information is already available, an interactive map provides a quick and simple mechanism of obtaining the information, while also providing enough information to allow new investigative insights

Scenario 3:
A Fire Council member has requested an audience with a State Representative and wants to brush up on her knowledge of discrepancies in state burn legislation, liability, and certification programs. As she opens the interactive map, the overview shows the entire US map (choropleth) with report card grades and annual acreage burned (proportional symbol). With her primary objective to refresh her memory of Wisconsin’s burn-related laws, she clicks on the state of Wisconsin to #retrieve state-specific attributes. She recalls that within the retrieval panel/pop-up, there are links to supplemental information about each current law and the Fire Council’s proposed changes. She clicks on the link to open a new browser where she quickly refreshes her memory. After accomplishing her initial info-seeking task, she then settles down to explore some of the attributes she is less familiar with, hoping to gain novel insight that she can share for her upcoming meeting with Representative Youngton. She is curious about the establishment of certified burn programs. She navigates to the “State-certified burn program” layer menu item and clicks the down arrow to expand an accordion menu revealing several year ranges: “Within last 1 year”, “Established 2-5 years ago”, “Established 5-10 years ago”, and “Established > 10 years ago”. She clicks each layer checkbox to reveal all 4 layers, categorized by different colors. She notices some #patterns such as the South establishing burn programs much earlier than the West Coast or Midwest. Interestingly, Minnesota, Illinois, and Michigan all established certified burn programs within the last 5 years. She clicks on Illinois to #retrieve additional information and follow a link in the Illinois pop-up to the Illinois Prescribed Fire Council webpage on the state’s new burn certification program. 

Keywords: #expert #repeat-user #high-domain-knowledge #speed-of-use #compare #rank #associate #insight #context #menu-selection #identify #filter #high-motivation #high-map-reading-skill


2. Requirements Document



3. Wireframes

### **Dependencies:**
* [JQuery 3.5.1](https://jquery.com/)
* [D3 6.6.0](https://d3js.org/)

### **Code Version:**
Last Updated: 2 April, 2021

### **Description:**
This interactive proportional symbol map, built using D3, demonstrates the fire legislation in various cities across the U.S.

