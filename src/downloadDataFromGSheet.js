const gsjson = require('google-spreadsheet-to-json')
const readCredentials = require('./util/readCredentials')
const spreadsheets = [{
  name: 'Finances - Tag Analysis',
  id: '1H6sD9XQVuLQTvoKkoJ0IjZ9cgbwRGacVuSPLk9ZTq1E'
}]
const { write, position } = require('promise-path')
const models = position(__dirname, '../models')

const log = []
const report = (...messages) => console.log(['[Download Data from Google Spreadsheet]', ...messages].join(' '))

async function downloadData ({ gsjson }, { name, id }) {
  report('Downloading', name, 'using id:', id)
  const spreadsheetId = id
  try {
    const credentials = await readCredentials()
    const worksheets = await gsjson({ spreadsheetId, allWorksheets: true, credentials })
    report('Downloaded data:', (worksheets + '').length, 'bytes')
    const cells = worksheets.reduce((acc, item) => acc.concat(item), [])
    report(name, 'cells', cells.length)
    return cells
  } catch (ex) {
    report('Unable to download data:', ex)
  }
}

async function downloadSpreadsheets (fetchers, spreadsheets) {
  const asyncWork = spreadsheets.map(spreadsheet => {
    return downloadData(fetchers, spreadsheet)
  })
  const allSheets = await Promise.all(asyncWork)

  const combinedSheets = allSheets.reduce((acc, item) => acc.concat(item), [])

  await write(models('downloaded-data.json'), JSON.stringify(combinedSheets, null, 2), 'utf8')

  return combinedSheets
}

const fetchers = { gsjson }
downloadSpreadsheets(fetchers, spreadsheets)