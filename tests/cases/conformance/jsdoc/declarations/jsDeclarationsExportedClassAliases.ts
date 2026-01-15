// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @declaration: true
// @filename: utils/errors.js
class FancyError extends Error {
    constructor(status) {
        super(`error with status ${status}`);
    }
}

module.exports = {
    FancyError
};

// @filename: utils/index.js
// issue arises here on compilation
const errors = require("./errors");

module.exports = {
    errors
};