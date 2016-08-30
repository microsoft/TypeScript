//// [implementedPropertyContextualTyping3.ts]
interface A {
    p: string;
    r: string;
    s: string;
}
interface B {
    p: number;
    r: boolean;
    s: string;
}
class C {
    r: number;
}
class Multiple extends C implements A, B {
    p = undefined; // ok, Multiple.p: string & number
    r = null;     // OK, r: string & boolean & number
    s = null;     // OK, s: string
}


//// [implementedPropertyContextualTyping3.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    return C;
}());
var Multiple = (function (_super) {
    __extends(Multiple, _super);
    function Multiple() {
        _super.apply(this, arguments);
        this.p = undefined; // ok, Multiple.p: string & number
        this.r = null; // OK, r: string & boolean & number
        this.s = null; // OK, s: string
    }
    return Multiple;
}(C));
