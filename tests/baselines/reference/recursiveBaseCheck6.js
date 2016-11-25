//// [recursiveBaseCheck6.ts]
class S18<A> extends S18<{ S19: A; }>{ }
(new S18()).blah;

//// [recursiveBaseCheck6.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var S18 = (function (_super) {
    __extends(S18, _super);
    function S18() {
        return _super.apply(this, arguments) || this;
    }
    return S18;
}(S18));
(new S18()).blah;
