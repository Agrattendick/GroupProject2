d3.json(`/states`).then(function(data) {
    // console.log(data.store_count);
}
)


// @TODO: YOUR CODE HERE!
// get data

//take x and y choice from page
var Xsel = document.getElementById('xChoice');
var Ysel = document.getElementById('yChoice');



//click activates.  get new choices, set to selection, clear graph, run magic
document.getElementById('showGraph').onclick = function () {
    Xsel = document.getElementById('xChoice');
    Ysel = document.getElementById('yChoice');
    document.getElementById('scatter').innerHTML = "";
    console.log( Ysel.value);
    d3.json(`/states`).then(function(data) {
    Magic(data);
    })
}

var margin = {
    top : 20,
    right: 20,
    bottom : 60,
    left: 60
};

function Magic(data){
//viewbox allows auto resizing
console.log(data);
var svg = d3.select("#scatter")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1000 400")
            .classed("svg-content-responsive", true)
            .attr("class", "chart")
            .append("g")
            .attr("class", "responsive-plot")
            .attr("transform", `translate( ${margin.left}, ${margin.top})`);

//blank x and y [] then push values of selection into them
    var yValues = [];
    var xValues =[];

    // var i;
    // for (i = 0; i < 51; i++) { 
    //     yValues.push(data[Ysel.value]);
    //     xValues.push(data[Xsel.value][i])
    // }    
    data.map(d =>{

        yValues.push(+d[Ysel.value]);
        xValues.push(+d[Xsel.value]);
    }); 


//define x and y scaling based off x and y values and viewbox range
    var yScale = d3.scaleLinear()
                .domain([d3.min(yValues)*.95, d3.max(yValues)])
                .range([290,20]);

    var xScale = d3.scaleLinear()
            .domain([d3.min(xValues)*.95, d3.max(xValues)])
            .range([0, 680]);

    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

//draw axis with axis title
    svg.append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", `translate (0, 290)`);

    svg.append("text")             
        .attr("transform", "translate(340, 325)")
        .style("text-anchor", "middle")
        .text(`${Xsel.value}`);

    svg.append("g")
        .call(yAxis)
        .attr("class", "yAxis");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 -145)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(`${Ysel.value}`);   

    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", .5);

    // console.log(yValues);
//draw circles with x/y values and create mouse events for each
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", i=> xScale(i[`${Xsel.value}`]))
        .attr("cy", j => yScale(j[`${Ysel.value}`]))
        .attr("r", 15)
        .style("opacity", .25)
        .on("mouseover", function(d) {		
            div.transition()		
               .duration(200)		
               .style("opacity", .9);		
            div.html(d.state + "<br>" + `${Xsel.value}: ` + d[`${Xsel.value}`] + "<br>" + `${Ysel.value}: ` + d[`${Ysel.value}`])	
               .style("left", (d3.event.pageX) + "px")		
               .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

//text treated separately.  need extra a=>a in data() to ensure all data used
//creates new index, otherwise first 24(?) don't get added-already has those index
//numbers in use
    svg.selectAll("text")
        .data(data, a=>a)
        .enter()
        .append("text")
        .attr("x", a=> xScale(a[`${Xsel.value}`]))
        .attr("y", b=> yScale(b[`${Ysel.value}`])+7)
        .text(c => `${c.state}`)
        .attr("class", "stateText")
        .attr("font-size", "15px")
        .attr("fill", "red")
        .style("opacity", .75)

    };

    d3.json(`/states`).then(function(data) {
        console.log(Ysel.value)
        console.log(data);
        Magic(data);
    });

