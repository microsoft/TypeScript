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
export class FancyError extends Error {
    constructor(status: any);
}
//// [index.d.ts]
export { errors };
import errors = require("./errors");
