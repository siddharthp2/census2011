// Dimensions of sunburst.
var width = 700;
var height = 598;
var radius = Math.min(width, height) / 2.20;
var state_name=[];

var colors = {
	"Literate":"#d9be41",
	"IlLiterate":"#c2ac44",
	
	"Below primary":"#FFF177",
	"Graduate and above" : "#FEE73F",
	"Higher secondary" : "#FFED59",
	"Technical diploma" : "#FBBD2A",
	"Primary" : "#FDDA46",
	
	"Male" : "#FAF0B5",
	"Female" : "#F4D161",
	
	"0 to 18":"#E68523",
	"19 to 24":"#F9D291",
	"25 to 34":"#EC9F48",
	"35 to 44":"#FFEBB6",
	"45 and above":"#F3B86D",
	
	"UTTAR PRADESH": "#2C210D",
	"BIHAR": "#372E11", 
	"MAHARASHTRA": "#70632C",
	"ANDHRA PRADESH": "#4C4018",
	"WEST BENGAL": "#70632C",
	"MADHYA PRADESH": "#B8A54A",
	"KARNATAKA": "#D0BC55",
	"RAJASTHAN": "#927F3B",
	"TAMIL NADU": "#867733",
	"GUJARAT": "#CEBA54",
	"HIMACHAL PRADESH": "#F1E767",
	"ODISHA": "#D2BE56",
	"JHARKHAND": "#DCC856",
	"ASSAM": "#D2BE56",
	"HARYANA": "#C8BF3D",
	"PUNJAB": "#CFCB34",
	"KERALA": "#DCC858",
	"SIKKIM": "#D4D32E",
	"UTTARAKHAND": "#D7D92A",
	"JAMMU & KASHMIR": "#D8DB27",
	"CHANDIGARH": "#fff",
	"NCT OF DELHI": "#DBDF25",
	"ARUNACHAL PRADESH": "#020202",
	"CHHATTISGARH": "#D5D52D",
	"DAMAN & DIU": "#F8FFAE",
	"GOA": "#67B26F",
	"PUDUCHERRY": "#ff6a00",
	"MIZORAM" : "#67B26F"
};

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var vis = d3.select("#sunburst").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
d3.text("../data/visit-sequences.csv", function(text) {
  var csv = d3.csv.parseRows(text);
  var json = buildHierarchy(csv);
  createVisualization(json);
});

// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name]; })
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
 };

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  var sequenceArray = getAncestors(d);
//  updateBreadcrumbs(sequenceArray, percentageString);
//	console.log(sequenceArray);
//	Line draw function
	function draw_lines() {
		//initial start point ..from state name
		point_x1 = 112;
		point_y1 = 106;
		//1st mid point for turn to bring on the center line.
		point_x2 = 112;
		point_y2 = 47;
		//end point.
		point_x3 = 284;
		point_y3 = 47;

		var bgsvg = d3.select("#myBgSvg");

		bgsvg.append("circle")
			.attr("class", "animate-circle-1")
			.attr("cx", point_x1)
			.attr("cy", point_y1)
			.style("fill", "#F4AC00")
			.attr("r", 5)

		var line_C_1 = bgsvg.append("line")
			.attr("class", "line-animate c-1")
			.attr("x1", point_x1)
			.attr("y1", point_y1)
			.attr("x2", point_x1)
			.attr("y2", point_y1)
			.style("stroke", "#F4AC00");
		line_C_1.transition()
			.duration("800")
			.delay("200")
			.attr("x2", point_x2)
			.attr("y2", point_y2)

		setTimeout(function () {
			var line_C_2 = bgsvg.append("line")
				.attr("class", "line-animate c-2")
				.attr("x1", point_x2)
				.attr("y1", point_y2)
				.attr("x2", point_x2)
				.attr("y2", point_y2)
				.style("stroke", "#F4AC00");
			line_C_2.transition()
				.duration("800")
				.delay("200")
				.attr("x2", point_x3)
				.attr("y2", point_y3)


			setTimeout(function () {
				bgsvg.append("circle")
					.attr("class", "animate-circle-1")
					.attr("cx", point_x3)
					.attr("cy", point_y3)
					.style("fill", "#F4AC00")
					.attr("r", 5)
			}, 800)

		}, 800)
	}
	//	Line draw function
	
	
	
	//Age - bar chart code
function agegroup(){
	Highcharts.chart('age_bar', {
	chart: {
		type: 'bar',
		backgroundColor: null
	},
	title:{
		text:''
	},
	exporting: { enabled: false },
	credits: {  enabled: false  },
	xAxis: {
		minorTickLength: 0,
		tickLength: 0,
		lineWidth: 0,
		categories: ['0 -18', '19 - 25', '26 - 35', '36 - 45', '46 and above']
	},
	yAxis: {
		min: 0,
		labels:{enabled: false},
		gridLineWidth: 0,
		minorGridLineWidth: 0,
		title: {
		  text: ''
		 }
	},
	legend: {
		reversed: true
	},
	colors: [ '#373B47','#CD9600' ],
	plotOptions: {
		series: {
			showInLegend: false,   
			stacking: 'normal',
			pointPadding: 0,
			groupPadding: 0.1,
			borderWidth: 0
		} 
	},
	series: 
	[{
		name: 'Iliterate',
		data: [1, 3, 4, 7, 2]
	}, {
		name: 'Literate',
		data: [2, 2, 3, 2, 1]
	}]
	});	
}
	
	//Age - bar chart code
	
	function educationlevel(){
		//Education -bar chart 
		(function (H) {
			H.wrap(H.Tooltip.prototype, 'hide', function (p) {
				p.call(this);
				var tooltip = $("#hc-tooltip").highcharts();
				if (tooltip) {
					tooltip.destroy();
				}
			});
		})(Highcharts)

		$('#chartdiv').highcharts({

			  chart: {
				type: 'bar',
				backgroundColor: null
			},
			title:{
				text:''
			},
			exporting: { enabled: false },
			credits: {  enabled: false  },
			xAxis: {
				minorTickLength: 0,
				tickLength: 0,
				lineWidth: 0,
				labels:{enabled: false},
				categories: ['Apples']
			},
			yAxis: {
				min: 0,
				labels:{enabled: false},
				gridLineWidth: 0,
				minorGridLineWidth: 0,
				title: {
				  text: ''
				 }
			},
			legend: {
				reversed: true
			},
			colors: [ '#373B47', '#FFD879','#FFC32D', '#D29500', '#F4AC00'],
			plotOptions: {
				series: {
					showInLegend: false,   
					stacking: 'normal',
					pointPadding: 0,
					groupPadding: 0.1,
					borderWidth: 0
				}
			},

		 tooltip: {
				backgroundColor: "rgba(255,255,255,0)",
				borderWidth: 0,
				shadow: false,
				useHTML: true,

					  positioner: function () {
							return { x: 25, y: -90 };
						}
					,
				formatter: function () {
					setTimeout(function () {
						$("#hc-tooltip").highcharts({
							 chart: {
								plotBackgroundColor: null,
								plotBorderWidth: 0,
								plotShadow: false,
								marginTop: -120,
								backgroundColor: null
							},
							title: {
							   useHTML: true,
								text: "<img src='img/mf.png' class='tooltip-img' height='42' width='82' />",
								align: 'center',
								verticalAlign: 'middle',
								y: 0
							},

							exporting: { enabled: false },
							credits: {  enabled: false  },
							plotOptions: {
								pie: {
									dataLabels: {
										enabled: false,
										distance: -50,
										style: {
											fontWeight: 'bold',
											color: 'white'
										}
									},
									startAngle: -90,
									endAngle: 90,
									center: ['50%', '75%']
								}
							},
							 series: [{
					type: 'pie',
					name: 'Browser share',
					innerSize: '70%',
					data: [{
						name: 'Male',
						y: 40,
						color: '#d29500' 
					},
					{
						name: 'Female',
						y: 50,
						color: '#ffd979' 
					}                  


					]
				}]
						});
					}, 40)
		return '<div id="stacked_tooltip"><div class="row heading-test"><div class="edu-head-row">Education without Literacy</div></div><div class="edu-tool-dot-l"></div><div class="border-btm"></div><div class="edu-tool-dot-r"></div><div class="row"><div class="col-md-6"><div class="row edu-absolute-no"><center><h2 id="edu_absolute_no">2,396</h2></center></div><div class="row edu-percentage"><center><h5 id="edu_absolute_no">(35%)</h5></center></div></div><div class="col-md-6"><div id="hc-tooltip"></div></div></div><div>';
				}
			},

			series: [
			{
				name: 'John',
				data: [5]
			},
			{
				name: 'Jane',
				data: [2]
			},
			{
				name: 'John',
				data: [5]
			},
			{
				name: 'Jane',
				data: [2]
			},
				{
				name: 'Jane',
				data: [2]
			}
			]

			});
		}
		//Education -bar chart 
	
	function uttarPradesh(){
		
		var chart = $('#mapId').highcharts();
		chart.series[0].data[31].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[4].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[9].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "UTTAR PRADESH": {
				"Illiterate":"0.16K",
				"Literate":"0.84K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"40.36%",
				"Male":"59.64%"
			  }
			}
			
			$("#literateID").empty().append(statedata["UTTAR PRADESH"].Literate);
			$("#illiterateID").empty().append(statedata["UTTAR PRADESH"].Illiterate);
			console.log(statedata["UTTAR PRADESH"].Illiterate);
			console.log(statedata["UTTAR PRADESH"]["0-18"]);
			console.log(statedata["UTTAR PRADESH"]["19-24"]);
			console.log(statedata["UTTAR PRADESH"]["25-34"]);
			console.log(statedata["UTTAR PRADESH"]["35-44"]);
			console.log(statedata["UTTAR PRADESH"]["45 and above"]);
			console.log(statedata["UTTAR PRADESH"]["Below primary"]);
			console.log(statedata["UTTAR PRADESH"].Primary);
			console.log(statedata["UTTAR PRADESH"]["Higher secondary"]);
			console.log(statedata["UTTAR PRADESH"]["Graduate and above"]);
			console.log(statedata["UTTAR PRADESH"]["Technical Diploma"]);
			$("#malepercent").empty().append(statedata["UTTAR PRADESH"].Male);
			$("#femalepercent").empty().append(statedata["UTTAR PRADESH"].Female);
			
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
		
			agegroup();
			educationlevel();
		
	}
	function bihar(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[4].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[9].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "BIHAR": {
				"Illiterate":"0.32K",
				"Literate":"0.68K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"39.80%",
				"Male":"60.20%"
			  }
			}
			$("#literateID").empty().append(statedata["BIHAR"].Literate);
			$("#illiterateID").empty().append(statedata["BIHAR"].Illiterate);
			console.log(statedata["BIHAR"]["0-18"]);
			console.log(statedata["BIHAR"]["19-24"]);
			console.log(statedata["BIHAR"]["25-34"]);
			console.log(statedata["BIHAR"]["35-44"]);
			console.log(statedata["BIHAR"]["45 and above"]);
			console.log(statedata["BIHAR"]["Below primary"]);
			console.log(statedata["BIHAR"].Primary);
			console.log(statedata["BIHAR"]["Higher secondary"]);
			console.log(statedata["BIHAR"]["Graduate and above"]);
			console.log(statedata["BIHAR"]["Technical Diploma"]);
			$("#malepercent").empty().append(statedata["BIHAR"].Male);
			$("#femalepercent").empty().append(statedata["BIHAR"].Female);
		
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
		
			agegroup();
			educationlevel();
	}
	function himachalPradesh(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[20].graphic.attr({ fill: '#F1B306' }); 		
		chart.series[0].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[9].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "HIMACHAL PRADESH": {
				"Illiterate":"0.15K",
				"Literate":"0.85K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"45.37%",
				"Male":"54.63%"
			  }
			}
			$("#literateID").empty().append(statedata["HIMACHAL PRADESH"].Literate);
			$("#illiterateID").empty().append(statedata["HIMACHAL PRADESH"].Illiterate);
			console.log(statedata["HIMACHAL PRADESH"]["0-18"]);
			console.log(statedata["HIMACHAL PRADESH"]["19-24"]);
			console.log(statedata["HIMACHAL PRADESH"]["25-34"]);
			console.log(statedata["HIMACHAL PRADESH"]["35-44"]);
			console.log(statedata["HIMACHAL PRADESH"]["45 and above"]);
			console.log(statedata["HIMACHAL PRADESH"]["Below primary"]);
			console.log(statedata["HIMACHAL PRADESH"].Primary);
			console.log(statedata["HIMACHAL PRADESH"]["Higher secondary"]);
			console.log(statedata["HIMACHAL PRADESH"]["Graduate and above"]);
			console.log(statedata["HIMACHAL PRADESH"]["Technical Diploma"]);
			console.log(statedata["HIMACHAL PRADESH"].Male);
			console.log(statedata["HIMACHAL PRADESH"].Female);
			$("#malepercent").empty().append(statedata["HIMACHAL PRADESH"].Male);
			$("#femalepercent").empty().append(statedata["HIMACHAL PRADESH"].Female);
		
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
			$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
		
			agegroup();
			educationlevel();
	}
	
	function chandigarh(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[19].graphic.attr({ fill: '#F1B306' });
		chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[9].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "CHANDIGARH": {
				"Illiterate":"0.26K",
				"Literate":"0.74K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"42.21%",
				"Male":"57.79%"
			  }
			}
			$("#literateID").empty().append(statedata["CHANDIGARH"].Literate);
			$("#illiterateID").empty().append(statedata["CHANDIGARH"].Illiterate);
			console.log(statedata["CHANDIGARH"]["0-18"]);
			console.log(statedata["CHANDIGARH"]["19-24"]);
			console.log(statedata["CHANDIGARH"]["25-34"]);
			console.log(statedata["CHANDIGARH"]["35-44"]);
			console.log(statedata["CHANDIGARH"]["45 and above"]);
			console.log(statedata["CHANDIGARH"]["Below primary"]);
			console.log(statedata["CHANDIGARH"].Primary);
			console.log(statedata["CHANDIGARH"]["Higher secondary"]);
			console.log(statedata["CHANDIGARH"]["Graduate and above"]);
			console.log(statedata["CHANDIGARH"]["Technical Diploma"]);
			console.log(statedata["CHANDIGARH"].Male);
			console.log(statedata["CHANDIGARH"].Female);
			$("#malepercent").empty().append(statedata["CHANDIGARH"].Male);
			$("#femalepercent").empty().append(statedata["CHANDIGARH"].Female);
		
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
		
			agegroup();
			educationlevel();
	}
	function uttarakhand(){
		var chart = $('#mapId').highcharts(); 
		chart.series[0].data[32].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[6].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[9].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[4].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "UTTARAKHAND": {
				"Illiterate":"0.17K",
				"Literate":"0.83K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"43.84%",
				"Male":"56.16%"
			  }
			}
			$("#literateID").empty().append(statedata["UTTARAKHAND"].Literate);
			$("#illiterateID").empty().append(statedata["UTTARAKHAND"].Illiterate);
			console.log(statedata["UTTARAKHAND"]["0-18"]);
			console.log(statedata["UTTARAKHAND"]["19-24"]);
			console.log(statedata["UTTARAKHAND"]["25-34"]);
			console.log(statedata["UTTARAKHAND"]["35-44"]);
			console.log(statedata["UTTARAKHAND"]["45 and above"]);
			console.log(statedata["UTTARAKHAND"]["Below primary"]);
			console.log(statedata["UTTARAKHAND"].Primary);
			console.log(statedata["UTTARAKHAND"]["Higher secondary"]);
			console.log(statedata["UTTARAKHAND"]["Graduate and above"]);
			console.log(statedata["UTTARAKHAND"]["Technical Diploma"]);
			console.log(statedata["UTTARAKHAND"].Male);
			console.log(statedata["UTTARAKHAND"].Female);
			$("#malepercent").empty().append(statedata["UTTARAKHAND"].Male);
			$("#femalepercent").empty().append(statedata["UTTARAKHAND"].Female);
		
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
		
			agegroup();
			educationlevel();
	}
	function sikkim(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[5].graphic.attr({ fill: '#F1B306' });
		chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[9].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "SIKKIM": {
				"Illiterate":"0.30K",
				"Literate":"0.70K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"44.00%",
				"Male":"56.00%"
			  }
			}
			$("#literateID").empty().append(statedata["SIKKIM"].Literate);
			$("#illiterateID").empty().append(statedata["SIKKIM"].Illiterate);
			console.log(statedata["SIKKIM"]["0-18"]);
			console.log(statedata["SIKKIM"]["19-24"]);
			console.log(statedata["SIKKIM"]["25-34"]);
			console.log(statedata["SIKKIM"]["35-44"]);
			console.log(statedata["SIKKIM"]["45 and above"]);
			console.log(statedata["SIKKIM"]["Below primary"]);
			console.log(statedata["SIKKIM"].Primary);
			console.log(statedata["SIKKIM"]["Higher secondary"]);
			console.log(statedata["SIKKIM"]["Graduate and above"]);
			console.log(statedata["SIKKIM"]["Technical Diploma"]);
			console.log(statedata["SIKKIM"].Male);
			console.log(statedata["SIKKIM"].Female);
			$("#malepercent").empty().append(statedata["SIKKIM"].Male);
			$("#femalepercent").empty().append(statedata["SIKKIM"].Female);
			
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function chhattisgarh(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[6].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[9].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[4].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "CHHATTISGARH": {
				"Illiterate":"0.26K",
				"Literate":"0.74K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"42.72%",
				"Male":"57.28%"
			  }
			}
			$("#literateID").empty().append(statedata["CHHATTISGARH"].Literate);
			$("#illiterateID").empty().append(statedata["CHHATTISGARH"].Illiterate);
			console.log(statedata["CHHATTISGARH"]["0-18"]);
			console.log(statedata["CHHATTISGARH"]["19-24"]);
			console.log(statedata["CHHATTISGARH"]["25-34"]);
			console.log(statedata["CHHATTISGARH"]["35-44"]);
			console.log(statedata["CHHATTISGARH"]["45 and above"]);
			console.log(statedata["CHHATTISGARH"]["Below primary"]);
			console.log(statedata["CHHATTISGARH"].Primary);
			console.log(statedata["CHHATTISGARH"]["Higher secondary"]);
			console.log(statedata["CHHATTISGARH"]["Graduate and above"]);
			console.log(statedata["CHHATTISGARH"]["Technical Diploma"]);
			console.log(statedata["CHHATTISGARH"].Male);
			console.log(statedata["CHHATTISGARH"].Female);
			$("#malepercent").empty().append(statedata["CHHATTISGARH"].Male);
			$("#femalepercent").empty().append(statedata["CHHATTISGARH"].Female);
			
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function gujrat(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[9].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[4].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "GUJARAT": {
				"Illiterate":"0.26K",
				"Literate":"0.74K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"43.85%",
				"Male":"57.15%"
			  }
			}
			$("#literateID").empty().append(statedata["GUJARAT"].Literate);
			$("#illiterateID").empty().append(statedata["GUJARAT"].Illiterate);
			console.log(statedata["GUJARAT"]["0-18"]);
			console.log(statedata["GUJARAT"]["19-24"]);
			console.log(statedata["GUJARAT"]["25-34"]);
			console.log(statedata["GUJARAT"]["35-44"]);
			console.log(statedata["GUJARAT"]["45 and above"]);
			console.log(statedata["GUJARAT"]["Below primary"]);
			console.log(statedata["GUJARAT"].Primary);
			console.log(statedata["GUJARAT"]["Higher secondary"]);
			console.log(statedata["GUJARAT"]["Graduate and above"]);
			console.log(statedata["GUJARAT"]["Technical Diploma"]);
			console.log(statedata["GUJARAT"].Male);
			console.log(statedata["GUJARAT"].Female);
			$("#malepercent").empty().append(statedata["GUJARAT"].Male);
			$("#femalepercent").empty().append(statedata["GUJARAT"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function andhra(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[27].graphic.attr({ fill: '#F1B306' });
		chart.series[0].data[4].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[31].graphic.attr({ fill: '#959595' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' });	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "ANDHRA PRADESH": {
				"Illiterate":"0.21K",
				"Literate":"0.79K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"42.12%",
				"Male":"55.88%"
			  }
			}
			$("#literateID").empty().append(statedata["ANDHRA PRADESH"].Literate);
			$("#illiterateID").empty().append(statedata["ANDHRA PRADESH"].Illiterate);
			console.log(statedata["ANDHRA PRADESH"]["0-18"]);
			console.log(statedata["ANDHRA PRADESH"]["19-24"]);
			console.log(statedata["ANDHRA PRADESH"]["25-34"]);
			console.log(statedata["ANDHRA PRADESH"]["35-44"]);
			console.log(statedata["ANDHRA PRADESH"]["45 and above"]);
			console.log(statedata["ANDHRA PRADESH"]["Below primary"]);
			console.log(statedata["ANDHRA PRADESH"].Primary);
			console.log(statedata["ANDHRA PRADESH"]["Higher secondary"]);
			console.log(statedata["ANDHRA PRADESH"]["Graduate and above"]);
			console.log(statedata["ANDHRA PRADESH"]["Technical Diploma"]);
			console.log(statedata["ANDHRA PRADESH"].Male);
			console.log(statedata["ANDHRA PRADESH"].Female);
			$("#malepercent").empty().append(statedata["ANDHRA PRADESH"].Male);
			$("#femalepercent").empty().append(statedata["ANDHRA PRADESH"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function arunachal(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[13].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 
		chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "ARUNACHAL PRADESH": {
				"Illiterate":"0.24K",
				"Literate":"0.76K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"42.59%",
				"Male":"57.41%"
			  }
			}
			$("#literateID").empty().append(statedata["ARUNACHAL PRADESH"].Literate);
			$("#illiterateID").empty().append(statedata["ARUNACHAL PRADESH"].Illiterate);
			console.log(statedata["ARUNACHAL PRADESH"]["0-18"]);
			console.log(statedata["ARUNACHAL PRADESH"]["19-24"]);
			console.log(statedata["ARUNACHAL PRADESH"]["25-34"]);
			console.log(statedata["ARUNACHAL PRADESH"]["35-44"]);
			console.log(statedata["ARUNACHAL PRADESH"]["45 and above"]);
			console.log(statedata["ARUNACHAL PRADESH"]["Below primary"]);
			console.log(statedata["ARUNACHAL PRADESH"].Primary);
			console.log(statedata["ARUNACHAL PRADESH"]["Higher secondary"]);
			console.log(statedata["ARUNACHAL PRADESH"]["Graduate and above"]);
			console.log(statedata["ARUNACHAL PRADESH"]["Technical Diploma"]);
			console.log(statedata["ARUNACHAL PRADESH"].Male);
			console.log(statedata["ARUNACHAL PRADESH"].Female);
			$("#malepercent").empty().append(statedata["ARUNACHAL PRADESH"].Male);
			$("#femalepercent").empty().append(statedata["ARUNACHAL PRADESH"].Female);
			
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function delhi(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[17].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "NCT OF NCT OF DELHI": {
				"Illiterate":"0.15K",
				"Literate":"0.85K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"43.51%",
				"Male":"56.49%"
			  }
			}
			$("#literateID").empty().append(statedata["NCT OF DELHI"].Literate);
			$("#illiterateID").empty().append(statedata["NCT OF DELHI"].Illiterate);
			console.log(statedata["NCT OF DELHI"]["0-18"]);
			console.log(statedata["NCT OF DELHI"]["19-24"]);
			console.log(statedata["NCT OF DELHI"]["25-34"]);
			console.log(statedata["NCT OF DELHI"]["35-44"]);
			console.log(statedata["NCT OF DELHI"]["45 and above"]);
			console.log(statedata["NCT OF DELHI"]["Below primary"]);
			console.log(statedata["NCT OF DELHI"].Primary);
			console.log(statedata["NCT OF DELHI"]["Higher secondary"]);
			console.log(statedata["NCT OF DELHI"]["Graduate and above"]);
			console.log(statedata["NCT OF DELHI"]["Technical Diploma"]);
			console.log(statedata["NCT OF DELHI"].Male);
			console.log(statedata["NCT OF DELHI"].Female);
			$("#malepercent").empty().append(statedata["NCT OF DELHI"].Male);
			$("#femalepercent").empty().append(statedata["NCT OF DELHI"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function daman(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[24].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "DAMAN and DIU": {
				"Illiterate":"0.18K",
				"Literate":"0.82K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"33.84%",
				"Male":"66.16%"
			  }
			}
			
			$("#literateID").empty().append(statedata["DAMAN and DIU"].Literate);
			$("#illiterateID").empty().append(statedata["DAMAN and DIU"].Illiterate);
			console.log(statedata["DAMAN and DIU"]["0-18"]);
			console.log(statedata["DAMAN and DIU"]["19-24"]);
			console.log(statedata["DAMAN and DIU"]["25-34"]);
			console.log(statedata["DAMAN and DIU"]["35-44"]);
			console.log(statedata["DAMAN and DIU"]["45 and above"]);
			console.log(statedata["DAMAN and DIU"]["Below primary"]);
			console.log(statedata["DAMAN and DIU"].Primary);
			console.log(statedata["DAMAN and DIU"]["Higher secondary"]);
			console.log(statedata["DAMAN and DIU"]["Graduate and above"]);
			console.log(statedata["DAMAN and DIU"]["Technical Diploma"]);
			console.log(statedata["DAMAN and DIU"].Male);
			console.log(statedata["DAMAN and DIU"].Female);
			$("#malepercent").empty().append(statedata["DAMAN and DIU"].Male);
			$("#femalepercent").empty().append(statedata["DAMAN and DIU"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/30-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/80-m.png'>");	
			agegroup();
			educationlevel();
	}
	function assam(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[26].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[9].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[4].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "ASSAM": {
				"Illiterate":"0.29K",
				"Literate":"0.71K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"44.90%",
				"Male":"55.10%"
			  }
			}
			$("#literateID").empty().append(statedata["ASSAM"].Literate);
			$("#illiterateID").empty().append(statedata["ASSAM"].Illiterate);
			
			console.log(statedata["ASSAM"]["0-18"]);
			console.log(statedata["ASSAM"]["19-24"]);
			console.log(statedata["ASSAM"]["25-34"]);
			console.log(statedata["ASSAM"]["35-44"]);
			console.log(statedata["ASSAM"]["45 and above"]);
			console.log(statedata["ASSAM"]["Below primary"]);
			console.log(statedata["ASSAM"].Primary);
			console.log(statedata["ASSAM"]["Higher secondary"]);
			console.log(statedata["ASSAM"]["Graduate and above"]);
			console.log(statedata["ASSAM"]["Technical Diploma"]);
			console.log(statedata["ASSAM"].Male);
			console.log(statedata["ASSAM"].Female);
			$("#malepercent").empty().append(statedata["ASSAM"].Male);
			$("#femalepercent").empty().append(statedata["ASSAM"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function goa(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[10].graphic.attr({ fill: '#F1B306' });	
		chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "GOA": {
				"Illiterate":"0.23K",
				"Literate":"0.77K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"47.10",
				"Male":"52.90%"
			  }
			}
			$("#literateID").empty().append(statedata["GOA"].Literate);
			$("#illiterateID").empty().append(statedata["GOA"].Illiterate);
		
			console.log(statedata["GOA"]["0-18"]);
			console.log(statedata["GOA"]["19-24"]);
			console.log(statedata["GOA"]["25-34"]);
			console.log(statedata["GOA"]["35-44"]);
			console.log(statedata["GOA"]["45 and above"]);
			console.log(statedata["GOA"]["Below primary"]);
			console.log(statedata["GOA"].Primary);
			console.log(statedata["GOA"]["Higher secondary"]);
			console.log(statedata["GOA"]["Graduate and above"]);
			console.log(statedata["GOA"]["Technical Diploma"]);
			console.log(statedata["GOA"].Male);
			console.log(statedata["GOA"].Female);
			$("#malepercent").empty().append(statedata["GOA"].Male);
			$("#femalepercent").empty().append(statedata["GOA"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
			agegroup();
			educationlevel();
		}
	function puducherry(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[7].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "PUDUCHERRY": {
				"Illiterate":"0.12K",
				"Literate":"0.88K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"48.02",
				"Male":"51.98%"
			  }
			}
			$("#literateID").empty().append(statedata["PUDUCHERRY"].Literate);
			$("#illiterateID").empty().append(statedata["PUDUCHERRY"].Illiterate);
			
			console.log(statedata["PUDUCHERRY"]["0-18"]);
			console.log(statedata["PUDUCHERRY"]["19-24"]);
			console.log(statedata["PUDUCHERRY"]["25-34"]);
			console.log(statedata["PUDUCHERRY"]["35-44"]);
			console.log(statedata["PUDUCHERRY"]["45 and above"]);
			console.log(statedata["PUDUCHERRY"]["Below primary"]);
			console.log(statedata["PUDUCHERRY"].Primary);
			console.log(statedata["PUDUCHERRY"]["Higher secondary"]);
			console.log(statedata["PUDUCHERRY"]["Graduate and above"]);
			console.log(statedata["PUDUCHERRY"]["Technical Diploma"]);
			console.log(statedata["PUDUCHERRY"].Male);
			console.log(statedata["PUDUCHERRY"].Female);
			$("#malepercent").empty().append(statedata["PUDUCHERRY"].Male);
			$("#femalepercent").empty().append(statedata["PUDUCHERRY"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
			agegroup();
			educationlevel();
	}	
	function westbengal(){    
		var chart = $('#mapId').highcharts();
		chart.series[0].data[2].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "WEST BENGAL": {
				"Illiterate":"0.29K",
				"Literate":"0.71K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"45.05%",
				"Male":"54.95%"
			  }
			}
			$("#literateID").empty().append(statedata["WEST BENGAL"].Literate);
			$("#illiterateID").empty().append(statedata["WEST BENGAL"].Illiterate);
			console.log(statedata["WEST BENGAL"]["0-18"]);
			console.log(statedata["WEST BENGAL"]["19-24"]);
			console.log(statedata["WEST BENGAL"]["25-34"]);
			console.log(statedata["WEST BENGAL"]["35-44"]);
			console.log(statedata["WEST BENGAL"]["45 and above"]);
			console.log(statedata["WEST BENGAL"]["Below primary"]);
			console.log(statedata["WEST BENGAL"].Primary);
			console.log(statedata["WEST BENGAL"]["Higher secondary"]);
			console.log(statedata["WEST BENGAL"]["Graduate and above"]);
			console.log(statedata["WEST BENGAL"]["Technical Diploma"]);
			console.log(statedata["WEST BENGAL"].Male);
			console.log(statedata["WEST BENGAL"].Female);
			$("#malepercent").empty().append(statedata["WEST BENGAL"].Male);
			$("#femalepercent").empty().append(statedata["WEST BENGAL"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
			agegroup();
			educationlevel();
	}
	function haryana(){   
		var chart = $('#mapId').highcharts();
		chart.series[0].data[18].graphic.attr({ fill: '#F1B306' });
		chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[9].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[4].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "HARYANA": {
				"Illiterate":"0.17K",
				"Literate":"0.83K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"40.98%",
				"Male":"59.02%"
			  }
			}
			$("#literateID").empty().append(statedata["HARYANA"].Literate);
			$("#illiterateID").empty().append(statedata["HARYANA"].Illiterate);
			console.log(statedata["HARYANA"]["0-18"]);
			console.log(statedata["HARYANA"]["19-24"]);
			console.log(statedata["HARYANA"]["25-34"]);
			console.log(statedata["HARYANA"]["35-44"]);
			console.log(statedata["HARYANA"]["45 and above"]);
			console.log(statedata["HARYANA"]["Below primary"]);
			console.log(statedata["HARYANA"].Primary);
			console.log(statedata["HARYANA"]["Higher secondary"]);
			console.log(statedata["HARYANA"]["Graduate and above"]);
			console.log(statedata["HARYANA"]["Technical Diploma"]);
			console.log(statedata["HARYANA"].Male);
			console.log(statedata["HARYANA"].Female);
			$("#malepercent").empty().append(statedata["HARYANA"].Male);
			$("#femalepercent").empty().append(statedata["HARYANA"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function jandk(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[21].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "JAMMU & KASHMIR": {
				"Illiterate":"0.17K",
				"Literate":"0.83K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"39.66%",
				"Male":"60.34%"
			  }
			}
			$("#literateID").empty().append(statedata["JAMMU & KASHMIR"].Literate);
			$("#illiterateID").empty().append(statedata["JAMMU & KASHMIR"].Illiterate);
			console.log(statedata["JAMMU & KASHMIR"]["0-18"]);
			console.log(statedata["JAMMU & KASHMIR"]["19-24"]);
			console.log(statedata["JAMMU & KASHMIR"]["25-34"]);
			console.log(statedata["JAMMU & KASHMIR"]["35-44"]);
			console.log(statedata["JAMMU & KASHMIR"]["45 and above"]);
			console.log(statedata["JAMMU & KASHMIR"]["Below primary"]);
			console.log(statedata["JAMMU & KASHMIR"].Primary);
			console.log(statedata["JAMMU & KASHMIR"]["Higher secondary"]);
			console.log(statedata["JAMMU & KASHMIR"]["Graduate and above"]);
			console.log(statedata["JAMMU & KASHMIR"]["Technical Diploma"]);
			console.log(statedata["JAMMU & KASHMIR"].Male);
			console.log(statedata["JAMMU & KASHMIR"].Female);
			$("#malepercent").empty().append(statedata["JAMMU & KASHMIR"].Male);
			$("#femalepercent").empty().append(statedata["JAMMU & KASHMIR"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
		}
	function jharkhand(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[33].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' }); 
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "JHARKHAND": {
				"Illiterate":"0.28K",
				"Literate":"0.72K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"40.63%",
				"Male":"59.37%"
			  }
			}
			$("#literateID").empty().append(statedata["JHARKHAND"].Literate);
			$("#illiterateID").empty().append(statedata["JHARKHAND"].Illiterate);
			console.log(statedata["JHARKHAND"]["0-18"]);
			console.log(statedata["JHARKHAND"]["19-24"]);
			console.log(statedata["JHARKHAND"]["25-34"]);
			console.log(statedata["JHARKHAND"]["35-44"]);
			console.log(statedata["JHARKHAND"]["45 and above"]);
			console.log(statedata["JHARKHAND"]["Below primary"]);
			console.log(statedata["JHARKHAND"].Primary);
			console.log(statedata["JHARKHAND"]["Higher secondary"]);
			console.log(statedata["JHARKHAND"]["Graduate and above"]);
			console.log(statedata["JHARKHAND"]["Technical Diploma"]);
			console.log(statedata["JHARKHAND"].Male);
			console.log(statedata["JHARKHAND"].Female);
			$("#malepercent").empty().append(statedata["JHARKHAND"].Male);
			$("#femalepercent").empty().append(statedata["JHARKHAND"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function karnataka(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[23].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[4].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[9].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' });chart.series[0].data[22].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[26].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "KARNATAKA": {
				"Illiterate":"0.23K",
				"Literate":"0.77K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"44.62%",
				"Male":"55.38%"
			  }
			}
			$("#literateID").empty().append(statedata["KARNATAKA"].Literate);
			$("#illiterateID").empty().append(statedata["KARNATAKA"].Illiterate);
			console.log(statedata["KARNATAKA"]["0-18"]);
			console.log(statedata["KARNATAKA"]["19-24"]);
			console.log(statedata["KARNATAKA"]["25-34"]);
			console.log(statedata["KARNATAKA"]["35-44"]);
			console.log(statedata["KARNATAKA"]["45 and above"]);
			console.log(statedata["KARNATAKA"]["Below primary"]);
			console.log(statedata["KARNATAKA"].Primary);
			console.log(statedata["KARNATAKA"]["Higher secondary"]);
			console.log(statedata["KARNATAKA"]["Graduate and above"]);
			console.log(statedata["KARNATAKA"]["Technical Diploma"]);
			console.log(statedata["KARNATAKA"].Male);
			console.log(statedata["KARNATAKA"].Female);
			$("#malepercent").empty().append(statedata["KARNATAKA"].Male);
			$("#femalepercent").empty().append(statedata["KARNATAKA"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function kerala(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[22].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[26].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[9].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[4].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[13].graphic.attr({ fill: '#959595' });chart.series[0].data[8].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[10].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' });chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[20].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });chart.series[0].data[32].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[33].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "KERALA": {
				"Illiterate":"0.20K",
				"Literate":"0.80K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"51.29%",
				"Male":"48.71%"
			  }
			}
			$("#literateID").empty().append(statedata["KERALA"].Literate);
			$("#illiterateID").empty().append(statedata["KERALA"].Illiterate);			
			console.log(statedata["KERALA"]["0-18"]);
			console.log(statedata["KERALA"]["19-24"]);
			console.log(statedata["KERALA"]["25-34"]);
			console.log(statedata["KERALA"]["35-44"]);
			console.log(statedata["KERALA"]["45 and above"]);
			console.log(statedata["KERALA"]["Below primary"]);
			console.log(statedata["KERALA"].Primary);
			console.log(statedata["KERALA"]["Higher secondary"]);
			console.log(statedata["KERALA"]["Graduate and above"]);
			console.log(statedata["KERALA"]["Technical Diploma"]);
			console.log(statedata["KERALA"].Male);
			console.log(statedata["KERALA"].Female);
			$("#malepercent").empty().append(statedata["KERALA"].Male);
			$("#femalepercent").empty().append(statedata["KERALA"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
			agegroup();
			educationlevel();
	}
	function madhyaPradesh(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[8].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[30].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[25].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "MADHYA PRADESH": {
				"Illiterate":"0.17K",
				"Literate":"0.73K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"41.24%",
				"Male":"58.76%"
			  }
			}
			$("#literateID").empty().append(statedata["MADHYA PRADESH"].Literate);
			$("#illiterateID").empty().append(statedata["MADHYA PRADESH"].Illiterate);					
			console.log(statedata["MADHYA PRADESH"]["0-18"]);
			console.log(statedata["MADHYA PRADESH"]["19-24"]);
			console.log(statedata["MADHYA PRADESH"]["25-34"]);
			console.log(statedata["MADHYA PRADESH"]["35-44"]);
			console.log(statedata["MADHYA PRADESH"]["45 and above"]);
			console.log(statedata["MADHYA PRADESH"]["Below primary"]);
			console.log(statedata["MADHYA PRADESH"].Primary);
			console.log(statedata["MADHYA PRADESH"]["Higher secondary"]);
			console.log(statedata["MADHYA PRADESH"]["Graduate and above"]);
			console.log(statedata["MADHYA PRADESH"]["Technical Diploma"]);
			$("#malepercent").empty().append(statedata["MADHYA PRADESH"].Male);
			$("#femalepercent").empty().append(statedata["MADHYA PRADESH"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function maharashtra(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[25].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[12].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "MAHARASHTRA": {
				"Illiterate":"0.24K",
				"Literate":"0.76K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"44.46%",
				"Male":"55.54%"
			  }
			}
			$("#literateID").empty().append(statedata["MAHARASHTRA"].Literate);
			$("#illiterateID").empty().append(statedata["MAHARASHTRA"].Illiterate);		
			console.log(statedata["MAHARASHTRA"]["0-18"]);
			console.log(statedata["MAHARASHTRA"]["19-24"]);
			console.log(statedata["MAHARASHTRA"]["25-34"]);
			console.log(statedata["MAHARASHTRA"]["35-44"]);
			console.log(statedata["MAHARASHTRA"]["45 and above"]);
			console.log(statedata["MAHARASHTRA"]["Below primary"]);
			console.log(statedata["MAHARASHTRA"].Primary);
			console.log(statedata["MAHARASHTRA"]["Higher secondary"]);
			console.log(statedata["MAHARASHTRA"]["Graduate and above"]);
			console.log(statedata["MAHARASHTRA"]["Technical Diploma"]);			
			$("#malepercent").empty().append(statedata["MAHARASHTRA"].Male);
			$("#femalepercent").empty().append(statedata["MAHARASHTRA"].Female);
			
			$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function manipur(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[12].graphic.attr({ fill: '#F1B306' });
		chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
			  "MANIPUR": {
				"Illiterate":"0.17K",
				"Literate":"0.83K",
				"0-18":"0.26",
				"19-24":"0.16",
				"25-34":"0.25",
				"35-44":"0.17",
				"45 and above":"0.18",
				"Below primary":"0.16",
				"Graduate and above":"0.08",
				"Higher secondary":"0.11",
				"Primary":"0.62",
				"Technical Diploma":"0.02",
				"Female":"45.53%",
				"Male":"54.47%"
			  }
			}
			$("#literateID").empty().append(statedata["MANIPUR"].Literate);
			$("#illiterateID").empty().append(statedata["MANIPUR"].Illiterate);		
			console.log(statedata["MANIPUR"]["0-18"]);
			console.log(statedata["MANIPUR"]["19-24"]);
			console.log(statedata["MANIPUR"]["25-34"]);
			console.log(statedata["MANIPUR"]["35-44"]);
			console.log(statedata["MANIPUR"]["45 and above"]);
			console.log(statedata["MANIPUR"]["Below primary"]);
			console.log(statedata["MANIPUR"].Primary);
			console.log(statedata["MANIPUR"]["Higher secondary"]);
			console.log(statedata["MANIPUR"]["Graduate and above"]);
			console.log(statedata["MANIPUR"]["Technical Diploma"]);			
			$("#malepercent").empty().append(statedata["MANIPUR"].Male);
			$("#femalepercent").empty().append(statedata["MANIPUR"].Female);
		
			$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
			agegroup();
			educationlevel();
	}
	function meghalaya(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[28].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[12].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
		  "MEGHALAYA": {
			"Illiterate":"0.39K",
			"Literate":"0.61K",
			"0-18":"0.26",
			"19-24":"0.16",
			"25-34":"0.25",
			"35-44":"0.17",
			"45 and above":"0.18",
			"Below primary":"0.16",
			"Graduate and above":"0.08",
			"Higher secondary":"0.11",
			"Primary":"0.62",
			"Technical Diploma":"0.02",
			"Female":"48.83%",
			"Male":"51.17%"
		  }
		}
		$("#literateID").empty().append(statedata["MEGHALAYA"].Literate);
		$("#illiterateID").empty().append(statedata["MEGHALAYA"].Illiterate);		
		console.log(statedata["MEGHALAYA"]["0-18"]);
		console.log(statedata["MEGHALAYA"]["19-24"]);
		console.log(statedata["MEGHALAYA"]["25-34"]);
		console.log(statedata["MEGHALAYA"]["35-44"]);
		console.log(statedata["MEGHALAYA"]["45 and above"]);
		console.log(statedata["MEGHALAYA"]["Below primary"]);
		console.log(statedata["MEGHALAYA"].Primary);
		console.log(statedata["MEGHALAYA"]["Higher secondary"]);
		console.log(statedata["MEGHALAYA"]["Graduate and above"]);
		console.log(statedata["MEGHALAYA"]["Technical Diploma"]);
		$("#malepercent").empty().append(statedata["MEGHALAYA"].Male);
		$("#femalepercent").empty().append(statedata["MEGHALAYA"].Female);

		$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
		$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
		agegroup();
		educationlevel();
	}
	function mizoram(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[14].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[12].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[11].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
		  "MIZORAM": {
			"Illiterate":"0.27K",
			"Literate":"0.73K",
			"0-18":"0.26",
			"19-24":"0.16",
			"25-34":"0.25",
			"35-44":"0.17",
			"45 and above":"0.18",
			"Below primary":"0.16",
			"Graduate and above":"0.08",
			"Higher secondary":"0.11",
			"Primary":"0.62",
			"Technical Diploma":"0.02",
			"Female":"48.30%",
			"Male":"51.70%"
		  }
		}
		$("#literateID").empty().append(statedata["MIZORAM"].Literate);
		$("#illiterateID").empty().append(statedata["MIZORAM"].Illiterate);		
		console.log(statedata["MIZORAM"]["0-18"]);
		console.log(statedata["MIZORAM"]["19-24"]);
		console.log(statedata["MIZORAM"]["25-34"]);
		console.log(statedata["MIZORAM"]["35-44"]);
		console.log(statedata["MIZORAM"]["45 and above"]);
		console.log(statedata["MIZORAM"]["Below primary"]);
		console.log(statedata["MIZORAM"].Primary);
		console.log(statedata["MIZORAM"]["Higher secondary"]);
		console.log(statedata["MIZORAM"]["Graduate and above"]);
		console.log(statedata["MIZORAM"]["Technical Diploma"]);		
		$("#malepercent").empty().append(statedata["MIZORAM"].Male);
		$("#femalepercent").empty().append(statedata["MIZORAM"].Female);

		$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
		$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
		agegroup();
		educationlevel();
	}
	function nagaland(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[11].graphic.attr({ fill: '#F1B306' });
		chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[12].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[3].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
		  "NAGALAND": {
			"Illiterate":"0.25K",
			"Literate":"0.75K",
			"0-18":"0.26",
			"19-24":"0.16",
			"25-34":"0.25",
			"35-44":"0.17",
			"45 and above":"0.18",
			"Below primary":"0.16",
			"Graduate and above":"0.08",
			"Higher secondary":"0.11",
			"Primary":"0.62",
			"Technical Diploma":"0.02",
			"Female":"46.08%",
			"Male":"53.92%"
		  }
		}
		$("#literateID").empty().append(statedata["NAGALAND"].Literate);
		$("#illiterateID").empty().append(statedata["NAGALAND"].Illiterate);	
		console.log(statedata["NAGALAND"]["0-18"]);
		console.log(statedata["NAGALAND"]["19-24"]);
		console.log(statedata["NAGALAND"]["25-34"]);
		console.log(statedata["NAGALAND"]["35-44"]);
		console.log(statedata["NAGALAND"]["45 and above"]);
		console.log(statedata["NAGALAND"]["Below primary"]);
		console.log(statedata["NAGALAND"].Primary);
		console.log(statedata["NAGALAND"]["Higher secondary"]);
		console.log(statedata["NAGALAND"]["Graduate and above"]);
		console.log(statedata["NAGALAND"]["Technical Diploma"]);
		$("#malepercent").empty().append(statedata["NAGALAND"].Male);
		$("#femalepercent").empty().append(statedata["NAGALAND"].Female);
		
		$("#femaleimg").empty().append("<img class='mf-img' src='img/50-f.png'>");
		$("#maleimg").empty().append("<img class='mf-img-l' src='img/50-m.png'>");	
		agegroup();
		educationlevel();
	}
	function odisha(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[3].graphic.attr({ fill: '#F1B306' });
		chart.series[0].data[11].graphic.attr({ fill: '#959595' });chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[12].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[29].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[30].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
		  "ODISHA": {
			"Illiterate":"0.25K",
			"Literate":"0.75K",
			"0-18":"0.26",
			"19-24":"0.16",
			"25-34":"0.25",
			"35-44":"0.17",
			"45 and above":"0.18",
			"Below primary":"0.16",
			"Graduate and above":"0.08",
			"Higher secondary":"0.11",
			"Primary":"0.62",
			"Technical Diploma":"0.02",
			"Female":"43.58%",
			"Male":"56.42%"
		  }
		}
		$("#literateID").empty().append(statedata["ODISHA"].Literate);
		$("#illiterateID").empty().append(statedata["ODISHA"].Illiterate);		
		console.log(statedata["ODISHA"]["0-18"]);
		console.log(statedata["ODISHA"]["19-24"]);
		console.log(statedata["ODISHA"]["25-34"]);
		console.log(statedata["ODISHA"]["35-44"]);
		console.log(statedata["ODISHA"]["45 and above"]);
		console.log(statedata["ODISHA"]["Below primary"]);
		console.log(statedata["ODISHA"].Primary);
		console.log(statedata["ODISHA"]["Higher secondary"]);
		console.log(statedata["ODISHA"]["Graduate and above"]);
		console.log(statedata["ODISHA"]["Technical Diploma"]);
		$("#malepercent").empty().append(statedata["ODISHA"].Male);
		$("#femalepercent").empty().append(statedata["ODISHA"].Female);
		
		$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
		$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
		agegroup();
		educationlevel();
	}
	function punjab(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[29].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[3].graphic.attr({ fill: '#959595' });	chart.series[0].data[11].graphic.attr({ fill: '#959595' });chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[12].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[15].graphic.attr({ fill: '#959595' }); chart.series[0].data[30].graphic.attr({ fill: '#959595' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
		  "PUNJAB": {
			"Illiterate":"0.15K",
			"Literate":"0.85K",
			"0-18":"0.26",
			"19-24":"0.16",
			"25-34":"0.25",
			"35-44":"0.17",
			"45 and above":"0.18",
			"Below primary":"0.16",
			"Graduate and above":"0.08",
			"Higher secondary":"0.11",
			"Primary":"0.62",
			"Technical Diploma":"0.02",
			"Female":"44.21%",
			"Male":"55.79%"
		  }
		}
		$("#literateID").empty().append(statedata["PUNJAB"].Literate);
		$("#illiterateID").empty().append(statedata["PUNJAB"].Illiterate);		
		console.log(statedata["PUNJAB"]["0-18"]);
		console.log(statedata["PUNJAB"]["19-24"]);
		console.log(statedata["PUNJAB"]["25-34"]);
		console.log(statedata["PUNJAB"]["35-44"]);
		console.log(statedata["PUNJAB"]["45 and above"]);
		console.log(statedata["PUNJAB"]["Below primary"]);
		console.log(statedata["PUNJAB"].Primary);
		console.log(statedata["PUNJAB"]["Higher secondary"]);
		console.log(statedata["PUNJAB"]["Graduate and above"]);
		console.log(statedata["PUNJAB"]["Technical Diploma"]);		
		$("#malepercent").empty().append(statedata["PUNJAB"].Male);
		$("#femalepercent").empty().append(statedata["PUNJAB"].Female);
		
		$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
		$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
		agegroup();
		educationlevel();
	}
	function rajasthan(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[30].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[29].graphic.attr({ fill: '#959595' }); chart.series[0].data[3].graphic.attr({ fill: '#959595' });	chart.series[0].data[11].graphic.attr({ fill: '#959595' });chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[12].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[7].graphic.attr({ fill: '#959595' });	chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[15].graphic.attr({ fill: '#959595' }); 
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
		  "RAJASTHAN": {
			"Illiterate":"0.26K",
			"Literate":"0.74K",
			"0-18":"0.26",
			"19-24":"0.16",
			"25-34":"0.25",
			"35-44":"0.17",
			"45 and above":"0.18",
			"Below primary":"0.16",
			"Graduate and above":"0.08",
			"Higher secondary":"0.11",
			"Primary":"0.62",
			"Technical Diploma":"0.02",
			"Female":"38.09%",
			"Male":"61.91%"
		  }
		}
		$("#literateID").empty().append(statedata["RAJASTHAN"].Literate);
		$("#illiterateID").empty().append(statedata["RAJASTHAN"].Illiterate);		
		console.log(statedata["RAJASTHAN"]["0-18"]);
		console.log(statedata["RAJASTHAN"]["19-24"]);
		console.log(statedata["RAJASTHAN"]["25-34"]);
		console.log(statedata["RAJASTHAN"]["35-44"]);
		console.log(statedata["RAJASTHAN"]["45 and above"]);
		console.log(statedata["RAJASTHAN"]["Below primary"]);
		console.log(statedata["RAJASTHAN"].Primary);
		console.log(statedata["RAJASTHAN"]["Higher secondary"]);
		console.log(statedata["RAJASTHAN"]["Graduate and above"]);
		console.log(statedata["RAJASTHAN"]["Technical Diploma"]);
		$("#malepercent").empty().append(statedata["RAJASTHAN"].Male);
			$("#femalepercent").empty().append(statedata["RAJASTHAN"].Female);
		
		$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function tamil(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[7].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[30].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[29].graphic.attr({ fill: '#959595' }); chart.series[0].data[3].graphic.attr({ fill: '#959595' });	chart.series[0].data[11].graphic.attr({ fill: '#959595' });chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[12].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });chart.series[0].data[15].graphic.attr({ fill: '#959595' }); 
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
		  "TAMIL NADU": {
			"Illiterate":"0.15K",
			"Literate":"0.85K",
			"0-18":"0.26",
			"19-24":"0.16",
			"25-34":"0.25",
			"35-44":"0.17",
			"45 and above":"0.18",
			"Below primary":"0.16",
			"Graduate and above":"0.08",
			"Higher secondary":"0.11",
			"Primary":"0.62",
			"Technical Diploma":"0.02",
			"Female":"45.90%",
			"Male":"54.10%"
		  }
		}
		$("#literateID").empty().append(statedata["TAMIL NADU"].Literate);
		$("#illiterateID").empty().append(statedata["TAMIL NADU"].Illiterate);
		console.log(statedata["TAMIL NADU"]["0-18"]);
		console.log(statedata["TAMIL NADU"]["19-24"]);
		console.log(statedata["TAMIL NADU"]["25-34"]);
		console.log(statedata["TAMIL NADU"]["35-44"]);
		console.log(statedata["TAMIL NADU"]["45 and above"]);
		console.log(statedata["TAMIL NADU"]["Below primary"]);
		console.log(statedata["TAMIL NADU"].Primary);
		console.log(statedata["TAMIL NADU"]["Higher secondary"]);
		console.log(statedata["TAMIL NADU"]["Graduate and above"]);
		console.log(statedata["TAMIL NADU"]["Technical Diploma"]);
		$("#malepercent").empty().append(statedata["TAMIL NADU"].Male);
		$("#femalepercent").empty().append(statedata["TAMIL NADU"].Female);
		
		$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	function tripura(){
		var chart = $('#mapId').highcharts();
		chart.series[0].data[15].graphic.attr({ fill: '#F1B306' }); 
		chart.series[0].data[7].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[30].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[29].graphic.attr({ fill: '#959595' }); chart.series[0].data[3].graphic.attr({ fill: '#959595' });	chart.series[0].data[11].graphic.attr({ fill: '#959595' });chart.series[0].data[14].graphic.attr({ fill: '#959595' }); chart.series[0].data[28].graphic.attr({ fill: '#959595' });chart.series[0].data[12].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[25].graphic.attr({ fill: '#959595' }); chart.series[0].data[8].graphic.attr({ fill: '#959595' }); chart.series[0].data[22].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[23].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[33].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[21].graphic.attr({ fill: '#959595' }); chart.series[0].data[18].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[2].graphic.attr({ fill: '#959595' });chart.series[0].data[10].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[26].graphic.attr({ fill: '#959595' }); chart.series[0].data[24].graphic.attr({ fill: '#959595' });	chart.series[0].data[17].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[13].graphic.attr({ fill: '#959595' }); chart.series[0].data[27].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[9].graphic.attr({ fill: '#959595' }); 	chart.series[0].data[6].graphic.attr({ fill: '#959595' });chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[32].graphic.attr({ fill: '#959595' });chart.series[0].data[19].graphic.attr({ fill: '#3F3F3F' });	chart.series[0].data[20].graphic.attr({ fill: '#C1C1C1' }); chart.series[0].data[25].data[4].graphic.attr({ fill: '#C1C1C1' });	chart.series[0].data[31].graphic.attr({ fill: '#3F3F3F' }); chart.series[0].data[5].graphic.attr({ fill: '#C1C1C1' });chart.series[0].data[6].graphic.attr({ fill: '#3F3F3F' });
		$("#myBgSvg").empty();
		draw_lines();
		var statedata = {
		  "TRIPURA": {
			"Illiterate":"0.32K",
			"Literate":"0.68K",
			"0-18":"0.26",
			"19-24":"0.16",
			"25-34":"0.25",
			"35-44":"0.17",
			"45 and above":"0.18",
			"Below primary":"0.16",
			"Graduate and above":"0.08",
			"Higher secondary":"0.11",
			"Primary":"0.62",
			"Technical Diploma":"0.02",
			"Female":"46.46%",
			"Male":"53.54%"
		  }
		}
		$("#literateID").empty().append(statedata["TRIPURA"].Literate);
		$("#illiterateID").empty().append(statedata["TRIPURA"].Illiterate);
		console.log(statedata["TRIPURA"].Literate); 
		console.log(statedata["TRIPURA"].Illiterate);
		console.log(statedata["TRIPURA"]["0-18"]);
		console.log(statedata["TRIPURA"]["19-24"]);
		console.log(statedata["TRIPURA"]["25-34"]);
		console.log(statedata["TRIPURA"]["35-44"]);
		console.log(statedata["TRIPURA"]["45 and above"]);
		console.log(statedata["TRIPURA"]["Below primary"]);
		console.log(statedata["TRIPURA"].Primary);
		console.log(statedata["TRIPURA"]["Higher secondary"]);
		console.log(statedata["TRIPURA"]["Graduate and above"]);
		console.log(statedata["TRIPURA"]["Technical Diploma"]);
		$("#malepercent").empty().append(statedata["TRIPURA"].Male);
		$("#femalepercent").empty().append(statedata["TRIPURA"].Female);
		
		$("#femaleimg").empty().append("<img class='mf-img' src='img/40-f.png'>");
			$("#maleimg").empty().append("<img class='mf-img-l' src='img/60-m.png'>");	
			agegroup();
			educationlevel();
	}
	
if(d.depth == 1){
	if( d.name == "ANDHRA PRADESH"){
		andhra();
	}
	if( d.name == "ARUNACHAL PRADESH"){
		arunachal();
	}
	if( d.name == "NCT OF DELHI"){
		delhi();
	}
	if( d.name == "DAMAN and DIU"){
		daman();
	}	
	if( d.name == "ASSAM"){
		assam();
	}
	if( d.name == "GOA"){
		goa();
	}
	if( d.name == "PUDUCHERRY"){
		puducherry();
	}	
	if( d.name == "WEST BENGAL"){
		westbengal();
	}	
	if( d.name == "HARYANA"){
		haryana();
	}	
	if( d.name == "JAMMU & KASHMIR"){
		jandk();
	}	
	if( d.name == "JHARKHAND"){
		jharkhand();
	}	
	if( d.name == "KARNATAKA"){
		karnataka();
	}	
	if( d.name == "KERALA"){
		kerala();
	}
	if( d.name == "MADHYA PRADESH"){
		madhyaPradesh();
	}	
	if( d.name == "MAHARASHTRA"){
		maharashtra();
	}	
	if( d.name == "MANIPUR"){
		manipur();
	}
	if( d.name == "MEGHALAYA"){
		meghalaya();
	}	
	if( d.name == "MIZORAM"){
		mizoram();
	}	
	if( d.name == "NAGALAND"){
		nagaland();
	}
	if( d.name == "ODISHA"){
		odisha();
	}
	if( d.name == "PUNJAB"){
		punjab();
	}	
	if( d.name == "RAJASTHAN"){
		rajasthan();
	}	
	if( d.name == "SIKKIM"){
		sikkim();
	}	
	if( d.name == "TAMIL NADU"){
		tamil();
	}	
	if( d.name == "TRIPURA"){
		tripura();
	}
	if( d.name == "UTTAR PRADESH"){
		uttarPradesh();
	}	
		
	if( d.name == "BIHAR"){
		bihar();
	}
		
	if( d.name == "HIMACHAL PRADESH"){
		himachalPradesh();
	}
	if( d.name == "CHANDIGARH"){
		chandigarh();
	}
	if( d.name == "UTTARAKHAND"){
		uttarakhand();
    }
	if( d.name == "CHHATTISGARH"){
		chhattisgarh();
	}
		
	if( d.name == "GUJARAT"){
		gujrat();
	}	
}
if(d.depth == 2){
	if(sequenceArray[1].parent.name == "MAHARASHTRA"){	 
	}
	if( sequenceArray[1].parent.name == "ANDHRA PRADESH"){
		andhra();
	}
	if( sequenceArray[1].parent.name == "ARUNACHAL PRADESH"){
		arunachal();
	}
	if( sequenceArray[1].parent.name == "NCT OF DELHI"){
		delhi();
	}
	if( sequenceArray[1].parent.name == "DAMAN and DIU"){
		daman();
	}	
	if( sequenceArray[1].parent.name == "ASSAM"){
		assam();
	}
	if( sequenceArray[1].parent.name == "GOA"){
		goa();
	}
	if( sequenceArray[1].parent.name == "PUDUCHERRY"){
		puducherry();
	}	
	if( sequenceArray[1].parent.name == "WEST BENGAL"){
		westbengal();
	}	
	if( sequenceArray[1].parent.name == "HARYANA"){
		haryana();
	}	
	if( sequenceArray[1].parent.name == "JAMMU & KASHMIR"){
		jandk();
	}	
	if( sequenceArray[1].parent.name == "JHARKHAND"){
		jharkhand();
	}	
	if( sequenceArray[1].parent.name == "KARNATAKA"){
		karnataka();
	}	
	if( sequenceArray[1].parent.name == "KERALA"){
		kerala();
	}
	if( sequenceArray[1].parent.name == "MADHYA PRADESH"){
		madhyaPradesh();
	}	
	if( sequenceArray[1].parent.name == "MAHARASHTRA"){
		maharashtra();
	}	
	if( sequenceArray[1].parent.name == "MANIPUR"){
		manipur();
	}
	if( sequenceArray[1].parent.name == "MEGHALAYA"){
		meghalaya();
	}	
	if( sequenceArray[1].parent.name == "MIZORAM"){
		mizoram();
	}	
	if( sequenceArray[1].parent.name == "NAGALAND"){
		nagaland();
	}
	if( sequenceArray[1].parent.name == "ODISHA"){
		odisha();
	}
	if( sequenceArray[1].parent.name == "PUNJAB"){
		punjab();
	}	
	if( sequenceArray[1].parent.name == "RAJASTHAN"){
		rajasthan();
	}	
	if( sequenceArray[1].parent.name == "SIKKIM"){
		sikkim();
	}	
	if( sequenceArray[1].parent.name == "TAMIL NADU"){
		tamil();
	}	
	if( sequenceArray[1].parent.name == "TRIPURA"){
		tripura();
	}
	if( sequenceArray[1].parent.name == "UTTAR PRADESH"){
		uttarPradesh();
	}		
	if( sequenceArray[1].parent.name == "BIHAR"){
		bihar();
	}	
	if( sequenceArray[1].parent.name == "HIMACHAL PRADESH"){
		himachalPradesh();
	}
	if( sequenceArray[1].parent.name == "CHANDIGARH"){
		chandigarh();
	}
	if( sequenceArray[1].parent.name == "UTTARAKHAND"){
		uttarakhand();
    }
	if( sequenceArray[1].parent.name == "CHHATTISGARH"){
		chhattisgarh();
	}	
	if( sequenceArray[1].parent.name == "GUJARAT"){
		gujrat();
	}
}

if(d.depth == 3){
	if(sequenceArray[1].parent.name == "MAHARASHTRA"){	 
	}
	if( sequenceArray[1].parent.name == "ANDHRA PRADESH"){
		andhra();
	}
	if( sequenceArray[1].parent.name == "ARUNACHAL PRADESH"){
		arunachal();
	}
	if( sequenceArray[1].parent.name == "NCT OF DELHI"){
		delhi();
	}
	if( sequenceArray[1].parent.name == "DAMAN and DIU"){
		daman();
	}	
	if( sequenceArray[1].parent.name == "ASSAM"){
		assam();
	}
	if( sequenceArray[1].parent.name == "GOA"){
		goa();
	}
	if( sequenceArray[1].parent.name == "PUDUCHERRY"){
		puducherry();
	}	
	if( sequenceArray[1].parent.name == "WEST BENGAL"){
		westbengal();
	}	
	if( sequenceArray[1].parent.name == "HARYANA"){
		haryana();
	}	
	if( sequenceArray[1].parent.name == "JAMMU & KASHMIR"){
		jandk();
	}	
	if( sequenceArray[1].parent.name == "JHARKHAND"){
		jharkhand();
	}	
	if( sequenceArray[1].parent.name == "KARNATAKA"){
		karnataka();
	}	
	if( sequenceArray[1].parent.name == "KERALA"){
		kerala();
	}
	if( sequenceArray[1].parent.name == "MADHYA PRADESH"){
		madhyaPradesh();
	}	
	if( sequenceArray[1].parent.name == "MAHARASHTRA"){
		maharashtra();
	}	
	if( sequenceArray[1].parent.name == "MANIPUR"){
		manipur();
	}
	if( sequenceArray[1].parent.name == "MEGHALAYA"){
		meghalaya();
	}	
	if( sequenceArray[1].parent.name == "MIZORAM"){
		mizoram();
	}	
	if( sequenceArray[1].parent.name == "NAGALAND"){
		nagaland();
	}
	if( sequenceArray[1].parent.name == "ODISHA"){
		odisha();
	}
	if( sequenceArray[1].parent.name == "PUNJAB"){
		punjab();
	}	
	if( sequenceArray[1].parent.name == "RAJASTHAN"){
		rajasthan();
	}	
	if( sequenceArray[1].parent.name == "SIKKIM"){
		sikkim();
	}	
	if( sequenceArray[1].parent.name == "TAMIL NADU"){
		tamil();
	}	
	if( sequenceArray[1].parent.name == "TRIPURA"){
		tripura();
	}
	if( sequenceArray[1].parent.name == "UTTAR PRADESH"){
		uttarPradesh();
	}		
	if( sequenceArray[1].parent.name == "BIHAR"){
		bihar();
	}	
	if( sequenceArray[1].parent.name == "HIMACHAL PRADESH"){
		himachalPradesh();
	}
	if( sequenceArray[1].parent.name == "CHANDIGARH"){
		chandigarh();
	}
	if( sequenceArray[1].parent.name == "UTTARAKHAND"){
		uttarakhand();
    }
	if( sequenceArray[1].parent.name == "CHHATTISGARH"){
		chhattisgarh();
	}	
	if( sequenceArray[1].parent.name == "GUJARAT"){
		gujrat();
	}
}
		
	
  // Fade all the segments.
  d3.selectAll("path").style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail").style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });
//  d3.select("#explanation").style("visibility", "hidden");
}

function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
console.log(current);
}


function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};


//Age - bar chart code
	Highcharts.chart('age_bar', {
		chart: {
			type: 'bar',
			backgroundColor: null
		},
		title:{
			text:''
		},
		exporting: { enabled: false },
		credits: {  enabled: false  },
		xAxis: {
			minorTickLength: 0,
			tickLength: 0,
			lineWidth: 0,
			categories: ['0 -18', '19 - 25', '26 - 35', '36 - 45', '46 and above']
		},
		yAxis: {
			min: 0,
			labels:{enabled: false},
			gridLineWidth: 0,
			minorGridLineWidth: 0,
			title: {
			  text: ''
			 }
		},
		legend: {
			reversed: true
		},
		colors: [ '#373B47','#CD9600' ],
		plotOptions: {
			series: {
				showInLegend: false,   
				stacking: 'normal',
				pointPadding: 0,
				groupPadding: 0.1,
				borderWidth: 0
			} 
		},
		series: 
		[{
			name: 'Iliterate',
			data: [1, 3, 4, 7, 2]
		}, {
			name: 'Literate',
			data: [2, 2, 3, 2, 1]
		}]
	});
	//Age - bar chart code

//Education -bar chart 
(function (H) {
	H.wrap(H.Tooltip.prototype, 'hide', function (p) {
		p.call(this);
		var tooltip = $("#hc-tooltip").highcharts();
		if (tooltip) {
			tooltip.destroy();
		}
	});
})(Highcharts)

$('#chartdiv').highcharts({

      chart: {
        type: 'bar',
		backgroundColor: null
    },
	title:{
		text:''
	},
	exporting: { enabled: false },
	credits: {  enabled: false  },
    xAxis: {
		minorTickLength: 0,
   		tickLength: 0,
		lineWidth: 0,
		labels:{enabled: false},
        categories: ['Apples']
    },
    yAxis: {
        min: 0,
		labels:{enabled: false},
		gridLineWidth: 0,
        minorGridLineWidth: 0,
        title: {
          text: ''
         }
    },
    legend: {
        reversed: true
    },
	colors: [ '#373B47', '#FFD879','#FFC32D', '#D29500', '#F4AC00'],
    plotOptions: {
        series: {
			showInLegend: false,   
            stacking: 'normal',
			pointPadding: 0,
            groupPadding: 0.1,
			borderWidth: 0
        }
    },
	
 tooltip: {
        backgroundColor: "rgba(255,255,255,0)",
        borderWidth: 0,
        shadow: false,
        useHTML: true,

              positioner: function () {
                    return { x: 25, y: -90 };
                }
            ,
        formatter: function () {
			setTimeout(function () {
				$("#hc-tooltip").highcharts({
					 chart: {
						plotBackgroundColor: null,
						plotBorderWidth: 0,
						plotShadow: false,
					    marginTop: -120,
						backgroundColor: null
					},
					title: {
					   useHTML: true,
						text: "<img src='img/mf.png' class='tooltip-img' height='42' width='82' />",
						align: 'center',
						verticalAlign: 'middle',
						y: 0
					},
					
					exporting: { enabled: false },
					credits: {  enabled: false  },
					plotOptions: {
						pie: {
							dataLabels: {
								enabled: false,
								distance: -50,
								style: {
									fontWeight: 'bold',
									color: 'white'
								}
							},
							startAngle: -90,
							endAngle: 90,
							center: ['50%', '75%']
						}
					},
					 series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '70%',
            data: [{
                name: 'Male',
                y: 40,
                color: '#d29500' 
            },
            {
                name: 'Female',
                y: 50,
                color: '#ffd979' 
            }                  
              
               
            ]
        }]
				});
			}, 40)
return '<div id="stacked_tooltip"><div class="row heading-test"><div class="edu-head-row">Education without Literacy</div></div><div class="edu-tool-dot-l"></div><div class="border-btm"></div><div class="edu-tool-dot-r"></div><div class="row"><div class="col-md-6"><div class="row edu-absolute-no"><center><h2 id="edu_absolute_no">2,396</h2></center></div><div class="row edu-percentage"><center><h5 id="edu_absolute_no">(35%)</h5></center></div></div><div class="col-md-6"><div id="hc-tooltip"></div></div></div><div>';
		}
    },
	
    series: [
	{
        name: 'John',
        data: [5]
    },
	{
        name: 'Jane',
        data: [2]
    },
	{
        name: 'John',
        data: [5]
    },
	{
        name: 'Jane',
        data: [2]
    },
		{
        name: 'Jane',
        data: [2]
    }
	]

    });
//Education -bar chart 

$(function() {
	var data = [
		['in-py', 0],
		['in-ld', 1],
		['in-wb', 2],
		['in-or', 3],
		['in-br', 4],
		['in-sk', 5],
		['in-ct', 6],
		['in-tn', 7],
		['in-mp', 8],
		['in-2984', 9],
		['in-ga', 10],
		['in-nl', 11],
		['in-mn', 12],
		['in-ar', 13],
		['in-mz', 14],
		['in-tr', 15],
		['in-3464', 16],
		['in-dl', 17],
		['in-hr', 18],
		['in-ch', 19],
		['in-hp', 20],
		['in-jk', 21],
		['in-kl', 22],
		['in-ka', 23],
		['in-dn', 24],
		['in-mh', 25],
		['in-as', 26],
		['in-ap', 27],
		['in-ml', 28],
		['in-pb', 29],
		['in-rj', 30],
		['in-up', 31],
		['in-ut', 32],
		['in-jh', 33]
	];

	// Create the chart
	Highcharts.mapChart('mapId', {
		chart: {
			map: 'countries/in/in-all',
			backgroundColor: null
		},
	  legend: {
			enabled: false
		},
		title: {text: ''},
		colorAxis: {
			stops: [
				[0, '#000'],
				[1, '#F1F1F1']
			],
			min: -5
    	},
		exporting: { enabled: false },
		credits: {  enabled: false  },
		series: [{
			data: data,	
			showInLegend: false,
			dataLabels: {
				enabled: true,
				format: '{point.name}'
			}
		}]
	});
});