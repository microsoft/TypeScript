//// [indexSignaturesInferentialTyping.ts]
function foo<T>(items: { [index: number]: T }): T { return undefined; }
function bar<T>(items: { [index: string]: T }): T { return undefined; }

var x1 = foo({ 0: 0, 1: 1 });       // type should be number
var x2 = bar({ 0: 0, 1: 1 });
var x3 = bar({ zero: 0, one: 1 });  // type should be number


//// [indexSignaturesInferentialTyping.js]
function foo(items) { return undefined; }
function bar(items) { return undefined; }
var x1 = foo({ 0: 0, 1: 1 }); // type should be number
var x2 = bar({ 0: 0, 1: 1 });
var x3 = bar({ zero: 0, one: 1 }); // type should be number
