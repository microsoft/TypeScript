//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/implementingAnInterfaceExtendingClassWithPrivates2.ts] ////

//// [implementingAnInterfaceExtendingClassWithPrivates2.ts]
class Foo {
    private x: string;
}

interface I extends Foo {
    y: number;
}

class Bar extends Foo implements I { // ok
    y: number;
}

class Bar2 extends Foo implements I { // error
    x: string;
    y: number;
}

class Bar3 extends Foo implements I { // error
    private x: string;
    y: number;
}

// another level of indirection
module M {
    class Foo {
        private x: string;
    }

    class Baz extends Foo {
        z: number;
    }

    interface I extends Baz {
        y: number;
    }

    class Bar extends Foo implements I { // ok
        y: number;
        z: number;
    }

    class Bar2 extends Foo implements I { // error
        x: string;
        y: number;
    }

    class Bar3 extends Foo implements I { // error
        private x: string;
        y: number;
    }
}

// two levels of privates
module M2 {
    class Foo {
        private x: string;
    }

    class Baz extends Foo {
        private y: number;
    }

    interface I extends Baz {
        z: number;
    }

    class Bar extends Foo implements I { // error
        z: number;
    }

    var b: Bar;
    var r1 = b.z;
    var r2 = b.x; // error
    var r3 = b.y; // error

    class Bar2 extends Foo implements I { // error
        x: string;
        z: number;
    }

    class Bar3 extends Foo implements I { // error
        private x: string;
        z: number;
    }
}

//// [implementingAnInterfaceExtendingClassWithPrivates2.js]
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
    return Foo;
}());
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar;
}(Foo));
var Bar2 = /** @class */ (function (_super) {
    __extends(Bar2, _super);
    function Bar2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar2;
}(Foo));
var Bar3 = /** @class */ (function (_super) {
    __extends(Bar3, _super);
    function Bar3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar3;
}(Foo));
// another level of indirection
var M;
(function (M) {
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    var Baz = /** @class */ (function (_super) {
        __extends(Baz, _super);
        function Baz() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Baz;
    }(Foo));
    var Bar = /** @class */ (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bar;
    }(Foo));
    var Bar2 = /** @class */ (function (_super) {
        __extends(Bar2, _super);
        function Bar2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bar2;
    }(Foo));
    var Bar3 = /** @class */ (function (_super) {
        __extends(Bar3, _super);
        function Bar3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bar3;
    }(Foo));
})(M || (M = {}));
// two levels of privates
var M2;
(function (M2) {
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    var Baz = /** @class */ (function (_super) {
        __extends(Baz, _super);
        function Baz() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Baz;
    }(Foo));
    var Bar = /** @class */ (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bar;
    }(Foo));
    var b;
    var r1 = b.z;
    var r2 = b.x; // error
    var r3 = b.y; // error
    var Bar2 = /** @class */ (function (_super) {
        __extends(Bar2, _super);
        function Bar2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bar2;
    }(Foo));
    var Bar3 = /** @class */ (function (_super) {
        __extends(Bar3, _super);
        function Bar3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bar3;
    }(Foo));
})(M2 || (M2 = {}));
