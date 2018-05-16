"use strict";
/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
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
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var curly_examples_1 = require("./code-examples/curly.examples");
var OPTION_AS_NEEDED = "as-needed";
var OPTION_IGNORE_SAME_LINE = "ignore-same-line";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.FAILURE_STRING_FACTORY = function (kind) {
        return kind + " statements must be braced";
    };
    Rule.prototype.apply = function (sourceFile) {
        if (this.ruleArguments.indexOf(OPTION_AS_NEEDED) !== -1) {
            return this.applyWithFunction(sourceFile, walkAsNeeded);
        }
        return this.applyWithWalker(new CurlyWalker(sourceFile, this.ruleName, {
            ignoreSameLine: this.ruleArguments.indexOf(OPTION_IGNORE_SAME_LINE) !== -1,
        }));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "curly",
        description: "Enforces braces for `if`/`for`/`do`/`while` statements.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            ```ts\n            if (foo === bar)\n                foo++;\n                bar++;\n            ```\n\n            In the code above, the author almost certainly meant for both `foo++` and `bar++`\n            to be executed only if `foo === bar`. However, they forgot braces and `bar++` will be executed\n            no matter what. This rule could prevent such a mistake."], ["\n            \\`\\`\\`ts\n            if (foo === bar)\n                foo++;\n                bar++;\n            \\`\\`\\`\n\n            In the code above, the author almost certainly meant for both \\`foo++\\` and \\`bar++\\`\n            to be executed only if \\`foo === bar\\`. However, they forgot braces and \\`bar++\\` will be executed\n            no matter what. This rule could prevent such a mistake."]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            One of the following options may be provided:\n\n            * `\"", "\"` forbids any unnecessary curly braces.\n            * `\"", "\"` skips checking braces for control-flow statements\n            that are on one line and start on the same line as their control-flow keyword\n        "], ["\n            One of the following options may be provided:\n\n            * \\`\"", "\"\\` forbids any unnecessary curly braces.\n            * \\`\"", "\"\\` skips checking braces for control-flow statements\n            that are on one line and start on the same line as their control-flow keyword\n        "])), OPTION_AS_NEEDED, OPTION_IGNORE_SAME_LINE),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [
                    OPTION_AS_NEEDED,
                    OPTION_IGNORE_SAME_LINE,
                ],
            },
        },
        optionExamples: [
            true,
            [true, OPTION_IGNORE_SAME_LINE],
            [true, OPTION_AS_NEEDED],
        ],
        type: "functionality",
        typescriptOnly: false,
        hasFix: true,
        codeExamples: curly_examples_1.codeExamples,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_AS_NEEDED = "Block contains only one statement; remove the curly braces.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walkAsNeeded(ctx) {
    ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isBlock(node) && isBlockUnnecessary(node)) {
            ctx.addFailureAt(node.statements.pos - 1, 1, Rule.FAILURE_STRING_AS_NEEDED);
        }
        ts.forEachChild(node, cb);
    });
}
function isBlockUnnecessary(node) {
    var parent = node.parent;
    if (node.statements.length !== 1) {
        return false;
    }
    var statement = node.statements[0];
    if (tsutils_1.isIterationStatement(parent)) {
        return true;
    }
    /*
    Watch out for this case:
    if (so) {
        if (also)
            foo();
    } else
        bar();
    */
    return tsutils_1.isIfStatement(parent) && !(tsutils_1.isIfStatement(statement)
        && statement.elseStatement === undefined
        && parent.thenStatement === node
        && parent.elseStatement !== undefined);
}
var CurlyWalker = /** @class */ (function (_super) {
    tslib_1.__extends(CurlyWalker, _super);
    function CurlyWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurlyWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (tsutils_1.isIterationStatement(node)) {
                _this.checkStatement(node.statement, node, 0, node.end);
            }
            else if (tsutils_1.isIfStatement(node)) {
                _this.checkStatement(node.thenStatement, node, 0);
                if (node.elseStatement !== undefined && node.elseStatement.kind !== ts.SyntaxKind.IfStatement) {
                    _this.checkStatement(node.elseStatement, node, 5);
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    CurlyWalker.prototype.checkStatement = function (statement, node, childIndex, end) {
        if (end === void 0) { end = statement.end; }
        var sameLine = tsutils_1.isSameLine(this.sourceFile, statement.pos, statement.end);
        if (statement.kind !== ts.SyntaxKind.Block &&
            !(this.options.ignoreSameLine && sameLine)) {
            var token = node.getChildAt(childIndex, this.sourceFile);
            var tokenText = ts.tokenToString(token.kind);
            this.addFailure(token.end - tokenText.length, end, Rule.FAILURE_STRING_FACTORY(tokenText), this.createMissingBraceFix(statement, node, sameLine));
        }
    };
    /** Generate the necessary replacement to add braces to a statement that needs them. */
    CurlyWalker.prototype.createMissingBraceFix = function (statement, node, sameLine) {
        if (sameLine) {
            return [
                Lint.Replacement.appendText(statement.pos, " {"),
                Lint.Replacement.appendText(statement.end, " }"),
            ];
        }
        else {
            var match = /\n([\t ])/.exec(node.getFullText(this.sourceFile)); // determine which character to use (tab or space)
            var indentation = match === null ?
                "" :
                // indentation should match start of statement
                match[1].repeat(ts.getLineAndCharacterOfPosition(this.sourceFile, node.getStart(this.sourceFile)).character);
            var maybeCarriageReturn = this.sourceFile.text[this.sourceFile.getLineEndOfPosition(node.pos) - 1] === "\r" ? "\r" : "";
            return [
                Lint.Replacement.appendText(statement.pos, " {"),
                Lint.Replacement.appendText(statement.end, maybeCarriageReturn + "\n" + indentation + "}"),
            ];
        }
    };
    return CurlyWalker;
}(Lint.AbstractWalker));
var templateObject_1, templateObject_2;
