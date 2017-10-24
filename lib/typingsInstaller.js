/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ts;
(function (ts) {
    var OperationCanceledException = (function () {
        function OperationCanceledException() {
        }
        return OperationCanceledException;
    }());
    ts.OperationCanceledException = OperationCanceledException;
    var ExitStatus;
    (function (ExitStatus) {
        ExitStatus[ExitStatus["Success"] = 0] = "Success";
        ExitStatus[ExitStatus["DiagnosticsPresent_OutputsSkipped"] = 1] = "DiagnosticsPresent_OutputsSkipped";
        ExitStatus[ExitStatus["DiagnosticsPresent_OutputsGenerated"] = 2] = "DiagnosticsPresent_OutputsGenerated";
    })(ExitStatus = ts.ExitStatus || (ts.ExitStatus = {}));
    var NodeBuilderFlags;
    (function (NodeBuilderFlags) {
        NodeBuilderFlags[NodeBuilderFlags["None"] = 0] = "None";
        NodeBuilderFlags[NodeBuilderFlags["NoTruncation"] = 1] = "NoTruncation";
        NodeBuilderFlags[NodeBuilderFlags["WriteArrayAsGenericType"] = 2] = "WriteArrayAsGenericType";
        NodeBuilderFlags[NodeBuilderFlags["WriteTypeArgumentsOfSignature"] = 32] = "WriteTypeArgumentsOfSignature";
        NodeBuilderFlags[NodeBuilderFlags["UseFullyQualifiedType"] = 64] = "UseFullyQualifiedType";
        NodeBuilderFlags[NodeBuilderFlags["SuppressAnyReturnType"] = 256] = "SuppressAnyReturnType";
        NodeBuilderFlags[NodeBuilderFlags["WriteTypeParametersInQualifiedName"] = 512] = "WriteTypeParametersInQualifiedName";
        NodeBuilderFlags[NodeBuilderFlags["AllowThisInObjectLiteral"] = 1024] = "AllowThisInObjectLiteral";
        NodeBuilderFlags[NodeBuilderFlags["AllowQualifedNameInPlaceOfIdentifier"] = 2048] = "AllowQualifedNameInPlaceOfIdentifier";
        NodeBuilderFlags[NodeBuilderFlags["AllowAnonymousIdentifier"] = 8192] = "AllowAnonymousIdentifier";
        NodeBuilderFlags[NodeBuilderFlags["AllowEmptyUnionOrIntersection"] = 16384] = "AllowEmptyUnionOrIntersection";
        NodeBuilderFlags[NodeBuilderFlags["AllowEmptyTuple"] = 32768] = "AllowEmptyTuple";
        NodeBuilderFlags[NodeBuilderFlags["IgnoreErrors"] = 60416] = "IgnoreErrors";
        NodeBuilderFlags[NodeBuilderFlags["InObjectTypeLiteral"] = 1048576] = "InObjectTypeLiteral";
        NodeBuilderFlags[NodeBuilderFlags["InTypeAlias"] = 8388608] = "InTypeAlias";
    })(NodeBuilderFlags = ts.NodeBuilderFlags || (ts.NodeBuilderFlags = {}));
    var TypeReferenceSerializationKind;
    (function (TypeReferenceSerializationKind) {
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["Unknown"] = 0] = "Unknown";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["TypeWithConstructSignatureAndValue"] = 1] = "TypeWithConstructSignatureAndValue";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["VoidNullableOrNeverType"] = 2] = "VoidNullableOrNeverType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["NumberLikeType"] = 3] = "NumberLikeType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["StringLikeType"] = 4] = "StringLikeType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["BooleanType"] = 5] = "BooleanType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["ArrayLikeType"] = 6] = "ArrayLikeType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["ESSymbolType"] = 7] = "ESSymbolType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["Promise"] = 8] = "Promise";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["TypeWithCallSignature"] = 9] = "TypeWithCallSignature";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["ObjectType"] = 10] = "ObjectType";
    })(TypeReferenceSerializationKind = ts.TypeReferenceSerializationKind || (ts.TypeReferenceSerializationKind = {}));
    var DiagnosticCategory;
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Message"] = 2] = "Message";
    })(DiagnosticCategory = ts.DiagnosticCategory || (ts.DiagnosticCategory = {}));
    var ModuleResolutionKind;
    (function (ModuleResolutionKind) {
        ModuleResolutionKind[ModuleResolutionKind["Classic"] = 1] = "Classic";
        ModuleResolutionKind[ModuleResolutionKind["NodeJs"] = 2] = "NodeJs";
    })(ModuleResolutionKind = ts.ModuleResolutionKind || (ts.ModuleResolutionKind = {}));
    var ModuleKind;
    (function (ModuleKind) {
        ModuleKind[ModuleKind["None"] = 0] = "None";
        ModuleKind[ModuleKind["CommonJS"] = 1] = "CommonJS";
        ModuleKind[ModuleKind["AMD"] = 2] = "AMD";
        ModuleKind[ModuleKind["UMD"] = 3] = "UMD";
        ModuleKind[ModuleKind["System"] = 4] = "System";
        ModuleKind[ModuleKind["ES2015"] = 5] = "ES2015";
        ModuleKind[ModuleKind["ESNext"] = 6] = "ESNext";
    })(ModuleKind = ts.ModuleKind || (ts.ModuleKind = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    ts.timestamp = typeof performance !== "undefined" && performance.now ? function () { return performance.now(); } : Date.now ? Date.now : function () { return +(new Date()); };
})(ts || (ts = {}));
(function (ts) {
    var performance;
    (function (performance) {
        var profilerEvent = typeof onProfilerEvent === "function" && onProfilerEvent.profiler === true
            ? onProfilerEvent
            : function (_markName) { };
        var enabled = false;
        var profilerStart = 0;
        var counts;
        var marks;
        var measures;
        function mark(markName) {
            if (enabled) {
                marks.set(markName, ts.timestamp());
                counts.set(markName, (counts.get(markName) || 0) + 1);
                profilerEvent(markName);
            }
        }
        performance.mark = mark;
        function measure(measureName, startMarkName, endMarkName) {
            if (enabled) {
                var end = endMarkName && marks.get(endMarkName) || ts.timestamp();
                var start = startMarkName && marks.get(startMarkName) || profilerStart;
                measures.set(measureName, (measures.get(measureName) || 0) + (end - start));
            }
        }
        performance.measure = measure;
        function getCount(markName) {
            return counts && counts.get(markName) || 0;
        }
        performance.getCount = getCount;
        function getDuration(measureName) {
            return measures && measures.get(measureName) || 0;
        }
        performance.getDuration = getDuration;
        function forEachMeasure(cb) {
            measures.forEach(function (measure, key) {
                cb(key, measure);
            });
        }
        performance.forEachMeasure = forEachMeasure;
        function enable() {
            counts = ts.createMap();
            marks = ts.createMap();
            measures = ts.createMap();
            enabled = true;
            profilerStart = ts.timestamp();
        }
        performance.enable = enable;
        function disable() {
            enabled = false;
        }
        performance.disable = disable;
    })(performance = ts.performance || (ts.performance = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    ts.versionMajorMinor = "2.6";
    ts.version = ts.versionMajorMinor + ".1";
})(ts || (ts = {}));
(function (ts) {
    function isExternalModuleNameRelative(moduleName) {
        return ts.pathIsRelative(moduleName) || ts.isRootedDiskPath(moduleName);
    }
    ts.isExternalModuleNameRelative = isExternalModuleNameRelative;
})(ts || (ts = {}));
(function (ts) {
    ts.collator = typeof Intl === "object" && typeof Intl.Collator === "function" ? new Intl.Collator(undefined, { usage: "sort", sensitivity: "accent" }) : undefined;
    ts.localeCompareIsCorrect = ts.collator && ts.collator.compare("a", "B") < 0;
    function createDictionaryObject() {
        var map = Object.create(null);
        map.__ = undefined;
        delete map.__;
        return map;
    }
    function createMap() {
        return new MapCtr();
    }
    ts.createMap = createMap;
    function createUnderscoreEscapedMap() {
        return new MapCtr();
    }
    ts.createUnderscoreEscapedMap = createUnderscoreEscapedMap;
    function createSymbolTable(symbols) {
        var result = createMap();
        if (symbols) {
            for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
                var symbol = symbols_1[_i];
                result.set(symbol.escapedName, symbol);
            }
        }
        return result;
    }
    ts.createSymbolTable = createSymbolTable;
    function createMapFromTemplate(template) {
        var map = new MapCtr();
        for (var key in template) {
            if (hasOwnProperty.call(template, key)) {
                map.set(key, template[key]);
            }
        }
        return map;
    }
    ts.createMapFromTemplate = createMapFromTemplate;
    var MapCtr = typeof Map !== "undefined" && "entries" in Map.prototype ? Map : shimMap();
    function shimMap() {
        var MapIterator = (function () {
            function MapIterator(data, selector) {
                this.index = 0;
                this.data = data;
                this.selector = selector;
                this.keys = Object.keys(data);
            }
            MapIterator.prototype.next = function () {
                var index = this.index;
                if (index < this.keys.length) {
                    this.index++;
                    return { value: this.selector(this.data, this.keys[index]), done: false };
                }
                return { value: undefined, done: true };
            };
            return MapIterator;
        }());
        return (function () {
            function class_1() {
                this.data = createDictionaryObject();
                this.size = 0;
            }
            class_1.prototype.get = function (key) {
                return this.data[key];
            };
            class_1.prototype.set = function (key, value) {
                if (!this.has(key)) {
                    this.size++;
                }
                this.data[key] = value;
                return this;
            };
            class_1.prototype.has = function (key) {
                return key in this.data;
            };
            class_1.prototype.delete = function (key) {
                if (this.has(key)) {
                    this.size--;
                    delete this.data[key];
                    return true;
                }
                return false;
            };
            class_1.prototype.clear = function () {
                this.data = createDictionaryObject();
                this.size = 0;
            };
            class_1.prototype.keys = function () {
                return new MapIterator(this.data, function (_data, key) { return key; });
            };
            class_1.prototype.values = function () {
                return new MapIterator(this.data, function (data, key) { return data[key]; });
            };
            class_1.prototype.entries = function () {
                return new MapIterator(this.data, function (data, key) { return [key, data[key]]; });
            };
            class_1.prototype.forEach = function (action) {
                for (var key in this.data) {
                    action(this.data[key], key);
                }
            };
            return class_1;
        }());
    }
    function toPath(fileName, basePath, getCanonicalFileName) {
        var nonCanonicalizedPath = isRootedDiskPath(fileName)
            ? normalizePath(fileName)
            : getNormalizedAbsolutePath(fileName, basePath);
        return getCanonicalFileName(nonCanonicalizedPath);
    }
    ts.toPath = toPath;
    function length(array) {
        return array ? array.length : 0;
    }
    ts.length = length;
    function forEach(array, callback) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
    ts.forEach = forEach;
    function firstDefined(array, callback) {
        for (var i = 0; i < array.length; i++) {
            var result = callback(array[i], i);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }
    ts.firstDefined = firstDefined;
    function findAncestor(node, callback) {
        while (node) {
            var result = callback(node);
            if (result === "quit") {
                return undefined;
            }
            else if (result) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }
    ts.findAncestor = findAncestor;
    function zipWith(arrayA, arrayB, callback) {
        var result = [];
        Debug.assert(arrayA.length === arrayB.length);
        for (var i = 0; i < arrayA.length; i++) {
            result.push(callback(arrayA[i], arrayB[i], i));
        }
        return result;
    }
    ts.zipWith = zipWith;
    function zipToMap(keys, values) {
        Debug.assert(keys.length === values.length);
        var map = createMap();
        for (var i = 0; i < keys.length; ++i) {
            map.set(keys[i], values[i]);
        }
        return map;
    }
    ts.zipToMap = zipToMap;
    function every(array, callback) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (!callback(array[i], i)) {
                    return false;
                }
            }
        }
        return true;
    }
    ts.every = every;
    function find(array, predicate) {
        for (var i = 0; i < array.length; i++) {
            var value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }
    ts.find = find;
    function findLast(array, predicate) {
        for (var i = array.length - 1; i >= 0; i--) {
            var value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }
    ts.findLast = findLast;
    function findIndex(array, predicate) {
        for (var i = 0; i < array.length; i++) {
            if (predicate(array[i], i)) {
                return i;
            }
        }
        return -1;
    }
    ts.findIndex = findIndex;
    function findMap(array, callback) {
        for (var i = 0; i < array.length; i++) {
            var result = callback(array[i], i);
            if (result) {
                return result;
            }
        }
        Debug.fail();
    }
    ts.findMap = findMap;
    function contains(array, value) {
        if (array) {
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var v = array_1[_i];
                if (v === value) {
                    return true;
                }
            }
        }
        return false;
    }
    ts.contains = contains;
    function indexOf(array, value) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }
    ts.indexOf = indexOf;
    function indexOfAnyCharCode(text, charCodes, start) {
        for (var i = start || 0; i < text.length; i++) {
            if (contains(charCodes, text.charCodeAt(i))) {
                return i;
            }
        }
        return -1;
    }
    ts.indexOfAnyCharCode = indexOfAnyCharCode;
    function countWhere(array, predicate) {
        var count = 0;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var v = array[i];
                if (predicate(v, i)) {
                    count++;
                }
            }
        }
        return count;
    }
    ts.countWhere = countWhere;
    function filter(array, f) {
        if (array) {
            var len = array.length;
            var i = 0;
            while (i < len && f(array[i]))
                i++;
            if (i < len) {
                var result = array.slice(0, i);
                i++;
                while (i < len) {
                    var item = array[i];
                    if (f(item)) {
                        result.push(item);
                    }
                    i++;
                }
                return result;
            }
        }
        return array;
    }
    ts.filter = filter;
    function filterMutate(array, f) {
        var outIndex = 0;
        for (var i = 0; i < array.length; i++) {
            if (f(array[i], i, array)) {
                array[outIndex] = array[i];
                outIndex++;
            }
        }
        array.length = outIndex;
    }
    ts.filterMutate = filterMutate;
    function clear(array) {
        array.length = 0;
    }
    ts.clear = clear;
    function map(array, f) {
        var result;
        if (array) {
            result = [];
            for (var i = 0; i < array.length; i++) {
                result.push(f(array[i], i));
            }
        }
        return result;
    }
    ts.map = map;
    function sameMap(array, f) {
        var result;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (result) {
                    result.push(f(array[i], i));
                }
                else {
                    var item = array[i];
                    var mapped = f(item, i);
                    if (item !== mapped) {
                        result = array.slice(0, i);
                        result.push(mapped);
                    }
                }
            }
        }
        return result || array;
    }
    ts.sameMap = sameMap;
    function flatten(array) {
        var result;
        if (array) {
            result = [];
            for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
                var v = array_2[_i];
                if (v) {
                    if (isArray(v)) {
                        addRange(result, v);
                    }
                    else {
                        result.push(v);
                    }
                }
            }
        }
        return result;
    }
    ts.flatten = flatten;
    function flatMap(array, mapfn) {
        var result;
        if (array) {
            result = [];
            for (var i = 0; i < array.length; i++) {
                var v = mapfn(array[i], i);
                if (v) {
                    if (isArray(v)) {
                        addRange(result, v);
                    }
                    else {
                        result.push(v);
                    }
                }
            }
        }
        return result;
    }
    ts.flatMap = flatMap;
    function flatMapIter(iter, mapfn) {
        var result = [];
        while (true) {
            var _a = iter.next(), value = _a.value, done = _a.done;
            if (done)
                break;
            var res = mapfn(value);
            if (res) {
                if (isArray(res)) {
                    result.push.apply(result, res);
                }
                else {
                    result.push(res);
                }
            }
        }
        return result;
    }
    ts.flatMapIter = flatMapIter;
    function sameFlatMap(array, mapfn) {
        var result;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                var mapped = mapfn(item, i);
                if (result || item !== mapped || isArray(mapped)) {
                    if (!result) {
                        result = array.slice(0, i);
                    }
                    if (isArray(mapped)) {
                        addRange(result, mapped);
                    }
                    else {
                        result.push(mapped);
                    }
                }
            }
        }
        return result || array;
    }
    ts.sameFlatMap = sameFlatMap;
    function mapDefined(array, mapFn) {
        var result = [];
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                var mapped = mapFn(item, i);
                if (mapped !== undefined) {
                    result.push(mapped);
                }
            }
        }
        return result;
    }
    ts.mapDefined = mapDefined;
    function mapDefinedIter(iter, mapFn) {
        var result = [];
        while (true) {
            var _a = iter.next(), value = _a.value, done = _a.done;
            if (done)
                break;
            var res = mapFn(value);
            if (res !== undefined) {
                result.push(res);
            }
        }
        return result;
    }
    ts.mapDefinedIter = mapDefinedIter;
    function span(array, f) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (!f(array[i], i)) {
                    return [array.slice(0, i), array.slice(i)];
                }
            }
            return [array.slice(0), []];
        }
        return undefined;
    }
    ts.span = span;
    function spanMap(array, keyfn, mapfn) {
        var result;
        if (array) {
            result = [];
            var len = array.length;
            var previousKey = void 0;
            var key = void 0;
            var start = 0;
            var pos = 0;
            while (start < len) {
                while (pos < len) {
                    var value = array[pos];
                    key = keyfn(value, pos);
                    if (pos === 0) {
                        previousKey = key;
                    }
                    else if (key !== previousKey) {
                        break;
                    }
                    pos++;
                }
                if (start < pos) {
                    var v = mapfn(array.slice(start, pos), previousKey, start, pos);
                    if (v) {
                        result.push(v);
                    }
                    start = pos;
                }
                previousKey = key;
                pos++;
            }
        }
        return result;
    }
    ts.spanMap = spanMap;
    function mapEntries(map, f) {
        if (!map) {
            return undefined;
        }
        var result = createMap();
        map.forEach(function (value, key) {
            var _a = f(key, value), newKey = _a[0], newValue = _a[1];
            result.set(newKey, newValue);
        });
        return result;
    }
    ts.mapEntries = mapEntries;
    function some(array, predicate) {
        if (array) {
            if (predicate) {
                for (var _i = 0, array_3 = array; _i < array_3.length; _i++) {
                    var v = array_3[_i];
                    if (predicate(v)) {
                        return true;
                    }
                }
            }
            else {
                return array.length > 0;
            }
        }
        return false;
    }
    ts.some = some;
    function concatenate(array1, array2) {
        if (!some(array2))
            return array1;
        if (!some(array1))
            return array2;
        return array1.concat(array2);
    }
    ts.concatenate = concatenate;
    function deduplicate(array, areEqual) {
        var result;
        if (array) {
            result = [];
            loop: for (var _i = 0, array_4 = array; _i < array_4.length; _i++) {
                var item = array_4[_i];
                for (var _a = 0, result_1 = result; _a < result_1.length; _a++) {
                    var res = result_1[_a];
                    if (areEqual ? areEqual(res, item) : res === item) {
                        continue loop;
                    }
                }
                result.push(item);
            }
        }
        return result;
    }
    ts.deduplicate = deduplicate;
    function arrayIsEqualTo(array1, array2, equaler) {
        if (!array1 || !array2) {
            return array1 === array2;
        }
        if (array1.length !== array2.length) {
            return false;
        }
        for (var i = 0; i < array1.length; i++) {
            var equals = equaler ? equaler(array1[i], array2[i]) : array1[i] === array2[i];
            if (!equals) {
                return false;
            }
        }
        return true;
    }
    ts.arrayIsEqualTo = arrayIsEqualTo;
    function changesAffectModuleResolution(oldOptions, newOptions) {
        return !oldOptions ||
            (oldOptions.module !== newOptions.module) ||
            (oldOptions.moduleResolution !== newOptions.moduleResolution) ||
            (oldOptions.noResolve !== newOptions.noResolve) ||
            (oldOptions.target !== newOptions.target) ||
            (oldOptions.noLib !== newOptions.noLib) ||
            (oldOptions.jsx !== newOptions.jsx) ||
            (oldOptions.allowJs !== newOptions.allowJs) ||
            (oldOptions.rootDir !== newOptions.rootDir) ||
            (oldOptions.configFilePath !== newOptions.configFilePath) ||
            (oldOptions.baseUrl !== newOptions.baseUrl) ||
            (oldOptions.maxNodeModuleJsDepth !== newOptions.maxNodeModuleJsDepth) ||
            !arrayIsEqualTo(oldOptions.lib, newOptions.lib) ||
            !arrayIsEqualTo(oldOptions.typeRoots, newOptions.typeRoots) ||
            !arrayIsEqualTo(oldOptions.rootDirs, newOptions.rootDirs) ||
            !equalOwnProperties(oldOptions.paths, newOptions.paths);
    }
    ts.changesAffectModuleResolution = changesAffectModuleResolution;
    function compact(array) {
        var result;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var v = array[i];
                if (result || !v) {
                    if (!result) {
                        result = array.slice(0, i);
                    }
                    if (v) {
                        result.push(v);
                    }
                }
            }
        }
        return result || array;
    }
    ts.compact = compact;
    function relativeComplement(arrayA, arrayB, comparer, offsetA, offsetB) {
        if (comparer === void 0) { comparer = compareValues; }
        if (offsetA === void 0) { offsetA = 0; }
        if (offsetB === void 0) { offsetB = 0; }
        if (!arrayB || !arrayA || arrayB.length === 0 || arrayA.length === 0)
            return arrayB;
        var result = [];
        outer: for (; offsetB < arrayB.length; offsetB++) {
            inner: for (; offsetA < arrayA.length; offsetA++) {
                switch (comparer(arrayB[offsetB], arrayA[offsetA])) {
                    case -1: break inner;
                    case 0: continue outer;
                    case 1: continue inner;
                }
            }
            result.push(arrayB[offsetB]);
        }
        return result;
    }
    ts.relativeComplement = relativeComplement;
    function sum(array, prop) {
        var result = 0;
        for (var _i = 0, array_5 = array; _i < array_5.length; _i++) {
            var v = array_5[_i];
            result += v[prop];
        }
        return result;
    }
    ts.sum = sum;
    function append(to, value) {
        if (value === undefined)
            return to;
        if (to === undefined)
            return [value];
        to.push(value);
        return to;
    }
    ts.append = append;
    function toOffset(array, offset) {
        return offset < 0 ? array.length + offset : offset;
    }
    function addRange(to, from, start, end) {
        if (from === undefined || from.length === 0)
            return to;
        if (to === undefined)
            return from.slice(start, end);
        start = start === undefined ? 0 : toOffset(from, start);
        end = end === undefined ? from.length : toOffset(from, end);
        for (var i = start; i < end && i < from.length; i++) {
            var v = from[i];
            if (v !== undefined) {
                to.push(from[i]);
            }
        }
        return to;
    }
    ts.addRange = addRange;
    function pushIfUnique(array, toAdd) {
        if (contains(array, toAdd)) {
            return false;
        }
        else {
            array.push(toAdd);
            return true;
        }
    }
    ts.pushIfUnique = pushIfUnique;
    function appendIfUnique(array, toAdd) {
        if (array) {
            pushIfUnique(array, toAdd);
            return array;
        }
        else {
            return [toAdd];
        }
    }
    ts.appendIfUnique = appendIfUnique;
    function stableSort(array, comparer) {
        if (comparer === void 0) { comparer = compareValues; }
        return array
            .map(function (_, i) { return i; })
            .sort(function (x, y) { return comparer(array[x], array[y]) || compareValues(x, y); })
            .map(function (i) { return array[i]; });
    }
    ts.stableSort = stableSort;
    function rangeEquals(array1, array2, pos, end) {
        while (pos < end) {
            if (array1[pos] !== array2[pos]) {
                return false;
            }
            pos++;
        }
        return true;
    }
    ts.rangeEquals = rangeEquals;
    function elementAt(array, offset) {
        if (array) {
            offset = toOffset(array, offset);
            if (offset < array.length) {
                return array[offset];
            }
        }
        return undefined;
    }
    ts.elementAt = elementAt;
    function firstOrUndefined(array) {
        return elementAt(array, 0);
    }
    ts.firstOrUndefined = firstOrUndefined;
    function first(array) {
        Debug.assert(array.length !== 0);
        return array[0];
    }
    ts.first = first;
    function lastOrUndefined(array) {
        return elementAt(array, -1);
    }
    ts.lastOrUndefined = lastOrUndefined;
    function last(array) {
        Debug.assert(array.length !== 0);
        return array[array.length - 1];
    }
    ts.last = last;
    function singleOrUndefined(array) {
        return array && array.length === 1
            ? array[0]
            : undefined;
    }
    ts.singleOrUndefined = singleOrUndefined;
    function singleOrMany(array) {
        return array && array.length === 1
            ? array[0]
            : array;
    }
    ts.singleOrMany = singleOrMany;
    function replaceElement(array, index, value) {
        var result = array.slice(0);
        result[index] = value;
        return result;
    }
    ts.replaceElement = replaceElement;
    function binarySearch(array, value, comparer, offset) {
        if (!array || array.length === 0) {
            return -1;
        }
        var low = offset || 0;
        var high = array.length - 1;
        comparer = comparer !== undefined
            ? comparer
            : function (v1, v2) { return (v1 < v2 ? -1 : (v1 > v2 ? 1 : 0)); };
        while (low <= high) {
            var middle = low + ((high - low) >> 1);
            var midValue = array[middle];
            if (comparer(midValue, value) === 0) {
                return middle;
            }
            else if (comparer(midValue, value) > 0) {
                high = middle - 1;
            }
            else {
                low = middle + 1;
            }
        }
        return ~low;
    }
    ts.binarySearch = binarySearch;
    function reduceLeft(array, f, initial, start, count) {
        if (array && array.length > 0) {
            var size = array.length;
            if (size > 0) {
                var pos = start === undefined || start < 0 ? 0 : start;
                var end = count === undefined || pos + count > size - 1 ? size - 1 : pos + count;
                var result = void 0;
                if (arguments.length <= 2) {
                    result = array[pos];
                    pos++;
                }
                else {
                    result = initial;
                }
                while (pos <= end) {
                    result = f(result, array[pos], pos);
                    pos++;
                }
                return result;
            }
        }
        return initial;
    }
    ts.reduceLeft = reduceLeft;
    function reduceRight(array, f, initial, start, count) {
        if (array) {
            var size = array.length;
            if (size > 0) {
                var pos = start === undefined || start > size - 1 ? size - 1 : start;
                var end = count === undefined || pos - count < 0 ? 0 : pos - count;
                var result = void 0;
                if (arguments.length <= 2) {
                    result = array[pos];
                    pos--;
                }
                else {
                    result = initial;
                }
                while (pos >= end) {
                    result = f(result, array[pos], pos);
                    pos--;
                }
                return result;
            }
        }
        return initial;
    }
    ts.reduceRight = reduceRight;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasProperty(map, key) {
        return hasOwnProperty.call(map, key);
    }
    ts.hasProperty = hasProperty;
    function getProperty(map, key) {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }
    ts.getProperty = getProperty;
    function getOwnKeys(map) {
        var keys = [];
        for (var key in map) {
            if (hasOwnProperty.call(map, key)) {
                keys.push(key);
            }
        }
        return keys;
    }
    ts.getOwnKeys = getOwnKeys;
    function getOwnValues(sparseArray) {
        var values = [];
        for (var key in sparseArray) {
            if (hasOwnProperty.call(sparseArray, key)) {
                values.push(sparseArray[key]);
            }
        }
        return values;
    }
    ts.getOwnValues = getOwnValues;
    function arrayFrom(iterator, map) {
        var result = [];
        for (var _a = iterator.next(), value = _a.value, done = _a.done; !done; _b = iterator.next(), value = _b.value, done = _b.done, _b) {
            result.push(map ? map(value) : value);
        }
        return result;
        var _b;
    }
    ts.arrayFrom = arrayFrom;
    function forEachEntry(map, callback) {
        var iterator = map.entries();
        for (var _a = iterator.next(), pair = _a.value, done = _a.done; !done; _b = iterator.next(), pair = _b.value, done = _b.done, _b) {
            var key = pair[0], value = pair[1];
            var result = callback(value, key);
            if (result) {
                return result;
            }
        }
        return undefined;
        var _b;
    }
    ts.forEachEntry = forEachEntry;
    function forEachKey(map, callback) {
        var iterator = map.keys();
        for (var _a = iterator.next(), key = _a.value, done = _a.done; !done; _b = iterator.next(), key = _b.value, done = _b.done, _b) {
            var result = callback(key);
            if (result) {
                return result;
            }
        }
        return undefined;
        var _b;
    }
    ts.forEachKey = forEachKey;
    function copyEntries(source, target) {
        source.forEach(function (value, key) {
            target.set(key, value);
        });
    }
    ts.copyEntries = copyEntries;
    function assign(t) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            for (var p in arg) {
                if (hasProperty(arg, p)) {
                    t[p] = arg[p];
                }
            }
        }
        return t;
    }
    ts.assign = assign;
    function equalOwnProperties(left, right, equalityComparer) {
        if (left === right)
            return true;
        if (!left || !right)
            return false;
        for (var key in left) {
            if (hasOwnProperty.call(left, key)) {
                if (!hasOwnProperty.call(right, key) === undefined)
                    return false;
                if (equalityComparer ? !equalityComparer(left[key], right[key]) : left[key] !== right[key])
                    return false;
            }
        }
        for (var key in right) {
            if (hasOwnProperty.call(right, key)) {
                if (!hasOwnProperty.call(left, key))
                    return false;
            }
        }
        return true;
    }
    ts.equalOwnProperties = equalOwnProperties;
    function arrayToMap(array, makeKey, makeValue) {
        var result = createMap();
        for (var _i = 0, array_6 = array; _i < array_6.length; _i++) {
            var value = array_6[_i];
            result.set(makeKey(value), makeValue ? makeValue(value) : value);
        }
        return result;
    }
    ts.arrayToMap = arrayToMap;
    function arrayToNumericMap(array, makeKey) {
        var result = [];
        for (var _i = 0, array_7 = array; _i < array_7.length; _i++) {
            var value = array_7[_i];
            result[makeKey(value)] = value;
        }
        return result;
    }
    ts.arrayToNumericMap = arrayToNumericMap;
    function arrayToSet(array, makeKey) {
        return arrayToMap(array, makeKey || (function (s) { return s; }), function () { return true; });
    }
    ts.arrayToSet = arrayToSet;
    function cloneMap(map) {
        var clone = createMap();
        copyEntries(map, clone);
        return clone;
    }
    ts.cloneMap = cloneMap;
    function clone(object) {
        var result = {};
        for (var id in object) {
            if (hasOwnProperty.call(object, id)) {
                result[id] = object[id];
            }
        }
        return result;
    }
    ts.clone = clone;
    function extend(first, second) {
        var result = {};
        for (var id in second) {
            if (hasOwnProperty.call(second, id)) {
                result[id] = second[id];
            }
        }
        for (var id in first) {
            if (hasOwnProperty.call(first, id)) {
                result[id] = first[id];
            }
        }
        return result;
    }
    ts.extend = extend;
    function createMultiMap() {
        var map = createMap();
        map.add = multiMapAdd;
        map.remove = multiMapRemove;
        return map;
    }
    ts.createMultiMap = createMultiMap;
    function multiMapAdd(key, value) {
        var values = this.get(key);
        if (values) {
            values.push(value);
        }
        else {
            this.set(key, values = [value]);
        }
        return values;
    }
    function multiMapRemove(key, value) {
        var values = this.get(key);
        if (values) {
            unorderedRemoveItem(values, value);
            if (!values.length) {
                this.delete(key);
            }
        }
    }
    function isArray(value) {
        return Array.isArray ? Array.isArray(value) : value instanceof Array;
    }
    ts.isArray = isArray;
    function isString(text) {
        return typeof text === "string";
    }
    ts.isString = isString;
    function tryCast(value, test) {
        return value !== undefined && test(value) ? value : undefined;
    }
    ts.tryCast = tryCast;
    function cast(value, test) {
        if (value !== undefined && test(value))
            return value;
        Debug.fail("Invalid cast. The supplied value did not pass the test '" + Debug.getFunctionName(test) + "'.");
    }
    ts.cast = cast;
    function noop() { }
    ts.noop = noop;
    function returnFalse() { return false; }
    ts.returnFalse = returnFalse;
    function returnTrue() { return true; }
    ts.returnTrue = returnTrue;
    function identity(x) { return x; }
    ts.identity = identity;
    function notImplemented() {
        throw new Error("Not implemented");
    }
    ts.notImplemented = notImplemented;
    function memoize(callback) {
        var value;
        return function () {
            if (callback) {
                value = callback();
                callback = undefined;
            }
            return value;
        };
    }
    ts.memoize = memoize;
    function chain(a, b, c, d, e) {
        if (e) {
            var args_2 = [];
            for (var i = 0; i < arguments.length; i++) {
                args_2[i] = arguments[i];
            }
            return function (t) { return compose.apply(void 0, map(args_2, function (f) { return f(t); })); };
        }
        else if (d) {
            return function (t) { return compose(a(t), b(t), c(t), d(t)); };
        }
        else if (c) {
            return function (t) { return compose(a(t), b(t), c(t)); };
        }
        else if (b) {
            return function (t) { return compose(a(t), b(t)); };
        }
        else if (a) {
            return function (t) { return compose(a(t)); };
        }
        else {
            return function (_) { return function (u) { return u; }; };
        }
    }
    ts.chain = chain;
    function compose(a, b, c, d, e) {
        if (e) {
            var args_3 = [];
            for (var i = 0; i < arguments.length; i++) {
                args_3[i] = arguments[i];
            }
            return function (t) { return reduceLeft(args_3, function (u, f) { return f(u); }, t); };
        }
        else if (d) {
            return function (t) { return d(c(b(a(t)))); };
        }
        else if (c) {
            return function (t) { return c(b(a(t))); };
        }
        else if (b) {
            return function (t) { return b(a(t)); };
        }
        else if (a) {
            return function (t) { return a(t); };
        }
        else {
            return function (t) { return t; };
        }
    }
    ts.compose = compose;
    function formatStringFromArgs(text, args, baseIndex) {
        baseIndex = baseIndex || 0;
        return text.replace(/{(\d+)}/g, function (_match, index) { return args[+index + baseIndex]; });
    }
    ts.formatStringFromArgs = formatStringFromArgs;
    ts.localizedDiagnosticMessages = undefined;
    function getLocaleSpecificMessage(message) {
        return ts.localizedDiagnosticMessages && ts.localizedDiagnosticMessages[message.key] || message.message;
    }
    ts.getLocaleSpecificMessage = getLocaleSpecificMessage;
    function createFileDiagnostic(file, start, length, message) {
        Debug.assertGreaterThanOrEqual(start, 0);
        Debug.assertGreaterThanOrEqual(length, 0);
        if (file) {
            Debug.assertLessThanOrEqual(start, file.text.length);
            Debug.assertLessThanOrEqual(start + length, file.text.length);
        }
        var text = getLocaleSpecificMessage(message);
        if (arguments.length > 4) {
            text = formatStringFromArgs(text, arguments, 4);
        }
        return {
            file: file,
            start: start,
            length: length,
            messageText: text,
            category: message.category,
            code: message.code,
        };
    }
    ts.createFileDiagnostic = createFileDiagnostic;
    function formatMessage(_dummy, message) {
        var text = getLocaleSpecificMessage(message);
        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }
        return text;
    }
    ts.formatMessage = formatMessage;
    function createCompilerDiagnostic(message) {
        var text = getLocaleSpecificMessage(message);
        if (arguments.length > 1) {
            text = formatStringFromArgs(text, arguments, 1);
        }
        return {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: text,
            category: message.category,
            code: message.code
        };
    }
    ts.createCompilerDiagnostic = createCompilerDiagnostic;
    function createCompilerDiagnosticFromMessageChain(chain) {
        return {
            file: undefined,
            start: undefined,
            length: undefined,
            code: chain.code,
            category: chain.category,
            messageText: chain.next ? chain : chain.messageText
        };
    }
    ts.createCompilerDiagnosticFromMessageChain = createCompilerDiagnosticFromMessageChain;
    function chainDiagnosticMessages(details, message) {
        var text = getLocaleSpecificMessage(message);
        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }
        return {
            messageText: text,
            category: message.category,
            code: message.code,
            next: details
        };
    }
    ts.chainDiagnosticMessages = chainDiagnosticMessages;
    function concatenateDiagnosticMessageChains(headChain, tailChain) {
        var lastChain = headChain;
        while (lastChain.next) {
            lastChain = lastChain.next;
        }
        lastChain.next = tailChain;
        return headChain;
    }
    ts.concatenateDiagnosticMessageChains = concatenateDiagnosticMessageChains;
    function compareValues(a, b) {
        if (a === b)
            return 0;
        if (a === undefined)
            return -1;
        if (b === undefined)
            return 1;
        return a < b ? -1 : 1;
    }
    ts.compareValues = compareValues;
    function compareStrings(a, b, ignoreCase) {
        if (a === b)
            return 0;
        if (a === undefined)
            return -1;
        if (b === undefined)
            return 1;
        if (ignoreCase) {
            if (ts.collator) {
                var result = ts.localeCompareIsCorrect ?
                    ts.collator.compare(a, b) :
                    a.localeCompare(b, undefined, { usage: "sort", sensitivity: "accent" });
                return result < 0 ? -1 : result > 0 ? 1 : 0;
            }
            a = a.toUpperCase();
            b = b.toUpperCase();
            if (a === b)
                return 0;
        }
        return a < b ? -1 : 1;
    }
    ts.compareStrings = compareStrings;
    function compareStringsCaseInsensitive(a, b) {
        return compareStrings(a, b, true);
    }
    ts.compareStringsCaseInsensitive = compareStringsCaseInsensitive;
    function getDiagnosticFileName(diagnostic) {
        return diagnostic.file ? diagnostic.file.fileName : undefined;
    }
    function compareDiagnostics(d1, d2) {
        return compareValues(getDiagnosticFileName(d1), getDiagnosticFileName(d2)) ||
            compareValues(d1.start, d2.start) ||
            compareValues(d1.length, d2.length) ||
            compareValues(d1.code, d2.code) ||
            compareMessageText(d1.messageText, d2.messageText) ||
            0;
    }
    ts.compareDiagnostics = compareDiagnostics;
    function compareMessageText(text1, text2) {
        while (text1 && text2) {
            var string1 = isString(text1) ? text1 : text1.messageText;
            var string2 = isString(text2) ? text2 : text2.messageText;
            var res = compareValues(string1, string2);
            if (res) {
                return res;
            }
            text1 = isString(text1) ? undefined : text1.next;
            text2 = isString(text2) ? undefined : text2.next;
        }
        if (!text1 && !text2) {
            return 0;
        }
        return text1 ? 1 : -1;
    }
    function sortAndDeduplicateDiagnostics(diagnostics) {
        return deduplicateSortedDiagnostics(diagnostics.sort(compareDiagnostics));
    }
    ts.sortAndDeduplicateDiagnostics = sortAndDeduplicateDiagnostics;
    function deduplicateSortedDiagnostics(diagnostics) {
        if (diagnostics.length < 2) {
            return diagnostics;
        }
        var newDiagnostics = [diagnostics[0]];
        var previousDiagnostic = diagnostics[0];
        for (var i = 1; i < diagnostics.length; i++) {
            var currentDiagnostic = diagnostics[i];
            var isDupe = compareDiagnostics(currentDiagnostic, previousDiagnostic) === 0;
            if (!isDupe) {
                newDiagnostics.push(currentDiagnostic);
                previousDiagnostic = currentDiagnostic;
            }
        }
        return newDiagnostics;
    }
    ts.deduplicateSortedDiagnostics = deduplicateSortedDiagnostics;
    function normalizeSlashes(path) {
        return path.replace(/\\/g, "/");
    }
    ts.normalizeSlashes = normalizeSlashes;
    function getRootLength(path) {
        if (path.charCodeAt(0) === 47) {
            if (path.charCodeAt(1) !== 47)
                return 1;
            var p1 = path.indexOf("/", 2);
            if (p1 < 0)
                return 2;
            var p2 = path.indexOf("/", p1 + 1);
            if (p2 < 0)
                return p1 + 1;
            return p2 + 1;
        }
        if (path.charCodeAt(1) === 58) {
            if (path.charCodeAt(2) === 47)
                return 3;
            return 2;
        }
        if (path.lastIndexOf("file:///", 0) === 0) {
            return "file:///".length;
        }
        var idx = path.indexOf("://");
        if (idx !== -1) {
            return idx + "://".length;
        }
        return 0;
    }
    ts.getRootLength = getRootLength;
    ts.directorySeparator = "/";
    var directorySeparatorCharCode = 47;
    function getNormalizedParts(normalizedSlashedPath, rootLength) {
        var parts = normalizedSlashedPath.substr(rootLength).split(ts.directorySeparator);
        var normalized = [];
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            if (part !== ".") {
                if (part === ".." && normalized.length > 0 && lastOrUndefined(normalized) !== "..") {
                    normalized.pop();
                }
                else {
                    if (part) {
                        normalized.push(part);
                    }
                }
            }
        }
        return normalized;
    }
    function normalizePath(path) {
        return normalizePathAndParts(path).path;
    }
    ts.normalizePath = normalizePath;
    function normalizePathAndParts(path) {
        path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        var root = path.substr(0, rootLength);
        var parts = getNormalizedParts(path, rootLength);
        if (parts.length) {
            var joinedParts = root + parts.join(ts.directorySeparator);
            return { path: pathEndsWithDirectorySeparator(path) ? joinedParts + ts.directorySeparator : joinedParts, parts: parts };
        }
        else {
            return { path: root, parts: parts };
        }
    }
    ts.normalizePathAndParts = normalizePathAndParts;
    function pathEndsWithDirectorySeparator(path) {
        return path.charCodeAt(path.length - 1) === directorySeparatorCharCode;
    }
    ts.pathEndsWithDirectorySeparator = pathEndsWithDirectorySeparator;
    function getDirectoryPath(path) {
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(ts.directorySeparator)));
    }
    ts.getDirectoryPath = getDirectoryPath;
    function isUrl(path) {
        return path && !isRootedDiskPath(path) && stringContains(path, "://");
    }
    ts.isUrl = isUrl;
    function pathIsRelative(path) {
        return /^\.\.?($|[\\/])/.test(path);
    }
    ts.pathIsRelative = pathIsRelative;
    function moduleHasNonRelativeName(moduleName) {
        return !ts.isExternalModuleNameRelative(moduleName);
    }
    ts.moduleHasNonRelativeName = moduleHasNonRelativeName;
    function getEmitScriptTarget(compilerOptions) {
        return compilerOptions.target || 0;
    }
    ts.getEmitScriptTarget = getEmitScriptTarget;
    function getEmitModuleKind(compilerOptions) {
        return typeof compilerOptions.module === "number" ?
            compilerOptions.module :
            getEmitScriptTarget(compilerOptions) >= 2 ? ts.ModuleKind.ES2015 : ts.ModuleKind.CommonJS;
    }
    ts.getEmitModuleKind = getEmitModuleKind;
    function getEmitModuleResolutionKind(compilerOptions) {
        var moduleResolution = compilerOptions.moduleResolution;
        if (moduleResolution === undefined) {
            moduleResolution = getEmitModuleKind(compilerOptions) === ts.ModuleKind.CommonJS ? ts.ModuleResolutionKind.NodeJs : ts.ModuleResolutionKind.Classic;
        }
        return moduleResolution;
    }
    ts.getEmitModuleResolutionKind = getEmitModuleResolutionKind;
    function hasZeroOrOneAsteriskCharacter(str) {
        var seenAsterisk = false;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) === 42) {
                if (!seenAsterisk) {
                    seenAsterisk = true;
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }
    ts.hasZeroOrOneAsteriskCharacter = hasZeroOrOneAsteriskCharacter;
    function isRootedDiskPath(path) {
        return path && getRootLength(path) !== 0;
    }
    ts.isRootedDiskPath = isRootedDiskPath;
    function convertToRelativePath(absoluteOrRelativePath, basePath, getCanonicalFileName) {
        return !isRootedDiskPath(absoluteOrRelativePath)
            ? absoluteOrRelativePath
            : getRelativePathToDirectoryOrUrl(basePath, absoluteOrRelativePath, basePath, getCanonicalFileName, false);
    }
    ts.convertToRelativePath = convertToRelativePath;
    function normalizedPathComponents(path, rootLength) {
        var normalizedParts = getNormalizedParts(path, rootLength);
        return [path.substr(0, rootLength)].concat(normalizedParts);
    }
    function getNormalizedPathComponents(path, currentDirectory) {
        path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        if (rootLength === 0) {
            path = combinePaths(normalizeSlashes(currentDirectory), path);
            rootLength = getRootLength(path);
        }
        return normalizedPathComponents(path, rootLength);
    }
    ts.getNormalizedPathComponents = getNormalizedPathComponents;
    function getNormalizedAbsolutePath(fileName, currentDirectory) {
        return getNormalizedPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
    }
    ts.getNormalizedAbsolutePath = getNormalizedAbsolutePath;
    function getNormalizedPathFromPathComponents(pathComponents) {
        if (pathComponents && pathComponents.length) {
            return pathComponents[0] + pathComponents.slice(1).join(ts.directorySeparator);
        }
    }
    ts.getNormalizedPathFromPathComponents = getNormalizedPathFromPathComponents;
    function getNormalizedPathComponentsOfUrl(url) {
        var urlLength = url.length;
        var rootLength = url.indexOf("://") + "://".length;
        while (rootLength < urlLength) {
            if (url.charCodeAt(rootLength) === 47) {
                rootLength++;
            }
            else {
                break;
            }
        }
        if (rootLength === urlLength) {
            return [url];
        }
        var indexOfNextSlash = url.indexOf(ts.directorySeparator, rootLength);
        if (indexOfNextSlash !== -1) {
            rootLength = indexOfNextSlash + 1;
            return normalizedPathComponents(url, rootLength);
        }
        else {
            return [url + ts.directorySeparator];
        }
    }
    function getNormalizedPathOrUrlComponents(pathOrUrl, currentDirectory) {
        if (isUrl(pathOrUrl)) {
            return getNormalizedPathComponentsOfUrl(pathOrUrl);
        }
        else {
            return getNormalizedPathComponents(pathOrUrl, currentDirectory);
        }
    }
    function getRelativePathToDirectoryOrUrl(directoryPathOrUrl, relativeOrAbsolutePath, currentDirectory, getCanonicalFileName, isAbsolutePathAnUrl) {
        var pathComponents = getNormalizedPathOrUrlComponents(relativeOrAbsolutePath, currentDirectory);
        var directoryComponents = getNormalizedPathOrUrlComponents(directoryPathOrUrl, currentDirectory);
        if (directoryComponents.length > 1 && lastOrUndefined(directoryComponents) === "") {
            directoryComponents.pop();
        }
        var joinStartIndex;
        for (joinStartIndex = 0; joinStartIndex < pathComponents.length && joinStartIndex < directoryComponents.length; joinStartIndex++) {
            if (getCanonicalFileName(directoryComponents[joinStartIndex]) !== getCanonicalFileName(pathComponents[joinStartIndex])) {
                break;
            }
        }
        if (joinStartIndex) {
            var relativePath = "";
            var relativePathComponents = pathComponents.slice(joinStartIndex, pathComponents.length);
            for (; joinStartIndex < directoryComponents.length; joinStartIndex++) {
                if (directoryComponents[joinStartIndex] !== "") {
                    relativePath = relativePath + ".." + ts.directorySeparator;
                }
            }
            return relativePath + relativePathComponents.join(ts.directorySeparator);
        }
        var absolutePath = getNormalizedPathFromPathComponents(pathComponents);
        if (isAbsolutePathAnUrl && isRootedDiskPath(absolutePath)) {
            absolutePath = "file:///" + absolutePath;
        }
        return absolutePath;
    }
    ts.getRelativePathToDirectoryOrUrl = getRelativePathToDirectoryOrUrl;
    function getBaseFileName(path) {
        if (path === undefined) {
            return undefined;
        }
        var i = path.lastIndexOf(ts.directorySeparator);
        return i < 0 ? path : path.substring(i + 1);
    }
    ts.getBaseFileName = getBaseFileName;
    function combinePaths(path1, path2) {
        if (!(path1 && path1.length))
            return path2;
        if (!(path2 && path2.length))
            return path1;
        if (getRootLength(path2) !== 0)
            return path2;
        if (path1.charAt(path1.length - 1) === ts.directorySeparator)
            return path1 + path2;
        return path1 + ts.directorySeparator + path2;
    }
    ts.combinePaths = combinePaths;
    function removeTrailingDirectorySeparator(path) {
        if (path.charAt(path.length - 1) === ts.directorySeparator) {
            return path.substr(0, path.length - 1);
        }
        return path;
    }
    ts.removeTrailingDirectorySeparator = removeTrailingDirectorySeparator;
    function ensureTrailingDirectorySeparator(path) {
        if (path.charAt(path.length - 1) !== ts.directorySeparator) {
            return path + ts.directorySeparator;
        }
        return path;
    }
    ts.ensureTrailingDirectorySeparator = ensureTrailingDirectorySeparator;
    function comparePaths(a, b, currentDirectory, ignoreCase) {
        if (a === b)
            return 0;
        if (a === undefined)
            return -1;
        if (b === undefined)
            return 1;
        a = removeTrailingDirectorySeparator(a);
        b = removeTrailingDirectorySeparator(b);
        var aComponents = getNormalizedPathComponents(a, currentDirectory);
        var bComponents = getNormalizedPathComponents(b, currentDirectory);
        var sharedLength = Math.min(aComponents.length, bComponents.length);
        for (var i = 0; i < sharedLength; i++) {
            var result = compareStrings(aComponents[i], bComponents[i], ignoreCase);
            if (result !== 0) {
                return result;
            }
        }
        return compareValues(aComponents.length, bComponents.length);
    }
    ts.comparePaths = comparePaths;
    function containsPath(parent, child, currentDirectory, ignoreCase) {
        if (parent === undefined || child === undefined)
            return false;
        if (parent === child)
            return true;
        parent = removeTrailingDirectorySeparator(parent);
        child = removeTrailingDirectorySeparator(child);
        if (parent === child)
            return true;
        var parentComponents = getNormalizedPathComponents(parent, currentDirectory);
        var childComponents = getNormalizedPathComponents(child, currentDirectory);
        if (childComponents.length < parentComponents.length) {
            return false;
        }
        for (var i = 0; i < parentComponents.length; i++) {
            var result = compareStrings(parentComponents[i], childComponents[i], ignoreCase);
            if (result !== 0) {
                return false;
            }
        }
        return true;
    }
    ts.containsPath = containsPath;
    function startsWith(str, prefix) {
        return str.lastIndexOf(prefix, 0) === 0;
    }
    ts.startsWith = startsWith;
    function removePrefix(str, prefix) {
        return startsWith(str, prefix) ? str.substr(prefix.length) : str;
    }
    ts.removePrefix = removePrefix;
    function endsWith(str, suffix) {
        var expectedPos = str.length - suffix.length;
        return expectedPos >= 0 && str.indexOf(suffix, expectedPos) === expectedPos;
    }
    ts.endsWith = endsWith;
    function stringContains(str, substring) {
        return str.indexOf(substring) !== -1;
    }
    ts.stringContains = stringContains;
    function hasExtension(fileName) {
        return stringContains(getBaseFileName(fileName), ".");
    }
    ts.hasExtension = hasExtension;
    function fileExtensionIs(path, extension) {
        return path.length > extension.length && endsWith(path, extension);
    }
    ts.fileExtensionIs = fileExtensionIs;
    function fileExtensionIsOneOf(path, extensions) {
        for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
            var extension = extensions_1[_i];
            if (fileExtensionIs(path, extension)) {
                return true;
            }
        }
        return false;
    }
    ts.fileExtensionIsOneOf = fileExtensionIsOneOf;
    var reservedCharacterPattern = /[^\w\s\/]/g;
    var wildcardCharCodes = [42, 63];
    ts.commonPackageFolders = ["node_modules", "bower_components", "jspm_packages"];
    var implicitExcludePathRegexPattern = "(?!(" + ts.commonPackageFolders.join("|") + ")(/|$))";
    var filesMatcher = {
        singleAsteriskRegexFragment: "([^./]|(\\.(?!min\\.js$))?)*",
        doubleAsteriskRegexFragment: "(/" + implicitExcludePathRegexPattern + "[^/.][^/]*)*?",
        replaceWildcardCharacter: function (match) { return replaceWildcardCharacter(match, filesMatcher.singleAsteriskRegexFragment); }
    };
    var directoriesMatcher = {
        singleAsteriskRegexFragment: "[^/]*",
        doubleAsteriskRegexFragment: "(/" + implicitExcludePathRegexPattern + "[^/.][^/]*)*?",
        replaceWildcardCharacter: function (match) { return replaceWildcardCharacter(match, directoriesMatcher.singleAsteriskRegexFragment); }
    };
    var excludeMatcher = {
        singleAsteriskRegexFragment: "[^/]*",
        doubleAsteriskRegexFragment: "(/.+?)?",
        replaceWildcardCharacter: function (match) { return replaceWildcardCharacter(match, excludeMatcher.singleAsteriskRegexFragment); }
    };
    var wildcardMatchers = {
        files: filesMatcher,
        directories: directoriesMatcher,
        exclude: excludeMatcher
    };
    function getRegularExpressionForWildcard(specs, basePath, usage) {
        var patterns = getRegularExpressionsForWildcards(specs, basePath, usage);
        if (!patterns || !patterns.length) {
            return undefined;
        }
        var pattern = patterns.map(function (pattern) { return "(" + pattern + ")"; }).join("|");
        var terminator = usage === "exclude" ? "($|/)" : "$";
        return "^(" + pattern + ")" + terminator;
    }
    ts.getRegularExpressionForWildcard = getRegularExpressionForWildcard;
    function getRegularExpressionsForWildcards(specs, basePath, usage) {
        if (specs === undefined || specs.length === 0) {
            return undefined;
        }
        return flatMap(specs, function (spec) {
            return spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]);
        });
    }
    function isImplicitGlob(lastPathComponent) {
        return !/[.*?]/.test(lastPathComponent);
    }
    ts.isImplicitGlob = isImplicitGlob;
    function getSubPatternFromSpec(spec, basePath, usage, _a) {
        var singleAsteriskRegexFragment = _a.singleAsteriskRegexFragment, doubleAsteriskRegexFragment = _a.doubleAsteriskRegexFragment, replaceWildcardCharacter = _a.replaceWildcardCharacter;
        var subpattern = "";
        var hasRecursiveDirectoryWildcard = false;
        var hasWrittenComponent = false;
        var components = getNormalizedPathComponents(spec, basePath);
        var lastComponent = lastOrUndefined(components);
        if (usage !== "exclude" && lastComponent === "**") {
            return undefined;
        }
        components[0] = removeTrailingDirectorySeparator(components[0]);
        if (isImplicitGlob(lastComponent)) {
            components.push("**", "*");
        }
        var optionalCount = 0;
        for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
            var component = components_1[_i];
            if (component === "**") {
                if (hasRecursiveDirectoryWildcard) {
                    return undefined;
                }
                subpattern += doubleAsteriskRegexFragment;
                hasRecursiveDirectoryWildcard = true;
            }
            else {
                if (usage === "directories") {
                    subpattern += "(";
                    optionalCount++;
                }
                if (hasWrittenComponent) {
                    subpattern += ts.directorySeparator;
                }
                if (usage !== "exclude") {
                    var componentPattern = "";
                    if (component.charCodeAt(0) === 42) {
                        componentPattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                        component = component.substr(1);
                    }
                    else if (component.charCodeAt(0) === 63) {
                        componentPattern += "[^./]";
                        component = component.substr(1);
                    }
                    componentPattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);
                    if (componentPattern !== component) {
                        subpattern += implicitExcludePathRegexPattern;
                    }
                    subpattern += componentPattern;
                }
                else {
                    subpattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);
                }
            }
            hasWrittenComponent = true;
        }
        while (optionalCount > 0) {
            subpattern += ")?";
            optionalCount--;
        }
        return subpattern;
    }
    function replaceWildcardCharacter(match, singleAsteriskRegexFragment) {
        return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
    }
    function getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory) {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);
        var absolutePath = combinePaths(currentDirectory, path);
        return {
            includeFilePatterns: map(getRegularExpressionsForWildcards(includes, absolutePath, "files"), function (pattern) { return "^" + pattern + "$"; }),
            includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
            includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
            excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
            basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
        };
    }
    ts.getFileMatcherPatterns = getFileMatcherPatterns;
    function matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory, depth, getFileSystemEntries) {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);
        var patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);
        var regexFlag = useCaseSensitiveFileNames ? "" : "i";
        var includeFileRegexes = patterns.includeFilePatterns && patterns.includeFilePatterns.map(function (pattern) { return new RegExp(pattern, regexFlag); });
        var includeDirectoryRegex = patterns.includeDirectoryPattern && new RegExp(patterns.includeDirectoryPattern, regexFlag);
        var excludeRegex = patterns.excludePattern && new RegExp(patterns.excludePattern, regexFlag);
        var results = includeFileRegexes ? includeFileRegexes.map(function () { return []; }) : [[]];
        var comparer = useCaseSensitiveFileNames ? compareStrings : compareStringsCaseInsensitive;
        for (var _i = 0, _a = patterns.basePaths; _i < _a.length; _i++) {
            var basePath = _a[_i];
            visitDirectory(basePath, combinePaths(currentDirectory, basePath), depth);
        }
        return flatten(results);
        function visitDirectory(path, absolutePath, depth) {
            var _a = getFileSystemEntries(path), files = _a.files, directories = _a.directories;
            files = files.slice().sort(comparer);
            var _loop_1 = function (current) {
                var name = combinePaths(path, current);
                var absoluteName = combinePaths(absolutePath, current);
                if (extensions && !fileExtensionIsOneOf(name, extensions))
                    return "continue";
                if (excludeRegex && excludeRegex.test(absoluteName))
                    return "continue";
                if (!includeFileRegexes) {
                    results[0].push(name);
                }
                else {
                    var includeIndex = findIndex(includeFileRegexes, function (re) { return re.test(absoluteName); });
                    if (includeIndex !== -1) {
                        results[includeIndex].push(name);
                    }
                }
            };
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var current = files_1[_i];
                _loop_1(current);
            }
            if (depth !== undefined) {
                depth--;
                if (depth === 0) {
                    return;
                }
            }
            directories = directories.slice().sort(comparer);
            for (var _b = 0, directories_1 = directories; _b < directories_1.length; _b++) {
                var current = directories_1[_b];
                var name = combinePaths(path, current);
                var absoluteName = combinePaths(absolutePath, current);
                if ((!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
                    (!excludeRegex || !excludeRegex.test(absoluteName))) {
                    visitDirectory(name, absoluteName, depth);
                }
            }
        }
    }
    ts.matchFiles = matchFiles;
    function getBasePaths(path, includes, useCaseSensitiveFileNames) {
        var basePaths = [path];
        if (includes) {
            var includeBasePaths = [];
            for (var _i = 0, includes_1 = includes; _i < includes_1.length; _i++) {
                var include = includes_1[_i];
                var absolute = isRootedDiskPath(include) ? include : normalizePath(combinePaths(path, include));
                includeBasePaths.push(getIncludeBasePath(absolute));
            }
            includeBasePaths.sort(useCaseSensitiveFileNames ? compareStrings : compareStringsCaseInsensitive);
            var _loop_2 = function (includeBasePath) {
                if (ts.every(basePaths, function (basePath) { return !containsPath(basePath, includeBasePath, path, !useCaseSensitiveFileNames); })) {
                    basePaths.push(includeBasePath);
                }
            };
            for (var _a = 0, includeBasePaths_1 = includeBasePaths; _a < includeBasePaths_1.length; _a++) {
                var includeBasePath = includeBasePaths_1[_a];
                _loop_2(includeBasePath);
            }
        }
        return basePaths;
    }
    function getIncludeBasePath(absolute) {
        var wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
        if (wildcardOffset < 0) {
            return !hasExtension(absolute)
                ? absolute
                : removeTrailingDirectorySeparator(getDirectoryPath(absolute));
        }
        return absolute.substring(0, absolute.lastIndexOf(ts.directorySeparator, wildcardOffset));
    }
    function ensureScriptKind(fileName, scriptKind) {
        return scriptKind || getScriptKindFromFileName(fileName) || 3;
    }
    ts.ensureScriptKind = ensureScriptKind;
    function getScriptKindFromFileName(fileName) {
        var ext = fileName.substr(fileName.lastIndexOf("."));
        switch (ext.toLowerCase()) {
            case ".js":
                return 1;
            case ".jsx":
                return 2;
            case ".ts":
                return 3;
            case ".tsx":
                return 4;
            case ".json":
                return 6;
            default:
                return 0;
        }
    }
    ts.getScriptKindFromFileName = getScriptKindFromFileName;
    ts.supportedTypeScriptExtensions = [".ts", ".tsx", ".d.ts"];
    ts.supportedTypescriptExtensionsForExtractExtension = [".d.ts", ".ts", ".tsx"];
    ts.supportedJavascriptExtensions = [".js", ".jsx"];
    var allSupportedExtensions = ts.supportedTypeScriptExtensions.concat(ts.supportedJavascriptExtensions);
    function getSupportedExtensions(options, extraFileExtensions) {
        var needAllExtensions = options && options.allowJs;
        if (!extraFileExtensions || extraFileExtensions.length === 0 || !needAllExtensions) {
            return needAllExtensions ? allSupportedExtensions : ts.supportedTypeScriptExtensions;
        }
        return deduplicate(allSupportedExtensions.concat(extraFileExtensions.map(function (e) { return e.extension; })));
    }
    ts.getSupportedExtensions = getSupportedExtensions;
    function hasJavaScriptFileExtension(fileName) {
        return forEach(ts.supportedJavascriptExtensions, function (extension) { return fileExtensionIs(fileName, extension); });
    }
    ts.hasJavaScriptFileExtension = hasJavaScriptFileExtension;
    function hasTypeScriptFileExtension(fileName) {
        return forEach(ts.supportedTypeScriptExtensions, function (extension) { return fileExtensionIs(fileName, extension); });
    }
    ts.hasTypeScriptFileExtension = hasTypeScriptFileExtension;
    function isSupportedSourceFileName(fileName, compilerOptions, extraFileExtensions) {
        if (!fileName) {
            return false;
        }
        for (var _i = 0, _a = getSupportedExtensions(compilerOptions, extraFileExtensions); _i < _a.length; _i++) {
            var extension = _a[_i];
            if (fileExtensionIs(fileName, extension)) {
                return true;
            }
        }
        return false;
    }
    ts.isSupportedSourceFileName = isSupportedSourceFileName;
    function getExtensionPriority(path, supportedExtensions) {
        for (var i = supportedExtensions.length - 1; i >= 0; i--) {
            if (fileExtensionIs(path, supportedExtensions[i])) {
                return adjustExtensionPriority(i, supportedExtensions);
            }
        }
        return 0;
    }
    ts.getExtensionPriority = getExtensionPriority;
    function adjustExtensionPriority(extensionPriority, supportedExtensions) {
        if (extensionPriority < 2) {
            return 0;
        }
        else if (extensionPriority < supportedExtensions.length) {
            return 2;
        }
        else {
            return supportedExtensions.length;
        }
    }
    ts.adjustExtensionPriority = adjustExtensionPriority;
    function getNextLowestExtensionPriority(extensionPriority, supportedExtensions) {
        if (extensionPriority < 2) {
            return 2;
        }
        else {
            return supportedExtensions.length;
        }
    }
    ts.getNextLowestExtensionPriority = getNextLowestExtensionPriority;
    var extensionsToRemove = [".d.ts", ".ts", ".js", ".tsx", ".jsx"];
    function removeFileExtension(path) {
        for (var _i = 0, extensionsToRemove_1 = extensionsToRemove; _i < extensionsToRemove_1.length; _i++) {
            var ext = extensionsToRemove_1[_i];
            var extensionless = tryRemoveExtension(path, ext);
            if (extensionless !== undefined) {
                return extensionless;
            }
        }
        return path;
    }
    ts.removeFileExtension = removeFileExtension;
    function tryRemoveExtension(path, extension) {
        return fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
    }
    ts.tryRemoveExtension = tryRemoveExtension;
    function removeExtension(path, extension) {
        return path.substring(0, path.length - extension.length);
    }
    ts.removeExtension = removeExtension;
    function changeExtension(path, newExtension) {
        return (removeFileExtension(path) + newExtension);
    }
    ts.changeExtension = changeExtension;
    function Symbol(flags, name) {
        this.flags = flags;
        this.escapedName = name;
        this.declarations = undefined;
    }
    function Type(checker, flags) {
        this.flags = flags;
        if (Debug.isDebugging) {
            this.checker = checker;
        }
    }
    function Signature() {
    }
    function Node(kind, pos, end) {
        this.id = 0;
        this.kind = kind;
        this.pos = pos;
        this.end = end;
        this.flags = 0;
        this.modifierFlagsCache = 0;
        this.transformFlags = 0;
        this.parent = undefined;
        this.original = undefined;
    }
    function SourceMapSource(fileName, text, skipTrivia) {
        this.fileName = fileName;
        this.text = text;
        this.skipTrivia = skipTrivia || (function (pos) { return pos; });
    }
    ts.objectAllocator = {
        getNodeConstructor: function () { return Node; },
        getTokenConstructor: function () { return Node; },
        getIdentifierConstructor: function () { return Node; },
        getSourceFileConstructor: function () { return Node; },
        getSymbolConstructor: function () { return Symbol; },
        getTypeConstructor: function () { return Type; },
        getSignatureConstructor: function () { return Signature; },
        getSourceMapSourceConstructor: function () { return SourceMapSource; },
    };
    var Debug;
    (function (Debug) {
        Debug.currentAssertionLevel = 0;
        Debug.isDebugging = false;
        function shouldAssert(level) {
            return Debug.currentAssertionLevel >= level;
        }
        Debug.shouldAssert = shouldAssert;
        function assert(expression, message, verboseDebugInfo, stackCrawlMark) {
            if (!expression) {
                if (verboseDebugInfo) {
                    message += "\r\nVerbose Debug Information: " + (typeof verboseDebugInfo === "string" ? verboseDebugInfo : verboseDebugInfo());
                }
                fail(message ? "False expression: " + message : "False expression.", stackCrawlMark || assert);
            }
        }
        Debug.assert = assert;
        function assertEqual(a, b, msg, msg2) {
            if (a !== b) {
                var message = msg ? msg2 ? msg + " " + msg2 : msg : "";
                fail("Expected " + a + " === " + b + ". " + message);
            }
        }
        Debug.assertEqual = assertEqual;
        function assertLessThan(a, b, msg) {
            if (a >= b) {
                fail("Expected " + a + " < " + b + ". " + (msg || ""));
            }
        }
        Debug.assertLessThan = assertLessThan;
        function assertLessThanOrEqual(a, b) {
            if (a > b) {
                fail("Expected " + a + " <= " + b);
            }
        }
        Debug.assertLessThanOrEqual = assertLessThanOrEqual;
        function assertGreaterThanOrEqual(a, b) {
            if (a < b) {
                fail("Expected " + a + " >= " + b);
            }
        }
        Debug.assertGreaterThanOrEqual = assertGreaterThanOrEqual;
        function fail(message, stackCrawlMark) {
            debugger;
            var e = new Error(message ? "Debug Failure. " + message : "Debug Failure.");
            if (Error.captureStackTrace) {
                Error.captureStackTrace(e, stackCrawlMark || fail);
            }
            throw e;
        }
        Debug.fail = fail;
        function assertNever(member, message, stackCrawlMark) {
            return fail(message || "Illegal value: " + member, stackCrawlMark || assertNever);
        }
        Debug.assertNever = assertNever;
        function getFunctionName(func) {
            if (typeof func !== "function") {
                return "";
            }
            else if (func.hasOwnProperty("name")) {
                return func.name;
            }
            else {
                var text = Function.prototype.toString.call(func);
                var match = /^function\s+([\w\$]+)\s*\(/.exec(text);
                return match ? match[1] : "";
            }
        }
        Debug.getFunctionName = getFunctionName;
    })(Debug = ts.Debug || (ts.Debug = {}));
    function orderedRemoveItem(array, item) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                orderedRemoveItemAt(array, i);
                return true;
            }
        }
        return false;
    }
    ts.orderedRemoveItem = orderedRemoveItem;
    function orderedRemoveItemAt(array, index) {
        for (var i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.pop();
    }
    ts.orderedRemoveItemAt = orderedRemoveItemAt;
    function unorderedRemoveItemAt(array, index) {
        array[index] = array[array.length - 1];
        array.pop();
    }
    ts.unorderedRemoveItemAt = unorderedRemoveItemAt;
    function unorderedRemoveItem(array, item) {
        unorderedRemoveFirstItemWhere(array, function (element) { return element === item; });
    }
    ts.unorderedRemoveItem = unorderedRemoveItem;
    function unorderedRemoveFirstItemWhere(array, predicate) {
        for (var i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                unorderedRemoveItemAt(array, i);
                break;
            }
        }
    }
    function createGetCanonicalFileName(useCaseSensitiveFileNames) {
        return useCaseSensitiveFileNames
            ? (function (fileName) { return fileName; })
            : (function (fileName) { return fileName.toLowerCase(); });
    }
    ts.createGetCanonicalFileName = createGetCanonicalFileName;
    function matchPatternOrExact(patternStrings, candidate) {
        var patterns = [];
        for (var _i = 0, patternStrings_1 = patternStrings; _i < patternStrings_1.length; _i++) {
            var patternString = patternStrings_1[_i];
            var pattern = tryParsePattern(patternString);
            if (pattern) {
                patterns.push(pattern);
            }
            else if (patternString === candidate) {
                return patternString;
            }
        }
        return findBestPatternMatch(patterns, function (_) { return _; }, candidate);
    }
    ts.matchPatternOrExact = matchPatternOrExact;
    function patternText(_a) {
        var prefix = _a.prefix, suffix = _a.suffix;
        return prefix + "*" + suffix;
    }
    ts.patternText = patternText;
    function matchedText(pattern, candidate) {
        Debug.assert(isPatternMatch(pattern, candidate));
        return candidate.substr(pattern.prefix.length, candidate.length - pattern.suffix.length);
    }
    ts.matchedText = matchedText;
    function findBestPatternMatch(values, getPattern, candidate) {
        var matchedValue = undefined;
        var longestMatchPrefixLength = -1;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            var pattern = getPattern(v);
            if (isPatternMatch(pattern, candidate) && pattern.prefix.length > longestMatchPrefixLength) {
                longestMatchPrefixLength = pattern.prefix.length;
                matchedValue = v;
            }
        }
        return matchedValue;
    }
    ts.findBestPatternMatch = findBestPatternMatch;
    function isPatternMatch(_a, candidate) {
        var prefix = _a.prefix, suffix = _a.suffix;
        return candidate.length >= prefix.length + suffix.length &&
            startsWith(candidate, prefix) &&
            endsWith(candidate, suffix);
    }
    function tryParsePattern(pattern) {
        Debug.assert(hasZeroOrOneAsteriskCharacter(pattern));
        var indexOfStar = pattern.indexOf("*");
        return indexOfStar === -1 ? undefined : {
            prefix: pattern.substr(0, indexOfStar),
            suffix: pattern.substr(indexOfStar + 1)
        };
    }
    ts.tryParsePattern = tryParsePattern;
    function positionIsSynthesized(pos) {
        return !(pos >= 0);
    }
    ts.positionIsSynthesized = positionIsSynthesized;
    function extensionIsTypeScript(ext) {
        return ext === ".ts" || ext === ".tsx" || ext === ".d.ts";
    }
    ts.extensionIsTypeScript = extensionIsTypeScript;
    function extensionFromPath(path) {
        var ext = tryGetExtensionFromPath(path);
        if (ext !== undefined) {
            return ext;
        }
        Debug.fail("File " + path + " has unknown extension.");
    }
    ts.extensionFromPath = extensionFromPath;
    function isAnySupportedFileExtension(path) {
        return tryGetExtensionFromPath(path) !== undefined;
    }
    ts.isAnySupportedFileExtension = isAnySupportedFileExtension;
    function tryGetExtensionFromPath(path) {
        return find(ts.supportedTypescriptExtensionsForExtractExtension, function (e) { return fileExtensionIs(path, e); }) || find(ts.supportedJavascriptExtensions, function (e) { return fileExtensionIs(path, e); });
    }
    ts.tryGetExtensionFromPath = tryGetExtensionFromPath;
    function getAnyExtensionFromPath(path) {
        var baseFileName = getBaseFileName(path);
        var extensionIndex = baseFileName.lastIndexOf(".");
        if (extensionIndex >= 0) {
            return baseFileName.substring(extensionIndex);
        }
    }
    ts.getAnyExtensionFromPath = getAnyExtensionFromPath;
    function isCheckJsEnabledForFile(sourceFile, compilerOptions) {
        return sourceFile.checkJsDirective ? sourceFile.checkJsDirective.enabled : compilerOptions.checkJs;
    }
    ts.isCheckJsEnabledForFile = isCheckJsEnabledForFile;
    function and(f, g) {
        return function (arg) { return f(arg) && g(arg); };
    }
    ts.and = and;
    function assertTypeIsNever(_) { }
    ts.assertTypeIsNever = assertTypeIsNever;
    function createCachedDirectoryStructureHost(host) {
        var cachedReadDirectoryResult = createMap();
        var getCurrentDirectory = memoize(function () { return host.getCurrentDirectory(); });
        var getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames);
        return {
            useCaseSensitiveFileNames: host.useCaseSensitiveFileNames,
            newLine: host.newLine,
            readFile: function (path, encoding) { return host.readFile(path, encoding); },
            write: function (s) { return host.write(s); },
            writeFile: writeFile,
            fileExists: fileExists,
            directoryExists: directoryExists,
            createDirectory: createDirectory,
            getCurrentDirectory: getCurrentDirectory,
            getDirectories: getDirectories,
            readDirectory: readDirectory,
            addOrDeleteFileOrDirectory: addOrDeleteFileOrDirectory,
            addOrDeleteFile: addOrDeleteFile,
            clearCache: clearCache,
            exit: function (code) { return host.exit(code); }
        };
        function toPath(fileName) {
            return ts.toPath(fileName, getCurrentDirectory(), getCanonicalFileName);
        }
        function getCachedFileSystemEntries(rootDirPath) {
            return cachedReadDirectoryResult.get(rootDirPath);
        }
        function getCachedFileSystemEntriesForBaseDir(path) {
            return getCachedFileSystemEntries(getDirectoryPath(path));
        }
        function getBaseNameOfFileName(fileName) {
            return getBaseFileName(normalizePath(fileName));
        }
        function createCachedFileSystemEntries(rootDir, rootDirPath) {
            var resultFromHost = {
                files: map(host.readDirectory(rootDir, undefined, undefined, ["*.*"]), getBaseNameOfFileName) || [],
                directories: host.getDirectories(rootDir) || []
            };
            cachedReadDirectoryResult.set(rootDirPath, resultFromHost);
            return resultFromHost;
        }
        function tryReadDirectory(rootDir, rootDirPath) {
            var cachedResult = getCachedFileSystemEntries(rootDirPath);
            if (cachedResult) {
                return cachedResult;
            }
            try {
                return createCachedFileSystemEntries(rootDir, rootDirPath);
            }
            catch (_e) {
                Debug.assert(!cachedReadDirectoryResult.has(rootDirPath));
                return undefined;
            }
        }
        function fileNameEqual(name1, name2) {
            return getCanonicalFileName(name1) === getCanonicalFileName(name2);
        }
        function hasEntry(entries, name) {
            return some(entries, function (file) { return fileNameEqual(file, name); });
        }
        function updateFileSystemEntry(entries, baseName, isValid) {
            if (hasEntry(entries, baseName)) {
                if (!isValid) {
                    return filterMutate(entries, function (entry) { return !fileNameEqual(entry, baseName); });
                }
            }
            else if (isValid) {
                return entries.push(baseName);
            }
        }
        function writeFile(fileName, data, writeByteOrderMark) {
            var path = toPath(fileName);
            var result = getCachedFileSystemEntriesForBaseDir(path);
            if (result) {
                updateFilesOfFileSystemEntry(result, getBaseNameOfFileName(fileName), true);
            }
            return host.writeFile(fileName, data, writeByteOrderMark);
        }
        function fileExists(fileName) {
            var path = toPath(fileName);
            var result = getCachedFileSystemEntriesForBaseDir(path);
            return result && hasEntry(result.files, getBaseNameOfFileName(fileName)) ||
                host.fileExists(fileName);
        }
        function directoryExists(dirPath) {
            var path = toPath(dirPath);
            return cachedReadDirectoryResult.has(path) || host.directoryExists(dirPath);
        }
        function createDirectory(dirPath) {
            var path = toPath(dirPath);
            var result = getCachedFileSystemEntriesForBaseDir(path);
            var baseFileName = getBaseNameOfFileName(dirPath);
            if (result) {
                updateFileSystemEntry(result.directories, baseFileName, true);
            }
            host.createDirectory(dirPath);
        }
        function getDirectories(rootDir) {
            var rootDirPath = toPath(rootDir);
            var result = tryReadDirectory(rootDir, rootDirPath);
            if (result) {
                return result.directories.slice();
            }
            return host.getDirectories(rootDir);
        }
        function readDirectory(rootDir, extensions, excludes, includes, depth) {
            var rootDirPath = toPath(rootDir);
            var result = tryReadDirectory(rootDir, rootDirPath);
            if (result) {
                return matchFiles(rootDir, extensions, excludes, includes, host.useCaseSensitiveFileNames, getCurrentDirectory(), depth, getFileSystemEntries);
            }
            return host.readDirectory(rootDir, extensions, excludes, includes, depth);
            function getFileSystemEntries(dir) {
                var path = toPath(dir);
                if (path === rootDirPath) {
                    return result;
                }
                return getCachedFileSystemEntries(path) || createCachedFileSystemEntries(dir, path);
            }
        }
        function addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath) {
            var existingResult = getCachedFileSystemEntries(fileOrDirectoryPath);
            if (existingResult) {
                if (!host.directoryExists(fileOrDirectory)) {
                    cachedReadDirectoryResult.delete(fileOrDirectoryPath);
                }
            }
            else {
                var parentResult = getCachedFileSystemEntriesForBaseDir(fileOrDirectoryPath);
                if (parentResult) {
                    var baseName = getBaseNameOfFileName(fileOrDirectory);
                    if (parentResult) {
                        var fsQueryResult = {
                            fileExists: host.fileExists(fileOrDirectoryPath),
                            directoryExists: host.directoryExists(fileOrDirectoryPath)
                        };
                        updateFilesOfFileSystemEntry(parentResult, baseName, fsQueryResult.fileExists);
                        updateFileSystemEntry(parentResult.directories, baseName, fsQueryResult.directoryExists);
                        return fsQueryResult;
                    }
                }
            }
        }
        function addOrDeleteFile(fileName, filePath, eventKind) {
            if (eventKind === ts.FileWatcherEventKind.Changed) {
                return;
            }
            var parentResult = getCachedFileSystemEntriesForBaseDir(filePath);
            if (parentResult) {
                updateFilesOfFileSystemEntry(parentResult, getBaseNameOfFileName(fileName), eventKind === ts.FileWatcherEventKind.Created);
            }
        }
        function updateFilesOfFileSystemEntry(parentResult, baseName, fileExists) {
            updateFileSystemEntry(parentResult.files, baseName, fileExists);
        }
        function clearCache() {
            cachedReadDirectoryResult.clear();
        }
    }
    ts.createCachedDirectoryStructureHost = createCachedDirectoryStructureHost;
})(ts || (ts = {}));
var ts;
(function (ts) {
    function setStackTraceLimit() {
        if (Error.stackTraceLimit < 100) {
            Error.stackTraceLimit = 100;
        }
    }
    ts.setStackTraceLimit = setStackTraceLimit;
    var FileWatcherEventKind;
    (function (FileWatcherEventKind) {
        FileWatcherEventKind[FileWatcherEventKind["Created"] = 0] = "Created";
        FileWatcherEventKind[FileWatcherEventKind["Changed"] = 1] = "Changed";
        FileWatcherEventKind[FileWatcherEventKind["Deleted"] = 2] = "Deleted";
    })(FileWatcherEventKind = ts.FileWatcherEventKind || (ts.FileWatcherEventKind = {}));
    function getNodeMajorVersion() {
        if (typeof process === "undefined") {
            return undefined;
        }
        var version = process.version;
        if (!version) {
            return undefined;
        }
        var dot = version.indexOf(".");
        if (dot === -1) {
            return undefined;
        }
        return parseInt(version.substring(1, dot));
    }
    ts.getNodeMajorVersion = getNodeMajorVersion;
    ts.sys = (function () {
        function getNodeSystem() {
            var _fs = require("fs");
            var _path = require("path");
            var _os = require("os");
            var _crypto = require("crypto");
            var useNonPollingWatchers = process.env.TSC_NONPOLLING_WATCHER;
            function createWatchedFileSet() {
                var dirWatchers = ts.createMap();
                var fileWatcherCallbacks = ts.createMultiMap();
                return { addFile: addFile, removeFile: removeFile };
                function reduceDirWatcherRefCountForFile(fileName) {
                    var dirName = ts.getDirectoryPath(fileName);
                    var watcher = dirWatchers.get(dirName);
                    if (watcher) {
                        watcher.referenceCount -= 1;
                        if (watcher.referenceCount <= 0) {
                            watcher.close();
                            dirWatchers.delete(dirName);
                        }
                    }
                }
                function addDirWatcher(dirPath) {
                    var watcher = dirWatchers.get(dirPath);
                    if (watcher) {
                        watcher.referenceCount += 1;
                        return;
                    }
                    watcher = fsWatchDirectory(dirPath || ".", function (eventName, relativeFileName) { return fileEventHandler(eventName, relativeFileName, dirPath); });
                    watcher.referenceCount = 1;
                    dirWatchers.set(dirPath, watcher);
                    return;
                }
                function addFileWatcherCallback(filePath, callback) {
                    fileWatcherCallbacks.add(filePath, callback);
                }
                function addFile(fileName, callback) {
                    addFileWatcherCallback(fileName, callback);
                    addDirWatcher(ts.getDirectoryPath(fileName));
                    return { fileName: fileName, callback: callback };
                }
                function removeFile(watchedFile) {
                    removeFileWatcherCallback(watchedFile.fileName, watchedFile.callback);
                    reduceDirWatcherRefCountForFile(watchedFile.fileName);
                }
                function removeFileWatcherCallback(filePath, callback) {
                    fileWatcherCallbacks.remove(filePath, callback);
                }
                function fileEventHandler(eventName, relativeFileName, baseDirPath) {
                    var fileName = !ts.isString(relativeFileName)
                        ? undefined
                        : ts.getNormalizedAbsolutePath(relativeFileName, baseDirPath);
                    if ((eventName === "change" || eventName === "rename")) {
                        var callbacks = fileWatcherCallbacks.get(fileName);
                        if (callbacks) {
                            for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
                                var fileCallback = callbacks_1[_i];
                                fileCallback(fileName, FileWatcherEventKind.Changed);
                            }
                        }
                    }
                }
            }
            var watchedFileSet = createWatchedFileSet();
            var nodeVersion = getNodeMajorVersion();
            var isNode4OrLater = nodeVersion >= 4;
            function isFileSystemCaseSensitive() {
                if (platform === "win32" || platform === "win64") {
                    return false;
                }
                return !fileExists(swapCase(__filename));
            }
            function swapCase(s) {
                return s.replace(/\w/g, function (ch) {
                    var up = ch.toUpperCase();
                    return ch === up ? ch.toLowerCase() : up;
                });
            }
            var platform = _os.platform();
            var useCaseSensitiveFileNames = isFileSystemCaseSensitive();
            function fsWatchFile(fileName, callback, pollingInterval) {
                _fs.watchFile(fileName, { persistent: true, interval: pollingInterval || 250 }, fileChanged);
                return {
                    close: function () { return _fs.unwatchFile(fileName, fileChanged); }
                };
                function fileChanged(curr, prev) {
                    var isCurrZero = +curr.mtime === 0;
                    var isPrevZero = +prev.mtime === 0;
                    var created = !isCurrZero && isPrevZero;
                    var deleted = isCurrZero && !isPrevZero;
                    var eventKind = created
                        ? FileWatcherEventKind.Created
                        : deleted
                            ? FileWatcherEventKind.Deleted
                            : FileWatcherEventKind.Changed;
                    if (eventKind === FileWatcherEventKind.Changed && +curr.mtime <= +prev.mtime) {
                        return;
                    }
                    callback(fileName, eventKind);
                }
            }
            function fsWatchDirectory(directoryName, callback, recursive) {
                var options;
                var watcher = !directoryExists(directoryName) ?
                    watchMissingDirectory() :
                    watchPresentDirectory();
                return {
                    close: function () {
                        watcher.close();
                    }
                };
                function watchPresentDirectory() {
                    if (options === undefined) {
                        if (isNode4OrLater && (process.platform === "win32" || process.platform === "darwin")) {
                            options = { persistent: true, recursive: !!recursive };
                        }
                        else {
                            options = { persistent: true };
                        }
                    }
                    var dirWatcher = _fs.watch(directoryName, options, callback);
                    dirWatcher.on("error", function () {
                        if (!directoryExists(directoryName)) {
                            watcher = watchMissingDirectory();
                            callback("rename", "");
                        }
                    });
                    return dirWatcher;
                }
                function watchMissingDirectory() {
                    return fsWatchFile(directoryName, function (_fileName, eventKind) {
                        if (eventKind === FileWatcherEventKind.Created && directoryExists(directoryName)) {
                            watcher.close();
                            watcher = watchPresentDirectory();
                            callback("rename", "");
                        }
                    });
                }
            }
            function readFile(fileName, _encoding) {
                if (!fileExists(fileName)) {
                    return undefined;
                }
                var buffer = _fs.readFileSync(fileName);
                var len = buffer.length;
                if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                    len &= ~1;
                    for (var i = 0; i < len; i += 2) {
                        var temp = buffer[i];
                        buffer[i] = buffer[i + 1];
                        buffer[i + 1] = temp;
                    }
                    return buffer.toString("utf16le", 2);
                }
                if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                    return buffer.toString("utf16le", 2);
                }
                if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                    return buffer.toString("utf8", 3);
                }
                return buffer.toString("utf8");
            }
            function writeFile(fileName, data, writeByteOrderMark) {
                if (writeByteOrderMark) {
                    data = "\uFEFF" + data;
                }
                var fd;
                try {
                    fd = _fs.openSync(fileName, "w");
                    _fs.writeSync(fd, data, undefined, "utf8");
                }
                finally {
                    if (fd !== undefined) {
                        _fs.closeSync(fd);
                    }
                }
            }
            function getAccessibleFileSystemEntries(path) {
                try {
                    var entries = _fs.readdirSync(path || ".").sort();
                    var files = [];
                    var directories = [];
                    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                        var entry = entries_1[_i];
                        if (entry === "." || entry === "..") {
                            continue;
                        }
                        var name = ts.combinePaths(path, entry);
                        var stat = void 0;
                        try {
                            stat = _fs.statSync(name);
                        }
                        catch (e) {
                            continue;
                        }
                        if (stat.isFile()) {
                            files.push(entry);
                        }
                        else if (stat.isDirectory()) {
                            directories.push(entry);
                        }
                    }
                    return { files: files, directories: directories };
                }
                catch (e) {
                    return { files: [], directories: [] };
                }
            }
            function readDirectory(path, extensions, excludes, includes, depth) {
                return ts.matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, process.cwd(), depth, getAccessibleFileSystemEntries);
            }
            function fileSystemEntryExists(path, entryKind) {
                try {
                    var stat = _fs.statSync(path);
                    switch (entryKind) {
                        case 0: return stat.isFile();
                        case 1: return stat.isDirectory();
                    }
                }
                catch (e) {
                    return false;
                }
            }
            function fileExists(path) {
                return fileSystemEntryExists(path, 0);
            }
            function directoryExists(path) {
                return fileSystemEntryExists(path, 1);
            }
            function getDirectories(path) {
                return ts.filter(_fs.readdirSync(path), function (dir) { return fileSystemEntryExists(ts.combinePaths(path, dir), 1); });
            }
            var nodeSystem = {
                args: process.argv.slice(2),
                newLine: _os.EOL,
                useCaseSensitiveFileNames: useCaseSensitiveFileNames,
                write: function (s) {
                    process.stdout.write(s);
                },
                readFile: readFile,
                writeFile: writeFile,
                watchFile: function (fileName, callback, pollingInterval) {
                    if (useNonPollingWatchers) {
                        var watchedFile_1 = watchedFileSet.addFile(fileName, callback);
                        return {
                            close: function () { return watchedFileSet.removeFile(watchedFile_1); }
                        };
                    }
                    else {
                        return fsWatchFile(fileName, callback, pollingInterval);
                    }
                },
                watchDirectory: function (directoryName, callback, recursive) {
                    return fsWatchDirectory(directoryName, function (eventName, relativeFileName) {
                        if (eventName === "rename") {
                            callback(!relativeFileName ? relativeFileName : ts.normalizePath(ts.combinePaths(directoryName, relativeFileName)));
                        }
                    }, recursive);
                },
                resolvePath: function (path) { return _path.resolve(path); },
                fileExists: fileExists,
                directoryExists: directoryExists,
                createDirectory: function (directoryName) {
                    if (!nodeSystem.directoryExists(directoryName)) {
                        _fs.mkdirSync(directoryName);
                    }
                },
                getExecutingFilePath: function () {
                    return __filename;
                },
                getCurrentDirectory: function () {
                    return process.cwd();
                },
                getDirectories: getDirectories,
                getEnvironmentVariable: function (name) {
                    return process.env[name] || "";
                },
                readDirectory: readDirectory,
                getModifiedTime: function (path) {
                    try {
                        return _fs.statSync(path).mtime;
                    }
                    catch (e) {
                        return undefined;
                    }
                },
                createHash: function (data) {
                    var hash = _crypto.createHash("md5");
                    hash.update(data);
                    return hash.digest("hex");
                },
                getMemoryUsage: function () {
                    if (global.gc) {
                        global.gc();
                    }
                    return process.memoryUsage().heapUsed;
                },
                getFileSize: function (path) {
                    try {
                        var stat = _fs.statSync(path);
                        if (stat.isFile()) {
                            return stat.size;
                        }
                    }
                    catch (e) { }
                    return 0;
                },
                exit: function (exitCode) {
                    process.exit(exitCode);
                },
                realpath: function (path) {
                    return _fs.realpathSync(path);
                },
                debugMode: ts.some(process.execArgv, function (arg) { return /^--(inspect|debug)(-brk)?(=\d+)?$/i.test(arg); }),
                tryEnableSourceMapsForHost: function () {
                    try {
                        require("source-map-support").install();
                    }
                    catch (e) {
                    }
                },
                setTimeout: setTimeout,
                clearTimeout: clearTimeout
            };
            return nodeSystem;
        }
        function getChakraSystem() {
            var realpath = ChakraHost.realpath && (function (path) { return ChakraHost.realpath(path); });
            return {
                newLine: ChakraHost.newLine || "\r\n",
                args: ChakraHost.args,
                useCaseSensitiveFileNames: !!ChakraHost.useCaseSensitiveFileNames,
                write: ChakraHost.echo,
                readFile: function (path, _encoding) {
                    return ChakraHost.readFile(path);
                },
                writeFile: function (path, data, writeByteOrderMark) {
                    if (writeByteOrderMark) {
                        data = "\uFEFF" + data;
                    }
                    ChakraHost.writeFile(path, data);
                },
                resolvePath: ChakraHost.resolvePath,
                fileExists: ChakraHost.fileExists,
                directoryExists: ChakraHost.directoryExists,
                createDirectory: ChakraHost.createDirectory,
                getExecutingFilePath: function () { return ChakraHost.executingFile; },
                getCurrentDirectory: function () { return ChakraHost.currentDirectory; },
                getDirectories: ChakraHost.getDirectories,
                getEnvironmentVariable: ChakraHost.getEnvironmentVariable || (function () { return ""; }),
                readDirectory: function (path, extensions, excludes, includes, _depth) {
                    var pattern = ts.getFileMatcherPatterns(path, excludes, includes, !!ChakraHost.useCaseSensitiveFileNames, ChakraHost.currentDirectory);
                    return ChakraHost.readDirectory(path, extensions, pattern.basePaths, pattern.excludePattern, pattern.includeFilePattern, pattern.includeDirectoryPattern);
                },
                exit: ChakraHost.quit,
                realpath: realpath
            };
        }
        function recursiveCreateDirectory(directoryPath, sys) {
            var basePath = ts.getDirectoryPath(directoryPath);
            var shouldCreateParent = basePath !== "" && directoryPath !== basePath && !sys.directoryExists(basePath);
            if (shouldCreateParent) {
                recursiveCreateDirectory(basePath, sys);
            }
            if (shouldCreateParent || !sys.directoryExists(directoryPath)) {
                sys.createDirectory(directoryPath);
            }
        }
        var sys;
        if (typeof ChakraHost !== "undefined") {
            sys = getChakraSystem();
        }
        else if (typeof process !== "undefined" && process.nextTick && !process.browser && typeof require !== "undefined") {
            sys = getNodeSystem();
        }
        if (sys) {
            var originalWriteFile_1 = sys.writeFile;
            sys.writeFile = function (path, data, writeBom) {
                var directoryPath = ts.getDirectoryPath(ts.normalizeSlashes(path));
                if (directoryPath && !sys.directoryExists(directoryPath)) {
                    recursiveCreateDirectory(directoryPath, sys);
                }
                originalWriteFile_1.call(sys, path, data, writeBom);
            };
        }
        return sys;
    })();
    if (ts.sys && ts.sys.getEnvironmentVariable) {
        ts.Debug.currentAssertionLevel = /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))
            ? 1
            : 0;
    }
    if (ts.sys && ts.sys.debugMode) {
        ts.Debug.isDebugging = true;
    }
})(ts || (ts = {}));
var ts;
(function (ts) {
    function diag(code, category, key, message) {
        return { code: code, category: category, key: key, message: message };
    }
    ts.Diagnostics = {
        Unterminated_string_literal: diag(1002, ts.DiagnosticCategory.Error, "Unterminated_string_literal_1002", "Unterminated string literal."),
        Identifier_expected: diag(1003, ts.DiagnosticCategory.Error, "Identifier_expected_1003", "Identifier expected."),
        _0_expected: diag(1005, ts.DiagnosticCategory.Error, "_0_expected_1005", "'{0}' expected."),
        A_file_cannot_have_a_reference_to_itself: diag(1006, ts.DiagnosticCategory.Error, "A_file_cannot_have_a_reference_to_itself_1006", "A file cannot have a reference to itself."),
        Trailing_comma_not_allowed: diag(1009, ts.DiagnosticCategory.Error, "Trailing_comma_not_allowed_1009", "Trailing comma not allowed."),
        Asterisk_Slash_expected: diag(1010, ts.DiagnosticCategory.Error, "Asterisk_Slash_expected_1010", "'*/' expected."),
        Unexpected_token: diag(1012, ts.DiagnosticCategory.Error, "Unexpected_token_1012", "Unexpected token."),
        A_rest_parameter_must_be_last_in_a_parameter_list: diag(1014, ts.DiagnosticCategory.Error, "A_rest_parameter_must_be_last_in_a_parameter_list_1014", "A rest parameter must be last in a parameter list."),
        Parameter_cannot_have_question_mark_and_initializer: diag(1015, ts.DiagnosticCategory.Error, "Parameter_cannot_have_question_mark_and_initializer_1015", "Parameter cannot have question mark and initializer."),
        A_required_parameter_cannot_follow_an_optional_parameter: diag(1016, ts.DiagnosticCategory.Error, "A_required_parameter_cannot_follow_an_optional_parameter_1016", "A required parameter cannot follow an optional parameter."),
        An_index_signature_cannot_have_a_rest_parameter: diag(1017, ts.DiagnosticCategory.Error, "An_index_signature_cannot_have_a_rest_parameter_1017", "An index signature cannot have a rest parameter."),
        An_index_signature_parameter_cannot_have_an_accessibility_modifier: diag(1018, ts.DiagnosticCategory.Error, "An_index_signature_parameter_cannot_have_an_accessibility_modifier_1018", "An index signature parameter cannot have an accessibility modifier."),
        An_index_signature_parameter_cannot_have_a_question_mark: diag(1019, ts.DiagnosticCategory.Error, "An_index_signature_parameter_cannot_have_a_question_mark_1019", "An index signature parameter cannot have a question mark."),
        An_index_signature_parameter_cannot_have_an_initializer: diag(1020, ts.DiagnosticCategory.Error, "An_index_signature_parameter_cannot_have_an_initializer_1020", "An index signature parameter cannot have an initializer."),
        An_index_signature_must_have_a_type_annotation: diag(1021, ts.DiagnosticCategory.Error, "An_index_signature_must_have_a_type_annotation_1021", "An index signature must have a type annotation."),
        An_index_signature_parameter_must_have_a_type_annotation: diag(1022, ts.DiagnosticCategory.Error, "An_index_signature_parameter_must_have_a_type_annotation_1022", "An index signature parameter must have a type annotation."),
        An_index_signature_parameter_type_must_be_string_or_number: diag(1023, ts.DiagnosticCategory.Error, "An_index_signature_parameter_type_must_be_string_or_number_1023", "An index signature parameter type must be 'string' or 'number'."),
        readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature: diag(1024, ts.DiagnosticCategory.Error, "readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature_1024", "'readonly' modifier can only appear on a property declaration or index signature."),
        Accessibility_modifier_already_seen: diag(1028, ts.DiagnosticCategory.Error, "Accessibility_modifier_already_seen_1028", "Accessibility modifier already seen."),
        _0_modifier_must_precede_1_modifier: diag(1029, ts.DiagnosticCategory.Error, "_0_modifier_must_precede_1_modifier_1029", "'{0}' modifier must precede '{1}' modifier."),
        _0_modifier_already_seen: diag(1030, ts.DiagnosticCategory.Error, "_0_modifier_already_seen_1030", "'{0}' modifier already seen."),
        _0_modifier_cannot_appear_on_a_class_element: diag(1031, ts.DiagnosticCategory.Error, "_0_modifier_cannot_appear_on_a_class_element_1031", "'{0}' modifier cannot appear on a class element."),
        super_must_be_followed_by_an_argument_list_or_member_access: diag(1034, ts.DiagnosticCategory.Error, "super_must_be_followed_by_an_argument_list_or_member_access_1034", "'super' must be followed by an argument list or member access."),
        Only_ambient_modules_can_use_quoted_names: diag(1035, ts.DiagnosticCategory.Error, "Only_ambient_modules_can_use_quoted_names_1035", "Only ambient modules can use quoted names."),
        Statements_are_not_allowed_in_ambient_contexts: diag(1036, ts.DiagnosticCategory.Error, "Statements_are_not_allowed_in_ambient_contexts_1036", "Statements are not allowed in ambient contexts."),
        A_declare_modifier_cannot_be_used_in_an_already_ambient_context: diag(1038, ts.DiagnosticCategory.Error, "A_declare_modifier_cannot_be_used_in_an_already_ambient_context_1038", "A 'declare' modifier cannot be used in an already ambient context."),
        Initializers_are_not_allowed_in_ambient_contexts: diag(1039, ts.DiagnosticCategory.Error, "Initializers_are_not_allowed_in_ambient_contexts_1039", "Initializers are not allowed in ambient contexts."),
        _0_modifier_cannot_be_used_in_an_ambient_context: diag(1040, ts.DiagnosticCategory.Error, "_0_modifier_cannot_be_used_in_an_ambient_context_1040", "'{0}' modifier cannot be used in an ambient context."),
        _0_modifier_cannot_be_used_with_a_class_declaration: diag(1041, ts.DiagnosticCategory.Error, "_0_modifier_cannot_be_used_with_a_class_declaration_1041", "'{0}' modifier cannot be used with a class declaration."),
        _0_modifier_cannot_be_used_here: diag(1042, ts.DiagnosticCategory.Error, "_0_modifier_cannot_be_used_here_1042", "'{0}' modifier cannot be used here."),
        _0_modifier_cannot_appear_on_a_data_property: diag(1043, ts.DiagnosticCategory.Error, "_0_modifier_cannot_appear_on_a_data_property_1043", "'{0}' modifier cannot appear on a data property."),
        _0_modifier_cannot_appear_on_a_module_or_namespace_element: diag(1044, ts.DiagnosticCategory.Error, "_0_modifier_cannot_appear_on_a_module_or_namespace_element_1044", "'{0}' modifier cannot appear on a module or namespace element."),
        A_0_modifier_cannot_be_used_with_an_interface_declaration: diag(1045, ts.DiagnosticCategory.Error, "A_0_modifier_cannot_be_used_with_an_interface_declaration_1045", "A '{0}' modifier cannot be used with an interface declaration."),
        A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file: diag(1046, ts.DiagnosticCategory.Error, "A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file_1046", "A 'declare' modifier is required for a top level declaration in a .d.ts file."),
        A_rest_parameter_cannot_be_optional: diag(1047, ts.DiagnosticCategory.Error, "A_rest_parameter_cannot_be_optional_1047", "A rest parameter cannot be optional."),
        A_rest_parameter_cannot_have_an_initializer: diag(1048, ts.DiagnosticCategory.Error, "A_rest_parameter_cannot_have_an_initializer_1048", "A rest parameter cannot have an initializer."),
        A_set_accessor_must_have_exactly_one_parameter: diag(1049, ts.DiagnosticCategory.Error, "A_set_accessor_must_have_exactly_one_parameter_1049", "A 'set' accessor must have exactly one parameter."),
        A_set_accessor_cannot_have_an_optional_parameter: diag(1051, ts.DiagnosticCategory.Error, "A_set_accessor_cannot_have_an_optional_parameter_1051", "A 'set' accessor cannot have an optional parameter."),
        A_set_accessor_parameter_cannot_have_an_initializer: diag(1052, ts.DiagnosticCategory.Error, "A_set_accessor_parameter_cannot_have_an_initializer_1052", "A 'set' accessor parameter cannot have an initializer."),
        A_set_accessor_cannot_have_rest_parameter: diag(1053, ts.DiagnosticCategory.Error, "A_set_accessor_cannot_have_rest_parameter_1053", "A 'set' accessor cannot have rest parameter."),
        A_get_accessor_cannot_have_parameters: diag(1054, ts.DiagnosticCategory.Error, "A_get_accessor_cannot_have_parameters_1054", "A 'get' accessor cannot have parameters."),
        Type_0_is_not_a_valid_async_function_return_type_in_ES5_SlashES3_because_it_does_not_refer_to_a_Promise_compatible_constructor_value: diag(1055, ts.DiagnosticCategory.Error, "Type_0_is_not_a_valid_async_function_return_type_in_ES5_SlashES3_because_it_does_not_refer_to_a_Prom_1055", "Type '{0}' is not a valid async function return type in ES5/ES3 because it does not refer to a Promise-compatible constructor value."),
        Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher: diag(1056, ts.DiagnosticCategory.Error, "Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher_1056", "Accessors are only available when targeting ECMAScript 5 and higher."),
        An_async_function_or_method_must_have_a_valid_awaitable_return_type: diag(1057, ts.DiagnosticCategory.Error, "An_async_function_or_method_must_have_a_valid_awaitable_return_type_1057", "An async function or method must have a valid awaitable return type."),
        The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member: diag(1058, ts.DiagnosticCategory.Error, "The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_t_1058", "The return type of an async function must either be a valid promise or must not contain a callable 'then' member."),
        A_promise_must_have_a_then_method: diag(1059, ts.DiagnosticCategory.Error, "A_promise_must_have_a_then_method_1059", "A promise must have a 'then' method."),
        The_first_parameter_of_the_then_method_of_a_promise_must_be_a_callback: diag(1060, ts.DiagnosticCategory.Error, "The_first_parameter_of_the_then_method_of_a_promise_must_be_a_callback_1060", "The first parameter of the 'then' method of a promise must be a callback."),
        Enum_member_must_have_initializer: diag(1061, ts.DiagnosticCategory.Error, "Enum_member_must_have_initializer_1061", "Enum member must have initializer."),
        Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method: diag(1062, ts.DiagnosticCategory.Error, "Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method_1062", "Type is referenced directly or indirectly in the fulfillment callback of its own 'then' method."),
        An_export_assignment_cannot_be_used_in_a_namespace: diag(1063, ts.DiagnosticCategory.Error, "An_export_assignment_cannot_be_used_in_a_namespace_1063", "An export assignment cannot be used in a namespace."),
        The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type: diag(1064, ts.DiagnosticCategory.Error, "The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_1064", "The return type of an async function or method must be the global Promise<T> type."),
        In_ambient_enum_declarations_member_initializer_must_be_constant_expression: diag(1066, ts.DiagnosticCategory.Error, "In_ambient_enum_declarations_member_initializer_must_be_constant_expression_1066", "In ambient enum declarations member initializer must be constant expression."),
        Unexpected_token_A_constructor_method_accessor_or_property_was_expected: diag(1068, ts.DiagnosticCategory.Error, "Unexpected_token_A_constructor_method_accessor_or_property_was_expected_1068", "Unexpected token. A constructor, method, accessor, or property was expected."),
        _0_modifier_cannot_appear_on_a_type_member: diag(1070, ts.DiagnosticCategory.Error, "_0_modifier_cannot_appear_on_a_type_member_1070", "'{0}' modifier cannot appear on a type member."),
        _0_modifier_cannot_appear_on_an_index_signature: diag(1071, ts.DiagnosticCategory.Error, "_0_modifier_cannot_appear_on_an_index_signature_1071", "'{0}' modifier cannot appear on an index signature."),
        A_0_modifier_cannot_be_used_with_an_import_declaration: diag(1079, ts.DiagnosticCategory.Error, "A_0_modifier_cannot_be_used_with_an_import_declaration_1079", "A '{0}' modifier cannot be used with an import declaration."),
        Invalid_reference_directive_syntax: diag(1084, ts.DiagnosticCategory.Error, "Invalid_reference_directive_syntax_1084", "Invalid 'reference' directive syntax."),
        Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher_Use_the_syntax_0: diag(1085, ts.DiagnosticCategory.Error, "Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher_Use_the_syntax_0_1085", "Octal literals are not available when targeting ECMAScript 5 and higher. Use the syntax '{0}'."),
        An_accessor_cannot_be_declared_in_an_ambient_context: diag(1086, ts.DiagnosticCategory.Error, "An_accessor_cannot_be_declared_in_an_ambient_context_1086", "An accessor cannot be declared in an ambient context."),
        _0_modifier_cannot_appear_on_a_constructor_declaration: diag(1089, ts.DiagnosticCategory.Error, "_0_modifier_cannot_appear_on_a_constructor_declaration_1089", "'{0}' modifier cannot appear on a constructor declaration."),
        _0_modifier_cannot_appear_on_a_parameter: diag(1090, ts.DiagnosticCategory.Error, "_0_modifier_cannot_appear_on_a_parameter_1090", "'{0}' modifier cannot appear on a parameter."),
        Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement: diag(1091, ts.DiagnosticCategory.Error, "Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement_1091", "Only a single variable declaration is allowed in a 'for...in' statement."),
        Type_parameters_cannot_appear_on_a_constructor_declaration: diag(1092, ts.DiagnosticCategory.Error, "Type_parameters_cannot_appear_on_a_constructor_declaration_1092", "Type parameters cannot appear on a constructor declaration."),
        Type_annotation_cannot_appear_on_a_constructor_declaration: diag(1093, ts.DiagnosticCategory.Error, "Type_annotation_cannot_appear_on_a_constructor_declaration_1093", "Type annotation cannot appear on a constructor declaration."),
        An_accessor_cannot_have_type_parameters: diag(1094, ts.DiagnosticCategory.Error, "An_accessor_cannot_have_type_parameters_1094", "An accessor cannot have type parameters."),
        A_set_accessor_cannot_have_a_return_type_annotation: diag(1095, ts.DiagnosticCategory.Error, "A_set_accessor_cannot_have_a_return_type_annotation_1095", "A 'set' accessor cannot have a return type annotation."),
        An_index_signature_must_have_exactly_one_parameter: diag(1096, ts.DiagnosticCategory.Error, "An_index_signature_must_have_exactly_one_parameter_1096", "An index signature must have exactly one parameter."),
        _0_list_cannot_be_empty: diag(1097, ts.DiagnosticCategory.Error, "_0_list_cannot_be_empty_1097", "'{0}' list cannot be empty."),
        Type_parameter_list_cannot_be_empty: diag(1098, ts.DiagnosticCategory.Error, "Type_parameter_list_cannot_be_empty_1098", "Type parameter list cannot be empty."),
        Type_argument_list_cannot_be_empty: diag(1099, ts.DiagnosticCategory.Error, "Type_argument_list_cannot_be_empty_1099", "Type argument list cannot be empty."),
        Invalid_use_of_0_in_strict_mode: diag(1100, ts.DiagnosticCategory.Error, "Invalid_use_of_0_in_strict_mode_1100", "Invalid use of '{0}' in strict mode."),
        with_statements_are_not_allowed_in_strict_mode: diag(1101, ts.DiagnosticCategory.Error, "with_statements_are_not_allowed_in_strict_mode_1101", "'with' statements are not allowed in strict mode."),
        delete_cannot_be_called_on_an_identifier_in_strict_mode: diag(1102, ts.DiagnosticCategory.Error, "delete_cannot_be_called_on_an_identifier_in_strict_mode_1102", "'delete' cannot be called on an identifier in strict mode."),
        A_for_await_of_statement_is_only_allowed_within_an_async_function_or_async_generator: diag(1103, ts.DiagnosticCategory.Error, "A_for_await_of_statement_is_only_allowed_within_an_async_function_or_async_generator_1103", "A 'for-await-of' statement is only allowed within an async function or async generator."),
        A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement: diag(1104, ts.DiagnosticCategory.Error, "A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement_1104", "A 'continue' statement can only be used within an enclosing iteration statement."),
        A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement: diag(1105, ts.DiagnosticCategory.Error, "A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement_1105", "A 'break' statement can only be used within an enclosing iteration or switch statement."),
        Jump_target_cannot_cross_function_boundary: diag(1107, ts.DiagnosticCategory.Error, "Jump_target_cannot_cross_function_boundary_1107", "Jump target cannot cross function boundary."),
        A_return_statement_can_only_be_used_within_a_function_body: diag(1108, ts.DiagnosticCategory.Error, "A_return_statement_can_only_be_used_within_a_function_body_1108", "A 'return' statement can only be used within a function body."),
        Expression_expected: diag(1109, ts.DiagnosticCategory.Error, "Expression_expected_1109", "Expression expected."),
        Type_expected: diag(1110, ts.DiagnosticCategory.Error, "Type_expected_1110", "Type expected."),
        A_default_clause_cannot_appear_more_than_once_in_a_switch_statement: diag(1113, ts.DiagnosticCategory.Error, "A_default_clause_cannot_appear_more_than_once_in_a_switch_statement_1113", "A 'default' clause cannot appear more than once in a 'switch' statement."),
        Duplicate_label_0: diag(1114, ts.DiagnosticCategory.Error, "Duplicate_label_0_1114", "Duplicate label '{0}'."),
        A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement: diag(1115, ts.DiagnosticCategory.Error, "A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement_1115", "A 'continue' statement can only jump to a label of an enclosing iteration statement."),
        A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement: diag(1116, ts.DiagnosticCategory.Error, "A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement_1116", "A 'break' statement can only jump to a label of an enclosing statement."),
        An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode: diag(1117, ts.DiagnosticCategory.Error, "An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode_1117", "An object literal cannot have multiple properties with the same name in strict mode."),
        An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name: diag(1118, ts.DiagnosticCategory.Error, "An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name_1118", "An object literal cannot have multiple get/set accessors with the same name."),
        An_object_literal_cannot_have_property_and_accessor_with_the_same_name: diag(1119, ts.DiagnosticCategory.Error, "An_object_literal_cannot_have_property_and_accessor_with_the_same_name_1119", "An object literal cannot have property and accessor with the same name."),
        An_export_assignment_cannot_have_modifiers: diag(1120, ts.DiagnosticCategory.Error, "An_export_assignment_cannot_have_modifiers_1120", "An export assignment cannot have modifiers."),
        Octal_literals_are_not_allowed_in_strict_mode: diag(1121, ts.DiagnosticCategory.Error, "Octal_literals_are_not_allowed_in_strict_mode_1121", "Octal literals are not allowed in strict mode."),
        A_tuple_type_element_list_cannot_be_empty: diag(1122, ts.DiagnosticCategory.Error, "A_tuple_type_element_list_cannot_be_empty_1122", "A tuple type element list cannot be empty."),
        Variable_declaration_list_cannot_be_empty: diag(1123, ts.DiagnosticCategory.Error, "Variable_declaration_list_cannot_be_empty_1123", "Variable declaration list cannot be empty."),
        Digit_expected: diag(1124, ts.DiagnosticCategory.Error, "Digit_expected_1124", "Digit expected."),
        Hexadecimal_digit_expected: diag(1125, ts.DiagnosticCategory.Error, "Hexadecimal_digit_expected_1125", "Hexadecimal digit expected."),
        Unexpected_end_of_text: diag(1126, ts.DiagnosticCategory.Error, "Unexpected_end_of_text_1126", "Unexpected end of text."),
        Invalid_character: diag(1127, ts.DiagnosticCategory.Error, "Invalid_character_1127", "Invalid character."),
        Declaration_or_statement_expected: diag(1128, ts.DiagnosticCategory.Error, "Declaration_or_statement_expected_1128", "Declaration or statement expected."),
        Statement_expected: diag(1129, ts.DiagnosticCategory.Error, "Statement_expected_1129", "Statement expected."),
        case_or_default_expected: diag(1130, ts.DiagnosticCategory.Error, "case_or_default_expected_1130", "'case' or 'default' expected."),
        Property_or_signature_expected: diag(1131, ts.DiagnosticCategory.Error, "Property_or_signature_expected_1131", "Property or signature expected."),
        Enum_member_expected: diag(1132, ts.DiagnosticCategory.Error, "Enum_member_expected_1132", "Enum member expected."),
        Variable_declaration_expected: diag(1134, ts.DiagnosticCategory.Error, "Variable_declaration_expected_1134", "Variable declaration expected."),
        Argument_expression_expected: diag(1135, ts.DiagnosticCategory.Error, "Argument_expression_expected_1135", "Argument expression expected."),
        Property_assignment_expected: diag(1136, ts.DiagnosticCategory.Error, "Property_assignment_expected_1136", "Property assignment expected."),
        Expression_or_comma_expected: diag(1137, ts.DiagnosticCategory.Error, "Expression_or_comma_expected_1137", "Expression or comma expected."),
        Parameter_declaration_expected: diag(1138, ts.DiagnosticCategory.Error, "Parameter_declaration_expected_1138", "Parameter declaration expected."),
        Type_parameter_declaration_expected: diag(1139, ts.DiagnosticCategory.Error, "Type_parameter_declaration_expected_1139", "Type parameter declaration expected."),
        Type_argument_expected: diag(1140, ts.DiagnosticCategory.Error, "Type_argument_expected_1140", "Type argument expected."),
        String_literal_expected: diag(1141, ts.DiagnosticCategory.Error, "String_literal_expected_1141", "String literal expected."),
        Line_break_not_permitted_here: diag(1142, ts.DiagnosticCategory.Error, "Line_break_not_permitted_here_1142", "Line break not permitted here."),
        or_expected: diag(1144, ts.DiagnosticCategory.Error, "or_expected_1144", "'{' or ';' expected."),
        Declaration_expected: diag(1146, ts.DiagnosticCategory.Error, "Declaration_expected_1146", "Declaration expected."),
        Import_declarations_in_a_namespace_cannot_reference_a_module: diag(1147, ts.DiagnosticCategory.Error, "Import_declarations_in_a_namespace_cannot_reference_a_module_1147", "Import declarations in a namespace cannot reference a module."),
        Cannot_use_imports_exports_or_module_augmentations_when_module_is_none: diag(1148, ts.DiagnosticCategory.Error, "Cannot_use_imports_exports_or_module_augmentations_when_module_is_none_1148", "Cannot use imports, exports, or module augmentations when '--module' is 'none'."),
        File_name_0_differs_from_already_included_file_name_1_only_in_casing: diag(1149, ts.DiagnosticCategory.Error, "File_name_0_differs_from_already_included_file_name_1_only_in_casing_1149", "File name '{0}' differs from already included file name '{1}' only in casing."),
        new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead: diag(1150, ts.DiagnosticCategory.Error, "new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead_1150", "'new T[]' cannot be used to create an array. Use 'new Array<T>()' instead."),
        const_declarations_must_be_initialized: diag(1155, ts.DiagnosticCategory.Error, "const_declarations_must_be_initialized_1155", "'const' declarations must be initialized."),
        const_declarations_can_only_be_declared_inside_a_block: diag(1156, ts.DiagnosticCategory.Error, "const_declarations_can_only_be_declared_inside_a_block_1156", "'const' declarations can only be declared inside a block."),
        let_declarations_can_only_be_declared_inside_a_block: diag(1157, ts.DiagnosticCategory.Error, "let_declarations_can_only_be_declared_inside_a_block_1157", "'let' declarations can only be declared inside a block."),
        Unterminated_template_literal: diag(1160, ts.DiagnosticCategory.Error, "Unterminated_template_literal_1160", "Unterminated template literal."),
        Unterminated_regular_expression_literal: diag(1161, ts.DiagnosticCategory.Error, "Unterminated_regular_expression_literal_1161", "Unterminated regular expression literal."),
        An_object_member_cannot_be_declared_optional: diag(1162, ts.DiagnosticCategory.Error, "An_object_member_cannot_be_declared_optional_1162", "An object member cannot be declared optional."),
        A_yield_expression_is_only_allowed_in_a_generator_body: diag(1163, ts.DiagnosticCategory.Error, "A_yield_expression_is_only_allowed_in_a_generator_body_1163", "A 'yield' expression is only allowed in a generator body."),
        Computed_property_names_are_not_allowed_in_enums: diag(1164, ts.DiagnosticCategory.Error, "Computed_property_names_are_not_allowed_in_enums_1164", "Computed property names are not allowed in enums."),
        A_computed_property_name_in_an_ambient_context_must_directly_refer_to_a_built_in_symbol: diag(1165, ts.DiagnosticCategory.Error, "A_computed_property_name_in_an_ambient_context_must_directly_refer_to_a_built_in_symbol_1165", "A computed property name in an ambient context must directly refer to a built-in symbol."),
        A_computed_property_name_in_a_class_property_declaration_must_directly_refer_to_a_built_in_symbol: diag(1166, ts.DiagnosticCategory.Error, "A_computed_property_name_in_a_class_property_declaration_must_directly_refer_to_a_built_in_symbol_1166", "A computed property name in a class property declaration must directly refer to a built-in symbol."),
        A_computed_property_name_in_a_method_overload_must_directly_refer_to_a_built_in_symbol: diag(1168, ts.DiagnosticCategory.Error, "A_computed_property_name_in_a_method_overload_must_directly_refer_to_a_built_in_symbol_1168", "A computed property name in a method overload must directly refer to a built-in symbol."),
        A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol: diag(1169, ts.DiagnosticCategory.Error, "A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol_1169", "A computed property name in an interface must directly refer to a built-in symbol."),
        A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol: diag(1170, ts.DiagnosticCategory.Error, "A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol_1170", "A computed property name in a type literal must directly refer to a built-in symbol."),
        A_comma_expression_is_not_allowed_in_a_computed_property_name: diag(1171, ts.DiagnosticCategory.Error, "A_comma_expression_is_not_allowed_in_a_computed_property_name_1171", "A comma expression is not allowed in a computed property name."),
        extends_clause_already_seen: diag(1172, ts.DiagnosticCategory.Error, "extends_clause_already_seen_1172", "'extends' clause already seen."),
        extends_clause_must_precede_implements_clause: diag(1173, ts.DiagnosticCategory.Error, "extends_clause_must_precede_implements_clause_1173", "'extends' clause must precede 'implements' clause."),
        Classes_can_only_extend_a_single_class: diag(1174, ts.DiagnosticCategory.Error, "Classes_can_only_extend_a_single_class_1174", "Classes can only extend a single class."),
        implements_clause_already_seen: diag(1175, ts.DiagnosticCategory.Error, "implements_clause_already_seen_1175", "'implements' clause already seen."),
        Interface_declaration_cannot_have_implements_clause: diag(1176, ts.DiagnosticCategory.Error, "Interface_declaration_cannot_have_implements_clause_1176", "Interface declaration cannot have 'implements' clause."),
        Binary_digit_expected: diag(1177, ts.DiagnosticCategory.Error, "Binary_digit_expected_1177", "Binary digit expected."),
        Octal_digit_expected: diag(1178, ts.DiagnosticCategory.Error, "Octal_digit_expected_1178", "Octal digit expected."),
        Unexpected_token_expected: diag(1179, ts.DiagnosticCategory.Error, "Unexpected_token_expected_1179", "Unexpected token. '{' expected."),
        Property_destructuring_pattern_expected: diag(1180, ts.DiagnosticCategory.Error, "Property_destructuring_pattern_expected_1180", "Property destructuring pattern expected."),
        Array_element_destructuring_pattern_expected: diag(1181, ts.DiagnosticCategory.Error, "Array_element_destructuring_pattern_expected_1181", "Array element destructuring pattern expected."),
        A_destructuring_declaration_must_have_an_initializer: diag(1182, ts.DiagnosticCategory.Error, "A_destructuring_declaration_must_have_an_initializer_1182", "A destructuring declaration must have an initializer."),
        An_implementation_cannot_be_declared_in_ambient_contexts: diag(1183, ts.DiagnosticCategory.Error, "An_implementation_cannot_be_declared_in_ambient_contexts_1183", "An implementation cannot be declared in ambient contexts."),
        Modifiers_cannot_appear_here: diag(1184, ts.DiagnosticCategory.Error, "Modifiers_cannot_appear_here_1184", "Modifiers cannot appear here."),
        Merge_conflict_marker_encountered: diag(1185, ts.DiagnosticCategory.Error, "Merge_conflict_marker_encountered_1185", "Merge conflict marker encountered."),
        A_rest_element_cannot_have_an_initializer: diag(1186, ts.DiagnosticCategory.Error, "A_rest_element_cannot_have_an_initializer_1186", "A rest element cannot have an initializer."),
        A_parameter_property_may_not_be_declared_using_a_binding_pattern: diag(1187, ts.DiagnosticCategory.Error, "A_parameter_property_may_not_be_declared_using_a_binding_pattern_1187", "A parameter property may not be declared using a binding pattern."),
        Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement: diag(1188, ts.DiagnosticCategory.Error, "Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement_1188", "Only a single variable declaration is allowed in a 'for...of' statement."),
        The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer: diag(1189, ts.DiagnosticCategory.Error, "The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer_1189", "The variable declaration of a 'for...in' statement cannot have an initializer."),
        The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer: diag(1190, ts.DiagnosticCategory.Error, "The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer_1190", "The variable declaration of a 'for...of' statement cannot have an initializer."),
        An_import_declaration_cannot_have_modifiers: diag(1191, ts.DiagnosticCategory.Error, "An_import_declaration_cannot_have_modifiers_1191", "An import declaration cannot have modifiers."),
        Module_0_has_no_default_export: diag(1192, ts.DiagnosticCategory.Error, "Module_0_has_no_default_export_1192", "Module '{0}' has no default export."),
        An_export_declaration_cannot_have_modifiers: diag(1193, ts.DiagnosticCategory.Error, "An_export_declaration_cannot_have_modifiers_1193", "An export declaration cannot have modifiers."),
        Export_declarations_are_not_permitted_in_a_namespace: diag(1194, ts.DiagnosticCategory.Error, "Export_declarations_are_not_permitted_in_a_namespace_1194", "Export declarations are not permitted in a namespace."),
        Catch_clause_variable_cannot_have_a_type_annotation: diag(1196, ts.DiagnosticCategory.Error, "Catch_clause_variable_cannot_have_a_type_annotation_1196", "Catch clause variable cannot have a type annotation."),
        Catch_clause_variable_cannot_have_an_initializer: diag(1197, ts.DiagnosticCategory.Error, "Catch_clause_variable_cannot_have_an_initializer_1197", "Catch clause variable cannot have an initializer."),
        An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive: diag(1198, ts.DiagnosticCategory.Error, "An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive_1198", "An extended Unicode escape value must be between 0x0 and 0x10FFFF inclusive."),
        Unterminated_Unicode_escape_sequence: diag(1199, ts.DiagnosticCategory.Error, "Unterminated_Unicode_escape_sequence_1199", "Unterminated Unicode escape sequence."),
        Line_terminator_not_permitted_before_arrow: diag(1200, ts.DiagnosticCategory.Error, "Line_terminator_not_permitted_before_arrow_1200", "Line terminator not permitted before arrow."),
        Import_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_import_Asterisk_as_ns_from_mod_import_a_from_mod_import_d_from_mod_or_another_module_format_instead: diag(1202, ts.DiagnosticCategory.Error, "Import_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_import_Asterisk_as_1202", "Import assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from \"mod\"', 'import {a} from \"mod\"', 'import d from \"mod\"', or another module format instead."),
        Export_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_export_default_or_another_module_format_instead: diag(1203, ts.DiagnosticCategory.Error, "Export_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_export_default_or__1203", "Export assignment cannot be used when targeting ECMAScript modules. Consider using 'export default' or another module format instead."),
        Cannot_re_export_a_type_when_the_isolatedModules_flag_is_provided: diag(1205, ts.DiagnosticCategory.Error, "Cannot_re_export_a_type_when_the_isolatedModules_flag_is_provided_1205", "Cannot re-export a type when the '--isolatedModules' flag is provided."),
        Decorators_are_not_valid_here: diag(1206, ts.DiagnosticCategory.Error, "Decorators_are_not_valid_here_1206", "Decorators are not valid here."),
        Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name: diag(1207, ts.DiagnosticCategory.Error, "Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name_1207", "Decorators cannot be applied to multiple get/set accessors of the same name."),
        Cannot_compile_namespaces_when_the_isolatedModules_flag_is_provided: diag(1208, ts.DiagnosticCategory.Error, "Cannot_compile_namespaces_when_the_isolatedModules_flag_is_provided_1208", "Cannot compile namespaces when the '--isolatedModules' flag is provided."),
        Ambient_const_enums_are_not_allowed_when_the_isolatedModules_flag_is_provided: diag(1209, ts.DiagnosticCategory.Error, "Ambient_const_enums_are_not_allowed_when_the_isolatedModules_flag_is_provided_1209", "Ambient const enums are not allowed when the '--isolatedModules' flag is provided."),
        Invalid_use_of_0_Class_definitions_are_automatically_in_strict_mode: diag(1210, ts.DiagnosticCategory.Error, "Invalid_use_of_0_Class_definitions_are_automatically_in_strict_mode_1210", "Invalid use of '{0}'. Class definitions are automatically in strict mode."),
        A_class_declaration_without_the_default_modifier_must_have_a_name: diag(1211, ts.DiagnosticCategory.Error, "A_class_declaration_without_the_default_modifier_must_have_a_name_1211", "A class declaration without the 'default' modifier must have a name."),
        Identifier_expected_0_is_a_reserved_word_in_strict_mode: diag(1212, ts.DiagnosticCategory.Error, "Identifier_expected_0_is_a_reserved_word_in_strict_mode_1212", "Identifier expected. '{0}' is a reserved word in strict mode."),
        Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode: diag(1213, ts.DiagnosticCategory.Error, "Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_stric_1213", "Identifier expected. '{0}' is a reserved word in strict mode. Class definitions are automatically in strict mode."),
        Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode: diag(1214, ts.DiagnosticCategory.Error, "Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode_1214", "Identifier expected. '{0}' is a reserved word in strict mode. Modules are automatically in strict mode."),
        Invalid_use_of_0_Modules_are_automatically_in_strict_mode: diag(1215, ts.DiagnosticCategory.Error, "Invalid_use_of_0_Modules_are_automatically_in_strict_mode_1215", "Invalid use of '{0}'. Modules are automatically in strict mode."),
        Identifier_expected_esModule_is_reserved_as_an_exported_marker_when_transforming_ECMAScript_modules: diag(1216, ts.DiagnosticCategory.Error, "Identifier_expected_esModule_is_reserved_as_an_exported_marker_when_transforming_ECMAScript_modules_1216", "Identifier expected. '__esModule' is reserved as an exported marker when transforming ECMAScript modules."),
        Export_assignment_is_not_supported_when_module_flag_is_system: diag(1218, ts.DiagnosticCategory.Error, "Export_assignment_is_not_supported_when_module_flag_is_system_1218", "Export assignment is not supported when '--module' flag is 'system'."),
        Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_the_experimentalDecorators_option_to_remove_this_warning: diag(1219, ts.DiagnosticCategory.Error, "Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_t_1219", "Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning."),
        Generators_are_only_available_when_targeting_ECMAScript_2015_or_higher: diag(1220, ts.DiagnosticCategory.Error, "Generators_are_only_available_when_targeting_ECMAScript_2015_or_higher_1220", "Generators are only available when targeting ECMAScript 2015 or higher."),
        Generators_are_not_allowed_in_an_ambient_context: diag(1221, ts.DiagnosticCategory.Error, "Generators_are_not_allowed_in_an_ambient_context_1221", "Generators are not allowed in an ambient context."),
        An_overload_signature_cannot_be_declared_as_a_generator: diag(1222, ts.DiagnosticCategory.Error, "An_overload_signature_cannot_be_declared_as_a_generator_1222", "An overload signature cannot be declared as a generator."),
        _0_tag_already_specified: diag(1223, ts.DiagnosticCategory.Error, "_0_tag_already_specified_1223", "'{0}' tag already specified."),
        Signature_0_must_be_a_type_predicate: diag(1224, ts.DiagnosticCategory.Error, "Signature_0_must_be_a_type_predicate_1224", "Signature '{0}' must be a type predicate."),
        Cannot_find_parameter_0: diag(1225, ts.DiagnosticCategory.Error, "Cannot_find_parameter_0_1225", "Cannot find parameter '{0}'."),
        Type_predicate_0_is_not_assignable_to_1: diag(1226, ts.DiagnosticCategory.Error, "Type_predicate_0_is_not_assignable_to_1_1226", "Type predicate '{0}' is not assignable to '{1}'."),
        Parameter_0_is_not_in_the_same_position_as_parameter_1: diag(1227, ts.DiagnosticCategory.Error, "Parameter_0_is_not_in_the_same_position_as_parameter_1_1227", "Parameter '{0}' is not in the same position as parameter '{1}'."),
        A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods: diag(1228, ts.DiagnosticCategory.Error, "A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods_1228", "A type predicate is only allowed in return type position for functions and methods."),
        A_type_predicate_cannot_reference_a_rest_parameter: diag(1229, ts.DiagnosticCategory.Error, "A_type_predicate_cannot_reference_a_rest_parameter_1229", "A type predicate cannot reference a rest parameter."),
        A_type_predicate_cannot_reference_element_0_in_a_binding_pattern: diag(1230, ts.DiagnosticCategory.Error, "A_type_predicate_cannot_reference_element_0_in_a_binding_pattern_1230", "A type predicate cannot reference element '{0}' in a binding pattern."),
        An_export_assignment_can_only_be_used_in_a_module: diag(1231, ts.DiagnosticCategory.Error, "An_export_assignment_can_only_be_used_in_a_module_1231", "An export assignment can only be used in a module."),
        An_import_declaration_can_only_be_used_in_a_namespace_or_module: diag(1232, ts.DiagnosticCategory.Error, "An_import_declaration_can_only_be_used_in_a_namespace_or_module_1232", "An import declaration can only be used in a namespace or module."),
        An_export_declaration_can_only_be_used_in_a_module: diag(1233, ts.DiagnosticCategory.Error, "An_export_declaration_can_only_be_used_in_a_module_1233", "An export declaration can only be used in a module."),
        An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file: diag(1234, ts.DiagnosticCategory.Error, "An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file_1234", "An ambient module declaration is only allowed at the top level in a file."),
        A_namespace_declaration_is_only_allowed_in_a_namespace_or_module: diag(1235, ts.DiagnosticCategory.Error, "A_namespace_declaration_is_only_allowed_in_a_namespace_or_module_1235", "A namespace declaration is only allowed in a namespace or module."),
        The_return_type_of_a_property_decorator_function_must_be_either_void_or_any: diag(1236, ts.DiagnosticCategory.Error, "The_return_type_of_a_property_decorator_function_must_be_either_void_or_any_1236", "The return type of a property decorator function must be either 'void' or 'any'."),
        The_return_type_of_a_parameter_decorator_function_must_be_either_void_or_any: diag(1237, ts.DiagnosticCategory.Error, "The_return_type_of_a_parameter_decorator_function_must_be_either_void_or_any_1237", "The return type of a parameter decorator function must be either 'void' or 'any'."),
        Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression: diag(1238, ts.DiagnosticCategory.Error, "Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression_1238", "Unable to resolve signature of class decorator when called as an expression."),
        Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression: diag(1239, ts.DiagnosticCategory.Error, "Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression_1239", "Unable to resolve signature of parameter decorator when called as an expression."),
        Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression: diag(1240, ts.DiagnosticCategory.Error, "Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression_1240", "Unable to resolve signature of property decorator when called as an expression."),
        Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression: diag(1241, ts.DiagnosticCategory.Error, "Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression_1241", "Unable to resolve signature of method decorator when called as an expression."),
        abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration: diag(1242, ts.DiagnosticCategory.Error, "abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration_1242", "'abstract' modifier can only appear on a class, method, or property declaration."),
        _0_modifier_cannot_be_used_with_1_modifier: diag(1243, ts.DiagnosticCategory.Error, "_0_modifier_cannot_be_used_with_1_modifier_1243", "'{0}' modifier cannot be used with '{1}' modifier."),
        Abstract_methods_can_only_appear_within_an_abstract_class: diag(1244, ts.DiagnosticCategory.Error, "Abstract_methods_can_only_appear_within_an_abstract_class_1244", "Abstract methods can only appear within an abstract class."),
        Method_0_cannot_have_an_implementation_because_it_is_marked_abstract: diag(1245, ts.DiagnosticCategory.Error, "Method_0_cannot_have_an_implementation_because_it_is_marked_abstract_1245", "Method '{0}' cannot have an implementation because it is marked abstract."),
        An_interface_property_cannot_have_an_initializer: diag(1246, ts.DiagnosticCategory.Error, "An_interface_property_cannot_have_an_initializer_1246", "An interface property cannot have an initializer."),
        A_type_literal_property_cannot_have_an_initializer: diag(1247, ts.DiagnosticCategory.Error, "A_type_literal_property_cannot_have_an_initializer_1247", "A type literal property cannot have an initializer."),
        A_class_member_cannot_have_the_0_keyword: diag(1248, ts.DiagnosticCategory.Error, "A_class_member_cannot_have_the_0_keyword_1248", "A class member cannot have the '{0}' keyword."),
        A_decorator_can_only_decorate_a_method_implementation_not_an_overload: diag(1249, ts.DiagnosticCategory.Error, "A_decorator_can_only_decorate_a_method_implementation_not_an_overload_1249", "A decorator can only decorate a method implementation, not an overload."),
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5: diag(1250, ts.DiagnosticCategory.Error, "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_1250", "Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'."),
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Class_definitions_are_automatically_in_strict_mode: diag(1251, ts.DiagnosticCategory.Error, "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Class_d_1251", "Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'. Class definitions are automatically in strict mode."),
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Modules_are_automatically_in_strict_mode: diag(1252, ts.DiagnosticCategory.Error, "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Modules_1252", "Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'. Modules are automatically in strict mode."),
        _0_tag_cannot_be_used_independently_as_a_top_level_JSDoc_tag: diag(1253, ts.DiagnosticCategory.Error, "_0_tag_cannot_be_used_independently_as_a_top_level_JSDoc_tag_1253", "'{0}' tag cannot be used independently as a top level JSDoc tag."),
        A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal: diag(1254, ts.DiagnosticCategory.Error, "A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal_1254", "A 'const' initializer in an ambient context must be a string or numeric literal."),
        with_statements_are_not_allowed_in_an_async_function_block: diag(1300, ts.DiagnosticCategory.Error, "with_statements_are_not_allowed_in_an_async_function_block_1300", "'with' statements are not allowed in an async function block."),
        await_expression_is_only_allowed_within_an_async_function: diag(1308, ts.DiagnosticCategory.Error, "await_expression_is_only_allowed_within_an_async_function_1308", "'await' expression is only allowed within an async function."),
        can_only_be_used_in_an_object_literal_property_inside_a_destructuring_assignment: diag(1312, ts.DiagnosticCategory.Error, "can_only_be_used_in_an_object_literal_property_inside_a_destructuring_assignment_1312", "'=' can only be used in an object literal property inside a destructuring assignment."),
        The_body_of_an_if_statement_cannot_be_the_empty_statement: diag(1313, ts.DiagnosticCategory.Error, "The_body_of_an_if_statement_cannot_be_the_empty_statement_1313", "The body of an 'if' statement cannot be the empty statement."),
        Global_module_exports_may_only_appear_in_module_files: diag(1314, ts.DiagnosticCategory.Error, "Global_module_exports_may_only_appear_in_module_files_1314", "Global module exports may only appear in module files."),
        Global_module_exports_may_only_appear_in_declaration_files: diag(1315, ts.DiagnosticCategory.Error, "Global_module_exports_may_only_appear_in_declaration_files_1315", "Global module exports may only appear in declaration files."),
        Global_module_exports_may_only_appear_at_top_level: diag(1316, ts.DiagnosticCategory.Error, "Global_module_exports_may_only_appear_at_top_level_1316", "Global module exports may only appear at top level."),
        A_parameter_property_cannot_be_declared_using_a_rest_parameter: diag(1317, ts.DiagnosticCategory.Error, "A_parameter_property_cannot_be_declared_using_a_rest_parameter_1317", "A parameter property cannot be declared using a rest parameter."),
        An_abstract_accessor_cannot_have_an_implementation: diag(1318, ts.DiagnosticCategory.Error, "An_abstract_accessor_cannot_have_an_implementation_1318", "An abstract accessor cannot have an implementation."),
        A_default_export_can_only_be_used_in_an_ECMAScript_style_module: diag(1319, ts.DiagnosticCategory.Error, "A_default_export_can_only_be_used_in_an_ECMAScript_style_module_1319", "A default export can only be used in an ECMAScript-style module."),
        Type_of_await_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member: diag(1320, ts.DiagnosticCategory.Error, "Type_of_await_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member_1320", "Type of 'await' operand must either be a valid promise or must not contain a callable 'then' member."),
        Type_of_yield_operand_in_an_async_generator_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member: diag(1321, ts.DiagnosticCategory.Error, "Type_of_yield_operand_in_an_async_generator_must_either_be_a_valid_promise_or_must_not_contain_a_cal_1321", "Type of 'yield' operand in an async generator must either be a valid promise or must not contain a callable 'then' member."),
        Type_of_iterated_elements_of_a_yield_Asterisk_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member: diag(1322, ts.DiagnosticCategory.Error, "Type_of_iterated_elements_of_a_yield_Asterisk_operand_must_either_be_a_valid_promise_or_must_not_con_1322", "Type of iterated elements of a 'yield*' operand must either be a valid promise or must not contain a callable 'then' member."),
        Dynamic_import_cannot_be_used_when_targeting_ECMAScript_2015_modules: diag(1323, ts.DiagnosticCategory.Error, "Dynamic_import_cannot_be_used_when_targeting_ECMAScript_2015_modules_1323", "Dynamic import cannot be used when targeting ECMAScript 2015 modules."),
        Dynamic_import_must_have_one_specifier_as_an_argument: diag(1324, ts.DiagnosticCategory.Error, "Dynamic_import_must_have_one_specifier_as_an_argument_1324", "Dynamic import must have one specifier as an argument."),
        Specifier_of_dynamic_import_cannot_be_spread_element: diag(1325, ts.DiagnosticCategory.Error, "Specifier_of_dynamic_import_cannot_be_spread_element_1325", "Specifier of dynamic import cannot be spread element."),
        Dynamic_import_cannot_have_type_arguments: diag(1326, ts.DiagnosticCategory.Error, "Dynamic_import_cannot_have_type_arguments_1326", "Dynamic import cannot have type arguments"),
        String_literal_with_double_quotes_expected: diag(1327, ts.DiagnosticCategory.Error, "String_literal_with_double_quotes_expected_1327", "String literal with double quotes expected."),
        Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal: diag(1328, ts.DiagnosticCategory.Error, "Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_li_1328", "Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal."),
        _0_accepts_too_few_arguments_to_be_used_as_a_decorator_here_Did_you_mean_to_call_it_first_and_write_0: diag(1329, ts.DiagnosticCategory.Error, "_0_accepts_too_few_arguments_to_be_used_as_a_decorator_here_Did_you_mean_to_call_it_first_and_write__1329", "'{0}' accepts too few arguments to be used as a decorator here. Did you mean to call it first and write '@{0}()'?"),
        Duplicate_identifier_0: diag(2300, ts.DiagnosticCategory.Error, "Duplicate_identifier_0_2300", "Duplicate identifier '{0}'."),
        Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor: diag(2301, ts.DiagnosticCategory.Error, "Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor_2301", "Initializer of instance member variable '{0}' cannot reference identifier '{1}' declared in the constructor."),
        Static_members_cannot_reference_class_type_parameters: diag(2302, ts.DiagnosticCategory.Error, "Static_members_cannot_reference_class_type_parameters_2302", "Static members cannot reference class type parameters."),
        Circular_definition_of_import_alias_0: diag(2303, ts.DiagnosticCategory.Error, "Circular_definition_of_import_alias_0_2303", "Circular definition of import alias '{0}'."),
        Cannot_find_name_0: diag(2304, ts.DiagnosticCategory.Error, "Cannot_find_name_0_2304", "Cannot find name '{0}'."),
        Module_0_has_no_exported_member_1: diag(2305, ts.DiagnosticCategory.Error, "Module_0_has_no_exported_member_1_2305", "Module '{0}' has no exported member '{1}'."),
        File_0_is_not_a_module: diag(2306, ts.DiagnosticCategory.Error, "File_0_is_not_a_module_2306", "File '{0}' is not a module."),
        Cannot_find_module_0: diag(2307, ts.DiagnosticCategory.Error, "Cannot_find_module_0_2307", "Cannot find module '{0}'."),
        Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambiguity: diag(2308, ts.DiagnosticCategory.Error, "Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambig_2308", "Module {0} has already exported a member named '{1}'. Consider explicitly re-exporting to resolve the ambiguity."),
        An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements: diag(2309, ts.DiagnosticCategory.Error, "An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements_2309", "An export assignment cannot be used in a module with other exported elements."),
        Type_0_recursively_references_itself_as_a_base_type: diag(2310, ts.DiagnosticCategory.Error, "Type_0_recursively_references_itself_as_a_base_type_2310", "Type '{0}' recursively references itself as a base type."),
        A_class_may_only_extend_another_class: diag(2311, ts.DiagnosticCategory.Error, "A_class_may_only_extend_another_class_2311", "A class may only extend another class."),
        An_interface_may_only_extend_a_class_or_another_interface: diag(2312, ts.DiagnosticCategory.Error, "An_interface_may_only_extend_a_class_or_another_interface_2312", "An interface may only extend a class or another interface."),
        Type_parameter_0_has_a_circular_constraint: diag(2313, ts.DiagnosticCategory.Error, "Type_parameter_0_has_a_circular_constraint_2313", "Type parameter '{0}' has a circular constraint."),
        Generic_type_0_requires_1_type_argument_s: diag(2314, ts.DiagnosticCategory.Error, "Generic_type_0_requires_1_type_argument_s_2314", "Generic type '{0}' requires {1} type argument(s)."),
        Type_0_is_not_generic: diag(2315, ts.DiagnosticCategory.Error, "Type_0_is_not_generic_2315", "Type '{0}' is not generic."),
        Global_type_0_must_be_a_class_or_interface_type: diag(2316, ts.DiagnosticCategory.Error, "Global_type_0_must_be_a_class_or_interface_type_2316", "Global type '{0}' must be a class or interface type."),
        Global_type_0_must_have_1_type_parameter_s: diag(2317, ts.DiagnosticCategory.Error, "Global_type_0_must_have_1_type_parameter_s_2317", "Global type '{0}' must have {1} type parameter(s)."),
        Cannot_find_global_type_0: diag(2318, ts.DiagnosticCategory.Error, "Cannot_find_global_type_0_2318", "Cannot find global type '{0}'."),
        Named_property_0_of_types_1_and_2_are_not_identical: diag(2319, ts.DiagnosticCategory.Error, "Named_property_0_of_types_1_and_2_are_not_identical_2319", "Named property '{0}' of types '{1}' and '{2}' are not identical."),
        Interface_0_cannot_simultaneously_extend_types_1_and_2: diag(2320, ts.DiagnosticCategory.Error, "Interface_0_cannot_simultaneously_extend_types_1_and_2_2320", "Interface '{0}' cannot simultaneously extend types '{1}' and '{2}'."),
        Excessive_stack_depth_comparing_types_0_and_1: diag(2321, ts.DiagnosticCategory.Error, "Excessive_stack_depth_comparing_types_0_and_1_2321", "Excessive stack depth comparing types '{0}' and '{1}'."),
        Type_0_is_not_assignable_to_type_1: diag(2322, ts.DiagnosticCategory.Error, "Type_0_is_not_assignable_to_type_1_2322", "Type '{0}' is not assignable to type '{1}'."),
        Cannot_redeclare_exported_variable_0: diag(2323, ts.DiagnosticCategory.Error, "Cannot_redeclare_exported_variable_0_2323", "Cannot redeclare exported variable '{0}'."),
        Property_0_is_missing_in_type_1: diag(2324, ts.DiagnosticCategory.Error, "Property_0_is_missing_in_type_1_2324", "Property '{0}' is missing in type '{1}'."),
        Property_0_is_private_in_type_1_but_not_in_type_2: diag(2325, ts.DiagnosticCategory.Error, "Property_0_is_private_in_type_1_but_not_in_type_2_2325", "Property '{0}' is private in type '{1}' but not in type '{2}'."),
        Types_of_property_0_are_incompatible: diag(2326, ts.DiagnosticCategory.Error, "Types_of_property_0_are_incompatible_2326", "Types of property '{0}' are incompatible."),
        Property_0_is_optional_in_type_1_but_required_in_type_2: diag(2327, ts.DiagnosticCategory.Error, "Property_0_is_optional_in_type_1_but_required_in_type_2_2327", "Property '{0}' is optional in type '{1}' but required in type '{2}'."),
        Types_of_parameters_0_and_1_are_incompatible: diag(2328, ts.DiagnosticCategory.Error, "Types_of_parameters_0_and_1_are_incompatible_2328", "Types of parameters '{0}' and '{1}' are incompatible."),
        Index_signature_is_missing_in_type_0: diag(2329, ts.DiagnosticCategory.Error, "Index_signature_is_missing_in_type_0_2329", "Index signature is missing in type '{0}'."),
        Index_signatures_are_incompatible: diag(2330, ts.DiagnosticCategory.Error, "Index_signatures_are_incompatible_2330", "Index signatures are incompatible."),
        this_cannot_be_referenced_in_a_module_or_namespace_body: diag(2331, ts.DiagnosticCategory.Error, "this_cannot_be_referenced_in_a_module_or_namespace_body_2331", "'this' cannot be referenced in a module or namespace body."),
        this_cannot_be_referenced_in_current_location: diag(2332, ts.DiagnosticCategory.Error, "this_cannot_be_referenced_in_current_location_2332", "'this' cannot be referenced in current location."),
        this_cannot_be_referenced_in_constructor_arguments: diag(2333, ts.DiagnosticCategory.Error, "this_cannot_be_referenced_in_constructor_arguments_2333", "'this' cannot be referenced in constructor arguments."),
        this_cannot_be_referenced_in_a_static_property_initializer: diag(2334, ts.DiagnosticCategory.Error, "this_cannot_be_referenced_in_a_static_property_initializer_2334", "'this' cannot be referenced in a static property initializer."),
        super_can_only_be_referenced_in_a_derived_class: diag(2335, ts.DiagnosticCategory.Error, "super_can_only_be_referenced_in_a_derived_class_2335", "'super' can only be referenced in a derived class."),
        super_cannot_be_referenced_in_constructor_arguments: diag(2336, ts.DiagnosticCategory.Error, "super_cannot_be_referenced_in_constructor_arguments_2336", "'super' cannot be referenced in constructor arguments."),
        Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors: diag(2337, ts.DiagnosticCategory.Error, "Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors_2337", "Super calls are not permitted outside constructors or in nested functions inside constructors."),
        super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class: diag(2338, ts.DiagnosticCategory.Error, "super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_der_2338", "'super' property access is permitted only in a constructor, member function, or member accessor of a derived class."),
        Property_0_does_not_exist_on_type_1: diag(2339, ts.DiagnosticCategory.Error, "Property_0_does_not_exist_on_type_1_2339", "Property '{0}' does not exist on type '{1}'."),
        Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword: diag(2340, ts.DiagnosticCategory.Error, "Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword_2340", "Only public and protected methods of the base class are accessible via the 'super' keyword."),
        Property_0_is_private_and_only_accessible_within_class_1: diag(2341, ts.DiagnosticCategory.Error, "Property_0_is_private_and_only_accessible_within_class_1_2341", "Property '{0}' is private and only accessible within class '{1}'."),
        An_index_expression_argument_must_be_of_type_string_number_symbol_or_any: diag(2342, ts.DiagnosticCategory.Error, "An_index_expression_argument_must_be_of_type_string_number_symbol_or_any_2342", "An index expression argument must be of type 'string', 'number', 'symbol', or 'any'."),
        This_syntax_requires_an_imported_helper_named_1_but_module_0_has_no_exported_member_1: diag(2343, ts.DiagnosticCategory.Error, "This_syntax_requires_an_imported_helper_named_1_but_module_0_has_no_exported_member_1_2343", "This syntax requires an imported helper named '{1}', but module '{0}' has no exported member '{1}'."),
        Type_0_does_not_satisfy_the_constraint_1: diag(2344, ts.DiagnosticCategory.Error, "Type_0_does_not_satisfy_the_constraint_1_2344", "Type '{0}' does not satisfy the constraint '{1}'."),
        Argument_of_type_0_is_not_assignable_to_parameter_of_type_1: diag(2345, ts.DiagnosticCategory.Error, "Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_2345", "Argument of type '{0}' is not assignable to parameter of type '{1}'."),
        Call_target_does_not_contain_any_signatures: diag(2346, ts.DiagnosticCategory.Error, "Call_target_does_not_contain_any_signatures_2346", "Call target does not contain any signatures."),
        Untyped_function_calls_may_not_accept_type_arguments: diag(2347, ts.DiagnosticCategory.Error, "Untyped_function_calls_may_not_accept_type_arguments_2347", "Untyped function calls may not accept type arguments."),
        Value_of_type_0_is_not_callable_Did_you_mean_to_include_new: diag(2348, ts.DiagnosticCategory.Error, "Value_of_type_0_is_not_callable_Did_you_mean_to_include_new_2348", "Value of type '{0}' is not callable. Did you mean to include 'new'?"),
        Cannot_invoke_an_expression_whose_type_lacks_a_call_signature_Type_0_has_no_compatible_call_signatures: diag(2349, ts.DiagnosticCategory.Error, "Cannot_invoke_an_expression_whose_type_lacks_a_call_signature_Type_0_has_no_compatible_call_signatur_2349", "Cannot invoke an expression whose type lacks a call signature. Type '{0}' has no compatible call signatures."),
        Only_a_void_function_can_be_called_with_the_new_keyword: diag(2350, ts.DiagnosticCategory.Error, "Only_a_void_function_can_be_called_with_the_new_keyword_2350", "Only a void function can be called with the 'new' keyword."),
        Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature: diag(2351, ts.DiagnosticCategory.Error, "Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature_2351", "Cannot use 'new' with an expression whose type lacks a call or construct signature."),
        Type_0_cannot_be_converted_to_type_1: diag(2352, ts.DiagnosticCategory.Error, "Type_0_cannot_be_converted_to_type_1_2352", "Type '{0}' cannot be converted to type '{1}'."),
        Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1: diag(2353, ts.DiagnosticCategory.Error, "Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1_2353", "Object literal may only specify known properties, and '{0}' does not exist in type '{1}'."),
        This_syntax_requires_an_imported_helper_but_module_0_cannot_be_found: diag(2354, ts.DiagnosticCategory.Error, "This_syntax_requires_an_imported_helper_but_module_0_cannot_be_found_2354", "This syntax requires an imported helper but module '{0}' cannot be found."),
        A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value: diag(2355, ts.DiagnosticCategory.Error, "A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value_2355", "A function whose declared type is neither 'void' nor 'any' must return a value."),
        An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type: diag(2356, ts.DiagnosticCategory.Error, "An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type_2356", "An arithmetic operand must be of type 'any', 'number' or an enum type."),
        The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_or_a_property_access: diag(2357, ts.DiagnosticCategory.Error, "The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_or_a_property_access_2357", "The operand of an increment or decrement operator must be a variable or a property access."),
        The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: diag(2358, ts.DiagnosticCategory.Error, "The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_paramete_2358", "The left-hand side of an 'instanceof' expression must be of type 'any', an object type or a type parameter."),
        The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type: diag(2359, ts.DiagnosticCategory.Error, "The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_F_2359", "The right-hand side of an 'instanceof' expression must be of type 'any' or of a type assignable to the 'Function' interface type."),
        The_left_hand_side_of_an_in_expression_must_be_of_type_any_string_number_or_symbol: diag(2360, ts.DiagnosticCategory.Error, "The_left_hand_side_of_an_in_expression_must_be_of_type_any_string_number_or_symbol_2360", "The left-hand side of an 'in' expression must be of type 'any', 'string', 'number', or 'symbol'."),
        The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: diag(2361, ts.DiagnosticCategory.Error, "The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter_2361", "The right-hand side of an 'in' expression must be of type 'any', an object type or a type parameter."),
        The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: diag(2362, ts.DiagnosticCategory.Error, "The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type_2362", "The left-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type."),
        The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: diag(2363, ts.DiagnosticCategory.Error, "The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type_2363", "The right-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type."),
        The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access: diag(2364, ts.DiagnosticCategory.Error, "The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access_2364", "The left-hand side of an assignment expression must be a variable or a property access."),
        Operator_0_cannot_be_applied_to_types_1_and_2: diag(2365, ts.DiagnosticCategory.Error, "Operator_0_cannot_be_applied_to_types_1_and_2_2365", "Operator '{0}' cannot be applied to types '{1}' and '{2}'."),
        Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined: diag(2366, ts.DiagnosticCategory.Error, "Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined_2366", "Function lacks ending return statement and return type does not include 'undefined'."),
        Type_parameter_name_cannot_be_0: diag(2368, ts.DiagnosticCategory.Error, "Type_parameter_name_cannot_be_0_2368", "Type parameter name cannot be '{0}'."),
        A_parameter_property_is_only_allowed_in_a_constructor_implementation: diag(2369, ts.DiagnosticCategory.Error, "A_parameter_property_is_only_allowed_in_a_constructor_implementation_2369", "A parameter property is only allowed in a constructor implementation."),
        A_rest_parameter_must_be_of_an_array_type: diag(2370, ts.DiagnosticCategory.Error, "A_rest_parameter_must_be_of_an_array_type_2370", "A rest parameter must be of an array type."),
        A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation: diag(2371, ts.DiagnosticCategory.Error, "A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation_2371", "A parameter initializer is only allowed in a function or constructor implementation."),
        Parameter_0_cannot_be_referenced_in_its_initializer: diag(2372, ts.DiagnosticCategory.Error, "Parameter_0_cannot_be_referenced_in_its_initializer_2372", "Parameter '{0}' cannot be referenced in its initializer."),
        Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it: diag(2373, ts.DiagnosticCategory.Error, "Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it_2373", "Initializer of parameter '{0}' cannot reference identifier '{1}' declared after it."),
        Duplicate_string_index_signature: diag(2374, ts.DiagnosticCategory.Error, "Duplicate_string_index_signature_2374", "Duplicate string index signature."),
        Duplicate_number_index_signature: diag(2375, ts.DiagnosticCategory.Error, "Duplicate_number_index_signature_2375", "Duplicate number index signature."),
        A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties: diag(2376, ts.DiagnosticCategory.Error, "A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_proper_2376", "A 'super' call must be the first statement in the constructor when a class contains initialized properties or has parameter properties."),
        Constructors_for_derived_classes_must_contain_a_super_call: diag(2377, ts.DiagnosticCategory.Error, "Constructors_for_derived_classes_must_contain_a_super_call_2377", "Constructors for derived classes must contain a 'super' call."),
        A_get_accessor_must_return_a_value: diag(2378, ts.DiagnosticCategory.Error, "A_get_accessor_must_return_a_value_2378", "A 'get' accessor must return a value."),
        Getter_and_setter_accessors_do_not_agree_in_visibility: diag(2379, ts.DiagnosticCategory.Error, "Getter_and_setter_accessors_do_not_agree_in_visibility_2379", "Getter and setter accessors do not agree in visibility."),
        get_and_set_accessor_must_have_the_same_type: diag(2380, ts.DiagnosticCategory.Error, "get_and_set_accessor_must_have_the_same_type_2380", "'get' and 'set' accessor must have the same type."),
        A_signature_with_an_implementation_cannot_use_a_string_literal_type: diag(2381, ts.DiagnosticCategory.Error, "A_signature_with_an_implementation_cannot_use_a_string_literal_type_2381", "A signature with an implementation cannot use a string literal type."),
        Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature: diag(2382, ts.DiagnosticCategory.Error, "Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature_2382", "Specialized overload signature is not assignable to any non-specialized signature."),
        Overload_signatures_must_all_be_exported_or_non_exported: diag(2383, ts.DiagnosticCategory.Error, "Overload_signatures_must_all_be_exported_or_non_exported_2383", "Overload signatures must all be exported or non-exported."),
        Overload_signatures_must_all_be_ambient_or_non_ambient: diag(2384, ts.DiagnosticCategory.Error, "Overload_signatures_must_all_be_ambient_or_non_ambient_2384", "Overload signatures must all be ambient or non-ambient."),
        Overload_signatures_must_all_be_public_private_or_protected: diag(2385, ts.DiagnosticCategory.Error, "Overload_signatures_must_all_be_public_private_or_protected_2385", "Overload signatures must all be public, private or protected."),
        Overload_signatures_must_all_be_optional_or_required: diag(2386, ts.DiagnosticCategory.Error, "Overload_signatures_must_all_be_optional_or_required_2386", "Overload signatures must all be optional or required."),
        Function_overload_must_be_static: diag(2387, ts.DiagnosticCategory.Error, "Function_overload_must_be_static_2387", "Function overload must be static."),
        Function_overload_must_not_be_static: diag(2388, ts.DiagnosticCategory.Error, "Function_overload_must_not_be_static_2388", "Function overload must not be static."),
        Function_implementation_name_must_be_0: diag(2389, ts.DiagnosticCategory.Error, "Function_implementation_name_must_be_0_2389", "Function implementation name must be '{0}'."),
        Constructor_implementation_is_missing: diag(2390, ts.DiagnosticCategory.Error, "Constructor_implementation_is_missing_2390", "Constructor implementation is missing."),
        Function_implementation_is_missing_or_not_immediately_following_the_declaration: diag(2391, ts.DiagnosticCategory.Error, "Function_implementation_is_missing_or_not_immediately_following_the_declaration_2391", "Function implementation is missing or not immediately following the declaration."),
        Multiple_constructor_implementations_are_not_allowed: diag(2392, ts.DiagnosticCategory.Error, "Multiple_constructor_implementations_are_not_allowed_2392", "Multiple constructor implementations are not allowed."),
        Duplicate_function_implementation: diag(2393, ts.DiagnosticCategory.Error, "Duplicate_function_implementation_2393", "Duplicate function implementation."),
        Overload_signature_is_not_compatible_with_function_implementation: diag(2394, ts.DiagnosticCategory.Error, "Overload_signature_is_not_compatible_with_function_implementation_2394", "Overload signature is not compatible with function implementation."),
        Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local: diag(2395, ts.DiagnosticCategory.Error, "Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local_2395", "Individual declarations in merged declaration '{0}' must be all exported or all local."),
        Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters: diag(2396, ts.DiagnosticCategory.Error, "Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters_2396", "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters."),
        Declaration_name_conflicts_with_built_in_global_identifier_0: diag(2397, ts.DiagnosticCategory.Error, "Declaration_name_conflicts_with_built_in_global_identifier_0_2397", "Declaration name conflicts with built-in global identifier '{0}'."),
        Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference: diag(2399, ts.DiagnosticCategory.Error, "Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference_2399", "Duplicate identifier '_this'. Compiler uses variable declaration '_this' to capture 'this' reference."),
        Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference: diag(2400, ts.DiagnosticCategory.Error, "Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference_2400", "Expression resolves to variable declaration '_this' that compiler uses to capture 'this' reference."),
        Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference: diag(2401, ts.DiagnosticCategory.Error, "Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference_2401", "Duplicate identifier '_super'. Compiler uses '_super' to capture base class reference."),
        Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference: diag(2402, ts.DiagnosticCategory.Error, "Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference_2402", "Expression resolves to '_super' that compiler uses to capture base class reference."),
        Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2: diag(2403, ts.DiagnosticCategory.Error, "Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_t_2403", "Subsequent variable declarations must have the same type.  Variable '{0}' must be of type '{1}', but here has type '{2}'."),
        The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation: diag(2404, ts.DiagnosticCategory.Error, "The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation_2404", "The left-hand side of a 'for...in' statement cannot use a type annotation."),
        The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any: diag(2405, ts.DiagnosticCategory.Error, "The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any_2405", "The left-hand side of a 'for...in' statement must be of type 'string' or 'any'."),
        The_left_hand_side_of_a_for_in_statement_must_be_a_variable_or_a_property_access: diag(2406, ts.DiagnosticCategory.Error, "The_left_hand_side_of_a_for_in_statement_must_be_a_variable_or_a_property_access_2406", "The left-hand side of a 'for...in' statement must be a variable or a property access."),
        The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter: diag(2407, ts.DiagnosticCategory.Error, "The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter_2407", "The right-hand side of a 'for...in' statement must be of type 'any', an object type or a type parameter."),
        Setters_cannot_return_a_value: diag(2408, ts.DiagnosticCategory.Error, "Setters_cannot_return_a_value_2408", "Setters cannot return a value."),
        Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class: diag(2409, ts.DiagnosticCategory.Error, "Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class_2409", "Return type of constructor signature must be assignable to the instance type of the class."),
        The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any: diag(2410, ts.DiagnosticCategory.Error, "The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any_2410", "The 'with' statement is not supported. All symbols in a 'with' block will have type 'any'."),
        Property_0_of_type_1_is_not_assignable_to_string_index_type_2: diag(2411, ts.DiagnosticCategory.Error, "Property_0_of_type_1_is_not_assignable_to_string_index_type_2_2411", "Property '{0}' of type '{1}' is not assignable to string index type '{2}'."),
        Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2: diag(2412, ts.DiagnosticCategory.Error, "Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2_2412", "Property '{0}' of type '{1}' is not assignable to numeric index type '{2}'."),
        Numeric_index_type_0_is_not_assignable_to_string_index_type_1: diag(2413, ts.DiagnosticCategory.Error, "Numeric_index_type_0_is_not_assignable_to_string_index_type_1_2413", "Numeric index type '{0}' is not assignable to string index type '{1}'."),
        Class_name_cannot_be_0: diag(2414, ts.DiagnosticCategory.Error, "Class_name_cannot_be_0_2414", "Class name cannot be '{0}'."),
        Class_0_incorrectly_extends_base_class_1: diag(2415, ts.DiagnosticCategory.Error, "Class_0_incorrectly_extends_base_class_1_2415", "Class '{0}' incorrectly extends base class '{1}'."),
        Class_static_side_0_incorrectly_extends_base_class_static_side_1: diag(2417, ts.DiagnosticCategory.Error, "Class_static_side_0_incorrectly_extends_base_class_static_side_1_2417", "Class static side '{0}' incorrectly extends base class static side '{1}'."),
        Class_0_incorrectly_implements_interface_1: diag(2420, ts.DiagnosticCategory.Error, "Class_0_incorrectly_implements_interface_1_2420", "Class '{0}' incorrectly implements interface '{1}'."),
        A_class_may_only_implement_another_class_or_interface: diag(2422, ts.DiagnosticCategory.Error, "A_class_may_only_implement_another_class_or_interface_2422", "A class may only implement another class or interface."),
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor: diag(2423, ts.DiagnosticCategory.Error, "Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_access_2423", "Class '{0}' defines instance member function '{1}', but extended class '{2}' defines it as instance member accessor."),
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property: diag(2424, ts.DiagnosticCategory.Error, "Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_proper_2424", "Class '{0}' defines instance member function '{1}', but extended class '{2}' defines it as instance member property."),
        Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function: diag(2425, ts.DiagnosticCategory.Error, "Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_functi_2425", "Class '{0}' defines instance member property '{1}', but extended class '{2}' defines it as instance member function."),
        Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function: diag(2426, ts.DiagnosticCategory.Error, "Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_functi_2426", "Class '{0}' defines instance member accessor '{1}', but extended class '{2}' defines it as instance member function."),
        Interface_name_cannot_be_0: diag(2427, ts.DiagnosticCategory.Error, "Interface_name_cannot_be_0_2427", "Interface name cannot be '{0}'."),
        All_declarations_of_0_must_have_identical_type_parameters: diag(2428, ts.DiagnosticCategory.Error, "All_declarations_of_0_must_have_identical_type_parameters_2428", "All declarations of '{0}' must have identical type parameters."),
        Interface_0_incorrectly_extends_interface_1: diag(2430, ts.DiagnosticCategory.Error, "Interface_0_incorrectly_extends_interface_1_2430", "Interface '{0}' incorrectly extends interface '{1}'."),
        Enum_name_cannot_be_0: diag(2431, ts.DiagnosticCategory.Error, "Enum_name_cannot_be_0_2431", "Enum name cannot be '{0}'."),
        In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element: diag(2432, ts.DiagnosticCategory.Error, "In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enu_2432", "In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element."),
        A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged: diag(2433, ts.DiagnosticCategory.Error, "A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merg_2433", "A namespace declaration cannot be in a different file from a class or function with which it is merged."),
        A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged: diag(2434, ts.DiagnosticCategory.Error, "A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged_2434", "A namespace declaration cannot be located prior to a class or function with which it is merged."),
        Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces: diag(2435, ts.DiagnosticCategory.Error, "Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces_2435", "Ambient modules cannot be nested in other modules or namespaces."),
        Ambient_module_declaration_cannot_specify_relative_module_name: diag(2436, ts.DiagnosticCategory.Error, "Ambient_module_declaration_cannot_specify_relative_module_name_2436", "Ambient module declaration cannot specify relative module name."),
        Module_0_is_hidden_by_a_local_declaration_with_the_same_name: diag(2437, ts.DiagnosticCategory.Error, "Module_0_is_hidden_by_a_local_declaration_with_the_same_name_2437", "Module '{0}' is hidden by a local declaration with the same name."),
        Import_name_cannot_be_0: diag(2438, ts.DiagnosticCategory.Error, "Import_name_cannot_be_0_2438", "Import name cannot be '{0}'."),
        Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relative_module_name: diag(2439, ts.DiagnosticCategory.Error, "Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relati_2439", "Import or export declaration in an ambient module declaration cannot reference module through relative module name."),
        Import_declaration_conflicts_with_local_declaration_of_0: diag(2440, ts.DiagnosticCategory.Error, "Import_declaration_conflicts_with_local_declaration_of_0_2440", "Import declaration conflicts with local declaration of '{0}'."),
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module: diag(2441, ts.DiagnosticCategory.Error, "Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_2441", "Duplicate identifier '{0}'. Compiler reserves name '{1}' in top level scope of a module."),
        Types_have_separate_declarations_of_a_private_property_0: diag(2442, ts.DiagnosticCategory.Error, "Types_have_separate_declarations_of_a_private_property_0_2442", "Types have separate declarations of a private property '{0}'."),
        Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2: diag(2443, ts.DiagnosticCategory.Error, "Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2_2443", "Property '{0}' is protected but type '{1}' is not a class derived from '{2}'."),
        Property_0_is_protected_in_type_1_but_public_in_type_2: diag(2444, ts.DiagnosticCategory.Error, "Property_0_is_protected_in_type_1_but_public_in_type_2_2444", "Property '{0}' is protected in type '{1}' but public in type '{2}'."),
        Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses: diag(2445, ts.DiagnosticCategory.Error, "Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses_2445", "Property '{0}' is protected and only accessible within class '{1}' and its subclasses."),
        Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1: diag(2446, ts.DiagnosticCategory.Error, "Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1_2446", "Property '{0}' is protected and only accessible through an instance of class '{1}'."),
        The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead: diag(2447, ts.DiagnosticCategory.Error, "The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead_2447", "The '{0}' operator is not allowed for boolean types. Consider using '{1}' instead."),
        Block_scoped_variable_0_used_before_its_declaration: diag(2448, ts.DiagnosticCategory.Error, "Block_scoped_variable_0_used_before_its_declaration_2448", "Block-scoped variable '{0}' used before its declaration."),
        Class_0_used_before_its_declaration: diag(2449, ts.DiagnosticCategory.Error, "Class_0_used_before_its_declaration_2449", "Class '{0}' used before its declaration."),
        Enum_0_used_before_its_declaration: diag(2450, ts.DiagnosticCategory.Error, "Enum_0_used_before_its_declaration_2450", "Enum '{0}' used before its declaration."),
        Cannot_redeclare_block_scoped_variable_0: diag(2451, ts.DiagnosticCategory.Error, "Cannot_redeclare_block_scoped_variable_0_2451", "Cannot redeclare block-scoped variable '{0}'."),
        An_enum_member_cannot_have_a_numeric_name: diag(2452, ts.DiagnosticCategory.Error, "An_enum_member_cannot_have_a_numeric_name_2452", "An enum member cannot have a numeric name."),
        The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly: diag(2453, ts.DiagnosticCategory.Error, "The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_typ_2453", "The type argument for type parameter '{0}' cannot be inferred from the usage. Consider specifying the type arguments explicitly."),
        Variable_0_is_used_before_being_assigned: diag(2454, ts.DiagnosticCategory.Error, "Variable_0_is_used_before_being_assigned_2454", "Variable '{0}' is used before being assigned."),
        Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0: diag(2455, ts.DiagnosticCategory.Error, "Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0_2455", "Type argument candidate '{1}' is not a valid type argument because it is not a supertype of candidate '{0}'."),
        Type_alias_0_circularly_references_itself: diag(2456, ts.DiagnosticCategory.Error, "Type_alias_0_circularly_references_itself_2456", "Type alias '{0}' circularly references itself."),
        Type_alias_name_cannot_be_0: diag(2457, ts.DiagnosticCategory.Error, "Type_alias_name_cannot_be_0_2457", "Type alias name cannot be '{0}'."),
        An_AMD_module_cannot_have_multiple_name_assignments: diag(2458, ts.DiagnosticCategory.Error, "An_AMD_module_cannot_have_multiple_name_assignments_2458", "An AMD module cannot have multiple name assignments."),
        Type_0_has_no_property_1_and_no_string_index_signature: diag(2459, ts.DiagnosticCategory.Error, "Type_0_has_no_property_1_and_no_string_index_signature_2459", "Type '{0}' has no property '{1}' and no string index signature."),
        Type_0_has_no_property_1: diag(2460, ts.DiagnosticCategory.Error, "Type_0_has_no_property_1_2460", "Type '{0}' has no property '{1}'."),
        Type_0_is_not_an_array_type: diag(2461, ts.DiagnosticCategory.Error, "Type_0_is_not_an_array_type_2461", "Type '{0}' is not an array type."),
        A_rest_element_must_be_last_in_a_destructuring_pattern: diag(2462, ts.DiagnosticCategory.Error, "A_rest_element_must_be_last_in_a_destructuring_pattern_2462", "A rest element must be last in a destructuring pattern."),
        A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature: diag(2463, ts.DiagnosticCategory.Error, "A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature_2463", "A binding pattern parameter cannot be optional in an implementation signature."),
        A_computed_property_name_must_be_of_type_string_number_symbol_or_any: diag(2464, ts.DiagnosticCategory.Error, "A_computed_property_name_must_be_of_type_string_number_symbol_or_any_2464", "A computed property name must be of type 'string', 'number', 'symbol', or 'any'."),
        this_cannot_be_referenced_in_a_computed_property_name: diag(2465, ts.DiagnosticCategory.Error, "this_cannot_be_referenced_in_a_computed_property_name_2465", "'this' cannot be referenced in a computed property name."),
        super_cannot_be_referenced_in_a_computed_property_name: diag(2466, ts.DiagnosticCategory.Error, "super_cannot_be_referenced_in_a_computed_property_name_2466", "'super' cannot be referenced in a computed property name."),
        A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type: diag(2467, ts.DiagnosticCategory.Error, "A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type_2467", "A computed property name cannot reference a type parameter from its containing type."),
        Cannot_find_global_value_0: diag(2468, ts.DiagnosticCategory.Error, "Cannot_find_global_value_0_2468", "Cannot find global value '{0}'."),
        The_0_operator_cannot_be_applied_to_type_symbol: diag(2469, ts.DiagnosticCategory.Error, "The_0_operator_cannot_be_applied_to_type_symbol_2469", "The '{0}' operator cannot be applied to type 'symbol'."),
        Symbol_reference_does_not_refer_to_the_global_Symbol_constructor_object: diag(2470, ts.DiagnosticCategory.Error, "Symbol_reference_does_not_refer_to_the_global_Symbol_constructor_object_2470", "'Symbol' reference does not refer to the global Symbol constructor object."),
        A_computed_property_name_of_the_form_0_must_be_of_type_symbol: diag(2471, ts.DiagnosticCategory.Error, "A_computed_property_name_of_the_form_0_must_be_of_type_symbol_2471", "A computed property name of the form '{0}' must be of type 'symbol'."),
        Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher: diag(2472, ts.DiagnosticCategory.Error, "Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher_2472", "Spread operator in 'new' expressions is only available when targeting ECMAScript 5 and higher."),
        Enum_declarations_must_all_be_const_or_non_const: diag(2473, ts.DiagnosticCategory.Error, "Enum_declarations_must_all_be_const_or_non_const_2473", "Enum declarations must all be const or non-const."),
        In_const_enum_declarations_member_initializer_must_be_constant_expression: diag(2474, ts.DiagnosticCategory.Error, "In_const_enum_declarations_member_initializer_must_be_constant_expression_2474", "In 'const' enum declarations member initializer must be constant expression."),
        const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment: diag(2475, ts.DiagnosticCategory.Error, "const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_im_2475", "'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment."),
        A_const_enum_member_can_only_be_accessed_using_a_string_literal: diag(2476, ts.DiagnosticCategory.Error, "A_const_enum_member_can_only_be_accessed_using_a_string_literal_2476", "A const enum member can only be accessed using a string literal."),
        const_enum_member_initializer_was_evaluated_to_a_non_finite_value: diag(2477, ts.DiagnosticCategory.Error, "const_enum_member_initializer_was_evaluated_to_a_non_finite_value_2477", "'const' enum member initializer was evaluated to a non-finite value."),
        const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN: diag(2478, ts.DiagnosticCategory.Error, "const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN_2478", "'const' enum member initializer was evaluated to disallowed value 'NaN'."),
        Property_0_does_not_exist_on_const_enum_1: diag(2479, ts.DiagnosticCategory.Error, "Property_0_does_not_exist_on_const_enum_1_2479", "Property '{0}' does not exist on 'const' enum '{1}'."),
        let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations: diag(2480, ts.DiagnosticCategory.Error, "let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations_2480", "'let' is not allowed to be used as a name in 'let' or 'const' declarations."),
        Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1: diag(2481, ts.DiagnosticCategory.Error, "Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1_2481", "Cannot initialize outer scoped variable '{0}' in the same scope as block scoped declaration '{1}'."),
        The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation: diag(2483, ts.DiagnosticCategory.Error, "The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation_2483", "The left-hand side of a 'for...of' statement cannot use a type annotation."),
        Export_declaration_conflicts_with_exported_declaration_of_0: diag(2484, ts.DiagnosticCategory.Error, "Export_declaration_conflicts_with_exported_declaration_of_0_2484", "Export declaration conflicts with exported declaration of '{0}'."),
        The_left_hand_side_of_a_for_of_statement_must_be_a_variable_or_a_property_access: diag(2487, ts.DiagnosticCategory.Error, "The_left_hand_side_of_a_for_of_statement_must_be_a_variable_or_a_property_access_2487", "The left-hand side of a 'for...of' statement must be a variable or a property access."),
        Type_must_have_a_Symbol_iterator_method_that_returns_an_iterator: diag(2488, ts.DiagnosticCategory.Error, "Type_must_have_a_Symbol_iterator_method_that_returns_an_iterator_2488", "Type must have a '[Symbol.iterator]()' method that returns an iterator."),
        An_iterator_must_have_a_next_method: diag(2489, ts.DiagnosticCategory.Error, "An_iterator_must_have_a_next_method_2489", "An iterator must have a 'next()' method."),
        The_type_returned_by_the_next_method_of_an_iterator_must_have_a_value_property: diag(2490, ts.DiagnosticCategory.Error, "The_type_returned_by_the_next_method_of_an_iterator_must_have_a_value_property_2490", "The type returned by the 'next()' method of an iterator must have a 'value' property."),
        The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern: diag(2491, ts.DiagnosticCategory.Error, "The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern_2491", "The left-hand side of a 'for...in' statement cannot be a destructuring pattern."),
        Cannot_redeclare_identifier_0_in_catch_clause: diag(2492, ts.DiagnosticCategory.Error, "Cannot_redeclare_identifier_0_in_catch_clause_2492", "Cannot redeclare identifier '{0}' in catch clause."),
        Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2: diag(2493, ts.DiagnosticCategory.Error, "Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2_2493", "Tuple type '{0}' with length '{1}' cannot be assigned to tuple with length '{2}'."),
        Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher: diag(2494, ts.DiagnosticCategory.Error, "Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher_2494", "Using a string in a 'for...of' statement is only supported in ECMAScript 5 and higher."),
        Type_0_is_not_an_array_type_or_a_string_type: diag(2495, ts.DiagnosticCategory.Error, "Type_0_is_not_an_array_type_or_a_string_type_2495", "Type '{0}' is not an array type or a string type."),
        The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES3_and_ES5_Consider_using_a_standard_function_expression: diag(2496, ts.DiagnosticCategory.Error, "The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES3_and_ES5_Consider_using_a_stand_2496", "The 'arguments' object cannot be referenced in an arrow function in ES3 and ES5. Consider using a standard function expression."),
        Module_0_resolves_to_a_non_module_entity_and_cannot_be_imported_using_this_construct: diag(2497, ts.DiagnosticCategory.Error, "Module_0_resolves_to_a_non_module_entity_and_cannot_be_imported_using_this_construct_2497", "Module '{0}' resolves to a non-module entity and cannot be imported using this construct."),
        Module_0_uses_export_and_cannot_be_used_with_export_Asterisk: diag(2498, ts.DiagnosticCategory.Error, "Module_0_uses_export_and_cannot_be_used_with_export_Asterisk_2498", "Module '{0}' uses 'export =' and cannot be used with 'export *'."),
        An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments: diag(2499, ts.DiagnosticCategory.Error, "An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments_2499", "An interface can only extend an identifier/qualified-name with optional type arguments."),
        A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments: diag(2500, ts.DiagnosticCategory.Error, "A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments_2500", "A class can only implement an identifier/qualified-name with optional type arguments."),
        A_rest_element_cannot_contain_a_binding_pattern: diag(2501, ts.DiagnosticCategory.Error, "A_rest_element_cannot_contain_a_binding_pattern_2501", "A rest element cannot contain a binding pattern."),
        _0_is_referenced_directly_or_indirectly_in_its_own_type_annotation: diag(2502, ts.DiagnosticCategory.Error, "_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation_2502", "'{0}' is referenced directly or indirectly in its own type annotation."),
        Cannot_find_namespace_0: diag(2503, ts.DiagnosticCategory.Error, "Cannot_find_namespace_0_2503", "Cannot find namespace '{0}'."),
        Type_must_have_a_Symbol_asyncIterator_method_that_returns_an_async_iterator: diag(2504, ts.DiagnosticCategory.Error, "Type_must_have_a_Symbol_asyncIterator_method_that_returns_an_async_iterator_2504", "Type must have a '[Symbol.asyncIterator]()' method that returns an async iterator."),
        A_generator_cannot_have_a_void_type_annotation: diag(2505, ts.DiagnosticCategory.Error, "A_generator_cannot_have_a_void_type_annotation_2505", "A generator cannot have a 'void' type annotation."),
        _0_is_referenced_directly_or_indirectly_in_its_own_base_expression: diag(2506, ts.DiagnosticCategory.Error, "_0_is_referenced_directly_or_indirectly_in_its_own_base_expression_2506", "'{0}' is referenced directly or indirectly in its own base expression."),
        Type_0_is_not_a_constructor_function_type: diag(2507, ts.DiagnosticCategory.Error, "Type_0_is_not_a_constructor_function_type_2507", "Type '{0}' is not a constructor function type."),
        No_base_constructor_has_the_specified_number_of_type_arguments: diag(2508, ts.DiagnosticCategory.Error, "No_base_constructor_has_the_specified_number_of_type_arguments_2508", "No base constructor has the specified number of type arguments."),
        Base_constructor_return_type_0_is_not_a_class_or_interface_type: diag(2509, ts.DiagnosticCategory.Error, "Base_constructor_return_type_0_is_not_a_class_or_interface_type_2509", "Base constructor return type '{0}' is not a class or interface type."),
        Base_constructors_must_all_have_the_same_return_type: diag(2510, ts.DiagnosticCategory.Error, "Base_constructors_must_all_have_the_same_return_type_2510", "Base constructors must all have the same return type."),
        Cannot_create_an_instance_of_the_abstract_class_0: diag(2511, ts.DiagnosticCategory.Error, "Cannot_create_an_instance_of_the_abstract_class_0_2511", "Cannot create an instance of the abstract class '{0}'."),
        Overload_signatures_must_all_be_abstract_or_non_abstract: diag(2512, ts.DiagnosticCategory.Error, "Overload_signatures_must_all_be_abstract_or_non_abstract_2512", "Overload signatures must all be abstract or non-abstract."),
        Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression: diag(2513, ts.DiagnosticCategory.Error, "Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression_2513", "Abstract method '{0}' in class '{1}' cannot be accessed via super expression."),
        Classes_containing_abstract_methods_must_be_marked_abstract: diag(2514, ts.DiagnosticCategory.Error, "Classes_containing_abstract_methods_must_be_marked_abstract_2514", "Classes containing abstract methods must be marked abstract."),
        Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2: diag(2515, ts.DiagnosticCategory.Error, "Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2_2515", "Non-abstract class '{0}' does not implement inherited abstract member '{1}' from class '{2}'."),
        All_declarations_of_an_abstract_method_must_be_consecutive: diag(2516, ts.DiagnosticCategory.Error, "All_declarations_of_an_abstract_method_must_be_consecutive_2516", "All declarations of an abstract method must be consecutive."),
        Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type: diag(2517, ts.DiagnosticCategory.Error, "Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type_2517", "Cannot assign an abstract constructor type to a non-abstract constructor type."),
        A_this_based_type_guard_is_not_compatible_with_a_parameter_based_type_guard: diag(2518, ts.DiagnosticCategory.Error, "A_this_based_type_guard_is_not_compatible_with_a_parameter_based_type_guard_2518", "A 'this'-based type guard is not compatible with a parameter-based type guard."),
        An_async_iterator_must_have_a_next_method: diag(2519, ts.DiagnosticCategory.Error, "An_async_iterator_must_have_a_next_method_2519", "An async iterator must have a 'next()' method."),
        Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions: diag(2520, ts.DiagnosticCategory.Error, "Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions_2520", "Duplicate identifier '{0}'. Compiler uses declaration '{1}' to support async functions."),
        Expression_resolves_to_variable_declaration_0_that_compiler_uses_to_support_async_functions: diag(2521, ts.DiagnosticCategory.Error, "Expression_resolves_to_variable_declaration_0_that_compiler_uses_to_support_async_functions_2521", "Expression resolves to variable declaration '{0}' that compiler uses to support async functions."),
        The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES3_and_ES5_Consider_using_a_standard_function_or_method: diag(2522, ts.DiagnosticCategory.Error, "The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES3_and_ES5_Consider_usi_2522", "The 'arguments' object cannot be referenced in an async function or method in ES3 and ES5. Consider using a standard function or method."),
        yield_expressions_cannot_be_used_in_a_parameter_initializer: diag(2523, ts.DiagnosticCategory.Error, "yield_expressions_cannot_be_used_in_a_parameter_initializer_2523", "'yield' expressions cannot be used in a parameter initializer."),
        await_expressions_cannot_be_used_in_a_parameter_initializer: diag(2524, ts.DiagnosticCategory.Error, "await_expressions_cannot_be_used_in_a_parameter_initializer_2524", "'await' expressions cannot be used in a parameter initializer."),
        Initializer_provides_no_value_for_this_binding_element_and_the_binding_element_has_no_default_value: diag(2525, ts.DiagnosticCategory.Error, "Initializer_provides_no_value_for_this_binding_element_and_the_binding_element_has_no_default_value_2525", "Initializer provides no value for this binding element and the binding element has no default value."),
        A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface: diag(2526, ts.DiagnosticCategory.Error, "A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface_2526", "A 'this' type is available only in a non-static member of a class or interface."),
        The_inferred_type_of_0_references_an_inaccessible_this_type_A_type_annotation_is_necessary: diag(2527, ts.DiagnosticCategory.Error, "The_inferred_type_of_0_references_an_inaccessible_this_type_A_type_annotation_is_necessary_2527", "The inferred type of '{0}' references an inaccessible 'this' type. A type annotation is necessary."),
        A_module_cannot_have_multiple_default_exports: diag(2528, ts.DiagnosticCategory.Error, "A_module_cannot_have_multiple_default_exports_2528", "A module cannot have multiple default exports."),
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_containing_async_functions: diag(2529, ts.DiagnosticCategory.Error, "Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_containing_async_func_2529", "Duplicate identifier '{0}'. Compiler reserves name '{1}' in top level scope of a module containing async functions."),
        Property_0_is_incompatible_with_index_signature: diag(2530, ts.DiagnosticCategory.Error, "Property_0_is_incompatible_with_index_signature_2530", "Property '{0}' is incompatible with index signature."),
        Object_is_possibly_null: diag(2531, ts.DiagnosticCategory.Error, "Object_is_possibly_null_2531", "Object is possibly 'null'."),
        Object_is_possibly_undefined: diag(2532, ts.DiagnosticCategory.Error, "Object_is_possibly_undefined_2532", "Object is possibly 'undefined'."),
        Object_is_possibly_null_or_undefined: diag(2533, ts.DiagnosticCategory.Error, "Object_is_possibly_null_or_undefined_2533", "Object is possibly 'null' or 'undefined'."),
        A_function_returning_never_cannot_have_a_reachable_end_point: diag(2534, ts.DiagnosticCategory.Error, "A_function_returning_never_cannot_have_a_reachable_end_point_2534", "A function returning 'never' cannot have a reachable end point."),
        Enum_type_0_has_members_with_initializers_that_are_not_literals: diag(2535, ts.DiagnosticCategory.Error, "Enum_type_0_has_members_with_initializers_that_are_not_literals_2535", "Enum type '{0}' has members with initializers that are not literals."),
        Type_0_cannot_be_used_to_index_type_1: diag(2536, ts.DiagnosticCategory.Error, "Type_0_cannot_be_used_to_index_type_1_2536", "Type '{0}' cannot be used to index type '{1}'."),
        Type_0_has_no_matching_index_signature_for_type_1: diag(2537, ts.DiagnosticCategory.Error, "Type_0_has_no_matching_index_signature_for_type_1_2537", "Type '{0}' has no matching index signature for type '{1}'."),
        Type_0_cannot_be_used_as_an_index_type: diag(2538, ts.DiagnosticCategory.Error, "Type_0_cannot_be_used_as_an_index_type_2538", "Type '{0}' cannot be used as an index type."),
        Cannot_assign_to_0_because_it_is_not_a_variable: diag(2539, ts.DiagnosticCategory.Error, "Cannot_assign_to_0_because_it_is_not_a_variable_2539", "Cannot assign to '{0}' because it is not a variable."),
        Cannot_assign_to_0_because_it_is_a_constant_or_a_read_only_property: diag(2540, ts.DiagnosticCategory.Error, "Cannot_assign_to_0_because_it_is_a_constant_or_a_read_only_property_2540", "Cannot assign to '{0}' because it is a constant or a read-only property."),
        The_target_of_an_assignment_must_be_a_variable_or_a_property_access: diag(2541, ts.DiagnosticCategory.Error, "The_target_of_an_assignment_must_be_a_variable_or_a_property_access_2541", "The target of an assignment must be a variable or a property access."),
        Index_signature_in_type_0_only_permits_reading: diag(2542, ts.DiagnosticCategory.Error, "Index_signature_in_type_0_only_permits_reading_2542", "Index signature in type '{0}' only permits reading."),
        Duplicate_identifier_newTarget_Compiler_uses_variable_declaration_newTarget_to_capture_new_target_meta_property_reference: diag(2543, ts.DiagnosticCategory.Error, "Duplicate_identifier_newTarget_Compiler_uses_variable_declaration_newTarget_to_capture_new_target_me_2543", "Duplicate identifier '_newTarget'. Compiler uses variable declaration '_newTarget' to capture 'new.target' meta-property reference."),
        Expression_resolves_to_variable_declaration_newTarget_that_compiler_uses_to_capture_new_target_meta_property_reference: diag(2544, ts.DiagnosticCategory.Error, "Expression_resolves_to_variable_declaration_newTarget_that_compiler_uses_to_capture_new_target_meta__2544", "Expression resolves to variable declaration '_newTarget' that compiler uses to capture 'new.target' meta-property reference."),
        A_mixin_class_must_have_a_constructor_with_a_single_rest_parameter_of_type_any: diag(2545, ts.DiagnosticCategory.Error, "A_mixin_class_must_have_a_constructor_with_a_single_rest_parameter_of_type_any_2545", "A mixin class must have a constructor with a single rest parameter of type 'any[]'."),
        Property_0_has_conflicting_declarations_and_is_inaccessible_in_type_1: diag(2546, ts.DiagnosticCategory.Error, "Property_0_has_conflicting_declarations_and_is_inaccessible_in_type_1_2546", "Property '{0}' has conflicting declarations and is inaccessible in type '{1}'."),
        The_type_returned_by_the_next_method_of_an_async_iterator_must_be_a_promise_for_a_type_with_a_value_property: diag(2547, ts.DiagnosticCategory.Error, "The_type_returned_by_the_next_method_of_an_async_iterator_must_be_a_promise_for_a_type_with_a_value__2547", "The type returned by the 'next()' method of an async iterator must be a promise for a type with a 'value' property."),
        Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator: diag(2548, ts.DiagnosticCategory.Error, "Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator_2548", "Type '{0}' is not an array type or does not have a '[Symbol.iterator]()' method that returns an iterator."),
        Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator: diag(2549, ts.DiagnosticCategory.Error, "Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns__2549", "Type '{0}' is not an array type or a string type or does not have a '[Symbol.iterator]()' method that returns an iterator."),
        Generic_type_instantiation_is_excessively_deep_and_possibly_infinite: diag(2550, ts.DiagnosticCategory.Error, "Generic_type_instantiation_is_excessively_deep_and_possibly_infinite_2550", "Generic type instantiation is excessively deep and possibly infinite."),
        Property_0_does_not_exist_on_type_1_Did_you_mean_2: diag(2551, ts.DiagnosticCategory.Error, "Property_0_does_not_exist_on_type_1_Did_you_mean_2_2551", "Property '{0}' does not exist on type '{1}'. Did you mean '{2}'?"),
        Cannot_find_name_0_Did_you_mean_1: diag(2552, ts.DiagnosticCategory.Error, "Cannot_find_name_0_Did_you_mean_1_2552", "Cannot find name '{0}'. Did you mean '{1}'?"),
        Computed_values_are_not_permitted_in_an_enum_with_string_valued_members: diag(2553, ts.DiagnosticCategory.Error, "Computed_values_are_not_permitted_in_an_enum_with_string_valued_members_2553", "Computed values are not permitted in an enum with string valued members."),
        Expected_0_arguments_but_got_1: diag(2554, ts.DiagnosticCategory.Error, "Expected_0_arguments_but_got_1_2554", "Expected {0} arguments, but got {1}."),
        Expected_at_least_0_arguments_but_got_1: diag(2555, ts.DiagnosticCategory.Error, "Expected_at_least_0_arguments_but_got_1_2555", "Expected at least {0} arguments, but got {1}."),
        Expected_0_arguments_but_got_a_minimum_of_1: diag(2556, ts.DiagnosticCategory.Error, "Expected_0_arguments_but_got_a_minimum_of_1_2556", "Expected {0} arguments, but got a minimum of {1}."),
        Expected_at_least_0_arguments_but_got_a_minimum_of_1: diag(2557, ts.DiagnosticCategory.Error, "Expected_at_least_0_arguments_but_got_a_minimum_of_1_2557", "Expected at least {0} arguments, but got a minimum of {1}."),
        Expected_0_type_arguments_but_got_1: diag(2558, ts.DiagnosticCategory.Error, "Expected_0_type_arguments_but_got_1_2558", "Expected {0} type arguments, but got {1}."),
        Type_0_has_no_properties_in_common_with_type_1: diag(2559, ts.DiagnosticCategory.Error, "Type_0_has_no_properties_in_common_with_type_1_2559", "Type '{0}' has no properties in common with type '{1}'."),
        Value_of_type_0_has_no_properties_in_common_with_type_1_Did_you_mean_to_call_it: diag(2560, ts.DiagnosticCategory.Error, "Value_of_type_0_has_no_properties_in_common_with_type_1_Did_you_mean_to_call_it_2560", "Value of type '{0}' has no properties in common with type '{1}'. Did you mean to call it?"),
        Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_write_2: diag(2561, ts.DiagnosticCategory.Error, "Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_writ_2561", "Object literal may only specify known properties, but '{0}' does not exist in type '{1}'. Did you mean to write '{2}'?"),
        Base_class_expressions_cannot_reference_class_type_parameters: diag(2562, ts.DiagnosticCategory.Error, "Base_class_expressions_cannot_reference_class_type_parameters_2562", "Base class expressions cannot reference class type parameters."),
        The_containing_function_or_module_body_is_too_large_for_control_flow_analysis: diag(2563, ts.DiagnosticCategory.Error, "The_containing_function_or_module_body_is_too_large_for_control_flow_analysis_2563", "The containing function or module body is too large for control flow analysis."),
        JSX_element_attributes_type_0_may_not_be_a_union_type: diag(2600, ts.DiagnosticCategory.Error, "JSX_element_attributes_type_0_may_not_be_a_union_type_2600", "JSX element attributes type '{0}' may not be a union type."),
        The_return_type_of_a_JSX_element_constructor_must_return_an_object_type: diag(2601, ts.DiagnosticCategory.Error, "The_return_type_of_a_JSX_element_constructor_must_return_an_object_type_2601", "The return type of a JSX element constructor must return an object type."),
        JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist: diag(2602, ts.DiagnosticCategory.Error, "JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist_2602", "JSX element implicitly has type 'any' because the global type 'JSX.Element' does not exist."),
        Property_0_in_type_1_is_not_assignable_to_type_2: diag(2603, ts.DiagnosticCategory.Error, "Property_0_in_type_1_is_not_assignable_to_type_2_2603", "Property '{0}' in type '{1}' is not assignable to type '{2}'."),
        JSX_element_type_0_does_not_have_any_construct_or_call_signatures: diag(2604, ts.DiagnosticCategory.Error, "JSX_element_type_0_does_not_have_any_construct_or_call_signatures_2604", "JSX element type '{0}' does not have any construct or call signatures."),
        JSX_element_type_0_is_not_a_constructor_function_for_JSX_elements: diag(2605, ts.DiagnosticCategory.Error, "JSX_element_type_0_is_not_a_constructor_function_for_JSX_elements_2605", "JSX element type '{0}' is not a constructor function for JSX elements."),
        Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property: diag(2606, ts.DiagnosticCategory.Error, "Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property_2606", "Property '{0}' of JSX spread attribute is not assignable to target property."),
        JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property: diag(2607, ts.DiagnosticCategory.Error, "JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property_2607", "JSX element class does not support attributes because it does not have a '{0}' property."),
        The_global_type_JSX_0_may_not_have_more_than_one_property: diag(2608, ts.DiagnosticCategory.Error, "The_global_type_JSX_0_may_not_have_more_than_one_property_2608", "The global type 'JSX.{0}' may not have more than one property."),
        JSX_spread_child_must_be_an_array_type: diag(2609, ts.DiagnosticCategory.Error, "JSX_spread_child_must_be_an_array_type_2609", "JSX spread child must be an array type."),
        Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity: diag(2649, ts.DiagnosticCategory.Error, "Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity_2649", "Cannot augment module '{0}' with value exports because it resolves to a non-module entity."),
        A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_members_defined_in_other_enums: diag(2651, ts.DiagnosticCategory.Error, "A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_memb_2651", "A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums."),
        Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_default_0_declaration_instead: diag(2652, ts.DiagnosticCategory.Error, "Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_d_2652", "Merged declaration '{0}' cannot include a default export declaration. Consider adding a separate 'export default {0}' declaration instead."),
        Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1: diag(2653, ts.DiagnosticCategory.Error, "Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1_2653", "Non-abstract class expression does not implement inherited abstract member '{0}' from class '{1}'."),
        Exported_external_package_typings_file_cannot_contain_tripleslash_references_Please_contact_the_package_author_to_update_the_package_definition: diag(2654, ts.DiagnosticCategory.Error, "Exported_external_package_typings_file_cannot_contain_tripleslash_references_Please_contact_the_pack_2654", "Exported external package typings file cannot contain tripleslash references. Please contact the package author to update the package definition."),
        Exported_external_package_typings_file_0_is_not_a_module_Please_contact_the_package_author_to_update_the_package_definition: diag(2656, ts.DiagnosticCategory.Error, "Exported_external_package_typings_file_0_is_not_a_module_Please_contact_the_package_author_to_update_2656", "Exported external package typings file '{0}' is not a module. Please contact the package author to update the package definition."),
        JSX_expressions_must_have_one_parent_element: diag(2657, ts.DiagnosticCategory.Error, "JSX_expressions_must_have_one_parent_element_2657", "JSX expressions must have one parent element."),
        Type_0_provides_no_match_for_the_signature_1: diag(2658, ts.DiagnosticCategory.Error, "Type_0_provides_no_match_for_the_signature_1_2658", "Type '{0}' provides no match for the signature '{1}'."),
        super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_higher: diag(2659, ts.DiagnosticCategory.Error, "super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_highe_2659", "'super' is only allowed in members of object literal expressions when option 'target' is 'ES2015' or higher."),
        super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions: diag(2660, ts.DiagnosticCategory.Error, "super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions_2660", "'super' can only be referenced in members of derived classes or object literal expressions."),
        Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module: diag(2661, ts.DiagnosticCategory.Error, "Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module_2661", "Cannot export '{0}'. Only local declarations can be exported from a module."),
        Cannot_find_name_0_Did_you_mean_the_static_member_1_0: diag(2662, ts.DiagnosticCategory.Error, "Cannot_find_name_0_Did_you_mean_the_static_member_1_0_2662", "Cannot find name '{0}'. Did you mean the static member '{1}.{0}'?"),
        Cannot_find_name_0_Did_you_mean_the_instance_member_this_0: diag(2663, ts.DiagnosticCategory.Error, "Cannot_find_name_0_Did_you_mean_the_instance_member_this_0_2663", "Cannot find name '{0}'. Did you mean the instance member 'this.{0}'?"),
        Invalid_module_name_in_augmentation_module_0_cannot_be_found: diag(2664, ts.DiagnosticCategory.Error, "Invalid_module_name_in_augmentation_module_0_cannot_be_found_2664", "Invalid module name in augmentation, module '{0}' cannot be found."),
        Invalid_module_name_in_augmentation_Module_0_resolves_to_an_untyped_module_at_1_which_cannot_be_augmented: diag(2665, ts.DiagnosticCategory.Error, "Invalid_module_name_in_augmentation_Module_0_resolves_to_an_untyped_module_at_1_which_cannot_be_augm_2665", "Invalid module name in augmentation. Module '{0}' resolves to an untyped module at '{1}', which cannot be augmented."),
        Exports_and_export_assignments_are_not_permitted_in_module_augmentations: diag(2666, ts.DiagnosticCategory.Error, "Exports_and_export_assignments_are_not_permitted_in_module_augmentations_2666", "Exports and export assignments are not permitted in module augmentations."),
        Imports_are_not_permitted_in_module_augmentations_Consider_moving_them_to_the_enclosing_external_module: diag(2667, ts.DiagnosticCategory.Error, "Imports_are_not_permitted_in_module_augmentations_Consider_moving_them_to_the_enclosing_external_mod_2667", "Imports are not permitted in module augmentations. Consider moving them to the enclosing external module."),
        export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible: diag(2668, ts.DiagnosticCategory.Error, "export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always__2668", "'export' modifier cannot be applied to ambient modules and module augmentations since they are always visible."),
        Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_declarations: diag(2669, ts.DiagnosticCategory.Error, "Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_2669", "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations."),
        Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambient_context: diag(2670, ts.DiagnosticCategory.Error, "Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambien_2670", "Augmentations for the global scope should have 'declare' modifier unless they appear in already ambient context."),
        Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity: diag(2671, ts.DiagnosticCategory.Error, "Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity_2671", "Cannot augment module '{0}' because it resolves to a non-module entity."),
        Cannot_assign_a_0_constructor_type_to_a_1_constructor_type: diag(2672, ts.DiagnosticCategory.Error, "Cannot_assign_a_0_constructor_type_to_a_1_constructor_type_2672", "Cannot assign a '{0}' constructor type to a '{1}' constructor type."),
        Constructor_of_class_0_is_private_and_only_accessible_within_the_class_declaration: diag(2673, ts.DiagnosticCategory.Error, "Constructor_of_class_0_is_private_and_only_accessible_within_the_class_declaration_2673", "Constructor of class '{0}' is private and only accessible within the class declaration."),
        Constructor_of_class_0_is_protected_and_only_accessible_within_the_class_declaration: diag(2674, ts.DiagnosticCategory.Error, "Constructor_of_class_0_is_protected_and_only_accessible_within_the_class_declaration_2674", "Constructor of class '{0}' is protected and only accessible within the class declaration."),
        Cannot_extend_a_class_0_Class_constructor_is_marked_as_private: diag(2675, ts.DiagnosticCategory.Error, "Cannot_extend_a_class_0_Class_constructor_is_marked_as_private_2675", "Cannot extend a class '{0}'. Class constructor is marked as private."),
        Accessors_must_both_be_abstract_or_non_abstract: diag(2676, ts.DiagnosticCategory.Error, "Accessors_must_both_be_abstract_or_non_abstract_2676", "Accessors must both be abstract or non-abstract."),
        A_type_predicate_s_type_must_be_assignable_to_its_parameter_s_type: diag(2677, ts.DiagnosticCategory.Error, "A_type_predicate_s_type_must_be_assignable_to_its_parameter_s_type_2677", "A type predicate's type must be assignable to its parameter's type."),
        Type_0_is_not_comparable_to_type_1: diag(2678, ts.DiagnosticCategory.Error, "Type_0_is_not_comparable_to_type_1_2678", "Type '{0}' is not comparable to type '{1}'."),
        A_function_that_is_called_with_the_new_keyword_cannot_have_a_this_type_that_is_void: diag(2679, ts.DiagnosticCategory.Error, "A_function_that_is_called_with_the_new_keyword_cannot_have_a_this_type_that_is_void_2679", "A function that is called with the 'new' keyword cannot have a 'this' type that is 'void'."),
        A_0_parameter_must_be_the_first_parameter: diag(2680, ts.DiagnosticCategory.Error, "A_0_parameter_must_be_the_first_parameter_2680", "A '{0}' parameter must be the first parameter."),
        A_constructor_cannot_have_a_this_parameter: diag(2681, ts.DiagnosticCategory.Error, "A_constructor_cannot_have_a_this_parameter_2681", "A constructor cannot have a 'this' parameter."),
        get_and_set_accessor_must_have_the_same_this_type: diag(2682, ts.DiagnosticCategory.Error, "get_and_set_accessor_must_have_the_same_this_type_2682", "'get' and 'set' accessor must have the same 'this' type."),
        this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation: diag(2683, ts.DiagnosticCategory.Error, "this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_2683", "'this' implicitly has type 'any' because it does not have a type annotation."),
        The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1: diag(2684, ts.DiagnosticCategory.Error, "The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1_2684", "The 'this' context of type '{0}' is not assignable to method's 'this' of type '{1}'."),
        The_this_types_of_each_signature_are_incompatible: diag(2685, ts.DiagnosticCategory.Error, "The_this_types_of_each_signature_are_incompatible_2685", "The 'this' types of each signature are incompatible."),
        _0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead: diag(2686, ts.DiagnosticCategory.Error, "_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead_2686", "'{0}' refers to a UMD global, but the current file is a module. Consider adding an import instead."),
        All_declarations_of_0_must_have_identical_modifiers: diag(2687, ts.DiagnosticCategory.Error, "All_declarations_of_0_must_have_identical_modifiers_2687", "All declarations of '{0}' must have identical modifiers."),
        Cannot_find_type_definition_file_for_0: diag(2688, ts.DiagnosticCategory.Error, "Cannot_find_type_definition_file_for_0_2688", "Cannot find type definition file for '{0}'."),
        Cannot_extend_an_interface_0_Did_you_mean_implements: diag(2689, ts.DiagnosticCategory.Error, "Cannot_extend_an_interface_0_Did_you_mean_implements_2689", "Cannot extend an interface '{0}'. Did you mean 'implements'?"),
        An_import_path_cannot_end_with_a_0_extension_Consider_importing_1_instead: diag(2691, ts.DiagnosticCategory.Error, "An_import_path_cannot_end_with_a_0_extension_Consider_importing_1_instead_2691", "An import path cannot end with a '{0}' extension. Consider importing '{1}' instead."),
        _0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible: diag(2692, ts.DiagnosticCategory.Error, "_0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible_2692", "'{0}' is a primitive, but '{1}' is a wrapper object. Prefer using '{0}' when possible."),
        _0_only_refers_to_a_type_but_is_being_used_as_a_value_here: diag(2693, ts.DiagnosticCategory.Error, "_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_2693", "'{0}' only refers to a type, but is being used as a value here."),
        Namespace_0_has_no_exported_member_1: diag(2694, ts.DiagnosticCategory.Error, "Namespace_0_has_no_exported_member_1_2694", "Namespace '{0}' has no exported member '{1}'."),
        Left_side_of_comma_operator_is_unused_and_has_no_side_effects: diag(2695, ts.DiagnosticCategory.Error, "Left_side_of_comma_operator_is_unused_and_has_no_side_effects_2695", "Left side of comma operator is unused and has no side effects."),
        The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead: diag(2696, ts.DiagnosticCategory.Error, "The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead_2696", "The 'Object' type is assignable to very few other types. Did you mean to use the 'any' type instead?"),
        An_async_function_or_method_must_return_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES2015_in_your_lib_option: diag(2697, ts.DiagnosticCategory.Error, "An_async_function_or_method_must_return_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_in_2697", "An async function or method must return a 'Promise'. Make sure you have a declaration for 'Promise' or include 'ES2015' in your `--lib` option."),
        Spread_types_may_only_be_created_from_object_types: diag(2698, ts.DiagnosticCategory.Error, "Spread_types_may_only_be_created_from_object_types_2698", "Spread types may only be created from object types."),
        Static_property_0_conflicts_with_built_in_property_Function_0_of_constructor_function_1: diag(2699, ts.DiagnosticCategory.Error, "Static_property_0_conflicts_with_built_in_property_Function_0_of_constructor_function_1_2699", "Static property '{0}' conflicts with built-in property 'Function.{0}' of constructor function '{1}'."),
        Rest_types_may_only_be_created_from_object_types: diag(2700, ts.DiagnosticCategory.Error, "Rest_types_may_only_be_created_from_object_types_2700", "Rest types may only be created from object types."),
        The_target_of_an_object_rest_assignment_must_be_a_variable_or_a_property_access: diag(2701, ts.DiagnosticCategory.Error, "The_target_of_an_object_rest_assignment_must_be_a_variable_or_a_property_access_2701", "The target of an object rest assignment must be a variable or a property access."),
        _0_only_refers_to_a_type_but_is_being_used_as_a_namespace_here: diag(2702, ts.DiagnosticCategory.Error, "_0_only_refers_to_a_type_but_is_being_used_as_a_namespace_here_2702", "'{0}' only refers to a type, but is being used as a namespace here."),
        The_operand_of_a_delete_operator_must_be_a_property_reference: diag(2703, ts.DiagnosticCategory.Error, "The_operand_of_a_delete_operator_must_be_a_property_reference_2703", "The operand of a delete operator must be a property reference."),
        The_operand_of_a_delete_operator_cannot_be_a_read_only_property: diag(2704, ts.DiagnosticCategory.Error, "The_operand_of_a_delete_operator_cannot_be_a_read_only_property_2704", "The operand of a delete operator cannot be a read-only property."),
        An_async_function_or_method_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option: diag(2705, ts.DiagnosticCategory.Error, "An_async_function_or_method_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_de_2705", "An async function or method in ES5/ES3 requires the 'Promise' constructor.  Make sure you have a declaration for the 'Promise' constructor or include 'ES2015' in your `--lib` option."),
        Required_type_parameters_may_not_follow_optional_type_parameters: diag(2706, ts.DiagnosticCategory.Error, "Required_type_parameters_may_not_follow_optional_type_parameters_2706", "Required type parameters may not follow optional type parameters."),
        Generic_type_0_requires_between_1_and_2_type_arguments: diag(2707, ts.DiagnosticCategory.Error, "Generic_type_0_requires_between_1_and_2_type_arguments_2707", "Generic type '{0}' requires between {1} and {2} type arguments."),
        Cannot_use_namespace_0_as_a_value: diag(2708, ts.DiagnosticCategory.Error, "Cannot_use_namespace_0_as_a_value_2708", "Cannot use namespace '{0}' as a value."),
        Cannot_use_namespace_0_as_a_type: diag(2709, ts.DiagnosticCategory.Error, "Cannot_use_namespace_0_as_a_type_2709", "Cannot use namespace '{0}' as a type."),
        _0_are_specified_twice_The_attribute_named_0_will_be_overwritten: diag(2710, ts.DiagnosticCategory.Error, "_0_are_specified_twice_The_attribute_named_0_will_be_overwritten_2710", "'{0}' are specified twice. The attribute named '{0}' will be overwritten."),
        A_dynamic_import_call_returns_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES2015_in_your_lib_option: diag(2711, ts.DiagnosticCategory.Error, "A_dynamic_import_call_returns_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES20_2711", "A dynamic import call returns a 'Promise'. Make sure you have a declaration for 'Promise' or include 'ES2015' in your `--lib` option."),
        A_dynamic_import_call_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option: diag(2712, ts.DiagnosticCategory.Error, "A_dynamic_import_call_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_declarat_2712", "A dynamic import call in ES5/ES3 requires the 'Promise' constructor.  Make sure you have a declaration for the 'Promise' constructor or include 'ES2015' in your `--lib` option."),
        Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1: diag(2713, ts.DiagnosticCategory.Error, "Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_p_2713", "Cannot access '{0}.{1}' because '{0}' is a type, but not a namespace. Did you mean to retrieve the type of the property '{1}' in '{0}' with '{0}[\"{1}\"]'?"),
        The_expression_of_an_export_assignment_must_be_an_identifier_or_qualified_name_in_an_ambient_context: diag(2714, ts.DiagnosticCategory.Error, "The_expression_of_an_export_assignment_must_be_an_identifier_or_qualified_name_in_an_ambient_context_2714", "The expression of an export assignment must be an identifier or qualified name in an ambient context."),
        Type_parameter_0_has_a_circular_default: diag(2716, ts.DiagnosticCategory.Error, "Type_parameter_0_has_a_circular_default_2716", "Type parameter '{0}' has a circular default."),
        Import_declaration_0_is_using_private_name_1: diag(4000, ts.DiagnosticCategory.Error, "Import_declaration_0_is_using_private_name_1_4000", "Import declaration '{0}' is using private name '{1}'."),
        Type_parameter_0_of_exported_class_has_or_is_using_private_name_1: diag(4002, ts.DiagnosticCategory.Error, "Type_parameter_0_of_exported_class_has_or_is_using_private_name_1_4002", "Type parameter '{0}' of exported class has or is using private name '{1}'."),
        Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1: diag(4004, ts.DiagnosticCategory.Error, "Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1_4004", "Type parameter '{0}' of exported interface has or is using private name '{1}'."),
        Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: diag(4006, ts.DiagnosticCategory.Error, "Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1_4006", "Type parameter '{0}' of constructor signature from exported interface has or is using private name '{1}'."),
        Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: diag(4008, ts.DiagnosticCategory.Error, "Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1_4008", "Type parameter '{0}' of call signature from exported interface has or is using private name '{1}'."),
        Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: diag(4010, ts.DiagnosticCategory.Error, "Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1_4010", "Type parameter '{0}' of public static method from exported class has or is using private name '{1}'."),
        Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: diag(4012, ts.DiagnosticCategory.Error, "Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1_4012", "Type parameter '{0}' of public method from exported class has or is using private name '{1}'."),
        Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: diag(4014, ts.DiagnosticCategory.Error, "Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1_4014", "Type parameter '{0}' of method from exported interface has or is using private name '{1}'."),
        Type_parameter_0_of_exported_function_has_or_is_using_private_name_1: diag(4016, ts.DiagnosticCategory.Error, "Type_parameter_0_of_exported_function_has_or_is_using_private_name_1_4016", "Type parameter '{0}' of exported function has or is using private name '{1}'."),
        Implements_clause_of_exported_class_0_has_or_is_using_private_name_1: diag(4019, ts.DiagnosticCategory.Error, "Implements_clause_of_exported_class_0_has_or_is_using_private_name_1_4019", "Implements clause of exported class '{0}' has or is using private name '{1}'."),
        extends_clause_of_exported_class_0_has_or_is_using_private_name_1: diag(4020, ts.DiagnosticCategory.Error, "extends_clause_of_exported_class_0_has_or_is_using_private_name_1_4020", "'extends' clause of exported class '{0}' has or is using private name '{1}'."),
        extends_clause_of_exported_interface_0_has_or_is_using_private_name_1: diag(4022, ts.DiagnosticCategory.Error, "extends_clause_of_exported_interface_0_has_or_is_using_private_name_1_4022", "'extends' clause of exported interface '{0}' has or is using private name '{1}'."),
        Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: diag(4023, ts.DiagnosticCategory.Error, "Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4023", "Exported variable '{0}' has or is using name '{1}' from external module {2} but cannot be named."),
        Exported_variable_0_has_or_is_using_name_1_from_private_module_2: diag(4024, ts.DiagnosticCategory.Error, "Exported_variable_0_has_or_is_using_name_1_from_private_module_2_4024", "Exported variable '{0}' has or is using name '{1}' from private module '{2}'."),
        Exported_variable_0_has_or_is_using_private_name_1: diag(4025, ts.DiagnosticCategory.Error, "Exported_variable_0_has_or_is_using_private_name_1_4025", "Exported variable '{0}' has or is using private name '{1}'."),
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: diag(4026, ts.DiagnosticCategory.Error, "Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot__4026", "Public static property '{0}' of exported class has or is using name '{1}' from external module {2} but cannot be named."),
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: diag(4027, ts.DiagnosticCategory.Error, "Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2_4027", "Public static property '{0}' of exported class has or is using name '{1}' from private module '{2}'."),
        Public_static_property_0_of_exported_class_has_or_is_using_private_name_1: diag(4028, ts.DiagnosticCategory.Error, "Public_static_property_0_of_exported_class_has_or_is_using_private_name_1_4028", "Public static property '{0}' of exported class has or is using private name '{1}'."),
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: diag(4029, ts.DiagnosticCategory.Error, "Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_name_4029", "Public property '{0}' of exported class has or is using name '{1}' from external module {2} but cannot be named."),
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: diag(4030, ts.DiagnosticCategory.Error, "Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2_4030", "Public property '{0}' of exported class has or is using name '{1}' from private module '{2}'."),
        Public_property_0_of_exported_class_has_or_is_using_private_name_1: diag(4031, ts.DiagnosticCategory.Error, "Public_property_0_of_exported_class_has_or_is_using_private_name_1_4031", "Public property '{0}' of exported class has or is using private name '{1}'."),
        Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2: diag(4032, ts.DiagnosticCategory.Error, "Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2_4032", "Property '{0}' of exported interface has or is using name '{1}' from private module '{2}'."),
        Property_0_of_exported_interface_has_or_is_using_private_name_1: diag(4033, ts.DiagnosticCategory.Error, "Property_0_of_exported_interface_has_or_is_using_private_name_1_4033", "Property '{0}' of exported interface has or is using private name '{1}'."),
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: diag(4034, ts.DiagnosticCategory.Error, "Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_4034", "Parameter '{0}' of public static property setter from exported class has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1: diag(4035, ts.DiagnosticCategory.Error, "Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1_4035", "Parameter '{0}' of public static property setter from exported class has or is using private name '{1}'."),
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: diag(4036, ts.DiagnosticCategory.Error, "Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_4036", "Parameter '{0}' of public property setter from exported class has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1: diag(4037, ts.DiagnosticCategory.Error, "Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1_4037", "Parameter '{0}' of public property setter from exported class has or is using private name '{1}'."),
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: diag(4038, ts.DiagnosticCategory.Error, "Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_externa_4038", "Return type of public static property getter from exported class has or is using name '{0}' from external module {1} but cannot be named."),
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: diag(4039, ts.DiagnosticCategory.Error, "Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_4039", "Return type of public static property getter from exported class has or is using name '{0}' from private module '{1}'."),
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0: diag(4040, ts.DiagnosticCategory.Error, "Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0_4040", "Return type of public static property getter from exported class has or is using private name '{0}'."),
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: diag(4041, ts.DiagnosticCategory.Error, "Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_modul_4041", "Return type of public property getter from exported class has or is using name '{0}' from external module {1} but cannot be named."),
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: diag(4042, ts.DiagnosticCategory.Error, "Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_4042", "Return type of public property getter from exported class has or is using name '{0}' from private module '{1}'."),
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0: diag(4043, ts.DiagnosticCategory.Error, "Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0_4043", "Return type of public property getter from exported class has or is using private name '{0}'."),
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: diag(4044, ts.DiagnosticCategory.Error, "Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_mod_4044", "Return type of constructor signature from exported interface has or is using name '{0}' from private module '{1}'."),
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0: diag(4045, ts.DiagnosticCategory.Error, "Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0_4045", "Return type of constructor signature from exported interface has or is using private name '{0}'."),
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: diag(4046, ts.DiagnosticCategory.Error, "Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4046", "Return type of call signature from exported interface has or is using name '{0}' from private module '{1}'."),
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0: diag(4047, ts.DiagnosticCategory.Error, "Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0_4047", "Return type of call signature from exported interface has or is using private name '{0}'."),
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: diag(4048, ts.DiagnosticCategory.Error, "Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4048", "Return type of index signature from exported interface has or is using name '{0}' from private module '{1}'."),
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0: diag(4049, ts.DiagnosticCategory.Error, "Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0_4049", "Return type of index signature from exported interface has or is using private name '{0}'."),
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: diag(4050, ts.DiagnosticCategory.Error, "Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module__4050", "Return type of public static method from exported class has or is using name '{0}' from external module {1} but cannot be named."),
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: diag(4051, ts.DiagnosticCategory.Error, "Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1_4051", "Return type of public static method from exported class has or is using name '{0}' from private module '{1}'."),
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0: diag(4052, ts.DiagnosticCategory.Error, "Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0_4052", "Return type of public static method from exported class has or is using private name '{0}'."),
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: diag(4053, ts.DiagnosticCategory.Error, "Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_c_4053", "Return type of public method from exported class has or is using name '{0}' from external module {1} but cannot be named."),
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: diag(4054, ts.DiagnosticCategory.Error, "Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1_4054", "Return type of public method from exported class has or is using name '{0}' from private module '{1}'."),
        Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0: diag(4055, ts.DiagnosticCategory.Error, "Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0_4055", "Return type of public method from exported class has or is using private name '{0}'."),
        Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1: diag(4056, ts.DiagnosticCategory.Error, "Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4056", "Return type of method from exported interface has or is using name '{0}' from private module '{1}'."),
        Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0: diag(4057, ts.DiagnosticCategory.Error, "Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0_4057", "Return type of method from exported interface has or is using private name '{0}'."),
        Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: diag(4058, ts.DiagnosticCategory.Error, "Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named_4058", "Return type of exported function has or is using name '{0}' from external module {1} but cannot be named."),
        Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1: diag(4059, ts.DiagnosticCategory.Error, "Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1_4059", "Return type of exported function has or is using name '{0}' from private module '{1}'."),
        Return_type_of_exported_function_has_or_is_using_private_name_0: diag(4060, ts.DiagnosticCategory.Error, "Return_type_of_exported_function_has_or_is_using_private_name_0_4060", "Return type of exported function has or is using private name '{0}'."),
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: diag(4061, ts.DiagnosticCategory.Error, "Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_can_4061", "Parameter '{0}' of constructor from exported class has or is using name '{1}' from external module {2} but cannot be named."),
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2: diag(4062, ts.DiagnosticCategory.Error, "Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2_4062", "Parameter '{0}' of constructor from exported class has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1: diag(4063, ts.DiagnosticCategory.Error, "Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1_4063", "Parameter '{0}' of constructor from exported class has or is using private name '{1}'."),
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: diag(4064, ts.DiagnosticCategory.Error, "Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_mod_4064", "Parameter '{0}' of constructor signature from exported interface has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: diag(4065, ts.DiagnosticCategory.Error, "Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1_4065", "Parameter '{0}' of constructor signature from exported interface has or is using private name '{1}'."),
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: diag(4066, ts.DiagnosticCategory.Error, "Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2_4066", "Parameter '{0}' of call signature from exported interface has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: diag(4067, ts.DiagnosticCategory.Error, "Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1_4067", "Parameter '{0}' of call signature from exported interface has or is using private name '{1}'."),
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: diag(4068, ts.DiagnosticCategory.Error, "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module__4068", "Parameter '{0}' of public static method from exported class has or is using name '{1}' from external module {2} but cannot be named."),
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: diag(4069, ts.DiagnosticCategory.Error, "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2_4069", "Parameter '{0}' of public static method from exported class has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: diag(4070, ts.DiagnosticCategory.Error, "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1_4070", "Parameter '{0}' of public static method from exported class has or is using private name '{1}'."),
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: diag(4071, ts.DiagnosticCategory.Error, "Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_c_4071", "Parameter '{0}' of public method from exported class has or is using name '{1}' from external module {2} but cannot be named."),
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: diag(4072, ts.DiagnosticCategory.Error, "Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2_4072", "Parameter '{0}' of public method from exported class has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: diag(4073, ts.DiagnosticCategory.Error, "Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1_4073", "Parameter '{0}' of public method from exported class has or is using private name '{1}'."),
        Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2: diag(4074, ts.DiagnosticCategory.Error, "Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2_4074", "Parameter '{0}' of method from exported interface has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: diag(4075, ts.DiagnosticCategory.Error, "Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1_4075", "Parameter '{0}' of method from exported interface has or is using private name '{1}'."),
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: diag(4076, ts.DiagnosticCategory.Error, "Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4076", "Parameter '{0}' of exported function has or is using name '{1}' from external module {2} but cannot be named."),
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2: diag(4077, ts.DiagnosticCategory.Error, "Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2_4077", "Parameter '{0}' of exported function has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_exported_function_has_or_is_using_private_name_1: diag(4078, ts.DiagnosticCategory.Error, "Parameter_0_of_exported_function_has_or_is_using_private_name_1_4078", "Parameter '{0}' of exported function has or is using private name '{1}'."),
        Exported_type_alias_0_has_or_is_using_private_name_1: diag(4081, ts.DiagnosticCategory.Error, "Exported_type_alias_0_has_or_is_using_private_name_1_4081", "Exported type alias '{0}' has or is using private name '{1}'."),
        Default_export_of_the_module_has_or_is_using_private_name_0: diag(4082, ts.DiagnosticCategory.Error, "Default_export_of_the_module_has_or_is_using_private_name_0_4082", "Default export of the module has or is using private name '{0}'."),
        Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1: diag(4083, ts.DiagnosticCategory.Error, "Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1_4083", "Type parameter '{0}' of exported type alias has or is using private name '{1}'."),
        Conflicting_definitions_for_0_found_at_1_and_2_Consider_installing_a_specific_version_of_this_library_to_resolve_the_conflict: diag(4090, ts.DiagnosticCategory.Message, "Conflicting_definitions_for_0_found_at_1_and_2_Consider_installing_a_specific_version_of_this_librar_4090", "Conflicting definitions for '{0}' found at '{1}' and '{2}'. Consider installing a specific version of this library to resolve the conflict."),
        Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: diag(4091, ts.DiagnosticCategory.Error, "Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2_4091", "Parameter '{0}' of index signature from exported interface has or is using name '{1}' from private module '{2}'."),
        Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1: diag(4092, ts.DiagnosticCategory.Error, "Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1_4092", "Parameter '{0}' of index signature from exported interface has or is using private name '{1}'."),
        Property_0_of_exported_class_expression_may_not_be_private_or_protected: diag(4094, ts.DiagnosticCategory.Error, "Property_0_of_exported_class_expression_may_not_be_private_or_protected_4094", "Property '{0}' of exported class expression may not be private or protected."),
        The_current_host_does_not_support_the_0_option: diag(5001, ts.DiagnosticCategory.Error, "The_current_host_does_not_support_the_0_option_5001", "The current host does not support the '{0}' option."),
        Cannot_find_the_common_subdirectory_path_for_the_input_files: diag(5009, ts.DiagnosticCategory.Error, "Cannot_find_the_common_subdirectory_path_for_the_input_files_5009", "Cannot find the common subdirectory path for the input files."),
        File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0: diag(5010, ts.DiagnosticCategory.Error, "File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0_5010", "File specification cannot end in a recursive directory wildcard ('**'): '{0}'."),
        File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0: diag(5011, ts.DiagnosticCategory.Error, "File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0_5011", "File specification cannot contain multiple recursive directory wildcards ('**'): '{0}'."),
        Cannot_read_file_0_Colon_1: diag(5012, ts.DiagnosticCategory.Error, "Cannot_read_file_0_Colon_1_5012", "Cannot read file '{0}': {1}."),
        Failed_to_parse_file_0_Colon_1: diag(5014, ts.DiagnosticCategory.Error, "Failed_to_parse_file_0_Colon_1_5014", "Failed to parse file '{0}': {1}."),
        Unknown_compiler_option_0: diag(5023, ts.DiagnosticCategory.Error, "Unknown_compiler_option_0_5023", "Unknown compiler option '{0}'."),
        Compiler_option_0_requires_a_value_of_type_1: diag(5024, ts.DiagnosticCategory.Error, "Compiler_option_0_requires_a_value_of_type_1_5024", "Compiler option '{0}' requires a value of type {1}."),
        Could_not_write_file_0_Colon_1: diag(5033, ts.DiagnosticCategory.Error, "Could_not_write_file_0_Colon_1_5033", "Could not write file '{0}': {1}."),
        Option_project_cannot_be_mixed_with_source_files_on_a_command_line: diag(5042, ts.DiagnosticCategory.Error, "Option_project_cannot_be_mixed_with_source_files_on_a_command_line_5042", "Option 'project' cannot be mixed with source files on a command line."),
        Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher: diag(5047, ts.DiagnosticCategory.Error, "Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES_5047", "Option 'isolatedModules' can only be used when either option '--module' is provided or option 'target' is 'ES2015' or higher."),
        Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided: diag(5051, ts.DiagnosticCategory.Error, "Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided_5051", "Option '{0} can only be used when either option '--inlineSourceMap' or option '--sourceMap' is provided."),
        Option_0_cannot_be_specified_without_specifying_option_1: diag(5052, ts.DiagnosticCategory.Error, "Option_0_cannot_be_specified_without_specifying_option_1_5052", "Option '{0}' cannot be specified without specifying option '{1}'."),
        Option_0_cannot_be_specified_with_option_1: diag(5053, ts.DiagnosticCategory.Error, "Option_0_cannot_be_specified_with_option_1_5053", "Option '{0}' cannot be specified with option '{1}'."),
        A_tsconfig_json_file_is_already_defined_at_Colon_0: diag(5054, ts.DiagnosticCategory.Error, "A_tsconfig_json_file_is_already_defined_at_Colon_0_5054", "A 'tsconfig.json' file is already defined at: '{0}'."),
        Cannot_write_file_0_because_it_would_overwrite_input_file: diag(5055, ts.DiagnosticCategory.Error, "Cannot_write_file_0_because_it_would_overwrite_input_file_5055", "Cannot write file '{0}' because it would overwrite input file."),
        Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files: diag(5056, ts.DiagnosticCategory.Error, "Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files_5056", "Cannot write file '{0}' because it would be overwritten by multiple input files."),
        Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0: diag(5057, ts.DiagnosticCategory.Error, "Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0_5057", "Cannot find a tsconfig.json file at the specified directory: '{0}'."),
        The_specified_path_does_not_exist_Colon_0: diag(5058, ts.DiagnosticCategory.Error, "The_specified_path_does_not_exist_Colon_0_5058", "The specified path does not exist: '{0}'."),
        Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier: diag(5059, ts.DiagnosticCategory.Error, "Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier_5059", "Invalid value for '--reactNamespace'. '{0}' is not a valid identifier."),
        Option_paths_cannot_be_used_without_specifying_baseUrl_option: diag(5060, ts.DiagnosticCategory.Error, "Option_paths_cannot_be_used_without_specifying_baseUrl_option_5060", "Option 'paths' cannot be used without specifying '--baseUrl' option."),
        Pattern_0_can_have_at_most_one_Asterisk_character: diag(5061, ts.DiagnosticCategory.Error, "Pattern_0_can_have_at_most_one_Asterisk_character_5061", "Pattern '{0}' can have at most one '*' character."),
        Substitution_0_in_pattern_1_in_can_have_at_most_one_Asterisk_character: diag(5062, ts.DiagnosticCategory.Error, "Substitution_0_in_pattern_1_in_can_have_at_most_one_Asterisk_character_5062", "Substitution '{0}' in pattern '{1}' in can have at most one '*' character."),
        Substitutions_for_pattern_0_should_be_an_array: diag(5063, ts.DiagnosticCategory.Error, "Substitutions_for_pattern_0_should_be_an_array_5063", "Substitutions for pattern '{0}' should be an array."),
        Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2: diag(5064, ts.DiagnosticCategory.Error, "Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2_5064", "Substitution '{0}' for pattern '{1}' has incorrect type, expected 'string', got '{2}'."),
        File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0: diag(5065, ts.DiagnosticCategory.Error, "File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildca_5065", "File specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '{0}'."),
        Substitutions_for_pattern_0_shouldn_t_be_an_empty_array: diag(5066, ts.DiagnosticCategory.Error, "Substitutions_for_pattern_0_shouldn_t_be_an_empty_array_5066", "Substitutions for pattern '{0}' shouldn't be an empty array."),
        Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name: diag(5067, ts.DiagnosticCategory.Error, "Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name_5067", "Invalid value for 'jsxFactory'. '{0}' is not a valid identifier or qualified-name."),
        Concatenate_and_emit_output_to_single_file: diag(6001, ts.DiagnosticCategory.Message, "Concatenate_and_emit_output_to_single_file_6001", "Concatenate and emit output to single file."),
        Generates_corresponding_d_ts_file: diag(6002, ts.DiagnosticCategory.Message, "Generates_corresponding_d_ts_file_6002", "Generates corresponding '.d.ts' file."),
        Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations: diag(6003, ts.DiagnosticCategory.Message, "Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations_6003", "Specify the location where debugger should locate map files instead of generated locations."),
        Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations: diag(6004, ts.DiagnosticCategory.Message, "Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations_6004", "Specify the location where debugger should locate TypeScript files instead of source locations."),
        Watch_input_files: diag(6005, ts.DiagnosticCategory.Message, "Watch_input_files_6005", "Watch input files."),
        Redirect_output_structure_to_the_directory: diag(6006, ts.DiagnosticCategory.Message, "Redirect_output_structure_to_the_directory_6006", "Redirect output structure to the directory."),
        Do_not_erase_const_enum_declarations_in_generated_code: diag(6007, ts.DiagnosticCategory.Message, "Do_not_erase_const_enum_declarations_in_generated_code_6007", "Do not erase const enum declarations in generated code."),
        Do_not_emit_outputs_if_any_errors_were_reported: diag(6008, ts.DiagnosticCategory.Message, "Do_not_emit_outputs_if_any_errors_were_reported_6008", "Do not emit outputs if any errors were reported."),
        Do_not_emit_comments_to_output: diag(6009, ts.DiagnosticCategory.Message, "Do_not_emit_comments_to_output_6009", "Do not emit comments to output."),
        Do_not_emit_outputs: diag(6010, ts.DiagnosticCategory.Message, "Do_not_emit_outputs_6010", "Do not emit outputs."),
        Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking: diag(6011, ts.DiagnosticCategory.Message, "Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typech_6011", "Allow default imports from modules with no default export. This does not affect code emit, just typechecking."),
        Skip_type_checking_of_declaration_files: diag(6012, ts.DiagnosticCategory.Message, "Skip_type_checking_of_declaration_files_6012", "Skip type checking of declaration files."),
        Do_not_resolve_the_real_path_of_symlinks: diag(6013, ts.DiagnosticCategory.Message, "Do_not_resolve_the_real_path_of_symlinks_6013", "Do not resolve the real path of symlinks."),
        Specify_ECMAScript_target_version_Colon_ES3_default_ES5_ES2015_ES2016_ES2017_or_ESNEXT: diag(6015, ts.DiagnosticCategory.Message, "Specify_ECMAScript_target_version_Colon_ES3_default_ES5_ES2015_ES2016_ES2017_or_ESNEXT_6015", "Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'."),
        Specify_module_code_generation_Colon_none_commonjs_amd_system_umd_es2015_or_ESNext: diag(6016, ts.DiagnosticCategory.Message, "Specify_module_code_generation_Colon_none_commonjs_amd_system_umd_es2015_or_ESNext_6016", "Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'."),
        Print_this_message: diag(6017, ts.DiagnosticCategory.Message, "Print_this_message_6017", "Print this message."),
        Print_the_compiler_s_version: diag(6019, ts.DiagnosticCategory.Message, "Print_the_compiler_s_version_6019", "Print the compiler's version."),
        Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json: diag(6020, ts.DiagnosticCategory.Message, "Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json_6020", "Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'."),
        Syntax_Colon_0: diag(6023, ts.DiagnosticCategory.Message, "Syntax_Colon_0_6023", "Syntax: {0}"),
        options: diag(6024, ts.DiagnosticCategory.Message, "options_6024", "options"),
        file: diag(6025, ts.DiagnosticCategory.Message, "file_6025", "file"),
        Examples_Colon_0: diag(6026, ts.DiagnosticCategory.Message, "Examples_Colon_0_6026", "Examples: {0}"),
        Options_Colon: diag(6027, ts.DiagnosticCategory.Message, "Options_Colon_6027", "Options:"),
        Version_0: diag(6029, ts.DiagnosticCategory.Message, "Version_0_6029", "Version {0}"),
        Insert_command_line_options_and_files_from_a_file: diag(6030, ts.DiagnosticCategory.Message, "Insert_command_line_options_and_files_from_a_file_6030", "Insert command line options and files from a file."),
        File_change_detected_Starting_incremental_compilation: diag(6032, ts.DiagnosticCategory.Message, "File_change_detected_Starting_incremental_compilation_6032", "File change detected. Starting incremental compilation..."),
        KIND: diag(6034, ts.DiagnosticCategory.Message, "KIND_6034", "KIND"),
        FILE: diag(6035, ts.DiagnosticCategory.Message, "FILE_6035", "FILE"),
        VERSION: diag(6036, ts.DiagnosticCategory.Message, "VERSION_6036", "VERSION"),
        LOCATION: diag(6037, ts.DiagnosticCategory.Message, "LOCATION_6037", "LOCATION"),
        DIRECTORY: diag(6038, ts.DiagnosticCategory.Message, "DIRECTORY_6038", "DIRECTORY"),
        STRATEGY: diag(6039, ts.DiagnosticCategory.Message, "STRATEGY_6039", "STRATEGY"),
        FILE_OR_DIRECTORY: diag(6040, ts.DiagnosticCategory.Message, "FILE_OR_DIRECTORY_6040", "FILE OR DIRECTORY"),
        Compilation_complete_Watching_for_file_changes: diag(6042, ts.DiagnosticCategory.Message, "Compilation_complete_Watching_for_file_changes_6042", "Compilation complete. Watching for file changes."),
        Generates_corresponding_map_file: diag(6043, ts.DiagnosticCategory.Message, "Generates_corresponding_map_file_6043", "Generates corresponding '.map' file."),
        Compiler_option_0_expects_an_argument: diag(6044, ts.DiagnosticCategory.Error, "Compiler_option_0_expects_an_argument_6044", "Compiler option '{0}' expects an argument."),
        Unterminated_quoted_string_in_response_file_0: diag(6045, ts.DiagnosticCategory.Error, "Unterminated_quoted_string_in_response_file_0_6045", "Unterminated quoted string in response file '{0}'."),
        Argument_for_0_option_must_be_Colon_1: diag(6046, ts.DiagnosticCategory.Error, "Argument_for_0_option_must_be_Colon_1_6046", "Argument for '{0}' option must be: {1}."),
        Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1: diag(6048, ts.DiagnosticCategory.Error, "Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1_6048", "Locale must be of the form <language> or <language>-<territory>. For example '{0}' or '{1}'."),
        Unsupported_locale_0: diag(6049, ts.DiagnosticCategory.Error, "Unsupported_locale_0_6049", "Unsupported locale '{0}'."),
        Unable_to_open_file_0: diag(6050, ts.DiagnosticCategory.Error, "Unable_to_open_file_0_6050", "Unable to open file '{0}'."),
        Corrupted_locale_file_0: diag(6051, ts.DiagnosticCategory.Error, "Corrupted_locale_file_0_6051", "Corrupted locale file {0}."),
        Raise_error_on_expressions_and_declarations_with_an_implied_any_type: diag(6052, ts.DiagnosticCategory.Message, "Raise_error_on_expressions_and_declarations_with_an_implied_any_type_6052", "Raise error on expressions and declarations with an implied 'any' type."),
        File_0_not_found: diag(6053, ts.DiagnosticCategory.Error, "File_0_not_found_6053", "File '{0}' not found."),
        File_0_has_unsupported_extension_The_only_supported_extensions_are_1: diag(6054, ts.DiagnosticCategory.Error, "File_0_has_unsupported_extension_The_only_supported_extensions_are_1_6054", "File '{0}' has unsupported extension. The only supported extensions are {1}."),
        Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures: diag(6055, ts.DiagnosticCategory.Message, "Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures_6055", "Suppress noImplicitAny errors for indexing objects lacking index signatures."),
        Do_not_emit_declarations_for_code_that_has_an_internal_annotation: diag(6056, ts.DiagnosticCategory.Message, "Do_not_emit_declarations_for_code_that_has_an_internal_annotation_6056", "Do not emit declarations for code that has an '@internal' annotation."),
        Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir: diag(6058, ts.DiagnosticCategory.Message, "Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir_6058", "Specify the root directory of input files. Use to control the output directory structure with --outDir."),
        File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files: diag(6059, ts.DiagnosticCategory.Error, "File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files_6059", "File '{0}' is not under 'rootDir' '{1}'. 'rootDir' is expected to contain all source files."),
        Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix: diag(6060, ts.DiagnosticCategory.Message, "Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix_6060", "Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix)."),
        NEWLINE: diag(6061, ts.DiagnosticCategory.Message, "NEWLINE_6061", "NEWLINE"),
        Option_0_can_only_be_specified_in_tsconfig_json_file: diag(6064, ts.DiagnosticCategory.Error, "Option_0_can_only_be_specified_in_tsconfig_json_file_6064", "Option '{0}' can only be specified in 'tsconfig.json' file."),
        Enables_experimental_support_for_ES7_decorators: diag(6065, ts.DiagnosticCategory.Message, "Enables_experimental_support_for_ES7_decorators_6065", "Enables experimental support for ES7 decorators."),
        Enables_experimental_support_for_emitting_type_metadata_for_decorators: diag(6066, ts.DiagnosticCategory.Message, "Enables_experimental_support_for_emitting_type_metadata_for_decorators_6066", "Enables experimental support for emitting type metadata for decorators."),
        Enables_experimental_support_for_ES7_async_functions: diag(6068, ts.DiagnosticCategory.Message, "Enables_experimental_support_for_ES7_async_functions_6068", "Enables experimental support for ES7 async functions."),
        Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6: diag(6069, ts.DiagnosticCategory.Message, "Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6_6069", "Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6)."),
        Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file: diag(6070, ts.DiagnosticCategory.Message, "Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file_6070", "Initializes a TypeScript project and creates a tsconfig.json file."),
        Successfully_created_a_tsconfig_json_file: diag(6071, ts.DiagnosticCategory.Message, "Successfully_created_a_tsconfig_json_file_6071", "Successfully created a tsconfig.json file."),
        Suppress_excess_property_checks_for_object_literals: diag(6072, ts.DiagnosticCategory.Message, "Suppress_excess_property_checks_for_object_literals_6072", "Suppress excess property checks for object literals."),
        Stylize_errors_and_messages_using_color_and_context_experimental: diag(6073, ts.DiagnosticCategory.Message, "Stylize_errors_and_messages_using_color_and_context_experimental_6073", "Stylize errors and messages using color and context (experimental)."),
        Do_not_report_errors_on_unused_labels: diag(6074, ts.DiagnosticCategory.Message, "Do_not_report_errors_on_unused_labels_6074", "Do not report errors on unused labels."),
        Report_error_when_not_all_code_paths_in_function_return_a_value: diag(6075, ts.DiagnosticCategory.Message, "Report_error_when_not_all_code_paths_in_function_return_a_value_6075", "Report error when not all code paths in function return a value."),
        Report_errors_for_fallthrough_cases_in_switch_statement: diag(6076, ts.DiagnosticCategory.Message, "Report_errors_for_fallthrough_cases_in_switch_statement_6076", "Report errors for fallthrough cases in switch statement."),
        Do_not_report_errors_on_unreachable_code: diag(6077, ts.DiagnosticCategory.Message, "Do_not_report_errors_on_unreachable_code_6077", "Do not report errors on unreachable code."),
        Disallow_inconsistently_cased_references_to_the_same_file: diag(6078, ts.DiagnosticCategory.Message, "Disallow_inconsistently_cased_references_to_the_same_file_6078", "Disallow inconsistently-cased references to the same file."),
        Specify_library_files_to_be_included_in_the_compilation_Colon: diag(6079, ts.DiagnosticCategory.Message, "Specify_library_files_to_be_included_in_the_compilation_Colon_6079", "Specify library files to be included in the compilation: "),
        Specify_JSX_code_generation_Colon_preserve_react_native_or_react: diag(6080, ts.DiagnosticCategory.Message, "Specify_JSX_code_generation_Colon_preserve_react_native_or_react_6080", "Specify JSX code generation: 'preserve', 'react-native', or 'react'."),
        File_0_has_an_unsupported_extension_so_skipping_it: diag(6081, ts.DiagnosticCategory.Message, "File_0_has_an_unsupported_extension_so_skipping_it_6081", "File '{0}' has an unsupported extension, so skipping it."),
        Only_amd_and_system_modules_are_supported_alongside_0: diag(6082, ts.DiagnosticCategory.Error, "Only_amd_and_system_modules_are_supported_alongside_0_6082", "Only 'amd' and 'system' modules are supported alongside --{0}."),
        Base_directory_to_resolve_non_absolute_module_names: diag(6083, ts.DiagnosticCategory.Message, "Base_directory_to_resolve_non_absolute_module_names_6083", "Base directory to resolve non-absolute module names."),
        Deprecated_Use_jsxFactory_instead_Specify_the_object_invoked_for_createElement_when_targeting_react_JSX_emit: diag(6084, ts.DiagnosticCategory.Message, "Deprecated_Use_jsxFactory_instead_Specify_the_object_invoked_for_createElement_when_targeting_react__6084", "[Deprecated] Use '--jsxFactory' instead. Specify the object invoked for createElement when targeting 'react' JSX emit"),
        Enable_tracing_of_the_name_resolution_process: diag(6085, ts.DiagnosticCategory.Message, "Enable_tracing_of_the_name_resolution_process_6085", "Enable tracing of the name resolution process."),
        Resolving_module_0_from_1: diag(6086, ts.DiagnosticCategory.Message, "Resolving_module_0_from_1_6086", "======== Resolving module '{0}' from '{1}'. ========"),
        Explicitly_specified_module_resolution_kind_Colon_0: diag(6087, ts.DiagnosticCategory.Message, "Explicitly_specified_module_resolution_kind_Colon_0_6087", "Explicitly specified module resolution kind: '{0}'."),
        Module_resolution_kind_is_not_specified_using_0: diag(6088, ts.DiagnosticCategory.Message, "Module_resolution_kind_is_not_specified_using_0_6088", "Module resolution kind is not specified, using '{0}'."),
        Module_name_0_was_successfully_resolved_to_1: diag(6089, ts.DiagnosticCategory.Message, "Module_name_0_was_successfully_resolved_to_1_6089", "======== Module name '{0}' was successfully resolved to '{1}'. ========"),
        Module_name_0_was_not_resolved: diag(6090, ts.DiagnosticCategory.Message, "Module_name_0_was_not_resolved_6090", "======== Module name '{0}' was not resolved. ========"),
        paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0: diag(6091, ts.DiagnosticCategory.Message, "paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0_6091", "'paths' option is specified, looking for a pattern to match module name '{0}'."),
        Module_name_0_matched_pattern_1: diag(6092, ts.DiagnosticCategory.Message, "Module_name_0_matched_pattern_1_6092", "Module name '{0}', matched pattern '{1}'."),
        Trying_substitution_0_candidate_module_location_Colon_1: diag(6093, ts.DiagnosticCategory.Message, "Trying_substitution_0_candidate_module_location_Colon_1_6093", "Trying substitution '{0}', candidate module location: '{1}'."),
        Resolving_module_name_0_relative_to_base_url_1_2: diag(6094, ts.DiagnosticCategory.Message, "Resolving_module_name_0_relative_to_base_url_1_2_6094", "Resolving module name '{0}' relative to base url '{1}' - '{2}'."),
        Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_type_1: diag(6095, ts.DiagnosticCategory.Message, "Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_type_1_6095", "Loading module as file / folder, candidate module location '{0}', target file type '{1}'."),
        File_0_does_not_exist: diag(6096, ts.DiagnosticCategory.Message, "File_0_does_not_exist_6096", "File '{0}' does not exist."),
        File_0_exist_use_it_as_a_name_resolution_result: diag(6097, ts.DiagnosticCategory.Message, "File_0_exist_use_it_as_a_name_resolution_result_6097", "File '{0}' exist - use it as a name resolution result."),
        Loading_module_0_from_node_modules_folder_target_file_type_1: diag(6098, ts.DiagnosticCategory.Message, "Loading_module_0_from_node_modules_folder_target_file_type_1_6098", "Loading module '{0}' from 'node_modules' folder, target file type '{1}'."),
        Found_package_json_at_0: diag(6099, ts.DiagnosticCategory.Message, "Found_package_json_at_0_6099", "Found 'package.json' at '{0}'."),
        package_json_does_not_have_a_0_field: diag(6100, ts.DiagnosticCategory.Message, "package_json_does_not_have_a_0_field_6100", "'package.json' does not have a '{0}' field."),
        package_json_has_0_field_1_that_references_2: diag(6101, ts.DiagnosticCategory.Message, "package_json_has_0_field_1_that_references_2_6101", "'package.json' has '{0}' field '{1}' that references '{2}'."),
        Allow_javascript_files_to_be_compiled: diag(6102, ts.DiagnosticCategory.Message, "Allow_javascript_files_to_be_compiled_6102", "Allow javascript files to be compiled."),
        Option_0_should_have_array_of_strings_as_a_value: diag(6103, ts.DiagnosticCategory.Error, "Option_0_should_have_array_of_strings_as_a_value_6103", "Option '{0}' should have array of strings as a value."),
        Checking_if_0_is_the_longest_matching_prefix_for_1_2: diag(6104, ts.DiagnosticCategory.Message, "Checking_if_0_is_the_longest_matching_prefix_for_1_2_6104", "Checking if '{0}' is the longest matching prefix for '{1}' - '{2}'."),
        Expected_type_of_0_field_in_package_json_to_be_string_got_1: diag(6105, ts.DiagnosticCategory.Message, "Expected_type_of_0_field_in_package_json_to_be_string_got_1_6105", "Expected type of '{0}' field in 'package.json' to be 'string', got '{1}'."),
        baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1: diag(6106, ts.DiagnosticCategory.Message, "baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1_6106", "'baseUrl' option is set to '{0}', using this value to resolve non-relative module name '{1}'."),
        rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0: diag(6107, ts.DiagnosticCategory.Message, "rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0_6107", "'rootDirs' option is set, using it to resolve relative module name '{0}'."),
        Longest_matching_prefix_for_0_is_1: diag(6108, ts.DiagnosticCategory.Message, "Longest_matching_prefix_for_0_is_1_6108", "Longest matching prefix for '{0}' is '{1}'."),
        Loading_0_from_the_root_dir_1_candidate_location_2: diag(6109, ts.DiagnosticCategory.Message, "Loading_0_from_the_root_dir_1_candidate_location_2_6109", "Loading '{0}' from the root dir '{1}', candidate location '{2}'."),
        Trying_other_entries_in_rootDirs: diag(6110, ts.DiagnosticCategory.Message, "Trying_other_entries_in_rootDirs_6110", "Trying other entries in 'rootDirs'."),
        Module_resolution_using_rootDirs_has_failed: diag(6111, ts.DiagnosticCategory.Message, "Module_resolution_using_rootDirs_has_failed_6111", "Module resolution using 'rootDirs' has failed."),
        Do_not_emit_use_strict_directives_in_module_output: diag(6112, ts.DiagnosticCategory.Message, "Do_not_emit_use_strict_directives_in_module_output_6112", "Do not emit 'use strict' directives in module output."),
        Enable_strict_null_checks: diag(6113, ts.DiagnosticCategory.Message, "Enable_strict_null_checks_6113", "Enable strict null checks."),
        Unknown_option_excludes_Did_you_mean_exclude: diag(6114, ts.DiagnosticCategory.Error, "Unknown_option_excludes_Did_you_mean_exclude_6114", "Unknown option 'excludes'. Did you mean 'exclude'?"),
        Raise_error_on_this_expressions_with_an_implied_any_type: diag(6115, ts.DiagnosticCategory.Message, "Raise_error_on_this_expressions_with_an_implied_any_type_6115", "Raise error on 'this' expressions with an implied 'any' type."),
        Resolving_type_reference_directive_0_containing_file_1_root_directory_2: diag(6116, ts.DiagnosticCategory.Message, "Resolving_type_reference_directive_0_containing_file_1_root_directory_2_6116", "======== Resolving type reference directive '{0}', containing file '{1}', root directory '{2}'. ========"),
        Resolving_using_primary_search_paths: diag(6117, ts.DiagnosticCategory.Message, "Resolving_using_primary_search_paths_6117", "Resolving using primary search paths..."),
        Resolving_from_node_modules_folder: diag(6118, ts.DiagnosticCategory.Message, "Resolving_from_node_modules_folder_6118", "Resolving from node_modules folder..."),
        Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2: diag(6119, ts.DiagnosticCategory.Message, "Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2_6119", "======== Type reference directive '{0}' was successfully resolved to '{1}', primary: {2}. ========"),
        Type_reference_directive_0_was_not_resolved: diag(6120, ts.DiagnosticCategory.Message, "Type_reference_directive_0_was_not_resolved_6120", "======== Type reference directive '{0}' was not resolved. ========"),
        Resolving_with_primary_search_path_0: diag(6121, ts.DiagnosticCategory.Message, "Resolving_with_primary_search_path_0_6121", "Resolving with primary search path '{0}'."),
        Root_directory_cannot_be_determined_skipping_primary_search_paths: diag(6122, ts.DiagnosticCategory.Message, "Root_directory_cannot_be_determined_skipping_primary_search_paths_6122", "Root directory cannot be determined, skipping primary search paths."),
        Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set: diag(6123, ts.DiagnosticCategory.Message, "Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set_6123", "======== Resolving type reference directive '{0}', containing file '{1}', root directory not set. ========"),
        Type_declaration_files_to_be_included_in_compilation: diag(6124, ts.DiagnosticCategory.Message, "Type_declaration_files_to_be_included_in_compilation_6124", "Type declaration files to be included in compilation."),
        Looking_up_in_node_modules_folder_initial_location_0: diag(6125, ts.DiagnosticCategory.Message, "Looking_up_in_node_modules_folder_initial_location_0_6125", "Looking up in 'node_modules' folder, initial location '{0}'."),
        Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder: diag(6126, ts.DiagnosticCategory.Message, "Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_mod_6126", "Containing file is not specified and root directory cannot be determined, skipping lookup in 'node_modules' folder."),
        Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1: diag(6127, ts.DiagnosticCategory.Message, "Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1_6127", "======== Resolving type reference directive '{0}', containing file not set, root directory '{1}'. ========"),
        Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set: diag(6128, ts.DiagnosticCategory.Message, "Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set_6128", "======== Resolving type reference directive '{0}', containing file not set, root directory not set. ========"),
        Resolving_real_path_for_0_result_1: diag(6130, ts.DiagnosticCategory.Message, "Resolving_real_path_for_0_result_1_6130", "Resolving real path for '{0}', result '{1}'."),
        Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system: diag(6131, ts.DiagnosticCategory.Error, "Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system_6131", "Cannot compile modules using option '{0}' unless the '--module' flag is 'amd' or 'system'."),
        File_name_0_has_a_1_extension_stripping_it: diag(6132, ts.DiagnosticCategory.Message, "File_name_0_has_a_1_extension_stripping_it_6132", "File name '{0}' has a '{1}' extension - stripping it."),
        _0_is_declared_but_its_value_is_never_read: diag(6133, ts.DiagnosticCategory.Error, "_0_is_declared_but_its_value_is_never_read_6133", "'{0}' is declared but its value is never read."),
        Report_errors_on_unused_locals: diag(6134, ts.DiagnosticCategory.Message, "Report_errors_on_unused_locals_6134", "Report errors on unused locals."),
        Report_errors_on_unused_parameters: diag(6135, ts.DiagnosticCategory.Message, "Report_errors_on_unused_parameters_6135", "Report errors on unused parameters."),
        The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files: diag(6136, ts.DiagnosticCategory.Message, "The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files_6136", "The maximum dependency depth to search under node_modules and load JavaScript files."),
        Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1: diag(6137, ts.DiagnosticCategory.Error, "Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1_6137", "Cannot import type declaration files. Consider importing '{0}' instead of '{1}'."),
        Property_0_is_declared_but_its_value_is_never_read: diag(6138, ts.DiagnosticCategory.Error, "Property_0_is_declared_but_its_value_is_never_read_6138", "Property '{0}' is declared but its value is never read."),
        Import_emit_helpers_from_tslib: diag(6139, ts.DiagnosticCategory.Message, "Import_emit_helpers_from_tslib_6139", "Import emit helpers from 'tslib'."),
        Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2: diag(6140, ts.DiagnosticCategory.Error, "Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using__6140", "Auto discovery for typings is enabled in project '{0}'. Running extra resolution pass for module '{1}' using cache location '{2}'."),
        Parse_in_strict_mode_and_emit_use_strict_for_each_source_file: diag(6141, ts.DiagnosticCategory.Message, "Parse_in_strict_mode_and_emit_use_strict_for_each_source_file_6141", "Parse in strict mode and emit \"use strict\" for each source file."),
        Module_0_was_resolved_to_1_but_jsx_is_not_set: diag(6142, ts.DiagnosticCategory.Error, "Module_0_was_resolved_to_1_but_jsx_is_not_set_6142", "Module '{0}' was resolved to '{1}', but '--jsx' is not set."),
        Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1: diag(6144, ts.DiagnosticCategory.Message, "Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1_6144", "Module '{0}' was resolved as locally declared ambient module in file '{1}'."),
        Module_0_was_resolved_as_ambient_module_declared_in_1_since_this_file_was_not_modified: diag(6145, ts.DiagnosticCategory.Message, "Module_0_was_resolved_as_ambient_module_declared_in_1_since_this_file_was_not_modified_6145", "Module '{0}' was resolved as ambient module declared in '{1}' since this file was not modified."),
        Specify_the_JSX_factory_function_to_use_when_targeting_react_JSX_emit_e_g_React_createElement_or_h: diag(6146, ts.DiagnosticCategory.Message, "Specify_the_JSX_factory_function_to_use_when_targeting_react_JSX_emit_e_g_React_createElement_or_h_6146", "Specify the JSX factory function to use when targeting 'react' JSX emit, e.g. 'React.createElement' or 'h'."),
        Resolution_for_module_0_was_found_in_cache: diag(6147, ts.DiagnosticCategory.Message, "Resolution_for_module_0_was_found_in_cache_6147", "Resolution for module '{0}' was found in cache."),
        Directory_0_does_not_exist_skipping_all_lookups_in_it: diag(6148, ts.DiagnosticCategory.Message, "Directory_0_does_not_exist_skipping_all_lookups_in_it_6148", "Directory '{0}' does not exist, skipping all lookups in it."),
        Show_diagnostic_information: diag(6149, ts.DiagnosticCategory.Message, "Show_diagnostic_information_6149", "Show diagnostic information."),
        Show_verbose_diagnostic_information: diag(6150, ts.DiagnosticCategory.Message, "Show_verbose_diagnostic_information_6150", "Show verbose diagnostic information."),
        Emit_a_single_file_with_source_maps_instead_of_having_a_separate_file: diag(6151, ts.DiagnosticCategory.Message, "Emit_a_single_file_with_source_maps_instead_of_having_a_separate_file_6151", "Emit a single file with source maps instead of having a separate file."),
        Emit_the_source_alongside_the_sourcemaps_within_a_single_file_requires_inlineSourceMap_or_sourceMap_to_be_set: diag(6152, ts.DiagnosticCategory.Message, "Emit_the_source_alongside_the_sourcemaps_within_a_single_file_requires_inlineSourceMap_or_sourceMap__6152", "Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set."),
        Transpile_each_file_as_a_separate_module_similar_to_ts_transpileModule: diag(6153, ts.DiagnosticCategory.Message, "Transpile_each_file_as_a_separate_module_similar_to_ts_transpileModule_6153", "Transpile each file as a separate module (similar to 'ts.transpileModule')."),
        Print_names_of_generated_files_part_of_the_compilation: diag(6154, ts.DiagnosticCategory.Message, "Print_names_of_generated_files_part_of_the_compilation_6154", "Print names of generated files part of the compilation."),
        Print_names_of_files_part_of_the_compilation: diag(6155, ts.DiagnosticCategory.Message, "Print_names_of_files_part_of_the_compilation_6155", "Print names of files part of the compilation."),
        The_locale_used_when_displaying_messages_to_the_user_e_g_en_us: diag(6156, ts.DiagnosticCategory.Message, "The_locale_used_when_displaying_messages_to_the_user_e_g_en_us_6156", "The locale used when displaying messages to the user (e.g. 'en-us')"),
        Do_not_generate_custom_helper_functions_like_extends_in_compiled_output: diag(6157, ts.DiagnosticCategory.Message, "Do_not_generate_custom_helper_functions_like_extends_in_compiled_output_6157", "Do not generate custom helper functions like '__extends' in compiled output."),
        Do_not_include_the_default_library_file_lib_d_ts: diag(6158, ts.DiagnosticCategory.Message, "Do_not_include_the_default_library_file_lib_d_ts_6158", "Do not include the default library file (lib.d.ts)."),
        Do_not_add_triple_slash_references_or_imported_modules_to_the_list_of_compiled_files: diag(6159, ts.DiagnosticCategory.Message, "Do_not_add_triple_slash_references_or_imported_modules_to_the_list_of_compiled_files_6159", "Do not add triple-slash references or imported modules to the list of compiled files."),
        Deprecated_Use_skipLibCheck_instead_Skip_type_checking_of_default_library_declaration_files: diag(6160, ts.DiagnosticCategory.Message, "Deprecated_Use_skipLibCheck_instead_Skip_type_checking_of_default_library_declaration_files_6160", "[Deprecated] Use '--skipLibCheck' instead. Skip type checking of default library declaration files."),
        List_of_folders_to_include_type_definitions_from: diag(6161, ts.DiagnosticCategory.Message, "List_of_folders_to_include_type_definitions_from_6161", "List of folders to include type definitions from."),
        Disable_size_limitations_on_JavaScript_projects: diag(6162, ts.DiagnosticCategory.Message, "Disable_size_limitations_on_JavaScript_projects_6162", "Disable size limitations on JavaScript projects."),
        The_character_set_of_the_input_files: diag(6163, ts.DiagnosticCategory.Message, "The_character_set_of_the_input_files_6163", "The character set of the input files."),
        Emit_a_UTF_8_Byte_Order_Mark_BOM_in_the_beginning_of_output_files: diag(6164, ts.DiagnosticCategory.Message, "Emit_a_UTF_8_Byte_Order_Mark_BOM_in_the_beginning_of_output_files_6164", "Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files."),
        Do_not_truncate_error_messages: diag(6165, ts.DiagnosticCategory.Message, "Do_not_truncate_error_messages_6165", "Do not truncate error messages."),
        Output_directory_for_generated_declaration_files: diag(6166, ts.DiagnosticCategory.Message, "Output_directory_for_generated_declaration_files_6166", "Output directory for generated declaration files."),
        A_series_of_entries_which_re_map_imports_to_lookup_locations_relative_to_the_baseUrl: diag(6167, ts.DiagnosticCategory.Message, "A_series_of_entries_which_re_map_imports_to_lookup_locations_relative_to_the_baseUrl_6167", "A series of entries which re-map imports to lookup locations relative to the 'baseUrl'."),
        List_of_root_folders_whose_combined_content_represents_the_structure_of_the_project_at_runtime: diag(6168, ts.DiagnosticCategory.Message, "List_of_root_folders_whose_combined_content_represents_the_structure_of_the_project_at_runtime_6168", "List of root folders whose combined content represents the structure of the project at runtime."),
        Show_all_compiler_options: diag(6169, ts.DiagnosticCategory.Message, "Show_all_compiler_options_6169", "Show all compiler options."),
        Deprecated_Use_outFile_instead_Concatenate_and_emit_output_to_single_file: diag(6170, ts.DiagnosticCategory.Message, "Deprecated_Use_outFile_instead_Concatenate_and_emit_output_to_single_file_6170", "[Deprecated] Use '--outFile' instead. Concatenate and emit output to single file"),
        Command_line_Options: diag(6171, ts.DiagnosticCategory.Message, "Command_line_Options_6171", "Command-line Options"),
        Basic_Options: diag(6172, ts.DiagnosticCategory.Message, "Basic_Options_6172", "Basic Options"),
        Strict_Type_Checking_Options: diag(6173, ts.DiagnosticCategory.Message, "Strict_Type_Checking_Options_6173", "Strict Type-Checking Options"),
        Module_Resolution_Options: diag(6174, ts.DiagnosticCategory.Message, "Module_Resolution_Options_6174", "Module Resolution Options"),
        Source_Map_Options: diag(6175, ts.DiagnosticCategory.Message, "Source_Map_Options_6175", "Source Map Options"),
        Additional_Checks: diag(6176, ts.DiagnosticCategory.Message, "Additional_Checks_6176", "Additional Checks"),
        Experimental_Options: diag(6177, ts.DiagnosticCategory.Message, "Experimental_Options_6177", "Experimental Options"),
        Advanced_Options: diag(6178, ts.DiagnosticCategory.Message, "Advanced_Options_6178", "Advanced Options"),
        Provide_full_support_for_iterables_in_for_of_spread_and_destructuring_when_targeting_ES5_or_ES3: diag(6179, ts.DiagnosticCategory.Message, "Provide_full_support_for_iterables_in_for_of_spread_and_destructuring_when_targeting_ES5_or_ES3_6179", "Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'."),
        Enable_all_strict_type_checking_options: diag(6180, ts.DiagnosticCategory.Message, "Enable_all_strict_type_checking_options_6180", "Enable all strict type-checking options."),
        List_of_language_service_plugins: diag(6181, ts.DiagnosticCategory.Message, "List_of_language_service_plugins_6181", "List of language service plugins."),
        Scoped_package_detected_looking_in_0: diag(6182, ts.DiagnosticCategory.Message, "Scoped_package_detected_looking_in_0_6182", "Scoped package detected, looking in '{0}'"),
        Reusing_resolution_of_module_0_to_file_1_from_old_program: diag(6183, ts.DiagnosticCategory.Message, "Reusing_resolution_of_module_0_to_file_1_from_old_program_6183", "Reusing resolution of module '{0}' to file '{1}' from old program."),
        Reusing_module_resolutions_originating_in_0_since_resolutions_are_unchanged_from_old_program: diag(6184, ts.DiagnosticCategory.Message, "Reusing_module_resolutions_originating_in_0_since_resolutions_are_unchanged_from_old_program_6184", "Reusing module resolutions originating in '{0}' since resolutions are unchanged from old program."),
        Disable_strict_checking_of_generic_signatures_in_function_types: diag(6185, ts.DiagnosticCategory.Message, "Disable_strict_checking_of_generic_signatures_in_function_types_6185", "Disable strict checking of generic signatures in function types."),
        Enable_strict_checking_of_function_types: diag(6186, ts.DiagnosticCategory.Message, "Enable_strict_checking_of_function_types_6186", "Enable strict checking of function types."),
        Variable_0_implicitly_has_an_1_type: diag(7005, ts.DiagnosticCategory.Error, "Variable_0_implicitly_has_an_1_type_7005", "Variable '{0}' implicitly has an '{1}' type."),
        Parameter_0_implicitly_has_an_1_type: diag(7006, ts.DiagnosticCategory.Error, "Parameter_0_implicitly_has_an_1_type_7006", "Parameter '{0}' implicitly has an '{1}' type."),
        Member_0_implicitly_has_an_1_type: diag(7008, ts.DiagnosticCategory.Error, "Member_0_implicitly_has_an_1_type_7008", "Member '{0}' implicitly has an '{1}' type."),
        new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type: diag(7009, ts.DiagnosticCategory.Error, "new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type_7009", "'new' expression, whose target lacks a construct signature, implicitly has an 'any' type."),
        _0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type: diag(7010, ts.DiagnosticCategory.Error, "_0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type_7010", "'{0}', which lacks return-type annotation, implicitly has an '{1}' return type."),
        Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type: diag(7011, ts.DiagnosticCategory.Error, "Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type_7011", "Function expression, which lacks return-type annotation, implicitly has an '{0}' return type."),
        Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: diag(7013, ts.DiagnosticCategory.Error, "Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type_7013", "Construct signature, which lacks return-type annotation, implicitly has an 'any' return type."),
        Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number: diag(7015, ts.DiagnosticCategory.Error, "Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number_7015", "Element implicitly has an 'any' type because index expression is not of type 'number'."),
        Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type: diag(7016, ts.DiagnosticCategory.Error, "Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type_7016", "Could not find a declaration file for module '{0}'. '{1}' implicitly has an 'any' type."),
        Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature: diag(7017, ts.DiagnosticCategory.Error, "Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_7017", "Element implicitly has an 'any' type because type '{0}' has no index signature."),
        Object_literal_s_property_0_implicitly_has_an_1_type: diag(7018, ts.DiagnosticCategory.Error, "Object_literal_s_property_0_implicitly_has_an_1_type_7018", "Object literal's property '{0}' implicitly has an '{1}' type."),
        Rest_parameter_0_implicitly_has_an_any_type: diag(7019, ts.DiagnosticCategory.Error, "Rest_parameter_0_implicitly_has_an_any_type_7019", "Rest parameter '{0}' implicitly has an 'any[]' type."),
        Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: diag(7020, ts.DiagnosticCategory.Error, "Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type_7020", "Call signature, which lacks return-type annotation, implicitly has an 'any' return type."),
        _0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer: diag(7022, ts.DiagnosticCategory.Error, "_0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or__7022", "'{0}' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer."),
        _0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: diag(7023, ts.DiagnosticCategory.Error, "_0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_reference_7023", "'{0}' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions."),
        Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: diag(7024, ts.DiagnosticCategory.Error, "Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_ref_7024", "Function implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions."),
        Generator_implicitly_has_type_0_because_it_does_not_yield_any_values_Consider_supplying_a_return_type: diag(7025, ts.DiagnosticCategory.Error, "Generator_implicitly_has_type_0_because_it_does_not_yield_any_values_Consider_supplying_a_return_typ_7025", "Generator implicitly has type '{0}' because it does not yield any values. Consider supplying a return type."),
        JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists: diag(7026, ts.DiagnosticCategory.Error, "JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists_7026", "JSX element implicitly has type 'any' because no interface 'JSX.{0}' exists."),
        Unreachable_code_detected: diag(7027, ts.DiagnosticCategory.Error, "Unreachable_code_detected_7027", "Unreachable code detected."),
        Unused_label: diag(7028, ts.DiagnosticCategory.Error, "Unused_label_7028", "Unused label."),
        Fallthrough_case_in_switch: diag(7029, ts.DiagnosticCategory.Error, "Fallthrough_case_in_switch_7029", "Fallthrough case in switch."),
        Not_all_code_paths_return_a_value: diag(7030, ts.DiagnosticCategory.Error, "Not_all_code_paths_return_a_value_7030", "Not all code paths return a value."),
        Binding_element_0_implicitly_has_an_1_type: diag(7031, ts.DiagnosticCategory.Error, "Binding_element_0_implicitly_has_an_1_type_7031", "Binding element '{0}' implicitly has an '{1}' type."),
        Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation: diag(7032, ts.DiagnosticCategory.Error, "Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation_7032", "Property '{0}' implicitly has type 'any', because its set accessor lacks a parameter type annotation."),
        Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation: diag(7033, ts.DiagnosticCategory.Error, "Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation_7033", "Property '{0}' implicitly has type 'any', because its get accessor lacks a return type annotation."),
        Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined: diag(7034, ts.DiagnosticCategory.Error, "Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined_7034", "Variable '{0}' implicitly has type '{1}' in some locations where its type cannot be determined."),
        Try_npm_install_types_Slash_0_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare_module_0: diag(7035, ts.DiagnosticCategory.Error, "Try_npm_install_types_Slash_0_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare_mod_7035", "Try `npm install @types/{0}` if it exists or add a new declaration (.d.ts) file containing `declare module '{0}';`"),
        Dynamic_import_s_specifier_must_be_of_type_string_but_here_has_type_0: diag(7036, ts.DiagnosticCategory.Error, "Dynamic_import_s_specifier_must_be_of_type_string_but_here_has_type_0_7036", "Dynamic import's specifier must be of type 'string', but here has type '{0}'."),
        You_cannot_rename_this_element: diag(8000, ts.DiagnosticCategory.Error, "You_cannot_rename_this_element_8000", "You cannot rename this element."),
        You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library: diag(8001, ts.DiagnosticCategory.Error, "You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library_8001", "You cannot rename elements that are defined in the standard TypeScript library."),
        import_can_only_be_used_in_a_ts_file: diag(8002, ts.DiagnosticCategory.Error, "import_can_only_be_used_in_a_ts_file_8002", "'import ... =' can only be used in a .ts file."),
        export_can_only_be_used_in_a_ts_file: diag(8003, ts.DiagnosticCategory.Error, "export_can_only_be_used_in_a_ts_file_8003", "'export=' can only be used in a .ts file."),
        type_parameter_declarations_can_only_be_used_in_a_ts_file: diag(8004, ts.DiagnosticCategory.Error, "type_parameter_declarations_can_only_be_used_in_a_ts_file_8004", "'type parameter declarations' can only be used in a .ts file."),
        implements_clauses_can_only_be_used_in_a_ts_file: diag(8005, ts.DiagnosticCategory.Error, "implements_clauses_can_only_be_used_in_a_ts_file_8005", "'implements clauses' can only be used in a .ts file."),
        interface_declarations_can_only_be_used_in_a_ts_file: diag(8006, ts.DiagnosticCategory.Error, "interface_declarations_can_only_be_used_in_a_ts_file_8006", "'interface declarations' can only be used in a .ts file."),
        module_declarations_can_only_be_used_in_a_ts_file: diag(8007, ts.DiagnosticCategory.Error, "module_declarations_can_only_be_used_in_a_ts_file_8007", "'module declarations' can only be used in a .ts file."),
        type_aliases_can_only_be_used_in_a_ts_file: diag(8008, ts.DiagnosticCategory.Error, "type_aliases_can_only_be_used_in_a_ts_file_8008", "'type aliases' can only be used in a .ts file."),
        _0_can_only_be_used_in_a_ts_file: diag(8009, ts.DiagnosticCategory.Error, "_0_can_only_be_used_in_a_ts_file_8009", "'{0}' can only be used in a .ts file."),
        types_can_only_be_used_in_a_ts_file: diag(8010, ts.DiagnosticCategory.Error, "types_can_only_be_used_in_a_ts_file_8010", "'types' can only be used in a .ts file."),
        type_arguments_can_only_be_used_in_a_ts_file: diag(8011, ts.DiagnosticCategory.Error, "type_arguments_can_only_be_used_in_a_ts_file_8011", "'type arguments' can only be used in a .ts file."),
        parameter_modifiers_can_only_be_used_in_a_ts_file: diag(8012, ts.DiagnosticCategory.Error, "parameter_modifiers_can_only_be_used_in_a_ts_file_8012", "'parameter modifiers' can only be used in a .ts file."),
        non_null_assertions_can_only_be_used_in_a_ts_file: diag(8013, ts.DiagnosticCategory.Error, "non_null_assertions_can_only_be_used_in_a_ts_file_8013", "'non-null assertions' can only be used in a .ts file."),
        enum_declarations_can_only_be_used_in_a_ts_file: diag(8015, ts.DiagnosticCategory.Error, "enum_declarations_can_only_be_used_in_a_ts_file_8015", "'enum declarations' can only be used in a .ts file."),
        type_assertion_expressions_can_only_be_used_in_a_ts_file: diag(8016, ts.DiagnosticCategory.Error, "type_assertion_expressions_can_only_be_used_in_a_ts_file_8016", "'type assertion expressions' can only be used in a .ts file."),
        Octal_literal_types_must_use_ES2015_syntax_Use_the_syntax_0: diag(8017, ts.DiagnosticCategory.Error, "Octal_literal_types_must_use_ES2015_syntax_Use_the_syntax_0_8017", "Octal literal types must use ES2015 syntax. Use the syntax '{0}'."),
        Octal_literals_are_not_allowed_in_enums_members_initializer_Use_the_syntax_0: diag(8018, ts.DiagnosticCategory.Error, "Octal_literals_are_not_allowed_in_enums_members_initializer_Use_the_syntax_0_8018", "Octal literals are not allowed in enums members initializer. Use the syntax '{0}'."),
        Report_errors_in_js_files: diag(8019, ts.DiagnosticCategory.Message, "Report_errors_in_js_files_8019", "Report errors in .js files."),
        JSDoc_types_can_only_be_used_inside_documentation_comments: diag(8020, ts.DiagnosticCategory.Error, "JSDoc_types_can_only_be_used_inside_documentation_comments_8020", "JSDoc types can only be used inside documentation comments."),
        JSDoc_typedef_tag_should_either_have_a_type_annotation_or_be_followed_by_property_or_member_tags: diag(8021, ts.DiagnosticCategory.Error, "JSDoc_typedef_tag_should_either_have_a_type_annotation_or_be_followed_by_property_or_member_tags_8021", "JSDoc '@typedef' tag should either have a type annotation or be followed by '@property' or '@member' tags."),
        JSDoc_0_is_not_attached_to_a_class: diag(8022, ts.DiagnosticCategory.Error, "JSDoc_0_is_not_attached_to_a_class_8022", "JSDoc '@{0}' is not attached to a class."),
        JSDoc_0_1_does_not_match_the_extends_2_clause: diag(8023, ts.DiagnosticCategory.Error, "JSDoc_0_1_does_not_match_the_extends_2_clause_8023", "JSDoc '@{0} {1}' does not match the 'extends {2}' clause."),
        JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name: diag(8024, ts.DiagnosticCategory.Error, "JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name_8024", "JSDoc '@param' tag has name '{0}', but there is no parameter with that name."),
        Class_declarations_cannot_have_more_than_one_augments_or_extends_tag: diag(8025, ts.DiagnosticCategory.Error, "Class_declarations_cannot_have_more_than_one_augments_or_extends_tag_8025", "Class declarations cannot have more than one `@augments` or `@extends` tag."),
        Only_identifiers_Slashqualified_names_with_optional_type_arguments_are_currently_supported_in_a_class_extends_clause: diag(9002, ts.DiagnosticCategory.Error, "Only_identifiers_Slashqualified_names_with_optional_type_arguments_are_currently_supported_in_a_clas_9002", "Only identifiers/qualified-names with optional type arguments are currently supported in a class 'extends' clause."),
        class_expressions_are_not_currently_supported: diag(9003, ts.DiagnosticCategory.Error, "class_expressions_are_not_currently_supported_9003", "'class' expressions are not currently supported."),
        Language_service_is_disabled: diag(9004, ts.DiagnosticCategory.Error, "Language_service_is_disabled_9004", "Language service is disabled."),
        JSX_attributes_must_only_be_assigned_a_non_empty_expression: diag(17000, ts.DiagnosticCategory.Error, "JSX_attributes_must_only_be_assigned_a_non_empty_expression_17000", "JSX attributes must only be assigned a non-empty 'expression'."),
        JSX_elements_cannot_have_multiple_attributes_with_the_same_name: diag(17001, ts.DiagnosticCategory.Error, "JSX_elements_cannot_have_multiple_attributes_with_the_same_name_17001", "JSX elements cannot have multiple attributes with the same name."),
        Expected_corresponding_JSX_closing_tag_for_0: diag(17002, ts.DiagnosticCategory.Error, "Expected_corresponding_JSX_closing_tag_for_0_17002", "Expected corresponding JSX closing tag for '{0}'."),
        JSX_attribute_expected: diag(17003, ts.DiagnosticCategory.Error, "JSX_attribute_expected_17003", "JSX attribute expected."),
        Cannot_use_JSX_unless_the_jsx_flag_is_provided: diag(17004, ts.DiagnosticCategory.Error, "Cannot_use_JSX_unless_the_jsx_flag_is_provided_17004", "Cannot use JSX unless the '--jsx' flag is provided."),
        A_constructor_cannot_contain_a_super_call_when_its_class_extends_null: diag(17005, ts.DiagnosticCategory.Error, "A_constructor_cannot_contain_a_super_call_when_its_class_extends_null_17005", "A constructor cannot contain a 'super' call when its class extends 'null'."),
        An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses: diag(17006, ts.DiagnosticCategory.Error, "An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_ex_17006", "An unary expression with the '{0}' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses."),
        A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses: diag(17007, ts.DiagnosticCategory.Error, "A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Con_17007", "A type assertion expression is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses."),
        JSX_element_0_has_no_corresponding_closing_tag: diag(17008, ts.DiagnosticCategory.Error, "JSX_element_0_has_no_corresponding_closing_tag_17008", "JSX element '{0}' has no corresponding closing tag."),
        super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class: diag(17009, ts.DiagnosticCategory.Error, "super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class_17009", "'super' must be called before accessing 'this' in the constructor of a derived class."),
        Unknown_type_acquisition_option_0: diag(17010, ts.DiagnosticCategory.Error, "Unknown_type_acquisition_option_0_17010", "Unknown type acquisition option '{0}'."),
        super_must_be_called_before_accessing_a_property_of_super_in_the_constructor_of_a_derived_class: diag(17011, ts.DiagnosticCategory.Error, "super_must_be_called_before_accessing_a_property_of_super_in_the_constructor_of_a_derived_class_17011", "'super' must be called before accessing a property of 'super' in the constructor of a derived class."),
        _0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2: diag(17012, ts.DiagnosticCategory.Error, "_0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2_17012", "'{0}' is not a valid meta-property for keyword '{1}'. Did you mean '{2}'?"),
        Meta_property_0_is_only_allowed_in_the_body_of_a_function_declaration_function_expression_or_constructor: diag(17013, ts.DiagnosticCategory.Error, "Meta_property_0_is_only_allowed_in_the_body_of_a_function_declaration_function_expression_or_constru_17013", "Meta-property '{0}' is only allowed in the body of a function declaration, function expression, or constructor."),
        Circularity_detected_while_resolving_configuration_Colon_0: diag(18000, ts.DiagnosticCategory.Error, "Circularity_detected_while_resolving_configuration_Colon_0_18000", "Circularity detected while resolving configuration: {0}"),
        A_path_in_an_extends_option_must_be_relative_or_rooted_but_0_is_not: diag(18001, ts.DiagnosticCategory.Error, "A_path_in_an_extends_option_must_be_relative_or_rooted_but_0_is_not_18001", "A path in an 'extends' option must be relative or rooted, but '{0}' is not."),
        The_files_list_in_config_file_0_is_empty: diag(18002, ts.DiagnosticCategory.Error, "The_files_list_in_config_file_0_is_empty_18002", "The 'files' list in config file '{0}' is empty."),
        No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2: diag(18003, ts.DiagnosticCategory.Error, "No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2_18003", "No inputs were found in config file '{0}'. Specified 'include' paths were '{1}' and 'exclude' paths were '{2}'."),
        Add_missing_super_call: diag(90001, ts.DiagnosticCategory.Message, "Add_missing_super_call_90001", "Add missing 'super()' call."),
        Make_super_call_the_first_statement_in_the_constructor: diag(90002, ts.DiagnosticCategory.Message, "Make_super_call_the_first_statement_in_the_constructor_90002", "Make 'super()' call the first statement in the constructor."),
        Change_extends_to_implements: diag(90003, ts.DiagnosticCategory.Message, "Change_extends_to_implements_90003", "Change 'extends' to 'implements'."),
        Remove_declaration_for_Colon_0: diag(90004, ts.DiagnosticCategory.Message, "Remove_declaration_for_Colon_0_90004", "Remove declaration for: '{0}'."),
        Implement_interface_0: diag(90006, ts.DiagnosticCategory.Message, "Implement_interface_0_90006", "Implement interface '{0}'."),
        Implement_inherited_abstract_class: diag(90007, ts.DiagnosticCategory.Message, "Implement_inherited_abstract_class_90007", "Implement inherited abstract class."),
        Add_this_to_unresolved_variable: diag(90008, ts.DiagnosticCategory.Message, "Add_this_to_unresolved_variable_90008", "Add 'this.' to unresolved variable."),
        Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig: diag(90009, ts.DiagnosticCategory.Error, "Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript__90009", "Adding a tsconfig.json file will help organize projects that contain both TypeScript and JavaScript files. Learn more at https://aka.ms/tsconfig."),
        Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated: diag(90010, ts.DiagnosticCategory.Error, "Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated_90010", "Type '{0}' is not assignable to type '{1}'. Two different types with this name exist, but they are unrelated."),
        Import_0_from_1: diag(90013, ts.DiagnosticCategory.Message, "Import_0_from_1_90013", "Import '{0}' from \"{1}\"."),
        Change_0_to_1: diag(90014, ts.DiagnosticCategory.Message, "Change_0_to_1_90014", "Change '{0}' to '{1}'."),
        Add_0_to_existing_import_declaration_from_1: diag(90015, ts.DiagnosticCategory.Message, "Add_0_to_existing_import_declaration_from_1_90015", "Add '{0}' to existing import declaration from \"{1}\"."),
        Declare_property_0: diag(90016, ts.DiagnosticCategory.Message, "Declare_property_0_90016", "Declare property '{0}'."),
        Add_index_signature_for_property_0: diag(90017, ts.DiagnosticCategory.Message, "Add_index_signature_for_property_0_90017", "Add index signature for property '{0}'."),
        Disable_checking_for_this_file: diag(90018, ts.DiagnosticCategory.Message, "Disable_checking_for_this_file_90018", "Disable checking for this file."),
        Ignore_this_error_message: diag(90019, ts.DiagnosticCategory.Message, "Ignore_this_error_message_90019", "Ignore this error message."),
        Initialize_property_0_in_the_constructor: diag(90020, ts.DiagnosticCategory.Message, "Initialize_property_0_in_the_constructor_90020", "Initialize property '{0}' in the constructor."),
        Initialize_static_property_0: diag(90021, ts.DiagnosticCategory.Message, "Initialize_static_property_0_90021", "Initialize static property '{0}'."),
        Change_spelling_to_0: diag(90022, ts.DiagnosticCategory.Message, "Change_spelling_to_0_90022", "Change spelling to '{0}'."),
        Declare_method_0: diag(90023, ts.DiagnosticCategory.Message, "Declare_method_0_90023", "Declare method '{0}'."),
        Declare_static_method_0: diag(90024, ts.DiagnosticCategory.Message, "Declare_static_method_0_90024", "Declare static method '{0}'."),
        Prefix_0_with_an_underscore: diag(90025, ts.DiagnosticCategory.Message, "Prefix_0_with_an_underscore_90025", "Prefix '{0}' with an underscore."),
        Rewrite_as_the_indexed_access_type_0: diag(90026, ts.DiagnosticCategory.Message, "Rewrite_as_the_indexed_access_type_0_90026", "Rewrite as the indexed access type '{0}'."),
        Declare_static_property_0: diag(90027, ts.DiagnosticCategory.Message, "Declare_static_property_0_90027", "Declare static property '{0}'."),
        Call_decorator_expression: diag(90028, ts.DiagnosticCategory.Message, "Call_decorator_expression_90028", "Call decorator expression."),
        Convert_function_to_an_ES2015_class: diag(95001, ts.DiagnosticCategory.Message, "Convert_function_to_an_ES2015_class_95001", "Convert function to an ES2015 class"),
        Convert_function_0_to_class: diag(95002, ts.DiagnosticCategory.Message, "Convert_function_0_to_class_95002", "Convert function '{0}' to class"),
        Extract_symbol: diag(95003, ts.DiagnosticCategory.Message, "Extract_symbol_95003", "Extract symbol"),
        Extract_to_0_in_1: diag(95004, ts.DiagnosticCategory.Message, "Extract_to_0_in_1_95004", "Extract to {0} in {1}"),
        Extract_function: diag(95005, ts.DiagnosticCategory.Message, "Extract_function_95005", "Extract function"),
        Extract_constant: diag(95006, ts.DiagnosticCategory.Message, "Extract_constant_95006", "Extract constant"),
        Extract_to_0_in_enclosing_scope: diag(95007, ts.DiagnosticCategory.Message, "Extract_to_0_in_enclosing_scope_95007", "Extract to {0} in enclosing scope"),
        Extract_to_0_in_1_scope: diag(95008, ts.DiagnosticCategory.Message, "Extract_to_0_in_1_scope_95008", "Extract to {0} in {1} scope"),
        Annotate_with_type_from_JSDoc: diag(95009, ts.DiagnosticCategory.Message, "Annotate_with_type_from_JSDoc_95009", "Annotate with type from JSDoc"),
        Annotate_with_types_from_JSDoc: diag(95010, ts.DiagnosticCategory.Message, "Annotate_with_types_from_JSDoc_95010", "Annotate with types from JSDoc"),
        Infer_type_of_0_from_usage: diag(95011, ts.DiagnosticCategory.Message, "Infer_type_of_0_from_usage_95011", "Infer type of '{0}' from usage."),
        Infer_parameter_types_from_usage: diag(95012, ts.DiagnosticCategory.Message, "Infer_parameter_types_from_usage_95012", "Infer parameter types from usage."),
    };
})(ts || (ts = {}));
var ts;
(function (ts) {
    ts.emptyArray = [];
    ts.emptyMap = ts.createMap();
    ts.externalHelpersModuleNameText = "tslib";
    function getDeclarationOfKind(symbol, kind) {
        var declarations = symbol.declarations;
        if (declarations) {
            for (var _i = 0, declarations_1 = declarations; _i < declarations_1.length; _i++) {
                var declaration = declarations_1[_i];
                if (declaration.kind === kind) {
                    return declaration;
                }
            }
        }
        return undefined;
    }
    ts.getDeclarationOfKind = getDeclarationOfKind;
    var stringWriter = createSingleLineStringWriter();
    function createSingleLineStringWriter() {
        var str = "";
        var writeText = function (text) { return str += text; };
        return {
            string: function () { return str; },
            writeKeyword: writeText,
            writeOperator: writeText,
            writePunctuation: writeText,
            writeSpace: writeText,
            writeStringLiteral: writeText,
            writeParameter: writeText,
            writeProperty: writeText,
            writeSymbol: writeText,
            writeLine: function () { return str += " "; },
            increaseIndent: ts.noop,
            decreaseIndent: ts.noop,
            clear: function () { return str = ""; },
            trackSymbol: ts.noop,
            reportInaccessibleThisError: ts.noop,
            reportPrivateInBaseOfClassExpression: ts.noop,
        };
    }
    function usingSingleLineStringWriter(action) {
        var oldString = stringWriter.string();
        try {
            action(stringWriter);
            return stringWriter.string();
        }
        finally {
            stringWriter.clear();
            stringWriter.writeKeyword(oldString);
        }
    }
    ts.usingSingleLineStringWriter = usingSingleLineStringWriter;
    function getFullWidth(node) {
        return node.end - node.pos;
    }
    ts.getFullWidth = getFullWidth;
    function getResolvedModule(sourceFile, moduleNameText) {
        return sourceFile && sourceFile.resolvedModules && sourceFile.resolvedModules.get(moduleNameText);
    }
    ts.getResolvedModule = getResolvedModule;
    function setResolvedModule(sourceFile, moduleNameText, resolvedModule) {
        if (!sourceFile.resolvedModules) {
            sourceFile.resolvedModules = ts.createMap();
        }
        sourceFile.resolvedModules.set(moduleNameText, resolvedModule);
    }
    ts.setResolvedModule = setResolvedModule;
    function setResolvedTypeReferenceDirective(sourceFile, typeReferenceDirectiveName, resolvedTypeReferenceDirective) {
        if (!sourceFile.resolvedTypeReferenceDirectiveNames) {
            sourceFile.resolvedTypeReferenceDirectiveNames = ts.createMap();
        }
        sourceFile.resolvedTypeReferenceDirectiveNames.set(typeReferenceDirectiveName, resolvedTypeReferenceDirective);
    }
    ts.setResolvedTypeReferenceDirective = setResolvedTypeReferenceDirective;
    function moduleResolutionIsEqualTo(oldResolution, newResolution) {
        return oldResolution.isExternalLibraryImport === newResolution.isExternalLibraryImport &&
            oldResolution.extension === newResolution.extension &&
            oldResolution.resolvedFileName === newResolution.resolvedFileName &&
            packageIdIsEqual(oldResolution.packageId, newResolution.packageId);
    }
    ts.moduleResolutionIsEqualTo = moduleResolutionIsEqualTo;
    function packageIdIsEqual(a, b) {
        return a === b || a && b && a.name === b.name && a.subModuleName === b.subModuleName && a.version === b.version;
    }
    function typeDirectiveIsEqualTo(oldResolution, newResolution) {
        return oldResolution.resolvedFileName === newResolution.resolvedFileName && oldResolution.primary === newResolution.primary;
    }
    ts.typeDirectiveIsEqualTo = typeDirectiveIsEqualTo;
    function hasChangesInResolutions(names, newResolutions, oldResolutions, comparer) {
        ts.Debug.assert(names.length === newResolutions.length);
        for (var i = 0; i < names.length; i++) {
            var newResolution = newResolutions[i];
            var oldResolution = oldResolutions && oldResolutions.get(names[i]);
            var changed = oldResolution
                ? !newResolution || !comparer(oldResolution, newResolution)
                : newResolution;
            if (changed) {
                return true;
            }
        }
        return false;
    }
    ts.hasChangesInResolutions = hasChangesInResolutions;
    function containsParseError(node) {
        aggregateChildData(node);
        return (node.flags & 131072) !== 0;
    }
    ts.containsParseError = containsParseError;
    function aggregateChildData(node) {
        if (!(node.flags & 262144)) {
            var thisNodeOrAnySubNodesHasError = ((node.flags & 32768) !== 0) ||
                ts.forEachChild(node, containsParseError);
            if (thisNodeOrAnySubNodesHasError) {
                node.flags |= 131072;
            }
            node.flags |= 262144;
        }
    }
    function getSourceFileOfNode(node) {
        while (node && node.kind !== 265) {
            node = node.parent;
        }
        return node;
    }
    ts.getSourceFileOfNode = getSourceFileOfNode;
    function isStatementWithLocals(node) {
        switch (node.kind) {
            case 207:
            case 235:
            case 214:
            case 215:
            case 216:
                return true;
        }
        return false;
    }
    ts.isStatementWithLocals = isStatementWithLocals;
    function getStartPositionOfLine(line, sourceFile) {
        ts.Debug.assert(line >= 0);
        return ts.getLineStarts(sourceFile)[line];
    }
    ts.getStartPositionOfLine = getStartPositionOfLine;
    function nodePosToString(node) {
        var file = getSourceFileOfNode(node);
        var loc = ts.getLineAndCharacterOfPosition(file, node.pos);
        return file.fileName + "(" + (loc.line + 1) + "," + (loc.character + 1) + ")";
    }
    ts.nodePosToString = nodePosToString;
    function getEndLinePosition(line, sourceFile) {
        ts.Debug.assert(line >= 0);
        var lineStarts = ts.getLineStarts(sourceFile);
        var lineIndex = line;
        var sourceText = sourceFile.text;
        if (lineIndex + 1 === lineStarts.length) {
            return sourceText.length - 1;
        }
        else {
            var start = lineStarts[lineIndex];
            var pos = lineStarts[lineIndex + 1] - 1;
            ts.Debug.assert(ts.isLineBreak(sourceText.charCodeAt(pos)));
            while (start <= pos && ts.isLineBreak(sourceText.charCodeAt(pos))) {
                pos--;
            }
            return pos;
        }
    }
    ts.getEndLinePosition = getEndLinePosition;
    function nodeIsMissing(node) {
        if (node === undefined) {
            return true;
        }
        return node.pos === node.end && node.pos >= 0 && node.kind !== 1;
    }
    ts.nodeIsMissing = nodeIsMissing;
    function nodeIsPresent(node) {
        return !nodeIsMissing(node);
    }
    ts.nodeIsPresent = nodeIsPresent;
    function isRecognizedTripleSlashComment(text, commentPos, commentEnd) {
        if (text.charCodeAt(commentPos + 1) === 47 &&
            commentPos + 2 < commentEnd &&
            text.charCodeAt(commentPos + 2) === 47) {
            var textSubStr = text.substring(commentPos, commentEnd);
            return textSubStr.match(ts.fullTripleSlashReferencePathRegEx) ||
                textSubStr.match(ts.fullTripleSlashAMDReferencePathRegEx) ||
                textSubStr.match(fullTripleSlashReferenceTypeReferenceDirectiveRegEx) ||
                textSubStr.match(defaultLibReferenceRegEx) ?
                true : false;
        }
        return false;
    }
    ts.isRecognizedTripleSlashComment = isRecognizedTripleSlashComment;
    function isPinnedComment(text, comment) {
        return text.charCodeAt(comment.pos + 1) === 42 &&
            text.charCodeAt(comment.pos + 2) === 33;
    }
    ts.isPinnedComment = isPinnedComment;
    function getTokenPosOfNode(node, sourceFile, includeJsDoc) {
        if (nodeIsMissing(node)) {
            return node.pos;
        }
        if (ts.isJSDocNode(node)) {
            return ts.skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos, false, true);
        }
        if (includeJsDoc && ts.hasJSDocNodes(node)) {
            return getTokenPosOfNode(node.jsDoc[0]);
        }
        if (node.kind === 286 && node._children.length > 0) {
            return getTokenPosOfNode(node._children[0], sourceFile, includeJsDoc);
        }
        return ts.skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos);
    }
    ts.getTokenPosOfNode = getTokenPosOfNode;
    function getNonDecoratorTokenPosOfNode(node, sourceFile) {
        if (nodeIsMissing(node) || !node.decorators) {
            return getTokenPosOfNode(node, sourceFile);
        }
        return ts.skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.decorators.end);
    }
    ts.getNonDecoratorTokenPosOfNode = getNonDecoratorTokenPosOfNode;
    function getSourceTextOfNodeFromSourceFile(sourceFile, node, includeTrivia) {
        if (includeTrivia === void 0) { includeTrivia = false; }
        if (nodeIsMissing(node)) {
            return "";
        }
        var text = sourceFile.text;
        return text.substring(includeTrivia ? node.pos : ts.skipTrivia(text, node.pos), node.end);
    }
    ts.getSourceTextOfNodeFromSourceFile = getSourceTextOfNodeFromSourceFile;
    function getTextOfNodeFromSourceText(sourceText, node) {
        if (nodeIsMissing(node)) {
            return "";
        }
        return sourceText.substring(ts.skipTrivia(sourceText, node.pos), node.end);
    }
    ts.getTextOfNodeFromSourceText = getTextOfNodeFromSourceText;
    function getTextOfNode(node, includeTrivia) {
        if (includeTrivia === void 0) { includeTrivia = false; }
        return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
    }
    ts.getTextOfNode = getTextOfNode;
    function indexOfNode(nodeArray, node) {
        return ts.binarySearch(nodeArray, node, compareNodePos);
    }
    ts.indexOfNode = indexOfNode;
    function compareNodePos(_a, _b) {
        var aPos = _a.pos;
        var bPos = _b.pos;
        return aPos < bPos ? -1 : bPos < aPos ? 1 : 0;
    }
    function getEmitFlags(node) {
        var emitNode = node.emitNode;
        return emitNode && emitNode.flags;
    }
    ts.getEmitFlags = getEmitFlags;
    function getLiteralText(node, sourceFile) {
        if (!nodeIsSynthesized(node) && node.parent) {
            return getSourceTextOfNodeFromSourceFile(sourceFile, node);
        }
        var escapeText = getEmitFlags(node) & 16777216 ? escapeString : escapeNonAsciiString;
        switch (node.kind) {
            case 9:
                if (node.singleQuote) {
                    return "'" + escapeText(node.text, 39) + "'";
                }
                else {
                    return '"' + escapeText(node.text, 34) + '"';
                }
            case 13:
                return "`" + escapeText(node.text, 96) + "`";
            case 14:
                return "`" + escapeText(node.text, 96) + "${";
            case 15:
                return "}" + escapeText(node.text, 96) + "${";
            case 16:
                return "}" + escapeText(node.text, 96) + "`";
            case 8:
            case 12:
                return node.text;
        }
        ts.Debug.fail("Literal kind '" + node.kind + "' not accounted for.");
    }
    ts.getLiteralText = getLiteralText;
    function getTextOfConstantValue(value) {
        return ts.isString(value) ? '"' + escapeNonAsciiString(value) + '"' : "" + value;
    }
    ts.getTextOfConstantValue = getTextOfConstantValue;
    function escapeLeadingUnderscores(identifier) {
        return (identifier.length >= 2 && identifier.charCodeAt(0) === 95 && identifier.charCodeAt(1) === 95 ? "_" + identifier : identifier);
    }
    ts.escapeLeadingUnderscores = escapeLeadingUnderscores;
    function escapeIdentifier(identifier) {
        return identifier;
    }
    ts.escapeIdentifier = escapeIdentifier;
    function makeIdentifierFromModuleName(moduleName) {
        return ts.getBaseFileName(moduleName).replace(/^(\d)/, "_$1").replace(/\W/g, "_");
    }
    ts.makeIdentifierFromModuleName = makeIdentifierFromModuleName;
    function isBlockOrCatchScoped(declaration) {
        return (ts.getCombinedNodeFlags(declaration) & 3) !== 0 ||
            isCatchClauseVariableDeclarationOrBindingElement(declaration);
    }
    ts.isBlockOrCatchScoped = isBlockOrCatchScoped;
    function isCatchClauseVariableDeclarationOrBindingElement(declaration) {
        var node = getRootDeclaration(declaration);
        return node.kind === 226 && node.parent.kind === 260;
    }
    ts.isCatchClauseVariableDeclarationOrBindingElement = isCatchClauseVariableDeclarationOrBindingElement;
    function isAmbientModule(node) {
        return node && node.kind === 233 &&
            (node.name.kind === 9 || isGlobalScopeAugmentation(node));
    }
    ts.isAmbientModule = isAmbientModule;
    function isModuleWithStringLiteralName(node) {
        return ts.isModuleDeclaration(node) && node.name.kind === 9;
    }
    ts.isModuleWithStringLiteralName = isModuleWithStringLiteralName;
    function isNonGlobalAmbientModule(node) {
        return ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name);
    }
    ts.isNonGlobalAmbientModule = isNonGlobalAmbientModule;
    function isShorthandAmbientModuleSymbol(moduleSymbol) {
        return isShorthandAmbientModule(moduleSymbol.valueDeclaration);
    }
    ts.isShorthandAmbientModuleSymbol = isShorthandAmbientModuleSymbol;
    function isShorthandAmbientModule(node) {
        return node && node.kind === 233 && (!node.body);
    }
    function isBlockScopedContainerTopLevel(node) {
        return node.kind === 265 ||
            node.kind === 233 ||
            ts.isFunctionLike(node);
    }
    ts.isBlockScopedContainerTopLevel = isBlockScopedContainerTopLevel;
    function isGlobalScopeAugmentation(module) {
        return !!(module.flags & 512);
    }
    ts.isGlobalScopeAugmentation = isGlobalScopeAugmentation;
    function isExternalModuleAugmentation(node) {
        if (!node || !isAmbientModule(node)) {
            return false;
        }
        switch (node.parent.kind) {
            case 265:
                return ts.isExternalModule(node.parent);
            case 234:
                return isAmbientModule(node.parent.parent) && !ts.isExternalModule(node.parent.parent.parent);
        }
        return false;
    }
    ts.isExternalModuleAugmentation = isExternalModuleAugmentation;
    function isEffectiveExternalModule(node, compilerOptions) {
        return ts.isExternalModule(node) || compilerOptions.isolatedModules;
    }
    ts.isEffectiveExternalModule = isEffectiveExternalModule;
    function isBlockScope(node, parentNode) {
        switch (node.kind) {
            case 265:
            case 235:
            case 260:
            case 233:
            case 214:
            case 215:
            case 216:
            case 152:
            case 151:
            case 153:
            case 154:
            case 228:
            case 186:
            case 187:
                return true;
            case 207:
                return parentNode && !ts.isFunctionLike(parentNode);
        }
        return false;
    }
    ts.isBlockScope = isBlockScope;
    function isDeclarationWithTypeParameters(node) {
        switch (node.kind) {
            case 155:
            case 156:
            case 150:
            case 157:
            case 160:
            case 161:
            case 273:
            case 229:
            case 199:
            case 230:
            case 231:
            case 282:
            case 228:
            case 151:
            case 152:
            case 153:
            case 154:
            case 186:
            case 187:
                return true;
            default:
                ts.assertTypeIsNever(node);
                return false;
        }
    }
    ts.isDeclarationWithTypeParameters = isDeclarationWithTypeParameters;
    function isAnyImportSyntax(node) {
        switch (node.kind) {
            case 238:
            case 237:
                return true;
            default:
                return false;
        }
    }
    ts.isAnyImportSyntax = isAnyImportSyntax;
    function getEnclosingBlockScopeContainer(node) {
        var current = node.parent;
        while (current) {
            if (isBlockScope(current, current.parent)) {
                return current;
            }
            current = current.parent;
        }
    }
    ts.getEnclosingBlockScopeContainer = getEnclosingBlockScopeContainer;
    function declarationNameToString(name) {
        return getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
    }
    ts.declarationNameToString = declarationNameToString;
    function getNameFromIndexInfo(info) {
        return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : undefined;
    }
    ts.getNameFromIndexInfo = getNameFromIndexInfo;
    function getTextOfPropertyName(name) {
        switch (name.kind) {
            case 71:
                return name.escapedText;
            case 9:
            case 8:
                return escapeLeadingUnderscores(name.text);
            case 144:
                if (isStringOrNumericLiteral(name.expression)) {
                    return escapeLeadingUnderscores(name.expression.text);
                }
        }
        return undefined;
    }
    ts.getTextOfPropertyName = getTextOfPropertyName;
    function entityNameToString(name) {
        switch (name.kind) {
            case 71:
                return getFullWidth(name) === 0 ? ts.idText(name) : getTextOfNode(name);
            case 143:
                return entityNameToString(name.left) + "." + entityNameToString(name.right);
            case 179:
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
        }
    }
    ts.entityNameToString = entityNameToString;
    function createDiagnosticForNode(node, message, arg0, arg1, arg2) {
        var sourceFile = getSourceFileOfNode(node);
        return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2);
    }
    ts.createDiagnosticForNode = createDiagnosticForNode;
    function createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2) {
        var span = getErrorSpanForNode(sourceFile, node);
        return ts.createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2);
    }
    ts.createDiagnosticForNodeInSourceFile = createDiagnosticForNodeInSourceFile;
    function createDiagnosticForNodeFromMessageChain(node, messageChain) {
        var sourceFile = getSourceFileOfNode(node);
        var span = getErrorSpanForNode(sourceFile, node);
        return {
            file: sourceFile,
            start: span.start,
            length: span.length,
            code: messageChain.code,
            category: messageChain.category,
            messageText: messageChain.next ? messageChain : messageChain.messageText
        };
    }
    ts.createDiagnosticForNodeFromMessageChain = createDiagnosticForNodeFromMessageChain;
    function getSpanOfTokenAtPosition(sourceFile, pos) {
        var scanner = ts.createScanner(sourceFile.languageVersion, true, sourceFile.languageVariant, sourceFile.text, undefined, pos);
        scanner.scan();
        var start = scanner.getTokenPos();
        return ts.createTextSpanFromBounds(start, scanner.getTextPos());
    }
    ts.getSpanOfTokenAtPosition = getSpanOfTokenAtPosition;
    function getErrorSpanForArrowFunction(sourceFile, node) {
        var pos = ts.skipTrivia(sourceFile.text, node.pos);
        if (node.body && node.body.kind === 207) {
            var startLine = ts.getLineAndCharacterOfPosition(sourceFile, node.body.pos).line;
            var endLine = ts.getLineAndCharacterOfPosition(sourceFile, node.body.end).line;
            if (startLine < endLine) {
                return ts.createTextSpan(pos, getEndLinePosition(startLine, sourceFile) - pos + 1);
            }
        }
        return ts.createTextSpanFromBounds(pos, node.end);
    }
    function getErrorSpanForNode(sourceFile, node) {
        var errorNode = node;
        switch (node.kind) {
            case 265:
                var pos_1 = ts.skipTrivia(sourceFile.text, 0, false);
                if (pos_1 === sourceFile.text.length) {
                    return ts.createTextSpan(0, 0);
                }
                return getSpanOfTokenAtPosition(sourceFile, pos_1);
            case 226:
            case 176:
            case 229:
            case 199:
            case 230:
            case 233:
            case 232:
            case 264:
            case 228:
            case 186:
            case 151:
            case 153:
            case 154:
            case 231:
                errorNode = node.name;
                break;
            case 187:
                return getErrorSpanForArrowFunction(sourceFile, node);
        }
        if (errorNode === undefined) {
            return getSpanOfTokenAtPosition(sourceFile, node.pos);
        }
        var pos = nodeIsMissing(errorNode)
            ? errorNode.pos
            : ts.skipTrivia(sourceFile.text, errorNode.pos);
        return ts.createTextSpanFromBounds(pos, errorNode.end);
    }
    ts.getErrorSpanForNode = getErrorSpanForNode;
    function isExternalOrCommonJsModule(file) {
        return (file.externalModuleIndicator || file.commonJsModuleIndicator) !== undefined;
    }
    ts.isExternalOrCommonJsModule = isExternalOrCommonJsModule;
    function isConstEnumDeclaration(node) {
        return node.kind === 232 && isConst(node);
    }
    ts.isConstEnumDeclaration = isConstEnumDeclaration;
    function isConst(node) {
        return !!(ts.getCombinedNodeFlags(node) & 2)
            || !!(ts.getCombinedModifierFlags(node) & 2048);
    }
    ts.isConst = isConst;
    function isLet(node) {
        return !!(ts.getCombinedNodeFlags(node) & 1);
    }
    ts.isLet = isLet;
    function isSuperCall(n) {
        return n.kind === 181 && n.expression.kind === 97;
    }
    ts.isSuperCall = isSuperCall;
    function isImportCall(n) {
        return n.kind === 181 && n.expression.kind === 91;
    }
    ts.isImportCall = isImportCall;
    function isPrologueDirective(node) {
        return node.kind === 210
            && node.expression.kind === 9;
    }
    ts.isPrologueDirective = isPrologueDirective;
    function getLeadingCommentRangesOfNode(node, sourceFileOfNode) {
        return node.kind !== 10 ? ts.getLeadingCommentRanges(sourceFileOfNode.text, node.pos) : undefined;
    }
    ts.getLeadingCommentRangesOfNode = getLeadingCommentRangesOfNode;
    function getJSDocCommentRanges(node, text) {
        var commentRanges = (node.kind === 146 ||
            node.kind === 145 ||
            node.kind === 186 ||
            node.kind === 187 ||
            node.kind === 185) ?
            ts.concatenate(ts.getTrailingCommentRanges(text, node.pos), ts.getLeadingCommentRanges(text, node.pos)) :
            ts.getLeadingCommentRanges(text, node.pos);
        return ts.filter(commentRanges, function (comment) {
            return text.charCodeAt(comment.pos + 1) === 42 &&
                text.charCodeAt(comment.pos + 2) === 42 &&
                text.charCodeAt(comment.pos + 3) !== 47;
        });
    }
    ts.getJSDocCommentRanges = getJSDocCommentRanges;
    ts.fullTripleSlashReferencePathRegEx = /^(\/\/\/\s*<reference\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;
    var fullTripleSlashReferenceTypeReferenceDirectiveRegEx = /^(\/\/\/\s*<reference\s+types\s*=\s*)('|")(.+?)\2.*?\/>/;
    ts.fullTripleSlashAMDReferencePathRegEx = /^(\/\/\/\s*<amd-dependency\s+path\s*=\s*)('|")(.+?)\2.*?\/>/;
    var defaultLibReferenceRegEx = /^(\/\/\/\s*<reference\s+no-default-lib\s*=\s*)('|")(.+?)\2\s*\/>/;
    function isPartOfTypeNode(node) {
        if (158 <= node.kind && node.kind <= 173) {
            return true;
        }
        switch (node.kind) {
            case 119:
            case 133:
            case 136:
            case 122:
            case 137:
            case 139:
            case 130:
                return true;
            case 105:
                return node.parent.kind !== 190;
            case 201:
                return !isExpressionWithTypeArgumentsInClassExtendsClause(node);
            case 71:
                if (node.parent.kind === 143 && node.parent.right === node) {
                    node = node.parent;
                }
                else if (node.parent.kind === 179 && node.parent.name === node) {
                    node = node.parent;
                }
                ts.Debug.assert(node.kind === 71 || node.kind === 143 || node.kind === 179, "'node' was expected to be a qualified name, identifier or property access in 'isPartOfTypeNode'.");
            case 143:
            case 179:
            case 99:
                var parent = node.parent;
                if (parent.kind === 162) {
                    return false;
                }
                if (158 <= parent.kind && parent.kind <= 173) {
                    return true;
                }
                switch (parent.kind) {
                    case 201:
                        return !isExpressionWithTypeArgumentsInClassExtendsClause(parent);
                    case 145:
                        return node === parent.constraint;
                    case 149:
                    case 148:
                    case 146:
                    case 226:
                        return node === parent.type;
                    case 228:
                    case 186:
                    case 187:
                    case 152:
                    case 151:
                    case 150:
                    case 153:
                    case 154:
                        return node === parent.type;
                    case 155:
                    case 156:
                    case 157:
                        return node === parent.type;
                    case 184:
                        return node === parent.type;
                    case 181:
                    case 182:
                        return parent.typeArguments && ts.indexOf(parent.typeArguments, node) >= 0;
                    case 183:
                        return false;
                }
        }
        return false;
    }
    ts.isPartOfTypeNode = isPartOfTypeNode;
    function isChildOfNodeWithKind(node, kind) {
        while (node) {
            if (node.kind === kind) {
                return true;
            }
            node = node.parent;
        }
        return false;
    }
    ts.isChildOfNodeWithKind = isChildOfNodeWithKind;
    function forEachReturnStatement(body, visitor) {
        return traverse(body);
        function traverse(node) {
            switch (node.kind) {
                case 219:
                    return visitor(node);
                case 235:
                case 207:
                case 211:
                case 212:
                case 213:
                case 214:
                case 215:
                case 216:
                case 220:
                case 221:
                case 257:
                case 258:
                case 222:
                case 224:
                case 260:
                    return ts.forEachChild(node, traverse);
            }
        }
    }
    ts.forEachReturnStatement = forEachReturnStatement;
    function forEachYieldExpression(body, visitor) {
        return traverse(body);
        function traverse(node) {
            switch (node.kind) {
                case 197:
                    visitor(node);
                    var operand = node.expression;
                    if (operand) {
                        traverse(operand);
                    }
                    return;
                case 232:
                case 230:
                case 233:
                case 231:
                case 229:
                case 199:
                    return;
                default:
                    if (ts.isFunctionLike(node)) {
                        var name = node.name;
                        if (name && name.kind === 144) {
                            traverse(name.expression);
                            return;
                        }
                    }
                    else if (!isPartOfTypeNode(node)) {
                        ts.forEachChild(node, traverse);
                    }
            }
        }
    }
    ts.forEachYieldExpression = forEachYieldExpression;
    function getRestParameterElementType(node) {
        if (node && node.kind === 164) {
            return node.elementType;
        }
        else if (node && node.kind === 159) {
            return ts.singleOrUndefined(node.typeArguments);
        }
        else {
            return undefined;
        }
    }
    ts.getRestParameterElementType = getRestParameterElementType;
    function isVariableLike(node) {
        if (node) {
            switch (node.kind) {
                case 176:
                case 264:
                case 146:
                case 261:
                case 149:
                case 148:
                case 262:
                case 226:
                    return true;
            }
        }
        return false;
    }
    ts.isVariableLike = isVariableLike;
    function introducesArgumentsExoticObject(node) {
        switch (node.kind) {
            case 151:
            case 150:
            case 152:
            case 153:
            case 154:
            case 228:
            case 186:
                return true;
        }
        return false;
    }
    ts.introducesArgumentsExoticObject = introducesArgumentsExoticObject;
    function unwrapInnermostStatementOfLabel(node, beforeUnwrapLabelCallback) {
        while (true) {
            if (beforeUnwrapLabelCallback) {
                beforeUnwrapLabelCallback(node);
            }
            if (node.statement.kind !== 222) {
                return node.statement;
            }
            node = node.statement;
        }
    }
    ts.unwrapInnermostStatementOfLabel = unwrapInnermostStatementOfLabel;
    function isFunctionBlock(node) {
        return node && node.kind === 207 && ts.isFunctionLike(node.parent);
    }
    ts.isFunctionBlock = isFunctionBlock;
    function isObjectLiteralMethod(node) {
        return node && node.kind === 151 && node.parent.kind === 178;
    }
    ts.isObjectLiteralMethod = isObjectLiteralMethod;
    function isObjectLiteralOrClassExpressionMethod(node) {
        return node.kind === 151 &&
            (node.parent.kind === 178 ||
                node.parent.kind === 199);
    }
    ts.isObjectLiteralOrClassExpressionMethod = isObjectLiteralOrClassExpressionMethod;
    function isIdentifierTypePredicate(predicate) {
        return predicate && predicate.kind === 1;
    }
    ts.isIdentifierTypePredicate = isIdentifierTypePredicate;
    function isThisTypePredicate(predicate) {
        return predicate && predicate.kind === 0;
    }
    ts.isThisTypePredicate = isThisTypePredicate;
    function getPropertyAssignment(objectLiteral, key, key2) {
        return ts.filter(objectLiteral.properties, function (property) {
            if (property.kind === 261) {
                var propName = getTextOfPropertyName(property.name);
                return key === propName || (key2 && key2 === propName);
            }
        });
    }
    ts.getPropertyAssignment = getPropertyAssignment;
    function getContainingFunction(node) {
        return ts.findAncestor(node.parent, ts.isFunctionLike);
    }
    ts.getContainingFunction = getContainingFunction;
    function getContainingClass(node) {
        return ts.findAncestor(node.parent, ts.isClassLike);
    }
    ts.getContainingClass = getContainingClass;
    function getThisContainer(node, includeArrowFunctions) {
        while (true) {
            node = node.parent;
            if (!node) {
                return undefined;
            }
            switch (node.kind) {
                case 144:
                    if (ts.isClassLike(node.parent.parent)) {
                        return node;
                    }
                    node = node.parent;
                    break;
                case 147:
                    if (node.parent.kind === 146 && ts.isClassElement(node.parent.parent)) {
                        node = node.parent.parent;
                    }
                    else if (ts.isClassElement(node.parent)) {
                        node = node.parent;
                    }
                    break;
                case 187:
                    if (!includeArrowFunctions) {
                        continue;
                    }
                case 228:
                case 186:
                case 233:
                case 149:
                case 148:
                case 151:
                case 150:
                case 152:
                case 153:
                case 154:
                case 155:
                case 156:
                case 157:
                case 232:
                case 265:
                    return node;
            }
        }
    }
    ts.getThisContainer = getThisContainer;
    function getNewTargetContainer(node) {
        var container = getThisContainer(node, false);
        if (container) {
            switch (container.kind) {
                case 152:
                case 228:
                case 186:
                    return container;
            }
        }
        return undefined;
    }
    ts.getNewTargetContainer = getNewTargetContainer;
    function getSuperContainer(node, stopOnFunctions) {
        while (true) {
            node = node.parent;
            if (!node) {
                return node;
            }
            switch (node.kind) {
                case 144:
                    node = node.parent;
                    break;
                case 228:
                case 186:
                case 187:
                    if (!stopOnFunctions) {
                        continue;
                    }
                case 149:
                case 148:
                case 151:
                case 150:
                case 152:
                case 153:
                case 154:
                    return node;
                case 147:
                    if (node.parent.kind === 146 && ts.isClassElement(node.parent.parent)) {
                        node = node.parent.parent;
                    }
                    else if (ts.isClassElement(node.parent)) {
                        node = node.parent;
                    }
                    break;
            }
        }
    }
    ts.getSuperContainer = getSuperContainer;
    function getImmediatelyInvokedFunctionExpression(func) {
        if (func.kind === 186 || func.kind === 187) {
            var prev = func;
            var parent = func.parent;
            while (parent.kind === 185) {
                prev = parent;
                parent = parent.parent;
            }
            if (parent.kind === 181 && parent.expression === prev) {
                return parent;
            }
        }
    }
    ts.getImmediatelyInvokedFunctionExpression = getImmediatelyInvokedFunctionExpression;
    function isSuperProperty(node) {
        var kind = node.kind;
        return (kind === 179 || kind === 180)
            && node.expression.kind === 97;
    }
    ts.isSuperProperty = isSuperProperty;
    function getEntityNameFromTypeNode(node) {
        switch (node.kind) {
            case 159:
                return node.typeName;
            case 201:
                return isEntityNameExpression(node.expression)
                    ? node.expression
                    : undefined;
            case 71:
            case 143:
                return node;
        }
        return undefined;
    }
    ts.getEntityNameFromTypeNode = getEntityNameFromTypeNode;
    function getInvokedExpression(node) {
        if (node.kind === 183) {
            return node.tag;
        }
        else if (ts.isJsxOpeningLikeElement(node)) {
            return node.tagName;
        }
        return node.expression;
    }
    ts.getInvokedExpression = getInvokedExpression;
    function nodeCanBeDecorated(node) {
        switch (node.kind) {
            case 229:
                return true;
            case 149:
                return node.parent.kind === 229;
            case 153:
            case 154:
            case 151:
                return node.body !== undefined
                    && node.parent.kind === 229;
            case 146:
                return node.parent.body !== undefined
                    && (node.parent.kind === 152
                        || node.parent.kind === 151
                        || node.parent.kind === 154)
                    && node.parent.parent.kind === 229;
        }
        return false;
    }
    ts.nodeCanBeDecorated = nodeCanBeDecorated;
    function nodeIsDecorated(node) {
        return node.decorators !== undefined
            && nodeCanBeDecorated(node);
    }
    ts.nodeIsDecorated = nodeIsDecorated;
    function nodeOrChildIsDecorated(node) {
        return nodeIsDecorated(node) || childIsDecorated(node);
    }
    ts.nodeOrChildIsDecorated = nodeOrChildIsDecorated;
    function childIsDecorated(node) {
        switch (node.kind) {
            case 229:
                return ts.forEach(node.members, nodeOrChildIsDecorated);
            case 151:
            case 154:
                return ts.forEach(node.parameters, nodeIsDecorated);
        }
    }
    ts.childIsDecorated = childIsDecorated;
    function isJSXTagName(node) {
        var parent = node.parent;
        if (parent.kind === 251 ||
            parent.kind === 250 ||
            parent.kind === 252) {
            return parent.tagName === node;
        }
        return false;
    }
    ts.isJSXTagName = isJSXTagName;
    function isPartOfExpression(node) {
        switch (node.kind) {
            case 97:
            case 95:
            case 101:
            case 86:
            case 12:
            case 177:
            case 178:
            case 179:
            case 180:
            case 181:
            case 182:
            case 183:
            case 202:
            case 184:
            case 203:
            case 185:
            case 186:
            case 199:
            case 187:
            case 190:
            case 188:
            case 189:
            case 192:
            case 193:
            case 194:
            case 195:
            case 198:
            case 196:
            case 13:
            case 200:
            case 249:
            case 250:
            case 197:
            case 191:
            case 204:
                return true;
            case 143:
                while (node.parent.kind === 143) {
                    node = node.parent;
                }
                return node.parent.kind === 162 || isJSXTagName(node);
            case 71:
                if (node.parent.kind === 162 || isJSXTagName(node)) {
                    return true;
                }
            case 8:
            case 9:
            case 99:
                return isInExpressionContext(node);
            default:
                return false;
        }
    }
    ts.isPartOfExpression = isPartOfExpression;
    function isInExpressionContext(node) {
        var parent = node.parent;
        switch (parent.kind) {
            case 226:
            case 146:
            case 149:
            case 148:
            case 264:
            case 261:
            case 176:
                return parent.initializer === node;
            case 210:
            case 211:
            case 212:
            case 213:
            case 219:
            case 220:
            case 221:
            case 257:
            case 223:
                return parent.expression === node;
            case 214:
                var forStatement = parent;
                return (forStatement.initializer === node && forStatement.initializer.kind !== 227) ||
                    forStatement.condition === node ||
                    forStatement.incrementor === node;
            case 215:
            case 216:
                var forInStatement = parent;
                return (forInStatement.initializer === node && forInStatement.initializer.kind !== 227) ||
                    forInStatement.expression === node;
            case 184:
            case 202:
                return node === parent.expression;
            case 205:
                return node === parent.expression;
            case 144:
                return node === parent.expression;
            case 147:
            case 256:
            case 255:
            case 263:
                return true;
            case 201:
                return parent.expression === node && isExpressionWithTypeArgumentsInClassExtendsClause(parent);
            default:
                return isPartOfExpression(parent);
        }
    }
    ts.isInExpressionContext = isInExpressionContext;
    function isExternalModuleImportEqualsDeclaration(node) {
        return node.kind === 237 && node.moduleReference.kind === 248;
    }
    ts.isExternalModuleImportEqualsDeclaration = isExternalModuleImportEqualsDeclaration;
    function getExternalModuleImportEqualsDeclarationExpression(node) {
        ts.Debug.assert(isExternalModuleImportEqualsDeclaration(node));
        return node.moduleReference.expression;
    }
    ts.getExternalModuleImportEqualsDeclarationExpression = getExternalModuleImportEqualsDeclarationExpression;
    function isInternalModuleImportEqualsDeclaration(node) {
        return node.kind === 237 && node.moduleReference.kind !== 248;
    }
    ts.isInternalModuleImportEqualsDeclaration = isInternalModuleImportEqualsDeclaration;
    function isSourceFileJavaScript(file) {
        return isInJavaScriptFile(file);
    }
    ts.isSourceFileJavaScript = isSourceFileJavaScript;
    function isInJavaScriptFile(node) {
        return node && !!(node.flags & 65536);
    }
    ts.isInJavaScriptFile = isInJavaScriptFile;
    function isInJSDoc(node) {
        return node && !!(node.flags & 1048576);
    }
    ts.isInJSDoc = isInJSDoc;
    function isJSDocIndexSignature(node) {
        return ts.isTypeReferenceNode(node) &&
            ts.isIdentifier(node.typeName) &&
            node.typeName.escapedText === "Object" &&
            node.typeArguments && node.typeArguments.length === 2 &&
            (node.typeArguments[0].kind === 136 || node.typeArguments[0].kind === 133);
    }
    ts.isJSDocIndexSignature = isJSDocIndexSignature;
    function isRequireCall(callExpression, checkArgumentIsStringLiteral) {
        if (callExpression.kind !== 181) {
            return false;
        }
        var _a = callExpression, expression = _a.expression, args = _a.arguments;
        if (expression.kind !== 71 || expression.escapedText !== "require") {
            return false;
        }
        if (args.length !== 1) {
            return false;
        }
        var arg = args[0];
        return !checkArgumentIsStringLiteral || arg.kind === 9 || arg.kind === 13;
    }
    ts.isRequireCall = isRequireCall;
    function isSingleOrDoubleQuote(charCode) {
        return charCode === 39 || charCode === 34;
    }
    ts.isSingleOrDoubleQuote = isSingleOrDoubleQuote;
    function isStringDoubleQuoted(string, sourceFile) {
        return getSourceTextOfNodeFromSourceFile(sourceFile, string).charCodeAt(0) === 34;
    }
    ts.isStringDoubleQuoted = isStringDoubleQuoted;
    function isDeclarationOfFunctionOrClassExpression(s) {
        if (s.valueDeclaration && s.valueDeclaration.kind === 226) {
            var declaration = s.valueDeclaration;
            return declaration.initializer && (declaration.initializer.kind === 186 || declaration.initializer.kind === 199);
        }
        return false;
    }
    ts.isDeclarationOfFunctionOrClassExpression = isDeclarationOfFunctionOrClassExpression;
    function getRightMostAssignedExpression(node) {
        while (isAssignmentExpression(node, true)) {
            node = node.right;
        }
        return node;
    }
    ts.getRightMostAssignedExpression = getRightMostAssignedExpression;
    function isExportsIdentifier(node) {
        return ts.isIdentifier(node) && node.escapedText === "exports";
    }
    ts.isExportsIdentifier = isExportsIdentifier;
    function isModuleExportsPropertyAccessExpression(node) {
        return ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.escapedText === "module" && node.name.escapedText === "exports";
    }
    ts.isModuleExportsPropertyAccessExpression = isModuleExportsPropertyAccessExpression;
    function getSpecialPropertyAssignmentKind(expr) {
        if (!isInJavaScriptFile(expr)) {
            return 0;
        }
        if (expr.operatorToken.kind !== 58 || expr.left.kind !== 179) {
            return 0;
        }
        var lhs = expr.left;
        if (lhs.expression.kind === 71) {
            var lhsId = lhs.expression;
            if (lhsId.escapedText === "exports") {
                return 1;
            }
            else if (lhsId.escapedText === "module" && lhs.name.escapedText === "exports") {
                return 2;
            }
            else {
                return 5;
            }
        }
        else if (lhs.expression.kind === 99) {
            return 4;
        }
        else if (lhs.expression.kind === 179) {
            var innerPropertyAccess = lhs.expression;
            if (innerPropertyAccess.expression.kind === 71) {
                var innerPropertyAccessIdentifier = innerPropertyAccess.expression;
                if (innerPropertyAccessIdentifier.escapedText === "module" && innerPropertyAccess.name.escapedText === "exports") {
                    return 1;
                }
                if (innerPropertyAccess.name.escapedText === "prototype") {
                    return 3;
                }
            }
        }
        return 0;
    }
    ts.getSpecialPropertyAssignmentKind = getSpecialPropertyAssignmentKind;
    function getExternalModuleName(node) {
        if (node.kind === 238) {
            return node.moduleSpecifier;
        }
        if (node.kind === 237) {
            var reference = node.moduleReference;
            if (reference.kind === 248) {
                return reference.expression;
            }
        }
        if (node.kind === 244) {
            return node.moduleSpecifier;
        }
        if (isModuleWithStringLiteralName(node)) {
            return node.name;
        }
    }
    ts.getExternalModuleName = getExternalModuleName;
    function getNamespaceDeclarationNode(node) {
        if (node.kind === 237) {
            return node;
        }
        var importClause = node.importClause;
        if (importClause && importClause.namedBindings && importClause.namedBindings.kind === 240) {
            return importClause.namedBindings;
        }
    }
    ts.getNamespaceDeclarationNode = getNamespaceDeclarationNode;
    function isDefaultImport(node) {
        return node.kind === 238
            && node.importClause
            && !!node.importClause.name;
    }
    ts.isDefaultImport = isDefaultImport;
    function hasQuestionToken(node) {
        if (node) {
            switch (node.kind) {
                case 146:
                case 151:
                case 150:
                case 262:
                case 261:
                case 149:
                case 148:
                    return node.questionToken !== undefined;
            }
        }
        return false;
    }
    ts.hasQuestionToken = hasQuestionToken;
    function isJSDocConstructSignature(node) {
        return node.kind === 273 &&
            node.parameters.length > 0 &&
            node.parameters[0].name &&
            node.parameters[0].name.escapedText === "new";
    }
    ts.isJSDocConstructSignature = isJSDocConstructSignature;
    function getAllJSDocs(node) {
        if (ts.isJSDocTypedefTag(node)) {
            return [node.parent];
        }
        return getJSDocCommentsAndTags(node);
    }
    ts.getAllJSDocs = getAllJSDocs;
    function getSourceOfAssignment(node) {
        return ts.isExpressionStatement(node) &&
            node.expression && ts.isBinaryExpression(node.expression) &&
            node.expression.operatorToken.kind === 58 &&
            node.expression.right;
    }
    ts.getSourceOfAssignment = getSourceOfAssignment;
    function getSingleInitializerOfVariableStatement(node, child) {
        return ts.isVariableStatement(node) &&
            node.declarationList.declarations.length > 0 &&
            (!child || node.declarationList.declarations[0].initializer === child) &&
            node.declarationList.declarations[0].initializer;
    }
    ts.getSingleInitializerOfVariableStatement = getSingleInitializerOfVariableStatement;
    function getSingleVariableOfVariableStatement(node, child) {
        return ts.isVariableStatement(node) &&
            node.declarationList.declarations.length > 0 &&
            (!child || node.declarationList.declarations[0] === child) &&
            node.declarationList.declarations[0];
    }
    ts.getSingleVariableOfVariableStatement = getSingleVariableOfVariableStatement;
    function getNestedModuleDeclaration(node) {
        return node.kind === 233 &&
            node.body &&
            node.body.kind === 233 &&
            node.body;
    }
    ts.getNestedModuleDeclaration = getNestedModuleDeclaration;
    function getJSDocCommentsAndTags(node) {
        var result;
        getJSDocCommentsAndTagsWorker(node);
        return result || ts.emptyArray;
        function getJSDocCommentsAndTagsWorker(node) {
            var parent = node.parent;
            if (parent && (parent.kind === 261 || getNestedModuleDeclaration(parent))) {
                getJSDocCommentsAndTagsWorker(parent);
            }
            if (parent && parent.parent &&
                (getSingleVariableOfVariableStatement(parent.parent, node) || getSourceOfAssignment(parent.parent))) {
                getJSDocCommentsAndTagsWorker(parent.parent);
            }
            if (parent && parent.parent && parent.parent.parent && getSingleInitializerOfVariableStatement(parent.parent.parent, node)) {
                getJSDocCommentsAndTagsWorker(parent.parent.parent);
            }
            if (node.kind === 146) {
                result = ts.addRange(result, ts.getJSDocParameterTags(node));
            }
            if (isVariableLike(node) && node.initializer && ts.hasJSDocNodes(node.initializer)) {
                result = ts.addRange(result, node.initializer.jsDoc);
            }
            if (ts.hasJSDocNodes(node)) {
                result = ts.addRange(result, node.jsDoc);
            }
        }
    }
    ts.getJSDocCommentsAndTags = getJSDocCommentsAndTags;
    function getParameterSymbolFromJSDoc(node) {
        if (node.symbol) {
            return node.symbol;
        }
        if (!ts.isIdentifier(node.name)) {
            return undefined;
        }
        var name = node.name.escapedText;
        var host = getJSDocHost(node);
        var decl = getSourceOfAssignment(host) ||
            getSingleInitializerOfVariableStatement(host) ||
            getSingleVariableOfVariableStatement(host) ||
            getNestedModuleDeclaration(host) ||
            host;
        if (decl && ts.isFunctionLike(decl)) {
            var parameter = ts.find(decl.parameters, function (p) { return p.name.kind === 71 && p.name.escapedText === name; });
            return parameter && parameter.symbol;
        }
    }
    ts.getParameterSymbolFromJSDoc = getParameterSymbolFromJSDoc;
    function getJSDocHost(node) {
        ts.Debug.assert(node.parent.kind === 275);
        return node.parent.parent;
    }
    ts.getJSDocHost = getJSDocHost;
    function getTypeParameterFromJsDoc(node) {
        var name = node.name.escapedText;
        var typeParameters = node.parent.parent.parent.typeParameters;
        return ts.find(typeParameters, function (p) { return p.name.escapedText === name; });
    }
    ts.getTypeParameterFromJsDoc = getTypeParameterFromJsDoc;
    function hasRestParameter(s) {
        var last = ts.lastOrUndefined(s.parameters);
        return last && isRestParameter(last);
    }
    ts.hasRestParameter = hasRestParameter;
    function isRestParameter(node) {
        return node.dotDotDotToken !== undefined;
    }
    ts.isRestParameter = isRestParameter;
    function getAssignmentTargetKind(node) {
        var parent = node.parent;
        while (true) {
            switch (parent.kind) {
                case 194:
                    var binaryOperator = parent.operatorToken.kind;
                    return isAssignmentOperator(binaryOperator) && parent.left === node ?
                        binaryOperator === 58 ? 1 : 2 :
                        0;
                case 192:
                case 193:
                    var unaryOperator = parent.operator;
                    return unaryOperator === 43 || unaryOperator === 44 ? 2 : 0;
                case 215:
                case 216:
                    return parent.initializer === node ? 1 : 0;
                case 185:
                case 177:
                case 198:
                    node = parent;
                    break;
                case 262:
                    if (parent.name !== node) {
                        return 0;
                    }
                    node = parent.parent;
                    break;
                case 261:
                    if (parent.name === node) {
                        return 0;
                    }
                    node = parent.parent;
                    break;
                default:
                    return 0;
            }
            parent = node.parent;
        }
    }
    ts.getAssignmentTargetKind = getAssignmentTargetKind;
    function isAssignmentTarget(node) {
        return getAssignmentTargetKind(node) !== 0;
    }
    ts.isAssignmentTarget = isAssignmentTarget;
    function isDeleteTarget(node) {
        if (node.kind !== 179 && node.kind !== 180) {
            return false;
        }
        node = node.parent;
        while (node && node.kind === 185) {
            node = node.parent;
        }
        return node && node.kind === 188;
    }
    ts.isDeleteTarget = isDeleteTarget;
    function isNodeDescendantOf(node, ancestor) {
        while (node) {
            if (node === ancestor)
                return true;
            node = node.parent;
        }
        return false;
    }
    ts.isNodeDescendantOf = isNodeDescendantOf;
    function isInAmbientContext(node) {
        while (node) {
            if (hasModifier(node, 2) || (node.kind === 265 && node.isDeclarationFile)) {
                return true;
            }
            node = node.parent;
        }
        return false;
    }
    ts.isInAmbientContext = isInAmbientContext;
    function isDeclarationName(name) {
        switch (name.kind) {
            case 71:
            case 9:
            case 8:
                return ts.isDeclaration(name.parent) && name.parent.name === name;
            default:
                return false;
        }
    }
    ts.isDeclarationName = isDeclarationName;
    function isAnyDeclarationName(name) {
        switch (name.kind) {
            case 71:
            case 9:
            case 8:
                if (ts.isDeclaration(name.parent)) {
                    return name.parent.name === name;
                }
                var binExp = name.parent.parent;
                return ts.isBinaryExpression(binExp) && getSpecialPropertyAssignmentKind(binExp) !== 0 && ts.getNameOfDeclaration(binExp) === name;
            default:
                return false;
        }
    }
    ts.isAnyDeclarationName = isAnyDeclarationName;
    function isLiteralComputedPropertyDeclarationName(node) {
        return (node.kind === 9 || node.kind === 8) &&
            node.parent.kind === 144 &&
            ts.isDeclaration(node.parent.parent);
    }
    ts.isLiteralComputedPropertyDeclarationName = isLiteralComputedPropertyDeclarationName;
    function isIdentifierName(node) {
        var parent = node.parent;
        switch (parent.kind) {
            case 149:
            case 148:
            case 151:
            case 150:
            case 153:
            case 154:
            case 264:
            case 261:
            case 179:
                return parent.name === node;
            case 143:
                if (parent.right === node) {
                    while (parent.kind === 143) {
                        parent = parent.parent;
                    }
                    return parent.kind === 162;
                }
                return false;
            case 176:
            case 242:
                return parent.propertyName === node;
            case 246:
            case 253:
                return true;
        }
        return false;
    }
    ts.isIdentifierName = isIdentifierName;
    function isAliasSymbolDeclaration(node) {
        return node.kind === 237 ||
            node.kind === 236 ||
            node.kind === 239 && !!node.name ||
            node.kind === 240 ||
            node.kind === 242 ||
            node.kind === 246 ||
            node.kind === 243 && exportAssignmentIsAlias(node);
    }
    ts.isAliasSymbolDeclaration = isAliasSymbolDeclaration;
    function exportAssignmentIsAlias(node) {
        return isEntityNameExpression(node.expression);
    }
    ts.exportAssignmentIsAlias = exportAssignmentIsAlias;
    function getClassExtendsHeritageClauseElement(node) {
        var heritageClause = getHeritageClause(node.heritageClauses, 85);
        return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
    }
    ts.getClassExtendsHeritageClauseElement = getClassExtendsHeritageClauseElement;
    function getClassImplementsHeritageClauseElements(node) {
        var heritageClause = getHeritageClause(node.heritageClauses, 108);
        return heritageClause ? heritageClause.types : undefined;
    }
    ts.getClassImplementsHeritageClauseElements = getClassImplementsHeritageClauseElements;
    function getInterfaceBaseTypeNodes(node) {
        var heritageClause = getHeritageClause(node.heritageClauses, 85);
        return heritageClause ? heritageClause.types : undefined;
    }
    ts.getInterfaceBaseTypeNodes = getInterfaceBaseTypeNodes;
    function getHeritageClause(clauses, kind) {
        if (clauses) {
            for (var _i = 0, clauses_1 = clauses; _i < clauses_1.length; _i++) {
                var clause = clauses_1[_i];
                if (clause.token === kind) {
                    return clause;
                }
            }
        }
        return undefined;
    }
    ts.getHeritageClause = getHeritageClause;
    function tryResolveScriptReference(host, sourceFile, reference) {
        if (!host.getCompilerOptions().noResolve) {
            var referenceFileName = ts.isRootedDiskPath(reference.fileName) ? reference.fileName : ts.combinePaths(ts.getDirectoryPath(sourceFile.fileName), reference.fileName);
            return host.getSourceFile(referenceFileName);
        }
    }
    ts.tryResolveScriptReference = tryResolveScriptReference;
    function getAncestor(node, kind) {
        while (node) {
            if (node.kind === kind) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }
    ts.getAncestor = getAncestor;
    function getFileReferenceFromReferencePath(comment, commentRange) {
        var simpleReferenceRegEx = /^\/\/\/\s*<reference\s+/gim;
        var isNoDefaultLibRegEx = new RegExp(defaultLibReferenceRegEx.source, "gim");
        if (simpleReferenceRegEx.test(comment)) {
            if (isNoDefaultLibRegEx.test(comment)) {
                return { isNoDefaultLib: true };
            }
            else {
                var refMatchResult = ts.fullTripleSlashReferencePathRegEx.exec(comment);
                var refLibResult = !refMatchResult && fullTripleSlashReferenceTypeReferenceDirectiveRegEx.exec(comment);
                var match = refMatchResult || refLibResult;
                if (match) {
                    var pos = commentRange.pos + match[1].length + match[2].length;
                    return {
                        fileReference: {
                            pos: pos,
                            end: pos + match[3].length,
                            fileName: match[3]
                        },
                        isNoDefaultLib: false,
                        isTypeReferenceDirective: !!refLibResult
                    };
                }
                return {
                    diagnosticMessage: ts.Diagnostics.Invalid_reference_directive_syntax,
                    isNoDefaultLib: false
                };
            }
        }
        return undefined;
    }
    ts.getFileReferenceFromReferencePath = getFileReferenceFromReferencePath;
    function isKeyword(token) {
        return 72 <= token && token <= 142;
    }
    ts.isKeyword = isKeyword;
    function isTrivia(token) {
        return 2 <= token && token <= 7;
    }
    ts.isTrivia = isTrivia;
    function getFunctionFlags(node) {
        if (!node) {
            return 4;
        }
        var flags = 0;
        switch (node.kind) {
            case 228:
            case 186:
            case 151:
                if (node.asteriskToken) {
                    flags |= 1;
                }
            case 187:
                if (hasModifier(node, 256)) {
                    flags |= 2;
                }
                break;
        }
        if (!node.body) {
            flags |= 4;
        }
        return flags;
    }
    ts.getFunctionFlags = getFunctionFlags;
    function isAsyncFunction(node) {
        switch (node.kind) {
            case 228:
            case 186:
            case 187:
            case 151:
                return node.body !== undefined
                    && node.asteriskToken === undefined
                    && hasModifier(node, 256);
        }
        return false;
    }
    ts.isAsyncFunction = isAsyncFunction;
    function isStringOrNumericLiteral(node) {
        var kind = node.kind;
        return kind === 9
            || kind === 8;
    }
    ts.isStringOrNumericLiteral = isStringOrNumericLiteral;
    function hasDynamicName(declaration) {
        var name = ts.getNameOfDeclaration(declaration);
        return name && isDynamicName(name);
    }
    ts.hasDynamicName = hasDynamicName;
    function isDynamicName(name) {
        return name.kind === 144 &&
            !isStringOrNumericLiteral(name.expression) &&
            !isWellKnownSymbolSyntactically(name.expression);
    }
    ts.isDynamicName = isDynamicName;
    function isWellKnownSymbolSyntactically(node) {
        return ts.isPropertyAccessExpression(node) && isESSymbolIdentifier(node.expression);
    }
    ts.isWellKnownSymbolSyntactically = isWellKnownSymbolSyntactically;
    function getPropertyNameForPropertyNameNode(name) {
        if (name.kind === 71) {
            return name.escapedText;
        }
        if (name.kind === 9 || name.kind === 8) {
            return escapeLeadingUnderscores(name.text);
        }
        if (name.kind === 144) {
            var nameExpression = name.expression;
            if (isWellKnownSymbolSyntactically(nameExpression)) {
                return getPropertyNameForKnownSymbolName(ts.idText(nameExpression.name));
            }
            else if (nameExpression.kind === 9 || nameExpression.kind === 8) {
                return escapeLeadingUnderscores(nameExpression.text);
            }
        }
        return undefined;
    }
    ts.getPropertyNameForPropertyNameNode = getPropertyNameForPropertyNameNode;
    function getTextOfIdentifierOrLiteral(node) {
        if (node) {
            if (node.kind === 71) {
                return ts.idText(node);
            }
            if (node.kind === 9 ||
                node.kind === 8) {
                return node.text;
            }
        }
        return undefined;
    }
    ts.getTextOfIdentifierOrLiteral = getTextOfIdentifierOrLiteral;
    function getEscapedTextOfIdentifierOrLiteral(node) {
        if (node) {
            if (node.kind === 71) {
                return node.escapedText;
            }
            if (node.kind === 9 ||
                node.kind === 8) {
                return escapeLeadingUnderscores(node.text);
            }
        }
        return undefined;
    }
    ts.getEscapedTextOfIdentifierOrLiteral = getEscapedTextOfIdentifierOrLiteral;
    function getPropertyNameForKnownSymbolName(symbolName) {
        return "__@" + symbolName;
    }
    ts.getPropertyNameForKnownSymbolName = getPropertyNameForKnownSymbolName;
    function isESSymbolIdentifier(node) {
        return node.kind === 71 && node.escapedText === "Symbol";
    }
    ts.isESSymbolIdentifier = isESSymbolIdentifier;
    function isPushOrUnshiftIdentifier(node) {
        return node.escapedText === "push" || node.escapedText === "unshift";
    }
    ts.isPushOrUnshiftIdentifier = isPushOrUnshiftIdentifier;
    function isParameterDeclaration(node) {
        var root = getRootDeclaration(node);
        return root.kind === 146;
    }
    ts.isParameterDeclaration = isParameterDeclaration;
    function getRootDeclaration(node) {
        while (node.kind === 176) {
            node = node.parent.parent;
        }
        return node;
    }
    ts.getRootDeclaration = getRootDeclaration;
    function nodeStartsNewLexicalEnvironment(node) {
        var kind = node.kind;
        return kind === 152
            || kind === 186
            || kind === 228
            || kind === 187
            || kind === 151
            || kind === 153
            || kind === 154
            || kind === 233
            || kind === 265;
    }
    ts.nodeStartsNewLexicalEnvironment = nodeStartsNewLexicalEnvironment;
    function nodeIsSynthesized(range) {
        return ts.positionIsSynthesized(range.pos)
            || ts.positionIsSynthesized(range.end);
    }
    ts.nodeIsSynthesized = nodeIsSynthesized;
    function getOriginalSourceFile(sourceFile) {
        return ts.getParseTreeNode(sourceFile, ts.isSourceFile) || sourceFile;
    }
    ts.getOriginalSourceFile = getOriginalSourceFile;
    function getExpressionAssociativity(expression) {
        var operator = getOperator(expression);
        var hasArguments = expression.kind === 182 && expression.arguments !== undefined;
        return getOperatorAssociativity(expression.kind, operator, hasArguments);
    }
    ts.getExpressionAssociativity = getExpressionAssociativity;
    function getOperatorAssociativity(kind, operator, hasArguments) {
        switch (kind) {
            case 182:
                return hasArguments ? 0 : 1;
            case 192:
            case 189:
            case 190:
            case 188:
            case 191:
            case 195:
            case 197:
                return 1;
            case 194:
                switch (operator) {
                    case 40:
                    case 58:
                    case 59:
                    case 60:
                    case 62:
                    case 61:
                    case 63:
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 70:
                    case 69:
                        return 1;
                }
        }
        return 0;
    }
    ts.getOperatorAssociativity = getOperatorAssociativity;
    function getExpressionPrecedence(expression) {
        var operator = getOperator(expression);
        var hasArguments = expression.kind === 182 && expression.arguments !== undefined;
        return getOperatorPrecedence(expression.kind, operator, hasArguments);
    }
    ts.getExpressionPrecedence = getExpressionPrecedence;
    function getOperator(expression) {
        if (expression.kind === 194) {
            return expression.operatorToken.kind;
        }
        else if (expression.kind === 192 || expression.kind === 193) {
            return expression.operator;
        }
        else {
            return expression.kind;
        }
    }
    ts.getOperator = getOperator;
    function getOperatorPrecedence(nodeKind, operatorKind, hasArguments) {
        switch (nodeKind) {
            case 99:
            case 97:
            case 71:
            case 95:
            case 101:
            case 86:
            case 8:
            case 9:
            case 177:
            case 178:
            case 186:
            case 187:
            case 199:
            case 249:
            case 250:
            case 12:
            case 13:
            case 196:
            case 185:
            case 200:
                return 19;
            case 183:
            case 179:
            case 180:
                return 18;
            case 182:
                return hasArguments ? 18 : 17;
            case 181:
                return 17;
            case 193:
                return 16;
            case 192:
            case 189:
            case 190:
            case 188:
            case 191:
                return 15;
            case 194:
                switch (operatorKind) {
                    case 51:
                    case 52:
                        return 15;
                    case 40:
                    case 39:
                    case 41:
                    case 42:
                        return 14;
                    case 37:
                    case 38:
                        return 13;
                    case 45:
                    case 46:
                    case 47:
                        return 12;
                    case 27:
                    case 30:
                    case 29:
                    case 31:
                    case 92:
                    case 93:
                        return 11;
                    case 32:
                    case 34:
                    case 33:
                    case 35:
                        return 10;
                    case 48:
                        return 9;
                    case 50:
                        return 8;
                    case 49:
                        return 7;
                    case 53:
                        return 6;
                    case 54:
                        return 5;
                    case 58:
                    case 59:
                    case 60:
                    case 62:
                    case 61:
                    case 63:
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 70:
                    case 69:
                        return 3;
                    case 26:
                        return 0;
                    default:
                        return -1;
                }
            case 195:
                return 4;
            case 197:
                return 2;
            case 198:
                return 1;
            case 289:
                return 0;
            default:
                return -1;
        }
    }
    ts.getOperatorPrecedence = getOperatorPrecedence;
    function createDiagnosticCollection() {
        var nonFileDiagnostics = [];
        var fileDiagnostics = ts.createMap();
        var diagnosticsModified = false;
        var modificationCount = 0;
        return {
            add: add,
            getGlobalDiagnostics: getGlobalDiagnostics,
            getDiagnostics: getDiagnostics,
            getModificationCount: getModificationCount,
            reattachFileDiagnostics: reattachFileDiagnostics
        };
        function getModificationCount() {
            return modificationCount;
        }
        function reattachFileDiagnostics(newFile) {
            ts.forEach(fileDiagnostics.get(newFile.fileName), function (diagnostic) { return diagnostic.file = newFile; });
        }
        function add(diagnostic) {
            var diagnostics;
            if (diagnostic.file) {
                diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
                if (!diagnostics) {
                    diagnostics = [];
                    fileDiagnostics.set(diagnostic.file.fileName, diagnostics);
                }
            }
            else {
                diagnostics = nonFileDiagnostics;
            }
            diagnostics.push(diagnostic);
            diagnosticsModified = true;
            modificationCount++;
        }
        function getGlobalDiagnostics() {
            sortAndDeduplicate();
            return nonFileDiagnostics;
        }
        function getDiagnostics(fileName) {
            sortAndDeduplicate();
            if (fileName) {
                return fileDiagnostics.get(fileName) || [];
            }
            var allDiagnostics = [];
            function pushDiagnostic(d) {
                allDiagnostics.push(d);
            }
            ts.forEach(nonFileDiagnostics, pushDiagnostic);
            fileDiagnostics.forEach(function (diagnostics) {
                ts.forEach(diagnostics, pushDiagnostic);
            });
            return ts.sortAndDeduplicateDiagnostics(allDiagnostics);
        }
        function sortAndDeduplicate() {
            if (!diagnosticsModified) {
                return;
            }
            diagnosticsModified = false;
            nonFileDiagnostics = ts.sortAndDeduplicateDiagnostics(nonFileDiagnostics);
            fileDiagnostics.forEach(function (diagnostics, key) {
                fileDiagnostics.set(key, ts.sortAndDeduplicateDiagnostics(diagnostics));
            });
        }
    }
    ts.createDiagnosticCollection = createDiagnosticCollection;
    var doubleQuoteEscapedCharsRegExp = /[\\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    var singleQuoteEscapedCharsRegExp = /[\\\'\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    var backtickQuoteEscapedCharsRegExp = /[\\\`\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
    var escapedCharsMap = ts.createMapFromTemplate({
        "\0": "\\0",
        "\t": "\\t",
        "\v": "\\v",
        "\f": "\\f",
        "\b": "\\b",
        "\r": "\\r",
        "\n": "\\n",
        "\\": "\\\\",
        "\"": "\\\"",
        "\'": "\\\'",
        "\`": "\\\`",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029",
        "\u0085": "\\u0085"
    });
    var escapedNullRegExp = /\\0[0-9]/g;
    function escapeString(s, quoteChar) {
        var escapedCharsRegExp = quoteChar === 96 ? backtickQuoteEscapedCharsRegExp :
            quoteChar === 39 ? singleQuoteEscapedCharsRegExp :
                doubleQuoteEscapedCharsRegExp;
        return s.replace(escapedCharsRegExp, getReplacement).replace(escapedNullRegExp, nullReplacement);
    }
    ts.escapeString = escapeString;
    function nullReplacement(c) {
        return "\\x00" + c.charAt(c.length - 1);
    }
    function getReplacement(c) {
        return escapedCharsMap.get(c) || get16BitUnicodeEscapeSequence(c.charCodeAt(0));
    }
    function isIntrinsicJsxName(name) {
        var ch = name.substr(0, 1);
        return ch.toLowerCase() === ch;
    }
    ts.isIntrinsicJsxName = isIntrinsicJsxName;
    function get16BitUnicodeEscapeSequence(charCode) {
        var hexCharCode = charCode.toString(16).toUpperCase();
        var paddedHexCode = ("0000" + hexCharCode).slice(-4);
        return "\\u" + paddedHexCode;
    }
    var nonAsciiCharacters = /[^\u0000-\u007F]/g;
    function escapeNonAsciiString(s, quoteChar) {
        s = escapeString(s, quoteChar);
        return nonAsciiCharacters.test(s) ?
            s.replace(nonAsciiCharacters, function (c) { return get16BitUnicodeEscapeSequence(c.charCodeAt(0)); }) :
            s;
    }
    ts.escapeNonAsciiString = escapeNonAsciiString;
    var indentStrings = ["", "    "];
    function getIndentString(level) {
        if (indentStrings[level] === undefined) {
            indentStrings[level] = getIndentString(level - 1) + indentStrings[1];
        }
        return indentStrings[level];
    }
    ts.getIndentString = getIndentString;
    function getIndentSize() {
        return indentStrings[1].length;
    }
    ts.getIndentSize = getIndentSize;
    function createTextWriter(newLine) {
        var output;
        var indent;
        var lineStart;
        var lineCount;
        var linePos;
        function write(s) {
            if (s && s.length) {
                if (lineStart) {
                    output += getIndentString(indent);
                    lineStart = false;
                }
                output += s;
            }
        }
        function reset() {
            output = "";
            indent = 0;
            lineStart = true;
            lineCount = 0;
            linePos = 0;
        }
        function rawWrite(s) {
            if (s !== undefined) {
                if (lineStart) {
                    lineStart = false;
                }
                output += s;
            }
        }
        function writeLiteral(s) {
            if (s && s.length) {
                write(s);
                var lineStartsOfS = ts.computeLineStarts(s);
                if (lineStartsOfS.length > 1) {
                    lineCount = lineCount + lineStartsOfS.length - 1;
                    linePos = output.length - s.length + ts.lastOrUndefined(lineStartsOfS);
                }
            }
        }
        function writeLine() {
            if (!lineStart) {
                output += newLine;
                lineCount++;
                linePos = output.length;
                lineStart = true;
            }
        }
        function writeTextOfNode(text, node) {
            write(getTextOfNodeFromSourceText(text, node));
        }
        reset();
        return {
            write: write,
            rawWrite: rawWrite,
            writeTextOfNode: writeTextOfNode,
            writeLiteral: writeLiteral,
            writeLine: writeLine,
            increaseIndent: function () { indent++; },
            decreaseIndent: function () { indent--; },
            getIndent: function () { return indent; },
            getTextPos: function () { return output.length; },
            getLine: function () { return lineCount + 1; },
            getColumn: function () { return lineStart ? indent * getIndentSize() + 1 : output.length - linePos + 1; },
            getText: function () { return output; },
            isAtStartOfLine: function () { return lineStart; },
            reset: reset
        };
    }
    ts.createTextWriter = createTextWriter;
    function getResolvedExternalModuleName(host, file) {
        return file.moduleName || getExternalModuleNameFromPath(host, file.fileName);
    }
    ts.getResolvedExternalModuleName = getResolvedExternalModuleName;
    function getExternalModuleNameFromDeclaration(host, resolver, declaration) {
        var file = resolver.getExternalModuleFileFromDeclaration(declaration);
        if (!file || file.isDeclarationFile) {
            return undefined;
        }
        return getResolvedExternalModuleName(host, file);
    }
    ts.getExternalModuleNameFromDeclaration = getExternalModuleNameFromDeclaration;
    function getExternalModuleNameFromPath(host, fileName) {
        var getCanonicalFileName = function (f) { return host.getCanonicalFileName(f); };
        var dir = ts.toPath(host.getCommonSourceDirectory(), host.getCurrentDirectory(), getCanonicalFileName);
        var filePath = ts.getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
        var relativePath = ts.getRelativePathToDirectoryOrUrl(dir, filePath, dir, getCanonicalFileName, false);
        return ts.removeFileExtension(relativePath);
    }
    ts.getExternalModuleNameFromPath = getExternalModuleNameFromPath;
    function getOwnEmitOutputFilePath(sourceFile, host, extension) {
        var compilerOptions = host.getCompilerOptions();
        var emitOutputFilePathWithoutExtension;
        if (compilerOptions.outDir) {
            emitOutputFilePathWithoutExtension = ts.removeFileExtension(getSourceFilePathInNewDir(sourceFile, host, compilerOptions.outDir));
        }
        else {
            emitOutputFilePathWithoutExtension = ts.removeFileExtension(sourceFile.fileName);
        }
        return emitOutputFilePathWithoutExtension + extension;
    }
    ts.getOwnEmitOutputFilePath = getOwnEmitOutputFilePath;
    function getDeclarationEmitOutputFilePath(sourceFile, host) {
        var options = host.getCompilerOptions();
        var outputDir = options.declarationDir || options.outDir;
        var path = outputDir
            ? getSourceFilePathInNewDir(sourceFile, host, outputDir)
            : sourceFile.fileName;
        return ts.removeFileExtension(path) + ".d.ts";
    }
    ts.getDeclarationEmitOutputFilePath = getDeclarationEmitOutputFilePath;
    function getSourceFilesToEmit(host, targetSourceFile) {
        var options = host.getCompilerOptions();
        var isSourceFileFromExternalLibrary = function (file) { return host.isSourceFileFromExternalLibrary(file); };
        if (options.outFile || options.out) {
            var moduleKind = ts.getEmitModuleKind(options);
            var moduleEmitEnabled_1 = moduleKind === ts.ModuleKind.AMD || moduleKind === ts.ModuleKind.System;
            return ts.filter(host.getSourceFiles(), function (sourceFile) {
                return (moduleEmitEnabled_1 || !ts.isExternalModule(sourceFile)) && sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary);
            });
        }
        else {
            var sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
            return ts.filter(sourceFiles, function (sourceFile) { return sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary); });
        }
    }
    ts.getSourceFilesToEmit = getSourceFilesToEmit;
    function sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary) {
        return !(options.noEmitForJsFiles && isSourceFileJavaScript(sourceFile)) && !sourceFile.isDeclarationFile && !isSourceFileFromExternalLibrary(sourceFile);
    }
    ts.sourceFileMayBeEmitted = sourceFileMayBeEmitted;
    function getSourceFilePathInNewDir(sourceFile, host, newDirPath) {
        var sourceFilePath = ts.getNormalizedAbsolutePath(sourceFile.fileName, host.getCurrentDirectory());
        var commonSourceDirectory = host.getCommonSourceDirectory();
        var isSourceFileInCommonSourceDirectory = host.getCanonicalFileName(sourceFilePath).indexOf(host.getCanonicalFileName(commonSourceDirectory)) === 0;
        sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
        return ts.combinePaths(newDirPath, sourceFilePath);
    }
    ts.getSourceFilePathInNewDir = getSourceFilePathInNewDir;
    function writeFile(host, diagnostics, fileName, data, writeByteOrderMark, sourceFiles) {
        host.writeFile(fileName, data, writeByteOrderMark, function (hostErrorMessage) {
            diagnostics.add(ts.createCompilerDiagnostic(ts.Diagnostics.Could_not_write_file_0_Colon_1, fileName, hostErrorMessage));
        }, sourceFiles);
    }
    ts.writeFile = writeFile;
    function getLineOfLocalPosition(currentSourceFile, pos) {
        return ts.getLineAndCharacterOfPosition(currentSourceFile, pos).line;
    }
    ts.getLineOfLocalPosition = getLineOfLocalPosition;
    function getLineOfLocalPositionFromLineMap(lineMap, pos) {
        return ts.computeLineAndCharacterOfPosition(lineMap, pos).line;
    }
    ts.getLineOfLocalPositionFromLineMap = getLineOfLocalPositionFromLineMap;
    function getFirstConstructorWithBody(node) {
        return ts.forEach(node.members, function (member) {
            if (member.kind === 152 && nodeIsPresent(member.body)) {
                return member;
            }
        });
    }
    ts.getFirstConstructorWithBody = getFirstConstructorWithBody;
    function getSetAccessorValueParameter(accessor) {
        if (accessor && accessor.parameters.length > 0) {
            var hasThis = accessor.parameters.length === 2 && parameterIsThisKeyword(accessor.parameters[0]);
            return accessor.parameters[hasThis ? 1 : 0];
        }
    }
    function getSetAccessorTypeAnnotationNode(accessor) {
        var parameter = getSetAccessorValueParameter(accessor);
        return parameter && parameter.type;
    }
    ts.getSetAccessorTypeAnnotationNode = getSetAccessorTypeAnnotationNode;
    function getThisParameter(signature) {
        if (signature.parameters.length) {
            var thisParameter = signature.parameters[0];
            if (parameterIsThisKeyword(thisParameter)) {
                return thisParameter;
            }
        }
    }
    ts.getThisParameter = getThisParameter;
    function parameterIsThisKeyword(parameter) {
        return isThisIdentifier(parameter.name);
    }
    ts.parameterIsThisKeyword = parameterIsThisKeyword;
    function isThisIdentifier(node) {
        return node && node.kind === 71 && identifierIsThisKeyword(node);
    }
    ts.isThisIdentifier = isThisIdentifier;
    function identifierIsThisKeyword(id) {
        return id.originalKeywordKind === 99;
    }
    ts.identifierIsThisKeyword = identifierIsThisKeyword;
    function getAllAccessorDeclarations(declarations, accessor) {
        var firstAccessor;
        var secondAccessor;
        var getAccessor;
        var setAccessor;
        if (hasDynamicName(accessor)) {
            firstAccessor = accessor;
            if (accessor.kind === 153) {
                getAccessor = accessor;
            }
            else if (accessor.kind === 154) {
                setAccessor = accessor;
            }
            else {
                ts.Debug.fail("Accessor has wrong kind");
            }
        }
        else {
            ts.forEach(declarations, function (member) {
                if ((member.kind === 153 || member.kind === 154)
                    && hasModifier(member, 32) === hasModifier(accessor, 32)) {
                    var memberName = getPropertyNameForPropertyNameNode(member.name);
                    var accessorName = getPropertyNameForPropertyNameNode(accessor.name);
                    if (memberName === accessorName) {
                        if (!firstAccessor) {
                            firstAccessor = member;
                        }
                        else if (!secondAccessor) {
                            secondAccessor = member;
                        }
                        if (member.kind === 153 && !getAccessor) {
                            getAccessor = member;
                        }
                        if (member.kind === 154 && !setAccessor) {
                            setAccessor = member;
                        }
                    }
                }
            });
        }
        return {
            firstAccessor: firstAccessor,
            secondAccessor: secondAccessor,
            getAccessor: getAccessor,
            setAccessor: setAccessor
        };
    }
    ts.getAllAccessorDeclarations = getAllAccessorDeclarations;
    function getEffectiveTypeAnnotationNode(node, checkJSDoc) {
        if (node.type) {
            return node.type;
        }
        if (checkJSDoc || isInJavaScriptFile(node)) {
            return ts.getJSDocType(node);
        }
    }
    ts.getEffectiveTypeAnnotationNode = getEffectiveTypeAnnotationNode;
    function getEffectiveReturnTypeNode(node, checkJSDoc) {
        if (node.type) {
            return node.type;
        }
        if (checkJSDoc || isInJavaScriptFile(node)) {
            return ts.getJSDocReturnType(node);
        }
    }
    ts.getEffectiveReturnTypeNode = getEffectiveReturnTypeNode;
    function getEffectiveTypeParameterDeclarations(node, checkJSDoc) {
        if (node.typeParameters) {
            return node.typeParameters;
        }
        if (checkJSDoc || isInJavaScriptFile(node)) {
            var templateTag = ts.getJSDocTemplateTag(node);
            return templateTag && templateTag.typeParameters;
        }
    }
    ts.getEffectiveTypeParameterDeclarations = getEffectiveTypeParameterDeclarations;
    function getEffectiveSetAccessorTypeAnnotationNode(node, checkJSDoc) {
        var parameter = getSetAccessorValueParameter(node);
        return parameter && getEffectiveTypeAnnotationNode(parameter, checkJSDoc);
    }
    ts.getEffectiveSetAccessorTypeAnnotationNode = getEffectiveSetAccessorTypeAnnotationNode;
    function emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments) {
        emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
    }
    ts.emitNewLineBeforeLeadingComments = emitNewLineBeforeLeadingComments;
    function emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, pos, leadingComments) {
        if (leadingComments && leadingComments.length && pos !== leadingComments[0].pos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)) {
            writer.writeLine();
        }
    }
    ts.emitNewLineBeforeLeadingCommentsOfPosition = emitNewLineBeforeLeadingCommentsOfPosition;
    function emitNewLineBeforeLeadingCommentOfPosition(lineMap, writer, pos, commentPos) {
        if (pos !== commentPos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)) {
            writer.writeLine();
        }
    }
    ts.emitNewLineBeforeLeadingCommentOfPosition = emitNewLineBeforeLeadingCommentOfPosition;
    function emitComments(text, lineMap, writer, comments, leadingSeparator, trailingSeparator, newLine, writeComment) {
        if (comments && comments.length > 0) {
            if (leadingSeparator) {
                writer.write(" ");
            }
            var emitInterveningSeparator = false;
            for (var _i = 0, comments_1 = comments; _i < comments_1.length; _i++) {
                var comment = comments_1[_i];
                if (emitInterveningSeparator) {
                    writer.write(" ");
                    emitInterveningSeparator = false;
                }
                writeComment(text, lineMap, writer, comment.pos, comment.end, newLine);
                if (comment.hasTrailingNewLine) {
                    writer.writeLine();
                }
                else {
                    emitInterveningSeparator = true;
                }
            }
            if (emitInterveningSeparator && trailingSeparator) {
                writer.write(" ");
            }
        }
    }
    ts.emitComments = emitComments;
    function emitDetachedComments(text, lineMap, writer, writeComment, node, newLine, removeComments) {
        var leadingComments;
        var currentDetachedCommentInfo;
        if (removeComments) {
            if (node.pos === 0) {
                leadingComments = ts.filter(ts.getLeadingCommentRanges(text, node.pos), isPinnedCommentLocal);
            }
        }
        else {
            leadingComments = ts.getLeadingCommentRanges(text, node.pos);
        }
        if (leadingComments) {
            var detachedComments = [];
            var lastComment = void 0;
            for (var _i = 0, leadingComments_1 = leadingComments; _i < leadingComments_1.length; _i++) {
                var comment = leadingComments_1[_i];
                if (lastComment) {
                    var lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, lastComment.end);
                    var commentLine = getLineOfLocalPositionFromLineMap(lineMap, comment.pos);
                    if (commentLine >= lastCommentLine + 2) {
                        break;
                    }
                }
                detachedComments.push(comment);
                lastComment = comment;
            }
            if (detachedComments.length) {
                var lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, ts.lastOrUndefined(detachedComments).end);
                var nodeLine = getLineOfLocalPositionFromLineMap(lineMap, ts.skipTrivia(text, node.pos));
                if (nodeLine >= lastCommentLine + 2) {
                    emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments);
                    emitComments(text, lineMap, writer, detachedComments, false, true, newLine, writeComment);
                    currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: ts.lastOrUndefined(detachedComments).end };
                }
            }
        }
        return currentDetachedCommentInfo;
        function isPinnedCommentLocal(comment) {
            return isPinnedComment(text, comment);
        }
    }
    ts.emitDetachedComments = emitDetachedComments;
    function writeCommentRange(text, lineMap, writer, commentPos, commentEnd, newLine) {
        if (text.charCodeAt(commentPos + 1) === 42) {
            var firstCommentLineAndCharacter = ts.computeLineAndCharacterOfPosition(lineMap, commentPos);
            var lineCount = lineMap.length;
            var firstCommentLineIndent = void 0;
            for (var pos = commentPos, currentLine = firstCommentLineAndCharacter.line; pos < commentEnd; currentLine++) {
                var nextLineStart = (currentLine + 1) === lineCount
                    ? text.length + 1
                    : lineMap[currentLine + 1];
                if (pos !== commentPos) {
                    if (firstCommentLineIndent === undefined) {
                        firstCommentLineIndent = calculateIndent(text, lineMap[firstCommentLineAndCharacter.line], commentPos);
                    }
                    var currentWriterIndentSpacing = writer.getIndent() * getIndentSize();
                    var spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(text, pos, nextLineStart);
                    if (spacesToEmit > 0) {
                        var numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                        var indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());
                        writer.rawWrite(indentSizeSpaceString);
                        while (numberOfSingleSpacesToEmit) {
                            writer.rawWrite(" ");
                            numberOfSingleSpacesToEmit--;
                        }
                    }
                    else {
                        writer.rawWrite("");
                    }
                }
                writeTrimmedCurrentLine(text, commentEnd, writer, newLine, pos, nextLineStart);
                pos = nextLineStart;
            }
        }
        else {
            writer.write(text.substring(commentPos, commentEnd));
        }
    }
    ts.writeCommentRange = writeCommentRange;
    function writeTrimmedCurrentLine(text, commentEnd, writer, newLine, pos, nextLineStart) {
        var end = Math.min(commentEnd, nextLineStart - 1);
        var currentLineText = text.substring(pos, end).replace(/^\s+|\s+$/g, "");
        if (currentLineText) {
            writer.write(currentLineText);
            if (end !== commentEnd) {
                writer.writeLine();
            }
        }
        else {
            writer.writeLiteral(newLine);
        }
    }
    function calculateIndent(text, pos, end) {
        var currentLineIndent = 0;
        for (; pos < end && ts.isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++) {
            if (text.charCodeAt(pos) === 9) {
                currentLineIndent += getIndentSize() - (currentLineIndent % getIndentSize());
            }
            else {
                currentLineIndent++;
            }
        }
        return currentLineIndent;
    }
    function hasModifiers(node) {
        return getModifierFlags(node) !== 0;
    }
    ts.hasModifiers = hasModifiers;
    function hasModifier(node, flags) {
        return !!getSelectedModifierFlags(node, flags);
    }
    ts.hasModifier = hasModifier;
    function getSelectedModifierFlags(node, flags) {
        return getModifierFlags(node) & flags;
    }
    ts.getSelectedModifierFlags = getSelectedModifierFlags;
    function getModifierFlags(node) {
        if (node.modifierFlagsCache & 536870912) {
            return node.modifierFlagsCache & ~536870912;
        }
        var flags = getModifierFlagsNoCache(node);
        node.modifierFlagsCache = flags | 536870912;
        return flags;
    }
    ts.getModifierFlags = getModifierFlags;
    function getModifierFlagsNoCache(node) {
        var flags = 0;
        if (node.modifiers) {
            for (var _i = 0, _a = node.modifiers; _i < _a.length; _i++) {
                var modifier = _a[_i];
                flags |= modifierToFlag(modifier.kind);
            }
        }
        if (node.flags & 4 || (node.kind === 71 && node.isInJSDocNamespace)) {
            flags |= 1;
        }
        return flags;
    }
    ts.getModifierFlagsNoCache = getModifierFlagsNoCache;
    function modifierToFlag(token) {
        switch (token) {
            case 115: return 32;
            case 114: return 4;
            case 113: return 16;
            case 112: return 8;
            case 117: return 128;
            case 84: return 1;
            case 124: return 2;
            case 76: return 2048;
            case 79: return 512;
            case 120: return 256;
            case 131: return 64;
        }
        return 0;
    }
    ts.modifierToFlag = modifierToFlag;
    function isLogicalOperator(token) {
        return token === 54
            || token === 53
            || token === 51;
    }
    ts.isLogicalOperator = isLogicalOperator;
    function isAssignmentOperator(token) {
        return token >= 58 && token <= 70;
    }
    ts.isAssignmentOperator = isAssignmentOperator;
    function tryGetClassExtendingExpressionWithTypeArguments(node) {
        if (node.kind === 201 &&
            node.parent.token === 85 &&
            ts.isClassLike(node.parent.parent)) {
            return node.parent.parent;
        }
    }
    ts.tryGetClassExtendingExpressionWithTypeArguments = tryGetClassExtendingExpressionWithTypeArguments;
    function isAssignmentExpression(node, excludeCompoundAssignment) {
        return ts.isBinaryExpression(node)
            && (excludeCompoundAssignment
                ? node.operatorToken.kind === 58
                : isAssignmentOperator(node.operatorToken.kind))
            && ts.isLeftHandSideExpression(node.left);
    }
    ts.isAssignmentExpression = isAssignmentExpression;
    function isDestructuringAssignment(node) {
        if (isAssignmentExpression(node, true)) {
            var kind = node.left.kind;
            return kind === 178
                || kind === 177;
        }
        return false;
    }
    ts.isDestructuringAssignment = isDestructuringAssignment;
    function isExpressionWithTypeArgumentsInClassExtendsClause(node) {
        return tryGetClassExtendingExpressionWithTypeArguments(node) !== undefined;
    }
    ts.isExpressionWithTypeArgumentsInClassExtendsClause = isExpressionWithTypeArgumentsInClassExtendsClause;
    function isExpressionWithTypeArgumentsInClassImplementsClause(node) {
        return node.kind === 201
            && isEntityNameExpression(node.expression)
            && node.parent
            && node.parent.token === 108
            && node.parent.parent
            && ts.isClassLike(node.parent.parent);
    }
    ts.isExpressionWithTypeArgumentsInClassImplementsClause = isExpressionWithTypeArgumentsInClassImplementsClause;
    function isEntityNameExpression(node) {
        return node.kind === 71 ||
            node.kind === 179 && isEntityNameExpression(node.expression);
    }
    ts.isEntityNameExpression = isEntityNameExpression;
    function isRightSideOfQualifiedNameOrPropertyAccess(node) {
        return (node.parent.kind === 143 && node.parent.right === node) ||
            (node.parent.kind === 179 && node.parent.name === node);
    }
    ts.isRightSideOfQualifiedNameOrPropertyAccess = isRightSideOfQualifiedNameOrPropertyAccess;
    function isEmptyObjectLiteral(expression) {
        return expression.kind === 178 &&
            expression.properties.length === 0;
    }
    ts.isEmptyObjectLiteral = isEmptyObjectLiteral;
    function isEmptyArrayLiteral(expression) {
        return expression.kind === 177 &&
            expression.elements.length === 0;
    }
    ts.isEmptyArrayLiteral = isEmptyArrayLiteral;
    function getLocalSymbolForExportDefault(symbol) {
        return isExportDefaultSymbol(symbol) ? symbol.declarations[0].localSymbol : undefined;
    }
    ts.getLocalSymbolForExportDefault = getLocalSymbolForExportDefault;
    function isExportDefaultSymbol(symbol) {
        return symbol && ts.length(symbol.declarations) > 0 && hasModifier(symbol.declarations[0], 512);
    }
    function tryExtractTypeScriptExtension(fileName) {
        return ts.find(ts.supportedTypescriptExtensionsForExtractExtension, function (extension) { return ts.fileExtensionIs(fileName, extension); });
    }
    ts.tryExtractTypeScriptExtension = tryExtractTypeScriptExtension;
    function getExpandedCharCodes(input) {
        var output = [];
        var length = input.length;
        for (var i = 0; i < length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode < 0x80) {
                output.push(charCode);
            }
            else if (charCode < 0x800) {
                output.push((charCode >> 6) | 192);
                output.push((charCode & 63) | 128);
            }
            else if (charCode < 0x10000) {
                output.push((charCode >> 12) | 224);
                output.push(((charCode >> 6) & 63) | 128);
                output.push((charCode & 63) | 128);
            }
            else if (charCode < 0x20000) {
                output.push((charCode >> 18) | 240);
                output.push(((charCode >> 12) & 63) | 128);
                output.push(((charCode >> 6) & 63) | 128);
                output.push((charCode & 63) | 128);
            }
            else {
                ts.Debug.assert(false, "Unexpected code point");
            }
        }
        return output;
    }
    var base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function convertToBase64(input) {
        var result = "";
        var charCodes = getExpandedCharCodes(input);
        var i = 0;
        var length = charCodes.length;
        var byte1, byte2, byte3, byte4;
        while (i < length) {
            byte1 = charCodes[i] >> 2;
            byte2 = (charCodes[i] & 3) << 4 | charCodes[i + 1] >> 4;
            byte3 = (charCodes[i + 1] & 15) << 2 | charCodes[i + 2] >> 6;
            byte4 = charCodes[i + 2] & 63;
            if (i + 1 >= length) {
                byte3 = byte4 = 64;
            }
            else if (i + 2 >= length) {
                byte4 = 64;
            }
            result += base64Digits.charAt(byte1) + base64Digits.charAt(byte2) + base64Digits.charAt(byte3) + base64Digits.charAt(byte4);
            i += 3;
        }
        return result;
    }
    ts.convertToBase64 = convertToBase64;
    var carriageReturnLineFeed = "\r\n";
    var lineFeed = "\n";
    function getNewLineCharacter(options, system) {
        switch (options.newLine) {
            case 0:
                return carriageReturnLineFeed;
            case 1:
                return lineFeed;
        }
        return system ? system.newLine : ts.sys ? ts.sys.newLine : carriageReturnLineFeed;
    }
    ts.getNewLineCharacter = getNewLineCharacter;
    function formatEnum(value, enumObject, isFlags) {
        if (value === void 0) { value = 0; }
        var members = getEnumMembers(enumObject);
        if (value === 0) {
            return members.length > 0 && members[0][0] === 0 ? members[0][1] : "0";
        }
        if (isFlags) {
            var result = "";
            var remainingFlags = value;
            for (var i = members.length - 1; i >= 0 && remainingFlags !== 0; i--) {
                var _a = members[i], enumValue = _a[0], enumName = _a[1];
                if (enumValue !== 0 && (remainingFlags & enumValue) === enumValue) {
                    remainingFlags &= ~enumValue;
                    result = "" + enumName + (result ? ", " : "") + result;
                }
            }
            if (remainingFlags === 0) {
                return result;
            }
        }
        else {
            for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                var _b = members_1[_i], enumValue = _b[0], enumName = _b[1];
                if (enumValue === value) {
                    return enumName;
                }
            }
        }
        return value.toString();
    }
    function getEnumMembers(enumObject) {
        var result = [];
        for (var name in enumObject) {
            var value = enumObject[name];
            if (typeof value === "number") {
                result.push([value, name]);
            }
        }
        return ts.stableSort(result, function (x, y) { return ts.compareValues(x[0], y[0]); });
    }
    function formatSyntaxKind(kind) {
        return formatEnum(kind, ts.SyntaxKind, false);
    }
    ts.formatSyntaxKind = formatSyntaxKind;
    function formatModifierFlags(flags) {
        return formatEnum(flags, ts.ModifierFlags, true);
    }
    ts.formatModifierFlags = formatModifierFlags;
    function formatTransformFlags(flags) {
        return formatEnum(flags, ts.TransformFlags, true);
    }
    ts.formatTransformFlags = formatTransformFlags;
    function formatEmitFlags(flags) {
        return formatEnum(flags, ts.EmitFlags, true);
    }
    ts.formatEmitFlags = formatEmitFlags;
    function formatSymbolFlags(flags) {
        return formatEnum(flags, ts.SymbolFlags, true);
    }
    ts.formatSymbolFlags = formatSymbolFlags;
    function formatTypeFlags(flags) {
        return formatEnum(flags, ts.TypeFlags, true);
    }
    ts.formatTypeFlags = formatTypeFlags;
    function formatObjectFlags(flags) {
        return formatEnum(flags, ts.ObjectFlags, true);
    }
    ts.formatObjectFlags = formatObjectFlags;
    function createRange(pos, end) {
        return { pos: pos, end: end };
    }
    ts.createRange = createRange;
    function moveRangeEnd(range, end) {
        return createRange(range.pos, end);
    }
    ts.moveRangeEnd = moveRangeEnd;
    function moveRangePos(range, pos) {
        return createRange(pos, range.end);
    }
    ts.moveRangePos = moveRangePos;
    function moveRangePastDecorators(node) {
        return node.decorators && node.decorators.length > 0
            ? moveRangePos(node, node.decorators.end)
            : node;
    }
    ts.moveRangePastDecorators = moveRangePastDecorators;
    function moveRangePastModifiers(node) {
        return node.modifiers && node.modifiers.length > 0
            ? moveRangePos(node, node.modifiers.end)
            : moveRangePastDecorators(node);
    }
    ts.moveRangePastModifiers = moveRangePastModifiers;
    function isCollapsedRange(range) {
        return range.pos === range.end;
    }
    ts.isCollapsedRange = isCollapsedRange;
    function createTokenRange(pos, token) {
        return createRange(pos, pos + ts.tokenToString(token).length);
    }
    ts.createTokenRange = createTokenRange;
    function rangeIsOnSingleLine(range, sourceFile) {
        return rangeStartIsOnSameLineAsRangeEnd(range, range, sourceFile);
    }
    ts.rangeIsOnSingleLine = rangeIsOnSingleLine;
    function rangeStartPositionsAreOnSameLine(range1, range2, sourceFile) {
        return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile), getStartPositionOfRange(range2, sourceFile), sourceFile);
    }
    ts.rangeStartPositionsAreOnSameLine = rangeStartPositionsAreOnSameLine;
    function rangeEndPositionsAreOnSameLine(range1, range2, sourceFile) {
        return positionsAreOnSameLine(range1.end, range2.end, sourceFile);
    }
    ts.rangeEndPositionsAreOnSameLine = rangeEndPositionsAreOnSameLine;
    function rangeStartIsOnSameLineAsRangeEnd(range1, range2, sourceFile) {
        return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile), range2.end, sourceFile);
    }
    ts.rangeStartIsOnSameLineAsRangeEnd = rangeStartIsOnSameLineAsRangeEnd;
    function rangeEndIsOnSameLineAsRangeStart(range1, range2, sourceFile) {
        return positionsAreOnSameLine(range1.end, getStartPositionOfRange(range2, sourceFile), sourceFile);
    }
    ts.rangeEndIsOnSameLineAsRangeStart = rangeEndIsOnSameLineAsRangeStart;
    function positionsAreOnSameLine(pos1, pos2, sourceFile) {
        return pos1 === pos2 ||
            getLineOfLocalPosition(sourceFile, pos1) === getLineOfLocalPosition(sourceFile, pos2);
    }
    ts.positionsAreOnSameLine = positionsAreOnSameLine;
    function getStartPositionOfRange(range, sourceFile) {
        return ts.positionIsSynthesized(range.pos) ? -1 : ts.skipTrivia(sourceFile.text, range.pos);
    }
    ts.getStartPositionOfRange = getStartPositionOfRange;
    function isDeclarationNameOfEnumOrNamespace(node) {
        var parseNode = ts.getParseTreeNode(node);
        if (parseNode) {
            switch (parseNode.parent.kind) {
                case 232:
                case 233:
                    return parseNode === parseNode.parent.name;
            }
        }
        return false;
    }
    ts.isDeclarationNameOfEnumOrNamespace = isDeclarationNameOfEnumOrNamespace;
    function getInitializedVariables(node) {
        return ts.filter(node.declarations, isInitializedVariable);
    }
    ts.getInitializedVariables = getInitializedVariables;
    function isInitializedVariable(node) {
        return node.initializer !== undefined;
    }
    function isWatchSet(options) {
        return options.watch && options.hasOwnProperty("watch");
    }
    ts.isWatchSet = isWatchSet;
    function getCheckFlags(symbol) {
        return symbol.flags & 33554432 ? symbol.checkFlags : 0;
    }
    ts.getCheckFlags = getCheckFlags;
    function getDeclarationModifierFlagsFromSymbol(s) {
        if (s.valueDeclaration) {
            var flags = ts.getCombinedModifierFlags(s.valueDeclaration);
            return s.parent && s.parent.flags & 32 ? flags : flags & ~28;
        }
        if (getCheckFlags(s) & 6) {
            var checkFlags = s.checkFlags;
            var accessModifier = checkFlags & 256 ? 8 :
                checkFlags & 64 ? 4 :
                    16;
            var staticModifier = checkFlags & 512 ? 32 : 0;
            return accessModifier | staticModifier;
        }
        if (s.flags & 4194304) {
            return 4 | 32;
        }
        return 0;
    }
    ts.getDeclarationModifierFlagsFromSymbol = getDeclarationModifierFlagsFromSymbol;
    function levenshtein(s1, s2) {
        var previous = new Array(s2.length + 1);
        var current = new Array(s2.length + 1);
        for (var i = 0; i < s2.length + 1; i++) {
            previous[i] = i;
            current[i] = -1;
        }
        for (var i = 1; i < s1.length + 1; i++) {
            current[0] = i;
            for (var j = 1; j < s2.length + 1; j++) {
                current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (s1[i - 1] === s2[j - 1] ? 0 : 2));
            }
            var tmp = previous;
            previous = current;
            current = tmp;
        }
        return previous[previous.length - 1];
    }
    ts.levenshtein = levenshtein;
    function skipAlias(symbol, checker) {
        return symbol.flags & 2097152 ? checker.getAliasedSymbol(symbol) : symbol;
    }
    ts.skipAlias = skipAlias;
    function getCombinedLocalAndExportSymbolFlags(symbol) {
        return symbol.exportSymbol ? symbol.exportSymbol.flags | symbol.flags : symbol.flags;
    }
    ts.getCombinedLocalAndExportSymbolFlags = getCombinedLocalAndExportSymbolFlags;
    function isWriteOnlyAccess(node) {
        return accessKind(node) === 1;
    }
    ts.isWriteOnlyAccess = isWriteOnlyAccess;
    function isWriteAccess(node) {
        return accessKind(node) !== 0;
    }
    ts.isWriteAccess = isWriteAccess;
    function accessKind(node) {
        var parent = node.parent;
        if (!parent)
            return 0;
        switch (parent.kind) {
            case 193:
            case 192:
                var operator = parent.operator;
                return operator === 43 || operator === 44 ? writeOrReadWrite() : 0;
            case 194:
                var _a = parent, left = _a.left, operatorToken = _a.operatorToken;
                return left === node && isAssignmentOperator(operatorToken.kind) ? writeOrReadWrite() : 0;
            case 179:
                return parent.name !== node ? 0 : accessKind(parent);
            default:
                return 0;
        }
        function writeOrReadWrite() {
            return parent.parent && parent.parent.kind === 210 ? 1 : 2;
        }
    }
    function compareDataObjects(dst, src) {
        if (!dst || !src || Object.keys(dst).length !== Object.keys(src).length) {
            return false;
        }
        for (var e in dst) {
            if (typeof dst[e] === "object") {
                if (!compareDataObjects(dst[e], src[e])) {
                    return false;
                }
            }
            else if (typeof dst[e] !== "function") {
                if (dst[e] !== src[e]) {
                    return false;
                }
            }
        }
        return true;
    }
    ts.compareDataObjects = compareDataObjects;
    function clearMap(map, onDeleteValue) {
        map.forEach(onDeleteValue);
        map.clear();
    }
    ts.clearMap = clearMap;
    function mutateMap(map, newMap, options) {
        var createNewValue = options.createNewValue, onDeleteValue = options.onDeleteValue, onExistingValue = options.onExistingValue;
        map.forEach(function (existingValue, key) {
            var valueInNewMap = newMap.get(key);
            if (valueInNewMap === undefined) {
                map.delete(key);
                onDeleteValue(existingValue, key);
            }
            else if (onExistingValue) {
                onExistingValue(existingValue, valueInNewMap, key);
            }
        });
        newMap.forEach(function (valueInNewMap, key) {
            if (!map.has(key)) {
                map.set(key, createNewValue(key, valueInNewMap));
            }
        });
    }
    ts.mutateMap = mutateMap;
    function forEachAncestorDirectory(directory, callback) {
        while (true) {
            var result = callback(directory);
            if (result !== undefined) {
                return result;
            }
            var parentPath = ts.getDirectoryPath(directory);
            if (parentPath === directory) {
                return undefined;
            }
            directory = parentPath;
        }
    }
    ts.forEachAncestorDirectory = forEachAncestorDirectory;
})(ts || (ts = {}));
(function (ts) {
    function getDefaultLibFileName(options) {
        switch (options.target) {
            case 5:
                return "lib.esnext.full.d.ts";
            case 4:
                return "lib.es2017.full.d.ts";
            case 3:
                return "lib.es2016.full.d.ts";
            case 2:
                return "lib.es6.d.ts";
            default:
                return "lib.d.ts";
        }
    }
    ts.getDefaultLibFileName = getDefaultLibFileName;
    function textSpanEnd(span) {
        return span.start + span.length;
    }
    ts.textSpanEnd = textSpanEnd;
    function textSpanIsEmpty(span) {
        return span.length === 0;
    }
    ts.textSpanIsEmpty = textSpanIsEmpty;
    function textSpanContainsPosition(span, position) {
        return position >= span.start && position < textSpanEnd(span);
    }
    ts.textSpanContainsPosition = textSpanContainsPosition;
    function textSpanContainsTextSpan(span, other) {
        return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
    }
    ts.textSpanContainsTextSpan = textSpanContainsTextSpan;
    function textSpanOverlapsWith(span, other) {
        var overlapStart = Math.max(span.start, other.start);
        var overlapEnd = Math.min(textSpanEnd(span), textSpanEnd(other));
        return overlapStart < overlapEnd;
    }
    ts.textSpanOverlapsWith = textSpanOverlapsWith;
    function textSpanOverlap(span1, span2) {
        var overlapStart = Math.max(span1.start, span2.start);
        var overlapEnd = Math.min(textSpanEnd(span1), textSpanEnd(span2));
        if (overlapStart < overlapEnd) {
            return createTextSpanFromBounds(overlapStart, overlapEnd);
        }
        return undefined;
    }
    ts.textSpanOverlap = textSpanOverlap;
    function textSpanIntersectsWithTextSpan(span, other) {
        return other.start <= textSpanEnd(span) && textSpanEnd(other) >= span.start;
    }
    ts.textSpanIntersectsWithTextSpan = textSpanIntersectsWithTextSpan;
    function textSpanIntersectsWith(span, start, length) {
        var end = start + length;
        return start <= textSpanEnd(span) && end >= span.start;
    }
    ts.textSpanIntersectsWith = textSpanIntersectsWith;
    function decodedTextSpanIntersectsWith(start1, length1, start2, length2) {
        var end1 = start1 + length1;
        var end2 = start2 + length2;
        return start2 <= end1 && end2 >= start1;
    }
    ts.decodedTextSpanIntersectsWith = decodedTextSpanIntersectsWith;
    function textSpanIntersectsWithPosition(span, position) {
        return position <= textSpanEnd(span) && position >= span.start;
    }
    ts.textSpanIntersectsWithPosition = textSpanIntersectsWithPosition;
    function textSpanIntersection(span1, span2) {
        var intersectStart = Math.max(span1.start, span2.start);
        var intersectEnd = Math.min(textSpanEnd(span1), textSpanEnd(span2));
        if (intersectStart <= intersectEnd) {
            return createTextSpanFromBounds(intersectStart, intersectEnd);
        }
        return undefined;
    }
    ts.textSpanIntersection = textSpanIntersection;
    function createTextSpan(start, length) {
        if (start < 0) {
            throw new Error("start < 0");
        }
        if (length < 0) {
            throw new Error("length < 0");
        }
        return { start: start, length: length };
    }
    ts.createTextSpan = createTextSpan;
    function createTextSpanFromBounds(start, end) {
        return createTextSpan(start, end - start);
    }
    ts.createTextSpanFromBounds = createTextSpanFromBounds;
    function textChangeRangeNewSpan(range) {
        return createTextSpan(range.span.start, range.newLength);
    }
    ts.textChangeRangeNewSpan = textChangeRangeNewSpan;
    function textChangeRangeIsUnchanged(range) {
        return textSpanIsEmpty(range.span) && range.newLength === 0;
    }
    ts.textChangeRangeIsUnchanged = textChangeRangeIsUnchanged;
    function createTextChangeRange(span, newLength) {
        if (newLength < 0) {
            throw new Error("newLength < 0");
        }
        return { span: span, newLength: newLength };
    }
    ts.createTextChangeRange = createTextChangeRange;
    ts.unchangedTextChangeRange = createTextChangeRange(createTextSpan(0, 0), 0);
    function collapseTextChangeRangesAcrossMultipleVersions(changes) {
        if (changes.length === 0) {
            return ts.unchangedTextChangeRange;
        }
        if (changes.length === 1) {
            return changes[0];
        }
        var change0 = changes[0];
        var oldStartN = change0.span.start;
        var oldEndN = textSpanEnd(change0.span);
        var newEndN = oldStartN + change0.newLength;
        for (var i = 1; i < changes.length; i++) {
            var nextChange = changes[i];
            var oldStart1 = oldStartN;
            var oldEnd1 = oldEndN;
            var newEnd1 = newEndN;
            var oldStart2 = nextChange.span.start;
            var oldEnd2 = textSpanEnd(nextChange.span);
            var newEnd2 = oldStart2 + nextChange.newLength;
            oldStartN = Math.min(oldStart1, oldStart2);
            oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
            newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
        }
        return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), newEndN - oldStartN);
    }
    ts.collapseTextChangeRangesAcrossMultipleVersions = collapseTextChangeRangesAcrossMultipleVersions;
    function getTypeParameterOwner(d) {
        if (d && d.kind === 145) {
            for (var current = d; current; current = current.parent) {
                if (ts.isFunctionLike(current) || ts.isClassLike(current) || current.kind === 230) {
                    return current;
                }
            }
        }
    }
    ts.getTypeParameterOwner = getTypeParameterOwner;
    function isParameterPropertyDeclaration(node) {
        return ts.hasModifier(node, 92) && node.parent.kind === 152 && ts.isClassLike(node.parent.parent);
    }
    ts.isParameterPropertyDeclaration = isParameterPropertyDeclaration;
    function isEmptyBindingPattern(node) {
        if (ts.isBindingPattern(node)) {
            return ts.every(node.elements, isEmptyBindingElement);
        }
        return false;
    }
    ts.isEmptyBindingPattern = isEmptyBindingPattern;
    function isEmptyBindingElement(node) {
        if (ts.isOmittedExpression(node)) {
            return true;
        }
        return isEmptyBindingPattern(node.name);
    }
    ts.isEmptyBindingElement = isEmptyBindingElement;
    function walkUpBindingElementsAndPatterns(node) {
        while (node && (node.kind === 176 || ts.isBindingPattern(node))) {
            node = node.parent;
        }
        return node;
    }
    function getCombinedModifierFlags(node) {
        node = walkUpBindingElementsAndPatterns(node);
        var flags = ts.getModifierFlags(node);
        if (node.kind === 226) {
            node = node.parent;
        }
        if (node && node.kind === 227) {
            flags |= ts.getModifierFlags(node);
            node = node.parent;
        }
        if (node && node.kind === 208) {
            flags |= ts.getModifierFlags(node);
        }
        return flags;
    }
    ts.getCombinedModifierFlags = getCombinedModifierFlags;
    function getCombinedNodeFlags(node) {
        node = walkUpBindingElementsAndPatterns(node);
        var flags = node.flags;
        if (node.kind === 226) {
            node = node.parent;
        }
        if (node && node.kind === 227) {
            flags |= node.flags;
            node = node.parent;
        }
        if (node && node.kind === 208) {
            flags |= node.flags;
        }
        return flags;
    }
    ts.getCombinedNodeFlags = getCombinedNodeFlags;
    function validateLocaleAndSetLanguage(locale, sys, errors) {
        var matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(locale.toLowerCase());
        if (!matchResult) {
            if (errors) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, "en", "ja-jp"));
            }
            return;
        }
        var language = matchResult[1];
        var territory = matchResult[3];
        if (!trySetLanguageAndTerritory(language, territory, errors)) {
            trySetLanguageAndTerritory(language, undefined, errors);
        }
        function trySetLanguageAndTerritory(language, territory, errors) {
            var compilerFilePath = ts.normalizePath(sys.getExecutingFilePath());
            var containingDirectoryPath = ts.getDirectoryPath(compilerFilePath);
            var filePath = ts.combinePaths(containingDirectoryPath, language);
            if (territory) {
                filePath = filePath + "-" + territory;
            }
            filePath = sys.resolvePath(ts.combinePaths(filePath, "diagnosticMessages.generated.json"));
            if (!sys.fileExists(filePath)) {
                return false;
            }
            var fileContents = "";
            try {
                fileContents = sys.readFile(filePath);
            }
            catch (e) {
                if (errors) {
                    errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unable_to_open_file_0, filePath));
                }
                return false;
            }
            try {
                ts.localizedDiagnosticMessages = JSON.parse(fileContents);
            }
            catch (e) {
                if (errors) {
                    errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Corrupted_locale_file_0, filePath));
                }
                return false;
            }
            return true;
        }
    }
    ts.validateLocaleAndSetLanguage = validateLocaleAndSetLanguage;
    function getOriginalNode(node, nodeTest) {
        if (node) {
            while (node.original !== undefined) {
                node = node.original;
            }
        }
        return !nodeTest || nodeTest(node) ? node : undefined;
    }
    ts.getOriginalNode = getOriginalNode;
    function isParseTreeNode(node) {
        return (node.flags & 8) === 0;
    }
    ts.isParseTreeNode = isParseTreeNode;
    function getParseTreeNode(node, nodeTest) {
        if (node === undefined || isParseTreeNode(node)) {
            return node;
        }
        node = getOriginalNode(node);
        if (isParseTreeNode(node) && (!nodeTest || nodeTest(node))) {
            return node;
        }
        return undefined;
    }
    ts.getParseTreeNode = getParseTreeNode;
    function unescapeLeadingUnderscores(identifier) {
        var id = identifier;
        return id.length >= 3 && id.charCodeAt(0) === 95 && id.charCodeAt(1) === 95 && id.charCodeAt(2) === 95 ? id.substr(1) : id;
    }
    ts.unescapeLeadingUnderscores = unescapeLeadingUnderscores;
    function idText(identifier) {
        return unescapeLeadingUnderscores(identifier.escapedText);
    }
    ts.idText = idText;
    function symbolName(symbol) {
        return unescapeLeadingUnderscores(symbol.escapedName);
    }
    ts.symbolName = symbolName;
    function unescapeIdentifier(id) {
        return id;
    }
    ts.unescapeIdentifier = unescapeIdentifier;
    function nameForNamelessJSDocTypedef(declaration) {
        var hostNode = declaration.parent.parent;
        if (!hostNode) {
            return undefined;
        }
        if (ts.isDeclaration(hostNode)) {
            return getDeclarationIdentifier(hostNode);
        }
        switch (hostNode.kind) {
            case 208:
                if (hostNode.declarationList &&
                    hostNode.declarationList.declarations[0]) {
                    return getDeclarationIdentifier(hostNode.declarationList.declarations[0]);
                }
                return undefined;
            case 210:
                var expr = hostNode.expression;
                switch (expr.kind) {
                    case 179:
                        return expr.name;
                    case 180:
                        var arg = expr.argumentExpression;
                        if (ts.isIdentifier(arg)) {
                            return arg;
                        }
                }
                return undefined;
            case 1:
                return undefined;
            case 185: {
                return getDeclarationIdentifier(hostNode.expression);
            }
            case 222: {
                if (ts.isDeclaration(hostNode.statement) || ts.isExpression(hostNode.statement)) {
                    return getDeclarationIdentifier(hostNode.statement);
                }
                return undefined;
            }
            default:
                ts.Debug.assertNever(hostNode, "Found typedef tag attached to node which it should not be!");
        }
    }
    function getDeclarationIdentifier(node) {
        var name = getNameOfDeclaration(node);
        return ts.isIdentifier(name) ? name : undefined;
    }
    function getNameOfJSDocTypedef(declaration) {
        return declaration.name || nameForNamelessJSDocTypedef(declaration);
    }
    ts.getNameOfJSDocTypedef = getNameOfJSDocTypedef;
    function getNameOfDeclaration(declaration) {
        if (!declaration) {
            return undefined;
        }
        switch (declaration.kind) {
            case 284:
            case 279: {
                var name = declaration.name;
                if (name.kind === 143) {
                    return name.right;
                }
                break;
            }
            case 194: {
                var expr = declaration;
                switch (ts.getSpecialPropertyAssignmentKind(expr)) {
                    case 1:
                    case 4:
                    case 5:
                    case 3:
                        return expr.left.name;
                    default:
                        return undefined;
                }
            }
            case 283:
                return getNameOfJSDocTypedef(declaration);
            case 243: {
                var expression = declaration.expression;
                return ts.isIdentifier(expression) ? expression : undefined;
            }
        }
        return declaration.name;
    }
    ts.getNameOfDeclaration = getNameOfDeclaration;
    function getJSDocParameterTags(param) {
        if (param.name && ts.isIdentifier(param.name)) {
            var name_1 = param.name.escapedText;
            return getJSDocTags(param.parent).filter(function (tag) { return ts.isJSDocParameterTag(tag) && ts.isIdentifier(tag.name) && tag.name.escapedText === name_1; });
        }
        return undefined;
    }
    ts.getJSDocParameterTags = getJSDocParameterTags;
    function hasJSDocParameterTags(node) {
        return !!getFirstJSDocTag(node, 279);
    }
    ts.hasJSDocParameterTags = hasJSDocParameterTags;
    function getJSDocAugmentsTag(node) {
        return getFirstJSDocTag(node, 277);
    }
    ts.getJSDocAugmentsTag = getJSDocAugmentsTag;
    function getJSDocClassTag(node) {
        return getFirstJSDocTag(node, 278);
    }
    ts.getJSDocClassTag = getJSDocClassTag;
    function getJSDocReturnTag(node) {
        return getFirstJSDocTag(node, 280);
    }
    ts.getJSDocReturnTag = getJSDocReturnTag;
    function getJSDocTemplateTag(node) {
        return getFirstJSDocTag(node, 282);
    }
    ts.getJSDocTemplateTag = getJSDocTemplateTag;
    function getJSDocTypeTag(node) {
        var tag = getFirstJSDocTag(node, 281);
        if (tag && tag.typeExpression && tag.typeExpression.type) {
            return tag;
        }
        return undefined;
    }
    ts.getJSDocTypeTag = getJSDocTypeTag;
    function getJSDocType(node) {
        var tag = getFirstJSDocTag(node, 281);
        if (!tag && node.kind === 146) {
            var paramTags = getJSDocParameterTags(node);
            if (paramTags) {
                tag = ts.find(paramTags, function (tag) { return !!tag.typeExpression; });
            }
        }
        return tag && tag.typeExpression && tag.typeExpression.type;
    }
    ts.getJSDocType = getJSDocType;
    function getJSDocReturnType(node) {
        var returnTag = getJSDocReturnTag(node);
        return returnTag && returnTag.typeExpression && returnTag.typeExpression.type;
    }
    ts.getJSDocReturnType = getJSDocReturnType;
    function getJSDocTags(node) {
        var tags = node.jsDocCache;
        if (tags === undefined) {
            node.jsDocCache = tags = ts.flatMap(ts.getJSDocCommentsAndTags(node), function (j) { return ts.isJSDoc(j) ? j.tags : j; });
        }
        return tags;
    }
    ts.getJSDocTags = getJSDocTags;
    function getFirstJSDocTag(node, kind) {
        var tags = getJSDocTags(node);
        return ts.find(tags, function (doc) { return doc.kind === kind; });
    }
    function getAllJSDocTagsOfKind(node, kind) {
        var tags = getJSDocTags(node);
        return ts.filter(tags, function (doc) { return doc.kind === kind; });
    }
    ts.getAllJSDocTagsOfKind = getAllJSDocTagsOfKind;
})(ts || (ts = {}));
(function (ts) {
    function isNumericLiteral(node) {
        return node.kind === 8;
    }
    ts.isNumericLiteral = isNumericLiteral;
    function isStringLiteral(node) {
        return node.kind === 9;
    }
    ts.isStringLiteral = isStringLiteral;
    function isJsxText(node) {
        return node.kind === 10;
    }
    ts.isJsxText = isJsxText;
    function isRegularExpressionLiteral(node) {
        return node.kind === 12;
    }
    ts.isRegularExpressionLiteral = isRegularExpressionLiteral;
    function isNoSubstitutionTemplateLiteral(node) {
        return node.kind === 13;
    }
    ts.isNoSubstitutionTemplateLiteral = isNoSubstitutionTemplateLiteral;
    function isTemplateHead(node) {
        return node.kind === 14;
    }
    ts.isTemplateHead = isTemplateHead;
    function isTemplateMiddle(node) {
        return node.kind === 15;
    }
    ts.isTemplateMiddle = isTemplateMiddle;
    function isTemplateTail(node) {
        return node.kind === 16;
    }
    ts.isTemplateTail = isTemplateTail;
    function isIdentifier(node) {
        return node.kind === 71;
    }
    ts.isIdentifier = isIdentifier;
    function isQualifiedName(node) {
        return node.kind === 143;
    }
    ts.isQualifiedName = isQualifiedName;
    function isComputedPropertyName(node) {
        return node.kind === 144;
    }
    ts.isComputedPropertyName = isComputedPropertyName;
    function isTypeParameterDeclaration(node) {
        return node.kind === 145;
    }
    ts.isTypeParameterDeclaration = isTypeParameterDeclaration;
    function isParameter(node) {
        return node.kind === 146;
    }
    ts.isParameter = isParameter;
    function isDecorator(node) {
        return node.kind === 147;
    }
    ts.isDecorator = isDecorator;
    function isPropertySignature(node) {
        return node.kind === 148;
    }
    ts.isPropertySignature = isPropertySignature;
    function isPropertyDeclaration(node) {
        return node.kind === 149;
    }
    ts.isPropertyDeclaration = isPropertyDeclaration;
    function isMethodSignature(node) {
        return node.kind === 150;
    }
    ts.isMethodSignature = isMethodSignature;
    function isMethodDeclaration(node) {
        return node.kind === 151;
    }
    ts.isMethodDeclaration = isMethodDeclaration;
    function isConstructorDeclaration(node) {
        return node.kind === 152;
    }
    ts.isConstructorDeclaration = isConstructorDeclaration;
    function isGetAccessorDeclaration(node) {
        return node.kind === 153;
    }
    ts.isGetAccessorDeclaration = isGetAccessorDeclaration;
    function isSetAccessorDeclaration(node) {
        return node.kind === 154;
    }
    ts.isSetAccessorDeclaration = isSetAccessorDeclaration;
    function isCallSignatureDeclaration(node) {
        return node.kind === 155;
    }
    ts.isCallSignatureDeclaration = isCallSignatureDeclaration;
    function isConstructSignatureDeclaration(node) {
        return node.kind === 156;
    }
    ts.isConstructSignatureDeclaration = isConstructSignatureDeclaration;
    function isIndexSignatureDeclaration(node) {
        return node.kind === 157;
    }
    ts.isIndexSignatureDeclaration = isIndexSignatureDeclaration;
    function isTypePredicateNode(node) {
        return node.kind === 158;
    }
    ts.isTypePredicateNode = isTypePredicateNode;
    function isTypeReferenceNode(node) {
        return node.kind === 159;
    }
    ts.isTypeReferenceNode = isTypeReferenceNode;
    function isFunctionTypeNode(node) {
        return node.kind === 160;
    }
    ts.isFunctionTypeNode = isFunctionTypeNode;
    function isConstructorTypeNode(node) {
        return node.kind === 161;
    }
    ts.isConstructorTypeNode = isConstructorTypeNode;
    function isTypeQueryNode(node) {
        return node.kind === 162;
    }
    ts.isTypeQueryNode = isTypeQueryNode;
    function isTypeLiteralNode(node) {
        return node.kind === 163;
    }
    ts.isTypeLiteralNode = isTypeLiteralNode;
    function isArrayTypeNode(node) {
        return node.kind === 164;
    }
    ts.isArrayTypeNode = isArrayTypeNode;
    function isTupleTypeNode(node) {
        return node.kind === 165;
    }
    ts.isTupleTypeNode = isTupleTypeNode;
    function isUnionTypeNode(node) {
        return node.kind === 166;
    }
    ts.isUnionTypeNode = isUnionTypeNode;
    function isIntersectionTypeNode(node) {
        return node.kind === 167;
    }
    ts.isIntersectionTypeNode = isIntersectionTypeNode;
    function isParenthesizedTypeNode(node) {
        return node.kind === 168;
    }
    ts.isParenthesizedTypeNode = isParenthesizedTypeNode;
    function isThisTypeNode(node) {
        return node.kind === 169;
    }
    ts.isThisTypeNode = isThisTypeNode;
    function isTypeOperatorNode(node) {
        return node.kind === 170;
    }
    ts.isTypeOperatorNode = isTypeOperatorNode;
    function isIndexedAccessTypeNode(node) {
        return node.kind === 171;
    }
    ts.isIndexedAccessTypeNode = isIndexedAccessTypeNode;
    function isMappedTypeNode(node) {
        return node.kind === 172;
    }
    ts.isMappedTypeNode = isMappedTypeNode;
    function isLiteralTypeNode(node) {
        return node.kind === 173;
    }
    ts.isLiteralTypeNode = isLiteralTypeNode;
    function isObjectBindingPattern(node) {
        return node.kind === 174;
    }
    ts.isObjectBindingPattern = isObjectBindingPattern;
    function isArrayBindingPattern(node) {
        return node.kind === 175;
    }
    ts.isArrayBindingPattern = isArrayBindingPattern;
    function isBindingElement(node) {
        return node.kind === 176;
    }
    ts.isBindingElement = isBindingElement;
    function isArrayLiteralExpression(node) {
        return node.kind === 177;
    }
    ts.isArrayLiteralExpression = isArrayLiteralExpression;
    function isObjectLiteralExpression(node) {
        return node.kind === 178;
    }
    ts.isObjectLiteralExpression = isObjectLiteralExpression;
    function isPropertyAccessExpression(node) {
        return node.kind === 179;
    }
    ts.isPropertyAccessExpression = isPropertyAccessExpression;
    function isElementAccessExpression(node) {
        return node.kind === 180;
    }
    ts.isElementAccessExpression = isElementAccessExpression;
    function isCallExpression(node) {
        return node.kind === 181;
    }
    ts.isCallExpression = isCallExpression;
    function isNewExpression(node) {
        return node.kind === 182;
    }
    ts.isNewExpression = isNewExpression;
    function isTaggedTemplateExpression(node) {
        return node.kind === 183;
    }
    ts.isTaggedTemplateExpression = isTaggedTemplateExpression;
    function isTypeAssertion(node) {
        return node.kind === 184;
    }
    ts.isTypeAssertion = isTypeAssertion;
    function isParenthesizedExpression(node) {
        return node.kind === 185;
    }
    ts.isParenthesizedExpression = isParenthesizedExpression;
    function skipPartiallyEmittedExpressions(node) {
        while (node.kind === 288) {
            node = node.expression;
        }
        return node;
    }
    ts.skipPartiallyEmittedExpressions = skipPartiallyEmittedExpressions;
    function isFunctionExpression(node) {
        return node.kind === 186;
    }
    ts.isFunctionExpression = isFunctionExpression;
    function isArrowFunction(node) {
        return node.kind === 187;
    }
    ts.isArrowFunction = isArrowFunction;
    function isDeleteExpression(node) {
        return node.kind === 188;
    }
    ts.isDeleteExpression = isDeleteExpression;
    function isTypeOfExpression(node) {
        return node.kind === 191;
    }
    ts.isTypeOfExpression = isTypeOfExpression;
    function isVoidExpression(node) {
        return node.kind === 190;
    }
    ts.isVoidExpression = isVoidExpression;
    function isAwaitExpression(node) {
        return node.kind === 191;
    }
    ts.isAwaitExpression = isAwaitExpression;
    function isPrefixUnaryExpression(node) {
        return node.kind === 192;
    }
    ts.isPrefixUnaryExpression = isPrefixUnaryExpression;
    function isPostfixUnaryExpression(node) {
        return node.kind === 193;
    }
    ts.isPostfixUnaryExpression = isPostfixUnaryExpression;
    function isBinaryExpression(node) {
        return node.kind === 194;
    }
    ts.isBinaryExpression = isBinaryExpression;
    function isConditionalExpression(node) {
        return node.kind === 195;
    }
    ts.isConditionalExpression = isConditionalExpression;
    function isTemplateExpression(node) {
        return node.kind === 196;
    }
    ts.isTemplateExpression = isTemplateExpression;
    function isYieldExpression(node) {
        return node.kind === 197;
    }
    ts.isYieldExpression = isYieldExpression;
    function isSpreadElement(node) {
        return node.kind === 198;
    }
    ts.isSpreadElement = isSpreadElement;
    function isClassExpression(node) {
        return node.kind === 199;
    }
    ts.isClassExpression = isClassExpression;
    function isOmittedExpression(node) {
        return node.kind === 200;
    }
    ts.isOmittedExpression = isOmittedExpression;
    function isExpressionWithTypeArguments(node) {
        return node.kind === 201;
    }
    ts.isExpressionWithTypeArguments = isExpressionWithTypeArguments;
    function isAsExpression(node) {
        return node.kind === 202;
    }
    ts.isAsExpression = isAsExpression;
    function isNonNullExpression(node) {
        return node.kind === 203;
    }
    ts.isNonNullExpression = isNonNullExpression;
    function isMetaProperty(node) {
        return node.kind === 204;
    }
    ts.isMetaProperty = isMetaProperty;
    function isTemplateSpan(node) {
        return node.kind === 205;
    }
    ts.isTemplateSpan = isTemplateSpan;
    function isSemicolonClassElement(node) {
        return node.kind === 206;
    }
    ts.isSemicolonClassElement = isSemicolonClassElement;
    function isBlock(node) {
        return node.kind === 207;
    }
    ts.isBlock = isBlock;
    function isVariableStatement(node) {
        return node.kind === 208;
    }
    ts.isVariableStatement = isVariableStatement;
    function isEmptyStatement(node) {
        return node.kind === 209;
    }
    ts.isEmptyStatement = isEmptyStatement;
    function isExpressionStatement(node) {
        return node.kind === 210;
    }
    ts.isExpressionStatement = isExpressionStatement;
    function isIfStatement(node) {
        return node.kind === 211;
    }
    ts.isIfStatement = isIfStatement;
    function isDoStatement(node) {
        return node.kind === 212;
    }
    ts.isDoStatement = isDoStatement;
    function isWhileStatement(node) {
        return node.kind === 213;
    }
    ts.isWhileStatement = isWhileStatement;
    function isForStatement(node) {
        return node.kind === 214;
    }
    ts.isForStatement = isForStatement;
    function isForInStatement(node) {
        return node.kind === 215;
    }
    ts.isForInStatement = isForInStatement;
    function isForOfStatement(node) {
        return node.kind === 216;
    }
    ts.isForOfStatement = isForOfStatement;
    function isContinueStatement(node) {
        return node.kind === 217;
    }
    ts.isContinueStatement = isContinueStatement;
    function isBreakStatement(node) {
        return node.kind === 218;
    }
    ts.isBreakStatement = isBreakStatement;
    function isReturnStatement(node) {
        return node.kind === 219;
    }
    ts.isReturnStatement = isReturnStatement;
    function isWithStatement(node) {
        return node.kind === 220;
    }
    ts.isWithStatement = isWithStatement;
    function isSwitchStatement(node) {
        return node.kind === 221;
    }
    ts.isSwitchStatement = isSwitchStatement;
    function isLabeledStatement(node) {
        return node.kind === 222;
    }
    ts.isLabeledStatement = isLabeledStatement;
    function isThrowStatement(node) {
        return node.kind === 223;
    }
    ts.isThrowStatement = isThrowStatement;
    function isTryStatement(node) {
        return node.kind === 224;
    }
    ts.isTryStatement = isTryStatement;
    function isDebuggerStatement(node) {
        return node.kind === 225;
    }
    ts.isDebuggerStatement = isDebuggerStatement;
    function isVariableDeclaration(node) {
        return node.kind === 226;
    }
    ts.isVariableDeclaration = isVariableDeclaration;
    function isVariableDeclarationList(node) {
        return node.kind === 227;
    }
    ts.isVariableDeclarationList = isVariableDeclarationList;
    function isFunctionDeclaration(node) {
        return node.kind === 228;
    }
    ts.isFunctionDeclaration = isFunctionDeclaration;
    function isClassDeclaration(node) {
        return node.kind === 229;
    }
    ts.isClassDeclaration = isClassDeclaration;
    function isInterfaceDeclaration(node) {
        return node.kind === 230;
    }
    ts.isInterfaceDeclaration = isInterfaceDeclaration;
    function isTypeAliasDeclaration(node) {
        return node.kind === 231;
    }
    ts.isTypeAliasDeclaration = isTypeAliasDeclaration;
    function isEnumDeclaration(node) {
        return node.kind === 232;
    }
    ts.isEnumDeclaration = isEnumDeclaration;
    function isModuleDeclaration(node) {
        return node.kind === 233;
    }
    ts.isModuleDeclaration = isModuleDeclaration;
    function isModuleBlock(node) {
        return node.kind === 234;
    }
    ts.isModuleBlock = isModuleBlock;
    function isCaseBlock(node) {
        return node.kind === 235;
    }
    ts.isCaseBlock = isCaseBlock;
    function isNamespaceExportDeclaration(node) {
        return node.kind === 236;
    }
    ts.isNamespaceExportDeclaration = isNamespaceExportDeclaration;
    function isImportEqualsDeclaration(node) {
        return node.kind === 237;
    }
    ts.isImportEqualsDeclaration = isImportEqualsDeclaration;
    function isImportDeclaration(node) {
        return node.kind === 238;
    }
    ts.isImportDeclaration = isImportDeclaration;
    function isImportClause(node) {
        return node.kind === 239;
    }
    ts.isImportClause = isImportClause;
    function isNamespaceImport(node) {
        return node.kind === 240;
    }
    ts.isNamespaceImport = isNamespaceImport;
    function isNamedImports(node) {
        return node.kind === 241;
    }
    ts.isNamedImports = isNamedImports;
    function isImportSpecifier(node) {
        return node.kind === 242;
    }
    ts.isImportSpecifier = isImportSpecifier;
    function isExportAssignment(node) {
        return node.kind === 243;
    }
    ts.isExportAssignment = isExportAssignment;
    function isExportDeclaration(node) {
        return node.kind === 244;
    }
    ts.isExportDeclaration = isExportDeclaration;
    function isNamedExports(node) {
        return node.kind === 245;
    }
    ts.isNamedExports = isNamedExports;
    function isExportSpecifier(node) {
        return node.kind === 246;
    }
    ts.isExportSpecifier = isExportSpecifier;
    function isMissingDeclaration(node) {
        return node.kind === 247;
    }
    ts.isMissingDeclaration = isMissingDeclaration;
    function isExternalModuleReference(node) {
        return node.kind === 248;
    }
    ts.isExternalModuleReference = isExternalModuleReference;
    function isJsxElement(node) {
        return node.kind === 249;
    }
    ts.isJsxElement = isJsxElement;
    function isJsxSelfClosingElement(node) {
        return node.kind === 250;
    }
    ts.isJsxSelfClosingElement = isJsxSelfClosingElement;
    function isJsxOpeningElement(node) {
        return node.kind === 251;
    }
    ts.isJsxOpeningElement = isJsxOpeningElement;
    function isJsxClosingElement(node) {
        return node.kind === 252;
    }
    ts.isJsxClosingElement = isJsxClosingElement;
    function isJsxAttribute(node) {
        return node.kind === 253;
    }
    ts.isJsxAttribute = isJsxAttribute;
    function isJsxAttributes(node) {
        return node.kind === 254;
    }
    ts.isJsxAttributes = isJsxAttributes;
    function isJsxSpreadAttribute(node) {
        return node.kind === 255;
    }
    ts.isJsxSpreadAttribute = isJsxSpreadAttribute;
    function isJsxExpression(node) {
        return node.kind === 256;
    }
    ts.isJsxExpression = isJsxExpression;
    function isCaseClause(node) {
        return node.kind === 257;
    }
    ts.isCaseClause = isCaseClause;
    function isDefaultClause(node) {
        return node.kind === 258;
    }
    ts.isDefaultClause = isDefaultClause;
    function isHeritageClause(node) {
        return node.kind === 259;
    }
    ts.isHeritageClause = isHeritageClause;
    function isCatchClause(node) {
        return node.kind === 260;
    }
    ts.isCatchClause = isCatchClause;
    function isPropertyAssignment(node) {
        return node.kind === 261;
    }
    ts.isPropertyAssignment = isPropertyAssignment;
    function isShorthandPropertyAssignment(node) {
        return node.kind === 262;
    }
    ts.isShorthandPropertyAssignment = isShorthandPropertyAssignment;
    function isSpreadAssignment(node) {
        return node.kind === 263;
    }
    ts.isSpreadAssignment = isSpreadAssignment;
    function isEnumMember(node) {
        return node.kind === 264;
    }
    ts.isEnumMember = isEnumMember;
    function isSourceFile(node) {
        return node.kind === 265;
    }
    ts.isSourceFile = isSourceFile;
    function isBundle(node) {
        return node.kind === 266;
    }
    ts.isBundle = isBundle;
    function isJSDocTypeExpression(node) {
        return node.kind === 267;
    }
    ts.isJSDocTypeExpression = isJSDocTypeExpression;
    function isJSDocAllType(node) {
        return node.kind === 268;
    }
    ts.isJSDocAllType = isJSDocAllType;
    function isJSDocUnknownType(node) {
        return node.kind === 269;
    }
    ts.isJSDocUnknownType = isJSDocUnknownType;
    function isJSDocNullableType(node) {
        return node.kind === 270;
    }
    ts.isJSDocNullableType = isJSDocNullableType;
    function isJSDocNonNullableType(node) {
        return node.kind === 271;
    }
    ts.isJSDocNonNullableType = isJSDocNonNullableType;
    function isJSDocOptionalType(node) {
        return node.kind === 272;
    }
    ts.isJSDocOptionalType = isJSDocOptionalType;
    function isJSDocFunctionType(node) {
        return node.kind === 273;
    }
    ts.isJSDocFunctionType = isJSDocFunctionType;
    function isJSDocVariadicType(node) {
        return node.kind === 274;
    }
    ts.isJSDocVariadicType = isJSDocVariadicType;
    function isJSDoc(node) {
        return node.kind === 275;
    }
    ts.isJSDoc = isJSDoc;
    function isJSDocAugmentsTag(node) {
        return node.kind === 277;
    }
    ts.isJSDocAugmentsTag = isJSDocAugmentsTag;
    function isJSDocParameterTag(node) {
        return node.kind === 279;
    }
    ts.isJSDocParameterTag = isJSDocParameterTag;
    function isJSDocReturnTag(node) {
        return node.kind === 280;
    }
    ts.isJSDocReturnTag = isJSDocReturnTag;
    function isJSDocTypeTag(node) {
        return node.kind === 281;
    }
    ts.isJSDocTypeTag = isJSDocTypeTag;
    function isJSDocTemplateTag(node) {
        return node.kind === 282;
    }
    ts.isJSDocTemplateTag = isJSDocTemplateTag;
    function isJSDocTypedefTag(node) {
        return node.kind === 283;
    }
    ts.isJSDocTypedefTag = isJSDocTypedefTag;
    function isJSDocPropertyTag(node) {
        return node.kind === 284;
    }
    ts.isJSDocPropertyTag = isJSDocPropertyTag;
    function isJSDocPropertyLikeTag(node) {
        return node.kind === 284 || node.kind === 279;
    }
    ts.isJSDocPropertyLikeTag = isJSDocPropertyLikeTag;
    function isJSDocTypeLiteral(node) {
        return node.kind === 285;
    }
    ts.isJSDocTypeLiteral = isJSDocTypeLiteral;
})(ts || (ts = {}));
(function (ts) {
    function isSyntaxList(n) {
        return n.kind === 286;
    }
    ts.isSyntaxList = isSyntaxList;
    function isNode(node) {
        return isNodeKind(node.kind);
    }
    ts.isNode = isNode;
    function isNodeKind(kind) {
        return kind >= 143;
    }
    ts.isNodeKind = isNodeKind;
    function isToken(n) {
        return n.kind >= 0 && n.kind <= 142;
    }
    ts.isToken = isToken;
    function isNodeArray(array) {
        return array.hasOwnProperty("pos") && array.hasOwnProperty("end");
    }
    ts.isNodeArray = isNodeArray;
    function isLiteralKind(kind) {
        return 8 <= kind && kind <= 13;
    }
    ts.isLiteralKind = isLiteralKind;
    function isLiteralExpression(node) {
        return isLiteralKind(node.kind);
    }
    ts.isLiteralExpression = isLiteralExpression;
    function isTemplateLiteralKind(kind) {
        return 13 <= kind && kind <= 16;
    }
    ts.isTemplateLiteralKind = isTemplateLiteralKind;
    function isTemplateMiddleOrTemplateTail(node) {
        var kind = node.kind;
        return kind === 15
            || kind === 16;
    }
    ts.isTemplateMiddleOrTemplateTail = isTemplateMiddleOrTemplateTail;
    function isStringTextContainingNode(node) {
        switch (node.kind) {
            case 9:
            case 14:
            case 15:
            case 16:
            case 13:
                return true;
            default:
                return false;
        }
    }
    ts.isStringTextContainingNode = isStringTextContainingNode;
    function isGeneratedIdentifier(node) {
        return ts.isIdentifier(node) && node.autoGenerateKind > 0;
    }
    ts.isGeneratedIdentifier = isGeneratedIdentifier;
    function isModifierKind(token) {
        switch (token) {
            case 117:
            case 120:
            case 76:
            case 124:
            case 79:
            case 84:
            case 114:
            case 112:
            case 113:
            case 131:
            case 115:
                return true;
        }
        return false;
    }
    ts.isModifierKind = isModifierKind;
    function isModifier(node) {
        return isModifierKind(node.kind);
    }
    ts.isModifier = isModifier;
    function isEntityName(node) {
        var kind = node.kind;
        return kind === 143
            || kind === 71;
    }
    ts.isEntityName = isEntityName;
    function isPropertyName(node) {
        var kind = node.kind;
        return kind === 71
            || kind === 9
            || kind === 8
            || kind === 144;
    }
    ts.isPropertyName = isPropertyName;
    function isBindingName(node) {
        var kind = node.kind;
        return kind === 71
            || kind === 174
            || kind === 175;
    }
    ts.isBindingName = isBindingName;
    function isFunctionLike(node) {
        return node && isFunctionLikeKind(node.kind);
    }
    ts.isFunctionLike = isFunctionLike;
    function isFunctionLikeDeclaration(node) {
        return node && isFunctionLikeDeclarationKind(node.kind);
    }
    ts.isFunctionLikeDeclaration = isFunctionLikeDeclaration;
    function isFunctionLikeDeclarationKind(kind) {
        switch (kind) {
            case 228:
            case 151:
            case 152:
            case 153:
            case 154:
            case 186:
            case 187:
                return true;
            default:
                return false;
        }
    }
    function isFunctionLikeKind(kind) {
        switch (kind) {
            case 150:
            case 155:
            case 156:
            case 157:
            case 160:
            case 273:
            case 161:
                return true;
            default:
                return isFunctionLikeDeclarationKind(kind);
        }
    }
    ts.isFunctionLikeKind = isFunctionLikeKind;
    function isFunctionOrModuleBlock(node) {
        return ts.isSourceFile(node) || ts.isModuleBlock(node) || ts.isBlock(node) && isFunctionLike(node.parent);
    }
    ts.isFunctionOrModuleBlock = isFunctionOrModuleBlock;
    function isClassElement(node) {
        var kind = node.kind;
        return kind === 152
            || kind === 149
            || kind === 151
            || kind === 153
            || kind === 154
            || kind === 157
            || kind === 206
            || kind === 247;
    }
    ts.isClassElement = isClassElement;
    function isClassLike(node) {
        return node && (node.kind === 229 || node.kind === 199);
    }
    ts.isClassLike = isClassLike;
    function isAccessor(node) {
        return node && (node.kind === 153 || node.kind === 154);
    }
    ts.isAccessor = isAccessor;
    function isTypeElement(node) {
        var kind = node.kind;
        return kind === 156
            || kind === 155
            || kind === 148
            || kind === 150
            || kind === 157
            || kind === 247;
    }
    ts.isTypeElement = isTypeElement;
    function isObjectLiteralElementLike(node) {
        var kind = node.kind;
        return kind === 261
            || kind === 262
            || kind === 263
            || kind === 151
            || kind === 153
            || kind === 154
            || kind === 247;
    }
    ts.isObjectLiteralElementLike = isObjectLiteralElementLike;
    function isTypeNodeKind(kind) {
        return (kind >= 158 && kind <= 173)
            || kind === 119
            || kind === 133
            || kind === 134
            || kind === 122
            || kind === 136
            || kind === 137
            || kind === 99
            || kind === 105
            || kind === 139
            || kind === 95
            || kind === 130
            || kind === 201
            || kind === 268
            || kind === 269
            || kind === 270
            || kind === 271
            || kind === 272
            || kind === 273
            || kind === 274;
    }
    function isTypeNode(node) {
        return isTypeNodeKind(node.kind);
    }
    ts.isTypeNode = isTypeNode;
    function isFunctionOrConstructorTypeNode(node) {
        switch (node.kind) {
            case 160:
            case 161:
                return true;
        }
        return false;
    }
    ts.isFunctionOrConstructorTypeNode = isFunctionOrConstructorTypeNode;
    function isBindingPattern(node) {
        if (node) {
            var kind = node.kind;
            return kind === 175
                || kind === 174;
        }
        return false;
    }
    ts.isBindingPattern = isBindingPattern;
    function isAssignmentPattern(node) {
        var kind = node.kind;
        return kind === 177
            || kind === 178;
    }
    ts.isAssignmentPattern = isAssignmentPattern;
    function isArrayBindingElement(node) {
        var kind = node.kind;
        return kind === 176
            || kind === 200;
    }
    ts.isArrayBindingElement = isArrayBindingElement;
    function isDeclarationBindingElement(bindingElement) {
        switch (bindingElement.kind) {
            case 226:
            case 146:
            case 176:
                return true;
        }
        return false;
    }
    ts.isDeclarationBindingElement = isDeclarationBindingElement;
    function isBindingOrAssignmentPattern(node) {
        return isObjectBindingOrAssignmentPattern(node)
            || isArrayBindingOrAssignmentPattern(node);
    }
    ts.isBindingOrAssignmentPattern = isBindingOrAssignmentPattern;
    function isObjectBindingOrAssignmentPattern(node) {
        switch (node.kind) {
            case 174:
            case 178:
                return true;
        }
        return false;
    }
    ts.isObjectBindingOrAssignmentPattern = isObjectBindingOrAssignmentPattern;
    function isArrayBindingOrAssignmentPattern(node) {
        switch (node.kind) {
            case 175:
            case 177:
                return true;
        }
        return false;
    }
    ts.isArrayBindingOrAssignmentPattern = isArrayBindingOrAssignmentPattern;
    function isPropertyAccessOrQualifiedName(node) {
        var kind = node.kind;
        return kind === 179
            || kind === 143;
    }
    ts.isPropertyAccessOrQualifiedName = isPropertyAccessOrQualifiedName;
    function isCallLikeExpression(node) {
        switch (node.kind) {
            case 251:
            case 250:
            case 181:
            case 182:
            case 183:
            case 147:
                return true;
            default:
                return false;
        }
    }
    ts.isCallLikeExpression = isCallLikeExpression;
    function isCallOrNewExpression(node) {
        return node.kind === 181 || node.kind === 182;
    }
    ts.isCallOrNewExpression = isCallOrNewExpression;
    function isTemplateLiteral(node) {
        var kind = node.kind;
        return kind === 196
            || kind === 13;
    }
    ts.isTemplateLiteral = isTemplateLiteral;
    function isLeftHandSideExpression(node) {
        return isLeftHandSideExpressionKind(ts.skipPartiallyEmittedExpressions(node).kind);
    }
    ts.isLeftHandSideExpression = isLeftHandSideExpression;
    function isLeftHandSideExpressionKind(kind) {
        switch (kind) {
            case 179:
            case 180:
            case 182:
            case 181:
            case 249:
            case 250:
            case 183:
            case 177:
            case 185:
            case 178:
            case 199:
            case 186:
            case 71:
            case 12:
            case 8:
            case 9:
            case 13:
            case 196:
            case 86:
            case 95:
            case 99:
            case 101:
            case 97:
            case 203:
            case 204:
            case 91:
                return true;
            default:
                return false;
        }
    }
    function isUnaryExpression(node) {
        return isUnaryExpressionKind(ts.skipPartiallyEmittedExpressions(node).kind);
    }
    ts.isUnaryExpression = isUnaryExpression;
    function isUnaryExpressionKind(kind) {
        switch (kind) {
            case 192:
            case 193:
            case 188:
            case 189:
            case 190:
            case 191:
            case 184:
                return true;
            default:
                return isLeftHandSideExpressionKind(kind);
        }
    }
    function isUnaryExpressionWithWrite(expr) {
        switch (expr.kind) {
            case 193:
                return true;
            case 192:
                return expr.operator === 43 ||
                    expr.operator === 44;
            default:
                return false;
        }
    }
    ts.isUnaryExpressionWithWrite = isUnaryExpressionWithWrite;
    function isExpression(node) {
        return isExpressionKind(ts.skipPartiallyEmittedExpressions(node).kind);
    }
    ts.isExpression = isExpression;
    function isExpressionKind(kind) {
        switch (kind) {
            case 195:
            case 197:
            case 187:
            case 194:
            case 198:
            case 202:
            case 200:
            case 289:
            case 288:
                return true;
            default:
                return isUnaryExpressionKind(kind);
        }
    }
    function isAssertionExpression(node) {
        var kind = node.kind;
        return kind === 184
            || kind === 202;
    }
    ts.isAssertionExpression = isAssertionExpression;
    function isPartiallyEmittedExpression(node) {
        return node.kind === 288;
    }
    ts.isPartiallyEmittedExpression = isPartiallyEmittedExpression;
    function isNotEmittedStatement(node) {
        return node.kind === 287;
    }
    ts.isNotEmittedStatement = isNotEmittedStatement;
    function isNotEmittedOrPartiallyEmittedNode(node) {
        return isNotEmittedStatement(node)
            || isPartiallyEmittedExpression(node);
    }
    ts.isNotEmittedOrPartiallyEmittedNode = isNotEmittedOrPartiallyEmittedNode;
    function isIterationStatement(node, lookInLabeledStatements) {
        switch (node.kind) {
            case 214:
            case 215:
            case 216:
            case 212:
            case 213:
                return true;
            case 222:
                return lookInLabeledStatements && isIterationStatement(node.statement, lookInLabeledStatements);
        }
        return false;
    }
    ts.isIterationStatement = isIterationStatement;
    function isForInOrOfStatement(node) {
        return node.kind === 215 || node.kind === 216;
    }
    ts.isForInOrOfStatement = isForInOrOfStatement;
    function isConciseBody(node) {
        return ts.isBlock(node)
            || isExpression(node);
    }
    ts.isConciseBody = isConciseBody;
    function isFunctionBody(node) {
        return ts.isBlock(node);
    }
    ts.isFunctionBody = isFunctionBody;
    function isForInitializer(node) {
        return ts.isVariableDeclarationList(node)
            || isExpression(node);
    }
    ts.isForInitializer = isForInitializer;
    function isModuleBody(node) {
        var kind = node.kind;
        return kind === 234
            || kind === 233
            || kind === 71;
    }
    ts.isModuleBody = isModuleBody;
    function isNamespaceBody(node) {
        var kind = node.kind;
        return kind === 234
            || kind === 233;
    }
    ts.isNamespaceBody = isNamespaceBody;
    function isJSDocNamespaceBody(node) {
        var kind = node.kind;
        return kind === 71
            || kind === 233;
    }
    ts.isJSDocNamespaceBody = isJSDocNamespaceBody;
    function isNamedImportBindings(node) {
        var kind = node.kind;
        return kind === 241
            || kind === 240;
    }
    ts.isNamedImportBindings = isNamedImportBindings;
    function isModuleOrEnumDeclaration(node) {
        return node.kind === 233 || node.kind === 232;
    }
    ts.isModuleOrEnumDeclaration = isModuleOrEnumDeclaration;
    function isDeclarationKind(kind) {
        return kind === 187
            || kind === 176
            || kind === 229
            || kind === 199
            || kind === 152
            || kind === 232
            || kind === 264
            || kind === 246
            || kind === 228
            || kind === 186
            || kind === 153
            || kind === 239
            || kind === 237
            || kind === 242
            || kind === 230
            || kind === 253
            || kind === 151
            || kind === 150
            || kind === 233
            || kind === 236
            || kind === 240
            || kind === 146
            || kind === 261
            || kind === 149
            || kind === 148
            || kind === 154
            || kind === 262
            || kind === 231
            || kind === 145
            || kind === 226
            || kind === 283;
    }
    function isDeclarationStatementKind(kind) {
        return kind === 228
            || kind === 247
            || kind === 229
            || kind === 230
            || kind === 231
            || kind === 232
            || kind === 233
            || kind === 238
            || kind === 237
            || kind === 244
            || kind === 243
            || kind === 236;
    }
    function isStatementKindButNotDeclarationKind(kind) {
        return kind === 218
            || kind === 217
            || kind === 225
            || kind === 212
            || kind === 210
            || kind === 209
            || kind === 215
            || kind === 216
            || kind === 214
            || kind === 211
            || kind === 222
            || kind === 219
            || kind === 221
            || kind === 223
            || kind === 224
            || kind === 208
            || kind === 213
            || kind === 220
            || kind === 287
            || kind === 291
            || kind === 290;
    }
    function isDeclaration(node) {
        if (node.kind === 145) {
            return node.parent.kind !== 282 || ts.isInJavaScriptFile(node);
        }
        return isDeclarationKind(node.kind);
    }
    ts.isDeclaration = isDeclaration;
    function isDeclarationStatement(node) {
        return isDeclarationStatementKind(node.kind);
    }
    ts.isDeclarationStatement = isDeclarationStatement;
    function isStatementButNotDeclaration(node) {
        return isStatementKindButNotDeclarationKind(node.kind);
    }
    ts.isStatementButNotDeclaration = isStatementButNotDeclaration;
    function isStatement(node) {
        var kind = node.kind;
        return isStatementKindButNotDeclarationKind(kind)
            || isDeclarationStatementKind(kind)
            || isBlockStatement(node);
    }
    ts.isStatement = isStatement;
    function isBlockStatement(node) {
        if (node.kind !== 207)
            return false;
        if (node.parent !== undefined) {
            if (node.parent.kind === 224 || node.parent.kind === 260) {
                return false;
            }
        }
        return !ts.isFunctionBlock(node);
    }
    function isModuleReference(node) {
        var kind = node.kind;
        return kind === 248
            || kind === 143
            || kind === 71;
    }
    ts.isModuleReference = isModuleReference;
    function isJsxTagNameExpression(node) {
        var kind = node.kind;
        return kind === 99
            || kind === 71
            || kind === 179;
    }
    ts.isJsxTagNameExpression = isJsxTagNameExpression;
    function isJsxChild(node) {
        var kind = node.kind;
        return kind === 249
            || kind === 256
            || kind === 250
            || kind === 10;
    }
    ts.isJsxChild = isJsxChild;
    function isJsxAttributeLike(node) {
        var kind = node.kind;
        return kind === 253
            || kind === 255;
    }
    ts.isJsxAttributeLike = isJsxAttributeLike;
    function isStringLiteralOrJsxExpression(node) {
        var kind = node.kind;
        return kind === 9
            || kind === 256;
    }
    ts.isStringLiteralOrJsxExpression = isStringLiteralOrJsxExpression;
    function isJsxOpeningLikeElement(node) {
        var kind = node.kind;
        return kind === 251
            || kind === 250;
    }
    ts.isJsxOpeningLikeElement = isJsxOpeningLikeElement;
    function isCaseOrDefaultClause(node) {
        var kind = node.kind;
        return kind === 257
            || kind === 258;
    }
    ts.isCaseOrDefaultClause = isCaseOrDefaultClause;
    function isJSDocNode(node) {
        return node.kind >= 267 && node.kind <= 285;
    }
    ts.isJSDocNode = isJSDocNode;
    function isJSDocCommentContainingNode(node) {
        return node.kind === 275 || isJSDocTag(node);
    }
    ts.isJSDocCommentContainingNode = isJSDocCommentContainingNode;
    function isJSDocTag(node) {
        return node.kind >= 276 && node.kind <= 285;
    }
    ts.isJSDocTag = isJSDocTag;
    function isSetAccessor(node) {
        return node.kind === 154;
    }
    ts.isSetAccessor = isSetAccessor;
    function isGetAccessor(node) {
        return node.kind === 153;
    }
    ts.isGetAccessor = isGetAccessor;
    function hasJSDocNodes(node) {
        return !!node.jsDoc && node.jsDoc.length > 0;
    }
    ts.hasJSDocNodes = hasJSDocNodes;
})(ts || (ts = {}));
var ts;
(function (ts) {
    function tokenIsIdentifierOrKeyword(token) {
        return token >= 71;
    }
    ts.tokenIsIdentifierOrKeyword = tokenIsIdentifierOrKeyword;
    var textToToken = ts.createMapFromTemplate({
        "abstract": 117,
        "any": 119,
        "as": 118,
        "boolean": 122,
        "break": 72,
        "case": 73,
        "catch": 74,
        "class": 75,
        "continue": 77,
        "const": 76,
        "constructor": 123,
        "debugger": 78,
        "declare": 124,
        "default": 79,
        "delete": 80,
        "do": 81,
        "else": 82,
        "enum": 83,
        "export": 84,
        "extends": 85,
        "false": 86,
        "finally": 87,
        "for": 88,
        "from": 140,
        "function": 89,
        "get": 125,
        "if": 90,
        "implements": 108,
        "import": 91,
        "in": 92,
        "instanceof": 93,
        "interface": 109,
        "is": 126,
        "keyof": 127,
        "let": 110,
        "module": 128,
        "namespace": 129,
        "never": 130,
        "new": 94,
        "null": 95,
        "number": 133,
        "object": 134,
        "package": 111,
        "private": 112,
        "protected": 113,
        "public": 114,
        "readonly": 131,
        "require": 132,
        "global": 141,
        "return": 96,
        "set": 135,
        "static": 115,
        "string": 136,
        "super": 97,
        "switch": 98,
        "symbol": 137,
        "this": 99,
        "throw": 100,
        "true": 101,
        "try": 102,
        "type": 138,
        "typeof": 103,
        "undefined": 139,
        "var": 104,
        "void": 105,
        "while": 106,
        "with": 107,
        "yield": 116,
        "async": 120,
        "await": 121,
        "of": 142,
        "{": 17,
        "}": 18,
        "(": 19,
        ")": 20,
        "[": 21,
        "]": 22,
        ".": 23,
        "...": 24,
        ";": 25,
        ",": 26,
        "<": 27,
        ">": 29,
        "<=": 30,
        ">=": 31,
        "==": 32,
        "!=": 33,
        "===": 34,
        "!==": 35,
        "=>": 36,
        "+": 37,
        "-": 38,
        "**": 40,
        "*": 39,
        "/": 41,
        "%": 42,
        "++": 43,
        "--": 44,
        "<<": 45,
        "</": 28,
        ">>": 46,
        ">>>": 47,
        "&": 48,
        "|": 49,
        "^": 50,
        "!": 51,
        "~": 52,
        "&&": 53,
        "||": 54,
        "?": 55,
        ":": 56,
        "=": 58,
        "+=": 59,
        "-=": 60,
        "*=": 61,
        "**=": 62,
        "/=": 63,
        "%=": 64,
        "<<=": 65,
        ">>=": 66,
        ">>>=": 67,
        "&=": 68,
        "|=": 69,
        "^=": 70,
        "@": 57,
    });
    var unicodeES3IdentifierStart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 543, 546, 563, 592, 685, 688, 696, 699, 705, 720, 721, 736, 740, 750, 750, 890, 890, 902, 902, 904, 906, 908, 908, 910, 929, 931, 974, 976, 983, 986, 1011, 1024, 1153, 1164, 1220, 1223, 1224, 1227, 1228, 1232, 1269, 1272, 1273, 1329, 1366, 1369, 1369, 1377, 1415, 1488, 1514, 1520, 1522, 1569, 1594, 1600, 1610, 1649, 1747, 1749, 1749, 1765, 1766, 1786, 1788, 1808, 1808, 1810, 1836, 1920, 1957, 2309, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2524, 2525, 2527, 2529, 2544, 2545, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2699, 2701, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2784, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2870, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 2997, 2999, 3001, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3168, 3169, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3294, 3294, 3296, 3297, 3333, 3340, 3342, 3344, 3346, 3368, 3370, 3385, 3424, 3425, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3805, 3840, 3840, 3904, 3911, 3913, 3946, 3976, 3979, 4096, 4129, 4131, 4135, 4137, 4138, 4176, 4181, 4256, 4293, 4304, 4342, 4352, 4441, 4447, 4514, 4520, 4601, 4608, 4614, 4616, 4678, 4680, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4742, 4744, 4744, 4746, 4749, 4752, 4782, 4784, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4814, 4816, 4822, 4824, 4846, 4848, 4878, 4880, 4880, 4882, 4885, 4888, 4894, 4896, 4934, 4936, 4954, 5024, 5108, 5121, 5740, 5743, 5750, 5761, 5786, 5792, 5866, 6016, 6067, 6176, 6263, 6272, 6312, 7680, 7835, 7840, 7929, 7936, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8319, 8319, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8497, 8499, 8505, 8544, 8579, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12346, 12353, 12436, 12445, 12446, 12449, 12538, 12540, 12542, 12549, 12588, 12593, 12686, 12704, 12727, 13312, 19893, 19968, 40869, 40960, 42124, 44032, 55203, 63744, 64045, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65138, 65140, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    var unicodeES3IdentifierPart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 543, 546, 563, 592, 685, 688, 696, 699, 705, 720, 721, 736, 740, 750, 750, 768, 846, 864, 866, 890, 890, 902, 902, 904, 906, 908, 908, 910, 929, 931, 974, 976, 983, 986, 1011, 1024, 1153, 1155, 1158, 1164, 1220, 1223, 1224, 1227, 1228, 1232, 1269, 1272, 1273, 1329, 1366, 1369, 1369, 1377, 1415, 1425, 1441, 1443, 1465, 1467, 1469, 1471, 1471, 1473, 1474, 1476, 1476, 1488, 1514, 1520, 1522, 1569, 1594, 1600, 1621, 1632, 1641, 1648, 1747, 1749, 1756, 1759, 1768, 1770, 1773, 1776, 1788, 1808, 1836, 1840, 1866, 1920, 1968, 2305, 2307, 2309, 2361, 2364, 2381, 2384, 2388, 2392, 2403, 2406, 2415, 2433, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2492, 2494, 2500, 2503, 2504, 2507, 2509, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2562, 2562, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2649, 2652, 2654, 2654, 2662, 2676, 2689, 2691, 2693, 2699, 2701, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2784, 2790, 2799, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2870, 2873, 2876, 2883, 2887, 2888, 2891, 2893, 2902, 2903, 2908, 2909, 2911, 2913, 2918, 2927, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 2997, 2999, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3031, 3031, 3047, 3055, 3073, 3075, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3134, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3168, 3169, 3174, 3183, 3202, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3262, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3294, 3294, 3296, 3297, 3302, 3311, 3330, 3331, 3333, 3340, 3342, 3344, 3346, 3368, 3370, 3385, 3390, 3395, 3398, 3400, 3402, 3405, 3415, 3415, 3424, 3425, 3430, 3439, 3458, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3769, 3771, 3773, 3776, 3780, 3782, 3782, 3784, 3789, 3792, 3801, 3804, 3805, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3946, 3953, 3972, 3974, 3979, 3984, 3991, 3993, 4028, 4038, 4038, 4096, 4129, 4131, 4135, 4137, 4138, 4140, 4146, 4150, 4153, 4160, 4169, 4176, 4185, 4256, 4293, 4304, 4342, 4352, 4441, 4447, 4514, 4520, 4601, 4608, 4614, 4616, 4678, 4680, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4742, 4744, 4744, 4746, 4749, 4752, 4782, 4784, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4814, 4816, 4822, 4824, 4846, 4848, 4878, 4880, 4880, 4882, 4885, 4888, 4894, 4896, 4934, 4936, 4954, 4969, 4977, 5024, 5108, 5121, 5740, 5743, 5750, 5761, 5786, 5792, 5866, 6016, 6099, 6112, 6121, 6160, 6169, 6176, 6263, 6272, 6313, 7680, 7835, 7840, 7929, 7936, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8255, 8256, 8319, 8319, 8400, 8412, 8417, 8417, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8497, 8499, 8505, 8544, 8579, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12346, 12353, 12436, 12441, 12442, 12445, 12446, 12449, 12542, 12549, 12588, 12593, 12686, 12704, 12727, 13312, 19893, 19968, 40869, 40960, 42124, 44032, 55203, 63744, 64045, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65056, 65059, 65075, 65076, 65101, 65103, 65136, 65138, 65140, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65381, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    var unicodeES5IdentifierStart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 880, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1488, 1514, 1520, 1522, 1568, 1610, 1646, 1647, 1649, 1747, 1749, 1749, 1765, 1766, 1774, 1775, 1786, 1788, 1791, 1791, 1808, 1808, 1810, 1839, 1869, 1957, 1969, 1969, 1994, 2026, 2036, 2037, 2042, 2042, 2048, 2069, 2074, 2074, 2084, 2084, 2088, 2088, 2112, 2136, 2208, 2208, 2210, 2220, 2308, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2417, 2423, 2425, 2431, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2493, 2493, 2510, 2510, 2524, 2525, 2527, 2529, 2544, 2545, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2785, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2929, 2929, 2947, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3024, 3024, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3133, 3160, 3161, 3168, 3169, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3261, 3261, 3294, 3294, 3296, 3297, 3313, 3314, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3389, 3406, 3406, 3424, 3425, 3450, 3455, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3807, 3840, 3840, 3904, 3911, 3913, 3948, 3976, 3980, 4096, 4138, 4159, 4159, 4176, 4181, 4186, 4189, 4193, 4193, 4197, 4198, 4206, 4208, 4213, 4225, 4238, 4238, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5905, 5920, 5937, 5952, 5969, 5984, 5996, 5998, 6000, 6016, 6067, 6103, 6103, 6108, 6108, 6176, 6263, 6272, 6312, 6314, 6314, 6320, 6389, 6400, 6428, 6480, 6509, 6512, 6516, 6528, 6571, 6593, 6599, 6656, 6678, 6688, 6740, 6823, 6823, 6917, 6963, 6981, 6987, 7043, 7072, 7086, 7087, 7098, 7141, 7168, 7203, 7245, 7247, 7258, 7293, 7401, 7404, 7406, 7409, 7413, 7414, 7424, 7615, 7680, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8305, 8305, 8319, 8319, 8336, 8348, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11502, 11506, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11648, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11823, 11823, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12348, 12353, 12438, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 19893, 19968, 40908, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42527, 42538, 42539, 42560, 42606, 42623, 42647, 42656, 42735, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42899, 42912, 42922, 43000, 43009, 43011, 43013, 43015, 43018, 43020, 43042, 43072, 43123, 43138, 43187, 43250, 43255, 43259, 43259, 43274, 43301, 43312, 43334, 43360, 43388, 43396, 43442, 43471, 43471, 43520, 43560, 43584, 43586, 43588, 43595, 43616, 43638, 43642, 43642, 43648, 43695, 43697, 43697, 43701, 43702, 43705, 43709, 43712, 43712, 43714, 43714, 43739, 43741, 43744, 43754, 43762, 43764, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44002, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    var unicodeES5IdentifierPart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 768, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1155, 1159, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1425, 1469, 1471, 1471, 1473, 1474, 1476, 1477, 1479, 1479, 1488, 1514, 1520, 1522, 1552, 1562, 1568, 1641, 1646, 1747, 1749, 1756, 1759, 1768, 1770, 1788, 1791, 1791, 1808, 1866, 1869, 1969, 1984, 2037, 2042, 2042, 2048, 2093, 2112, 2139, 2208, 2208, 2210, 2220, 2276, 2302, 2304, 2403, 2406, 2415, 2417, 2423, 2425, 2431, 2433, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2500, 2503, 2504, 2507, 2510, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2561, 2563, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2641, 2641, 2649, 2652, 2654, 2654, 2662, 2677, 2689, 2691, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2787, 2790, 2799, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2876, 2884, 2887, 2888, 2891, 2893, 2902, 2903, 2908, 2909, 2911, 2915, 2918, 2927, 2929, 2929, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3024, 3024, 3031, 3031, 3046, 3055, 3073, 3075, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3160, 3161, 3168, 3171, 3174, 3183, 3202, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3260, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3294, 3294, 3296, 3299, 3302, 3311, 3313, 3314, 3330, 3331, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3396, 3398, 3400, 3402, 3406, 3415, 3415, 3424, 3427, 3430, 3439, 3450, 3455, 3458, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3769, 3771, 3773, 3776, 3780, 3782, 3782, 3784, 3789, 3792, 3801, 3804, 3807, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3948, 3953, 3972, 3974, 3991, 3993, 4028, 4038, 4038, 4096, 4169, 4176, 4253, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4957, 4959, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5908, 5920, 5940, 5952, 5971, 5984, 5996, 5998, 6000, 6002, 6003, 6016, 6099, 6103, 6103, 6108, 6109, 6112, 6121, 6155, 6157, 6160, 6169, 6176, 6263, 6272, 6314, 6320, 6389, 6400, 6428, 6432, 6443, 6448, 6459, 6470, 6509, 6512, 6516, 6528, 6571, 6576, 6601, 6608, 6617, 6656, 6683, 6688, 6750, 6752, 6780, 6783, 6793, 6800, 6809, 6823, 6823, 6912, 6987, 6992, 7001, 7019, 7027, 7040, 7155, 7168, 7223, 7232, 7241, 7245, 7293, 7376, 7378, 7380, 7414, 7424, 7654, 7676, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8204, 8205, 8255, 8256, 8276, 8276, 8305, 8305, 8319, 8319, 8336, 8348, 8400, 8412, 8417, 8417, 8421, 8432, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11647, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11744, 11775, 11823, 11823, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12348, 12353, 12438, 12441, 12442, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 19893, 19968, 40908, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42539, 42560, 42607, 42612, 42621, 42623, 42647, 42655, 42737, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42899, 42912, 42922, 43000, 43047, 43072, 43123, 43136, 43204, 43216, 43225, 43232, 43255, 43259, 43259, 43264, 43309, 43312, 43347, 43360, 43388, 43392, 43456, 43471, 43481, 43520, 43574, 43584, 43597, 43600, 43609, 43616, 43638, 43642, 43643, 43648, 43714, 43739, 43741, 43744, 43759, 43762, 43766, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44010, 44012, 44013, 44016, 44025, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65024, 65039, 65056, 65062, 65075, 65076, 65101, 65103, 65136, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    function lookupInUnicodeMap(code, map) {
        if (code < map[0]) {
            return false;
        }
        var lo = 0;
        var hi = map.length;
        var mid;
        while (lo + 1 < hi) {
            mid = lo + (hi - lo) / 2;
            mid -= mid % 2;
            if (map[mid] <= code && code <= map[mid + 1]) {
                return true;
            }
            if (code < map[mid]) {
                hi = mid;
            }
            else {
                lo = mid + 2;
            }
        }
        return false;
    }
    function isUnicodeIdentifierStart(code, languageVersion) {
        return languageVersion >= 1 ?
            lookupInUnicodeMap(code, unicodeES5IdentifierStart) :
            lookupInUnicodeMap(code, unicodeES3IdentifierStart);
    }
    ts.isUnicodeIdentifierStart = isUnicodeIdentifierStart;
    function isUnicodeIdentifierPart(code, languageVersion) {
        return languageVersion >= 1 ?
            lookupInUnicodeMap(code, unicodeES5IdentifierPart) :
            lookupInUnicodeMap(code, unicodeES3IdentifierPart);
    }
    function makeReverseMap(source) {
        var result = [];
        source.forEach(function (value, name) {
            result[value] = name;
        });
        return result;
    }
    var tokenStrings = makeReverseMap(textToToken);
    function tokenToString(t) {
        return tokenStrings[t];
    }
    ts.tokenToString = tokenToString;
    function stringToToken(s) {
        return textToToken.get(s);
    }
    ts.stringToToken = stringToToken;
    function computeLineStarts(text) {
        var result = new Array();
        var pos = 0;
        var lineStart = 0;
        while (pos < text.length) {
            var ch = text.charCodeAt(pos);
            pos++;
            switch (ch) {
                case 13:
                    if (text.charCodeAt(pos) === 10) {
                        pos++;
                    }
                case 10:
                    result.push(lineStart);
                    lineStart = pos;
                    break;
                default:
                    if (ch > 127 && isLineBreak(ch)) {
                        result.push(lineStart);
                        lineStart = pos;
                    }
                    break;
            }
        }
        result.push(lineStart);
        return result;
    }
    ts.computeLineStarts = computeLineStarts;
    function getPositionOfLineAndCharacter(sourceFile, line, character) {
        return computePositionOfLineAndCharacter(getLineStarts(sourceFile), line, character, sourceFile.text);
    }
    ts.getPositionOfLineAndCharacter = getPositionOfLineAndCharacter;
    function computePositionOfLineAndCharacter(lineStarts, line, character, debugText) {
        ts.Debug.assert(line >= 0 && line < lineStarts.length);
        var res = lineStarts[line] + character;
        if (line < lineStarts.length - 1) {
            ts.Debug.assert(res < lineStarts[line + 1]);
        }
        else if (debugText !== undefined) {
            ts.Debug.assert(res <= debugText.length);
        }
        return res;
    }
    ts.computePositionOfLineAndCharacter = computePositionOfLineAndCharacter;
    function getLineStarts(sourceFile) {
        return sourceFile.lineMap || (sourceFile.lineMap = computeLineStarts(sourceFile.text));
    }
    ts.getLineStarts = getLineStarts;
    function computeLineAndCharacterOfPosition(lineStarts, position) {
        var lineNumber = ts.binarySearch(lineStarts, position);
        if (lineNumber < 0) {
            lineNumber = ~lineNumber - 1;
            ts.Debug.assert(lineNumber !== -1, "position cannot precede the beginning of the file");
        }
        return {
            line: lineNumber,
            character: position - lineStarts[lineNumber]
        };
    }
    ts.computeLineAndCharacterOfPosition = computeLineAndCharacterOfPosition;
    function getLineAndCharacterOfPosition(sourceFile, position) {
        return computeLineAndCharacterOfPosition(getLineStarts(sourceFile), position);
    }
    ts.getLineAndCharacterOfPosition = getLineAndCharacterOfPosition;
    function isWhiteSpaceLike(ch) {
        return isWhiteSpaceSingleLine(ch) || isLineBreak(ch);
    }
    ts.isWhiteSpaceLike = isWhiteSpaceLike;
    function isWhiteSpaceSingleLine(ch) {
        return ch === 32 ||
            ch === 9 ||
            ch === 11 ||
            ch === 12 ||
            ch === 160 ||
            ch === 133 ||
            ch === 5760 ||
            ch >= 8192 && ch <= 8203 ||
            ch === 8239 ||
            ch === 8287 ||
            ch === 12288 ||
            ch === 65279;
    }
    ts.isWhiteSpaceSingleLine = isWhiteSpaceSingleLine;
    function isLineBreak(ch) {
        return ch === 10 ||
            ch === 13 ||
            ch === 8232 ||
            ch === 8233;
    }
    ts.isLineBreak = isLineBreak;
    function isDigit(ch) {
        return ch >= 48 && ch <= 57;
    }
    function isOctalDigit(ch) {
        return ch >= 48 && ch <= 55;
    }
    ts.isOctalDigit = isOctalDigit;
    function couldStartTrivia(text, pos) {
        var ch = text.charCodeAt(pos);
        switch (ch) {
            case 13:
            case 10:
            case 9:
            case 11:
            case 12:
            case 32:
            case 47:
            case 60:
            case 124:
            case 61:
            case 62:
                return true;
            case 35:
                return pos === 0;
            default:
                return ch > 127;
        }
    }
    ts.couldStartTrivia = couldStartTrivia;
    function skipTrivia(text, pos, stopAfterLineBreak, stopAtComments) {
        if (stopAtComments === void 0) { stopAtComments = false; }
        if (ts.positionIsSynthesized(pos)) {
            return pos;
        }
        while (true) {
            var ch = text.charCodeAt(pos);
            switch (ch) {
                case 13:
                    if (text.charCodeAt(pos + 1) === 10) {
                        pos++;
                    }
                case 10:
                    pos++;
                    if (stopAfterLineBreak) {
                        return pos;
                    }
                    continue;
                case 9:
                case 11:
                case 12:
                case 32:
                    pos++;
                    continue;
                case 47:
                    if (stopAtComments) {
                        break;
                    }
                    if (text.charCodeAt(pos + 1) === 47) {
                        pos += 2;
                        while (pos < text.length) {
                            if (isLineBreak(text.charCodeAt(pos))) {
                                break;
                            }
                            pos++;
                        }
                        continue;
                    }
                    if (text.charCodeAt(pos + 1) === 42) {
                        pos += 2;
                        while (pos < text.length) {
                            if (text.charCodeAt(pos) === 42 && text.charCodeAt(pos + 1) === 47) {
                                pos += 2;
                                break;
                            }
                            pos++;
                        }
                        continue;
                    }
                    break;
                case 60:
                case 124:
                case 61:
                case 62:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos);
                        continue;
                    }
                    break;
                case 35:
                    if (pos === 0 && isShebangTrivia(text, pos)) {
                        pos = scanShebangTrivia(text, pos);
                        continue;
                    }
                    break;
                default:
                    if (ch > 127 && (isWhiteSpaceLike(ch))) {
                        pos++;
                        continue;
                    }
                    break;
            }
            return pos;
        }
    }
    ts.skipTrivia = skipTrivia;
    var mergeConflictMarkerLength = "<<<<<<<".length;
    function isConflictMarkerTrivia(text, pos) {
        ts.Debug.assert(pos >= 0);
        if (pos === 0 || isLineBreak(text.charCodeAt(pos - 1))) {
            var ch = text.charCodeAt(pos);
            if ((pos + mergeConflictMarkerLength) < text.length) {
                for (var i = 0; i < mergeConflictMarkerLength; i++) {
                    if (text.charCodeAt(pos + i) !== ch) {
                        return false;
                    }
                }
                return ch === 61 ||
                    text.charCodeAt(pos + mergeConflictMarkerLength) === 32;
            }
        }
        return false;
    }
    function scanConflictMarkerTrivia(text, pos, error) {
        if (error) {
            error(ts.Diagnostics.Merge_conflict_marker_encountered, mergeConflictMarkerLength);
        }
        var ch = text.charCodeAt(pos);
        var len = text.length;
        if (ch === 60 || ch === 62) {
            while (pos < len && !isLineBreak(text.charCodeAt(pos))) {
                pos++;
            }
        }
        else {
            ts.Debug.assert(ch === 124 || ch === 61);
            while (pos < len) {
                var currentChar = text.charCodeAt(pos);
                if ((currentChar === 61 || currentChar === 62) && currentChar !== ch && isConflictMarkerTrivia(text, pos)) {
                    break;
                }
                pos++;
            }
        }
        return pos;
    }
    var shebangTriviaRegex = /^#!.*/;
    function isShebangTrivia(text, pos) {
        ts.Debug.assert(pos === 0);
        return shebangTriviaRegex.test(text);
    }
    function scanShebangTrivia(text, pos) {
        var shebang = shebangTriviaRegex.exec(text)[0];
        pos = pos + shebang.length;
        return pos;
    }
    function iterateCommentRanges(reduce, text, pos, trailing, cb, state, initial) {
        var pendingPos;
        var pendingEnd;
        var pendingKind;
        var pendingHasTrailingNewLine;
        var hasPendingCommentRange = false;
        var collecting = trailing || pos === 0;
        var accumulator = initial;
        scan: while (pos >= 0 && pos < text.length) {
            var ch = text.charCodeAt(pos);
            switch (ch) {
                case 13:
                    if (text.charCodeAt(pos + 1) === 10) {
                        pos++;
                    }
                case 10:
                    pos++;
                    if (trailing) {
                        break scan;
                    }
                    collecting = true;
                    if (hasPendingCommentRange) {
                        pendingHasTrailingNewLine = true;
                    }
                    continue;
                case 9:
                case 11:
                case 12:
                case 32:
                    pos++;
                    continue;
                case 47:
                    var nextChar = text.charCodeAt(pos + 1);
                    var hasTrailingNewLine = false;
                    if (nextChar === 47 || nextChar === 42) {
                        var kind = nextChar === 47 ? 2 : 3;
                        var startPos = pos;
                        pos += 2;
                        if (nextChar === 47) {
                            while (pos < text.length) {
                                if (isLineBreak(text.charCodeAt(pos))) {
                                    hasTrailingNewLine = true;
                                    break;
                                }
                                pos++;
                            }
                        }
                        else {
                            while (pos < text.length) {
                                if (text.charCodeAt(pos) === 42 && text.charCodeAt(pos + 1) === 47) {
                                    pos += 2;
                                    break;
                                }
                                pos++;
                            }
                        }
                        if (collecting) {
                            if (hasPendingCommentRange) {
                                accumulator = cb(pendingPos, pendingEnd, pendingKind, pendingHasTrailingNewLine, state, accumulator);
                                if (!reduce && accumulator) {
                                    return accumulator;
                                }
                                hasPendingCommentRange = false;
                            }
                            pendingPos = startPos;
                            pendingEnd = pos;
                            pendingKind = kind;
                            pendingHasTrailingNewLine = hasTrailingNewLine;
                            hasPendingCommentRange = true;
                        }
                        continue;
                    }
                    break scan;
                default:
                    if (ch > 127 && (isWhiteSpaceLike(ch))) {
                        if (hasPendingCommentRange && isLineBreak(ch)) {
                            pendingHasTrailingNewLine = true;
                        }
                        pos++;
                        continue;
                    }
                    break scan;
            }
        }
        if (hasPendingCommentRange) {
            accumulator = cb(pendingPos, pendingEnd, pendingKind, pendingHasTrailingNewLine, state, accumulator);
        }
        return accumulator;
    }
    function forEachLeadingCommentRange(text, pos, cb, state) {
        return iterateCommentRanges(false, text, pos, false, cb, state);
    }
    ts.forEachLeadingCommentRange = forEachLeadingCommentRange;
    function forEachTrailingCommentRange(text, pos, cb, state) {
        return iterateCommentRanges(false, text, pos, true, cb, state);
    }
    ts.forEachTrailingCommentRange = forEachTrailingCommentRange;
    function reduceEachLeadingCommentRange(text, pos, cb, state, initial) {
        return iterateCommentRanges(true, text, pos, false, cb, state, initial);
    }
    ts.reduceEachLeadingCommentRange = reduceEachLeadingCommentRange;
    function reduceEachTrailingCommentRange(text, pos, cb, state, initial) {
        return iterateCommentRanges(true, text, pos, true, cb, state, initial);
    }
    ts.reduceEachTrailingCommentRange = reduceEachTrailingCommentRange;
    function appendCommentRange(pos, end, kind, hasTrailingNewLine, _state, comments) {
        if (!comments) {
            comments = [];
        }
        comments.push({ kind: kind, pos: pos, end: end, hasTrailingNewLine: hasTrailingNewLine });
        return comments;
    }
    function getLeadingCommentRanges(text, pos) {
        return reduceEachLeadingCommentRange(text, pos, appendCommentRange, undefined, undefined);
    }
    ts.getLeadingCommentRanges = getLeadingCommentRanges;
    function getTrailingCommentRanges(text, pos) {
        return reduceEachTrailingCommentRange(text, pos, appendCommentRange, undefined, undefined);
    }
    ts.getTrailingCommentRanges = getTrailingCommentRanges;
    function getShebang(text) {
        var match = shebangTriviaRegex.exec(text);
        if (match) {
            return match[0];
        }
    }
    ts.getShebang = getShebang;
    function isIdentifierStart(ch, languageVersion) {
        return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 ||
            ch === 36 || ch === 95 ||
            ch > 127 && isUnicodeIdentifierStart(ch, languageVersion);
    }
    ts.isIdentifierStart = isIdentifierStart;
    function isIdentifierPart(ch, languageVersion) {
        return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 ||
            ch >= 48 && ch <= 57 || ch === 36 || ch === 95 ||
            ch > 127 && isUnicodeIdentifierPart(ch, languageVersion);
    }
    ts.isIdentifierPart = isIdentifierPart;
    function isIdentifierText(name, languageVersion) {
        if (!isIdentifierStart(name.charCodeAt(0), languageVersion)) {
            return false;
        }
        for (var i = 1; i < name.length; i++) {
            if (!isIdentifierPart(name.charCodeAt(i), languageVersion)) {
                return false;
            }
        }
        return true;
    }
    ts.isIdentifierText = isIdentifierText;
    function createScanner(languageVersion, skipTrivia, languageVariant, text, onError, start, length) {
        if (languageVariant === void 0) { languageVariant = 0; }
        var pos;
        var end;
        var startPos;
        var tokenPos;
        var token;
        var tokenValue;
        var precedingLineBreak;
        var hasExtendedUnicodeEscape;
        var tokenIsUnterminated;
        var numericLiteralFlags;
        setText(text, start, length);
        return {
            getStartPos: function () { return startPos; },
            getTextPos: function () { return pos; },
            getToken: function () { return token; },
            getTokenPos: function () { return tokenPos; },
            getTokenText: function () { return text.substring(tokenPos, pos); },
            getTokenValue: function () { return tokenValue; },
            hasExtendedUnicodeEscape: function () { return hasExtendedUnicodeEscape; },
            hasPrecedingLineBreak: function () { return precedingLineBreak; },
            isIdentifier: function () { return token === 71 || token > 107; },
            isReservedWord: function () { return token >= 72 && token <= 107; },
            isUnterminated: function () { return tokenIsUnterminated; },
            getNumericLiteralFlags: function () { return numericLiteralFlags; },
            reScanGreaterToken: reScanGreaterToken,
            reScanSlashToken: reScanSlashToken,
            reScanTemplateToken: reScanTemplateToken,
            scanJsxIdentifier: scanJsxIdentifier,
            scanJsxAttributeValue: scanJsxAttributeValue,
            reScanJsxToken: reScanJsxToken,
            scanJsxToken: scanJsxToken,
            scanJSDocToken: scanJSDocToken,
            scan: scan,
            getText: getText,
            setText: setText,
            setScriptTarget: setScriptTarget,
            setLanguageVariant: setLanguageVariant,
            setOnError: setOnError,
            setTextPos: setTextPos,
            tryScan: tryScan,
            lookAhead: lookAhead,
            scanRange: scanRange,
        };
        function error(message, length) {
            if (onError) {
                onError(message, length || 0);
            }
        }
        function scanNumber() {
            var start = pos;
            while (isDigit(text.charCodeAt(pos)))
                pos++;
            if (text.charCodeAt(pos) === 46) {
                pos++;
                while (isDigit(text.charCodeAt(pos)))
                    pos++;
            }
            var end = pos;
            if (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101) {
                pos++;
                numericLiteralFlags = 2;
                if (text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45)
                    pos++;
                if (isDigit(text.charCodeAt(pos))) {
                    pos++;
                    while (isDigit(text.charCodeAt(pos)))
                        pos++;
                    end = pos;
                }
                else {
                    error(ts.Diagnostics.Digit_expected);
                }
            }
            return "" + +(text.substring(start, end));
        }
        function scanOctalDigits() {
            var start = pos;
            while (isOctalDigit(text.charCodeAt(pos))) {
                pos++;
            }
            return +(text.substring(start, pos));
        }
        function scanExactNumberOfHexDigits(count) {
            return scanHexDigits(count, false);
        }
        function scanMinimumNumberOfHexDigits(count) {
            return scanHexDigits(count, true);
        }
        function scanHexDigits(minCount, scanAsManyAsPossible) {
            var digits = 0;
            var value = 0;
            while (digits < minCount || scanAsManyAsPossible) {
                var ch = text.charCodeAt(pos);
                if (ch >= 48 && ch <= 57) {
                    value = value * 16 + ch - 48;
                }
                else if (ch >= 65 && ch <= 70) {
                    value = value * 16 + ch - 65 + 10;
                }
                else if (ch >= 97 && ch <= 102) {
                    value = value * 16 + ch - 97 + 10;
                }
                else {
                    break;
                }
                pos++;
                digits++;
            }
            if (digits < minCount) {
                value = -1;
            }
            return value;
        }
        function scanString(allowEscapes) {
            if (allowEscapes === void 0) { allowEscapes = true; }
            var quote = text.charCodeAt(pos);
            pos++;
            var result = "";
            var start = pos;
            while (true) {
                if (pos >= end) {
                    result += text.substring(start, pos);
                    tokenIsUnterminated = true;
                    error(ts.Diagnostics.Unterminated_string_literal);
                    break;
                }
                var ch = text.charCodeAt(pos);
                if (ch === quote) {
                    result += text.substring(start, pos);
                    pos++;
                    break;
                }
                if (ch === 92 && allowEscapes) {
                    result += text.substring(start, pos);
                    result += scanEscapeSequence();
                    start = pos;
                    continue;
                }
                if (isLineBreak(ch)) {
                    result += text.substring(start, pos);
                    tokenIsUnterminated = true;
                    error(ts.Diagnostics.Unterminated_string_literal);
                    break;
                }
                pos++;
            }
            return result;
        }
        function scanTemplateAndSetTokenValue() {
            var startedWithBacktick = text.charCodeAt(pos) === 96;
            pos++;
            var start = pos;
            var contents = "";
            var resultingToken;
            while (true) {
                if (pos >= end) {
                    contents += text.substring(start, pos);
                    tokenIsUnterminated = true;
                    error(ts.Diagnostics.Unterminated_template_literal);
                    resultingToken = startedWithBacktick ? 13 : 16;
                    break;
                }
                var currChar = text.charCodeAt(pos);
                if (currChar === 96) {
                    contents += text.substring(start, pos);
                    pos++;
                    resultingToken = startedWithBacktick ? 13 : 16;
                    break;
                }
                if (currChar === 36 && pos + 1 < end && text.charCodeAt(pos + 1) === 123) {
                    contents += text.substring(start, pos);
                    pos += 2;
                    resultingToken = startedWithBacktick ? 14 : 15;
                    break;
                }
                if (currChar === 92) {
                    contents += text.substring(start, pos);
                    contents += scanEscapeSequence();
                    start = pos;
                    continue;
                }
                if (currChar === 13) {
                    contents += text.substring(start, pos);
                    pos++;
                    if (pos < end && text.charCodeAt(pos) === 10) {
                        pos++;
                    }
                    contents += "\n";
                    start = pos;
                    continue;
                }
                pos++;
            }
            ts.Debug.assert(resultingToken !== undefined);
            tokenValue = contents;
            return resultingToken;
        }
        function scanEscapeSequence() {
            pos++;
            if (pos >= end) {
                error(ts.Diagnostics.Unexpected_end_of_text);
                return "";
            }
            var ch = text.charCodeAt(pos);
            pos++;
            switch (ch) {
                case 48:
                    return "\0";
                case 98:
                    return "\b";
                case 116:
                    return "\t";
                case 110:
                    return "\n";
                case 118:
                    return "\v";
                case 102:
                    return "\f";
                case 114:
                    return "\r";
                case 39:
                    return "\'";
                case 34:
                    return "\"";
                case 117:
                    if (pos < end && text.charCodeAt(pos) === 123) {
                        hasExtendedUnicodeEscape = true;
                        pos++;
                        return scanExtendedUnicodeEscape();
                    }
                    return scanHexadecimalEscape(4);
                case 120:
                    return scanHexadecimalEscape(2);
                case 13:
                    if (pos < end && text.charCodeAt(pos) === 10) {
                        pos++;
                    }
                case 10:
                case 8232:
                case 8233:
                    return "";
                default:
                    return String.fromCharCode(ch);
            }
        }
        function scanHexadecimalEscape(numDigits) {
            var escapedValue = scanExactNumberOfHexDigits(numDigits);
            if (escapedValue >= 0) {
                return String.fromCharCode(escapedValue);
            }
            else {
                error(ts.Diagnostics.Hexadecimal_digit_expected);
                return "";
            }
        }
        function scanExtendedUnicodeEscape() {
            var escapedValue = scanMinimumNumberOfHexDigits(1);
            var isInvalidExtendedEscape = false;
            if (escapedValue < 0) {
                error(ts.Diagnostics.Hexadecimal_digit_expected);
                isInvalidExtendedEscape = true;
            }
            else if (escapedValue > 0x10FFFF) {
                error(ts.Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive);
                isInvalidExtendedEscape = true;
            }
            if (pos >= end) {
                error(ts.Diagnostics.Unexpected_end_of_text);
                isInvalidExtendedEscape = true;
            }
            else if (text.charCodeAt(pos) === 125) {
                pos++;
            }
            else {
                error(ts.Diagnostics.Unterminated_Unicode_escape_sequence);
                isInvalidExtendedEscape = true;
            }
            if (isInvalidExtendedEscape) {
                return "";
            }
            return utf16EncodeAsString(escapedValue);
        }
        function utf16EncodeAsString(codePoint) {
            ts.Debug.assert(0x0 <= codePoint && codePoint <= 0x10FFFF);
            if (codePoint <= 65535) {
                return String.fromCharCode(codePoint);
            }
            var codeUnit1 = Math.floor((codePoint - 65536) / 1024) + 0xD800;
            var codeUnit2 = ((codePoint - 65536) % 1024) + 0xDC00;
            return String.fromCharCode(codeUnit1, codeUnit2);
        }
        function peekUnicodeEscape() {
            if (pos + 5 < end && text.charCodeAt(pos + 1) === 117) {
                var start_1 = pos;
                pos += 2;
                var value = scanExactNumberOfHexDigits(4);
                pos = start_1;
                return value;
            }
            return -1;
        }
        function scanIdentifierParts() {
            var result = "";
            var start = pos;
            while (pos < end) {
                var ch = text.charCodeAt(pos);
                if (isIdentifierPart(ch, languageVersion)) {
                    pos++;
                }
                else if (ch === 92) {
                    ch = peekUnicodeEscape();
                    if (!(ch >= 0 && isIdentifierPart(ch, languageVersion))) {
                        break;
                    }
                    result += text.substring(start, pos);
                    result += String.fromCharCode(ch);
                    pos += 6;
                    start = pos;
                }
                else {
                    break;
                }
            }
            result += text.substring(start, pos);
            return result;
        }
        function getIdentifierToken() {
            var len = tokenValue.length;
            if (len >= 2 && len <= 11) {
                var ch = tokenValue.charCodeAt(0);
                if (ch >= 97 && ch <= 122) {
                    token = textToToken.get(tokenValue);
                    if (token !== undefined) {
                        return token;
                    }
                }
            }
            return token = 71;
        }
        function scanBinaryOrOctalDigits(base) {
            ts.Debug.assert(base === 2 || base === 8, "Expected either base 2 or base 8");
            var value = 0;
            var numberOfDigits = 0;
            while (true) {
                var ch = text.charCodeAt(pos);
                var valueOfCh = ch - 48;
                if (!isDigit(ch) || valueOfCh >= base) {
                    break;
                }
                value = value * base + valueOfCh;
                pos++;
                numberOfDigits++;
            }
            if (numberOfDigits === 0) {
                return -1;
            }
            return value;
        }
        function scan() {
            startPos = pos;
            hasExtendedUnicodeEscape = false;
            precedingLineBreak = false;
            tokenIsUnterminated = false;
            numericLiteralFlags = 0;
            while (true) {
                tokenPos = pos;
                if (pos >= end) {
                    return token = 1;
                }
                var ch = text.charCodeAt(pos);
                if (ch === 35 && pos === 0 && isShebangTrivia(text, pos)) {
                    pos = scanShebangTrivia(text, pos);
                    if (skipTrivia) {
                        continue;
                    }
                    else {
                        return token = 6;
                    }
                }
                switch (ch) {
                    case 10:
                    case 13:
                        precedingLineBreak = true;
                        if (skipTrivia) {
                            pos++;
                            continue;
                        }
                        else {
                            if (ch === 13 && pos + 1 < end && text.charCodeAt(pos + 1) === 10) {
                                pos += 2;
                            }
                            else {
                                pos++;
                            }
                            return token = 4;
                        }
                    case 9:
                    case 11:
                    case 12:
                    case 32:
                        if (skipTrivia) {
                            pos++;
                            continue;
                        }
                        else {
                            while (pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos))) {
                                pos++;
                            }
                            return token = 5;
                        }
                    case 33:
                        if (text.charCodeAt(pos + 1) === 61) {
                            if (text.charCodeAt(pos + 2) === 61) {
                                return pos += 3, token = 35;
                            }
                            return pos += 2, token = 33;
                        }
                        pos++;
                        return token = 51;
                    case 34:
                    case 39:
                        tokenValue = scanString();
                        return token = 9;
                    case 96:
                        return token = scanTemplateAndSetTokenValue();
                    case 37:
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 64;
                        }
                        pos++;
                        return token = 42;
                    case 38:
                        if (text.charCodeAt(pos + 1) === 38) {
                            return pos += 2, token = 53;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 68;
                        }
                        pos++;
                        return token = 48;
                    case 40:
                        pos++;
                        return token = 19;
                    case 41:
                        pos++;
                        return token = 20;
                    case 42:
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 61;
                        }
                        if (text.charCodeAt(pos + 1) === 42) {
                            if (text.charCodeAt(pos + 2) === 61) {
                                return pos += 3, token = 62;
                            }
                            return pos += 2, token = 40;
                        }
                        pos++;
                        return token = 39;
                    case 43:
                        if (text.charCodeAt(pos + 1) === 43) {
                            return pos += 2, token = 43;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 59;
                        }
                        pos++;
                        return token = 37;
                    case 44:
                        pos++;
                        return token = 26;
                    case 45:
                        if (text.charCodeAt(pos + 1) === 45) {
                            return pos += 2, token = 44;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 60;
                        }
                        pos++;
                        return token = 38;
                    case 46:
                        if (isDigit(text.charCodeAt(pos + 1))) {
                            tokenValue = scanNumber();
                            return token = 8;
                        }
                        if (text.charCodeAt(pos + 1) === 46 && text.charCodeAt(pos + 2) === 46) {
                            return pos += 3, token = 24;
                        }
                        pos++;
                        return token = 23;
                    case 47:
                        if (text.charCodeAt(pos + 1) === 47) {
                            pos += 2;
                            while (pos < end) {
                                if (isLineBreak(text.charCodeAt(pos))) {
                                    break;
                                }
                                pos++;
                            }
                            if (skipTrivia) {
                                continue;
                            }
                            else {
                                return token = 2;
                            }
                        }
                        if (text.charCodeAt(pos + 1) === 42) {
                            pos += 2;
                            var commentClosed = false;
                            while (pos < end) {
                                var ch_1 = text.charCodeAt(pos);
                                if (ch_1 === 42 && text.charCodeAt(pos + 1) === 47) {
                                    pos += 2;
                                    commentClosed = true;
                                    break;
                                }
                                if (isLineBreak(ch_1)) {
                                    precedingLineBreak = true;
                                }
                                pos++;
                            }
                            if (!commentClosed) {
                                error(ts.Diagnostics.Asterisk_Slash_expected);
                            }
                            if (skipTrivia) {
                                continue;
                            }
                            else {
                                tokenIsUnterminated = !commentClosed;
                                return token = 3;
                            }
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 63;
                        }
                        pos++;
                        return token = 41;
                    case 48:
                        if (pos + 2 < end && (text.charCodeAt(pos + 1) === 88 || text.charCodeAt(pos + 1) === 120)) {
                            pos += 2;
                            var value = scanMinimumNumberOfHexDigits(1);
                            if (value < 0) {
                                error(ts.Diagnostics.Hexadecimal_digit_expected);
                                value = 0;
                            }
                            tokenValue = "" + value;
                            numericLiteralFlags = 8;
                            return token = 8;
                        }
                        else if (pos + 2 < end && (text.charCodeAt(pos + 1) === 66 || text.charCodeAt(pos + 1) === 98)) {
                            pos += 2;
                            var value = scanBinaryOrOctalDigits(2);
                            if (value < 0) {
                                error(ts.Diagnostics.Binary_digit_expected);
                                value = 0;
                            }
                            tokenValue = "" + value;
                            numericLiteralFlags = 16;
                            return token = 8;
                        }
                        else if (pos + 2 < end && (text.charCodeAt(pos + 1) === 79 || text.charCodeAt(pos + 1) === 111)) {
                            pos += 2;
                            var value = scanBinaryOrOctalDigits(8);
                            if (value < 0) {
                                error(ts.Diagnostics.Octal_digit_expected);
                                value = 0;
                            }
                            tokenValue = "" + value;
                            numericLiteralFlags = 32;
                            return token = 8;
                        }
                        if (pos + 1 < end && isOctalDigit(text.charCodeAt(pos + 1))) {
                            tokenValue = "" + scanOctalDigits();
                            numericLiteralFlags = 4;
                            return token = 8;
                        }
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                        tokenValue = scanNumber();
                        return token = 8;
                    case 58:
                        pos++;
                        return token = 56;
                    case 59:
                        pos++;
                        return token = 25;
                    case 60:
                        if (isConflictMarkerTrivia(text, pos)) {
                            pos = scanConflictMarkerTrivia(text, pos, error);
                            if (skipTrivia) {
                                continue;
                            }
                            else {
                                return token = 7;
                            }
                        }
                        if (text.charCodeAt(pos + 1) === 60) {
                            if (text.charCodeAt(pos + 2) === 61) {
                                return pos += 3, token = 65;
                            }
                            return pos += 2, token = 45;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 30;
                        }
                        if (languageVariant === 1 &&
                            text.charCodeAt(pos + 1) === 47 &&
                            text.charCodeAt(pos + 2) !== 42) {
                            return pos += 2, token = 28;
                        }
                        pos++;
                        return token = 27;
                    case 61:
                        if (isConflictMarkerTrivia(text, pos)) {
                            pos = scanConflictMarkerTrivia(text, pos, error);
                            if (skipTrivia) {
                                continue;
                            }
                            else {
                                return token = 7;
                            }
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            if (text.charCodeAt(pos + 2) === 61) {
                                return pos += 3, token = 34;
                            }
                            return pos += 2, token = 32;
                        }
                        if (text.charCodeAt(pos + 1) === 62) {
                            return pos += 2, token = 36;
                        }
                        pos++;
                        return token = 58;
                    case 62:
                        if (isConflictMarkerTrivia(text, pos)) {
                            pos = scanConflictMarkerTrivia(text, pos, error);
                            if (skipTrivia) {
                                continue;
                            }
                            else {
                                return token = 7;
                            }
                        }
                        pos++;
                        return token = 29;
                    case 63:
                        pos++;
                        return token = 55;
                    case 91:
                        pos++;
                        return token = 21;
                    case 93:
                        pos++;
                        return token = 22;
                    case 94:
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 70;
                        }
                        pos++;
                        return token = 50;
                    case 123:
                        pos++;
                        return token = 17;
                    case 124:
                        if (isConflictMarkerTrivia(text, pos)) {
                            pos = scanConflictMarkerTrivia(text, pos, error);
                            if (skipTrivia) {
                                continue;
                            }
                            else {
                                return token = 7;
                            }
                        }
                        if (text.charCodeAt(pos + 1) === 124) {
                            return pos += 2, token = 54;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 69;
                        }
                        pos++;
                        return token = 49;
                    case 125:
                        pos++;
                        return token = 18;
                    case 126:
                        pos++;
                        return token = 52;
                    case 64:
                        pos++;
                        return token = 57;
                    case 92:
                        var cookedChar = peekUnicodeEscape();
                        if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
                            pos += 6;
                            tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
                            return token = getIdentifierToken();
                        }
                        error(ts.Diagnostics.Invalid_character);
                        pos++;
                        return token = 0;
                    default:
                        if (isIdentifierStart(ch, languageVersion)) {
                            pos++;
                            while (pos < end && isIdentifierPart(ch = text.charCodeAt(pos), languageVersion))
                                pos++;
                            tokenValue = text.substring(tokenPos, pos);
                            if (ch === 92) {
                                tokenValue += scanIdentifierParts();
                            }
                            return token = getIdentifierToken();
                        }
                        else if (isWhiteSpaceSingleLine(ch)) {
                            pos++;
                            continue;
                        }
                        else if (isLineBreak(ch)) {
                            precedingLineBreak = true;
                            pos++;
                            continue;
                        }
                        error(ts.Diagnostics.Invalid_character);
                        pos++;
                        return token = 0;
                }
            }
        }
        function reScanGreaterToken() {
            if (token === 29) {
                if (text.charCodeAt(pos) === 62) {
                    if (text.charCodeAt(pos + 1) === 62) {
                        if (text.charCodeAt(pos + 2) === 61) {
                            return pos += 3, token = 67;
                        }
                        return pos += 2, token = 47;
                    }
                    if (text.charCodeAt(pos + 1) === 61) {
                        return pos += 2, token = 66;
                    }
                    pos++;
                    return token = 46;
                }
                if (text.charCodeAt(pos) === 61) {
                    pos++;
                    return token = 31;
                }
            }
            return token;
        }
        function reScanSlashToken() {
            if (token === 41 || token === 63) {
                var p = tokenPos + 1;
                var inEscape = false;
                var inCharacterClass = false;
                while (true) {
                    if (p >= end) {
                        tokenIsUnterminated = true;
                        error(ts.Diagnostics.Unterminated_regular_expression_literal);
                        break;
                    }
                    var ch = text.charCodeAt(p);
                    if (isLineBreak(ch)) {
                        tokenIsUnterminated = true;
                        error(ts.Diagnostics.Unterminated_regular_expression_literal);
                        break;
                    }
                    if (inEscape) {
                        inEscape = false;
                    }
                    else if (ch === 47 && !inCharacterClass) {
                        p++;
                        break;
                    }
                    else if (ch === 91) {
                        inCharacterClass = true;
                    }
                    else if (ch === 92) {
                        inEscape = true;
                    }
                    else if (ch === 93) {
                        inCharacterClass = false;
                    }
                    p++;
                }
                while (p < end && isIdentifierPart(text.charCodeAt(p), languageVersion)) {
                    p++;
                }
                pos = p;
                tokenValue = text.substring(tokenPos, pos);
                token = 12;
            }
            return token;
        }
        function reScanTemplateToken() {
            ts.Debug.assert(token === 18, "'reScanTemplateToken' should only be called on a '}'");
            pos = tokenPos;
            return token = scanTemplateAndSetTokenValue();
        }
        function reScanJsxToken() {
            pos = tokenPos = startPos;
            return token = scanJsxToken();
        }
        function scanJsxToken() {
            startPos = tokenPos = pos;
            if (pos >= end) {
                return token = 1;
            }
            var char = text.charCodeAt(pos);
            if (char === 60) {
                if (text.charCodeAt(pos + 1) === 47) {
                    pos += 2;
                    return token = 28;
                }
                pos++;
                return token = 27;
            }
            if (char === 123) {
                pos++;
                return token = 17;
            }
            var firstNonWhitespace = 0;
            while (pos < end) {
                char = text.charCodeAt(pos);
                if (char === 123) {
                    break;
                }
                if (char === 60) {
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        return token = 7;
                    }
                    break;
                }
                if (isLineBreak(char) && firstNonWhitespace === 0) {
                    firstNonWhitespace = -1;
                }
                else if (!isWhiteSpaceLike(char)) {
                    firstNonWhitespace = pos;
                }
                pos++;
            }
            return firstNonWhitespace === -1 ? 11 : 10;
        }
        function scanJsxIdentifier() {
            if (tokenIsIdentifierOrKeyword(token)) {
                var firstCharPosition = pos;
                while (pos < end) {
                    var ch = text.charCodeAt(pos);
                    if (ch === 45 || ((firstCharPosition === pos) ? isIdentifierStart(ch, languageVersion) : isIdentifierPart(ch, languageVersion))) {
                        pos++;
                    }
                    else {
                        break;
                    }
                }
                tokenValue += text.substr(firstCharPosition, pos - firstCharPosition);
            }
            return token;
        }
        function scanJsxAttributeValue() {
            startPos = pos;
            switch (text.charCodeAt(pos)) {
                case 34:
                case 39:
                    tokenValue = scanString(false);
                    return token = 9;
                default:
                    return scan();
            }
        }
        function scanJSDocToken() {
            if (pos >= end) {
                return token = 1;
            }
            startPos = pos;
            tokenPos = pos;
            var ch = text.charCodeAt(pos);
            switch (ch) {
                case 9:
                case 11:
                case 12:
                case 32:
                    while (pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos))) {
                        pos++;
                    }
                    return token = 5;
                case 64:
                    pos++;
                    return token = 57;
                case 10:
                case 13:
                    pos++;
                    return token = 4;
                case 42:
                    pos++;
                    return token = 39;
                case 123:
                    pos++;
                    return token = 17;
                case 125:
                    pos++;
                    return token = 18;
                case 91:
                    pos++;
                    return token = 21;
                case 93:
                    pos++;
                    return token = 22;
                case 60:
                    pos++;
                    return token = 27;
                case 62:
                    pos++;
                    return token = 29;
                case 61:
                    pos++;
                    return token = 58;
                case 44:
                    pos++;
                    return token = 26;
                case 46:
                    pos++;
                    return token = 23;
            }
            if (isIdentifierStart(ch, 5)) {
                pos++;
                while (isIdentifierPart(text.charCodeAt(pos), 5) && pos < end) {
                    pos++;
                }
                return token = 71;
            }
            else {
                return pos += 1, token = 0;
            }
        }
        function speculationHelper(callback, isLookahead) {
            var savePos = pos;
            var saveStartPos = startPos;
            var saveTokenPos = tokenPos;
            var saveToken = token;
            var saveTokenValue = tokenValue;
            var savePrecedingLineBreak = precedingLineBreak;
            var result = callback();
            if (!result || isLookahead) {
                pos = savePos;
                startPos = saveStartPos;
                tokenPos = saveTokenPos;
                token = saveToken;
                tokenValue = saveTokenValue;
                precedingLineBreak = savePrecedingLineBreak;
            }
            return result;
        }
        function scanRange(start, length, callback) {
            var saveEnd = end;
            var savePos = pos;
            var saveStartPos = startPos;
            var saveTokenPos = tokenPos;
            var saveToken = token;
            var savePrecedingLineBreak = precedingLineBreak;
            var saveTokenValue = tokenValue;
            var saveHasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
            var saveTokenIsUnterminated = tokenIsUnterminated;
            setText(text, start, length);
            var result = callback();
            end = saveEnd;
            pos = savePos;
            startPos = saveStartPos;
            tokenPos = saveTokenPos;
            token = saveToken;
            precedingLineBreak = savePrecedingLineBreak;
            tokenValue = saveTokenValue;
            hasExtendedUnicodeEscape = saveHasExtendedUnicodeEscape;
            tokenIsUnterminated = saveTokenIsUnterminated;
            return result;
        }
        function lookAhead(callback) {
            return speculationHelper(callback, true);
        }
        function tryScan(callback) {
            return speculationHelper(callback, false);
        }
        function getText() {
            return text;
        }
        function setText(newText, start, length) {
            text = newText || "";
            end = length === undefined ? text.length : start + length;
            setTextPos(start || 0);
        }
        function setOnError(errorCallback) {
            onError = errorCallback;
        }
        function setScriptTarget(scriptTarget) {
            languageVersion = scriptTarget;
        }
        function setLanguageVariant(variant) {
            languageVariant = variant;
        }
        function setTextPos(textPos) {
            ts.Debug.assert(textPos >= 0);
            pos = textPos;
            startPos = textPos;
            tokenPos = textPos;
            token = 0;
            precedingLineBreak = false;
            tokenValue = undefined;
            hasExtendedUnicodeEscape = false;
            tokenIsUnterminated = false;
        }
    }
    ts.createScanner = createScanner;
})(ts || (ts = {}));
var ts;
(function (ts) {
    var NodeConstructor;
    var TokenConstructor;
    var IdentifierConstructor;
    var SourceFileConstructor;
    function createNode(kind, pos, end) {
        if (kind === 265) {
            return new (SourceFileConstructor || (SourceFileConstructor = ts.objectAllocator.getSourceFileConstructor()))(kind, pos, end);
        }
        else if (kind === 71) {
            return new (IdentifierConstructor || (IdentifierConstructor = ts.objectAllocator.getIdentifierConstructor()))(kind, pos, end);
        }
        else if (!ts.isNodeKind(kind)) {
            return new (TokenConstructor || (TokenConstructor = ts.objectAllocator.getTokenConstructor()))(kind, pos, end);
        }
        else {
            return new (NodeConstructor || (NodeConstructor = ts.objectAllocator.getNodeConstructor()))(kind, pos, end);
        }
    }
    ts.createNode = createNode;
    function visitNode(cbNode, node) {
        return node && cbNode(node);
    }
    function visitNodes(cbNode, cbNodes, nodes) {
        if (nodes) {
            if (cbNodes) {
                return cbNodes(nodes);
            }
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var node = nodes_1[_i];
                var result = cbNode(node);
                if (result) {
                    return result;
                }
            }
        }
    }
    function forEachChild(node, cbNode, cbNodes) {
        if (!node || node.kind <= 142) {
            return;
        }
        switch (node.kind) {
            case 143:
                return visitNode(cbNode, node.left) ||
                    visitNode(cbNode, node.right);
            case 145:
                return visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.constraint) ||
                    visitNode(cbNode, node.default) ||
                    visitNode(cbNode, node.expression);
            case 262:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.questionToken) ||
                    visitNode(cbNode, node.equalsToken) ||
                    visitNode(cbNode, node.objectAssignmentInitializer);
            case 263:
                return visitNode(cbNode, node.expression);
            case 146:
            case 149:
            case 148:
            case 261:
            case 226:
            case 176:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.propertyName) ||
                    visitNode(cbNode, node.dotDotDotToken) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.questionToken) ||
                    visitNode(cbNode, node.type) ||
                    visitNode(cbNode, node.initializer);
            case 160:
            case 161:
            case 155:
            case 156:
            case 157:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNodes(cbNode, cbNodes, node.typeParameters) ||
                    visitNodes(cbNode, cbNodes, node.parameters) ||
                    visitNode(cbNode, node.type);
            case 151:
            case 150:
            case 152:
            case 153:
            case 154:
            case 186:
            case 228:
            case 187:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.asteriskToken) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.questionToken) ||
                    visitNodes(cbNode, cbNodes, node.typeParameters) ||
                    visitNodes(cbNode, cbNodes, node.parameters) ||
                    visitNode(cbNode, node.type) ||
                    visitNode(cbNode, node.equalsGreaterThanToken) ||
                    visitNode(cbNode, node.body);
            case 159:
                return visitNode(cbNode, node.typeName) ||
                    visitNodes(cbNode, cbNodes, node.typeArguments);
            case 158:
                return visitNode(cbNode, node.parameterName) ||
                    visitNode(cbNode, node.type);
            case 162:
                return visitNode(cbNode, node.exprName);
            case 163:
                return visitNodes(cbNode, cbNodes, node.members);
            case 164:
                return visitNode(cbNode, node.elementType);
            case 165:
                return visitNodes(cbNode, cbNodes, node.elementTypes);
            case 166:
            case 167:
                return visitNodes(cbNode, cbNodes, node.types);
            case 168:
            case 170:
                return visitNode(cbNode, node.type);
            case 171:
                return visitNode(cbNode, node.objectType) ||
                    visitNode(cbNode, node.indexType);
            case 172:
                return visitNode(cbNode, node.readonlyToken) ||
                    visitNode(cbNode, node.typeParameter) ||
                    visitNode(cbNode, node.questionToken) ||
                    visitNode(cbNode, node.type);
            case 173:
                return visitNode(cbNode, node.literal);
            case 174:
            case 175:
                return visitNodes(cbNode, cbNodes, node.elements);
            case 177:
                return visitNodes(cbNode, cbNodes, node.elements);
            case 178:
                return visitNodes(cbNode, cbNodes, node.properties);
            case 179:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.name);
            case 180:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.argumentExpression);
            case 181:
            case 182:
                return visitNode(cbNode, node.expression) ||
                    visitNodes(cbNode, cbNodes, node.typeArguments) ||
                    visitNodes(cbNode, cbNodes, node.arguments);
            case 183:
                return visitNode(cbNode, node.tag) ||
                    visitNode(cbNode, node.template);
            case 184:
                return visitNode(cbNode, node.type) ||
                    visitNode(cbNode, node.expression);
            case 185:
                return visitNode(cbNode, node.expression);
            case 188:
                return visitNode(cbNode, node.expression);
            case 189:
                return visitNode(cbNode, node.expression);
            case 190:
                return visitNode(cbNode, node.expression);
            case 192:
                return visitNode(cbNode, node.operand);
            case 197:
                return visitNode(cbNode, node.asteriskToken) ||
                    visitNode(cbNode, node.expression);
            case 191:
                return visitNode(cbNode, node.expression);
            case 193:
                return visitNode(cbNode, node.operand);
            case 194:
                return visitNode(cbNode, node.left) ||
                    visitNode(cbNode, node.operatorToken) ||
                    visitNode(cbNode, node.right);
            case 202:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.type);
            case 203:
                return visitNode(cbNode, node.expression);
            case 204:
                return visitNode(cbNode, node.name);
            case 195:
                return visitNode(cbNode, node.condition) ||
                    visitNode(cbNode, node.questionToken) ||
                    visitNode(cbNode, node.whenTrue) ||
                    visitNode(cbNode, node.colonToken) ||
                    visitNode(cbNode, node.whenFalse);
            case 198:
                return visitNode(cbNode, node.expression);
            case 207:
            case 234:
                return visitNodes(cbNode, cbNodes, node.statements);
            case 265:
                return visitNodes(cbNode, cbNodes, node.statements) ||
                    visitNode(cbNode, node.endOfFileToken);
            case 208:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.declarationList);
            case 227:
                return visitNodes(cbNode, cbNodes, node.declarations);
            case 210:
                return visitNode(cbNode, node.expression);
            case 211:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.thenStatement) ||
                    visitNode(cbNode, node.elseStatement);
            case 212:
                return visitNode(cbNode, node.statement) ||
                    visitNode(cbNode, node.expression);
            case 213:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.statement);
            case 214:
                return visitNode(cbNode, node.initializer) ||
                    visitNode(cbNode, node.condition) ||
                    visitNode(cbNode, node.incrementor) ||
                    visitNode(cbNode, node.statement);
            case 215:
                return visitNode(cbNode, node.initializer) ||
                    visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.statement);
            case 216:
                return visitNode(cbNode, node.awaitModifier) ||
                    visitNode(cbNode, node.initializer) ||
                    visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.statement);
            case 217:
            case 218:
                return visitNode(cbNode, node.label);
            case 219:
                return visitNode(cbNode, node.expression);
            case 220:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.statement);
            case 221:
                return visitNode(cbNode, node.expression) ||
                    visitNode(cbNode, node.caseBlock);
            case 235:
                return visitNodes(cbNode, cbNodes, node.clauses);
            case 257:
                return visitNode(cbNode, node.expression) ||
                    visitNodes(cbNode, cbNodes, node.statements);
            case 258:
                return visitNodes(cbNode, cbNodes, node.statements);
            case 222:
                return visitNode(cbNode, node.label) ||
                    visitNode(cbNode, node.statement);
            case 223:
                return visitNode(cbNode, node.expression);
            case 224:
                return visitNode(cbNode, node.tryBlock) ||
                    visitNode(cbNode, node.catchClause) ||
                    visitNode(cbNode, node.finallyBlock);
            case 260:
                return visitNode(cbNode, node.variableDeclaration) ||
                    visitNode(cbNode, node.block);
            case 147:
                return visitNode(cbNode, node.expression);
            case 229:
            case 199:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNodes(cbNode, cbNodes, node.typeParameters) ||
                    visitNodes(cbNode, cbNodes, node.heritageClauses) ||
                    visitNodes(cbNode, cbNodes, node.members);
            case 230:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNodes(cbNode, cbNodes, node.typeParameters) ||
                    visitNodes(cbNode, cbNodes, node.heritageClauses) ||
                    visitNodes(cbNode, cbNodes, node.members);
            case 231:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNodes(cbNode, cbNodes, node.typeParameters) ||
                    visitNode(cbNode, node.type);
            case 232:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNodes(cbNode, cbNodes, node.members);
            case 264:
                return visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.initializer);
            case 233:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.body);
            case 237:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.moduleReference);
            case 238:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.importClause) ||
                    visitNode(cbNode, node.moduleSpecifier);
            case 239:
                return visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.namedBindings);
            case 236:
                return visitNode(cbNode, node.name);
            case 240:
                return visitNode(cbNode, node.name);
            case 241:
            case 245:
                return visitNodes(cbNode, cbNodes, node.elements);
            case 244:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.exportClause) ||
                    visitNode(cbNode, node.moduleSpecifier);
            case 242:
            case 246:
                return visitNode(cbNode, node.propertyName) ||
                    visitNode(cbNode, node.name);
            case 243:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, node.expression);
            case 196:
                return visitNode(cbNode, node.head) || visitNodes(cbNode, cbNodes, node.templateSpans);
            case 205:
                return visitNode(cbNode, node.expression) || visitNode(cbNode, node.literal);
            case 144:
                return visitNode(cbNode, node.expression);
            case 259:
                return visitNodes(cbNode, cbNodes, node.types);
            case 201:
                return visitNode(cbNode, node.expression) ||
                    visitNodes(cbNode, cbNodes, node.typeArguments);
            case 248:
                return visitNode(cbNode, node.expression);
            case 247:
                return visitNodes(cbNode, cbNodes, node.decorators);
            case 289:
                return visitNodes(cbNode, cbNodes, node.elements);
            case 249:
                return visitNode(cbNode, node.openingElement) ||
                    visitNodes(cbNode, cbNodes, node.children) ||
                    visitNode(cbNode, node.closingElement);
            case 250:
            case 251:
                return visitNode(cbNode, node.tagName) ||
                    visitNode(cbNode, node.attributes);
            case 254:
                return visitNodes(cbNode, cbNodes, node.properties);
            case 253:
                return visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.initializer);
            case 255:
                return visitNode(cbNode, node.expression);
            case 256:
                return visitNode(cbNode, node.dotDotDotToken) ||
                    visitNode(cbNode, node.expression);
            case 252:
                return visitNode(cbNode, node.tagName);
            case 267:
                return visitNode(cbNode, node.type);
            case 271:
                return visitNode(cbNode, node.type);
            case 270:
                return visitNode(cbNode, node.type);
            case 272:
                return visitNode(cbNode, node.type);
            case 273:
                return visitNodes(cbNode, cbNodes, node.parameters) ||
                    visitNode(cbNode, node.type);
            case 274:
                return visitNode(cbNode, node.type);
            case 275:
                return visitNodes(cbNode, cbNodes, node.tags);
            case 279:
            case 284:
                if (node.isNameFirst) {
                    return visitNode(cbNode, node.name) ||
                        visitNode(cbNode, node.typeExpression);
                }
                else {
                    return visitNode(cbNode, node.typeExpression) ||
                        visitNode(cbNode, node.name);
                }
            case 280:
                return visitNode(cbNode, node.typeExpression);
            case 281:
                return visitNode(cbNode, node.typeExpression);
            case 277:
                return visitNode(cbNode, node.class);
            case 282:
                return visitNodes(cbNode, cbNodes, node.typeParameters);
            case 283:
                if (node.typeExpression &&
                    node.typeExpression.kind === 267) {
                    return visitNode(cbNode, node.typeExpression) ||
                        visitNode(cbNode, node.fullName);
                }
                else {
                    return visitNode(cbNode, node.fullName) ||
                        visitNode(cbNode, node.typeExpression);
                }
            case 285:
                if (node.jsDocPropertyTags) {
                    for (var _i = 0, _a = node.jsDocPropertyTags; _i < _a.length; _i++) {
                        var tag = _a[_i];
                        visitNode(cbNode, tag);
                    }
                }
                return;
            case 288:
                return visitNode(cbNode, node.expression);
        }
    }
    ts.forEachChild = forEachChild;
    function createSourceFile(fileName, sourceText, languageVersion, setParentNodes, scriptKind) {
        if (setParentNodes === void 0) { setParentNodes = false; }
        ts.performance.mark("beforeParse");
        var result = Parser.parseSourceFile(fileName, sourceText, languageVersion, undefined, setParentNodes, scriptKind);
        ts.performance.mark("afterParse");
        ts.performance.measure("Parse", "beforeParse", "afterParse");
        return result;
    }
    ts.createSourceFile = createSourceFile;
    function parseIsolatedEntityName(text, languageVersion) {
        return Parser.parseIsolatedEntityName(text, languageVersion);
    }
    ts.parseIsolatedEntityName = parseIsolatedEntityName;
    function parseJsonText(fileName, sourceText) {
        return Parser.parseJsonText(fileName, sourceText);
    }
    ts.parseJsonText = parseJsonText;
    function isExternalModule(file) {
        return file.externalModuleIndicator !== undefined;
    }
    ts.isExternalModule = isExternalModule;
    function updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks) {
        var newSourceFile = IncrementalParser.updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
        newSourceFile.flags |= (sourceFile.flags & 524288);
        return newSourceFile;
    }
    ts.updateSourceFile = updateSourceFile;
    function parseIsolatedJSDocComment(content, start, length) {
        var result = Parser.JSDocParser.parseIsolatedJSDocComment(content, start, length);
        if (result && result.jsDoc) {
            Parser.fixupParentReferences(result.jsDoc);
        }
        return result;
    }
    ts.parseIsolatedJSDocComment = parseIsolatedJSDocComment;
    function parseJSDocTypeExpressionForTests(content, start, length) {
        return Parser.JSDocParser.parseJSDocTypeExpressionForTests(content, start, length);
    }
    ts.parseJSDocTypeExpressionForTests = parseJSDocTypeExpressionForTests;
    var Parser;
    (function (Parser) {
        var scanner = ts.createScanner(5, true);
        var disallowInAndDecoratorContext = 2048 | 8192;
        var NodeConstructor;
        var TokenConstructor;
        var IdentifierConstructor;
        var SourceFileConstructor;
        var sourceFile;
        var parseDiagnostics;
        var syntaxCursor;
        var currentToken;
        var sourceText;
        var nodeCount;
        var identifiers;
        var identifierCount;
        var parsingContext;
        var contextFlags;
        var parseErrorBeforeNextFinishedNode = false;
        function parseSourceFile(fileName, sourceText, languageVersion, syntaxCursor, setParentNodes, scriptKind) {
            scriptKind = ts.ensureScriptKind(fileName, scriptKind);
            initializeState(sourceText, languageVersion, syntaxCursor, scriptKind);
            var result = parseSourceFileWorker(fileName, languageVersion, setParentNodes, scriptKind);
            clearState();
            return result;
        }
        Parser.parseSourceFile = parseSourceFile;
        function parseIsolatedEntityName(content, languageVersion) {
            initializeState(content, languageVersion, undefined, 1);
            nextToken();
            var entityName = parseEntityName(true);
            var isInvalid = token() === 1 && !parseDiagnostics.length;
            clearState();
            return isInvalid ? entityName : undefined;
        }
        Parser.parseIsolatedEntityName = parseIsolatedEntityName;
        function parseJsonText(fileName, sourceText) {
            initializeState(sourceText, 2, undefined, 6);
            sourceFile = createSourceFile(fileName, 2, 6);
            var result = sourceFile;
            nextToken();
            if (token() === 1) {
                sourceFile.endOfFileToken = parseTokenNode();
            }
            else if (token() === 17 ||
                lookAhead(function () { return token() === 9; })) {
                result.jsonObject = parseObjectLiteralExpression();
                sourceFile.endOfFileToken = parseExpectedToken(1, false, ts.Diagnostics.Unexpected_token);
            }
            else {
                parseExpected(17);
            }
            sourceFile.parseDiagnostics = parseDiagnostics;
            clearState();
            return result;
        }
        Parser.parseJsonText = parseJsonText;
        function getLanguageVariant(scriptKind) {
            return scriptKind === 4 || scriptKind === 2 || scriptKind === 1 || scriptKind === 6 ? 1 : 0;
        }
        function initializeState(_sourceText, languageVersion, _syntaxCursor, scriptKind) {
            NodeConstructor = ts.objectAllocator.getNodeConstructor();
            TokenConstructor = ts.objectAllocator.getTokenConstructor();
            IdentifierConstructor = ts.objectAllocator.getIdentifierConstructor();
            SourceFileConstructor = ts.objectAllocator.getSourceFileConstructor();
            sourceText = _sourceText;
            syntaxCursor = _syntaxCursor;
            parseDiagnostics = [];
            parsingContext = 0;
            identifiers = ts.createMap();
            identifierCount = 0;
            nodeCount = 0;
            contextFlags = scriptKind === 1 || scriptKind === 2 || scriptKind === 6 ? 65536 : 0;
            parseErrorBeforeNextFinishedNode = false;
            scanner.setText(sourceText);
            scanner.setOnError(scanError);
            scanner.setScriptTarget(languageVersion);
            scanner.setLanguageVariant(getLanguageVariant(scriptKind));
        }
        function clearState() {
            scanner.setText("");
            scanner.setOnError(undefined);
            parseDiagnostics = undefined;
            sourceFile = undefined;
            identifiers = undefined;
            syntaxCursor = undefined;
            sourceText = undefined;
        }
        function parseSourceFileWorker(fileName, languageVersion, setParentNodes, scriptKind) {
            sourceFile = createSourceFile(fileName, languageVersion, scriptKind);
            sourceFile.flags = contextFlags;
            nextToken();
            processReferenceComments(sourceFile);
            sourceFile.statements = parseList(0, parseStatement);
            ts.Debug.assert(token() === 1);
            sourceFile.endOfFileToken = addJSDocComment(parseTokenNode());
            setExternalModuleIndicator(sourceFile);
            sourceFile.nodeCount = nodeCount;
            sourceFile.identifierCount = identifierCount;
            sourceFile.identifiers = identifiers;
            sourceFile.parseDiagnostics = parseDiagnostics;
            if (setParentNodes) {
                fixupParentReferences(sourceFile);
            }
            return sourceFile;
        }
        function addJSDocComment(node) {
            var comments = ts.getJSDocCommentRanges(node, sourceFile.text);
            if (comments) {
                for (var _i = 0, comments_2 = comments; _i < comments_2.length; _i++) {
                    var comment = comments_2[_i];
                    var jsDoc = JSDocParser.parseJSDocComment(node, comment.pos, comment.end - comment.pos);
                    if (!jsDoc) {
                        continue;
                    }
                    if (!node.jsDoc) {
                        node.jsDoc = [];
                    }
                    node.jsDoc.push(jsDoc);
                }
            }
            return node;
        }
        function fixupParentReferences(rootNode) {
            var parent = rootNode;
            forEachChild(rootNode, visitNode);
            return;
            function visitNode(n) {
                if (n.parent !== parent) {
                    n.parent = parent;
                    var saveParent = parent;
                    parent = n;
                    forEachChild(n, visitNode);
                    if (ts.hasJSDocNodes(n)) {
                        for (var _i = 0, _a = n.jsDoc; _i < _a.length; _i++) {
                            var jsDoc = _a[_i];
                            jsDoc.parent = n;
                            parent = jsDoc;
                            forEachChild(jsDoc, visitNode);
                        }
                    }
                    parent = saveParent;
                }
            }
        }
        Parser.fixupParentReferences = fixupParentReferences;
        function createSourceFile(fileName, languageVersion, scriptKind) {
            var sourceFile = new SourceFileConstructor(265, 0, sourceText.length);
            nodeCount++;
            sourceFile.text = sourceText;
            sourceFile.bindDiagnostics = [];
            sourceFile.languageVersion = languageVersion;
            sourceFile.fileName = ts.normalizePath(fileName);
            sourceFile.languageVariant = getLanguageVariant(scriptKind);
            sourceFile.isDeclarationFile = ts.fileExtensionIs(sourceFile.fileName, ".d.ts");
            sourceFile.scriptKind = scriptKind;
            return sourceFile;
        }
        function setContextFlag(val, flag) {
            if (val) {
                contextFlags |= flag;
            }
            else {
                contextFlags &= ~flag;
            }
        }
        function setDisallowInContext(val) {
            setContextFlag(val, 2048);
        }
        function setYieldContext(val) {
            setContextFlag(val, 4096);
        }
        function setDecoratorContext(val) {
            setContextFlag(val, 8192);
        }
        function setAwaitContext(val) {
            setContextFlag(val, 16384);
        }
        function doOutsideOfContext(context, func) {
            var contextFlagsToClear = context & contextFlags;
            if (contextFlagsToClear) {
                setContextFlag(false, contextFlagsToClear);
                var result = func();
                setContextFlag(true, contextFlagsToClear);
                return result;
            }
            return func();
        }
        function doInsideOfContext(context, func) {
            var contextFlagsToSet = context & ~contextFlags;
            if (contextFlagsToSet) {
                setContextFlag(true, contextFlagsToSet);
                var result = func();
                setContextFlag(false, contextFlagsToSet);
                return result;
            }
            return func();
        }
        function allowInAnd(func) {
            return doOutsideOfContext(2048, func);
        }
        function disallowInAnd(func) {
            return doInsideOfContext(2048, func);
        }
        function doInYieldContext(func) {
            return doInsideOfContext(4096, func);
        }
        function doInDecoratorContext(func) {
            return doInsideOfContext(8192, func);
        }
        function doInAwaitContext(func) {
            return doInsideOfContext(16384, func);
        }
        function doOutsideOfAwaitContext(func) {
            return doOutsideOfContext(16384, func);
        }
        function doInYieldAndAwaitContext(func) {
            return doInsideOfContext(4096 | 16384, func);
        }
        function inContext(flags) {
            return (contextFlags & flags) !== 0;
        }
        function inYieldContext() {
            return inContext(4096);
        }
        function inDisallowInContext() {
            return inContext(2048);
        }
        function inDecoratorContext() {
            return inContext(8192);
        }
        function inAwaitContext() {
            return inContext(16384);
        }
        function parseErrorAtCurrentToken(message, arg0) {
            var start = scanner.getTokenPos();
            var length = scanner.getTextPos() - start;
            parseErrorAtPosition(start, length, message, arg0);
        }
        function parseErrorAtPosition(start, length, message, arg0) {
            var lastError = ts.lastOrUndefined(parseDiagnostics);
            if (!lastError || start !== lastError.start) {
                parseDiagnostics.push(ts.createFileDiagnostic(sourceFile, start, length, message, arg0));
            }
            parseErrorBeforeNextFinishedNode = true;
        }
        function scanError(message, length) {
            var pos = scanner.getTextPos();
            parseErrorAtPosition(pos, length || 0, message);
        }
        function getNodePos() {
            return scanner.getStartPos();
        }
        function token() {
            return currentToken;
        }
        function nextToken() {
            return currentToken = scanner.scan();
        }
        function reScanGreaterToken() {
            return currentToken = scanner.reScanGreaterToken();
        }
        function reScanSlashToken() {
            return currentToken = scanner.reScanSlashToken();
        }
        function reScanTemplateToken() {
            return currentToken = scanner.reScanTemplateToken();
        }
        function scanJsxIdentifier() {
            return currentToken = scanner.scanJsxIdentifier();
        }
        function scanJsxText() {
            return currentToken = scanner.scanJsxToken();
        }
        function scanJsxAttributeValue() {
            return currentToken = scanner.scanJsxAttributeValue();
        }
        function speculationHelper(callback, isLookAhead) {
            var saveToken = currentToken;
            var saveParseDiagnosticsLength = parseDiagnostics.length;
            var saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;
            var saveContextFlags = contextFlags;
            var result = isLookAhead
                ? scanner.lookAhead(callback)
                : scanner.tryScan(callback);
            ts.Debug.assert(saveContextFlags === contextFlags);
            if (!result || isLookAhead) {
                currentToken = saveToken;
                parseDiagnostics.length = saveParseDiagnosticsLength;
                parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
            }
            return result;
        }
        function lookAhead(callback) {
            return speculationHelper(callback, true);
        }
        function tryParse(callback) {
            return speculationHelper(callback, false);
        }
        function isIdentifier() {
            if (token() === 71) {
                return true;
            }
            if (token() === 116 && inYieldContext()) {
                return false;
            }
            if (token() === 121 && inAwaitContext()) {
                return false;
            }
            return token() > 107;
        }
        function parseExpected(kind, diagnosticMessage, shouldAdvance) {
            if (shouldAdvance === void 0) { shouldAdvance = true; }
            if (token() === kind) {
                if (shouldAdvance) {
                    nextToken();
                }
                return true;
            }
            if (diagnosticMessage) {
                parseErrorAtCurrentToken(diagnosticMessage);
            }
            else {
                parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(kind));
            }
            return false;
        }
        function parseOptional(t) {
            if (token() === t) {
                nextToken();
                return true;
            }
            return false;
        }
        function parseOptionalToken(t) {
            if (token() === t) {
                return parseTokenNode();
            }
            return undefined;
        }
        function parseExpectedToken(t, reportAtCurrentPosition, diagnosticMessage, arg0) {
            return parseOptionalToken(t) ||
                createMissingNode(t, reportAtCurrentPosition, diagnosticMessage, arg0);
        }
        function parseTokenNode() {
            var node = createNode(token());
            nextToken();
            return finishNode(node);
        }
        function canParseSemicolon() {
            if (token() === 25) {
                return true;
            }
            return token() === 18 || token() === 1 || scanner.hasPrecedingLineBreak();
        }
        function parseSemicolon() {
            if (canParseSemicolon()) {
                if (token() === 25) {
                    nextToken();
                }
                return true;
            }
            else {
                return parseExpected(25);
            }
        }
        function createNode(kind, pos) {
            nodeCount++;
            if (!(pos >= 0)) {
                pos = scanner.getStartPos();
            }
            return ts.isNodeKind(kind) ? new NodeConstructor(kind, pos, pos) :
                kind === 71 ? new IdentifierConstructor(kind, pos, pos) :
                    new TokenConstructor(kind, pos, pos);
        }
        function createNodeArray(elements, pos, end) {
            var length = elements.length;
            var array = (length >= 1 && length <= 4 ? elements.slice() : elements);
            array.pos = pos;
            array.end = end === undefined ? scanner.getStartPos() : end;
            return array;
        }
        function finishNode(node, end) {
            node.end = end === undefined ? scanner.getStartPos() : end;
            if (contextFlags) {
                node.flags |= contextFlags;
            }
            if (parseErrorBeforeNextFinishedNode) {
                parseErrorBeforeNextFinishedNode = false;
                node.flags |= 32768;
            }
            return node;
        }
        function createMissingNode(kind, reportAtCurrentPosition, diagnosticMessage, arg0) {
            if (reportAtCurrentPosition) {
                parseErrorAtPosition(scanner.getStartPos(), 0, diagnosticMessage, arg0);
            }
            else {
                parseErrorAtCurrentToken(diagnosticMessage, arg0);
            }
            var result = createNode(kind, scanner.getStartPos());
            if (kind === 71) {
                result.escapedText = "";
            }
            else if (ts.isLiteralKind(kind) || ts.isTemplateLiteralKind(kind)) {
                result.text = "";
            }
            return finishNode(result);
        }
        function internIdentifier(text) {
            var identifier = identifiers.get(text);
            if (identifier === undefined) {
                identifiers.set(text, identifier = text);
            }
            return identifier;
        }
        function createIdentifier(isIdentifier, diagnosticMessage) {
            identifierCount++;
            if (isIdentifier) {
                var node = createNode(71);
                if (token() !== 71) {
                    node.originalKeywordKind = token();
                }
                node.escapedText = ts.escapeLeadingUnderscores(internIdentifier(scanner.getTokenValue()));
                nextToken();
                return finishNode(node);
            }
            var reportAtCurrentPosition = token() === 1;
            return createMissingNode(71, reportAtCurrentPosition, diagnosticMessage || ts.Diagnostics.Identifier_expected);
        }
        function parseIdentifier(diagnosticMessage) {
            return createIdentifier(isIdentifier(), diagnosticMessage);
        }
        function parseIdentifierName(diagnosticMessage) {
            return createIdentifier(ts.tokenIsIdentifierOrKeyword(token()), diagnosticMessage);
        }
        function isLiteralPropertyName() {
            return ts.tokenIsIdentifierOrKeyword(token()) ||
                token() === 9 ||
                token() === 8;
        }
        function parsePropertyNameWorker(allowComputedPropertyNames) {
            if (token() === 9 || token() === 8) {
                var node = parseLiteralNode();
                node.text = internIdentifier(node.text);
                return node;
            }
            if (allowComputedPropertyNames && token() === 21) {
                return parseComputedPropertyName();
            }
            return parseIdentifierName();
        }
        function parsePropertyName() {
            return parsePropertyNameWorker(true);
        }
        function parseComputedPropertyName() {
            var node = createNode(144);
            parseExpected(21);
            node.expression = allowInAnd(parseExpression);
            parseExpected(22);
            return finishNode(node);
        }
        function parseContextualModifier(t) {
            return token() === t && tryParse(nextTokenCanFollowModifier);
        }
        function nextTokenIsOnSameLineAndCanFollowModifier() {
            nextToken();
            if (scanner.hasPrecedingLineBreak()) {
                return false;
            }
            return canFollowModifier();
        }
        function nextTokenCanFollowModifier() {
            if (token() === 76) {
                return nextToken() === 83;
            }
            if (token() === 84) {
                nextToken();
                if (token() === 79) {
                    return lookAhead(nextTokenCanFollowDefaultKeyword);
                }
                return token() !== 39 && token() !== 118 && token() !== 17 && canFollowModifier();
            }
            if (token() === 79) {
                return nextTokenCanFollowDefaultKeyword();
            }
            if (token() === 115) {
                nextToken();
                return canFollowModifier();
            }
            return nextTokenIsOnSameLineAndCanFollowModifier();
        }
        function parseAnyContextualModifier() {
            return ts.isModifierKind(token()) && tryParse(nextTokenCanFollowModifier);
        }
        function canFollowModifier() {
            return token() === 21
                || token() === 17
                || token() === 39
                || token() === 24
                || isLiteralPropertyName();
        }
        function nextTokenCanFollowDefaultKeyword() {
            nextToken();
            return token() === 75 || token() === 89 ||
                token() === 109 ||
                (token() === 117 && lookAhead(nextTokenIsClassKeywordOnSameLine)) ||
                (token() === 120 && lookAhead(nextTokenIsFunctionKeywordOnSameLine));
        }
        function isListElement(parsingContext, inErrorRecovery) {
            var node = currentNode(parsingContext);
            if (node) {
                return true;
            }
            switch (parsingContext) {
                case 0:
                case 1:
                case 3:
                    return !(token() === 25 && inErrorRecovery) && isStartOfStatement();
                case 2:
                    return token() === 73 || token() === 79;
                case 4:
                    return lookAhead(isTypeMemberStart);
                case 5:
                    return lookAhead(isClassMemberStart) || (token() === 25 && !inErrorRecovery);
                case 6:
                    return token() === 21 || isLiteralPropertyName();
                case 12:
                    return token() === 21 || token() === 39 || token() === 24 || isLiteralPropertyName();
                case 17:
                    return isLiteralPropertyName();
                case 9:
                    return token() === 21 || token() === 24 || isLiteralPropertyName();
                case 7:
                    if (token() === 17) {
                        return lookAhead(isValidHeritageClauseObjectLiteral);
                    }
                    if (!inErrorRecovery) {
                        return isStartOfLeftHandSideExpression() && !isHeritageClauseExtendsOrImplementsKeyword();
                    }
                    else {
                        return isIdentifier() && !isHeritageClauseExtendsOrImplementsKeyword();
                    }
                case 8:
                    return isIdentifierOrPattern();
                case 10:
                    return token() === 26 || token() === 24 || isIdentifierOrPattern();
                case 18:
                    return isIdentifier();
                case 11:
                case 15:
                    return token() === 26 || token() === 24 || isStartOfExpression();
                case 16:
                    return isStartOfParameter();
                case 19:
                case 20:
                    return token() === 26 || isStartOfType();
                case 21:
                    return isHeritageClause();
                case 22:
                    return ts.tokenIsIdentifierOrKeyword(token());
                case 13:
                    return ts.tokenIsIdentifierOrKeyword(token()) || token() === 17;
                case 14:
                    return true;
            }
            ts.Debug.fail("Non-exhaustive case in 'isListElement'.");
        }
        function isValidHeritageClauseObjectLiteral() {
            ts.Debug.assert(token() === 17);
            if (nextToken() === 18) {
                var next = nextToken();
                return next === 26 || next === 17 || next === 85 || next === 108;
            }
            return true;
        }
        function nextTokenIsIdentifier() {
            nextToken();
            return isIdentifier();
        }
        function nextTokenIsIdentifierOrKeyword() {
            nextToken();
            return ts.tokenIsIdentifierOrKeyword(token());
        }
        function isHeritageClauseExtendsOrImplementsKeyword() {
            if (token() === 108 ||
                token() === 85) {
                return lookAhead(nextTokenIsStartOfExpression);
            }
            return false;
        }
        function nextTokenIsStartOfExpression() {
            nextToken();
            return isStartOfExpression();
        }
        function isListTerminator(kind) {
            if (token() === 1) {
                return true;
            }
            switch (kind) {
                case 1:
                case 2:
                case 4:
                case 5:
                case 6:
                case 12:
                case 9:
                case 22:
                    return token() === 18;
                case 3:
                    return token() === 18 || token() === 73 || token() === 79;
                case 7:
                    return token() === 17 || token() === 85 || token() === 108;
                case 8:
                    return isVariableDeclaratorListTerminator();
                case 18:
                    return token() === 29 || token() === 19 || token() === 17 || token() === 85 || token() === 108;
                case 11:
                    return token() === 20 || token() === 25;
                case 15:
                case 20:
                case 10:
                    return token() === 22;
                case 16:
                case 17:
                    return token() === 20 || token() === 22;
                case 19:
                    return token() !== 26;
                case 21:
                    return token() === 17 || token() === 18;
                case 13:
                    return token() === 29 || token() === 41;
                case 14:
                    return token() === 27 && lookAhead(nextTokenIsSlash);
            }
        }
        function isVariableDeclaratorListTerminator() {
            if (canParseSemicolon()) {
                return true;
            }
            if (isInOrOfKeyword(token())) {
                return true;
            }
            if (token() === 36) {
                return true;
            }
            return false;
        }
        function isInSomeParsingContext() {
            for (var kind = 0; kind < 23; kind++) {
                if (parsingContext & (1 << kind)) {
                    if (isListElement(kind, true) || isListTerminator(kind)) {
                        return true;
                    }
                }
            }
            return false;
        }
        function parseList(kind, parseElement) {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var list = [];
            var listPos = getNodePos();
            while (!isListTerminator(kind)) {
                if (isListElement(kind, false)) {
                    var element = parseListElement(kind, parseElement);
                    list.push(element);
                    continue;
                }
                if (abortParsingListOrMoveToNextToken(kind)) {
                    break;
                }
            }
            parsingContext = saveParsingContext;
            return createNodeArray(list, listPos);
        }
        function parseListElement(parsingContext, parseElement) {
            var node = currentNode(parsingContext);
            if (node) {
                return consumeNode(node);
            }
            return parseElement();
        }
        function currentNode(parsingContext) {
            if (parseErrorBeforeNextFinishedNode) {
                return undefined;
            }
            if (!syntaxCursor) {
                return undefined;
            }
            var node = syntaxCursor.currentNode(scanner.getStartPos());
            if (ts.nodeIsMissing(node)) {
                return undefined;
            }
            if (node.intersectsChange) {
                return undefined;
            }
            if (ts.containsParseError(node)) {
                return undefined;
            }
            var nodeContextFlags = node.flags & 96256;
            if (nodeContextFlags !== contextFlags) {
                return undefined;
            }
            if (!canReuseNode(node, parsingContext)) {
                return undefined;
            }
            return node;
        }
        function consumeNode(node) {
            scanner.setTextPos(node.end);
            nextToken();
            return node;
        }
        function canReuseNode(node, parsingContext) {
            switch (parsingContext) {
                case 5:
                    return isReusableClassMember(node);
                case 2:
                    return isReusableSwitchClause(node);
                case 0:
                case 1:
                case 3:
                    return isReusableStatement(node);
                case 6:
                    return isReusableEnumMember(node);
                case 4:
                    return isReusableTypeMember(node);
                case 8:
                    return isReusableVariableDeclaration(node);
                case 16:
                    return isReusableParameter(node);
                case 17:
                    return false;
                case 21:
                case 18:
                case 20:
                case 19:
                case 11:
                case 12:
                case 7:
                case 13:
                case 14:
            }
            return false;
        }
        function isReusableClassMember(node) {
            if (node) {
                switch (node.kind) {
                    case 152:
                    case 157:
                    case 153:
                    case 154:
                    case 149:
                    case 206:
                        return true;
                    case 151:
                        var methodDeclaration = node;
                        var nameIsConstructor = methodDeclaration.name.kind === 71 &&
                            methodDeclaration.name.originalKeywordKind === 123;
                        return !nameIsConstructor;
                }
            }
            return false;
        }
        function isReusableSwitchClause(node) {
            if (node) {
                switch (node.kind) {
                    case 257:
                    case 258:
                        return true;
                }
            }
            return false;
        }
        function isReusableStatement(node) {
            if (node) {
                switch (node.kind) {
                    case 228:
                    case 208:
                    case 207:
                    case 211:
                    case 210:
                    case 223:
                    case 219:
                    case 221:
                    case 218:
                    case 217:
                    case 215:
                    case 216:
                    case 214:
                    case 213:
                    case 220:
                    case 209:
                    case 224:
                    case 222:
                    case 212:
                    case 225:
                    case 238:
                    case 237:
                    case 244:
                    case 243:
                    case 233:
                    case 229:
                    case 230:
                    case 232:
                    case 231:
                        return true;
                }
            }
            return false;
        }
        function isReusableEnumMember(node) {
            return node.kind === 264;
        }
        function isReusableTypeMember(node) {
            if (node) {
                switch (node.kind) {
                    case 156:
                    case 150:
                    case 157:
                    case 148:
                    case 155:
                        return true;
                }
            }
            return false;
        }
        function isReusableVariableDeclaration(node) {
            if (node.kind !== 226) {
                return false;
            }
            var variableDeclarator = node;
            return variableDeclarator.initializer === undefined;
        }
        function isReusableParameter(node) {
            if (node.kind !== 146) {
                return false;
            }
            var parameter = node;
            return parameter.initializer === undefined;
        }
        function abortParsingListOrMoveToNextToken(kind) {
            parseErrorAtCurrentToken(parsingContextErrors(kind));
            if (isInSomeParsingContext()) {
                return true;
            }
            nextToken();
            return false;
        }
        function parsingContextErrors(context) {
            switch (context) {
                case 0: return ts.Diagnostics.Declaration_or_statement_expected;
                case 1: return ts.Diagnostics.Declaration_or_statement_expected;
                case 2: return ts.Diagnostics.case_or_default_expected;
                case 3: return ts.Diagnostics.Statement_expected;
                case 17:
                case 4: return ts.Diagnostics.Property_or_signature_expected;
                case 5: return ts.Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected;
                case 6: return ts.Diagnostics.Enum_member_expected;
                case 7: return ts.Diagnostics.Expression_expected;
                case 8: return ts.Diagnostics.Variable_declaration_expected;
                case 9: return ts.Diagnostics.Property_destructuring_pattern_expected;
                case 10: return ts.Diagnostics.Array_element_destructuring_pattern_expected;
                case 11: return ts.Diagnostics.Argument_expression_expected;
                case 12: return ts.Diagnostics.Property_assignment_expected;
                case 15: return ts.Diagnostics.Expression_or_comma_expected;
                case 16: return ts.Diagnostics.Parameter_declaration_expected;
                case 18: return ts.Diagnostics.Type_parameter_declaration_expected;
                case 19: return ts.Diagnostics.Type_argument_expected;
                case 20: return ts.Diagnostics.Type_expected;
                case 21: return ts.Diagnostics.Unexpected_token_expected;
                case 22: return ts.Diagnostics.Identifier_expected;
                case 13: return ts.Diagnostics.Identifier_expected;
                case 14: return ts.Diagnostics.Identifier_expected;
            }
        }
        function parseDelimitedList(kind, parseElement, considerSemicolonAsDelimiter) {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var list = [];
            var listPos = getNodePos();
            var commaStart = -1;
            while (true) {
                if (isListElement(kind, false)) {
                    var startPos = scanner.getStartPos();
                    list.push(parseListElement(kind, parseElement));
                    commaStart = scanner.getTokenPos();
                    if (parseOptional(26)) {
                        continue;
                    }
                    commaStart = -1;
                    if (isListTerminator(kind)) {
                        break;
                    }
                    parseExpected(26);
                    if (considerSemicolonAsDelimiter && token() === 25 && !scanner.hasPrecedingLineBreak()) {
                        nextToken();
                    }
                    if (startPos === scanner.getStartPos()) {
                        nextToken();
                    }
                    continue;
                }
                if (isListTerminator(kind)) {
                    break;
                }
                if (abortParsingListOrMoveToNextToken(kind)) {
                    break;
                }
            }
            parsingContext = saveParsingContext;
            var result = createNodeArray(list, listPos);
            if (commaStart >= 0) {
                result.hasTrailingComma = true;
            }
            return result;
        }
        function createMissingList() {
            return createNodeArray([], getNodePos());
        }
        function parseBracketedList(kind, parseElement, open, close) {
            if (parseExpected(open)) {
                var result = parseDelimitedList(kind, parseElement);
                parseExpected(close);
                return result;
            }
            return createMissingList();
        }
        function parseEntityName(allowReservedWords, diagnosticMessage) {
            var entity = allowReservedWords ? parseIdentifierName(diagnosticMessage) : parseIdentifier(diagnosticMessage);
            var dotPos = scanner.getStartPos();
            while (parseOptional(23)) {
                if (token() === 27) {
                    entity.jsdocDotPos = dotPos;
                    break;
                }
                dotPos = scanner.getStartPos();
                entity = createQualifiedName(entity, parseRightSideOfDot(allowReservedWords));
            }
            return entity;
        }
        function createQualifiedName(entity, name) {
            var node = createNode(143, entity.pos);
            node.left = entity;
            node.right = name;
            return finishNode(node);
        }
        function parseRightSideOfDot(allowIdentifierNames) {
            if (scanner.hasPrecedingLineBreak() && ts.tokenIsIdentifierOrKeyword(token())) {
                var matchesPattern = lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);
                if (matchesPattern) {
                    return createMissingNode(71, true, ts.Diagnostics.Identifier_expected);
                }
            }
            return allowIdentifierNames ? parseIdentifierName() : parseIdentifier();
        }
        function parseTemplateExpression() {
            var template = createNode(196);
            template.head = parseTemplateHead();
            ts.Debug.assert(template.head.kind === 14, "Template head has wrong token kind");
            var list = [];
            var listPos = getNodePos();
            do {
                list.push(parseTemplateSpan());
            } while (ts.lastOrUndefined(list).literal.kind === 15);
            template.templateSpans = createNodeArray(list, listPos);
            return finishNode(template);
        }
        function parseTemplateSpan() {
            var span = createNode(205);
            span.expression = allowInAnd(parseExpression);
            var literal;
            if (token() === 18) {
                reScanTemplateToken();
                literal = parseTemplateMiddleOrTemplateTail();
            }
            else {
                literal = parseExpectedToken(16, false, ts.Diagnostics._0_expected, ts.tokenToString(18));
            }
            span.literal = literal;
            return finishNode(span);
        }
        function parseLiteralNode() {
            return parseLiteralLikeNode(token());
        }
        function parseTemplateHead() {
            var fragment = parseLiteralLikeNode(token());
            ts.Debug.assert(fragment.kind === 14, "Template head has wrong token kind");
            return fragment;
        }
        function parseTemplateMiddleOrTemplateTail() {
            var fragment = parseLiteralLikeNode(token());
            ts.Debug.assert(fragment.kind === 15 || fragment.kind === 16, "Template fragment has wrong token kind");
            return fragment;
        }
        function parseLiteralLikeNode(kind) {
            var node = createNode(kind);
            var text = scanner.getTokenValue();
            node.text = text;
            if (scanner.hasExtendedUnicodeEscape()) {
                node.hasExtendedUnicodeEscape = true;
            }
            if (scanner.isUnterminated()) {
                node.isUnterminated = true;
            }
            if (node.kind === 8) {
                node.numericLiteralFlags = scanner.getNumericLiteralFlags();
            }
            nextToken();
            finishNode(node);
            return node;
        }
        function parseTypeReference() {
            var node = createNode(159);
            node.typeName = parseEntityName(true, ts.Diagnostics.Type_expected);
            if (!scanner.hasPrecedingLineBreak() && token() === 27) {
                node.typeArguments = parseBracketedList(19, parseType, 27, 29);
            }
            return finishNode(node);
        }
        function parseThisTypePredicate(lhs) {
            nextToken();
            var node = createNode(158, lhs.pos);
            node.parameterName = lhs;
            node.type = parseType();
            return finishNode(node);
        }
        function parseThisTypeNode() {
            var node = createNode(169);
            nextToken();
            return finishNode(node);
        }
        function parseJSDocAllType() {
            var result = createNode(268);
            nextToken();
            return finishNode(result);
        }
        function parseJSDocUnknownOrNullableType() {
            var pos = scanner.getStartPos();
            nextToken();
            if (token() === 26 ||
                token() === 18 ||
                token() === 20 ||
                token() === 29 ||
                token() === 58 ||
                token() === 49) {
                var result = createNode(269, pos);
                return finishNode(result);
            }
            else {
                var result = createNode(270, pos);
                result.type = parseType();
                return finishNode(result);
            }
        }
        function parseJSDocFunctionType() {
            if (lookAhead(nextTokenIsOpenParen)) {
                var result = createNode(273);
                nextToken();
                fillSignature(56, 4 | 32, result);
                return addJSDocComment(finishNode(result));
            }
            var node = createNode(159);
            node.typeName = parseIdentifierName();
            return finishNode(node);
        }
        function parseJSDocParameter() {
            var parameter = createNode(146);
            if (token() === 99 || token() === 94) {
                parameter.name = parseIdentifierName();
                parseExpected(56);
            }
            parameter.type = parseType();
            return finishNode(parameter);
        }
        function parseJSDocNodeWithType(kind) {
            var result = createNode(kind);
            nextToken();
            result.type = parseNonArrayType();
            return finishNode(result);
        }
        function parseTypeQuery() {
            var node = createNode(162);
            parseExpected(103);
            node.exprName = parseEntityName(true);
            return finishNode(node);
        }
        function parseTypeParameter() {
            var node = createNode(145);
            node.name = parseIdentifier();
            if (parseOptional(85)) {
                if (isStartOfType() || !isStartOfExpression()) {
                    node.constraint = parseType();
                }
                else {
                    node.expression = parseUnaryExpressionOrHigher();
                }
            }
            if (parseOptional(58)) {
                node.default = parseType();
            }
            return finishNode(node);
        }
        function parseTypeParameters() {
            if (token() === 27) {
                return parseBracketedList(18, parseTypeParameter, 27, 29);
            }
        }
        function parseParameterType() {
            if (parseOptional(56)) {
                return parseType();
            }
            return undefined;
        }
        function isStartOfParameter() {
            return token() === 24 ||
                isIdentifierOrPattern() ||
                ts.isModifierKind(token()) ||
                token() === 57 ||
                isStartOfType(true);
        }
        function parseParameter(requireEqualsToken) {
            var node = createNode(146);
            if (token() === 99) {
                node.name = createIdentifier(true);
                node.type = parseParameterType();
                return finishNode(node);
            }
            node.decorators = parseDecorators();
            node.modifiers = parseModifiers();
            node.dotDotDotToken = parseOptionalToken(24);
            node.name = parseIdentifierOrPattern();
            if (ts.getFullWidth(node.name) === 0 && !ts.hasModifiers(node) && ts.isModifierKind(token())) {
                nextToken();
            }
            node.questionToken = parseOptionalToken(55);
            node.type = parseParameterType();
            node.initializer = parseInitializer(true, requireEqualsToken);
            return addJSDocComment(finishNode(node));
        }
        function fillSignature(returnToken, flags, signature) {
            if (!(flags & 32)) {
                signature.typeParameters = parseTypeParameters();
            }
            signature.parameters = parseParameterList(flags);
            signature.type = parseReturnType(returnToken, !!(flags & 4));
        }
        function parseReturnType(returnToken, isType) {
            return shouldParseReturnType(returnToken, isType) ? parseTypeOrTypePredicate() : undefined;
        }
        function shouldParseReturnType(returnToken, isType) {
            if (returnToken === 36) {
                parseExpected(returnToken);
                return true;
            }
            else if (parseOptional(56)) {
                return true;
            }
            else if (isType && token() === 36) {
                parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(56));
                nextToken();
                return true;
            }
            return false;
        }
        function parseParameterList(flags) {
            if (parseExpected(19)) {
                var savedYieldContext = inYieldContext();
                var savedAwaitContext = inAwaitContext();
                setYieldContext(!!(flags & 1));
                setAwaitContext(!!(flags & 2));
                var result = parseDelimitedList(16, flags & 32 ? parseJSDocParameter : function () { return parseParameter(!!(flags & 8)); });
                setYieldContext(savedYieldContext);
                setAwaitContext(savedAwaitContext);
                if (!parseExpected(20) && (flags & 8)) {
                    return undefined;
                }
                return result;
            }
            return (flags & 8) ? undefined : createMissingList();
        }
        function parseTypeMemberSemicolon() {
            if (parseOptional(26)) {
                return;
            }
            parseSemicolon();
        }
        function parseSignatureMember(kind) {
            var node = createNode(kind);
            if (kind === 156) {
                parseExpected(94);
            }
            fillSignature(56, 4, node);
            parseTypeMemberSemicolon();
            return addJSDocComment(finishNode(node));
        }
        function isIndexSignature() {
            if (token() !== 21) {
                return false;
            }
            return lookAhead(isUnambiguouslyIndexSignature);
        }
        function isUnambiguouslyIndexSignature() {
            nextToken();
            if (token() === 24 || token() === 22) {
                return true;
            }
            if (ts.isModifierKind(token())) {
                nextToken();
                if (isIdentifier()) {
                    return true;
                }
            }
            else if (!isIdentifier()) {
                return false;
            }
            else {
                nextToken();
            }
            if (token() === 56 || token() === 26) {
                return true;
            }
            if (token() !== 55) {
                return false;
            }
            nextToken();
            return token() === 56 || token() === 26 || token() === 22;
        }
        function parseIndexSignatureDeclaration(fullStart, decorators, modifiers) {
            var node = createNode(157, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            node.parameters = parseBracketedList(16, parseParameter, 21, 22);
            node.type = parseTypeAnnotation();
            parseTypeMemberSemicolon();
            return addJSDocComment(finishNode(node));
        }
        function parsePropertyOrMethodSignature(fullStart, modifiers) {
            var name = parsePropertyName();
            var questionToken = parseOptionalToken(55);
            if (token() === 19 || token() === 27) {
                var method = createNode(150, fullStart);
                method.modifiers = modifiers;
                method.name = name;
                method.questionToken = questionToken;
                fillSignature(56, 4, method);
                parseTypeMemberSemicolon();
                return addJSDocComment(finishNode(method));
            }
            else {
                var property = createNode(148, fullStart);
                property.modifiers = modifiers;
                property.name = name;
                property.questionToken = questionToken;
                property.type = parseTypeAnnotation();
                if (token() === 58) {
                    property.initializer = parseNonParameterInitializer();
                }
                parseTypeMemberSemicolon();
                return addJSDocComment(finishNode(property));
            }
        }
        function isTypeMemberStart() {
            if (token() === 19 || token() === 27) {
                return true;
            }
            var idToken;
            while (ts.isModifierKind(token())) {
                idToken = true;
                nextToken();
            }
            if (token() === 21) {
                return true;
            }
            if (isLiteralPropertyName()) {
                idToken = true;
                nextToken();
            }
            if (idToken) {
                return token() === 19 ||
                    token() === 27 ||
                    token() === 55 ||
                    token() === 56 ||
                    token() === 26 ||
                    canParseSemicolon();
            }
            return false;
        }
        function parseTypeMember() {
            if (token() === 19 || token() === 27) {
                return parseSignatureMember(155);
            }
            if (token() === 94 && lookAhead(nextTokenIsOpenParenOrLessThan)) {
                return parseSignatureMember(156);
            }
            var fullStart = getNodePos();
            var modifiers = parseModifiers();
            if (isIndexSignature()) {
                return parseIndexSignatureDeclaration(fullStart, undefined, modifiers);
            }
            return parsePropertyOrMethodSignature(fullStart, modifiers);
        }
        function nextTokenIsOpenParenOrLessThan() {
            nextToken();
            return token() === 19 || token() === 27;
        }
        function parseTypeLiteral() {
            var node = createNode(163);
            node.members = parseObjectTypeMembers();
            return finishNode(node);
        }
        function parseObjectTypeMembers() {
            var members;
            if (parseExpected(17)) {
                members = parseList(4, parseTypeMember);
                parseExpected(18);
            }
            else {
                members = createMissingList();
            }
            return members;
        }
        function isStartOfMappedType() {
            nextToken();
            if (token() === 131) {
                nextToken();
            }
            return token() === 21 && nextTokenIsIdentifier() && nextToken() === 92;
        }
        function parseMappedTypeParameter() {
            var node = createNode(145);
            node.name = parseIdentifier();
            parseExpected(92);
            node.constraint = parseType();
            return finishNode(node);
        }
        function parseMappedType() {
            var node = createNode(172);
            parseExpected(17);
            node.readonlyToken = parseOptionalToken(131);
            parseExpected(21);
            node.typeParameter = parseMappedTypeParameter();
            parseExpected(22);
            node.questionToken = parseOptionalToken(55);
            node.type = parseTypeAnnotation();
            parseSemicolon();
            parseExpected(18);
            return finishNode(node);
        }
        function parseTupleType() {
            var node = createNode(165);
            node.elementTypes = parseBracketedList(20, parseType, 21, 22);
            return finishNode(node);
        }
        function parseParenthesizedType() {
            var node = createNode(168);
            parseExpected(19);
            node.type = parseType();
            parseExpected(20);
            return finishNode(node);
        }
        function parseFunctionOrConstructorType(kind) {
            var node = createNode(kind);
            if (kind === 161) {
                parseExpected(94);
            }
            fillSignature(36, 4, node);
            return addJSDocComment(finishNode(node));
        }
        function parseKeywordAndNoDot() {
            var node = parseTokenNode();
            return token() === 23 ? undefined : node;
        }
        function parseLiteralTypeNode(negative) {
            var node = createNode(173);
            var unaryMinusExpression;
            if (negative) {
                unaryMinusExpression = createNode(192);
                unaryMinusExpression.operator = 38;
                nextToken();
            }
            var expression = token() === 101 || token() === 86
                ? parseTokenNode()
                : parseLiteralLikeNode(token());
            if (negative) {
                unaryMinusExpression.operand = expression;
                finishNode(unaryMinusExpression);
                expression = unaryMinusExpression;
            }
            node.literal = expression;
            return finishNode(node);
        }
        function nextTokenIsNumericLiteral() {
            return nextToken() === 8;
        }
        function parseNonArrayType() {
            switch (token()) {
                case 119:
                case 136:
                case 133:
                case 122:
                case 137:
                case 139:
                case 130:
                case 134:
                    return tryParse(parseKeywordAndNoDot) || parseTypeReference();
                case 39:
                    return parseJSDocAllType();
                case 55:
                    return parseJSDocUnknownOrNullableType();
                case 89:
                    return parseJSDocFunctionType();
                case 24:
                    return parseJSDocNodeWithType(274);
                case 51:
                    return parseJSDocNodeWithType(271);
                case 13:
                case 9:
                case 8:
                case 101:
                case 86:
                    return parseLiteralTypeNode();
                case 38:
                    return lookAhead(nextTokenIsNumericLiteral) ? parseLiteralTypeNode(true) : parseTypeReference();
                case 105:
                case 95:
                    return parseTokenNode();
                case 99: {
                    var thisKeyword = parseThisTypeNode();
                    if (token() === 126 && !scanner.hasPrecedingLineBreak()) {
                        return parseThisTypePredicate(thisKeyword);
                    }
                    else {
                        return thisKeyword;
                    }
                }
                case 103:
                    return parseTypeQuery();
                case 17:
                    return lookAhead(isStartOfMappedType) ? parseMappedType() : parseTypeLiteral();
                case 21:
                    return parseTupleType();
                case 19:
                    return parseParenthesizedType();
                default:
                    return parseTypeReference();
            }
        }
        function isStartOfType(inStartOfParameter) {
            switch (token()) {
                case 119:
                case 136:
                case 133:
                case 122:
                case 137:
                case 105:
                case 139:
                case 95:
                case 99:
                case 103:
                case 130:
                case 17:
                case 21:
                case 27:
                case 49:
                case 48:
                case 94:
                case 9:
                case 8:
                case 101:
                case 86:
                case 134:
                case 39:
                case 55:
                case 51:
                case 24:
                    return true;
                case 38:
                    return !inStartOfParameter && lookAhead(nextTokenIsNumericLiteral);
                case 19:
                    return !inStartOfParameter && lookAhead(isStartOfParenthesizedOrFunctionType);
                default:
                    return isIdentifier();
            }
        }
        function isStartOfParenthesizedOrFunctionType() {
            nextToken();
            return token() === 20 || isStartOfParameter() || isStartOfType();
        }
        function parsePostfixTypeOrHigher() {
            var type = parseNonArrayType();
            while (!scanner.hasPrecedingLineBreak()) {
                switch (token()) {
                    case 58:
                        if (!(contextFlags & 1048576)) {
                            return type;
                        }
                        type = createJSDocPostfixType(272, type);
                        break;
                    case 51:
                        type = createJSDocPostfixType(271, type);
                        break;
                    case 55:
                        type = createJSDocPostfixType(270, type);
                        break;
                    case 21:
                        parseExpected(21);
                        if (isStartOfType()) {
                            var node = createNode(171, type.pos);
                            node.objectType = type;
                            node.indexType = parseType();
                            parseExpected(22);
                            type = finishNode(node);
                        }
                        else {
                            var node = createNode(164, type.pos);
                            node.elementType = type;
                            parseExpected(22);
                            type = finishNode(node);
                        }
                        break;
                    default:
                        return type;
                }
            }
            return type;
        }
        function createJSDocPostfixType(kind, type) {
            nextToken();
            var postfix = createNode(kind, type.pos);
            postfix.type = type;
            return finishNode(postfix);
        }
        function parseTypeOperator(operator) {
            var node = createNode(170);
            parseExpected(operator);
            node.operator = operator;
            node.type = parseTypeOperatorOrHigher();
            return finishNode(node);
        }
        function parseTypeOperatorOrHigher() {
            switch (token()) {
                case 127:
                    return parseTypeOperator(127);
            }
            return parsePostfixTypeOrHigher();
        }
        function parseUnionOrIntersectionType(kind, parseConstituentType, operator) {
            parseOptional(operator);
            var type = parseConstituentType();
            if (token() === operator) {
                var types = [type];
                while (parseOptional(operator)) {
                    types.push(parseConstituentType());
                }
                var node = createNode(kind, type.pos);
                node.types = createNodeArray(types, type.pos);
                type = finishNode(node);
            }
            return type;
        }
        function parseIntersectionTypeOrHigher() {
            return parseUnionOrIntersectionType(167, parseTypeOperatorOrHigher, 48);
        }
        function parseUnionTypeOrHigher() {
            return parseUnionOrIntersectionType(166, parseIntersectionTypeOrHigher, 49);
        }
        function isStartOfFunctionType() {
            if (token() === 27) {
                return true;
            }
            return token() === 19 && lookAhead(isUnambiguouslyStartOfFunctionType);
        }
        function skipParameterStart() {
            if (ts.isModifierKind(token())) {
                parseModifiers();
            }
            if (isIdentifier() || token() === 99) {
                nextToken();
                return true;
            }
            if (token() === 21 || token() === 17) {
                var previousErrorCount = parseDiagnostics.length;
                parseIdentifierOrPattern();
                return previousErrorCount === parseDiagnostics.length;
            }
            return false;
        }
        function isUnambiguouslyStartOfFunctionType() {
            nextToken();
            if (token() === 20 || token() === 24) {
                return true;
            }
            if (skipParameterStart()) {
                if (token() === 56 || token() === 26 ||
                    token() === 55 || token() === 58) {
                    return true;
                }
                if (token() === 20) {
                    nextToken();
                    if (token() === 36) {
                        return true;
                    }
                }
            }
            return false;
        }
        function parseTypeOrTypePredicate() {
            var typePredicateVariable = isIdentifier() && tryParse(parseTypePredicatePrefix);
            var type = parseType();
            if (typePredicateVariable) {
                var node = createNode(158, typePredicateVariable.pos);
                node.parameterName = typePredicateVariable;
                node.type = type;
                return finishNode(node);
            }
            else {
                return type;
            }
        }
        function parseTypePredicatePrefix() {
            var id = parseIdentifier();
            if (token() === 126 && !scanner.hasPrecedingLineBreak()) {
                nextToken();
                return id;
            }
        }
        function parseType() {
            return doOutsideOfContext(20480, parseTypeWorker);
        }
        function parseTypeWorker() {
            if (isStartOfFunctionType()) {
                return parseFunctionOrConstructorType(160);
            }
            if (token() === 94) {
                return parseFunctionOrConstructorType(161);
            }
            return parseUnionTypeOrHigher();
        }
        function parseTypeAnnotation() {
            return parseOptional(56) ? parseType() : undefined;
        }
        function isStartOfLeftHandSideExpression() {
            switch (token()) {
                case 99:
                case 97:
                case 95:
                case 101:
                case 86:
                case 8:
                case 9:
                case 13:
                case 14:
                case 19:
                case 21:
                case 17:
                case 89:
                case 75:
                case 94:
                case 41:
                case 63:
                case 71:
                    return true;
                case 91:
                    return lookAhead(nextTokenIsOpenParenOrLessThan);
                default:
                    return isIdentifier();
            }
        }
        function isStartOfExpression() {
            if (isStartOfLeftHandSideExpression()) {
                return true;
            }
            switch (token()) {
                case 37:
                case 38:
                case 52:
                case 51:
                case 80:
                case 103:
                case 105:
                case 43:
                case 44:
                case 27:
                case 121:
                case 116:
                    return true;
                default:
                    if (isBinaryOperator()) {
                        return true;
                    }
                    return isIdentifier();
            }
        }
        function isStartOfExpressionStatement() {
            return token() !== 17 &&
                token() !== 89 &&
                token() !== 75 &&
                token() !== 57 &&
                isStartOfExpression();
        }
        function parseExpression() {
            var saveDecoratorContext = inDecoratorContext();
            if (saveDecoratorContext) {
                setDecoratorContext(false);
            }
            var expr = parseAssignmentExpressionOrHigher();
            var operatorToken;
            while ((operatorToken = parseOptionalToken(26))) {
                expr = makeBinaryExpression(expr, operatorToken, parseAssignmentExpressionOrHigher());
            }
            if (saveDecoratorContext) {
                setDecoratorContext(true);
            }
            return expr;
        }
        function parseInitializer(inParameter, requireEqualsToken) {
            if (token() !== 58) {
                if (scanner.hasPrecedingLineBreak() || (inParameter && token() === 17) || !isStartOfExpression()) {
                    return undefined;
                }
                if (inParameter && requireEqualsToken) {
                    var result = createMissingNode(71, true, ts.Diagnostics._0_expected, "=");
                    result.escapedText = "= not found";
                    return result;
                }
            }
            parseExpected(58);
            return parseAssignmentExpressionOrHigher();
        }
        function parseAssignmentExpressionOrHigher() {
            if (isYieldExpression()) {
                return parseYieldExpression();
            }
            var arrowExpression = tryParseParenthesizedArrowFunctionExpression() || tryParseAsyncSimpleArrowFunctionExpression();
            if (arrowExpression) {
                return arrowExpression;
            }
            var expr = parseBinaryExpressionOrHigher(0);
            if (expr.kind === 71 && token() === 36) {
                return parseSimpleArrowFunctionExpression(expr);
            }
            if (ts.isLeftHandSideExpression(expr) && ts.isAssignmentOperator(reScanGreaterToken())) {
                return makeBinaryExpression(expr, parseTokenNode(), parseAssignmentExpressionOrHigher());
            }
            return parseConditionalExpressionRest(expr);
        }
        function isYieldExpression() {
            if (token() === 116) {
                if (inYieldContext()) {
                    return true;
                }
                return lookAhead(nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine);
            }
            return false;
        }
        function nextTokenIsIdentifierOnSameLine() {
            nextToken();
            return !scanner.hasPrecedingLineBreak() && isIdentifier();
        }
        function parseYieldExpression() {
            var node = createNode(197);
            nextToken();
            if (!scanner.hasPrecedingLineBreak() &&
                (token() === 39 || isStartOfExpression())) {
                node.asteriskToken = parseOptionalToken(39);
                node.expression = parseAssignmentExpressionOrHigher();
                return finishNode(node);
            }
            else {
                return finishNode(node);
            }
        }
        function parseSimpleArrowFunctionExpression(identifier, asyncModifier) {
            ts.Debug.assert(token() === 36, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
            var node;
            if (asyncModifier) {
                node = createNode(187, asyncModifier.pos);
                node.modifiers = asyncModifier;
            }
            else {
                node = createNode(187, identifier.pos);
            }
            var parameter = createNode(146, identifier.pos);
            parameter.name = identifier;
            finishNode(parameter);
            node.parameters = createNodeArray([parameter], parameter.pos, parameter.end);
            node.equalsGreaterThanToken = parseExpectedToken(36, false, ts.Diagnostics._0_expected, "=>");
            node.body = parseArrowFunctionExpressionBody(!!asyncModifier);
            return addJSDocComment(finishNode(node));
        }
        function tryParseParenthesizedArrowFunctionExpression() {
            var triState = isParenthesizedArrowFunctionExpression();
            if (triState === 0) {
                return undefined;
            }
            var arrowFunction = triState === 1
                ? parseParenthesizedArrowFunctionExpressionHead(true)
                : tryParse(parsePossibleParenthesizedArrowFunctionExpressionHead);
            if (!arrowFunction) {
                return undefined;
            }
            var isAsync = ts.hasModifier(arrowFunction, 256);
            var lastToken = token();
            arrowFunction.equalsGreaterThanToken = parseExpectedToken(36, false, ts.Diagnostics._0_expected, "=>");
            arrowFunction.body = (lastToken === 36 || lastToken === 17)
                ? parseArrowFunctionExpressionBody(isAsync)
                : parseIdentifier();
            return addJSDocComment(finishNode(arrowFunction));
        }
        function isParenthesizedArrowFunctionExpression() {
            if (token() === 19 || token() === 27 || token() === 120) {
                return lookAhead(isParenthesizedArrowFunctionExpressionWorker);
            }
            if (token() === 36) {
                return 1;
            }
            return 0;
        }
        function isParenthesizedArrowFunctionExpressionWorker() {
            if (token() === 120) {
                nextToken();
                if (scanner.hasPrecedingLineBreak()) {
                    return 0;
                }
                if (token() !== 19 && token() !== 27) {
                    return 0;
                }
            }
            var first = token();
            var second = nextToken();
            if (first === 19) {
                if (second === 20) {
                    var third = nextToken();
                    switch (third) {
                        case 36:
                        case 56:
                        case 17:
                            return 1;
                        default:
                            return 0;
                    }
                }
                if (second === 21 || second === 17) {
                    return 2;
                }
                if (second === 24) {
                    return 1;
                }
                if (!isIdentifier()) {
                    return 0;
                }
                if (nextToken() === 56) {
                    return 1;
                }
                return 2;
            }
            else {
                ts.Debug.assert(first === 27);
                if (!isIdentifier()) {
                    return 0;
                }
                if (sourceFile.languageVariant === 1) {
                    var isArrowFunctionInJsx = lookAhead(function () {
                        var third = nextToken();
                        if (third === 85) {
                            var fourth = nextToken();
                            switch (fourth) {
                                case 58:
                                case 29:
                                    return false;
                                default:
                                    return true;
                            }
                        }
                        else if (third === 26) {
                            return true;
                        }
                        return false;
                    });
                    if (isArrowFunctionInJsx) {
                        return 1;
                    }
                    return 0;
                }
                return 2;
            }
        }
        function parsePossibleParenthesizedArrowFunctionExpressionHead() {
            return parseParenthesizedArrowFunctionExpressionHead(false);
        }
        function tryParseAsyncSimpleArrowFunctionExpression() {
            if (token() === 120) {
                if (lookAhead(isUnParenthesizedAsyncArrowFunctionWorker) === 1) {
                    var asyncModifier = parseModifiersForArrowFunction();
                    var expr = parseBinaryExpressionOrHigher(0);
                    return parseSimpleArrowFunctionExpression(expr, asyncModifier);
                }
            }
            return undefined;
        }
        function isUnParenthesizedAsyncArrowFunctionWorker() {
            if (token() === 120) {
                nextToken();
                if (scanner.hasPrecedingLineBreak() || token() === 36) {
                    return 0;
                }
                var expr = parseBinaryExpressionOrHigher(0);
                if (!scanner.hasPrecedingLineBreak() && expr.kind === 71 && token() === 36) {
                    return 1;
                }
            }
            return 0;
        }
        function parseParenthesizedArrowFunctionExpressionHead(allowAmbiguity) {
            var node = createNode(187);
            node.modifiers = parseModifiersForArrowFunction();
            var isAsync = ts.hasModifier(node, 256) ? 2 : 0;
            fillSignature(56, isAsync | (allowAmbiguity ? 0 : 8), node);
            if (!node.parameters) {
                return undefined;
            }
            if (!allowAmbiguity && ((token() !== 36 && token() !== 17) ||
                ts.find(node.parameters, function (p) { return p.initializer && ts.isIdentifier(p.initializer) && p.initializer.escapedText === "= not found"; }))) {
                return undefined;
            }
            return node;
        }
        function parseArrowFunctionExpressionBody(isAsync) {
            if (token() === 17) {
                return parseFunctionBlock(isAsync ? 2 : 0);
            }
            if (token() !== 25 &&
                token() !== 89 &&
                token() !== 75 &&
                isStartOfStatement() &&
                !isStartOfExpressionStatement()) {
                return parseFunctionBlock(16 | (isAsync ? 2 : 0));
            }
            return isAsync
                ? doInAwaitContext(parseAssignmentExpressionOrHigher)
                : doOutsideOfAwaitContext(parseAssignmentExpressionOrHigher);
        }
        function parseConditionalExpressionRest(leftOperand) {
            var questionToken = parseOptionalToken(55);
            if (!questionToken) {
                return leftOperand;
            }
            var node = createNode(195, leftOperand.pos);
            node.condition = leftOperand;
            node.questionToken = questionToken;
            node.whenTrue = doOutsideOfContext(disallowInAndDecoratorContext, parseAssignmentExpressionOrHigher);
            node.colonToken = parseExpectedToken(56, false, ts.Diagnostics._0_expected, ts.tokenToString(56));
            node.whenFalse = parseAssignmentExpressionOrHigher();
            return finishNode(node);
        }
        function parseBinaryExpressionOrHigher(precedence) {
            var leftOperand = parseUnaryExpressionOrHigher();
            return parseBinaryExpressionRest(precedence, leftOperand);
        }
        function isInOrOfKeyword(t) {
            return t === 92 || t === 142;
        }
        function parseBinaryExpressionRest(precedence, leftOperand) {
            while (true) {
                reScanGreaterToken();
                var newPrecedence = getBinaryOperatorPrecedence();
                var consumeCurrentOperator = token() === 40 ?
                    newPrecedence >= precedence :
                    newPrecedence > precedence;
                if (!consumeCurrentOperator) {
                    break;
                }
                if (token() === 92 && inDisallowInContext()) {
                    break;
                }
                if (token() === 118) {
                    if (scanner.hasPrecedingLineBreak()) {
                        break;
                    }
                    else {
                        nextToken();
                        leftOperand = makeAsExpression(leftOperand, parseType());
                    }
                }
                else {
                    leftOperand = makeBinaryExpression(leftOperand, parseTokenNode(), parseBinaryExpressionOrHigher(newPrecedence));
                }
            }
            return leftOperand;
        }
        function isBinaryOperator() {
            if (inDisallowInContext() && token() === 92) {
                return false;
            }
            return getBinaryOperatorPrecedence() > 0;
        }
        function getBinaryOperatorPrecedence() {
            switch (token()) {
                case 54:
                    return 1;
                case 53:
                    return 2;
                case 49:
                    return 3;
                case 50:
                    return 4;
                case 48:
                    return 5;
                case 32:
                case 33:
                case 34:
                case 35:
                    return 6;
                case 27:
                case 29:
                case 30:
                case 31:
                case 93:
                case 92:
                case 118:
                    return 7;
                case 45:
                case 46:
                case 47:
                    return 8;
                case 37:
                case 38:
                    return 9;
                case 39:
                case 41:
                case 42:
                    return 10;
                case 40:
                    return 11;
            }
            return -1;
        }
        function makeBinaryExpression(left, operatorToken, right) {
            var node = createNode(194, left.pos);
            node.left = left;
            node.operatorToken = operatorToken;
            node.right = right;
            return finishNode(node);
        }
        function makeAsExpression(left, right) {
            var node = createNode(202, left.pos);
            node.expression = left;
            node.type = right;
            return finishNode(node);
        }
        function parsePrefixUnaryExpression() {
            var node = createNode(192);
            node.operator = token();
            nextToken();
            node.operand = parseSimpleUnaryExpression();
            return finishNode(node);
        }
        function parseDeleteExpression() {
            var node = createNode(188);
            nextToken();
            node.expression = parseSimpleUnaryExpression();
            return finishNode(node);
        }
        function parseTypeOfExpression() {
            var node = createNode(189);
            nextToken();
            node.expression = parseSimpleUnaryExpression();
            return finishNode(node);
        }
        function parseVoidExpression() {
            var node = createNode(190);
            nextToken();
            node.expression = parseSimpleUnaryExpression();
            return finishNode(node);
        }
        function isAwaitExpression() {
            if (token() === 121) {
                if (inAwaitContext()) {
                    return true;
                }
                return lookAhead(nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine);
            }
            return false;
        }
        function parseAwaitExpression() {
            var node = createNode(191);
            nextToken();
            node.expression = parseSimpleUnaryExpression();
            return finishNode(node);
        }
        function parseUnaryExpressionOrHigher() {
            if (isUpdateExpression()) {
                var updateExpression = parseUpdateExpression();
                return token() === 40 ?
                    parseBinaryExpressionRest(getBinaryOperatorPrecedence(), updateExpression) :
                    updateExpression;
            }
            var unaryOperator = token();
            var simpleUnaryExpression = parseSimpleUnaryExpression();
            if (token() === 40) {
                var start = ts.skipTrivia(sourceText, simpleUnaryExpression.pos);
                if (simpleUnaryExpression.kind === 184) {
                    parseErrorAtPosition(start, simpleUnaryExpression.end - start, ts.Diagnostics.A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses);
                }
                else {
                    parseErrorAtPosition(start, simpleUnaryExpression.end - start, ts.Diagnostics.An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses, ts.tokenToString(unaryOperator));
                }
            }
            return simpleUnaryExpression;
        }
        function parseSimpleUnaryExpression() {
            switch (token()) {
                case 37:
                case 38:
                case 52:
                case 51:
                    return parsePrefixUnaryExpression();
                case 80:
                    return parseDeleteExpression();
                case 103:
                    return parseTypeOfExpression();
                case 105:
                    return parseVoidExpression();
                case 27:
                    return parseTypeAssertion();
                case 121:
                    if (isAwaitExpression()) {
                        return parseAwaitExpression();
                    }
                default:
                    return parseUpdateExpression();
            }
        }
        function isUpdateExpression() {
            switch (token()) {
                case 37:
                case 38:
                case 52:
                case 51:
                case 80:
                case 103:
                case 105:
                case 121:
                    return false;
                case 27:
                    if (sourceFile.languageVariant !== 1) {
                        return false;
                    }
                default:
                    return true;
            }
        }
        function parseUpdateExpression() {
            if (token() === 43 || token() === 44) {
                var node = createNode(192);
                node.operator = token();
                nextToken();
                node.operand = parseLeftHandSideExpressionOrHigher();
                return finishNode(node);
            }
            else if (sourceFile.languageVariant === 1 && token() === 27 && lookAhead(nextTokenIsIdentifierOrKeyword)) {
                return parseJsxElementOrSelfClosingElement(true);
            }
            var expression = parseLeftHandSideExpressionOrHigher();
            ts.Debug.assert(ts.isLeftHandSideExpression(expression));
            if ((token() === 43 || token() === 44) && !scanner.hasPrecedingLineBreak()) {
                var node = createNode(193, expression.pos);
                node.operand = expression;
                node.operator = token();
                nextToken();
                return finishNode(node);
            }
            return expression;
        }
        function parseLeftHandSideExpressionOrHigher() {
            var expression;
            if (token() === 91 && lookAhead(nextTokenIsOpenParenOrLessThan)) {
                sourceFile.flags |= 524288;
                expression = parseTokenNode();
            }
            else {
                expression = token() === 97 ? parseSuperExpression() : parseMemberExpressionOrHigher();
            }
            return parseCallExpressionRest(expression);
        }
        function parseMemberExpressionOrHigher() {
            var expression = parsePrimaryExpression();
            return parseMemberExpressionRest(expression);
        }
        function parseSuperExpression() {
            var expression = parseTokenNode();
            if (token() === 19 || token() === 23 || token() === 21) {
                return expression;
            }
            var node = createNode(179, expression.pos);
            node.expression = expression;
            parseExpectedToken(23, false, ts.Diagnostics.super_must_be_followed_by_an_argument_list_or_member_access);
            node.name = parseRightSideOfDot(true);
            return finishNode(node);
        }
        function tagNamesAreEquivalent(lhs, rhs) {
            if (lhs.kind !== rhs.kind) {
                return false;
            }
            if (lhs.kind === 71) {
                return lhs.escapedText === rhs.escapedText;
            }
            if (lhs.kind === 99) {
                return true;
            }
            return lhs.name.escapedText === rhs.name.escapedText &&
                tagNamesAreEquivalent(lhs.expression, rhs.expression);
        }
        function parseJsxElementOrSelfClosingElement(inExpressionContext) {
            var opening = parseJsxOpeningOrSelfClosingElement(inExpressionContext);
            var result;
            if (opening.kind === 251) {
                var node = createNode(249, opening.pos);
                node.openingElement = opening;
                node.children = parseJsxChildren(node.openingElement.tagName);
                node.closingElement = parseJsxClosingElement(inExpressionContext);
                if (!tagNamesAreEquivalent(node.openingElement.tagName, node.closingElement.tagName)) {
                    parseErrorAtPosition(node.closingElement.pos, node.closingElement.end - node.closingElement.pos, ts.Diagnostics.Expected_corresponding_JSX_closing_tag_for_0, ts.getTextOfNodeFromSourceText(sourceText, node.openingElement.tagName));
                }
                result = finishNode(node);
            }
            else {
                ts.Debug.assert(opening.kind === 250);
                result = opening;
            }
            if (inExpressionContext && token() === 27) {
                var invalidElement = tryParse(function () { return parseJsxElementOrSelfClosingElement(true); });
                if (invalidElement) {
                    parseErrorAtCurrentToken(ts.Diagnostics.JSX_expressions_must_have_one_parent_element);
                    var badNode = createNode(194, result.pos);
                    badNode.end = invalidElement.end;
                    badNode.left = result;
                    badNode.right = invalidElement;
                    badNode.operatorToken = createMissingNode(26, false, undefined);
                    badNode.operatorToken.pos = badNode.operatorToken.end = badNode.right.pos;
                    return badNode;
                }
            }
            return result;
        }
        function parseJsxText() {
            var node = createNode(10, scanner.getStartPos());
            node.containsOnlyWhiteSpaces = currentToken === 11;
            currentToken = scanner.scanJsxToken();
            return finishNode(node);
        }
        function parseJsxChild() {
            switch (token()) {
                case 10:
                case 11:
                    return parseJsxText();
                case 17:
                    return parseJsxExpression(false);
                case 27:
                    return parseJsxElementOrSelfClosingElement(false);
            }
            ts.Debug.fail("Unknown JSX child kind " + token());
        }
        function parseJsxChildren(openingTagName) {
            var list = [];
            var listPos = getNodePos();
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << 14;
            while (true) {
                currentToken = scanner.reScanJsxToken();
                if (token() === 28) {
                    break;
                }
                else if (token() === 1) {
                    parseErrorAtPosition(openingTagName.pos, openingTagName.end - openingTagName.pos, ts.Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, ts.getTextOfNodeFromSourceText(sourceText, openingTagName));
                    break;
                }
                else if (token() === 7) {
                    break;
                }
                var child = parseJsxChild();
                if (child) {
                    list.push(child);
                }
            }
            parsingContext = saveParsingContext;
            return createNodeArray(list, listPos);
        }
        function parseJsxAttributes() {
            var jsxAttributes = createNode(254);
            jsxAttributes.properties = parseList(13, parseJsxAttribute);
            return finishNode(jsxAttributes);
        }
        function parseJsxOpeningOrSelfClosingElement(inExpressionContext) {
            var fullStart = scanner.getStartPos();
            parseExpected(27);
            var tagName = parseJsxElementName();
            var attributes = parseJsxAttributes();
            var node;
            if (token() === 29) {
                node = createNode(251, fullStart);
                scanJsxText();
            }
            else {
                parseExpected(41);
                if (inExpressionContext) {
                    parseExpected(29);
                }
                else {
                    parseExpected(29, undefined, false);
                    scanJsxText();
                }
                node = createNode(250, fullStart);
            }
            node.tagName = tagName;
            node.attributes = attributes;
            return finishNode(node);
        }
        function parseJsxElementName() {
            scanJsxIdentifier();
            var expression = token() === 99 ?
                parseTokenNode() : parseIdentifierName();
            while (parseOptional(23)) {
                var propertyAccess = createNode(179, expression.pos);
                propertyAccess.expression = expression;
                propertyAccess.name = parseRightSideOfDot(true);
                expression = finishNode(propertyAccess);
            }
            return expression;
        }
        function parseJsxExpression(inExpressionContext) {
            var node = createNode(256);
            parseExpected(17);
            if (token() !== 18) {
                node.dotDotDotToken = parseOptionalToken(24);
                node.expression = parseAssignmentExpressionOrHigher();
            }
            if (inExpressionContext) {
                parseExpected(18);
            }
            else {
                parseExpected(18, undefined, false);
                scanJsxText();
            }
            return finishNode(node);
        }
        function parseJsxAttribute() {
            if (token() === 17) {
                return parseJsxSpreadAttribute();
            }
            scanJsxIdentifier();
            var node = createNode(253);
            node.name = parseIdentifierName();
            if (token() === 58) {
                switch (scanJsxAttributeValue()) {
                    case 9:
                        node.initializer = parseLiteralNode();
                        break;
                    default:
                        node.initializer = parseJsxExpression(true);
                        break;
                }
            }
            return finishNode(node);
        }
        function parseJsxSpreadAttribute() {
            var node = createNode(255);
            parseExpected(17);
            parseExpected(24);
            node.expression = parseExpression();
            parseExpected(18);
            return finishNode(node);
        }
        function parseJsxClosingElement(inExpressionContext) {
            var node = createNode(252);
            parseExpected(28);
            node.tagName = parseJsxElementName();
            if (inExpressionContext) {
                parseExpected(29);
            }
            else {
                parseExpected(29, undefined, false);
                scanJsxText();
            }
            return finishNode(node);
        }
        function parseTypeAssertion() {
            var node = createNode(184);
            parseExpected(27);
            node.type = parseType();
            parseExpected(29);
            node.expression = parseSimpleUnaryExpression();
            return finishNode(node);
        }
        function parseMemberExpressionRest(expression) {
            while (true) {
                var dotToken = parseOptionalToken(23);
                if (dotToken) {
                    var propertyAccess = createNode(179, expression.pos);
                    propertyAccess.expression = expression;
                    propertyAccess.name = parseRightSideOfDot(true);
                    expression = finishNode(propertyAccess);
                    continue;
                }
                if (token() === 51 && !scanner.hasPrecedingLineBreak()) {
                    nextToken();
                    var nonNullExpression = createNode(203, expression.pos);
                    nonNullExpression.expression = expression;
                    expression = finishNode(nonNullExpression);
                    continue;
                }
                if (!inDecoratorContext() && parseOptional(21)) {
                    var indexedAccess = createNode(180, expression.pos);
                    indexedAccess.expression = expression;
                    if (token() !== 22) {
                        indexedAccess.argumentExpression = allowInAnd(parseExpression);
                        if (indexedAccess.argumentExpression.kind === 9 || indexedAccess.argumentExpression.kind === 8) {
                            var literal = indexedAccess.argumentExpression;
                            literal.text = internIdentifier(literal.text);
                        }
                    }
                    parseExpected(22);
                    expression = finishNode(indexedAccess);
                    continue;
                }
                if (token() === 13 || token() === 14) {
                    var tagExpression = createNode(183, expression.pos);
                    tagExpression.tag = expression;
                    tagExpression.template = token() === 13
                        ? parseLiteralNode()
                        : parseTemplateExpression();
                    expression = finishNode(tagExpression);
                    continue;
                }
                return expression;
            }
        }
        function parseCallExpressionRest(expression) {
            while (true) {
                expression = parseMemberExpressionRest(expression);
                if (token() === 27) {
                    var typeArguments = tryParse(parseTypeArgumentsInExpression);
                    if (!typeArguments) {
                        return expression;
                    }
                    var callExpr = createNode(181, expression.pos);
                    callExpr.expression = expression;
                    callExpr.typeArguments = typeArguments;
                    callExpr.arguments = parseArgumentList();
                    expression = finishNode(callExpr);
                    continue;
                }
                else if (token() === 19) {
                    var callExpr = createNode(181, expression.pos);
                    callExpr.expression = expression;
                    callExpr.arguments = parseArgumentList();
                    expression = finishNode(callExpr);
                    continue;
                }
                return expression;
            }
        }
        function parseArgumentList() {
            parseExpected(19);
            var result = parseDelimitedList(11, parseArgumentExpression);
            parseExpected(20);
            return result;
        }
        function parseTypeArgumentsInExpression() {
            if (!parseOptional(27)) {
                return undefined;
            }
            var typeArguments = parseDelimitedList(19, parseType);
            if (!parseExpected(29)) {
                return undefined;
            }
            return typeArguments && canFollowTypeArgumentsInExpression()
                ? typeArguments
                : undefined;
        }
        function canFollowTypeArgumentsInExpression() {
            switch (token()) {
                case 19:
                case 23:
                case 20:
                case 22:
                case 56:
                case 25:
                case 55:
                case 32:
                case 34:
                case 33:
                case 35:
                case 53:
                case 54:
                case 50:
                case 48:
                case 49:
                case 18:
                case 1:
                    return true;
                case 26:
                case 17:
                default:
                    return false;
            }
        }
        function parsePrimaryExpression() {
            switch (token()) {
                case 8:
                case 9:
                case 13:
                    return parseLiteralNode();
                case 99:
                case 97:
                case 95:
                case 101:
                case 86:
                    return parseTokenNode();
                case 19:
                    return parseParenthesizedExpression();
                case 21:
                    return parseArrayLiteralExpression();
                case 17:
                    return parseObjectLiteralExpression();
                case 120:
                    if (!lookAhead(nextTokenIsFunctionKeywordOnSameLine)) {
                        break;
                    }
                    return parseFunctionExpression();
                case 75:
                    return parseClassExpression();
                case 89:
                    return parseFunctionExpression();
                case 94:
                    return parseNewExpression();
                case 41:
                case 63:
                    if (reScanSlashToken() === 12) {
                        return parseLiteralNode();
                    }
                    break;
                case 14:
                    return parseTemplateExpression();
            }
            return parseIdentifier(ts.Diagnostics.Expression_expected);
        }
        function parseParenthesizedExpression() {
            var node = createNode(185);
            parseExpected(19);
            node.expression = allowInAnd(parseExpression);
            parseExpected(20);
            return addJSDocComment(finishNode(node));
        }
        function parseSpreadElement() {
            var node = createNode(198);
            parseExpected(24);
            node.expression = parseAssignmentExpressionOrHigher();
            return finishNode(node);
        }
        function parseArgumentOrArrayLiteralElement() {
            return token() === 24 ? parseSpreadElement() :
                token() === 26 ? createNode(200) :
                    parseAssignmentExpressionOrHigher();
        }
        function parseArgumentExpression() {
            return doOutsideOfContext(disallowInAndDecoratorContext, parseArgumentOrArrayLiteralElement);
        }
        function parseArrayLiteralExpression() {
            var node = createNode(177);
            parseExpected(21);
            if (scanner.hasPrecedingLineBreak()) {
                node.multiLine = true;
            }
            node.elements = parseDelimitedList(15, parseArgumentOrArrayLiteralElement);
            parseExpected(22);
            return finishNode(node);
        }
        function tryParseAccessorDeclaration(fullStart, decorators, modifiers) {
            if (parseContextualModifier(125)) {
                return parseAccessorDeclaration(153, fullStart, decorators, modifiers);
            }
            else if (parseContextualModifier(135)) {
                return parseAccessorDeclaration(154, fullStart, decorators, modifiers);
            }
            return undefined;
        }
        function parseObjectLiteralElement() {
            var fullStart = scanner.getStartPos();
            var dotDotDotToken = parseOptionalToken(24);
            if (dotDotDotToken) {
                var spreadElement = createNode(263, fullStart);
                spreadElement.expression = parseAssignmentExpressionOrHigher();
                return addJSDocComment(finishNode(spreadElement));
            }
            var decorators = parseDecorators();
            var modifiers = parseModifiers();
            var accessor = tryParseAccessorDeclaration(fullStart, decorators, modifiers);
            if (accessor) {
                return accessor;
            }
            var asteriskToken = parseOptionalToken(39);
            var tokenIsIdentifier = isIdentifier();
            var propertyName = parsePropertyName();
            var questionToken = parseOptionalToken(55);
            if (asteriskToken || token() === 19 || token() === 27) {
                return parseMethodDeclaration(fullStart, decorators, modifiers, asteriskToken, propertyName, questionToken);
            }
            var isShorthandPropertyAssignment = tokenIsIdentifier && (token() === 26 || token() === 18 || token() === 58);
            if (isShorthandPropertyAssignment) {
                var shorthandDeclaration = createNode(262, fullStart);
                shorthandDeclaration.name = propertyName;
                shorthandDeclaration.questionToken = questionToken;
                var equalsToken = parseOptionalToken(58);
                if (equalsToken) {
                    shorthandDeclaration.equalsToken = equalsToken;
                    shorthandDeclaration.objectAssignmentInitializer = allowInAnd(parseAssignmentExpressionOrHigher);
                }
                return addJSDocComment(finishNode(shorthandDeclaration));
            }
            else {
                var propertyAssignment = createNode(261, fullStart);
                propertyAssignment.modifiers = modifiers;
                propertyAssignment.name = propertyName;
                propertyAssignment.questionToken = questionToken;
                parseExpected(56);
                propertyAssignment.initializer = allowInAnd(parseAssignmentExpressionOrHigher);
                return addJSDocComment(finishNode(propertyAssignment));
            }
        }
        function parseObjectLiteralExpression() {
            var node = createNode(178);
            parseExpected(17);
            if (scanner.hasPrecedingLineBreak()) {
                node.multiLine = true;
            }
            node.properties = parseDelimitedList(12, parseObjectLiteralElement, true);
            parseExpected(18);
            return finishNode(node);
        }
        function parseFunctionExpression() {
            var saveDecoratorContext = inDecoratorContext();
            if (saveDecoratorContext) {
                setDecoratorContext(false);
            }
            var node = createNode(186);
            node.modifiers = parseModifiers();
            parseExpected(89);
            node.asteriskToken = parseOptionalToken(39);
            var isGenerator = node.asteriskToken ? 1 : 0;
            var isAsync = ts.hasModifier(node, 256) ? 2 : 0;
            node.name =
                isGenerator && isAsync ? doInYieldAndAwaitContext(parseOptionalIdentifier) :
                    isGenerator ? doInYieldContext(parseOptionalIdentifier) :
                        isAsync ? doInAwaitContext(parseOptionalIdentifier) :
                            parseOptionalIdentifier();
            fillSignature(56, isGenerator | isAsync, node);
            node.body = parseFunctionBlock(isGenerator | isAsync);
            if (saveDecoratorContext) {
                setDecoratorContext(true);
            }
            return addJSDocComment(finishNode(node));
        }
        function parseOptionalIdentifier() {
            return isIdentifier() ? parseIdentifier() : undefined;
        }
        function parseNewExpression() {
            var fullStart = scanner.getStartPos();
            parseExpected(94);
            if (parseOptional(23)) {
                var node_1 = createNode(204, fullStart);
                node_1.keywordToken = 94;
                node_1.name = parseIdentifierName();
                return finishNode(node_1);
            }
            var node = createNode(182, fullStart);
            node.expression = parseMemberExpressionOrHigher();
            node.typeArguments = tryParse(parseTypeArgumentsInExpression);
            if (node.typeArguments || token() === 19) {
                node.arguments = parseArgumentList();
            }
            return finishNode(node);
        }
        function parseBlock(ignoreMissingOpenBrace, diagnosticMessage) {
            var node = createNode(207);
            if (parseExpected(17, diagnosticMessage) || ignoreMissingOpenBrace) {
                if (scanner.hasPrecedingLineBreak()) {
                    node.multiLine = true;
                }
                node.statements = parseList(1, parseStatement);
                parseExpected(18);
            }
            else {
                node.statements = createMissingList();
            }
            return finishNode(node);
        }
        function parseFunctionBlock(flags, diagnosticMessage) {
            var savedYieldContext = inYieldContext();
            setYieldContext(!!(flags & 1));
            var savedAwaitContext = inAwaitContext();
            setAwaitContext(!!(flags & 2));
            var saveDecoratorContext = inDecoratorContext();
            if (saveDecoratorContext) {
                setDecoratorContext(false);
            }
            var block = parseBlock(!!(flags & 16), diagnosticMessage);
            if (saveDecoratorContext) {
                setDecoratorContext(true);
            }
            setYieldContext(savedYieldContext);
            setAwaitContext(savedAwaitContext);
            return block;
        }
        function parseEmptyStatement() {
            var node = createNode(209);
            parseExpected(25);
            return finishNode(node);
        }
        function parseIfStatement() {
            var node = createNode(211);
            parseExpected(90);
            parseExpected(19);
            node.expression = allowInAnd(parseExpression);
            parseExpected(20);
            node.thenStatement = parseStatement();
            node.elseStatement = parseOptional(82) ? parseStatement() : undefined;
            return finishNode(node);
        }
        function parseDoStatement() {
            var node = createNode(212);
            parseExpected(81);
            node.statement = parseStatement();
            parseExpected(106);
            parseExpected(19);
            node.expression = allowInAnd(parseExpression);
            parseExpected(20);
            parseOptional(25);
            return finishNode(node);
        }
        function parseWhileStatement() {
            var node = createNode(213);
            parseExpected(106);
            parseExpected(19);
            node.expression = allowInAnd(parseExpression);
            parseExpected(20);
            node.statement = parseStatement();
            return finishNode(node);
        }
        function parseForOrForInOrForOfStatement() {
            var pos = getNodePos();
            parseExpected(88);
            var awaitToken = parseOptionalToken(121);
            parseExpected(19);
            var initializer = undefined;
            if (token() !== 25) {
                if (token() === 104 || token() === 110 || token() === 76) {
                    initializer = parseVariableDeclarationList(true);
                }
                else {
                    initializer = disallowInAnd(parseExpression);
                }
            }
            var forOrForInOrForOfStatement;
            if (awaitToken ? parseExpected(142) : parseOptional(142)) {
                var forOfStatement = createNode(216, pos);
                forOfStatement.awaitModifier = awaitToken;
                forOfStatement.initializer = initializer;
                forOfStatement.expression = allowInAnd(parseAssignmentExpressionOrHigher);
                parseExpected(20);
                forOrForInOrForOfStatement = forOfStatement;
            }
            else if (parseOptional(92)) {
                var forInStatement = createNode(215, pos);
                forInStatement.initializer = initializer;
                forInStatement.expression = allowInAnd(parseExpression);
                parseExpected(20);
                forOrForInOrForOfStatement = forInStatement;
            }
            else {
                var forStatement = createNode(214, pos);
                forStatement.initializer = initializer;
                parseExpected(25);
                if (token() !== 25 && token() !== 20) {
                    forStatement.condition = allowInAnd(parseExpression);
                }
                parseExpected(25);
                if (token() !== 20) {
                    forStatement.incrementor = allowInAnd(parseExpression);
                }
                parseExpected(20);
                forOrForInOrForOfStatement = forStatement;
            }
            forOrForInOrForOfStatement.statement = parseStatement();
            return finishNode(forOrForInOrForOfStatement);
        }
        function parseBreakOrContinueStatement(kind) {
            var node = createNode(kind);
            parseExpected(kind === 218 ? 72 : 77);
            if (!canParseSemicolon()) {
                node.label = parseIdentifier();
            }
            parseSemicolon();
            return finishNode(node);
        }
        function parseReturnStatement() {
            var node = createNode(219);
            parseExpected(96);
            if (!canParseSemicolon()) {
                node.expression = allowInAnd(parseExpression);
            }
            parseSemicolon();
            return finishNode(node);
        }
        function parseWithStatement() {
            var node = createNode(220);
            parseExpected(107);
            parseExpected(19);
            node.expression = allowInAnd(parseExpression);
            parseExpected(20);
            node.statement = parseStatement();
            return finishNode(node);
        }
        function parseCaseClause() {
            var node = createNode(257);
            parseExpected(73);
            node.expression = allowInAnd(parseExpression);
            parseExpected(56);
            node.statements = parseList(3, parseStatement);
            return finishNode(node);
        }
        function parseDefaultClause() {
            var node = createNode(258);
            parseExpected(79);
            parseExpected(56);
            node.statements = parseList(3, parseStatement);
            return finishNode(node);
        }
        function parseCaseOrDefaultClause() {
            return token() === 73 ? parseCaseClause() : parseDefaultClause();
        }
        function parseSwitchStatement() {
            var node = createNode(221);
            parseExpected(98);
            parseExpected(19);
            node.expression = allowInAnd(parseExpression);
            parseExpected(20);
            var caseBlock = createNode(235, scanner.getStartPos());
            parseExpected(17);
            caseBlock.clauses = parseList(2, parseCaseOrDefaultClause);
            parseExpected(18);
            node.caseBlock = finishNode(caseBlock);
            return finishNode(node);
        }
        function parseThrowStatement() {
            var node = createNode(223);
            parseExpected(100);
            node.expression = scanner.hasPrecedingLineBreak() ? undefined : allowInAnd(parseExpression);
            parseSemicolon();
            return finishNode(node);
        }
        function parseTryStatement() {
            var node = createNode(224);
            parseExpected(102);
            node.tryBlock = parseBlock(false);
            node.catchClause = token() === 74 ? parseCatchClause() : undefined;
            if (!node.catchClause || token() === 87) {
                parseExpected(87);
                node.finallyBlock = parseBlock(false);
            }
            return finishNode(node);
        }
        function parseCatchClause() {
            var result = createNode(260);
            parseExpected(74);
            if (parseOptional(19)) {
                result.variableDeclaration = parseVariableDeclaration();
                parseExpected(20);
            }
            else {
                result.variableDeclaration = undefined;
            }
            result.block = parseBlock(false);
            return finishNode(result);
        }
        function parseDebuggerStatement() {
            var node = createNode(225);
            parseExpected(78);
            parseSemicolon();
            return finishNode(node);
        }
        function parseExpressionOrLabeledStatement() {
            var fullStart = scanner.getStartPos();
            var expression = allowInAnd(parseExpression);
            if (expression.kind === 71 && parseOptional(56)) {
                var labeledStatement = createNode(222, fullStart);
                labeledStatement.label = expression;
                labeledStatement.statement = parseStatement();
                return addJSDocComment(finishNode(labeledStatement));
            }
            else {
                var expressionStatement = createNode(210, fullStart);
                expressionStatement.expression = expression;
                parseSemicolon();
                return addJSDocComment(finishNode(expressionStatement));
            }
        }
        function nextTokenIsIdentifierOrKeywordOnSameLine() {
            nextToken();
            return ts.tokenIsIdentifierOrKeyword(token()) && !scanner.hasPrecedingLineBreak();
        }
        function nextTokenIsClassKeywordOnSameLine() {
            nextToken();
            return token() === 75 && !scanner.hasPrecedingLineBreak();
        }
        function nextTokenIsFunctionKeywordOnSameLine() {
            nextToken();
            return token() === 89 && !scanner.hasPrecedingLineBreak();
        }
        function nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine() {
            nextToken();
            return (ts.tokenIsIdentifierOrKeyword(token()) || token() === 8 || token() === 9) && !scanner.hasPrecedingLineBreak();
        }
        function isDeclaration() {
            while (true) {
                switch (token()) {
                    case 104:
                    case 110:
                    case 76:
                    case 89:
                    case 75:
                    case 83:
                        return true;
                    case 109:
                    case 138:
                        return nextTokenIsIdentifierOnSameLine();
                    case 128:
                    case 129:
                        return nextTokenIsIdentifierOrStringLiteralOnSameLine();
                    case 117:
                    case 120:
                    case 124:
                    case 112:
                    case 113:
                    case 114:
                    case 131:
                        nextToken();
                        if (scanner.hasPrecedingLineBreak()) {
                            return false;
                        }
                        continue;
                    case 141:
                        nextToken();
                        return token() === 17 || token() === 71 || token() === 84;
                    case 91:
                        nextToken();
                        return token() === 9 || token() === 39 ||
                            token() === 17 || ts.tokenIsIdentifierOrKeyword(token());
                    case 84:
                        nextToken();
                        if (token() === 58 || token() === 39 ||
                            token() === 17 || token() === 79 ||
                            token() === 118) {
                            return true;
                        }
                        continue;
                    case 115:
                        nextToken();
                        continue;
                    default:
                        return false;
                }
            }
        }
        function isStartOfDeclaration() {
            return lookAhead(isDeclaration);
        }
        function isStartOfStatement() {
            switch (token()) {
                case 57:
                case 25:
                case 17:
                case 104:
                case 110:
                case 89:
                case 75:
                case 83:
                case 90:
                case 81:
                case 106:
                case 88:
                case 77:
                case 72:
                case 96:
                case 107:
                case 98:
                case 100:
                case 102:
                case 78:
                case 74:
                case 87:
                    return true;
                case 91:
                    return isStartOfDeclaration() || lookAhead(nextTokenIsOpenParenOrLessThan);
                case 76:
                case 84:
                    return isStartOfDeclaration();
                case 120:
                case 124:
                case 109:
                case 128:
                case 129:
                case 138:
                case 141:
                    return true;
                case 114:
                case 112:
                case 113:
                case 115:
                case 131:
                    return isStartOfDeclaration() || !lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);
                default:
                    return isStartOfExpression();
            }
        }
        function nextTokenIsIdentifierOrStartOfDestructuring() {
            nextToken();
            return isIdentifier() || token() === 17 || token() === 21;
        }
        function isLetDeclaration() {
            return lookAhead(nextTokenIsIdentifierOrStartOfDestructuring);
        }
        function parseStatement() {
            switch (token()) {
                case 25:
                    return parseEmptyStatement();
                case 17:
                    return parseBlock(false);
                case 104:
                    return parseVariableStatement(scanner.getStartPos(), undefined, undefined);
                case 110:
                    if (isLetDeclaration()) {
                        return parseVariableStatement(scanner.getStartPos(), undefined, undefined);
                    }
                    break;
                case 89:
                    return parseFunctionDeclaration(scanner.getStartPos(), undefined, undefined);
                case 75:
                    return parseClassDeclaration(scanner.getStartPos(), undefined, undefined);
                case 90:
                    return parseIfStatement();
                case 81:
                    return parseDoStatement();
                case 106:
                    return parseWhileStatement();
                case 88:
                    return parseForOrForInOrForOfStatement();
                case 77:
                    return parseBreakOrContinueStatement(217);
                case 72:
                    return parseBreakOrContinueStatement(218);
                case 96:
                    return parseReturnStatement();
                case 107:
                    return parseWithStatement();
                case 98:
                    return parseSwitchStatement();
                case 100:
                    return parseThrowStatement();
                case 102:
                case 74:
                case 87:
                    return parseTryStatement();
                case 78:
                    return parseDebuggerStatement();
                case 57:
                    return parseDeclaration();
                case 120:
                case 109:
                case 138:
                case 128:
                case 129:
                case 124:
                case 76:
                case 83:
                case 84:
                case 91:
                case 112:
                case 113:
                case 114:
                case 117:
                case 115:
                case 131:
                case 141:
                    if (isStartOfDeclaration()) {
                        return parseDeclaration();
                    }
                    break;
            }
            return parseExpressionOrLabeledStatement();
        }
        function parseDeclaration() {
            var fullStart = getNodePos();
            var decorators = parseDecorators();
            var modifiers = parseModifiers();
            switch (token()) {
                case 104:
                case 110:
                case 76:
                    return parseVariableStatement(fullStart, decorators, modifiers);
                case 89:
                    return parseFunctionDeclaration(fullStart, decorators, modifiers);
                case 75:
                    return parseClassDeclaration(fullStart, decorators, modifiers);
                case 109:
                    return parseInterfaceDeclaration(fullStart, decorators, modifiers);
                case 138:
                    return parseTypeAliasDeclaration(fullStart, decorators, modifiers);
                case 83:
                    return parseEnumDeclaration(fullStart, decorators, modifiers);
                case 141:
                case 128:
                case 129:
                    return parseModuleDeclaration(fullStart, decorators, modifiers);
                case 91:
                    return parseImportDeclarationOrImportEqualsDeclaration(fullStart, decorators, modifiers);
                case 84:
                    nextToken();
                    switch (token()) {
                        case 79:
                        case 58:
                            return parseExportAssignment(fullStart, decorators, modifiers);
                        case 118:
                            return parseNamespaceExportDeclaration(fullStart, decorators, modifiers);
                        default:
                            return parseExportDeclaration(fullStart, decorators, modifiers);
                    }
                default:
                    if (decorators || modifiers) {
                        var node = createMissingNode(247, true, ts.Diagnostics.Declaration_expected);
                        node.pos = fullStart;
                        node.decorators = decorators;
                        node.modifiers = modifiers;
                        return finishNode(node);
                    }
            }
        }
        function nextTokenIsIdentifierOrStringLiteralOnSameLine() {
            nextToken();
            return !scanner.hasPrecedingLineBreak() && (isIdentifier() || token() === 9);
        }
        function parseFunctionBlockOrSemicolon(flags, diagnosticMessage) {
            if (token() !== 17 && canParseSemicolon()) {
                parseSemicolon();
                return;
            }
            return parseFunctionBlock(flags, diagnosticMessage);
        }
        function parseArrayBindingElement() {
            if (token() === 26) {
                return createNode(200);
            }
            var node = createNode(176);
            node.dotDotDotToken = parseOptionalToken(24);
            node.name = parseIdentifierOrPattern();
            node.initializer = parseInitializer(false);
            return finishNode(node);
        }
        function parseObjectBindingElement() {
            var node = createNode(176);
            node.dotDotDotToken = parseOptionalToken(24);
            var tokenIsIdentifier = isIdentifier();
            var propertyName = parsePropertyName();
            if (tokenIsIdentifier && token() !== 56) {
                node.name = propertyName;
            }
            else {
                parseExpected(56);
                node.propertyName = propertyName;
                node.name = parseIdentifierOrPattern();
            }
            node.initializer = parseInitializer(false);
            return finishNode(node);
        }
        function parseObjectBindingPattern() {
            var node = createNode(174);
            parseExpected(17);
            node.elements = parseDelimitedList(9, parseObjectBindingElement);
            parseExpected(18);
            return finishNode(node);
        }
        function parseArrayBindingPattern() {
            var node = createNode(175);
            parseExpected(21);
            node.elements = parseDelimitedList(10, parseArrayBindingElement);
            parseExpected(22);
            return finishNode(node);
        }
        function isIdentifierOrPattern() {
            return token() === 17 || token() === 21 || isIdentifier();
        }
        function parseIdentifierOrPattern() {
            if (token() === 21) {
                return parseArrayBindingPattern();
            }
            if (token() === 17) {
                return parseObjectBindingPattern();
            }
            return parseIdentifier();
        }
        function parseVariableDeclaration() {
            var node = createNode(226);
            node.name = parseIdentifierOrPattern();
            node.type = parseTypeAnnotation();
            if (!isInOrOfKeyword(token())) {
                node.initializer = parseNonParameterInitializer();
            }
            return finishNode(node);
        }
        function parseVariableDeclarationList(inForStatementInitializer) {
            var node = createNode(227);
            switch (token()) {
                case 104:
                    break;
                case 110:
                    node.flags |= 1;
                    break;
                case 76:
                    node.flags |= 2;
                    break;
                default:
                    ts.Debug.fail();
            }
            nextToken();
            if (token() === 142 && lookAhead(canFollowContextualOfKeyword)) {
                node.declarations = createMissingList();
            }
            else {
                var savedDisallowIn = inDisallowInContext();
                setDisallowInContext(inForStatementInitializer);
                node.declarations = parseDelimitedList(8, parseVariableDeclaration);
                setDisallowInContext(savedDisallowIn);
            }
            return finishNode(node);
        }
        function canFollowContextualOfKeyword() {
            return nextTokenIsIdentifier() && nextToken() === 20;
        }
        function parseVariableStatement(fullStart, decorators, modifiers) {
            var node = createNode(208, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            node.declarationList = parseVariableDeclarationList(false);
            parseSemicolon();
            return addJSDocComment(finishNode(node));
        }
        function parseFunctionDeclaration(fullStart, decorators, modifiers) {
            var node = createNode(228, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            parseExpected(89);
            node.asteriskToken = parseOptionalToken(39);
            node.name = ts.hasModifier(node, 512) ? parseOptionalIdentifier() : parseIdentifier();
            var isGenerator = node.asteriskToken ? 1 : 0;
            var isAsync = ts.hasModifier(node, 256) ? 2 : 0;
            fillSignature(56, isGenerator | isAsync, node);
            node.body = parseFunctionBlockOrSemicolon(isGenerator | isAsync, ts.Diagnostics.or_expected);
            return addJSDocComment(finishNode(node));
        }
        function parseConstructorDeclaration(pos, decorators, modifiers) {
            var node = createNode(152, pos);
            node.decorators = decorators;
            node.modifiers = modifiers;
            parseExpected(123);
            fillSignature(56, 0, node);
            node.body = parseFunctionBlockOrSemicolon(0, ts.Diagnostics.or_expected);
            return addJSDocComment(finishNode(node));
        }
        function parseMethodDeclaration(fullStart, decorators, modifiers, asteriskToken, name, questionToken, diagnosticMessage) {
            var method = createNode(151, fullStart);
            method.decorators = decorators;
            method.modifiers = modifiers;
            method.asteriskToken = asteriskToken;
            method.name = name;
            method.questionToken = questionToken;
            var isGenerator = asteriskToken ? 1 : 0;
            var isAsync = ts.hasModifier(method, 256) ? 2 : 0;
            fillSignature(56, isGenerator | isAsync, method);
            method.body = parseFunctionBlockOrSemicolon(isGenerator | isAsync, diagnosticMessage);
            return addJSDocComment(finishNode(method));
        }
        function parsePropertyDeclaration(fullStart, decorators, modifiers, name, questionToken) {
            var property = createNode(149, fullStart);
            property.decorators = decorators;
            property.modifiers = modifiers;
            property.name = name;
            property.questionToken = questionToken;
            property.type = parseTypeAnnotation();
            property.initializer = ts.hasModifier(property, 32)
                ? allowInAnd(parseNonParameterInitializer)
                : doOutsideOfContext(4096 | 2048, parseNonParameterInitializer);
            parseSemicolon();
            return addJSDocComment(finishNode(property));
        }
        function parsePropertyOrMethodDeclaration(fullStart, decorators, modifiers) {
            var asteriskToken = parseOptionalToken(39);
            var name = parsePropertyName();
            var questionToken = parseOptionalToken(55);
            if (asteriskToken || token() === 19 || token() === 27) {
                return parseMethodDeclaration(fullStart, decorators, modifiers, asteriskToken, name, questionToken, ts.Diagnostics.or_expected);
            }
            else {
                return parsePropertyDeclaration(fullStart, decorators, modifiers, name, questionToken);
            }
        }
        function parseNonParameterInitializer() {
            return parseInitializer(false);
        }
        function parseAccessorDeclaration(kind, fullStart, decorators, modifiers) {
            var node = createNode(kind, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            node.name = parsePropertyName();
            fillSignature(56, 0, node);
            node.body = parseFunctionBlockOrSemicolon(0);
            return addJSDocComment(finishNode(node));
        }
        function isClassMemberModifier(idToken) {
            switch (idToken) {
                case 114:
                case 112:
                case 113:
                case 115:
                case 131:
                    return true;
                default:
                    return false;
            }
        }
        function isClassMemberStart() {
            var idToken;
            if (token() === 57) {
                return true;
            }
            while (ts.isModifierKind(token())) {
                idToken = token();
                if (isClassMemberModifier(idToken)) {
                    return true;
                }
                nextToken();
            }
            if (token() === 39) {
                return true;
            }
            if (isLiteralPropertyName()) {
                idToken = token();
                nextToken();
            }
            if (token() === 21) {
                return true;
            }
            if (idToken !== undefined) {
                if (!ts.isKeyword(idToken) || idToken === 135 || idToken === 125) {
                    return true;
                }
                switch (token()) {
                    case 19:
                    case 27:
                    case 56:
                    case 58:
                    case 55:
                        return true;
                    default:
                        return canParseSemicolon();
                }
            }
            return false;
        }
        function parseDecorators() {
            var list;
            var listPos = getNodePos();
            while (true) {
                var decoratorStart = getNodePos();
                if (!parseOptional(57)) {
                    break;
                }
                var decorator = createNode(147, decoratorStart);
                decorator.expression = doInDecoratorContext(parseLeftHandSideExpressionOrHigher);
                finishNode(decorator);
                (list || (list = [])).push(decorator);
            }
            return list && createNodeArray(list, listPos);
        }
        function parseModifiers(permitInvalidConstAsModifier) {
            var list;
            var listPos = getNodePos();
            while (true) {
                var modifierStart = scanner.getStartPos();
                var modifierKind = token();
                if (token() === 76 && permitInvalidConstAsModifier) {
                    if (!tryParse(nextTokenIsOnSameLineAndCanFollowModifier)) {
                        break;
                    }
                }
                else {
                    if (!parseAnyContextualModifier()) {
                        break;
                    }
                }
                var modifier = finishNode(createNode(modifierKind, modifierStart));
                (list || (list = [])).push(modifier);
            }
            return list && createNodeArray(list, listPos);
        }
        function parseModifiersForArrowFunction() {
            var modifiers;
            if (token() === 120) {
                var modifierStart = scanner.getStartPos();
                var modifierKind = token();
                nextToken();
                var modifier = finishNode(createNode(modifierKind, modifierStart));
                modifiers = createNodeArray([modifier], modifierStart);
            }
            return modifiers;
        }
        function parseClassElement() {
            if (token() === 25) {
                var result = createNode(206);
                nextToken();
                return finishNode(result);
            }
            var fullStart = getNodePos();
            var decorators = parseDecorators();
            var modifiers = parseModifiers(true);
            var accessor = tryParseAccessorDeclaration(fullStart, decorators, modifiers);
            if (accessor) {
                return accessor;
            }
            if (token() === 123) {
                return parseConstructorDeclaration(fullStart, decorators, modifiers);
            }
            if (isIndexSignature()) {
                return parseIndexSignatureDeclaration(fullStart, decorators, modifiers);
            }
            if (ts.tokenIsIdentifierOrKeyword(token()) ||
                token() === 9 ||
                token() === 8 ||
                token() === 39 ||
                token() === 21) {
                return parsePropertyOrMethodDeclaration(fullStart, decorators, modifiers);
            }
            if (decorators || modifiers) {
                var name = createMissingNode(71, true, ts.Diagnostics.Declaration_expected);
                return parsePropertyDeclaration(fullStart, decorators, modifiers, name, undefined);
            }
            ts.Debug.fail("Should not have attempted to parse class member declaration.");
        }
        function parseClassExpression() {
            return parseClassDeclarationOrExpression(scanner.getStartPos(), undefined, undefined, 199);
        }
        function parseClassDeclaration(fullStart, decorators, modifiers) {
            return parseClassDeclarationOrExpression(fullStart, decorators, modifiers, 229);
        }
        function parseClassDeclarationOrExpression(fullStart, decorators, modifiers, kind) {
            var node = createNode(kind, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            parseExpected(75);
            node.name = parseNameOfClassDeclarationOrExpression();
            node.typeParameters = parseTypeParameters();
            node.heritageClauses = parseHeritageClauses();
            if (parseExpected(17)) {
                node.members = parseClassMembers();
                parseExpected(18);
            }
            else {
                node.members = createMissingList();
            }
            return addJSDocComment(finishNode(node));
        }
        function parseNameOfClassDeclarationOrExpression() {
            return isIdentifier() && !isImplementsClause()
                ? parseIdentifier()
                : undefined;
        }
        function isImplementsClause() {
            return token() === 108 && lookAhead(nextTokenIsIdentifierOrKeyword);
        }
        function parseHeritageClauses() {
            if (isHeritageClause()) {
                return parseList(21, parseHeritageClause);
            }
            return undefined;
        }
        function parseHeritageClause() {
            var tok = token();
            if (tok === 85 || tok === 108) {
                var node = createNode(259);
                node.token = tok;
                nextToken();
                node.types = parseDelimitedList(7, parseExpressionWithTypeArguments);
                return finishNode(node);
            }
            return undefined;
        }
        function parseExpressionWithTypeArguments() {
            var node = createNode(201);
            node.expression = parseLeftHandSideExpressionOrHigher();
            node.typeArguments = tryParseTypeArguments();
            return finishNode(node);
        }
        function tryParseTypeArguments() {
            return token() === 27
                ? parseBracketedList(19, parseType, 27, 29)
                : undefined;
        }
        function isHeritageClause() {
            return token() === 85 || token() === 108;
        }
        function parseClassMembers() {
            return parseList(5, parseClassElement);
        }
        function parseInterfaceDeclaration(fullStart, decorators, modifiers) {
            var node = createNode(230, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            parseExpected(109);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            node.heritageClauses = parseHeritageClauses();
            node.members = parseObjectTypeMembers();
            return addJSDocComment(finishNode(node));
        }
        function parseTypeAliasDeclaration(fullStart, decorators, modifiers) {
            var node = createNode(231, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            parseExpected(138);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            parseExpected(58);
            node.type = parseType();
            parseSemicolon();
            return addJSDocComment(finishNode(node));
        }
        function parseEnumMember() {
            var node = createNode(264, scanner.getStartPos());
            node.name = parsePropertyName();
            node.initializer = allowInAnd(parseNonParameterInitializer);
            return addJSDocComment(finishNode(node));
        }
        function parseEnumDeclaration(fullStart, decorators, modifiers) {
            var node = createNode(232, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            parseExpected(83);
            node.name = parseIdentifier();
            if (parseExpected(17)) {
                node.members = parseDelimitedList(6, parseEnumMember);
                parseExpected(18);
            }
            else {
                node.members = createMissingList();
            }
            return addJSDocComment(finishNode(node));
        }
        function parseModuleBlock() {
            var node = createNode(234, scanner.getStartPos());
            if (parseExpected(17)) {
                node.statements = parseList(1, parseStatement);
                parseExpected(18);
            }
            else {
                node.statements = createMissingList();
            }
            return finishNode(node);
        }
        function parseModuleOrNamespaceDeclaration(fullStart, decorators, modifiers, flags) {
            var node = createNode(233, fullStart);
            var namespaceFlag = flags & 16;
            node.decorators = decorators;
            node.modifiers = modifiers;
            node.flags |= flags;
            node.name = parseIdentifier();
            node.body = parseOptional(23)
                ? parseModuleOrNamespaceDeclaration(getNodePos(), undefined, undefined, 4 | namespaceFlag)
                : parseModuleBlock();
            return addJSDocComment(finishNode(node));
        }
        function parseAmbientExternalModuleDeclaration(fullStart, decorators, modifiers) {
            var node = createNode(233, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            if (token() === 141) {
                node.name = parseIdentifier();
                node.flags |= 512;
            }
            else {
                node.name = parseLiteralNode();
                node.name.text = internIdentifier(node.name.text);
            }
            if (token() === 17) {
                node.body = parseModuleBlock();
            }
            else {
                parseSemicolon();
            }
            return finishNode(node);
        }
        function parseModuleDeclaration(fullStart, decorators, modifiers) {
            var flags = 0;
            if (token() === 141) {
                return parseAmbientExternalModuleDeclaration(fullStart, decorators, modifiers);
            }
            else if (parseOptional(129)) {
                flags |= 16;
            }
            else {
                parseExpected(128);
                if (token() === 9) {
                    return parseAmbientExternalModuleDeclaration(fullStart, decorators, modifiers);
                }
            }
            return parseModuleOrNamespaceDeclaration(fullStart, decorators, modifiers, flags);
        }
        function isExternalModuleReference() {
            return token() === 132 &&
                lookAhead(nextTokenIsOpenParen);
        }
        function nextTokenIsOpenParen() {
            return nextToken() === 19;
        }
        function nextTokenIsSlash() {
            return nextToken() === 41;
        }
        function parseNamespaceExportDeclaration(fullStart, decorators, modifiers) {
            var exportDeclaration = createNode(236, fullStart);
            exportDeclaration.decorators = decorators;
            exportDeclaration.modifiers = modifiers;
            parseExpected(118);
            parseExpected(129);
            exportDeclaration.name = parseIdentifier();
            parseSemicolon();
            return finishNode(exportDeclaration);
        }
        function parseImportDeclarationOrImportEqualsDeclaration(fullStart, decorators, modifiers) {
            parseExpected(91);
            var afterImportPos = scanner.getStartPos();
            var identifier;
            if (isIdentifier()) {
                identifier = parseIdentifier();
                if (token() !== 26 && token() !== 140) {
                    return parseImportEqualsDeclaration(fullStart, decorators, modifiers, identifier);
                }
            }
            var importDeclaration = createNode(238, fullStart);
            importDeclaration.decorators = decorators;
            importDeclaration.modifiers = modifiers;
            if (identifier ||
                token() === 39 ||
                token() === 17) {
                importDeclaration.importClause = parseImportClause(identifier, afterImportPos);
                parseExpected(140);
            }
            importDeclaration.moduleSpecifier = parseModuleSpecifier();
            parseSemicolon();
            return finishNode(importDeclaration);
        }
        function parseImportEqualsDeclaration(fullStart, decorators, modifiers, identifier) {
            var importEqualsDeclaration = createNode(237, fullStart);
            importEqualsDeclaration.decorators = decorators;
            importEqualsDeclaration.modifiers = modifiers;
            importEqualsDeclaration.name = identifier;
            parseExpected(58);
            importEqualsDeclaration.moduleReference = parseModuleReference();
            parseSemicolon();
            return addJSDocComment(finishNode(importEqualsDeclaration));
        }
        function parseImportClause(identifier, fullStart) {
            var importClause = createNode(239, fullStart);
            if (identifier) {
                importClause.name = identifier;
            }
            if (!importClause.name ||
                parseOptional(26)) {
                importClause.namedBindings = token() === 39 ? parseNamespaceImport() : parseNamedImportsOrExports(241);
            }
            return finishNode(importClause);
        }
        function parseModuleReference() {
            return isExternalModuleReference()
                ? parseExternalModuleReference()
                : parseEntityName(false);
        }
        function parseExternalModuleReference() {
            var node = createNode(248);
            parseExpected(132);
            parseExpected(19);
            node.expression = parseModuleSpecifier();
            parseExpected(20);
            return finishNode(node);
        }
        function parseModuleSpecifier() {
            if (token() === 9) {
                var result = parseLiteralNode();
                result.text = internIdentifier(result.text);
                return result;
            }
            else {
                return parseExpression();
            }
        }
        function parseNamespaceImport() {
            var namespaceImport = createNode(240);
            parseExpected(39);
            parseExpected(118);
            namespaceImport.name = parseIdentifier();
            return finishNode(namespaceImport);
        }
        function parseNamedImportsOrExports(kind) {
            var node = createNode(kind);
            node.elements = parseBracketedList(22, kind === 241 ? parseImportSpecifier : parseExportSpecifier, 17, 18);
            return finishNode(node);
        }
        function parseExportSpecifier() {
            return parseImportOrExportSpecifier(246);
        }
        function parseImportSpecifier() {
            return parseImportOrExportSpecifier(242);
        }
        function parseImportOrExportSpecifier(kind) {
            var node = createNode(kind);
            var checkIdentifierIsKeyword = ts.isKeyword(token()) && !isIdentifier();
            var checkIdentifierStart = scanner.getTokenPos();
            var checkIdentifierEnd = scanner.getTextPos();
            var identifierName = parseIdentifierName();
            if (token() === 118) {
                node.propertyName = identifierName;
                parseExpected(118);
                checkIdentifierIsKeyword = ts.isKeyword(token()) && !isIdentifier();
                checkIdentifierStart = scanner.getTokenPos();
                checkIdentifierEnd = scanner.getTextPos();
                node.name = parseIdentifierName();
            }
            else {
                node.name = identifierName;
            }
            if (kind === 242 && checkIdentifierIsKeyword) {
                parseErrorAtPosition(checkIdentifierStart, checkIdentifierEnd - checkIdentifierStart, ts.Diagnostics.Identifier_expected);
            }
            return finishNode(node);
        }
        function parseExportDeclaration(fullStart, decorators, modifiers) {
            var node = createNode(244, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            if (parseOptional(39)) {
                parseExpected(140);
                node.moduleSpecifier = parseModuleSpecifier();
            }
            else {
                node.exportClause = parseNamedImportsOrExports(245);
                if (token() === 140 || (token() === 9 && !scanner.hasPrecedingLineBreak())) {
                    parseExpected(140);
                    node.moduleSpecifier = parseModuleSpecifier();
                }
            }
            parseSemicolon();
            return finishNode(node);
        }
        function parseExportAssignment(fullStart, decorators, modifiers) {
            var node = createNode(243, fullStart);
            node.decorators = decorators;
            node.modifiers = modifiers;
            if (parseOptional(58)) {
                node.isExportEquals = true;
            }
            else {
                parseExpected(79);
            }
            node.expression = parseAssignmentExpressionOrHigher();
            parseSemicolon();
            return finishNode(node);
        }
        function processReferenceComments(sourceFile) {
            var triviaScanner = ts.createScanner(sourceFile.languageVersion, false, 0, sourceText);
            var referencedFiles = [];
            var typeReferenceDirectives = [];
            var amdDependencies = [];
            var amdModuleName;
            var checkJsDirective = undefined;
            while (true) {
                var kind = triviaScanner.scan();
                if (kind !== 2) {
                    if (ts.isTrivia(kind)) {
                        continue;
                    }
                    else {
                        break;
                    }
                }
                var range = {
                    kind: triviaScanner.getToken(),
                    pos: triviaScanner.getTokenPos(),
                    end: triviaScanner.getTextPos(),
                };
                var comment = sourceText.substring(range.pos, range.end);
                var referencePathMatchResult = ts.getFileReferenceFromReferencePath(comment, range);
                if (referencePathMatchResult) {
                    var fileReference = referencePathMatchResult.fileReference;
                    sourceFile.hasNoDefaultLib = referencePathMatchResult.isNoDefaultLib;
                    var diagnosticMessage = referencePathMatchResult.diagnosticMessage;
                    if (fileReference) {
                        if (referencePathMatchResult.isTypeReferenceDirective) {
                            typeReferenceDirectives.push(fileReference);
                        }
                        else {
                            referencedFiles.push(fileReference);
                        }
                    }
                    if (diagnosticMessage) {
                        parseDiagnostics.push(ts.createFileDiagnostic(sourceFile, range.pos, range.end - range.pos, diagnosticMessage));
                    }
                }
                else {
                    var amdModuleNameRegEx = /^\/\/\/\s*<amd-module\s+name\s*=\s*('|")(.+?)\1/gim;
                    var amdModuleNameMatchResult = amdModuleNameRegEx.exec(comment);
                    if (amdModuleNameMatchResult) {
                        if (amdModuleName) {
                            parseDiagnostics.push(ts.createFileDiagnostic(sourceFile, range.pos, range.end - range.pos, ts.Diagnostics.An_AMD_module_cannot_have_multiple_name_assignments));
                        }
                        amdModuleName = amdModuleNameMatchResult[2];
                    }
                    var amdDependencyRegEx = /^\/\/\/\s*<amd-dependency\s/gim;
                    var pathRegex = /\spath\s*=\s*('|")(.+?)\1/gim;
                    var nameRegex = /\sname\s*=\s*('|")(.+?)\1/gim;
                    var amdDependencyMatchResult = amdDependencyRegEx.exec(comment);
                    if (amdDependencyMatchResult) {
                        var pathMatchResult = pathRegex.exec(comment);
                        var nameMatchResult = nameRegex.exec(comment);
                        if (pathMatchResult) {
                            var amdDependency = { path: pathMatchResult[2], name: nameMatchResult ? nameMatchResult[2] : undefined };
                            amdDependencies.push(amdDependency);
                        }
                    }
                    var checkJsDirectiveRegEx = /^\/\/\/?\s*(@ts-check|@ts-nocheck)\s*$/gim;
                    var checkJsDirectiveMatchResult = checkJsDirectiveRegEx.exec(comment);
                    if (checkJsDirectiveMatchResult) {
                        checkJsDirective = {
                            enabled: ts.compareStrings(checkJsDirectiveMatchResult[1], "@ts-check", true) === 0,
                            end: range.end,
                            pos: range.pos
                        };
                    }
                }
            }
            sourceFile.referencedFiles = referencedFiles;
            sourceFile.typeReferenceDirectives = typeReferenceDirectives;
            sourceFile.amdDependencies = amdDependencies;
            sourceFile.moduleName = amdModuleName;
            sourceFile.checkJsDirective = checkJsDirective;
        }
        function setExternalModuleIndicator(sourceFile) {
            sourceFile.externalModuleIndicator = ts.forEach(sourceFile.statements, function (node) {
                return ts.hasModifier(node, 1)
                    || node.kind === 237 && node.moduleReference.kind === 248
                    || node.kind === 238
                    || node.kind === 243
                    || node.kind === 244
                    ? node
                    : undefined;
            });
        }
        var JSDocParser;
        (function (JSDocParser) {
            function parseJSDocTypeExpressionForTests(content, start, length) {
                initializeState(content, 5, undefined, 1);
                sourceFile = createSourceFile("file.js", 5, 1);
                scanner.setText(content, start, length);
                currentToken = scanner.scan();
                var jsDocTypeExpression = parseJSDocTypeExpression();
                var diagnostics = parseDiagnostics;
                clearState();
                return jsDocTypeExpression ? { jsDocTypeExpression: jsDocTypeExpression, diagnostics: diagnostics } : undefined;
            }
            JSDocParser.parseJSDocTypeExpressionForTests = parseJSDocTypeExpressionForTests;
            function parseJSDocTypeExpression(requireBraces) {
                var result = createNode(267, scanner.getTokenPos());
                if (!parseExpected(17) && requireBraces) {
                    return undefined;
                }
                result.type = doInsideOfContext(1048576, parseType);
                parseExpected(18);
                fixupParentReferences(result);
                return finishNode(result);
            }
            JSDocParser.parseJSDocTypeExpression = parseJSDocTypeExpression;
            function parseIsolatedJSDocComment(content, start, length) {
                initializeState(content, 5, undefined, 1);
                sourceFile = { languageVariant: 0, text: content };
                var jsDoc = parseJSDocCommentWorker(start, length);
                var diagnostics = parseDiagnostics;
                clearState();
                return jsDoc ? { jsDoc: jsDoc, diagnostics: diagnostics } : undefined;
            }
            JSDocParser.parseIsolatedJSDocComment = parseIsolatedJSDocComment;
            function parseJSDocComment(parent, start, length) {
                var saveToken = currentToken;
                var saveParseDiagnosticsLength = parseDiagnostics.length;
                var saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;
                var comment = parseJSDocCommentWorker(start, length);
                if (comment) {
                    comment.parent = parent;
                }
                if (ts.isInJavaScriptFile(parent)) {
                    if (!sourceFile.jsDocDiagnostics) {
                        sourceFile.jsDocDiagnostics = [];
                    }
                    (_a = sourceFile.jsDocDiagnostics).push.apply(_a, parseDiagnostics);
                }
                currentToken = saveToken;
                parseDiagnostics.length = saveParseDiagnosticsLength;
                parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
                return comment;
                var _a;
            }
            JSDocParser.parseJSDocComment = parseJSDocComment;
            function parseJSDocCommentWorker(start, length) {
                var content = sourceText;
                start = start || 0;
                var end = length === undefined ? content.length : start + length;
                length = end - start;
                ts.Debug.assert(start >= 0);
                ts.Debug.assert(start <= end);
                ts.Debug.assert(end <= content.length);
                var tags;
                var tagsPos;
                var tagsEnd;
                var comments = [];
                var result;
                if (!isJsDocStart(content, start)) {
                    return result;
                }
                scanner.scanRange(start + 3, length - 5, function () {
                    var advanceToken = true;
                    var state = 1;
                    var margin = undefined;
                    var indent = start - Math.max(content.lastIndexOf("\n", start), 0) + 4;
                    function pushComment(text) {
                        if (!margin) {
                            margin = indent;
                        }
                        comments.push(text);
                        indent += text.length;
                    }
                    nextJSDocToken();
                    while (token() === 5) {
                        nextJSDocToken();
                    }
                    if (token() === 4) {
                        state = 0;
                        indent = 0;
                        nextJSDocToken();
                    }
                    while (token() !== 1) {
                        switch (token()) {
                            case 57:
                                if (state === 0 || state === 1) {
                                    removeTrailingNewlines(comments);
                                    parseTag(indent);
                                    state = 0;
                                    advanceToken = false;
                                    margin = undefined;
                                    indent++;
                                }
                                else {
                                    pushComment(scanner.getTokenText());
                                }
                                break;
                            case 4:
                                comments.push(scanner.getTokenText());
                                state = 0;
                                indent = 0;
                                break;
                            case 39:
                                var asterisk = scanner.getTokenText();
                                if (state === 1 || state === 2) {
                                    state = 2;
                                    pushComment(asterisk);
                                }
                                else {
                                    state = 1;
                                    indent += asterisk.length;
                                }
                                break;
                            case 71:
                                pushComment(scanner.getTokenText());
                                state = 2;
                                break;
                            case 5:
                                var whitespace = scanner.getTokenText();
                                if (state === 2) {
                                    comments.push(whitespace);
                                }
                                else if (margin !== undefined && indent + whitespace.length > margin) {
                                    comments.push(whitespace.slice(margin - indent - 1));
                                }
                                indent += whitespace.length;
                                break;
                            case 1:
                                break;
                            default:
                                state = 2;
                                pushComment(scanner.getTokenText());
                                break;
                        }
                        if (advanceToken) {
                            nextJSDocToken();
                        }
                        else {
                            advanceToken = true;
                        }
                    }
                    removeLeadingNewlines(comments);
                    removeTrailingNewlines(comments);
                    result = createJSDocComment();
                });
                return result;
                function removeLeadingNewlines(comments) {
                    while (comments.length && (comments[0] === "\n" || comments[0] === "\r")) {
                        comments.shift();
                    }
                }
                function removeTrailingNewlines(comments) {
                    while (comments.length && (comments[comments.length - 1] === "\n" || comments[comments.length - 1] === "\r")) {
                        comments.pop();
                    }
                }
                function isJsDocStart(content, start) {
                    return content.charCodeAt(start) === 47 &&
                        content.charCodeAt(start + 1) === 42 &&
                        content.charCodeAt(start + 2) === 42 &&
                        content.charCodeAt(start + 3) !== 42;
                }
                function createJSDocComment() {
                    var result = createNode(275, start);
                    result.tags = tags && createNodeArray(tags, tagsPos, tagsEnd);
                    result.comment = comments.length ? comments.join("") : undefined;
                    return finishNode(result, end);
                }
                function skipWhitespace() {
                    while (token() === 5 || token() === 4) {
                        nextJSDocToken();
                    }
                }
                function parseTag(indent) {
                    ts.Debug.assert(token() === 57);
                    var atToken = createNode(57, scanner.getTokenPos());
                    atToken.end = scanner.getTextPos();
                    nextJSDocToken();
                    var tagName = parseJSDocIdentifierName();
                    skipWhitespace();
                    if (!tagName) {
                        return;
                    }
                    var tag;
                    if (tagName) {
                        switch (tagName.escapedText) {
                            case "augments":
                            case "extends":
                                tag = parseAugmentsTag(atToken, tagName);
                                break;
                            case "class":
                            case "constructor":
                                tag = parseClassTag(atToken, tagName);
                                break;
                            case "arg":
                            case "argument":
                            case "param":
                                tag = parseParameterOrPropertyTag(atToken, tagName, 1);
                                break;
                            case "return":
                            case "returns":
                                tag = parseReturnTag(atToken, tagName);
                                break;
                            case "template":
                                tag = parseTemplateTag(atToken, tagName);
                                break;
                            case "type":
                                tag = parseTypeTag(atToken, tagName);
                                break;
                            case "typedef":
                                tag = parseTypedefTag(atToken, tagName);
                                break;
                            default:
                                tag = parseUnknownTag(atToken, tagName);
                                break;
                        }
                    }
                    else {
                        tag = parseUnknownTag(atToken, tagName);
                    }
                    if (!tag) {
                        return;
                    }
                    addTag(tag, parseTagComments(indent + tag.end - tag.pos));
                }
                function parseTagComments(indent) {
                    var comments = [];
                    var state = 0;
                    var margin;
                    function pushComment(text) {
                        if (!margin) {
                            margin = indent;
                        }
                        comments.push(text);
                        indent += text.length;
                    }
                    while (token() !== 57 && token() !== 1) {
                        switch (token()) {
                            case 4:
                                if (state >= 1) {
                                    state = 0;
                                    comments.push(scanner.getTokenText());
                                }
                                indent = 0;
                                break;
                            case 57:
                                break;
                            case 5:
                                if (state === 2) {
                                    pushComment(scanner.getTokenText());
                                }
                                else {
                                    var whitespace = scanner.getTokenText();
                                    if (margin !== undefined && indent + whitespace.length > margin) {
                                        comments.push(whitespace.slice(margin - indent - 1));
                                    }
                                    indent += whitespace.length;
                                }
                                break;
                            case 39:
                                if (state === 0) {
                                    state = 1;
                                    indent += scanner.getTokenText().length;
                                    break;
                                }
                            default:
                                state = 2;
                                pushComment(scanner.getTokenText());
                                break;
                        }
                        if (token() === 57) {
                            break;
                        }
                        nextJSDocToken();
                    }
                    removeLeadingNewlines(comments);
                    removeTrailingNewlines(comments);
                    return comments;
                }
                function parseUnknownTag(atToken, tagName) {
                    var result = createNode(276, atToken.pos);
                    result.atToken = atToken;
                    result.tagName = tagName;
                    return finishNode(result);
                }
                function addTag(tag, comments) {
                    tag.comment = comments.join("");
                    if (!tags) {
                        tags = [tag];
                        tagsPos = tag.pos;
                    }
                    else {
                        tags.push(tag);
                    }
                    tagsEnd = tag.end;
                }
                function tryParseTypeExpression() {
                    skipWhitespace();
                    return token() === 17 ? parseJSDocTypeExpression() : undefined;
                }
                function parseBracketNameInPropertyAndParamTag() {
                    var isBracketed = parseOptional(21);
                    var name = parseJSDocEntityName();
                    if (isBracketed) {
                        skipWhitespace();
                        if (parseOptionalToken(58)) {
                            parseExpression();
                        }
                        parseExpected(22);
                    }
                    return { name: name, isBracketed: isBracketed };
                }
                function isObjectOrObjectArrayTypeReference(node) {
                    switch (node.kind) {
                        case 134:
                            return true;
                        case 164:
                            return isObjectOrObjectArrayTypeReference(node.elementType);
                        default:
                            return ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeName.escapedText === "Object";
                    }
                }
                function parseParameterOrPropertyTag(atToken, tagName, target) {
                    var typeExpression = tryParseTypeExpression();
                    var isNameFirst = !typeExpression;
                    skipWhitespace();
                    var _a = parseBracketNameInPropertyAndParamTag(), name = _a.name, isBracketed = _a.isBracketed;
                    skipWhitespace();
                    if (isNameFirst) {
                        typeExpression = tryParseTypeExpression();
                    }
                    var result = target === 1 ?
                        createNode(279, atToken.pos) :
                        createNode(284, atToken.pos);
                    var nestedTypeLiteral = parseNestedTypeLiteral(typeExpression, name);
                    if (nestedTypeLiteral) {
                        typeExpression = nestedTypeLiteral;
                        isNameFirst = true;
                    }
                    result.atToken = atToken;
                    result.tagName = tagName;
                    result.typeExpression = typeExpression;
                    result.name = name;
                    result.isNameFirst = isNameFirst;
                    result.isBracketed = isBracketed;
                    return finishNode(result);
                }
                function parseNestedTypeLiteral(typeExpression, name) {
                    if (typeExpression && isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                        var typeLiteralExpression = createNode(267, scanner.getTokenPos());
                        var child = void 0;
                        var jsdocTypeLiteral = void 0;
                        var start_2 = scanner.getStartPos();
                        var children = void 0;
                        while (child = tryParse(function () { return parseChildParameterOrPropertyTag(1, name); })) {
                            if (!children) {
                                children = [];
                            }
                            children.push(child);
                        }
                        if (children) {
                            jsdocTypeLiteral = createNode(285, start_2);
                            jsdocTypeLiteral.jsDocPropertyTags = children;
                            if (typeExpression.type.kind === 164) {
                                jsdocTypeLiteral.isArrayType = true;
                            }
                            typeLiteralExpression.type = finishNode(jsdocTypeLiteral);
                            return finishNode(typeLiteralExpression);
                        }
                    }
                }
                function parseReturnTag(atToken, tagName) {
                    if (ts.forEach(tags, function (t) { return t.kind === 280; })) {
                        parseErrorAtPosition(tagName.pos, scanner.getTokenPos() - tagName.pos, ts.Diagnostics._0_tag_already_specified, tagName.escapedText);
                    }
                    var result = createNode(280, atToken.pos);
                    result.atToken = atToken;
                    result.tagName = tagName;
                    result.typeExpression = tryParseTypeExpression();
                    return finishNode(result);
                }
                function parseTypeTag(atToken, tagName) {
                    if (ts.forEach(tags, function (t) { return t.kind === 281; })) {
                        parseErrorAtPosition(tagName.pos, scanner.getTokenPos() - tagName.pos, ts.Diagnostics._0_tag_already_specified, tagName.escapedText);
                    }
                    var result = createNode(281, atToken.pos);
                    result.atToken = atToken;
                    result.tagName = tagName;
                    result.typeExpression = parseJSDocTypeExpression(true);
                    return finishNode(result);
                }
                function parseAugmentsTag(atToken, tagName) {
                    var result = createNode(277, atToken.pos);
                    result.atToken = atToken;
                    result.tagName = tagName;
                    result.class = parseExpressionWithTypeArgumentsForAugments();
                    return finishNode(result);
                }
                function parseExpressionWithTypeArgumentsForAugments() {
                    var usedBrace = parseOptional(17);
                    var node = createNode(201);
                    node.expression = parsePropertyAccessEntityNameExpression();
                    node.typeArguments = tryParseTypeArguments();
                    var res = finishNode(node);
                    if (usedBrace) {
                        parseExpected(18);
                    }
                    return res;
                }
                function parsePropertyAccessEntityNameExpression() {
                    var node = parseJSDocIdentifierName(true);
                    while (parseOptional(23)) {
                        var prop = createNode(179, node.pos);
                        prop.expression = node;
                        prop.name = parseJSDocIdentifierName();
                        node = finishNode(prop);
                    }
                    return node;
                }
                function parseClassTag(atToken, tagName) {
                    var tag = createNode(278, atToken.pos);
                    tag.atToken = atToken;
                    tag.tagName = tagName;
                    return finishNode(tag);
                }
                function parseTypedefTag(atToken, tagName) {
                    var typeExpression = tryParseTypeExpression();
                    skipWhitespace();
                    var typedefTag = createNode(283, atToken.pos);
                    typedefTag.atToken = atToken;
                    typedefTag.tagName = tagName;
                    typedefTag.fullName = parseJSDocTypeNameWithNamespace(0);
                    if (typedefTag.fullName) {
                        var rightNode = typedefTag.fullName;
                        while (true) {
                            if (rightNode.kind === 71 || !rightNode.body) {
                                typedefTag.name = rightNode.kind === 71 ? rightNode : rightNode.name;
                                break;
                            }
                            rightNode = rightNode.body;
                        }
                    }
                    skipWhitespace();
                    typedefTag.typeExpression = typeExpression;
                    if (!typeExpression || isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                        var child = void 0;
                        var jsdocTypeLiteral = void 0;
                        var childTypeTag = void 0;
                        var start_3 = scanner.getStartPos();
                        while (child = tryParse(function () { return parseChildParameterOrPropertyTag(0); })) {
                            if (!jsdocTypeLiteral) {
                                jsdocTypeLiteral = createNode(285, start_3);
                            }
                            if (child.kind === 281) {
                                if (childTypeTag) {
                                    break;
                                }
                                else {
                                    childTypeTag = child;
                                }
                            }
                            else {
                                if (!jsdocTypeLiteral.jsDocPropertyTags) {
                                    jsdocTypeLiteral.jsDocPropertyTags = [];
                                }
                                jsdocTypeLiteral.jsDocPropertyTags.push(child);
                            }
                        }
                        if (jsdocTypeLiteral) {
                            if (typeExpression && typeExpression.type.kind === 164) {
                                jsdocTypeLiteral.isArrayType = true;
                            }
                            typedefTag.typeExpression = childTypeTag && childTypeTag.typeExpression && !isObjectOrObjectArrayTypeReference(childTypeTag.typeExpression.type) ?
                                childTypeTag.typeExpression :
                                finishNode(jsdocTypeLiteral);
                        }
                    }
                    return finishNode(typedefTag);
                    function parseJSDocTypeNameWithNamespace(flags) {
                        var pos = scanner.getTokenPos();
                        var typeNameOrNamespaceName = parseJSDocIdentifierName();
                        if (typeNameOrNamespaceName && parseOptional(23)) {
                            var jsDocNamespaceNode = createNode(233, pos);
                            jsDocNamespaceNode.flags |= flags;
                            jsDocNamespaceNode.name = typeNameOrNamespaceName;
                            jsDocNamespaceNode.body = parseJSDocTypeNameWithNamespace(4);
                            return finishNode(jsDocNamespaceNode);
                        }
                        if (typeNameOrNamespaceName && flags & 4) {
                            typeNameOrNamespaceName.isInJSDocNamespace = true;
                        }
                        return typeNameOrNamespaceName;
                    }
                }
                function escapedTextsEqual(a, b) {
                    while (!ts.isIdentifier(a) || !ts.isIdentifier(b)) {
                        if (!ts.isIdentifier(a) && !ts.isIdentifier(b) && a.right.escapedText === b.right.escapedText) {
                            a = a.left;
                            b = b.left;
                        }
                        else {
                            return false;
                        }
                    }
                    return a.escapedText === b.escapedText;
                }
                function parseChildParameterOrPropertyTag(target, name) {
                    var canParseTag = true;
                    var seenAsterisk = false;
                    while (true) {
                        nextJSDocToken();
                        switch (token()) {
                            case 57:
                                if (canParseTag) {
                                    var child = tryParseChildTag(target);
                                    if (child && child.kind === 279 &&
                                        (ts.isIdentifier(child.name) || !escapedTextsEqual(name, child.name.left))) {
                                        return false;
                                    }
                                    return child;
                                }
                                seenAsterisk = false;
                                break;
                            case 4:
                                canParseTag = true;
                                seenAsterisk = false;
                                break;
                            case 39:
                                if (seenAsterisk) {
                                    canParseTag = false;
                                }
                                seenAsterisk = true;
                                break;
                            case 71:
                                canParseTag = false;
                                break;
                            case 1:
                                return false;
                        }
                    }
                }
                function tryParseChildTag(target) {
                    ts.Debug.assert(token() === 57);
                    var atToken = createNode(57, scanner.getStartPos());
                    atToken.end = scanner.getTextPos();
                    nextJSDocToken();
                    var tagName = parseJSDocIdentifierName();
                    skipWhitespace();
                    if (!tagName) {
                        return false;
                    }
                    switch (tagName.escapedText) {
                        case "type":
                            return target === 0 && parseTypeTag(atToken, tagName);
                        case "prop":
                        case "property":
                            return target === 0 && parseParameterOrPropertyTag(atToken, tagName, target);
                        case "arg":
                        case "argument":
                        case "param":
                            return target === 1 && parseParameterOrPropertyTag(atToken, tagName, target);
                    }
                    return false;
                }
                function parseTemplateTag(atToken, tagName) {
                    if (ts.forEach(tags, function (t) { return t.kind === 282; })) {
                        parseErrorAtPosition(tagName.pos, scanner.getTokenPos() - tagName.pos, ts.Diagnostics._0_tag_already_specified, tagName.escapedText);
                    }
                    var typeParameters = [];
                    var typeParametersPos = getNodePos();
                    while (true) {
                        var name = parseJSDocIdentifierName();
                        skipWhitespace();
                        if (!name) {
                            parseErrorAtPosition(scanner.getStartPos(), 0, ts.Diagnostics.Identifier_expected);
                            return undefined;
                        }
                        var typeParameter = createNode(145, name.pos);
                        typeParameter.name = name;
                        finishNode(typeParameter);
                        typeParameters.push(typeParameter);
                        if (token() === 26) {
                            nextJSDocToken();
                            skipWhitespace();
                        }
                        else {
                            break;
                        }
                    }
                    var result = createNode(282, atToken.pos);
                    result.atToken = atToken;
                    result.tagName = tagName;
                    result.typeParameters = createNodeArray(typeParameters, typeParametersPos);
                    finishNode(result);
                    return result;
                }
                function nextJSDocToken() {
                    return currentToken = scanner.scanJSDocToken();
                }
                function parseJSDocEntityName() {
                    var entity = parseJSDocIdentifierName(true);
                    if (parseOptional(21)) {
                        parseExpected(22);
                    }
                    while (parseOptional(23)) {
                        var name = parseJSDocIdentifierName(true);
                        if (parseOptional(21)) {
                            parseExpected(22);
                        }
                        entity = createQualifiedName(entity, name);
                    }
                    return entity;
                }
                function parseJSDocIdentifierName(createIfMissing) {
                    if (createIfMissing === void 0) { createIfMissing = false; }
                    if (!ts.tokenIsIdentifierOrKeyword(token())) {
                        if (createIfMissing) {
                            return createMissingNode(71, true, ts.Diagnostics.Identifier_expected);
                        }
                        else {
                            parseErrorAtCurrentToken(ts.Diagnostics.Identifier_expected);
                            return undefined;
                        }
                    }
                    var pos = scanner.getTokenPos();
                    var end = scanner.getTextPos();
                    var result = createNode(71, pos);
                    result.escapedText = ts.escapeLeadingUnderscores(content.substring(pos, end));
                    finishNode(result, end);
                    nextJSDocToken();
                    return result;
                }
            }
            JSDocParser.parseJSDocCommentWorker = parseJSDocCommentWorker;
        })(JSDocParser = Parser.JSDocParser || (Parser.JSDocParser = {}));
    })(Parser || (Parser = {}));
    var IncrementalParser;
    (function (IncrementalParser) {
        function updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks) {
            aggressiveChecks = aggressiveChecks || ts.Debug.shouldAssert(2);
            checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks);
            if (ts.textChangeRangeIsUnchanged(textChangeRange)) {
                return sourceFile;
            }
            if (sourceFile.statements.length === 0) {
                return Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, undefined, true, sourceFile.scriptKind);
            }
            var incrementalSourceFile = sourceFile;
            ts.Debug.assert(!incrementalSourceFile.hasBeenIncrementallyParsed);
            incrementalSourceFile.hasBeenIncrementallyParsed = true;
            var oldText = sourceFile.text;
            var syntaxCursor = createSyntaxCursor(sourceFile);
            var changeRange = extendToAffectedRange(sourceFile, textChangeRange);
            checkChangeRange(sourceFile, newText, changeRange, aggressiveChecks);
            ts.Debug.assert(changeRange.span.start <= textChangeRange.span.start);
            ts.Debug.assert(ts.textSpanEnd(changeRange.span) === ts.textSpanEnd(textChangeRange.span));
            ts.Debug.assert(ts.textSpanEnd(ts.textChangeRangeNewSpan(changeRange)) === ts.textSpanEnd(ts.textChangeRangeNewSpan(textChangeRange)));
            var delta = ts.textChangeRangeNewSpan(changeRange).length - changeRange.span.length;
            updateTokenPositionsAndMarkElements(incrementalSourceFile, changeRange.span.start, ts.textSpanEnd(changeRange.span), ts.textSpanEnd(ts.textChangeRangeNewSpan(changeRange)), delta, oldText, newText, aggressiveChecks);
            var result = Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, syntaxCursor, true, sourceFile.scriptKind);
            return result;
        }
        IncrementalParser.updateSourceFile = updateSourceFile;
        function moveElementEntirelyPastChangeRange(element, isArray, delta, oldText, newText, aggressiveChecks) {
            if (isArray) {
                visitArray(element);
            }
            else {
                visitNode(element);
            }
            return;
            function visitNode(node) {
                var text = "";
                if (aggressiveChecks && shouldCheckNode(node)) {
                    text = oldText.substring(node.pos, node.end);
                }
                if (node._children) {
                    node._children = undefined;
                }
                node.pos += delta;
                node.end += delta;
                if (aggressiveChecks && shouldCheckNode(node)) {
                    ts.Debug.assert(text === newText.substring(node.pos, node.end));
                }
                forEachChild(node, visitNode, visitArray);
                if (ts.hasJSDocNodes(node)) {
                    for (var _i = 0, _a = node.jsDoc; _i < _a.length; _i++) {
                        var jsDocComment = _a[_i];
                        forEachChild(jsDocComment, visitNode, visitArray);
                    }
                }
                checkNodePositions(node, aggressiveChecks);
            }
            function visitArray(array) {
                array._children = undefined;
                array.pos += delta;
                array.end += delta;
                for (var _i = 0, array_8 = array; _i < array_8.length; _i++) {
                    var node = array_8[_i];
                    visitNode(node);
                }
            }
        }
        function shouldCheckNode(node) {
            switch (node.kind) {
                case 9:
                case 8:
                case 71:
                    return true;
            }
            return false;
        }
        function adjustIntersectingElement(element, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta) {
            ts.Debug.assert(element.end >= changeStart, "Adjusting an element that was entirely before the change range");
            ts.Debug.assert(element.pos <= changeRangeOldEnd, "Adjusting an element that was entirely after the change range");
            ts.Debug.assert(element.pos <= element.end);
            element.pos = Math.min(element.pos, changeRangeNewEnd);
            if (element.end >= changeRangeOldEnd) {
                element.end += delta;
            }
            else {
                element.end = Math.min(element.end, changeRangeNewEnd);
            }
            ts.Debug.assert(element.pos <= element.end);
            if (element.parent) {
                ts.Debug.assert(element.pos >= element.parent.pos);
                ts.Debug.assert(element.end <= element.parent.end);
            }
        }
        function checkNodePositions(node, aggressiveChecks) {
            if (aggressiveChecks) {
                var pos_2 = node.pos;
                forEachChild(node, function (child) {
                    ts.Debug.assert(child.pos >= pos_2);
                    pos_2 = child.end;
                });
                ts.Debug.assert(pos_2 <= node.end);
            }
        }
        function updateTokenPositionsAndMarkElements(sourceFile, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta, oldText, newText, aggressiveChecks) {
            visitNode(sourceFile);
            return;
            function visitNode(child) {
                ts.Debug.assert(child.pos <= child.end);
                if (child.pos > changeRangeOldEnd) {
                    moveElementEntirelyPastChangeRange(child, false, delta, oldText, newText, aggressiveChecks);
                    return;
                }
                var fullEnd = child.end;
                if (fullEnd >= changeStart) {
                    child.intersectsChange = true;
                    child._children = undefined;
                    adjustIntersectingElement(child, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                    forEachChild(child, visitNode, visitArray);
                    checkNodePositions(child, aggressiveChecks);
                    return;
                }
                ts.Debug.assert(fullEnd < changeStart);
            }
            function visitArray(array) {
                ts.Debug.assert(array.pos <= array.end);
                if (array.pos > changeRangeOldEnd) {
                    moveElementEntirelyPastChangeRange(array, true, delta, oldText, newText, aggressiveChecks);
                    return;
                }
                var fullEnd = array.end;
                if (fullEnd >= changeStart) {
                    array.intersectsChange = true;
                    array._children = undefined;
                    adjustIntersectingElement(array, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                    for (var _i = 0, array_9 = array; _i < array_9.length; _i++) {
                        var node = array_9[_i];
                        visitNode(node);
                    }
                    return;
                }
                ts.Debug.assert(fullEnd < changeStart);
            }
        }
        function extendToAffectedRange(sourceFile, changeRange) {
            var maxLookahead = 1;
            var start = changeRange.span.start;
            for (var i = 0; start > 0 && i <= maxLookahead; i++) {
                var nearestNode = findNearestNodeStartingBeforeOrAtPosition(sourceFile, start);
                ts.Debug.assert(nearestNode.pos <= start);
                var position = nearestNode.pos;
                start = Math.max(0, position - 1);
            }
            var finalSpan = ts.createTextSpanFromBounds(start, ts.textSpanEnd(changeRange.span));
            var finalLength = changeRange.newLength + (changeRange.span.start - start);
            return ts.createTextChangeRange(finalSpan, finalLength);
        }
        function findNearestNodeStartingBeforeOrAtPosition(sourceFile, position) {
            var bestResult = sourceFile;
            var lastNodeEntirelyBeforePosition;
            forEachChild(sourceFile, visit);
            if (lastNodeEntirelyBeforePosition) {
                var lastChildOfLastEntireNodeBeforePosition = getLastChild(lastNodeEntirelyBeforePosition);
                if (lastChildOfLastEntireNodeBeforePosition.pos > bestResult.pos) {
                    bestResult = lastChildOfLastEntireNodeBeforePosition;
                }
            }
            return bestResult;
            function getLastChild(node) {
                while (true) {
                    var lastChild = getLastChildWorker(node);
                    if (lastChild) {
                        node = lastChild;
                    }
                    else {
                        return node;
                    }
                }
            }
            function getLastChildWorker(node) {
                var last = undefined;
                forEachChild(node, function (child) {
                    if (ts.nodeIsPresent(child)) {
                        last = child;
                    }
                });
                return last;
            }
            function visit(child) {
                if (ts.nodeIsMissing(child)) {
                    return;
                }
                if (child.pos <= position) {
                    if (child.pos >= bestResult.pos) {
                        bestResult = child;
                    }
                    if (position < child.end) {
                        forEachChild(child, visit);
                        return true;
                    }
                    else {
                        ts.Debug.assert(child.end <= position);
                        lastNodeEntirelyBeforePosition = child;
                    }
                }
                else {
                    ts.Debug.assert(child.pos > position);
                    return true;
                }
            }
        }
        function checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks) {
            var oldText = sourceFile.text;
            if (textChangeRange) {
                ts.Debug.assert((oldText.length - textChangeRange.span.length + textChangeRange.newLength) === newText.length);
                if (aggressiveChecks || ts.Debug.shouldAssert(3)) {
                    var oldTextPrefix = oldText.substr(0, textChangeRange.span.start);
                    var newTextPrefix = newText.substr(0, textChangeRange.span.start);
                    ts.Debug.assert(oldTextPrefix === newTextPrefix);
                    var oldTextSuffix = oldText.substring(ts.textSpanEnd(textChangeRange.span), oldText.length);
                    var newTextSuffix = newText.substring(ts.textSpanEnd(ts.textChangeRangeNewSpan(textChangeRange)), newText.length);
                    ts.Debug.assert(oldTextSuffix === newTextSuffix);
                }
            }
        }
        function createSyntaxCursor(sourceFile) {
            var currentArray = sourceFile.statements;
            var currentArrayIndex = 0;
            ts.Debug.assert(currentArrayIndex < currentArray.length);
            var current = currentArray[currentArrayIndex];
            var lastQueriedPosition = -1;
            return {
                currentNode: function (position) {
                    if (position !== lastQueriedPosition) {
                        if (current && current.end === position && currentArrayIndex < (currentArray.length - 1)) {
                            currentArrayIndex++;
                            current = currentArray[currentArrayIndex];
                        }
                        if (!current || current.pos !== position) {
                            findHighestListElementThatStartsAtPosition(position);
                        }
                    }
                    lastQueriedPosition = position;
                    ts.Debug.assert(!current || current.pos === position);
                    return current;
                }
            };
            function findHighestListElementThatStartsAtPosition(position) {
                currentArray = undefined;
                currentArrayIndex = -1;
                current = undefined;
                forEachChild(sourceFile, visitNode, visitArray);
                return;
                function visitNode(node) {
                    if (position >= node.pos && position < node.end) {
                        forEachChild(node, visitNode, visitArray);
                        return true;
                    }
                    return false;
                }
                function visitArray(array) {
                    if (position >= array.pos && position < array.end) {
                        for (var i = 0; i < array.length; i++) {
                            var child = array[i];
                            if (child) {
                                if (child.pos === position) {
                                    currentArray = array;
                                    currentArrayIndex = i;
                                    current = child;
                                    return true;
                                }
                                else {
                                    if (child.pos < position && position < child.end) {
                                        forEachChild(child, visitNode, visitArray);
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    return false;
                }
            }
        }
    })(IncrementalParser || (IncrementalParser = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    ts.compileOnSaveCommandLineOption = { name: "compileOnSave", type: "boolean" };
    ts.optionDeclarations = [
        {
            name: "help",
            shortName: "h",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Command_line_Options,
            description: ts.Diagnostics.Print_this_message,
        },
        {
            name: "help",
            shortName: "?",
            type: "boolean"
        },
        {
            name: "all",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Command_line_Options,
            description: ts.Diagnostics.Show_all_compiler_options,
        },
        {
            name: "version",
            shortName: "v",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Command_line_Options,
            description: ts.Diagnostics.Print_the_compiler_s_version,
        },
        {
            name: "init",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Command_line_Options,
            description: ts.Diagnostics.Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file,
        },
        {
            name: "project",
            shortName: "p",
            type: "string",
            isFilePath: true,
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Command_line_Options,
            paramType: ts.Diagnostics.FILE_OR_DIRECTORY,
            description: ts.Diagnostics.Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json,
        },
        {
            name: "pretty",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Command_line_Options,
            description: ts.Diagnostics.Stylize_errors_and_messages_using_color_and_context_experimental
        },
        {
            name: "watch",
            shortName: "w",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Command_line_Options,
            description: ts.Diagnostics.Watch_input_files,
        },
        {
            name: "target",
            shortName: "t",
            type: ts.createMapFromTemplate({
                "es3": 0,
                "es5": 1,
                "es6": 2,
                "es2015": 2,
                "es2016": 3,
                "es2017": 4,
                "esnext": 5,
            }),
            paramType: ts.Diagnostics.VERSION,
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_ES5_ES2015_ES2016_ES2017_or_ESNEXT,
        },
        {
            name: "module",
            shortName: "m",
            type: ts.createMapFromTemplate({
                "none": ts.ModuleKind.None,
                "commonjs": ts.ModuleKind.CommonJS,
                "amd": ts.ModuleKind.AMD,
                "system": ts.ModuleKind.System,
                "umd": ts.ModuleKind.UMD,
                "es6": ts.ModuleKind.ES2015,
                "es2015": ts.ModuleKind.ES2015,
                "esnext": ts.ModuleKind.ESNext
            }),
            paramType: ts.Diagnostics.KIND,
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Specify_module_code_generation_Colon_none_commonjs_amd_system_umd_es2015_or_ESNext,
        },
        {
            name: "lib",
            type: "list",
            element: {
                name: "lib",
                type: ts.createMapFromTemplate({
                    "es5": "lib.es5.d.ts",
                    "es6": "lib.es2015.d.ts",
                    "es2015": "lib.es2015.d.ts",
                    "es7": "lib.es2016.d.ts",
                    "es2016": "lib.es2016.d.ts",
                    "es2017": "lib.es2017.d.ts",
                    "esnext": "lib.esnext.d.ts",
                    "dom": "lib.dom.d.ts",
                    "dom.iterable": "lib.dom.iterable.d.ts",
                    "webworker": "lib.webworker.d.ts",
                    "scripthost": "lib.scripthost.d.ts",
                    "es2015.core": "lib.es2015.core.d.ts",
                    "es2015.collection": "lib.es2015.collection.d.ts",
                    "es2015.generator": "lib.es2015.generator.d.ts",
                    "es2015.iterable": "lib.es2015.iterable.d.ts",
                    "es2015.promise": "lib.es2015.promise.d.ts",
                    "es2015.proxy": "lib.es2015.proxy.d.ts",
                    "es2015.reflect": "lib.es2015.reflect.d.ts",
                    "es2015.symbol": "lib.es2015.symbol.d.ts",
                    "es2015.symbol.wellknown": "lib.es2015.symbol.wellknown.d.ts",
                    "es2016.array.include": "lib.es2016.array.include.d.ts",
                    "es2017.object": "lib.es2017.object.d.ts",
                    "es2017.sharedmemory": "lib.es2017.sharedmemory.d.ts",
                    "es2017.string": "lib.es2017.string.d.ts",
                    "es2017.intl": "lib.es2017.intl.d.ts",
                    "esnext.asynciterable": "lib.esnext.asynciterable.d.ts",
                }),
            },
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Specify_library_files_to_be_included_in_the_compilation_Colon
        },
        {
            name: "allowJs",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Allow_javascript_files_to_be_compiled
        },
        {
            name: "checkJs",
            type: "boolean",
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Report_errors_in_js_files
        },
        {
            name: "jsx",
            type: ts.createMapFromTemplate({
                "preserve": 1,
                "react-native": 3,
                "react": 2
            }),
            paramType: ts.Diagnostics.KIND,
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Specify_JSX_code_generation_Colon_preserve_react_native_or_react,
        },
        {
            name: "declaration",
            shortName: "d",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Generates_corresponding_d_ts_file,
        },
        {
            name: "sourceMap",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Generates_corresponding_map_file,
        },
        {
            name: "outFile",
            type: "string",
            isFilePath: true,
            paramType: ts.Diagnostics.FILE,
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Concatenate_and_emit_output_to_single_file,
        },
        {
            name: "outDir",
            type: "string",
            isFilePath: true,
            paramType: ts.Diagnostics.DIRECTORY,
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Redirect_output_structure_to_the_directory,
        },
        {
            name: "rootDir",
            type: "string",
            isFilePath: true,
            paramType: ts.Diagnostics.LOCATION,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir,
        },
        {
            name: "removeComments",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Do_not_emit_comments_to_output,
        },
        {
            name: "noEmit",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Do_not_emit_outputs,
        },
        {
            name: "importHelpers",
            type: "boolean",
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Import_emit_helpers_from_tslib
        },
        {
            name: "downlevelIteration",
            type: "boolean",
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Provide_full_support_for_iterables_in_for_of_spread_and_destructuring_when_targeting_ES5_or_ES3
        },
        {
            name: "isolatedModules",
            type: "boolean",
            category: ts.Diagnostics.Basic_Options,
            description: ts.Diagnostics.Transpile_each_file_as_a_separate_module_similar_to_ts_transpileModule
        },
        {
            name: "strict",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Strict_Type_Checking_Options,
            description: ts.Diagnostics.Enable_all_strict_type_checking_options
        },
        {
            name: "noImplicitAny",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Strict_Type_Checking_Options,
            description: ts.Diagnostics.Raise_error_on_expressions_and_declarations_with_an_implied_any_type,
        },
        {
            name: "strictNullChecks",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Strict_Type_Checking_Options,
            description: ts.Diagnostics.Enable_strict_null_checks
        },
        {
            name: "strictFunctionTypes",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Strict_Type_Checking_Options,
            description: ts.Diagnostics.Enable_strict_checking_of_function_types
        },
        {
            name: "noImplicitThis",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Strict_Type_Checking_Options,
            description: ts.Diagnostics.Raise_error_on_this_expressions_with_an_implied_any_type,
        },
        {
            name: "alwaysStrict",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Strict_Type_Checking_Options,
            description: ts.Diagnostics.Parse_in_strict_mode_and_emit_use_strict_for_each_source_file
        },
        {
            name: "noUnusedLocals",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Additional_Checks,
            description: ts.Diagnostics.Report_errors_on_unused_locals,
        },
        {
            name: "noUnusedParameters",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Additional_Checks,
            description: ts.Diagnostics.Report_errors_on_unused_parameters,
        },
        {
            name: "noImplicitReturns",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Additional_Checks,
            description: ts.Diagnostics.Report_error_when_not_all_code_paths_in_function_return_a_value
        },
        {
            name: "noFallthroughCasesInSwitch",
            type: "boolean",
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Additional_Checks,
            description: ts.Diagnostics.Report_errors_for_fallthrough_cases_in_switch_statement
        },
        {
            name: "moduleResolution",
            type: ts.createMapFromTemplate({
                "node": ts.ModuleResolutionKind.NodeJs,
                "classic": ts.ModuleResolutionKind.Classic,
            }),
            paramType: ts.Diagnostics.STRATEGY,
            category: ts.Diagnostics.Module_Resolution_Options,
            description: ts.Diagnostics.Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6,
        },
        {
            name: "baseUrl",
            type: "string",
            isFilePath: true,
            category: ts.Diagnostics.Module_Resolution_Options,
            description: ts.Diagnostics.Base_directory_to_resolve_non_absolute_module_names
        },
        {
            name: "paths",
            type: "object",
            isTSConfigOnly: true,
            category: ts.Diagnostics.Module_Resolution_Options,
            description: ts.Diagnostics.A_series_of_entries_which_re_map_imports_to_lookup_locations_relative_to_the_baseUrl
        },
        {
            name: "rootDirs",
            type: "list",
            isTSConfigOnly: true,
            element: {
                name: "rootDirs",
                type: "string",
                isFilePath: true
            },
            category: ts.Diagnostics.Module_Resolution_Options,
            description: ts.Diagnostics.List_of_root_folders_whose_combined_content_represents_the_structure_of_the_project_at_runtime
        },
        {
            name: "typeRoots",
            type: "list",
            element: {
                name: "typeRoots",
                type: "string",
                isFilePath: true
            },
            category: ts.Diagnostics.Module_Resolution_Options,
            description: ts.Diagnostics.List_of_folders_to_include_type_definitions_from
        },
        {
            name: "types",
            type: "list",
            element: {
                name: "types",
                type: "string"
            },
            showInSimplifiedHelpView: true,
            category: ts.Diagnostics.Module_Resolution_Options,
            description: ts.Diagnostics.Type_declaration_files_to_be_included_in_compilation
        },
        {
            name: "allowSyntheticDefaultImports",
            type: "boolean",
            category: ts.Diagnostics.Module_Resolution_Options,
            description: ts.Diagnostics.Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking
        },
        {
            name: "preserveSymlinks",
            type: "boolean",
            category: ts.Diagnostics.Module_Resolution_Options,
            description: ts.Diagnostics.Do_not_resolve_the_real_path_of_symlinks,
        },
        {
            name: "sourceRoot",
            type: "string",
            isFilePath: true,
            paramType: ts.Diagnostics.LOCATION,
            category: ts.Diagnostics.Source_Map_Options,
            description: ts.Diagnostics.Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations,
        },
        {
            name: "mapRoot",
            type: "string",
            isFilePath: true,
            paramType: ts.Diagnostics.LOCATION,
            category: ts.Diagnostics.Source_Map_Options,
            description: ts.Diagnostics.Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
        },
        {
            name: "inlineSourceMap",
            type: "boolean",
            category: ts.Diagnostics.Source_Map_Options,
            description: ts.Diagnostics.Emit_a_single_file_with_source_maps_instead_of_having_a_separate_file
        },
        {
            name: "inlineSources",
            type: "boolean",
            category: ts.Diagnostics.Source_Map_Options,
            description: ts.Diagnostics.Emit_the_source_alongside_the_sourcemaps_within_a_single_file_requires_inlineSourceMap_or_sourceMap_to_be_set
        },
        {
            name: "experimentalDecorators",
            type: "boolean",
            category: ts.Diagnostics.Experimental_Options,
            description: ts.Diagnostics.Enables_experimental_support_for_ES7_decorators
        },
        {
            name: "emitDecoratorMetadata",
            type: "boolean",
            category: ts.Diagnostics.Experimental_Options,
            description: ts.Diagnostics.Enables_experimental_support_for_emitting_type_metadata_for_decorators
        },
        {
            name: "jsxFactory",
            type: "string",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Specify_the_JSX_factory_function_to_use_when_targeting_react_JSX_emit_e_g_React_createElement_or_h
        },
        {
            name: "diagnostics",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Show_diagnostic_information
        },
        {
            name: "extendedDiagnostics",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Show_verbose_diagnostic_information
        },
        {
            name: "traceResolution",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Enable_tracing_of_the_name_resolution_process
        },
        {
            name: "listFiles",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Print_names_of_files_part_of_the_compilation
        },
        {
            name: "listEmittedFiles",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Print_names_of_generated_files_part_of_the_compilation
        },
        {
            name: "out",
            type: "string",
            isFilePath: false,
            category: ts.Diagnostics.Advanced_Options,
            paramType: ts.Diagnostics.FILE,
            description: ts.Diagnostics.Deprecated_Use_outFile_instead_Concatenate_and_emit_output_to_single_file,
        },
        {
            name: "reactNamespace",
            type: "string",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Deprecated_Use_jsxFactory_instead_Specify_the_object_invoked_for_createElement_when_targeting_react_JSX_emit
        },
        {
            name: "skipDefaultLibCheck",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Deprecated_Use_skipLibCheck_instead_Skip_type_checking_of_default_library_declaration_files
        },
        {
            name: "charset",
            type: "string",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.The_character_set_of_the_input_files
        },
        {
            name: "emitBOM",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Emit_a_UTF_8_Byte_Order_Mark_BOM_in_the_beginning_of_output_files
        },
        {
            name: "locale",
            type: "string",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.The_locale_used_when_displaying_messages_to_the_user_e_g_en_us
        },
        {
            name: "newLine",
            type: ts.createMapFromTemplate({
                "crlf": 0,
                "lf": 1
            }),
            paramType: ts.Diagnostics.NEWLINE,
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix,
        },
        {
            name: "noErrorTruncation",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_truncate_error_messages
        },
        {
            name: "noLib",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_include_the_default_library_file_lib_d_ts
        },
        {
            name: "noResolve",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_add_triple_slash_references_or_imported_modules_to_the_list_of_compiled_files
        },
        {
            name: "stripInternal",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_emit_declarations_for_code_that_has_an_internal_annotation,
        },
        {
            name: "disableSizeLimit",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Disable_size_limitations_on_JavaScript_projects
        },
        {
            name: "noImplicitUseStrict",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_emit_use_strict_directives_in_module_output
        },
        {
            name: "noEmitHelpers",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_generate_custom_helper_functions_like_extends_in_compiled_output
        },
        {
            name: "noEmitOnError",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_emit_outputs_if_any_errors_were_reported,
        },
        {
            name: "preserveConstEnums",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_erase_const_enum_declarations_in_generated_code
        },
        {
            name: "declarationDir",
            type: "string",
            isFilePath: true,
            paramType: ts.Diagnostics.DIRECTORY,
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Output_directory_for_generated_declaration_files
        },
        {
            name: "skipLibCheck",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Skip_type_checking_of_declaration_files,
        },
        {
            name: "allowUnusedLabels",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_report_errors_on_unused_labels
        },
        {
            name: "allowUnreachableCode",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Do_not_report_errors_on_unreachable_code
        },
        {
            name: "suppressExcessPropertyErrors",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Suppress_excess_property_checks_for_object_literals,
        },
        {
            name: "suppressImplicitAnyIndexErrors",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures,
        },
        {
            name: "forceConsistentCasingInFileNames",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Disallow_inconsistently_cased_references_to_the_same_file
        },
        {
            name: "maxNodeModuleJsDepth",
            type: "number",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files
        },
        {
            name: "noStrictGenericChecks",
            type: "boolean",
            category: ts.Diagnostics.Advanced_Options,
            description: ts.Diagnostics.Disable_strict_checking_of_generic_signatures_in_function_types,
        },
        {
            name: "plugins",
            type: "list",
            isTSConfigOnly: true,
            element: {
                name: "plugin",
                type: "object"
            },
            description: ts.Diagnostics.List_of_language_service_plugins
        }
    ];
    ts.typeAcquisitionDeclarations = [
        {
            name: "enableAutoDiscovery",
            type: "boolean",
        },
        {
            name: "enable",
            type: "boolean",
        },
        {
            name: "include",
            type: "list",
            element: {
                name: "include",
                type: "string"
            }
        },
        {
            name: "exclude",
            type: "list",
            element: {
                name: "exclude",
                type: "string"
            }
        }
    ];
    ts.defaultInitCompilerOptions = {
        module: ts.ModuleKind.CommonJS,
        target: 1,
        strict: true
    };
    var optionNameMapCache;
    function convertEnableAutoDiscoveryToEnable(typeAcquisition) {
        if (typeAcquisition && typeAcquisition.enableAutoDiscovery !== undefined && typeAcquisition.enable === undefined) {
            var result = {
                enable: typeAcquisition.enableAutoDiscovery,
                include: typeAcquisition.include || [],
                exclude: typeAcquisition.exclude || []
            };
            return result;
        }
        return typeAcquisition;
    }
    ts.convertEnableAutoDiscoveryToEnable = convertEnableAutoDiscoveryToEnable;
    function getOptionNameMap() {
        if (optionNameMapCache) {
            return optionNameMapCache;
        }
        var optionNameMap = ts.createMap();
        var shortOptionNames = ts.createMap();
        ts.forEach(ts.optionDeclarations, function (option) {
            optionNameMap.set(option.name.toLowerCase(), option);
            if (option.shortName) {
                shortOptionNames.set(option.shortName, option.name);
            }
        });
        optionNameMapCache = { optionNameMap: optionNameMap, shortOptionNames: shortOptionNames };
        return optionNameMapCache;
    }
    function createCompilerDiagnosticForInvalidCustomType(opt) {
        return createDiagnosticForInvalidCustomType(opt, ts.createCompilerDiagnostic);
    }
    ts.createCompilerDiagnosticForInvalidCustomType = createCompilerDiagnosticForInvalidCustomType;
    function createDiagnosticForInvalidCustomType(opt, createDiagnostic) {
        var namesOfType = ts.arrayFrom(opt.type.keys()).map(function (key) { return "'" + key + "'"; }).join(", ");
        return createDiagnostic(ts.Diagnostics.Argument_for_0_option_must_be_Colon_1, "--" + opt.name, namesOfType);
    }
    function parseCustomTypeOption(opt, value, errors) {
        return convertJsonOptionOfCustomType(opt, trimString(value || ""), errors);
    }
    ts.parseCustomTypeOption = parseCustomTypeOption;
    function parseListTypeOption(opt, value, errors) {
        if (value === void 0) { value = ""; }
        value = trimString(value);
        if (ts.startsWith(value, "-")) {
            return undefined;
        }
        if (value === "") {
            return [];
        }
        var values = value.split(",");
        switch (opt.element.type) {
            case "number":
                return ts.map(values, parseInt);
            case "string":
                return ts.map(values, function (v) { return v || ""; });
            default:
                return ts.filter(ts.map(values, function (v) { return parseCustomTypeOption(opt.element, v, errors); }), function (v) { return !!v; });
        }
    }
    ts.parseListTypeOption = parseListTypeOption;
    function parseCommandLine(commandLine, readFile) {
        var options = {};
        var fileNames = [];
        var errors = [];
        parseStrings(commandLine);
        return {
            options: options,
            fileNames: fileNames,
            errors: errors
        };
        function parseStrings(args) {
            var i = 0;
            while (i < args.length) {
                var s = args[i];
                i++;
                if (s.charCodeAt(0) === 64) {
                    parseResponseFile(s.slice(1));
                }
                else if (s.charCodeAt(0) === 45) {
                    var opt = getOptionFromName(s.slice(s.charCodeAt(1) === 45 ? 2 : 1), true);
                    if (opt) {
                        if (opt.isTSConfigOnly) {
                            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file, opt.name));
                        }
                        else {
                            if (!args[i] && opt.type !== "boolean") {
                                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_expects_an_argument, opt.name));
                            }
                            switch (opt.type) {
                                case "number":
                                    options[opt.name] = parseInt(args[i]);
                                    i++;
                                    break;
                                case "boolean":
                                    var optValue = args[i];
                                    options[opt.name] = optValue !== "false";
                                    if (optValue === "false" || optValue === "true") {
                                        i++;
                                    }
                                    break;
                                case "string":
                                    options[opt.name] = args[i] || "";
                                    i++;
                                    break;
                                case "list":
                                    var result = parseListTypeOption(opt, args[i], errors);
                                    options[opt.name] = result || [];
                                    if (result) {
                                        i++;
                                    }
                                    break;
                                default:
                                    options[opt.name] = parseCustomTypeOption(opt, args[i], errors);
                                    i++;
                                    break;
                            }
                        }
                    }
                    else {
                        errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unknown_compiler_option_0, s));
                    }
                }
                else {
                    fileNames.push(s);
                }
            }
        }
        function parseResponseFile(fileName) {
            var text = readFile ? readFile(fileName) : ts.sys.readFile(fileName);
            if (!text) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.File_0_not_found, fileName));
                return;
            }
            var args = [];
            var pos = 0;
            while (true) {
                while (pos < text.length && text.charCodeAt(pos) <= 32)
                    pos++;
                if (pos >= text.length)
                    break;
                var start = pos;
                if (text.charCodeAt(start) === 34) {
                    pos++;
                    while (pos < text.length && text.charCodeAt(pos) !== 34)
                        pos++;
                    if (pos < text.length) {
                        args.push(text.substring(start + 1, pos));
                        pos++;
                    }
                    else {
                        errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unterminated_quoted_string_in_response_file_0, fileName));
                    }
                }
                else {
                    while (text.charCodeAt(pos) > 32)
                        pos++;
                    args.push(text.substring(start, pos));
                }
            }
            parseStrings(args);
        }
    }
    ts.parseCommandLine = parseCommandLine;
    function getOptionFromName(optionName, allowShort) {
        if (allowShort === void 0) { allowShort = false; }
        optionName = optionName.toLowerCase();
        var _a = getOptionNameMap(), optionNameMap = _a.optionNameMap, shortOptionNames = _a.shortOptionNames;
        if (allowShort) {
            var short = shortOptionNames.get(optionName);
            if (short !== undefined) {
                optionName = short;
            }
        }
        return optionNameMap.get(optionName);
    }
    function readConfigFile(fileName, readFile) {
        var textOrDiagnostic = tryReadFile(fileName, readFile);
        return ts.isString(textOrDiagnostic) ? parseConfigFileTextToJson(fileName, textOrDiagnostic) : { config: {}, error: textOrDiagnostic };
    }
    ts.readConfigFile = readConfigFile;
    function parseConfigFileTextToJson(fileName, jsonText) {
        var jsonSourceFile = ts.parseJsonText(fileName, jsonText);
        return {
            config: convertToObject(jsonSourceFile, jsonSourceFile.parseDiagnostics),
            error: jsonSourceFile.parseDiagnostics.length ? jsonSourceFile.parseDiagnostics[0] : undefined
        };
    }
    ts.parseConfigFileTextToJson = parseConfigFileTextToJson;
    function readJsonConfigFile(fileName, readFile) {
        var textOrDiagnostic = tryReadFile(fileName, readFile);
        return ts.isString(textOrDiagnostic) ? ts.parseJsonText(fileName, textOrDiagnostic) : { parseDiagnostics: [textOrDiagnostic] };
    }
    ts.readJsonConfigFile = readJsonConfigFile;
    function tryReadFile(fileName, readFile) {
        var text;
        try {
            text = readFile(fileName);
        }
        catch (e) {
            return ts.createCompilerDiagnostic(ts.Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message);
        }
        return text === undefined ? ts.createCompilerDiagnostic(ts.Diagnostics.The_specified_path_does_not_exist_Colon_0, fileName) : text;
    }
    function commandLineOptionsToMap(options) {
        return ts.arrayToMap(options, function (option) { return option.name; });
    }
    var _tsconfigRootOptions;
    function getTsconfigRootOptionsMap() {
        if (_tsconfigRootOptions === undefined) {
            _tsconfigRootOptions = commandLineOptionsToMap([
                {
                    name: "compilerOptions",
                    type: "object",
                    elementOptions: commandLineOptionsToMap(ts.optionDeclarations),
                    extraKeyDiagnosticMessage: ts.Diagnostics.Unknown_compiler_option_0
                },
                {
                    name: "typingOptions",
                    type: "object",
                    elementOptions: commandLineOptionsToMap(ts.typeAcquisitionDeclarations),
                    extraKeyDiagnosticMessage: ts.Diagnostics.Unknown_type_acquisition_option_0
                },
                {
                    name: "typeAcquisition",
                    type: "object",
                    elementOptions: commandLineOptionsToMap(ts.typeAcquisitionDeclarations),
                    extraKeyDiagnosticMessage: ts.Diagnostics.Unknown_type_acquisition_option_0
                },
                {
                    name: "extends",
                    type: "string"
                },
                {
                    name: "files",
                    type: "list",
                    element: {
                        name: "files",
                        type: "string"
                    }
                },
                {
                    name: "include",
                    type: "list",
                    element: {
                        name: "include",
                        type: "string"
                    }
                },
                {
                    name: "exclude",
                    type: "list",
                    element: {
                        name: "exclude",
                        type: "string"
                    }
                },
                ts.compileOnSaveCommandLineOption
            ]);
        }
        return _tsconfigRootOptions;
    }
    function convertToObject(sourceFile, errors) {
        return convertToObjectWorker(sourceFile, errors, undefined, undefined);
    }
    ts.convertToObject = convertToObject;
    function convertToObjectWorker(sourceFile, errors, knownRootOptions, jsonConversionNotifier) {
        if (!sourceFile.jsonObject) {
            return {};
        }
        return convertObjectLiteralExpressionToJson(sourceFile.jsonObject, knownRootOptions, undefined, undefined);
        function convertObjectLiteralExpressionToJson(node, knownOptions, extraKeyDiagnosticMessage, parentOption) {
            var result = {};
            for (var _i = 0, _a = node.properties; _i < _a.length; _i++) {
                var element = _a[_i];
                if (element.kind !== 261) {
                    errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, element, ts.Diagnostics.Property_assignment_expected));
                    continue;
                }
                if (element.questionToken) {
                    errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, element.questionToken, ts.Diagnostics._0_can_only_be_used_in_a_ts_file, "?"));
                }
                if (!isDoubleQuotedString(element.name)) {
                    errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, element.name, ts.Diagnostics.String_literal_with_double_quotes_expected));
                }
                var keyText = ts.unescapeLeadingUnderscores(ts.getTextOfPropertyName(element.name));
                var option = knownOptions ? knownOptions.get(keyText) : undefined;
                if (extraKeyDiagnosticMessage && !option) {
                    errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, element.name, extraKeyDiagnosticMessage, keyText));
                }
                var value = convertPropertyValueToJson(element.initializer, option);
                if (typeof keyText !== "undefined") {
                    result[keyText] = value;
                    if (jsonConversionNotifier &&
                        (parentOption || knownOptions === knownRootOptions)) {
                        var isValidOptionValue = isCompilerOptionsValue(option, value);
                        if (parentOption) {
                            if (isValidOptionValue) {
                                jsonConversionNotifier.onSetValidOptionKeyValueInParent(parentOption, option, value);
                            }
                        }
                        else if (knownOptions === knownRootOptions) {
                            if (isValidOptionValue) {
                                jsonConversionNotifier.onSetValidOptionKeyValueInRoot(keyText, element.name, value, element.initializer);
                            }
                            else if (!option) {
                                jsonConversionNotifier.onSetUnknownOptionKeyValueInRoot(keyText, element.name, value, element.initializer);
                            }
                        }
                    }
                }
            }
            return result;
        }
        function convertArrayLiteralExpressionToJson(elements, elementOption) {
            return elements.map(function (element) { return convertPropertyValueToJson(element, elementOption); });
        }
        function convertPropertyValueToJson(valueExpression, option) {
            switch (valueExpression.kind) {
                case 101:
                    reportInvalidOptionValue(option && option.type !== "boolean");
                    return true;
                case 86:
                    reportInvalidOptionValue(option && option.type !== "boolean");
                    return false;
                case 95:
                    reportInvalidOptionValue(option && option.name === "extends");
                    return null;
                case 9:
                    if (!isDoubleQuotedString(valueExpression)) {
                        errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, ts.Diagnostics.String_literal_with_double_quotes_expected));
                    }
                    reportInvalidOptionValue(option && (ts.isString(option.type) && option.type !== "string"));
                    var text = valueExpression.text;
                    if (option && !ts.isString(option.type)) {
                        var customOption = option;
                        if (!customOption.type.has(text.toLowerCase())) {
                            errors.push(createDiagnosticForInvalidCustomType(customOption, function (message, arg0, arg1) { return ts.createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, message, arg0, arg1); }));
                        }
                    }
                    return text;
                case 8:
                    reportInvalidOptionValue(option && option.type !== "number");
                    return Number(valueExpression.text);
                case 178:
                    reportInvalidOptionValue(option && option.type !== "object");
                    var objectLiteralExpression = valueExpression;
                    if (option) {
                        var _a = option, elementOptions = _a.elementOptions, extraKeyDiagnosticMessage = _a.extraKeyDiagnosticMessage, optionName = _a.name;
                        return convertObjectLiteralExpressionToJson(objectLiteralExpression, elementOptions, extraKeyDiagnosticMessage, optionName);
                    }
                    else {
                        return convertObjectLiteralExpressionToJson(objectLiteralExpression, undefined, undefined, undefined);
                    }
                case 177:
                    reportInvalidOptionValue(option && option.type !== "list");
                    return convertArrayLiteralExpressionToJson(valueExpression.elements, option && option.element);
            }
            if (option) {
                reportInvalidOptionValue(true);
            }
            else {
                errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, ts.Diagnostics.Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal));
            }
            return undefined;
            function reportInvalidOptionValue(isError) {
                if (isError) {
                    errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, option.name, getCompilerOptionValueTypeString(option)));
                }
            }
        }
        function isDoubleQuotedString(node) {
            return ts.isStringLiteral(node) && ts.isStringDoubleQuoted(node, sourceFile);
        }
    }
    function getCompilerOptionValueTypeString(option) {
        return option.type === "list" ?
            "Array" :
            ts.isString(option.type) ? option.type : "string";
    }
    function isCompilerOptionsValue(option, value) {
        if (option) {
            if (isNullOrUndefined(value))
                return true;
            if (option.type === "list") {
                return ts.isArray(value);
            }
            var expectedType = ts.isString(option.type) ? option.type : "string";
            return typeof value === expectedType;
        }
    }
    function generateTSConfig(options, fileNames, newLine) {
        var compilerOptions = ts.extend(options, ts.defaultInitCompilerOptions);
        var compilerOptionsMap = serializeCompilerOptions(compilerOptions);
        return writeConfigurations();
        function getCustomTypeMapOfCommandLineOption(optionDefinition) {
            if (optionDefinition.type === "string" || optionDefinition.type === "number" || optionDefinition.type === "boolean") {
                return undefined;
            }
            else if (optionDefinition.type === "list") {
                return getCustomTypeMapOfCommandLineOption(optionDefinition.element);
            }
            else {
                return optionDefinition.type;
            }
        }
        function getNameOfCompilerOptionValue(value, customTypeMap) {
            return ts.forEachEntry(customTypeMap, function (mapValue, key) {
                if (mapValue === value) {
                    return key;
                }
            });
        }
        function serializeCompilerOptions(options) {
            var result = ts.createMap();
            var optionsNameMap = getOptionNameMap().optionNameMap;
            var _loop_3 = function (name) {
                if (ts.hasProperty(options, name)) {
                    if (optionsNameMap.has(name) && optionsNameMap.get(name).category === ts.Diagnostics.Command_line_Options) {
                        return "continue";
                    }
                    var value = options[name];
                    var optionDefinition = optionsNameMap.get(name.toLowerCase());
                    if (optionDefinition) {
                        var customTypeMap_1 = getCustomTypeMapOfCommandLineOption(optionDefinition);
                        if (!customTypeMap_1) {
                            result.set(name, value);
                        }
                        else {
                            if (optionDefinition.type === "list") {
                                result.set(name, value.map(function (element) { return getNameOfCompilerOptionValue(element, customTypeMap_1); }));
                            }
                            else {
                                result.set(name, getNameOfCompilerOptionValue(value, customTypeMap_1));
                            }
                        }
                    }
                }
            };
            for (var name in options) {
                _loop_3(name);
            }
            return result;
        }
        function getDefaultValueForOption(option) {
            switch (option.type) {
                case "number":
                    return 1;
                case "boolean":
                    return true;
                case "string":
                    return option.isFilePath ? "./" : "";
                case "list":
                    return [];
                case "object":
                    return {};
                default:
                    return option.type.keys().next().value;
            }
        }
        function makePadding(paddingLength) {
            return Array(paddingLength + 1).join(" ");
        }
        function writeConfigurations() {
            var categorizedOptions = ts.createMultiMap();
            for (var _i = 0, optionDeclarations_1 = ts.optionDeclarations; _i < optionDeclarations_1.length; _i++) {
                var option = optionDeclarations_1[_i];
                var category = option.category;
                if (category !== undefined && category !== ts.Diagnostics.Command_line_Options && category !== ts.Diagnostics.Advanced_Options) {
                    categorizedOptions.add(ts.getLocaleSpecificMessage(category), option);
                }
            }
            var marginLength = 0;
            var seenKnownKeys = 0;
            var nameColumn = [];
            var descriptionColumn = [];
            categorizedOptions.forEach(function (options, category) {
                if (nameColumn.length !== 0) {
                    nameColumn.push("");
                    descriptionColumn.push("");
                }
                nameColumn.push("/* " + category + " */");
                descriptionColumn.push("");
                for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                    var option = options_1[_i];
                    var optionName = void 0;
                    if (compilerOptionsMap.has(option.name)) {
                        optionName = "\"" + option.name + "\": " + JSON.stringify(compilerOptionsMap.get(option.name)) + ((seenKnownKeys += 1) === compilerOptionsMap.size ? "" : ",");
                    }
                    else {
                        optionName = "// \"" + option.name + "\": " + JSON.stringify(getDefaultValueForOption(option)) + ",";
                    }
                    nameColumn.push(optionName);
                    descriptionColumn.push("/* " + (option.description && ts.getLocaleSpecificMessage(option.description) || option.name) + " */");
                    marginLength = Math.max(optionName.length, marginLength);
                }
            });
            var tab = makePadding(2);
            var result = [];
            result.push("{");
            result.push(tab + "\"compilerOptions\": {");
            for (var i = 0; i < nameColumn.length; i++) {
                var optionName = nameColumn[i];
                var description = descriptionColumn[i];
                result.push(optionName && "" + tab + tab + optionName + (description && (makePadding(marginLength - optionName.length + 2) + description)));
            }
            if (fileNames.length) {
                result.push(tab + "},");
                result.push(tab + "\"files\": [");
                for (var i = 0; i < fileNames.length; i++) {
                    result.push("" + tab + tab + JSON.stringify(fileNames[i]) + (i === fileNames.length - 1 ? "" : ","));
                }
                result.push(tab + "]");
            }
            else {
                result.push(tab + "}");
            }
            result.push("}");
            return result.join(newLine);
        }
    }
    ts.generateTSConfig = generateTSConfig;
    function parseJsonConfigFileContent(json, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions) {
        return parseJsonConfigFileContentWorker(json, undefined, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions);
    }
    ts.parseJsonConfigFileContent = parseJsonConfigFileContent;
    function parseJsonSourceFileConfigFileContent(sourceFile, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions) {
        return parseJsonConfigFileContentWorker(undefined, sourceFile, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions);
    }
    ts.parseJsonSourceFileConfigFileContent = parseJsonSourceFileConfigFileContent;
    function setConfigFileInOptions(options, configFile) {
        if (configFile) {
            Object.defineProperty(options, "configFile", { enumerable: false, writable: false, value: configFile });
        }
    }
    ts.setConfigFileInOptions = setConfigFileInOptions;
    function isNullOrUndefined(x) {
        return x === undefined || x === null;
    }
    function directoryOfCombinedPath(fileName, basePath) {
        return ts.getDirectoryPath(ts.toPath(fileName, basePath, ts.identity));
    }
    function parseJsonConfigFileContentWorker(json, sourceFile, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions) {
        if (existingOptions === void 0) { existingOptions = {}; }
        if (resolutionStack === void 0) { resolutionStack = []; }
        if (extraFileExtensions === void 0) { extraFileExtensions = []; }
        ts.Debug.assert((json === undefined && sourceFile !== undefined) || (json !== undefined && sourceFile === undefined));
        var errors = [];
        var getCanonicalFileName = ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames);
        var parsedConfig = parseConfig(json, sourceFile, host, basePath, configFileName, getCanonicalFileName, resolutionStack, errors);
        var raw = parsedConfig.raw;
        var options = ts.extend(existingOptions, parsedConfig.options || {});
        options.configFilePath = configFileName;
        setConfigFileInOptions(options, sourceFile);
        var _a = getFileNames(), fileNames = _a.fileNames, wildcardDirectories = _a.wildcardDirectories, spec = _a.spec;
        return {
            options: options,
            fileNames: fileNames,
            typeAcquisition: parsedConfig.typeAcquisition || getDefaultTypeAcquisition(),
            raw: raw,
            errors: errors,
            wildcardDirectories: wildcardDirectories,
            compileOnSave: !!raw.compileOnSave,
            configFileSpecs: spec
        };
        function getFileNames() {
            var filesSpecs;
            if (ts.hasProperty(raw, "files") && !isNullOrUndefined(raw.files)) {
                if (ts.isArray(raw.files)) {
                    filesSpecs = raw.files;
                    if (filesSpecs.length === 0) {
                        createCompilerDiagnosticOnlyIfJson(ts.Diagnostics.The_files_list_in_config_file_0_is_empty, configFileName || "tsconfig.json");
                    }
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "files", "Array");
                }
            }
            var includeSpecs;
            if (ts.hasProperty(raw, "include") && !isNullOrUndefined(raw.include)) {
                if (ts.isArray(raw.include)) {
                    includeSpecs = raw.include;
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "include", "Array");
                }
            }
            var excludeSpecs;
            if (ts.hasProperty(raw, "exclude") && !isNullOrUndefined(raw.exclude)) {
                if (ts.isArray(raw.exclude)) {
                    excludeSpecs = raw.exclude;
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "exclude", "Array");
                }
            }
            else {
                var outDir = raw.compilerOptions && raw.compilerOptions.outDir;
                if (outDir) {
                    excludeSpecs = [outDir];
                }
            }
            if (filesSpecs === undefined && includeSpecs === undefined) {
                includeSpecs = ["**/*"];
            }
            var result = matchFileNames(filesSpecs, includeSpecs, excludeSpecs, configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath, options, host, errors, extraFileExtensions, sourceFile);
            if (result.fileNames.length === 0 && !ts.hasProperty(raw, "files") && resolutionStack.length === 0) {
                errors.push(getErrorForNoInputFiles(result.spec, configFileName));
            }
            return result;
        }
        function createCompilerDiagnosticOnlyIfJson(message, arg0, arg1) {
            if (!sourceFile) {
                errors.push(ts.createCompilerDiagnostic(message, arg0, arg1));
            }
        }
    }
    function isErrorNoInputFiles(error) {
        return error.code === ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code;
    }
    ts.isErrorNoInputFiles = isErrorNoInputFiles;
    function getErrorForNoInputFiles(_a, configFileName) {
        var includeSpecs = _a.includeSpecs, excludeSpecs = _a.excludeSpecs;
        return ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2, configFileName || "tsconfig.json", JSON.stringify(includeSpecs || []), JSON.stringify(excludeSpecs || []));
    }
    ts.getErrorForNoInputFiles = getErrorForNoInputFiles;
    function isSuccessfulParsedTsconfig(value) {
        return !!value.options;
    }
    function parseConfig(json, sourceFile, host, basePath, configFileName, getCanonicalFileName, resolutionStack, errors) {
        basePath = ts.normalizeSlashes(basePath);
        var resolvedPath = ts.toPath(configFileName || "", basePath, getCanonicalFileName);
        if (resolutionStack.indexOf(resolvedPath) >= 0) {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Circularity_detected_while_resolving_configuration_Colon_0, resolutionStack.concat([resolvedPath]).join(" -> ")));
            return { raw: json || convertToObject(sourceFile, errors) };
        }
        var ownConfig = json ?
            parseOwnConfigOfJson(json, host, basePath, getCanonicalFileName, configFileName, errors) :
            parseOwnConfigOfJsonSourceFile(sourceFile, host, basePath, getCanonicalFileName, configFileName, errors);
        if (ownConfig.extendedConfigPath) {
            resolutionStack = resolutionStack.concat([resolvedPath]);
            var extendedConfig = getExtendedConfig(sourceFile, ownConfig.extendedConfigPath, host, basePath, getCanonicalFileName, resolutionStack, errors);
            if (extendedConfig && isSuccessfulParsedTsconfig(extendedConfig)) {
                var baseRaw_1 = extendedConfig.raw;
                var raw_1 = ownConfig.raw;
                var setPropertyInRawIfNotUndefined = function (propertyName) {
                    var value = raw_1[propertyName] || baseRaw_1[propertyName];
                    if (value) {
                        raw_1[propertyName] = value;
                    }
                };
                setPropertyInRawIfNotUndefined("include");
                setPropertyInRawIfNotUndefined("exclude");
                setPropertyInRawIfNotUndefined("files");
                if (raw_1.compileOnSave === undefined) {
                    raw_1.compileOnSave = baseRaw_1.compileOnSave;
                }
                ownConfig.options = ts.assign({}, extendedConfig.options, ownConfig.options);
            }
        }
        return ownConfig;
    }
    function parseOwnConfigOfJson(json, host, basePath, getCanonicalFileName, configFileName, errors) {
        if (ts.hasProperty(json, "excludes")) {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
        }
        var options = convertCompilerOptionsFromJsonWorker(json.compilerOptions, basePath, errors, configFileName);
        var typeAcquisition = convertTypeAcquisitionFromJsonWorker(json.typeAcquisition || json.typingOptions, basePath, errors, configFileName);
        json.compileOnSave = convertCompileOnSaveOptionFromJson(json, basePath, errors);
        var extendedConfigPath;
        if (json.extends) {
            if (!ts.isString(json.extends)) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "extends", "string"));
            }
            else {
                var newBase = configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath;
                extendedConfigPath = getExtendsConfigPath(json.extends, host, newBase, getCanonicalFileName, errors, ts.createCompilerDiagnostic);
            }
        }
        return { raw: json, options: options, typeAcquisition: typeAcquisition, extendedConfigPath: extendedConfigPath };
    }
    function parseOwnConfigOfJsonSourceFile(sourceFile, host, basePath, getCanonicalFileName, configFileName, errors) {
        var options = getDefaultCompilerOptions(configFileName);
        var typeAcquisition, typingOptionstypeAcquisition;
        var extendedConfigPath;
        var optionsIterator = {
            onSetValidOptionKeyValueInParent: function (parentOption, option, value) {
                ts.Debug.assert(parentOption === "compilerOptions" || parentOption === "typeAcquisition" || parentOption === "typingOptions");
                var currentOption = parentOption === "compilerOptions" ?
                    options :
                    parentOption === "typeAcquisition" ?
                        (typeAcquisition || (typeAcquisition = getDefaultTypeAcquisition(configFileName))) :
                        (typingOptionstypeAcquisition || (typingOptionstypeAcquisition = getDefaultTypeAcquisition(configFileName)));
                currentOption[option.name] = normalizeOptionValue(option, basePath, value);
            },
            onSetValidOptionKeyValueInRoot: function (key, _keyNode, value, valueNode) {
                switch (key) {
                    case "extends":
                        var newBase = configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath;
                        extendedConfigPath = getExtendsConfigPath(value, host, newBase, getCanonicalFileName, errors, function (message, arg0) {
                            return ts.createDiagnosticForNodeInSourceFile(sourceFile, valueNode, message, arg0);
                        });
                        return;
                    case "files":
                        if (value.length === 0) {
                            errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, valueNode, ts.Diagnostics.The_files_list_in_config_file_0_is_empty, configFileName || "tsconfig.json"));
                        }
                        return;
                }
            },
            onSetUnknownOptionKeyValueInRoot: function (key, keyNode, _value, _valueNode) {
                if (key === "excludes") {
                    errors.push(ts.createDiagnosticForNodeInSourceFile(sourceFile, keyNode, ts.Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
                }
            }
        };
        var json = convertToObjectWorker(sourceFile, errors, getTsconfigRootOptionsMap(), optionsIterator);
        if (!typeAcquisition) {
            if (typingOptionstypeAcquisition) {
                typeAcquisition = (typingOptionstypeAcquisition.enableAutoDiscovery !== undefined) ?
                    {
                        enable: typingOptionstypeAcquisition.enableAutoDiscovery,
                        include: typingOptionstypeAcquisition.include,
                        exclude: typingOptionstypeAcquisition.exclude
                    } :
                    typingOptionstypeAcquisition;
            }
            else {
                typeAcquisition = getDefaultTypeAcquisition(configFileName);
            }
        }
        return { raw: json, options: options, typeAcquisition: typeAcquisition, extendedConfigPath: extendedConfigPath };
    }
    function getExtendsConfigPath(extendedConfig, host, basePath, getCanonicalFileName, errors, createDiagnostic) {
        extendedConfig = ts.normalizeSlashes(extendedConfig);
        if (!(ts.isRootedDiskPath(extendedConfig) || ts.startsWith(extendedConfig, "./") || ts.startsWith(extendedConfig, "../"))) {
            errors.push(createDiagnostic(ts.Diagnostics.A_path_in_an_extends_option_must_be_relative_or_rooted_but_0_is_not, extendedConfig));
            return undefined;
        }
        var extendedConfigPath = ts.toPath(extendedConfig, basePath, getCanonicalFileName);
        if (!host.fileExists(extendedConfigPath) && !ts.endsWith(extendedConfigPath, ".json")) {
            extendedConfigPath = extendedConfigPath + ".json";
            if (!host.fileExists(extendedConfigPath)) {
                errors.push(createDiagnostic(ts.Diagnostics.File_0_does_not_exist, extendedConfig));
                return undefined;
            }
        }
        return extendedConfigPath;
    }
    function getExtendedConfig(sourceFile, extendedConfigPath, host, basePath, getCanonicalFileName, resolutionStack, errors) {
        var extendedResult = readJsonConfigFile(extendedConfigPath, function (path) { return host.readFile(path); });
        if (sourceFile) {
            (sourceFile.extendedSourceFiles || (sourceFile.extendedSourceFiles = [])).push(extendedResult.fileName);
        }
        if (extendedResult.parseDiagnostics.length) {
            errors.push.apply(errors, extendedResult.parseDiagnostics);
            return undefined;
        }
        var extendedDirname = ts.getDirectoryPath(extendedConfigPath);
        var extendedConfig = parseConfig(undefined, extendedResult, host, extendedDirname, ts.getBaseFileName(extendedConfigPath), getCanonicalFileName, resolutionStack, errors);
        if (sourceFile) {
            (_a = sourceFile.extendedSourceFiles).push.apply(_a, extendedResult.extendedSourceFiles);
        }
        if (isSuccessfulParsedTsconfig(extendedConfig)) {
            var relativeDifference_1 = ts.convertToRelativePath(extendedDirname, basePath, getCanonicalFileName);
            var updatePath_1 = function (path) { return ts.isRootedDiskPath(path) ? path : ts.combinePaths(relativeDifference_1, path); };
            var mapPropertiesInRawIfNotUndefined = function (propertyName) {
                if (raw_2[propertyName]) {
                    raw_2[propertyName] = ts.map(raw_2[propertyName], updatePath_1);
                }
            };
            var raw_2 = extendedConfig.raw;
            mapPropertiesInRawIfNotUndefined("include");
            mapPropertiesInRawIfNotUndefined("exclude");
            mapPropertiesInRawIfNotUndefined("files");
        }
        return extendedConfig;
        var _a;
    }
    function convertCompileOnSaveOptionFromJson(jsonOption, basePath, errors) {
        if (!ts.hasProperty(jsonOption, ts.compileOnSaveCommandLineOption.name)) {
            return undefined;
        }
        var result = convertJsonOption(ts.compileOnSaveCommandLineOption, jsonOption.compileOnSave, basePath, errors);
        if (typeof result === "boolean" && result) {
            return result;
        }
        return false;
    }
    function convertCompilerOptionsFromJson(jsonOptions, basePath, configFileName) {
        var errors = [];
        var options = convertCompilerOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName);
        return { options: options, errors: errors };
    }
    ts.convertCompilerOptionsFromJson = convertCompilerOptionsFromJson;
    function convertTypeAcquisitionFromJson(jsonOptions, basePath, configFileName) {
        var errors = [];
        var options = convertTypeAcquisitionFromJsonWorker(jsonOptions, basePath, errors, configFileName);
        return { options: options, errors: errors };
    }
    ts.convertTypeAcquisitionFromJson = convertTypeAcquisitionFromJson;
    function getDefaultCompilerOptions(configFileName) {
        var options = ts.getBaseFileName(configFileName) === "jsconfig.json"
            ? { allowJs: true, maxNodeModuleJsDepth: 2, allowSyntheticDefaultImports: true, skipLibCheck: true }
            : {};
        return options;
    }
    function convertCompilerOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName) {
        var options = getDefaultCompilerOptions(configFileName);
        convertOptionsFromJson(ts.optionDeclarations, jsonOptions, basePath, options, ts.Diagnostics.Unknown_compiler_option_0, errors);
        return options;
    }
    function getDefaultTypeAcquisition(configFileName) {
        var options = { enable: ts.getBaseFileName(configFileName) === "jsconfig.json", include: [], exclude: [] };
        return options;
    }
    function convertTypeAcquisitionFromJsonWorker(jsonOptions, basePath, errors, configFileName) {
        var options = getDefaultTypeAcquisition(configFileName);
        var typeAcquisition = convertEnableAutoDiscoveryToEnable(jsonOptions);
        convertOptionsFromJson(ts.typeAcquisitionDeclarations, typeAcquisition, basePath, options, ts.Diagnostics.Unknown_type_acquisition_option_0, errors);
        return options;
    }
    function convertOptionsFromJson(optionDeclarations, jsonOptions, basePath, defaultOptions, diagnosticMessage, errors) {
        if (!jsonOptions) {
            return;
        }
        var optionNameMap = commandLineOptionsToMap(optionDeclarations);
        for (var id in jsonOptions) {
            var opt = optionNameMap.get(id);
            if (opt) {
                defaultOptions[opt.name] = convertJsonOption(opt, jsonOptions[id], basePath, errors);
            }
            else {
                errors.push(ts.createCompilerDiagnostic(diagnosticMessage, id));
            }
        }
    }
    function convertJsonOption(opt, value, basePath, errors) {
        if (isCompilerOptionsValue(opt, value)) {
            var optType = opt.type;
            if (optType === "list" && ts.isArray(value)) {
                return convertJsonOptionOfListType(opt, value, basePath, errors);
            }
            else if (!ts.isString(optType)) {
                return convertJsonOptionOfCustomType(opt, value, errors);
            }
            return normalizeNonListOptionValue(opt, basePath, value);
        }
        else {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.name, getCompilerOptionValueTypeString(opt)));
        }
    }
    function normalizeOptionValue(option, basePath, value) {
        if (isNullOrUndefined(value))
            return undefined;
        if (option.type === "list") {
            var listOption_1 = option;
            if (listOption_1.element.isFilePath || !ts.isString(listOption_1.element.type)) {
                return ts.filter(ts.map(value, function (v) { return normalizeOptionValue(listOption_1.element, basePath, v); }), function (v) { return !!v; });
            }
            return value;
        }
        else if (!ts.isString(option.type)) {
            return option.type.get(ts.isString(value) ? value.toLowerCase() : value);
        }
        return normalizeNonListOptionValue(option, basePath, value);
    }
    function normalizeNonListOptionValue(option, basePath, value) {
        if (option.isFilePath) {
            value = ts.normalizePath(ts.combinePaths(basePath, value));
            if (value === "") {
                value = ".";
            }
        }
        return value;
    }
    function convertJsonOptionOfCustomType(opt, value, errors) {
        if (isNullOrUndefined(value))
            return undefined;
        var key = value.toLowerCase();
        var val = opt.type.get(key);
        if (val !== undefined) {
            return val;
        }
        else {
            errors.push(createCompilerDiagnosticForInvalidCustomType(opt));
        }
    }
    function convertJsonOptionOfListType(option, values, basePath, errors) {
        return ts.filter(ts.map(values, function (v) { return convertJsonOption(option.element, v, basePath, errors); }), function (v) { return !!v; });
    }
    function trimString(s) {
        return typeof s.trim === "function" ? s.trim() : s.replace(/^[\s]+|[\s]+$/g, "");
    }
    var invalidTrailingRecursionPattern = /(^|\/)\*\*\/?$/;
    var invalidMultipleRecursionPatterns = /(^|\/)\*\*\/(.*\/)?\*\*($|\/)/;
    var invalidDotDotAfterRecursiveWildcardPattern = /(^|\/)\*\*\/(.*\/)?\.\.($|\/)/;
    var watchRecursivePattern = /\/[^/]*?[*?][^/]*\//;
    var wildcardDirectoryPattern = /^[^*?]*(?=\/[^/]*[*?])/;
    function matchFileNames(filesSpecs, includeSpecs, excludeSpecs, basePath, options, host, errors, extraFileExtensions, jsonSourceFile) {
        basePath = ts.normalizePath(basePath);
        var validatedIncludeSpecs, validatedExcludeSpecs;
        if (includeSpecs) {
            validatedIncludeSpecs = validateSpecs(includeSpecs, errors, false, jsonSourceFile, "include");
        }
        if (excludeSpecs) {
            validatedExcludeSpecs = validateSpecs(excludeSpecs, errors, true, jsonSourceFile, "exclude");
        }
        var wildcardDirectories = getWildcardDirectories(validatedIncludeSpecs, validatedExcludeSpecs, basePath, host.useCaseSensitiveFileNames);
        var spec = { filesSpecs: filesSpecs, includeSpecs: includeSpecs, excludeSpecs: excludeSpecs, validatedIncludeSpecs: validatedIncludeSpecs, validatedExcludeSpecs: validatedExcludeSpecs, wildcardDirectories: wildcardDirectories };
        return getFileNamesFromConfigSpecs(spec, basePath, options, host, extraFileExtensions);
    }
    function getFileNamesFromConfigSpecs(spec, basePath, options, host, extraFileExtensions) {
        if (extraFileExtensions === void 0) { extraFileExtensions = []; }
        basePath = ts.normalizePath(basePath);
        var keyMapper = host.useCaseSensitiveFileNames ? caseSensitiveKeyMapper : caseInsensitiveKeyMapper;
        var literalFileMap = ts.createMap();
        var wildcardFileMap = ts.createMap();
        var filesSpecs = spec.filesSpecs, validatedIncludeSpecs = spec.validatedIncludeSpecs, validatedExcludeSpecs = spec.validatedExcludeSpecs, wildcardDirectories = spec.wildcardDirectories;
        var supportedExtensions = ts.getSupportedExtensions(options, extraFileExtensions);
        if (filesSpecs) {
            for (var _i = 0, filesSpecs_1 = filesSpecs; _i < filesSpecs_1.length; _i++) {
                var fileName = filesSpecs_1[_i];
                var file = ts.getNormalizedAbsolutePath(fileName, basePath);
                literalFileMap.set(keyMapper(file), file);
            }
        }
        if (validatedIncludeSpecs && validatedIncludeSpecs.length > 0) {
            for (var _a = 0, _b = host.readDirectory(basePath, supportedExtensions, validatedExcludeSpecs, validatedIncludeSpecs, undefined); _a < _b.length; _a++) {
                var file = _b[_a];
                if (hasFileWithHigherPriorityExtension(file, literalFileMap, wildcardFileMap, supportedExtensions, keyMapper)) {
                    continue;
                }
                removeWildcardFilesWithLowerPriorityExtension(file, wildcardFileMap, supportedExtensions, keyMapper);
                var key = keyMapper(file);
                if (!literalFileMap.has(key) && !wildcardFileMap.has(key)) {
                    wildcardFileMap.set(key, file);
                }
            }
        }
        var literalFiles = ts.arrayFrom(literalFileMap.values());
        var wildcardFiles = ts.arrayFrom(wildcardFileMap.values());
        return {
            fileNames: literalFiles.concat(wildcardFiles),
            wildcardDirectories: wildcardDirectories,
            spec: spec
        };
    }
    ts.getFileNamesFromConfigSpecs = getFileNamesFromConfigSpecs;
    function validateSpecs(specs, errors, allowTrailingRecursion, jsonSourceFile, specKey) {
        return specs.filter(function (spec) {
            var diag = specToDiagnostic(spec, allowTrailingRecursion);
            if (diag !== undefined) {
                errors.push(createDiagnostic(diag, spec));
            }
            return diag === undefined;
        });
        function createDiagnostic(message, spec) {
            if (jsonSourceFile && jsonSourceFile.jsonObject) {
                for (var _i = 0, _a = ts.getPropertyAssignment(jsonSourceFile.jsonObject, specKey); _i < _a.length; _i++) {
                    var property = _a[_i];
                    if (ts.isArrayLiteralExpression(property.initializer)) {
                        for (var _b = 0, _c = property.initializer.elements; _b < _c.length; _b++) {
                            var element = _c[_b];
                            if (ts.isStringLiteral(element) && element.text === spec) {
                                return ts.createDiagnosticForNodeInSourceFile(jsonSourceFile, element, message, spec);
                            }
                        }
                    }
                }
            }
            return ts.createCompilerDiagnostic(message, spec);
        }
    }
    function specToDiagnostic(spec, allowTrailingRecursion) {
        if (!allowTrailingRecursion && invalidTrailingRecursionPattern.test(spec)) {
            return ts.Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0;
        }
        else if (invalidMultipleRecursionPatterns.test(spec)) {
            return ts.Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0;
        }
        else if (invalidDotDotAfterRecursiveWildcardPattern.test(spec)) {
            return ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0;
        }
    }
    function getWildcardDirectories(include, exclude, path, useCaseSensitiveFileNames) {
        var rawExcludeRegex = ts.getRegularExpressionForWildcard(exclude, path, "exclude");
        var excludeRegex = rawExcludeRegex && new RegExp(rawExcludeRegex, useCaseSensitiveFileNames ? "" : "i");
        var wildcardDirectories = {};
        if (include !== undefined) {
            var recursiveKeys = [];
            for (var _i = 0, include_1 = include; _i < include_1.length; _i++) {
                var file = include_1[_i];
                var spec = ts.normalizePath(ts.combinePaths(path, file));
                if (excludeRegex && excludeRegex.test(spec)) {
                    continue;
                }
                var match = getWildcardDirectoryFromSpec(spec, useCaseSensitiveFileNames);
                if (match) {
                    var key = match.key, flags = match.flags;
                    var existingFlags = wildcardDirectories[key];
                    if (existingFlags === undefined || existingFlags < flags) {
                        wildcardDirectories[key] = flags;
                        if (flags === 1) {
                            recursiveKeys.push(key);
                        }
                    }
                }
            }
            for (var key in wildcardDirectories) {
                if (ts.hasProperty(wildcardDirectories, key)) {
                    for (var _a = 0, recursiveKeys_1 = recursiveKeys; _a < recursiveKeys_1.length; _a++) {
                        var recursiveKey = recursiveKeys_1[_a];
                        if (key !== recursiveKey && ts.containsPath(recursiveKey, key, path, !useCaseSensitiveFileNames)) {
                            delete wildcardDirectories[key];
                        }
                    }
                }
            }
        }
        return wildcardDirectories;
    }
    function getWildcardDirectoryFromSpec(spec, useCaseSensitiveFileNames) {
        var match = wildcardDirectoryPattern.exec(spec);
        if (match) {
            return {
                key: useCaseSensitiveFileNames ? match[0] : match[0].toLowerCase(),
                flags: watchRecursivePattern.test(spec) ? 1 : 0
            };
        }
        if (ts.isImplicitGlob(spec)) {
            return { key: spec, flags: 1 };
        }
        return undefined;
    }
    function hasFileWithHigherPriorityExtension(file, literalFiles, wildcardFiles, extensions, keyMapper) {
        var extensionPriority = ts.getExtensionPriority(file, extensions);
        var adjustedExtensionPriority = ts.adjustExtensionPriority(extensionPriority, extensions);
        for (var i = 0; i < adjustedExtensionPriority; i++) {
            var higherPriorityExtension = extensions[i];
            var higherPriorityPath = keyMapper(ts.changeExtension(file, higherPriorityExtension));
            if (literalFiles.has(higherPriorityPath) || wildcardFiles.has(higherPriorityPath)) {
                return true;
            }
        }
        return false;
    }
    function removeWildcardFilesWithLowerPriorityExtension(file, wildcardFiles, extensions, keyMapper) {
        var extensionPriority = ts.getExtensionPriority(file, extensions);
        var nextExtensionPriority = ts.getNextLowestExtensionPriority(extensionPriority, extensions);
        for (var i = nextExtensionPriority; i < extensions.length; i++) {
            var lowerPriorityExtension = extensions[i];
            var lowerPriorityPath = keyMapper(ts.changeExtension(file, lowerPriorityExtension));
            wildcardFiles.delete(lowerPriorityPath);
        }
    }
    function caseSensitiveKeyMapper(key) {
        return key;
    }
    function caseInsensitiveKeyMapper(key) {
        return key.toLowerCase();
    }
    function convertCompilerOptionsForTelemetry(opts) {
        var out = {};
        for (var key in opts) {
            if (opts.hasOwnProperty(key)) {
                var type = getOptionFromName(key);
                if (type !== undefined) {
                    out[key] = getOptionValueWithEmptyStrings(opts[key], type);
                }
            }
        }
        return out;
    }
    ts.convertCompilerOptionsForTelemetry = convertCompilerOptionsForTelemetry;
    function getOptionValueWithEmptyStrings(value, option) {
        switch (option.type) {
            case "object":
                return "";
            case "string":
                return "";
            case "number":
                return typeof value === "number" ? value : "";
            case "boolean":
                return typeof value === "boolean" ? value : "";
            case "list":
                var elementType_1 = option.element;
                return ts.isArray(value) ? value.map(function (v) { return getOptionValueWithEmptyStrings(v, elementType_1); }) : "";
            default:
                return ts.forEachEntry(option.type, function (optionEnumValue, optionStringValue) {
                    if (optionEnumValue === value) {
                        return optionStringValue;
                    }
                });
        }
    }
})(ts || (ts = {}));
var ts;
(function (ts) {
    var JsTyping;
    (function (JsTyping) {
        JsTyping.nodeCoreModuleList = [
            "buffer", "querystring", "events", "http", "cluster",
            "zlib", "os", "https", "punycode", "repl", "readline",
            "vm", "child_process", "url", "dns", "net",
            "dgram", "fs", "path", "string_decoder", "tls",
            "crypto", "stream", "util", "assert", "tty", "domain",
            "constants", "process", "v8", "timers", "console"
        ];
        var nodeCoreModules = ts.arrayToSet(JsTyping.nodeCoreModuleList);
        function loadSafeList(host, safeListPath) {
            var result = ts.readConfigFile(safeListPath, function (path) { return host.readFile(path); });
            return ts.createMapFromTemplate(result.config);
        }
        JsTyping.loadSafeList = loadSafeList;
        function loadTypesMap(host, typesMapPath) {
            var result = ts.readConfigFile(typesMapPath, function (path) { return host.readFile(path); });
            if (result.config) {
                return ts.createMapFromTemplate(result.config.simpleMap);
            }
            return undefined;
        }
        JsTyping.loadTypesMap = loadTypesMap;
        function discoverTypings(host, log, fileNames, projectRootPath, safeList, packageNameToTypingLocation, typeAcquisition, unresolvedImports) {
            if (!typeAcquisition || !typeAcquisition.enable) {
                return { cachedTypingPaths: [], newTypingNames: [], filesToWatch: [] };
            }
            var inferredTypings = ts.createMap();
            fileNames = ts.mapDefined(fileNames, function (fileName) {
                var path = ts.normalizePath(fileName);
                if (ts.hasJavaScriptFileExtension(path)) {
                    return path;
                }
            });
            var filesToWatch = [];
            if (typeAcquisition.include)
                addInferredTypings(typeAcquisition.include, "Explicitly included types");
            var exclude = typeAcquisition.exclude || [];
            var possibleSearchDirs = ts.arrayToSet(fileNames, ts.getDirectoryPath);
            possibleSearchDirs.set(projectRootPath, true);
            possibleSearchDirs.forEach(function (_true, searchDir) {
                var packageJsonPath = ts.combinePaths(searchDir, "package.json");
                getTypingNamesFromJson(packageJsonPath, filesToWatch);
                var bowerJsonPath = ts.combinePaths(searchDir, "bower.json");
                getTypingNamesFromJson(bowerJsonPath, filesToWatch);
                var bowerComponentsPath = ts.combinePaths(searchDir, "bower_components");
                getTypingNamesFromPackagesFolder(bowerComponentsPath, filesToWatch);
                var nodeModulesPath = ts.combinePaths(searchDir, "node_modules");
                getTypingNamesFromPackagesFolder(nodeModulesPath, filesToWatch);
            });
            getTypingNamesFromSourceFileNames(fileNames);
            if (unresolvedImports) {
                var module_1 = ts.deduplicate(unresolvedImports.map(function (moduleId) { return nodeCoreModules.has(moduleId) ? "node" : moduleId; }));
                addInferredTypings(module_1, "Inferred typings from unresolved imports");
            }
            packageNameToTypingLocation.forEach(function (typingLocation, name) {
                if (inferredTypings.has(name) && inferredTypings.get(name) === undefined) {
                    inferredTypings.set(name, typingLocation);
                }
            });
            for (var _i = 0, exclude_1 = exclude; _i < exclude_1.length; _i++) {
                var excludeTypingName = exclude_1[_i];
                var didDelete = inferredTypings.delete(excludeTypingName);
                if (didDelete && log)
                    log("Typing for " + excludeTypingName + " is in exclude list, will be ignored.");
            }
            var newTypingNames = [];
            var cachedTypingPaths = [];
            inferredTypings.forEach(function (inferred, typing) {
                if (inferred !== undefined) {
                    cachedTypingPaths.push(inferred);
                }
                else {
                    newTypingNames.push(typing);
                }
            });
            var result = { cachedTypingPaths: cachedTypingPaths, newTypingNames: newTypingNames, filesToWatch: filesToWatch };
            if (log)
                log("Result: " + JSON.stringify(result));
            return result;
            function addInferredTyping(typingName) {
                if (!inferredTypings.has(typingName)) {
                    inferredTypings.set(typingName, undefined);
                }
            }
            function addInferredTypings(typingNames, message) {
                if (log)
                    log(message + ": " + JSON.stringify(typingNames));
                ts.forEach(typingNames, addInferredTyping);
            }
            function getTypingNamesFromJson(jsonPath, filesToWatch) {
                if (!host.fileExists(jsonPath)) {
                    return;
                }
                filesToWatch.push(jsonPath);
                var jsonConfig = ts.readConfigFile(jsonPath, function (path) { return host.readFile(path); }).config;
                var jsonTypingNames = ts.flatMap([jsonConfig.dependencies, jsonConfig.devDependencies, jsonConfig.optionalDependencies, jsonConfig.peerDependencies], ts.getOwnKeys);
                addInferredTypings(jsonTypingNames, "Typing names in '" + jsonPath + "' dependencies");
            }
            function getTypingNamesFromSourceFileNames(fileNames) {
                var fromFileNames = ts.mapDefined(fileNames, function (j) {
                    if (!ts.hasJavaScriptFileExtension(j))
                        return undefined;
                    var inferredTypingName = ts.removeFileExtension(ts.getBaseFileName(j.toLowerCase()));
                    var cleanedTypingName = inferredTypingName.replace(/((?:\.|-)min(?=\.|$))|((?:-|\.)\d+)/g, "");
                    return safeList.get(cleanedTypingName);
                });
                if (fromFileNames.length) {
                    addInferredTypings(fromFileNames, "Inferred typings from file names");
                }
                var hasJsxFile = ts.some(fileNames, function (f) { return ts.fileExtensionIs(f, ".jsx"); });
                if (hasJsxFile) {
                    if (log)
                        log("Inferred 'react' typings due to presence of '.jsx' extension");
                    addInferredTyping("react");
                }
            }
            function getTypingNamesFromPackagesFolder(packagesFolderPath, filesToWatch) {
                filesToWatch.push(packagesFolderPath);
                if (!host.directoryExists(packagesFolderPath)) {
                    return;
                }
                var fileNames = host.readDirectory(packagesFolderPath, [".json"], undefined, undefined, 2);
                if (log)
                    log("Searching for typing names in " + packagesFolderPath + "; all files: " + JSON.stringify(fileNames));
                var packageNames = [];
                for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
                    var fileName = fileNames_1[_i];
                    var normalizedFileName = ts.normalizePath(fileName);
                    var baseFileName = ts.getBaseFileName(normalizedFileName);
                    if (baseFileName !== "package.json" && baseFileName !== "bower.json") {
                        continue;
                    }
                    var result_2 = ts.readConfigFile(normalizedFileName, function (path) { return host.readFile(path); });
                    var packageJson = result_2.config;
                    if (baseFileName === "package.json" && packageJson._requiredBy &&
                        ts.filter(packageJson._requiredBy, function (r) { return r[0] === "#" || r === "/"; }).length === 0) {
                        continue;
                    }
                    if (!packageJson.name) {
                        continue;
                    }
                    var ownTypes = packageJson.types || packageJson.typings;
                    if (ownTypes) {
                        var absolutePath = ts.getNormalizedAbsolutePath(ownTypes, ts.getDirectoryPath(normalizedFileName));
                        if (log)
                            log("    Package '" + packageJson.name + "' provides its own types.");
                        inferredTypings.set(packageJson.name, absolutePath);
                    }
                    else {
                        packageNames.push(packageJson.name);
                    }
                }
                addInferredTypings(packageNames, "    Found package names");
            }
        }
        JsTyping.discoverTypings = discoverTypings;
        var MaxPackageNameLength = 214;
        function validatePackageName(packageName) {
            if (!packageName) {
                return 2;
            }
            if (packageName.length > MaxPackageNameLength) {
                return 3;
            }
            if (packageName.charCodeAt(0) === 46) {
                return 4;
            }
            if (packageName.charCodeAt(0) === 95) {
                return 5;
            }
            if (/^@[^/]+\/[^/]+$/.test(packageName)) {
                return 1;
            }
            if (encodeURIComponent(packageName) !== packageName) {
                return 6;
            }
            return 0;
        }
        JsTyping.validatePackageName = validatePackageName;
        function renderPackageNameValidationFailure(result, typing) {
            switch (result) {
                case 2:
                    return "Package name '" + typing + "' cannot be empty";
                case 3:
                    return "Package name '" + typing + "' should be less than " + MaxPackageNameLength + " characters";
                case 4:
                    return "Package name '" + typing + "' cannot start with '.'";
                case 5:
                    return "Package name '" + typing + "' cannot start with '_'";
                case 1:
                    return "Package '" + typing + "' is scoped and currently is not supported";
                case 6:
                    return "Package name '" + typing + "' contains non URI safe characters";
                case 0:
                    throw ts.Debug.fail();
                default:
                    ts.Debug.assertNever(result);
            }
        }
        JsTyping.renderPackageNameValidationFailure = renderPackageNameValidationFailure;
    })(JsTyping = ts.JsTyping || (ts.JsTyping = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var server;
    (function (server) {
        server.ActionSet = "action::set";
        server.ActionInvalidate = "action::invalidate";
        server.EventTypesRegistry = "event::typesRegistry";
        server.EventPackageInstalled = "event::packageInstalled";
        server.EventBeginInstallTypes = "event::beginInstallTypes";
        server.EventEndInstallTypes = "event::endInstallTypes";
        server.EventInitializationFailed = "event::initializationFailed";
        var Arguments;
        (function (Arguments) {
            Arguments.GlobalCacheLocation = "--globalTypingsCacheLocation";
            Arguments.LogFile = "--logFile";
            Arguments.EnableTelemetry = "--enableTelemetry";
            Arguments.TypingSafeListLocation = "--typingSafeListLocation";
            Arguments.TypesMapLocation = "--typesMapLocation";
            Arguments.NpmLocation = "--npmLocation";
        })(Arguments = server.Arguments || (server.Arguments = {}));
        function hasArgument(argumentName) {
            return ts.sys.args.indexOf(argumentName) >= 0;
        }
        server.hasArgument = hasArgument;
        function findArgument(argumentName) {
            var index = ts.sys.args.indexOf(argumentName);
            return index >= 0 && index < ts.sys.args.length - 1
                ? ts.sys.args[index + 1]
                : undefined;
        }
        server.findArgument = findArgument;
    })(server = ts.server || (ts.server = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    function trace(host) {
        host.trace(ts.formatMessage.apply(undefined, arguments));
    }
    ts.trace = trace;
    function isTraceEnabled(compilerOptions, host) {
        return compilerOptions.traceResolution && host.trace !== undefined;
    }
    ts.isTraceEnabled = isTraceEnabled;
    function withPackageId(packageId, r) {
        return r && { path: r.path, extension: r.ext, packageId: packageId };
    }
    function noPackageId(r) {
        return withPackageId(undefined, r);
    }
    var Extensions;
    (function (Extensions) {
        Extensions[Extensions["TypeScript"] = 0] = "TypeScript";
        Extensions[Extensions["JavaScript"] = 1] = "JavaScript";
        Extensions[Extensions["DtsOnly"] = 2] = "DtsOnly";
    })(Extensions || (Extensions = {}));
    function resolvedTypeScriptOnly(resolved) {
        if (!resolved) {
            return undefined;
        }
        ts.Debug.assert(ts.extensionIsTypeScript(resolved.extension));
        return { fileName: resolved.path, packageId: resolved.packageId };
    }
    function createResolvedModuleWithFailedLookupLocations(resolved, isExternalLibraryImport, failedLookupLocations) {
        return {
            resolvedModule: resolved && { resolvedFileName: resolved.path, extension: resolved.extension, isExternalLibraryImport: isExternalLibraryImport, packageId: resolved.packageId },
            failedLookupLocations: failedLookupLocations
        };
    }
    function tryReadPackageJsonFields(readTypes, jsonContent, baseDirectory, state) {
        return readTypes ? tryReadFromField("typings") || tryReadFromField("types") : tryReadFromField("main");
        function tryReadFromField(fieldName) {
            if (!ts.hasProperty(jsonContent, fieldName)) {
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.package_json_does_not_have_a_0_field, fieldName);
                }
                return;
            }
            var fileName = jsonContent[fieldName];
            if (!ts.isString(fileName)) {
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.Expected_type_of_0_field_in_package_json_to_be_string_got_1, fieldName, typeof fileName);
                }
                return;
            }
            var path = ts.normalizePath(ts.combinePaths(baseDirectory, fileName));
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.package_json_has_0_field_1_that_references_2, fieldName, fileName, path);
            }
            return path;
        }
    }
    function readJson(path, host) {
        try {
            var jsonText = host.readFile(path);
            return jsonText ? JSON.parse(jsonText) : {};
        }
        catch (e) {
            return {};
        }
    }
    function getEffectiveTypeRoots(options, host) {
        if (options.typeRoots) {
            return options.typeRoots;
        }
        var currentDirectory;
        if (options.configFilePath) {
            currentDirectory = ts.getDirectoryPath(options.configFilePath);
        }
        else if (host.getCurrentDirectory) {
            currentDirectory = host.getCurrentDirectory();
        }
        if (currentDirectory !== undefined) {
            return getDefaultTypeRoots(currentDirectory, host);
        }
    }
    ts.getEffectiveTypeRoots = getEffectiveTypeRoots;
    function getDefaultTypeRoots(currentDirectory, host) {
        if (!host.directoryExists) {
            return [ts.combinePaths(currentDirectory, nodeModulesAtTypes)];
        }
        var typeRoots;
        ts.forEachAncestorDirectory(ts.normalizePath(currentDirectory), function (directory) {
            var atTypes = ts.combinePaths(directory, nodeModulesAtTypes);
            if (host.directoryExists(atTypes)) {
                (typeRoots || (typeRoots = [])).push(atTypes);
            }
            return undefined;
        });
        return typeRoots;
    }
    var nodeModulesAtTypes = ts.combinePaths("node_modules", "@types");
    function resolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, options, host) {
        var traceEnabled = isTraceEnabled(options, host);
        var moduleResolutionState = { compilerOptions: options, host: host, traceEnabled: traceEnabled };
        var typeRoots = getEffectiveTypeRoots(options, host);
        if (traceEnabled) {
            if (containingFile === undefined) {
                if (typeRoots === undefined) {
                    trace(host, ts.Diagnostics.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set, typeReferenceDirectiveName);
                }
                else {
                    trace(host, ts.Diagnostics.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1, typeReferenceDirectiveName, typeRoots);
                }
            }
            else {
                if (typeRoots === undefined) {
                    trace(host, ts.Diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set, typeReferenceDirectiveName, containingFile);
                }
                else {
                    trace(host, ts.Diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_2, typeReferenceDirectiveName, containingFile, typeRoots);
                }
            }
        }
        var failedLookupLocations = [];
        var resolved = primaryLookup();
        var primary = true;
        if (!resolved) {
            resolved = secondaryLookup();
            primary = false;
        }
        var resolvedTypeReferenceDirective;
        if (resolved) {
            if (!options.preserveSymlinks) {
                resolved = __assign({}, resolved, { fileName: realPath(resolved.fileName, host, traceEnabled) });
            }
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, resolved.fileName, primary);
            }
            resolvedTypeReferenceDirective = { primary: primary, resolvedFileName: resolved.fileName, packageId: resolved.packageId };
        }
        return { resolvedTypeReferenceDirective: resolvedTypeReferenceDirective, failedLookupLocations: failedLookupLocations };
        function primaryLookup() {
            if (typeRoots && typeRoots.length) {
                if (traceEnabled) {
                    trace(host, ts.Diagnostics.Resolving_with_primary_search_path_0, typeRoots.join(", "));
                }
                return ts.forEach(typeRoots, function (typeRoot) {
                    var candidate = ts.combinePaths(typeRoot, typeReferenceDirectiveName);
                    var candidateDirectory = ts.getDirectoryPath(candidate);
                    var directoryExists = directoryProbablyExists(candidateDirectory, host);
                    if (!directoryExists && traceEnabled) {
                        trace(host, ts.Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidateDirectory);
                    }
                    return resolvedTypeScriptOnly(loadNodeModuleFromDirectory(Extensions.DtsOnly, candidate, failedLookupLocations, !directoryExists, moduleResolutionState));
                });
            }
            else {
                if (traceEnabled) {
                    trace(host, ts.Diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths);
                }
            }
        }
        function secondaryLookup() {
            var resolvedFile;
            var initialLocationForSecondaryLookup = containingFile && ts.getDirectoryPath(containingFile);
            if (initialLocationForSecondaryLookup !== undefined) {
                if (traceEnabled) {
                    trace(host, ts.Diagnostics.Looking_up_in_node_modules_folder_initial_location_0, initialLocationForSecondaryLookup);
                }
                var result = loadModuleFromNodeModules(Extensions.DtsOnly, typeReferenceDirectiveName, initialLocationForSecondaryLookup, failedLookupLocations, moduleResolutionState, undefined);
                resolvedFile = resolvedTypeScriptOnly(result && result.value);
                if (!resolvedFile && traceEnabled) {
                    trace(host, ts.Diagnostics.Type_reference_directive_0_was_not_resolved, typeReferenceDirectiveName);
                }
                return resolvedFile;
            }
            else {
                if (traceEnabled) {
                    trace(host, ts.Diagnostics.Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder);
                }
            }
        }
    }
    ts.resolveTypeReferenceDirective = resolveTypeReferenceDirective;
    function getAutomaticTypeDirectiveNames(options, host) {
        if (options.types) {
            return options.types;
        }
        var result = [];
        if (host.directoryExists && host.getDirectories) {
            var typeRoots = getEffectiveTypeRoots(options, host);
            if (typeRoots) {
                for (var _i = 0, typeRoots_1 = typeRoots; _i < typeRoots_1.length; _i++) {
                    var root = typeRoots_1[_i];
                    if (host.directoryExists(root)) {
                        for (var _a = 0, _b = host.getDirectories(root); _a < _b.length; _a++) {
                            var typeDirectivePath = _b[_a];
                            var normalized = ts.normalizePath(typeDirectivePath);
                            var packageJsonPath = pathToPackageJson(ts.combinePaths(root, normalized));
                            var isNotNeededPackage = host.fileExists(packageJsonPath) && readJson(packageJsonPath, host).typings === null;
                            if (!isNotNeededPackage) {
                                result.push(ts.getBaseFileName(normalized));
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
    ts.getAutomaticTypeDirectiveNames = getAutomaticTypeDirectiveNames;
    function createModuleResolutionCache(currentDirectory, getCanonicalFileName) {
        var directoryToModuleNameMap = ts.createMap();
        var moduleNameToDirectoryMap = ts.createMap();
        return { getOrCreateCacheForDirectory: getOrCreateCacheForDirectory, getOrCreateCacheForModuleName: getOrCreateCacheForModuleName };
        function getOrCreateCacheForDirectory(directoryName) {
            var path = ts.toPath(directoryName, currentDirectory, getCanonicalFileName);
            var perFolderCache = directoryToModuleNameMap.get(path);
            if (!perFolderCache) {
                perFolderCache = ts.createMap();
                directoryToModuleNameMap.set(path, perFolderCache);
            }
            return perFolderCache;
        }
        function getOrCreateCacheForModuleName(nonRelativeModuleName) {
            if (ts.isExternalModuleNameRelative(nonRelativeModuleName)) {
                return undefined;
            }
            var perModuleNameCache = moduleNameToDirectoryMap.get(nonRelativeModuleName);
            if (!perModuleNameCache) {
                perModuleNameCache = createPerModuleNameCache();
                moduleNameToDirectoryMap.set(nonRelativeModuleName, perModuleNameCache);
            }
            return perModuleNameCache;
        }
        function createPerModuleNameCache() {
            var directoryPathMap = ts.createMap();
            return { get: get, set: set };
            function get(directory) {
                return directoryPathMap.get(ts.toPath(directory, currentDirectory, getCanonicalFileName));
            }
            function set(directory, result) {
                var path = ts.toPath(directory, currentDirectory, getCanonicalFileName);
                if (directoryPathMap.has(path)) {
                    return;
                }
                directoryPathMap.set(path, result);
                var resolvedFileName = result.resolvedModule && result.resolvedModule.resolvedFileName;
                var commonPrefix = getCommonPrefix(path, resolvedFileName);
                var current = path;
                while (true) {
                    var parent = ts.getDirectoryPath(current);
                    if (parent === current || directoryPathMap.has(parent)) {
                        break;
                    }
                    directoryPathMap.set(parent, result);
                    current = parent;
                    if (current === commonPrefix) {
                        break;
                    }
                }
            }
            function getCommonPrefix(directory, resolution) {
                if (resolution === undefined) {
                    return undefined;
                }
                var resolutionDirectory = ts.toPath(ts.getDirectoryPath(resolution), currentDirectory, getCanonicalFileName);
                var i = 0;
                while (i < Math.min(directory.length, resolutionDirectory.length) && directory.charCodeAt(i) === resolutionDirectory.charCodeAt(i)) {
                    i++;
                }
                var sep = directory.lastIndexOf(ts.directorySeparator, i);
                if (sep < 0) {
                    return undefined;
                }
                return directory.substr(0, sep);
            }
        }
    }
    ts.createModuleResolutionCache = createModuleResolutionCache;
    function resolveModuleName(moduleName, containingFile, compilerOptions, host, cache) {
        var traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, ts.Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
        }
        var containingDirectory = ts.getDirectoryPath(containingFile);
        var perFolderCache = cache && cache.getOrCreateCacheForDirectory(containingDirectory);
        var result = perFolderCache && perFolderCache.get(moduleName);
        if (result) {
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Resolution_for_module_0_was_found_in_cache, moduleName);
            }
        }
        else {
            var moduleResolution = compilerOptions.moduleResolution;
            if (moduleResolution === undefined) {
                moduleResolution = ts.getEmitModuleKind(compilerOptions) === ts.ModuleKind.CommonJS ? ts.ModuleResolutionKind.NodeJs : ts.ModuleResolutionKind.Classic;
                if (traceEnabled) {
                    trace(host, ts.Diagnostics.Module_resolution_kind_is_not_specified_using_0, ts.ModuleResolutionKind[moduleResolution]);
                }
            }
            else {
                if (traceEnabled) {
                    trace(host, ts.Diagnostics.Explicitly_specified_module_resolution_kind_Colon_0, ts.ModuleResolutionKind[moduleResolution]);
                }
            }
            switch (moduleResolution) {
                case ts.ModuleResolutionKind.NodeJs:
                    result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache);
                    break;
                case ts.ModuleResolutionKind.Classic:
                    result = classicNameResolver(moduleName, containingFile, compilerOptions, host, cache);
                    break;
                default:
                    ts.Debug.fail("Unexpected moduleResolution: " + moduleResolution);
            }
            if (perFolderCache) {
                perFolderCache.set(moduleName, result);
                var perModuleNameCache = cache.getOrCreateCacheForModuleName(moduleName);
                if (perModuleNameCache) {
                    perModuleNameCache.set(containingDirectory, result);
                }
            }
        }
        if (traceEnabled) {
            if (result.resolvedModule) {
                trace(host, ts.Diagnostics.Module_name_0_was_successfully_resolved_to_1, moduleName, result.resolvedModule.resolvedFileName);
            }
            else {
                trace(host, ts.Diagnostics.Module_name_0_was_not_resolved, moduleName);
            }
        }
        return result;
    }
    ts.resolveModuleName = resolveModuleName;
    function tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loader, failedLookupLocations, state) {
        if (!ts.isExternalModuleNameRelative(moduleName)) {
            return tryLoadModuleUsingBaseUrl(extensions, moduleName, loader, failedLookupLocations, state);
        }
        else {
            return tryLoadModuleUsingRootDirs(extensions, moduleName, containingDirectory, loader, failedLookupLocations, state);
        }
    }
    function tryLoadModuleUsingRootDirs(extensions, moduleName, containingDirectory, loader, failedLookupLocations, state) {
        if (!state.compilerOptions.rootDirs) {
            return undefined;
        }
        if (state.traceEnabled) {
            trace(state.host, ts.Diagnostics.rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0, moduleName);
        }
        var candidate = ts.normalizePath(ts.combinePaths(containingDirectory, moduleName));
        var matchedRootDir;
        var matchedNormalizedPrefix;
        for (var _i = 0, _a = state.compilerOptions.rootDirs; _i < _a.length; _i++) {
            var rootDir = _a[_i];
            var normalizedRoot = ts.normalizePath(rootDir);
            if (!ts.endsWith(normalizedRoot, ts.directorySeparator)) {
                normalizedRoot += ts.directorySeparator;
            }
            var isLongestMatchingPrefix = ts.startsWith(candidate, normalizedRoot) &&
                (matchedNormalizedPrefix === undefined || matchedNormalizedPrefix.length < normalizedRoot.length);
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Checking_if_0_is_the_longest_matching_prefix_for_1_2, normalizedRoot, candidate, isLongestMatchingPrefix);
            }
            if (isLongestMatchingPrefix) {
                matchedNormalizedPrefix = normalizedRoot;
                matchedRootDir = rootDir;
            }
        }
        if (matchedNormalizedPrefix) {
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Longest_matching_prefix_for_0_is_1, candidate, matchedNormalizedPrefix);
            }
            var suffix = candidate.substr(matchedNormalizedPrefix.length);
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, matchedNormalizedPrefix, candidate);
            }
            var resolvedFileName = loader(extensions, candidate, failedLookupLocations, !directoryProbablyExists(containingDirectory, state.host), state);
            if (resolvedFileName) {
                return resolvedFileName;
            }
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Trying_other_entries_in_rootDirs);
            }
            for (var _b = 0, _c = state.compilerOptions.rootDirs; _b < _c.length; _b++) {
                var rootDir = _c[_b];
                if (rootDir === matchedRootDir) {
                    continue;
                }
                var candidate_1 = ts.combinePaths(ts.normalizePath(rootDir), suffix);
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, rootDir, candidate_1);
                }
                var baseDirectory = ts.getDirectoryPath(candidate_1);
                var resolvedFileName_1 = loader(extensions, candidate_1, failedLookupLocations, !directoryProbablyExists(baseDirectory, state.host), state);
                if (resolvedFileName_1) {
                    return resolvedFileName_1;
                }
            }
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Module_resolution_using_rootDirs_has_failed);
            }
        }
        return undefined;
    }
    function tryLoadModuleUsingBaseUrl(extensions, moduleName, loader, failedLookupLocations, state) {
        if (!state.compilerOptions.baseUrl) {
            return undefined;
        }
        if (state.traceEnabled) {
            trace(state.host, ts.Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, state.compilerOptions.baseUrl, moduleName);
        }
        var matchedPattern = undefined;
        if (state.compilerOptions.paths) {
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0, moduleName);
            }
            matchedPattern = ts.matchPatternOrExact(ts.getOwnKeys(state.compilerOptions.paths), moduleName);
        }
        if (matchedPattern) {
            var matchedStar_1 = ts.isString(matchedPattern) ? undefined : ts.matchedText(matchedPattern, moduleName);
            var matchedPatternText = ts.isString(matchedPattern) ? matchedPattern : ts.patternText(matchedPattern);
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Module_name_0_matched_pattern_1, moduleName, matchedPatternText);
            }
            return ts.forEach(state.compilerOptions.paths[matchedPatternText], function (subst) {
                var path = matchedStar_1 ? subst.replace("*", matchedStar_1) : subst;
                var candidate = ts.normalizePath(ts.combinePaths(state.compilerOptions.baseUrl, path));
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, subst, path);
                }
                var extension = ts.tryGetExtensionFromPath(candidate);
                if (extension !== undefined) {
                    var path_1 = tryFile(candidate, failedLookupLocations, false, state);
                    if (path_1 !== undefined) {
                        return noPackageId({ path: path_1, ext: extension });
                    }
                }
                return loader(extensions, candidate, failedLookupLocations, !directoryProbablyExists(ts.getDirectoryPath(candidate), state.host), state);
            });
        }
        else {
            var candidate = ts.normalizePath(ts.combinePaths(state.compilerOptions.baseUrl, moduleName));
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, state.compilerOptions.baseUrl, candidate);
            }
            return loader(extensions, candidate, failedLookupLocations, !directoryProbablyExists(ts.getDirectoryPath(candidate), state.host), state);
        }
    }
    function nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache) {
        return nodeModuleNameResolverWorker(moduleName, ts.getDirectoryPath(containingFile), compilerOptions, host, cache, false);
    }
    ts.nodeModuleNameResolver = nodeModuleNameResolver;
    function resolveJavaScriptModule(moduleName, initialDir, host) {
        var _a = nodeModuleNameResolverWorker(moduleName, initialDir, { moduleResolution: ts.ModuleResolutionKind.NodeJs, allowJs: true }, host, undefined, true), resolvedModule = _a.resolvedModule, failedLookupLocations = _a.failedLookupLocations;
        if (!resolvedModule) {
            throw new Error("Could not resolve JS module '" + moduleName + "' starting at '" + initialDir + "'. Looked in: " + failedLookupLocations.join(", "));
        }
        return resolvedModule.resolvedFileName;
    }
    ts.resolveJavaScriptModule = resolveJavaScriptModule;
    function nodeModuleNameResolverWorker(moduleName, containingDirectory, compilerOptions, host, cache, jsOnly) {
        var traceEnabled = isTraceEnabled(compilerOptions, host);
        var failedLookupLocations = [];
        var state = { compilerOptions: compilerOptions, host: host, traceEnabled: traceEnabled };
        var result = jsOnly ? tryResolve(Extensions.JavaScript) : (tryResolve(Extensions.TypeScript) || tryResolve(Extensions.JavaScript));
        if (result && result.value) {
            var _a = result.value, resolved = _a.resolved, isExternalLibraryImport = _a.isExternalLibraryImport;
            return createResolvedModuleWithFailedLookupLocations(resolved, isExternalLibraryImport, failedLookupLocations);
        }
        return { resolvedModule: undefined, failedLookupLocations: failedLookupLocations };
        function tryResolve(extensions) {
            var loader = function (extensions, candidate, failedLookupLocations, onlyRecordFailures, state) { return nodeLoadModuleByRelativeName(extensions, candidate, failedLookupLocations, onlyRecordFailures, state, true); };
            var resolved = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loader, failedLookupLocations, state);
            if (resolved) {
                return toSearchResult({ resolved: resolved, isExternalLibraryImport: false });
            }
            if (!ts.isExternalModuleNameRelative(moduleName)) {
                if (traceEnabled) {
                    trace(host, ts.Diagnostics.Loading_module_0_from_node_modules_folder_target_file_type_1, moduleName, Extensions[extensions]);
                }
                var resolved_1 = loadModuleFromNodeModules(extensions, moduleName, containingDirectory, failedLookupLocations, state, cache);
                if (!resolved_1)
                    return undefined;
                var resolvedValue = resolved_1.value;
                if (!compilerOptions.preserveSymlinks) {
                    resolvedValue = resolvedValue && __assign({}, resolved_1.value, { path: realPath(resolved_1.value.path, host, traceEnabled), extension: resolved_1.value.extension });
                }
                return { value: resolvedValue && { resolved: resolvedValue, isExternalLibraryImport: true } };
            }
            else {
                var _a = ts.normalizePathAndParts(ts.combinePaths(containingDirectory, moduleName)), candidate = _a.path, parts = _a.parts;
                var resolved_2 = nodeLoadModuleByRelativeName(extensions, candidate, failedLookupLocations, false, state, true);
                return resolved_2 && toSearchResult({ resolved: resolved_2, isExternalLibraryImport: ts.contains(parts, "node_modules") });
            }
        }
    }
    function realPath(path, host, traceEnabled) {
        if (!host.realpath) {
            return path;
        }
        var real = ts.normalizePath(host.realpath(path));
        if (traceEnabled) {
            trace(host, ts.Diagnostics.Resolving_real_path_for_0_result_1, path, real);
        }
        return real;
    }
    function nodeLoadModuleByRelativeName(extensions, candidate, failedLookupLocations, onlyRecordFailures, state, considerPackageJson) {
        if (state.traceEnabled) {
            trace(state.host, ts.Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_type_1, candidate, Extensions[extensions]);
        }
        if (!ts.pathEndsWithDirectorySeparator(candidate)) {
            if (!onlyRecordFailures) {
                var parentOfCandidate = ts.getDirectoryPath(candidate);
                if (!directoryProbablyExists(parentOfCandidate, state.host)) {
                    if (state.traceEnabled) {
                        trace(state.host, ts.Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, parentOfCandidate);
                    }
                    onlyRecordFailures = true;
                }
            }
            var resolvedFromFile = loadModuleFromFile(extensions, candidate, failedLookupLocations, onlyRecordFailures, state);
            if (resolvedFromFile) {
                return noPackageId(resolvedFromFile);
            }
        }
        if (!onlyRecordFailures) {
            var candidateExists = directoryProbablyExists(candidate, state.host);
            if (!candidateExists) {
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidate);
                }
                onlyRecordFailures = true;
            }
        }
        return loadNodeModuleFromDirectory(extensions, candidate, failedLookupLocations, onlyRecordFailures, state, considerPackageJson);
    }
    function directoryProbablyExists(directoryName, host) {
        return !host.directoryExists || host.directoryExists(directoryName);
    }
    ts.directoryProbablyExists = directoryProbablyExists;
    function loadModuleFromFileNoPackageId(extensions, candidate, failedLookupLocations, onlyRecordFailures, state) {
        return noPackageId(loadModuleFromFile(extensions, candidate, failedLookupLocations, onlyRecordFailures, state));
    }
    function loadModuleFromFile(extensions, candidate, failedLookupLocations, onlyRecordFailures, state) {
        var resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, failedLookupLocations, onlyRecordFailures, state);
        if (resolvedByAddingExtension) {
            return resolvedByAddingExtension;
        }
        if (ts.hasJavaScriptFileExtension(candidate)) {
            var extensionless = ts.removeFileExtension(candidate);
            if (state.traceEnabled) {
                var extension = candidate.substring(extensionless.length);
                trace(state.host, ts.Diagnostics.File_name_0_has_a_1_extension_stripping_it, candidate, extension);
            }
            return tryAddingExtensions(extensionless, extensions, failedLookupLocations, onlyRecordFailures, state);
        }
    }
    function tryAddingExtensions(candidate, extensions, failedLookupLocations, onlyRecordFailures, state) {
        if (!onlyRecordFailures) {
            var directory = ts.getDirectoryPath(candidate);
            if (directory) {
                onlyRecordFailures = !directoryProbablyExists(directory, state.host);
            }
        }
        switch (extensions) {
            case Extensions.DtsOnly:
                return tryExtension(".d.ts");
            case Extensions.TypeScript:
                return tryExtension(".ts") || tryExtension(".tsx") || tryExtension(".d.ts");
            case Extensions.JavaScript:
                return tryExtension(".js") || tryExtension(".jsx");
        }
        function tryExtension(ext) {
            var path = tryFile(candidate + ext, failedLookupLocations, onlyRecordFailures, state);
            return path && { path: path, ext: ext };
        }
    }
    function tryFile(fileName, failedLookupLocations, onlyRecordFailures, state) {
        if (!onlyRecordFailures) {
            if (state.host.fileExists(fileName)) {
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.File_0_exist_use_it_as_a_name_resolution_result, fileName);
                }
                return fileName;
            }
            else {
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.File_0_does_not_exist, fileName);
                }
            }
        }
        failedLookupLocations.push(fileName);
        return undefined;
    }
    function loadNodeModuleFromDirectory(extensions, candidate, failedLookupLocations, onlyRecordFailures, state, considerPackageJson) {
        if (considerPackageJson === void 0) { considerPackageJson = true; }
        var _a = considerPackageJson
            ? getPackageJsonInfo(candidate, "", failedLookupLocations, onlyRecordFailures, state)
            : { packageJsonContent: undefined, packageId: undefined }, packageJsonContent = _a.packageJsonContent, packageId = _a.packageId;
        return withPackageId(packageId, loadNodeModuleFromDirectoryWorker(extensions, candidate, failedLookupLocations, onlyRecordFailures, state, packageJsonContent));
    }
    function loadNodeModuleFromDirectoryWorker(extensions, candidate, failedLookupLocations, onlyRecordFailures, state, packageJsonContent) {
        var fromPackageJson = packageJsonContent && loadModuleFromPackageJson(packageJsonContent, extensions, candidate, failedLookupLocations, state);
        if (fromPackageJson) {
            return fromPackageJson;
        }
        var directoryExists = !onlyRecordFailures && directoryProbablyExists(candidate, state.host);
        return loadModuleFromFile(extensions, ts.combinePaths(candidate, "index"), failedLookupLocations, !directoryExists, state);
    }
    function getPackageJsonInfo(nodeModuleDirectory, subModuleName, failedLookupLocations, onlyRecordFailures, _a) {
        var host = _a.host, traceEnabled = _a.traceEnabled;
        var directoryExists = !onlyRecordFailures && directoryProbablyExists(nodeModuleDirectory, host);
        var packageJsonPath = pathToPackageJson(nodeModuleDirectory);
        if (directoryExists && host.fileExists(packageJsonPath)) {
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Found_package_json_at_0, packageJsonPath);
            }
            var packageJsonContent = readJson(packageJsonPath, host);
            var packageId = typeof packageJsonContent.name === "string" && typeof packageJsonContent.version === "string"
                ? { name: packageJsonContent.name, subModuleName: subModuleName, version: packageJsonContent.version }
                : undefined;
            return { found: true, packageJsonContent: packageJsonContent, packageId: packageId };
        }
        else {
            if (directoryExists && traceEnabled) {
                trace(host, ts.Diagnostics.File_0_does_not_exist, packageJsonPath);
            }
            failedLookupLocations.push(packageJsonPath);
            return { found: false, packageJsonContent: undefined, packageId: undefined };
        }
    }
    function loadModuleFromPackageJson(jsonContent, extensions, candidate, failedLookupLocations, state) {
        var file = tryReadPackageJsonFields(extensions !== Extensions.JavaScript, jsonContent, candidate, state);
        if (!file) {
            return undefined;
        }
        var onlyRecordFailures = !directoryProbablyExists(ts.getDirectoryPath(file), state.host);
        var fromFile = tryFile(file, failedLookupLocations, onlyRecordFailures, state);
        if (fromFile) {
            var resolved = fromFile && resolvedIfExtensionMatches(extensions, fromFile);
            if (resolved) {
                return resolved;
            }
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.File_0_has_an_unsupported_extension_so_skipping_it, fromFile);
            }
        }
        var nextExtensions = extensions === Extensions.DtsOnly ? Extensions.TypeScript : extensions;
        var result = nodeLoadModuleByRelativeName(nextExtensions, file, failedLookupLocations, onlyRecordFailures, state, false);
        if (result) {
            ts.Debug.assert(result.packageId === undefined);
            return { path: result.path, ext: result.extension };
        }
    }
    function resolvedIfExtensionMatches(extensions, path) {
        var ext = ts.tryGetExtensionFromPath(path);
        return ext !== undefined && extensionIsOk(extensions, ext) ? { path: path, ext: ext } : undefined;
    }
    function extensionIsOk(extensions, extension) {
        switch (extensions) {
            case Extensions.JavaScript:
                return extension === ".js" || extension === ".jsx";
            case Extensions.TypeScript:
                return extension === ".ts" || extension === ".tsx" || extension === ".d.ts";
            case Extensions.DtsOnly:
                return extension === ".d.ts";
        }
    }
    function pathToPackageJson(directory) {
        return ts.combinePaths(directory, "package.json");
    }
    function loadModuleFromNodeModulesFolder(extensions, moduleName, nodeModulesFolder, nodeModulesFolderExists, failedLookupLocations, state) {
        var candidate = ts.normalizePath(ts.combinePaths(nodeModulesFolder, moduleName));
        var packageJsonContent;
        var packageId;
        var packageInfo = getPackageJsonInfo(candidate, "", failedLookupLocations, !nodeModulesFolderExists, state);
        if (packageInfo.found) {
            (packageJsonContent = packageInfo.packageJsonContent, packageId = packageInfo.packageId);
        }
        else {
            var _a = getPackageName(moduleName), packageName = _a.packageName, rest = _a.rest;
            if (rest !== "") {
                var packageRootPath = ts.combinePaths(nodeModulesFolder, packageName);
                packageId = getPackageJsonInfo(packageRootPath, rest, failedLookupLocations, !nodeModulesFolderExists, state).packageId;
            }
        }
        var pathAndExtension = loadModuleFromFile(extensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state) ||
            loadNodeModuleFromDirectoryWorker(extensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state, packageJsonContent);
        return withPackageId(packageId, pathAndExtension);
    }
    function getPackageName(moduleName) {
        var idx = moduleName.indexOf(ts.directorySeparator);
        if (moduleName[0] === "@") {
            idx = moduleName.indexOf(ts.directorySeparator, idx + 1);
        }
        return idx === -1 ? { packageName: moduleName, rest: "" } : { packageName: moduleName.slice(0, idx), rest: moduleName.slice(idx + 1) };
    }
    ts.getPackageName = getPackageName;
    function loadModuleFromNodeModules(extensions, moduleName, directory, failedLookupLocations, state, cache) {
        return loadModuleFromNodeModulesWorker(extensions, moduleName, directory, failedLookupLocations, state, false, cache);
    }
    function loadModuleFromNodeModulesAtTypes(moduleName, directory, failedLookupLocations, state) {
        return loadModuleFromNodeModulesWorker(Extensions.DtsOnly, moduleName, directory, failedLookupLocations, state, true, undefined);
    }
    function loadModuleFromNodeModulesWorker(extensions, moduleName, directory, failedLookupLocations, state, typesOnly, cache) {
        var perModuleNameCache = cache && cache.getOrCreateCacheForModuleName(moduleName);
        return ts.forEachAncestorDirectory(ts.normalizeSlashes(directory), function (ancestorDirectory) {
            if (ts.getBaseFileName(ancestorDirectory) !== "node_modules") {
                var resolutionFromCache = tryFindNonRelativeModuleNameInCache(perModuleNameCache, moduleName, ancestorDirectory, state.traceEnabled, state.host);
                if (resolutionFromCache) {
                    return resolutionFromCache;
                }
                return toSearchResult(loadModuleFromNodeModulesOneLevel(extensions, moduleName, ancestorDirectory, failedLookupLocations, state, typesOnly));
            }
        });
    }
    function loadModuleFromNodeModulesOneLevel(extensions, moduleName, directory, failedLookupLocations, state, typesOnly) {
        if (typesOnly === void 0) { typesOnly = false; }
        var nodeModulesFolder = ts.combinePaths(directory, "node_modules");
        var nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
        if (!nodeModulesFolderExists && state.traceEnabled) {
            trace(state.host, ts.Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesFolder);
        }
        var packageResult = typesOnly ? undefined : loadModuleFromNodeModulesFolder(extensions, moduleName, nodeModulesFolder, nodeModulesFolderExists, failedLookupLocations, state);
        if (packageResult) {
            return packageResult;
        }
        if (extensions !== Extensions.JavaScript) {
            var nodeModulesAtTypes_1 = ts.combinePaths(nodeModulesFolder, "@types");
            var nodeModulesAtTypesExists = nodeModulesFolderExists;
            if (nodeModulesFolderExists && !directoryProbablyExists(nodeModulesAtTypes_1, state.host)) {
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesAtTypes_1);
                }
                nodeModulesAtTypesExists = false;
            }
            return loadModuleFromNodeModulesFolder(Extensions.DtsOnly, mangleScopedPackage(moduleName, state), nodeModulesAtTypes_1, nodeModulesAtTypesExists, failedLookupLocations, state);
        }
    }
    var mangledScopedPackageSeparator = "__";
    function mangleScopedPackage(packageName, state) {
        var mangled = getMangledNameForScopedPackage(packageName);
        if (state.traceEnabled && mangled !== packageName) {
            trace(state.host, ts.Diagnostics.Scoped_package_detected_looking_in_0, mangled);
        }
        return mangled;
    }
    function getTypesPackageName(packageName) {
        return "@types/" + getMangledNameForScopedPackage(packageName);
    }
    ts.getTypesPackageName = getTypesPackageName;
    function getMangledNameForScopedPackage(packageName) {
        if (ts.startsWith(packageName, "@")) {
            var replaceSlash = packageName.replace(ts.directorySeparator, mangledScopedPackageSeparator);
            if (replaceSlash !== packageName) {
                return replaceSlash.slice(1);
            }
        }
        return packageName;
    }
    function getPackageNameFromAtTypesDirectory(mangledName) {
        var withoutAtTypePrefix = ts.removePrefix(mangledName, "@types/");
        if (withoutAtTypePrefix !== mangledName) {
            return ts.stringContains(withoutAtTypePrefix, mangledScopedPackageSeparator) ?
                "@" + withoutAtTypePrefix.replace(mangledScopedPackageSeparator, ts.directorySeparator) :
                withoutAtTypePrefix;
        }
        return mangledName;
    }
    ts.getPackageNameFromAtTypesDirectory = getPackageNameFromAtTypesDirectory;
    function tryFindNonRelativeModuleNameInCache(cache, moduleName, containingDirectory, traceEnabled, host) {
        var result = cache && cache.get(containingDirectory);
        if (result) {
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Resolution_for_module_0_was_found_in_cache, moduleName);
            }
            return { value: result.resolvedModule && { path: result.resolvedModule.resolvedFileName, extension: result.resolvedModule.extension, packageId: result.resolvedModule.packageId } };
        }
    }
    function classicNameResolver(moduleName, containingFile, compilerOptions, host, cache) {
        var traceEnabled = isTraceEnabled(compilerOptions, host);
        var state = { compilerOptions: compilerOptions, host: host, traceEnabled: traceEnabled };
        var failedLookupLocations = [];
        var containingDirectory = ts.getDirectoryPath(containingFile);
        var resolved = tryResolve(Extensions.TypeScript) || tryResolve(Extensions.JavaScript);
        return createResolvedModuleWithFailedLookupLocations(resolved && resolved.value, false, failedLookupLocations);
        function tryResolve(extensions) {
            var resolvedUsingSettings = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loadModuleFromFileNoPackageId, failedLookupLocations, state);
            if (resolvedUsingSettings) {
                return { value: resolvedUsingSettings };
            }
            var perModuleNameCache = cache && cache.getOrCreateCacheForModuleName(moduleName);
            if (!ts.isExternalModuleNameRelative(moduleName)) {
                var resolved_3 = ts.forEachAncestorDirectory(containingDirectory, function (directory) {
                    var resolutionFromCache = tryFindNonRelativeModuleNameInCache(perModuleNameCache, moduleName, directory, traceEnabled, host);
                    if (resolutionFromCache) {
                        return resolutionFromCache;
                    }
                    var searchName = ts.normalizePath(ts.combinePaths(directory, moduleName));
                    return toSearchResult(loadModuleFromFileNoPackageId(extensions, searchName, failedLookupLocations, false, state));
                });
                if (resolved_3) {
                    return resolved_3;
                }
                if (extensions === Extensions.TypeScript) {
                    return loadModuleFromNodeModulesAtTypes(moduleName, containingDirectory, failedLookupLocations, state);
                }
            }
            else {
                var candidate = ts.normalizePath(ts.combinePaths(containingDirectory, moduleName));
                return toSearchResult(loadModuleFromFileNoPackageId(extensions, candidate, failedLookupLocations, false, state));
            }
        }
    }
    ts.classicNameResolver = classicNameResolver;
    function loadModuleFromGlobalCache(moduleName, projectName, compilerOptions, host, globalCache) {
        var traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, ts.Diagnostics.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2, projectName, moduleName, globalCache);
        }
        var state = { compilerOptions: compilerOptions, host: host, traceEnabled: traceEnabled };
        var failedLookupLocations = [];
        var resolved = loadModuleFromNodeModulesOneLevel(Extensions.DtsOnly, moduleName, globalCache, failedLookupLocations, state);
        return createResolvedModuleWithFailedLookupLocations(resolved, true, failedLookupLocations);
    }
    ts.loadModuleFromGlobalCache = loadModuleFromGlobalCache;
    function toSearchResult(value) {
        return value !== undefined ? { value: value } : undefined;
    }
})(ts || (ts = {}));
var ts;
(function (ts) {
    var server;
    (function (server) {
        var typingsInstaller;
        (function (typingsInstaller) {
            var nullLog = {
                isEnabled: function () { return false; },
                writeLine: ts.noop
            };
            function typingToFileName(cachePath, packageName, installTypingHost, log) {
                try {
                    var result = ts.resolveModuleName(packageName, ts.combinePaths(cachePath, "index.d.ts"), { moduleResolution: ts.ModuleResolutionKind.NodeJs }, installTypingHost);
                    return result.resolvedModule && result.resolvedModule.resolvedFileName;
                }
                catch (e) {
                    if (log.isEnabled()) {
                        log.writeLine("Failed to resolve " + packageName + " in folder '" + cachePath + "': " + e.message);
                    }
                    return undefined;
                }
            }
            var TypingsInstaller = (function () {
                function TypingsInstaller(installTypingHost, globalCachePath, safeListPath, typesMapLocation, throttleLimit, log) {
                    if (log === void 0) { log = nullLog; }
                    this.installTypingHost = installTypingHost;
                    this.globalCachePath = globalCachePath;
                    this.safeListPath = safeListPath;
                    this.typesMapLocation = typesMapLocation;
                    this.throttleLimit = throttleLimit;
                    this.log = log;
                    this.packageNameToTypingLocation = ts.createMap();
                    this.missingTypingsSet = ts.createMap();
                    this.knownCachesSet = ts.createMap();
                    this.projectWatchers = ts.createMap();
                    this.pendingRunRequests = [];
                    this.installRunCount = 1;
                    this.inFlightRequestCount = 0;
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Global cache location '" + globalCachePath + "', safe file path '" + safeListPath + "', types map path " + typesMapLocation);
                    }
                    this.processCacheLocation(this.globalCachePath);
                }
                TypingsInstaller.prototype.closeProject = function (req) {
                    this.closeWatchers(req.projectName);
                };
                TypingsInstaller.prototype.closeWatchers = function (projectName) {
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Closing file watchers for project '" + projectName + "'");
                    }
                    var watchers = this.projectWatchers.get(projectName);
                    if (!watchers) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine("No watchers are registered for project '" + projectName + "'");
                        }
                        return;
                    }
                    for (var _i = 0, watchers_1 = watchers; _i < watchers_1.length; _i++) {
                        var w = watchers_1[_i];
                        w.close();
                    }
                    this.projectWatchers.delete(projectName);
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Closing file watchers for project '" + projectName + "' - done.");
                    }
                };
                TypingsInstaller.prototype.install = function (req) {
                    var _this = this;
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Got install request " + JSON.stringify(req));
                    }
                    if (req.cachePath) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine("Request specifies cache path '" + req.cachePath + "', loading cached information...");
                        }
                        this.processCacheLocation(req.cachePath);
                    }
                    if (this.safeList === undefined) {
                        this.initializeSafeList();
                    }
                    var discoverTypingsResult = ts.JsTyping.discoverTypings(this.installTypingHost, this.log.isEnabled() ? (function (s) { return _this.log.writeLine(s); }) : undefined, req.fileNames, req.projectRootPath, this.safeList, this.packageNameToTypingLocation, req.typeAcquisition, req.unresolvedImports);
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Finished typings discovery: " + JSON.stringify(discoverTypingsResult));
                    }
                    this.sendResponse(this.createSetTypings(req, discoverTypingsResult.cachedTypingPaths));
                    this.watchFiles(req.projectName, discoverTypingsResult.filesToWatch);
                    if (discoverTypingsResult.newTypingNames.length) {
                        this.installTypings(req, req.cachePath || this.globalCachePath, discoverTypingsResult.cachedTypingPaths, discoverTypingsResult.newTypingNames);
                    }
                    else {
                        if (this.log.isEnabled()) {
                            this.log.writeLine("No new typings were requested as a result of typings discovery");
                        }
                    }
                };
                TypingsInstaller.prototype.initializeSafeList = function () {
                    if (this.typesMapLocation) {
                        var safeListFromMap = ts.JsTyping.loadTypesMap(this.installTypingHost, this.typesMapLocation);
                        if (safeListFromMap) {
                            this.log.writeLine("Loaded safelist from types map file '" + this.typesMapLocation + "'");
                            this.safeList = safeListFromMap;
                            return;
                        }
                        this.log.writeLine("Failed to load safelist from types map file '" + this.typesMapLocation + "'");
                    }
                    this.safeList = ts.JsTyping.loadSafeList(this.installTypingHost, this.safeListPath);
                };
                TypingsInstaller.prototype.processCacheLocation = function (cacheLocation) {
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Processing cache location '" + cacheLocation + "'");
                    }
                    if (this.knownCachesSet.get(cacheLocation)) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine("Cache location was already processed...");
                        }
                        return;
                    }
                    var packageJson = ts.combinePaths(cacheLocation, "package.json");
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Trying to find '" + packageJson + "'...");
                    }
                    if (this.installTypingHost.fileExists(packageJson)) {
                        var npmConfig = JSON.parse(this.installTypingHost.readFile(packageJson));
                        if (this.log.isEnabled()) {
                            this.log.writeLine("Loaded content of '" + packageJson + "': " + JSON.stringify(npmConfig));
                        }
                        if (npmConfig.devDependencies) {
                            for (var key in npmConfig.devDependencies) {
                                var packageName = ts.getBaseFileName(key);
                                if (!packageName) {
                                    continue;
                                }
                                var typingFile = typingToFileName(cacheLocation, packageName, this.installTypingHost, this.log);
                                if (!typingFile) {
                                    this.missingTypingsSet.set(packageName, true);
                                    continue;
                                }
                                var existingTypingFile = this.packageNameToTypingLocation.get(packageName);
                                if (existingTypingFile === typingFile) {
                                    continue;
                                }
                                if (existingTypingFile) {
                                    if (this.log.isEnabled()) {
                                        this.log.writeLine("New typing for package " + packageName + " from '" + typingFile + "' conflicts with existing typing file '" + existingTypingFile + "'");
                                    }
                                }
                                if (this.log.isEnabled()) {
                                    this.log.writeLine("Adding entry into typings cache: '" + packageName + "' => '" + typingFile + "'");
                                }
                                this.packageNameToTypingLocation.set(packageName, typingFile);
                            }
                        }
                    }
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Finished processing cache location '" + cacheLocation + "'");
                    }
                    this.knownCachesSet.set(cacheLocation, true);
                };
                TypingsInstaller.prototype.filterTypings = function (typingsToInstall) {
                    if (typingsToInstall.length === 0) {
                        return typingsToInstall;
                    }
                    var result = [];
                    for (var _i = 0, typingsToInstall_1 = typingsToInstall; _i < typingsToInstall_1.length; _i++) {
                        var typing = typingsToInstall_1[_i];
                        if (this.missingTypingsSet.get(typing) || this.packageNameToTypingLocation.get(typing)) {
                            continue;
                        }
                        var validationResult = ts.JsTyping.validatePackageName(typing);
                        if (validationResult === 0) {
                            if (this.typesRegistry.has(typing)) {
                                result.push(typing);
                            }
                            else {
                                if (this.log.isEnabled()) {
                                    this.log.writeLine("Entry for package '" + typing + "' does not exist in local types registry - skipping...");
                                }
                            }
                        }
                        else {
                            this.missingTypingsSet.set(typing, true);
                            if (this.log.isEnabled()) {
                                this.log.writeLine(ts.JsTyping.renderPackageNameValidationFailure(validationResult, typing));
                            }
                        }
                    }
                    return result;
                };
                TypingsInstaller.prototype.ensurePackageDirectoryExists = function (directory) {
                    var npmConfigPath = ts.combinePaths(directory, "package.json");
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Npm config file: " + npmConfigPath);
                    }
                    if (!this.installTypingHost.fileExists(npmConfigPath)) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine("Npm config file: '" + npmConfigPath + "' is missing, creating new one...");
                        }
                        this.ensureDirectoryExists(directory, this.installTypingHost);
                        this.installTypingHost.writeFile(npmConfigPath, "{}");
                    }
                };
                TypingsInstaller.prototype.installTypings = function (req, cachePath, currentlyCachedTypings, typingsToInstall) {
                    var _this = this;
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Installing typings " + JSON.stringify(typingsToInstall));
                    }
                    var filteredTypings = this.filterTypings(typingsToInstall);
                    if (filteredTypings.length === 0) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine("All typings are known to be missing or invalid - no need to go any further");
                        }
                        return;
                    }
                    this.ensurePackageDirectoryExists(cachePath);
                    var requestId = this.installRunCount;
                    this.installRunCount++;
                    this.sendResponse({
                        kind: server.EventBeginInstallTypes,
                        eventId: requestId,
                        typingsInstallerVersion: ts.version,
                        projectName: req.projectName
                    });
                    var scopedTypings = filteredTypings.map(typingsName);
                    this.installTypingsAsync(requestId, scopedTypings, cachePath, function (ok) {
                        try {
                            if (!ok) {
                                if (_this.log.isEnabled()) {
                                    _this.log.writeLine("install request failed, marking packages as missing to prevent repeated requests: " + JSON.stringify(filteredTypings));
                                }
                                for (var _i = 0, filteredTypings_1 = filteredTypings; _i < filteredTypings_1.length; _i++) {
                                    var typing = filteredTypings_1[_i];
                                    _this.missingTypingsSet.set(typing, true);
                                }
                                return;
                            }
                            if (_this.log.isEnabled()) {
                                _this.log.writeLine("Installed typings " + JSON.stringify(scopedTypings));
                            }
                            var installedTypingFiles = [];
                            for (var _a = 0, filteredTypings_2 = filteredTypings; _a < filteredTypings_2.length; _a++) {
                                var packageName = filteredTypings_2[_a];
                                var typingFile = typingToFileName(cachePath, packageName, _this.installTypingHost, _this.log);
                                if (!typingFile) {
                                    _this.missingTypingsSet.set(packageName, true);
                                    continue;
                                }
                                if (!_this.packageNameToTypingLocation.has(packageName)) {
                                    _this.packageNameToTypingLocation.set(packageName, typingFile);
                                }
                                installedTypingFiles.push(typingFile);
                            }
                            if (_this.log.isEnabled()) {
                                _this.log.writeLine("Installed typing files " + JSON.stringify(installedTypingFiles));
                            }
                            _this.sendResponse(_this.createSetTypings(req, currentlyCachedTypings.concat(installedTypingFiles)));
                        }
                        finally {
                            var response = {
                                kind: server.EventEndInstallTypes,
                                eventId: requestId,
                                projectName: req.projectName,
                                packagesToInstall: scopedTypings,
                                installSuccess: ok,
                                typingsInstallerVersion: ts.version
                            };
                            _this.sendResponse(response);
                        }
                    });
                };
                TypingsInstaller.prototype.ensureDirectoryExists = function (directory, host) {
                    var directoryName = ts.getDirectoryPath(directory);
                    if (!host.directoryExists(directoryName)) {
                        this.ensureDirectoryExists(directoryName, host);
                    }
                    if (!host.directoryExists(directory)) {
                        host.createDirectory(directory);
                    }
                };
                TypingsInstaller.prototype.watchFiles = function (projectName, files) {
                    var _this = this;
                    if (!files.length) {
                        return;
                    }
                    this.closeWatchers(projectName);
                    var isInvoked = false;
                    var watchers = [];
                    for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
                        var file = files_2[_i];
                        var w = this.installTypingHost.watchFile(file, function (f) {
                            if (_this.log.isEnabled()) {
                                _this.log.writeLine("Got FS notification for " + f + ", handler is already invoked '" + isInvoked + "'");
                            }
                            if (!isInvoked) {
                                _this.sendResponse({ projectName: projectName, kind: server.ActionInvalidate });
                                isInvoked = true;
                            }
                        }, 2000);
                        watchers.push(w);
                    }
                    this.projectWatchers.set(projectName, watchers);
                };
                TypingsInstaller.prototype.createSetTypings = function (request, typings) {
                    return {
                        projectName: request.projectName,
                        typeAcquisition: request.typeAcquisition,
                        compilerOptions: request.compilerOptions,
                        typings: typings,
                        unresolvedImports: request.unresolvedImports,
                        kind: server.ActionSet
                    };
                };
                TypingsInstaller.prototype.installTypingsAsync = function (requestId, packageNames, cwd, onRequestCompleted) {
                    this.pendingRunRequests.unshift({ requestId: requestId, packageNames: packageNames, cwd: cwd, onRequestCompleted: onRequestCompleted });
                    this.executeWithThrottling();
                };
                TypingsInstaller.prototype.executeWithThrottling = function () {
                    var _this = this;
                    var _loop_4 = function () {
                        this_1.inFlightRequestCount++;
                        var request = this_1.pendingRunRequests.pop();
                        this_1.installWorker(request.requestId, request.packageNames, request.cwd, function (ok) {
                            _this.inFlightRequestCount--;
                            request.onRequestCompleted(ok);
                            _this.executeWithThrottling();
                        });
                    };
                    var this_1 = this;
                    while (this.inFlightRequestCount < this.throttleLimit && this.pendingRunRequests.length) {
                        _loop_4();
                    }
                };
                return TypingsInstaller;
            }());
            typingsInstaller.TypingsInstaller = TypingsInstaller;
            function typingsName(packageName) {
                return "@types/" + packageName + "@ts" + ts.versionMajorMinor;
            }
            typingsInstaller.typingsName = typingsName;
        })(typingsInstaller = server.typingsInstaller || (server.typingsInstaller = {}));
    })(server = ts.server || (ts.server = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var server;
    (function (server) {
        var typingsInstaller;
        (function (typingsInstaller) {
            var fs = require("fs");
            var path = require("path");
            var FileLog = (function () {
                function FileLog(logFile) {
                    var _this = this;
                    this.logFile = logFile;
                    this.logEnabled = true;
                    this.isEnabled = function () {
                        return _this.logEnabled && _this.logFile !== undefined;
                    };
                    this.writeLine = function (text) {
                        try {
                            fs.appendFileSync(_this.logFile, text + ts.sys.newLine);
                        }
                        catch (e) {
                            _this.logEnabled = false;
                        }
                    };
                }
                return FileLog;
            }());
            function getDefaultNPMLocation(processName) {
                if (path.basename(processName).indexOf("node") === 0) {
                    return "\"" + path.join(path.dirname(process.argv[0]), "npm") + "\"";
                }
                else {
                    return "npm";
                }
            }
            function loadTypesRegistryFile(typesRegistryFilePath, host, log) {
                if (!host.fileExists(typesRegistryFilePath)) {
                    if (log.isEnabled()) {
                        log.writeLine("Types registry file '" + typesRegistryFilePath + "' does not exist");
                    }
                    return ts.createMap();
                }
                try {
                    var content = JSON.parse(host.readFile(typesRegistryFilePath));
                    return ts.createMapFromTemplate(content.entries);
                }
                catch (e) {
                    if (log.isEnabled()) {
                        log.writeLine("Error when loading types registry file '" + typesRegistryFilePath + "': " + e.message + ", " + e.stack);
                    }
                    return ts.createMap();
                }
            }
            var TypesRegistryPackageName = "types-registry";
            function getTypesRegistryFileLocation(globalTypingsCacheLocation) {
                return ts.combinePaths(ts.normalizeSlashes(globalTypingsCacheLocation), "node_modules/" + TypesRegistryPackageName + "/index.json");
            }
            var NodeTypingsInstaller = (function (_super) {
                __extends(NodeTypingsInstaller, _super);
                function NodeTypingsInstaller(globalTypingsCacheLocation, typingSafeListLocation, typesMapLocation, npmLocation, throttleLimit, log) {
                    var _this = _super.call(this, ts.sys, globalTypingsCacheLocation, typingSafeListLocation ? ts.toPath(typingSafeListLocation, "", ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)) : ts.toPath("typingSafeList.json", __dirname, ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)), typesMapLocation ? ts.toPath(typesMapLocation, "", ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)) : ts.toPath("typesMap.json", __dirname, ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)), throttleLimit, log) || this;
                    _this.npmPath = npmLocation !== undefined ? npmLocation : getDefaultNPMLocation(process.argv[0]);
                    if (ts.stringContains(_this.npmPath, " ") && _this.npmPath[0] !== "\"") {
                        _this.npmPath = "\"" + _this.npmPath + "\"";
                    }
                    if (_this.log.isEnabled()) {
                        _this.log.writeLine("Process id: " + process.pid);
                        _this.log.writeLine("NPM location: " + _this.npmPath + " (explicit '" + server.Arguments.NpmLocation + "' " + (npmLocation === undefined ? "not " : "") + " provided)");
                    }
                    (_this.nodeExecSync = require("child_process").execSync);
                    _this.ensurePackageDirectoryExists(globalTypingsCacheLocation);
                    try {
                        if (_this.log.isEnabled()) {
                            _this.log.writeLine("Updating " + TypesRegistryPackageName + " npm package...");
                        }
                        _this.execSyncAndLog(_this.npmPath + " install --ignore-scripts " + TypesRegistryPackageName, { cwd: globalTypingsCacheLocation });
                        if (_this.log.isEnabled()) {
                            _this.log.writeLine("Updated " + TypesRegistryPackageName + " npm package");
                        }
                    }
                    catch (e) {
                        if (_this.log.isEnabled()) {
                            _this.log.writeLine("Error updating " + TypesRegistryPackageName + " package: " + e.message);
                        }
                        _this.delayedInitializationError = {
                            kind: "event::initializationFailed",
                            message: e.message
                        };
                    }
                    _this.typesRegistry = loadTypesRegistryFile(getTypesRegistryFileLocation(globalTypingsCacheLocation), _this.installTypingHost, _this.log);
                    return _this;
                }
                NodeTypingsInstaller.prototype.listen = function () {
                    var _this = this;
                    process.on("message", function (req) {
                        if (_this.delayedInitializationError) {
                            _this.sendResponse(_this.delayedInitializationError);
                            _this.delayedInitializationError = undefined;
                        }
                        switch (req.kind) {
                            case "discover":
                                _this.install(req);
                                break;
                            case "closeProject":
                                _this.closeProject(req);
                                break;
                            case "typesRegistry": {
                                var typesRegistry_1 = {};
                                _this.typesRegistry.forEach(function (value, key) {
                                    typesRegistry_1[key] = value;
                                });
                                var response = { kind: server.EventTypesRegistry, typesRegistry: typesRegistry_1 };
                                _this.sendResponse(response);
                                break;
                            }
                            case "installPackage": {
                                var fileName = req.fileName, packageName_1 = req.packageName, projectRootPath = req.projectRootPath;
                                var cwd = getDirectoryOfPackageJson(fileName, _this.installTypingHost) || projectRootPath;
                                if (cwd) {
                                    _this.installWorker(-1, [packageName_1], cwd, function (success) {
                                        var message = success ? "Package " + packageName_1 + " installed." : "There was an error installing " + packageName_1 + ".";
                                        var response = { kind: server.EventPackageInstalled, success: success, message: message };
                                        _this.sendResponse(response);
                                    });
                                }
                                else {
                                    var response = { kind: server.EventPackageInstalled, success: false, message: "Could not determine a project root path." };
                                    _this.sendResponse(response);
                                }
                                break;
                            }
                            default:
                                ts.Debug.assertNever(req);
                        }
                    });
                };
                NodeTypingsInstaller.prototype.sendResponse = function (response) {
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Sending response:\n    " + JSON.stringify(response));
                    }
                    process.send(response);
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Response has been sent.");
                    }
                };
                NodeTypingsInstaller.prototype.installWorker = function (requestId, packageNames, cwd, onRequestCompleted) {
                    if (this.log.isEnabled()) {
                        this.log.writeLine("#" + requestId + " with arguments'" + JSON.stringify(packageNames) + "'.");
                    }
                    var command = this.npmPath + " install --ignore-scripts " + packageNames.join(" ") + " --save-dev --user-agent=\"typesInstaller/" + ts.version + "\"";
                    var start = Date.now();
                    var hasError = this.execSyncAndLog(command, { cwd: cwd });
                    if (this.log.isEnabled()) {
                        this.log.writeLine("npm install #" + requestId + " took: " + (Date.now() - start) + " ms");
                    }
                    onRequestCompleted(!hasError);
                };
                NodeTypingsInstaller.prototype.execSyncAndLog = function (command, options) {
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Exec: " + command);
                    }
                    try {
                        var stdout = this.nodeExecSync(command, __assign({}, options, { encoding: "utf-8" }));
                        if (this.log.isEnabled()) {
                            this.log.writeLine("    Succeeded. stdout:" + indent(ts.sys.newLine, stdout));
                        }
                        return false;
                    }
                    catch (error) {
                        var stdout = error.stdout, stderr = error.stderr;
                        this.log.writeLine("    Failed. stdout:" + indent(ts.sys.newLine, stdout) + ts.sys.newLine + "    stderr:" + indent(ts.sys.newLine, stderr));
                        return true;
                    }
                };
                return NodeTypingsInstaller;
            }(typingsInstaller.TypingsInstaller));
            typingsInstaller.NodeTypingsInstaller = NodeTypingsInstaller;
            function getDirectoryOfPackageJson(fileName, host) {
                return ts.forEachAncestorDirectory(ts.getDirectoryPath(fileName), function (directory) {
                    if (host.fileExists(ts.combinePaths(directory, "package.json"))) {
                        return directory;
                    }
                });
            }
            var logFilePath = server.findArgument(server.Arguments.LogFile);
            var globalTypingsCacheLocation = server.findArgument(server.Arguments.GlobalCacheLocation);
            var typingSafeListLocation = server.findArgument(server.Arguments.TypingSafeListLocation);
            var typesMapLocation = server.findArgument(server.Arguments.TypesMapLocation);
            var npmLocation = server.findArgument(server.Arguments.NpmLocation);
            var log = new FileLog(logFilePath);
            if (log.isEnabled()) {
                process.on("uncaughtException", function (e) {
                    log.writeLine("Unhandled exception: " + e + " at " + e.stack);
                });
            }
            process.on("disconnect", function () {
                if (log.isEnabled()) {
                    log.writeLine("Parent process has exited, shutting down...");
                }
                process.exit(0);
            });
            var installer = new NodeTypingsInstaller(globalTypingsCacheLocation, typingSafeListLocation, typesMapLocation, npmLocation, 5, log);
            installer.listen();
            function indent(newline, string) {
                return newline + "    " + string.replace(/\r?\n/, newline + "    ");
            }
        })(typingsInstaller = server.typingsInstaller || (server.typingsInstaller = {}));
    })(server = ts.server || (ts.server = {}));
})(ts || (ts = {}));
