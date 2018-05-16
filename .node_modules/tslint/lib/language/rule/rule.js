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
var utils_1 = require("../../utils");
function isTypedRule(rule) {
    return "applyWithProgram" in rule;
}
exports.isTypedRule = isTypedRule;
var Replacement = /** @class */ (function () {
    function Replacement(start, length, text) {
        this.start = start;
        this.length = length;
        this.text = text;
    }
    Replacement.applyFixes = function (content, fixes) {
        return this.applyAll(content, utils_1.flatMap(fixes, utils_1.arrayify));
    };
    Replacement.applyAll = function (content, replacements) {
        // sort in reverse so that diffs are properly applied
        replacements.sort(function (a, b) { return b.end !== a.end ? b.end - a.end : b.start - a.start; });
        return replacements.reduce(function (text, r) { return r.apply(text); }, content);
    };
    Replacement.replaceNode = function (node, text, sourceFile) {
        return this.replaceFromTo(node.getStart(sourceFile), node.getEnd(), text);
    };
    Replacement.replaceFromTo = function (start, end, text) {
        return new Replacement(start, end - start, text);
    };
    Replacement.deleteText = function (start, length) {
        return new Replacement(start, length, "");
    };
    Replacement.deleteFromTo = function (start, end) {
        return new Replacement(start, end - start, "");
    };
    Replacement.appendText = function (start, text) {
        return new Replacement(start, 0, text);
    };
    Object.defineProperty(Replacement.prototype, "end", {
        get: function () {
            return this.start + this.length;
        },
        enumerable: true,
        configurable: true
    });
    Replacement.prototype.apply = function (content) {
        return content.substring(0, this.start) + this.text + content.substring(this.start + this.length);
    };
    Replacement.prototype.toJson = function () {
        // tslint:disable object-literal-sort-keys
        return {
            innerStart: this.start,
            innerLength: this.length,
            innerText: this.text,
        };
        // tslint:enable object-literal-sort-keys
    };
    return Replacement;
}());
exports.Replacement = Replacement;
var RuleFailurePosition = /** @class */ (function () {
    function RuleFailurePosition(position, lineAndCharacter) {
        this.position = position;
        this.lineAndCharacter = lineAndCharacter;
    }
    RuleFailurePosition.prototype.getPosition = function () {
        return this.position;
    };
    RuleFailurePosition.prototype.getLineAndCharacter = function () {
        return this.lineAndCharacter;
    };
    RuleFailurePosition.prototype.toJson = function () {
        return {
            character: this.lineAndCharacter.character,
            line: this.lineAndCharacter.line,
            position: this.position,
        };
    };
    RuleFailurePosition.prototype.equals = function (ruleFailurePosition) {
        var ll = this.lineAndCharacter;
        var rr = ruleFailurePosition.lineAndCharacter;
        return this.position === ruleFailurePosition.position
            && ll.line === rr.line
            && ll.character === rr.character;
    };
    return RuleFailurePosition;
}());
exports.RuleFailurePosition = RuleFailurePosition;
var RuleFailure = /** @class */ (function () {
    function RuleFailure(sourceFile, start, end, failure, ruleName, fix) {
        this.sourceFile = sourceFile;
        this.failure = failure;
        this.ruleName = ruleName;
        this.fix = fix;
        this.fileName = sourceFile.fileName;
        this.startPosition = this.createFailurePosition(start);
        this.endPosition = this.createFailurePosition(end);
        this.rawLines = sourceFile.text;
        this.ruleSeverity = "error";
    }
    RuleFailure.compare = function (a, b) {
        if (a.fileName !== b.fileName) {
            return a.fileName < b.fileName ? -1 : 1;
        }
        return a.startPosition.getPosition() - b.startPosition.getPosition();
    };
    RuleFailure.prototype.getFileName = function () {
        return this.fileName;
    };
    RuleFailure.prototype.getRuleName = function () {
        return this.ruleName;
    };
    RuleFailure.prototype.getStartPosition = function () {
        return this.startPosition;
    };
    RuleFailure.prototype.getEndPosition = function () {
        return this.endPosition;
    };
    RuleFailure.prototype.getFailure = function () {
        return this.failure;
    };
    RuleFailure.prototype.hasFix = function () {
        return this.fix !== undefined;
    };
    RuleFailure.prototype.getFix = function () {
        return this.fix;
    };
    RuleFailure.prototype.getRawLines = function () {
        return this.rawLines;
    };
    RuleFailure.prototype.getRuleSeverity = function () {
        return this.ruleSeverity;
    };
    RuleFailure.prototype.setRuleSeverity = function (value) {
        this.ruleSeverity = value;
    };
    RuleFailure.prototype.toJson = function () {
        return {
            endPosition: this.endPosition.toJson(),
            failure: this.failure,
            fix: this.fix === undefined ? undefined : Array.isArray(this.fix) ? this.fix.map(function (r) { return r.toJson(); }) : this.fix.toJson(),
            name: this.fileName,
            ruleName: this.ruleName,
            ruleSeverity: this.ruleSeverity.toUpperCase(),
            startPosition: this.startPosition.toJson(),
        };
    };
    RuleFailure.prototype.equals = function (ruleFailure) {
        return this.failure === ruleFailure.getFailure()
            && this.fileName === ruleFailure.getFileName()
            && this.startPosition.equals(ruleFailure.getStartPosition())
            && this.endPosition.equals(ruleFailure.getEndPosition());
    };
    RuleFailure.prototype.createFailurePosition = function (position) {
        var lineAndCharacter = this.sourceFile.getLineAndCharacterOfPosition(position);
        return new RuleFailurePosition(position, lineAndCharacter);
    };
    return RuleFailure;
}());
exports.RuleFailure = RuleFailure;
