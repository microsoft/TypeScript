//// [tests/cases/compiler/constInClassExpression.ts] ////

//// [constInClassExpression.ts]
let C = class {
    const a = 4;
};


//// [constInClassExpression.js]
var C = /** @class */ (function () {
    function class_1() {
        this.a = 4;
    }
    return class_1;
}());
