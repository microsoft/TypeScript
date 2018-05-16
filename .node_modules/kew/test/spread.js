var Q = require('../kew')

exports.testSpreadStatic = function (test) {
  Q.spread([Q.resolve('a'), 'b'], function (a, b) {
    test.equal('a', a)
    test.equal('b', b)
    test.done()
  })
}

exports.testSpreadMethod = function (test) {
  Q.resolve(true)
      .then(function () {
        return ['a', 'b']
      })
      .spread(function (a, b) {
        test.equal('a', a)
        test.equal('b', b)
        test.done()
      })
}

exports.testSpreadBoundMethod = function (test) {
  Q.resolve(true)
      .then(function () {
        return [Q.resolve('a'), 'b']
      })
      .spreadBound(function (c, a, b) {
        test.equal('scope', this.scope)
        test.equal('c', c)
        test.equal('a', a)
        test.equal('b', b)
        test.done()
      }, {scope: 'scope'}, 'c')
}

exports.testAllSynchronization1 = function (test) {
  var order = []
  Q.resolve(true)
      .then(function () {
        var promiseA = Q.fcall(function () {
          order.push('a')
        })
        var promiseB = Q.fcall(function () {
          order.push('b')
        })

        test.deepEqual([], order)

        var promiseAB = Q.all([promiseA, promiseB])
        test.deepEqual([], order)

        return [promiseA, promiseB]
      })
      .then(function (results) {
        test.deepEqual(['a', 'b'], order)
        test.done()
      })
}
