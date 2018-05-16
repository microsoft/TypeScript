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
        ruleName: "no-reference",
        description: "Disallows `/// <reference path=>` imports (use ES6-style imports instead).",
        rationale: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Using `/// <reference path=>` comments to load other files is outdated.\n            Use ES6-style imports to reference other files."], ["\n            Using \\`/// <reference path=>\\` comments to load other files is outdated.\n            Use ES6-style imports to reference other files."]))),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "<reference> is not allowed, use imports";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    for (var _i = 0, _a = ctx.sourceFile.referencedFiles; _i < _a.length; _i++) {
        var ref = _a[_i];
        ctx.addFailure(ref.pos, ref.end, Rule.FAILURE_STRING);
    }
}
var templateObject_1;
