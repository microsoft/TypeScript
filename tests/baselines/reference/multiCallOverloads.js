//// [multiCallOverloads.ts]
interface ICallback {
    (x?: string):void;
}

function load(f: ICallback) {}

var f1: ICallback = function(z?) {}
var f2: ICallback = function(z?) {}
load(f1) // ok
load(f2) // ok
load(function() {}) // this shouldn’t be an error
load(function(z?) {}) // this shouldn't be an error


//// [multiCallOverloads.js]
function load(f) { }
var f1 = function (z) { };
var f2 = function (z) { };
load(f1); // ok
load(f2); // ok
load(function () { }); // this shouldn’t be an error
load(function (z) { }); // this shouldn't be an error
