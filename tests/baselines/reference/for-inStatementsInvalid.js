//// [for-inStatementsInvalid.ts]
var aNumber: number;
for (aNumber in {}) { }

var aBoolean: boolean;
for (aBoolean in {}) { }

var aRegExp: RegExp;
for (aRegExp in {}) { }

for (var idx : number in {}) { }

function fn(): void { }
for (var x in fn()) { }

var c : string, d:string, e;

for (var x in c || d) { }
for (var x in e ? c : d) { }
for (var x in 42 ? c : d) { }
for (var x in '' ? c : d) { }
for (var x in 42 ? d[x] : c[x]) { }
for (var x in c[23]) { }

for (var x in (<T>(x: T) => x)) { }
for (var x in function (x: string, y: number) { return x + y }) { }

class A {
    biz() : number{
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }
        return null;
    }

    static baz() : number {
        for (var x in this) { }
        for (var x in this.baz) { }
        for (var x in this.baz()) { }

        return null;
    }
}

class B extends A {
    boz() {
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }

        for (var x in super.biz) { }
        for (var x in super.biz()) { }
        return null;
    }
}

interface I {
    id: number;
    [idx: number]: number;
}
var i: I;

for (var x in i[42]) { } 


//// [for-inStatementsInvalid.js]
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
var aNumber;
for (aNumber in {}) { }
var aBoolean;
for (aBoolean in {}) { }
var aRegExp;
for (aRegExp in {}) { }
for (var idx in {}) { }
function fn() { }
for (var x in fn()) { }
var c, d, e;
for (var x in c || d) { }
for (var x in e ? c : d) { }
for (var x in 42 ? c : d) { }
for (var x in '' ? c : d) { }
for (var x in 42 ? d[x] : c[x]) { }
for (var x in c[23]) { }
for (var x in (function (x) { return x; })) { }
for (var x in function (x, y) { return x + y; }) { }
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.biz = function () {
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }
        return null;
    };
    A.baz = function () {
        for (var x in this) { }
        for (var x in this.baz) { }
        for (var x in this.baz()) { }
        return null;
    };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.boz = function () {
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }
        for (var x in _super.prototype.biz) { }
        for (var x in _super.prototype.biz.call(this)) { }
        return null;
    };
    return B;
}(A));
var i;
for (var x in i[42]) { }
