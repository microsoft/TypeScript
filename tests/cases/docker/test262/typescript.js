const ts = require("typescript");

module.exports = function(code) {
    return ts.transpile(code);
}
