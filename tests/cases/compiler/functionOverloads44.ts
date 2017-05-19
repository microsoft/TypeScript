interface Animal { animal }
interface Dog extends Animal { dog }
interface Cat extends Animal { cat }

function foo1(bar: { a:number }[]): Dog;
function foo1(bar: { a:string }[]): Animal;
function foo1([x]: { a:number | string }[]): Dog {
    return undefined;
}

function foo2(bar: { a:number }[]): Cat;
function foo2(bar: { a:string }[]): Cat | Dog;
function foo2([x]: { a:number | string }[]): Cat {
    return undefined;
}


var x1 = foo1([{a: "str"}]);
var y1 = foo1([{a: 100}]);

var x2 = foo2([{a: "str"}]);
var y2 = foo2([{a: 100}]);