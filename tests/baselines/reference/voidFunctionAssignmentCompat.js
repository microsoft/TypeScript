//// [voidFunctionAssignmentCompat.ts]
var fa = function(): any { return 3; }
fa = function() { } // should not work

var fv = function(): void {}
fv = function() { return 0; } // should work

function execAny(callback:(val:any)=>any) { return callback(0) }
execAny(function () {}); // should work

function execVoid(callback:(val:any)=>void) { callback(0); }
execVoid(function () {return 0;}); // should work

var fra: (v:any)=>any = function() { return function () {}; } // should work
var frv: (v:any)=>void = function() { return function () { return 0; } } // should work

var fra3: (v:any)=>string = (function() { return function (v:string) {return v;}; })() // should work
var frv3: (v:any)=>number = (function() { return function () { return 0; } })() // should work



//// [voidFunctionAssignmentCompat.js]
var fa = function () { return 3; };
fa = function () { }; // should not work
var fv = function () { };
fv = function () { return 0; }; // should work
function execAny(callback) { return callback(0); }
execAny(function () { }); // should work
function execVoid(callback) { callback(0); }
execVoid(function () { return 0; }); // should work
var fra = function () { return function () { }; }; // should work
var frv = function () { return function () { return 0; }; }; // should work
var fra3 = (function () { return function (v) { return v; }; })(); // should work
var frv3 = (function () { return function () { return 0; }; })(); // should work
