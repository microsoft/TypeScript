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
"use strict";
class FancyError extends Error {
    constructor(status) {
        super(`error with status ${status}`);
    }
}
module.exports = {
    FancyError
};
//// [index.js]
"use strict";
// issue arises here on compilation
const errors = require("./errors");
module.exports = {
    errors
};


//// [errors.d.ts]
declare const _exports: {
    FancyError: typeof FancyError;
};
export = _exports;
declare class FancyError extends Error {
    constructor(status: any);
}
//// [index.d.ts]
declare const _exports: {
    errors: {
        FancyError: {
            new (status: any): {
                name: string;
                message: string;
                stack?: string;
            };
        };
    };
};
export = _exports;
