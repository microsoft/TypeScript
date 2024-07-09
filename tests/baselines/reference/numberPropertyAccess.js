//// [tests/cases/conformance/types/primitives/number/numberPropertyAccess.ts] ////

//// [numberPropertyAccess.ts]
var x = 1;
var a = x.toExponential();
var b = x.hasOwnProperty('toFixed');

var c = x['toExponential']();
var d = x['hasOwnProperty']('toFixed');

//// [numberPropertyAccess.js]
var x = 1;
var a = x.toExponential();
var b = x.hasOwnProperty('toFixed');
var c = x['toExponential']();
var d = x['hasOwnProperty']('toFixed');
