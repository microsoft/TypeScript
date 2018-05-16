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
var object = require('../lib/object')
  , array = require('../lib/array')
  , assert = require('assert')
  , tests = {}
  , checkObjects;

tests = {

  'test merge in object': function () {
    var expected = {user: 'geddy', key: 'key'}
      , actual = object.merge({user: 'geddy'}, {key: 'key'});
    assert.deepEqual(actual, expected);
  }

, 'test merge with overwriting keys in object': function () {
    var expected = {user: 'geddy', key: 'key'}
      , actual = object.merge({user: 'geddy', key: 'geddyKey'}, {key: 'key'});
    assert.deepEqual(actual, expected);
  }

, 'test merge with objects as keys': function () {
    var expected = {user: {name: 'geddy', password: 'random', key: 'key'}, key: 'key'}
      , actual = object.merge({key: 'key'}, {user: {name: 'geddy', password: 'random', key: 'key'}});
    assert.deepEqual(actual, expected);
  }

, 'test reverseMerge in object': function () {
    var expected = {user: 'geddy', key: 'key'}
      , actual = object.reverseMerge({user: 'geddy'}, {key: 'key'});
    assert.deepEqual(actual, expected);
  }

, 'test reverseMerge with keys overwriting default in object': function () {
    var expected = {user: 'geddy', key: 'geddyKey'}
    , actual = object.reverseMerge({user: 'geddy', key: 'geddyKey'}, {key: 'key'});
    assert.deepEqual(actual, expected);
  }

, 'test reverseMerge with objects as keys': function () {
    var expected = {user: {name: 'geddy', password: 'random', key: 'key'}, key: 'key'}
      , actual = object.merge({user: {name: 'geddy', password: 'random', key: 'key'}}, {key: 'key'});
    assert.deepEqual(actual, expected);
  }

, 'test isEmpty with non empty object in object': function () {
    var expected = false
      , actual = object.isEmpty({user: 'geddy'});
    assert.equal(actual, expected);
  }

, 'test isEmpty with empty object in object': function () {
    var expected = true
      , actual = object.isEmpty({});
    assert.equal(actual, expected);
  }

};

module.exports = tests;
