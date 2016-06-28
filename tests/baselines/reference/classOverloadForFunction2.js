//// [classOverloadForFunction2.ts]
function bar(): string;
class bar {}

//// [classOverloadForFunction2.js]
var bar = (function () {
    function bar() {
    }
    return bar;
}());
