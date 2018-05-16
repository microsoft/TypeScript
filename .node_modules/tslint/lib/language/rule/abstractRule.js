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
var walker_1 = require("../walker");
var AbstractRule = /** @class */ (function () {
    function AbstractRule(options) {
        this.options = options;
        this.ruleName = options.ruleName;
        this.ruleArguments = options.ruleArguments;
        this.ruleSeverity = options.ruleSeverity;
    }
    AbstractRule.prototype.getOptions = function () {
        return this.options;
    };
    AbstractRule.prototype.applyWithWalker = function (walker) {
        walker.walk(walker.getSourceFile());
        return walker.getFailures();
    };
    AbstractRule.prototype.isEnabled = function () {
        return this.ruleSeverity !== "off";
    };
    AbstractRule.prototype.applyWithFunction = function (sourceFile, walkFn, options, programOrChecker) {
        var ctx = new walker_1.WalkContext(sourceFile, this.ruleName, options);
        walkFn(ctx, programOrChecker);
        return ctx.failures;
    };
    /**
     * @deprecated
     * Failures will be filtered based on `tslint:disable` comments by tslint.
     * This method now does nothing.
     */
    AbstractRule.prototype.filterFailures = function (failures) { return failures; };
    return AbstractRule;
}());
exports.AbstractRule = AbstractRule;
