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
var builtins = require("builtin-modules");
var fs = require("fs");
var path = require("path");
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("../index");
var OPTION_DEV = "dev";
var OPTION_OPTIONAL = "optional";
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (module) {
        return "Module '" + module + "' is not listed as dependency in package.json";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, {
            dev: this.ruleArguments.indexOf(OPTION_DEV) !== -1,
            optional: this.ruleArguments.indexOf(OPTION_OPTIONAL) !== -1,
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "no-implicit-dependencies",
        description: "Disallows importing modules that are not listed as dependency in the project's package.json",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Disallows importing transient dependencies and modules installed above your package's root directory.\n        "], ["\n            Disallows importing transient dependencies and modules installed above your package's root directory.\n        "]))),
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            By default the rule looks at `\"dependencies\"` and `\"peerDependencies\"`.\n            By adding the `\"", "\"` option the rule looks at `\"devDependencies\"` instead of `\"peerDependencies\"`.\n            By adding the `\"", "\"` option the rule also looks at `\"optionalDependencies\"`.\n        "], ["\n            By default the rule looks at \\`\"dependencies\"\\` and \\`\"peerDependencies\"\\`.\n            By adding the \\`\"", "\"\\` option the rule looks at \\`\"devDependencies\"\\` instead of \\`\"peerDependencies\"\\`.\n            By adding the \\`\"", "\"\\` option the rule also looks at \\`\"optionalDependencies\"\\`.\n        "])), OPTION_DEV, OPTION_OPTIONAL),
        options: {
            type: "array",
            items: {
                type: "string",
                enum: [OPTION_DEV, OPTION_OPTIONAL],
            },
            minItems: 0,
            maxItems: 2,
        },
        optionExamples: [true, [true, OPTION_DEV], [true, OPTION_OPTIONAL]],
        type: "functionality",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var options = ctx.options;
    var dependencies;
    for (var _i = 0, _a = tsutils_1.findImports(ctx.sourceFile, 31 /* All */); _i < _a.length; _i++) {
        var name = _a[_i];
        if (!ts.isExternalModuleNameRelative(name.text)) {
            var packageName = getPackageName(name.text);
            if (builtins.indexOf(packageName) === -1 && !hasDependency(packageName)) {
                ctx.addFailureAtNode(name, Rule.FAILURE_STRING_FACTORY(packageName));
            }
        }
    }
    function hasDependency(module) {
        if (dependencies === undefined) {
            dependencies = getDependencies(ctx.sourceFile.fileName, options);
        }
        return dependencies.has(module);
    }
}
function getPackageName(name) {
    var parts = name.split(/\//g);
    if (name[0] !== "@") {
        return parts[0];
    }
    return parts[0] + "/" + parts[1];
}
function getDependencies(fileName, options) {
    var result = new Set();
    var packageJsonPath = findPackageJson(path.resolve(path.dirname(fileName)));
    if (packageJsonPath !== undefined) {
        try {
            // don't use require here to avoid caching
            // remove BOM from file content before parsing
            var content = JSON.parse(fs.readFileSync(packageJsonPath, "utf8").replace(/^\uFEFF/, ""));
            if (content.dependencies !== undefined) {
                addDependencies(result, content.dependencies);
            }
            if (!options.dev && content.peerDependencies !== undefined) {
                addDependencies(result, content.peerDependencies);
            }
            if (options.dev && content.devDependencies !== undefined) {
                addDependencies(result, content.devDependencies);
            }
            if (options.optional && content.optionalDependencies !== undefined) {
                addDependencies(result, content.optionalDependencies);
            }
        }
        catch (_a) {
            // treat malformed package.json files as empty
        }
    }
    return result;
}
function addDependencies(result, dependencies) {
    for (var name in dependencies) {
        if (dependencies.hasOwnProperty(name)) {
            result.add(name);
        }
    }
}
function findPackageJson(current) {
    var prev;
    do {
        var fileName = path.join(current, "package.json");
        if (fs.existsSync(fileName)) {
            return fileName;
        }
        prev = current;
        current = path.dirname(current);
    } while (prev !== current);
    return undefined;
}
var templateObject_1, templateObject_2;
