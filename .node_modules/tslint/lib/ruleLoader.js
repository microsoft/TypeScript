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
var fs = require("fs");
var path = require("path");
var error_1 = require("./error");
var utils_1 = require("./utils");
var CORE_RULES_DIRECTORY = path.resolve(__dirname, "rules");
var cachedRules = new Map();
function loadRules(ruleOptionsList, rulesDirectories, isJs) {
    if (isJs === void 0) { isJs = false; }
    var rules = [];
    var notFoundRules = [];
    var notAllowedInJsRules = [];
    for (var _i = 0, ruleOptionsList_1 = ruleOptionsList; _i < ruleOptionsList_1.length; _i++) {
        var ruleOptions = ruleOptionsList_1[_i];
        if (ruleOptions.ruleSeverity === "off") {
            // Perf: don't bother finding the rule if it's disabled.
            continue;
        }
        var ruleName = ruleOptions.ruleName;
        var Rule = findRule(ruleName, rulesDirectories);
        if (Rule === undefined) {
            notFoundRules.push(ruleName);
        }
        else if (isJs && Rule.metadata !== undefined && Rule.metadata.typescriptOnly) {
            notAllowedInJsRules.push(ruleName);
        }
        else {
            var rule = new Rule(ruleOptions);
            if (rule.isEnabled()) {
                rules.push(rule);
            }
            if (Rule.metadata !== undefined && Boolean(Rule.metadata.deprecationMessage)) {
                error_1.showWarningOnce(Rule.metadata.ruleName + " is deprecated. " + Rule.metadata.deprecationMessage);
            }
        }
    }
    if (notFoundRules.length > 0) {
        var warning = utils_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Could not find implementations for the following rules specified in the configuration:\n                ", "\n            Try upgrading TSLint and/or ensuring that you have all necessary custom rules installed.\n            If TSLint was recently upgraded, you may have old rules configured which need to be cleaned up.\n        "], ["\n            Could not find implementations for the following rules specified in the configuration:\n                ", "\n            Try upgrading TSLint and/or ensuring that you have all necessary custom rules installed.\n            If TSLint was recently upgraded, you may have old rules configured which need to be cleaned up.\n        "])), notFoundRules.join("\n                "));
        error_1.showWarningOnce(warning);
    }
    if (notAllowedInJsRules.length > 0) {
        var warning = utils_1.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            Following rules specified in configuration couldn't be applied to .js or .jsx files:\n                ", "\n            Make sure to exclude them from \"jsRules\" section of your tslint.json.\n        "], ["\n            Following rules specified in configuration couldn't be applied to .js or .jsx files:\n                ", "\n            Make sure to exclude them from \"jsRules\" section of your tslint.json.\n        "])), notAllowedInJsRules.join("\n                "));
        error_1.showWarningOnce(warning);
    }
    if (rules.length === 0) {
        var fileType = isJs ? "JavaScript" : "TypeScript";
        error_1.showWarningOnce("No valid rules have been specified for " + fileType + " files");
    }
    return rules;
}
exports.loadRules = loadRules;
/** @internal private API */
function findRule(name, rulesDirectories) {
    var camelizedName = transformName(name);
    // first check for core rules
    var Rule = loadCachedRule(CORE_RULES_DIRECTORY, camelizedName);
    return Rule !== undefined ? Rule :
        // then check for rules within the first level of rulesDirectory
        utils_1.find(utils_1.arrayify(rulesDirectories), function (dir) { return loadCachedRule(dir, camelizedName, true); });
}
exports.findRule = findRule;
function transformName(name) {
    // camelize strips out leading and trailing underscores and dashes, so make sure they aren't passed to camelize
    // the regex matches the groups (leading underscores and dashes)(other characters)(trailing underscores and dashes)
    var nameMatch = name.match(/^([-_]*)(.*?)([-_]*)$/);
    if (nameMatch === null) {
        return name + "Rule";
    }
    return "" + nameMatch[1] + utils_1.camelize(nameMatch[2]) + nameMatch[3] + "Rule";
}
/**
 * @param directory - An absolute path to a directory of rules
 * @param ruleName - A name of a rule in filename format. ex) "someLintRule"
 */
function loadRule(directory, ruleName) {
    var ruleFullPath;
    try {
        // Resolve using node's path resolution to allow developers to write custom rules in TypeScript which can be loaded by TS-Node
        ruleFullPath = require.resolve(path.join(directory, ruleName));
    }
    catch (_a) {
        return "not-found";
    }
    return require(ruleFullPath).Rule;
}
function loadCachedRule(directory, ruleName, isCustomPath) {
    // use cached value if available
    var fullPath = path.join(directory, ruleName);
    var cachedRule = cachedRules.get(fullPath);
    if (cachedRule !== undefined) {
        return cachedRule === "not-found" ? undefined : cachedRule;
    }
    // treat directory as a relative path (which needs to be resolved) if it's a custom rule directory
    var absolutePath = directory;
    if (isCustomPath) {
        absolutePath = path.resolve(directory);
        if (!fs.existsSync(absolutePath)) {
            throw new error_1.FatalError("Could not find custom rule directory: " + absolutePath);
        }
    }
    var Rule = loadRule(absolutePath, ruleName);
    cachedRules.set(fullPath, Rule);
    return Rule === "not-found" ? undefined : Rule;
}
var templateObject_1, templateObject_2;
