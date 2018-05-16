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
var ruleWalker_1 = require("./ruleWalker");
var ProgramAwareRuleWalker = /** @class */ (function (_super) {
    tslib_1.__extends(ProgramAwareRuleWalker, _super);
    function ProgramAwareRuleWalker(sourceFile, options, program) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.program = program;
        _this.typeChecker = program.getTypeChecker();
        return _this;
    }
    ProgramAwareRuleWalker.prototype.getProgram = function () {
        return this.program;
    };
    ProgramAwareRuleWalker.prototype.getTypeChecker = function () {
        return this.typeChecker;
    };
    return ProgramAwareRuleWalker;
}(ruleWalker_1.RuleWalker));
exports.ProgramAwareRuleWalker = ProgramAwareRuleWalker;
