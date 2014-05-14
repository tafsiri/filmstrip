eaea = 1;

$(document).ready(function(){

  function getImagePath(name, frameNumber){
    return "/data/" + name + "/images/eigth/" + name + "-" + frameNumber + ".png";
  }

  function getFullname(name){
    names = {
      "eric_fisher": "Eric Fisher",
      "sam_selikoff": "Sam Selikoff",
      "kennedy_elliot": "Kennedy Elliot",
      "jen": "Jen Christiansen",
      "arvind_satyanarayan": "Arvind Satyanarayan",
      "tom_frederik": "Tom De Smedt +<br> Frederik De Bleser",
      "andy_kirk": "Andy Kirk",
      "david_mimno": "David Mimno",
      "jake_vanderplas": "Jake Vanderplas",
      "jason_sundram": "Jason Sundram",
      "john_resig": "John Resig",
      "lena_groeger": "Lena Groeger",
      "lisa_chris": "Lisa Strausfeld + <br>Christopher Cannon",
      "marian_doerk": "Marian Dörk",
      "mike_bostock": "Mike Bostock",
      "ramnath_vaidyanathan": "Ramnath Vaidyanathan",
      "robert_simmon": "Robert Simmon",
      "mauricio_giraldo": "Mauricio Giraldo"
    };

    fullname = names[name];
    if(fullname){
      return fullname;
    } else{
      return name;
    }
  }


  function getTalkTitle(name){
    titles = {
      "mike_bostock": "Design is a Search Space",
      "eric": "Mapping Billions of Dots",
      "sam_selikoff": "Using D3 with Backbone, Angular and Ember",
      "kennedy_elliot": "Coding for the News",
      "jen": "Visualizing Science: Developing Information Graphics for Scientific American Magazine",
      "arvind_satyanarayan": "Lyra: An Interactive Visualization Design Environment",
      "tom_frederik": "Agile Data Mining and Visualization",
      "andy_kirk": "The Design of Nothing: Null, Zero, Blank",
      "david_mimno": "Understanding Machine Learning with D3: Visualization for Models and Algorithms",
      "jake_vanderplas": "Python in the Browser Age: Data Exploration in the IPython Notebook",
      "jason_sundram": "A full stack approach to data visualization: Terabytes (and beyond) at Facebook",
      "john_resig": "Analyzing Art Data for Fun and Profit",
      "lena_groeger": "Think Small: the Power of Wee Things",
      "lisa_chris": "Bloomberg Visual Data - From Explanation to Exploration",
      "marian_doerk": "From Bird's-eye Views to Street-Level Data Exploration: Taking Text For A Stroll",
      "ramnath_vaidyanathan": "Interactive Visualizations with R",
      "robert_simmon": "Subtleties of Color",
      "mauricio_giraldo": "NYPL Labs Building Inspector: Extracting Data from Historic Maps",
    };

    title = titles[name];
    if(title){
      return title;
    } else{
      return name;
    }
  }

  function getOrder(){
    return [
      "mike_bostock",
      "eric",
      "sam_selikoff",
      "kennedy_elliot",
      "jen",
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
        if(diff < 8 && lastFrameNumber !== 0){
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
        toggle(d.name);
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
      .attr("data-name", function(d){ return d.name;} );

    infoArea
      .append("h2")
      .attr("class", "talk_name")
      .attr("data-expanded", "false")
      .html(function(d,i) {
        return getTalkTitle(d.name);
      })
      .on("click", function(d, i){
        toggle(d.name);
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
    tiles.enter()
      .append("div")
      .attr("class", function(d, i) {
        return "tile " + d.name;
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
          // return datum.count;
        }).reverse();

        // var c = byHsl[0].col;

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


  });
});