// Metadata helper functions

function getMetaData(name){
  names = {
    "eric_fisher": {
      fullName: "Eric Fisher",
      talkTitle: "Mapping Billions of Dots",
      videoId: "sqXArLn0pOY",
      abstract: "<p>Maps made of millions or billions of dots can be beautiful and informative, but can overwhelm tools that are not designed to handle such a large volume of data. In this session I describe what I have learned about structuring data for efficient processing and display on the web and about rendering it with visual clarity across a wide range of scales and densities, with examples from <a href='https://www.mapbox.com/'>Mapbox</a> projects.</p>"
    },
    "sam_selikoff": {
      fullName: "Sam Selikoff",
      talkTitle: "Using D3 with Backbone, Angular and Ember",
      videoId: "ca3pQWc2-Xs",
      "abstract": "<p>In this talk, Sam Selikoff will discuss the use of D3 within JavaScript applications built with MVC frameworks, while embracing the frameworks' individual idioms and treating D3 code as first-class. </p><p>This talk will discuss specifics of using D3 within the context of three popular frameworks: Backbone, Angular and Ember. Sam will discuss the limits and strengths of Backbone views, how to create D3-based Angular directives and demonstrate building Ember components with D3.</p><p>Sam will also discuss reusability of D3-based code across the three frameworks.</p>",
    },
    "kennedy_elliot": {
      fullName: "Kennedy Elliot",
      talkTitle: "Coding for the News",
      videoId: "6xeBs5UoqVk",
      "abstract": "<p>Each week the Washington Post publishes five to ten graphics, many of which are interactive and nearly all of them have a web presence. The reach of the graphics department covers breaking news, investigative reporting, local and national news (and everything in between), features, daily news and enterprise stories.</p><p>In this talk, Kennedy will explain the tools, coding practices, skills and process behind some of the <a href='http://www.washingtonpost.com/wp-srv/special/politics/2014-state-of-the-union/language-of-sotu/'>interactive</a> <a href='http://www.washingtonpost.com/blogs/the-fix/wp/2013/12/29/red-america-vs-blue-america/'>work</a> we see on the Washington Post.</p>",
    },
    "jen_christiansen": {
      fullName: "Jen Christiansen",
      talkTitle: "Visualizing Science: Developing Information Graphics for Scientific American Magazine",
      videoId: "QJU4FLn2weg",
      "abstract": "<p>From its first data-based chart (on the topic of inertia, momentum, and projection) up through to today's web interactives, <a href='http://www.scientificamerican.com/'>Scientific American Magazine</a> has been communicating topics in science and technology to non-specialist audiences with the help of graphics since 1845.</p><p>Jen will walk through the process of developing print, web, and tablet data visualizations for Scientific American, from identifying source datasets, to working with freelance visualizers--with an eye to developing graphics that embrace their skills and style, but still feel at home within the context of a monthly publication (with an established framework and aesthetic identity on paper and online). </p><p>From initial concept through final production, we'll examine projects such as Jan Willem Tulp's <a href='http://www.scientificamerican.com/article/flavor-connection-taste-map-interactive/'>flavor connection network</a> (Sep 2013 issue), and Moritz Stefaner's <a href='http://www.scientificamerican.com/article/where-the-wild-bees-are/'>bee graphic</a> (Dec 2013 issue) from the art director's point of view.</p>",
    },
    "arvind_satyanarayan": {
      fullName: "Arvind Satyanarayan",
      talkTitle: "Lyra: An Interactive Visualization Design Environment",
      videoId: "io7BSu6RIYM",
      "abstract": "<p><a href='http://idl.cs.washington.edu/projects/lyra/'>Lyra</a> is an interactive environment that enables custom visualization design without writing any code. Lyra also provides a data pipeline interface for iterative visual specification of data transformations and layout algorithms. Lyra is more expressive than interactive systems like Tableau, allowing designers to create custom visualizations comparable to hand-coded visualizations created using D3 or Processing. These visualizations can then be easily published and reused on the Web. Lyra will be released publicly as a free service and as an open source project at the end of February.</p>",
    },
    "tom_frederik": {
      fullName: "Tom De Smedt +<br> Frederik De Bleser",
      talkTitle: "Agile Data Mining and Visualization",
      videoId: "0oUP7uHAsNA",
      "abstract": "<p><a href='https://maak.io'>MAAK</a> is the next evolution of <a href='http://nodebox.net'>NodeBox</a>, and provides a completely browser based environment for visual programming. <a href='http://www.clips.ua.ac.be/pattern'>Pattern</a> is a python based web mining and text analysis module for the Python programming language. Their creators, <a href='http://enigmeta.com'>Frederik</a> and <a href='http://www.organisms.be'>Tom</a>, teamed up to integrate these tools and have created a robust data analysis and visualization environment capable of creating interactive graphics that can be published on the web. Their work empowers artists and web developers with no prior expertise in data mining, and researchers seeking to explore their data visually.</p><p>In this talk, Tom and Frederik will demonstrate how <a href='https://maak.io'>MAAK</a> + <a href='http://www.clips.ua.ac.be/pattern'>Pattern</a> work together, show case studies and discuss the future of the platform.</p>"
    },
    "andy_kirk": {
      fullName: "Andy Kirk",
      talkTitle: "The Design of Nothing: Null, Zero, Blank",
      videoId: "JqzAuqNPYVM",
      "abstract": "<p>In this talk Andy will explore both sides of the design challenge posed by presenting 'nothing'.</p><p>First, the talk will examine the challenge of representing null and zero, two very different states that can offer valuable insights. How does one most effectively encode the absence of a value? How do you make ‘nothing’ visible? What can we learn from the absence of data compared to presence of data? What are some of the most enduring representations of 'nothing'?</p><p>Second, the talk will investigate the oft-neglected power of emptiness. Blank space is a vital design component but requires sound judgement, restraint and a good deal of courage. Used well, it can unlock the perception of pattern, form and arrangement as explained by Gestalt Psychology.</p><p>We will examine some of the key considerations and see examples of both the good and the bad.</p>"
    },
    "david_mimno": {
      fullName: "David Mimno",
      talkTitle: "Understanding Machine Learning with D3: Visualization for Models and Algorithms",
      videoId: "-0Pe30Zz3a0",
      "abstract": "<p>Statistical machine learning is an increasingly valuable skill in today's data-rich world. Traditionally machine learning papers and tutorials take a highly abstract, mathematical route to explaining models and algorithms. This mathematical focus not only creates barriers to entry, but can also create excessive confidence in models, whose theoretical guarantees may not survive contact with messy real-world data. Visual explanations through pictures and diagrams are often our most effective teaching tools in such situations.</p><p>In this talk David will show models and algorithms that lend themselves to visual explanations. From visualizing the models themselves, to their iterative steps, results and checking methodologies, this talk will demonstrate core machine learning concepts using d3.js.</p>"
    },
    "jake_vanderplas": {
      fullName: "Jake Vanderplas",
      talkTitle: "Python in the Browser Age: Data Exploration in the IPython Notebook",
      videoId: "NzX7DDRkecU",
      "abstract": "<p>The Python language and associated scientific libraries provide a powerful open-source environment for interactive data visualization and manipulation. One important component of these tools is the <a href='http://ipython.org/notebook'>IPython Notebook</a>, platform in which narrative text, data visualizations, mathematical annotations, code in a variety of languages, and more can be combined into one seamless and sharable document. The notebook is fundamentally a browser-based application, in which client-side javascript interacts with the Python kernel to execute snippets of code and display the results. This design choice has opened the way for a host of extensions which take advantage of the browser front-end to enable powerful interactive visualizations.</p><p>In this talk Jake will demonstrate some of the recent developments in notebook-based interactive visualization: these include the kernel-aware javascript widgets of the recent IPython 2.0 release; the <a href='http://nbviewer.ipython.org/github/jakevdp/JSAnimation/blob/master/animation_example.ipynb'>JSAnimation</a> library, which builds clean javascript-powered animations from native matplotlib code; and the new <a href='http://mpld3.github.io/'>mpld3</a> package, which translates matplotlib plots into interactive D3js-based visualizations.</p>"
    },
    "jason_sundram": {
      fullName: "Jason Sundram",
      talkTitle: "A full stack approach to data visualization: Terabytes (and beyond) at Facebook",
      videoId: "hGDNBGShQVY",
      "abstract": "<p>To a lot of people, Facebook is a website for interacting with friends and family. It's also a giant treasure trove of rich, <a href='https://www.facebook.com/data/notes'>fascinating data</a>. Facebook has made accessing large data sets easier in part by releasing open source technologies like Presto and Tornado.</p><p>In this talk Jason will explain how he turns terabytes of data into compelling, interactive, data-driven applications whose purposes run the gamut from internal insights to debugging, to beautiful visualizations. He will show examples of each kind of visualization, and talk about the architecture behind each and how it can be applied in other contexts. Jason will cover several open source technologies like <a href='http://square.github.io/crossfilter/'>crossfilter.js</a>, <a href='http://nickqizhu.github.io/dc.js/'>dc.js</a>, <a href='http://d3js.org'>d3.js</a> and <a href='http://zeromq.org/'>0mq</a>.</p>"
    },
    "john_resig": {
      fullName: "John Resig",
      talkTitle: "Analyzing Art Data for Fun and Profit",
      videoId: "u2pZ_OVRzVc",
      "abstract": "<p>Using Node.js John has been building tools and libraries to analyze art and art data. In this talk he will dig into the art and the tools and how they've been helping art historians, researchers, and collectors better understand all the data that they deal with. The challenges of aggregating and correcting data from many international institutions will be explored in-depth.</p>",
    },
    "lena_groeger": {
      fullName: "Lena Groeger",
      talkTitle: "Think Small: the Power of Wee Things",
      videoId: "ZPAp3Fxx7TE",
      "abstract": "<p>Wee things: they might be small, but they have a lot to offer the world of data visualization. Showing wee things in combination can be an effective way to make comparisons, explain a step-by-step process or provide visual cues for action. From small multiples to sparklines, mini maps to tiny text, come find out why wee things work so well, how they've been used in the past, and how you too can use them in your work.</p>"
    },
    "lisa_chris": {
      fullName: "Lisa Strausfeld + <br>Christopher Cannon",
      talkTitle: "Bloomberg Visual Data - From Explanation to Exploration",
      videoId: "Qm4Ilw76hTI",
      "abstract": "<p>Bloomberg has data—lots of it. But how does one take Bloomberg's unparalleled data, analytics and editorial content and create meaningful visualizations and tools for a global consumer audience? How can interactive data products provide both explanation for the uninitiated and exploration for the expert, bridging the gap for these different use cases?</p><p>The <a href='http://www.bloomberg.com/visual-data/'>Bloomberg Visual Data team</a> creates visualizations that are updatable, scalable and editorially-relevant. This presentation will show how each product starts with the available data, how that data informs the design process, and the technology required to develop it. This talk will examine the process in finding and vetting data, how we sketch with that data, the visual and interaction design decisions that were made and the struggle of telling a compelling and understandable story through data. Examples of what worked and didn't quite work will be shown, as well as the technologies used in our workflow and their impact in the final product.</p>"
    },
    "marian_doerk": {
      fullName: "Marian Dörk",
      talkTitle: "From Bird's-eye Views to Street-Level Data Exploration: Taking Text For A Stroll",
      videoId: "SXMyxUiIeS0",
      "abstract": "<p>Visualization promises to enable data analysis at a high-level. Typically relying on aggregation, machine learning, and statistics, the resulting representations offer abstract shapes that take the place of rich resources and relationships. While overviews are consensually considered to be useful, they also tend to distance us from the data they promise to help us understand.</p><p>In this talk, Marian will make the case against the primacy of overviews and advocate for a navigational approach to visualizing text corpora and faceted collections. He will cover practical aspects of creating visualizations for navigation as well as conceptual aspects about representation. Marian will synthesize the experiences from several design studies that involved close collaborations with book editors, a corpus linguist, other researchers as well as observations from week to year-long deployments.</p>"
    },
    "mike_bostock": {
      fullName: "Mike Bostock",
      talkTitle: "Design is a Search Space",
      videoId: "fThhbt23SGM"
    },
    "ramnath_vaidyanathan": {
      fullName: "Ramnath Vaidyanathan",
      talkTitle: "Interactive Visualizations with R",
      videoId: "CtDT2KbnKrk",
      "abstract": "<p>In this talk, Ramnath will discuss a generic approach to create, customize and share interactive visualizations straight from R, using a simple and consistent plotting interface, leveraging several javascript visualization libraries and MVC frameworks.</p><p>Ramnath will show how to create and share interactive visualizations from R using <a href='http://rcharts.io'>rCharts</a>, customize them further by injecting interactivity using <a href='http://opencpu.org'>OpenCPU</a> and MVC frameworks like AngularJS and <a href='http://www.rstudio.com/shiny/'>Shiny</a>, and finally how this approach might be generalized and extended to other languages like Python and Julia.</p>"
    },
    "robert_simmon": {
      fullName: "Robert Simmon",
      talkTitle: "Subtleties of Color",
      videoId: "DjJr8D4Bxjw",
      "abstract": "<p>The purpose of data visualization is to illuminate data. To show patterns and relationships that are otherwise hidden in an impenetrable mass of numbers.</p><p>In many datasets, color is one of the most effective means of accurately conveying quantity, and certainly the most widespread. Careful use of color enhances clarity, aids storytelling, and draws a viewer into your dataset. Poor use of color can obscure data, or even mislead.</p><p>In this talk Robert will illustrate the principles behind choosing colors based on human perception through historical examples and contemporary NASA visualizations, and share the many web-based tools he uses to craft perceptually-based color palettes.</p>"
    },
    "mauricio_giraldo": {
      fullName: "Mauricio Giraldo",
      talkTitle: "NYPL Labs Building Inspector: Extracting Data from Historic Maps",
      videoId: "Oph1o3IZEFU",
      "abstract": "<p><a href='http://www.nypl.org/'>The New York Public Library</a> map collection contains hundreds of atlases and maps spanning several centuries. Among them are US insurance atlases from the 19th and early 20th centuries. These atlases offer a wealth of geographic information about buildings in New York City such as addresses, building materials, height and use. However, this data is currently 'trapped' in these atlases, unavailable for public research outside of the NYPL map room.</p><p><a href='http://buildinginspector.nypl.org/'>The Building Inspector</a> is the latest tool by NYPL Labs to extract data from these atlases through a combination of computational (vectorization, computer vision, alpha shapes) and human (crowdsourcing, game design concepts) processes.</p><p>This session will describe the workflow & computational methods behind the Building Inspector and provide additional information on uses of this data as well as the implications of open access to historical data.</p>"
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
  var meta = getMetaData(name);
  if(meta){
    return meta["videoId"];
  }
}

function getAbstract(name){
  var meta = getMetaData(name);
  if(meta){
    return meta["abstract"];
  }
}

//
// Main Rendering
//

// Returns relative urls to tile images
function getImagePath(name, frameNumber){
  return "/data/" + name + "/images/eigth/" + name + "-" + frameNumber + ".png";
}

// Returns the list of speakers in the order they shoudl be rendered.
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

function getData(url, callback) {
  d3.json(url, function(data){
    //Do a bit of cleanup on the data to hide frames that are close together in time.
    _.each(data, function(speaker_data){
      var lastFrameNumber = 0;
      for(var i = 1; i < speaker_data["frames"].length; i++){
        var diff = speaker_data["frames"][i]["frame_number"] - lastFrameNumber;

        lastFrameNumber = speaker_data["frames"][i]["frame_number"];
        if(diff < 10 && lastFrameNumber !== 0){
          speaker_data["frames"][i] = undefined;
        }
      }
      speaker_data["frames"] = _.compact(speaker_data["frames"]);
    });

    var ordered = getOrder();
    data = _.sortBy(data, function(d){
      return ordered.indexOf(d["name"]);
    });
    callback(data);
  });
}

function renderTiles(data){
  var _expanded = {};

  var smallTileWidth = "8px";
  var smallTileHeight = "55px";
  var largeTileWidth = "140px";
  var largeTileHeight = "100px";

  var dispatch = d3.dispatch("expand", "contract",
    "showImage", "hideImage", "loadImage");

  var container = d3.select("#container");

  // Add Row

  var speaker = container.selectAll(".speaker")
    .data(data);

  speaker.enter().append("div")
      .attr("class", "speaker");

  // Add 1st Col (Speaker Info)

  var infoArea = speaker.append("div")
      .attr("class", "speaker-info");

  var toggleFrame = function(d, i){
    var isMobile = d3.select("#state-indicator").style("z-index") == "2";
    if(isMobile){
      playVideo(d);
    } else {
      toggle(d["name"]);
    }
  };

  infoArea.append("h2")
    .attr("class", "speaker_name")
    .html(function(d,i) {
      return getFullname(d["name"]);
    })
    .on("click", toggleFrame);

  infoArea.append("i")
    .attr("class", "fa fa-plus")
    .attr("data-name", function(d){ return d["name"];} )
    .on("click", toggleFrame);

  infoArea.append("i")
    .attr("class", "fa fa-youtube-play")
    .attr("data-name", function(d){ return d["name"];} )
    .on("mouseover", function(d,i){
      showPlayhead(); //will also cancel hidePlayhead
      updatePlayhead("start");
    })
    .on("mouseleave", function(){
      hidePlayhead(300);
    })
    .on("click", function(d, i){
      playVideo(d, true);
    });

  infoArea
    .append("h2")
    .attr("class", "talk_name")
    .html(function(d,i) {
      return getTalkTitle(d["name"]);
    })
    .on("click", toggleFrame);

   infoArea
    .append("span")
    .attr("class", "abstract")
    .html(function(d,i) {
      return getAbstract(d["name"]);
    });


  // Add 2nd Col (Frame tiles)

  var tileArea = speaker.append("div")
      .attr("class", "tile-area");

  var tiles = tileArea.selectAll(".tile")
    .data(function(d,i) {
      //Attach data from the parent onto each child object
      //to make fetching the name easier;
      var frames = d.frames;
      _.each(frames, function(f){
        f["name"] = d["name"];
      });
      return frames;
    });

  // Create the div to represent a tile
  tiles.enter().append("div")
    .attr("class", function(d, i) { return "tile " + d["name"]; })
    .on("click", function(d, i){
      expand(d["name"], this);
    })
    .on("mouseover", function(d, i){
      showPlayhead(); //will also cancel hidePlayhead
      updatePlayhead(d);

      var el = d3.select(this);
      if(_expanded[d["name"]] !== true){
        el
        .transition()
        .duration(150)
        .style("background-size", "100% 200%")
        .style("background-position", "0 90%")
        .style("width", "18px")
        .style("height", smallTileHeight);
      }

    })
    .on("mouseout", function(d, i){
      hidePlayhead(300);

      var el = d3.select(this);
      if(_expanded[d["name"]] !== true){
        el
          .transition()
          .duration(150)
          .style("background-size", "100% 100%")
          .style("background-position", "0 0%")
          .style("margin-right", "1px")
          .style("margin-left", "0px")
          .attr("data-mini-expanded", "false")
          .style("width", smallTileWidth)
          .style("height", smallTileHeight);
      }
    });

  //Style the tile
  var linearGradientTemplate = _.template("linear-gradient(<%= direction %>, <%= from %> <%= stop%>%, <%= to %>)");
  tiles
    .style("width", smallTileWidth)
    .style("height", smallTileHeight)
    .style("margin-right", "1px")
    .style("background-color", function(d, i){
      //Set this for browsers that do not support the gradient we
      //set below
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
    .style("background-image", function(d, i){
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
  dispatch.on("expand", function(name, element){
    speakerTiles = container.selectAll(".tile." + name);
    speakerTiles.transition()
      .style("width", largeTileWidth)
      .style("height", largeTileHeight)
      .each("end", function(d,i){
        if(!_.isUndefined(element)){
          if(this === element){
            $('html,body').animate({
              scrollTop: $(element).offset().top - 100
            }, 600);
          }

          var img = d3.select(element).select("img");
          img.transition()
            .ease("linear")
            .delay(620)
            .duration(400)
            .style("border-width", "20px")
            .each("end", function(){
              img.transition()
                .ease("bounce")
                .duration(500)
                .style("border-width", "0px");
            });
        }
      });

    //Decolor the little plus sign for expanding/contracting
    d3.select(speakerTiles[0][0].parentNode.parentNode).selectAll("i.fa.fa-plus")
      .classed("fa-minus", true)
      .classed("fa-plus", false)
      .transition()
      .style("color", "#bbb");

    //Show the abstract
    d3.select(speakerTiles[0][0].parentNode.parentNode).selectAll("span.abstract")
      .style("display", "block");


  });

  //Trigger the non-expanded view of a set of tiles
  dispatch.on("contract", function(name){
    speakerTiles = container.selectAll(".tile." + name);
    speakerTiles.transition()
      .style("width", smallTileWidth)
      .style("height", smallTileHeight);

    //Recolor the little plus sign for expanding/contracting
    d3.select(speakerTiles[0][0].parentNode.parentNode).selectAll("i.fa.fa-minus")
      .classed("fa-plus", true)
      .classed("fa-minus", false)
      .transition()
      .style("color", "#ff4b5c");

    //Hide the abstract
    d3.select(speakerTiles[0][0].parentNode.parentNode).selectAll("span.abstract")
      .style("display", "none");
  });

  //Trigger the loading of images of a set of tiles
  var _loadMap = {};
  dispatch.on("loadImage", function(name){
    if(_loadMap[name]){
      return;
    }
    speakerTiles = container.selectAll(".tile." + name);

    speakerTiles.append("img")
      .attr("src", function(d, i){
        return getImagePath(d["name"], d.frame_number);
      })
      .attr("class", "tile-thumb")
      .style("display", "none")
      .style("opacity", 0)
      .style("width", largeTileWidth)
      .style("height", largeTileHeight)
      .style("border-width", "0px")
      .style("border-color", "#ffffff")
      .style("border-style", "solid")
      .on("click", function(d,i){
        playVideo(d);
      })
      .attr("onload", function(d,i){
        d3.select(this).classed("loaded", true);
      });
      _loadMap[name] = true;
  });

  //Trigger the display of images of a set of tiles
  dispatch.on("showImage", function(name){
    speakerTiles = container.selectAll(".tile." + name);
    speakerTileImages = container.selectAll(".tile." + name + " img.loaded");

    speakerTileImages.style('display', "inherit");
    speakerTileImages.transition()
      .delay(200)
      .duration(600)
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

  // Some helper functions to expand and contract tiles
  // under various conditions.


  function toggle(name){
    if(_.isUndefined(name)){
      name = getOrder();
    } else {
      if(!_.isArray(name)){
        name = [name];
      }
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

  function expand(name, element){
    if(_.isUndefined(name)){
      name = getOrder();
    } else {
      if(!_.isArray(name)){
        name = [name];
      }
    }

    _.each(name, function(n){
      _expanded[name] = true;
      dispatch.loadImage(n);
      dispatch.expand(n, element);
      dispatch.showImage(n);
    });
  }

  function contract(name){
    if(_.isUndefined(name)){
      name = getOrder();
    } else {
      if(!_.isArray(name)){
        name = [name];
      }
    }

    _.each(name, function(n){
      _expanded[name] = false;
      dispatch.hideImage(n);
      dispatch.contract(n);
    });
  }

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

  // Other controls
  d3.select("#close_yt")
    .on("click", hidePlayArea);

}

// YouTube Area Controls

// The playhead is the little area in thestatus bar that shows
// the time associociated with a tile.

var _playHeadVisible;
function showPlayhead(d){
  _playHeadVisible = true;

  d3.select("#playhead")
    .transition()
    .duration(200)
    .style("opacity", 1);
}

function hidePlayhead(timeout){
  _playHeadVisible = false;

  //showPlayhead is allowed to cancel the hiding
  //of the playhead so we delay for a bit to allow
  //it a chance
  _.delay(function(){
    if(_playHeadVisible === false){
      d3.select("#playhead")
      .transition()
      .style("opacity", 0);
    }
  }, timeout);
}

function updatePlayhead(d){
  var message = "";

  if(d == "start"){
    message = "Play from start";
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

    message = "Play from " + minutes + ":" + seconds;
  }

  d3.select("#playhead")
    .text(message);
}

// The play area is the larger (usually hidden) footer that contains the
// youtube embed
function showPlayArea(){
  console.log("SHOWPLA")
  d3.select(".video-container")
    .transition()
    .style("height", "480px")
    .each("end", function(){
      d3.select("#close_yt")
        .transition()
        .duration(100)
        .style("opacity", 1);
    });
}

function hidePlayArea(){
  d3.event.preventDefault();
  if(!_.isUndefined(player)){
    player.pauseVideo();
  }

  d3.select(".video-container")
    .transition()
    .style("height", "0px")
    .each("end", function(){
      d3.select("#close_yt")
        .transition()
        .duration(100)
        .style("opacity", 0);
    });
}

var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '390',
    width: '640',
  });
}

function playVideo(d, fromStart){
  d3.event.preventDefault();
  var isMobile = d3.select("#state-indicator").style("z-index") == "2";
  var url;
  if(isMobile){
    var id = getVideoId(d["name"]);
    if(id){
      url = "http://m.youtube.com/watch?v=" + id;
      window.open(url, '_blank');
    }
  } else if(!_.isUndefined(player)){
    var startTime;
    if(fromStart){
      startTime = 0;
    } else{
      startTime = d.frame_number;
    }
    var videoId = getVideoId(d["name"]);

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

$(document).ready(function() {
  var dataFile = "data/metadata.json";
  getData(dataFile, renderTiles);
});