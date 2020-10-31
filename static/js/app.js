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
    showGauge(names[0]);
    showBubbles(names[0]);
});

// =========================FUNCTION=DEFINITION================================
function optionChanged(name) {
    showDemo(name);
    showBars(name);
    showGauge(name);
    showBubbles(name);
};

function showDemo(name) {
    pnl.html('');
    var metadata = data.metadata.filter(obj => obj.id == name)[0];
    Object.entries(metadata).forEach(([key, value]) => {
        pnl.append('h5').text(`${key.toUpperCase()}: ${value}`)
    });
};

function showBars(name) {
    var sample = data.samples.filter(obj => obj.id == name)[0];
    var { otu_ids, sample_values, otu_labels } = sample;

    var barData = [
        {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }
    ];
    var barLayout = {
        title: 'Top 10 Bacteria Cultures Found',
        margin: { t: 30, l: 150 }
    };

    Plotly.newPlot('bar', barData, barLayout);
};

function showGauge(name) {
    var frq = data.metadata.filter(obj => obj.id == name)[0].wfreq;
    var gaugeData = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: frq,
            title: { text: "Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 400 },
            gauge: { axis: { range: [0, 9] } }
        }
    ];

    var layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', gaugeData, layout);
};

function showBubbles(name) {
    var sample = data.samples.filter(obj => obj.id == name)[0];
    var { otu_ids, sample_values, otu_labels } = sample;

    var bubbleData = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }
    ];

    var bubbleLayout = {
        title: 'Bactera Cultures Per Sample',
        margin: { t: 0 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' },
        margin: { t: 30 }
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
};