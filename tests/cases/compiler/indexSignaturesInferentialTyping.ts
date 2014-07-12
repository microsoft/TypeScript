function foo<T>(items: { [index: number]: T }): T { return undefined; }
function bar<T>(items: { [index: string]: T }): T { return undefined; }

var x1 = foo({ 0: 0, 1: 1 });       // type should be number
var x2 = foo({ zero: 0, one: 1 });
var x3 = bar({ 0: 0, 1: 1 });
var x4 = bar({ zero: 0, one: 1 });  // type should be number
