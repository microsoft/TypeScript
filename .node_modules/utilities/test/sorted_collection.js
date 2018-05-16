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
var SortedCollection = require('../lib/sorted_collection').SortedCollection
  , assert = require('assert')
  , tests;

tests = {

  'test no default value': function () {
    // Set up a collection, no default value for new items
    var c = new SortedCollection();
    // Add some items
    c.addItem('testA', 'AAAA');
    c.addItem('testB', 'BBBB');
    c.addItem('testC', 'CCCC');
    // Test count
    assert.equal(3, c.count);
    // Test getItem by string key
    var item = c.getItem('testC');
    assert.equal('CCCC', item);
    // Test getItem by index number
    var item = c.getItem(1);
    assert.equal('BBBB', item);
    // Test setItem by string key
    c.setItem('testA', 'aaaa');
    var item = c.getItem('testA');
    assert.equal('aaaa', item);
    // Test setItem by index number
    c.setItem(2, 'cccc');
    var item = c.getItem(2);
    assert.equal('cccc', item);
  }

, 'test default value': function () {
    // Set up a collection, default value for new items is 'foo'
    var c = new SortedCollection('foo');
    // Add an item with no value -- should get
    // default value
    c.addItem('testA');
    // Add some items with empty/falsey values --
    // should be set to desired values
    c.addItem('testB', null);
    c.addItem('testC', false);
    // Test getItem for default value
    var item = c.getItem('testA');
    assert.equal('foo', item);
    var item = c.getItem('testB');
    assert.equal(null, item);
    var item = c.getItem('testC');
    assert.equal(false, item);
  }

, 'test each': function () {
    var c = new SortedCollection()
      , str = '';
    // Add an item with no value -- should get
    // default value
    c.addItem('a', 'A');
    c.addItem('b', 'B');
    c.addItem('c', 'C');
    c.addItem('d', 'D');
    c.each(function (val, key) {
      str += val + key;
    });
    assert.equal('AaBbCcDd', str);
  }

, 'test removing an item': function () {
    var c = new SortedCollection()
      , str = '';
    // Add an item with no value -- should get
    // default value
    c.addItem('a', 'A');
    c.addItem('b', 'B');
    c.addItem('c', 'C');
    c.addItem('d', 'D');
    assert.equal(4, c.count);

    omg = c.removeItem('c');
    assert.equal(3, c.count);

    c.each(function (val, key) {
      str += val + key;
    });
    assert.equal('AaBbDd', str);
  }

, 'test clone': function () {
    var c = new SortedCollection()
      , copy;
    c.addItem('a', 'A');
    c.addItem('b', 'B');
    copy = c.clone();
    assert.equal(2, copy.count);
    assert.equal('A', copy.getItem('a'));
  }

};

module.exports = tests;
