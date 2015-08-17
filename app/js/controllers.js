/* Controllers */
angular.module('EcafeApp')

.controller('WordCloudCtrl',['$scope','$http', function ($scope, $http) {
$http.get('phones/data1.json').success(function(data) {
    $scope.words= data;
    $scope.dataarray = [ "Hello", "world", "normally", "you", "want"];
    $scope.customer = { name: 'david', street: '1234 anywhere'};
    $scope.donut = [82,32,45];
    $scope.charts= d3.range(5).map(function(){
      return d3.range(2).map(Math.random)
    })

   
  });

  }])
  .directive('myWords', function() {

function link(scope,el,attr){


el = el[0]

scope.render = function(data) {
var fill = d3.scale.category20();

var layout = d3.layout.cloud()
    .size([700, 580])
    .words(data.map(function(d) {
      return {text: d.name, size: d.freq, test: "haha"};
    }))
    .padding(0)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();

function draw(words) {
  d3.select(el).attr("align","left")
      .append("svg")
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
scope.$watch('data', function(){
              scope.render(scope.data);
          }, true);  

}
return {
link:link,
restrict: 'E',
scope:{data:'='}
}


  
});

angular.module('EcafeApp')
.directive('donutChart', function() {

function link(scope,el,attr){


el = el[0]

scope.render = function(data) {
var color = d3.scale.category10()
var width=100
var height=100
var min=Math.min(width,height)
var pie=d3.layout.pie().sort(null)
var arc=d3.svg.arc()
         .outerRadius(min/2*0.9)
         .innerRadius(min/2*0.5)
var svg=d3.select(el).append('svg')
    .attr({width:width, height: height})
    .append('g')
    .attr('transform', 'translate('+width/2 +',' + height/2 + ')')

//add the paths for each arc slice
svg.selectAll('path').data(pie(data))
   .enter().append('path')
   .style('stroke','white')
   .attr('d',arc)
   .attr('fill',function(d,i){ return color(i)})

}
scope.$watch('data', function(){
              scope.render(scope.data);
          }, true);  

}
return {
link:link,
restrict: 'E',
scope:{data:'='}
}


  
});




 