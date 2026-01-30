//// [tests/cases/compiler/jsdocParameterParsingInvalidName.ts] ////

//// [jsdocParameterParsingInvalidName.ts]
class c {
    /**
     * @param {string} [`foo]
     */
    method(foo) {
    }
}

//// [jsdocParameterParsingInvalidName.js]
"use strict";
var c = /** @class */ (function () {
    function c() {
    }
    /**
     * @param {string} [`foo]
     */
    c.prototype.method = function (foo) {
    };
    return c;
}());
