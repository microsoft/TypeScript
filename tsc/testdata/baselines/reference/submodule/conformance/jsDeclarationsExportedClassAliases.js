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


//// [errors.d.ts]
declare class FancyError extends Error {
    constructor(status: any);
}
declare const _default: {
    FancyError: typeof FancyError;
};
export = _default;
//// [index.d.ts]
declare const _default: {
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
export = _default;
