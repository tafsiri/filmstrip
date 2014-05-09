$(document).ready(function(){
  console.log("hi");

  function getImagePath(name, frameNumber){
    return "/data/" + name + "/images/full/" + name + "-" + frameNumber + ".png";
  }

  function getFullname(name){
    names = {
      "amanda": "amanda cox",
      "jim": "jim vallandingham"
    };
    fullname = names[name];
    if(fullname){
      return fullname;
    } else{
      return name;
    }
  }


  var dataFile = "data/metadata.json";

  var smallTileWidth = "5px";
  var smallTileHeight = "40px";

  var largeTileWidth = "120px";
  var largeTileHeight = "90px";

  var dispatch = d3.dispatch("expand", "contract",
    "showImage", "hideImage", "loadImage");

  d3.json(dataFile, function(data){

    var container = d3.select("#container");

    // Add divs for all the images associated with one speaker
    // and add a div as a label
    var speaker = container.selectAll(".speaker")
      .data(data);

    speaker.enter()
        .append("div")
        .attr("class", "speaker");

    speaker
      .append("span")
      .attr("class", "speaker_name")
      .attr("data-expanded", "false")
      .text(function(d,i) {
        return getFullname(d.name);
      })
      .on("click", function(d, i){
        var node = d3.select(this);
        var expanded = node.attr("data-expanded");
        if(expanded === "false"){
          dispatch.loadImage(d.name);
          dispatch.expand(d.name);
          dispatch.showImage(d.name);
          node.attr("data-expanded", "true");
        } else {
          dispatch.hideImage(d.name);
          dispatch.contract(d.name);
          node.attr("data-expanded", "false");
        }
      });


    var tiles = speaker.selectAll(".tile")
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
    var linearGradientTemplate = _.template("linear-gradient(<%= direction %>, <%= from %>, <%= to %>)");
    tiles
      .style("width", smallTileWidth)
      .style("height", smallTileHeight)
      .style("margin", "1px")
      .style("border-width", "0px")
      .style("border-style", "solid")
      .style("background-color", function(d, i){
        var sorted = _.sortBy(d.dominant_cols, function(datum){ return datum.count; }).reverse();
        var c = sorted[0].col;
        return d3.rgb(c[0], c[1], c[2]);

      })
      .style("background", function(d, i){
        var sorted = _.sortBy(d.dominant_cols, function(datum){ return datum.count; }).reverse();
        var c1 = sorted[1].col;
        var c2 = sorted[2].col;

        var gradient = linearGradientTemplate({
          direction: "to bottom",
          from: d3.rgb(c1[0], c1[1], c1[2]),
          to: d3.rgb(c2[0], c2[1], c2[2])
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
    });

    //Trigger the non-expanded view of a set of tiles
    dispatch.on("contract", function(name){
      speakerTiles = container.selectAll(".tile." + name);
      speakerTiles.transition()
        .style("width", smallTileWidth)
        .style("height", smallTileHeight);
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


  });
});