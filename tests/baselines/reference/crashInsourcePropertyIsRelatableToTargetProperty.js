//// [crashInsourcePropertyIsRelatableToTargetProperty.ts]
class C {
    private x = 1;
}
class D extends C { }
function foo(x: "hi", items: string[]): typeof foo;
function foo(x: string, items: string[]): typeof foo {
    return null;
}
var a: D = foo("hi", []);


//// [crashInsourcePropertyIsRelatableToTargetProperty.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
        this.x = 1;
    }
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
}(C));
function foo(x, items) {
    return null;
}
var a = foo("hi", []);
