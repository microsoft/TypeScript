//// [classExtendingBuiltinType.ts]
class C1 extends Object { }
class C2 extends Function { }
class C3 extends String { }
class C4 extends Boolean { }
class C5 extends Number { }
class C6 extends Date { }
class C7 extends RegExp { }
class C8 extends Error { }
class C9 extends Array { }
class C10 extends Array<number> { }


//// [classExtendingBuiltinType.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C1 = (function (_super) {
    __extends(C1, _super);
    function C1() {
        _super.apply(this, arguments);
    }
    return C1;
}(Object));
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
}(Function));
var C3 = (function (_super) {
    __extends(C3, _super);
    function C3() {
        _super.apply(this, arguments);
    }
    return C3;
}(String));
var C4 = (function (_super) {
    __extends(C4, _super);
    function C4() {
        _super.apply(this, arguments);
    }
    return C4;
}(Boolean));
var C5 = (function (_super) {
    __extends(C5, _super);
    function C5() {
        _super.apply(this, arguments);
    }
    return C5;
}(Number));
var C6 = (function (_super) {
    __extends(C6, _super);
    function C6() {
        _super.apply(this, arguments);
    }
    return C6;
}(Date));
var C7 = (function (_super) {
    __extends(C7, _super);
    function C7() {
        _super.apply(this, arguments);
    }
    return C7;
}(RegExp));
var C8 = (function (_super) {
    __extends(C8, _super);
    function C8() {
        _super.apply(this, arguments);
    }
    return C8;
}(Error));
var C9 = (function (_super) {
    __extends(C9, _super);
    function C9() {
        _super.apply(this, arguments);
    }
    return C9;
}(Array));
var C10 = (function (_super) {
    __extends(C10, _super);
    function C10() {
        _super.apply(this, arguments);
    }
    return C10;
}(Array));
