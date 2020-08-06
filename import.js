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
const csv = require('csv')

AWS.config.loadFromPath('./aws-config.json')

const fileName = `${tableName}.dynamodb`
const dynamodb = new AWS.DynamoDB()

fs.readFile(fileName, (err, data) => {
  csv.parse(data, (err, items) => {
    const importItems = []
    for (const item of items) {
      importItems.push({
        PutRequest: {
          Item: JSON.parse(item)
        }
      })
    }
    
    const params = {
      RequestItems: {
        [tableName]: importItems
      }
    }

    dynamodb.batchWriteItem(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully imported.')
      }
    })
  })
})
