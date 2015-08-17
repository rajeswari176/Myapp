'use strict';

/* Directives */
var Ecafedirectives = angular.module("Ecafedirectives",[])
 Ecafedirectives.directive('donutChart', function(){
return{
restrict: 'E',
replace: true,
scope:{mywords:'=data'}
},

function link(scope,el){
  el = el[0]
/* var canvas =d3.select(el).append('svg')
    .attr({width:500, height: 500})
    .append('g')
     canvas.append("circle")
          .attr("cx",50)
          .attr("cy",50)
          .attr("r",10)
          .attr("fill","red") */

var fill = d3.scale.category20();
var layout = d3.layout.cloud()
    .size([1000, 1000])
    .words(mywords.map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();

function draw(words) {
  d3.select(el).append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });



}

}
})