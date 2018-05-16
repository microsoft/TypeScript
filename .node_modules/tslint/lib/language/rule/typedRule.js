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
var error_1 = require("../../error");
var abstractRule_1 = require("./abstractRule");
var TypedRule = /** @class */ (function (_super) {
    tslib_1.__extends(TypedRule, _super);
    function TypedRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypedRule.prototype.apply = function () {
        // if no program is given to the linter, show an error
        error_1.showWarningOnce("Warning: The '" + this.ruleName + "' rule requires type information.");
        return [];
    };
    return TypedRule;
}(abstractRule_1.AbstractRule));
exports.TypedRule = TypedRule;
