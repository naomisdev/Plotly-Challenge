var sel = d3.select('select');
var pnl = d3.select('.panel-body');
var data;

d3.json('samples.json').then(jsonData => {
    data = jsonData;

    var names = data.names;
    names.forEach(name => {
        sel.append('option').text(name);
    });

    showDemo(names[0]);
    showBars(names[0]);
});

// =========================FUNCTION=DEFINITION================================
function optionChanged(name) {
    showDemo(name);
    showBars(names[0]);
};

function showDemo(name) {
    pnl.html('');
    var metadata = data.metadata.filter(obj => obj.id == name)[0];
    Object.entries(metadata).forEach(([key, value]) => {
        pnl.append('h5').text(`${key.toUpperCase()}: ${value}`)
    });
};

function showBars(name) {
    // console.log(data.samples);
    var sample = data.samples.filter(obj => obj.id == name)[0];
    var { otu_ids, sample_values, otu_labels } = sample;

    var barData = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).reverse().map(id => `OTU ${id}`),
        text: otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
    };

    var barLayout = {
        title: 'Top 10 Bacteria Cultures Found',
        margin: {t:30,l:150}
    };

      
      Plotly.newPlot('bar', barData, barLayout);
};