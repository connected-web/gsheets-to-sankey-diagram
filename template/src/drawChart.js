(function() {
  google.charts.load('current', {'packages':['sankey']})
  google.charts.setOnLoadCallback(run)

  function getSankeyData() {
    return [
      [ 'A', 'X', 5 ],
      [ 'A', 'Y', 7 ],
      [ 'A', 'Z', 6 ],
      [ 'B', 'A', 2 ],
      [ 'B', 'X', 9 ],
      [ 'B', 'L', 4 ],
      [ 'X', 'K', 1 ],
      [ 'X', 'L', 8 ]
    ]
  }

  function formatData(sankeyData) {
    var data = new google.visualization.DataTable()
    data.addColumn('string', 'From')
    data.addColumn('string', 'To')
    data.addColumn('number', 'Weight')
    data.addRows(sankeyData)
    return data
  }

  function drawChart(data) {
    // Sets chart options.
    var options = {
      width: 600,
    }

    // Instantiates and draws our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'))
    chart.draw(data, options)
  }

  function run() {
    const sankeyData = getSankeyData()
    const data = formatData(sankeyData)
    drawChart(data)
  }
})()