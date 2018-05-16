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
var utils = require("tsutils");
var Lint = require("../index");
var OPTION_IGNORE_MODULE = "ignore-module";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var patternConfig = this.ruleArguments[this.ruleArguments.length - 1];
        var ignorePattern = patternConfig === undefined ? undefined : new RegExp(patternConfig[OPTION_IGNORE_MODULE]);
        return this.applyWithFunction(sourceFile, walk, ignorePattern);
    };
    Rule.metadata = {
        description: "Avoid import statements with side-effect.",
        optionExamples: [true, [true, (_a = {}, _a[OPTION_IGNORE_MODULE] = "(\\.html|\\.css)$", _a)]],
        options: {
            items: {
                properties: {
                    "ignore-module": {
                        type: "string",
                    },
                },
                type: "object",
            },
            maxLength: 1,
            minLength: 0,
            type: "array",
        },
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            One argument may be optionally provided:\n\n            * `", "` allows to specify a regex and ignore modules which it matches."], ["\n            One argument may be optionally provided:\n\n            * \\`", "\\` allows to specify a regex and ignore modules which it matches."])), OPTION_IGNORE_MODULE),
        rationale: "Imports with side effects may have behavior which is hard for static verification.",
        ruleName: "no-import-side-effect",
        type: "typescript",
        typescriptOnly: false,
    };
    Rule.FAILURE_STRING = "import with explicit side-effect";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var ignorePattern = ctx.options, sourceFile = ctx.sourceFile;
    for (var _i = 0, _a = sourceFile.statements; _i < _a.length; _i++) {
        var statement = _a[_i];
        if (!utils.isImportDeclaration(statement)) {
            continue;
        }
        var importClause = statement.importClause, moduleSpecifier = statement.moduleSpecifier;
        if (importClause !== undefined || !utils.isStringLiteral(moduleSpecifier)) {
            continue;
        }
        if (ignorePattern === undefined || !ignorePattern.test(moduleSpecifier.text)) {
            ctx.addFailureAtNode(statement, Rule.FAILURE_STRING);
        }
    }
}
var templateObject_1;
var _a;
