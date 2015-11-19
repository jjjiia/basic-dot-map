$(function() {
	queue()
		.defer(d3.csv, dots)
		.defer(d3.json,buildings)
		.await(dataDidLoad);
})

$("#topDifferences .hideTop").hide()

function dataDidLoad(error,dots,buildings) {
    var mapSvg = d3.select("#map").append("svg").attr("width",1200).attr("height",800)
    drawBuildings(buildings,mapSvg)
    drawPeople(dots,mapSvg)

}
function drawBuildings(geoData,svg){
	var projection = d3.geo.mercator().scale(4000000).center([-71.063,42.3562])
	var path = d3.geo.path().projection(projection);
	svg.selectAll(".buildings")
		.data(geoData.features)
        .enter()
        .append("path")
		.attr("class","buildings")
		.attr("d",path)
		.style("fill","#aaa")
	    .style("opacity",.5)
}

function drawPeople(data,svg){
	var projection = d3.geo.mercator().scale(4000000).center([-71.063,42.3562])
    svg.selectAll(".people")
        .data(data)
        .enter()
        .append("circle")
        .attr("class","people")
        .attr("r",2)
        .attr("cx",function(d){
            var lat = parseFloat(d.latitude)
            var lng = parseFloat(d.longitude)
            var projectedLng = projection([lng,lat])[0]
            return projectedLng
        })
        .attr("cy",function(d){
            var lat = parseFloat(d.latitude)
            var lng = parseFloat(d.longitude)
            var projectedLat = projection([lng,lat])[1]
            return projectedLat
        })
        .attr("fill",function(d){
            var gender = d.gender
            if(gender == "F"){
                return "red"
            }else if(gender == "M"){
                return "blue"
            }else{
                return "black"
            }            
        })
	    .style("opacity",.3)
        .on("mouseover",function(d){
            console.log(d)
        })
        
}