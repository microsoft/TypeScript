//// [tests/cases/compiler/classOverloadForFunction2.ts] ////

//// [classOverloadForFunction2.ts]
function bar(): string;
class bar {}

//// [classOverloadForFunction2.js]
var bar = /** @class */ (function () {
    function bar() {
    }
    return bar;
}());
