//﻿
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

///<reference path='typescript.ts' />

module TypeScript {

    // We need to catch both left and right quotes
    // (depending on your editor's font, this may not be clear...)    
    export function stripQuotes(str: string) {
        return str.replace("\"", "").replace("'", "").replace("'", "").replace("\"", "")
    }

    export function isQuoted(str: string) {
        return str.indexOf("\"") != -1 || str.indexOf("'") != -1 || str.indexOf("'") != -1 || str.indexOf("\"") != -1;
    }

    export function quoteStr(str: string) {
        return "\"" + str + "\"";
    }

    export function swapQuotes(str: string) {

        if (str.indexOf("\"") != -1) {
            str = str.replace("\"", "'");
            str = str.replace("\"", "'");
        }
        else {
            str = str.replace("'", "\"");
            str = str.replace("'", "\"");
        }

        return str;
    }

    export function switchToForwardSlashes(path: string) {
        return path.replace(/\\/g, "/");
    }

    export function trimModName(modName: string) {
        // in case's it's a declare file...
        if (modName.length > 6 && modName.substring(modName.length - 6, modName.length) == ".d.str") {
            return modName.substring(0, modName.length - 6);
        }
        if (modName.length > 4 && modName.substring(modName.length - 4, modName.length) == ".str") {
            return modName.substring(0, modName.length - 4);
        }
        if (modName.length > 5 && modName.substring(modName.length - 5, modName.length) == ".d.ts") {
            return modName.substring(0, modName.length - 5);
        }
        if (modName.length > 3 && modName.substring(modName.length - 3, modName.length) == ".ts") {
            return modName.substring(0, modName.length - 3);
        }
        // in case's it's a .js file
        if (modName.length > 3 && modName.substring(modName.length - 3, modName.length) == ".js") {
            return modName.substring(0, modName.length - 3);
        }

        return modName;
    }

    export function getDeclareFilePath(fname: string) {
        return isSTRFile(fname) ? changePathToDSTR(fname) : isTSFile(fname) ? changePathToDTS(fname) : changePathToDTS(fname);
    }

    function isFileOfExtension(fname: string, ext: string) {
        var invariantFname = fname.toLocaleUpperCase();
        var invariantExt = ext.toLocaleUpperCase();
        var extLength = invariantExt.length;
        return invariantFname.length > extLength && invariantFname.substring(invariantFname.length - extLength, invariantFname.length) == invariantExt;
    }

    export function isJSFile(fname: string) {
        return isFileOfExtension(fname, ".js");
    }

    export function isSTRFile(fname: string) {
        return isFileOfExtension(fname, ".str");
    }

    export function isTSFile(fname: string) {
        return isFileOfExtension(fname, ".ts");
    }

    export function isDSTRFile(fname: string) {
        return isFileOfExtension(fname, ".d.str");
    }

    export function isDTSFile(fname: string) {
        return isFileOfExtension(fname, ".d.ts");
    }

    export function getPrettyName(modPath: string, quote?=true, treatAsFileName?=false) { 
        var modName = treatAsFileName ? switchToForwardSlashes(modPath) : trimModName(stripQuotes(modPath));
        var components = this.getPathComponents(modName);
        return components.length ? (quote ? quoteStr(components[components.length - 1]) : components[components.length - 1]) : modPath;
    }

    export function getPathComponents(path: string) {
        return path.split("/");
    }

    export function getRelativePathToFixedPath(fixedModFilePath: string, absoluteModPath: string) {
        absoluteModPath = switchToForwardSlashes(absoluteModPath);

        var modComponents = this.getPathComponents(absoluteModPath);
        var fixedModComponents = this.getPathComponents(fixedModFilePath);

        // Find the component that differs
        var joinStartIndex = 0;
        for (; joinStartIndex < modComponents.length && joinStartIndex < fixedModComponents.length ; joinStartIndex++) {
            if (fixedModComponents[joinStartIndex] != modComponents[joinStartIndex]) {
                break;
            }
        }

        // Get the relative path
        if (joinStartIndex != 0) {
            var relativePath = "";
            var relativePathComponents = modComponents.slice(joinStartIndex, modComponents.length);
            for (; joinStartIndex < fixedModComponents.length; joinStartIndex++) {
                if (fixedModComponents[joinStartIndex] != "") {
                    relativePath = relativePath + "../";
                }
            }

            return relativePath + relativePathComponents.join("/");
        }

        return absoluteModPath;
    }

    export function quoteBaseName(modPath: string) {
        var modName = trimModName(stripQuotes(modPath));
        var path = getRootFilePath(modName);
        if (path == "") {
            return modPath;
        }
        else {
            var components = modName.split(path);
            var fileIndex = components.length > 1 ? 1 : 0;
            return quoteStr(components[fileIndex]);
        }
    }

    export function changePathToSTR(modPath: string) {
        return trimModName(stripQuotes(modPath)) + ".str";
    }

    export function changePathToDSTR(modPath: string) {
        return trimModName(stripQuotes(modPath)) + ".d.str";
    }

    export function changePathToTS(modPath: string) {
        return trimModName(stripQuotes(modPath)) + ".ts";
    }

    export function changePathToDTS(modPath: string) {
        return trimModName(stripQuotes(modPath)) + ".d.ts";
    }

    export function isRelative(path: string) {
        return path.charAt(0) == ".";
    }
    export function isRooted(path: string) {
        return path.charAt(0) == "\\" || path.charAt(0) == "/" || (path.indexOf(":\\") != -1) || (path.indexOf(":/") != -1);
    }

    export function getRootFilePath(outFname: string) {
        if (outFname == "") {
            return outFname;
        }
        else {
            var isPath = outFname.indexOf("/") != -1;
            return isPath ? filePath(outFname) : "";
        }
    }

    export function filePathComponents(fullPath: string) {
        fullPath = switchToForwardSlashes(fullPath);
        var components = getPathComponents(fullPath);
        return components.slice(0, components.length - 1);
    }

    export function filePath(fullPath: string) {
        var path = filePathComponents(fullPath);
        return path.join("/") + "/";
    }

    export function normalizeURL(url: string): string {
        var hostDomainAndPortRegex = /^(https?:\/\/[\-\w\.]+(:\d+)?\/)(.*)$/i;
        var matches = hostDomainAndPortRegex.exec(url);
        if (matches) {
            var hostDomainAndPort = matches[1];
            var actualPath = matches[3];
            return hostDomainAndPort + normalizePath(actualPath);
        }
        return normalizePath(url);
    }

    export var pathNormalizeRegExp = /\//g;

    export function normalizePath(path: string): string {
        path = switchToForwardSlashes(path);
        var startedWithSep = path.charAt(0) === "/";
        var parts = this.getPathComponents(path);
        for (var i = 0; i < parts.length; i++) {
            if (parts[i] === "." || parts[i] === "") {
                parts.splice(i, 1);
                i--;
            }
            if (i > 0 && parts[i] === ".." && parts[i - 1] !== "..") {
                parts.splice(i - 1, 2);
                i -= 2;
            }
        }
        return (startedWithSep ? "/" : "") + parts.join("/");
    }

    export function normalizeImportPath(path: string): string {
        return normalizePath(path);
    }
}