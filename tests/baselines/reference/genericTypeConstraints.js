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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.fooMethod = function () { };
    return Foo;
}());
var FooExtended = (function () {
    function FooExtended() {
    }
    return FooExtended;
}());
var Bar = (function () {
    function Bar() {
    }
    return Bar;
}());
var BarExtended = (function (_super) {
    __extends(BarExtended, _super);
    function BarExtended() {
        _super.call(this);
    }
    return BarExtended;
}(Bar));
