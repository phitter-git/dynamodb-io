'use strict'

// A parsing library of command line arguments.
const commander = require("commander")
const tableName = commander.parse(process.argv).args[0]

if (!tableName) {
  console.log('Specify a table name as an argument.')
  process.exit()
}

const AWS = require('aws-sdk')
const fs  = require('fs')

AWS.config.loadFromPath('./aws-config.json')

const fileName = `${tableName}.csv`
const dynamodb = new AWS.DynamoDB()
const params = {
  TableName: tableName
}

dynamodb.scan(params, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    if (data.Count === 0) {
      console.log(`No record in ${tableName}`)
    }

    const csvString = data.Items.reduce((prev, item) => {
      prev += `"${JSON.stringify(item).replace(/"/g, '""')}"\n`
      return prev
    }, '')

    fs.writeFile(fileName, csvString, 'utf8', (err) => {
      if (err) {
        console.log('Failed to export.')
      } else {
        console.log(`Successfully exported. -> ${fileName}`)
      }
    })
  }
})
