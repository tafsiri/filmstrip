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
  var tileWidth = "115px";
  var tileHeight = "80px";
  d3.json(dataFile, function(data){

    var container = d3.select("#container");

    var speaker = container.selectAll(".speaker")
      .data(data);

    speaker.enter()
        .append("div")
        .attr("class", "speaker");

    speaker
      .append("span")
      .attr("class", "speaker_name")
      .text(function(d,i) {
        return getFullname(d.name);
      });


    var tiles = speaker.selectAll(".tile")
      .data(function(d,i) {
        var frames = d.frames;
        _.each(frames, function(f){
          f["name"] = d.name;
        });
        return frames;
      });

    tiles.enter()
      .append("div")
      .attr("class", "tile")
      .style("width", tileWidth)
      .style("height", tileHeight)
      .style("margin", "2px")
      .style("border-width", "0px")
      .style("border-style", "solid")
      .style("background-color", function(d, i){
        var sorted = _.sortBy(d.dominant_cols, function(datum){ return datum.count; }).reverse();
        var c = sorted[0].col;
        return d3.rgb(c[0], c[1], c[2]);
      });

    tiles.append("img")
      .attr("src", function(d, i){
        return getImagePath(d.name, d.frame_number);
      })
      .attr("class", "tile-thumb")
      .style("display", "none")
      .style("width", tileWidth)
      .style("height", tileHeight)
      .on("mouseover", function(d, i) {
        console.log(d);
      })
      .on("click", function(d, i) {
        console.log(i,d);
      });




    //Add some jq animation

    $(".tile img.tile-thumb").on("load", function(){
      var randDel = 500 + (Math.random() * 1000)
      $(this).delay(randDel).fadeIn(1500)

    })



  });
});