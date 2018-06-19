// @ts-check
const ts = require("../../lib/typescript");
const log = require("fancy-log"); // was `require("gulp-util").log (see https://github.com/gulpjs/gulp-util)

/** @type {FormatDiagnosticsHost} */
const formatDiagnosticsHost = exports.formatDiagnosticsHost = {
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => process.cwd(),
    getNewLine: () => ts.sys.newLine
};

/**
 * @param {Diagnostic[]} diagnostics
 * @param {boolean} [pretty]
 */
function formatDiagnostics(diagnostics, pretty) {
    return pretty ? ts.formatDiagnosticsWithColorAndContext(diagnostics, formatDiagnosticsHost) :
        ts.formatDiagnostics(diagnostics, formatDiagnosticsHost);
}
exports.formatDiagnostics = formatDiagnostics;

/** @param {Diagnostic[]} diagnostics */
function reportDiagnostics(diagnostics) {
    log(formatDiagnostics(diagnostics, process.stdout.isTTY));
}
exports.reportDiagnostics = reportDiagnostics;

/**
 * @typedef {import("../../lib/typescript").FormatDiagnosticsHost} FormatDiagnosticsHost
 * @typedef {import("../../lib/typescript").Diagnostic} Diagnostic
 */
void 0;