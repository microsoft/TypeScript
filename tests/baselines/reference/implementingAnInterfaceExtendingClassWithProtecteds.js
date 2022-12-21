//// [implementingAnInterfaceExtendingClassWithProtecteds.ts]
class Foo {
    protected x: string;
}

interface I extends Foo {
    y: number;
}

class Bar implements I { // error
}

class Bar2 implements I { // error
    y: number;
}

class Bar3 implements I { // error
    x: string;
    y: number;
}

class Bar4 implements I { // error
    protected x: string;
    y: number;
}

class Bar5 extends Foo implements I { // error
}

class Bar6 extends Foo implements I { // error
    protected y: number;
}

class Bar7 extends Foo implements I {
    y: number;
}

class Bar8 extends Foo implements I {
    x: string;
    y: number;
}


//// [implementingAnInterfaceExtendingClassWithProtecteds.js]
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
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
var Bar2 = /** @class */ (function () {
    function Bar2() {
    }
    return Bar2;
}());
var Bar3 = /** @class */ (function () {
    function Bar3() {
    }
    return Bar3;
}());
var Bar4 = /** @class */ (function () {
    function Bar4() {
    }
    return Bar4;
}());
var Bar5 = /** @class */ (function (_super) {
    __extends(Bar5, _super);
    function Bar5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar5;
}(Foo));
var Bar6 = /** @class */ (function (_super) {
    __extends(Bar6, _super);
    function Bar6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar6;
}(Foo));
var Bar7 = /** @class */ (function (_super) {
    __extends(Bar7, _super);
    function Bar7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar7;
}(Foo));
var Bar8 = /** @class */ (function (_super) {
    __extends(Bar8, _super);
    function Bar8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar8;
}(Foo));
