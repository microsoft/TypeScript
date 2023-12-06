//// [tests/cases/compiler/checkForObjectTooStrict.ts] ////

//// [checkForObjectTooStrict.ts]
module Foo {

    export class Object {

    }

}

 

class Bar extends Foo.Object { // should work

    constructor () {

        super();

    }

}


class Baz extends Object {

    constructor () { // ERROR, as expected

        super();

    }

}


//// [checkForObjectTooStrict.js]
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
var Foo;
(function (Foo) {
    var Object = /** @class */ (function () {
        function Object() {
        }
        return Object;
    }());
    Foo.Object = Object;
})(Foo || (Foo = {}));
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super.call(this) || this;
    }
    return Bar;
}(Foo.Object));
var Baz = /** @class */ (function (_super) {
    __extends(Baz, _super);
    function Baz() {
        return _super.call(this) || this;
    }
    return Baz;
}(Object));
