(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "SomeOtherName"], function (require, exports) {
    "use strict";
    var SomeName_1 = require("SomeOtherName");
    use(SomeName_1.foo);
});
//# sourceMappingURL=file.js.map