//// [duplicateVariablesWithAny.js]
// They should have to be the same even when one of the types is 'any'
var x;
var x = 2;

var y = "";
var y;

var N;
(function (N) {
    var x;
    var x = 2;

    var y = "";
    var y;
})(N || (N = {}));

var z;
var z; // ok
