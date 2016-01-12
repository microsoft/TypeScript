interface Animal { animal }
interface Dog extends Animal { dog }
interface Cat extends Animal { cat }

function foo1(bar: { a:number }[]): Cat;
function foo1(bar: { a:string }[]): Dog;
function foo1([x]: { a:number | string }[]): Animal {
    return undefined;
}

function foo2(bar: { a:number }[]): Cat;
function foo2(bar: { a:string }[]): Dog;
function foo2([x]: { a:number | string }[]): Cat | Dog {
    return undefined;
}


var x1 = foo1([{a: "str"}]);
var y1 = foo1([{a: 100}]);

var x2 = foo2([{a: "str"}]);
var y2 = foo2([{a: 100}]);