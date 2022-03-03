//// [deeplyNestedAssignabilityErrorsCombined.ts]
let x = { a: { b: { c: { d: { e: { f() { return { g: "hello" }; } } } } } } };
let y = { a: { b: { c: { d: { e: { f() { return { g: 12345 }; } } } } } } };
x = y;

class Ctor1 {
    g = "ok"
}

class Ctor2 {
    g = 12;
}

let x2 = { a: { b: { c: { d: { e: { f: Ctor1 } } } } } };
let y2 = { a: { b: { c: { d: { e: { f: Ctor2 } } } } } };
x2 = y2;

//// [deeplyNestedAssignabilityErrorsCombined.js]
var x = { a: { b: { c: { d: { e: { f: function () { return { g: "hello" }; } } } } } } };
var y = { a: { b: { c: { d: { e: { f: function () { return { g: 12345 }; } } } } } } };
x = y;
var Ctor1 = /** @class */ (function () {
    function Ctor1() {
        this.g = "ok";
    }
    return Ctor1;
}());
var Ctor2 = /** @class */ (function () {
    function Ctor2() {
        this.g = 12;
    }
    return Ctor2;
}());
var x2 = { a: { b: { c: { d: { e: { f: Ctor1 } } } } } };
var y2 = { a: { b: { c: { d: { e: { f: Ctor2 } } } } } };
x2 = y2;
