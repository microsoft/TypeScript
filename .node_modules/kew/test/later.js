var Q = require('../kew')

function synchronous (callback) {
  callback()
}

var asynchronous = Q.getNextTickFunction()

exports.testAsynchronousSynchronous = function (test) {
  Q.setNextTickFunction(synchronous)

  var number = 5

  Q.resolve(true).then(function () {
    number = 6
  })
  test.equals(number, 6, 'Q should resolve synchronously')

  Q.setNextTickFunction(asynchronous)

  Q.resolve(true).then(function () {
    number = 7
  })
  test.equals(number, 6, 'Q should resolve asynchronously')
  test.done()
}

exports.testSetImmediate = function (test) {
  if (typeof setImmediate == 'undefined') {
    test.done()
    return
  }

  Q.setNextTickFunction(setImmediate)

  var number = 5
  Q.resolve(true).then(function () {
    number = 6
  })
  test.equals(number, 5, 'Q should resolve asynchronously')
  setImmediate(function () {
    test.equals(number, 6, 'Q should schedule _successFn synchronously')
    test.done()
  })
}
