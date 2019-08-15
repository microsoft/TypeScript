//// [jsdocParameterParsingInvalidName.ts]
class c {
    /**
     * @param {string} [`foo]
     */
    method(foo) {
    }
}

//// [jsdocParameterParsingInvalidName.js]
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
