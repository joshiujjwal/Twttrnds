var ttrends = new Array();
var ttrendssugg = new Array();
var ttrends_available = new Array();
var counts = new Array();
var keys = [];
var ordered_keys = [];



$(function(){
	
	
	$.ajax({
		url: 'get_tweets.php',
		type: 'GET',
		datatype: 'JSON',
		success: function(response) {
						
							//console.log(response);
						//console.log(response[0].trends[1].name);
						
				if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				
				var $tweets = $('<div id="typed-strings"></div>');
				$.each(response, function(i, obj) {
					//alert(obj.trends[i].name)
					for(var x=0;x<obj.trends.length;x++){
					//$tweets.append('<p>'+obj.trends[x].name+'</p>')
					var trnds = ttrends.push(obj.trends[x].name)
					}
				});

				$('.tweets-container').html($tweets);
			//console.log(ttrends);
			} else {
				$('.tweets-container p:first').text('Response error');
			}
		},
		error: function(errors) {
			$('.tweets-container p:first').text('Request error');
		}
	});
	
	
	

});

$(function(){
	
	
	$.ajax({
		url: 'get_available.php',
		type: 'GET',
		datatype: 'JSON',
		success: function(response) {
						
					//console.log(response);
					//console.log(response[5].name);
				if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				
				//var $tweets = $('<a  onclick="search_modal(this.innerHTML);"> </a> ');
				
						
					for(var x=0;x<response.length;x++){
						
						var trnds_available = ttrends_available.push({
						
						country : response[x].country,
						name: response[x].name,
						id: response[x].woeid
						
						});
					}
				//console.log(ttrends_available);
				//$('#sugg').html($tweets);
				
					
						for (var i = 0; i < ttrends_available.length; i++) {
							if(ttrends_available[i].country != ""){
							counts[ttrends_available[i].country] = 1 + (counts[ttrends_available[i].country] || 0);
							}
						}  
						
						//console.log(counts);
							
							
							Object.getOwnPropertyNames(counts).forEach(function(val) {
							if (val != "length" && val != ""){
							var key = keys.push(val); }
						});

						
						
						var arr = Object.getOwnPropertyNames(counts).map(function(k) { 
						
						
						return counts[k]
						
						});
						var index = arr.indexOf(0);
						if (index > -1) {
							arr.splice(index, 1);
						}
							//console.log(counts);
						
							//console.log(ttrends_available); 
		
			/* console.log(keys);
			 console.log(keys.length);
			console.log(arr);
			 console.log(arr.length); */
			 
			d3Bar(keys , arr);
			
			var map_count = [];
			for (var place in counts)
			map_count.push([place, counts[place]])
			map_count.sort(function(a, b) {return a[1] - b[1]})
			
			
			var ordered_map_count = map_count.reverse();
			//console.log(ordered_map_count);
			for(var x=0;x<ordered_map_count.length &&x < 10;x++){
				
				var order_keys = ordered_keys.push( ordered_map_count[x]);
				
			}
			
			
			//console.log(ordered_keys);
			
			mapping(ordered_keys);
			} else {
				$('#canvas-svg p:first').text('Response error');
			}
		},
		error: function(errors) {
			$('#canvas-svg p:first').text('Request error');
			console.log(errors);
		}
	});
	
	
	

});

$(function(){
	
	
	$.ajax({
		url: 'get_suggestions.php',
		type: 'GET',
		datatype: 'JSON',
		success: function(response) {
						
					//console.log(response[5].name);
			
				if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				
				//var $tweets = $('<a  onclick="search_modal(this.innerHTML);"> </a> ');
				
						
					for(var x=0;x<response.length;x++){
						
						var trndssugg = ttrendssugg.push(response[x].name);
					}
				
				//$('#sugg').html($tweets);
			//console.log(ttrendssugg); 
			} else {
				$('.suggestions p:first').text('Response error');
			}
		},
		error: function(errors) {
			$('.suggestions p:first').text('Request error');
			console.log(errors);
		}
	});
	
	
	

});

var i = 0;  // the index of the current item to show

setInterval(function() {         
 	
	var text = ttrends[i++];
	var txt = document.getElementById('typed').innerHTML = "";
	
	
	
	

	$.each(text.split(''), function(r, letter){

            //we add 200*i ms delay to each letter 
            setTimeout(function(){

                //we add the letter to the container
				
                $('#typed').html($('#typed').html() +  letter);
				
			
            }, 150*r);
		
        });

  if (i == ttrends.length) i = 0;    // reset to first element if you've reached the end
	
  }, 5000);                           // 1000 milliseconds == 1 second

setInterval(function() { 
	var $hashtag =$('<div>  </div>');
	for(var x=0;x<5;x++){
	var item = Math.floor(Math.random()*ttrendssugg.length);
	//console.log(ttrendssugg.length);
	$hashtag.append('<div class="row"><div  align="center" class="col-md-2""><a  onclick="search_modal(this.innerHTML);"> '+ttrendssugg[item]+' </a></div><div  align="center" class="col-md-2""><a  onclick="search_modal(this.innerHTML);"> '+ttrends[Math.floor(Math.random()*ttrends.length)]+'</a></div> <div  align="center" class="col-md-2""><a  onclick="search_modal(this.innerHTML);"> '+ttrendssugg[Math.floor(Math.random()*ttrendssugg.length)]+'</a></div> <div  align="center" class="col-md-2""><a  onclick="search_modal(this.innerHTML);"> '+ttrendssugg[Math.floor(Math.random()*ttrendssugg.length)]+'</a></div> <div  align="center" class="col-md-2""><a  onclick="search_modal(this.innerHTML);"> '+ttrends[Math.floor(Math.random()*ttrends.length)]+'</a></div> <div  align="center" class="col-md-2""><a  onclick="search_modal(this.innerHTML);">'+ttrendssugg[Math.floor(Math.random()*ttrendssugg.length)]+'</a></div>	 </div>');
	$('#suggestions').html($hashtag);
	}
	  }, 7000); 
 
 
 function mapping(arr_map){
 
 
 var map;
    var elevator;
    var myOptions = {
        zoom: 2,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: 'terrain'
    };
    map = new google.maps.Map($('#map_canvas')[0], myOptions);



    for (var x = 0; x < arr_map.length; x++) {
		
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+arr_map[x]+'&sensor=false'+'&key=AIzaSyBqTuOgG5AIJrAtaLYlRqrvsxbxnHpYw14', null, function (data) {
            var p = data.results[0].geometry.location;
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            new google.maps.Marker({
                position: latlng,
                map: map
            });
			
			var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: 'Click to see tweets',
			//draggable: true
			
		  });
			 marker.addListener('click', function() {
				
				//console.log(data.results[0].address_components[data.results[0].address_components.length-2].long_name);
				
				var text = data.results[0].address_components[data.results[0].address_components.length-2].long_name;
				
			 search_modal(text);
			  });
			  
			 // console.log(p.lat ,p.lng);
			
			/*  marker.addListener('drag', function () {
    var latbox = this.getPosition().lat();
    var longbox = this.getPosition().lng();
	console.log(latbox,longbox);
	
			 
			 marker.addListener('click' , function(){
				 $(".modal-title").html(" ");
				 $('.modal-body').html(" ");
				trnds_closet(latbox,longbox); 
				 
				 
			 }); 
	
});*/
			  

        });
    }
	
	//var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var marker_close = new google.maps.Marker({
		  position:{lat: 23.179301, lng: 75.78491},
		  map: map,
		  icon: 'images/Twitter_bird_icon.png',
		  title: 'Drag me to location to see tweets for particular location',
		  draggable: true
		});
		 marker_close.addListener('dragend', function () {
    var latbox = this.getPosition().lat();
    var longbox = this.getPosition().lng();
	//console.log(latbox,longbox);
					 $(".modal-title").html(" ");
				 $('.modal-body').html(" ");
				trnds_closet(latbox,longbox); 
				
	
});
			

 }
 

function trnds_closet(t_lat,t_lng){
	
	
	$.ajax({
		url: 'get_closet.php',
		data: { lat: t_lat , lng : t_lng},
		type: 'GET',
		datatype: 'JSON',
		success: function(response) {
						
						//console.log(response);
						//console.log(response[0].name);
						//console.log(response.errors[0].message);
				if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				
					var closet = response[0].name;
					search_modal(closet);
			} else {
				$('.tweets-container p:first').text('Response error');
			} 
		},
		error: function(errors) {
			
			$('.tweets-container p:first').text('Request error');
		}
	});
	}





 function d3Bar(labels , values){

 //labels = labels.sort();

 /* console.log(labels);
 console.log(values);
 console.log(labels.length);
 console.log(values.length); */
 
 
 
 
var margin = { top: 30, right: 200, bottom: 200, left:50 }

var height = 600 - margin.top - margin.bottom,
    width = 1183 - margin.left - margin.right,
    barWidth = 30,
    barOffset = 5;

var tempColor;

var colors = d3.scale.linear()
.domain([0, values.length*.33, values.length*.66, values.length])
.range(['#B58929','#C61C6F', '#268BD2', '#85992C'])

var yScale = d3.scale.linear()
        .domain([0, d3.max(values)])
        .range([0, height]);

var xScale = d3.scale.ordinal()
        .domain(labels)
		.rangeBands([0, width],0.2)
		//.rangePoints([0,width*2])

var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)

var myChart = d3.select('#chart').append('svg')
   // .style({'background': '#E7E0CB' , 'margin':'0 auto'})
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
    .selectAll('rect').data(values)
    .enter().append('rect')
        .style('fill', function(d,i) {
            return colors(i);
        })
        /* .attr('width', xScale.rangeBand())
        .attr('x', function(d,i) {
            return xScale(i);
        }) */
		.attr('width', '8px')
        .attr('x', function(d,i) {
            return i*(barWidth/2)+barOffset  ;
        })
        .attr('height', 0)
        .attr('y', height)

    .on('mouseover', function(d) {

        tooltip.transition()
            .style('opacity', .9)

        tooltip.html(d)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top',  (d3.event.pageY - 30) + 'px')


        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .5)
            .style('fill', 'yellow')
    })

    .on('mouseout', function(d) {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor)
			
		tooltip.html('')
    })

	myChart.transition()
		.attr('height', function(d) {
			return yScale(d);
		})
		.attr('y', function(d) {
			return height - yScale(d);
		})
		.delay(function(d, i) {
			return i * 20;
		})
		.duration(1000)
		.ease('elastic')

	var vGuideScale = d3.scale.linear()
		.domain([0, d3.max(values)])
		.range([height, 0])

	var vAxis = d3.svg.axis()
		.scale(vGuideScale)
		.orient('left')
		.ticks(10)

	var vGuide = d3.select('#chart svg').append('g')
    vAxis(vGuide)
    vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    vGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    vGuide.selectAll('line')
        .style({ stroke: "#000"})

	var hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    

	var hGuide = d3.select('#chart svg').append('g')
    hAxis(hGuide)
    hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
	hGuide.attr("class", "xaxis")  
    hGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    hGuide.selectAll('line')
        .style({ stroke: "#000"})
	hGuide.selectAll(".xaxis text")  // select all the text elements for the xaxis
	/* 
          .attr("transform", function(d)  {
              return "translate(" + this.getBBox().height*-3 + "," + this.getBBox().height + ")rotate(-90)";
			
        }) */
			.attr("y", 0)
			.attr("x", 9)
			.attr("dy", ".35em")
			.attr("transform", "rotate(90)")
			.style("text-anchor", "start")

		.style({ "font-weight":"lighter", "font-size": "70%" ,"align":"right"});

 }
 




 
 function search_modal(text){
	
	$("#myModal").modal();
	//$(".modal-title").html(text);
	document.getElementById('m_title').innerHTML = text;
	//var query=text.toString();
	$('.modal-body').html(" ");
//	console.log(text);
	
	$.ajax({
		url: 'get_tweets_search.php',
		data: { q: text },
		type: 'GET',
		success: function(response) {
			
					//console.log(response);
									
					//console.log(response.statuses[0]);
					
					//console.log(response.statuses[0].text);
			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				
				var $tweets = $('<div class="row"> </div>');
				$.each(response, function(i, obj) {
					//console.log(obj[0].text);
						//console.log(obj[0].user.profile_image_url);
						//console.log(obj[0].user.screen_name);
						//console.log(obj[0].profile_image_url);
						//console.log(obj[0].screen_name);
					for(var x=0;x<obj.length;x++){
					$tweets.append('<div class="row"><div class ="col-md-2"><img src="images/Twitter_bird.png" style="width:48px;height:48px;" > </div><div class ="col-md-10" > <div class="row" font color="#62879e"><u>'+ obj[x].user.screen_name+' </u></div><div class="row"> '+'<p>'+obj[x].text+'</p>'+' </div></div> </div>')
					}
				});

				$('.modal-body').html($tweets);
				$('p').linkify();
				$('.modal-body').linkify({
					target: "_blank"
					});

			} else {
				$('.modal-body p:first').text('Response error');
			}
		},
		error: function(errors) {
			$('.modal-body p:first').text('Request error');
		}
	});
	
 }



 

