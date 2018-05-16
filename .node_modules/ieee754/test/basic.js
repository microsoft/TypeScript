var ieee754 = require('../')
var test = require('tape')

var EPSILON = 0.00001

test('read float', function (t) {
  var val = 42.42
  var buf = Buffer.alloc(4)

  buf.writeFloatLE(val, 0)
  var num = ieee754.read(buf, 0, true, 23, 4)

  t.ok(Math.abs(num - val) < EPSILON)
  t.end()
})

test('write float', function (t) {
  var val = 42.42
  var buf = Buffer.alloc(4)

  ieee754.write(buf, val, 0, true, 23, 4)
  var num = buf.readFloatLE(0)

  t.ok(Math.abs(num - val) < EPSILON)
  t.end()
})

test('read double', function (t) {
  var value = 12345.123456789
  var buf = Buffer.alloc(8)

  buf.writeDoubleLE(value, 0)
  var num = ieee754.read(buf, 0, true, 52, 8)

  t.ok(Math.abs(num - value) < EPSILON)
  t.end()
})

test('write double', function (t) {
  var value = 12345.123456789
  var buf = Buffer.alloc(8)

  ieee754.write(buf, value, 0, true, 52, 8)
  var num = buf.readDoubleLE(0)

  t.ok(Math.abs(num - value) < EPSILON)
  t.end()
})
