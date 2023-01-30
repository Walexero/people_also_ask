//========================================================================
// Drag and drop image handling
//========================================================================

//var fileDrag = document.getElementById("file-drag");
//var fileSelect = document.getElementById("file-upload");
var getSearch = document.getElementById("search_input");
var getRange = document.getElementById("range");

const btn = document.getElementById('action');

//========================================================================
// Web page elements for functions to use
//========================================================================

var imagePreview = document.getElementById("image-preview");
var imageDisplay = document.getElementById("image-display");
var uploadCaption = document.getElementById("upload-caption");
var predResult = document.getElementById("pred-result");
var loader = document.getElementById("loader");
var downloadData;

//========================================================================
// Main button events
//========================================================================

function submitImage() {
  loader.classList.remove("hidden");

  document.getElementById("image-box").innerHTML = "";

  predictImage(getSearch.value, getRange.value)
}

function clearImage() {
  // reset selected files
  fileSelect.value = "";

  // remove image sources and hide them
  imagePreview.src = "";
  imageDisplay.src = "";
  predResult.innerHTML = "";

  hide(imagePreview);
  hide(imageDisplay);
  hide(loader);
  hide(predResult);
  show(uploadCaption);

  imageDisplay.classList.remove("loading");
}

//========================================================================
// Helper functions
//========================================================================

function predictImage(inputSearch, inputDepth) {
  var dataPosting = {
    'inputSearch': inputSearch,
    'inputDepth': inputDepth
  }
  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataPosting)
  })
    .then(resp => {
      if (resp.ok)
        resp.json().then(data => {
          loader.classList.add("hidden");
          btn.classList.remove("hidden");
          displayResult(data);
        });
    })
    .catch(err => {
      window.alert("Oops! Something went wrong.");
    });
}

function displayImage(image, id) {
  // display image on given id <img> element
  let display = document.getElementById(id);
  display.src = image;
  show(display);
}

function displayResult(data) {
  downloadData = data['result'];
  var treeData;
  
  // display the result
  if (getRange.value == "1"){
    downloadData = data;
    treeData = [
      {
        "name" : getSearch.value,
        "parent": "null",
        "children": [
          {
            "name": data['result'][0],
            "parent": getSearch.value,
          },
          {
            "name": data['result'][1],
            "parent": getSearch.value,
          },
          {
            "name": data['result'][2],
            "parent": getSearch.value,
          }
        ]
      }
    ];
  }
  else if (getRange.value == "2"){
    keyarr = Object.keys(data['result']);
    keyvalue = Object.values(data['result']);

    treeData = [
      {
        "name" : getSearch.value,
        "parent": "null",
        "children": [
          {
            "name": keyarr[0],
            "parent": getSearch.value,
            "children": [
              {
                "name": keyvalue[0][0],
                "parent": keyarr[0]
              },
              {
                "name": keyvalue[0][1],
                "parent": keyarr[0]
              },
              {
                "name": keyvalue[0][2],
                "parent": keyarr[0]
              }
            ]
          },
          {
            "name": keyarr[1],
            "parent": getSearch.value,
            "children": [
              {
                "name": keyvalue[1][0],
                "parent": keyarr[1]
              },
              {
                "name": keyvalue[1][1],
                "parent": keyarr[1]
              },
              {
                "name": keyvalue[1][2],
                "parent": keyarr[1]
              }
            ]
          },
          {
            "name": keyarr[2],
            "parent": getSearch.value,
            "children": [
              {
                "name": keyvalue[2][0],
                "parent": keyarr[2]
              },
              {
                "name": keyvalue[2][1],
                "parent": keyarr[2]
              },
              {
                "name": keyvalue[2][2],
                "parent": keyarr[2]
              }
            ]
          }
          
          
        ]
      }
    ];
  }
  else {
    //keyarr = Object.keys(data['result']);
    //keyvalue = Object.values(data['result']);
    console.log("depth is 3")
    /* treeData = [ {'first': 
      {
        'Why is school so important?': [], 
      'What is a school in definition?': 
      [
        'What is the best definition of school?', 
        'What is the original meaning of the word school?', 
        'What is the full meaning of schooling?'
      ], 
      'What is the meaning of the word school in the story?': 
        [
          'What is the true meaning of the word school?', 
          'What word is school?', 
          'What did the word school originally mean?'
        ]
      }, 
      'second': 
      [
        [
          'What is the true meaning of the word school?', 
          'What is the original meaning of the word school?', 
          'What is the full meaning of schooling?'
        ], 
        [
          'What is the true meaning of the word school?', 
          'Who came up with the word school?', 
          'What did the word school originally mean?'
        ], 
        [
          'What is schooling and an example?', 
          'What is the purpose of schooling?', 
          'What is the most important purpose of schooling?'
        ], 
        [
          'What did the word school originally mean?', 
          'When was the word school first used?', 
          'What is the true meaning of the word school?'
        ], 
        [
          'Is school word a noun?', 
          'Is school noun or verb?', 
          'Can we use school as a verb?'
        ], [
          'When was the word school first used?', 
          'When was school first a thing?', 
          'Who invented the word school?'
        ]
      ]
    }
  ]; */

  keyarr = Object.keys(data['result']);
  keyvalue = Object.values(data['result']);

  console.log(keyarr)
  console.log(keyvalue)
  
  firstkeys = Object.keys(keyvalue[0])
  firstValues = Object.values(keyvalue[0])

  secondkeys = Object.keys(keyvalue[1])
  secondValues = Object.values(keyvalue[1])

  console.log(secondkeys)
  console.log(secondValues[0])

  treeData = [
    {
      "name" : getSearch.value,
      "parent": "null",
      "children": [
        {
          "name": firstkeys[0],
          "parent": getSearch.value,
          "children": [
            {
              "name": firstValues[0][0],
              "parent": firstkeys[0],
              "children": [
                {
                  "name": secondValues[0][0],
                  "parent": firstValues[0][0]
                  
                },
                {
                  "name": secondValues[0][1],
                  "parent": firstValues[0][0]
                },
                {
                  "name": secondValues[0][2],
                  "parent": firstValues[0][0]
                }
              ]
            },
            {
              "name": firstValues[0][1],
              "parent": firstkeys[0],
              "children": [
                {
                  "name": secondValues[1][0],
                  "parent": firstValues[0][1]
                  
                },
                {
                  "name": secondValues[1][1],
                  "parent": firstValues[0][1]
                },
                {
                  "name": secondValues[1][2],
                  "parent": firstValues[0][1]
                }
              ]
            },
            {
              "name": firstValues[0][2],
              "parent": firstkeys[0],
              "children": [
                {
                  "name": secondValues[2][0],
                  "parent": firstValues[0][2]
                  
                },
                {
                  "name": secondValues[2][1],
                  "parent": firstValues[0][2]
                },
                {
                  "name": secondValues[2][2],
                  "parent": firstValues[0][2]
                }
              ]
            }
          ]
        },
        {
          "name": firstkeys[1],
          "parent": getSearch.value,
          "children": [
            {
              "name": firstValues[1][0],
              "parent": firstkeys[1],
              "children": [
                {
                  "name": secondValues[3][0],
                  "parent": firstValues[1][0]
                  
                },
                {
                  "name": secondValues[3][1],
                  "parent": firstValues[1][0]
                },
                {
                  "name": secondValues[3][2],
                  "parent": firstValues[1][0]
                }
              ]
            },
            {
              "name": firstValues[1][1],
              "parent": firstkeys[1],
              "children": [
                {
                  "name": secondValues[4][0],
                  "parent": firstValues[1][1]
                  
                },
                {
                  "name": secondValues[4][1],
                  "parent": firstValues[1][1]
                },
                {
                  "name": secondValues[4][2],
                  "parent": firstValues[1][1]
                }
              ]
            },
            {
              "name": firstValues[1][2],
              "parent": firstkeys[1],
              "children": [
                {
                  "name": secondValues[5][0],
                  "parent": firstValues[1][2]
                  
                },
                {
                  "name": secondValues[5][1],
                  "parent": firstValues[1][2]
                },
                {
                  "name": secondValues[5][2],
                  "parent": firstValues[1][2]
                }
              ]
            }
          ]
        },
        {
          "name": firstkeys[2],
          "parent": getSearch.value,
          "children": [
            {
              "name": firstValues[2][0],
              "parent": firstkeys[2],
              "children": [
                {
                  "name": secondValues[6][0],
                  "parent": firstValues[2][0]
                  
                },
                {
                  "name": secondValues[6][1],
                  "parent": firstValues[2][0]
                },
                {
                  "name": secondValues[6][2],
                  "parent": firstValues[2][0]
                }
              ]
            },
            {
              "name": firstValues[2][1],
              "parent": firstkeys[2],
              "children": [
                {
                  "name": secondValues[7][0],
                  "parent": firstValues[2][1]
                  
                },
                {
                  "name": secondValues[7][1],
                  "parent": firstValues[2][1]
                },
                {
                  "name": secondValues[7][2],
                  "parent": firstValues[2][1]
                }
              ]
            },
            {
              "name": firstValues[2][2],
              "parent": firstkeys[2],
              "children": [
                {
                  "name": secondValues[8][0],
                  "parent": firstValues[2][2]
                  
                },
                {
                  "name": secondValues[8][1],
                  "parent": firstValues[2][2]
                },
                {
                  "name": secondValues[8][2],
                  "parent": firstValues[2][2]
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  }

  var margin = {top: 20, right: 30, bottom: 20, left: 30},
	width = 1200 - margin.right - margin.left,
	height = 1000 - margin.top - margin.bottom;
	
  var i = 0,
    duration = 750,
    root;

  var tree = d3.layout.tree()
    .size([height, width]);

  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("div#image-box").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;
    
  update(root);

  d3.select(self.frameElement).style("height", "500px");

  function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

    // Normalize for fixed-depth.
    // nodes.forEach(function(d) { d.y = d.depth * 180; });
    nodes.forEach(function(d) { d.y = d.depth * 260; });

    // Update the nodes…
    var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

    nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
      .attr("r", 10)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
      .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

    nodeExit.select("circle")
      .attr("r", 1e-6);

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
      var o = {x: source.x0, y: source.y0};
      return diagonal({source: o, target: o});
      });

    // Transition links to their new position.
    link.transition()
      .duration(duration)
      .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
      var o = {x: source.x, y: source.y};
      return diagonal({source: o, target: o});
      })
      .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
    });
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
    d._children = d.children;
    d.children = null;
    } else {
    d.children = d._children;
    d._children = null;
    }
    update(d);
  }
} 

function hide(el) {
  // hide an element
  el.classList.add("hidden");
}

function show(el) {
  // show an element
  el.classList.remove("hidden");
}



const download = function (data) {
 
  // Creating a Blob for having a csv file format
  // and passing the data with type
  const blob = new Blob([data], { type: 'text/csv' });

  // Creating an object for downloading url
  const url = window.URL.createObjectURL(blob)

  // Creating an anchor(a) tag of HTML
  const a = document.createElement('a')

  // Passing the blob downloading url
  a.setAttribute('href', url)

  // Setting the anchor tag attribute for downloading
  // and passing the download file name
  a.setAttribute('download', 'download.csv');

  // Performing a download with click
  a.click()
}

const csvmaker = function (data) {

  // Empty array for storing the values
  csvRows = [];

  // Headers is basically a keys of an
  // object which is id, name, and
  // profession
  const headers = Object.keys(data);

  // As for making csv format, headers
  // must be separated by comma and
  // pushing it into array
  csvRows.push(headers.join(','));

  // Pushing Object values into array
  // with comma separation
  const values = Object.values(data).join(',');
  csvRows.push(values)

  // Returning the array joining with new line
  return csvRows.join('\n')
}

const get = function () {

  const csvdata = csvmaker(downloadData);
  download(csvdata);
}

btn.addEventListener('click', get);
