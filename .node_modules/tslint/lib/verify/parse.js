"use strict";
/*
 * Copyright 2016 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var semver = require("semver");
var ts = require("typescript");
var util_1 = require("util");
var utils_1 = require("../utils");
var lines_1 = require("./lines");
var lintError_1 = require("./lintError");
var scanner;
function getTypescriptVersionRequirement(text) {
    var lines = text.split(/\r?\n/);
    var firstLine = lines_1.parseLine(lines[0]);
    if (firstLine instanceof lines_1.MessageSubstitutionLine && firstLine.key === "typescript") {
        return firstLine.message;
    }
    return undefined;
}
exports.getTypescriptVersionRequirement = getTypescriptVersionRequirement;
function getNormalizedTypescriptVersion() {
    var tsVersion = new semver.SemVer(ts.version);
    // remove prerelease suffix when matching to allow testing with nightly builds
    return tsVersion.major + "." + tsVersion.minor + "." + tsVersion.patch;
}
exports.getNormalizedTypescriptVersion = getNormalizedTypescriptVersion;
function preprocessDirectives(text) {
    if (!/^#(?:if|else|endif)\b/m.test(text)) {
        return text; // If there are no directives, just return the input unchanged
    }
    var tsVersion = getNormalizedTypescriptVersion();
    var lines = text.split(/\n/);
    var result = [];
    var collecting = true;
    var state = 0 /* Initial */;
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line = lines_2[_i];
        if (line.startsWith("#if typescript")) {
            if (state !== 0 /* Initial */) {
                throw lintError_1.lintSyntaxError("#if directives cannot be nested");
            }
            state = 1 /* If */;
            collecting = semver.satisfies(tsVersion, line.slice("#if typescript".length).trim());
        }
        else if (/^#else\s*$/.test(line)) {
            if (state !== 1 /* If */) {
                throw lintError_1.lintSyntaxError("unexpected #else");
            }
            state = 2 /* Else */;
            collecting = !collecting;
        }
        else if (/^#endif\s*$/.test(line)) {
            if (state === 0 /* Initial */) {
                throw lintError_1.lintSyntaxError("unexpected #endif");
            }
            state = 0 /* Initial */;
            collecting = true;
        }
        else if (collecting) {
            result.push(line);
        }
    }
    if (state !== 0 /* Initial */) {
        throw lintError_1.lintSyntaxError("expected #endif");
    }
    return result.join("\n");
}
exports.preprocessDirectives = preprocessDirectives;
/**
 * Takes the full text of a .lint file and returns the contents of the file
 * with all error markup removed
 */
function removeErrorMarkup(text) {
    var textWithMarkup = text.split("\n");
    var lines = textWithMarkup.map(lines_1.parseLine);
    var codeText = lines.filter(function (line) { return (line instanceof lines_1.CodeLine); }).map(function (line) { return line.contents; });
    return codeText.join("\n");
}
exports.removeErrorMarkup = removeErrorMarkup;
/* tslint:disable:object-literal-sort-keys */
/**
 * Takes the full text of a .lint file and returns an array of LintErrors
 * corresponding to the error markup in the file.
 */
function parseErrorsFromMarkup(text) {
    var textWithMarkup = text.split("\n");
    var lines = textWithMarkup.map(lines_1.parseLine);
    if (lines.length > 0 && !(lines[0] instanceof lines_1.CodeLine)) {
        throw lintError_1.lintSyntaxError("text cannot start with an error mark line.");
    }
    var messageSubstitutionLines = lines.filter(function (l) { return l instanceof lines_1.MessageSubstitutionLine; });
    var messageSubstitutions = new Map();
    for (var _i = 0, messageSubstitutionLines_1 = messageSubstitutionLines; _i < messageSubstitutionLines_1.length; _i++) {
        var _a = messageSubstitutionLines_1[_i], key = _a.key, message = _a.message;
        messageSubstitutions.set(key, formatMessage(messageSubstitutions, message));
    }
    // errorLineForCodeLine[5] contains all the ErrorLine objects associated with the 5th line of code, for example
    var errorLinesForCodeLines = createCodeLineNoToErrorsMap(lines);
    var lintErrors = [];
    function addError(errorLine, errorStartPos, lineNo) {
        lintErrors.push({
            startPos: errorStartPos,
            endPos: { line: lineNo, col: errorLine.endCol },
            message: substituteMessage(messageSubstitutions, errorLine.message),
        });
    }
    // for each line of code...
    errorLinesForCodeLines.forEach(function (errorLinesForLineOfCode, lineNo) {
        // for each error marking on that line...
        while (errorLinesForLineOfCode.length > 0) {
            var errorLine = errorLinesForLineOfCode.shift();
            var errorStartPos = { line: lineNo, col: errorLine.startCol };
            // if the error starts and ends on this line, add it now to list of errors
            if (errorLine instanceof lines_1.EndErrorLine) {
                addError(errorLine, errorStartPos, lineNo);
                // if the error is the start of a multiline error
            }
            else if (errorLine instanceof lines_1.MultilineErrorLine) {
                // iterate through the MultilineErrorLines until we get to an EndErrorLine
                for (var nextLineNo = lineNo + 1;; ++nextLineNo) {
                    if (!isValidErrorMarkupContinuation(errorLinesForCodeLines, nextLineNo)) {
                        throw lintError_1.lintSyntaxError("Error mark starting at " + errorStartPos.line + ":" + errorStartPos.col + " does not end correctly.");
                    }
                    else {
                        var nextErrorLine = errorLinesForCodeLines[nextLineNo].shift();
                        // if end of multiline error, add it it list of errors
                        if (nextErrorLine instanceof lines_1.EndErrorLine) {
                            addError(nextErrorLine, errorStartPos, nextLineNo);
                            break;
                        }
                    }
                }
            }
        }
    });
    lintErrors.sort(lintError_1.errorComparator);
    return lintErrors;
}
exports.parseErrorsFromMarkup = parseErrorsFromMarkup;
/**
 * Process `message` as follows:
 * - search `substitutions` for an exact match and return the substitution
 * - try to format the message when it looks like: name % ('substitution1' [, "substitution2" [, ...]])
 * - or return it unchanged
 */
function substituteMessage(templates, message) {
    var substitution = templates.get(message);
    if (substitution !== undefined) {
        return substitution;
    }
    return formatMessage(templates, message);
}
/**
 * Tries to format the message when it has the correct format or returns it unchanged:  name % ('substitution1' [, "substitution2" [, ...]])
 * Where `name` is the name of a message substitution that is used as template.
 * If `name` is not found in `templates`, `message` is returned unchanged.
 */
function formatMessage(templates, message) {
    var formatMatch = /^([-\w]+) % \((.+)\)$/.exec(message);
    if (formatMatch !== null) {
        var template = templates.get(formatMatch[1]);
        if (template !== undefined) {
            var formatArgs = parseFormatArguments(formatMatch[2]);
            if (formatArgs !== undefined) {
                message = util_1.format.apply(void 0, [template].concat(formatArgs));
            }
        }
    }
    return message;
}
/**
 * Parse a list of comma separated string literals.
 * This function bails out if it sees something unexpected.
 * Whitespace between tokens is ignored.
 * Trailing comma is allowed.
 */
function parseFormatArguments(text) {
    if (scanner === undefined) {
        // once the scanner is created, it is cached for subsequent calls
        scanner = ts.createScanner(ts.ScriptTarget.Latest, false);
    }
    scanner.setText(text);
    var result = [];
    var expectValue = true;
    for (var token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) {
        if (token === ts.SyntaxKind.StringLiteral) {
            if (!expectValue) {
                return undefined;
            }
            result.push(scanner.getTokenValue());
            expectValue = false;
        }
        else if (token === ts.SyntaxKind.CommaToken) {
            if (expectValue) {
                return undefined;
            }
            expectValue = true;
        }
        else if (token !== ts.SyntaxKind.WhitespaceTrivia) {
            // only ignore whitespace, other trivia like comments makes this function bail out
            return undefined;
        }
    }
    return result.length === 0 ? undefined : result;
}
function createMarkupFromErrors(code, lintErrors) {
    lintErrors.sort(lintError_1.errorComparator);
    var codeText = code.split("\n");
    var errorLinesForCodeText = codeText.map(function () { return []; });
    for (var _i = 0, lintErrors_1 = lintErrors; _i < lintErrors_1.length; _i++) {
        var error = lintErrors_1[_i];
        var startPos = error.startPos, endPos = error.endPos, message = error.message;
        if (startPos.line === endPos.line) {
            // single line error
            errorLinesForCodeText[startPos.line].push(new lines_1.EndErrorLine(startPos.col, endPos.col, message));
        }
        else {
            // multiline error
            errorLinesForCodeText[startPos.line].push(new lines_1.MultilineErrorLine(startPos.col));
            for (var lineNo = startPos.line + 1; lineNo < endPos.line; ++lineNo) {
                errorLinesForCodeText[lineNo].push(new lines_1.MultilineErrorLine(0));
            }
            errorLinesForCodeText[endPos.line].push(new lines_1.EndErrorLine(0, endPos.col, message));
        }
    }
    return utils_1.flatMap(codeText, function (line, i) { return [line].concat(utils_1.mapDefined(errorLinesForCodeText[i], function (err) { return lines_1.printLine(err, line); })); }).join("\n");
}
exports.createMarkupFromErrors = createMarkupFromErrors;
/* tslint:enable:object-literal-sort-keys */
function createCodeLineNoToErrorsMap(lines) {
    var errorLinesForCodeLine = [];
    for (var _i = 0, lines_3 = lines; _i < lines_3.length; _i++) {
        var line = lines_3[_i];
        if (line instanceof lines_1.CodeLine) {
            errorLinesForCodeLine.push([]);
        }
        else if (line instanceof lines_1.ErrorLine) {
            errorLinesForCodeLine[errorLinesForCodeLine.length - 1].push(line);
        }
    }
    return errorLinesForCodeLine;
}
function isValidErrorMarkupContinuation(errorLinesForCodeLines, lineNo) {
    return lineNo < errorLinesForCodeLines.length
        && errorLinesForCodeLines[lineNo].length !== 0
        && errorLinesForCodeLines[lineNo][0].startCol === 0;
}
