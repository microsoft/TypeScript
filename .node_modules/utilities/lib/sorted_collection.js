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
  @name SortedCollection
  @namespace SortedCollection
  @constructor
*/

var SortedCollection = function (d) {
  this.count = 0;
  this.items = {}; // Hash keys and their values
  this.order = []; // Array for sort order
  if (d) {
    this.defaultValue = d;
  };
};

SortedCollection.prototype = new (function () {
  /**
    @name SortedCollection#addItem
    @public
    @function
    @return {Any} The given val is returned
    @description Adds a new key/value to the collection
    @param {String} key The key for the collection item
    @param {Any} val The value for the collection item
  */
  this.addItem = function (key, val) {
    if (typeof key != 'string') {
      throw('Hash only allows string keys.');
    }
    return this.setByKey(key, val);
  };

  /**
    @name SortedCollection#getItem
    @public
    @function
    @return {Any} The value for the given identifier is returned
    @description Retrieves the value for the given identifier that being a key or index
    @param {String/Number} p The identifier to look in the collection for, being a key or index
  */
  this.getItem = function (p) {
    if (typeof p == 'string') {
      return this.getByKey(p);
    }
    else if (typeof p == 'number') {
      return this.getByIndex(p);
    }
  };

  /**
    @name SortedCollection#setItem
    @public
    @function
    @return {Any} The given val is returned
    @description Sets the item in the collection with the given val, overwriting the existsing item
      if identifier is an index
    @param {String/Number} p The identifier set in the collection, being either a key or index
    @param {Any} val The value for the collection item
  */
  this.setItem = function (p, val) {
    if (typeof p == 'string') {
      return this.setByKey(p, val);
    }
    else if (typeof p == 'number') {
      return this.setByIndex(p, val);
    }
  };

  /**
    @name SortedCollection#removeItem
    @public
    @function
    @return {Boolean} Returns true if the item has been removed, false otherwise
    @description Removes the item for the given identifier
    @param {String/Number} p The identifier to delete the item for, being a key or index
  */
  this.removeItem = function (p) {
    if (typeof p == 'string') {
      return this.removeByKey(p);
    }
    else if (typeof p == 'number') {
      return this.removeByIndex(p);
    }
  };

  /**
    @name SortedCollection#getByKey
    @public
    @function
    @return {Any} The value for the given key item is returned
    @description Retrieves the value for the given key
    @param {String} key The key for the item to lookup
  */
  this.getByKey = function (key) {
    return this.items[key];
  };

  /**
    @name SortedCollection#setByKey
    @public
    @function
    @return {Any} The given val is returned
    @description Sets a item by key assigning the given val
    @param {String} key The key for the item
    @param {Any} val The value to set for the item
  */
  this.setByKey = function (key, val) {
    var v = null;
    if (typeof val == 'undefined') {
      v = this.defaultValue;
    }
    else { v = val; }
    if (typeof this.items[key] == 'undefined') {
      this.order[this.count] = key;
      this.count++;
    }
    this.items[key] = v;
    return this.items[key];
  };

  /**
    @name SortedCollection#removeByKey
    @public
    @function
    @return {Boolean} If the item was removed true is returned, false otherwise
    @description Removes a collection item by key
    @param {String} key The key for the item to remove
  */
  this.removeByKey = function (key) {
    if (typeof this.items[key] != 'undefined') {
      var pos = null;
      delete this.items[key]; // Remove the value
      // Find the key in the order list
      for (var i = 0; i < this.order.length; i++) {
        if (this.order[i] == key) {
          pos = i;
        }
      }
      this.order.splice(pos, 1); // Remove the key
      this.count--; // Decrement the length
      return true;
    }
    else {
      return false;
    }
  };

  /**
    @name SortedCollection#getByIndex
    @public
    @function
    @return {Any} The value for the given index item is returned
    @description Retrieves the value for the given index
    @param {Number} ind The index to lookup for the item
  */
  this.getByIndex = function (ind) {
    return this.items[this.order[ind]];
  };

  /**
    @name SortedCollection#setByIndex
    @public
    @function
    @return {Any} The given val is returned
    @description Sets a item by index assigning the given val
    @param {Number} ind The index for the item
    @param {Any} val The value to set for the item
  */
  this.setByIndex = function (ind, val) {
    if (ind < 0 || ind >= this.count) {
      throw('Index out of bounds. Hash length is ' + this.count);
    }
    this.items[this.order[ind]] = val;
    return this.items[this.order[ind]];
  };

  /**
    @name SortedCollection#removeByIndex
    @public
    @function
    @return {Boolean} If the item was removed true is returned, false otherwise
    @description Removes a collection item by index
    @param {Number} ind The index for the item to remove
  */
  this.removeByIndex = function (ind) {
    var ret = this.items[this.order[ind]];
    if (typeof ret != 'undefined') {
      delete this.items[this.order[ind]]
      this.order.splice(ind, 1);
      this.count--;
      return true;
    }
    else {
      return false;
    }
  };

  /**
    @name SortedCollection#hasKey
    @public
    @function
    @return {Boolean} Returns true if the item exists, false otherwise
    @description Checks if a key item exists in the collection
    @param {String} key The key to look for in the collection
  */
  this.hasKey = function (key) {
    return typeof this.items[key] != 'undefined';
  };

  /**
    @name SortedCollection#hasValue
    @public
    @function
    @return {Boolean} Returns true if a key with the given value exists, false otherwise
    @description Checks if a key item in the collection has a given val
    @param {Any} val The value to check for in the collection
  */
  this.hasValue = function (val) {
    for (var i = 0; i < this.order.length; i++) {
      if (this.items[this.order[i]] == val) {
        return true;
      }
    }
    return false;
  };

  /**
    @name SortedCollection#allKeys
    @public
    @function
    @return {String} Returns all the keys in a string
    @description Joins all the keys into a string
    @param {String} str The string to use between each key
  */
  this.allKeys = function (str) {
    return this.order.join(str);
  };

  /**
    @name SortedCollection#replaceKey
    @public
    @function
    @description Joins all the keys into a string
    @param {String} oldKey The key item to change
    @param {String} newKey The key item to change the name to
  */
  this.replaceKey = function (oldKey, newKey) {
    // If item for newKey exists, nuke it
    if (this.hasKey(newKey)) {
      this.removeItem(newKey);
    }
    this.items[newKey] = this.items[oldKey];
    delete this.items[oldKey];
    for (var i = 0; i < this.order.length; i++) {
      if (this.order[i] == oldKey) {
        this.order[i] = newKey;
      }
    }
  };

  /**
    @name SortedCollection#insertAtIndex
    @public
    @function
    @return {Boolean} Returns true if the item was set at the given index
    @description Inserts a key/value at a specific index in the collection
    @param {Number} ind The index to set the item at
    @param {String} key The key to use at the item index
    @param {Any} val The value to set for the item
  */
  this.insertAtIndex = function (ind, key, val) {
    this.order.splice(ind, 0, key);
    this.items[key] = val;
    this.count++;
    return true;
  };

  /**
    @name SortedCollection#insertAfterKey
    @public
    @function
    @return {Boolean} Returns true if the item was set for the given key
    @description Inserts a key/value item after the given reference key in the collection
    @param {String} refKey The key to insert the new item after
    @param {String} key The key for the new item
    @param {Any} val The value to set for the item
  */
  this.insertAfterKey = function (refKey, key, val) {
    var pos = this.getPosition(refKey);
    return this.insertAtIndex(pos, key, val);
  };

  /**
    @name SortedCollection#getPosition
    @public
    @function
    @return {Number} Returns the index for the item of the given key
    @description Retrieves the index of the key item
    @param {String} key The key to get the index for
  */
  this.getPosition = function (key) {
    var order = this.order;
    if (typeof order.indexOf == 'function') {
      return order.indexOf(key);
    }
    else {
      for (var i = 0; i < order.length; i++) {
        if (order[i] == key) { return i;}
      }
    }
  };

  /**
    @name SortedCollection#each
    @public
    @function
    @return {Boolean}
    @description Loops through the collection and calls the given function
    @param {Function} func The function to call for each collection item, the arguments
      are the key and value for the current item
    @param {Object} opts The options to use
      @param {Boolean} [opts.keyOnly] Only give the function the key
      @param {Boolean} [opts.valueOnly] Only give the function the value
  */
  this.each = function (func, opts) {
    var options = opts || {}
      , order = this.order;
    for (var i = 0, ii = order.length; i < ii; i++) {
      var key = order[i];
      var val = this.items[key];
      if (options.keyOnly) {
        func(key);
      }
      else if (options.valueOnly) {
        func(val);
      }
      else {
        func(val, key);
      }
    }
    return true;
  };

  /**
    @name SortedCollection#eachKey
    @public
    @function
    @return {Boolean}
    @description Loops through the collection and calls the given function
    @param {Function} func The function to call for each collection item, only giving the
      key to the function
  */
  this.eachKey = function (func) {
    return this.each(func, { keyOnly: true });
  };

  /**
    @name SortedCollection#eachValue
    @public
    @function
    @return {Boolean}
    @description Loops through the collection and calls the given function
    @param {Function} func The function to call for each collection item, only giving the
      value to the function
  */
  this.eachValue = function (func) {
    return this.each(func, { valueOnly: true });
  };

  /**
    @name SortedCollection#clone
    @public
    @function
    @return {Object} Returns a new SortedCollection with the data of the current one
    @description Creates a cloned version of the current collection and returns it
  */
  this.clone = function () {
    var coll = new SortedCollection()
      , key
      , val;
    for (var i = 0; i < this.order.length; i++) {
      key = this.order[i];
      val = this.items[key];
      coll.setItem(key, val);
    }
    return coll;
  };

  /**
    @name SortedCollection#concat
    @public
    @function
    @description Join a given collection with the current one
    @param {Object} hNew A SortedCollection to join from
  */
  this.concat = function (hNew) {
    for (var i = 0; i < hNew.order.length; i++) {
      var key = hNew.order[i];
      var val = hNew.items[key];
      this.setItem(key, val);
    }
  };

  /**
    @name SortedCollection#push
    @public
    @function
    @return {Number} Returns the count of items
    @description Appends a new item to the collection
    @param {String} key The key to use for the item
    @param {Any} val The value to use for the item
  */
  this.push = function (key, val) {
    this.insertAtIndex(this.count, key, val);
    return this.count;
  };

  /**
    @name SortedCollection#pop
    @public
    @function
    @return {Any} Returns the value for the last item in the collection
    @description Pops off the last item in the collection and returns it's value
  */
  this.pop = function () {
    var pos = this.count-1;
    var ret = this.items[this.order[pos]];
    if (typeof ret != 'undefined') {
      this.removeByIndex(pos);
      return ret;
    }
    else {
      return;
    }
  };

  /**
    @name SortedCollection#unshift
    @public
    @function
    @return {Number} Returns the count of items
    @description Prepends a new item to the beginning of the collection
    @param {String} key The key to use for the item
    @param {Any} val The value to use for the item
  */
  this.unshift = function (key, val) {
    this.insertAtIndex(0, key, val);
    return this.count;
  };

  /**
    @name SortedCollection#shift
    @public
    @function
    @return {Number} Returns the removed items value
    @description Removes the first item in the list and returns it's value
  */
  this.shift = function () {
    var pos = 0;
    var ret = this.items[this.order[pos]];
    if (typeof ret != 'undefined') {
      this.removeByIndex(pos);
      return ret;
    }
    else {
      return;
    }
  };

  /**
    @name SortedCollection#splice
    @public
    @function
    @description Removes items from index to the given max and then adds the given
      collections items
    @param {Number} index The index to start at when removing items
    @param {Number} numToRemove The number of items to remove before adding the new items
    @param {Object} hash the collection of items to add
  */
  this.splice = function (index, numToRemove, hash) {
    var _this = this;
    // Removal
    if (numToRemove > 0) {
      // Items
      var limit = index + numToRemove;
      for (var i = index; i < limit; i++) {
        delete this.items[this.order[i]];
      }
      // Order
      this.order.splice(index, numToRemove);
    }
    // Adding
    if (hash) {
      // Items
      for (var i in hash.items) {
        this.items[i] = hash.items[i];
      }
      // Order
      var args = hash.order;
      args.unshift(0);
      args.unshift(index);
      this.order.splice.apply(this.order, args);
    }
    this.count = this.order.length;
  };

  this.sort = function (c) {
    var arr = [];
    // Assumes vals are comparable scalars
    var comp = function (a, b) {
      return c(a.val, b.val);
    }
    for (var i = 0; i < this.order.length; i++) {
      var key = this.order[i];
      arr[i] = { key: key, val: this.items[key] };
    }
    arr.sort(comp);
    this.order = [];
    for (var i = 0; i < arr.length; i++) {
      this.order.push(arr[i].key);
    }
  };

  this.sortByKey = function (comp) {
    this.order.sort(comp);
  };

  /**
    @name SortedCollection#reverse
    @public
    @function
    @description Reverse the collection item list
  */
  this.reverse = function () {
    this.order.reverse();
  };

})();

module.exports.SortedCollection = SortedCollection;
