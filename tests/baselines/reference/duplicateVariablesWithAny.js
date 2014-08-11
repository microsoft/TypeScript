//// [duplicateVariablesWithAny.ts]
// They should have to be the same even when one of the types is 'any'
var x: any;
var x = 2; //error

var y = "";
var y; //error

module N {
    var x: any;
    var x = 2; //error

    var y = "";
    var y; //error
}

var z: any;
var z; // ok

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
var z;
