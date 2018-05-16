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
var jsonFormatter_1 = require("./jsonFormatter");
exports.JsonFormatter = jsonFormatter_1.Formatter;
var pmdFormatter_1 = require("./pmdFormatter");
exports.PmdFormatter = pmdFormatter_1.Formatter;
var proseFormatter_1 = require("./proseFormatter");
exports.ProseFormatter = proseFormatter_1.Formatter;
var verboseFormatter_1 = require("./verboseFormatter");
exports.VerboseFormatter = verboseFormatter_1.Formatter;
var stylishFormatter_1 = require("./stylishFormatter");
exports.StylishFormatter = stylishFormatter_1.Formatter;
var fileslistFormatter_1 = require("./fileslistFormatter");
exports.FileslistFormatter = fileslistFormatter_1.Formatter;
var codeFrameFormatter_1 = require("./codeFrameFormatter");
exports.CodeFrameFormatter = codeFrameFormatter_1.Formatter;
var tapFormatter_1 = require("./tapFormatter");
exports.TapFormatter = tapFormatter_1.Formatter;
var junitFormatter_1 = require("./junitFormatter");
exports.JUnitFormatter = junitFormatter_1.Formatter;
