//// [tests/cases/conformance/es2018/dynamicImport/importCallExpressionInUMD2.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

//// [2.ts]
// We use Promise<any> for now as there is no way to specify shape of module object
function foo(x: Promise<any>) {
    x.then(value => {
        let b = new value.B();
        b.print();
    })
}

foo(import("./0"));

//// [0.js]
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
    Object.defineProperty(exports, "__esModule", { value: true });
    class B {
        print() { return "I am B"; }
    }
    exports.B = B;
});
//// [2.js]
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
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    var __resolved = new Promise(function (resolve) { resolve(); });
    // We use Promise<any> for now as there is no way to specify shape of module object
    function foo(x) {
        x.then(value => {
            let b = new value.B();
            b.print();
        });
    }
    foo(__syncRequire ? __resolved.then(function () { return require("./0"); }) : new Promise(function (_a, _b) { require(["./0"], _a, _b); }));
});
