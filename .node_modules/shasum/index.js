
var createHash = require('crypto').createHash 
var Buffer = require('buffer').Buffer
var stringify = require('json-stable-stringify')

module.exports = function hash (str, alg, format) {
  str = 'string' === typeof str ? str
    : Buffer.isBuffer(str) ? str
    : stringify(str)
  return createHash(alg || 'sha1')
    .update(str, Buffer.isBuffer(str) ? null : 'utf8').digest(format || 'hex')
}

