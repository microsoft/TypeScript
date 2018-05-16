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
var ts = require("typescript");
var exclusion_1 = require("./exclusion");
var TagExclusion = /** @class */ (function (_super) {
    tslib_1.__extends(TagExclusion, _super);
    function TagExclusion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentTags = _this.descriptor.tags === undefined
            ? {}
            : _this.descriptor.tags.content;
        _this.existenceTags = new Set(_this.descriptor.tags !== undefined && _this.descriptor.tags.existence !== undefined
            ? _this.descriptor.tags.existence
            : undefined);
        return _this;
    }
    TagExclusion.prototype.excludes = function (node) {
        var documentationNode = this.getDocumentationNode(node);
        var tagsWithContents = this.parseTagsWithContents(documentationNode.getFullText());
        for (var _i = 0, tagsWithContents_1 = tagsWithContents; _i < tagsWithContents_1.length; _i++) {
            var tagWithContent = tagsWithContents_1[_i];
            if (this.existenceTags.has(tagWithContent[0])) {
                return true;
            }
            var matcherBody = this.contentTags[tagWithContent[0]];
            if (matcherBody === undefined) {
                continue;
            }
            if (new RegExp(matcherBody).test(tagWithContent[1])) {
                return true;
            }
        }
        return false;
    };
    TagExclusion.prototype.getDocumentationNode = function (node) {
        if (node.kind === ts.SyntaxKind.VariableDeclaration) {
            return node.parent;
        }
        return node;
    };
    TagExclusion.prototype.parseTagsWithContents = function (nodeText) {
        if (nodeText === undefined) {
            return [];
        }
        var docMatches = nodeText.match((/\/\*\*\s*\n([^\*]*(\*[^\/])?)*\*\//));
        if (docMatches === null || docMatches.length === 0) {
            return [];
        }
        var lines = docMatches[0].match(/[\r\n\s]*\*\s*@.*[\r\n\s]/g);
        if (lines === null) {
            return [];
        }
        return lines
            .map(function (line) {
            var body = line.substring(line.indexOf("@"));
            var firstSpaceIndex = body.search(/\s/);
            return [
                body.substring(1, firstSpaceIndex),
                body.substring(firstSpaceIndex).trim(),
            ];
        });
    };
    return TagExclusion;
}(exclusion_1.Exclusion));
exports.TagExclusion = TagExclusion;
