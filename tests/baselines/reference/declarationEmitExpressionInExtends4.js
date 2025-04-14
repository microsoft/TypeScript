//// [tests/cases/compiler/declarationEmitExpressionInExtends4.ts] ////

//// [declarationEmitExpressionInExtends4.ts]
function getSomething() {
    return class D { }
}

class C extends getSomething()<number, string> {

}

class C2 extends SomeUndefinedFunction()<number, string> {

}


class C3 extends SomeUndefinedFunction {

}

//// [declarationEmitExpressionInExtends4.js]
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
function getSomething() {
    return /** @class */ (function () {
        function D() {
        }
        return D;
    }());
}
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(getSomething()));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(SomeUndefinedFunction()));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C3;
}(SomeUndefinedFunction));


//// [declarationEmitExpressionInExtends4.d.ts]
declare function getSomething(): {
    new (): {};
};
declare const C_base: {
    new (): {};
};
declare class C extends C_base<number, string> {
}
declare const C2_base: any;
declare class C2 extends C2_base<number, string> {
}
declare class C3 extends SomeUndefinedFunction {
}
