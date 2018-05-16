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
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var completedDocsRule_1 = require("../completedDocsRule");
var exclusion_1 = require("./exclusion");
var ClassExclusion = /** @class */ (function (_super) {
    tslib_1.__extends(ClassExclusion, _super);
    function ClassExclusion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.locations = _this.createSet(_this.descriptor.locations);
        _this.privacies = _this.createSet(_this.descriptor.privacies);
        return _this;
    }
    ClassExclusion.prototype.excludes = function (node) {
        return !(this.shouldLocationBeDocumented(node)
            && this.shouldPrivacyBeDocumented(node));
    };
    ClassExclusion.prototype.shouldLocationBeDocumented = function (node) {
        if (this.locations.has(completedDocsRule_1.ALL)) {
            return true;
        }
        if (tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword)) {
            return this.locations.has(completedDocsRule_1.LOCATION_STATIC);
        }
        return this.locations.has(completedDocsRule_1.LOCATION_INSTANCE);
    };
    ClassExclusion.prototype.shouldPrivacyBeDocumented = function (node) {
        if (this.privacies.has(completedDocsRule_1.ALL)) {
            return true;
        }
        if (tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword)) {
            return this.privacies.has(completedDocsRule_1.PRIVACY_PRIVATE);
        }
        if (tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ProtectedKeyword)) {
            return this.privacies.has(completedDocsRule_1.PRIVACY_PROTECTED);
        }
        return this.privacies.has(completedDocsRule_1.PRIVACY_PUBLIC);
    };
    return ClassExclusion;
}(exclusion_1.Exclusion));
exports.ClassExclusion = ClassExclusion;
