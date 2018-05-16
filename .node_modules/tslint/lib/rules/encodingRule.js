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
var fs = require("fs");
var Lint = require("../index");
var utils_1 = require("../utils");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = function (actual) {
        return "This file is encoded as " + showEncoding(actual) + " instead of UTF-8.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "encoding",
        description: "Enforces UTF-8 file encoding.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "style",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var encoding = detectEncoding(ctx.sourceFile.fileName);
    if (encoding !== "utf8") {
        ctx.addFailure(0, 1, Rule.FAILURE_STRING(encoding));
    }
}
function showEncoding(encoding) {
    switch (encoding) {
        case "utf8":
            return "UTF-8";
        case "utf8-bom":
            return "UTF-8 with byte-order marker (BOM)";
        case "utf16le":
            return "UTF-16 (little-endian)";
        case "utf16be":
            return "UTF-16 (big-endian)";
    }
}
function detectEncoding(fileName) {
    var fd = fs.openSync(fileName, "r");
    var maxBytesRead = 3; // Only need 3 bytes to detect the encoding.
    var buffer = new Buffer(maxBytesRead);
    var bytesRead = fs.readSync(fd, buffer, /*offset*/ 0, /*length*/ maxBytesRead, /*position*/ 0);
    fs.closeSync(fd);
    return utils_1.detectBufferEncoding(buffer, bytesRead);
}
