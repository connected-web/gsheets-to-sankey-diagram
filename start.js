const express = require('express')
const { position } = require('promise-path')
const packageJson = require('./package.json')
const root = position(__dirname)

const server = express()
const port = 8080

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.use('/template', express.static(root('/template')))

server.listen(port, () => {
  console.log(`${packageJson.name} server listening at http://localhost:${port}`)
})