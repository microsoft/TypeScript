"use strict";
/**
 * @license
 * Copyright 2014 Palantir Technologies, Inc.
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
var tslib_1 = require("tslib");
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var OPTION_CHECK_PARAMETERS = "check-parameters";
var OPTION_IGNORE_PATTERN = "ignore-pattern";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithFunction(sourceFile, walk, parseOptions(this.ruleArguments), program);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-unused-variable",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Disallows unused imports, variables, functions and\n            private class members. Similar to tsc's --noUnusedParameters and --noUnusedLocals\n            options, but does not interrupt code compilation."], ["\n            Disallows unused imports, variables, functions and\n            private class members. Similar to tsc's --noUnusedParameters and --noUnusedLocals\n            options, but does not interrupt code compilation."]))),
        descriptionDetails: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            In addition to avoiding compilation errors, this rule may still be useful if you\n            wish to have `tslint` automatically remove unused imports, variables, functions,\n            and private class members, when using TSLint's `--fix` option."], ["\n            In addition to avoiding compilation errors, this rule may still be useful if you\n            wish to have \\`tslint\\` automatically remove unused imports, variables, functions,\n            and private class members, when using TSLint's \\`--fix\\` option."]))),
        hasFix: true,
        optionsDescription: Lint.Utils.dedent(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n            Three optional arguments may be optionally provided:\n\n            * `\"check-parameters\"` disallows unused function and constructor parameters.\n                * NOTE: this option is experimental and does not work with classes\n                that use abstract method declarations, among other things.\n            * `{\"ignore-pattern\": \"pattern\"}` where pattern is a case-sensitive regexp.\n            Variable names and imports that match the pattern will be ignored."], ["\n            Three optional arguments may be optionally provided:\n\n            * \\`\"check-parameters\"\\` disallows unused function and constructor parameters.\n                * NOTE: this option is experimental and does not work with classes\n                that use abstract method declarations, among other things.\n            * \\`{\"ignore-pattern\": \"pattern\"}\\` where pattern is a case-sensitive regexp.\n            Variable names and imports that match the pattern will be ignored."]))),
        options: {
            type: "array",
            items: {
                oneOf: [
                    {
                        type: "string",
                        enum: ["check-parameters"],
                    },
                    {
                        type: "object",
                        properties: {
                            "ignore-pattern": { type: "string" },
                        },
                        additionalProperties: false,
                    },
                ],
            },
            minLength: 0,
            maxLength: 3,
        },
        optionExamples: [true, [true, { "ignore-pattern": "^_" }]],
        rationale: Lint.Utils.dedent(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n            Variables that are declared and not used anywhere in code are likely an error due to incomplete refactoring.\n            Such variables take up space in the code, are mild performance pains, and can lead to confusion by readers.\n        "], ["\n            Variables that are declared and not used anywhere in code are likely an error due to incomplete refactoring.\n            Such variables take up space in the code, are mild performance pains, and can lead to confusion by readers.\n        "]))),
        type: "functionality",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function parseOptions(options) {
    var checkParameters = options.indexOf(OPTION_CHECK_PARAMETERS) !== -1;
    var ignorePattern;
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var o = options_1[_i];
        if (typeof o === "object") {
            // tslint:disable-next-line no-unsafe-any
            var ignore = o[OPTION_IGNORE_PATTERN];
            if (ignore != undefined) {
                ignorePattern = new RegExp(ignore);
                break;
            }
        }
    }
    return { checkParameters: checkParameters, ignorePattern: ignorePattern };
}
function walk(ctx, program) {
    var sourceFile = ctx.sourceFile, _a = ctx.options, checkParameters = _a.checkParameters, ignorePattern = _a.ignorePattern;
    var unusedCheckedProgram = getUnusedCheckedProgram(program, checkParameters);
    var diagnostics = ts.getPreEmitDiagnostics(unusedCheckedProgram, sourceFile);
    var checker = unusedCheckedProgram.getTypeChecker(); // Doesn't matter which program is used for this.
    var declaration = program.getCompilerOptions().declaration;
    // If all specifiers in an import are unused, we elide the entire import.
    var importSpecifierFailures = new Map();
    for (var _i = 0, diagnostics_1 = diagnostics; _i < diagnostics_1.length; _i++) {
        var diag = diagnostics_1[_i];
        if (diag.start === undefined) {
            continue;
        }
        var kind = getUnusedDiagnostic(diag);
        if (kind === undefined) {
            continue;
        }
        var failure = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
        if (ignorePattern !== undefined) {
            var varName = /'(.*)'/.exec(failure)[1];
            if (ignorePattern.test(varName)) {
                continue;
            }
        }
        if (kind === 0 /* VARIABLE_OR_PARAMETER */ || kind === 2 /* DECLARATION */) {
            var importNames = findImports(diag.start, sourceFile, kind);
            if (importNames.length > 0) {
                for (var _b = 0, importNames_1 = importNames; _b < importNames_1.length; _b++) {
                    var importName = importNames_1[_b];
                    if (declaration && isImportUsed(importName, sourceFile, checker)) {
                        continue;
                    }
                    if (importSpecifierFailures.has(importName)) {
                        throw new Error("Should not get 2 errors for the same import.");
                    }
                    importSpecifierFailures.set(importName, failure);
                }
                continue;
            }
        }
        ctx.addFailureAt(diag.start, diag.length, failure);
    }
    if (importSpecifierFailures.size !== 0) {
        addImportSpecifierFailures(ctx, importSpecifierFailures, sourceFile);
    }
}
/**
 * Handle import-specifier failures separately.
 * - If all of the import specifiers in an import are unused, add a combined failure for them all.
 * - Unused imports are fixable.
 */
function addImportSpecifierFailures(ctx, failures, sourceFile) {
    forEachImport(sourceFile, function (importNode) {
        if (importNode.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            tryRemoveAll(importNode.name);
            return;
        }
        if (importNode.importClause === undefined) {
            // Error node
            return;
        }
        var _a = importNode.importClause, defaultName = _a.name, namedBindings = _a.namedBindings;
        if (namedBindings !== undefined && namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
            tryRemoveAll(namedBindings.name);
            return;
        }
        var allNamedBindingsAreFailures = namedBindings === undefined || namedBindings.elements.every(function (e) { return failures.has(e.name); });
        if (namedBindings !== undefined && allNamedBindingsAreFailures) {
            for (var _i = 0, _b = namedBindings.elements; _i < _b.length; _i++) {
                var e = _b[_i];
                failures.delete(e.name);
            }
        }
        if ((defaultName === undefined || failures.has(defaultName)) && allNamedBindingsAreFailures) {
            if (defaultName !== undefined) {
                failures.delete(defaultName);
            }
            removeAll(importNode, "All imports on this line are unused.");
            return;
        }
        if (defaultName !== undefined) {
            var failure = tryDelete(defaultName);
            if (failure !== undefined) {
                var start = defaultName.getStart();
                var end = namedBindings !== undefined ? namedBindings.getStart() : importNode.moduleSpecifier.getStart();
                var fix = Lint.Replacement.deleteFromTo(start, end);
                ctx.addFailureAtNode(defaultName, failure, fix);
            }
        }
        if (namedBindings !== undefined) {
            if (allNamedBindingsAreFailures) {
                var start = defaultName !== undefined ? defaultName.getEnd() : namedBindings.getStart();
                var fix = Lint.Replacement.deleteFromTo(start, namedBindings.getEnd());
                var failure = "All named bindings are unused.";
                ctx.addFailureAtNode(namedBindings, failure, fix);
            }
            else {
                var elements = namedBindings.elements;
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var failure = tryDelete(element.name);
                    if (failure === undefined) {
                        continue;
                    }
                    var prevElement = elements[i - 1];
                    var nextElement = elements[i + 1];
                    var start = prevElement !== undefined ? prevElement.getEnd() : element.getStart();
                    var end = nextElement !== undefined && prevElement == undefined ? nextElement.getStart() : element.getEnd();
                    var fix = Lint.Replacement.deleteFromTo(start, end);
                    ctx.addFailureAtNode(element.name, failure, fix);
                }
            }
        }
        function tryRemoveAll(name) {
            var failure = tryDelete(name);
            if (failure !== undefined) {
                removeAll(name, failure);
            }
        }
        function removeAll(errorNode, failure) {
            var start = importNode.getStart();
            var end = importNode.getEnd();
            utils.forEachToken(importNode, function (token) {
                ts.forEachTrailingCommentRange(ctx.sourceFile.text, token.end, function (_, commentEnd, __) {
                    end = commentEnd;
                });
            }, ctx.sourceFile);
            if (isEntireLine(start, end)) {
                end = getNextLineStart(end);
            }
            var fix = Lint.Replacement.deleteFromTo(start, end);
            ctx.addFailureAtNode(errorNode, failure, fix);
        }
        function isEntireLine(start, end) {
            return ctx.sourceFile.getLineAndCharacterOfPosition(start).character === 0 &&
                ctx.sourceFile.getLineEndOfPosition(end) === end;
        }
        function getNextLineStart(position) {
            var nextLine = ctx.sourceFile.getLineAndCharacterOfPosition(position).line + 1;
            var lineStarts = ctx.sourceFile.getLineStarts();
            if (nextLine < lineStarts.length) {
                return lineStarts[nextLine];
            }
            else {
                return position;
            }
        }
    });
    if (failures.size !== 0) {
        throw new Error("Should have revisited all import specifier failures.");
    }
    function tryDelete(name) {
        var failure = failures.get(name);
        if (failure !== undefined) {
            failures.delete(name);
            return failure;
        }
        return undefined;
    }
}
/**
 * Ignore this import if it's used as an implicit type somewhere.
 * Workround for https://github.com/Microsoft/TypeScript/issues/9944
 */
function isImportUsed(importSpecifier, sourceFile, checker) {
    var importedSymbol = checker.getSymbolAtLocation(importSpecifier);
    if (importedSymbol === undefined) {
        return false;
    }
    var symbol = checker.getAliasedSymbol(importedSymbol);
    if (!utils.isSymbolFlagSet(symbol, ts.SymbolFlags.Type)) {
        return false;
    }
    return ts.forEachChild(sourceFile, function cb(child) {
        if (isImportLike(child)) {
            return false;
        }
        var type = getImplicitType(child, checker);
        // TODO: checker.typeEquals https://github.com/Microsoft/TypeScript/issues/13502
        if (type !== undefined && checker.typeToString(type) === checker.symbolToString(symbol)) {
            return true;
        }
        return ts.forEachChild(child, cb);
    }) === true;
}
function getImplicitType(node, checker) {
    if ((utils.isPropertyDeclaration(node) || utils.isVariableDeclaration(node)) &&
        node.type === undefined && node.name.kind === ts.SyntaxKind.Identifier ||
        utils.isBindingElement(node) && node.name.kind === ts.SyntaxKind.Identifier) {
        return checker.getTypeAtLocation(node);
    }
    else if (utils.isSignatureDeclaration(node) && node.type === undefined) {
        var sig = checker.getSignatureFromDeclaration(node);
        return sig === undefined ? undefined : sig.getReturnType();
    }
    else {
        return undefined;
    }
}
function isImportLike(node) {
    return node.kind === ts.SyntaxKind.ImportDeclaration || node.kind === ts.SyntaxKind.ImportEqualsDeclaration;
}
function forEachImport(sourceFile, f) {
    return ts.forEachChild(sourceFile, function (child) {
        if (isImportLike(child)) {
            var res = f(child);
            if (res !== undefined) {
                return res;
            }
        }
        return undefined;
    });
}
function findImports(pos, sourceFile, kind) {
    var imports = forEachImport(sourceFile, function (i) {
        if (!isInRange(i, pos)) {
            return undefined;
        }
        if (i.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
            return [i.name];
        }
        else {
            if (i.importClause === undefined) {
                // Error node
                return undefined;
            }
            var _a = i.importClause, defaultName = _a.name, namedBindings = _a.namedBindings;
            if (namedBindings !== undefined && namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
                return [namedBindings.name];
            }
            // Starting from TS2.8, when all imports in an import node are not used,
            // TS emits only 1 diagnostic object for the whole line as opposed
            // to the previous behavior of outputting a diagnostic with kind == 6192
            // (UnusedKind.VARIABLE_OR_PARAMETER) for every unused import.
            // From TS2.8, in the case of none of the imports in a line being used,
            // the single diagnostic TS outputs are different between the 1 import
            // and 2+ imports cases:
            // - 1 import in node:
            //   - diagnostic has kind == 6133 (UnusedKind.VARIABLE_OR_PARAMETER)
            //   - the text range is the whole node (`import { ... } from "..."`)
            //     whereas pre-TS2.8, the text range was for the import node. so
            //     `name.getStart()` won't equal `pos` like in pre-TS2.8
            // - 2+ imports in node:
            //   - diagnostic has kind == 6192 (UnusedKind.DECLARATION)
            //   - we know that all of these are unused
            if (kind === 2 /* DECLARATION */) {
                var imp = [];
                if (defaultName !== undefined) {
                    imp.push(defaultName);
                }
                if (namedBindings !== undefined) {
                    imp.push.apply(imp, namedBindings.elements.map(function (el) { return el.name; }));
                }
                return imp.length > 0 ? imp : undefined;
            }
            else if (defaultName !== undefined && (isInRange(defaultName, pos) || namedBindings === undefined // defaultName is the only option
            )) {
                return [defaultName];
            }
            else if (namedBindings !== undefined) {
                if (namedBindings.elements.length === 1) {
                    return [namedBindings.elements[0].name];
                }
                for (var _i = 0, _b = namedBindings.elements; _i < _b.length; _i++) {
                    var element = _b[_i];
                    if (isInRange(element, pos)) {
                        return [element.name];
                    }
                }
            }
        }
        return undefined;
    });
    return imports !== undefined ? imports : [];
}
function isInRange(range, pos) {
    return range.pos <= pos && range.end >= pos;
}
function getUnusedDiagnostic(diag) {
    // https://github.com/Microsoft/TypeScript/blob/master/src/compiler/diagnosticMessages.json
    switch (diag.code) {
        case 6133: // Pre TS 2.9 "'{0}' is declared but never used.
        // TS 2.9+ "'{0}' is declared but its value is never read."
        case 6196: // TS 2.9+ "'{0}' is declared but never used."
            return 0 /* VARIABLE_OR_PARAMETER */;
        case 6138:
            return 1 /* PROPERTY */; // "Property '{0}' is declared but never used."
        case 6192:
            return 2 /* DECLARATION */; // "All imports in import declaration are unused."
        default:
            return undefined;
    }
}
var programToUnusedCheckedProgram = new WeakMap();
function getUnusedCheckedProgram(program, checkParameters) {
    // Assuming checkParameters will always have the same value, so only lookup by program.
    var checkedProgram = programToUnusedCheckedProgram.get(program);
    if (checkedProgram !== undefined) {
        return checkedProgram;
    }
    checkedProgram = makeUnusedCheckedProgram(program, checkParameters);
    programToUnusedCheckedProgram.set(program, checkedProgram);
    return checkedProgram;
}
function makeUnusedCheckedProgram(program, checkParameters) {
    var originalOptions = program.getCompilerOptions();
    var options = tslib_1.__assign({}, originalOptions, { noEmit: true, noUnusedLocals: true, noUnusedParameters: originalOptions.noUnusedParameters || checkParameters });
    var sourceFilesByName = new Map(program.getSourceFiles().map(function (s) { return [getCanonicalFileName(s.fileName), s]; }));
    // tslint:disable object-literal-sort-keys
    return ts.createProgram(Array.from(sourceFilesByName.keys()), options, {
        fileExists: function (f) { return sourceFilesByName.has(getCanonicalFileName(f)); },
        readFile: function (f) { return sourceFilesByName.get(getCanonicalFileName(f)).text; },
        getSourceFile: function (f) { return sourceFilesByName.get(getCanonicalFileName(f)); },
        getDefaultLibFileName: function () { return ts.getDefaultLibFileName(options); },
        writeFile: function () { return undefined; },
        getCurrentDirectory: function () { return ""; },
        getDirectories: function () { return []; },
        getCanonicalFileName: getCanonicalFileName,
        useCaseSensitiveFileNames: function () { return ts.sys.useCaseSensitiveFileNames; },
        getNewLine: function () { return "\n"; },
    });
    // tslint:enable object-literal-sort-keys
    // We need to be careful with file system case sensitivity
    function getCanonicalFileName(fileName) {
        return ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
    }
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
