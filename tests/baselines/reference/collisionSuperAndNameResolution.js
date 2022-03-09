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
var console;
var _super = 10; // No error
var base = /** @class */ (function () {
    function base() {
    }
    return base;
}());
var Foo = /** @class */ (function (_super_1) {
    __extends(Foo, _super_1);
    function Foo() {
        return _super_1 !== null && _super_1.apply(this, arguments) || this;
    }
    Foo.prototype.x = function () {
        console.log(_super); // Error as this doesnt not resolve to user defined _super
    };
    return Foo;
}(base));
