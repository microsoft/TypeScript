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
var abstractFormatter_1 = require("../language/formatter/abstractFormatter");
var Utils = require("../utils");
var Formatter = /** @class */ (function (_super) {
    tslib_1.__extends(Formatter, _super);
    function Formatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures) {
        var output = '<?xml version="1.0" encoding="utf-8"?><testsuites package="tslint">';
        if (failures.length !== 0) {
            var failuresSorted = failures.sort(function (a, b) { return a.getFileName().localeCompare(b.getFileName()); });
            var previousFilename = null;
            for (var _i = 0, failuresSorted_1 = failuresSorted; _i < failuresSorted_1.length; _i++) {
                var failure = failuresSorted_1[_i];
                var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
                var message = this.escapeXml(failure.getFailure());
                var rule = this.escapeXml(failure.getRuleName());
                var severity = failure.getRuleSeverity();
                if (failure.getFileName() !== previousFilename) {
                    if (previousFilename !== null) {
                        output += "</testsuite>";
                    }
                    previousFilename = failure.getFileName();
                    output += "<testsuite name=\"" + this.escapeXml(failure.getFileName()) + "\">";
                }
                output += "<testcase name=\"Line " + (lineAndCharacter.line + 1) + ", ";
                output += "Column " + (lineAndCharacter.character + 1) + ": " + rule + "\">";
                output += "<failure type=\"" + severity + "\">" + message + "</failure>";
                output += "</testcase>";
            }
            if (previousFilename !== null) {
                output += "</testsuite>";
            }
        }
        output += "</testsuites>";
        return output;
    };
    Formatter.prototype.escapeXml = function (str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&#39;")
            .replace(/"/g, "&quot;");
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "junit",
        description: "Formats errors as through they were JUnit output.",
        descriptionDetails: Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Imitates the JUnit XML Output"], ["\n            Imitates the JUnit XML Output"]))),
        sample: Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        <?xml version=\"1.0\" encoding=\"utf-8\"?>\n        <testsuites package=\"tslint\">\n          <testsuite name=\"myFile.ts\">\n            <testcase name=\"Line 1, Column 14: semicolon\">\n              <failure type=\"warning\">Missing semicolon</failure>\n            </testcase>\n          </testsuite>\n        </testsuites>\n        "], ["\n        <?xml version=\"1.0\" encoding=\"utf-8\"?>\n        <testsuites package=\"tslint\">\n          <testsuite name=\"myFile.ts\">\n            <testcase name=\"Line 1, Column 14: semicolon\">\n              <failure type=\"warning\">Missing semicolon</failure>\n            </testcase>\n          </testsuite>\n        </testsuites>\n        "]))),
        consumer: "machine",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
var templateObject_1, templateObject_2;
