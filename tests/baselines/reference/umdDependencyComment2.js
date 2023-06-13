//// [tests/cases/compiler/umdDependencyComment2.ts] ////

//// [umdDependencyComment2.ts]
///<amd-dependency path='bar'/>

import m1 = require("m2")
m1.f();


//// [umdDependencyComment2.js]
///<amd-dependency path='bar'/>
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "bar", "m2"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var m1 = require("m2");
    m1.f();
});
