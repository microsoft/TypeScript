//// [classExpressionExtendingAbstractClass.ts]
abstract class A {
    abstract foo(): void;
}

var C = class extends A {     // no error reported!
};



//// [classExpressionExtendingAbstractClass.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
}());
var C = (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        _super.apply(this, arguments);
    }
    return class_1;
}(A));
