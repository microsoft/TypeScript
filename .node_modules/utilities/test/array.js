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
  , array = require('../lib/array')
  , tests;

tests = {

  'test basic humanize for array': function () {
    var actual = array.humanize(["array", "array", "array"])
      , expected = "array, array and array";
    assert.equal(expected, actual);
  }

, 'test humanize with two items for array': function () {
    var actual = array.humanize(["array", "array"])
      , expected = "array and array";
    assert.equal(expected, actual);
  }

, 'test humanize with a single item for array': function () {
    var actual = array.humanize(["array"])
      , expected = "array";
    assert.equal(expected, actual);
  }

, 'test humanize with no items for array': function () {
    var actual = array.humanize([])
      , expected = "";
    assert.equal(expected, actual);
  }

, 'test basic include for array': function () {
    var test = ["array"]
      , actual = array.include(test, "array");
    assert.equal(true, actual);
  }

, 'test false include for array': function () {
    var test = ["array"]
      , actual = array.include(test, 'nope');
    assert.equal(false, actual);
  }

, 'test false boolean include for array': function () {
    var test = ["array", false]
      , actual = array.include(test, false);
    assert.equal(true, actual);
  }

};

module.exports = tests;


