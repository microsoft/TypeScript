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
    Formatter.prototype.format = function (failures, fixes) {
        if (failures.length === 0 && (fixes === undefined || fixes.length === 0)) {
            return "\n";
        }
        failures = this.sortFailures(failures);
        var fixLines = [];
        if (fixes !== undefined) {
            var perFileFixes = new Map();
            for (var _i = 0, fixes_1 = fixes; _i < fixes_1.length; _i++) {
                var fix = fixes_1[_i];
                var prevFixes = perFileFixes.get(fix.getFileName());
                perFileFixes.set(fix.getFileName(), (prevFixes !== undefined ? prevFixes : 0) + 1);
            }
            perFileFixes.forEach(function (fixCount, fixedFile) {
                fixLines.push("Fixed " + fixCount + " error(s) in " + fixedFile);
            });
            fixLines.push(""); // add a blank line between fixes and failures
        }
        var errorLines = failures.map(function (failure) {
            var fileName = failure.getFileName();
            var failureString = failure.getFailure();
            var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            var positionTuple = "[" + (lineAndCharacter.line + 1) + ", " + (lineAndCharacter.character + 1) + "]";
            return failure.getRuleSeverity().toUpperCase() + ": " + fileName + positionTuple + ": " + failureString;
        });
        return fixLines.concat(errorLines).join("\n") + "\n";
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "prose",
        description: "The default formatter which outputs simple human-readable messages.",
        sample: "ERROR: myFile.ts[1, 14]: Missing semicolon",
        consumer: "human",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
