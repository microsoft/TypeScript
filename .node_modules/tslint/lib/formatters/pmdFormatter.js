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
var Utils = require("../utils");
var Formatter = /** @class */ (function (_super) {
    tslib_1.__extends(Formatter, _super);
    function Formatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures) {
        var output = "<pmd version=\"tslint\">";
        for (var _i = 0, failures_1 = failures; _i < failures_1.length; _i++) {
            var failure = failures_1[_i];
            var failureString = failure.getFailure()
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/'/g, "&#39;")
                .replace(/"/g, "&quot;");
            var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            var priority = failure.getRuleSeverity() === "warning" ? 4 : 3;
            output += "<file name=\"" + failure.getFileName();
            output += "\"><violation begincolumn=\"" + (lineAndCharacter.character + 1);
            output += "\" beginline=\"" + (lineAndCharacter.line + 1);
            output += "\" priority=\"" + priority + "\"";
            output += " rule=\"" + failureString + "\"></violation></file>";
        }
        output += "</pmd>";
        return output;
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "pmd",
        description: "Formats errors as through they were PMD output.",
        descriptionDetails: "Imitates the XML output from PMD. All errors have a priority of 1.",
        sample: Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        <pmd version=\"tslint\">\n            <file name=\"myFile.ts\">\n                <violation begincolumn=\"14\" beginline=\"1\" priority=\"3\" rule=\"Missing semicolon\"></violation>\n            </file>\n        </pmd>"], ["\n        <pmd version=\"tslint\">\n            <file name=\"myFile.ts\">\n                <violation begincolumn=\"14\" beginline=\"1\" priority=\"3\" rule=\"Missing semicolon\"></violation>\n            </file>\n        </pmd>"]))),
        consumer: "machine",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
var templateObject_1;
