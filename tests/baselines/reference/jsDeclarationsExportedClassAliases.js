//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportedClassAliases.ts] ////

//// [errors.js]
class FancyError extends Error {
    constructor(status) {
        super(`error with status ${status}`);
    }
}

module.exports = {
    FancyError
};

//// [index.js]
// issue arises here on compilation
const errors = require("./errors");

module.exports = {
    errors
};

//// [errors.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FancyError = /** @class */ (function (_super) {
    __extends(FancyError, _super);
    function FancyError(status) {
        return _super.call(this, "error with status ".concat(status)) || this;
    }
    return FancyError;
}(Error));
module.exports = {
    FancyError: FancyError
};
//// [index.js]
// issue arises here on compilation
var errors = require("./errors");
module.exports = {
    errors: errors
};


//// [errors.d.ts]
export class FancyError extends Error {
    constructor(status: any);
}
//// [index.d.ts]
export { errors };
import errors = require("./errors");
