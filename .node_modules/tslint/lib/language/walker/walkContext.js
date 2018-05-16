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
var rule_1 = require("../rule/rule");
var WalkContext = /** @class */ (function () {
    function WalkContext(sourceFile, ruleName, options) {
        this.sourceFile = sourceFile;
        this.ruleName = ruleName;
        this.options = options;
        this.failures = [];
    }
    /** Add a failure with any arbitrary span. Prefer `addFailureAtNode` if possible. */
    WalkContext.prototype.addFailureAt = function (start, width, failure, fix) {
        this.addFailure(start, start + width, failure, fix);
    };
    WalkContext.prototype.addFailure = function (start, end, failure, fix) {
        var fileLength = this.sourceFile.end;
        this.failures.push(new rule_1.RuleFailure(this.sourceFile, Math.min(start, fileLength), Math.min(end, fileLength), failure, this.ruleName, fix));
    };
    /** Add a failure using a node's span. */
    WalkContext.prototype.addFailureAtNode = function (node, failure, fix) {
        this.addFailure(node.getStart(this.sourceFile), node.getEnd(), failure, fix);
    };
    return WalkContext;
}());
exports.WalkContext = WalkContext;
