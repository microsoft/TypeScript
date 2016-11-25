//// [parser509630.ts]
class Type {
    public examples = [ // typing here
}
class Any extends Type {
}


//// [parser509630.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Type = (function () {
    function Type() {
        this.examples = []; // typing here
    }
    return Type;
}());
var Any = (function (_super) {
    __extends(Any, _super);
    function Any() {
        return _super.apply(this, arguments) || this;
    }
    return Any;
}(Type));
