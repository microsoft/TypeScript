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
var blockExclusion_1 = require("./blockExclusion");
var classExclusion_1 = require("./classExclusion");
var tagExclusion_1 = require("./tagExclusion");
var ExclusionFactory = /** @class */ (function () {
    function ExclusionFactory() {
    }
    ExclusionFactory.prototype.constructExclusionsMap = function (ruleArguments) {
        var exclusionsMap = new Map();
        for (var _i = 0, ruleArguments_1 = ruleArguments; _i < ruleArguments_1.length; _i++) {
            var ruleArgument = ruleArguments_1[_i];
            this.addRequirements(exclusionsMap, ruleArgument);
        }
        return exclusionsMap;
    };
    ExclusionFactory.prototype.addRequirements = function (exclusionsMap, descriptors) {
        if (typeof descriptors === "string") {
            exclusionsMap.set(descriptors, this.createRequirementsForDocType(descriptors, {}));
            return;
        }
        for (var docType in descriptors) {
            if (utils_1.hasOwnProperty(descriptors, docType)) {
                exclusionsMap.set(docType, this.createRequirementsForDocType(docType, descriptors[docType]));
            }
        }
    };
    ExclusionFactory.prototype.createRequirementsForDocType = function (docType, descriptor) {
        var requirements = [];
        if (docType === "methods" || docType === "properties") {
            requirements.push(new classExclusion_1.ClassExclusion(descriptor));
        }
        else {
            requirements.push(new blockExclusion_1.BlockExclusion(descriptor));
        }
        if (descriptor.tags !== undefined) {
            requirements.push(new tagExclusion_1.TagExclusion(descriptor));
        }
        return requirements;
    };
    return ExclusionFactory;
}());
exports.ExclusionFactory = ExclusionFactory;
