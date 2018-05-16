"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("ansi-colors");
function emptyCompilationResult(noEmit) {
    return {
        transpileErrors: 0,
        optionsErrors: 0,
        syntaxErrors: 0,
        globalErrors: 0,
        semanticErrors: 0,
        declarationErrors: 0,
        emitErrors: 0,
        noEmit: noEmit,
        emitSkipped: false
    };
}
exports.emptyCompilationResult = emptyCompilationResult;
function defaultFinishHandler(results) {
    var hasError = false;
    var showErrorCount = function (count, type) {
        if (count === 0)
            return;
        console.log('TypeScript:', colors.magenta(count.toString()), (type !== '' ? type + ' ' : '') + (count === 1 ? 'error' : 'errors'));
        hasError = true;
    };
    showErrorCount(results.transpileErrors, '');
    showErrorCount(results.optionsErrors, 'options');
    showErrorCount(results.syntaxErrors, 'syntax');
    showErrorCount(results.globalErrors, 'global');
    showErrorCount(results.semanticErrors, 'semantic');
    showErrorCount(results.declarationErrors, 'declaration');
    showErrorCount(results.emitErrors, 'emit');
    if (!results.noEmit) {
        if (results.emitSkipped) {
            console.log('TypeScript: emit', colors.red('failed'));
        }
        else if (hasError) {
            console.log('TypeScript: emit', colors.cyan('succeeded'), '(with errors)');
        }
    }
}
function nullReporter() {
    return {};
}
exports.nullReporter = nullReporter;
function defaultReporter() {
    return {
        error: function (error) {
            console.log(error.message);
        },
        finish: defaultFinishHandler
    };
}
exports.defaultReporter = defaultReporter;
function longReporter() {
    var typescript = require('typescript');
    return {
        error: function (error) {
            if (error.tsFile) {
                console.log('[' + colors.gray('gulp-typescript') + '] ' + colors.red(error.fullFilename
                    + '(' + error.startPosition.line + ',' + error.startPosition.character + '): ')
                    + 'error TS' + error.diagnostic.code + ' ' + typescript.flattenDiagnosticMessageText(error.diagnostic.messageText, '\n'));
            }
            else {
                console.log(error.message);
            }
        },
        finish: defaultFinishHandler
    };
}
exports.longReporter = longReporter;
function fullReporter(fullFilename) {
    if (fullFilename === void 0) { fullFilename = false; }
    return {
        error: function (error, typescript) {
            console.log('[' + colors.gray('gulp-typescript') + '] '
                + colors.bgred(error.diagnostic.code + '')
                + ' ' + colors.red(typescript.flattenDiagnosticMessageText(error.diagnostic.messageText, '\n')));
            if (error.tsFile) {
                console.log('> ' + colors.gray('file: ') + (fullFilename ? error.fullFilename : error.relativeFilename) + colors.gray(':'));
                var lines_1 = error.tsFile.text.split(/(?:\r\n|\r|\n)/);
                var logLine = function (lineIndex, errorStart, errorEnd) {
                    var line = lines_1[lineIndex];
                    if (errorEnd === undefined)
                        errorEnd = line.length;
                    console.log('> ' + colors.gray('[' + lineIndex + '] ')
                        + line.substring(0, errorStart)
                        + colors.red(line.substring(errorStart, errorEnd))
                        + line.substring(errorEnd));
                };
                for (var i = error.startPosition.line; i <= error.endPosition.line; i++) {
                    logLine(i, i === error.startPosition.line ? error.startPosition.character - 1 : 0, i === error.endPosition.line ? error.endPosition.character - 1 : undefined);
                }
            }
        },
        finish: defaultFinishHandler
    };
}
exports.fullReporter = fullReporter;
