// Load the jake global
require('../lib/jake');

var assert = require('assert')
  , h = require('./helpers')
  , api = require('../lib/api')
  , Namespace = require('../lib/namespace').Namespace;

var tests = {
  'before': function() {
    process.chdir('./test');
  }

, 'after': function() {
    process.chdir('../');
  }

, 'resolve namespace by relative name': function () {
    var foo
      , bar
      , baz;

    foo = namespace('foo', function () {
      bar = namespace('bar', function () {
        baz = namespace('baz', function () {
        });
      });
    });

    assert.ok(foo === baz.resolveNamespace('foo'),
        'foo -> "foo"');
    assert.ok(bar === baz.resolveNamespace('foo:bar'),
        'bar -> "foo:bar"');
    assert.ok(bar === baz.resolveNamespace('bar'),
        'bar -> "bar"');
    assert.ok(baz === baz.resolveNamespace('foo:bar:baz'),
        'baz -> "foo:bar:baz"');
    assert.ok(baz === baz.resolveNamespace('bar:baz'),
        'baz -> "bar:baz"');
  }

, 'test modifying a namespace by adding a new task': function(next) {
    h.exec('../bin/cli.js one:two', function(out) {
      assert.equal('one:one\none:two', out);
      next();
    });
  }

};

module.exports = tests;

