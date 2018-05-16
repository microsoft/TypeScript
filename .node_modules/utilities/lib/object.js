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

/**
  @name object
  @namespace object
*/

var object = new (function () {

  /**
    @name object#merge
    @public
    @function
    @return {Object} Returns the merged object
    @description Merge merges `otherObject` into `object` and takes care of deep
                 merging of objects
    @param {Object} object Object to merge into
    @param {Object} otherObject Object to read from
  */
  this.merge = function (object, otherObject) {
    var obj = object || {}
      , otherObj = otherObject || {}
      , key, value;

    for (key in otherObj) {
      value = otherObj[key];

      // Check if a value is an Object, if so recursively add it's key/values
      if (typeof value === 'object' && !(value instanceof Array)) {
        // Update value of object to the one from otherObj
        obj[key] = this.merge(obj[key], value);
      }
      // Value is anything other than an Object, so just add it
      else {
        obj[key] = value;
      }
    }

    return obj;
  };

  /**
    @name object#reverseMerge
    @public
    @function
    @return {Object} Returns the merged object
    @description ReverseMerge merges `object` into `defaultObject`
    @param {Object} object Object to read from
    @param {Object} defaultObject Object to merge into
  */
  this.reverseMerge = function (object, defaultObject) {
    // Same as `merge` except `defaultObject` is the object being changed
    // - this is useful if we want to easily deal with default object values
    return this.merge(defaultObject, object);
  };

  /**
    @name object#isEmpty
    @public
    @function
    @return {Boolean} Returns true if empty false otherwise
    @description isEmpty checks if an Object is empty
    @param {Object} object Object to check if empty
  */
  this.isEmpty = function (object) {
    // Returns true if a object is empty false if not
    for (var i in object) { return false; }
    return true;
  };

  /**
    @name object#toArray
    @public
    @function
    @return {Array} Returns an array of objects each including the original key and value
    @description Converts an object to an array of objects each including the original key/value
    @param {Object} object Object to convert
  */
  this.toArray = function (object) {
    // Converts an object into an array of objects with the original key, values
    array = [];

    for (var i in object) {
      array.push({ key: i, value: object[i] });
    }

    return array;
  };

})();

module.exports = object;
