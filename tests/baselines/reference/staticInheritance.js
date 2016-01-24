//// [staticInheritance.ts]
function doThing(x: { n: string }) { }
class A {
    static n: string;
    p = doThing(A); // OK
}
class B extends A {
    p1 = doThing(A); // OK
    p2 = doThing(B); // OK
}
doThing(B); //OK


//// [staticInheritance.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function doThing(x) { }
var A = (function () {
    function A() {
        this.p = doThing(A); // OK
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
        this.p1 = doThing(A); // OK
        this.p2 = doThing(B); // OK
    }
    return B;
}(A));
doThing(B); //OK
