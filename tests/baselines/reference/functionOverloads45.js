//// [functionOverloads45.ts]
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

//// [functionOverloads45.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function foo1(_a) {
    var _b = __read(_a, 1), x = _b[0];
    return undefined;
}
function foo2(_a) {
    var _b = __read(_a, 1), x = _b[0];
    return undefined;
}
var x1 = foo1([{ a: "str" }]);
var y1 = foo1([{ a: 100 }]);
var x2 = foo2([{ a: "str" }]);
var y2 = foo2([{ a: 100 }]);
