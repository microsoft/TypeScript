// @ts-check
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)
module.exports = getDiffTool;

function getDiffTool() {
    const program = process.env.DIFF;
    if (!program) {
        log.warn("Add the 'DIFF' environment variable to the path of the program you want to use.");
        process.exit(1);
    }
    return program;
}