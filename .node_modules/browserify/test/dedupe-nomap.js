var browserify = require('../');
var test = require('tap').test;

test('identical content gets deduped and the row gets a "nomap" flag set when sourcemaps are turned on', function (t) {
  t.plan(4)

  var rows = [];
  browserify({ debug: true })
    .on('dep', [].push.bind(rows)) 
    .require(require.resolve('./dup'), { entry: true })
    .bundle(check);

  function check(err, src) {
    if (err) return t.fail(err);
    var nomappeds = rows.filter(function (x) { return x.nomap });
    var nm = nomappeds[0];

    t.equal(rows.length, 3, 'packs 3 rows');
    t.equal(nomappeds.length, 1, 'one of has nomapped flag set');
    t.equal(
        rows.filter(function (x) {
            return x.id == nm.dedupeIndex
        }).length,
        1,
        '2 rows with the same hash as the duplicate exist'
    );
    t.similar(
      nm.source,
      /arguments\[4\]\[.+\]\[0\]\.apply\(exports,arguments\)$/,
      'redirects duplicate to original via require call'
    );
  }
})

test('identical content gets deduped and the row gets a "nomap" flag set when sourcemaps are turned off', function (t) {
  t.plan(4)

  var rows = [];
  browserify({ debug: false })
    .on('dep', [].push.bind(rows)) 
    .require(require.resolve('./dup'), { entry: true })
    .bundle(check);

  function check(err, src) {
    if (err) return t.fail(err);
    var nomappeds = rows.filter(function (x) { return x.nomap });
    var nm = nomappeds[0];

    t.equal(rows.length, 3, 'packs 3 rows');
    t.equal(nomappeds.length, 1, 'one of has nomapped flag set');
    t.equal(
        rows.filter(function (x) {
            return x.id == nm.dedupeIndex
        }).length,
        1,
        '2 rows with the same hash as the duplicate exist'
    );
    t.similar(
      nm.source,
      /arguments\[4\]\[.+\]\[0\]\.apply\(exports,arguments\)$/,
      'redirects duplicate to original via require call'
    );
  }
})
