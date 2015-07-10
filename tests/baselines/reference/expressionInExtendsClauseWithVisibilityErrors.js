//// [expressionInExtendsClauseWithVisibilityErrors.ts]

interface I {
}

class C<T, U> {
    x: T;
    y: U;
}

function getClass(a) {
    return C;
}

// Error C is not exported
// Error I is not exported
export class MyClass extends getClass(2) <string, I> {
}



//// [expressionInExtendsClauseWithVisibilityErrors.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    return C;
})();
function getClass(a) {
    return C;
}
// Error C is not exported
// Error I is not exported
var MyClass = (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        _super.apply(this, arguments);
    }
    return MyClass;
})(getClass(2));
exports.MyClass = MyClass;
