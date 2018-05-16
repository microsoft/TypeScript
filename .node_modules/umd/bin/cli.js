#!/usr/bin/env node

var read = require('fs').createReadStream
var write = require('fs').createWriteStream

var umd = require('../')

var args = process.argv.slice(2)

var help = false
var commonJS = false
args = args.filter(function (arg) {
  if (arg === '-h' || arg === '--help') {
    help = true
    return false
  } else if (arg === '-c' || arg === '--commonJS') {
    commonJS = true
    return false
  }
  return true
})

if (help || !args[0]) {
  console.log('Usage: umd <name> <source> <destination> [options]')
  console.log('')
  console.log('Pipe Usage: umd <name> [options] < source > destination')
  console.log('')
  console.log('Options:')
  console.log('')
  console.log(' -h --help     Display usage information')
  console.log(' -c --commonJS Use CommonJS module format')
  console.log('')
  if (!help) process.exit(1)
} else {
  var source = args[1] ? read(args[1]) : process.stdin
  var dest = args[2] ? write(args[2]) : process.stdout
  var prelude = umd.prelude(args[0], {commonJS: commonJS})
  var postlude = umd.postlude(args[0], {commonJS: commonJS})
  dest.write(prelude)
  source.on('end', function () {
    dest.write(postlude + '\n')
  }).pipe(dest, {end: false})
}
