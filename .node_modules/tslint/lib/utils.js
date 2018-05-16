"use strict";
/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
/**
 * Enforces the invariant that the input is an array.
 */
function arrayify(arg) {
    if (Array.isArray(arg)) {
        return arg;
    }
    else if (arg != undefined) {
        return [arg];
    }
    else {
        return [];
    }
}
exports.arrayify = arrayify;
/**
 * @deprecated (no longer used)
 * Enforces the invariant that the input is an object.
 */
function objectify(arg) {
    if (typeof arg === "object" && arg != undefined) {
        return arg;
    }
    else {
        return {};
    }
}
exports.objectify = objectify;
function hasOwnProperty(arg, key) {
    return Object.prototype.hasOwnProperty.call(arg, key);
}
exports.hasOwnProperty = hasOwnProperty;
/**
 * Replace hyphens in a rule name by upper-casing the letter after them.
 * E.g. "foo-bar" -> "fooBar"
 */
function camelize(stringWithHyphens) {
    return stringWithHyphens.replace(/-(.)/g, function (_, nextLetter) { return nextLetter.toUpperCase(); });
}
exports.camelize = camelize;
function isUpperCase(str) {
    return str === str.toUpperCase();
}
exports.isUpperCase = isUpperCase;
function isLowerCase(str) {
    return str === str.toLowerCase();
}
exports.isLowerCase = isLowerCase;
/**
 * Removes leading indents from a template string without removing all leading whitespace
 */
function dedent(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var fullString = strings.reduce(function (accumulator, str, i) { return "" + accumulator + values[i - 1] + str; });
    // match all leading spaces/tabs at the start of each line
    var match = fullString.match(/^[ \t]*(?=\S)/gm);
    if (match === null) {
        // e.g. if the string is empty or all whitespace.
        return fullString;
    }
    // find the smallest indent, we don't want to remove all leading whitespace
    var indent = Math.min.apply(Math, match.map(function (el) { return el.length; }));
    var regexp = new RegExp("^[ \\t]{" + indent + "}", "gm");
    fullString = indent > 0 ? fullString.replace(regexp, "") : fullString;
    return fullString;
}
exports.dedent = dedent;
/**
 * Strip comments from file content.
 */
function stripComments(content) {
    /**
     * First capturing group matches double quoted string
     * Second matches single quotes string
     * Third matches block comments
     * Fourth matches line comments
     */
    var regexp = /("(?:[^\\\"]*(?:\\.)?)*")|('(?:[^\\\']*(?:\\.)?)*')|(\/\*(?:\r?\n|.)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))/g;
    var result = content.replace(regexp, function (match, _m1, _m2, m3, m4) {
        // Only one of m1, m2, m3, m4 matches
        if (m3 !== undefined) {
            // A block comment. Replace with nothing
            return "";
        }
        else if (m4 !== undefined) {
            // A line comment. If it ends in \r?\n then keep it.
            var length = m4.length;
            if (length > 2 && m4[length - 1] === "\n") {
                return m4[length - 2] === "\r" ? "\r\n" : "\n";
            }
            else {
                return "";
            }
        }
        else {
            // We match a string
            return match;
        }
    });
    return result;
}
exports.stripComments = stripComments;
/**
 * Escapes all special characters in RegExp pattern to avoid broken regular expressions and ensure proper matches
 */
function escapeRegExp(re) {
    return re.replace(/[.+*?|^$[\]{}()\\]/g, "\\$&");
}
exports.escapeRegExp = escapeRegExp;
function arraysAreEqual(a, b, eq) {
    return a === b || a !== undefined && b !== undefined && a.length === b.length && a.every(function (x, idx) { return eq(x, b[idx]); });
}
exports.arraysAreEqual = arraysAreEqual;
/** Returns the first non-`undefined` result. */
function find(inputs, getResult) {
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var element = inputs_1[_i];
        var result = getResult(element);
        if (result !== undefined) {
            return result;
        }
    }
    return undefined;
}
exports.find = find;
/** Returns an array that is the concatenation of all output arrays. */
function flatMap(inputs, getOutputs) {
    var out = [];
    for (var i = 0; i < inputs.length; i++) {
        out.push.apply(out, getOutputs(inputs[i], i));
    }
    return out;
}
exports.flatMap = flatMap;
/** Returns an array of all outputs that are not `undefined`. */
function mapDefined(inputs, getOutput) {
    var out = [];
    for (var _i = 0, inputs_2 = inputs; _i < inputs_2.length; _i++) {
        var input = inputs_2[_i];
        var output = getOutput(input);
        if (output !== undefined) {
            out.push(output);
        }
    }
    return out;
}
exports.mapDefined = mapDefined;
function readBufferWithDetectedEncoding(buffer) {
    switch (detectBufferEncoding(buffer)) {
        case "utf8":
            return buffer.toString();
        case "utf8-bom":
            return buffer.toString("utf-8", 2);
        case "utf16le":
            return buffer.toString("utf16le", 2);
        case "utf16be":
            // Round down to nearest multiple of 2.
            var len = buffer.length & ~1; // tslint:disable-line no-bitwise
            // Flip all byte pairs, then read as little-endian.
            for (var i = 0; i < len; i += 2) {
                var temp = buffer[i];
                buffer[i] = buffer[i + 1];
                buffer[i + 1] = temp;
            }
            return buffer.toString("utf16le", 2);
    }
}
exports.readBufferWithDetectedEncoding = readBufferWithDetectedEncoding;
function detectBufferEncoding(buffer, length) {
    if (length === void 0) { length = buffer.length; }
    if (length < 2) {
        return "utf8";
    }
    switch (buffer[0]) {
        case 0xEF:
            if (buffer[1] === 0xBB && length >= 3 && buffer[2] === 0xBF) {
                return "utf8-bom";
            }
            break;
        case 0xFE:
            if (buffer[1] === 0xFF) {
                return "utf16be";
            }
            break;
        case 0xFF:
            if (buffer[1] === 0xFE) {
                return "utf16le";
            }
    }
    return "utf8";
}
exports.detectBufferEncoding = detectBufferEncoding;
// converts Windows normalized paths (with backwards slash `\`) to paths used by TypeScript (with forward slash `/`)
function denormalizeWinPath(path) {
    return path.replace(/\\/g, "/");
}
exports.denormalizeWinPath = denormalizeWinPath;
