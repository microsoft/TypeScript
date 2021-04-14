//// [genericTypeConstraints.ts]
class Foo {
    fooMethod() {}
}

class FooExtended { }

class Bar<T extends Foo> { }

class BarExtended extends Bar<FooExtended> {
    constructor() {
        super();
    }
}

//// [genericTypeConstraints.js]
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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.fooMethod = function () { };
    return Foo;
}());
var FooExtended = /** @class */ (function () {
    function FooExtended() {
    }
    return FooExtended;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
var BarExtended = /** @class */ (function (_super) {
    __extends(BarExtended, _super);
    function BarExtended() {
        return _super.call(this) || this;
    }
    return BarExtended;
}(Bar));
