"use strict";
/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
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
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        var promiseTypes = new Set(["Promise"].concat(this.ruleArguments));
        return this.applyWithFunction(sourceFile, walk, promiseTypes, program.getTypeChecker());
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "await-promise",
        description: "Warns for an awaited value that is not a Promise.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            A list of 'string' names of any additional classes that should also be treated as Promises.\n            For example, if you are using a class called 'Future' that implements the Thenable interface,\n            you might tell the rule to consider type references with the name 'Future' as valid Promise-like\n            types. Note that this rule doesn't check for type assignability or compatibility; it just checks\n            type reference names.\n        "], ["\n            A list of 'string' names of any additional classes that should also be treated as Promises.\n            For example, if you are using a class called 'Future' that implements the Thenable interface,\n            you might tell the rule to consider type references with the name 'Future' as valid Promise-like\n            types. Note that this rule doesn't check for type assignability or compatibility; it just checks\n            type reference names.\n        "]))),
        options: {
            type: "list",
            listType: {
                type: "array",
                items: { type: "string" },
            },
        },
        optionExamples: [true, [true, "Thenable"]],
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            While it is valid JavaScript to await a non-Promise-like value (it will resolve immediately),\n            this pattern is often a programmer error and the resulting semantics can be unintuitive.\n\n            Awaiting non-Promise-like values often is an indication of programmer error, such as\n            forgetting to add parenthesis to call a function that returns a Promise.\n        "], ["\n            While it is valid JavaScript to await a non-Promise-like value (it will resolve immediately),\n            this pattern is often a programmer error and the resulting semantics can be unintuitive.\n\n            Awaiting non-Promise-like values often is an indication of programmer error, such as\n            forgetting to add parenthesis to call a function that returns a Promise.\n        "]))),
        type: "functionality",
        typescriptOnly: true,
        requiresTypeInfo: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "Invalid 'await' of a non-Promise value.";
    Rule.FAILURE_FOR_AWAIT_OF = "Invalid 'for-await-of' of a non-AsyncIterable value.";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
function walk(ctx, tc) {
    var promiseTypes = ctx.options;
    return ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        if (tsutils_1.isAwaitExpression(node) && !containsType(tc.getTypeAtLocation(node.expression), isPromiseType)) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        else if (tsutils_1.isForOfStatement(node) && node.awaitModifier !== undefined &&
            !containsType(tc.getTypeAtLocation(node.expression), isAsyncIterable)) {
            ctx.addFailureAtNode(node.expression, Rule.FAILURE_FOR_AWAIT_OF);
        }
        return ts.forEachChild(node, cb);
    }
    function isPromiseType(name) {
        return promiseTypes.has(name);
    }
}
function containsType(type, predicate) {
    if (tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Any)) {
        return true;
    }
    if (tsutils_1.isTypeReference(type)) {
        type = type.target;
    }
    if (type.symbol !== undefined && predicate(type.symbol.name)) {
        return true;
    }
    if (tsutils_1.isUnionOrIntersectionType(type)) {
        return type.types.some(function (t) { return containsType(t, predicate); });
    }
    var bases = type.getBaseTypes();
    return bases !== undefined && bases.some(function (t) { return containsType(t, predicate); });
}
function isAsyncIterable(name) {
    return name === "AsyncIterable" || name === "AsyncIterableIterator";
}
var templateObject_1, templateObject_2;
