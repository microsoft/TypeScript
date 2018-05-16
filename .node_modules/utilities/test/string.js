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
  , string = require('../lib/string')
  , tests;

tests = {

  'test basic escapeXML for string': function () {
    var expected = '&lt;html&gt;&lt;/html&gt;'
      , actual = string.escapeXML('<html></html>');
    assert.equal(expected, actual);
  }

, 'test all escape characters for escapeXML': function () {
    var expected = '&lt;&gt;&amp;&quot;&#39;'
      , actual = string.escapeXML('<>&"\'');
    assert.equal(expected, actual);
  }

, 'test no escape characters with string for escapeXML': function () {
    var expected = 'Geddy'
      , actual = string.escapeXML('Geddy');
    assert.equal(expected, actual);
  }

, 'test no escape characters with numbers for escapeXML': function () {
    var expected = 05
      , actual = string.escapeXML(05);
    assert.equal(expected, actual);
  }

, 'test basic unescapeXML for string': function () {
    var expected = '<html></html>'
      , actual = string.unescapeXML('&lt;html&gt;&lt;/html&gt;');
    assert.equal(expected, actual);
  }

, 'test all escape characters for unescapeXML': function () {
    var expected = '<>&"\''
      , actual = string.unescapeXML('&lt;&gt;&amp;&quot;&#39;');
    assert.equal(expected, actual);
  }

, 'test no escape characters with string for unescapeXML': function () {
    var expected = 'Geddy'
      , actual = string.unescapeXML('Geddy');
    assert.equal(expected, actual);
  }

, 'test no escape characters with numbers for unescapeXML': function () {
    var expected = 05
      , actual = string.unescapeXML(05);
    assert.equal(expected, actual);
  }

, 'test basic needsEscape for string': function () {
    var expected = true
      , actual = string.needsEscape('Geddy>');
    assert.equal(expected, actual);
  }

, 'test basic needsEscape thats false for string': function () {
    var expected = false
      , actual = string.needsEscape('Geddy');
    assert.equal(expected, actual);
  }

, 'test basic needsUnescape for string': function () {
    var expected = true
      , actual = string.needsEscape('&quot;Geddy&quot;');
    assert.equal(expected, actual);
  }

, 'test basic needsUnescape thats false for string': function () {
    var expected = false
      , actual = string.needsEscape('Geddy');
    assert.equal(expected, actual);
  }

,  'test escapeRegExpCharacters': function () {
    var expected = '\\^\\/\\.\\*\\+\\?\\|\\(\\)\\[\\]\\{\\}\\\\'
      actual = string.escapeRegExpChars('^/.*+?|()[]{}\\');
    assert.equal(expected, actual);
  }

, 'test toArray for string': function () {
    var data = string.toArray('geddy')
      , expected = ['g', 'e', 'd', 'd', 'y'];

    // Loop through each item and check
    // if not, then the arrays aren't _really_ the same
    var i = expected.length;
    while (--i >= 0) {
      assert.equal(expected[i], data[i]);
    }
  }

, 'test reverse for string': function () {
    var data = string.reverse('yddeg')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test basic ltrim for string': function () {
    var data = string.ltrim('   geddy')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test custom char ltrim for string': function () {
    var data = string.ltrim('&&geddy', '&')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test basic rtrim for string': function () {
    var data = string.rtrim('geddy  ')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test custom char rtrim for string': function () {
    var data = string.rtrim('geddy&&', '&')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test basic trim for string': function () {
    var data = string.trim(' geddy  ')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test custom char trim for string': function () {
    var data = string.trim('&geddy&&', '&')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test chop special-case line-ending': function () {
    var expected = 'geddy'
      , actual = string.chop('geddy\r\n');
    assert.equal(expected, actual);
  }

, 'test chop not actual special-case line-ending': function () {
    var expected = 'geddy\n'
      , actual = string.chop('geddy\n\r');
    assert.equal(expected, actual);
  }

, 'test chop normal line-ending': function () {
    var expected = 'geddy'
      , actual = string.chop('geddy\n');
    assert.equal(expected, actual);
  }

, 'test chop whatever character': function () {
    var expected = 'gedd'
      , actual = string.chop('geddy');
    assert.equal(expected, actual);
  }

, 'test chop empty string': function () {
    var expected = ''
      , actual = string.chop('');
    assert.equal(expected, actual);
  }

, 'test basic lpad for string': function () {
    var data = string.lpad('geddy', '&', 7)
      , expected = '&&geddy';
    assert.equal(expected, data);
  }

, 'test lpad without width for string': function () {
    var data = string.lpad('geddy', '&')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test lpad without width of char for string': function () {
    var data = string.lpad('geddy')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test basic rpad for string': function () {
    var data = string.rpad('geddy', '&', 7)
      , expected = 'geddy&&';
    assert.equal(expected, data);
  }

, 'test rpad without width for string': function () {
    var data = string.rpad('geddy', '&')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test rpad without width of char for string': function () {
    var data = string.rpad('geddy')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test basic pad for string': function () {
    var data = string.pad('geddy', '&', 7)
      , expected = '&geddy&';
    assert.equal(expected, data);
  }

, 'test pad without width for string': function () {
    var data = string.pad('geddy', '&')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test pad without width of char for string': function () {
    var data = string.pad('geddy')
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test single tags in truncateHTML': function () {
    var str = string.truncateHTML('<p>Once upon a time in a world</p>', { length: 10 });
    assert.equal(str, '<p>Once up...</p>');
  }

, 'test multiple tags in truncateHTML': function () {
    var str = string.truncateHTML('<p>Once upon a time <small>in a world</small></p>', { length: 10 });
    assert.equal(str, '<p>Once up...<small>in a wo...</small></p>');
  }

, 'test multiple tags but only truncate once in truncateHTML': function () {
    var str = string.truncateHTML('<p>Once upon a time <small>in a world</small></p>', { length: 10, once: true });
    assert.equal(str, '<p>Once up...<small>in a world</small></p>');
  }

, 'test standard truncate': function () {
    var str = string.truncate('Once upon a time in a world', { length: 10 });
    assert.equal(str, 'Once up...');
  }

, 'test custom omission in truncate': function () {
    var str = string.truncate('Once upon a time in a world', { length: 10, omission: '///' });
    assert.equal(str, 'Once up///');
  }

, 'test regex seperator in truncate': function () {
    var str = string.truncate('Once upon a time in a world', { length: 15, seperator: /\s/ });
    assert.equal(str, 'Once upon a...');
  }

, 'test string seperator in truncate': function () {
    var str = string.truncate('Once upon a time in a world', { length: 15, seperator: ' ' });
    assert.equal(str, 'Once upon a...');
  }

, 'test unsafe html in truncate': function () {
    var str = string.truncate('<p>Once upon a time in a world</p>', { length: 20 });
    assert.equal(str, '<p>Once upon a ti...');
  }

, 'test nl2br for string': function () {
    var data = string.nl2br("geddy\n")
      , expected = 'geddy<br />';
    assert.equal(expected, data);
  }

, 'test snakeize for string': function () {
    var data = string.snakeize("geddyJs")
      , expected = 'geddy_js';
    assert.equal(expected, data);
  }

, 'test snakeize with beginning caps for string': function () {
    var data = string.snakeize("GeddyJs")
      , expected = 'geddy_js';
    assert.equal(expected, data);
  }

, 'test camelize for string': function () {
    var data = string.camelize("geddy_js")
      , expected = 'geddyJs';
    assert.equal(expected, data);
  }

, 'test camelize with initialCap for string': function () {
    var data = string.camelize("geddy_js", {initialCap: true})
      , expected = 'GeddyJs';
    assert.equal(expected, data);
  }

, 'test camelize with leadingUnderscore with no underscore for string': function () {
    var data = string.camelize("geddy_js", {leadingUnderscore: true})
      , expected = 'geddyJs';
    assert.equal(expected, data);
  }

, 'test camelize with leadingUnderscore with underscore for string': function () {
    var data = string.camelize("_geddy_js", {leadingUnderscore: true})
      , expected = '_geddyJs';
    assert.equal(expected, data);
  }

, 'test decapitalize for string': function () {
    var data = string.decapitalize("Geddy")
      , expected = 'geddy';
    assert.equal(expected, data);
  }

, 'test capitalize for string': function () {
    var data = string.capitalize("geddy")
      , expected = 'Geddy';
    assert.equal(expected, data);
  }

, 'test dasherize for string': function () {
    var data = string.dasherize("geddyJs")
      , expected = 'geddy-js';
    assert.equal(expected, data);
  }

, 'test dasherize with custom replace char for string': function () {
    var data = string.dasherize("geddyJs", "_")
      , expected = 'geddy_js';
    assert.equal(expected, data);
  }

, 'test underscorize for string': function () {
    var data = string.underscorize("geddyJs")
      , expected = 'geddy_js';
    assert.equal(expected, data);
  }

, 'test include for string with included string': function () {
    assert.ok(string.include('foobarbaz', 'foo'));
  }

, 'test include for string with not included string': function () {
    assert.ok(!string.include('foobarbaz', 'qux'));
  }

, 'test getInflections for string': function () {
    var actual = string.getInflections("string")
      , expected = {
        filename: {
            normal: "string"
          , singular: "string"
          , plural: "strings"
        },
        constructor: {
            normal: "String"
          , singular: "String"
          , plural: "Strings"
        },
        property: {
            normal: "string"
          , singular: "string"
          , plural: "strings"
        },
      };

    assert.deepEqual(expected, actual);
  }

, 'test inflection with odd name for string': function () {
    var actual = string.getInflections("snow_dog")
      , expected = {
        filename: {
            normal: "snow_dog"
          , singular: "snow_dog"
          , plural: "snow_dogs"
        },
        constructor: {
            normal: "SnowDog"
          , singular: "SnowDog"
          , plural: "SnowDogs"
        },
        property: {
            normal: "snowDog"
          , singular: "snowDog"
          , plural: "snowDogs"
        },
      };

    assert.deepEqual(expected, actual);
  }

, 'test uuid length for string': function () {
    var data = string.uuid(5).length
      , expected = 5;
    assert.equal(expected, data);
  }

, 'test stripTags': function () {
    var html = '<div>foo</div><p>bar<br/>wooby</p>'
      , expected = 'foobarwooby';
    assert.equal(string.stripTags(html), expected);
  }
, 'test stripTags with allowed <br>': function () {
    var html = '<div>foo</div><p>bar<br/>wooby</p>'
      , expected = 'foobar<br/>wooby';
    assert.equal(string.stripTags(html, '<br>'), expected);
  }
};

module.exports = tests;


