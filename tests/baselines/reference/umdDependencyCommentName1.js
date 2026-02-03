//// [tests/cases/compiler/umdDependencyCommentName1.ts] ////

//// [umdDependencyCommentName1.ts]
///<amd-dependency path='bar' name='b'/>

import m1 = require("m2")
m1.f();


//// [umdDependencyCommentName1.js]
///<amd-dependency path='bar' name='b'/>
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "bar", "m2"], factory);
    }
})(function (require, exports, b) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var m1 = require("m2");
    m1.f();
});
