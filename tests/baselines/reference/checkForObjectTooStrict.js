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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Foo;
(function (Foo) {
    var Object = (function () {
        function Object() {
        }
        return Object;
    })();
    Foo.Object = Object;
})(Foo || (Foo = {}));
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.call(this);
    }
    return Bar;
})(Foo.Object);
var Baz = (function (_super) {
    __extends(Baz, _super);
    function Baz() {
        _super.call(this);
    }
    return Baz;
})(Object);
