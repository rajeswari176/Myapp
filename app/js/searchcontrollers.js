/* Controllers */
angular.module('EcafeApp')

.controller('SearchController',['$scope','$http', function ($scope, $http) {
setTimeout(function(){
$scope.$apply(function(){
$http.get('phones/fdata.json').success(function(data) {
    $scope.words= data;
    $scope.dataarray = [ "Hello", "world", "normally", "you", "want"];
    $scope.customer = { name: 'david', street: '1234 anywhere'};
    $scope.data = [82,32,63,42];

   
  });
});
},200);


 $scope.search = function(searchText) {
            if ($scope.oldSearchVal == searchText)
                return;

            $scope.oldSearchVal = searchText;
            $scope.selectedData = '';
            var text = '';
            if (typeof searchText === 'object') {
                text = searchText.skillName;
            } else {
                text = searchText;
            }
            $http({
                method: 'GET',
                url: "/api/search/skill",
                datatype: 'JSON',
                params: {
                    skillName: text
                                   }
            }).success(function(data, status, headers, config) {
                $scope.searchData = '';
                if (data === "not found" || data.length < 5 || data.match == undefined) {
                    $scope.showResults = 'false';
                    $scope.message = '0 results found';

                    return;
                }

                $scope.searchData = data;


                var locations = [];
                var departments = [];

                angular.forEach(data.match, function(value, key) {
                    var node = value.match;
                    locations.push(node.siteName.title);
                    departments.push(node.department);
                });

                jQuery.unique(locations);
                jQuery.unique(departments);

                $scope.searchFilters = {
                    locations: locations,
                    departments: departments,
                    selectedLocation: '',
                    selectedDepartment: ''
                };
                $scope.selectedData = 'match';
                $scope.filter();
            }).error(function(data, status, headers, config) {
                if (status == 401) {
                    alert('Not authenticated');
                    UserService.logout();
                }
                alert('Error occurred while retrieving query results');

                $scope.showResults = 'false';
                $scope.message = 'Error occurred while retrieving';
            });

        };

  

}])
  .directive('myGraph', function() {

function link(scope,el,attr){


el = el[0]

scope.render = function(data) {
var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-1500)
    .linkDistance(function(d) {
                            return d.distance;
                        })
    .linkStrength(0.1)
    .size([width, height]);

var svg = d3.select(el).append("svg")
    .attr("width", width)
    .attr("height", height);


function imageSize(d) {
                        if (d.size == 5) return 40;
                        return 30 * d.size / 20;
                    }

var pattern = svg.selectAll("defs")
                        .data(data.nodes)
                        .enter()
                        .append("pattern")
                        .attr('x', '0')
                        .attr('y', '0')
                        .attr('id', function(d) {
                            return 'img' + d.index;
                        }).attr('height', function(d) {
                            return imageSize(d);
                        })
                        .attr('width', function(d) {
                            return imageSize(d);
                        });

 pattern.append("image")
                        .attr('x', '0')
                        .attr('y', '0')
                        .attr('height', function(d) {
                            return imageSize(d);
                        }).attr('width', function(d) {
                            return imageSize(d);
                        }).attr('xlink:href', function(d) {
                            if (d.imageUrl == '')
                                return 'https://github.com/favicon.ico';
                            return d.imageUrl;
                        });




  force
      .nodes(data.nodes)
      .links(data.links)
      .start();

  var link = svg.selectAll(".link")
      .data(data.links)
    .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", ".6")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(data.nodes)
    .enter().append("circle")
      .attr("stroke", "#fff")
      .attr("stroke-width", "1.5px")
       .attr("font","10px sans-serif")
      .attr("r", function(d) { return d.size})
      .style("fill", function(d) {return 'url(#img' + d.index + ')';})
      .style("stroke", function(d) {return '#333';})
      .call(force.drag);


  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("font","10px sans-serif")
      .text(function(d) { return d.name })
      .style("stroke","#333")

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

 node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  

  });





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



 