//// [umdDependencyComment2.ts]
///<amd-dependency path='bar'/>

import m1 = require("m2")
m1.f();


//// [umdDependencyComment2.js]
///<amd-dependency path='bar'/>
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "bar", "m2"], function (require, exports) {
    "use strict";
    var m1 = require("m2");
    m1.f();
});
