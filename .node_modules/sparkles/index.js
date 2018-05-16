'use strict';

var EventEmitter = require('events').EventEmitter;

var sparklesNamespace = 'store@sparkles';
var defaultNamespace = 'default';

function getStore(){
  var store = global[sparklesNamespace];

  if(!store){
    store = global[sparklesNamespace] = {};
  }

  return store;
}

function getEmitter(namespace){

  var store = getStore();

  namespace = namespace || defaultNamespace;

  var ee = store[namespace];

  if(!ee){
    ee = store[namespace] = new EventEmitter();
    ee.setMaxListeners(0);
    ee.remove = function remove(){
      ee.removeAllListeners();
      delete store[namespace];
    };
  }

  return ee;
}

function exists(namespace){
  var store = getStore();

  return !!(store[namespace]);
}

module.exports = getEmitter;
module.exports.exists = exists;
