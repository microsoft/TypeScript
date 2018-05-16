var browserify = require('../');
var test = require('tap').test;

test('identical content gets deduped and the row gets an implicit dep on the original source', function (t) {
  t.plan(1)

  var rows = [];
  browserify()
    .on('dep', [].push.bind(rows))
    .require(require.resolve('./dup'), { entry: true })
    .bundle(check);

  function check(err, src) {
    if (err) return t.fail(err);
    var deduped = rows.filter(function (x) { return x.dedupeIndex });
    var d = deduped[0];

    t.deepEqual(d.deps, { 'dup': d.dedupeIndex }, "adds implicit dep");
  }
})

test('identical content gets deduped with fullPaths', function (t) {
  t.plan(1)

  var rows = [];
  browserify({fullPaths: true})
    .on('dep', [].push.bind(rows))
    .require(require.resolve('./dup'), { entry: true })
    .bundle(check);

  function check(err, src) {
    if (err) return t.fail(err);
    var deduped = rows.filter(function (x) { return x.dedupe });
    var d = deduped[0];

    t.deepEqual(
        d.source,
        'arguments[4]['+ JSON.stringify(d.dedupe) + '][0]'
        + '.apply(exports,arguments)',
        "dedupes content"
    );
  }
})

test('identical content does not get deduped with dedupe option false', function (t) {
  t.plan(1)

  var rows = [];
  browserify({fullPaths: true, dedupe: false})
    .on('dep', [].push.bind(rows))
    .require(require.resolve('./dup'), { entry: true })
    .bundle(check);

  function check(err, src) {
    if (err) return t.fail(err);
    var deduped = rows.filter(function (x) { return x.dedupe });
    t.equal(deduped.length, 0, 'does not dedupe');
  }
})
