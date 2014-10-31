//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='references.ts' />

module TypeScript {
    export function stripStartAndEndQuotes(str: string) {
        var firstCharCode = str && str.charCodeAt(0);
        if (str && str.length >= 2 && firstCharCode === str.charCodeAt(str.length - 1) && (firstCharCode === CharacterCodes.singleQuote || firstCharCode === CharacterCodes.doubleQuote)) {
            return str.substring(1, str.length - 1);
        }

        return str;
    }

    var switchToForwardSlashesRegEx = /\\/g;
    export function switchToForwardSlashes(path: string) {
        return path.replace(switchToForwardSlashesRegEx, "/");
    }

    function isFileOfExtension(fname: string, ext: string) {
        var invariantFname = fname.toLocaleUpperCase();
        var invariantExt = ext.toLocaleUpperCase();
        var extLength = invariantExt.length;
        return invariantFname.length > extLength && invariantFname.substring(invariantFname.length - extLength, invariantFname.length) === invariantExt;
    }

    export function isDTSFile(fname: string) {
        return isFileOfExtension(fname, ".d.ts");
    }

    export function getPathComponents(path: string) {
        return path.split("/");
    }

    var normalizePathRegEx = /^\\\\[^\\]/;
    export function normalizePath(path: string): string {
        // If it's a UNC style path (i.e. \\server\share), convert to a URI style (i.e. file://server/share)
        if (normalizePathRegEx.test(path)) {
            path = "file:" + path;
        }
        var parts = getPathComponents(switchToForwardSlashes(path));
        var normalizedParts: string[] = [];

        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part === ".") {
                continue;
            }

            if (normalizedParts.length > 0 && ArrayUtilities.last(normalizedParts) !== ".." && part === "..") {
                normalizedParts.pop();
                continue;
            }

            normalizedParts.push(part);
        }

        return normalizedParts.join("/");
    }
}