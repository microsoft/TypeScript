//// [tests/cases/compiler/sourceMapWithMultipleFilesWithFileEndingWithInterface.ts] ////

//// [a.ts]
module M {
    export var X = 1;
}
interface Navigator {
    getGamepads(func?: any): any;
    webkitGetGamepads(func?: any): any
    msGetGamepads(func?: any): any;
    webkitGamepads(func?: any): any;
}

//// [b.ts]
module m1 {
    export class c1 {
    }
}


//// [fooResult.js]
var M;
(function (M) {
    M.X = 1;
})(M || (M = {}));
var m1;
(function (m1) {
    var c1 = /** @class */ (function () {
        function c1() {
        }
        return c1;
    }());
    m1.c1 = c1;
})(m1 || (m1 = {}));
//# sourceMappingURL=fooResult.js.map