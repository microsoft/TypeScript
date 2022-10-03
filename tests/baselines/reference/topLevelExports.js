//// [topLevelExports.ts]
export var foo = 3;

function log(n:number) { return n;}

void log(foo).toString();

//// [topLevelExports.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    exports.foo = 3;
    function log(n) { return n; }
    void log(exports.foo).toString();
});
