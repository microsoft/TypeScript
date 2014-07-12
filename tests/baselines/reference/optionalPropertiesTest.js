//// [optionalPropertiesTest.js]
var x;

var foo;
foo = { id: 1234 }; // Ok
foo = { id: 1234, name: "test" }; // Ok
foo = { name: "test" }; // Error, id missing
foo = { id: 1234, print: function () {
    } };

var s = foo.name || "default";
if (foo.print !== undefined)
    foo.print();

;
;
;
;

var test1 = {};
var test2 = {};
var test3 = {};
var test4 = {};
var test5 = { M: function () {
    } };
var test6 = { M: 5 };
var test7 = { M: function () {
    } };
test7 = {};
var test8 = { M: 5 };
test8 = {};
var test9_1;
var test9_2;
test9_1 = test9_2;
var test10_1;
var test10_2;
test10_1 = test10_2;
