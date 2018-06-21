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
 * @param {{ cwd?: string, pretty?: boolean }} [options]
 */
function formatDiagnostics(diagnostics, options) {
    return options && options.pretty 
        ? ts.formatDiagnosticsWithColorAndContext(diagnostics, getFormatDiagnosticsHost(options && options.cwd)) 
        : ts.formatDiagnostics(diagnostics, getFormatDiagnosticsHost(options && options.cwd));
}
exports.formatDiagnostics = formatDiagnostics;

/** 
 * @param {Diagnostic[]} diagnostics 
 * @param {{ cwd?: string }} [options]
 */
function reportDiagnostics(diagnostics, options) {
    log(formatDiagnostics(diagnostics, { cwd: options && options.cwd, pretty: process.stdout.isTTY }));
}
exports.reportDiagnostics = reportDiagnostics;

/**
 * @param {string | undefined} cwd 
 * @returns {FormatDiagnosticsHost}
 */
function getFormatDiagnosticsHost(cwd) {
    if (!cwd || cwd === process.cwd()) return formatDiagnosticsHost;
    return {
        getCanonicalFileName: formatDiagnosticsHost.getCanonicalFileName,
        getCurrentDirectory: () => cwd,
        getNewLine: formatDiagnosticsHost.getNewLine
    };
}

/**
 * @typedef {import("../../lib/typescript").FormatDiagnosticsHost} FormatDiagnosticsHost
 * @typedef {import("../../lib/typescript").Diagnostic} Diagnostic
 */
void 0;