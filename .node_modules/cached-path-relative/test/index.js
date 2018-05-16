/**
 * Imports
 */

var relative = require('..')
var path = require('path')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.equal(relative('test/index.js', '.'), path.relative('test/index.js', '.'))
  t.equal(relative('test/index.js', '.'), path.relative('test/index.js', '.'))
  t.end()
})
