//// [collisionSuperAndNameResolution.ts]
var console: {
    log(message: any);
}
var _super = 10; // No error
class base {
}
class Foo extends base {
    x() {
        console.log(_super); // Error as this doesnt not resolve to user defined _super
    }
}

//// [collisionSuperAndNameResolution.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var console;
var _super = 10; // No error
var base = (function () {
    function base() {
    }
    return base;
}());
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super.apply(this, arguments) || this;
    }
    Foo.prototype.x = function () {
        console.log(_super); // Error as this doesnt not resolve to user defined _super
    };
    return Foo;
}(base));
