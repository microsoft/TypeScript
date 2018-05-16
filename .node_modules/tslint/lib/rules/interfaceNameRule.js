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
var utils = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var utils_1 = require("../utils");
var OPTION_ALWAYS = "always-prefix";
var OPTION_NEVER = "never-prefix";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, { never: this.ruleArguments.indexOf(OPTION_NEVER) !== -1 });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "interface-name",
        description: "Requires interface names to begin with a capital 'I'",
        rationale: "Makes it easy to differentiate interfaces from regular classes at a glance.",
        optionsDescription: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            One of the following two options must be provided:\n\n            * `\"", "\"` requires interface names to start with an \"I\"\n            * `\"", "\"` requires interface names to not have an \"I\" prefix"], ["\n            One of the following two options must be provided:\n\n            * \\`\"", "\"\\` requires interface names to start with an \"I\"\n            * \\`\"", "\"\\` requires interface names to not have an \"I\" prefix"])), OPTION_ALWAYS, OPTION_NEVER),
        options: {
            type: "string",
            enum: [OPTION_ALWAYS, OPTION_NEVER],
        },
        optionExamples: [[true, OPTION_ALWAYS], [true, OPTION_NEVER]],
        type: "style",
        typescriptOnly: true,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "interface name must start with a capitalized I";
    Rule.FAILURE_STRING_NO_PREFIX = 'interface name must not have an "I" prefix';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var never = ctx.options.never;
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (utils.isInterfaceDeclaration(node)) {
            var name = node.name;
            if (never && hasPrefixI(name.text)) {
                ctx.addFailureAtNode(name, Rule.FAILURE_STRING_NO_PREFIX);
            }
            else if (!never && name.text[0] !== "I") {
                ctx.addFailureAtNode(name, Rule.FAILURE_STRING);
            }
        }
        else {
            return ts.forEachChild(node, cb);
        }
    });
}
function hasPrefixI(name) {
    // Allow IndexedDB interfaces
    return name.length >= 2 && name[0] === "I" && utils_1.isUpperCase(name[1]) && !name.startsWith("IDB");
}
var templateObject_1;
