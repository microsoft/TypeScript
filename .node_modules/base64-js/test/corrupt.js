var test = require('tape')
var b64 = require('../')

test('padding bytes found inside base64 string', function (t) {
  // See https://github.com/beatgammit/base64-js/issues/42
  var str = 'SQ==QU0='
  t.deepEqual(b64.toByteArray(str), new Uint8Array([73]))
  t.equal(b64.byteLength(str), 1)
  t.end()
})
