//// [extendBaseClassBeforeItsDeclared.ts]
class derived extends base { }
 
class base { constructor (public n: number) { } }

//// [extendBaseClassBeforeItsDeclared.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var derived = (function (_super) {
    __extends(derived, _super);
    function derived() {
        return _super.apply(this, arguments) || this;
    }
    return derived;
}(base));
var base = (function () {
    function base(n) {
        this.n = n;
    }
    return base;
}());
