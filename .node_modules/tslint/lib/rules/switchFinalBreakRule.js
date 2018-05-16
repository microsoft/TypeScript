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
var OPTION_ALWAYS = "always";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, { always: this.ruleArguments.indexOf(OPTION_ALWAYS) !== -1 });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "switch-final-break",
        description: "Checks whether the final clause of a switch statement ends in \`break;\`.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            If no options are passed, a final 'break;' is forbidden.\n            If the \"always\" option is passed this will require a 'break;' to always be present\n            unless control flow is escaped in some other way."], ["\n            If no options are passed, a final 'break;' is forbidden.\n            If the \"always\" option is passed this will require a 'break;' to always be present\n            unless control flow is escaped in some other way."]))),
        options: {
            type: "string",
            enum: [
                OPTION_ALWAYS,
            ],
        },
        optionExamples: [true, [true, OPTION_ALWAYS]],
        type: "style",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_ALWAYS = "Final clause in 'switch' statement should end with 'break;'.";
    Rule.FAILURE_STRING_NEVER = "Final clause in 'switch' statement should not end with 'break;'.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile, always = ctx.options.always;
    ts.forEachChild(sourceFile, function cb(node) {
        if (tsutils_1.isSwitchStatement(node)) {
            check(node);
        }
        ts.forEachChild(node, cb);
    });
    function check(node) {
        var clause = last(node.caseBlock.clauses);
        if (clause === undefined) {
            return;
        }
        if (always) {
            if (!tsutils_1.endsControlFlow(clause)) {
                ctx.addFailureAtNode(clause.getChildAt(0), Rule.FAILURE_STRING_ALWAYS);
            }
            return;
        }
        if (clause.statements.length === 0) {
            return;
        }
        var block = clause.statements[0];
        var statements = clause.statements.length === 1 && tsutils_1.isBlock(block) ? block.statements : clause.statements;
        var lastStatement = last(statements);
        if (lastStatement !== undefined && tsutils_1.isBreakStatement(lastStatement)) {
            if (lastStatement.label !== undefined) {
                var parent = node.parent;
                if (!tsutils_1.isLabeledStatement(parent) || parent.label === lastStatement.label) {
                    // break jumps somewhere else, don't complain
                    return;
                }
            }
            ctx.addFailureAtNode(lastStatement, Rule.FAILURE_STRING_NEVER);
        }
    }
}
function last(arr) {
    return arr[arr.length - 1];
}
var templateObject_1;
