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
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "forin",
        description: "Requires a `for ... in` statement to be filtered with an `if` statement.",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            ```ts\n            for (let key in someObject) {\n                if (someObject.hasOwnProperty(key)) {\n                    // code here\n                }\n            }\n            ```\n            Prevents accidental iteration over properties inherited from an object's prototype.\n            See [MDN's `for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)\n            documentation for more information about `for...in` loops.\n\n            Also consider using a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)\n            or [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)\n            if you're storing collections of objects.\n            Using `Object`s can cause occasional edge case bugs, such as if a key is named \"hasOwnProperty\".\n        "], ["\n            \\`\\`\\`ts\n            for (let key in someObject) {\n                if (someObject.hasOwnProperty(key)) {\n                    // code here\n                }\n            }\n            \\`\\`\\`\n            Prevents accidental iteration over properties inherited from an object's prototype.\n            See [MDN's \\`for...in\\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)\n            documentation for more information about \\`for...in\\` loops.\n\n            Also consider using a [\\`Map\\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)\n            or [\\`Set\\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)\n            if you're storing collections of objects.\n            Using \\`Object\\`s can cause occasional edge case bugs, such as if a key is named \"hasOwnProperty\".\n        "]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "for (... in ...) statements must be filtered with an if statement";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isForInStatement(node) && tsutils_1.isBlock(node.statement) && !isFiltered(node.statement)) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
function isFiltered(_a) {
    var statements = _a.statements;
    switch (statements.length) {
        case 0: return true;
        case 1: return statements[0].kind === ts.SyntaxKind.IfStatement;
        default:
            return statements[0].kind === ts.SyntaxKind.IfStatement && nodeIsContinue(statements[0].thenStatement);
    }
}
function nodeIsContinue(node) {
    return node.kind === ts.SyntaxKind.ContinueStatement ||
        tsutils_1.isBlock(node) && node.statements.length === 1 && node.statements[0].kind === ts.SyntaxKind.ContinueStatement;
}
var templateObject_1;
