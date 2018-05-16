"use strict";
/**
 * @license
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
var tslib_1 = require("tslib");
var tsutils_1 = require("tsutils");
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.ruleArguments.length > 0;
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "import-blacklist",
        description: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Disallows importing the specified modules directly via `import` and `require`.\n            Instead only sub modules may be imported from that module."], ["\n            Disallows importing the specified modules directly via \\`import\\` and \\`require\\`.\n            Instead only sub modules may be imported from that module."]))),
        rationale: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Some libraries allow importing their submodules instead of the entire module.\n            This is good practise as it avoids loading unused modules."], ["\n            Some libraries allow importing their submodules instead of the entire module.\n            This is good practise as it avoids loading unused modules."]))),
        optionsDescription: "A list of blacklisted modules.",
        options: {
            type: "array",
            items: {
                type: "string",
            },
            minLength: 1,
        },
        optionExamples: [true, [true, "rxjs", "lodash"]],
        type: "functionality",
        typescriptOnly: false,
    };
    Rule.FAILURE_STRING = "This import is blacklisted, import a submodule instead";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    for (var _i = 0, _a = tsutils_1.findImports(ctx.sourceFile, 31 /* All */); _i < _a.length; _i++) {
        var name = _a[_i];
        if (ctx.options.indexOf(name.text) !== -1) {
            ctx.addFailure(name.getStart(ctx.sourceFile) + 1, name.end - 1, Rule.FAILURE_STRING);
        }
    }
}
var templateObject_1, templateObject_2;
