//// [defaultBestCommonTypesHaveDecls.ts]
var obj1: {};
obj1.length;

var obj2: Object;
obj2.length;

function concat<T>(x: T, y: T): T { return null; }
var result = concat(1, ""); // error
var elementCount = result.length; 

function concat2<T, U>(x: T, y: U) { return null; }
var result2 = concat2(1, ""); // result2 will be number|string
var elementCount2 = result.length; 



//// [defaultBestCommonTypesHaveDecls.js]
var obj1;
obj1.length;
var obj2;
obj2.length;
function concat(x, y) { return null; }
var result = concat(1, ""); // error
var elementCount = result.length;
function concat2(x, y) { return null; }
var result2 = concat2(1, ""); // result2 will be number|string
var elementCount2 = result.length;
