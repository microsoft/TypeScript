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
var uri
  , string = require('./string')
  , mixin = require('./core').mixin;

/**
  @name uri
  @namespace uri
*/

uri = new (function () {
  var _isArray = function (obj) {
    return obj &&
      typeof obj === 'object' &&
      typeof obj.length === 'number' &&
      typeof obj.splice === 'function' &&
      !(obj.propertyIsEnumerable('length'));
  };

  /**
    @name uri#getFileExtension
    @public
    @function
    @return {String} Returns the file extension for a given path
    @description Gets the file extension for a path and returns it
    @param {String} path The path to get the extension for
  */
  this.getFileExtension = function (path) {
    var match;
    if (path) {
      match = /.+\.(\w{2,4}$)/.exec(path);
    }
    return (match && match[1]) || '';
  };

  /**
    @name uri#paramify
    @public
    @function
    @return {String} Returns a querystring contains the given values
    @description Convert a JS Object to a querystring (key=val&key=val). Values in arrays
      will be added as multiple parameters
    @param {Object} obj An Object containing only scalars and arrays
    @param {Object} o The options to use for formatting
      @param {Boolean} [o.consolidate=false] take values from elements that can return
        multiple values (multi-select, checkbox groups) and collapse into a single,
        comman-delimited value.
      @param {Boolean} [o.includeEmpty=false] include keys in the string for all elements, even
        they have no value set (e.g., even if elemB has no value: elemA=foo&elemB=&elemC=bar).
        Note that some false-y values are always valid even without this option, [0, ''].
        This option extends coverage to [null, undefined, NaN]
      @param {Boolean} [o.snakeize=false] change param names from camelCase to snake_case.
      @param {Boolean} [o.escapeVals=false] escape the values for XML entities.
      @param {Boolean} [o.index=false] use numeric indices for arrays
  */
  this.paramify = function (obj, o) {
    var opts = o || {},
        _opts,
        str = '',
        key,
        val,
        isValid,
        itemArray,
        arr = [],
        arrVal,
        prefix = opts.prefix || '',
        self = this;

    function getParamName(key)
    {
      if (opts.prefix) {
        return prefix + '[' + key + ']';
      }
      else {
        return key;
      }
    }

    for (var p in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
        val = obj[p];

        // This keeps valid falsy values like false and 0
        // It's duplicated in the array block below. Could
        // put it in a function but don't want the overhead
        isValid = !( val === null || val === undefined ||
                    (typeof val === 'number' && isNaN(val)) );

        key = opts.snakeize ? string.snakeize(p) : p;
        if (isValid) {
          // Multiple vals -- array
          if (_isArray(val) && val.length) {
            itemArray = [];
            for (var i = 0, ii = val.length; i < ii; i++) {
              arrVal = val[i];
              // This keeps valid falsy values like false and 0
              isValid = !( arrVal === null || arrVal === undefined ||
                           (typeof arrVal === 'number' && isNaN(arrVal)) );

              // for index mode, which works recursive
              // objects and array must not be encoded
              if (opts.index && typeof arrVal === 'object') {
                itemArray[i] = arrVal;
              }
              else {
                itemArray[i] = isValid ? encodeURIComponent(arrVal) : '';

                if (opts.escapeVals) {
                  itemArray[i] = string.escapeXML(itemArray[i]);
                }
              }
            }
            // Consolidation mode -- single value joined on comma
            if (opts.consolidate) {
              arr.push(getParamName(key) + '=' + itemArray.join(','));
            }
            // Indexed mode -- multiple, same-named params with numeric indices
            else if (opts.index) {
              // {foo: [1, 2, 3]} => 'foo[0]=1&foo[1]=2&foo[2]=3'

              itemArray.forEach(function(item, i) {
                // recursion of arrays
                if (_isArray(item) && item.length) {
                  _opts = mixin(opts, {});
                  item.forEach(function(_item, ii) {

                    if (typeof _item === 'object') {
                      _opts.prefix = getParamName(key) + '[' + i + '][' + ii + ']';
                      arr.push(self.paramify(_item, _opts));
                    }
                    else {
                      arr.push(getParamName(key) + '[' + i + '][' + ii + ']=' + _item);
                    }
                  });
                }
                // recursion of object in array
                else if (typeof item === 'object') {
                  _opts = mixin(opts, {});
                  _opts.prefix = getParamName(key) + '[' + i + ']';
                  arr.push(self.paramify(item, _opts));
                }
                // primitive
                else {
                  arr.push(getParamName(key) + '[' + i + ']=' + item);
                }
              });
            }
            // Normal mode -- multiple, same-named params with each val
            else {
              // {foo: [1, 2, 3]} => 'foo=1&foo=2&foo=3'
              // Add into results array, as this just ends up getting
              // joined on ampersand at the end anyhow
              arr.push(getParamName(key) + '=' + itemArray.join('&' + getParamName(key) + '='));
            }
          }
          // Object -- recursion
          else if (typeof val === 'object') {
            _opts = mixin(opts, {});
            _opts.prefix = getParamName(key);

            arr.push(this.paramify(val, _opts));
          }
          // Single val -- string
          else {
            if (opts.escapeVals) {
              val = string.escapeXML(val);
            }
            arr.push(getParamName(key) + '=' + encodeURIComponent(val));
          }
          str += '&';
        }
        else {
          if (opts.includeEmpty) { arr.push(getParamName(key) + '='); }
        }
      }
    }
    return arr.join('&');
  };

  /**
    @name uri#objectify
    @public
    @function
    @return {Object} JavaScript key/val object with the values from the querystring
    @description Convert the values in a query string (key=val&key=val) to an Object
    @param {String} str The querystring to convert to an object
    @param {Object} o The options to use for formatting
      @param {Boolean} [o.consolidate=true] Convert multiple instances of the same
        key into an array of values instead of overwriting
  */
  this.objectify = function (str, o) {
    var opts = o || {};
    var d = {};
    var consolidate = typeof opts.consolidate == 'undefined' ?
        true : opts.consolidate;
    if (str) {
      var arr = str.split('&');
      for (var i = 0; i < arr.length; i++) {
        var pair = arr[i].split('=');
        var name = pair[0];
        var val = decodeURIComponent(pair[1] || '');
        // "We've already got one!" -- arrayize if the flag
        // is set
        if (typeof d[name] != 'undefined' && consolidate) {
          if (typeof d[name] == 'string') {
            d[name] = [d[name]];
          }
          d[name].push(val);
        }
        // Otherwise just set the value
        else {
          d[name] = val;
        }
      }
    }
    return d;
  };

})();

module.exports = uri;

