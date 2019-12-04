function buildMetadata(sample) {
  var url = "/metadata/" + sample;
  d3.json(url).then(function(response){
    var selector = d3.select("#sample-metadata")
    selector.html("");
    for (let [key, value] of Object.entries(response)) {
     selector
      .append("p")
      .text(`${key}: ${value}`);
    }
    
    // console.log(response);
    // var data = response;
  })
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
d3.json("/samples/"+ sample).then(function(response){
  var otu_ids = response.otu_ids.slice(0,10)
  var sample_values = response.sample_values.slice(0,10)
  var otu_labels = response.otu_labels.slice(0,10)
  // @TODO: Build a Bubble Chart using the sample data
  // Use otu_ids for the x values.
  var trace1 = {
    x : otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker:{
      size:sample_values,
      color:['gray','teal','brown','pink','yellow','blue','green','orange','red','purple']    
    }
  }
  var data = [trace1];
  
  var layout = {
    xaxis: {title:'otu_id'},
    showlegend: false,
    height: 600,
    width: 1000
  }
  var data1 = [{
    values: sample_values,
    labels:  otu_ids,
    type: "pie"
  }]
  layout1 = {
    height: 600,
    width: 500  
  };
  var traceGauge = {
    type: 'pie',
    showlegend: false,
    hole: 0.4,
    rotation: 90,
    values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
    text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    direction: 'clockwise',
    textinfo: 'text',
    textposition: 'inside',
    marker: {
      colors: ['rgb(0, 220, 0)','rgb(0, 200, 0)','rgb(0, 180, 0)','rgb(0, 160, 0)','rgb(0, 140, 0)','rgb(0, 120, 0)','rgb(0, 100, 0)','rgb(0, 80,0)','rgb(0, 54, 0)','white'],
      labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      hoverinfo: 'label'
    }
  }

  // needle
  var degrees = 50, radius = .9
  var radians = degrees * Math.PI / 180
  var x = -1 * radius * Math.cos(radians) * 2
  var y = radius * Math.sin(radians)

  var gaugeLayout = {
    shapes: [{
      type: 'line',
      x0: 0.5,
      y0: 0.5,
      x1: 0.3,
      y1: 0.7,
      line: {
        color: 'black',
        width: 3
      }
    }],
    title: 'Scrubs per week',
    xaxis: {visible: false, range: [-1, 1]},
    yaxis: {visible: false, range: [-1, 1]}
  }

  var dataGauge = [traceGauge]

  Plotly.plot('gauge', dataGauge, gaugeLayout)

  Plotly.newPlot('bubble', data, layout);
  Plotly.newPlot('pie', data1, layout1)
  
});
  
    // Use sample_values for the y values.
    
    // Use sample_values for the marker size.
    
    // Use otu_ids for the marker colors.
    
    // Use otu_labels for the text values.
    
    
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
