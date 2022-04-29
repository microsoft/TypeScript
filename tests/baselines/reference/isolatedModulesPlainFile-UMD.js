//// [isolatedModulesPlainFile-UMD.ts]
declare function run(a: number): void;
run(1);


//// [isolatedModulesPlainFile-UMD.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    run(1);
});
