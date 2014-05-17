function updatePlayhead(d){
  var message = "";

  if(d == "start"){
    message = "Click to play from start";
  }
  else if(d !== null){
    var minutes = Math.floor(d.frame_number / 60);
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    var seconds = d.frame_number % 60;
    if(seconds < 10){
      seconds = "0" + seconds;
    }

    message = "Click to play from " + minutes + ":" + seconds;
  }

  d3.select("#playhead")
    .text(message);
}

var playHeadVisible;
function showPlayhead(d){
  playHeadVisible = true;

  d3.select("#playhead")
    .transition()
    .duration(200)
    .style("opacity", 1);
}

function hidePlayhead(timeout){
  playHeadVisible = false;

  //showPlayhead is allowed to cancel the hiding
  //of the playhead so we delay for a bit to allow
  //it a chance
  _.delay(function(){
    if(playHeadVisible === false){
      d3.select("#playhead")
      .transition()
      .style("opacity", 0);
    }
  }, timeout);
}


var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '390',
    width: '640',
  });
}

function playVideo(d){
  var isMobile = d3.select("#state-indicator").style("z-index") == "2";
  var url;
  if(isMobile){
    var id = getVideoId(d);
    if(id){
      url = "http://m.youtube.com/watch?v=" + id;
      window.open(url, '_blank');
    }
  } else if(!_.isUndefined(player)){
    var startTime = d.frame_number;
    var videoId = getVideoId(d);

    // Check if current video is the requested one. If so seek else load
    url = player.getVideoUrl();

    if(url.match(videoId)){
      player.seekTo(startTime, true);
    } else {
      player.loadVideoById({
        'videoId': videoId,
        'startSeconds': startTime,
        'suggestedQuality': 'small'
      });
    }

    showPlayArea();
  }
}

function showPlayArea(){
  d3.select("footer")
    .transition()
    .style("height", "480px")
    .each("end", function(){
      d3.select("#close_yt")
        .transition()
        .duration(100)
        .style("opacity", 1);
    });

  d3.select("table")
    .style("margin-bottom", "480px");
}

function hidePlayArea(){
  if(!_.isUndefined(player)){
    player.pauseVideo();
  }

  d3.select("footer")
    .transition()
    .style("height", "30px")
    .each("end", function(){
      d3.select("#close_yt")
        .transition()
        .duration(100)
        .style("opacity", 0);
    });

  d3.select("table")
    .style("margin-bottom", "20px");
}


function getMetaData(name){
  names = {
    "eric_fisher": {
      fullName: "Eric Fisher",
      talkTitle: "Mapping Billions of Dots",
      videoId: "sqXArLn0pOY"
    },
    "sam_selikoff": {
      fullName: "Sam Selikoff",
      talkTitle: "Using D3 with Backbone, Angular and Ember",
      videoId: "ca3pQWc2"
    },
    "kennedy_elliot": {
      fullName: "Kennedy Elliot",
      talkTitle: "Coding for the News",
      videoId: "6xeBs5UoqVk"
    },
    "jen_christiansen": {
      fullName: "Jen Christiansen",
      talkTitle: "Visualizing Science: Developing Information Graphics for Scientific American Magazine",
      videoId: "QJU4FLn2weg"
    },
    "arvind_satyanarayan": {
      fullName: "Arvind Satyanarayan",
      talkTitle: "Lyra: An Interactive Visualization Design Environment",
      videoId: "io7BSu6RIYM"
    },
    "tom_frederik": {
      fullName: "Tom De Smedt +<br> Frederik De Bleser",
      talkTitle: "Agile Data Mining and Visualization",
      videoId: "0oUP7uHAsNA"
    },
    "andy_kirk": {
      fullName: "Andy Kirk",
      talkTitle: "The Design of Nothing: Null, Zero, Blank",
      videoId: "JqzAuqNPYVM"
    },
    "david_mimno": {
      fullName: "David Mimno",
      talkTitle: "Understanding Machine Learning with D3: Visualization for Models and Algorithms",
      videoId: "-0Pe30Zz3a0"
    },
    "jake_vanderplas": {
      fullName: "Jake Vanderplas",
      talkTitle: "Python in the Browser Age: Data Exploration in the IPython Notebook",
      videoId: "NzX7DDRkecU"
    },
    "jason_sundram": {
      fullName: "Jason Sundram",
      talkTitle: "A full stack approach to data visualization: Terabytes (and beyond) at Facebook",
      videoId: "hGDNBGShQVY"
    },
    "john_resig": {
      fullName: "John Resig",
      talkTitle: "Analyzing Art Data for Fun and Profit",
      videoId: "u2pZ_OVRzVc"
    },
    "lena_groeger": {
      fullName: "Lena Groeger",
      talkTitle: "Think Small: the Power of Wee Things",
      videoId: "ZPAp3Fxx7TE"
    },
    "lisa_chris": {
      fullName: "Lisa Strausfeld + <br>Christopher Cannon",
      talkTitle: "Bloomberg Visual Data - From Explanation to Exploration",
      videoId: "Qm4Ilw76hTI"
    },
    "marian_doerk": {
      fullName: "Marian Dörk",
      talkTitle: "From Bird's-eye Views to Street-Level Data Exploration: Taking Text For A Stroll",
      videoId: "SXMyxUiIeS0"
    },
    "mike_bostock": {
      fullName: "Mike Bostock",
      talkTitle: "Design is a Search Space",
      videoId: "fThhbt23SGM"
    },
    "ramnath_vaidyanathan": {
      fullName: "Ramnath Vaidyanathan",
      talkTitle: "Interactive Visualizations with R",
      videoId: "CtDT2KbnKrk"
    },
    "robert_simmon": {
      fullName: "Robert Simmon",
      talkTitle: "Subtleties of Color",
      videoId: "DjJr8D4Bxjw"
    },
    "mauricio_giraldo": {
      fullName: "Mauricio Giraldo",
      talkTitle: "NYPL Labs Building Inspector: Extracting Data from Historic Maps",
      videoId: "Oph1o3IZEFU"
    }
  };
  return names[name];
}

function getFullname(name){
    var meta = getMetaData(name);
    if(meta){
      return meta["fullName"];
    } else{
      return name;
    }
  }


function getTalkTitle(name){
  var meta = getMetaData(name);
  if(meta){
    return meta["talkTitle"];
  } else{
    return name;
  }
}

function getVideoId(name){
  return "EzDaNJZIVJA";
  var meta = getMetaData(name);
  if(meta){
    return meta["videoId"];
  } else{
    return name;
  }
}


$(document).ready(function(){

  function getImagePath(name, frameNumber){
    return "/data/" + name + "/images/eigth/" + name + "-" + frameNumber + ".png";
  }

  function getOrder(){
    return [
      "mike_bostock",
      "eric_fisher",
      "sam_selikoff",
      "kennedy_elliot",
      "jen_christiansen",
      "arvind_satyanarayan",
      "tom_frederik",
      "andy_kirk",
      "david_mimno",
      "john_resig",
      "robert_simmon",
      "lisa_chris",
      "mauricio_giraldo",
      "jake_vanderplas",
      "ramnath_vaidyanathan",
      "marian_doerk",
      "lena_groeger",
      "jason_sundram"
    ];
  }



  var dataFile = "data/metadata.json";

  var smallTileWidth = "7px";
  var smallTileHeight = "55px";

  var largeTileWidth = "140px";
  var largeTileHeight = "100px";

  var dispatch = d3.dispatch("expand", "contract",
    "showImage", "hideImage", "loadImage");

  d3.json(dataFile, function(data){

    //Do a bit of cleanup on the data to hide frames that are close together in
    //time.
    _.each(data, function(speaker_data){
      var lastFrameNumber = 0;
      for(var i = 1; i < speaker_data["frames"].length; i++){
        var diff = speaker_data["frames"][i]["frame_number"] - lastFrameNumber;

        // if(speaker_data["frames"][i-1]){
        //   lastFrameNumber = speaker_data["frames"][i-1]["frame_number"];
        // }

        lastFrameNumber = speaker_data["frames"][i]["frame_number"];
        if(diff < 10 && lastFrameNumber !== 0){
          speaker_data["frames"][i] = undefined;
        }
      }
      speaker_data["frames"] = _.compact(speaker_data["frames"]);
    });

    var ordered = getOrder();
    data = _.sortBy(data, function(d){
      return ordered.indexOf(d.name);
    });

    var container = d3.select("#container")
      .append("table");

    // Add divs for all the images associated with one speaker
    // and add a div as a label
    var speaker = container.selectAll(".speaker")
      .data(data);

    speaker.enter()
        .append("tr")
        .attr("class", "speaker");

    var infoArea = speaker
        .append("td")
        .attr("class", "speaker-info");

    infoArea
      .append("h2")
      .attr("class", "speaker_name")
      .html(function(d,i) {
        return getFullname(d.name);
      })
      .on("click", function(d, i){
        var isMobile = d3.select("#state-indicator").style("z-index") == "2";
        if(isMobile){
          playVideo(d);
        } else {
          toggle(d.name);
        }
      });

    infoArea
      .append("i")
      .attr("class", "fa fa-plus")
      .attr("data-name", function(d){ return d.name;} )
      .on("click", function(d, i){
        toggle(d.name);
      });

    infoArea
      .append("i")
      .attr("class", "fa fa-youtube-play")
      .attr("data-name", function(d){ return d.name;} )
      .on("mouseover", function(d,i){
        showPlayhead(); //will also cancel hidePlayhead
        updatePlayhead("start");
      })
      .on("mouseleave", function(){
        hidePlayhead(300);
      })
      .on("click", function(d, i){
        playVideo("start");
      });

    infoArea
      .append("h2")
      .attr("class", "talk_name")
      .attr("data-expanded", "false")
      .html(function(d,i) {
        return getTalkTitle(d.name);
      })
      .on("click", function(d, i){
        var isMobile = d3.select("#state-indicator").style("z-index") == "2";
        if(isMobile){
          playVideo(d);
        } else {
          toggle(d.name);
        }


      });


    var tileArea = speaker
        .append("td")
        .attr("class", "tile-area");

    var tiles = tileArea.selectAll(".tile")
      .data(function(d,i) {
        var frames = d.frames;
        _.each(frames, function(f){
          f["name"] = d.name;
        });
        return frames;
      });

    // Create the div to represent a tile
    var throttledHide = _.debounce(hidePlayhead, 50);
    tiles.enter()
      .append("div")
      .attr("class", function(d, i) {
        return "tile " + d.name;
      })
      .on("mouseover", function(d,i){
        showPlayhead(); //will also cancel hidePlayhead
        updatePlayhead(d);
      })
      .on("mouseleave", function(){
        hidePlayhead(300);
      })
      .on("click", function(d, i){
        playVideo(d);
      });

    //Style the tile
    var linearGradientTemplate = _.template("linear-gradient(<%= direction %>, <%= from %> <%= stop%>%, <%= to %>)");
    tiles
      .style("width", smallTileWidth)
      .style("height", smallTileHeight)
      .style("margin-right", "1px")
      .style("border-width", "0px")
      .style("border-style", "solid")
      .style("background-color", function(d, i){
        var byHsl = _.sortBy(d.dominant_cols, function(datum){
          var rgbArr = datum.col;
          var rgbCol = d3.rgb(rgbArr[0], rgbArr[1], rgbArr[2]);
          var hsl = rgbCol.hsl();
          return hsl.s;
          // return datum.count;
        }).reverse();
        var c = byHsl[0].col;
        return d3.rgb(c[0], c[1], c[2]);

      })
      .style("background", function(d, i){
        var byCount = _.sortBy(d.dominant_cols, function(datum){
          return datum.count;
        }).reverse();

        var byHsl = _.sortBy(d.dominant_cols, function(datum){
          var rgbArr = datum.col;
          var rgbCol = d3.rgb(rgbArr[0], rgbArr[1], rgbArr[2]);
          var hsl = rgbCol.hsl();
          return hsl.s;
        }).reverse();

        var c1 = byHsl[0].col;
        var c2 = byHsl[1].col;

        var gradient = linearGradientTemplate({
          direction: "to bottom",
          from: d3.rgb(c1[0], c1[1], c1[2]),
          to: d3.rgb(c2[0], c2[1], c2[2]),
          stop: (Math.random() * 5) + 50
        });
        return gradient;
      });


    //
    // Tile events
    //


    //Trigger the expanded view of a set of tiles
    dispatch.on("expand", function(name){
      speakerTiles = container.selectAll(".tile." + name);
      speakerTiles.transition()
        .style("width", largeTileWidth)
        .style("height", largeTileHeight);


      //Decolor the little plus sign for expanding/contracting
      d3.select(speakerTiles[0][0].parentNode.parentNode).selectAll("i.fa.fa-plus")
        .transition()
        .style("color", "#bbb");
    });

    //Trigger the non-expanded view of a set of tiles
    dispatch.on("contract", function(name){
      speakerTiles = container.selectAll(".tile." + name);
      speakerTiles.transition()
        .style("width", smallTileWidth)
        .style("height", smallTileHeight);

      //Recolor the little plus sign for expanding/contracting
      d3.select(speakerTiles[0][0].parentNode.parentNode).selectAll("i.fa.fa-plus")
        .transition()
        .style("color", "#ff4b5c");
    });

    //Trigger the loading of images of a set of tiles
    var loadMap = {};
    dispatch.on("loadImage", function(name){
      if(loadMap[name]){
        return;
      }
      speakerTiles = container.selectAll(".tile." + name);

      speakerTiles.append("img")
        .attr("src", function(d, i){
          return getImagePath(d.name, d.frame_number);
        })
        .attr("class", "tile-thumb")
        .style("display", "none")
        .style("opacity", 0)
        .style("width", largeTileWidth)
        .style("height", largeTileHeight)
        .attr("onload", function(d,i){
          d3.select(this).classed("loaded", true);
        });
        loadMap[name] = true;
    });

    //Trigger the display of images of a set of tiles
    dispatch.on("showImage", function(name){
      speakerTiles = container.selectAll(".tile." + name);
      speakerTileImages = container.selectAll(".tile." + name + " img.loaded");

      speakerTileImages.style('display', "inherit");
      speakerTileImages.transition()
        .delay(500)
        .duration(800)
        .style("opacity", 1);

      if(speakerTiles.size() !== speakerTileImages.size()){
        // Not all the images were loaded. Schedule another showImage call
        console.log("not yet loaded, will try again in 500ms");
        setTimeout(function(){
          dispatch.showImage(name);
        }, 1000);
      }
    });

    // Trigger the hiding of images of a set of tiles
    dispatch.on("hideImage", function(name){
      speakerTileImages = container.selectAll(".tile." + name + " img");
      speakerTileImages.transition()
        .duration(200)
        .style("opacity", 0)
        .each("end", function(d,i){
          d3.select(this).style("display", "none");
        });
    });


    d3.select("#expand_all")
      .on("click", function(){
        expand();
        d3.event.preventDefault();
      });

    d3.select("#contract_all")
      .on("click", function(){
        contract();
        d3.event.preventDefault();
      });



    var _expanded = {};
    function toggle(name){
      if(_.isUndefined(name)){
        name = getOrder();
      } else {
        name = [name];
      }

      _.each(name, function(n){
        if(_expanded[name]){
          contract(name);
          _expanded[name] = false;
        } else {
          expand(name);
          _expanded[name] = true;
        }

      });
    }

    function expand(name){
      if(_.isUndefined(name)){
        name = getOrder();
      } else {
        name = [name];
      }

      _.each(name, function(n){
        dispatch.loadImage(n);
        dispatch.expand(n);
        dispatch.showImage(n);
      });
    }

    function contract(name){
      if(_.isUndefined(name)){
        name = getOrder();
      } else {
        name = [name];
      }

      _.each(name, function(n){
        dispatch.hideImage(n);
        dispatch.contract(n);
      });
    }

    // Other controls
    d3.select("#close_yt")
      .on("click", hidePlayArea);

  });
});