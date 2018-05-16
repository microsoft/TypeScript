/*
 * Copyright (c) 2010 George Moschovitis, http://www.gmosx.com
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * A port of the Rails/ActiveSupport Inflector class
 * http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html
*/

/**
  @name inflection
  @namespace inflection
*/

var inflection = new (function () {

  /**
    @name inflection#inflections
    @public
    @object
    @description A list of rules and replacements for different inflection types
  */
  this.inflections = {
      plurals: []
    , singulars: []
    , uncountables: []
  };

  var self = this
    , setInflection
    , setPlural
    , setSingular
    , setUncountable
    , setIrregular;

  // Add a new inflection rule/replacement to the beginning of the array for the
  // inflection type
  setInflection = function (type, rule, replacement) {
    self.inflections[type].unshift([rule, replacement]);
  };

  // Add a new plural inflection rule
  setPlural = function (rule, replacement) {
    setInflection('plurals', rule, replacement);
  };

  // Add a new singular inflection rule
  setSingular = function (rule, replacement) {
    setInflection('singulars', rule, replacement);
  };

  // Add a new irregular word to the inflection list, by a given singular and plural inflection
  setIrregular = function (singular, plural) {
    if (singular.substr(0, 1).toUpperCase() == plural.substr(0, 1).toUpperCase()) {
      setPlural(new RegExp("(" + singular.substr(0, 1) + ")" + singular.substr(1) + "$", "i"),
        '$1' + plural.substr(1));
      setPlural(new RegExp("(" + plural.substr(0, 1) + ")" + plural.substr(1) + "$", "i"),
        '$1' + plural.substr(1));
      setSingular(new RegExp("(" + plural.substr(0, 1) + ")" + plural.substr(1) + "$", "i"),
        '$1' + singular.substr(1));
    } else {
      setPlural(new RegExp(singular.substr(0, 1).toUpperCase() + singular.substr(1) + "$"),
        plural.substr(0, 1).toUpperCase() + plural.substr(1));
      setPlural(new RegExp(singular.substr(0, 1).toLowerCase() + singular.substr(1) + "$"),
        plural.substr(0, 1).toLowerCase() + plural.substr(1));
      setPlural(new RegExp(plural.substr(0, 1).toUpperCase() + plural.substr(1) + "$"),
        plural.substr(0, 1).toUpperCase() + plural.substr(1));
      setPlural(new RegExp(plural.substr(0, 1).toLowerCase() + plural.substr(1) + "$"),
        plural.substr(0, 1).toLowerCase() + plural.substr(1));
      setSingular(new RegExp(plural.substr(0, 1).toUpperCase() + plural.substr(1) + "$"),
        singular.substr(0, 1).toUpperCase() + singular.substr(1));
      setSingular(new RegExp(plural.substr(0, 1).toLowerCase() + plural.substr(1) + "$"),
        singular.substr(0, 1).toLowerCase() + singular.substr(1));
    }
  };

  // Add a new word to the uncountable inflection list
  setUncountable = function (word) {
    self.inflections.uncountables[word] = true;
  };

  // Create inflections
  (function () {
    setPlural(/$/, "s");
    setPlural(/s$/i, "s");
    setPlural(/(ax|test)is$/i, "$1es");
    setPlural(/(octop|vir)us$/i, "$1i");
    setPlural(/(octop|vir)i$/i, "$1i");
    setPlural(/(alias|status)$/i, "$1es");
    setPlural(/(bu)s$/i, "$1ses");
    setPlural(/(buffal|tomat)o$/i, "$1oes");
    setPlural(/([ti])a$/i, "$1a");
    setPlural(/([ti])um$/i, "$1a");
    setPlural(/sis$/i, "ses");
    setPlural(/ses$/i, "ses");
    setPlural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves");
    setPlural(/(hive)$/i, "$1s");
    setPlural(/([^aeiouy]|qu)y$/i, "$1ies");
    setPlural(/(x|ch|ss|sh)$/i, "$1es");
    setPlural(/(matr|vert|ind)(?:ix|ex)$/i, "$1ices");
    setPlural(/([m|l])ouse$/i, "$1ice");
    setPlural(/([m|l])ice$/i, "$1ice");
    setPlural(/^(ox)$/i, "$1en");
    setPlural(/^(ox)en$/i, "$1en");
    setPlural(/(quiz)$/i, "$1zes");

    setSingular(/s$/i, "")
		setSingular(/ss$/i, "ss")
    setSingular(/(n)ews$/i, "$1ews")
    setSingular(/([ti])um$/i, "$1um")
    setSingular(/([ti])a$/i, "$1um")
    setSingular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1$2sis")
    setSingular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)sis$/i, "$1$2sis")
    setSingular(/(^analy)ses$/i, "$1sis")
    setSingular(/(^analy)sis$/i, "$1sis")
    setSingular(/([^f])ves$/i, "$1fe")
    setSingular(/(hive)s$/i, "$1")
    setSingular(/(tive)s$/i, "$1")
    setSingular(/([lr])ves$/i, "$1f")
    setSingular(/([^aeiouy]|qu)ies$/i, "$1y")
    setSingular(/(s)eries$/i, "$1eries")
    setSingular(/(m)ovies$/i, "$1ovie")
    setSingular(/(x|ch|ss|sh)es$/i, "$1")
    setSingular(/([m|l])ice$/i, "$1ouse")
    setSingular(/([m|l])ouse$/i, "$1ouse")
    setSingular(/(bus)es$/i, "$1")
    setSingular(/(bus)$/i, "$1")
    setSingular(/(o)es$/i, "$1")
    setSingular(/(shoe)s$/i, "$1")
    setSingular(/(cris|ax|test)es$/i, "$1is")
    setSingular(/(cris|ax|test)is$/i, "$1is")
    setSingular(/(octop|vir)i$/i, "$1us")
    setSingular(/(octop|vir)us$/i, "$1us")
    setSingular(/(alias|status)es$/i, "$1")
    setSingular(/(alias|status)$/i, "$1")
    setSingular(/^(ox)en/i, "$1")
    setSingular(/(vert|ind)ices$/i, "$1ex")
    setSingular(/(matr)ices$/i, "$1ix")
    setSingular(/(quiz)zes$/i, "$1")
    setSingular(/(database)s$/i, "$1")

    setIrregular("person", "people");
    setIrregular("man", "men");
    setIrregular("child", "children");
    setIrregular("sex", "sexes");
    setIrregular("move", "moves");
    setIrregular("cow", "kine");

    setUncountable("equipment");
    setUncountable("information");
    setUncountable("rice");
    setUncountable("money");
    setUncountable("species");
    setUncountable("series");
    setUncountable("fish");
    setUncountable("sheep");
    setUncountable("jeans");
  })();

  /**
    @name inflection#parse
    @public
    @function
    @return {String} The inflection of the word from the type given
    @description Parse a word from the given inflection type
    @param {String} type A type of the inflection to use
    @param {String} word the word to parse
  */
  this.parse = function (type, word) {
    var lowWord = word.toLowerCase()
      , inflections = this.inflections[type];

    if (this.inflections.uncountables[lowWord]) {
      return word;
    }

    var i = -1;
    while (++i < inflections.length) {
      var rule = inflections[i][0]
        , replacement = inflections[i][1];

      if (rule.test(word)) {
        return word.replace(rule, replacement)
      }
    }

    return word;
  };

  /**
    @name inflection#pluralize
    @public
    @function
    @return {String} The plural inflection for the given word
    @description Create a plural inflection for a word
    @param {String} word the word to create a plural version for
  */
  this.pluralize = function (word) {
    return self.parse('plurals', word);
  };

  /**
    @name inflection#singularize
    @public
    @function
    @return {String} The singular inflection for the given word
    @description Create a singular inflection for a word
    @param {String} word the word to create a singular version for
  */
  this.singularize = function (word) {
    return self.parse('singulars', word);
  };

})();

module.exports = inflection;
