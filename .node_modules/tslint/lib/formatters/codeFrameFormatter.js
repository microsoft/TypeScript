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
var codeFrame = require("babel-code-frame");
var chalk_1 = require("chalk");
var Utils = require("../utils");
var Formatter = /** @class */ (function (_super) {
    tslib_1.__extends(Formatter, _super);
    function Formatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Formatter.prototype.format = function (failures) {
        if (typeof failures[0] === "undefined") {
            return "\n";
        }
        failures = this.sortFailures(failures);
        var outputLines = [];
        var currentFile;
        for (var _i = 0, failures_1 = failures; _i < failures_1.length; _i++) {
            var failure = failures_1[_i];
            var fileName = failure.getFileName();
            // Output the name of each file once
            if (currentFile !== fileName) {
                outputLines.push("");
                outputLines.push(fileName);
                currentFile = fileName;
            }
            var failureString = failure.getFailure();
            failureString = failure.getRuleSeverity() === "warning" ? chalk_1.default.yellow(failureString) : chalk_1.default.red(failureString);
            // Rule
            var ruleName = failure.getRuleName();
            ruleName = chalk_1.default.gray("(" + ruleName + ")");
            // Frame
            var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            var frame = codeFrame(failure.getRawLines(), lineAndCharacter.line + 1, // babel-code-frame is 1 index
            lineAndCharacter.character, {
                forceColor: chalk_1.default.enabled,
                highlightCode: true,
            });
            // Ouput
            outputLines.push(failureString + " " + ruleName);
            outputLines.push(frame);
            outputLines.push("");
        }
        // Removes initial blank line
        if (outputLines[0] === "") {
            outputLines.shift();
        }
        return outputLines.join("\n") + "\n";
    };
    /* tslint:disable:object-literal-sort-keys */
    Formatter.metadata = {
        formatterName: "codeFrame",
        description: "Framed formatter which creates a frame of error code.",
        descriptionDetails: Utils.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n            Prints syntax highlighted code in a frame with a pointer to where\n            exactly lint error is happening."], ["\n            Prints syntax highlighted code in a frame with a pointer to where\n            exactly lint error is happening."]))),
        sample: Utils.dedent(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n            src/components/Payment.tsx\n            Parentheses are required around the parameters of an arrow function definition (arrow-parens)\n              21 |     public componentDidMount() {\n              22 |         this.input.focus();\n            > 23 |         loadStripe().then(Stripe => Stripe.pay());\n                 |                          ^\n              24 |     }\n              25 |\n              26 |     public render() {"], ["\n            src/components/Payment.tsx\n            Parentheses are required around the parameters of an arrow function definition (arrow-parens)\n              21 |     public componentDidMount() {\n              22 |         this.input.focus();\n            > 23 |         loadStripe().then(Stripe => Stripe.pay());\n                 |                          ^\n              24 |     }\n              25 |\n              26 |     public render() {"]))),
        consumer: "human",
    };
    return Formatter;
}(abstractFormatter_1.AbstractFormatter));
exports.Formatter = Formatter;
var templateObject_1, templateObject_2;
