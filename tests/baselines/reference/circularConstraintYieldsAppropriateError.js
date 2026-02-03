//// [tests/cases/compiler/circularConstraintYieldsAppropriateError.ts] ////

//// [circularConstraintYieldsAppropriateError.ts]
// https://github.com/Microsoft/TypeScript/issues/16861
class BaseType<T> {
    bar: T
}

class NextType<C extends { someProp: any }, T = C['someProp']> extends BaseType<T> {
    baz: string;
}

class Foo extends NextType<Foo> {
    someProp: {
        test: true
    }
}

const foo = new Foo();
foo.bar.test

//// [circularConstraintYieldsAppropriateError.js]
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
// https://github.com/Microsoft/TypeScript/issues/16861
var BaseType = /** @class */ (function () {
    function BaseType() {
    }
    return BaseType;
}());
var NextType = /** @class */ (function (_super) {
    __extends(NextType, _super);
    function NextType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NextType;
}(BaseType));
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Foo;
}(NextType));
var foo = new Foo();
foo.bar.test;
