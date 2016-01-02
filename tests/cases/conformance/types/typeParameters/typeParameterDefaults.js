var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Still an error
var a1;
// Still an error
var a2;
// OK
var a3;
// a3.x: number
a3.x = 10;
// Still an error
var a4;
// Same as <string, number>
var a5;
// a5.x1: string
a5.x1 = '';
// a5.x2: number
a5.x2 = 42;
var a6;
// a6.x1: boolean, a6.x2: boolean
a6.x1 = true;
a6.x2 = false;
/** Defaults on classes */
var ClassDefault1 = (function () {
    function ClassDefault1() {
    }
    return ClassDefault1;
}());
var c1 = new ClassDefault1();
// c1.x: number
c1.x = 10;
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        _super.apply(this, arguments);
    }
    return Derived1;
}(ClassDefault1));
var d1 = new Derived1();
// d1.x: number
d1.x = 10;
/** Make sure this doesn't crash */
// interface NoForwardRefs2<T = U, U = T> { }
