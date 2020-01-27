const ts = require("typescript");

module.exports = function(code) {
    try {
        return ts.transpile(code);
    }
    catch (err) {
        err.message = `Message: ${err.message}
Code:
${code}
`;
        throw err;
    }
}
