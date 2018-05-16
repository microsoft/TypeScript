var test = require('tape')
var randomBytes = require('./')

test('sync', function (t) {
  t.plan(4)
  t.equals(randomBytes(0).length, 0, 'len: ' + 0)
  t.equals(randomBytes(3).length, 3, 'len: ' + 3)
  t.equals(randomBytes(30).length, 30, 'len: ' + 30)
  t.equals(randomBytes(300).length, 300, 'len: ' + 300)
})

test('async', function (t) {
  t.plan(4)

  randomBytes(0, function (err, resp) {
    if (err) throw err

    t.equals(resp.length, 0, 'len: ' + 0)
  })

  randomBytes(3, function (err, resp) {
    if (err) throw err

    t.equals(resp.length, 3, 'len: ' + 3)
  })

  randomBytes(30, function (err, resp) {
    if (err) throw err

    t.equals(resp.length, 30, 'len: ' + 30)
  })

  randomBytes(300, function (err, resp) {
    if (err) throw err

    t.equals(resp.length, 300, 'len: ' + 300)
  })
})

if (process.browser) {
  test('requesting to much throws', function (t) {
    t.plan(1)
    t.throws(function () {
      randomBytes(65537)
    })
  })

  test('requesting to much throws async', function (t) {
    t.plan(1)
    t.throws(function () {
      randomBytes(65537, function () {
        t.ok(false, 'should not get here')
      })
    })
  })
}
