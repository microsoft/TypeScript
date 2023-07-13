//// [tests/cases/conformance/classes/classDeclarations/classDeclarationLoop.ts] ////

//// [classDeclarationLoop.ts]
const arr = [];
for (let i = 0; i < 10; ++i) {
    class C {
        prop = i;
    }
    arr.push(C);
}


//// [classDeclarationLoop.js]
var arr = [];
var _loop_1 = function (i) {
    var C = /** @class */ (function () {
        function C() {
            this.prop = i;
        }
        return C;
    }());
    arr.push(C);
};
for (var i = 0; i < 10; ++i) {
    _loop_1(i);
}
