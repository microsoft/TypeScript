//// [declFileClassExtendsNull.ts]

class ExtendsNull extends null {
}

//// [declFileClassExtendsNull.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExtendsNull = (function (_super) {
    __extends(ExtendsNull, _super);
    function ExtendsNull() {
        return _super.apply(this, arguments) || this;
    }
    return ExtendsNull;
}(null));


//// [declFileClassExtendsNull.d.ts]
declare class ExtendsNull extends null {
}
