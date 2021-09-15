(function() {
  google.charts.load('current', {'packages':['sankey']})
  google.charts.setOnLoadCallback(run)

  async function getSpreadsheetData() {
    return axios.get('/models/downloaded-data.json')
  }

  async function transform(spreadsheetData) {
    console.log('Spreadsheet Data', spreadsheetData)
    const keys = ['tags', 'moneyOut']
    const items = spreadsheetData.data.map(item => {
      return {
        tags: item['tags'].split(' - '),
        value: item['moneyOut']
      }
    }).map(item => {
      const tags = [].concat(item.tags)
      item.groupTag = tags.pop()
      item.path = tags.join('/')
      return item 
    })
    console.log('Items', items)
    const sankeyGroups = items.reduce((acc, item) => {
      const group = acc.index[item.groupTag] || { value: 0, a: item.path, b: item.groupTag }
      group.value = group.value + (item.value || 0)
      acc.index[item.groupTag] = group
      return acc
    }, { index: {} })
    console.log('Sankey Groups', sankeyGroups)
    const sankeyList = Object.values(sankeyGroups.index).map(group => {
      return [ group.a, [group.a, group.b].join('/'), Number.parseFloat(group.value.toFixed(2)) ]
    })
    console.log('Sankey List', sankeyList)
    return sankeyList.filter(r => r[0].includes('Iceland') || r[1].includes('Iceland'))
  }

  async function getSankeyData() {
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
    const data = new google.visualization.DataTable()
    data.addColumn('string', 'From')
    data.addColumn('string', 'To')
    data.addColumn('number', 'Cost')
    data.addRows(sankeyData)
    return data
  }

  function drawChart(data) {
    // Sets chart options.
    const options = {
      width: 900,
      height: 900
    }

    // Instantiates and draws our chart, passing in some options.
    const chart = new google.visualization.Sankey(document.getElementById('sankey_basic'))
    chart.draw(data, options)
  }

  async function run() {
    const spreadsheetData = await getSpreadsheetData()
    const sankeyData = await transform(spreadsheetData) // await getSankeyData()
    console.log('Sankey Data', sankeyData)
    const chartData = formatData(sankeyData.slice(0, 19))
    drawChart(chartData)
  }
})()