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
        var output = ["TAP version 13"];
        if (failures.length === 0) {
            output = output.concat([
                "1..0 # SKIP No failures",
            ]);
        }
        else {
            output = output.concat(["1.." + failures.length]).concat(this.mapToMessages(failures));
        }
        return output.join("\n") + "\n";
    };
    Formatter.prototype.mapToMessages = function (failures) {
        return failures.map(function (failure, i) {
            var fileName = failure.getFileName();
            var failureString = failure.getFailure();
            var ruleName = failure.getRuleName();
            var failureMessage = failure.getFailure();
            var failureSeverity = failure.getRuleSeverity();
            var failureRaw = failure.getRawLines();
            var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            return Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n                not ok ", " - ", "\n                  ---\n                  message : ", "\n                  severity: ", "\n                  data:\n                    ruleName: ", "\n                    fileName: ", "\n                    line: ", "\n                    character: ", "\n                    failureString: ", "\n                    rawLines: ", "\n                  ..."], ["\n                not ok ", " - ", "\n                  ---\n                  message : ", "\n                  severity: ", "\n                  data:\n                    ruleName: ", "\n                    fileName: ", "\n                    line: ", "\n                    character: ", "\n                    failureString: ", "\n                    rawLines: ", "\n                  ..."])), String(i + 1), failureMessage, failureMessage, failureSeverity, ruleName, fileName, String(lineAndCharacter.line), String(lineAndCharacter.character), failureString, failureRaw);
        });
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "tap",
        description: "Formats output as TAP stream.",
        descriptionDetails: "Provides error messages output in TAP13 format which can be consumed by any TAP formatter.",
        sample: Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            TAP version 13\n            1..1\n            not ok 1 - Some error\n              ---\n              message: Variable has any type\n              severity: error\n              data:\n                 ruleName: no-any\n                 fileName: test-file.ts\n                 line: 10\n                 character: 10\n                 failureString: Some error\n                 rawLines: Some raw output\n              ..."], ["\n            TAP version 13\n            1..1\n            not ok 1 - Some error\n              ---\n              message: Variable has any type\n              severity: error\n              data:\n                 ruleName: no-any\n                 fileName: test-file.ts\n                 line: 10\n                 character: 10\n                 failureString: Some error\n                 rawLines: Some raw output\n              ..."]))),
        consumer: "machine",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
var templateObject_1, templateObject_2;
