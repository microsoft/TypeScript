//// [umdDependencyCommentName2.ts]
///<amd-dependency path='bar' name='b'/>
///<amd-dependency path='foo'/>
///<amd-dependency path='goo' name='c'/>

import m1 = require("m2")
m1.f();


//// [umdDependencyCommentName2.js]
///<amd-dependency path='bar' name='b'/>
///<amd-dependency path='foo'/>
///<amd-dependency path='goo' name='c'/>
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "bar", "goo", "foo", "m2"], factory);
    }
})(function (require, exports, b, c) {
    "use strict";
    exports.__esModule = true;
    var m1 = require("m2");
    m1.f();
});
