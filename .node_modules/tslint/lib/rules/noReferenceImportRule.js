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
var Lint = require("../index");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (moduleReference) {
        return "No need to reference \"" + moduleReference + "\", since it is imported.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-reference-import",
        description: 'Don\'t `<reference types="foo" />` if you import `foo` anyway.',
        optionsDescription: "Not configurable.",
        options: null,
        type: "style",
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    if (ctx.sourceFile.typeReferenceDirectives.length === 0) {
        return;
    }
    var imports = new Set(tsutils_1.findImports(ctx.sourceFile, 3 /* AllStaticImports */).map(function (name) { return name.text; }));
    for (var _i = 0, _a = ctx.sourceFile.typeReferenceDirectives; _i < _a.length; _i++) {
        var ref = _a[_i];
        if (imports.has(ref.fileName)) {
            ctx.addFailure(ref.pos, ref.end, Rule.FAILURE_STRING(ref.fileName));
        }
    }
}
