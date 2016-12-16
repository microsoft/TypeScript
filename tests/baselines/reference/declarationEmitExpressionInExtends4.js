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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function getSomething() {
    return (function () {
        function D() {
        }
        return D;
    }());
}
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super.apply(this, arguments) || this;
    }
    return C;
}(getSomething()));
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super.apply(this, arguments) || this;
    }
    return C2;
}(SomeUndefinedFunction()));
var C3 = (function (_super) {
    __extends(C3, _super);
    function C3() {
        return _super.apply(this, arguments) || this;
    }
    return C3;
}(SomeUndefinedFunction));
