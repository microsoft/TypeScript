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

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts;
(function (ts) {
    var OperationCanceledException = (function () {
        function OperationCanceledException() {
        }
        return OperationCanceledException;
    }());
    ts.OperationCanceledException = OperationCanceledException;
    (function (ExitStatus) {
        ExitStatus[ExitStatus["Success"] = 0] = "Success";
        ExitStatus[ExitStatus["DiagnosticsPresent_OutputsSkipped"] = 1] = "DiagnosticsPresent_OutputsSkipped";
        ExitStatus[ExitStatus["DiagnosticsPresent_OutputsGenerated"] = 2] = "DiagnosticsPresent_OutputsGenerated";
    })(ts.ExitStatus || (ts.ExitStatus = {}));
    var ExitStatus = ts.ExitStatus;
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
    })(ts.TypeReferenceSerializationKind || (ts.TypeReferenceSerializationKind = {}));
    var TypeReferenceSerializationKind = ts.TypeReferenceSerializationKind;
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Message"] = 2] = "Message";
    })(ts.DiagnosticCategory || (ts.DiagnosticCategory = {}));
    var DiagnosticCategory = ts.DiagnosticCategory;
    (function (ModuleResolutionKind) {
        ModuleResolutionKind[ModuleResolutionKind["Classic"] = 1] = "Classic";
        ModuleResolutionKind[ModuleResolutionKind["NodeJs"] = 2] = "NodeJs";
    })(ts.ModuleResolutionKind || (ts.ModuleResolutionKind = {}));
    var ModuleResolutionKind = ts.ModuleResolutionKind;
    (function (ModuleKind) {
        ModuleKind[ModuleKind["None"] = 0] = "None";
        ModuleKind[ModuleKind["CommonJS"] = 1] = "CommonJS";
        ModuleKind[ModuleKind["AMD"] = 2] = "AMD";
        ModuleKind[ModuleKind["UMD"] = 3] = "UMD";
        ModuleKind[ModuleKind["System"] = 4] = "System";
        ModuleKind[ModuleKind["ES2015"] = 5] = "ES2015";
    })(ts.ModuleKind || (ts.ModuleKind = {}));
    var ModuleKind = ts.ModuleKind;
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
                marks[markName] = ts.timestamp();
                counts[markName] = (counts[markName] || 0) + 1;
                profilerEvent(markName);
            }
        }
        performance.mark = mark;
        function measure(measureName, startMarkName, endMarkName) {
            if (enabled) {
                var end = endMarkName && marks[endMarkName] || ts.timestamp();
                var start = startMarkName && marks[startMarkName] || profilerStart;
                measures[measureName] = (measures[measureName] || 0) + (end - start);
            }
        }
        performance.measure = measure;
        function getCount(markName) {
            return counts && counts[markName] || 0;
        }
        performance.getCount = getCount;
        function getDuration(measureName) {
            return measures && measures[measureName] || 0;
        }
        performance.getDuration = getDuration;
        function forEachMeasure(cb) {
            for (var key in measures) {
                cb(key, measures[key]);
            }
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
    var createObject = Object.create;
    ts.collator = typeof Intl === "object" && typeof Intl.Collator === "function" ? new Intl.Collator() : undefined;
    function createMap(template) {
        var map = createObject(null);
        map["__"] = undefined;
        delete map["__"];
        for (var key in template)
            if (hasOwnProperty.call(template, key)) {
                map[key] = template[key];
            }
        return map;
    }
    ts.createMap = createMap;
    function createFileMap(keyMapper) {
        var files = createMap();
        return {
            get: get,
            set: set,
            contains: contains,
            remove: remove,
            forEachValue: forEachValueInMap,
            getKeys: getKeys,
            clear: clear,
        };
        function forEachValueInMap(f) {
            for (var key in files) {
                f(key, files[key]);
            }
        }
        function getKeys() {
            var keys = [];
            for (var key in files) {
                keys.push(key);
            }
            return keys;
        }
        function get(path) {
            return files[toKey(path)];
        }
        function set(path, value) {
            files[toKey(path)] = value;
        }
        function contains(path) {
            return toKey(path) in files;
        }
        function remove(path) {
            var key = toKey(path);
            delete files[key];
        }
        function clear() {
            files = createMap();
        }
        function toKey(path) {
            return keyMapper ? keyMapper(path) : path;
        }
    }
    ts.createFileMap = createFileMap;
    function toPath(fileName, basePath, getCanonicalFileName) {
        var nonCanonicalizedPath = isRootedDiskPath(fileName)
            ? normalizePath(fileName)
            : getNormalizedAbsolutePath(fileName, basePath);
        return getCanonicalFileName(nonCanonicalizedPath);
    }
    ts.toPath = toPath;
    function forEach(array, callback) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                var result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
    ts.forEach = forEach;
    function every(array, callback) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (!callback(array[i], i)) {
                    return false;
                }
            }
        }
        return true;
    }
    ts.every = every;
    function find(array, predicate) {
        for (var i = 0, len = array.length; i < len; i++) {
            var value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }
    ts.find = find;
    function findMap(array, callback) {
        for (var i = 0, len = array.length; i < len; i++) {
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
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }
    ts.indexOf = indexOf;
    function indexOfAnyCharCode(text, charCodes, start) {
        for (var i = start || 0, len = text.length; i < len; i++) {
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
    function removeWhere(array, f) {
        var outIndex = 0;
        for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
            var item = array_2[_i];
            if (!f(item)) {
                array[outIndex] = item;
                outIndex++;
            }
        }
        if (outIndex !== array.length) {
            array.length = outIndex;
            return true;
        }
        return false;
    }
    ts.removeWhere = removeWhere;
    function filterMutate(array, f) {
        var outIndex = 0;
        for (var _i = 0, array_3 = array; _i < array_3.length; _i++) {
            var item = array_3[_i];
            if (f(item)) {
                array[outIndex] = item;
                outIndex++;
            }
        }
        array.length = outIndex;
    }
    ts.filterMutate = filterMutate;
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
            for (var _i = 0, array_4 = array; _i < array_4.length; _i++) {
                var v = array_4[_i];
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
    function mapObject(object, f) {
        var result;
        if (object) {
            result = {};
            for (var _i = 0, _a = getOwnKeys(object); _i < _a.length; _i++) {
                var v = _a[_i];
                var _b = f(v, object[v]) || [undefined, undefined], key = _b[0], value = _b[1];
                if (key !== undefined) {
                    result[key] = value;
                }
            }
        }
        return result;
    }
    ts.mapObject = mapObject;
    function some(array, predicate) {
        if (array) {
            for (var _i = 0, array_5 = array; _i < array_5.length; _i++) {
                var v = array_5[_i];
                if (!predicate || predicate(v)) {
                    return true;
                }
            }
        }
        return false;
    }
    ts.some = some;
    function concatenate(array1, array2) {
        if (!array2 || !array2.length)
            return array1;
        if (!array1 || !array1.length)
            return array2;
        return array1.concat(array2);
    }
    ts.concatenate = concatenate;
    function deduplicate(array, areEqual) {
        var result;
        if (array) {
            result = [];
            loop: for (var _i = 0, array_6 = array; _i < array_6.length; _i++) {
                var item = array_6[_i];
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
    function sum(array, prop) {
        var result = 0;
        for (var _i = 0, array_7 = array; _i < array_7.length; _i++) {
            var v = array_7[_i];
            result += v[prop];
        }
        return result;
    }
    ts.sum = sum;
    function addRange(to, from) {
        if (to && from) {
            for (var _i = 0, from_1 = from; _i < from_1.length; _i++) {
                var v = from_1[_i];
                if (v !== undefined) {
                    to.push(v);
                }
            }
        }
    }
    ts.addRange = addRange;
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
    function firstOrUndefined(array) {
        return array && array.length > 0
            ? array[0]
            : undefined;
    }
    ts.firstOrUndefined = firstOrUndefined;
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
    function lastOrUndefined(array) {
        return array && array.length > 0
            ? array[array.length - 1]
            : undefined;
    }
    ts.lastOrUndefined = lastOrUndefined;
    function replaceElement(array, index, value) {
        var result = array.slice(0);
        result[index] = value;
        return result;
    }
    ts.replaceElement = replaceElement;
    function binarySearch(array, value, comparer) {
        if (!array || array.length === 0) {
            return -1;
        }
        var low = 0;
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
        for (var key in map)
            if (hasOwnProperty.call(map, key)) {
                keys.push(key);
            }
        return keys;
    }
    ts.getOwnKeys = getOwnKeys;
    function forEachProperty(map, callback) {
        var result;
        for (var key in map) {
            if (result = callback(map[key], key))
                break;
        }
        return result;
    }
    ts.forEachProperty = forEachProperty;
    function someProperties(map, predicate) {
        for (var key in map) {
            if (!predicate || predicate(map[key], key))
                return true;
        }
        return false;
    }
    ts.someProperties = someProperties;
    function copyProperties(source, target) {
        for (var key in source) {
            target[key] = source[key];
        }
    }
    ts.copyProperties = copyProperties;
    function assign(t) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            for (var _b = 0, _c = getOwnKeys(arg); _b < _c.length; _b++) {
                var p = _c[_b];
                t[p] = arg[p];
            }
        }
        return t;
    }
    ts.assign = assign;
    function reduceProperties(map, callback, initial) {
        var result = initial;
        for (var key in map) {
            result = callback(result, map[key], String(key));
        }
        return result;
    }
    ts.reduceProperties = reduceProperties;
    function reduceOwnProperties(map, callback, initial) {
        var result = initial;
        for (var key in map)
            if (hasOwnProperty.call(map, key)) {
                result = callback(result, map[key], String(key));
            }
        return result;
    }
    ts.reduceOwnProperties = reduceOwnProperties;
    function equalOwnProperties(left, right, equalityComparer) {
        if (left === right)
            return true;
        if (!left || !right)
            return false;
        for (var key in left)
            if (hasOwnProperty.call(left, key)) {
                if (!hasOwnProperty.call(right, key) === undefined)
                    return false;
                if (equalityComparer ? !equalityComparer(left[key], right[key]) : left[key] !== right[key])
                    return false;
            }
        for (var key in right)
            if (hasOwnProperty.call(right, key)) {
                if (!hasOwnProperty.call(left, key))
                    return false;
            }
        return true;
    }
    ts.equalOwnProperties = equalOwnProperties;
    function arrayToMap(array, makeKey, makeValue) {
        var result = createMap();
        for (var _i = 0, array_8 = array; _i < array_8.length; _i++) {
            var value = array_8[_i];
            result[makeKey(value)] = makeValue ? makeValue(value) : value;
        }
        return result;
    }
    ts.arrayToMap = arrayToMap;
    function isEmpty(map) {
        for (var id in map) {
            if (hasProperty(map, id)) {
                return false;
            }
        }
        return true;
    }
    ts.isEmpty = isEmpty;
    function cloneMap(map) {
        var clone = createMap();
        copyProperties(map, clone);
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
        for (var id in second)
            if (hasOwnProperty.call(second, id)) {
                result[id] = second[id];
            }
        for (var id in first)
            if (hasOwnProperty.call(first, id)) {
                result[id] = first[id];
            }
        return result;
    }
    ts.extend = extend;
    function multiMapAdd(map, key, value) {
        var values = map[key];
        if (values) {
            values.push(value);
            return values;
        }
        else {
            return map[key] = [value];
        }
    }
    ts.multiMapAdd = multiMapAdd;
    function multiMapRemove(map, key, value) {
        var values = map[key];
        if (values) {
            unorderedRemoveItem(values, value);
            if (!values.length) {
                delete map[key];
            }
        }
    }
    ts.multiMapRemove = multiMapRemove;
    function isArray(value) {
        return Array.isArray ? Array.isArray(value) : value instanceof Array;
    }
    ts.isArray = isArray;
    function noop() { }
    ts.noop = noop;
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
    ts.localizedDiagnosticMessages = undefined;
    function getLocaleSpecificMessage(message) {
        return ts.localizedDiagnosticMessages && ts.localizedDiagnosticMessages[message.key] || message.message;
    }
    ts.getLocaleSpecificMessage = getLocaleSpecificMessage;
    function createFileDiagnostic(file, start, length, message) {
        var end = start + length;
        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);
        if (file) {
            Debug.assert(start <= file.text.length, "start must be within the bounds of the file. " + start + " > " + file.text.length);
            Debug.assert(end <= file.text.length, "end must be the bounds of the file. " + end + " > " + file.text.length);
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
            if (ts.collator && String.prototype.localeCompare) {
                var result = a.localeCompare(b, undefined, { usage: "sort", sensitivity: "accent" });
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
            var string1 = typeof text1 === "string" ? text1 : text1.messageText;
            var string2 = typeof text2 === "string" ? text2 : text2.messageText;
            var res = compareValues(string1, string2);
            if (res) {
                return res;
            }
            text1 = typeof text1 === "string" ? undefined : text1.next;
            text2 = typeof text2 === "string" ? undefined : text2.next;
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
        path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        var root = path.substr(0, rootLength);
        var normalized = getNormalizedParts(path, rootLength);
        if (normalized.length) {
            var joinedParts = root + normalized.join(ts.directorySeparator);
            return pathEndsWithDirectorySeparator(path) ? joinedParts + ts.directorySeparator : joinedParts;
        }
        else {
            return root;
        }
    }
    ts.normalizePath = normalizePath;
    function pathEndsWithDirectorySeparator(path) {
        return path.charCodeAt(path.length - 1) === directorySeparatorCharCode;
    }
    ts.pathEndsWithDirectorySeparator = pathEndsWithDirectorySeparator;
    function getDirectoryPath(path) {
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(ts.directorySeparator)));
    }
    ts.getDirectoryPath = getDirectoryPath;
    function isUrl(path) {
        return path && !isRootedDiskPath(path) && path.indexOf("://") !== -1;
    }
    ts.isUrl = isUrl;
    function isExternalModuleNameRelative(moduleName) {
        return /^\.\.?($|[\\/])/.test(moduleName);
    }
    ts.isExternalModuleNameRelative = isExternalModuleNameRelative;
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
        return getRootLength(path) !== 0;
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
            directoryComponents.length--;
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
    function endsWith(str, suffix) {
        var expectedPos = str.length - suffix.length;
        return expectedPos >= 0 && str.indexOf(suffix, expectedPos) === expectedPos;
    }
    ts.endsWith = endsWith;
    function fileExtensionIs(path, extension) {
        return path.length > extension.length && endsWith(path, extension);
    }
    ts.fileExtensionIs = fileExtensionIs;
    function fileExtensionIsAny(path, extensions) {
        for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
            var extension = extensions_1[_i];
            if (fileExtensionIs(path, extension)) {
                return true;
            }
        }
        return false;
    }
    ts.fileExtensionIsAny = fileExtensionIsAny;
    var reservedCharacterPattern = /[^\w\s\/]/g;
    var wildcardCharCodes = [42, 63];
    var singleAsteriskRegexFragmentFiles = "([^./]|(\\.(?!min\\.js$))?)*";
    var singleAsteriskRegexFragmentOther = "[^/]*";
    function getRegularExpressionForWildcard(specs, basePath, usage) {
        if (specs === undefined || specs.length === 0) {
            return undefined;
        }
        var replaceWildcardCharacter = usage === "files" ? replaceWildCardCharacterFiles : replaceWildCardCharacterOther;
        var singleAsteriskRegexFragment = usage === "files" ? singleAsteriskRegexFragmentFiles : singleAsteriskRegexFragmentOther;
        var doubleAsteriskRegexFragment = usage === "exclude" ? "(/.+?)?" : "(/[^/.][^/]*)*?";
        var pattern = "";
        var hasWrittenSubpattern = false;
        spec: for (var _i = 0, specs_1 = specs; _i < specs_1.length; _i++) {
            var spec = specs_1[_i];
            if (!spec) {
                continue;
            }
            var subpattern = "";
            var hasRecursiveDirectoryWildcard = false;
            var hasWrittenComponent = false;
            var components = getNormalizedPathComponents(spec, basePath);
            if (usage !== "exclude" && components[components.length - 1] === "**") {
                continue spec;
            }
            components[0] = removeTrailingDirectorySeparator(components[0]);
            var optionalCount = 0;
            for (var _a = 0, components_1 = components; _a < components_1.length; _a++) {
                var component = components_1[_a];
                if (component === "**") {
                    if (hasRecursiveDirectoryWildcard) {
                        continue spec;
                    }
                    subpattern += doubleAsteriskRegexFragment;
                    hasRecursiveDirectoryWildcard = true;
                    hasWrittenComponent = true;
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
                        if (component.charCodeAt(0) === 42) {
                            subpattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                            component = component.substr(1);
                        }
                        else if (component.charCodeAt(0) === 63) {
                            subpattern += "[^./]";
                            component = component.substr(1);
                        }
                    }
                    subpattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);
                    hasWrittenComponent = true;
                }
            }
            while (optionalCount > 0) {
                subpattern += ")?";
                optionalCount--;
            }
            if (hasWrittenSubpattern) {
                pattern += "|";
            }
            pattern += "(" + subpattern + ")";
            hasWrittenSubpattern = true;
        }
        if (!pattern) {
            return undefined;
        }
        return "^(" + pattern + (usage === "exclude" ? ")($|/)" : ")$");
    }
    ts.getRegularExpressionForWildcard = getRegularExpressionForWildcard;
    function replaceWildCardCharacterFiles(match) {
        return replaceWildcardCharacter(match, singleAsteriskRegexFragmentFiles);
    }
    function replaceWildCardCharacterOther(match) {
        return replaceWildcardCharacter(match, singleAsteriskRegexFragmentOther);
    }
    function replaceWildcardCharacter(match, singleAsteriskRegexFragment) {
        return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
    }
    function getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory) {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);
        var absolutePath = combinePaths(currentDirectory, path);
        return {
            includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
            includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
            excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
            basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
        };
    }
    ts.getFileMatcherPatterns = getFileMatcherPatterns;
    function matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory, getFileSystemEntries) {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);
        var patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);
        var regexFlag = useCaseSensitiveFileNames ? "" : "i";
        var includeFileRegex = patterns.includeFilePattern && new RegExp(patterns.includeFilePattern, regexFlag);
        var includeDirectoryRegex = patterns.includeDirectoryPattern && new RegExp(patterns.includeDirectoryPattern, regexFlag);
        var excludeRegex = patterns.excludePattern && new RegExp(patterns.excludePattern, regexFlag);
        var result = [];
        for (var _i = 0, _a = patterns.basePaths; _i < _a.length; _i++) {
            var basePath = _a[_i];
            visitDirectory(basePath, combinePaths(currentDirectory, basePath));
        }
        return result;
        function visitDirectory(path, absolutePath) {
            var _a = getFileSystemEntries(path), files = _a.files, directories = _a.directories;
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var current = files_1[_i];
                var name_1 = combinePaths(path, current);
                var absoluteName = combinePaths(absolutePath, current);
                if ((!extensions || fileExtensionIsAny(name_1, extensions)) &&
                    (!includeFileRegex || includeFileRegex.test(absoluteName)) &&
                    (!excludeRegex || !excludeRegex.test(absoluteName))) {
                    result.push(name_1);
                }
            }
            for (var _b = 0, directories_1 = directories; _b < directories_1.length; _b++) {
                var current = directories_1[_b];
                var name_2 = combinePaths(path, current);
                var absoluteName = combinePaths(absolutePath, current);
                if ((!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
                    (!excludeRegex || !excludeRegex.test(absoluteName))) {
                    visitDirectory(name_2, absoluteName);
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
                var wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
                var includeBasePath = wildcardOffset < 0
                    ? removeTrailingDirectorySeparator(getDirectoryPath(absolute))
                    : absolute.substring(0, absolute.lastIndexOf(ts.directorySeparator, wildcardOffset));
                includeBasePaths.push(includeBasePath);
            }
            includeBasePaths.sort(useCaseSensitiveFileNames ? compareStrings : compareStringsCaseInsensitive);
            include: for (var i = 0; i < includeBasePaths.length; i++) {
                var includeBasePath = includeBasePaths[i];
                for (var j = 0; j < basePaths.length; j++) {
                    if (containsPath(basePaths[j], includeBasePath, path, !useCaseSensitiveFileNames)) {
                        continue include;
                    }
                }
                basePaths.push(includeBasePath);
            }
        }
        return basePaths;
    }
    function ensureScriptKind(fileName, scriptKind) {
        return (scriptKind || getScriptKindFromFileName(fileName)) || 3;
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
            default:
                return 0;
        }
    }
    ts.getScriptKindFromFileName = getScriptKindFromFileName;
    ts.supportedTypeScriptExtensions = [".ts", ".tsx", ".d.ts"];
    ts.supportedTypescriptExtensionsForExtractExtension = [".d.ts", ".ts", ".tsx"];
    ts.supportedJavascriptExtensions = [".js", ".jsx"];
    var allSupportedExtensions = ts.supportedTypeScriptExtensions.concat(ts.supportedJavascriptExtensions);
    function getSupportedExtensions(options) {
        return options && options.allowJs ? allSupportedExtensions : ts.supportedTypeScriptExtensions;
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
    function isSupportedSourceFileName(fileName, compilerOptions) {
        if (!fileName) {
            return false;
        }
        for (var _i = 0, _a = getSupportedExtensions(compilerOptions); _i < _a.length; _i++) {
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
                return adjustExtensionPriority(i);
            }
        }
        return 0;
    }
    ts.getExtensionPriority = getExtensionPriority;
    function adjustExtensionPriority(extensionPriority) {
        if (extensionPriority < 2) {
            return 0;
        }
        else if (extensionPriority < 5) {
            return 2;
        }
        else {
            return 5;
        }
    }
    ts.adjustExtensionPriority = adjustExtensionPriority;
    function getNextLowestExtensionPriority(extensionPriority) {
        if (extensionPriority < 2) {
            return 2;
        }
        else {
            return 5;
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
    function isJsxOrTsxExtension(ext) {
        return ext === ".jsx" || ext === ".tsx";
    }
    ts.isJsxOrTsxExtension = isJsxOrTsxExtension;
    function changeExtension(path, newExtension) {
        return (removeFileExtension(path) + newExtension);
    }
    ts.changeExtension = changeExtension;
    function Symbol(flags, name) {
        this.flags = flags;
        this.name = name;
        this.declarations = undefined;
    }
    function Type(_checker, flags) {
        this.flags = flags;
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
    ts.objectAllocator = {
        getNodeConstructor: function () { return Node; },
        getTokenConstructor: function () { return Node; },
        getIdentifierConstructor: function () { return Node; },
        getSourceFileConstructor: function () { return Node; },
        getSymbolConstructor: function () { return Symbol; },
        getTypeConstructor: function () { return Type; },
        getSignatureConstructor: function () { return Signature; }
    };
    var Debug;
    (function (Debug) {
        Debug.currentAssertionLevel = 0;
        function shouldAssert(level) {
            return Debug.currentAssertionLevel >= level;
        }
        Debug.shouldAssert = shouldAssert;
        function assert(expression, message, verboseDebugInfo) {
            if (!expression) {
                var verboseDebugString = "";
                if (verboseDebugInfo) {
                    verboseDebugString = "\r\nVerbose Debug Information: " + verboseDebugInfo();
                }
                debugger;
                throw new Error("Debug Failure. False expression: " + (message || "") + verboseDebugString);
            }
        }
        Debug.assert = assert;
        function fail(message) {
            Debug.assert(false, message);
        }
        Debug.fail = fail;
    })(Debug = ts.Debug || (ts.Debug = {}));
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
})(ts || (ts = {}));
var ts;
(function (ts) {
    ts.sys = (function () {
        function getWScriptSystem() {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var shell = new ActiveXObject("WScript.Shell");
            var fileStream = new ActiveXObject("ADODB.Stream");
            fileStream.Type = 2;
            var binaryStream = new ActiveXObject("ADODB.Stream");
            binaryStream.Type = 1;
            var args = [];
            for (var i = 0; i < WScript.Arguments.length; i++) {
                args[i] = WScript.Arguments.Item(i);
            }
            function readFile(fileName, encoding) {
                if (!fso.FileExists(fileName)) {
                    return undefined;
                }
                fileStream.Open();
                try {
                    if (encoding) {
                        fileStream.Charset = encoding;
                        fileStream.LoadFromFile(fileName);
                    }
                    else {
                        fileStream.Charset = "x-ansi";
                        fileStream.LoadFromFile(fileName);
                        var bom = fileStream.ReadText(2) || "";
                        fileStream.Position = 0;
                        fileStream.Charset = bom.length >= 2 && (bom.charCodeAt(0) === 0xFF && bom.charCodeAt(1) === 0xFE || bom.charCodeAt(0) === 0xFE && bom.charCodeAt(1) === 0xFF) ? "unicode" : "utf-8";
                    }
                    return fileStream.ReadText();
                }
                catch (e) {
                    throw e;
                }
                finally {
                    fileStream.Close();
                }
            }
            function writeFile(fileName, data, writeByteOrderMark) {
                fileStream.Open();
                binaryStream.Open();
                try {
                    fileStream.Charset = "utf-8";
                    fileStream.WriteText(data);
                    if (writeByteOrderMark) {
                        fileStream.Position = 0;
                    }
                    else {
                        fileStream.Position = 3;
                    }
                    fileStream.CopyTo(binaryStream);
                    binaryStream.SaveToFile(fileName, 2);
                }
                finally {
                    binaryStream.Close();
                    fileStream.Close();
                }
            }
            function getNames(collection) {
                var result = [];
                for (var e = new Enumerator(collection); !e.atEnd(); e.moveNext()) {
                    result.push(e.item().Name);
                }
                return result.sort();
            }
            function getDirectories(path) {
                var folder = fso.GetFolder(path);
                return getNames(folder.subfolders);
            }
            function getAccessibleFileSystemEntries(path) {
                try {
                    var folder = fso.GetFolder(path || ".");
                    var files = getNames(folder.files);
                    var directories = getNames(folder.subfolders);
                    return { files: files, directories: directories };
                }
                catch (e) {
                    return { files: [], directories: [] };
                }
            }
            function readDirectory(path, extensions, excludes, includes) {
                return ts.matchFiles(path, extensions, excludes, includes, false, shell.CurrentDirectory, getAccessibleFileSystemEntries);
            }
            var wscriptSystem = {
                args: args,
                newLine: "\r\n",
                useCaseSensitiveFileNames: false,
                write: function (s) {
                    WScript.StdOut.Write(s);
                },
                readFile: readFile,
                writeFile: writeFile,
                resolvePath: function (path) {
                    return fso.GetAbsolutePathName(path);
                },
                fileExists: function (path) {
                    return fso.FileExists(path);
                },
                directoryExists: function (path) {
                    return fso.FolderExists(path);
                },
                createDirectory: function (directoryName) {
                    if (!wscriptSystem.directoryExists(directoryName)) {
                        fso.CreateFolder(directoryName);
                    }
                },
                getExecutingFilePath: function () {
                    return WScript.ScriptFullName;
                },
                getCurrentDirectory: function () {
                    return shell.CurrentDirectory;
                },
                getDirectories: getDirectories,
                getEnvironmentVariable: function (name) {
                    return new ActiveXObject("WScript.Shell").ExpandEnvironmentStrings("%" + name + "%");
                },
                readDirectory: readDirectory,
                exit: function (exitCode) {
                    try {
                        WScript.Quit(exitCode);
                    }
                    catch (e) {
                    }
                }
            };
            return wscriptSystem;
        }
        function getNodeSystem() {
            var _fs = require("fs");
            var _path = require("path");
            var _os = require("os");
            var _crypto = require("crypto");
            var useNonPollingWatchers = process.env["TSC_NONPOLLING_WATCHER"];
            function createWatchedFileSet() {
                var dirWatchers = ts.createMap();
                var fileWatcherCallbacks = ts.createMap();
                return { addFile: addFile, removeFile: removeFile };
                function reduceDirWatcherRefCountForFile(fileName) {
                    var dirName = ts.getDirectoryPath(fileName);
                    var watcher = dirWatchers[dirName];
                    if (watcher) {
                        watcher.referenceCount -= 1;
                        if (watcher.referenceCount <= 0) {
                            watcher.close();
                            delete dirWatchers[dirName];
                        }
                    }
                }
                function addDirWatcher(dirPath) {
                    var watcher = dirWatchers[dirPath];
                    if (watcher) {
                        watcher.referenceCount += 1;
                        return;
                    }
                    watcher = _fs.watch(dirPath, { persistent: true }, function (eventName, relativeFileName) { return fileEventHandler(eventName, relativeFileName, dirPath); });
                    watcher.referenceCount = 1;
                    dirWatchers[dirPath] = watcher;
                    return;
                }
                function addFileWatcherCallback(filePath, callback) {
                    ts.multiMapAdd(fileWatcherCallbacks, filePath, callback);
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
                    ts.multiMapRemove(fileWatcherCallbacks, filePath, callback);
                }
                function fileEventHandler(eventName, relativeFileName, baseDirPath) {
                    var fileName = typeof relativeFileName !== "string"
                        ? undefined
                        : ts.getNormalizedAbsolutePath(relativeFileName, baseDirPath);
                    if ((eventName === "change" || eventName === "rename") && fileWatcherCallbacks[fileName]) {
                        for (var _i = 0, _a = fileWatcherCallbacks[fileName]; _i < _a.length; _i++) {
                            var fileCallback = _a[_i];
                            fileCallback(fileName);
                        }
                    }
                }
            }
            var watchedFileSet = createWatchedFileSet();
            function isNode4OrLater() {
                return parseInt(process.version.charAt(1)) >= 4;
            }
            function isFileSystemCaseSensitive() {
                if (platform === "win32" || platform === "win64") {
                    return false;
                }
                return !fileExists(__filename.toUpperCase()) || !fileExists(__filename.toLowerCase());
            }
            var platform = _os.platform();
            var useCaseSensitiveFileNames = isFileSystemCaseSensitive();
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
                        var name_3 = ts.combinePaths(path, entry);
                        var stat = void 0;
                        try {
                            stat = _fs.statSync(name_3);
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
            function readDirectory(path, extensions, excludes, includes) {
                return ts.matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, process.cwd(), getAccessibleFileSystemEntries);
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
                watchFile: function (fileName, callback) {
                    if (useNonPollingWatchers) {
                        var watchedFile_1 = watchedFileSet.addFile(fileName, callback);
                        return {
                            close: function () { return watchedFileSet.removeFile(watchedFile_1); }
                        };
                    }
                    else {
                        _fs.watchFile(fileName, { persistent: true, interval: 250 }, fileChanged);
                        return {
                            close: function () { return _fs.unwatchFile(fileName, fileChanged); }
                        };
                    }
                    function fileChanged(curr, prev) {
                        if (+curr.mtime <= +prev.mtime) {
                            return;
                        }
                        callback(fileName);
                    }
                },
                watchDirectory: function (directoryName, callback, recursive) {
                    var options;
                    if (!directoryExists(directoryName)) {
                        return;
                    }
                    if (isNode4OrLater() && (process.platform === "win32" || process.platform === "darwin")) {
                        options = { persistent: true, recursive: !!recursive };
                    }
                    else {
                        options = { persistent: true };
                    }
                    return _fs.watch(directoryName, options, function (eventName, relativeFileName) {
                        if (eventName === "rename") {
                            callback(!relativeFileName ? relativeFileName : ts.normalizePath(ts.combinePaths(directoryName, relativeFileName)));
                        }
                        ;
                    });
                },
                resolvePath: function (path) {
                    return _path.resolve(path);
                },
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
                readDirectory: function (path, extensions, excludes, includes) {
                    var pattern = ts.getFileMatcherPatterns(path, excludes, includes, !!ChakraHost.useCaseSensitiveFileNames, ChakraHost.currentDirectory);
                    return ChakraHost.readDirectory(path, extensions, pattern.basePaths, pattern.excludePattern, pattern.includeFilePattern, pattern.includeDirectoryPattern);
                },
                exit: ChakraHost.quit,
                realpath: realpath
            };
        }
        function recursiveCreateDirectory(directoryPath, sys) {
            var basePath = ts.getDirectoryPath(directoryPath);
            var shouldCreateParent = directoryPath !== basePath && !sys.directoryExists(basePath);
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
        else if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
            sys = getWScriptSystem();
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
})(ts || (ts = {}));
var ts;
(function (ts) {
    ts.Diagnostics = {
        Unterminated_string_literal: { code: 1002, category: ts.DiagnosticCategory.Error, key: "Unterminated_string_literal_1002", message: "Unterminated string literal." },
        Identifier_expected: { code: 1003, category: ts.DiagnosticCategory.Error, key: "Identifier_expected_1003", message: "Identifier expected." },
        _0_expected: { code: 1005, category: ts.DiagnosticCategory.Error, key: "_0_expected_1005", message: "'{0}' expected." },
        A_file_cannot_have_a_reference_to_itself: { code: 1006, category: ts.DiagnosticCategory.Error, key: "A_file_cannot_have_a_reference_to_itself_1006", message: "A file cannot have a reference to itself." },
        Trailing_comma_not_allowed: { code: 1009, category: ts.DiagnosticCategory.Error, key: "Trailing_comma_not_allowed_1009", message: "Trailing comma not allowed." },
        Asterisk_Slash_expected: { code: 1010, category: ts.DiagnosticCategory.Error, key: "Asterisk_Slash_expected_1010", message: "'*/' expected." },
        Unexpected_token: { code: 1012, category: ts.DiagnosticCategory.Error, key: "Unexpected_token_1012", message: "Unexpected token." },
        A_rest_parameter_must_be_last_in_a_parameter_list: { code: 1014, category: ts.DiagnosticCategory.Error, key: "A_rest_parameter_must_be_last_in_a_parameter_list_1014", message: "A rest parameter must be last in a parameter list." },
        Parameter_cannot_have_question_mark_and_initializer: { code: 1015, category: ts.DiagnosticCategory.Error, key: "Parameter_cannot_have_question_mark_and_initializer_1015", message: "Parameter cannot have question mark and initializer." },
        A_required_parameter_cannot_follow_an_optional_parameter: { code: 1016, category: ts.DiagnosticCategory.Error, key: "A_required_parameter_cannot_follow_an_optional_parameter_1016", message: "A required parameter cannot follow an optional parameter." },
        An_index_signature_cannot_have_a_rest_parameter: { code: 1017, category: ts.DiagnosticCategory.Error, key: "An_index_signature_cannot_have_a_rest_parameter_1017", message: "An index signature cannot have a rest parameter." },
        An_index_signature_parameter_cannot_have_an_accessibility_modifier: { code: 1018, category: ts.DiagnosticCategory.Error, key: "An_index_signature_parameter_cannot_have_an_accessibility_modifier_1018", message: "An index signature parameter cannot have an accessibility modifier." },
        An_index_signature_parameter_cannot_have_a_question_mark: { code: 1019, category: ts.DiagnosticCategory.Error, key: "An_index_signature_parameter_cannot_have_a_question_mark_1019", message: "An index signature parameter cannot have a question mark." },
        An_index_signature_parameter_cannot_have_an_initializer: { code: 1020, category: ts.DiagnosticCategory.Error, key: "An_index_signature_parameter_cannot_have_an_initializer_1020", message: "An index signature parameter cannot have an initializer." },
        An_index_signature_must_have_a_type_annotation: { code: 1021, category: ts.DiagnosticCategory.Error, key: "An_index_signature_must_have_a_type_annotation_1021", message: "An index signature must have a type annotation." },
        An_index_signature_parameter_must_have_a_type_annotation: { code: 1022, category: ts.DiagnosticCategory.Error, key: "An_index_signature_parameter_must_have_a_type_annotation_1022", message: "An index signature parameter must have a type annotation." },
        An_index_signature_parameter_type_must_be_string_or_number: { code: 1023, category: ts.DiagnosticCategory.Error, key: "An_index_signature_parameter_type_must_be_string_or_number_1023", message: "An index signature parameter type must be 'string' or 'number'." },
        readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature: { code: 1024, category: ts.DiagnosticCategory.Error, key: "readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature_1024", message: "'readonly' modifier can only appear on a property declaration or index signature." },
        Accessibility_modifier_already_seen: { code: 1028, category: ts.DiagnosticCategory.Error, key: "Accessibility_modifier_already_seen_1028", message: "Accessibility modifier already seen." },
        _0_modifier_must_precede_1_modifier: { code: 1029, category: ts.DiagnosticCategory.Error, key: "_0_modifier_must_precede_1_modifier_1029", message: "'{0}' modifier must precede '{1}' modifier." },
        _0_modifier_already_seen: { code: 1030, category: ts.DiagnosticCategory.Error, key: "_0_modifier_already_seen_1030", message: "'{0}' modifier already seen." },
        _0_modifier_cannot_appear_on_a_class_element: { code: 1031, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_appear_on_a_class_element_1031", message: "'{0}' modifier cannot appear on a class element." },
        super_must_be_followed_by_an_argument_list_or_member_access: { code: 1034, category: ts.DiagnosticCategory.Error, key: "super_must_be_followed_by_an_argument_list_or_member_access_1034", message: "'super' must be followed by an argument list or member access." },
        Only_ambient_modules_can_use_quoted_names: { code: 1035, category: ts.DiagnosticCategory.Error, key: "Only_ambient_modules_can_use_quoted_names_1035", message: "Only ambient modules can use quoted names." },
        Statements_are_not_allowed_in_ambient_contexts: { code: 1036, category: ts.DiagnosticCategory.Error, key: "Statements_are_not_allowed_in_ambient_contexts_1036", message: "Statements are not allowed in ambient contexts." },
        A_declare_modifier_cannot_be_used_in_an_already_ambient_context: { code: 1038, category: ts.DiagnosticCategory.Error, key: "A_declare_modifier_cannot_be_used_in_an_already_ambient_context_1038", message: "A 'declare' modifier cannot be used in an already ambient context." },
        Initializers_are_not_allowed_in_ambient_contexts: { code: 1039, category: ts.DiagnosticCategory.Error, key: "Initializers_are_not_allowed_in_ambient_contexts_1039", message: "Initializers are not allowed in ambient contexts." },
        _0_modifier_cannot_be_used_in_an_ambient_context: { code: 1040, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_be_used_in_an_ambient_context_1040", message: "'{0}' modifier cannot be used in an ambient context." },
        _0_modifier_cannot_be_used_with_a_class_declaration: { code: 1041, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_be_used_with_a_class_declaration_1041", message: "'{0}' modifier cannot be used with a class declaration." },
        _0_modifier_cannot_be_used_here: { code: 1042, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_be_used_here_1042", message: "'{0}' modifier cannot be used here." },
        _0_modifier_cannot_appear_on_a_data_property: { code: 1043, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_appear_on_a_data_property_1043", message: "'{0}' modifier cannot appear on a data property." },
        _0_modifier_cannot_appear_on_a_module_or_namespace_element: { code: 1044, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_appear_on_a_module_or_namespace_element_1044", message: "'{0}' modifier cannot appear on a module or namespace element." },
        A_0_modifier_cannot_be_used_with_an_interface_declaration: { code: 1045, category: ts.DiagnosticCategory.Error, key: "A_0_modifier_cannot_be_used_with_an_interface_declaration_1045", message: "A '{0}' modifier cannot be used with an interface declaration." },
        A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file: { code: 1046, category: ts.DiagnosticCategory.Error, key: "A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file_1046", message: "A 'declare' modifier is required for a top level declaration in a .d.ts file." },
        A_rest_parameter_cannot_be_optional: { code: 1047, category: ts.DiagnosticCategory.Error, key: "A_rest_parameter_cannot_be_optional_1047", message: "A rest parameter cannot be optional." },
        A_rest_parameter_cannot_have_an_initializer: { code: 1048, category: ts.DiagnosticCategory.Error, key: "A_rest_parameter_cannot_have_an_initializer_1048", message: "A rest parameter cannot have an initializer." },
        A_set_accessor_must_have_exactly_one_parameter: { code: 1049, category: ts.DiagnosticCategory.Error, key: "A_set_accessor_must_have_exactly_one_parameter_1049", message: "A 'set' accessor must have exactly one parameter." },
        A_set_accessor_cannot_have_an_optional_parameter: { code: 1051, category: ts.DiagnosticCategory.Error, key: "A_set_accessor_cannot_have_an_optional_parameter_1051", message: "A 'set' accessor cannot have an optional parameter." },
        A_set_accessor_parameter_cannot_have_an_initializer: { code: 1052, category: ts.DiagnosticCategory.Error, key: "A_set_accessor_parameter_cannot_have_an_initializer_1052", message: "A 'set' accessor parameter cannot have an initializer." },
        A_set_accessor_cannot_have_rest_parameter: { code: 1053, category: ts.DiagnosticCategory.Error, key: "A_set_accessor_cannot_have_rest_parameter_1053", message: "A 'set' accessor cannot have rest parameter." },
        A_get_accessor_cannot_have_parameters: { code: 1054, category: ts.DiagnosticCategory.Error, key: "A_get_accessor_cannot_have_parameters_1054", message: "A 'get' accessor cannot have parameters." },
        Type_0_is_not_a_valid_async_function_return_type: { code: 1055, category: ts.DiagnosticCategory.Error, key: "Type_0_is_not_a_valid_async_function_return_type_1055", message: "Type '{0}' is not a valid async function return type." },
        Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher: { code: 1056, category: ts.DiagnosticCategory.Error, key: "Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher_1056", message: "Accessors are only available when targeting ECMAScript 5 and higher." },
        An_async_function_or_method_must_have_a_valid_awaitable_return_type: { code: 1057, category: ts.DiagnosticCategory.Error, key: "An_async_function_or_method_must_have_a_valid_awaitable_return_type_1057", message: "An async function or method must have a valid awaitable return type." },
        Operand_for_await_does_not_have_a_valid_callable_then_member: { code: 1058, category: ts.DiagnosticCategory.Error, key: "Operand_for_await_does_not_have_a_valid_callable_then_member_1058", message: "Operand for 'await' does not have a valid callable 'then' member." },
        Return_expression_in_async_function_does_not_have_a_valid_callable_then_member: { code: 1059, category: ts.DiagnosticCategory.Error, key: "Return_expression_in_async_function_does_not_have_a_valid_callable_then_member_1059", message: "Return expression in async function does not have a valid callable 'then' member." },
        Expression_body_for_async_arrow_function_does_not_have_a_valid_callable_then_member: { code: 1060, category: ts.DiagnosticCategory.Error, key: "Expression_body_for_async_arrow_function_does_not_have_a_valid_callable_then_member_1060", message: "Expression body for async arrow function does not have a valid callable 'then' member." },
        Enum_member_must_have_initializer: { code: 1061, category: ts.DiagnosticCategory.Error, key: "Enum_member_must_have_initializer_1061", message: "Enum member must have initializer." },
        _0_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method: { code: 1062, category: ts.DiagnosticCategory.Error, key: "_0_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method_1062", message: "{0} is referenced directly or indirectly in the fulfillment callback of its own 'then' method." },
        An_export_assignment_cannot_be_used_in_a_namespace: { code: 1063, category: ts.DiagnosticCategory.Error, key: "An_export_assignment_cannot_be_used_in_a_namespace_1063", message: "An export assignment cannot be used in a namespace." },
        The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type: { code: 1064, category: ts.DiagnosticCategory.Error, key: "The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_1064", message: "The return type of an async function or method must be the global Promise<T> type." },
        In_ambient_enum_declarations_member_initializer_must_be_constant_expression: { code: 1066, category: ts.DiagnosticCategory.Error, key: "In_ambient_enum_declarations_member_initializer_must_be_constant_expression_1066", message: "In ambient enum declarations member initializer must be constant expression." },
        Unexpected_token_A_constructor_method_accessor_or_property_was_expected: { code: 1068, category: ts.DiagnosticCategory.Error, key: "Unexpected_token_A_constructor_method_accessor_or_property_was_expected_1068", message: "Unexpected token. A constructor, method, accessor, or property was expected." },
        _0_modifier_cannot_appear_on_a_type_member: { code: 1070, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_appear_on_a_type_member_1070", message: "'{0}' modifier cannot appear on a type member." },
        _0_modifier_cannot_appear_on_an_index_signature: { code: 1071, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_appear_on_an_index_signature_1071", message: "'{0}' modifier cannot appear on an index signature." },
        A_0_modifier_cannot_be_used_with_an_import_declaration: { code: 1079, category: ts.DiagnosticCategory.Error, key: "A_0_modifier_cannot_be_used_with_an_import_declaration_1079", message: "A '{0}' modifier cannot be used with an import declaration." },
        Invalid_reference_directive_syntax: { code: 1084, category: ts.DiagnosticCategory.Error, key: "Invalid_reference_directive_syntax_1084", message: "Invalid 'reference' directive syntax." },
        Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher: { code: 1085, category: ts.DiagnosticCategory.Error, key: "Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher_1085", message: "Octal literals are not available when targeting ECMAScript 5 and higher." },
        An_accessor_cannot_be_declared_in_an_ambient_context: { code: 1086, category: ts.DiagnosticCategory.Error, key: "An_accessor_cannot_be_declared_in_an_ambient_context_1086", message: "An accessor cannot be declared in an ambient context." },
        _0_modifier_cannot_appear_on_a_constructor_declaration: { code: 1089, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_appear_on_a_constructor_declaration_1089", message: "'{0}' modifier cannot appear on a constructor declaration." },
        _0_modifier_cannot_appear_on_a_parameter: { code: 1090, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_appear_on_a_parameter_1090", message: "'{0}' modifier cannot appear on a parameter." },
        Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement: { code: 1091, category: ts.DiagnosticCategory.Error, key: "Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement_1091", message: "Only a single variable declaration is allowed in a 'for...in' statement." },
        Type_parameters_cannot_appear_on_a_constructor_declaration: { code: 1092, category: ts.DiagnosticCategory.Error, key: "Type_parameters_cannot_appear_on_a_constructor_declaration_1092", message: "Type parameters cannot appear on a constructor declaration." },
        Type_annotation_cannot_appear_on_a_constructor_declaration: { code: 1093, category: ts.DiagnosticCategory.Error, key: "Type_annotation_cannot_appear_on_a_constructor_declaration_1093", message: "Type annotation cannot appear on a constructor declaration." },
        An_accessor_cannot_have_type_parameters: { code: 1094, category: ts.DiagnosticCategory.Error, key: "An_accessor_cannot_have_type_parameters_1094", message: "An accessor cannot have type parameters." },
        A_set_accessor_cannot_have_a_return_type_annotation: { code: 1095, category: ts.DiagnosticCategory.Error, key: "A_set_accessor_cannot_have_a_return_type_annotation_1095", message: "A 'set' accessor cannot have a return type annotation." },
        An_index_signature_must_have_exactly_one_parameter: { code: 1096, category: ts.DiagnosticCategory.Error, key: "An_index_signature_must_have_exactly_one_parameter_1096", message: "An index signature must have exactly one parameter." },
        _0_list_cannot_be_empty: { code: 1097, category: ts.DiagnosticCategory.Error, key: "_0_list_cannot_be_empty_1097", message: "'{0}' list cannot be empty." },
        Type_parameter_list_cannot_be_empty: { code: 1098, category: ts.DiagnosticCategory.Error, key: "Type_parameter_list_cannot_be_empty_1098", message: "Type parameter list cannot be empty." },
        Type_argument_list_cannot_be_empty: { code: 1099, category: ts.DiagnosticCategory.Error, key: "Type_argument_list_cannot_be_empty_1099", message: "Type argument list cannot be empty." },
        Invalid_use_of_0_in_strict_mode: { code: 1100, category: ts.DiagnosticCategory.Error, key: "Invalid_use_of_0_in_strict_mode_1100", message: "Invalid use of '{0}' in strict mode." },
        with_statements_are_not_allowed_in_strict_mode: { code: 1101, category: ts.DiagnosticCategory.Error, key: "with_statements_are_not_allowed_in_strict_mode_1101", message: "'with' statements are not allowed in strict mode." },
        delete_cannot_be_called_on_an_identifier_in_strict_mode: { code: 1102, category: ts.DiagnosticCategory.Error, key: "delete_cannot_be_called_on_an_identifier_in_strict_mode_1102", message: "'delete' cannot be called on an identifier in strict mode." },
        A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement: { code: 1104, category: ts.DiagnosticCategory.Error, key: "A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement_1104", message: "A 'continue' statement can only be used within an enclosing iteration statement." },
        A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement: { code: 1105, category: ts.DiagnosticCategory.Error, key: "A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement_1105", message: "A 'break' statement can only be used within an enclosing iteration or switch statement." },
        Jump_target_cannot_cross_function_boundary: { code: 1107, category: ts.DiagnosticCategory.Error, key: "Jump_target_cannot_cross_function_boundary_1107", message: "Jump target cannot cross function boundary." },
        A_return_statement_can_only_be_used_within_a_function_body: { code: 1108, category: ts.DiagnosticCategory.Error, key: "A_return_statement_can_only_be_used_within_a_function_body_1108", message: "A 'return' statement can only be used within a function body." },
        Expression_expected: { code: 1109, category: ts.DiagnosticCategory.Error, key: "Expression_expected_1109", message: "Expression expected." },
        Type_expected: { code: 1110, category: ts.DiagnosticCategory.Error, key: "Type_expected_1110", message: "Type expected." },
        A_default_clause_cannot_appear_more_than_once_in_a_switch_statement: { code: 1113, category: ts.DiagnosticCategory.Error, key: "A_default_clause_cannot_appear_more_than_once_in_a_switch_statement_1113", message: "A 'default' clause cannot appear more than once in a 'switch' statement." },
        Duplicate_label_0: { code: 1114, category: ts.DiagnosticCategory.Error, key: "Duplicate_label_0_1114", message: "Duplicate label '{0}'" },
        A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement: { code: 1115, category: ts.DiagnosticCategory.Error, key: "A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement_1115", message: "A 'continue' statement can only jump to a label of an enclosing iteration statement." },
        A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement: { code: 1116, category: ts.DiagnosticCategory.Error, key: "A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement_1116", message: "A 'break' statement can only jump to a label of an enclosing statement." },
        An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode: { code: 1117, category: ts.DiagnosticCategory.Error, key: "An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode_1117", message: "An object literal cannot have multiple properties with the same name in strict mode." },
        An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name: { code: 1118, category: ts.DiagnosticCategory.Error, key: "An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name_1118", message: "An object literal cannot have multiple get/set accessors with the same name." },
        An_object_literal_cannot_have_property_and_accessor_with_the_same_name: { code: 1119, category: ts.DiagnosticCategory.Error, key: "An_object_literal_cannot_have_property_and_accessor_with_the_same_name_1119", message: "An object literal cannot have property and accessor with the same name." },
        An_export_assignment_cannot_have_modifiers: { code: 1120, category: ts.DiagnosticCategory.Error, key: "An_export_assignment_cannot_have_modifiers_1120", message: "An export assignment cannot have modifiers." },
        Octal_literals_are_not_allowed_in_strict_mode: { code: 1121, category: ts.DiagnosticCategory.Error, key: "Octal_literals_are_not_allowed_in_strict_mode_1121", message: "Octal literals are not allowed in strict mode." },
        A_tuple_type_element_list_cannot_be_empty: { code: 1122, category: ts.DiagnosticCategory.Error, key: "A_tuple_type_element_list_cannot_be_empty_1122", message: "A tuple type element list cannot be empty." },
        Variable_declaration_list_cannot_be_empty: { code: 1123, category: ts.DiagnosticCategory.Error, key: "Variable_declaration_list_cannot_be_empty_1123", message: "Variable declaration list cannot be empty." },
        Digit_expected: { code: 1124, category: ts.DiagnosticCategory.Error, key: "Digit_expected_1124", message: "Digit expected." },
        Hexadecimal_digit_expected: { code: 1125, category: ts.DiagnosticCategory.Error, key: "Hexadecimal_digit_expected_1125", message: "Hexadecimal digit expected." },
        Unexpected_end_of_text: { code: 1126, category: ts.DiagnosticCategory.Error, key: "Unexpected_end_of_text_1126", message: "Unexpected end of text." },
        Invalid_character: { code: 1127, category: ts.DiagnosticCategory.Error, key: "Invalid_character_1127", message: "Invalid character." },
        Declaration_or_statement_expected: { code: 1128, category: ts.DiagnosticCategory.Error, key: "Declaration_or_statement_expected_1128", message: "Declaration or statement expected." },
        Statement_expected: { code: 1129, category: ts.DiagnosticCategory.Error, key: "Statement_expected_1129", message: "Statement expected." },
        case_or_default_expected: { code: 1130, category: ts.DiagnosticCategory.Error, key: "case_or_default_expected_1130", message: "'case' or 'default' expected." },
        Property_or_signature_expected: { code: 1131, category: ts.DiagnosticCategory.Error, key: "Property_or_signature_expected_1131", message: "Property or signature expected." },
        Enum_member_expected: { code: 1132, category: ts.DiagnosticCategory.Error, key: "Enum_member_expected_1132", message: "Enum member expected." },
        Variable_declaration_expected: { code: 1134, category: ts.DiagnosticCategory.Error, key: "Variable_declaration_expected_1134", message: "Variable declaration expected." },
        Argument_expression_expected: { code: 1135, category: ts.DiagnosticCategory.Error, key: "Argument_expression_expected_1135", message: "Argument expression expected." },
        Property_assignment_expected: { code: 1136, category: ts.DiagnosticCategory.Error, key: "Property_assignment_expected_1136", message: "Property assignment expected." },
        Expression_or_comma_expected: { code: 1137, category: ts.DiagnosticCategory.Error, key: "Expression_or_comma_expected_1137", message: "Expression or comma expected." },
        Parameter_declaration_expected: { code: 1138, category: ts.DiagnosticCategory.Error, key: "Parameter_declaration_expected_1138", message: "Parameter declaration expected." },
        Type_parameter_declaration_expected: { code: 1139, category: ts.DiagnosticCategory.Error, key: "Type_parameter_declaration_expected_1139", message: "Type parameter declaration expected." },
        Type_argument_expected: { code: 1140, category: ts.DiagnosticCategory.Error, key: "Type_argument_expected_1140", message: "Type argument expected." },
        String_literal_expected: { code: 1141, category: ts.DiagnosticCategory.Error, key: "String_literal_expected_1141", message: "String literal expected." },
        Line_break_not_permitted_here: { code: 1142, category: ts.DiagnosticCategory.Error, key: "Line_break_not_permitted_here_1142", message: "Line break not permitted here." },
        or_expected: { code: 1144, category: ts.DiagnosticCategory.Error, key: "or_expected_1144", message: "'{' or ';' expected." },
        Declaration_expected: { code: 1146, category: ts.DiagnosticCategory.Error, key: "Declaration_expected_1146", message: "Declaration expected." },
        Import_declarations_in_a_namespace_cannot_reference_a_module: { code: 1147, category: ts.DiagnosticCategory.Error, key: "Import_declarations_in_a_namespace_cannot_reference_a_module_1147", message: "Import declarations in a namespace cannot reference a module." },
        Cannot_use_imports_exports_or_module_augmentations_when_module_is_none: { code: 1148, category: ts.DiagnosticCategory.Error, key: "Cannot_use_imports_exports_or_module_augmentations_when_module_is_none_1148", message: "Cannot use imports, exports, or module augmentations when '--module' is 'none'." },
        File_name_0_differs_from_already_included_file_name_1_only_in_casing: { code: 1149, category: ts.DiagnosticCategory.Error, key: "File_name_0_differs_from_already_included_file_name_1_only_in_casing_1149", message: "File name '{0}' differs from already included file name '{1}' only in casing" },
        new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead: { code: 1150, category: ts.DiagnosticCategory.Error, key: "new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead_1150", message: "'new T[]' cannot be used to create an array. Use 'new Array<T>()' instead." },
        const_declarations_must_be_initialized: { code: 1155, category: ts.DiagnosticCategory.Error, key: "const_declarations_must_be_initialized_1155", message: "'const' declarations must be initialized" },
        const_declarations_can_only_be_declared_inside_a_block: { code: 1156, category: ts.DiagnosticCategory.Error, key: "const_declarations_can_only_be_declared_inside_a_block_1156", message: "'const' declarations can only be declared inside a block." },
        let_declarations_can_only_be_declared_inside_a_block: { code: 1157, category: ts.DiagnosticCategory.Error, key: "let_declarations_can_only_be_declared_inside_a_block_1157", message: "'let' declarations can only be declared inside a block." },
        Unterminated_template_literal: { code: 1160, category: ts.DiagnosticCategory.Error, key: "Unterminated_template_literal_1160", message: "Unterminated template literal." },
        Unterminated_regular_expression_literal: { code: 1161, category: ts.DiagnosticCategory.Error, key: "Unterminated_regular_expression_literal_1161", message: "Unterminated regular expression literal." },
        An_object_member_cannot_be_declared_optional: { code: 1162, category: ts.DiagnosticCategory.Error, key: "An_object_member_cannot_be_declared_optional_1162", message: "An object member cannot be declared optional." },
        A_yield_expression_is_only_allowed_in_a_generator_body: { code: 1163, category: ts.DiagnosticCategory.Error, key: "A_yield_expression_is_only_allowed_in_a_generator_body_1163", message: "A 'yield' expression is only allowed in a generator body." },
        Computed_property_names_are_not_allowed_in_enums: { code: 1164, category: ts.DiagnosticCategory.Error, key: "Computed_property_names_are_not_allowed_in_enums_1164", message: "Computed property names are not allowed in enums." },
        A_computed_property_name_in_an_ambient_context_must_directly_refer_to_a_built_in_symbol: { code: 1165, category: ts.DiagnosticCategory.Error, key: "A_computed_property_name_in_an_ambient_context_must_directly_refer_to_a_built_in_symbol_1165", message: "A computed property name in an ambient context must directly refer to a built-in symbol." },
        A_computed_property_name_in_a_class_property_declaration_must_directly_refer_to_a_built_in_symbol: { code: 1166, category: ts.DiagnosticCategory.Error, key: "A_computed_property_name_in_a_class_property_declaration_must_directly_refer_to_a_built_in_symbol_1166", message: "A computed property name in a class property declaration must directly refer to a built-in symbol." },
        A_computed_property_name_in_a_method_overload_must_directly_refer_to_a_built_in_symbol: { code: 1168, category: ts.DiagnosticCategory.Error, key: "A_computed_property_name_in_a_method_overload_must_directly_refer_to_a_built_in_symbol_1168", message: "A computed property name in a method overload must directly refer to a built-in symbol." },
        A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol: { code: 1169, category: ts.DiagnosticCategory.Error, key: "A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol_1169", message: "A computed property name in an interface must directly refer to a built-in symbol." },
        A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol: { code: 1170, category: ts.DiagnosticCategory.Error, key: "A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol_1170", message: "A computed property name in a type literal must directly refer to a built-in symbol." },
        A_comma_expression_is_not_allowed_in_a_computed_property_name: { code: 1171, category: ts.DiagnosticCategory.Error, key: "A_comma_expression_is_not_allowed_in_a_computed_property_name_1171", message: "A comma expression is not allowed in a computed property name." },
        extends_clause_already_seen: { code: 1172, category: ts.DiagnosticCategory.Error, key: "extends_clause_already_seen_1172", message: "'extends' clause already seen." },
        extends_clause_must_precede_implements_clause: { code: 1173, category: ts.DiagnosticCategory.Error, key: "extends_clause_must_precede_implements_clause_1173", message: "'extends' clause must precede 'implements' clause." },
        Classes_can_only_extend_a_single_class: { code: 1174, category: ts.DiagnosticCategory.Error, key: "Classes_can_only_extend_a_single_class_1174", message: "Classes can only extend a single class." },
        implements_clause_already_seen: { code: 1175, category: ts.DiagnosticCategory.Error, key: "implements_clause_already_seen_1175", message: "'implements' clause already seen." },
        Interface_declaration_cannot_have_implements_clause: { code: 1176, category: ts.DiagnosticCategory.Error, key: "Interface_declaration_cannot_have_implements_clause_1176", message: "Interface declaration cannot have 'implements' clause." },
        Binary_digit_expected: { code: 1177, category: ts.DiagnosticCategory.Error, key: "Binary_digit_expected_1177", message: "Binary digit expected." },
        Octal_digit_expected: { code: 1178, category: ts.DiagnosticCategory.Error, key: "Octal_digit_expected_1178", message: "Octal digit expected." },
        Unexpected_token_expected: { code: 1179, category: ts.DiagnosticCategory.Error, key: "Unexpected_token_expected_1179", message: "Unexpected token. '{' expected." },
        Property_destructuring_pattern_expected: { code: 1180, category: ts.DiagnosticCategory.Error, key: "Property_destructuring_pattern_expected_1180", message: "Property destructuring pattern expected." },
        Array_element_destructuring_pattern_expected: { code: 1181, category: ts.DiagnosticCategory.Error, key: "Array_element_destructuring_pattern_expected_1181", message: "Array element destructuring pattern expected." },
        A_destructuring_declaration_must_have_an_initializer: { code: 1182, category: ts.DiagnosticCategory.Error, key: "A_destructuring_declaration_must_have_an_initializer_1182", message: "A destructuring declaration must have an initializer." },
        An_implementation_cannot_be_declared_in_ambient_contexts: { code: 1183, category: ts.DiagnosticCategory.Error, key: "An_implementation_cannot_be_declared_in_ambient_contexts_1183", message: "An implementation cannot be declared in ambient contexts." },
        Modifiers_cannot_appear_here: { code: 1184, category: ts.DiagnosticCategory.Error, key: "Modifiers_cannot_appear_here_1184", message: "Modifiers cannot appear here." },
        Merge_conflict_marker_encountered: { code: 1185, category: ts.DiagnosticCategory.Error, key: "Merge_conflict_marker_encountered_1185", message: "Merge conflict marker encountered." },
        A_rest_element_cannot_have_an_initializer: { code: 1186, category: ts.DiagnosticCategory.Error, key: "A_rest_element_cannot_have_an_initializer_1186", message: "A rest element cannot have an initializer." },
        A_parameter_property_may_not_be_declared_using_a_binding_pattern: { code: 1187, category: ts.DiagnosticCategory.Error, key: "A_parameter_property_may_not_be_declared_using_a_binding_pattern_1187", message: "A parameter property may not be declared using a binding pattern." },
        Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement: { code: 1188, category: ts.DiagnosticCategory.Error, key: "Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement_1188", message: "Only a single variable declaration is allowed in a 'for...of' statement." },
        The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer: { code: 1189, category: ts.DiagnosticCategory.Error, key: "The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer_1189", message: "The variable declaration of a 'for...in' statement cannot have an initializer." },
        The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer: { code: 1190, category: ts.DiagnosticCategory.Error, key: "The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer_1190", message: "The variable declaration of a 'for...of' statement cannot have an initializer." },
        An_import_declaration_cannot_have_modifiers: { code: 1191, category: ts.DiagnosticCategory.Error, key: "An_import_declaration_cannot_have_modifiers_1191", message: "An import declaration cannot have modifiers." },
        Module_0_has_no_default_export: { code: 1192, category: ts.DiagnosticCategory.Error, key: "Module_0_has_no_default_export_1192", message: "Module '{0}' has no default export." },
        An_export_declaration_cannot_have_modifiers: { code: 1193, category: ts.DiagnosticCategory.Error, key: "An_export_declaration_cannot_have_modifiers_1193", message: "An export declaration cannot have modifiers." },
        Export_declarations_are_not_permitted_in_a_namespace: { code: 1194, category: ts.DiagnosticCategory.Error, key: "Export_declarations_are_not_permitted_in_a_namespace_1194", message: "Export declarations are not permitted in a namespace." },
        Catch_clause_variable_cannot_have_a_type_annotation: { code: 1196, category: ts.DiagnosticCategory.Error, key: "Catch_clause_variable_cannot_have_a_type_annotation_1196", message: "Catch clause variable cannot have a type annotation." },
        Catch_clause_variable_cannot_have_an_initializer: { code: 1197, category: ts.DiagnosticCategory.Error, key: "Catch_clause_variable_cannot_have_an_initializer_1197", message: "Catch clause variable cannot have an initializer." },
        An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive: { code: 1198, category: ts.DiagnosticCategory.Error, key: "An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive_1198", message: "An extended Unicode escape value must be between 0x0 and 0x10FFFF inclusive." },
        Unterminated_Unicode_escape_sequence: { code: 1199, category: ts.DiagnosticCategory.Error, key: "Unterminated_Unicode_escape_sequence_1199", message: "Unterminated Unicode escape sequence." },
        Line_terminator_not_permitted_before_arrow: { code: 1200, category: ts.DiagnosticCategory.Error, key: "Line_terminator_not_permitted_before_arrow_1200", message: "Line terminator not permitted before arrow." },
        Import_assignment_cannot_be_used_when_targeting_ECMAScript_2015_modules_Consider_using_import_Asterisk_as_ns_from_mod_import_a_from_mod_import_d_from_mod_or_another_module_format_instead: { code: 1202, category: ts.DiagnosticCategory.Error, key: "Import_assignment_cannot_be_used_when_targeting_ECMAScript_2015_modules_Consider_using_import_Asteri_1202", message: "Import assignment cannot be used when targeting ECMAScript 2015 modules. Consider using 'import * as ns from \"mod\"', 'import {a} from \"mod\"', 'import d from \"mod\"', or another module format instead." },
        Export_assignment_cannot_be_used_when_targeting_ECMAScript_2015_modules_Consider_using_export_default_or_another_module_format_instead: { code: 1203, category: ts.DiagnosticCategory.Error, key: "Export_assignment_cannot_be_used_when_targeting_ECMAScript_2015_modules_Consider_using_export_defaul_1203", message: "Export assignment cannot be used when targeting ECMAScript 2015 modules. Consider using 'export default' or another module format instead." },
        Decorators_are_not_valid_here: { code: 1206, category: ts.DiagnosticCategory.Error, key: "Decorators_are_not_valid_here_1206", message: "Decorators are not valid here." },
        Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name: { code: 1207, category: ts.DiagnosticCategory.Error, key: "Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name_1207", message: "Decorators cannot be applied to multiple get/set accessors of the same name." },
        Cannot_compile_namespaces_when_the_isolatedModules_flag_is_provided: { code: 1208, category: ts.DiagnosticCategory.Error, key: "Cannot_compile_namespaces_when_the_isolatedModules_flag_is_provided_1208", message: "Cannot compile namespaces when the '--isolatedModules' flag is provided." },
        Ambient_const_enums_are_not_allowed_when_the_isolatedModules_flag_is_provided: { code: 1209, category: ts.DiagnosticCategory.Error, key: "Ambient_const_enums_are_not_allowed_when_the_isolatedModules_flag_is_provided_1209", message: "Ambient const enums are not allowed when the '--isolatedModules' flag is provided." },
        Invalid_use_of_0_Class_definitions_are_automatically_in_strict_mode: { code: 1210, category: ts.DiagnosticCategory.Error, key: "Invalid_use_of_0_Class_definitions_are_automatically_in_strict_mode_1210", message: "Invalid use of '{0}'. Class definitions are automatically in strict mode." },
        A_class_declaration_without_the_default_modifier_must_have_a_name: { code: 1211, category: ts.DiagnosticCategory.Error, key: "A_class_declaration_without_the_default_modifier_must_have_a_name_1211", message: "A class declaration without the 'default' modifier must have a name" },
        Identifier_expected_0_is_a_reserved_word_in_strict_mode: { code: 1212, category: ts.DiagnosticCategory.Error, key: "Identifier_expected_0_is_a_reserved_word_in_strict_mode_1212", message: "Identifier expected. '{0}' is a reserved word in strict mode" },
        Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode: { code: 1213, category: ts.DiagnosticCategory.Error, key: "Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_stric_1213", message: "Identifier expected. '{0}' is a reserved word in strict mode. Class definitions are automatically in strict mode." },
        Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode: { code: 1214, category: ts.DiagnosticCategory.Error, key: "Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode_1214", message: "Identifier expected. '{0}' is a reserved word in strict mode. Modules are automatically in strict mode." },
        Invalid_use_of_0_Modules_are_automatically_in_strict_mode: { code: 1215, category: ts.DiagnosticCategory.Error, key: "Invalid_use_of_0_Modules_are_automatically_in_strict_mode_1215", message: "Invalid use of '{0}'. Modules are automatically in strict mode." },
        Export_assignment_is_not_supported_when_module_flag_is_system: { code: 1218, category: ts.DiagnosticCategory.Error, key: "Export_assignment_is_not_supported_when_module_flag_is_system_1218", message: "Export assignment is not supported when '--module' flag is 'system'." },
        Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_the_experimentalDecorators_option_to_remove_this_warning: { code: 1219, category: ts.DiagnosticCategory.Error, key: "Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_t_1219", message: "Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning." },
        Generators_are_only_available_when_targeting_ECMAScript_2015_or_higher: { code: 1220, category: ts.DiagnosticCategory.Error, key: "Generators_are_only_available_when_targeting_ECMAScript_2015_or_higher_1220", message: "Generators are only available when targeting ECMAScript 2015 or higher." },
        Generators_are_not_allowed_in_an_ambient_context: { code: 1221, category: ts.DiagnosticCategory.Error, key: "Generators_are_not_allowed_in_an_ambient_context_1221", message: "Generators are not allowed in an ambient context." },
        An_overload_signature_cannot_be_declared_as_a_generator: { code: 1222, category: ts.DiagnosticCategory.Error, key: "An_overload_signature_cannot_be_declared_as_a_generator_1222", message: "An overload signature cannot be declared as a generator." },
        _0_tag_already_specified: { code: 1223, category: ts.DiagnosticCategory.Error, key: "_0_tag_already_specified_1223", message: "'{0}' tag already specified." },
        Signature_0_must_have_a_type_predicate: { code: 1224, category: ts.DiagnosticCategory.Error, key: "Signature_0_must_have_a_type_predicate_1224", message: "Signature '{0}' must have a type predicate." },
        Cannot_find_parameter_0: { code: 1225, category: ts.DiagnosticCategory.Error, key: "Cannot_find_parameter_0_1225", message: "Cannot find parameter '{0}'." },
        Type_predicate_0_is_not_assignable_to_1: { code: 1226, category: ts.DiagnosticCategory.Error, key: "Type_predicate_0_is_not_assignable_to_1_1226", message: "Type predicate '{0}' is not assignable to '{1}'." },
        Parameter_0_is_not_in_the_same_position_as_parameter_1: { code: 1227, category: ts.DiagnosticCategory.Error, key: "Parameter_0_is_not_in_the_same_position_as_parameter_1_1227", message: "Parameter '{0}' is not in the same position as parameter '{1}'." },
        A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods: { code: 1228, category: ts.DiagnosticCategory.Error, key: "A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods_1228", message: "A type predicate is only allowed in return type position for functions and methods." },
        A_type_predicate_cannot_reference_a_rest_parameter: { code: 1229, category: ts.DiagnosticCategory.Error, key: "A_type_predicate_cannot_reference_a_rest_parameter_1229", message: "A type predicate cannot reference a rest parameter." },
        A_type_predicate_cannot_reference_element_0_in_a_binding_pattern: { code: 1230, category: ts.DiagnosticCategory.Error, key: "A_type_predicate_cannot_reference_element_0_in_a_binding_pattern_1230", message: "A type predicate cannot reference element '{0}' in a binding pattern." },
        An_export_assignment_can_only_be_used_in_a_module: { code: 1231, category: ts.DiagnosticCategory.Error, key: "An_export_assignment_can_only_be_used_in_a_module_1231", message: "An export assignment can only be used in a module." },
        An_import_declaration_can_only_be_used_in_a_namespace_or_module: { code: 1232, category: ts.DiagnosticCategory.Error, key: "An_import_declaration_can_only_be_used_in_a_namespace_or_module_1232", message: "An import declaration can only be used in a namespace or module." },
        An_export_declaration_can_only_be_used_in_a_module: { code: 1233, category: ts.DiagnosticCategory.Error, key: "An_export_declaration_can_only_be_used_in_a_module_1233", message: "An export declaration can only be used in a module." },
        An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file: { code: 1234, category: ts.DiagnosticCategory.Error, key: "An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file_1234", message: "An ambient module declaration is only allowed at the top level in a file." },
        A_namespace_declaration_is_only_allowed_in_a_namespace_or_module: { code: 1235, category: ts.DiagnosticCategory.Error, key: "A_namespace_declaration_is_only_allowed_in_a_namespace_or_module_1235", message: "A namespace declaration is only allowed in a namespace or module." },
        The_return_type_of_a_property_decorator_function_must_be_either_void_or_any: { code: 1236, category: ts.DiagnosticCategory.Error, key: "The_return_type_of_a_property_decorator_function_must_be_either_void_or_any_1236", message: "The return type of a property decorator function must be either 'void' or 'any'." },
        The_return_type_of_a_parameter_decorator_function_must_be_either_void_or_any: { code: 1237, category: ts.DiagnosticCategory.Error, key: "The_return_type_of_a_parameter_decorator_function_must_be_either_void_or_any_1237", message: "The return type of a parameter decorator function must be either 'void' or 'any'." },
        Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression: { code: 1238, category: ts.DiagnosticCategory.Error, key: "Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression_1238", message: "Unable to resolve signature of class decorator when called as an expression." },
        Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression: { code: 1239, category: ts.DiagnosticCategory.Error, key: "Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression_1239", message: "Unable to resolve signature of parameter decorator when called as an expression." },
        Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression: { code: 1240, category: ts.DiagnosticCategory.Error, key: "Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression_1240", message: "Unable to resolve signature of property decorator when called as an expression." },
        Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression: { code: 1241, category: ts.DiagnosticCategory.Error, key: "Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression_1241", message: "Unable to resolve signature of method decorator when called as an expression." },
        abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration: { code: 1242, category: ts.DiagnosticCategory.Error, key: "abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration_1242", message: "'abstract' modifier can only appear on a class, method, or property declaration." },
        _0_modifier_cannot_be_used_with_1_modifier: { code: 1243, category: ts.DiagnosticCategory.Error, key: "_0_modifier_cannot_be_used_with_1_modifier_1243", message: "'{0}' modifier cannot be used with '{1}' modifier." },
        Abstract_methods_can_only_appear_within_an_abstract_class: { code: 1244, category: ts.DiagnosticCategory.Error, key: "Abstract_methods_can_only_appear_within_an_abstract_class_1244", message: "Abstract methods can only appear within an abstract class." },
        Method_0_cannot_have_an_implementation_because_it_is_marked_abstract: { code: 1245, category: ts.DiagnosticCategory.Error, key: "Method_0_cannot_have_an_implementation_because_it_is_marked_abstract_1245", message: "Method '{0}' cannot have an implementation because it is marked abstract." },
        An_interface_property_cannot_have_an_initializer: { code: 1246, category: ts.DiagnosticCategory.Error, key: "An_interface_property_cannot_have_an_initializer_1246", message: "An interface property cannot have an initializer." },
        A_type_literal_property_cannot_have_an_initializer: { code: 1247, category: ts.DiagnosticCategory.Error, key: "A_type_literal_property_cannot_have_an_initializer_1247", message: "A type literal property cannot have an initializer." },
        A_class_member_cannot_have_the_0_keyword: { code: 1248, category: ts.DiagnosticCategory.Error, key: "A_class_member_cannot_have_the_0_keyword_1248", message: "A class member cannot have the '{0}' keyword." },
        A_decorator_can_only_decorate_a_method_implementation_not_an_overload: { code: 1249, category: ts.DiagnosticCategory.Error, key: "A_decorator_can_only_decorate_a_method_implementation_not_an_overload_1249", message: "A decorator can only decorate a method implementation, not an overload." },
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5: { code: 1250, category: ts.DiagnosticCategory.Error, key: "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_1250", message: "Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'." },
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Class_definitions_are_automatically_in_strict_mode: { code: 1251, category: ts.DiagnosticCategory.Error, key: "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Class_d_1251", message: "Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'. Class definitions are automatically in strict mode." },
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Modules_are_automatically_in_strict_mode: { code: 1252, category: ts.DiagnosticCategory.Error, key: "Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Modules_1252", message: "Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'. Modules are automatically in strict mode." },
        _0_tag_cannot_be_used_independently_as_a_top_level_JSDoc_tag: { code: 1253, category: ts.DiagnosticCategory.Error, key: "_0_tag_cannot_be_used_independently_as_a_top_level_JSDoc_tag_1253", message: "'{0}' tag cannot be used independently as a top level JSDoc tag." },
        A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal: { code: 1254, category: ts.DiagnosticCategory.Error, key: "A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal_1254", message: "A 'const' initializer in an ambient context must be a string or numeric literal." },
        with_statements_are_not_allowed_in_an_async_function_block: { code: 1300, category: ts.DiagnosticCategory.Error, key: "with_statements_are_not_allowed_in_an_async_function_block_1300", message: "'with' statements are not allowed in an async function block." },
        await_expression_is_only_allowed_within_an_async_function: { code: 1308, category: ts.DiagnosticCategory.Error, key: "await_expression_is_only_allowed_within_an_async_function_1308", message: "'await' expression is only allowed within an async function." },
        can_only_be_used_in_an_object_literal_property_inside_a_destructuring_assignment: { code: 1312, category: ts.DiagnosticCategory.Error, key: "can_only_be_used_in_an_object_literal_property_inside_a_destructuring_assignment_1312", message: "'=' can only be used in an object literal property inside a destructuring assignment." },
        The_body_of_an_if_statement_cannot_be_the_empty_statement: { code: 1313, category: ts.DiagnosticCategory.Error, key: "The_body_of_an_if_statement_cannot_be_the_empty_statement_1313", message: "The body of an 'if' statement cannot be the empty statement." },
        Global_module_exports_may_only_appear_in_module_files: { code: 1314, category: ts.DiagnosticCategory.Error, key: "Global_module_exports_may_only_appear_in_module_files_1314", message: "Global module exports may only appear in module files." },
        Global_module_exports_may_only_appear_in_declaration_files: { code: 1315, category: ts.DiagnosticCategory.Error, key: "Global_module_exports_may_only_appear_in_declaration_files_1315", message: "Global module exports may only appear in declaration files." },
        Global_module_exports_may_only_appear_at_top_level: { code: 1316, category: ts.DiagnosticCategory.Error, key: "Global_module_exports_may_only_appear_at_top_level_1316", message: "Global module exports may only appear at top level." },
        A_parameter_property_cannot_be_declared_using_a_rest_parameter: { code: 1317, category: ts.DiagnosticCategory.Error, key: "A_parameter_property_cannot_be_declared_using_a_rest_parameter_1317", message: "A parameter property cannot be declared using a rest parameter." },
        Duplicate_identifier_0: { code: 2300, category: ts.DiagnosticCategory.Error, key: "Duplicate_identifier_0_2300", message: "Duplicate identifier '{0}'." },
        Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor: { code: 2301, category: ts.DiagnosticCategory.Error, key: "Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor_2301", message: "Initializer of instance member variable '{0}' cannot reference identifier '{1}' declared in the constructor." },
        Static_members_cannot_reference_class_type_parameters: { code: 2302, category: ts.DiagnosticCategory.Error, key: "Static_members_cannot_reference_class_type_parameters_2302", message: "Static members cannot reference class type parameters." },
        Circular_definition_of_import_alias_0: { code: 2303, category: ts.DiagnosticCategory.Error, key: "Circular_definition_of_import_alias_0_2303", message: "Circular definition of import alias '{0}'." },
        Cannot_find_name_0: { code: 2304, category: ts.DiagnosticCategory.Error, key: "Cannot_find_name_0_2304", message: "Cannot find name '{0}'." },
        Module_0_has_no_exported_member_1: { code: 2305, category: ts.DiagnosticCategory.Error, key: "Module_0_has_no_exported_member_1_2305", message: "Module '{0}' has no exported member '{1}'." },
        File_0_is_not_a_module: { code: 2306, category: ts.DiagnosticCategory.Error, key: "File_0_is_not_a_module_2306", message: "File '{0}' is not a module." },
        Cannot_find_module_0: { code: 2307, category: ts.DiagnosticCategory.Error, key: "Cannot_find_module_0_2307", message: "Cannot find module '{0}'." },
        Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambiguity: { code: 2308, category: ts.DiagnosticCategory.Error, key: "Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambig_2308", message: "Module {0} has already exported a member named '{1}'. Consider explicitly re-exporting to resolve the ambiguity." },
        An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements: { code: 2309, category: ts.DiagnosticCategory.Error, key: "An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements_2309", message: "An export assignment cannot be used in a module with other exported elements." },
        Type_0_recursively_references_itself_as_a_base_type: { code: 2310, category: ts.DiagnosticCategory.Error, key: "Type_0_recursively_references_itself_as_a_base_type_2310", message: "Type '{0}' recursively references itself as a base type." },
        A_class_may_only_extend_another_class: { code: 2311, category: ts.DiagnosticCategory.Error, key: "A_class_may_only_extend_another_class_2311", message: "A class may only extend another class." },
        An_interface_may_only_extend_a_class_or_another_interface: { code: 2312, category: ts.DiagnosticCategory.Error, key: "An_interface_may_only_extend_a_class_or_another_interface_2312", message: "An interface may only extend a class or another interface." },
        Type_parameter_0_has_a_circular_constraint: { code: 2313, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_has_a_circular_constraint_2313", message: "Type parameter '{0}' has a circular constraint." },
        Generic_type_0_requires_1_type_argument_s: { code: 2314, category: ts.DiagnosticCategory.Error, key: "Generic_type_0_requires_1_type_argument_s_2314", message: "Generic type '{0}' requires {1} type argument(s)." },
        Type_0_is_not_generic: { code: 2315, category: ts.DiagnosticCategory.Error, key: "Type_0_is_not_generic_2315", message: "Type '{0}' is not generic." },
        Global_type_0_must_be_a_class_or_interface_type: { code: 2316, category: ts.DiagnosticCategory.Error, key: "Global_type_0_must_be_a_class_or_interface_type_2316", message: "Global type '{0}' must be a class or interface type." },
        Global_type_0_must_have_1_type_parameter_s: { code: 2317, category: ts.DiagnosticCategory.Error, key: "Global_type_0_must_have_1_type_parameter_s_2317", message: "Global type '{0}' must have {1} type parameter(s)." },
        Cannot_find_global_type_0: { code: 2318, category: ts.DiagnosticCategory.Error, key: "Cannot_find_global_type_0_2318", message: "Cannot find global type '{0}'." },
        Named_property_0_of_types_1_and_2_are_not_identical: { code: 2319, category: ts.DiagnosticCategory.Error, key: "Named_property_0_of_types_1_and_2_are_not_identical_2319", message: "Named property '{0}' of types '{1}' and '{2}' are not identical." },
        Interface_0_cannot_simultaneously_extend_types_1_and_2: { code: 2320, category: ts.DiagnosticCategory.Error, key: "Interface_0_cannot_simultaneously_extend_types_1_and_2_2320", message: "Interface '{0}' cannot simultaneously extend types '{1}' and '{2}'." },
        Excessive_stack_depth_comparing_types_0_and_1: { code: 2321, category: ts.DiagnosticCategory.Error, key: "Excessive_stack_depth_comparing_types_0_and_1_2321", message: "Excessive stack depth comparing types '{0}' and '{1}'." },
        Type_0_is_not_assignable_to_type_1: { code: 2322, category: ts.DiagnosticCategory.Error, key: "Type_0_is_not_assignable_to_type_1_2322", message: "Type '{0}' is not assignable to type '{1}'." },
        Cannot_redeclare_exported_variable_0: { code: 2323, category: ts.DiagnosticCategory.Error, key: "Cannot_redeclare_exported_variable_0_2323", message: "Cannot redeclare exported variable '{0}'." },
        Property_0_is_missing_in_type_1: { code: 2324, category: ts.DiagnosticCategory.Error, key: "Property_0_is_missing_in_type_1_2324", message: "Property '{0}' is missing in type '{1}'." },
        Property_0_is_private_in_type_1_but_not_in_type_2: { code: 2325, category: ts.DiagnosticCategory.Error, key: "Property_0_is_private_in_type_1_but_not_in_type_2_2325", message: "Property '{0}' is private in type '{1}' but not in type '{2}'." },
        Types_of_property_0_are_incompatible: { code: 2326, category: ts.DiagnosticCategory.Error, key: "Types_of_property_0_are_incompatible_2326", message: "Types of property '{0}' are incompatible." },
        Property_0_is_optional_in_type_1_but_required_in_type_2: { code: 2327, category: ts.DiagnosticCategory.Error, key: "Property_0_is_optional_in_type_1_but_required_in_type_2_2327", message: "Property '{0}' is optional in type '{1}' but required in type '{2}'." },
        Types_of_parameters_0_and_1_are_incompatible: { code: 2328, category: ts.DiagnosticCategory.Error, key: "Types_of_parameters_0_and_1_are_incompatible_2328", message: "Types of parameters '{0}' and '{1}' are incompatible." },
        Index_signature_is_missing_in_type_0: { code: 2329, category: ts.DiagnosticCategory.Error, key: "Index_signature_is_missing_in_type_0_2329", message: "Index signature is missing in type '{0}'." },
        Index_signatures_are_incompatible: { code: 2330, category: ts.DiagnosticCategory.Error, key: "Index_signatures_are_incompatible_2330", message: "Index signatures are incompatible." },
        this_cannot_be_referenced_in_a_module_or_namespace_body: { code: 2331, category: ts.DiagnosticCategory.Error, key: "this_cannot_be_referenced_in_a_module_or_namespace_body_2331", message: "'this' cannot be referenced in a module or namespace body." },
        this_cannot_be_referenced_in_current_location: { code: 2332, category: ts.DiagnosticCategory.Error, key: "this_cannot_be_referenced_in_current_location_2332", message: "'this' cannot be referenced in current location." },
        this_cannot_be_referenced_in_constructor_arguments: { code: 2333, category: ts.DiagnosticCategory.Error, key: "this_cannot_be_referenced_in_constructor_arguments_2333", message: "'this' cannot be referenced in constructor arguments." },
        this_cannot_be_referenced_in_a_static_property_initializer: { code: 2334, category: ts.DiagnosticCategory.Error, key: "this_cannot_be_referenced_in_a_static_property_initializer_2334", message: "'this' cannot be referenced in a static property initializer." },
        super_can_only_be_referenced_in_a_derived_class: { code: 2335, category: ts.DiagnosticCategory.Error, key: "super_can_only_be_referenced_in_a_derived_class_2335", message: "'super' can only be referenced in a derived class." },
        super_cannot_be_referenced_in_constructor_arguments: { code: 2336, category: ts.DiagnosticCategory.Error, key: "super_cannot_be_referenced_in_constructor_arguments_2336", message: "'super' cannot be referenced in constructor arguments." },
        Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors: { code: 2337, category: ts.DiagnosticCategory.Error, key: "Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors_2337", message: "Super calls are not permitted outside constructors or in nested functions inside constructors." },
        super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class: { code: 2338, category: ts.DiagnosticCategory.Error, key: "super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_der_2338", message: "'super' property access is permitted only in a constructor, member function, or member accessor of a derived class." },
        Property_0_does_not_exist_on_type_1: { code: 2339, category: ts.DiagnosticCategory.Error, key: "Property_0_does_not_exist_on_type_1_2339", message: "Property '{0}' does not exist on type '{1}'." },
        Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword: { code: 2340, category: ts.DiagnosticCategory.Error, key: "Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword_2340", message: "Only public and protected methods of the base class are accessible via the 'super' keyword." },
        Property_0_is_private_and_only_accessible_within_class_1: { code: 2341, category: ts.DiagnosticCategory.Error, key: "Property_0_is_private_and_only_accessible_within_class_1_2341", message: "Property '{0}' is private and only accessible within class '{1}'." },
        An_index_expression_argument_must_be_of_type_string_number_symbol_or_any: { code: 2342, category: ts.DiagnosticCategory.Error, key: "An_index_expression_argument_must_be_of_type_string_number_symbol_or_any_2342", message: "An index expression argument must be of type 'string', 'number', 'symbol', or 'any'." },
        Type_0_does_not_satisfy_the_constraint_1: { code: 2344, category: ts.DiagnosticCategory.Error, key: "Type_0_does_not_satisfy_the_constraint_1_2344", message: "Type '{0}' does not satisfy the constraint '{1}'." },
        Argument_of_type_0_is_not_assignable_to_parameter_of_type_1: { code: 2345, category: ts.DiagnosticCategory.Error, key: "Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_2345", message: "Argument of type '{0}' is not assignable to parameter of type '{1}'." },
        Supplied_parameters_do_not_match_any_signature_of_call_target: { code: 2346, category: ts.DiagnosticCategory.Error, key: "Supplied_parameters_do_not_match_any_signature_of_call_target_2346", message: "Supplied parameters do not match any signature of call target." },
        Untyped_function_calls_may_not_accept_type_arguments: { code: 2347, category: ts.DiagnosticCategory.Error, key: "Untyped_function_calls_may_not_accept_type_arguments_2347", message: "Untyped function calls may not accept type arguments." },
        Value_of_type_0_is_not_callable_Did_you_mean_to_include_new: { code: 2348, category: ts.DiagnosticCategory.Error, key: "Value_of_type_0_is_not_callable_Did_you_mean_to_include_new_2348", message: "Value of type '{0}' is not callable. Did you mean to include 'new'?" },
        Cannot_invoke_an_expression_whose_type_lacks_a_call_signature_Type_0_has_no_compatible_call_signatures: { code: 2349, category: ts.DiagnosticCategory.Error, key: "Cannot_invoke_an_expression_whose_type_lacks_a_call_signature_Type_0_has_no_compatible_call_signatur_2349", message: "Cannot invoke an expression whose type lacks a call signature. Type '{0}' has no compatible call signatures." },
        Only_a_void_function_can_be_called_with_the_new_keyword: { code: 2350, category: ts.DiagnosticCategory.Error, key: "Only_a_void_function_can_be_called_with_the_new_keyword_2350", message: "Only a void function can be called with the 'new' keyword." },
        Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature: { code: 2351, category: ts.DiagnosticCategory.Error, key: "Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature_2351", message: "Cannot use 'new' with an expression whose type lacks a call or construct signature." },
        Type_0_cannot_be_converted_to_type_1: { code: 2352, category: ts.DiagnosticCategory.Error, key: "Type_0_cannot_be_converted_to_type_1_2352", message: "Type '{0}' cannot be converted to type '{1}'." },
        Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1: { code: 2353, category: ts.DiagnosticCategory.Error, key: "Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1_2353", message: "Object literal may only specify known properties, and '{0}' does not exist in type '{1}'." },
        A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value: { code: 2355, category: ts.DiagnosticCategory.Error, key: "A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value_2355", message: "A function whose declared type is neither 'void' nor 'any' must return a value." },
        An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type: { code: 2356, category: ts.DiagnosticCategory.Error, key: "An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type_2356", message: "An arithmetic operand must be of type 'any', 'number' or an enum type." },
        The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer: { code: 2357, category: ts.DiagnosticCategory.Error, key: "The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer_2357", message: "The operand of an increment or decrement operator must be a variable, property or indexer." },
        The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: { code: 2358, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_paramete_2358", message: "The left-hand side of an 'instanceof' expression must be of type 'any', an object type or a type parameter." },
        The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type: { code: 2359, category: ts.DiagnosticCategory.Error, key: "The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_F_2359", message: "The right-hand side of an 'instanceof' expression must be of type 'any' or of a type assignable to the 'Function' interface type." },
        The_left_hand_side_of_an_in_expression_must_be_of_type_any_string_number_or_symbol: { code: 2360, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_an_in_expression_must_be_of_type_any_string_number_or_symbol_2360", message: "The left-hand side of an 'in' expression must be of type 'any', 'string', 'number', or 'symbol'." },
        The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: { code: 2361, category: ts.DiagnosticCategory.Error, key: "The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter_2361", message: "The right-hand side of an 'in' expression must be of type 'any', an object type or a type parameter" },
        The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: { code: 2362, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type_2362", message: "The left-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type." },
        The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: { code: 2363, category: ts.DiagnosticCategory.Error, key: "The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type_2363", message: "The right-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type." },
        Invalid_left_hand_side_of_assignment_expression: { code: 2364, category: ts.DiagnosticCategory.Error, key: "Invalid_left_hand_side_of_assignment_expression_2364", message: "Invalid left-hand side of assignment expression." },
        Operator_0_cannot_be_applied_to_types_1_and_2: { code: 2365, category: ts.DiagnosticCategory.Error, key: "Operator_0_cannot_be_applied_to_types_1_and_2_2365", message: "Operator '{0}' cannot be applied to types '{1}' and '{2}'." },
        Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined: { code: 2366, category: ts.DiagnosticCategory.Error, key: "Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined_2366", message: "Function lacks ending return statement and return type does not include 'undefined'." },
        Type_parameter_name_cannot_be_0: { code: 2368, category: ts.DiagnosticCategory.Error, key: "Type_parameter_name_cannot_be_0_2368", message: "Type parameter name cannot be '{0}'" },
        A_parameter_property_is_only_allowed_in_a_constructor_implementation: { code: 2369, category: ts.DiagnosticCategory.Error, key: "A_parameter_property_is_only_allowed_in_a_constructor_implementation_2369", message: "A parameter property is only allowed in a constructor implementation." },
        A_rest_parameter_must_be_of_an_array_type: { code: 2370, category: ts.DiagnosticCategory.Error, key: "A_rest_parameter_must_be_of_an_array_type_2370", message: "A rest parameter must be of an array type." },
        A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation: { code: 2371, category: ts.DiagnosticCategory.Error, key: "A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation_2371", message: "A parameter initializer is only allowed in a function or constructor implementation." },
        Parameter_0_cannot_be_referenced_in_its_initializer: { code: 2372, category: ts.DiagnosticCategory.Error, key: "Parameter_0_cannot_be_referenced_in_its_initializer_2372", message: "Parameter '{0}' cannot be referenced in its initializer." },
        Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it: { code: 2373, category: ts.DiagnosticCategory.Error, key: "Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it_2373", message: "Initializer of parameter '{0}' cannot reference identifier '{1}' declared after it." },
        Duplicate_string_index_signature: { code: 2374, category: ts.DiagnosticCategory.Error, key: "Duplicate_string_index_signature_2374", message: "Duplicate string index signature." },
        Duplicate_number_index_signature: { code: 2375, category: ts.DiagnosticCategory.Error, key: "Duplicate_number_index_signature_2375", message: "Duplicate number index signature." },
        A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties: { code: 2376, category: ts.DiagnosticCategory.Error, key: "A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_proper_2376", message: "A 'super' call must be the first statement in the constructor when a class contains initialized properties or has parameter properties." },
        Constructors_for_derived_classes_must_contain_a_super_call: { code: 2377, category: ts.DiagnosticCategory.Error, key: "Constructors_for_derived_classes_must_contain_a_super_call_2377", message: "Constructors for derived classes must contain a 'super' call." },
        A_get_accessor_must_return_a_value: { code: 2378, category: ts.DiagnosticCategory.Error, key: "A_get_accessor_must_return_a_value_2378", message: "A 'get' accessor must return a value." },
        Getter_and_setter_accessors_do_not_agree_in_visibility: { code: 2379, category: ts.DiagnosticCategory.Error, key: "Getter_and_setter_accessors_do_not_agree_in_visibility_2379", message: "Getter and setter accessors do not agree in visibility." },
        get_and_set_accessor_must_have_the_same_type: { code: 2380, category: ts.DiagnosticCategory.Error, key: "get_and_set_accessor_must_have_the_same_type_2380", message: "'get' and 'set' accessor must have the same type." },
        A_signature_with_an_implementation_cannot_use_a_string_literal_type: { code: 2381, category: ts.DiagnosticCategory.Error, key: "A_signature_with_an_implementation_cannot_use_a_string_literal_type_2381", message: "A signature with an implementation cannot use a string literal type." },
        Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature: { code: 2382, category: ts.DiagnosticCategory.Error, key: "Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature_2382", message: "Specialized overload signature is not assignable to any non-specialized signature." },
        Overload_signatures_must_all_be_exported_or_non_exported: { code: 2383, category: ts.DiagnosticCategory.Error, key: "Overload_signatures_must_all_be_exported_or_non_exported_2383", message: "Overload signatures must all be exported or non-exported." },
        Overload_signatures_must_all_be_ambient_or_non_ambient: { code: 2384, category: ts.DiagnosticCategory.Error, key: "Overload_signatures_must_all_be_ambient_or_non_ambient_2384", message: "Overload signatures must all be ambient or non-ambient." },
        Overload_signatures_must_all_be_public_private_or_protected: { code: 2385, category: ts.DiagnosticCategory.Error, key: "Overload_signatures_must_all_be_public_private_or_protected_2385", message: "Overload signatures must all be public, private or protected." },
        Overload_signatures_must_all_be_optional_or_required: { code: 2386, category: ts.DiagnosticCategory.Error, key: "Overload_signatures_must_all_be_optional_or_required_2386", message: "Overload signatures must all be optional or required." },
        Function_overload_must_be_static: { code: 2387, category: ts.DiagnosticCategory.Error, key: "Function_overload_must_be_static_2387", message: "Function overload must be static." },
        Function_overload_must_not_be_static: { code: 2388, category: ts.DiagnosticCategory.Error, key: "Function_overload_must_not_be_static_2388", message: "Function overload must not be static." },
        Function_implementation_name_must_be_0: { code: 2389, category: ts.DiagnosticCategory.Error, key: "Function_implementation_name_must_be_0_2389", message: "Function implementation name must be '{0}'." },
        Constructor_implementation_is_missing: { code: 2390, category: ts.DiagnosticCategory.Error, key: "Constructor_implementation_is_missing_2390", message: "Constructor implementation is missing." },
        Function_implementation_is_missing_or_not_immediately_following_the_declaration: { code: 2391, category: ts.DiagnosticCategory.Error, key: "Function_implementation_is_missing_or_not_immediately_following_the_declaration_2391", message: "Function implementation is missing or not immediately following the declaration." },
        Multiple_constructor_implementations_are_not_allowed: { code: 2392, category: ts.DiagnosticCategory.Error, key: "Multiple_constructor_implementations_are_not_allowed_2392", message: "Multiple constructor implementations are not allowed." },
        Duplicate_function_implementation: { code: 2393, category: ts.DiagnosticCategory.Error, key: "Duplicate_function_implementation_2393", message: "Duplicate function implementation." },
        Overload_signature_is_not_compatible_with_function_implementation: { code: 2394, category: ts.DiagnosticCategory.Error, key: "Overload_signature_is_not_compatible_with_function_implementation_2394", message: "Overload signature is not compatible with function implementation." },
        Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local: { code: 2395, category: ts.DiagnosticCategory.Error, key: "Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local_2395", message: "Individual declarations in merged declaration '{0}' must be all exported or all local." },
        Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters: { code: 2396, category: ts.DiagnosticCategory.Error, key: "Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters_2396", message: "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters." },
        Declaration_name_conflicts_with_built_in_global_identifier_0: { code: 2397, category: ts.DiagnosticCategory.Error, key: "Declaration_name_conflicts_with_built_in_global_identifier_0_2397", message: "Declaration name conflicts with built-in global identifier '{0}'." },
        Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference: { code: 2399, category: ts.DiagnosticCategory.Error, key: "Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference_2399", message: "Duplicate identifier '_this'. Compiler uses variable declaration '_this' to capture 'this' reference." },
        Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference: { code: 2400, category: ts.DiagnosticCategory.Error, key: "Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference_2400", message: "Expression resolves to variable declaration '_this' that compiler uses to capture 'this' reference." },
        Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference: { code: 2401, category: ts.DiagnosticCategory.Error, key: "Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference_2401", message: "Duplicate identifier '_super'. Compiler uses '_super' to capture base class reference." },
        Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference: { code: 2402, category: ts.DiagnosticCategory.Error, key: "Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference_2402", message: "Expression resolves to '_super' that compiler uses to capture base class reference." },
        Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2: { code: 2403, category: ts.DiagnosticCategory.Error, key: "Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_t_2403", message: "Subsequent variable declarations must have the same type.  Variable '{0}' must be of type '{1}', but here has type '{2}'." },
        The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation: { code: 2404, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation_2404", message: "The left-hand side of a 'for...in' statement cannot use a type annotation." },
        The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any: { code: 2405, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any_2405", message: "The left-hand side of a 'for...in' statement must be of type 'string' or 'any'." },
        Invalid_left_hand_side_in_for_in_statement: { code: 2406, category: ts.DiagnosticCategory.Error, key: "Invalid_left_hand_side_in_for_in_statement_2406", message: "Invalid left-hand side in 'for...in' statement." },
        The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter: { code: 2407, category: ts.DiagnosticCategory.Error, key: "The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter_2407", message: "The right-hand side of a 'for...in' statement must be of type 'any', an object type or a type parameter." },
        Setters_cannot_return_a_value: { code: 2408, category: ts.DiagnosticCategory.Error, key: "Setters_cannot_return_a_value_2408", message: "Setters cannot return a value." },
        Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class: { code: 2409, category: ts.DiagnosticCategory.Error, key: "Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class_2409", message: "Return type of constructor signature must be assignable to the instance type of the class" },
        The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any: { code: 2410, category: ts.DiagnosticCategory.Error, key: "The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any_2410", message: "The 'with' statement is not supported. All symbols in a 'with' block will have type 'any'." },
        Property_0_of_type_1_is_not_assignable_to_string_index_type_2: { code: 2411, category: ts.DiagnosticCategory.Error, key: "Property_0_of_type_1_is_not_assignable_to_string_index_type_2_2411", message: "Property '{0}' of type '{1}' is not assignable to string index type '{2}'." },
        Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2: { code: 2412, category: ts.DiagnosticCategory.Error, key: "Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2_2412", message: "Property '{0}' of type '{1}' is not assignable to numeric index type '{2}'." },
        Numeric_index_type_0_is_not_assignable_to_string_index_type_1: { code: 2413, category: ts.DiagnosticCategory.Error, key: "Numeric_index_type_0_is_not_assignable_to_string_index_type_1_2413", message: "Numeric index type '{0}' is not assignable to string index type '{1}'." },
        Class_name_cannot_be_0: { code: 2414, category: ts.DiagnosticCategory.Error, key: "Class_name_cannot_be_0_2414", message: "Class name cannot be '{0}'" },
        Class_0_incorrectly_extends_base_class_1: { code: 2415, category: ts.DiagnosticCategory.Error, key: "Class_0_incorrectly_extends_base_class_1_2415", message: "Class '{0}' incorrectly extends base class '{1}'." },
        Class_static_side_0_incorrectly_extends_base_class_static_side_1: { code: 2417, category: ts.DiagnosticCategory.Error, key: "Class_static_side_0_incorrectly_extends_base_class_static_side_1_2417", message: "Class static side '{0}' incorrectly extends base class static side '{1}'." },
        Class_0_incorrectly_implements_interface_1: { code: 2420, category: ts.DiagnosticCategory.Error, key: "Class_0_incorrectly_implements_interface_1_2420", message: "Class '{0}' incorrectly implements interface '{1}'." },
        A_class_may_only_implement_another_class_or_interface: { code: 2422, category: ts.DiagnosticCategory.Error, key: "A_class_may_only_implement_another_class_or_interface_2422", message: "A class may only implement another class or interface." },
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor: { code: 2423, category: ts.DiagnosticCategory.Error, key: "Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_access_2423", message: "Class '{0}' defines instance member function '{1}', but extended class '{2}' defines it as instance member accessor." },
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property: { code: 2424, category: ts.DiagnosticCategory.Error, key: "Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_proper_2424", message: "Class '{0}' defines instance member function '{1}', but extended class '{2}' defines it as instance member property." },
        Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function: { code: 2425, category: ts.DiagnosticCategory.Error, key: "Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_functi_2425", message: "Class '{0}' defines instance member property '{1}', but extended class '{2}' defines it as instance member function." },
        Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function: { code: 2426, category: ts.DiagnosticCategory.Error, key: "Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_functi_2426", message: "Class '{0}' defines instance member accessor '{1}', but extended class '{2}' defines it as instance member function." },
        Interface_name_cannot_be_0: { code: 2427, category: ts.DiagnosticCategory.Error, key: "Interface_name_cannot_be_0_2427", message: "Interface name cannot be '{0}'" },
        All_declarations_of_0_must_have_identical_type_parameters: { code: 2428, category: ts.DiagnosticCategory.Error, key: "All_declarations_of_0_must_have_identical_type_parameters_2428", message: "All declarations of '{0}' must have identical type parameters." },
        Interface_0_incorrectly_extends_interface_1: { code: 2430, category: ts.DiagnosticCategory.Error, key: "Interface_0_incorrectly_extends_interface_1_2430", message: "Interface '{0}' incorrectly extends interface '{1}'." },
        Enum_name_cannot_be_0: { code: 2431, category: ts.DiagnosticCategory.Error, key: "Enum_name_cannot_be_0_2431", message: "Enum name cannot be '{0}'" },
        In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element: { code: 2432, category: ts.DiagnosticCategory.Error, key: "In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enu_2432", message: "In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element." },
        A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged: { code: 2433, category: ts.DiagnosticCategory.Error, key: "A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merg_2433", message: "A namespace declaration cannot be in a different file from a class or function with which it is merged" },
        A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged: { code: 2434, category: ts.DiagnosticCategory.Error, key: "A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged_2434", message: "A namespace declaration cannot be located prior to a class or function with which it is merged" },
        Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces: { code: 2435, category: ts.DiagnosticCategory.Error, key: "Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces_2435", message: "Ambient modules cannot be nested in other modules or namespaces." },
        Ambient_module_declaration_cannot_specify_relative_module_name: { code: 2436, category: ts.DiagnosticCategory.Error, key: "Ambient_module_declaration_cannot_specify_relative_module_name_2436", message: "Ambient module declaration cannot specify relative module name." },
        Module_0_is_hidden_by_a_local_declaration_with_the_same_name: { code: 2437, category: ts.DiagnosticCategory.Error, key: "Module_0_is_hidden_by_a_local_declaration_with_the_same_name_2437", message: "Module '{0}' is hidden by a local declaration with the same name" },
        Import_name_cannot_be_0: { code: 2438, category: ts.DiagnosticCategory.Error, key: "Import_name_cannot_be_0_2438", message: "Import name cannot be '{0}'" },
        Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relative_module_name: { code: 2439, category: ts.DiagnosticCategory.Error, key: "Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relati_2439", message: "Import or export declaration in an ambient module declaration cannot reference module through relative module name." },
        Import_declaration_conflicts_with_local_declaration_of_0: { code: 2440, category: ts.DiagnosticCategory.Error, key: "Import_declaration_conflicts_with_local_declaration_of_0_2440", message: "Import declaration conflicts with local declaration of '{0}'" },
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module: { code: 2441, category: ts.DiagnosticCategory.Error, key: "Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_2441", message: "Duplicate identifier '{0}'. Compiler reserves name '{1}' in top level scope of a module." },
        Types_have_separate_declarations_of_a_private_property_0: { code: 2442, category: ts.DiagnosticCategory.Error, key: "Types_have_separate_declarations_of_a_private_property_0_2442", message: "Types have separate declarations of a private property '{0}'." },
        Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2: { code: 2443, category: ts.DiagnosticCategory.Error, key: "Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2_2443", message: "Property '{0}' is protected but type '{1}' is not a class derived from '{2}'." },
        Property_0_is_protected_in_type_1_but_public_in_type_2: { code: 2444, category: ts.DiagnosticCategory.Error, key: "Property_0_is_protected_in_type_1_but_public_in_type_2_2444", message: "Property '{0}' is protected in type '{1}' but public in type '{2}'." },
        Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses: { code: 2445, category: ts.DiagnosticCategory.Error, key: "Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses_2445", message: "Property '{0}' is protected and only accessible within class '{1}' and its subclasses." },
        Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1: { code: 2446, category: ts.DiagnosticCategory.Error, key: "Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1_2446", message: "Property '{0}' is protected and only accessible through an instance of class '{1}'." },
        The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead: { code: 2447, category: ts.DiagnosticCategory.Error, key: "The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead_2447", message: "The '{0}' operator is not allowed for boolean types. Consider using '{1}' instead." },
        Block_scoped_variable_0_used_before_its_declaration: { code: 2448, category: ts.DiagnosticCategory.Error, key: "Block_scoped_variable_0_used_before_its_declaration_2448", message: "Block-scoped variable '{0}' used before its declaration." },
        The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant_or_a_read_only_property: { code: 2449, category: ts.DiagnosticCategory.Error, key: "The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant_or_a_read_only_property_2449", message: "The operand of an increment or decrement operator cannot be a constant or a read-only property." },
        Left_hand_side_of_assignment_expression_cannot_be_a_constant_or_a_read_only_property: { code: 2450, category: ts.DiagnosticCategory.Error, key: "Left_hand_side_of_assignment_expression_cannot_be_a_constant_or_a_read_only_property_2450", message: "Left-hand side of assignment expression cannot be a constant or a read-only property." },
        Cannot_redeclare_block_scoped_variable_0: { code: 2451, category: ts.DiagnosticCategory.Error, key: "Cannot_redeclare_block_scoped_variable_0_2451", message: "Cannot redeclare block-scoped variable '{0}'." },
        An_enum_member_cannot_have_a_numeric_name: { code: 2452, category: ts.DiagnosticCategory.Error, key: "An_enum_member_cannot_have_a_numeric_name_2452", message: "An enum member cannot have a numeric name." },
        The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly: { code: 2453, category: ts.DiagnosticCategory.Error, key: "The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_typ_2453", message: "The type argument for type parameter '{0}' cannot be inferred from the usage. Consider specifying the type arguments explicitly." },
        Variable_0_is_used_before_being_assigned: { code: 2454, category: ts.DiagnosticCategory.Error, key: "Variable_0_is_used_before_being_assigned_2454", message: "Variable '{0}' is used before being assigned." },
        Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0: { code: 2455, category: ts.DiagnosticCategory.Error, key: "Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0_2455", message: "Type argument candidate '{1}' is not a valid type argument because it is not a supertype of candidate '{0}'." },
        Type_alias_0_circularly_references_itself: { code: 2456, category: ts.DiagnosticCategory.Error, key: "Type_alias_0_circularly_references_itself_2456", message: "Type alias '{0}' circularly references itself." },
        Type_alias_name_cannot_be_0: { code: 2457, category: ts.DiagnosticCategory.Error, key: "Type_alias_name_cannot_be_0_2457", message: "Type alias name cannot be '{0}'" },
        An_AMD_module_cannot_have_multiple_name_assignments: { code: 2458, category: ts.DiagnosticCategory.Error, key: "An_AMD_module_cannot_have_multiple_name_assignments_2458", message: "An AMD module cannot have multiple name assignments." },
        Type_0_has_no_property_1_and_no_string_index_signature: { code: 2459, category: ts.DiagnosticCategory.Error, key: "Type_0_has_no_property_1_and_no_string_index_signature_2459", message: "Type '{0}' has no property '{1}' and no string index signature." },
        Type_0_has_no_property_1: { code: 2460, category: ts.DiagnosticCategory.Error, key: "Type_0_has_no_property_1_2460", message: "Type '{0}' has no property '{1}'." },
        Type_0_is_not_an_array_type: { code: 2461, category: ts.DiagnosticCategory.Error, key: "Type_0_is_not_an_array_type_2461", message: "Type '{0}' is not an array type." },
        A_rest_element_must_be_last_in_an_array_destructuring_pattern: { code: 2462, category: ts.DiagnosticCategory.Error, key: "A_rest_element_must_be_last_in_an_array_destructuring_pattern_2462", message: "A rest element must be last in an array destructuring pattern" },
        A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature: { code: 2463, category: ts.DiagnosticCategory.Error, key: "A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature_2463", message: "A binding pattern parameter cannot be optional in an implementation signature." },
        A_computed_property_name_must_be_of_type_string_number_symbol_or_any: { code: 2464, category: ts.DiagnosticCategory.Error, key: "A_computed_property_name_must_be_of_type_string_number_symbol_or_any_2464", message: "A computed property name must be of type 'string', 'number', 'symbol', or 'any'." },
        this_cannot_be_referenced_in_a_computed_property_name: { code: 2465, category: ts.DiagnosticCategory.Error, key: "this_cannot_be_referenced_in_a_computed_property_name_2465", message: "'this' cannot be referenced in a computed property name." },
        super_cannot_be_referenced_in_a_computed_property_name: { code: 2466, category: ts.DiagnosticCategory.Error, key: "super_cannot_be_referenced_in_a_computed_property_name_2466", message: "'super' cannot be referenced in a computed property name." },
        A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type: { code: 2467, category: ts.DiagnosticCategory.Error, key: "A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type_2467", message: "A computed property name cannot reference a type parameter from its containing type." },
        Cannot_find_global_value_0: { code: 2468, category: ts.DiagnosticCategory.Error, key: "Cannot_find_global_value_0_2468", message: "Cannot find global value '{0}'." },
        The_0_operator_cannot_be_applied_to_type_symbol: { code: 2469, category: ts.DiagnosticCategory.Error, key: "The_0_operator_cannot_be_applied_to_type_symbol_2469", message: "The '{0}' operator cannot be applied to type 'symbol'." },
        Symbol_reference_does_not_refer_to_the_global_Symbol_constructor_object: { code: 2470, category: ts.DiagnosticCategory.Error, key: "Symbol_reference_does_not_refer_to_the_global_Symbol_constructor_object_2470", message: "'Symbol' reference does not refer to the global Symbol constructor object." },
        A_computed_property_name_of_the_form_0_must_be_of_type_symbol: { code: 2471, category: ts.DiagnosticCategory.Error, key: "A_computed_property_name_of_the_form_0_must_be_of_type_symbol_2471", message: "A computed property name of the form '{0}' must be of type 'symbol'." },
        Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher: { code: 2472, category: ts.DiagnosticCategory.Error, key: "Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher_2472", message: "Spread operator in 'new' expressions is only available when targeting ECMAScript 5 and higher." },
        Enum_declarations_must_all_be_const_or_non_const: { code: 2473, category: ts.DiagnosticCategory.Error, key: "Enum_declarations_must_all_be_const_or_non_const_2473", message: "Enum declarations must all be const or non-const." },
        In_const_enum_declarations_member_initializer_must_be_constant_expression: { code: 2474, category: ts.DiagnosticCategory.Error, key: "In_const_enum_declarations_member_initializer_must_be_constant_expression_2474", message: "In 'const' enum declarations member initializer must be constant expression." },
        const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment: { code: 2475, category: ts.DiagnosticCategory.Error, key: "const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_im_2475", message: "'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment." },
        A_const_enum_member_can_only_be_accessed_using_a_string_literal: { code: 2476, category: ts.DiagnosticCategory.Error, key: "A_const_enum_member_can_only_be_accessed_using_a_string_literal_2476", message: "A const enum member can only be accessed using a string literal." },
        const_enum_member_initializer_was_evaluated_to_a_non_finite_value: { code: 2477, category: ts.DiagnosticCategory.Error, key: "const_enum_member_initializer_was_evaluated_to_a_non_finite_value_2477", message: "'const' enum member initializer was evaluated to a non-finite value." },
        const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN: { code: 2478, category: ts.DiagnosticCategory.Error, key: "const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN_2478", message: "'const' enum member initializer was evaluated to disallowed value 'NaN'." },
        Property_0_does_not_exist_on_const_enum_1: { code: 2479, category: ts.DiagnosticCategory.Error, key: "Property_0_does_not_exist_on_const_enum_1_2479", message: "Property '{0}' does not exist on 'const' enum '{1}'." },
        let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations: { code: 2480, category: ts.DiagnosticCategory.Error, key: "let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations_2480", message: "'let' is not allowed to be used as a name in 'let' or 'const' declarations." },
        Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1: { code: 2481, category: ts.DiagnosticCategory.Error, key: "Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1_2481", message: "Cannot initialize outer scoped variable '{0}' in the same scope as block scoped declaration '{1}'." },
        The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation: { code: 2483, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation_2483", message: "The left-hand side of a 'for...of' statement cannot use a type annotation." },
        Export_declaration_conflicts_with_exported_declaration_of_0: { code: 2484, category: ts.DiagnosticCategory.Error, key: "Export_declaration_conflicts_with_exported_declaration_of_0_2484", message: "Export declaration conflicts with exported declaration of '{0}'" },
        The_left_hand_side_of_a_for_of_statement_cannot_be_a_constant_or_a_read_only_property: { code: 2485, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_a_for_of_statement_cannot_be_a_constant_or_a_read_only_property_2485", message: "The left-hand side of a 'for...of' statement cannot be a constant or a read-only property." },
        The_left_hand_side_of_a_for_in_statement_cannot_be_a_constant_or_a_read_only_property: { code: 2486, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_a_for_in_statement_cannot_be_a_constant_or_a_read_only_property_2486", message: "The left-hand side of a 'for...in' statement cannot be a constant or a read-only property." },
        Invalid_left_hand_side_in_for_of_statement: { code: 2487, category: ts.DiagnosticCategory.Error, key: "Invalid_left_hand_side_in_for_of_statement_2487", message: "Invalid left-hand side in 'for...of' statement." },
        Type_must_have_a_Symbol_iterator_method_that_returns_an_iterator: { code: 2488, category: ts.DiagnosticCategory.Error, key: "Type_must_have_a_Symbol_iterator_method_that_returns_an_iterator_2488", message: "Type must have a '[Symbol.iterator]()' method that returns an iterator." },
        An_iterator_must_have_a_next_method: { code: 2489, category: ts.DiagnosticCategory.Error, key: "An_iterator_must_have_a_next_method_2489", message: "An iterator must have a 'next()' method." },
        The_type_returned_by_the_next_method_of_an_iterator_must_have_a_value_property: { code: 2490, category: ts.DiagnosticCategory.Error, key: "The_type_returned_by_the_next_method_of_an_iterator_must_have_a_value_property_2490", message: "The type returned by the 'next()' method of an iterator must have a 'value' property." },
        The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern: { code: 2491, category: ts.DiagnosticCategory.Error, key: "The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern_2491", message: "The left-hand side of a 'for...in' statement cannot be a destructuring pattern." },
        Cannot_redeclare_identifier_0_in_catch_clause: { code: 2492, category: ts.DiagnosticCategory.Error, key: "Cannot_redeclare_identifier_0_in_catch_clause_2492", message: "Cannot redeclare identifier '{0}' in catch clause" },
        Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2: { code: 2493, category: ts.DiagnosticCategory.Error, key: "Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2_2493", message: "Tuple type '{0}' with length '{1}' cannot be assigned to tuple with length '{2}'." },
        Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher: { code: 2494, category: ts.DiagnosticCategory.Error, key: "Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher_2494", message: "Using a string in a 'for...of' statement is only supported in ECMAScript 5 and higher." },
        Type_0_is_not_an_array_type_or_a_string_type: { code: 2495, category: ts.DiagnosticCategory.Error, key: "Type_0_is_not_an_array_type_or_a_string_type_2495", message: "Type '{0}' is not an array type or a string type." },
        The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES3_and_ES5_Consider_using_a_standard_function_expression: { code: 2496, category: ts.DiagnosticCategory.Error, key: "The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES3_and_ES5_Consider_using_a_stand_2496", message: "The 'arguments' object cannot be referenced in an arrow function in ES3 and ES5. Consider using a standard function expression." },
        Module_0_resolves_to_a_non_module_entity_and_cannot_be_imported_using_this_construct: { code: 2497, category: ts.DiagnosticCategory.Error, key: "Module_0_resolves_to_a_non_module_entity_and_cannot_be_imported_using_this_construct_2497", message: "Module '{0}' resolves to a non-module entity and cannot be imported using this construct." },
        Module_0_uses_export_and_cannot_be_used_with_export_Asterisk: { code: 2498, category: ts.DiagnosticCategory.Error, key: "Module_0_uses_export_and_cannot_be_used_with_export_Asterisk_2498", message: "Module '{0}' uses 'export =' and cannot be used with 'export *'." },
        An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments: { code: 2499, category: ts.DiagnosticCategory.Error, key: "An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments_2499", message: "An interface can only extend an identifier/qualified-name with optional type arguments." },
        A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments: { code: 2500, category: ts.DiagnosticCategory.Error, key: "A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments_2500", message: "A class can only implement an identifier/qualified-name with optional type arguments." },
        A_rest_element_cannot_contain_a_binding_pattern: { code: 2501, category: ts.DiagnosticCategory.Error, key: "A_rest_element_cannot_contain_a_binding_pattern_2501", message: "A rest element cannot contain a binding pattern." },
        _0_is_referenced_directly_or_indirectly_in_its_own_type_annotation: { code: 2502, category: ts.DiagnosticCategory.Error, key: "_0_is_referenced_directly_or_indirectly_in_its_own_type_annotation_2502", message: "'{0}' is referenced directly or indirectly in its own type annotation." },
        Cannot_find_namespace_0: { code: 2503, category: ts.DiagnosticCategory.Error, key: "Cannot_find_namespace_0_2503", message: "Cannot find namespace '{0}'." },
        A_generator_cannot_have_a_void_type_annotation: { code: 2505, category: ts.DiagnosticCategory.Error, key: "A_generator_cannot_have_a_void_type_annotation_2505", message: "A generator cannot have a 'void' type annotation." },
        _0_is_referenced_directly_or_indirectly_in_its_own_base_expression: { code: 2506, category: ts.DiagnosticCategory.Error, key: "_0_is_referenced_directly_or_indirectly_in_its_own_base_expression_2506", message: "'{0}' is referenced directly or indirectly in its own base expression." },
        Type_0_is_not_a_constructor_function_type: { code: 2507, category: ts.DiagnosticCategory.Error, key: "Type_0_is_not_a_constructor_function_type_2507", message: "Type '{0}' is not a constructor function type." },
        No_base_constructor_has_the_specified_number_of_type_arguments: { code: 2508, category: ts.DiagnosticCategory.Error, key: "No_base_constructor_has_the_specified_number_of_type_arguments_2508", message: "No base constructor has the specified number of type arguments." },
        Base_constructor_return_type_0_is_not_a_class_or_interface_type: { code: 2509, category: ts.DiagnosticCategory.Error, key: "Base_constructor_return_type_0_is_not_a_class_or_interface_type_2509", message: "Base constructor return type '{0}' is not a class or interface type." },
        Base_constructors_must_all_have_the_same_return_type: { code: 2510, category: ts.DiagnosticCategory.Error, key: "Base_constructors_must_all_have_the_same_return_type_2510", message: "Base constructors must all have the same return type." },
        Cannot_create_an_instance_of_the_abstract_class_0: { code: 2511, category: ts.DiagnosticCategory.Error, key: "Cannot_create_an_instance_of_the_abstract_class_0_2511", message: "Cannot create an instance of the abstract class '{0}'." },
        Overload_signatures_must_all_be_abstract_or_non_abstract: { code: 2512, category: ts.DiagnosticCategory.Error, key: "Overload_signatures_must_all_be_abstract_or_non_abstract_2512", message: "Overload signatures must all be abstract or non-abstract." },
        Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression: { code: 2513, category: ts.DiagnosticCategory.Error, key: "Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression_2513", message: "Abstract method '{0}' in class '{1}' cannot be accessed via super expression." },
        Classes_containing_abstract_methods_must_be_marked_abstract: { code: 2514, category: ts.DiagnosticCategory.Error, key: "Classes_containing_abstract_methods_must_be_marked_abstract_2514", message: "Classes containing abstract methods must be marked abstract." },
        Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2: { code: 2515, category: ts.DiagnosticCategory.Error, key: "Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2_2515", message: "Non-abstract class '{0}' does not implement inherited abstract member '{1}' from class '{2}'." },
        All_declarations_of_an_abstract_method_must_be_consecutive: { code: 2516, category: ts.DiagnosticCategory.Error, key: "All_declarations_of_an_abstract_method_must_be_consecutive_2516", message: "All declarations of an abstract method must be consecutive." },
        Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type: { code: 2517, category: ts.DiagnosticCategory.Error, key: "Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type_2517", message: "Cannot assign an abstract constructor type to a non-abstract constructor type." },
        A_this_based_type_guard_is_not_compatible_with_a_parameter_based_type_guard: { code: 2518, category: ts.DiagnosticCategory.Error, key: "A_this_based_type_guard_is_not_compatible_with_a_parameter_based_type_guard_2518", message: "A 'this'-based type guard is not compatible with a parameter-based type guard." },
        Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions: { code: 2520, category: ts.DiagnosticCategory.Error, key: "Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions_2520", message: "Duplicate identifier '{0}'. Compiler uses declaration '{1}' to support async functions." },
        Expression_resolves_to_variable_declaration_0_that_compiler_uses_to_support_async_functions: { code: 2521, category: ts.DiagnosticCategory.Error, key: "Expression_resolves_to_variable_declaration_0_that_compiler_uses_to_support_async_functions_2521", message: "Expression resolves to variable declaration '{0}' that compiler uses to support async functions." },
        The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES3_and_ES5_Consider_using_a_standard_function_or_method: { code: 2522, category: ts.DiagnosticCategory.Error, key: "The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES3_and_ES5_Consider_usi_2522", message: "The 'arguments' object cannot be referenced in an async function or method in ES3 and ES5. Consider using a standard function or method." },
        yield_expressions_cannot_be_used_in_a_parameter_initializer: { code: 2523, category: ts.DiagnosticCategory.Error, key: "yield_expressions_cannot_be_used_in_a_parameter_initializer_2523", message: "'yield' expressions cannot be used in a parameter initializer." },
        await_expressions_cannot_be_used_in_a_parameter_initializer: { code: 2524, category: ts.DiagnosticCategory.Error, key: "await_expressions_cannot_be_used_in_a_parameter_initializer_2524", message: "'await' expressions cannot be used in a parameter initializer." },
        Initializer_provides_no_value_for_this_binding_element_and_the_binding_element_has_no_default_value: { code: 2525, category: ts.DiagnosticCategory.Error, key: "Initializer_provides_no_value_for_this_binding_element_and_the_binding_element_has_no_default_value_2525", message: "Initializer provides no value for this binding element and the binding element has no default value." },
        A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface: { code: 2526, category: ts.DiagnosticCategory.Error, key: "A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface_2526", message: "A 'this' type is available only in a non-static member of a class or interface." },
        The_inferred_type_of_0_references_an_inaccessible_this_type_A_type_annotation_is_necessary: { code: 2527, category: ts.DiagnosticCategory.Error, key: "The_inferred_type_of_0_references_an_inaccessible_this_type_A_type_annotation_is_necessary_2527", message: "The inferred type of '{0}' references an inaccessible 'this' type. A type annotation is necessary." },
        A_module_cannot_have_multiple_default_exports: { code: 2528, category: ts.DiagnosticCategory.Error, key: "A_module_cannot_have_multiple_default_exports_2528", message: "A module cannot have multiple default exports." },
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_containing_async_functions: { code: 2529, category: ts.DiagnosticCategory.Error, key: "Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_containing_async_func_2529", message: "Duplicate identifier '{0}'. Compiler reserves name '{1}' in top level scope of a module containing async functions." },
        Property_0_is_incompatible_with_index_signature: { code: 2530, category: ts.DiagnosticCategory.Error, key: "Property_0_is_incompatible_with_index_signature_2530", message: "Property '{0}' is incompatible with index signature." },
        Object_is_possibly_null: { code: 2531, category: ts.DiagnosticCategory.Error, key: "Object_is_possibly_null_2531", message: "Object is possibly 'null'." },
        Object_is_possibly_undefined: { code: 2532, category: ts.DiagnosticCategory.Error, key: "Object_is_possibly_undefined_2532", message: "Object is possibly 'undefined'." },
        Object_is_possibly_null_or_undefined: { code: 2533, category: ts.DiagnosticCategory.Error, key: "Object_is_possibly_null_or_undefined_2533", message: "Object is possibly 'null' or 'undefined'." },
        A_function_returning_never_cannot_have_a_reachable_end_point: { code: 2534, category: ts.DiagnosticCategory.Error, key: "A_function_returning_never_cannot_have_a_reachable_end_point_2534", message: "A function returning 'never' cannot have a reachable end point." },
        Enum_type_0_has_members_with_initializers_that_are_not_literals: { code: 2535, category: ts.DiagnosticCategory.Error, key: "Enum_type_0_has_members_with_initializers_that_are_not_literals_2535", message: "Enum type '{0}' has members with initializers that are not literals." },
        JSX_element_attributes_type_0_may_not_be_a_union_type: { code: 2600, category: ts.DiagnosticCategory.Error, key: "JSX_element_attributes_type_0_may_not_be_a_union_type_2600", message: "JSX element attributes type '{0}' may not be a union type." },
        The_return_type_of_a_JSX_element_constructor_must_return_an_object_type: { code: 2601, category: ts.DiagnosticCategory.Error, key: "The_return_type_of_a_JSX_element_constructor_must_return_an_object_type_2601", message: "The return type of a JSX element constructor must return an object type." },
        JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist: { code: 2602, category: ts.DiagnosticCategory.Error, key: "JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist_2602", message: "JSX element implicitly has type 'any' because the global type 'JSX.Element' does not exist." },
        Property_0_in_type_1_is_not_assignable_to_type_2: { code: 2603, category: ts.DiagnosticCategory.Error, key: "Property_0_in_type_1_is_not_assignable_to_type_2_2603", message: "Property '{0}' in type '{1}' is not assignable to type '{2}'" },
        JSX_element_type_0_does_not_have_any_construct_or_call_signatures: { code: 2604, category: ts.DiagnosticCategory.Error, key: "JSX_element_type_0_does_not_have_any_construct_or_call_signatures_2604", message: "JSX element type '{0}' does not have any construct or call signatures." },
        JSX_element_type_0_is_not_a_constructor_function_for_JSX_elements: { code: 2605, category: ts.DiagnosticCategory.Error, key: "JSX_element_type_0_is_not_a_constructor_function_for_JSX_elements_2605", message: "JSX element type '{0}' is not a constructor function for JSX elements." },
        Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property: { code: 2606, category: ts.DiagnosticCategory.Error, key: "Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property_2606", message: "Property '{0}' of JSX spread attribute is not assignable to target property." },
        JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property: { code: 2607, category: ts.DiagnosticCategory.Error, key: "JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property_2607", message: "JSX element class does not support attributes because it does not have a '{0}' property" },
        The_global_type_JSX_0_may_not_have_more_than_one_property: { code: 2608, category: ts.DiagnosticCategory.Error, key: "The_global_type_JSX_0_may_not_have_more_than_one_property_2608", message: "The global type 'JSX.{0}' may not have more than one property" },
        Cannot_emit_namespaced_JSX_elements_in_React: { code: 2650, category: ts.DiagnosticCategory.Error, key: "Cannot_emit_namespaced_JSX_elements_in_React_2650", message: "Cannot emit namespaced JSX elements in React" },
        A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_members_defined_in_other_enums: { code: 2651, category: ts.DiagnosticCategory.Error, key: "A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_memb_2651", message: "A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums." },
        Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_default_0_declaration_instead: { code: 2652, category: ts.DiagnosticCategory.Error, key: "Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_d_2652", message: "Merged declaration '{0}' cannot include a default export declaration. Consider adding a separate 'export default {0}' declaration instead." },
        Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1: { code: 2653, category: ts.DiagnosticCategory.Error, key: "Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1_2653", message: "Non-abstract class expression does not implement inherited abstract member '{0}' from class '{1}'." },
        Exported_external_package_typings_file_cannot_contain_tripleslash_references_Please_contact_the_package_author_to_update_the_package_definition: { code: 2654, category: ts.DiagnosticCategory.Error, key: "Exported_external_package_typings_file_cannot_contain_tripleslash_references_Please_contact_the_pack_2654", message: "Exported external package typings file cannot contain tripleslash references. Please contact the package author to update the package definition." },
        Exported_external_package_typings_file_0_is_not_a_module_Please_contact_the_package_author_to_update_the_package_definition: { code: 2656, category: ts.DiagnosticCategory.Error, key: "Exported_external_package_typings_file_0_is_not_a_module_Please_contact_the_package_author_to_update_2656", message: "Exported external package typings file '{0}' is not a module. Please contact the package author to update the package definition." },
        JSX_expressions_must_have_one_parent_element: { code: 2657, category: ts.DiagnosticCategory.Error, key: "JSX_expressions_must_have_one_parent_element_2657", message: "JSX expressions must have one parent element" },
        Type_0_provides_no_match_for_the_signature_1: { code: 2658, category: ts.DiagnosticCategory.Error, key: "Type_0_provides_no_match_for_the_signature_1_2658", message: "Type '{0}' provides no match for the signature '{1}'" },
        super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_higher: { code: 2659, category: ts.DiagnosticCategory.Error, key: "super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_highe_2659", message: "'super' is only allowed in members of object literal expressions when option 'target' is 'ES2015' or higher." },
        super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions: { code: 2660, category: ts.DiagnosticCategory.Error, key: "super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions_2660", message: "'super' can only be referenced in members of derived classes or object literal expressions." },
        Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module: { code: 2661, category: ts.DiagnosticCategory.Error, key: "Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module_2661", message: "Cannot export '{0}'. Only local declarations can be exported from a module." },
        Cannot_find_name_0_Did_you_mean_the_static_member_1_0: { code: 2662, category: ts.DiagnosticCategory.Error, key: "Cannot_find_name_0_Did_you_mean_the_static_member_1_0_2662", message: "Cannot find name '{0}'. Did you mean the static member '{1}.{0}'?" },
        Cannot_find_name_0_Did_you_mean_the_instance_member_this_0: { code: 2663, category: ts.DiagnosticCategory.Error, key: "Cannot_find_name_0_Did_you_mean_the_instance_member_this_0_2663", message: "Cannot find name '{0}'. Did you mean the instance member 'this.{0}'?" },
        Invalid_module_name_in_augmentation_module_0_cannot_be_found: { code: 2664, category: ts.DiagnosticCategory.Error, key: "Invalid_module_name_in_augmentation_module_0_cannot_be_found_2664", message: "Invalid module name in augmentation, module '{0}' cannot be found." },
        Exports_and_export_assignments_are_not_permitted_in_module_augmentations: { code: 2666, category: ts.DiagnosticCategory.Error, key: "Exports_and_export_assignments_are_not_permitted_in_module_augmentations_2666", message: "Exports and export assignments are not permitted in module augmentations." },
        Imports_are_not_permitted_in_module_augmentations_Consider_moving_them_to_the_enclosing_external_module: { code: 2667, category: ts.DiagnosticCategory.Error, key: "Imports_are_not_permitted_in_module_augmentations_Consider_moving_them_to_the_enclosing_external_mod_2667", message: "Imports are not permitted in module augmentations. Consider moving them to the enclosing external module." },
        export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible: { code: 2668, category: ts.DiagnosticCategory.Error, key: "export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always__2668", message: "'export' modifier cannot be applied to ambient modules and module augmentations since they are always visible." },
        Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_declarations: { code: 2669, category: ts.DiagnosticCategory.Error, key: "Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_2669", message: "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations." },
        Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambient_context: { code: 2670, category: ts.DiagnosticCategory.Error, key: "Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambien_2670", message: "Augmentations for the global scope should have 'declare' modifier unless they appear in already ambient context." },
        Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity: { code: 2671, category: ts.DiagnosticCategory.Error, key: "Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity_2671", message: "Cannot augment module '{0}' because it resolves to a non-module entity." },
        Cannot_assign_a_0_constructor_type_to_a_1_constructor_type: { code: 2672, category: ts.DiagnosticCategory.Error, key: "Cannot_assign_a_0_constructor_type_to_a_1_constructor_type_2672", message: "Cannot assign a '{0}' constructor type to a '{1}' constructor type." },
        Constructor_of_class_0_is_private_and_only_accessible_within_the_class_declaration: { code: 2673, category: ts.DiagnosticCategory.Error, key: "Constructor_of_class_0_is_private_and_only_accessible_within_the_class_declaration_2673", message: "Constructor of class '{0}' is private and only accessible within the class declaration." },
        Constructor_of_class_0_is_protected_and_only_accessible_within_the_class_declaration: { code: 2674, category: ts.DiagnosticCategory.Error, key: "Constructor_of_class_0_is_protected_and_only_accessible_within_the_class_declaration_2674", message: "Constructor of class '{0}' is protected and only accessible within the class declaration." },
        Cannot_extend_a_class_0_Class_constructor_is_marked_as_private: { code: 2675, category: ts.DiagnosticCategory.Error, key: "Cannot_extend_a_class_0_Class_constructor_is_marked_as_private_2675", message: "Cannot extend a class '{0}'. Class constructor is marked as private." },
        Accessors_must_both_be_abstract_or_non_abstract: { code: 2676, category: ts.DiagnosticCategory.Error, key: "Accessors_must_both_be_abstract_or_non_abstract_2676", message: "Accessors must both be abstract or non-abstract." },
        A_type_predicate_s_type_must_be_assignable_to_its_parameter_s_type: { code: 2677, category: ts.DiagnosticCategory.Error, key: "A_type_predicate_s_type_must_be_assignable_to_its_parameter_s_type_2677", message: "A type predicate's type must be assignable to its parameter's type." },
        Type_0_is_not_comparable_to_type_1: { code: 2678, category: ts.DiagnosticCategory.Error, key: "Type_0_is_not_comparable_to_type_1_2678", message: "Type '{0}' is not comparable to type '{1}'." },
        A_function_that_is_called_with_the_new_keyword_cannot_have_a_this_type_that_is_void: { code: 2679, category: ts.DiagnosticCategory.Error, key: "A_function_that_is_called_with_the_new_keyword_cannot_have_a_this_type_that_is_void_2679", message: "A function that is called with the 'new' keyword cannot have a 'this' type that is 'void'." },
        A_this_parameter_must_be_the_first_parameter: { code: 2680, category: ts.DiagnosticCategory.Error, key: "A_this_parameter_must_be_the_first_parameter_2680", message: "A 'this' parameter must be the first parameter." },
        A_constructor_cannot_have_a_this_parameter: { code: 2681, category: ts.DiagnosticCategory.Error, key: "A_constructor_cannot_have_a_this_parameter_2681", message: "A constructor cannot have a 'this' parameter." },
        get_and_set_accessor_must_have_the_same_this_type: { code: 2682, category: ts.DiagnosticCategory.Error, key: "get_and_set_accessor_must_have_the_same_this_type_2682", message: "'get' and 'set' accessor must have the same 'this' type." },
        this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation: { code: 2683, category: ts.DiagnosticCategory.Error, key: "this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_2683", message: "'this' implicitly has type 'any' because it does not have a type annotation." },
        The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1: { code: 2684, category: ts.DiagnosticCategory.Error, key: "The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1_2684", message: "The 'this' context of type '{0}' is not assignable to method's 'this' of type '{1}'." },
        The_this_types_of_each_signature_are_incompatible: { code: 2685, category: ts.DiagnosticCategory.Error, key: "The_this_types_of_each_signature_are_incompatible_2685", message: "The 'this' types of each signature are incompatible." },
        _0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead: { code: 2686, category: ts.DiagnosticCategory.Error, key: "_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead_2686", message: "'{0}' refers to a UMD global, but the current file is a module. Consider adding an import instead." },
        All_declarations_of_0_must_have_identical_modifiers: { code: 2687, category: ts.DiagnosticCategory.Error, key: "All_declarations_of_0_must_have_identical_modifiers_2687", message: "All declarations of '{0}' must have identical modifiers." },
        Cannot_find_type_definition_file_for_0: { code: 2688, category: ts.DiagnosticCategory.Error, key: "Cannot_find_type_definition_file_for_0_2688", message: "Cannot find type definition file for '{0}'." },
        Cannot_extend_an_interface_0_Did_you_mean_implements: { code: 2689, category: ts.DiagnosticCategory.Error, key: "Cannot_extend_an_interface_0_Did_you_mean_implements_2689", message: "Cannot extend an interface '{0}'. Did you mean 'implements'?" },
        A_class_must_be_declared_after_its_base_class: { code: 2690, category: ts.DiagnosticCategory.Error, key: "A_class_must_be_declared_after_its_base_class_2690", message: "A class must be declared after its base class." },
        An_import_path_cannot_end_with_a_0_extension_Consider_importing_1_instead: { code: 2691, category: ts.DiagnosticCategory.Error, key: "An_import_path_cannot_end_with_a_0_extension_Consider_importing_1_instead_2691", message: "An import path cannot end with a '{0}' extension. Consider importing '{1}' instead." },
        _0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible: { code: 2692, category: ts.DiagnosticCategory.Error, key: "_0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible_2692", message: "'{0}' is a primitive, but '{1}' is a wrapper object. Prefer using '{0}' when possible." },
        _0_only_refers_to_a_type_but_is_being_used_as_a_value_here: { code: 2693, category: ts.DiagnosticCategory.Error, key: "_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_2693", message: "'{0}' only refers to a type, but is being used as a value here." },
        Namespace_0_has_no_exported_member_1: { code: 2694, category: ts.DiagnosticCategory.Error, key: "Namespace_0_has_no_exported_member_1_2694", message: "Namespace '{0}' has no exported member '{1}'." },
        Left_side_of_comma_operator_is_unused_and_has_no_side_effects: { code: 2695, category: ts.DiagnosticCategory.Error, key: "Left_side_of_comma_operator_is_unused_and_has_no_side_effects_2695", message: "Left side of comma operator is unused and has no side effects." },
        The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead: { code: 2696, category: ts.DiagnosticCategory.Error, key: "The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead_2696", message: "The 'Object' type is assignable to very few other types. Did you mean to use the 'any' type instead?" },
        Import_declaration_0_is_using_private_name_1: { code: 4000, category: ts.DiagnosticCategory.Error, key: "Import_declaration_0_is_using_private_name_1_4000", message: "Import declaration '{0}' is using private name '{1}'." },
        Type_parameter_0_of_exported_class_has_or_is_using_private_name_1: { code: 4002, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_of_exported_class_has_or_is_using_private_name_1_4002", message: "Type parameter '{0}' of exported class has or is using private name '{1}'." },
        Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1: { code: 4004, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1_4004", message: "Type parameter '{0}' of exported interface has or is using private name '{1}'." },
        Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: { code: 4006, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1_4006", message: "Type parameter '{0}' of constructor signature from exported interface has or is using private name '{1}'." },
        Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: { code: 4008, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1_4008", message: "Type parameter '{0}' of call signature from exported interface has or is using private name '{1}'." },
        Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: { code: 4010, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1_4010", message: "Type parameter '{0}' of public static method from exported class has or is using private name '{1}'." },
        Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: { code: 4012, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1_4012", message: "Type parameter '{0}' of public method from exported class has or is using private name '{1}'." },
        Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: { code: 4014, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1_4014", message: "Type parameter '{0}' of method from exported interface has or is using private name '{1}'." },
        Type_parameter_0_of_exported_function_has_or_is_using_private_name_1: { code: 4016, category: ts.DiagnosticCategory.Error, key: "Type_parameter_0_of_exported_function_has_or_is_using_private_name_1_4016", message: "Type parameter '{0}' of exported function has or is using private name '{1}'." },
        Implements_clause_of_exported_class_0_has_or_is_using_private_name_1: { code: 4019, category: ts.DiagnosticCategory.Error, key: "Implements_clause_of_exported_class_0_has_or_is_using_private_name_1_4019", message: "Implements clause of exported class '{0}' has or is using private name '{1}'." },
        Extends_clause_of_exported_class_0_has_or_is_using_private_name_1: { code: 4020, category: ts.DiagnosticCategory.Error, key: "Extends_clause_of_exported_class_0_has_or_is_using_private_name_1_4020", message: "Extends clause of exported class '{0}' has or is using private name '{1}'." },
        Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1: { code: 4022, category: ts.DiagnosticCategory.Error, key: "Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1_4022", message: "Extends clause of exported interface '{0}' has or is using private name '{1}'." },
        Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4023, category: ts.DiagnosticCategory.Error, key: "Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4023", message: "Exported variable '{0}' has or is using name '{1}' from external module {2} but cannot be named." },
        Exported_variable_0_has_or_is_using_name_1_from_private_module_2: { code: 4024, category: ts.DiagnosticCategory.Error, key: "Exported_variable_0_has_or_is_using_name_1_from_private_module_2_4024", message: "Exported variable '{0}' has or is using name '{1}' from private module '{2}'." },
        Exported_variable_0_has_or_is_using_private_name_1: { code: 4025, category: ts.DiagnosticCategory.Error, key: "Exported_variable_0_has_or_is_using_private_name_1_4025", message: "Exported variable '{0}' has or is using private name '{1}'." },
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4026, category: ts.DiagnosticCategory.Error, key: "Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot__4026", message: "Public static property '{0}' of exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4027, category: ts.DiagnosticCategory.Error, key: "Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2_4027", message: "Public static property '{0}' of exported class has or is using name '{1}' from private module '{2}'." },
        Public_static_property_0_of_exported_class_has_or_is_using_private_name_1: { code: 4028, category: ts.DiagnosticCategory.Error, key: "Public_static_property_0_of_exported_class_has_or_is_using_private_name_1_4028", message: "Public static property '{0}' of exported class has or is using private name '{1}'." },
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4029, category: ts.DiagnosticCategory.Error, key: "Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_name_4029", message: "Public property '{0}' of exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4030, category: ts.DiagnosticCategory.Error, key: "Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2_4030", message: "Public property '{0}' of exported class has or is using name '{1}' from private module '{2}'." },
        Public_property_0_of_exported_class_has_or_is_using_private_name_1: { code: 4031, category: ts.DiagnosticCategory.Error, key: "Public_property_0_of_exported_class_has_or_is_using_private_name_1_4031", message: "Public property '{0}' of exported class has or is using private name '{1}'." },
        Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4032, category: ts.DiagnosticCategory.Error, key: "Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2_4032", message: "Property '{0}' of exported interface has or is using name '{1}' from private module '{2}'." },
        Property_0_of_exported_interface_has_or_is_using_private_name_1: { code: 4033, category: ts.DiagnosticCategory.Error, key: "Property_0_of_exported_interface_has_or_is_using_private_name_1_4033", message: "Property '{0}' of exported interface has or is using private name '{1}'." },
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4034, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_4034", message: "Parameter '{0}' of public static property setter from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1: { code: 4035, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1_4035", message: "Parameter '{0}' of public static property setter from exported class has or is using private name '{1}'." },
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4036, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_4036", message: "Parameter '{0}' of public property setter from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1: { code: 4037, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1_4037", message: "Parameter '{0}' of public property setter from exported class has or is using private name '{1}'." },
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4038, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_externa_4038", message: "Return type of public static property getter from exported class has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: { code: 4039, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_4039", message: "Return type of public static property getter from exported class has or is using name '{0}' from private module '{1}'." },
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0: { code: 4040, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0_4040", message: "Return type of public static property getter from exported class has or is using private name '{0}'." },
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4041, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_modul_4041", message: "Return type of public property getter from exported class has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: { code: 4042, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_4042", message: "Return type of public property getter from exported class has or is using name '{0}' from private module '{1}'." },
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0: { code: 4043, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0_4043", message: "Return type of public property getter from exported class has or is using private name '{0}'." },
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: { code: 4044, category: ts.DiagnosticCategory.Error, key: "Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_mod_4044", message: "Return type of constructor signature from exported interface has or is using name '{0}' from private module '{1}'." },
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0: { code: 4045, category: ts.DiagnosticCategory.Error, key: "Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0_4045", message: "Return type of constructor signature from exported interface has or is using private name '{0}'." },
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: { code: 4046, category: ts.DiagnosticCategory.Error, key: "Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4046", message: "Return type of call signature from exported interface has or is using name '{0}' from private module '{1}'." },
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0: { code: 4047, category: ts.DiagnosticCategory.Error, key: "Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0_4047", message: "Return type of call signature from exported interface has or is using private name '{0}'." },
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: { code: 4048, category: ts.DiagnosticCategory.Error, key: "Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4048", message: "Return type of index signature from exported interface has or is using name '{0}' from private module '{1}'." },
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0: { code: 4049, category: ts.DiagnosticCategory.Error, key: "Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0_4049", message: "Return type of index signature from exported interface has or is using private name '{0}'." },
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4050, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module__4050", message: "Return type of public static method from exported class has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: { code: 4051, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1_4051", message: "Return type of public static method from exported class has or is using name '{0}' from private module '{1}'." },
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0: { code: 4052, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0_4052", message: "Return type of public static method from exported class has or is using private name '{0}'." },
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4053, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_c_4053", message: "Return type of public method from exported class has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: { code: 4054, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1_4054", message: "Return type of public method from exported class has or is using name '{0}' from private module '{1}'." },
        Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0: { code: 4055, category: ts.DiagnosticCategory.Error, key: "Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0_4055", message: "Return type of public method from exported class has or is using private name '{0}'." },
        Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1: { code: 4056, category: ts.DiagnosticCategory.Error, key: "Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1_4056", message: "Return type of method from exported interface has or is using name '{0}' from private module '{1}'." },
        Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0: { code: 4057, category: ts.DiagnosticCategory.Error, key: "Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0_4057", message: "Return type of method from exported interface has or is using private name '{0}'." },
        Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: { code: 4058, category: ts.DiagnosticCategory.Error, key: "Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named_4058", message: "Return type of exported function has or is using name '{0}' from external module {1} but cannot be named." },
        Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1: { code: 4059, category: ts.DiagnosticCategory.Error, key: "Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1_4059", message: "Return type of exported function has or is using name '{0}' from private module '{1}'." },
        Return_type_of_exported_function_has_or_is_using_private_name_0: { code: 4060, category: ts.DiagnosticCategory.Error, key: "Return_type_of_exported_function_has_or_is_using_private_name_0_4060", message: "Return type of exported function has or is using private name '{0}'." },
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4061, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_can_4061", message: "Parameter '{0}' of constructor from exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4062, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2_4062", message: "Parameter '{0}' of constructor from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1: { code: 4063, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1_4063", message: "Parameter '{0}' of constructor from exported class has or is using private name '{1}'." },
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4064, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_mod_4064", message: "Parameter '{0}' of constructor signature from exported interface has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: { code: 4065, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1_4065", message: "Parameter '{0}' of constructor signature from exported interface has or is using private name '{1}'." },
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4066, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2_4066", message: "Parameter '{0}' of call signature from exported interface has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: { code: 4067, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1_4067", message: "Parameter '{0}' of call signature from exported interface has or is using private name '{1}'." },
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4068, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module__4068", message: "Parameter '{0}' of public static method from exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4069, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2_4069", message: "Parameter '{0}' of public static method from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: { code: 4070, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1_4070", message: "Parameter '{0}' of public static method from exported class has or is using private name '{1}'." },
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4071, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_c_4071", message: "Parameter '{0}' of public method from exported class has or is using name '{1}' from external module {2} but cannot be named." },
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: { code: 4072, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2_4072", message: "Parameter '{0}' of public method from exported class has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: { code: 4073, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1_4073", message: "Parameter '{0}' of public method from exported class has or is using private name '{1}'." },
        Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2: { code: 4074, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2_4074", message: "Parameter '{0}' of method from exported interface has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: { code: 4075, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1_4075", message: "Parameter '{0}' of method from exported interface has or is using private name '{1}'." },
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: { code: 4076, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4076", message: "Parameter '{0}' of exported function has or is using name '{1}' from external module {2} but cannot be named." },
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2: { code: 4077, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2_4077", message: "Parameter '{0}' of exported function has or is using name '{1}' from private module '{2}'." },
        Parameter_0_of_exported_function_has_or_is_using_private_name_1: { code: 4078, category: ts.DiagnosticCategory.Error, key: "Parameter_0_of_exported_function_has_or_is_using_private_name_1_4078", message: "Parameter '{0}' of exported function has or is using private name '{1}'." },
        Exported_type_alias_0_has_or_is_using_private_name_1: { code: 4081, category: ts.DiagnosticCategory.Error, key: "Exported_type_alias_0_has_or_is_using_private_name_1_4081", message: "Exported type alias '{0}' has or is using private name '{1}'." },
        Default_export_of_the_module_has_or_is_using_private_name_0: { code: 4082, category: ts.DiagnosticCategory.Error, key: "Default_export_of_the_module_has_or_is_using_private_name_0_4082", message: "Default export of the module has or is using private name '{0}'." },
        Conflicting_definitions_for_0_found_at_1_and_2_Consider_installing_a_specific_version_of_this_library_to_resolve_the_conflict: { code: 4090, category: ts.DiagnosticCategory.Message, key: "Conflicting_definitions_for_0_found_at_1_and_2_Consider_installing_a_specific_version_of_this_librar_4090", message: "Conflicting definitions for '{0}' found at '{1}' and '{2}'. Consider installing a specific version of this library to resolve the conflict." },
        The_current_host_does_not_support_the_0_option: { code: 5001, category: ts.DiagnosticCategory.Error, key: "The_current_host_does_not_support_the_0_option_5001", message: "The current host does not support the '{0}' option." },
        Cannot_find_the_common_subdirectory_path_for_the_input_files: { code: 5009, category: ts.DiagnosticCategory.Error, key: "Cannot_find_the_common_subdirectory_path_for_the_input_files_5009", message: "Cannot find the common subdirectory path for the input files." },
        File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0: { code: 5010, category: ts.DiagnosticCategory.Error, key: "File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0_5010", message: "File specification cannot end in a recursive directory wildcard ('**'): '{0}'." },
        File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0: { code: 5011, category: ts.DiagnosticCategory.Error, key: "File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0_5011", message: "File specification cannot contain multiple recursive directory wildcards ('**'): '{0}'." },
        Cannot_read_file_0_Colon_1: { code: 5012, category: ts.DiagnosticCategory.Error, key: "Cannot_read_file_0_Colon_1_5012", message: "Cannot read file '{0}': {1}" },
        Unsupported_file_encoding: { code: 5013, category: ts.DiagnosticCategory.Error, key: "Unsupported_file_encoding_5013", message: "Unsupported file encoding." },
        Failed_to_parse_file_0_Colon_1: { code: 5014, category: ts.DiagnosticCategory.Error, key: "Failed_to_parse_file_0_Colon_1_5014", message: "Failed to parse file '{0}': {1}." },
        Unknown_compiler_option_0: { code: 5023, category: ts.DiagnosticCategory.Error, key: "Unknown_compiler_option_0_5023", message: "Unknown compiler option '{0}'." },
        Compiler_option_0_requires_a_value_of_type_1: { code: 5024, category: ts.DiagnosticCategory.Error, key: "Compiler_option_0_requires_a_value_of_type_1_5024", message: "Compiler option '{0}' requires a value of type {1}." },
        Could_not_write_file_0_Colon_1: { code: 5033, category: ts.DiagnosticCategory.Error, key: "Could_not_write_file_0_Colon_1_5033", message: "Could not write file '{0}': {1}" },
        Option_project_cannot_be_mixed_with_source_files_on_a_command_line: { code: 5042, category: ts.DiagnosticCategory.Error, key: "Option_project_cannot_be_mixed_with_source_files_on_a_command_line_5042", message: "Option 'project' cannot be mixed with source files on a command line." },
        Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher: { code: 5047, category: ts.DiagnosticCategory.Error, key: "Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES_5047", message: "Option 'isolatedModules' can only be used when either option '--module' is provided or option 'target' is 'ES2015' or higher." },
        Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided: { code: 5051, category: ts.DiagnosticCategory.Error, key: "Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided_5051", message: "Option '{0} can only be used when either option '--inlineSourceMap' or option '--sourceMap' is provided." },
        Option_0_cannot_be_specified_without_specifying_option_1: { code: 5052, category: ts.DiagnosticCategory.Error, key: "Option_0_cannot_be_specified_without_specifying_option_1_5052", message: "Option '{0}' cannot be specified without specifying option '{1}'." },
        Option_0_cannot_be_specified_with_option_1: { code: 5053, category: ts.DiagnosticCategory.Error, key: "Option_0_cannot_be_specified_with_option_1_5053", message: "Option '{0}' cannot be specified with option '{1}'." },
        A_tsconfig_json_file_is_already_defined_at_Colon_0: { code: 5054, category: ts.DiagnosticCategory.Error, key: "A_tsconfig_json_file_is_already_defined_at_Colon_0_5054", message: "A 'tsconfig.json' file is already defined at: '{0}'." },
        Cannot_write_file_0_because_it_would_overwrite_input_file: { code: 5055, category: ts.DiagnosticCategory.Error, key: "Cannot_write_file_0_because_it_would_overwrite_input_file_5055", message: "Cannot write file '{0}' because it would overwrite input file." },
        Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files: { code: 5056, category: ts.DiagnosticCategory.Error, key: "Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files_5056", message: "Cannot write file '{0}' because it would be overwritten by multiple input files." },
        Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0: { code: 5057, category: ts.DiagnosticCategory.Error, key: "Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0_5057", message: "Cannot find a tsconfig.json file at the specified directory: '{0}'" },
        The_specified_path_does_not_exist_Colon_0: { code: 5058, category: ts.DiagnosticCategory.Error, key: "The_specified_path_does_not_exist_Colon_0_5058", message: "The specified path does not exist: '{0}'" },
        Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier: { code: 5059, category: ts.DiagnosticCategory.Error, key: "Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier_5059", message: "Invalid value for '--reactNamespace'. '{0}' is not a valid identifier." },
        Option_paths_cannot_be_used_without_specifying_baseUrl_option: { code: 5060, category: ts.DiagnosticCategory.Error, key: "Option_paths_cannot_be_used_without_specifying_baseUrl_option_5060", message: "Option 'paths' cannot be used without specifying '--baseUrl' option." },
        Pattern_0_can_have_at_most_one_Asterisk_character: { code: 5061, category: ts.DiagnosticCategory.Error, key: "Pattern_0_can_have_at_most_one_Asterisk_character_5061", message: "Pattern '{0}' can have at most one '*' character" },
        Substitution_0_in_pattern_1_in_can_have_at_most_one_Asterisk_character: { code: 5062, category: ts.DiagnosticCategory.Error, key: "Substitution_0_in_pattern_1_in_can_have_at_most_one_Asterisk_character_5062", message: "Substitution '{0}' in pattern '{1}' in can have at most one '*' character" },
        Substitutions_for_pattern_0_should_be_an_array: { code: 5063, category: ts.DiagnosticCategory.Error, key: "Substitutions_for_pattern_0_should_be_an_array_5063", message: "Substitutions for pattern '{0}' should be an array." },
        Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2: { code: 5064, category: ts.DiagnosticCategory.Error, key: "Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2_5064", message: "Substitution '{0}' for pattern '{1}' has incorrect type, expected 'string', got '{2}'." },
        File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0: { code: 5065, category: ts.DiagnosticCategory.Error, key: "File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildca_5065", message: "File specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '{0}'." },
        Substitutions_for_pattern_0_shouldn_t_be_an_empty_array: { code: 5066, category: ts.DiagnosticCategory.Error, key: "Substitutions_for_pattern_0_shouldn_t_be_an_empty_array_5066", message: "Substitutions for pattern '{0}' shouldn't be an empty array." },
        Concatenate_and_emit_output_to_single_file: { code: 6001, category: ts.DiagnosticCategory.Message, key: "Concatenate_and_emit_output_to_single_file_6001", message: "Concatenate and emit output to single file." },
        Generates_corresponding_d_ts_file: { code: 6002, category: ts.DiagnosticCategory.Message, key: "Generates_corresponding_d_ts_file_6002", message: "Generates corresponding '.d.ts' file." },
        Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations: { code: 6003, category: ts.DiagnosticCategory.Message, key: "Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations_6003", message: "Specify the location where debugger should locate map files instead of generated locations." },
        Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations: { code: 6004, category: ts.DiagnosticCategory.Message, key: "Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations_6004", message: "Specify the location where debugger should locate TypeScript files instead of source locations." },
        Watch_input_files: { code: 6005, category: ts.DiagnosticCategory.Message, key: "Watch_input_files_6005", message: "Watch input files." },
        Redirect_output_structure_to_the_directory: { code: 6006, category: ts.DiagnosticCategory.Message, key: "Redirect_output_structure_to_the_directory_6006", message: "Redirect output structure to the directory." },
        Do_not_erase_const_enum_declarations_in_generated_code: { code: 6007, category: ts.DiagnosticCategory.Message, key: "Do_not_erase_const_enum_declarations_in_generated_code_6007", message: "Do not erase const enum declarations in generated code." },
        Do_not_emit_outputs_if_any_errors_were_reported: { code: 6008, category: ts.DiagnosticCategory.Message, key: "Do_not_emit_outputs_if_any_errors_were_reported_6008", message: "Do not emit outputs if any errors were reported." },
        Do_not_emit_comments_to_output: { code: 6009, category: ts.DiagnosticCategory.Message, key: "Do_not_emit_comments_to_output_6009", message: "Do not emit comments to output." },
        Do_not_emit_outputs: { code: 6010, category: ts.DiagnosticCategory.Message, key: "Do_not_emit_outputs_6010", message: "Do not emit outputs." },
        Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking: { code: 6011, category: ts.DiagnosticCategory.Message, key: "Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typech_6011", message: "Allow default imports from modules with no default export. This does not affect code emit, just typechecking." },
        Skip_type_checking_of_declaration_files: { code: 6012, category: ts.DiagnosticCategory.Message, key: "Skip_type_checking_of_declaration_files_6012", message: "Skip type checking of declaration files." },
        Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES2015: { code: 6015, category: ts.DiagnosticCategory.Message, key: "Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES2015_6015", message: "Specify ECMAScript target version: 'ES3' (default), 'ES5', or 'ES2015'" },
        Specify_module_code_generation_Colon_commonjs_amd_system_umd_or_es2015: { code: 6016, category: ts.DiagnosticCategory.Message, key: "Specify_module_code_generation_Colon_commonjs_amd_system_umd_or_es2015_6016", message: "Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'" },
        Print_this_message: { code: 6017, category: ts.DiagnosticCategory.Message, key: "Print_this_message_6017", message: "Print this message." },
        Print_the_compiler_s_version: { code: 6019, category: ts.DiagnosticCategory.Message, key: "Print_the_compiler_s_version_6019", message: "Print the compiler's version." },
        Compile_the_project_in_the_given_directory: { code: 6020, category: ts.DiagnosticCategory.Message, key: "Compile_the_project_in_the_given_directory_6020", message: "Compile the project in the given directory." },
        Syntax_Colon_0: { code: 6023, category: ts.DiagnosticCategory.Message, key: "Syntax_Colon_0_6023", message: "Syntax: {0}" },
        options: { code: 6024, category: ts.DiagnosticCategory.Message, key: "options_6024", message: "options" },
        file: { code: 6025, category: ts.DiagnosticCategory.Message, key: "file_6025", message: "file" },
        Examples_Colon_0: { code: 6026, category: ts.DiagnosticCategory.Message, key: "Examples_Colon_0_6026", message: "Examples: {0}" },
        Options_Colon: { code: 6027, category: ts.DiagnosticCategory.Message, key: "Options_Colon_6027", message: "Options:" },
        Version_0: { code: 6029, category: ts.DiagnosticCategory.Message, key: "Version_0_6029", message: "Version {0}" },
        Insert_command_line_options_and_files_from_a_file: { code: 6030, category: ts.DiagnosticCategory.Message, key: "Insert_command_line_options_and_files_from_a_file_6030", message: "Insert command line options and files from a file." },
        File_change_detected_Starting_incremental_compilation: { code: 6032, category: ts.DiagnosticCategory.Message, key: "File_change_detected_Starting_incremental_compilation_6032", message: "File change detected. Starting incremental compilation..." },
        KIND: { code: 6034, category: ts.DiagnosticCategory.Message, key: "KIND_6034", message: "KIND" },
        FILE: { code: 6035, category: ts.DiagnosticCategory.Message, key: "FILE_6035", message: "FILE" },
        VERSION: { code: 6036, category: ts.DiagnosticCategory.Message, key: "VERSION_6036", message: "VERSION" },
        LOCATION: { code: 6037, category: ts.DiagnosticCategory.Message, key: "LOCATION_6037", message: "LOCATION" },
        DIRECTORY: { code: 6038, category: ts.DiagnosticCategory.Message, key: "DIRECTORY_6038", message: "DIRECTORY" },
        STRATEGY: { code: 6039, category: ts.DiagnosticCategory.Message, key: "STRATEGY_6039", message: "STRATEGY" },
        Compilation_complete_Watching_for_file_changes: { code: 6042, category: ts.DiagnosticCategory.Message, key: "Compilation_complete_Watching_for_file_changes_6042", message: "Compilation complete. Watching for file changes." },
        Generates_corresponding_map_file: { code: 6043, category: ts.DiagnosticCategory.Message, key: "Generates_corresponding_map_file_6043", message: "Generates corresponding '.map' file." },
        Compiler_option_0_expects_an_argument: { code: 6044, category: ts.DiagnosticCategory.Error, key: "Compiler_option_0_expects_an_argument_6044", message: "Compiler option '{0}' expects an argument." },
        Unterminated_quoted_string_in_response_file_0: { code: 6045, category: ts.DiagnosticCategory.Error, key: "Unterminated_quoted_string_in_response_file_0_6045", message: "Unterminated quoted string in response file '{0}'." },
        Argument_for_0_option_must_be_Colon_1: { code: 6046, category: ts.DiagnosticCategory.Error, key: "Argument_for_0_option_must_be_Colon_1_6046", message: "Argument for '{0}' option must be: {1}" },
        Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1: { code: 6048, category: ts.DiagnosticCategory.Error, key: "Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1_6048", message: "Locale must be of the form <language> or <language>-<territory>. For example '{0}' or '{1}'." },
        Unsupported_locale_0: { code: 6049, category: ts.DiagnosticCategory.Error, key: "Unsupported_locale_0_6049", message: "Unsupported locale '{0}'." },
        Unable_to_open_file_0: { code: 6050, category: ts.DiagnosticCategory.Error, key: "Unable_to_open_file_0_6050", message: "Unable to open file '{0}'." },
        Corrupted_locale_file_0: { code: 6051, category: ts.DiagnosticCategory.Error, key: "Corrupted_locale_file_0_6051", message: "Corrupted locale file {0}." },
        Raise_error_on_expressions_and_declarations_with_an_implied_any_type: { code: 6052, category: ts.DiagnosticCategory.Message, key: "Raise_error_on_expressions_and_declarations_with_an_implied_any_type_6052", message: "Raise error on expressions and declarations with an implied 'any' type." },
        File_0_not_found: { code: 6053, category: ts.DiagnosticCategory.Error, key: "File_0_not_found_6053", message: "File '{0}' not found." },
        File_0_has_unsupported_extension_The_only_supported_extensions_are_1: { code: 6054, category: ts.DiagnosticCategory.Error, key: "File_0_has_unsupported_extension_The_only_supported_extensions_are_1_6054", message: "File '{0}' has unsupported extension. The only supported extensions are {1}." },
        Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures: { code: 6055, category: ts.DiagnosticCategory.Message, key: "Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures_6055", message: "Suppress noImplicitAny errors for indexing objects lacking index signatures." },
        Do_not_emit_declarations_for_code_that_has_an_internal_annotation: { code: 6056, category: ts.DiagnosticCategory.Message, key: "Do_not_emit_declarations_for_code_that_has_an_internal_annotation_6056", message: "Do not emit declarations for code that has an '@internal' annotation." },
        Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir: { code: 6058, category: ts.DiagnosticCategory.Message, key: "Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir_6058", message: "Specify the root directory of input files. Use to control the output directory structure with --outDir." },
        File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files: { code: 6059, category: ts.DiagnosticCategory.Error, key: "File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files_6059", message: "File '{0}' is not under 'rootDir' '{1}'. 'rootDir' is expected to contain all source files." },
        Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix: { code: 6060, category: ts.DiagnosticCategory.Message, key: "Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix_6060", message: "Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix)." },
        NEWLINE: { code: 6061, category: ts.DiagnosticCategory.Message, key: "NEWLINE_6061", message: "NEWLINE" },
        Option_0_can_only_be_specified_in_tsconfig_json_file: { code: 6064, category: ts.DiagnosticCategory.Error, key: "Option_0_can_only_be_specified_in_tsconfig_json_file_6064", message: "Option '{0}' can only be specified in 'tsconfig.json' file." },
        Enables_experimental_support_for_ES7_decorators: { code: 6065, category: ts.DiagnosticCategory.Message, key: "Enables_experimental_support_for_ES7_decorators_6065", message: "Enables experimental support for ES7 decorators." },
        Enables_experimental_support_for_emitting_type_metadata_for_decorators: { code: 6066, category: ts.DiagnosticCategory.Message, key: "Enables_experimental_support_for_emitting_type_metadata_for_decorators_6066", message: "Enables experimental support for emitting type metadata for decorators." },
        Enables_experimental_support_for_ES7_async_functions: { code: 6068, category: ts.DiagnosticCategory.Message, key: "Enables_experimental_support_for_ES7_async_functions_6068", message: "Enables experimental support for ES7 async functions." },
        Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6: { code: 6069, category: ts.DiagnosticCategory.Message, key: "Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6_6069", message: "Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6)." },
        Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file: { code: 6070, category: ts.DiagnosticCategory.Message, key: "Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file_6070", message: "Initializes a TypeScript project and creates a tsconfig.json file." },
        Successfully_created_a_tsconfig_json_file: { code: 6071, category: ts.DiagnosticCategory.Message, key: "Successfully_created_a_tsconfig_json_file_6071", message: "Successfully created a tsconfig.json file." },
        Suppress_excess_property_checks_for_object_literals: { code: 6072, category: ts.DiagnosticCategory.Message, key: "Suppress_excess_property_checks_for_object_literals_6072", message: "Suppress excess property checks for object literals." },
        Stylize_errors_and_messages_using_color_and_context_experimental: { code: 6073, category: ts.DiagnosticCategory.Message, key: "Stylize_errors_and_messages_using_color_and_context_experimental_6073", message: "Stylize errors and messages using color and context. (experimental)" },
        Do_not_report_errors_on_unused_labels: { code: 6074, category: ts.DiagnosticCategory.Message, key: "Do_not_report_errors_on_unused_labels_6074", message: "Do not report errors on unused labels." },
        Report_error_when_not_all_code_paths_in_function_return_a_value: { code: 6075, category: ts.DiagnosticCategory.Message, key: "Report_error_when_not_all_code_paths_in_function_return_a_value_6075", message: "Report error when not all code paths in function return a value." },
        Report_errors_for_fallthrough_cases_in_switch_statement: { code: 6076, category: ts.DiagnosticCategory.Message, key: "Report_errors_for_fallthrough_cases_in_switch_statement_6076", message: "Report errors for fallthrough cases in switch statement." },
        Do_not_report_errors_on_unreachable_code: { code: 6077, category: ts.DiagnosticCategory.Message, key: "Do_not_report_errors_on_unreachable_code_6077", message: "Do not report errors on unreachable code." },
        Disallow_inconsistently_cased_references_to_the_same_file: { code: 6078, category: ts.DiagnosticCategory.Message, key: "Disallow_inconsistently_cased_references_to_the_same_file_6078", message: "Disallow inconsistently-cased references to the same file." },
        Specify_library_files_to_be_included_in_the_compilation_Colon: { code: 6079, category: ts.DiagnosticCategory.Message, key: "Specify_library_files_to_be_included_in_the_compilation_Colon_6079", message: "Specify library files to be included in the compilation: " },
        Specify_JSX_code_generation_Colon_preserve_or_react: { code: 6080, category: ts.DiagnosticCategory.Message, key: "Specify_JSX_code_generation_Colon_preserve_or_react_6080", message: "Specify JSX code generation: 'preserve' or 'react'" },
        Only_amd_and_system_modules_are_supported_alongside_0: { code: 6082, category: ts.DiagnosticCategory.Error, key: "Only_amd_and_system_modules_are_supported_alongside_0_6082", message: "Only 'amd' and 'system' modules are supported alongside --{0}." },
        Base_directory_to_resolve_non_absolute_module_names: { code: 6083, category: ts.DiagnosticCategory.Message, key: "Base_directory_to_resolve_non_absolute_module_names_6083", message: "Base directory to resolve non-absolute module names." },
        Specify_the_object_invoked_for_createElement_and_spread_when_targeting_react_JSX_emit: { code: 6084, category: ts.DiagnosticCategory.Message, key: "Specify_the_object_invoked_for_createElement_and_spread_when_targeting_react_JSX_emit_6084", message: "Specify the object invoked for createElement and __spread when targeting 'react' JSX emit" },
        Enable_tracing_of_the_name_resolution_process: { code: 6085, category: ts.DiagnosticCategory.Message, key: "Enable_tracing_of_the_name_resolution_process_6085", message: "Enable tracing of the name resolution process." },
        Resolving_module_0_from_1: { code: 6086, category: ts.DiagnosticCategory.Message, key: "Resolving_module_0_from_1_6086", message: "======== Resolving module '{0}' from '{1}'. ========" },
        Explicitly_specified_module_resolution_kind_Colon_0: { code: 6087, category: ts.DiagnosticCategory.Message, key: "Explicitly_specified_module_resolution_kind_Colon_0_6087", message: "Explicitly specified module resolution kind: '{0}'." },
        Module_resolution_kind_is_not_specified_using_0: { code: 6088, category: ts.DiagnosticCategory.Message, key: "Module_resolution_kind_is_not_specified_using_0_6088", message: "Module resolution kind is not specified, using '{0}'." },
        Module_name_0_was_successfully_resolved_to_1: { code: 6089, category: ts.DiagnosticCategory.Message, key: "Module_name_0_was_successfully_resolved_to_1_6089", message: "======== Module name '{0}' was successfully resolved to '{1}'. ========" },
        Module_name_0_was_not_resolved: { code: 6090, category: ts.DiagnosticCategory.Message, key: "Module_name_0_was_not_resolved_6090", message: "======== Module name '{0}' was not resolved. ========" },
        paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0: { code: 6091, category: ts.DiagnosticCategory.Message, key: "paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0_6091", message: "'paths' option is specified, looking for a pattern to match module name '{0}'." },
        Module_name_0_matched_pattern_1: { code: 6092, category: ts.DiagnosticCategory.Message, key: "Module_name_0_matched_pattern_1_6092", message: "Module name '{0}', matched pattern '{1}'." },
        Trying_substitution_0_candidate_module_location_Colon_1: { code: 6093, category: ts.DiagnosticCategory.Message, key: "Trying_substitution_0_candidate_module_location_Colon_1_6093", message: "Trying substitution '{0}', candidate module location: '{1}'." },
        Resolving_module_name_0_relative_to_base_url_1_2: { code: 6094, category: ts.DiagnosticCategory.Message, key: "Resolving_module_name_0_relative_to_base_url_1_2_6094", message: "Resolving module name '{0}' relative to base url '{1}' - '{2}'." },
        Loading_module_as_file_Slash_folder_candidate_module_location_0: { code: 6095, category: ts.DiagnosticCategory.Message, key: "Loading_module_as_file_Slash_folder_candidate_module_location_0_6095", message: "Loading module as file / folder, candidate module location '{0}'." },
        File_0_does_not_exist: { code: 6096, category: ts.DiagnosticCategory.Message, key: "File_0_does_not_exist_6096", message: "File '{0}' does not exist." },
        File_0_exist_use_it_as_a_name_resolution_result: { code: 6097, category: ts.DiagnosticCategory.Message, key: "File_0_exist_use_it_as_a_name_resolution_result_6097", message: "File '{0}' exist - use it as a name resolution result." },
        Loading_module_0_from_node_modules_folder: { code: 6098, category: ts.DiagnosticCategory.Message, key: "Loading_module_0_from_node_modules_folder_6098", message: "Loading module '{0}' from 'node_modules' folder." },
        Found_package_json_at_0: { code: 6099, category: ts.DiagnosticCategory.Message, key: "Found_package_json_at_0_6099", message: "Found 'package.json' at '{0}'." },
        package_json_does_not_have_types_field: { code: 6100, category: ts.DiagnosticCategory.Message, key: "package_json_does_not_have_types_field_6100", message: "'package.json' does not have 'types' field." },
        package_json_has_0_field_1_that_references_2: { code: 6101, category: ts.DiagnosticCategory.Message, key: "package_json_has_0_field_1_that_references_2_6101", message: "'package.json' has '{0}' field '{1}' that references '{2}'." },
        Allow_javascript_files_to_be_compiled: { code: 6102, category: ts.DiagnosticCategory.Message, key: "Allow_javascript_files_to_be_compiled_6102", message: "Allow javascript files to be compiled." },
        Option_0_should_have_array_of_strings_as_a_value: { code: 6103, category: ts.DiagnosticCategory.Error, key: "Option_0_should_have_array_of_strings_as_a_value_6103", message: "Option '{0}' should have array of strings as a value." },
        Checking_if_0_is_the_longest_matching_prefix_for_1_2: { code: 6104, category: ts.DiagnosticCategory.Message, key: "Checking_if_0_is_the_longest_matching_prefix_for_1_2_6104", message: "Checking if '{0}' is the longest matching prefix for '{1}' - '{2}'." },
        Expected_type_of_0_field_in_package_json_to_be_string_got_1: { code: 6105, category: ts.DiagnosticCategory.Message, key: "Expected_type_of_0_field_in_package_json_to_be_string_got_1_6105", message: "Expected type of '{0}' field in 'package.json' to be 'string', got '{1}'." },
        baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1: { code: 6106, category: ts.DiagnosticCategory.Message, key: "baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1_6106", message: "'baseUrl' option is set to '{0}', using this value to resolve non-relative module name '{1}'" },
        rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0: { code: 6107, category: ts.DiagnosticCategory.Message, key: "rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0_6107", message: "'rootDirs' option is set, using it to resolve relative module name '{0}'" },
        Longest_matching_prefix_for_0_is_1: { code: 6108, category: ts.DiagnosticCategory.Message, key: "Longest_matching_prefix_for_0_is_1_6108", message: "Longest matching prefix for '{0}' is '{1}'" },
        Loading_0_from_the_root_dir_1_candidate_location_2: { code: 6109, category: ts.DiagnosticCategory.Message, key: "Loading_0_from_the_root_dir_1_candidate_location_2_6109", message: "Loading '{0}' from the root dir '{1}', candidate location '{2}'" },
        Trying_other_entries_in_rootDirs: { code: 6110, category: ts.DiagnosticCategory.Message, key: "Trying_other_entries_in_rootDirs_6110", message: "Trying other entries in 'rootDirs'" },
        Module_resolution_using_rootDirs_has_failed: { code: 6111, category: ts.DiagnosticCategory.Message, key: "Module_resolution_using_rootDirs_has_failed_6111", message: "Module resolution using 'rootDirs' has failed" },
        Do_not_emit_use_strict_directives_in_module_output: { code: 6112, category: ts.DiagnosticCategory.Message, key: "Do_not_emit_use_strict_directives_in_module_output_6112", message: "Do not emit 'use strict' directives in module output." },
        Enable_strict_null_checks: { code: 6113, category: ts.DiagnosticCategory.Message, key: "Enable_strict_null_checks_6113", message: "Enable strict null checks." },
        Unknown_option_excludes_Did_you_mean_exclude: { code: 6114, category: ts.DiagnosticCategory.Error, key: "Unknown_option_excludes_Did_you_mean_exclude_6114", message: "Unknown option 'excludes'. Did you mean 'exclude'?" },
        Raise_error_on_this_expressions_with_an_implied_any_type: { code: 6115, category: ts.DiagnosticCategory.Message, key: "Raise_error_on_this_expressions_with_an_implied_any_type_6115", message: "Raise error on 'this' expressions with an implied 'any' type." },
        Resolving_type_reference_directive_0_containing_file_1_root_directory_2: { code: 6116, category: ts.DiagnosticCategory.Message, key: "Resolving_type_reference_directive_0_containing_file_1_root_directory_2_6116", message: "======== Resolving type reference directive '{0}', containing file '{1}', root directory '{2}'. ========" },
        Resolving_using_primary_search_paths: { code: 6117, category: ts.DiagnosticCategory.Message, key: "Resolving_using_primary_search_paths_6117", message: "Resolving using primary search paths..." },
        Resolving_from_node_modules_folder: { code: 6118, category: ts.DiagnosticCategory.Message, key: "Resolving_from_node_modules_folder_6118", message: "Resolving from node_modules folder..." },
        Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2: { code: 6119, category: ts.DiagnosticCategory.Message, key: "Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2_6119", message: "======== Type reference directive '{0}' was successfully resolved to '{1}', primary: {2}. ========" },
        Type_reference_directive_0_was_not_resolved: { code: 6120, category: ts.DiagnosticCategory.Message, key: "Type_reference_directive_0_was_not_resolved_6120", message: "======== Type reference directive '{0}' was not resolved. ========" },
        Resolving_with_primary_search_path_0: { code: 6121, category: ts.DiagnosticCategory.Message, key: "Resolving_with_primary_search_path_0_6121", message: "Resolving with primary search path '{0}'" },
        Root_directory_cannot_be_determined_skipping_primary_search_paths: { code: 6122, category: ts.DiagnosticCategory.Message, key: "Root_directory_cannot_be_determined_skipping_primary_search_paths_6122", message: "Root directory cannot be determined, skipping primary search paths." },
        Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set: { code: 6123, category: ts.DiagnosticCategory.Message, key: "Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set_6123", message: "======== Resolving type reference directive '{0}', containing file '{1}', root directory not set. ========" },
        Type_declaration_files_to_be_included_in_compilation: { code: 6124, category: ts.DiagnosticCategory.Message, key: "Type_declaration_files_to_be_included_in_compilation_6124", message: "Type declaration files to be included in compilation." },
        Looking_up_in_node_modules_folder_initial_location_0: { code: 6125, category: ts.DiagnosticCategory.Message, key: "Looking_up_in_node_modules_folder_initial_location_0_6125", message: "Looking up in 'node_modules' folder, initial location '{0}'" },
        Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder: { code: 6126, category: ts.DiagnosticCategory.Message, key: "Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_mod_6126", message: "Containing file is not specified and root directory cannot be determined, skipping lookup in 'node_modules' folder." },
        Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1: { code: 6127, category: ts.DiagnosticCategory.Message, key: "Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1_6127", message: "======== Resolving type reference directive '{0}', containing file not set, root directory '{1}'. ========" },
        Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set: { code: 6128, category: ts.DiagnosticCategory.Message, key: "Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set_6128", message: "======== Resolving type reference directive '{0}', containing file not set, root directory not set. ========" },
        The_config_file_0_found_doesn_t_contain_any_source_files: { code: 6129, category: ts.DiagnosticCategory.Error, key: "The_config_file_0_found_doesn_t_contain_any_source_files_6129", message: "The config file '{0}' found doesn't contain any source files." },
        Resolving_real_path_for_0_result_1: { code: 6130, category: ts.DiagnosticCategory.Message, key: "Resolving_real_path_for_0_result_1_6130", message: "Resolving real path for '{0}', result '{1}'" },
        Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system: { code: 6131, category: ts.DiagnosticCategory.Error, key: "Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system_6131", message: "Cannot compile modules using option '{0}' unless the '--module' flag is 'amd' or 'system'." },
        File_name_0_has_a_1_extension_stripping_it: { code: 6132, category: ts.DiagnosticCategory.Message, key: "File_name_0_has_a_1_extension_stripping_it_6132", message: "File name '{0}' has a '{1}' extension - stripping it" },
        _0_is_declared_but_never_used: { code: 6133, category: ts.DiagnosticCategory.Error, key: "_0_is_declared_but_never_used_6133", message: "'{0}' is declared but never used." },
        Report_errors_on_unused_locals: { code: 6134, category: ts.DiagnosticCategory.Message, key: "Report_errors_on_unused_locals_6134", message: "Report errors on unused locals." },
        Report_errors_on_unused_parameters: { code: 6135, category: ts.DiagnosticCategory.Message, key: "Report_errors_on_unused_parameters_6135", message: "Report errors on unused parameters." },
        The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files: { code: 6136, category: ts.DiagnosticCategory.Message, key: "The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files_6136", message: "The maximum dependency depth to search under node_modules and load JavaScript files" },
        No_types_specified_in_package_json_but_allowJs_is_set_so_returning_main_value_of_0: { code: 6137, category: ts.DiagnosticCategory.Message, key: "No_types_specified_in_package_json_but_allowJs_is_set_so_returning_main_value_of_0_6137", message: "No types specified in 'package.json' but 'allowJs' is set, so returning 'main' value of '{0}'" },
        Property_0_is_declared_but_never_used: { code: 6138, category: ts.DiagnosticCategory.Error, key: "Property_0_is_declared_but_never_used_6138", message: "Property '{0}' is declared but never used." },
        Import_emit_helpers_from_tslib: { code: 6139, category: ts.DiagnosticCategory.Message, key: "Import_emit_helpers_from_tslib_6139", message: "Import emit helpers from 'tslib'." },
        Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2: { code: 6140, category: ts.DiagnosticCategory.Error, key: "Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using__6140", message: "Auto discovery for typings is enabled in project '{0}'. Running extra resolution pass for module '{1}' using cache location '{2}'." },
        Parse_in_strict_mode_and_emit_use_strict_for_each_source_file: { code: 6141, category: ts.DiagnosticCategory.Message, key: "Parse_in_strict_mode_and_emit_use_strict_for_each_source_file_6141", message: "Parse in strict mode and emit \"use strict\" for each source file" },
        Variable_0_implicitly_has_an_1_type: { code: 7005, category: ts.DiagnosticCategory.Error, key: "Variable_0_implicitly_has_an_1_type_7005", message: "Variable '{0}' implicitly has an '{1}' type." },
        Parameter_0_implicitly_has_an_1_type: { code: 7006, category: ts.DiagnosticCategory.Error, key: "Parameter_0_implicitly_has_an_1_type_7006", message: "Parameter '{0}' implicitly has an '{1}' type." },
        Member_0_implicitly_has_an_1_type: { code: 7008, category: ts.DiagnosticCategory.Error, key: "Member_0_implicitly_has_an_1_type_7008", message: "Member '{0}' implicitly has an '{1}' type." },
        new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type: { code: 7009, category: ts.DiagnosticCategory.Error, key: "new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type_7009", message: "'new' expression, whose target lacks a construct signature, implicitly has an 'any' type." },
        _0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type: { code: 7010, category: ts.DiagnosticCategory.Error, key: "_0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type_7010", message: "'{0}', which lacks return-type annotation, implicitly has an '{1}' return type." },
        Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type: { code: 7011, category: ts.DiagnosticCategory.Error, key: "Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type_7011", message: "Function expression, which lacks return-type annotation, implicitly has an '{0}' return type." },
        Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: { code: 7013, category: ts.DiagnosticCategory.Error, key: "Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type_7013", message: "Construct signature, which lacks return-type annotation, implicitly has an 'any' return type." },
        Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number: { code: 7015, category: ts.DiagnosticCategory.Error, key: "Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number_7015", message: "Element implicitly has an 'any' type because index expression is not of type 'number'." },
        Index_signature_of_object_type_implicitly_has_an_any_type: { code: 7017, category: ts.DiagnosticCategory.Error, key: "Index_signature_of_object_type_implicitly_has_an_any_type_7017", message: "Index signature of object type implicitly has an 'any' type." },
        Object_literal_s_property_0_implicitly_has_an_1_type: { code: 7018, category: ts.DiagnosticCategory.Error, key: "Object_literal_s_property_0_implicitly_has_an_1_type_7018", message: "Object literal's property '{0}' implicitly has an '{1}' type." },
        Rest_parameter_0_implicitly_has_an_any_type: { code: 7019, category: ts.DiagnosticCategory.Error, key: "Rest_parameter_0_implicitly_has_an_any_type_7019", message: "Rest parameter '{0}' implicitly has an 'any[]' type." },
        Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: { code: 7020, category: ts.DiagnosticCategory.Error, key: "Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type_7020", message: "Call signature, which lacks return-type annotation, implicitly has an 'any' return type." },
        _0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer: { code: 7022, category: ts.DiagnosticCategory.Error, key: "_0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or__7022", message: "'{0}' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer." },
        _0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: { code: 7023, category: ts.DiagnosticCategory.Error, key: "_0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_reference_7023", message: "'{0}' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions." },
        Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: { code: 7024, category: ts.DiagnosticCategory.Error, key: "Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_ref_7024", message: "Function implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions." },
        Generator_implicitly_has_type_0_because_it_does_not_yield_any_values_Consider_supplying_a_return_type: { code: 7025, category: ts.DiagnosticCategory.Error, key: "Generator_implicitly_has_type_0_because_it_does_not_yield_any_values_Consider_supplying_a_return_typ_7025", message: "Generator implicitly has type '{0}' because it does not yield any values. Consider supplying a return type." },
        JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists: { code: 7026, category: ts.DiagnosticCategory.Error, key: "JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists_7026", message: "JSX element implicitly has type 'any' because no interface 'JSX.{0}' exists" },
        Unreachable_code_detected: { code: 7027, category: ts.DiagnosticCategory.Error, key: "Unreachable_code_detected_7027", message: "Unreachable code detected." },
        Unused_label: { code: 7028, category: ts.DiagnosticCategory.Error, key: "Unused_label_7028", message: "Unused label." },
        Fallthrough_case_in_switch: { code: 7029, category: ts.DiagnosticCategory.Error, key: "Fallthrough_case_in_switch_7029", message: "Fallthrough case in switch." },
        Not_all_code_paths_return_a_value: { code: 7030, category: ts.DiagnosticCategory.Error, key: "Not_all_code_paths_return_a_value_7030", message: "Not all code paths return a value." },
        Binding_element_0_implicitly_has_an_1_type: { code: 7031, category: ts.DiagnosticCategory.Error, key: "Binding_element_0_implicitly_has_an_1_type_7031", message: "Binding element '{0}' implicitly has an '{1}' type." },
        Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation: { code: 7032, category: ts.DiagnosticCategory.Error, key: "Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation_7032", message: "Property '{0}' implicitly has type 'any', because its set accessor lacks a parameter type annotation." },
        Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation: { code: 7033, category: ts.DiagnosticCategory.Error, key: "Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation_7033", message: "Property '{0}' implicitly has type 'any', because its get accessor lacks a return type annotation." },
        Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined: { code: 7034, category: ts.DiagnosticCategory.Error, key: "Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined_7034", message: "Variable '{0}' implicitly has type '{1}' in some locations where its type cannot be determined." },
        You_cannot_rename_this_element: { code: 8000, category: ts.DiagnosticCategory.Error, key: "You_cannot_rename_this_element_8000", message: "You cannot rename this element." },
        You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library: { code: 8001, category: ts.DiagnosticCategory.Error, key: "You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library_8001", message: "You cannot rename elements that are defined in the standard TypeScript library." },
        import_can_only_be_used_in_a_ts_file: { code: 8002, category: ts.DiagnosticCategory.Error, key: "import_can_only_be_used_in_a_ts_file_8002", message: "'import ... =' can only be used in a .ts file." },
        export_can_only_be_used_in_a_ts_file: { code: 8003, category: ts.DiagnosticCategory.Error, key: "export_can_only_be_used_in_a_ts_file_8003", message: "'export=' can only be used in a .ts file." },
        type_parameter_declarations_can_only_be_used_in_a_ts_file: { code: 8004, category: ts.DiagnosticCategory.Error, key: "type_parameter_declarations_can_only_be_used_in_a_ts_file_8004", message: "'type parameter declarations' can only be used in a .ts file." },
        implements_clauses_can_only_be_used_in_a_ts_file: { code: 8005, category: ts.DiagnosticCategory.Error, key: "implements_clauses_can_only_be_used_in_a_ts_file_8005", message: "'implements clauses' can only be used in a .ts file." },
        interface_declarations_can_only_be_used_in_a_ts_file: { code: 8006, category: ts.DiagnosticCategory.Error, key: "interface_declarations_can_only_be_used_in_a_ts_file_8006", message: "'interface declarations' can only be used in a .ts file." },
        module_declarations_can_only_be_used_in_a_ts_file: { code: 8007, category: ts.DiagnosticCategory.Error, key: "module_declarations_can_only_be_used_in_a_ts_file_8007", message: "'module declarations' can only be used in a .ts file." },
        type_aliases_can_only_be_used_in_a_ts_file: { code: 8008, category: ts.DiagnosticCategory.Error, key: "type_aliases_can_only_be_used_in_a_ts_file_8008", message: "'type aliases' can only be used in a .ts file." },
        _0_can_only_be_used_in_a_ts_file: { code: 8009, category: ts.DiagnosticCategory.Error, key: "_0_can_only_be_used_in_a_ts_file_8009", message: "'{0}' can only be used in a .ts file." },
        types_can_only_be_used_in_a_ts_file: { code: 8010, category: ts.DiagnosticCategory.Error, key: "types_can_only_be_used_in_a_ts_file_8010", message: "'types' can only be used in a .ts file." },
        type_arguments_can_only_be_used_in_a_ts_file: { code: 8011, category: ts.DiagnosticCategory.Error, key: "type_arguments_can_only_be_used_in_a_ts_file_8011", message: "'type arguments' can only be used in a .ts file." },
        parameter_modifiers_can_only_be_used_in_a_ts_file: { code: 8012, category: ts.DiagnosticCategory.Error, key: "parameter_modifiers_can_only_be_used_in_a_ts_file_8012", message: "'parameter modifiers' can only be used in a .ts file." },
        enum_declarations_can_only_be_used_in_a_ts_file: { code: 8015, category: ts.DiagnosticCategory.Error, key: "enum_declarations_can_only_be_used_in_a_ts_file_8015", message: "'enum declarations' can only be used in a .ts file." },
        type_assertion_expressions_can_only_be_used_in_a_ts_file: { code: 8016, category: ts.DiagnosticCategory.Error, key: "type_assertion_expressions_can_only_be_used_in_a_ts_file_8016", message: "'type assertion expressions' can only be used in a .ts file." },
        Only_identifiers_Slashqualified_names_with_optional_type_arguments_are_currently_supported_in_a_class_extends_clauses: { code: 9002, category: ts.DiagnosticCategory.Error, key: "Only_identifiers_Slashqualified_names_with_optional_type_arguments_are_currently_supported_in_a_clas_9002", message: "Only identifiers/qualified-names with optional type arguments are currently supported in a class 'extends' clauses." },
        class_expressions_are_not_currently_supported: { code: 9003, category: ts.DiagnosticCategory.Error, key: "class_expressions_are_not_currently_supported_9003", message: "'class' expressions are not currently supported." },
        JSX_attributes_must_only_be_assigned_a_non_empty_expression: { code: 17000, category: ts.DiagnosticCategory.Error, key: "JSX_attributes_must_only_be_assigned_a_non_empty_expression_17000", message: "JSX attributes must only be assigned a non-empty 'expression'." },
        JSX_elements_cannot_have_multiple_attributes_with_the_same_name: { code: 17001, category: ts.DiagnosticCategory.Error, key: "JSX_elements_cannot_have_multiple_attributes_with_the_same_name_17001", message: "JSX elements cannot have multiple attributes with the same name." },
        Expected_corresponding_JSX_closing_tag_for_0: { code: 17002, category: ts.DiagnosticCategory.Error, key: "Expected_corresponding_JSX_closing_tag_for_0_17002", message: "Expected corresponding JSX closing tag for '{0}'." },
        JSX_attribute_expected: { code: 17003, category: ts.DiagnosticCategory.Error, key: "JSX_attribute_expected_17003", message: "JSX attribute expected." },
        Cannot_use_JSX_unless_the_jsx_flag_is_provided: { code: 17004, category: ts.DiagnosticCategory.Error, key: "Cannot_use_JSX_unless_the_jsx_flag_is_provided_17004", message: "Cannot use JSX unless the '--jsx' flag is provided." },
        A_constructor_cannot_contain_a_super_call_when_its_class_extends_null: { code: 17005, category: ts.DiagnosticCategory.Error, key: "A_constructor_cannot_contain_a_super_call_when_its_class_extends_null_17005", message: "A constructor cannot contain a 'super' call when its class extends 'null'" },
        An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses: { code: 17006, category: ts.DiagnosticCategory.Error, key: "An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_ex_17006", message: "An unary expression with the '{0}' operator is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses." },
        A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses: { code: 17007, category: ts.DiagnosticCategory.Error, key: "A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Con_17007", message: "A type assertion expression is not allowed in the left-hand side of an exponentiation expression. Consider enclosing the expression in parentheses." },
        JSX_element_0_has_no_corresponding_closing_tag: { code: 17008, category: ts.DiagnosticCategory.Error, key: "JSX_element_0_has_no_corresponding_closing_tag_17008", message: "JSX element '{0}' has no corresponding closing tag." },
        super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class: { code: 17009, category: ts.DiagnosticCategory.Error, key: "super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class_17009", message: "'super' must be called before accessing 'this' in the constructor of a derived class." },
        Unknown_typing_option_0: { code: 17010, category: ts.DiagnosticCategory.Error, key: "Unknown_typing_option_0_17010", message: "Unknown typing option '{0}'." },
        Circularity_detected_while_resolving_configuration_Colon_0: { code: 18000, category: ts.DiagnosticCategory.Error, key: "Circularity_detected_while_resolving_configuration_Colon_0_18000", message: "Circularity detected while resolving configuration: {0}" },
        The_path_in_an_extends_options_must_be_relative_or_rooted: { code: 18001, category: ts.DiagnosticCategory.Error, key: "The_path_in_an_extends_options_must_be_relative_or_rooted_18001", message: "The path in an 'extends' options must be relative or rooted." },
        The_files_list_in_config_file_0_is_empty: { code: 18002, category: ts.DiagnosticCategory.Error, key: "The_files_list_in_config_file_0_is_empty_18002", message: "The 'files' list in config file '{0}' is empty." },
        No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2: { code: 18003, category: ts.DiagnosticCategory.Error, key: "No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2_18003", message: "No inputs were found in config file '{0}'. Specified 'include' paths were '{1}' and 'exclude' paths were '{2}'." },
        Add_missing_super_call: { code: 90001, category: ts.DiagnosticCategory.Message, key: "Add_missing_super_call_90001", message: "Add missing 'super()' call." },
        Make_super_call_the_first_statement_in_the_constructor: { code: 90002, category: ts.DiagnosticCategory.Message, key: "Make_super_call_the_first_statement_in_the_constructor_90002", message: "Make 'super()' call the first statement in the constructor." },
        Change_extends_to_implements: { code: 90003, category: ts.DiagnosticCategory.Message, key: "Change_extends_to_implements_90003", message: "Change 'extends' to 'implements'" },
        Remove_unused_identifiers: { code: 90004, category: ts.DiagnosticCategory.Message, key: "Remove_unused_identifiers_90004", message: "Remove unused identifiers" },
        Implement_interface_on_reference: { code: 90005, category: ts.DiagnosticCategory.Message, key: "Implement_interface_on_reference_90005", message: "Implement interface on reference" },
        Implement_interface_on_class: { code: 90006, category: ts.DiagnosticCategory.Message, key: "Implement_interface_on_class_90006", message: "Implement interface on class" },
        Implement_inherited_abstract_class: { code: 90007, category: ts.DiagnosticCategory.Message, key: "Implement_inherited_abstract_class_90007", message: "Implement inherited abstract class" },
        Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig: { code: 90009, category: ts.DiagnosticCategory.Error, key: "Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript__90009", message: "Adding a tsconfig.json file will help organize projects that contain both TypeScript and JavaScript files. Learn more at https://aka.ms/tsconfig" },
    };
})(ts || (ts = {}));
var ts;
(function (ts) {
    function tokenIsIdentifierOrKeyword(token) {
        return token >= 70;
    }
    ts.tokenIsIdentifierOrKeyword = tokenIsIdentifierOrKeyword;
    var textToToken = ts.createMap({
        "abstract": 116,
        "any": 118,
        "as": 117,
        "boolean": 121,
        "break": 71,
        "case": 72,
        "catch": 73,
        "class": 74,
        "continue": 76,
        "const": 75,
        "constructor": 122,
        "debugger": 77,
        "declare": 123,
        "default": 78,
        "delete": 79,
        "do": 80,
        "else": 81,
        "enum": 82,
        "export": 83,
        "extends": 84,
        "false": 85,
        "finally": 86,
        "for": 87,
        "from": 137,
        "function": 88,
        "get": 124,
        "if": 89,
        "implements": 107,
        "import": 90,
        "in": 91,
        "instanceof": 92,
        "interface": 108,
        "is": 125,
        "let": 109,
        "module": 126,
        "namespace": 127,
        "never": 128,
        "new": 93,
        "null": 94,
        "number": 131,
        "package": 110,
        "private": 111,
        "protected": 112,
        "public": 113,
        "readonly": 129,
        "require": 130,
        "global": 138,
        "return": 95,
        "set": 132,
        "static": 114,
        "string": 133,
        "super": 96,
        "switch": 97,
        "symbol": 134,
        "this": 98,
        "throw": 99,
        "true": 100,
        "try": 101,
        "type": 135,
        "typeof": 102,
        "undefined": 136,
        "var": 103,
        "void": 104,
        "while": 105,
        "with": 106,
        "yield": 115,
        "async": 119,
        "await": 120,
        "of": 139,
        "{": 16,
        "}": 17,
        "(": 18,
        ")": 19,
        "[": 20,
        "]": 21,
        ".": 22,
        "...": 23,
        ";": 24,
        ",": 25,
        "<": 26,
        ">": 28,
        "<=": 29,
        ">=": 30,
        "==": 31,
        "!=": 32,
        "===": 33,
        "!==": 34,
        "=>": 35,
        "+": 36,
        "-": 37,
        "**": 39,
        "*": 38,
        "/": 40,
        "%": 41,
        "++": 42,
        "--": 43,
        "<<": 44,
        "</": 27,
        ">>": 45,
        ">>>": 46,
        "&": 47,
        "|": 48,
        "^": 49,
        "!": 50,
        "~": 51,
        "&&": 52,
        "||": 53,
        "?": 54,
        ":": 55,
        "=": 57,
        "+=": 58,
        "-=": 59,
        "*=": 60,
        "**=": 61,
        "/=": 62,
        "%=": 63,
        "<<=": 64,
        ">>=": 65,
        ">>>=": 66,
        "&=": 67,
        "|=": 68,
        "^=": 69,
        "@": 56,
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
        for (var name_4 in source) {
            result[source[name_4]] = name_4;
        }
        return result;
    }
    var tokenStrings = makeReverseMap(textToToken);
    function tokenToString(t) {
        return tokenStrings[t];
    }
    ts.tokenToString = tokenToString;
    function stringToToken(s) {
        return textToToken[s];
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
        return computePositionOfLineAndCharacter(getLineStarts(sourceFile), line, character);
    }
    ts.getPositionOfLineAndCharacter = getPositionOfLineAndCharacter;
    function computePositionOfLineAndCharacter(lineStarts, line, character) {
        ts.Debug.assert(line >= 0 && line < lineStarts.length);
        return lineStarts[line] + character;
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
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function isWhiteSpace(ch) {
        return isWhiteSpaceSingleLine(ch) || isLineBreak(ch);
    }
    ts.isWhiteSpace = isWhiteSpace;
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
                    if (ch > 127 && (isWhiteSpace(ch))) {
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
                for (var i = 0, n = mergeConflictMarkerLength; i < n; i++) {
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
            ts.Debug.assert(ch === 61);
            while (pos < len) {
                var ch_1 = text.charCodeAt(pos);
                if (ch_1 === 62 && isConflictMarkerTrivia(text, pos)) {
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
                    if (ch > 127 && (isWhiteSpace(ch))) {
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
        comments.push({ pos: pos, end: end, hasTrailingNewLine: hasTrailingNewLine, kind: kind });
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
        return shebangTriviaRegex.test(text)
            ? shebangTriviaRegex.exec(text)[0]
            : undefined;
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
        for (var i = 1, n = name.length; i < n; i++) {
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
            isIdentifier: function () { return token === 70 || token > 106; },
            isReservedWord: function () { return token >= 71 && token <= 106; },
            isUnterminated: function () { return tokenIsUnterminated; },
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
                    resultingToken = startedWithBacktick ? 12 : 15;
                    break;
                }
                var currChar = text.charCodeAt(pos);
                if (currChar === 96) {
                    contents += text.substring(start, pos);
                    pos++;
                    resultingToken = startedWithBacktick ? 12 : 15;
                    break;
                }
                if (currChar === 36 && pos + 1 < end && text.charCodeAt(pos + 1) === 123) {
                    contents += text.substring(start, pos);
                    pos += 2;
                    resultingToken = startedWithBacktick ? 13 : 14;
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
                if (ch >= 97 && ch <= 122 && hasOwnProperty.call(textToToken, tokenValue)) {
                    return token = textToToken[tokenValue];
                }
            }
            return token = 70;
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
                                return pos += 3, token = 34;
                            }
                            return pos += 2, token = 32;
                        }
                        pos++;
                        return token = 50;
                    case 34:
                    case 39:
                        tokenValue = scanString();
                        return token = 9;
                    case 96:
                        return token = scanTemplateAndSetTokenValue();
                    case 37:
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 63;
                        }
                        pos++;
                        return token = 41;
                    case 38:
                        if (text.charCodeAt(pos + 1) === 38) {
                            return pos += 2, token = 52;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 67;
                        }
                        pos++;
                        return token = 47;
                    case 40:
                        pos++;
                        return token = 18;
                    case 41:
                        pos++;
                        return token = 19;
                    case 42:
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 60;
                        }
                        if (text.charCodeAt(pos + 1) === 42) {
                            if (text.charCodeAt(pos + 2) === 61) {
                                return pos += 3, token = 61;
                            }
                            return pos += 2, token = 39;
                        }
                        pos++;
                        return token = 38;
                    case 43:
                        if (text.charCodeAt(pos + 1) === 43) {
                            return pos += 2, token = 42;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 58;
                        }
                        pos++;
                        return token = 36;
                    case 44:
                        pos++;
                        return token = 25;
                    case 45:
                        if (text.charCodeAt(pos + 1) === 45) {
                            return pos += 2, token = 43;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 59;
                        }
                        pos++;
                        return token = 37;
                    case 46:
                        if (isDigit(text.charCodeAt(pos + 1))) {
                            tokenValue = scanNumber();
                            return token = 8;
                        }
                        if (text.charCodeAt(pos + 1) === 46 && text.charCodeAt(pos + 2) === 46) {
                            return pos += 3, token = 23;
                        }
                        pos++;
                        return token = 22;
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
                                var ch_2 = text.charCodeAt(pos);
                                if (ch_2 === 42 && text.charCodeAt(pos + 1) === 47) {
                                    pos += 2;
                                    commentClosed = true;
                                    break;
                                }
                                if (isLineBreak(ch_2)) {
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
                            return pos += 2, token = 62;
                        }
                        pos++;
                        return token = 40;
                    case 48:
                        if (pos + 2 < end && (text.charCodeAt(pos + 1) === 88 || text.charCodeAt(pos + 1) === 120)) {
                            pos += 2;
                            var value = scanMinimumNumberOfHexDigits(1);
                            if (value < 0) {
                                error(ts.Diagnostics.Hexadecimal_digit_expected);
                                value = 0;
                            }
                            tokenValue = "" + value;
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
                            return token = 8;
                        }
                        if (pos + 1 < end && isOctalDigit(text.charCodeAt(pos + 1))) {
                            tokenValue = "" + scanOctalDigits();
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
                        return token = 55;
                    case 59:
                        pos++;
                        return token = 24;
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
                                return pos += 3, token = 64;
                            }
                            return pos += 2, token = 44;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 29;
                        }
                        if (languageVariant === 1 &&
                            text.charCodeAt(pos + 1) === 47 &&
                            text.charCodeAt(pos + 2) !== 42) {
                            return pos += 2, token = 27;
                        }
                        pos++;
                        return token = 26;
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
                                return pos += 3, token = 33;
                            }
                            return pos += 2, token = 31;
                        }
                        if (text.charCodeAt(pos + 1) === 62) {
                            return pos += 2, token = 35;
                        }
                        pos++;
                        return token = 57;
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
                        return token = 28;
                    case 63:
                        pos++;
                        return token = 54;
                    case 91:
                        pos++;
                        return token = 20;
                    case 93:
                        pos++;
                        return token = 21;
                    case 94:
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 69;
                        }
                        pos++;
                        return token = 49;
                    case 123:
                        pos++;
                        return token = 16;
                    case 124:
                        if (text.charCodeAt(pos + 1) === 124) {
                            return pos += 2, token = 53;
                        }
                        if (text.charCodeAt(pos + 1) === 61) {
                            return pos += 2, token = 68;
                        }
                        pos++;
                        return token = 48;
                    case 125:
                        pos++;
                        return token = 17;
                    case 126:
                        pos++;
                        return token = 51;
                    case 64:
                        pos++;
                        return token = 56;
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
            if (token === 28) {
                if (text.charCodeAt(pos) === 62) {
                    if (text.charCodeAt(pos + 1) === 62) {
                        if (text.charCodeAt(pos + 2) === 61) {
                            return pos += 3, token = 66;
                        }
                        return pos += 2, token = 46;
                    }
                    if (text.charCodeAt(pos + 1) === 61) {
                        return pos += 2, token = 65;
                    }
                    pos++;
                    return token = 45;
                }
                if (text.charCodeAt(pos) === 61) {
                    pos++;
                    return token = 30;
                }
            }
            return token;
        }
        function reScanSlashToken() {
            if (token === 40 || token === 62) {
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
                token = 11;
            }
            return token;
        }
        function reScanTemplateToken() {
            ts.Debug.assert(token === 17, "'reScanTemplateToken' should only be called on a '}'");
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
                    return token = 27;
                }
                pos++;
                return token = 26;
            }
            if (char === 123) {
                pos++;
                return token = 16;
            }
            while (pos < end) {
                pos++;
                char = text.charCodeAt(pos);
                if ((char === 123) || (char === 60)) {
                    break;
                }
            }
            return token = 10;
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
                    return token = 56;
                case 10:
                case 13:
                    pos++;
                    return token = 4;
                case 42:
                    pos++;
                    return token = 38;
                case 123:
                    pos++;
                    return token = 16;
                case 125:
                    pos++;
                    return token = 17;
                case 91:
                    pos++;
                    return token = 20;
                case 93:
                    pos++;
                    return token = 21;
                case 61:
                    pos++;
                    return token = 57;
                case 44:
                    pos++;
                    return token = 25;
                case 46:
                    pos++;
                    return token = 22;
            }
            if (isIdentifierStart(ch, 4)) {
                pos++;
                while (isIdentifierPart(text.charCodeAt(pos), 4) && pos < end) {
                    pos++;
                }
                return token = 70;
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
    ts.compileOnSaveCommandLineOption = { name: "compileOnSave", type: "boolean" };
    ts.optionDeclarations = [
        {
            name: "charset",
            type: "string",
        },
        ts.compileOnSaveCommandLineOption,
        {
            name: "declaration",
            shortName: "d",
            type: "boolean",
            description: ts.Diagnostics.Generates_corresponding_d_ts_file,
        },
        {
            name: "declarationDir",
            type: "string",
            isFilePath: true,
            paramType: ts.Diagnostics.DIRECTORY,
        },
        {
            name: "diagnostics",
            type: "boolean",
        },
        {
            name: "extendedDiagnostics",
            type: "boolean",
            experimental: true
        },
        {
            name: "emitBOM",
            type: "boolean"
        },
        {
            name: "help",
            shortName: "h",
            type: "boolean",
            description: ts.Diagnostics.Print_this_message,
        },
        {
            name: "help",
            shortName: "?",
            type: "boolean"
        },
        {
            name: "init",
            type: "boolean",
            description: ts.Diagnostics.Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file,
        },
        {
            name: "inlineSourceMap",
            type: "boolean",
        },
        {
            name: "inlineSources",
            type: "boolean",
        },
        {
            name: "jsx",
            type: ts.createMap({
                "preserve": 1,
                "react": 2
            }),
            paramType: ts.Diagnostics.KIND,
            description: ts.Diagnostics.Specify_JSX_code_generation_Colon_preserve_or_react,
        },
        {
            name: "reactNamespace",
            type: "string",
            description: ts.Diagnostics.Specify_the_object_invoked_for_createElement_and_spread_when_targeting_react_JSX_emit
        },
        {
            name: "listFiles",
            type: "boolean",
        },
        {
            name: "locale",
            type: "string",
        },
        {
            name: "mapRoot",
            type: "string",
            isFilePath: true,
            description: ts.Diagnostics.Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
            paramType: ts.Diagnostics.LOCATION,
        },
        {
            name: "module",
            shortName: "m",
            type: ts.createMap({
                "none": ts.ModuleKind.None,
                "commonjs": ts.ModuleKind.CommonJS,
                "amd": ts.ModuleKind.AMD,
                "system": ts.ModuleKind.System,
                "umd": ts.ModuleKind.UMD,
                "es6": ts.ModuleKind.ES2015,
                "es2015": ts.ModuleKind.ES2015,
            }),
            description: ts.Diagnostics.Specify_module_code_generation_Colon_commonjs_amd_system_umd_or_es2015,
            paramType: ts.Diagnostics.KIND,
        },
        {
            name: "newLine",
            type: ts.createMap({
                "crlf": 0,
                "lf": 1
            }),
            description: ts.Diagnostics.Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix,
            paramType: ts.Diagnostics.NEWLINE,
        },
        {
            name: "noEmit",
            type: "boolean",
            description: ts.Diagnostics.Do_not_emit_outputs,
        },
        {
            name: "noEmitHelpers",
            type: "boolean"
        },
        {
            name: "noEmitOnError",
            type: "boolean",
            description: ts.Diagnostics.Do_not_emit_outputs_if_any_errors_were_reported,
        },
        {
            name: "noErrorTruncation",
            type: "boolean"
        },
        {
            name: "noImplicitAny",
            type: "boolean",
            description: ts.Diagnostics.Raise_error_on_expressions_and_declarations_with_an_implied_any_type,
        },
        {
            name: "noImplicitThis",
            type: "boolean",
            description: ts.Diagnostics.Raise_error_on_this_expressions_with_an_implied_any_type,
        },
        {
            name: "noUnusedLocals",
            type: "boolean",
            description: ts.Diagnostics.Report_errors_on_unused_locals,
        },
        {
            name: "noUnusedParameters",
            type: "boolean",
            description: ts.Diagnostics.Report_errors_on_unused_parameters,
        },
        {
            name: "noLib",
            type: "boolean",
        },
        {
            name: "noResolve",
            type: "boolean",
        },
        {
            name: "skipDefaultLibCheck",
            type: "boolean",
        },
        {
            name: "skipLibCheck",
            type: "boolean",
            description: ts.Diagnostics.Skip_type_checking_of_declaration_files,
        },
        {
            name: "out",
            type: "string",
            isFilePath: false,
            paramType: ts.Diagnostics.FILE,
        },
        {
            name: "outFile",
            type: "string",
            isFilePath: true,
            description: ts.Diagnostics.Concatenate_and_emit_output_to_single_file,
            paramType: ts.Diagnostics.FILE,
        },
        {
            name: "outDir",
            type: "string",
            isFilePath: true,
            description: ts.Diagnostics.Redirect_output_structure_to_the_directory,
            paramType: ts.Diagnostics.DIRECTORY,
        },
        {
            name: "preserveConstEnums",
            type: "boolean",
            description: ts.Diagnostics.Do_not_erase_const_enum_declarations_in_generated_code
        },
        {
            name: "pretty",
            description: ts.Diagnostics.Stylize_errors_and_messages_using_color_and_context_experimental,
            type: "boolean"
        },
        {
            name: "project",
            shortName: "p",
            type: "string",
            isFilePath: true,
            description: ts.Diagnostics.Compile_the_project_in_the_given_directory,
            paramType: ts.Diagnostics.DIRECTORY
        },
        {
            name: "removeComments",
            type: "boolean",
            description: ts.Diagnostics.Do_not_emit_comments_to_output,
        },
        {
            name: "rootDir",
            type: "string",
            isFilePath: true,
            paramType: ts.Diagnostics.LOCATION,
            description: ts.Diagnostics.Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir,
        },
        {
            name: "isolatedModules",
            type: "boolean",
        },
        {
            name: "sourceMap",
            type: "boolean",
            description: ts.Diagnostics.Generates_corresponding_map_file,
        },
        {
            name: "sourceRoot",
            type: "string",
            isFilePath: true,
            description: ts.Diagnostics.Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations,
            paramType: ts.Diagnostics.LOCATION,
        },
        {
            name: "suppressExcessPropertyErrors",
            type: "boolean",
            description: ts.Diagnostics.Suppress_excess_property_checks_for_object_literals,
            experimental: true
        },
        {
            name: "suppressImplicitAnyIndexErrors",
            type: "boolean",
            description: ts.Diagnostics.Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures,
        },
        {
            name: "stripInternal",
            type: "boolean",
            description: ts.Diagnostics.Do_not_emit_declarations_for_code_that_has_an_internal_annotation,
            experimental: true
        },
        {
            name: "target",
            shortName: "t",
            type: ts.createMap({
                "es3": 0,
                "es5": 1,
                "es6": 2,
                "es2015": 2,
                "es2016": 3,
                "es2017": 4,
            }),
            description: ts.Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES2015,
            paramType: ts.Diagnostics.VERSION,
        },
        {
            name: "version",
            shortName: "v",
            type: "boolean",
            description: ts.Diagnostics.Print_the_compiler_s_version,
        },
        {
            name: "watch",
            shortName: "w",
            type: "boolean",
            description: ts.Diagnostics.Watch_input_files,
        },
        {
            name: "experimentalDecorators",
            type: "boolean",
            description: ts.Diagnostics.Enables_experimental_support_for_ES7_decorators
        },
        {
            name: "emitDecoratorMetadata",
            type: "boolean",
            experimental: true,
            description: ts.Diagnostics.Enables_experimental_support_for_emitting_type_metadata_for_decorators
        },
        {
            name: "moduleResolution",
            type: ts.createMap({
                "node": ts.ModuleResolutionKind.NodeJs,
                "classic": ts.ModuleResolutionKind.Classic,
            }),
            description: ts.Diagnostics.Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6,
            paramType: ts.Diagnostics.STRATEGY,
        },
        {
            name: "allowUnusedLabels",
            type: "boolean",
            description: ts.Diagnostics.Do_not_report_errors_on_unused_labels
        },
        {
            name: "noImplicitReturns",
            type: "boolean",
            description: ts.Diagnostics.Report_error_when_not_all_code_paths_in_function_return_a_value
        },
        {
            name: "noFallthroughCasesInSwitch",
            type: "boolean",
            description: ts.Diagnostics.Report_errors_for_fallthrough_cases_in_switch_statement
        },
        {
            name: "allowUnreachableCode",
            type: "boolean",
            description: ts.Diagnostics.Do_not_report_errors_on_unreachable_code
        },
        {
            name: "forceConsistentCasingInFileNames",
            type: "boolean",
            description: ts.Diagnostics.Disallow_inconsistently_cased_references_to_the_same_file
        },
        {
            name: "baseUrl",
            type: "string",
            isFilePath: true,
            description: ts.Diagnostics.Base_directory_to_resolve_non_absolute_module_names
        },
        {
            name: "paths",
            type: "object",
            isTSConfigOnly: true
        },
        {
            name: "rootDirs",
            type: "list",
            isTSConfigOnly: true,
            element: {
                name: "rootDirs",
                type: "string",
                isFilePath: true
            }
        },
        {
            name: "typeRoots",
            type: "list",
            element: {
                name: "typeRoots",
                type: "string",
                isFilePath: true
            }
        },
        {
            name: "types",
            type: "list",
            element: {
                name: "types",
                type: "string"
            },
            description: ts.Diagnostics.Type_declaration_files_to_be_included_in_compilation
        },
        {
            name: "traceResolution",
            type: "boolean",
            description: ts.Diagnostics.Enable_tracing_of_the_name_resolution_process
        },
        {
            name: "allowJs",
            type: "boolean",
            description: ts.Diagnostics.Allow_javascript_files_to_be_compiled
        },
        {
            name: "allowSyntheticDefaultImports",
            type: "boolean",
            description: ts.Diagnostics.Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking
        },
        {
            name: "noImplicitUseStrict",
            type: "boolean",
            description: ts.Diagnostics.Do_not_emit_use_strict_directives_in_module_output
        },
        {
            name: "maxNodeModuleJsDepth",
            type: "number",
            description: ts.Diagnostics.The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files
        },
        {
            name: "listEmittedFiles",
            type: "boolean"
        },
        {
            name: "lib",
            type: "list",
            element: {
                name: "lib",
                type: ts.createMap({
                    "es5": "lib.es5.d.ts",
                    "es6": "lib.es2015.d.ts",
                    "es2015": "lib.es2015.d.ts",
                    "es7": "lib.es2016.d.ts",
                    "es2016": "lib.es2016.d.ts",
                    "es2017": "lib.es2017.d.ts",
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
                    "es2017.sharedmemory": "lib.es2017.sharedmemory.d.ts"
                }),
            },
            description: ts.Diagnostics.Specify_library_files_to_be_included_in_the_compilation_Colon
        },
        {
            name: "disableSizeLimit",
            type: "boolean"
        },
        {
            name: "strictNullChecks",
            type: "boolean",
            description: ts.Diagnostics.Enable_strict_null_checks
        },
        {
            name: "importHelpers",
            type: "boolean",
            description: ts.Diagnostics.Import_emit_helpers_from_tslib
        },
        {
            name: "alwaysStrict",
            type: "boolean",
            description: ts.Diagnostics.Parse_in_strict_mode_and_emit_use_strict_for_each_source_file
        }
    ];
    ts.typingOptionDeclarations = [
        {
            name: "enableAutoDiscovery",
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
        noImplicitAny: false,
        sourceMap: false,
    };
    var optionNameMapCache;
    function getOptionNameMap() {
        if (optionNameMapCache) {
            return optionNameMapCache;
        }
        var optionNameMap = ts.createMap();
        var shortOptionNames = ts.createMap();
        ts.forEach(ts.optionDeclarations, function (option) {
            optionNameMap[option.name.toLowerCase()] = option;
            if (option.shortName) {
                shortOptionNames[option.shortName] = option.name;
            }
        });
        optionNameMapCache = { optionNameMap: optionNameMap, shortOptionNames: shortOptionNames };
        return optionNameMapCache;
    }
    ts.getOptionNameMap = getOptionNameMap;
    function createCompilerDiagnosticForInvalidCustomType(opt) {
        var namesOfType = Object.keys(opt.type).map(function (key) { return "'" + key + "'"; }).join(", ");
        return ts.createCompilerDiagnostic(ts.Diagnostics.Argument_for_0_option_must_be_Colon_1, "--" + opt.name, namesOfType);
    }
    ts.createCompilerDiagnosticForInvalidCustomType = createCompilerDiagnosticForInvalidCustomType;
    function parseCustomTypeOption(opt, value, errors) {
        var key = trimString((value || "")).toLowerCase();
        var map = opt.type;
        if (key in map) {
            return map[key];
        }
        else {
            errors.push(createCompilerDiagnosticForInvalidCustomType(opt));
        }
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
        var _a = getOptionNameMap(), optionNameMap = _a.optionNameMap, shortOptionNames = _a.shortOptionNames;
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
                    s = s.slice(s.charCodeAt(1) === 45 ? 2 : 1).toLowerCase();
                    if (s in shortOptionNames) {
                        s = shortOptionNames[s];
                    }
                    if (s in optionNameMap) {
                        var opt = optionNameMap[s];
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
    function readConfigFile(fileName, readFile) {
        var text = "";
        try {
            text = readFile(fileName);
        }
        catch (e) {
            return { error: ts.createCompilerDiagnostic(ts.Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message) };
        }
        return parseConfigFileTextToJson(fileName, text);
    }
    ts.readConfigFile = readConfigFile;
    function parseConfigFileTextToJson(fileName, jsonText, stripComments) {
        if (stripComments === void 0) { stripComments = true; }
        try {
            var jsonTextToParse = stripComments ? removeComments(jsonText) : jsonText;
            return { config: /\S/.test(jsonTextToParse) ? JSON.parse(jsonTextToParse) : {} };
        }
        catch (e) {
            return { error: ts.createCompilerDiagnostic(ts.Diagnostics.Failed_to_parse_file_0_Colon_1, fileName, e.message) };
        }
    }
    ts.parseConfigFileTextToJson = parseConfigFileTextToJson;
    function generateTSConfig(options, fileNames) {
        var compilerOptions = ts.extend(options, ts.defaultInitCompilerOptions);
        var configurations = {
            compilerOptions: serializeCompilerOptions(compilerOptions)
        };
        if (fileNames && fileNames.length) {
            configurations.files = fileNames;
        }
        return configurations;
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
            for (var key in customTypeMap) {
                if (customTypeMap[key] === value) {
                    return key;
                }
            }
            return undefined;
        }
        function serializeCompilerOptions(options) {
            var result = ts.createMap();
            var optionsNameMap = getOptionNameMap().optionNameMap;
            for (var name_5 in options) {
                if (ts.hasProperty(options, name_5)) {
                    switch (name_5) {
                        case "init":
                        case "watch":
                        case "version":
                        case "help":
                        case "project":
                            break;
                        default:
                            var value = options[name_5];
                            var optionDefinition = optionsNameMap[name_5.toLowerCase()];
                            if (optionDefinition) {
                                var customTypeMap = getCustomTypeMapOfCommandLineOption(optionDefinition);
                                if (!customTypeMap) {
                                    result[name_5] = value;
                                }
                                else {
                                    if (optionDefinition.type === "list") {
                                        var convertedValue = [];
                                        for (var _i = 0, _a = value; _i < _a.length; _i++) {
                                            var element = _a[_i];
                                            convertedValue.push(getNameOfCompilerOptionValue(element, customTypeMap));
                                        }
                                        result[name_5] = convertedValue;
                                    }
                                    else {
                                        result[name_5] = getNameOfCompilerOptionValue(value, customTypeMap);
                                    }
                                }
                            }
                            break;
                    }
                }
            }
            return result;
        }
    }
    ts.generateTSConfig = generateTSConfig;
    function removeComments(jsonText) {
        var output = "";
        var scanner = ts.createScanner(1, false, 0, jsonText);
        var token;
        while ((token = scanner.scan()) !== 1) {
            switch (token) {
                case 2:
                case 3:
                    output += scanner.getTokenText().replace(/\S/g, " ");
                    break;
                default:
                    output += scanner.getTokenText();
                    break;
            }
        }
        return output;
    }
    function parseJsonConfigFileContent(json, host, basePath, existingOptions, configFileName, resolutionStack) {
        if (existingOptions === void 0) { existingOptions = {}; }
        if (resolutionStack === void 0) { resolutionStack = []; }
        var errors = [];
        var getCanonicalFileName = ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames);
        var resolvedPath = ts.toPath(configFileName || "", basePath, getCanonicalFileName);
        if (resolutionStack.indexOf(resolvedPath) >= 0) {
            return {
                options: {},
                fileNames: [],
                typingOptions: {},
                raw: json,
                errors: [ts.createCompilerDiagnostic(ts.Diagnostics.Circularity_detected_while_resolving_configuration_Colon_0, resolutionStack.concat([resolvedPath]).join(" -> "))],
                wildcardDirectories: {}
            };
        }
        var options = convertCompilerOptionsFromJsonWorker(json["compilerOptions"], basePath, errors, configFileName);
        var typingOptions = convertTypingOptionsFromJsonWorker(json["typingOptions"], basePath, errors, configFileName);
        if (json["extends"]) {
            var _a = [undefined, undefined, undefined, {}], include = _a[0], exclude = _a[1], files = _a[2], baseOptions = _a[3];
            if (typeof json["extends"] === "string") {
                _b = (tryExtendsName(json["extends"]) || [include, exclude, files, baseOptions]), include = _b[0], exclude = _b[1], files = _b[2], baseOptions = _b[3];
            }
            else {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "extends", "string"));
            }
            if (include && !json["include"]) {
                json["include"] = include;
            }
            if (exclude && !json["exclude"]) {
                json["exclude"] = exclude;
            }
            if (files && !json["files"]) {
                json["files"] = files;
            }
            options = ts.assign({}, baseOptions, options);
        }
        options = ts.extend(existingOptions, options);
        options.configFilePath = configFileName;
        var _c = getFileNames(errors), fileNames = _c.fileNames, wildcardDirectories = _c.wildcardDirectories;
        var compileOnSave = convertCompileOnSaveOptionFromJson(json, basePath, errors);
        return {
            options: options,
            fileNames: fileNames,
            typingOptions: typingOptions,
            raw: json,
            errors: errors,
            wildcardDirectories: wildcardDirectories,
            compileOnSave: compileOnSave
        };
        function tryExtendsName(extendedConfig) {
            if (!(ts.isRootedDiskPath(extendedConfig) || ts.startsWith(ts.normalizeSlashes(extendedConfig), "./") || ts.startsWith(ts.normalizeSlashes(extendedConfig), "../"))) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.The_path_in_an_extends_options_must_be_relative_or_rooted));
                return;
            }
            var extendedConfigPath = ts.toPath(extendedConfig, basePath, getCanonicalFileName);
            if (!host.fileExists(extendedConfigPath) && !ts.endsWith(extendedConfigPath, ".json")) {
                extendedConfigPath = extendedConfigPath + ".json";
                if (!host.fileExists(extendedConfigPath)) {
                    errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.File_0_does_not_exist, extendedConfig));
                    return;
                }
            }
            var extendedResult = readConfigFile(extendedConfigPath, function (path) { return host.readFile(path); });
            if (extendedResult.error) {
                errors.push(extendedResult.error);
                return;
            }
            var extendedDirname = ts.getDirectoryPath(extendedConfigPath);
            var relativeDifference = ts.convertToRelativePath(extendedDirname, basePath, getCanonicalFileName);
            var updatePath = function (path) { return ts.isRootedDiskPath(path) ? path : ts.combinePaths(relativeDifference, path); };
            var result = parseJsonConfigFileContent(extendedResult.config, host, extendedDirname, undefined, ts.getBaseFileName(extendedConfigPath), resolutionStack.concat([resolvedPath]));
            errors.push.apply(errors, result.errors);
            var _a = ts.map(["include", "exclude", "files"], function (key) {
                if (!json[key] && extendedResult.config[key]) {
                    return ts.map(extendedResult.config[key], updatePath);
                }
            }), include = _a[0], exclude = _a[1], files = _a[2];
            return [include, exclude, files, result.options];
        }
        function getFileNames(errors) {
            var fileNames;
            if (ts.hasProperty(json, "files")) {
                if (ts.isArray(json["files"])) {
                    fileNames = json["files"];
                    if (fileNames.length === 0) {
                        errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.The_files_list_in_config_file_0_is_empty, configFileName || "tsconfig.json"));
                    }
                }
                else {
                    errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "files", "Array"));
                }
            }
            var includeSpecs;
            if (ts.hasProperty(json, "include")) {
                if (ts.isArray(json["include"])) {
                    includeSpecs = json["include"];
                }
                else {
                    errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "include", "Array"));
                }
            }
            var excludeSpecs;
            if (ts.hasProperty(json, "exclude")) {
                if (ts.isArray(json["exclude"])) {
                    excludeSpecs = json["exclude"];
                }
                else {
                    errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "exclude", "Array"));
                }
            }
            else if (ts.hasProperty(json, "excludes")) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
            }
            else {
                excludeSpecs = ["node_modules", "bower_components", "jspm_packages"];
                var outDir = json["compilerOptions"] && json["compilerOptions"]["outDir"];
                if (outDir) {
                    excludeSpecs.push(outDir);
                }
            }
            if (fileNames === undefined && includeSpecs === undefined) {
                includeSpecs = ["**/*"];
            }
            var result = matchFileNames(fileNames, includeSpecs, excludeSpecs, basePath, options, host, errors);
            if (result.fileNames.length === 0 && !ts.hasProperty(json, "files") && resolutionStack.length === 0) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2, configFileName || "tsconfig.json", JSON.stringify(includeSpecs || []), JSON.stringify(excludeSpecs || [])));
            }
            return result;
        }
        var _b;
    }
    ts.parseJsonConfigFileContent = parseJsonConfigFileContent;
    function convertCompileOnSaveOptionFromJson(jsonOption, basePath, errors) {
        if (!ts.hasProperty(jsonOption, ts.compileOnSaveCommandLineOption.name)) {
            return false;
        }
        var result = convertJsonOption(ts.compileOnSaveCommandLineOption, jsonOption["compileOnSave"], basePath, errors);
        if (typeof result === "boolean" && result) {
            return result;
        }
        return false;
    }
    ts.convertCompileOnSaveOptionFromJson = convertCompileOnSaveOptionFromJson;
    function convertCompilerOptionsFromJson(jsonOptions, basePath, configFileName) {
        var errors = [];
        var options = convertCompilerOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName);
        return { options: options, errors: errors };
    }
    ts.convertCompilerOptionsFromJson = convertCompilerOptionsFromJson;
    function convertTypingOptionsFromJson(jsonOptions, basePath, configFileName) {
        var errors = [];
        var options = convertTypingOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName);
        return { options: options, errors: errors };
    }
    ts.convertTypingOptionsFromJson = convertTypingOptionsFromJson;
    function convertCompilerOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName) {
        var options = ts.getBaseFileName(configFileName) === "jsconfig.json"
            ? { allowJs: true, maxNodeModuleJsDepth: 2, allowSyntheticDefaultImports: true, skipLibCheck: true }
            : {};
        convertOptionsFromJson(ts.optionDeclarations, jsonOptions, basePath, options, ts.Diagnostics.Unknown_compiler_option_0, errors);
        return options;
    }
    function convertTypingOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName) {
        var options = ts.getBaseFileName(configFileName) === "jsconfig.json"
            ? { enableAutoDiscovery: true, include: [], exclude: [] }
            : { enableAutoDiscovery: false, include: [], exclude: [] };
        convertOptionsFromJson(ts.typingOptionDeclarations, jsonOptions, basePath, options, ts.Diagnostics.Unknown_typing_option_0, errors);
        return options;
    }
    function convertOptionsFromJson(optionDeclarations, jsonOptions, basePath, defaultOptions, diagnosticMessage, errors) {
        if (!jsonOptions) {
            return;
        }
        var optionNameMap = ts.arrayToMap(optionDeclarations, function (opt) { return opt.name; });
        for (var id in jsonOptions) {
            if (id in optionNameMap) {
                var opt = optionNameMap[id];
                defaultOptions[opt.name] = convertJsonOption(opt, jsonOptions[id], basePath, errors);
            }
            else {
                errors.push(ts.createCompilerDiagnostic(diagnosticMessage, id));
            }
        }
    }
    function convertJsonOption(opt, value, basePath, errors) {
        var optType = opt.type;
        var expectedType = typeof optType === "string" ? optType : "string";
        if (optType === "list" && ts.isArray(value)) {
            return convertJsonOptionOfListType(opt, value, basePath, errors);
        }
        else if (typeof value === expectedType) {
            if (typeof optType !== "string") {
                return convertJsonOptionOfCustomType(opt, value, errors);
            }
            else {
                if (opt.isFilePath) {
                    value = ts.normalizePath(ts.combinePaths(basePath, value));
                    if (value === "") {
                        value = ".";
                    }
                }
            }
            return value;
        }
        else {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.name, expectedType));
        }
    }
    function convertJsonOptionOfCustomType(opt, value, errors) {
        var key = value.toLowerCase();
        if (key in opt.type) {
            return opt.type[key];
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
    function matchFileNames(fileNames, include, exclude, basePath, options, host, errors) {
        basePath = ts.normalizePath(basePath);
        var keyMapper = host.useCaseSensitiveFileNames ? caseSensitiveKeyMapper : caseInsensitiveKeyMapper;
        var literalFileMap = ts.createMap();
        var wildcardFileMap = ts.createMap();
        if (include) {
            include = validateSpecs(include, errors, false);
        }
        if (exclude) {
            exclude = validateSpecs(exclude, errors, true);
        }
        var wildcardDirectories = getWildcardDirectories(include, exclude, basePath, host.useCaseSensitiveFileNames);
        var supportedExtensions = ts.getSupportedExtensions(options);
        if (fileNames) {
            for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
                var fileName = fileNames_1[_i];
                var file = ts.combinePaths(basePath, fileName);
                literalFileMap[keyMapper(file)] = file;
            }
        }
        if (include && include.length > 0) {
            for (var _a = 0, _b = host.readDirectory(basePath, supportedExtensions, exclude, include); _a < _b.length; _a++) {
                var file = _b[_a];
                if (hasFileWithHigherPriorityExtension(file, literalFileMap, wildcardFileMap, supportedExtensions, keyMapper)) {
                    continue;
                }
                removeWildcardFilesWithLowerPriorityExtension(file, wildcardFileMap, supportedExtensions, keyMapper);
                var key = keyMapper(file);
                if (!(key in literalFileMap) && !(key in wildcardFileMap)) {
                    wildcardFileMap[key] = file;
                }
            }
        }
        var literalFiles = ts.reduceProperties(literalFileMap, addFileToOutput, []);
        var wildcardFiles = ts.reduceProperties(wildcardFileMap, addFileToOutput, []);
        wildcardFiles.sort(host.useCaseSensitiveFileNames ? ts.compareStrings : ts.compareStringsCaseInsensitive);
        return {
            fileNames: literalFiles.concat(wildcardFiles),
            wildcardDirectories: wildcardDirectories
        };
    }
    function validateSpecs(specs, errors, allowTrailingRecursion) {
        var validSpecs = [];
        for (var _i = 0, specs_2 = specs; _i < specs_2.length; _i++) {
            var spec = specs_2[_i];
            if (!allowTrailingRecursion && invalidTrailingRecursionPattern.test(spec)) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec));
            }
            else if (invalidMultipleRecursionPatterns.test(spec)) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, spec));
            }
            else if (invalidDotDotAfterRecursiveWildcardPattern.test(spec)) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec));
            }
            else {
                validSpecs.push(spec);
            }
        }
        return validSpecs;
    }
    function getWildcardDirectories(include, exclude, path, useCaseSensitiveFileNames) {
        var rawExcludeRegex = ts.getRegularExpressionForWildcard(exclude, path, "exclude");
        var excludeRegex = rawExcludeRegex && new RegExp(rawExcludeRegex, useCaseSensitiveFileNames ? "" : "i");
        var wildcardDirectories = ts.createMap();
        if (include !== undefined) {
            var recursiveKeys = [];
            for (var _i = 0, include_1 = include; _i < include_1.length; _i++) {
                var file = include_1[_i];
                var name_6 = ts.normalizePath(ts.combinePaths(path, file));
                if (excludeRegex && excludeRegex.test(name_6)) {
                    continue;
                }
                var match = wildcardDirectoryPattern.exec(name_6);
                if (match) {
                    var key = useCaseSensitiveFileNames ? match[0] : match[0].toLowerCase();
                    var flags = watchRecursivePattern.test(name_6) ? 1 : 0;
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
                for (var _a = 0, recursiveKeys_1 = recursiveKeys; _a < recursiveKeys_1.length; _a++) {
                    var recursiveKey = recursiveKeys_1[_a];
                    if (key !== recursiveKey && ts.containsPath(recursiveKey, key, path, !useCaseSensitiveFileNames)) {
                        delete wildcardDirectories[key];
                    }
                }
            }
        }
        return wildcardDirectories;
    }
    function hasFileWithHigherPriorityExtension(file, literalFiles, wildcardFiles, extensions, keyMapper) {
        var extensionPriority = ts.getExtensionPriority(file, extensions);
        var adjustedExtensionPriority = ts.adjustExtensionPriority(extensionPriority);
        for (var i = 0; i < adjustedExtensionPriority; i++) {
            var higherPriorityExtension = extensions[i];
            var higherPriorityPath = keyMapper(ts.changeExtension(file, higherPriorityExtension));
            if (higherPriorityPath in literalFiles || higherPriorityPath in wildcardFiles) {
                return true;
            }
        }
        return false;
    }
    function removeWildcardFilesWithLowerPriorityExtension(file, wildcardFiles, extensions, keyMapper) {
        var extensionPriority = ts.getExtensionPriority(file, extensions);
        var nextExtensionPriority = ts.getNextLowestExtensionPriority(extensionPriority);
        for (var i = nextExtensionPriority; i < extensions.length; i++) {
            var lowerPriorityExtension = extensions[i];
            var lowerPriorityPath = keyMapper(ts.changeExtension(file, lowerPriorityExtension));
            delete wildcardFiles[lowerPriorityPath];
        }
    }
    function addFileToOutput(output, file) {
        output.push(file);
        return output;
    }
    function caseSensitiveKeyMapper(key) {
        return key;
    }
    function caseInsensitiveKeyMapper(key) {
        return key.toLowerCase();
    }
})(ts || (ts = {}));
var ts;
(function (ts) {
    var JsTyping;
    (function (JsTyping) {
        ;
        ;
        var safeList;
        var EmptySafeList = ts.createMap();
        JsTyping.nodeCoreModuleList = [
            "buffer", "querystring", "events", "http", "cluster",
            "zlib", "os", "https", "punycode", "repl", "readline",
            "vm", "child_process", "url", "dns", "net",
            "dgram", "fs", "path", "string_decoder", "tls",
            "crypto", "stream", "util", "assert", "tty", "domain",
            "constants", "process", "v8", "timers", "console"
        ];
        var nodeCoreModules = ts.arrayToMap(JsTyping.nodeCoreModuleList, function (x) { return x; });
        function discoverTypings(host, fileNames, projectRootPath, safeListPath, packageNameToTypingLocation, typingOptions, unresolvedImports) {
            var inferredTypings = ts.createMap();
            if (!typingOptions || !typingOptions.enableAutoDiscovery) {
                return { cachedTypingPaths: [], newTypingNames: [], filesToWatch: [] };
            }
            fileNames = ts.filter(ts.map(fileNames, ts.normalizePath), function (f) {
                var kind = ts.ensureScriptKind(f, ts.getScriptKindFromFileName(f));
                return kind === 1 || kind === 2;
            });
            if (!safeList) {
                var result = ts.readConfigFile(safeListPath, function (path) { return host.readFile(path); });
                safeList = result.config ? ts.createMap(result.config) : EmptySafeList;
            }
            var filesToWatch = [];
            var searchDirs = [];
            var exclude = [];
            mergeTypings(typingOptions.include);
            exclude = typingOptions.exclude || [];
            var possibleSearchDirs = ts.map(fileNames, ts.getDirectoryPath);
            if (projectRootPath !== undefined) {
                possibleSearchDirs.push(projectRootPath);
            }
            searchDirs = ts.deduplicate(possibleSearchDirs);
            for (var _i = 0, searchDirs_1 = searchDirs; _i < searchDirs_1.length; _i++) {
                var searchDir = searchDirs_1[_i];
                var packageJsonPath = ts.combinePaths(searchDir, "package.json");
                getTypingNamesFromJson(packageJsonPath, filesToWatch);
                var bowerJsonPath = ts.combinePaths(searchDir, "bower.json");
                getTypingNamesFromJson(bowerJsonPath, filesToWatch);
                var nodeModulesPath = ts.combinePaths(searchDir, "node_modules");
                getTypingNamesFromNodeModuleFolder(nodeModulesPath);
            }
            getTypingNamesFromSourceFileNames(fileNames);
            if (unresolvedImports) {
                for (var _a = 0, unresolvedImports_1 = unresolvedImports; _a < unresolvedImports_1.length; _a++) {
                    var moduleId = unresolvedImports_1[_a];
                    var typingName = moduleId in nodeCoreModules ? "node" : moduleId;
                    if (!(typingName in inferredTypings)) {
                        inferredTypings[typingName] = undefined;
                    }
                }
            }
            for (var name_7 in packageNameToTypingLocation) {
                if (name_7 in inferredTypings && !inferredTypings[name_7]) {
                    inferredTypings[name_7] = packageNameToTypingLocation[name_7];
                }
            }
            for (var _b = 0, exclude_1 = exclude; _b < exclude_1.length; _b++) {
                var excludeTypingName = exclude_1[_b];
                delete inferredTypings[excludeTypingName];
            }
            var newTypingNames = [];
            var cachedTypingPaths = [];
            for (var typing in inferredTypings) {
                if (inferredTypings[typing] !== undefined) {
                    cachedTypingPaths.push(inferredTypings[typing]);
                }
                else {
                    newTypingNames.push(typing);
                }
            }
            return { cachedTypingPaths: cachedTypingPaths, newTypingNames: newTypingNames, filesToWatch: filesToWatch };
            function mergeTypings(typingNames) {
                if (!typingNames) {
                    return;
                }
                for (var _i = 0, typingNames_1 = typingNames; _i < typingNames_1.length; _i++) {
                    var typing = typingNames_1[_i];
                    if (!(typing in inferredTypings)) {
                        inferredTypings[typing] = undefined;
                    }
                }
            }
            function getTypingNamesFromJson(jsonPath, filesToWatch) {
                if (host.fileExists(jsonPath)) {
                    filesToWatch.push(jsonPath);
                }
                var result = ts.readConfigFile(jsonPath, function (path) { return host.readFile(path); });
                if (result.config) {
                    var jsonConfig = result.config;
                    if (jsonConfig.dependencies) {
                        mergeTypings(ts.getOwnKeys(jsonConfig.dependencies));
                    }
                    if (jsonConfig.devDependencies) {
                        mergeTypings(ts.getOwnKeys(jsonConfig.devDependencies));
                    }
                    if (jsonConfig.optionalDependencies) {
                        mergeTypings(ts.getOwnKeys(jsonConfig.optionalDependencies));
                    }
                    if (jsonConfig.peerDependencies) {
                        mergeTypings(ts.getOwnKeys(jsonConfig.peerDependencies));
                    }
                }
            }
            function getTypingNamesFromSourceFileNames(fileNames) {
                var jsFileNames = ts.filter(fileNames, ts.hasJavaScriptFileExtension);
                var inferredTypingNames = ts.map(jsFileNames, function (f) { return ts.removeFileExtension(ts.getBaseFileName(f.toLowerCase())); });
                var cleanedTypingNames = ts.map(inferredTypingNames, function (f) { return f.replace(/((?:\.|-)min(?=\.|$))|((?:-|\.)\d+)/g, ""); });
                if (safeList !== EmptySafeList) {
                    mergeTypings(ts.filter(cleanedTypingNames, function (f) { return f in safeList; }));
                }
                var hasJsxFile = ts.forEach(fileNames, function (f) { return ts.ensureScriptKind(f, ts.getScriptKindFromFileName(f)) === 2; });
                if (hasJsxFile) {
                    mergeTypings(["react"]);
                }
            }
            function getTypingNamesFromNodeModuleFolder(nodeModulesPath) {
                if (!host.directoryExists(nodeModulesPath)) {
                    return;
                }
                var typingNames = [];
                var fileNames = host.readDirectory(nodeModulesPath, [".json"], undefined, undefined, 2);
                for (var _i = 0, fileNames_2 = fileNames; _i < fileNames_2.length; _i++) {
                    var fileName = fileNames_2[_i];
                    var normalizedFileName = ts.normalizePath(fileName);
                    if (ts.getBaseFileName(normalizedFileName) !== "package.json") {
                        continue;
                    }
                    var result = ts.readConfigFile(normalizedFileName, function (path) { return host.readFile(path); });
                    if (!result.config) {
                        continue;
                    }
                    var packageJson = result.config;
                    if (packageJson._requiredBy &&
                        ts.filter(packageJson._requiredBy, function (r) { return r[0] === "#" || r === "/"; }).length === 0) {
                        continue;
                    }
                    if (!packageJson.name) {
                        continue;
                    }
                    if (packageJson.typings) {
                        var absolutePath = ts.getNormalizedAbsolutePath(packageJson.typings, ts.getDirectoryPath(normalizedFileName));
                        inferredTypings[packageJson.name] = absolutePath;
                    }
                    else {
                        typingNames.push(packageJson.name);
                    }
                }
                mergeTypings(typingNames);
            }
        }
        JsTyping.discoverTypings = discoverTypings;
    })(JsTyping = ts.JsTyping || (ts.JsTyping = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    var server;
    (function (server) {
        server.ActionSet = "action::set";
        server.ActionInvalidate = "action::invalidate";
        server.EventInstall = "event::install";
        var Arguments;
        (function (Arguments) {
            Arguments.GlobalCacheLocation = "--globalTypingsCacheLocation";
            Arguments.LogFile = "--logFile";
            Arguments.EnableTelemetry = "--enableTelemetry";
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
    function createResolvedModule(resolvedFileName, isExternalLibraryImport, failedLookupLocations) {
        return { resolvedModule: resolvedFileName ? { resolvedFileName: resolvedFileName, isExternalLibraryImport: isExternalLibraryImport } : undefined, failedLookupLocations: failedLookupLocations };
    }
    ts.createResolvedModule = createResolvedModule;
    function moduleHasNonRelativeName(moduleName) {
        return !(ts.isRootedDiskPath(moduleName) || ts.isExternalModuleNameRelative(moduleName));
    }
    function tryReadTypesSection(packageJsonPath, baseDirectory, state) {
        var jsonContent = readJson(packageJsonPath, state.host);
        function tryReadFromField(fieldName) {
            if (ts.hasProperty(jsonContent, fieldName)) {
                var typesFile = jsonContent[fieldName];
                if (typeof typesFile === "string") {
                    var typesFilePath_1 = ts.normalizePath(ts.combinePaths(baseDirectory, typesFile));
                    if (state.traceEnabled) {
                        trace(state.host, ts.Diagnostics.package_json_has_0_field_1_that_references_2, fieldName, typesFile, typesFilePath_1);
                    }
                    return typesFilePath_1;
                }
                else {
                    if (state.traceEnabled) {
                        trace(state.host, ts.Diagnostics.Expected_type_of_0_field_in_package_json_to_be_string_got_1, fieldName, typeof typesFile);
                    }
                }
            }
        }
        var typesFilePath = tryReadFromField("typings") || tryReadFromField("types");
        if (typesFilePath) {
            return typesFilePath;
        }
        if (state.compilerOptions.allowJs && jsonContent.main && typeof jsonContent.main === "string") {
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.No_types_specified_in_package_json_but_allowJs_is_set_so_returning_main_value_of_0, jsonContent.main);
            }
            var mainFilePath = ts.normalizePath(ts.combinePaths(baseDirectory, jsonContent.main));
            return mainFilePath;
        }
        return undefined;
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
    var typeReferenceExtensions = [".d.ts"];
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
        return currentDirectory !== undefined && getDefaultTypeRoots(currentDirectory, host);
    }
    ts.getEffectiveTypeRoots = getEffectiveTypeRoots;
    function getDefaultTypeRoots(currentDirectory, host) {
        if (!host.directoryExists) {
            return [ts.combinePaths(currentDirectory, nodeModulesAtTypes)];
        }
        var typeRoots;
        while (true) {
            var atTypes = ts.combinePaths(currentDirectory, nodeModulesAtTypes);
            if (host.directoryExists(atTypes)) {
                (typeRoots || (typeRoots = [])).push(atTypes);
            }
            var parent_1 = ts.getDirectoryPath(currentDirectory);
            if (parent_1 === currentDirectory) {
                break;
            }
            currentDirectory = parent_1;
        }
        return typeRoots;
    }
    var nodeModulesAtTypes = ts.combinePaths("node_modules", "@types");
    function resolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, options, host) {
        var traceEnabled = isTraceEnabled(options, host);
        var moduleResolutionState = {
            compilerOptions: options,
            host: host,
            skipTsx: true,
            traceEnabled: traceEnabled
        };
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
        if (typeRoots && typeRoots.length) {
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Resolving_with_primary_search_path_0, typeRoots.join(", "));
            }
            var primarySearchPaths = typeRoots;
            for (var _i = 0, primarySearchPaths_1 = primarySearchPaths; _i < primarySearchPaths_1.length; _i++) {
                var typeRoot = primarySearchPaths_1[_i];
                var candidate = ts.combinePaths(typeRoot, typeReferenceDirectiveName);
                var candidateDirectory = ts.getDirectoryPath(candidate);
                var resolvedFile_1 = loadNodeModuleFromDirectory(typeReferenceExtensions, candidate, failedLookupLocations, !directoryProbablyExists(candidateDirectory, host), moduleResolutionState);
                if (resolvedFile_1) {
                    if (traceEnabled) {
                        trace(host, ts.Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, resolvedFile_1, true);
                    }
                    return {
                        resolvedTypeReferenceDirective: { primary: true, resolvedFileName: resolvedFile_1 },
                        failedLookupLocations: failedLookupLocations
                    };
                }
            }
        }
        else {
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths);
            }
        }
        var resolvedFile;
        var initialLocationForSecondaryLookup;
        if (containingFile) {
            initialLocationForSecondaryLookup = ts.getDirectoryPath(containingFile);
        }
        if (initialLocationForSecondaryLookup !== undefined) {
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Looking_up_in_node_modules_folder_initial_location_0, initialLocationForSecondaryLookup);
            }
            resolvedFile = loadModuleFromNodeModules(typeReferenceDirectiveName, initialLocationForSecondaryLookup, failedLookupLocations, moduleResolutionState, false);
            if (traceEnabled) {
                if (resolvedFile) {
                    trace(host, ts.Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, resolvedFile, false);
                }
                else {
                    trace(host, ts.Diagnostics.Type_reference_directive_0_was_not_resolved, typeReferenceDirectiveName);
                }
            }
        }
        else {
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder);
            }
        }
        return {
            resolvedTypeReferenceDirective: resolvedFile
                ? { primary: false, resolvedFileName: resolvedFile }
                : undefined,
            failedLookupLocations: failedLookupLocations
        };
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
    function resolveModuleName(moduleName, containingFile, compilerOptions, host) {
        var traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, ts.Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
        }
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
        var result;
        switch (moduleResolution) {
            case ts.ModuleResolutionKind.NodeJs:
                result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host);
                break;
            case ts.ModuleResolutionKind.Classic:
                result = classicNameResolver(moduleName, containingFile, compilerOptions, host);
                break;
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
    function tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, loader, failedLookupLocations, supportedExtensions, state) {
        if (moduleHasNonRelativeName(moduleName)) {
            return tryLoadModuleUsingBaseUrl(moduleName, loader, failedLookupLocations, supportedExtensions, state);
        }
        else {
            return tryLoadModuleUsingRootDirs(moduleName, containingDirectory, loader, failedLookupLocations, supportedExtensions, state);
        }
    }
    function tryLoadModuleUsingRootDirs(moduleName, containingDirectory, loader, failedLookupLocations, supportedExtensions, state) {
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
            var resolvedFileName = loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(containingDirectory, state.host), state);
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
                var resolvedFileName_1 = loader(candidate_1, supportedExtensions, failedLookupLocations, !directoryProbablyExists(baseDirectory, state.host), state);
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
    function tryLoadModuleUsingBaseUrl(moduleName, loader, failedLookupLocations, supportedExtensions, state) {
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
            var matchedStar = typeof matchedPattern === "string" ? undefined : ts.matchedText(matchedPattern, moduleName);
            var matchedPatternText = typeof matchedPattern === "string" ? matchedPattern : ts.patternText(matchedPattern);
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Module_name_0_matched_pattern_1, moduleName, matchedPatternText);
            }
            for (var _i = 0, _a = state.compilerOptions.paths[matchedPatternText]; _i < _a.length; _i++) {
                var subst = _a[_i];
                var path = matchedStar ? subst.replace("*", matchedStar) : subst;
                var candidate = ts.normalizePath(ts.combinePaths(state.compilerOptions.baseUrl, path));
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, subst, path);
                }
                var resolvedFileName = loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(ts.getDirectoryPath(candidate), state.host), state);
                if (resolvedFileName) {
                    return resolvedFileName;
                }
            }
            return undefined;
        }
        else {
            var candidate = ts.normalizePath(ts.combinePaths(state.compilerOptions.baseUrl, moduleName));
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, state.compilerOptions.baseUrl, candidate);
            }
            return loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(ts.getDirectoryPath(candidate), state.host), state);
        }
    }
    function nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host) {
        var containingDirectory = ts.getDirectoryPath(containingFile);
        var supportedExtensions = ts.getSupportedExtensions(compilerOptions);
        var traceEnabled = isTraceEnabled(compilerOptions, host);
        var failedLookupLocations = [];
        var state = { compilerOptions: compilerOptions, host: host, traceEnabled: traceEnabled, skipTsx: false };
        var resolvedFileName = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, nodeLoadModuleByRelativeName, failedLookupLocations, supportedExtensions, state);
        var isExternalLibraryImport = false;
        if (!resolvedFileName) {
            if (moduleHasNonRelativeName(moduleName)) {
                if (traceEnabled) {
                    trace(host, ts.Diagnostics.Loading_module_0_from_node_modules_folder, moduleName);
                }
                resolvedFileName = loadModuleFromNodeModules(moduleName, containingDirectory, failedLookupLocations, state, false);
                isExternalLibraryImport = resolvedFileName !== undefined;
            }
            else {
                var candidate = ts.normalizePath(ts.combinePaths(containingDirectory, moduleName));
                resolvedFileName = nodeLoadModuleByRelativeName(candidate, supportedExtensions, failedLookupLocations, false, state);
            }
        }
        if (resolvedFileName && host.realpath) {
            var originalFileName = resolvedFileName;
            resolvedFileName = ts.normalizePath(host.realpath(resolvedFileName));
            if (traceEnabled) {
                trace(host, ts.Diagnostics.Resolving_real_path_for_0_result_1, originalFileName, resolvedFileName);
            }
        }
        return createResolvedModule(resolvedFileName, isExternalLibraryImport, failedLookupLocations);
    }
    ts.nodeModuleNameResolver = nodeModuleNameResolver;
    function nodeLoadModuleByRelativeName(candidate, supportedExtensions, failedLookupLocations, onlyRecordFailures, state) {
        if (state.traceEnabled) {
            trace(state.host, ts.Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0, candidate);
        }
        var resolvedFileName = !ts.pathEndsWithDirectorySeparator(candidate) && loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, onlyRecordFailures, state);
        return resolvedFileName || loadNodeModuleFromDirectory(supportedExtensions, candidate, failedLookupLocations, onlyRecordFailures, state);
    }
    function directoryProbablyExists(directoryName, host) {
        return !host.directoryExists || host.directoryExists(directoryName);
    }
    ts.directoryProbablyExists = directoryProbablyExists;
    function loadModuleFromFile(candidate, extensions, failedLookupLocation, onlyRecordFailures, state) {
        var resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, failedLookupLocation, onlyRecordFailures, state);
        if (resolvedByAddingExtension) {
            return resolvedByAddingExtension;
        }
        if (ts.hasJavaScriptFileExtension(candidate)) {
            var extensionless = ts.removeFileExtension(candidate);
            if (state.traceEnabled) {
                var extension = candidate.substring(extensionless.length);
                trace(state.host, ts.Diagnostics.File_name_0_has_a_1_extension_stripping_it, candidate, extension);
            }
            return tryAddingExtensions(extensionless, extensions, failedLookupLocation, onlyRecordFailures, state);
        }
    }
    function tryAddingExtensions(candidate, extensions, failedLookupLocation, onlyRecordFailures, state) {
        if (!onlyRecordFailures) {
            var directory = ts.getDirectoryPath(candidate);
            if (directory) {
                onlyRecordFailures = !directoryProbablyExists(directory, state.host);
            }
        }
        return ts.forEach(extensions, function (ext) {
            return !(state.skipTsx && ts.isJsxOrTsxExtension(ext)) && tryFile(candidate + ext, failedLookupLocation, onlyRecordFailures, state);
        });
    }
    function tryFile(fileName, failedLookupLocation, onlyRecordFailures, state) {
        if (!onlyRecordFailures && state.host.fileExists(fileName)) {
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.File_0_exist_use_it_as_a_name_resolution_result, fileName);
            }
            return fileName;
        }
        else {
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.File_0_does_not_exist, fileName);
            }
            failedLookupLocation.push(fileName);
            return undefined;
        }
    }
    function loadNodeModuleFromDirectory(extensions, candidate, failedLookupLocation, onlyRecordFailures, state) {
        var packageJsonPath = pathToPackageJson(candidate);
        var directoryExists = !onlyRecordFailures && directoryProbablyExists(candidate, state.host);
        if (directoryExists && state.host.fileExists(packageJsonPath)) {
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.Found_package_json_at_0, packageJsonPath);
            }
            var typesFile = tryReadTypesSection(packageJsonPath, candidate, state);
            if (typesFile) {
                var onlyRecordFailures_1 = !directoryProbablyExists(ts.getDirectoryPath(typesFile), state.host);
                var result = tryFile(typesFile, failedLookupLocation, onlyRecordFailures_1, state) ||
                    tryAddingExtensions(typesFile, extensions, failedLookupLocation, onlyRecordFailures_1, state);
                if (result) {
                    return result;
                }
            }
            else {
                if (state.traceEnabled) {
                    trace(state.host, ts.Diagnostics.package_json_does_not_have_types_field);
                }
            }
        }
        else {
            if (state.traceEnabled) {
                trace(state.host, ts.Diagnostics.File_0_does_not_exist, packageJsonPath);
            }
            failedLookupLocation.push(packageJsonPath);
        }
        return loadModuleFromFile(ts.combinePaths(candidate, "index"), extensions, failedLookupLocation, !directoryExists, state);
    }
    function pathToPackageJson(directory) {
        return ts.combinePaths(directory, "package.json");
    }
    function loadModuleFromNodeModulesFolder(moduleName, directory, failedLookupLocations, state) {
        var nodeModulesFolder = ts.combinePaths(directory, "node_modules");
        var nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
        var candidate = ts.normalizePath(ts.combinePaths(nodeModulesFolder, moduleName));
        var supportedExtensions = ts.getSupportedExtensions(state.compilerOptions);
        var result = loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, !nodeModulesFolderExists, state);
        if (result) {
            return result;
        }
        result = loadNodeModuleFromDirectory(supportedExtensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state);
        if (result) {
            return result;
        }
    }
    function loadModuleFromNodeModules(moduleName, directory, failedLookupLocations, state, checkOneLevel) {
        return loadModuleFromNodeModulesWorker(moduleName, directory, failedLookupLocations, state, checkOneLevel, false);
    }
    ts.loadModuleFromNodeModules = loadModuleFromNodeModules;
    function loadModuleFromNodeModulesAtTypes(moduleName, directory, failedLookupLocations, state) {
        return loadModuleFromNodeModulesWorker(moduleName, directory, failedLookupLocations, state, false, true);
    }
    function loadModuleFromNodeModulesWorker(moduleName, directory, failedLookupLocations, state, checkOneLevel, typesOnly) {
        directory = ts.normalizeSlashes(directory);
        while (true) {
            var baseName = ts.getBaseFileName(directory);
            if (baseName !== "node_modules") {
                var packageResult = void 0;
                if (!typesOnly) {
                    packageResult = loadModuleFromNodeModulesFolder(moduleName, directory, failedLookupLocations, state);
                    if (packageResult && ts.hasTypeScriptFileExtension(packageResult)) {
                        return packageResult;
                    }
                }
                var typesResult = loadModuleFromNodeModulesFolder(ts.combinePaths("@types", moduleName), directory, failedLookupLocations, state);
                if (typesResult || packageResult) {
                    return typesResult || packageResult;
                }
            }
            var parentPath = ts.getDirectoryPath(directory);
            if (parentPath === directory || checkOneLevel) {
                break;
            }
            directory = parentPath;
        }
        return undefined;
    }
    function classicNameResolver(moduleName, containingFile, compilerOptions, host) {
        var traceEnabled = isTraceEnabled(compilerOptions, host);
        var state = { compilerOptions: compilerOptions, host: host, traceEnabled: traceEnabled, skipTsx: !compilerOptions.jsx };
        var failedLookupLocations = [];
        var supportedExtensions = ts.getSupportedExtensions(compilerOptions);
        var containingDirectory = ts.getDirectoryPath(containingFile);
        var resolvedFileName = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, loadModuleFromFile, failedLookupLocations, supportedExtensions, state);
        if (resolvedFileName) {
            return createResolvedModule(resolvedFileName, false, failedLookupLocations);
        }
        var referencedSourceFile;
        if (moduleHasNonRelativeName(moduleName)) {
            referencedSourceFile = referencedSourceFile = loadModuleFromAncestorDirectories(moduleName, containingDirectory, supportedExtensions, failedLookupLocations, state) ||
                loadModuleFromNodeModulesAtTypes(moduleName, containingDirectory, failedLookupLocations, state);
        }
        else {
            var candidate = ts.normalizePath(ts.combinePaths(containingDirectory, moduleName));
            referencedSourceFile = loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, false, state);
        }
        return referencedSourceFile
            ? { resolvedModule: { resolvedFileName: referencedSourceFile }, failedLookupLocations: failedLookupLocations }
            : { resolvedModule: undefined, failedLookupLocations: failedLookupLocations };
    }
    ts.classicNameResolver = classicNameResolver;
    function loadModuleFromAncestorDirectories(moduleName, containingDirectory, supportedExtensions, failedLookupLocations, state) {
        while (true) {
            var searchName = ts.normalizePath(ts.combinePaths(containingDirectory, moduleName));
            var referencedSourceFile = loadModuleFromFile(searchName, supportedExtensions, failedLookupLocations, false, state);
            if (referencedSourceFile) {
                return referencedSourceFile;
            }
            var parentPath = ts.getDirectoryPath(containingDirectory);
            if (parentPath === containingDirectory) {
                return undefined;
            }
            containingDirectory = parentPath;
        }
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
            function typingToFileName(cachePath, packageName, installTypingHost) {
                var result = ts.resolveModuleName(packageName, ts.combinePaths(cachePath, "index.d.ts"), { moduleResolution: ts.ModuleResolutionKind.NodeJs }, installTypingHost);
                return result.resolvedModule && result.resolvedModule.resolvedFileName;
            }
            (function (PackageNameValidationResult) {
                PackageNameValidationResult[PackageNameValidationResult["Ok"] = 0] = "Ok";
                PackageNameValidationResult[PackageNameValidationResult["ScopedPackagesNotSupported"] = 1] = "ScopedPackagesNotSupported";
                PackageNameValidationResult[PackageNameValidationResult["EmptyName"] = 2] = "EmptyName";
                PackageNameValidationResult[PackageNameValidationResult["NameTooLong"] = 3] = "NameTooLong";
                PackageNameValidationResult[PackageNameValidationResult["NameStartsWithDot"] = 4] = "NameStartsWithDot";
                PackageNameValidationResult[PackageNameValidationResult["NameStartsWithUnderscore"] = 5] = "NameStartsWithUnderscore";
                PackageNameValidationResult[PackageNameValidationResult["NameContainsNonURISafeCharacters"] = 6] = "NameContainsNonURISafeCharacters";
            })(typingsInstaller.PackageNameValidationResult || (typingsInstaller.PackageNameValidationResult = {}));
            var PackageNameValidationResult = typingsInstaller.PackageNameValidationResult;
            typingsInstaller.MaxPackageNameLength = 214;
            function validatePackageName(packageName) {
                if (!packageName) {
                    return PackageNameValidationResult.EmptyName;
                }
                if (packageName.length > typingsInstaller.MaxPackageNameLength) {
                    return PackageNameValidationResult.NameTooLong;
                }
                if (packageName.charCodeAt(0) === 46) {
                    return PackageNameValidationResult.NameStartsWithDot;
                }
                if (packageName.charCodeAt(0) === 95) {
                    return PackageNameValidationResult.NameStartsWithUnderscore;
                }
                if (/^@[^/]+\/[^/]+$/.test(packageName)) {
                    return PackageNameValidationResult.ScopedPackagesNotSupported;
                }
                if (encodeURIComponent(packageName) !== packageName) {
                    return PackageNameValidationResult.NameContainsNonURISafeCharacters;
                }
                return PackageNameValidationResult.Ok;
            }
            typingsInstaller.validatePackageName = validatePackageName;
            var TypingsInstaller = (function () {
                function TypingsInstaller(installTypingHost, globalCachePath, safeListPath, throttleLimit, telemetryEnabled, log) {
                    if (log === void 0) { log = nullLog; }
                    this.installTypingHost = installTypingHost;
                    this.globalCachePath = globalCachePath;
                    this.safeListPath = safeListPath;
                    this.throttleLimit = throttleLimit;
                    this.telemetryEnabled = telemetryEnabled;
                    this.log = log;
                    this.packageNameToTypingLocation = ts.createMap();
                    this.missingTypingsSet = ts.createMap();
                    this.knownCachesSet = ts.createMap();
                    this.projectWatchers = ts.createMap();
                    this.pendingRunRequests = [];
                    this.installRunCount = 1;
                    this.inFlightRequestCount = 0;
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Global cache location '" + globalCachePath + "', safe file path '" + safeListPath + "'");
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
                    var watchers = this.projectWatchers[projectName];
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
                    delete this.projectWatchers[projectName];
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Closing file watchers for project '" + projectName + "' - done.");
                    }
                };
                TypingsInstaller.prototype.install = function (req) {
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Got install request " + JSON.stringify(req));
                    }
                    if (req.cachePath) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine("Request specifies cache path '" + req.cachePath + "', loading cached information...");
                        }
                        this.processCacheLocation(req.cachePath);
                    }
                    var discoverTypingsResult = ts.JsTyping.discoverTypings(this.installTypingHost, req.fileNames, req.projectRootPath, this.safeListPath, this.packageNameToTypingLocation, req.typingOptions, req.unresolvedImports);
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
                TypingsInstaller.prototype.processCacheLocation = function (cacheLocation) {
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Processing cache location '" + cacheLocation + "'");
                    }
                    if (this.knownCachesSet[cacheLocation]) {
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
                                var typingFile = typingToFileName(cacheLocation, packageName, this.installTypingHost);
                                if (!typingFile) {
                                    continue;
                                }
                                var existingTypingFile = this.packageNameToTypingLocation[packageName];
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
                                this.packageNameToTypingLocation[packageName] = typingFile;
                            }
                        }
                    }
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Finished processing cache location '" + cacheLocation + "'");
                    }
                    this.knownCachesSet[cacheLocation] = true;
                };
                TypingsInstaller.prototype.filterAndMapToScopedName = function (typingsToInstall) {
                    if (typingsToInstall.length === 0) {
                        return typingsToInstall;
                    }
                    var result = [];
                    for (var _i = 0, typingsToInstall_1 = typingsToInstall; _i < typingsToInstall_1.length; _i++) {
                        var typing = typingsToInstall_1[_i];
                        if (this.missingTypingsSet[typing]) {
                            continue;
                        }
                        var validationResult = validatePackageName(typing);
                        if (validationResult === PackageNameValidationResult.Ok) {
                            if (typing in this.typesRegistry) {
                                result.push("@types/" + typing);
                            }
                            else {
                                if (this.log.isEnabled()) {
                                    this.log.writeLine("Entry for package '" + typing + "' does not exist in local types registry - skipping...");
                                }
                            }
                        }
                        else {
                            this.missingTypingsSet[typing] = true;
                            if (this.log.isEnabled()) {
                                switch (validationResult) {
                                    case PackageNameValidationResult.EmptyName:
                                        this.log.writeLine("Package name '" + typing + "' cannot be empty");
                                        break;
                                    case PackageNameValidationResult.NameTooLong:
                                        this.log.writeLine("Package name '" + typing + "' should be less than " + typingsInstaller.MaxPackageNameLength + " characters");
                                        break;
                                    case PackageNameValidationResult.NameStartsWithDot:
                                        this.log.writeLine("Package name '" + typing + "' cannot start with '.'");
                                        break;
                                    case PackageNameValidationResult.NameStartsWithUnderscore:
                                        this.log.writeLine("Package name '" + typing + "' cannot start with '_'");
                                        break;
                                    case PackageNameValidationResult.ScopedPackagesNotSupported:
                                        this.log.writeLine("Package '" + typing + "' is scoped and currently is not supported");
                                        break;
                                    case PackageNameValidationResult.NameContainsNonURISafeCharacters:
                                        this.log.writeLine("Package name '" + typing + "' contains non URI safe characters");
                                        break;
                                }
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
                    var scopedTypings = this.filterAndMapToScopedName(typingsToInstall);
                    if (scopedTypings.length === 0) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine("All typings are known to be missing or invalid - no need to go any further");
                        }
                        return;
                    }
                    this.ensurePackageDirectoryExists(cachePath);
                    var requestId = this.installRunCount;
                    this.installRunCount++;
                    this.installTypingsAsync(requestId, scopedTypings, cachePath, function (ok) {
                        if (_this.telemetryEnabled) {
                            _this.sendResponse({
                                kind: server.EventInstall,
                                packagesToInstall: scopedTypings
                            });
                        }
                        if (!ok) {
                            return;
                        }
                        if (_this.log.isEnabled()) {
                            _this.log.writeLine("Requested to install typings " + JSON.stringify(scopedTypings) + ", installed typings " + JSON.stringify(scopedTypings));
                        }
                        var installedTypingFiles = [];
                        for (var _i = 0, scopedTypings_1 = scopedTypings; _i < scopedTypings_1.length; _i++) {
                            var t = scopedTypings_1[_i];
                            var packageName = ts.getBaseFileName(t);
                            if (!packageName) {
                                continue;
                            }
                            var typingFile = typingToFileName(cachePath, packageName, _this.installTypingHost);
                            if (!typingFile) {
                                continue;
                            }
                            if (!_this.packageNameToTypingLocation[packageName]) {
                                _this.packageNameToTypingLocation[packageName] = typingFile;
                            }
                            installedTypingFiles.push(typingFile);
                        }
                        if (_this.log.isEnabled()) {
                            _this.log.writeLine("Installed typing files " + JSON.stringify(installedTypingFiles));
                        }
                        _this.sendResponse(_this.createSetTypings(req, currentlyCachedTypings.concat(installedTypingFiles)));
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
                        });
                        watchers.push(w);
                    }
                    this.projectWatchers[projectName] = watchers;
                };
                TypingsInstaller.prototype.createSetTypings = function (request, typings) {
                    return {
                        projectName: request.projectName,
                        typingOptions: request.typingOptions,
                        compilerOptions: request.compilerOptions,
                        typings: typings,
                        unresolvedImports: request.unresolvedImports,
                        kind: server.ActionSet
                    };
                };
                TypingsInstaller.prototype.installTypingsAsync = function (requestId, args, cwd, onRequestCompleted) {
                    this.pendingRunRequests.unshift({ requestId: requestId, args: args, cwd: cwd, onRequestCompleted: onRequestCompleted });
                    this.executeWithThrottling();
                };
                TypingsInstaller.prototype.executeWithThrottling = function () {
                    var _this = this;
                    var _loop_1 = function () {
                        this_1.inFlightRequestCount++;
                        var request = this_1.pendingRunRequests.pop();
                        this_1.installWorker(request.requestId, request.args, request.cwd, function (ok) {
                            _this.inFlightRequestCount--;
                            request.onRequestCompleted(ok);
                            _this.executeWithThrottling();
                        });
                    };
                    var this_1 = this;
                    while (this.inFlightRequestCount < this.throttleLimit && this.pendingRunRequests.length) {
                        _loop_1();
                    }
                };
                return TypingsInstaller;
            }());
            typingsInstaller.TypingsInstaller = TypingsInstaller;
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
                    this.logFile = logFile;
                }
                FileLog.prototype.isEnabled = function () {
                    return this.logFile !== undefined;
                };
                FileLog.prototype.writeLine = function (text) {
                    fs.appendFileSync(this.logFile, text + ts.sys.newLine);
                };
                return FileLog;
            }());
            function getNPMLocation(processName) {
                if (path.basename(processName).indexOf("node") == 0) {
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
                    return ts.createMap(content.entries);
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
                function NodeTypingsInstaller(globalTypingsCacheLocation, throttleLimit, telemetryEnabled, log) {
                    var _this = _super.call(this, ts.sys, globalTypingsCacheLocation, ts.toPath("typingSafeList.json", __dirname, ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)), throttleLimit, telemetryEnabled, log) || this;
                    if (_this.log.isEnabled()) {
                        _this.log.writeLine("Process id: " + process.pid);
                    }
                    _this.npmPath = getNPMLocation(process.argv[0]);
                    var execSync;
                    (_a = require("child_process"), _this.exec = _a.exec, execSync = _a.execSync, _a);
                    _this.ensurePackageDirectoryExists(globalTypingsCacheLocation);
                    try {
                        if (_this.log.isEnabled()) {
                            _this.log.writeLine("Updating " + TypesRegistryPackageName + " npm package...");
                        }
                        execSync(_this.npmPath + " install " + TypesRegistryPackageName, { cwd: globalTypingsCacheLocation, stdio: "ignore" });
                    }
                    catch (e) {
                        if (_this.log.isEnabled()) {
                            _this.log.writeLine("Error updating " + TypesRegistryPackageName + " package: " + e.message);
                        }
                    }
                    _this.typesRegistry = loadTypesRegistryFile(getTypesRegistryFileLocation(globalTypingsCacheLocation), _this.installTypingHost, _this.log);
                    return _this;
                    var _a;
                }
                NodeTypingsInstaller.prototype.listen = function () {
                    var _this = this;
                    process.on("message", function (req) {
                        switch (req.kind) {
                            case "discover":
                                _this.install(req);
                                break;
                            case "closeProject":
                                _this.closeProject(req);
                        }
                    });
                };
                NodeTypingsInstaller.prototype.sendResponse = function (response) {
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Sending response: " + JSON.stringify(response));
                    }
                    process.send(response);
                    if (this.log.isEnabled()) {
                        this.log.writeLine("Response has been sent.");
                    }
                };
                NodeTypingsInstaller.prototype.installWorker = function (requestId, args, cwd, onRequestCompleted) {
                    var _this = this;
                    if (this.log.isEnabled()) {
                        this.log.writeLine("#" + requestId + " with arguments'" + JSON.stringify(args) + "'.");
                    }
                    var command = this.npmPath + " install " + args.join(" ") + " --save-dev";
                    var start = Date.now();
                    this.exec(command, { cwd: cwd }, function (_err, stdout, stderr) {
                        if (_this.log.isEnabled()) {
                            _this.log.writeLine("npm install #" + requestId + " took: " + (Date.now() - start) + " ms" + ts.sys.newLine + "stdout: " + stdout + ts.sys.newLine + "stderr: " + stderr);
                        }
                        onRequestCompleted(!!stdout);
                    });
                };
                return NodeTypingsInstaller;
            }(typingsInstaller.TypingsInstaller));
            typingsInstaller.NodeTypingsInstaller = NodeTypingsInstaller;
            var logFilePath = server.findArgument(server.Arguments.LogFile);
            var globalTypingsCacheLocation = server.findArgument(server.Arguments.GlobalCacheLocation);
            var telemetryEnabled = server.hasArgument(server.Arguments.EnableTelemetry);
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
            var installer = new NodeTypingsInstaller(globalTypingsCacheLocation, 5, telemetryEnabled, log);
            installer.listen();
        })(typingsInstaller = server.typingsInstaller || (server.typingsInstaller = {}));
    })(server = ts.server || (ts.server = {}));
})(ts || (ts = {}));
