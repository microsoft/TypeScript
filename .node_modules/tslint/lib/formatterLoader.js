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
var fs = require("fs");
var path = require("path");
var resolve = require("resolve");
var utils_1 = require("./utils");
var CORE_FORMATTERS_DIRECTORY = path.resolve(__dirname, "formatters");
function findFormatter(name, formattersDirectory) {
    if (typeof name === "function") {
        return name;
    }
    else if (typeof name === "string") {
        name = name.trim();
        var camelizedName = utils_1.camelize(name + "Formatter");
        // first check for core formatters
        var Formatter = loadFormatter(CORE_FORMATTERS_DIRECTORY, camelizedName, true);
        if (Formatter !== undefined) {
            return Formatter;
        }
        // then check for rules within the first level of rulesDirectory
        if (formattersDirectory !== undefined) {
            Formatter = loadFormatter(formattersDirectory, camelizedName);
            if (Formatter !== undefined) {
                return Formatter;
            }
        }
        // else try to resolve as module
        return loadFormatterModule(name);
    }
    else {
        // If an something else is passed as a name (e.g. object)
        throw new Error("Name of type " + typeof name + " is not supported.");
    }
}
exports.findFormatter = findFormatter;
function loadFormatter(directory, name, isCore) {
    var formatterPath = path.resolve(path.join(directory, name));
    var fullPath;
    if (isCore) {
        fullPath = formatterPath + ".js";
        if (!fs.existsSync(fullPath)) {
            return undefined;
        }
    }
    else {
        // Resolve using node's path resolution to allow developers to write custom formatters in TypeScript which can be loaded by TS-Node
        try {
            fullPath = require.resolve(formatterPath);
        }
        catch (_a) {
            return undefined;
        }
    }
    return require(fullPath).Formatter;
}
function loadFormatterModule(name) {
    var src;
    try {
        // first try to find a module in the dependencies of the currently linted project
        src = resolve.sync(name, { basedir: process.cwd() });
    }
    catch (_a) {
        try {
            // if there is no local module, try relative to the installation of TSLint (might be global)
            src = require.resolve(name);
        }
        catch (_b) {
            return undefined;
        }
    }
    return require(src).Formatter;
}
