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
  , inflection = require('./inflection')
  , string;


/**
  @name string
  @namespace string
*/

string = new (function () {

  // Regexes for trimming, and character maps for escaping
  var _LTR = /^\s+/
    , _RTR = /\s+$/
    , _TR = /^\s+|\s+$/g
    , _NL = /\n|\r|\r\n/g
    , _CHARS = {
          '&': '&amp;'
        , '<': '&lt;'
        , '>': '&gt;'
        , '"': '&quot;'
        , '\'': '&#39;'
      }
    , _UUID_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    , _buildEscape
    , _buildEscapeTest;

  // Builds the escape/unescape methods using a
  // map of characters
  _buildEscape = function (direction) {
    return function (str) {
      var string = str;

      // If string is NaN, null or undefined then provide an empty default
      if((typeof string === 'undefined') ||
          string === null ||
          (!string && isNaN(string))) {
        string = '';
      }
      string = string.toString();

      var from, to, p;
      for (p in _CHARS) {
        from = direction == 'to' ? p : _CHARS[p];
        to = direction == 'to' ? _CHARS[p] : p;

        string = string.replace(new RegExp(from, 'gm'), to);
      }

      return string;
    }
  };

  // Builds a method that tests for any escapable
  // characters, useful for avoiding double-scaping if
  // you're not sure if a string has already been escaped
  _buildEscapeTest = function (direction) {
    return function (string) {
      var pat = ''
        , p;

      for (p in _CHARS) {
        pat += direction == 'to' ? p : _CHARS[p];
        pat += '|';
      }

      pat = pat.substr(0, pat.length - 1);
      pat = new RegExp(pat, "gm");
      return pat.test(string)
    }
  };

  // Escape special XMl chars
  this.escapeXML = _buildEscape('to');

  // Unescape XML chars to literal representation
  this.unescapeXML = _buildEscape('from');

  // Test if a string includes special chars
  // that need escaping
  this.needsEscape = _buildEscapeTest('to');

  // Test if a string includes escaped chars
  // that need unescaping
  this.needsUnescape = _buildEscapeTest('from');

  /**
    @name string#escapeRegExpChars
    @public
    @function
    @return {String} A string of escaped characters
    @description Escapes regex control-characters in strings
                 used to build regexes dynamically
    @param {String} string The string of chars to escape
  */
  this.escapeRegExpChars = (function () {
    var specials = [ '^', '$', '/', '.', '*', '+', '?', '|', '(', ')',
        '[', ']', '{', '}', '\\' ];
    var sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
    return function (string) {
      var str = string || '';
      str = String(str);
      return str.replace(sRE, '\\$1');
    };
  }).call(this);

  /**
    @name string#toArray
    @public
    @function
    @return {Array} Returns an array of characters
    @description Converts a string to an array
    @param {String} string The string to convert
  */
  this.toArray = function (string) {
    var str = string || ''
      , arr = []
      , i = -1;
    str = String(str);

    while (++i < str.length) {
      arr.push(str.substr(i, 1));
    }

    return arr;
  };

  /**
    @name string#reverse
    @public
    @function
    @return {String} Returns the `string` reversed
    @description Reverses a string
    @param {String} string The string to reverse
  */
  this.reverse = function (string) {
    var str = string || '';
    str = String(str);
    return this.toArray(str).reverse().join('');
  };

  /**
    @name string#ltrim
    @public
    @function
    @return {String} Returns the trimmed string
    @description Ltrim trims `char` from the left of a `string` and returns it
                 if no `char` is given it will trim spaces
    @param {String} string The string to trim
    @param {String} character The character to trim
  */
  this.ltrim = function (string, character) {
    var str = string || ''
      , pat = character ? new RegExp('^' + character + '+') : _LTR;
    str = String(str);

    return str.replace(pat, '');
  };

  /**
    @name string#rtrim
    @public
    @function
    @return {String} Returns the trimmed string
    @description Rtrim trims `char` from the right of a `string` and returns it
                 if no `char` is given it will trim spaces
    @param {String} string The string to trim
    @param {String} character The character to trim
  */
  this.rtrim = function (string, character) {
    var str = string || ''
      , pat = character ? new RegExp(character + '+$') : _RTR;
    str = String(str);

    return str.replace(pat, '');
  };

  // Alias
  this.chomp = this.rtrim;

  /**
    @name string#trim
    @public
    @function
    @return {String} Returns the trimmed string
    @description Trim trims `char` from the left and right of a `string` and returns it
                 if no `char` is given it will trim spaces
    @param {String} string The string to trim
    @param {String} character The character to trim
  */
  this.trim = function (string, character) {
    var str = string || ''
      , pat = character ? new RegExp('^' + character + '+|' + character + '+$', 'g') : _TR;
    str = String(str);

    return str.replace(pat, '');
  };

  /**
    @name string#chop
    @public
    @function
    @description Returns a new String with the last character removed. If the
                 string ends with \r\n, both characters are removed. Applying chop to an
                 empty string returns an empty string.
    @param {String} string to return with the last character removed.
  */
  this.chop = function (string) {
    var index
      , str = string || '';
    str = String(str);

    if (str.length) {
      // Special-case for \r\n
      index = str.indexOf('\r\n');
      if (index == str.length - 2) {
        return str.substring(0, index);
      }
      return str.substring(0, str.length - 1);
    }
    else {
      return '';
    }
  };

  /**
    @name string#lpad
    @public
    @function
    @return {String} Returns the padded string
    @description Lpad adds `char` to the left of `string` until the length
                 of `string` is more than `width`
    @param {String} string The string to pad
    @param {String} character The character to pad with
    @param {Number} width the width to pad to
  */
  this.lpad = function (string, character, width) {
    var str = string || ''
      , width;
    str = String(str);

    // Should width be string.length + 1? or the same to be safe
    width = parseInt(width, 10) || str.length;
    character = character || ' ';

    while (str.length < width) {
      str = character + str;
    }
    return str;
  };

  /**
    @name string#rpad
    @public
    @function
    @return {String} Returns the padded string
    @description Rpad adds `char` to the right of `string` until the length
                 of `string` is more than `width`
    @param {String} string The string to pad
    @param {String} character The character to pad with
    @param {Number} width the width to pad to
  */
  this.rpad = function (string, character, width) {
    var str = string || ''
      , width;
    str = String(str);

    // Should width be string.length + 1? or the same to be safe
    width = parseInt(width, 10) || str.length;
    character = character || ' ';

    while (str.length < width) {
      str += character;
    }
    return str;
  };

  /**
    @name string#pad
    @public
    @function
    @return {String} Returns the padded string
    @description Pad adds `char` to the left and right of `string` until the length
                 of `string` is more than `width`
    @param {String} string The string to pad
    @param {String} character The character to pad with
    @param {Number} width the width to pad to
  */
  this.pad = function (string, character, width) {
    var str = string || ''
      , width;
    str = String(str);

    // Should width be string.length + 1? or the same to be safe
    width = parseInt(width, 10) || str.length;
    character = character || ' ';

    while (str.length < width) {
      str = character + str + character;
    }
    return str;
  };

  /**
    @name string#truncate
    @public
    @function
    @return {String} Returns the truncated string
    @description Truncates a given `string` after a specified `length` if `string` is longer than
                 `length`. The last characters will be replaced with an `omission` for a total length
                 not exceeding `length`. If `callback` is given it will fire if `string` is truncated.
    @param {String} string The string to truncate
    @param {Integer/Object} options Options for truncation, If options is an Integer it will be length
      @param {Integer} [options.length=string.length] Length the output string will be
      @param {Integer} [options.len] Alias for `length`
      @param {String} [options.omission='...'] Replace last characters with an omission
      @param {String} [options.ellipsis='...'] Alias for `omission`
      @param {String/RegExp} [options.seperator] Break the truncated test at the nearest `seperator`
    @param {Function} callback Callback is called only if a truncation is done
  */
  this.truncate = function (string, options, callback) {
    var str = string || ''
      , stringLen
      , opts
      , stringLenWithOmission
      , last
      , ignoreCase
      , multiLine
      , stringToWorkWith
      , lastIndexOf
      , nextStop
      , result
      , returnString;

    str = String(str);
    stringLen = str.length

    // If `options` is a number, assume it's the length and
    // create a options object with length
    if (typeof options === 'number') {
      opts = {
        length: options
      };
    }
    else {
      opts = options || {};
    }

    // Set `opts` defaults
    opts.length = opts.length || stringLen;
    opts.omission = opts.omission || opts.ellipsis || '...';

    stringLenWithOmission = opts.length - opts.omission.length;

    // Set the index to stop at for `string`
    if (opts.seperator) {
      if (opts.seperator instanceof RegExp) {
        // If `seperator` is a regex
        if (opts.seperator.global) {
          opts.seperator = opts.seperator;
        } else {
          ignoreCase = opts.seperator.ignoreCase ? 'i' : ''
          multiLine = opts.seperator.multiLine ? 'm' : '';
          opts.seperator = new RegExp(opts.seperator.source,
              'g' + ignoreCase + multiLine);
        }
        stringToWorkWith = str.substring(0, stringLenWithOmission + 1)
        lastIndexOf = -1
        nextStop = 0

        while ((result = opts.seperator.exec(stringToWorkWith))) {
          lastIndexOf = result.index;
          opts.seperator.lastIndex = ++nextStop;
        }
        last = lastIndexOf;
      }
      else {
        // Seperator is a String
        last = str.lastIndexOf(opts.seperator, stringLenWithOmission);
      }

      // If the above couldn't be found, they'll default to -1 so,
      // we need to just set it as `stringLenWithOmission`
      if (last === -1) {
        last = stringLenWithOmission;
      }
    }
    else {
      last = stringLenWithOmission;
    }

    if (stringLen < opts.length) {
      return str;
    }
    else {
      returnString = str.substring(0, last) + opts.omission;
      returnString += callback && typeof callback === 'function' ? callback() : '';
      return returnString;
    }
  };

  /**
    @name string#truncateHTML
    @public
    @function
    @return {String} Returns the HTML safe truncated string
    @description Truncates a given `string` inside HTML tags after a specified `length` if string`
                 is longer than `length`. The last characters will be replaced with an `omission`
                 for a total length not exceeding `length`. If `callback` is given it will fire if
                 `string` is truncated. If `once` is true only the first string in the first HTML
                 tags will be truncated leaving the others as they were
    @param {String} string The string to truncate
    @param {Integer/Object} options Options for truncation, If options is an Integer it will be length
                            all Object options are the same as `truncate`
      @param {Boolean} [options.once=false] If true, it will only be truncated once, otherwise the
                                            truncation will loop through all text inside HTML tags
    @param {Function} callback Callback is called only if a truncation is done
  */
  this.truncateHTML = function (string, options, callback) {
    var str = string || ''
      , returnString = ''
      , opts = options;

    str = String(str);

    // If `options` is a number assume it's the length and create a options object with length
    if (typeof opts === 'number') {
      var num = opts;

      opts = {};
      opts.length = num;
    } else opts = opts || {};

    // Set `default` options for HTML specifics
    opts.once = opts.once || false;

    var pat = /(<[^>]*>)/ // Patter for matching HTML tags
      , arr = [] // Holds the HTML tags and content seperately
      , truncated = false
      , result = pat.exec(str)
      , item
      , firstPos
      , lastPos
      , i;

    // Gather the HTML tags and content into the array
    while (result) {
      firstPos = result.index;
      lastPos = pat.lastIndex;

      if (firstPos !== 0) {
        // Should be content not HTML tags
        arr.push(str.substring(0, firstPos));
        // Slice content from string
        str = str.slice(firstPos);
      }

      arr.push(result[0]); // Push HTML tags
      str = str.slice(result[0].length);

      // Re-run the pattern on the new string
      result = pat.exec(str);
    }
    if (str !== '') {
      arr.push(str);
    }

    // Loop through array items appending the tags to the string,
    // - and truncating the text then appending it to content
    i = -1;
    while (++i < arr.length) {
      item = arr[i];
      switch (true) {
        // Closing tag
        case item.indexOf('</') == 0:
          returnString += item;
          openTag = null;
          break;
        // Opening tag
        case item.indexOf('<') == 0:
          returnString += item;
          openTag = item;
          break;
        // Normal text
        default:
          if (opts.once && truncated) {
            returnString += item;
          } else {
            returnString += this.truncate(item, opts, callback);
            truncated = true;
          }
          break;
      }
    }

    return returnString;
  };

  /**
    @name string#nl2br
    @public
    @function
    @return {String} The string with converted newlines chars to br tags
    @description Nl2br returns a string where all newline chars are turned
                 into line break HTML tags
    @param {String} string The string to convert
  */
  this.nl2br = function (string) {
    var str = string || '';
    str = String(str);

    return str.replace(_NL,'<br />');
  };

  /**
    @name string#snakeize
    @public
    @function
    @return {String} The string in a snake_case version
    @description Snakeize converts camelCase and CamelCase strings to snake_case strings
    @param {String} string The string to convert to snake_case
    @param {String} separ='_' The seperator to use
  */
  this.snakeize = (function () {
    // Only create regexes once on initial load
    var repl = /([A-Z]+)/g
      , lead = /^_/g;
    return function (string, separ) {
      var str = string || ''
        , sep = separ || '_'
        , leading = separ ? new RegExp('^' + sep, 'g') : lead;
      str = String(str);
      return str.replace(repl, sep + '$1').toLowerCase().
        replace(leading, '');
    };
  }).call(this);

  // Aliases
  /**
    @name string#underscorize
    @public
    @function
    @return {String} The string in a underscorized version
    @description Underscorize returns the given `string` converting camelCase and snakeCase to underscores
    @param {String} string The string to underscorize
  */
  this.underscorize = this.snakeize;
  this.underscoreize = this.snakeize;
  this.decamelize = this.snakeize;

  /**
    @name string#camelize
    @public
    @function
    @return {String} The string in a camelCase version
    @description Camelize takes a string and optional options and
                 returns a camelCase version of the given `string`
    @param {String} string The string to convert to camelCase
    @param {Object} options
      @param {Boolean} [options.initialCap] If initialCap is true the returned
                                            string will have a capitalized first letter
      @param {Boolean} [options.leadingUnderscore] If leadingUnderscore os true then if
                                                   an underscore exists at the beggining
                                                   of the string, it will stay there.
                                                   Otherwise it'll be removed.
  */
  this.camelize = (function () {
    // Only create regex once on initial load
    var repl = /[-_](\w)/g;
    return function (string, options) {
      var str = string || ''
        , ret
        , config = {
            initialCap: false
          , leadingUnderscore: false
          }
        , opts = options || {};

      str = String(str);

      // Backward-compat
      if (typeof opts == 'boolean') {
        config = {
          initialCap: true
        };
      }
      else {
        core.mixin(config, opts);
      }

      ret = str.replace(repl, function (m, m1) {
        return m1.toUpperCase();
      });

      if (config.leadingUnderscore & str.indexOf('_') === 0) {
        ret = '_' + this.decapitalize(ret);
      }
      // If initialCap is true capitalize it
      ret = config.initialCap ? this.capitalize(ret) : this.decapitalize(ret);

      return ret;
    };
  }).call(this);

  /**
    @name string#decapitalize
    @public
    @function
    @return {String} The string with the first letter decapitalized
    @description Decapitalize returns the given string with the first letter uncapitalized.
    @param {String} string The string to decapitalize
  */
  this.decapitalize = function (string) {
    var str = string || '';
    str = String(str);

    return str.substr(0, 1).toLowerCase() + str.substr(1);
  };

  /**
    @name string#capitalize
    @public
    @function
    @return {String} The string with the first letter capitalized
    @description capitalize returns the given string with the first letter capitalized.
    @param {String} string The string to capitalize
  */
  this.capitalize = function (string) {
    var str = string || '';
    str = String(str);

    return str.substr(0, 1).toUpperCase() + str.substr(1);
  };

  /**
    @name string#dasherize
    @public
    @function
    @return {String} The string in a dashed version
    @description Dasherize returns the given `string` converting camelCase and snakeCase
                 to dashes or replace them with the `replace` character.
    @param {String} string The string to dasherize
    @param {String} replace='-' The character to replace with
  */
  this.dasherize = function (string, replace) {
    var repl = replace || '-'
    return this.snakeize(string, repl);
  };

  /**
    @name string#include
    @public
    @function
    @return {Boolean} Returns true if the string is found in the string to search
    @description Searches for a particular string in another string
    @param {String} searchIn The string to search for the other string in
    @param {String} searchFor The string to search for
  */
  this.include = function (searchIn, searchFor) {
    var str = searchFor;
    if (!str && typeof string != 'string') {
      return false;
    }
    str = String(str);
    return (searchIn.indexOf(str) > -1);
  };

  /*
   * getInflections(name<String>, initialCap<String>)
   *
   * Inflection returns an object that contains different inflections
   * created from the given `name`
  */

  /**
    @name string#getInflections
    @public
    @function
    @return {Object} A Object containing multiple different inflects for the given `name`
    @description Inflection returns an object that contains different inflections
                 created from the given `name`
    @param {String} name The string to create inflections from
  */
  this.getInflections = function (name) {
    if (!name) {
      return;
    }

    var self = this
        // Use plural version to fix possible mistakes(e,g,. thingie instead of thingy)
      , normalizedName = this.snakeize(inflection.pluralize(name))
      , nameSingular = inflection.singularize(normalizedName)
      , namePlural = inflection.pluralize(normalizedName)
      , nameNormal = this.snakeize(name);

    return {
      // For filepaths or URLs
      filename: {
        normal: nameNormal
        // neil_peart
      , singular: nameSingular
        // neil_pearts
      , plural: namePlural
      }
      // Constructor names
    , constructor: {
        normal: self.camelize(nameNormal, {initialCap: true})
        // NeilPeart
      , singular: self.camelize(nameSingular, {initialCap: true})
        // NeilPearts
      , plural: self.camelize(namePlural, {initialCap: true})
      }
    , property: {
        normal: self.camelize(nameNormal)
        // neilPeart
      , singular: self.camelize(nameSingular)
        // neilPearts
      , plural: self.camelize(namePlural)
      }
    };
  };

  /**
    @name string#getInflection
    @public
    @function
    @return {Object} A Object containing multiple different inflects for the given `name`
    @description Inflection returns an object that contains different inflections
                 created from the given `name`
    @param {String} name The string to create inflections from
  */
  this.getInflection = function (name, key, pluralization) {
    var infl = this.getInflections(name);
    return infl[key][pluralization];
  };

  // From Math.uuid.js, https://github.com/broofa/node-uuid
  // Robert Kieffer (robert@broofa.com), MIT license
  this.uuid = function (length, radix) {
    var chars = _UUID_CHARS
      , uuid = []
      , r
      , i;

    radix = radix || chars.length;

    if (length) {
      // Compact form
      i = -1;
      while (++i < length) {
        uuid[i] = chars[0 | Math.random()*radix];
      }
    } else {
      // rfc4122, version 4 form

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      i = -1;
      while (++i < 36) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };
  
  /**
    @name string#stripTags
    @public
    @function
    @return {String} A String with HTML tags removed.
    @description Strips HTML tags from a string.
    @param {String} The string to strip HTML tags from
    @param {String|Array} A String or Array containing allowed tags. e.g. "<br><p>"
  */
  this.stripTags = function(string, allowed) {
    // taken from http://phpjs.org/functions/strip_tags/
    var allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    comments = /<!--[\s\S]*?-->/gi;
    return string.replace(comments, '').replace(tags, function ($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
  }

})();

module.exports = string;

