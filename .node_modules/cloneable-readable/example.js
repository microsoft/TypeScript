'use strict'

var cloneable = require('./')
var fs = require('fs')
var pump = require('pump')

var stream = cloneable(fs.createReadStream('./package.json'))

pump(stream.clone(), fs.createWriteStream('./out1'))

// simulate some asynchronicity
setImmediate(function () {
  pump(stream, fs.createWriteStream('./out2'))
})
