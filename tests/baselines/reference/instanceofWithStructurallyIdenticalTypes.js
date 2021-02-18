//// [instanceofWithStructurallyIdenticalTypes.ts]
// Repro from #7271

class C1 { item: string }
class C2 { item: string[] }
class C3 { item: string }

function foo1(x: C1 | C2 | C3): string {
    if (x instanceof C1) {
        return x.item;
    }
    else if (x instanceof C2) {
        return x.item[0];
    }
    else if (x instanceof C3) {
        return x.item;
    }
    return "error";
}

function isC1(c: C1 | C2 | C3): c is C1 { return c instanceof C1 }
function isC2(c: C1 | C2 | C3): c is C2 { return c instanceof C2 }
function isC3(c: C1 | C2 | C3): c is C3 { return c instanceof C3 }

function foo2(x: C1 | C2 | C3): string {
    if (isC1(x)) {
        return x.item;
    }
    else if (isC2(x)) {
        return x.item[0];
    }
    else if (isC3(x)) {
        return x.item;
    }
    return "error";
}

// More tests

class A { a: string }
class A1 extends A { }
class A2 { a: string }
class B extends A { b: string }

function goo(x: A) {
    if (x instanceof A) {
        x;  // A
    }
    else {
        x;  // never
    }
    if (x instanceof A1) {
        x;  // A1
    }
    else {
        x;  // A
    }
    if (x instanceof A2) {
        x;  // A2
    }
    else {
        x;  // A
    }
    if (x instanceof B) {
        x;  // B
    }
    else {
        x;  // A
    }
}


//// [instanceofWithStructurallyIdenticalTypes.js]
// Repro from #7271
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
function foo1(x) {
    if (x instanceof C1) {
        return x.item;
    }
    else if (x instanceof C2) {
        return x.item[0];
    }
    else if (x instanceof C3) {
        return x.item;
    }
    return "error";
}
function isC1(c) { return c instanceof C1; }
function isC2(c) { return c instanceof C2; }
function isC3(c) { return c instanceof C3; }
function foo2(x) {
    if (isC1(x)) {
        return x.item;
    }
    else if (isC2(x)) {
        return x.item[0];
    }
    else if (isC3(x)) {
        return x.item;
    }
    return "error";
}
// More tests
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var A1 = /** @class */ (function (_super) {
    __extends(A1, _super);
    function A1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A1;
}(A));
var A2 = /** @class */ (function () {
    function A2() {
    }
    return A2;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
function goo(x) {
    if (x instanceof A) {
        x; // A
    }
    else {
        x; // never
    }
    if (x instanceof A1) {
        x; // A1
    }
    else {
        x; // A
    }
    if (x instanceof A2) {
        x; // A2
    }
    else {
        x; // A
    }
    if (x instanceof B) {
        x; // B
    }
    else {
        x; // A
    }
}
