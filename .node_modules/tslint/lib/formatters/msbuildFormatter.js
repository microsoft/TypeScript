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
var path = require("path");
var abstractFormatter_1 = require("../language/formatter/abstractFormatter");
var utils_1 = require("../utils");
var Formatter = /** @class */ (function (_super) {
    tslib_1.__extends(Formatter, _super);
    function Formatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures) {
        var outputLines = failures.map(function (failure) {
            var fileName = path.normalize(failure.getFileName());
            var failureString = failure.getFailure();
            var camelizedRule = utils_1.camelize(failure.getRuleName());
            var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            var positionTuple = "(" + (lineAndCharacter.line + 1) + "," + (lineAndCharacter.character + 1) + ")";
            var severity = failure.getRuleSeverity();
            return "" + fileName + positionTuple + ": " + severity + " " + camelizedRule + ": " + failureString;
        });
        return outputLines.join("\n") + "\n";
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "msbuild",
        description: "Formats errors for consumption by msbuild.",
        descriptionDetails: "The output is compatible with both msbuild and Visual Studio.",
        sample: "myFile.ts(1,14): warning: Missing semicolon",
        consumer: "machine",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
