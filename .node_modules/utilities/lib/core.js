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

var core = new (function () {
  var ownPropFunc = Object.prototype.hasOwnProperty;

  var _mix = function (targ, src, merge, includeProto) {
    for (var p in src) {
      // Don't copy stuff from the prototype
      if (ownPropFunc.call(src, p) || includeProto) {
        if (merge &&
            // Assumes the source property is an Object you can
            // actually recurse down into
            (typeof src[p] == 'object') &&
            (src[p] !== null) &&
            !(src[p] instanceof Array)) {
          // Create the source property if it doesn't exist
          // Double-equal to undefined includes both null and undefined
          if (targ[p] == undefined) {
            targ[p] = {};
          }
          _mix(targ[p], src[p], merge, includeProto); // Recurse
        }
        // If it's not a merge-copy, just set and forget
        else {
          targ[p] = src[p];
        }
      }
    }
  };

  /*
   * Mix in the properties on an object to another object
   * yam.mixin(target, source, [source,] [source, etc.] [merge-flag]);
   * 'merge' recurses, to merge object sub-properties together instead
   * of just overwriting with the source object.
   */
  this.mixin = function () {
    var args = Array.prototype.slice.apply(arguments),
        merge = false,
        targ, sources;
    if (args.length > 2) {
      if (typeof args[args.length - 1] == 'boolean') {
        merge = args.pop();
      }
    }
    targ = args.shift();
    sources = args;
    for (var i = 0, ii = sources.length; i < ii; i++) {
      _mix(targ, sources[i], merge);
    }
    return targ;
  };

  this.enhance = function () {
    var args = Array.prototype.slice.apply(arguments),
        merge = false,
        targ, sources;
    if (args.length > 2) {
      if (typeof args[args.length - 1] == 'boolean') {
        merge = args.pop();
      }
    }
    targ = args.shift();
    sources = args;
    for (var i = 0, ii = sources.length; i < ii; i++) {
      _mix(targ, sources[i], merge, true);
    }
    return targ;
  };

  // Idea to add invalid number & Date from Michael J. Ryan,
  // http://frugalcoder.us/post/2010/02/15/js-is-empty.aspx
  this.isEmpty = function (val) {
    // Empty string, null or undefined (these two are double-equal)
    if (val === '' || val == undefined) {
      return true;
    }
    // Invalid numerics
    if (typeof val == 'number' && isNaN(val)) {
      return true;
    }
    // Invalid Dates
    if (val instanceof Date && isNaN(val.getTime())) {
      return true;
    }
    return false;
  };

  /*
  binds a function to an object
   */
  this.bind = function () {
    var args = Array.prototype.slice.call(arguments)
      , ctxt = args.shift()
      , fn = args.shift();

    if (typeof fn === 'function') {
      if (typeof Function.bind === 'function') {
        return fn.bind.apply(ctxt, args);
      }
      else {
        return fn.apply(ctxt, args);
      }
    }
    // in IE, native methods are not functions so they cannot be bound,
    // and don't need to be
    else {
      return fn;
    }
  }
})();

module.exports = core;
