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
var abstractFormatter_1 = require("../language/formatter/abstractFormatter");
var Formatter = /** @class */ (function (_super) {
    tslib_1.__extends(Formatter, _super);
    function Formatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures) {
        failures = this.sortFailures(failures);
        return this.mapToMessages(failures).join("\n") + "\n";
    };
    Formatter.prototype.mapToMessages = function (failures) {
        return failures.map(function (failure) {
            var fileName = failure.getFileName();
            var failureString = failure.getFailure();
            var ruleName = failure.getRuleName();
            var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            var positionTuple = "[" + (lineAndCharacter.line + 1) + ", " + (lineAndCharacter.character + 1) + "]";
            return failure.getRuleSeverity().toUpperCase() + ": (" + ruleName + ") " + fileName + positionTuple + ": " + failureString;
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "verbose",
        description: "The human-readable formatter which includes the rule name in messages.",
        descriptionDetails: "The output is the same as the prose formatter with the rule name included",
        sample: "ERROR: (semicolon) myFile.ts[1, 14]: Missing semicolon",
        consumer: "human",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
