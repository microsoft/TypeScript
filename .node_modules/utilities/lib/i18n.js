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
var core = require('./core')
  , i18n;

var DEFAULT_LOCALE = 'en-us';

i18n = new (function () {
  var _defaultLocale = DEFAULT_LOCALE
    , _strings = {};

  this.getText = function (key, opts, locale) {
    var currentLocale = locale || _defaultLocale
      , currentLocaleStrings = _strings[currentLocale] || {}
      , defaultLocaleStrings = _strings[_defaultLocale] || {}
      , str = currentLocaleStrings[key]
            || defaultLocaleStrings[key] || "[[" + key + "]]";
    for (var p in opts) {
      str = str.replace(new RegExp('\\{' + p + '\\}', 'g'), opts[p]);
    }
    return str;
  };

  this.getDefaultLocale = function () {
    return _defaultLocale;
  };

  this.setDefaultLocale = function (locale) {
    _defaultLocale = locale;
  };

  this.loadLocale = function (locale, strings) {
    _strings[locale] = _strings[locale] || {};
    core.mixin(_strings[locale], strings);
  };

})();

i18n.I18n = function (locale) {
  var _locale = locale || i18n.getDefaultLocale();

  this.getLocale = function (locale) {
    return _locale;
  };

  this.setLocale = function (locale) {
    _locale = locale;
  };

  this.getText = function (key, opts, locale) {
    return i18n.getText(key,
        opts || {}, locale || _locale);
  };
  this.t = this.getText;
};

module.exports = i18n;

