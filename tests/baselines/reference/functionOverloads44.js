//// [functionOverloads44.ts]
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

//// [functionOverloads44.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
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
