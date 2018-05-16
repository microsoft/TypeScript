var test = require('tape')
var b64 = require('../')
var checks = [
  'a',
  'aa',
  'aaa',
  'hi',
  'hi!',
  'hi!!',
  'sup',
  'sup?',
  'sup?!'
]

test('convert to base64 and back', function (t) {
  t.plan(checks.length * 2)

  for (var i = 0; i < checks.length; i++) {
    var check = checks[i]
    var b64Str, arr, str

    b64Str = b64.fromByteArray(map(check, function (char) { return char.charCodeAt(0) }))

    arr = b64.toByteArray(b64Str)
    str = map(arr, function (byte) { return String.fromCharCode(byte) }).join('')

    t.equal(check, str, 'Checked ' + check)
    t.equal(b64.byteLength(b64Str), arr.length, 'Checked length for ' + check)
  }
})

var data = [
  [[0, 0, 0], 'AAAA'],
  [[0, 0, 1], 'AAAB'],
  [[0, 1, -1], 'AAH/'],
  [[1, 1, 1], 'AQEB'],
  [[0, -73, 23], 'ALcX']
]

test('convert known data to string', function (t) {
  for (var i = 0; i < data.length; i++) {
    var bytes = data[i][0]
    var expected = data[i][1]
    var actual = b64.fromByteArray(bytes)
    t.equal(actual, expected, 'Ensure that ' + bytes + ' serialise to ' + expected)
  }
  t.end()
})

test('convert known data from string', function (t) {
  for (var i = 0; i < data.length; i++) {
    var expected = data[i][0]
    var string = data[i][1]
    var actual = b64.toByteArray(string)
    t.ok(equal(actual, expected), 'Ensure that ' + string + ' deserialise to ' + expected)
    var length = b64.byteLength(string)
    t.equal(length, expected.length, 'Ensure that ' + string + ' has byte lentgh of ' + expected.length)
  }
  t.end()
})

function equal (a, b) {
  var i
  var length = a.length
  if (length !== b.length) return false
  for (i = 0; i < length; ++i) {
    if ((a[i] & 0xFF) !== (b[i] & 0xFF)) return false
  }
  return true
}

function map (arr, callback) {
  var res = []
  var kValue, mappedValue

  for (var k = 0, len = arr.length; k < len; k++) {
    if ((typeof arr === 'string' && !!arr.charAt(k))) {
      kValue = arr.charAt(k)
      mappedValue = callback(kValue, k, arr)
      res[k] = mappedValue
    } else if (typeof arr !== 'string' && k in arr) {
      kValue = arr[k]
      mappedValue = callback(kValue, k, arr)
      res[k] = mappedValue
    }
  }
  return res
}
