//// [expressionInExtendsClause.ts]

export class C<T, U> {
    x: T;
    y: U;
}

// Not exported, but not important in declaration generation
function getClass(a) {
    return C;
}

export class MyClass extends getClass(2) <string, number> {
}



//// [expressionInExtendsClause.js]
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
exports.C = C;
// Not exported, but not important in declaration generation
function getClass(a) {
    return C;
}
var MyClass = (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        _super.apply(this, arguments);
    }
    return MyClass;
})(getClass(2));
exports.MyClass = MyClass;


//// [expressionInExtendsClause.d.ts]
export declare class C<T, U> {
    x: T;
    y: U;
}
export declare class MyClass extends C<string, number> {
}
