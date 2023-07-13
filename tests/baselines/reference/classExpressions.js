//// [tests/cases/compiler/classExpressions.ts] ////

//// [classExpressions.ts]
interface A {}
let x = class B implements A {
    prop: number;
    onStart(): void {
    }
    func = () => {
    }
};

//// [classExpressions.js]
var x = /** @class */ (function () {
    function B() {
        this.func = function () {
        };
    }
    B.prototype.onStart = function () {
    };
    return B;
}());
