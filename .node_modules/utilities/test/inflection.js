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

var inflection = require('../lib/inflection')
  , assert = require('assert')
  , esInflections
  , sInflections
  , iesInflections
  , vesInflections
  , icesInflections
  , renInflections
  , oesInflections
  , iInflections
  , genInflections
  , irregularInflections
  , noInflections
  , tests;

/**
 * Most test inflections are from Ruby on Rails:
 *   https://github.com/rails/rails/blob/master/activesupport/test/inflector_test_cases.rb
 *
 * Ruby on Rails is MIT licensed: http://www.opensource.org/licenses/MIT
*/
esInflections = [
    ["search", "searches"]
  , ["switch", "switches"]
  , ["fix", "fixes"]
  , ["box", "boxes"]
  , ["process", "processes"]
  , ["address", "addresses"]
  , ["wish", "wishes"]
  , ["status", "statuses"]
  , ["alias", "aliases"]
  , ["basis", "bases"]
  , ["diagnosis", "diagnoses"]
  , ["bus", "buses"]
];

sInflections = [
    ["stack", "stacks"]
  , ["shoe", "shoes"]
  , ["status_code", "status_codes"]
  , ["case", "cases"]
  , ["edge", "edges"]
  , ["archive", "archives"]
  , ["experience", "experiences"]
  , ["day", "days"]
  , ["comment", "comments"]
  , ["foobar", "foobars"]
  , ["newsletter", "newsletters"]
  , ["old_news", "old_news"]
  , ["perspective", "perspectives"]
  , ["diagnosis_a", "diagnosis_as"]
  , ["horse", "horses"]
  , ["prize", "prizes"]
];

iesInflections = [
    ["category", "categories"]
  , ["query", "queries"]
  , ["ability", "abilities"]
  , ["agency", "agencies"]
];

vesInflections = [
    ["wife", "wives"]
  , ["safe", "saves"]
  , ["half", "halves"]
  , ["elf", "elves"]
  , ["dwarf", "dwarves"]
];

icesInflections = [
    ["index", "indices"]
  , ["vertex", "vertices"]
  , ["matrix", "matrices"]
];

renInflections = [
    ["node_child", "node_children"]
  , ["child", "children"]
];

oesInflections = [
    ["buffalo", "buffaloes"]
  , ["tomato", "tomatoes"]
];

iInflections = [
    ["octopus", "octopi"]
  , ["virus", "viri"]
];

genInflections = [
    ["salesperson", "salespeople"]
  , ["person", "people"]
  , ["spokesman", "spokesmen"]
  , ["man", "men"]
  , ["woman", "women"]
];

irregularInflections = [
    ["datum", "data"]
  , ["medium", "media"]
  , ["ox", "oxen"]
  , ["cow", "kine"]
  , ["mouse", "mice"]
  , ["louse", "lice"]
  , ["axis", "axes"]
  , ["testis", "testes"]
  , ["crisis", "crises"]
  , ["analysis", "analyses"]
  , ["quiz", "quizzes"]
];

noInflections = [
    ["fish", "fish"]
  , ["news", "news"]
  , ["series", "series"]
  , ["species", "species"]
  , ["rice", "rice"]
  , ["information", "information"]
  , ["equipment", "equipment"]
];

tests = {

  'test es plural words for inflection': function () {
    var i = esInflections.length
      , value;

    while (--i >= 0) {
      value = esInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test es singular words for inflection': function () {
    var i = esInflections.length
      , value;

    while (--i >= 0) {
      value = esInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }

, 'test es plural words for inflection consistency': function() {
    var i = esInflections.length
      , value;

    while (--i >= 0) {
      value = esInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test es singular words for inflection consistency': function() {
    var i = esInflections.length
      , value;

    while (--i >= 0) {
      value = esInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test s plural words for inflection': function () {
    var i = sInflections.length
      , value;

    while (--i >= 0) {
      value = sInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test s singular words for inflection': function () {
    var i = sInflections.length
      , value;

    while (--i >= 0) {
      value = sInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }

, 'test s plural words for inflection consistency': function () {
    var i = sInflections.length
      , value;

    while (--i >= 0) {
      value = sInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test s singular words for inflection consistency': function () {
    var i = sInflections.length
      , value;

    while (--i >= 0) {
      value = sInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test ies plural words for inflection': function () {
    var i = iesInflections.length
      , value;

    while (--i >= 0) {
      value = iesInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test ies singular words for inflection': function () {
    var i = iesInflections.length
      , value;

    while (--i >= 0) {
      value = iesInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }

, 'test ies plural words for inflection consistency': function () {
    var i = iesInflections.length
      , value;

    while (--i >= 0) {
      value = iesInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test ies singular words for inflection consistency': function () {
    var i = iesInflections.length
      , value;

    while (--i >= 0) {
      value = iesInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test ves plural words for inflection': function () {
    var i = vesInflections.length
      , value;

    while (--i >= 0) {
      value = vesInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test ves singular words for inflection': function () {
    var i = vesInflections.length
      , value;

    while (--i >= 0) {
      value = vesInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }

, 'test ves plural words for inflection consistency': function () {
    var i = vesInflections.length
      , value;

    while (--i >= 0) {
      value = vesInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test ves singular words for inflection consistency': function () {
    var i = vesInflections.length
      , value;

    while (--i >= 0) {
      value = vesInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test ices plural words for inflection': function () {
    var i = icesInflections.length
      , value;

    while (--i >= 0) {
      value = icesInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test ices singular words for inflection': function () {
    var i = icesInflections.length
      , value;

    while (--i >= 0) {
      value = icesInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }
, 'test ices plural words for inflection consistency': function () {
    var i = icesInflections.length
      , value;

    while (--i >= 0) {
      value = icesInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test ices singular words for inflection consistency': function () {
    var i = icesInflections.length
      , value;

    while (--i >= 0) {
      value = icesInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test ren plural words for inflection': function () {
    var i = renInflections.length
      , value;

    while (--i >= 0) {
      value = renInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test ren singular words for inflection': function () {
    var i = renInflections.length
      , value;

    while (--i >= 0) {
      value = renInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }
, 'test ren plural words for inflection consistency': function () {
    var i = renInflections.length
      , value;

    while (--i >= 0) {
      value = renInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test ren singular words for inflection consistency': function () {
    var i = renInflections.length
      , value;

    while (--i >= 0) {
      value = renInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test oes plural words for inflection': function () {
    var i = oesInflections.length
      , value;

    while (--i >= 0) {
      value = oesInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test oes singular words for inflection': function () {
    var i = oesInflections.length
      , value;

    while (--i >= 0) {
      value = oesInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }
, 'test oes plural words for inflection consistency': function () {
    var i = oesInflections.length
      , value;

    while (--i >= 0) {
      value = oesInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test oes singular words for inflection consistency': function () {
    var i = oesInflections.length
      , value;

    while (--i >= 0) {
      value = oesInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test i plural words for inflection': function () {
    var i = iInflections.length
      , value;

    while (--i >= 0) {
      value = iInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test i singular words for inflection': function () {
    var i = iInflections.length
      , value;

    while (--i >= 0) {
      value = iInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }
, 'test i plural words for inflection consistency': function () {
    var i = iInflections.length
      , value;

    while (--i >= 0) {
      value = iInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test i singular words for inflection consistency': function () {
    var i = iInflections.length
      , value;

    while (--i >= 0) {
      value = iInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test gender and people plural words for inflection': function () {
    var i = genInflections.length
      , value;

    while (--i >= 0) {
      value = genInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test gender and people singular words for inflection': function () {
    var i = genInflections.length
      , value;

    while (--i >= 0) {
      value = genInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }
, 'test gender and people plural words for inflection consistency': function () {
    var i = genInflections.length
      , value;

    while (--i >= 0) {
      value = genInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test gender and people singular words for inflection consistency': function () {
    var i = genInflections.length
      , value;

    while (--i >= 0) {
      value = genInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test irregular plural words for inflection': function () {
    var i = irregularInflections.length
      , value;

    while (--i >= 0) {
      value = irregularInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test irregular singular words for inflection': function () {
    var i = irregularInflections.length
      , value;

    while (--i >= 0) {
      value = irregularInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }
, 'test irregular plural words for inflection consistency': function () {
    var i = irregularInflections.length
      , value;

    while (--i >= 0) {
      value = irregularInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test irregular singular words for inflection consistency': function () {
    var i = irregularInflections.length
      , value;

    while (--i >= 0) {
      value = irregularInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

, 'test no change plural words for inflection': function () {
    var i = noInflections.length
      , value;

    while (--i >= 0) {
      value = noInflections[i];

      assert.equal(value[1], inflection.pluralize(value[0]))
    }
  }

, 'test no change singular words for inflection': function () {
    var i = noInflections.length
      , value;

    while (--i >= 0) {
      value = noInflections[i];

      assert.equal(value[0], inflection.singularize(value[1]))
    }
  }
, 'test no change plural words for inflection consistency': function () {
    var i = noInflections.length
      , value;

    while (--i >= 0) {
      value = noInflections[i];

      assert.equal(value[1], inflection.pluralize(value[1]))
    }
  }

, 'test no change singular words for inflection consistency': function () {
    var i = noInflections.length
      , value;

    while (--i >= 0) {
      value = noInflections[i];

      assert.equal(value[0], inflection.singularize(value[0]))
    }
  }

};

module.exports = tests;
