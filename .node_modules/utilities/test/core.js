/*
 * Utilities: A classic collection of JavaScript utilities
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var assert = require('assert')
  , core = require('../lib/core')
  , tests;

tests = {

  'simple mixin for core': function () {
    var expected = {secret: 'asdf', geddy: 'geddyKey'}
      , result = core.mixin({secret: 'asdf'}, {geddy: 'geddyKey'});
    assert.deepEqual(expected, result);
  }

, 'mixin with overiding key for core': function () {
    var expected = {secret: 'geddySecret', geddy: 'geddyKey'}
      , result = core.mixin({secret: 'asdf'}, {geddy: 'geddyKey', secret: 'geddySecret'});
    assert.deepEqual(expected, result);
  }

, 'simple enhance for core': function () {
    var expected = {secret: 'asdf', geddy: 'geddyKey'}
      , result = core.enhance({secret: 'asdf'}, {geddy: 'geddyKey'});
    assert.deepEqual(expected, result);
  }

, 'enhance with overiding key for core': function () {
    var expected = {secret: 'geddySecret', geddy: 'geddyKey'}
      , result = core.enhance({secret: 'asdf'}, {geddy: 'geddyKey', secret: 'geddySecret'});
    assert.deepEqual(expected, result);
  }

, 'isEmpty, empty string (true)': function () {
    assert.ok(core.isEmpty(''));
  }

, 'isEmpty, null (true)': function () {
    assert.ok(core.isEmpty(null));
  }

, 'isEmpty, undefined (true)': function () {
    assert.ok(core.isEmpty(null));
  }

, 'isEmpty, NaN (true)': function () {
    assert.ok(core.isEmpty(NaN));
  }

, 'isEmpty, invalid Date (true)': function () {
    assert.ok(core.isEmpty(new Date(NaN)));
  }

, 'isEmpty, zero (false)': function () {
    assert.ok(!core.isEmpty(0));
  }
,
  'bind': function () {
    function bar() {}

    function foo() {
      assert.equal(this.name, 'bar');
    }

    var fooBoundToBar = core.bind(bar, foo);
    fooBoundToBar();
  }
,
  'bind, arguments': function () {
    function bar() {}

    function foo(arg) {
      assert.equal(this.name, 'bar');
      assert.equal(arg, 'cats');
    }

    var fooBoundToBarWithCats = core.bind(bar, foo, 'cats');
    fooBoundToBarWithCats();
  }
};

module.exports = tests;
