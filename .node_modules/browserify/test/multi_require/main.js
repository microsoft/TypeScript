var localA = require('./a.js');
var globalA = require('a');

t.equal(localA, globalA);
