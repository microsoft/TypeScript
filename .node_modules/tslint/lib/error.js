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
var shownWarnings = new Set();
/**
 * Used to exit the program and display a friendly message without the callstack.
 */
var FatalError = /** @class */ (function (_super) {
    tslib_1.__extends(FatalError, _super);
    function FatalError(message, innerError) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.innerError = innerError;
        _this.name = FatalError.NAME;
        // Fix prototype chain for target ES5
        Object.setPrototypeOf(_this, FatalError.prototype);
        return _this;
    }
    FatalError.NAME = "FatalError";
    return FatalError;
}(Error));
exports.FatalError = FatalError;
function isError(possibleError) {
    return possibleError != undefined && possibleError.message !== undefined;
}
exports.isError = isError;
function showWarningOnce(message) {
    if (!shownWarnings.has(message)) {
        console.warn(message);
        shownWarnings.add(message);
    }
}
exports.showWarningOnce = showWarningOnce;
function showRuleCrashWarning(message, ruleName, fileName) {
    console.warn("The '" + ruleName + "' rule threw an error in '" + fileName + "':\n" + message);
}
exports.showRuleCrashWarning = showRuleCrashWarning;
