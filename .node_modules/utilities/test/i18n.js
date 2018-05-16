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

var i18n = require('../lib/i18n')
  , assert = require('assert')
  , tests
  , inst = {};

tests = {

  'before': function () {
    i18n.loadLocale('en-us', {foo: 'FOO', bar: 'BAR', baz: 'BAZ'});
    i18n.loadLocale('ja-jp', {foo: 'フー', bar: 'バー'});
    inst.en = new i18n.I18n('en-us');
    inst.jp = new i18n.I18n('ja-jp');
    inst.de = new i18n.I18n('de-de');
  }

, 'test default-locale fallback, defined strings': function () {
    var expected = 'BAZ'
      , actual = inst.jp.t('baz');
    assert.equal(expected, actual);
  }

, 'test default-locale fallback, no defined strings': function () {
    var expected = 'BAZ'
      , actual = inst.de.t('baz');
    assert.equal(expected, actual);
  }

, 'test key lookup, default-locale': function () {
    var expected = 'FOO'
      , actual = inst.en.t('foo');
    assert.equal(expected, actual);
  }

, 'test key lookup, non-default-locale': function () {
    var expected = 'フー'
      , actual = inst.jp.t('foo');
    assert.equal(expected, actual);
  }

};

module.exports = tests;
