"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
var collections;
(function (collections) {
    var SortedMap = /** @class */ (function () {
        function SortedMap(comparer, iterable) {
            this._keys = [];
            this._values = [];
            this._version = 0;
            this._copyOnWrite = false;
            this._comparer = typeof comparer === "object" ? comparer.comparer : comparer;
            this._order = typeof comparer === "object" && comparer.sort === "insertion" ? [] : undefined;
            if (iterable) {
                var iterator = getIterator(iterable);
                try {
                    for (var i = nextResult(iterator); i; i = nextResult(iterator)) {
                        var _a = i.value, key = _a[0], value = _a[1];
                        this.set(key, value);
                    }
                }
                finally {
                    closeIterator(iterator);
                }
            }
        }
        Object.defineProperty(SortedMap.prototype, "size", {
            get: function () {
                return this._keys.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SortedMap.prototype, "comparer", {
            get: function () {
                return this._comparer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SortedMap.prototype, Symbol.toStringTag, {
            get: function () {
                return "SortedMap";
            },
            enumerable: true,
            configurable: true
        });
        SortedMap.prototype.has = function (key) {
            return ts.binarySearch(this._keys, key, ts.identity, this._comparer) >= 0;
        };
        SortedMap.prototype.get = function (key) {
            var index = ts.binarySearch(this._keys, key, ts.identity, this._comparer);
            return index >= 0 ? this._values[index] : undefined;
        };
        SortedMap.prototype.set = function (key, value) {
            var index = ts.binarySearch(this._keys, key, ts.identity, this._comparer);
            if (index >= 0) {
                this._values[index] = value;
            }
            else {
                this.writePreamble();
                insertAt(this._keys, ~index, key);
                insertAt(this._values, ~index, value);
                if (this._order)
                    insertAt(this._order, ~index, this._version);
                this.writePostScript();
            }
            return this;
        };
        SortedMap.prototype.delete = function (key) {
            var index = ts.binarySearch(this._keys, key, ts.identity, this._comparer);
            if (index >= 0) {
                this.writePreamble();
                ts.orderedRemoveItemAt(this._keys, index);
                ts.orderedRemoveItemAt(this._values, index);
                if (this._order)
                    ts.orderedRemoveItemAt(this._order, index);
                this.writePostScript();
                return true;
            }
            return false;
        };
        SortedMap.prototype.clear = function () {
            if (this.size > 0) {
                this.writePreamble();
                this._keys.length = 0;
                this._values.length = 0;
                if (this._order)
                    this._order.length = 0;
                this.writePostScript();
            }
        };
        SortedMap.prototype.forEach = function (callback, thisArg) {
            var keys = this._keys;
            var values = this._values;
            var indices = this.getIterationOrder();
            var version = this._version;
            this._copyOnWrite = true;
            try {
                if (indices) {
                    for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
                        var i = indices_1[_i];
                        callback.call(thisArg, values[i], keys[i], this);
                    }
                }
                else {
                    for (var i = 0; i < keys.length; i++) {
                        callback.call(thisArg, values[i], keys[i], this);
                    }
                }
            }
            finally {
                if (version === this._version) {
                    this._copyOnWrite = false;
                }
            }
        };
        SortedMap.prototype.keys = function () {
            var keys, indices, version, _i, indices_2, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = this._keys;
                        indices = this.getIterationOrder();
                        version = this._version;
                        this._copyOnWrite = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 9, 10]);
                        if (!indices) return [3 /*break*/, 6];
                        _i = 0, indices_2 = indices;
                        _a.label = 2;
                    case 2:
                        if (!(_i < indices_2.length)) return [3 /*break*/, 5];
                        i = indices_2[_i];
                        return [4 /*yield*/, keys[i]];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6: return [5 /*yield**/, __values(keys)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        if (version === this._version) {
                            this._copyOnWrite = false;
                        }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        };
        SortedMap.prototype.values = function () {
            var values, indices, version, _i, indices_3, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = this._values;
                        indices = this.getIterationOrder();
                        version = this._version;
                        this._copyOnWrite = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 9, 10]);
                        if (!indices) return [3 /*break*/, 6];
                        _i = 0, indices_3 = indices;
                        _a.label = 2;
                    case 2:
                        if (!(_i < indices_3.length)) return [3 /*break*/, 5];
                        i = indices_3[_i];
                        return [4 /*yield*/, values[i]];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6: return [5 /*yield**/, __values(values)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        if (version === this._version) {
                            this._copyOnWrite = false;
                        }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        };
        SortedMap.prototype.entries = function () {
            var keys, values, indices, version, _i, indices_4, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = this._keys;
                        values = this._values;
                        indices = this.getIterationOrder();
                        version = this._version;
                        this._copyOnWrite = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 11, 12]);
                        if (!indices) return [3 /*break*/, 6];
                        _i = 0, indices_4 = indices;
                        _a.label = 2;
                    case 2:
                        if (!(_i < indices_4.length)) return [3 /*break*/, 5];
                        i = indices_4[_i];
                        return [4 /*yield*/, [keys[i], values[i]]];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 10];
                    case 6:
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < keys.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, [keys[i], values[i]]];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 7];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (version === this._version) {
                            this._copyOnWrite = false;
                        }
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        };
        SortedMap.prototype[Symbol.iterator] = function () {
            return this.entries();
        };
        SortedMap.prototype.writePreamble = function () {
            if (this._copyOnWrite) {
                this._keys = this._keys.slice();
                this._values = this._values.slice();
                if (this._order)
                    this._order = this._order.slice();
                this._copyOnWrite = false;
            }
        };
        SortedMap.prototype.writePostScript = function () {
            this._version++;
        };
        SortedMap.prototype.getIterationOrder = function () {
            if (this._order) {
                var order_1 = this._order;
                return this._order
                    .map(function (_, i) { return i; })
                    .sort(function (x, y) { return order_1[x] - order_1[y]; });
            }
            return undefined;
        };
        return SortedMap;
    }());
    collections.SortedMap = SortedMap;
    function insertAt(array, index, value) {
        if (index === 0) {
            array.unshift(value);
        }
        else if (index === array.length) {
            array.push(value);
        }
        else {
            for (var i = array.length; i > index; i--) {
                array[i] = array[i - 1];
            }
            array[index] = value;
        }
    }
    collections.insertAt = insertAt;
    function getIterator(iterable) {
        return iterable[Symbol.iterator]();
    }
    collections.getIterator = getIterator;
    function nextResult(iterator) {
        var result = iterator.next();
        return result.done ? undefined : result;
    }
    collections.nextResult = nextResult;
    function closeIterator(iterator) {
        var fn = iterator.return;
        if (typeof fn === "function")
            fn.call(iterator);
    }
    collections.closeIterator = closeIterator;
    /**
     * A collection of metadata that supports inheritance.
     */
    var Metadata = /** @class */ (function () {
        function Metadata(parent) {
            this._version = 0;
            this._size = -1;
            this._parent = parent;
            this._map = Object.create(parent ? parent._map : null); // tslint:disable-line:no-null-keyword
        }
        Object.defineProperty(Metadata.prototype, "size", {
            get: function () {
                if (this._size === -1 || (this._parent && this._parent._version !== this._parentVersion)) {
                    var size = 0;
                    for (var _ in this._map)
                        size++;
                    this._size = size;
                    if (this._parent) {
                        this._parentVersion = this._parent._version;
                    }
                }
                return this._size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Metadata.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Metadata.prototype.has = function (key) {
            return this._map[Metadata._escapeKey(key)] !== undefined;
        };
        Metadata.prototype.get = function (key) {
            var value = this._map[Metadata._escapeKey(key)];
            return value === Metadata._undefinedValue ? undefined : value;
        };
        Metadata.prototype.set = function (key, value) {
            this._map[Metadata._escapeKey(key)] = value === undefined ? Metadata._undefinedValue : value;
            this._size = -1;
            this._version++;
            return this;
        };
        Metadata.prototype.delete = function (key) {
            var escapedKey = Metadata._escapeKey(key);
            if (this._map[escapedKey] !== undefined) {
                delete this._map[escapedKey];
                this._size = -1;
                this._version++;
                return true;
            }
            return false;
        };
        Metadata.prototype.clear = function () {
            this._map = Object.create(this._parent ? this._parent._map : null); // tslint:disable-line:no-null-keyword
            this._size = -1;
            this._version++;
        };
        Metadata.prototype.forEach = function (callback) {
            for (var key in this._map) {
                callback(this._map[key], Metadata._unescapeKey(key), this);
            }
        };
        Metadata._escapeKey = function (text) {
            return (text.length >= 2 && text.charAt(0) === "_" && text.charAt(1) === "_" ? "_" + text : text);
        };
        Metadata._unescapeKey = function (text) {
            return (text.length >= 3 && text.charAt(0) === "_" && text.charAt(1) === "_" && text.charAt(2) === "_" ? text.slice(1) : text);
        };
        Metadata._undefinedValue = {};
        return Metadata;
    }());
    collections.Metadata = Metadata;
})(collections || (collections = {}));
/**
 * Common utilities
 */
var utils;
(function (utils) {
    var testPathPrefixRegExp = /(?:(file:\/{3})|\/)\.(ts|lib|src)\//g;
    function removeTestPathPrefixes(text, retainTrailingDirectorySeparator) {
        return text !== undefined ? text.replace(testPathPrefixRegExp, function (_, scheme) { return scheme || (retainTrailingDirectorySeparator ? "/" : ""); }) : undefined; // TODO: GH#18217
    }
    utils.removeTestPathPrefixes = removeTestPathPrefixes;
    /**
     * Removes leading indentation from a template literal string.
     */
    function dedent(array) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var text = array[0];
        for (var i = 0; i < args.length; i++) {
            text += args[i];
            text += array[i + 1];
        }
        var lineTerminatorRegExp = /\r\n?|\n/g;
        var lines = [];
        var lineTerminators = [];
        var match;
        var lineStart = 0;
        while (match = lineTerminatorRegExp.exec(text)) {
            if (lineStart !== match.index || lines.length > 0) {
                lines.push(text.slice(lineStart, match.index));
                lineTerminators.push(match[0]);
            }
            lineStart = match.index + match[0].length;
        }
        if (lineStart < text.length) {
            lines.push(text.slice(lineStart));
        }
        var indentation = guessIndentation(lines);
        var result = "";
        for (var i = 0; i < lines.length; i++) {
            var lineText = lines[i];
            var line = indentation ? lineText.slice(indentation) : lineText;
            result += line;
            if (i < lineTerminators.length) {
                result += lineTerminators[i];
            }
        }
        return result;
    }
    utils.dedent = dedent;
    function guessIndentation(lines) {
        var indentation;
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            for (var i = 0; i < line.length && (indentation === undefined || i < indentation); i++) {
                if (!ts.isWhiteSpaceLike(line.charCodeAt(i))) {
                    if (indentation === undefined || i < indentation) {
                        indentation = i;
                        break;
                    }
                }
            }
        }
        return indentation;
    }
    function toUtf8(text) {
        return new Buffer(text).toString("utf8");
    }
    utils.toUtf8 = toUtf8;
    function getByteOrderMarkLength(text) {
        if (text.length >= 1) {
            var ch0 = text.charCodeAt(0);
            if (ch0 === 0xfeff)
                return 1;
            if (ch0 === 0xfe)
                return text.length >= 2 && text.charCodeAt(1) === 0xff ? 2 : 0;
            if (ch0 === 0xff)
                return text.length >= 2 && text.charCodeAt(1) === 0xfe ? 2 : 0;
            if (ch0 === 0xef)
                return text.length >= 3 && text.charCodeAt(1) === 0xbb && text.charCodeAt(2) === 0xbf ? 3 : 0;
        }
        return 0;
    }
    utils.getByteOrderMarkLength = getByteOrderMarkLength;
    function removeByteOrderMark(text) {
        var length = getByteOrderMarkLength(text);
        return length ? text.slice(length) : text;
    }
    utils.removeByteOrderMark = removeByteOrderMark;
    function addUTF8ByteOrderMark(text) {
        return getByteOrderMarkLength(text) === 0 ? "\u00EF\u00BB\u00BF" + text : text;
    }
    utils.addUTF8ByteOrderMark = addUTF8ByteOrderMark;
})(utils || (utils = {}));
// NOTE: The contents of this file are all exported from the namespace 'documents'. This is to
//       support the eventual conversion of harness into a modular system.
var documents;
(function (documents) {
    var TextDocument = /** @class */ (function () {
        function TextDocument(file, text, meta) {
            this.file = file;
            this.text = text;
            this.meta = meta || new Map();
        }
        Object.defineProperty(TextDocument.prototype, "lineStarts", {
            get: function () {
                return this._lineStarts || (this._lineStarts = ts.computeLineStarts(this.text));
            },
            enumerable: true,
            configurable: true
        });
        TextDocument.fromTestFile = function (file) {
            return new TextDocument(file.unitName, file.content, file.fileOptions && Object.keys(file.fileOptions)
                .reduce(function (meta, key) { return meta.set(key, file.fileOptions[key]); }, new Map()));
        };
        TextDocument.prototype.asTestFile = function () {
            return this._testFile || (this._testFile = {
                unitName: this.file,
                content: this.text,
                fileOptions: Array.from(this.meta)
                    .reduce(function (obj, _a) {
                    var key = _a[0], value = _a[1];
                    return (obj[key] = value, obj);
                }, {})
            });
        };
        return TextDocument;
    }());
    documents.TextDocument = TextDocument;
    var SourceMap = /** @class */ (function () {
        function SourceMap(mapFile, data) {
            this.sources = [];
            this.mappings = [];
            this._emittedLineMappings = [];
            this._sourceLineMappings = [];
            this.raw = typeof data === "string" ? JSON.parse(data) : data;
            this.mapFile = mapFile;
            this.version = this.raw.version;
            this.file = this.raw.file;
            this.sourceRoot = this.raw.sourceRoot;
            this.sources = this.raw.sources;
            this.sourcesContent = this.raw.sourcesContent;
            this.names = this.raw.names;
            // populate mappings
            var mappings = [];
            var emittedLine = 0;
            var emittedColumn = 0;
            var sourceIndex = 0;
            var sourceLine = 0;
            var sourceColumn = 0;
            var nameIndex = 0;
            var match;
            while (match = SourceMap._mappingRegExp.exec(this.raw.mappings)) {
                if (match[1]) {
                    var segment = SourceMap._decodeVLQ(match[1]);
                    if (segment.length !== 1 && segment.length !== 4 && segment.length !== 5) {
                        throw new Error("Invalid VLQ");
                    }
                    emittedColumn += segment[0];
                    if (segment.length >= 4) {
                        sourceIndex += segment[1];
                        sourceLine += segment[2];
                        sourceColumn += segment[3];
                    }
                    var mapping = { mappingIndex: mappings.length, emittedLine: emittedLine, emittedColumn: emittedColumn, sourceIndex: sourceIndex, sourceLine: sourceLine, sourceColumn: sourceColumn };
                    if (segment.length === 5) {
                        nameIndex += segment[4];
                        mapping.nameIndex = nameIndex;
                    }
                    mappings.push(mapping);
                    var mappingsForEmittedLine = this._emittedLineMappings[mapping.emittedLine] || (this._emittedLineMappings[mapping.emittedLine] = []);
                    mappingsForEmittedLine.push(mapping);
                    var mappingsForSource = this._sourceLineMappings[mapping.sourceIndex] || (this._sourceLineMappings[mapping.sourceIndex] = []);
                    var mappingsForSourceLine = mappingsForSource[mapping.sourceLine] || (mappingsForSource[mapping.sourceLine] = []);
                    mappingsForSourceLine.push(mapping);
                }
                else if (match[2]) {
                    emittedLine++;
                    emittedColumn = 0;
                }
                else {
                    throw new Error("Unrecognized character '" + match[0] + "'.");
                }
            }
            this.mappings = mappings;
        }
        SourceMap.getUrl = function (text) {
            var match;
            var lastMatch;
            while (match = SourceMap._sourceMappingURLRegExp.exec(text)) {
                lastMatch = match;
            }
            return lastMatch ? lastMatch[1] : undefined;
        };
        SourceMap.fromUrl = function (url) {
            var match = SourceMap._dataURLRegExp.exec(url);
            return match ? new SourceMap(/*mapFile*/ undefined, new Buffer(match[1], "base64").toString("utf8")) : undefined;
        };
        SourceMap.fromSource = function (text) {
            var url = this.getUrl(text);
            return url === undefined ? undefined : this.fromUrl(url);
        };
        SourceMap.prototype.getMappingsForEmittedLine = function (emittedLine) {
            return this._emittedLineMappings[emittedLine];
        };
        SourceMap.prototype.getMappingsForSourceLine = function (sourceIndex, sourceLine) {
            var mappingsForSource = this._sourceLineMappings[sourceIndex];
            return mappingsForSource && mappingsForSource[sourceLine];
        };
        SourceMap._decodeVLQ = function (text) {
            var vlq = [];
            var shift = 0;
            var value = 0;
            for (var i = 0; i < text.length; i++) {
                var currentByte = SourceMap._base64Chars.indexOf(text.charAt(i));
                value += (currentByte & 31) << shift;
                if ((currentByte & 32) === 0) {
                    vlq.push(value & 1 ? -(value >>> 1) : value >>> 1);
                    shift = 0;
                    value = 0;
                }
                else {
                    shift += 5;
                }
            }
            return vlq;
        };
        SourceMap._mappingRegExp = /([A-Za-z0-9+/]+),?|(;)|./g;
        SourceMap._sourceMappingURLRegExp = /^\/\/[#@]\s*sourceMappingURL\s*=\s*(.*?)\s*$/mig;
        SourceMap._dataURLRegExp = /^data:application\/json;base64,([a-z0-9+/=]+)$/i;
        SourceMap._base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        return SourceMap;
    }());
    documents.SourceMap = SourceMap;
})(documents || (documents = {}));
var vpath;
(function (vpath) {
    vpath.sep = ts.directorySeparator;
    vpath.normalizeSeparators = ts.normalizeSlashes;
    vpath.isAbsolute = ts.isRootedDiskPath;
    vpath.isRoot = ts.isDiskPathRoot;
    vpath.hasTrailingSeparator = ts.hasTrailingDirectorySeparator;
    vpath.addTrailingSeparator = ts.ensureTrailingDirectorySeparator;
    vpath.removeTrailingSeparator = ts.removeTrailingDirectorySeparator;
    vpath.normalize = ts.normalizePath;
    vpath.combine = ts.combinePaths;
    vpath.parse = ts.getPathComponents;
    vpath.reduce = ts.reducePathComponents;
    vpath.format = ts.getPathFromPathComponents;
    vpath.resolve = ts.resolvePath;
    vpath.compare = ts.comparePaths;
    vpath.compareCaseSensitive = ts.comparePathsCaseSensitive;
    vpath.compareCaseInsensitive = ts.comparePathsCaseInsensitive;
    vpath.dirname = ts.getDirectoryPath;
    vpath.basename = ts.getBaseFileName;
    vpath.extname = ts.getAnyExtensionFromPath;
    vpath.relative = ts.getRelativePathFromDirectory;
    vpath.beneath = ts.containsPath;
    vpath.changeExtension = ts.changeAnyExtension;
    vpath.isTypeScript = ts.hasTypeScriptFileExtension;
    vpath.isJavaScript = ts.hasJavaScriptFileExtension;
    var invalidRootComponentRegExp = /^(?!(\/|\/\/\w+\/|[a-zA-Z]:\/?|)$)/;
    var invalidNavigableComponentRegExp = /[:*?"<>|]/;
    var invalidNavigableComponentWithWildcardsRegExp = /[:"<>|]/;
    var invalidNonNavigableComponentRegExp = /^\.{1,2}$|[:*?"<>|]/;
    var invalidNonNavigableComponentWithWildcardsRegExp = /^\.{1,2}$|[:"<>|]/;
    var extRegExp = /\.\w+$/;
    var ValidationFlags;
    (function (ValidationFlags) {
        ValidationFlags[ValidationFlags["None"] = 0] = "None";
        ValidationFlags[ValidationFlags["RequireRoot"] = 1] = "RequireRoot";
        ValidationFlags[ValidationFlags["RequireDirname"] = 2] = "RequireDirname";
        ValidationFlags[ValidationFlags["RequireBasename"] = 4] = "RequireBasename";
        ValidationFlags[ValidationFlags["RequireExtname"] = 8] = "RequireExtname";
        ValidationFlags[ValidationFlags["RequireTrailingSeparator"] = 16] = "RequireTrailingSeparator";
        ValidationFlags[ValidationFlags["AllowRoot"] = 32] = "AllowRoot";
        ValidationFlags[ValidationFlags["AllowDirname"] = 64] = "AllowDirname";
        ValidationFlags[ValidationFlags["AllowBasename"] = 128] = "AllowBasename";
        ValidationFlags[ValidationFlags["AllowExtname"] = 256] = "AllowExtname";
        ValidationFlags[ValidationFlags["AllowTrailingSeparator"] = 512] = "AllowTrailingSeparator";
        ValidationFlags[ValidationFlags["AllowNavigation"] = 1024] = "AllowNavigation";
        ValidationFlags[ValidationFlags["AllowWildcard"] = 2048] = "AllowWildcard";
        /** Path must be a valid directory root */
        ValidationFlags[ValidationFlags["Root"] = 545] = "Root";
        /** Path must be a absolute */
        ValidationFlags[ValidationFlags["Absolute"] = 2017] = "Absolute";
        /** Path may be relative or absolute */
        ValidationFlags[ValidationFlags["RelativeOrAbsolute"] = 2016] = "RelativeOrAbsolute";
        /** Path may only be a filename */
        ValidationFlags[ValidationFlags["Basename"] = 260] = "Basename";
    })(ValidationFlags = vpath.ValidationFlags || (vpath.ValidationFlags = {}));
    function validateComponents(components, flags, hasTrailingSeparator) {
        var hasRoot = !!components[0];
        var hasDirname = components.length > 2;
        var hasBasename = components.length > 1;
        var hasExtname = hasBasename && extRegExp.test(components[components.length - 1]);
        var invalidComponentRegExp = flags & 1024 /* AllowNavigation */
            ? flags & 2048 /* AllowWildcard */ ? invalidNavigableComponentWithWildcardsRegExp : invalidNavigableComponentRegExp
            : flags & 2048 /* AllowWildcard */ ? invalidNonNavigableComponentWithWildcardsRegExp : invalidNonNavigableComponentRegExp;
        // Validate required components
        if (flags & 1 /* RequireRoot */ && !hasRoot)
            return false;
        if (flags & 2 /* RequireDirname */ && !hasDirname)
            return false;
        if (flags & 4 /* RequireBasename */ && !hasBasename)
            return false;
        if (flags & 8 /* RequireExtname */ && !hasExtname)
            return false;
        if (flags & 16 /* RequireTrailingSeparator */ && !hasTrailingSeparator)
            return false;
        // Required components indicate allowed components
        if (flags & 1 /* RequireRoot */)
            flags |= 32 /* AllowRoot */;
        if (flags & 2 /* RequireDirname */)
            flags |= 64 /* AllowDirname */;
        if (flags & 4 /* RequireBasename */)
            flags |= 128 /* AllowBasename */;
        if (flags & 8 /* RequireExtname */)
            flags |= 256 /* AllowExtname */;
        if (flags & 16 /* RequireTrailingSeparator */)
            flags |= 512 /* AllowTrailingSeparator */;
        // Validate disallowed components
        if (~flags & 32 /* AllowRoot */ && hasRoot)
            return false;
        if (~flags & 64 /* AllowDirname */ && hasDirname)
            return false;
        if (~flags & 128 /* AllowBasename */ && hasBasename)
            return false;
        if (~flags & 256 /* AllowExtname */ && hasExtname)
            return false;
        if (~flags & 512 /* AllowTrailingSeparator */ && hasTrailingSeparator)
            return false;
        // Validate component strings
        if (invalidRootComponentRegExp.test(components[0]))
            return false;
        for (var i = 1; i < components.length; i++) {
            if (invalidComponentRegExp.test(components[i]))
                return false;
        }
        return true;
    }
    function validate(path, flags) {
        if (flags === void 0) { flags = 2016 /* RelativeOrAbsolute */; }
        var components = vpath.parse(path);
        var trailing = vpath.hasTrailingSeparator(path);
        if (!validateComponents(components, flags, trailing))
            throw vfs.createIOError("ENOENT");
        return components.length > 1 && trailing ? vpath.format(vpath.reduce(components)) + vpath.sep : vpath.format(vpath.reduce(components));
    }
    vpath.validate = validate;
    function isDeclaration(path) {
        return vpath.extname(path, ".d.ts", /*ignoreCase*/ false).length > 0;
    }
    vpath.isDeclaration = isDeclaration;
    function isSourceMap(path) {
        return vpath.extname(path, ".map", /*ignoreCase*/ false).length > 0;
    }
    vpath.isSourceMap = isSourceMap;
    var javaScriptSourceMapExtensions = [".js.map", ".jsx.map"];
    function isJavaScriptSourceMap(path) {
        return vpath.extname(path, javaScriptSourceMapExtensions, /*ignoreCase*/ false).length > 0;
    }
    vpath.isJavaScriptSourceMap = isJavaScriptSourceMap;
    function isJson(path) {
        return vpath.extname(path, ".json", /*ignoreCase*/ false).length > 0;
    }
    vpath.isJson = isJson;
    function isDefaultLibrary(path) {
        return isDeclaration(path)
            && vpath.basename(path).startsWith("lib.");
    }
    vpath.isDefaultLibrary = isDefaultLibrary;
    function isTsConfigFile(path) {
        return path.indexOf("tsconfig") !== -1 && path.indexOf("json") !== -1;
    }
    vpath.isTsConfigFile = isTsConfigFile;
})(vpath || (vpath = {}));
// tslint:disable:no-null-keyword
var vfs;
(function (vfs) {
    /**
     * Posix-style path to the TypeScript compiler build outputs (including tsc.js, lib.d.ts, etc.)
     */
    vfs.builtFolder = "/.ts";
    /**
     * Posix-style path to additional mountable folders (./tests/projects in this repo)
     */
    vfs.projectsFolder = "/.projects";
    /**
     * Posix-style path to additional test libraries
     */
    vfs.testLibFolder = "/.lib";
    /**
     * Posix-style path to sources under test
     */
    vfs.srcFolder = "/.src";
    // file type
    var S_IFMT = 61440; // file type
    var S_IFSOCK = 49152; // socket
    var S_IFLNK = 40960; // symbolic link
    var S_IFREG = 32768; // regular file
    var S_IFBLK = 24576; // block device
    var S_IFDIR = 16384; // directory
    var S_IFCHR = 8192; // character device
    var S_IFIFO = 4096; // FIFO
    var devCount = 0; // A monotonically increasing count of device ids
    var inoCount = 0; // A monotonically increasing count of inodes
    /**
     * Represents a virtual POSIX-like file system.
     */
    var FileSystem = /** @class */ (function () {
        function FileSystem(ignoreCase, options) {
            if (options === void 0) { options = {}; }
            // lazy-initialized state that should be mutable even if the FileSystem is frozen.
            this._lazy = {};
            var _a = options.time, time = _a === void 0 ? -1 : _a, files = options.files, meta = options.meta;
            this.ignoreCase = ignoreCase;
            this.stringComparer = this.ignoreCase ? vpath.compareCaseInsensitive : vpath.compareCaseSensitive;
            this._time = time;
            if (meta) {
                for (var _i = 0, _b = Object.keys(meta); _i < _b.length; _i++) {
                    var key = _b[_i];
                    this.meta.set(key, meta[key]);
                }
            }
            if (files) {
                this._applyFiles(files, /*dirname*/ "");
            }
            var cwd = options.cwd;
            if ((!cwd || !vpath.isRoot(cwd)) && this._lazy.links) {
                var iterator = collections.getIterator(this._lazy.links.keys());
                try {
                    for (var i = collections.nextResult(iterator); i; i = collections.nextResult(iterator)) {
                        var name = i.value;
                        cwd = cwd ? vpath.resolve(name, cwd) : name;
                        break;
                    }
                }
                finally {
                    collections.closeIterator(iterator);
                }
            }
            if (cwd) {
                vpath.validate(cwd, 2017 /* Absolute */);
                this.mkdirpSync(cwd);
            }
            this._cwd = cwd || "";
        }
        Object.defineProperty(FileSystem.prototype, "meta", {
            /**
             * Gets metadata for this `FileSystem`.
             */
            get: function () {
                if (!this._lazy.meta) {
                    this._lazy.meta = new collections.Metadata(this._shadowRoot ? this._shadowRoot.meta : undefined);
                }
                return this._lazy.meta;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileSystem.prototype, "isReadonly", {
            /**
             * Gets a value indicating whether the file system is read-only.
             */
            get: function () {
                return Object.isFrozen(this);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Makes the file system read-only.
         */
        FileSystem.prototype.makeReadonly = function () {
            Object.freeze(this);
            return this;
        };
        Object.defineProperty(FileSystem.prototype, "shadowRoot", {
            /**
             * Gets the file system shadowed by this file system.
             */
            get: function () {
                return this._shadowRoot;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Gets a shadow copy of this file system. Changes to the shadow copy do not affect the
         * original, allowing multiple copies of the same core file system without multiple copies
         * of the same data.
         */
        FileSystem.prototype.shadow = function (ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = this.ignoreCase; }
            if (!this.isReadonly)
                throw new Error("Cannot shadow a mutable file system.");
            if (ignoreCase && !this.ignoreCase)
                throw new Error("Cannot create a case-insensitive file system from a case-sensitive one.");
            var fs = new FileSystem(ignoreCase, { time: this._time });
            fs._shadowRoot = this;
            fs._cwd = this._cwd;
            return fs;
        };
        /**
         * Gets or sets the timestamp (in milliseconds) used for file status, returning the previous timestamp.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/time.html
         */
        FileSystem.prototype.time = function (value) {
            if (value !== undefined && this.isReadonly)
                throw createIOError("EPERM");
            var result = this._time;
            if (typeof result === "function")
                result = result();
            if (typeof result === "object")
                result = result.getTime();
            if (result === -1)
                result = Date.now();
            if (value !== undefined) {
                this._time = value;
            }
            return result;
        };
        /**
         * Gets the metadata object for a path.
         * @param path
         */
        FileSystem.prototype.filemeta = function (path) {
            var node = this._walk(this._resolve(path)).node;
            if (!node)
                throw createIOError("ENOENT");
            return this._filemeta(node);
        };
        FileSystem.prototype._filemeta = function (node) {
            if (!node.meta) {
                var parentMeta = node.shadowRoot && this._shadowRoot && this._shadowRoot._filemeta(node.shadowRoot);
                node.meta = new collections.Metadata(parentMeta);
            }
            return node.meta;
        };
        /**
         * Get the pathname of the current working directory.
         *
         * @link - http://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html
         */
        FileSystem.prototype.cwd = function () {
            if (!this._cwd)
                throw new Error("The current working directory has not been set.");
            var node = this._walk(this._cwd).node;
            if (!node)
                throw createIOError("ENOENT");
            if (!isDirectory(node))
                throw createIOError("ENOTDIR");
            return this._cwd;
        };
        /**
         * Changes the current working directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html
         */
        FileSystem.prototype.chdir = function (path) {
            if (this.isReadonly)
                throw createIOError("EPERM");
            path = this._resolve(path);
            var node = this._walk(path).node;
            if (!node)
                throw createIOError("ENOENT");
            if (!isDirectory(node))
                throw createIOError("ENOTDIR");
            this._cwd = path;
        };
        /**
         * Pushes the current directory onto the directory stack and changes the current working directory to the supplied path.
         */
        FileSystem.prototype.pushd = function (path) {
            if (this.isReadonly)
                throw createIOError("EPERM");
            if (path)
                path = this._resolve(path);
            if (this._cwd) {
                if (!this._dirStack)
                    this._dirStack = [];
                this._dirStack.push(this._cwd);
            }
            if (path && path !== this._cwd) {
                this.chdir(path);
            }
        };
        /**
         * Pops the previous directory from the location stack and changes the current directory to that directory.
         */
        FileSystem.prototype.popd = function () {
            if (this.isReadonly)
                throw createIOError("EPERM");
            var path = this._dirStack && this._dirStack.pop();
            if (path) {
                this.chdir(path);
            }
        };
        /**
         * Update the file system with a set of files.
         */
        FileSystem.prototype.apply = function (files) {
            this._applyFiles(files, this._cwd);
        };
        /**
         * Scan file system entries along a path. If `path` is a symbolic link, it is dereferenced.
         * @param path The path at which to start the scan.
         * @param axis The axis along which to traverse.
         * @param traversal The traversal scheme to use.
         */
        FileSystem.prototype.scanSync = function (path, axis, traversal) {
            path = this._resolve(path);
            var results = [];
            this._scan(path, this._stat(this._walk(path)), axis, traversal, /*noFollow*/ false, results);
            return results;
        };
        /**
         * Scan file system entries along a path.
         * @param path The path at which to start the scan.
         * @param axis The axis along which to traverse.
         * @param traversal The traversal scheme to use.
         */
        FileSystem.prototype.lscanSync = function (path, axis, traversal) {
            path = this._resolve(path);
            var results = [];
            this._scan(path, this._stat(this._walk(path, /*noFollow*/ true)), axis, traversal, /*noFollow*/ true, results);
            return results;
        };
        FileSystem.prototype._scan = function (path, stats, axis, traversal, noFollow, results) {
            if (axis === "ancestors-or-self" || axis === "self" || axis === "descendants-or-self") {
                if (!traversal.accept || traversal.accept(path, stats)) {
                    results.push(path);
                }
            }
            if (axis === "ancestors-or-self" || axis === "ancestors") {
                var dirname = vpath.dirname(path);
                if (dirname !== path) {
                    try {
                        var stats_1 = this._stat(this._walk(dirname, noFollow));
                        if (!traversal.traverse || traversal.traverse(dirname, stats_1)) {
                            this._scan(dirname, stats_1, "ancestors-or-self", traversal, noFollow, results);
                        }
                    }
                    catch ( /*ignored*/_a) { /*ignored*/ }
                }
            }
            if (axis === "descendants-or-self" || axis === "descendants") {
                if (stats.isDirectory() && (!traversal.traverse || traversal.traverse(path, stats))) {
                    for (var _i = 0, _b = this.readdirSync(path); _i < _b.length; _i++) {
                        var file = _b[_i];
                        try {
                            var childpath = vpath.combine(path, file);
                            var stats_2 = this._stat(this._walk(childpath, noFollow));
                            this._scan(childpath, stats_2, "descendants-or-self", traversal, noFollow, results);
                        }
                        catch ( /*ignored*/_c) { /*ignored*/ }
                    }
                }
            }
        };
        /**
         * Mounts a physical or virtual file system at a location in this virtual file system.
         *
         * @param source The path in the physical (or other virtual) file system.
         * @param target The path in this virtual file system.
         * @param resolver An object used to resolve files in `source`.
         */
        FileSystem.prototype.mountSync = function (source, target, resolver) {
            if (this.isReadonly)
                throw createIOError("EROFS");
            source = vpath.validate(source, 2017 /* Absolute */);
            var _a = this._walk(this._resolve(target), /*noFollow*/ true), parent = _a.parent, links = _a.links, existingNode = _a.node, basename = _a.basename;
            if (existingNode)
                throw createIOError("EEXIST");
            var time = this.time();
            var node = this._mknod(parent ? parent.dev : ++devCount, S_IFDIR, /*mode*/ 511, time);
            node.source = source;
            node.resolver = resolver;
            this._addLink(parent, links, basename, node, time);
        };
        /**
         * Recursively remove all files and directories underneath the provided path.
         */
        FileSystem.prototype.rimrafSync = function (path) {
            try {
                var stats = this.lstatSync(path);
                if (stats.isFile() || stats.isSymbolicLink()) {
                    this.unlinkSync(path);
                }
                else if (stats.isDirectory()) {
                    for (var _i = 0, _a = this.readdirSync(path); _i < _a.length; _i++) {
                        var file = _a[_i];
                        this.rimrafSync(vpath.combine(path, file));
                    }
                    this.rmdirSync(path);
                }
            }
            catch (e) {
                if (e.code === "ENOENT")
                    return;
                throw e;
            }
        };
        /**
         * Make a directory and all of its parent paths (if they don't exist).
         */
        FileSystem.prototype.mkdirpSync = function (path) {
            var _this = this;
            path = this._resolve(path);
            var result = this._walk(path, /*noFollow*/ true, function (error, result) {
                if (error.code === "ENOENT") {
                    _this._mkdir(result);
                    return "retry";
                }
                return "throw";
            });
            if (!result.node)
                this._mkdir(result);
        };
        FileSystem.prototype.getFileListing = function () {
            var _this = this;
            var result = "";
            var printLinks = function (dirname, links) {
                var iterator = collections.getIterator(links);
                try {
                    for (var i = collections.nextResult(iterator); i; i = collections.nextResult(iterator)) {
                        var _a = i.value, name = _a[0], node = _a[1];
                        var path = dirname ? vpath.combine(dirname, name) : name;
                        var marker = vpath.compare(_this._cwd, path, _this.ignoreCase) === 0 ? "*" : " ";
                        if (result)
                            result += "\n";
                        result += marker;
                        if (isDirectory(node)) {
                            result += vpath.addTrailingSeparator(path);
                            printLinks(path, _this._getLinks(node));
                        }
                        else if (isFile(node)) {
                            result += path;
                        }
                        else if (isSymlink(node)) {
                            result += path + " -> " + node.symlink;
                        }
                    }
                }
                finally {
                    collections.closeIterator(iterator);
                }
            };
            printLinks(/*dirname*/ undefined, this._getRootLinks());
            return result;
        };
        /**
         * Print diagnostic information about the structure of the file system to the console.
         */
        FileSystem.prototype.debugPrint = function () {
            console.log(this.getFileListing());
        };
        // POSIX API (aligns with NodeJS "fs" module API)
        /**
         * Determines whether a path exists.
         */
        FileSystem.prototype.existsSync = function (path) {
            var result = this._walk(this._resolve(path), /*noFollow*/ true, function () { return "stop"; });
            return result !== undefined && result.node !== undefined;
        };
        /**
         * Get file status. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.statSync = function (path) {
            return this._stat(this._walk(this._resolve(path)));
        };
        /**
         * Change file access times
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.utimesSync = function (path, atime, mtime) {
            if (this.isReadonly)
                throw createIOError("EROFS");
            if (!isFinite(+atime) || !isFinite(+mtime))
                throw createIOError("EINVAL");
            var entry = this._walk(this._resolve(path));
            if (!entry || !entry.node) {
                throw createIOError("ENOENT");
            }
            entry.node.atimeMs = +atime;
            entry.node.mtimeMs = +mtime;
            entry.node.ctimeMs = this.time();
        };
        /**
         * Get file status. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.lstatSync = function (path) {
            return this._stat(this._walk(this._resolve(path), /*noFollow*/ true));
        };
        FileSystem.prototype._stat = function (entry) {
            var node = entry.node;
            if (!node)
                throw createIOError("ENOENT", entry.realpath);
            return new Stats(node.dev, node.ino, node.mode, node.nlink, 
            /*rdev*/ 0, 
            /*size*/ isFile(node) ? this._getSize(node) : isSymlink(node) ? node.symlink.length : 0, 
            /*blksize*/ 4096, 
            /*blocks*/ 0, node.atimeMs, node.mtimeMs, node.ctimeMs, node.birthtimeMs);
        };
        /**
         * Read a directory. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.readdirSync = function (path) {
            var node = this._walk(this._resolve(path)).node;
            if (!node)
                throw createIOError("ENOENT");
            if (!isDirectory(node))
                throw createIOError("ENOTDIR");
            return Array.from(this._getLinks(node).keys());
        };
        /**
         * Make a directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.mkdirSync = function (path) {
            if (this.isReadonly)
                throw createIOError("EROFS");
            this._mkdir(this._walk(this._resolve(path), /*noFollow*/ true));
        };
        FileSystem.prototype._mkdir = function (_a) {
            var parent = _a.parent, links = _a.links, existingNode = _a.node, basename = _a.basename;
            if (existingNode)
                throw createIOError("EEXIST");
            var time = this.time();
            var node = this._mknod(parent ? parent.dev : ++devCount, S_IFDIR, /*mode*/ 511, time);
            this._addLink(parent, links, basename, node, time);
        };
        /**
         * Remove a directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.rmdirSync = function (path) {
            if (this.isReadonly)
                throw createIOError("EROFS");
            path = this._resolve(path);
            var _a = this._walk(path, /*noFollow*/ true), parent = _a.parent, links = _a.links, node = _a.node, basename = _a.basename;
            if (!parent)
                throw createIOError("EPERM");
            if (!isDirectory(node))
                throw createIOError("ENOTDIR");
            if (this._getLinks(node).size !== 0)
                throw createIOError("ENOTEMPTY");
            this._removeLink(parent, links, basename, node);
        };
        /**
         * Link one file to another file (also known as a "hard link").
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.linkSync = function (oldpath, newpath) {
            if (this.isReadonly)
                throw createIOError("EROFS");
            var node = this._walk(this._resolve(oldpath)).node;
            if (!node)
                throw createIOError("ENOENT");
            if (isDirectory(node))
                throw createIOError("EPERM");
            var _a = this._walk(this._resolve(newpath), /*noFollow*/ true), parent = _a.parent, links = _a.links, basename = _a.basename, existingNode = _a.node;
            if (!parent)
                throw createIOError("EPERM");
            if (existingNode)
                throw createIOError("EEXIST");
            this._addLink(parent, links, basename, node);
        };
        /**
         * Remove a directory entry.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.unlinkSync = function (path) {
            if (this.isReadonly)
                throw createIOError("EROFS");
            var _a = this._walk(this._resolve(path), /*noFollow*/ true), parent = _a.parent, links = _a.links, node = _a.node, basename = _a.basename;
            if (!parent)
                throw createIOError("EPERM");
            if (!node)
                throw createIOError("ENOENT");
            if (isDirectory(node))
                throw createIOError("EISDIR");
            this._removeLink(parent, links, basename, node);
        };
        /**
         * Rename a file.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.renameSync = function (oldpath, newpath) {
            if (this.isReadonly)
                throw createIOError("EROFS");
            var _a = this._walk(this._resolve(oldpath), /*noFollow*/ true), oldParent = _a.parent, oldParentLinks = _a.links, node = _a.node, oldBasename = _a.basename;
            if (!oldParent)
                throw createIOError("EPERM");
            if (!node)
                throw createIOError("ENOENT");
            var _b = this._walk(this._resolve(newpath), /*noFollow*/ true), newParent = _b.parent, newParentLinks = _b.links, existingNode = _b.node, newBasename = _b.basename;
            if (!newParent)
                throw createIOError("EPERM");
            var time = this.time();
            if (existingNode) {
                if (isDirectory(node)) {
                    if (!isDirectory(existingNode))
                        throw createIOError("ENOTDIR");
                    if (this._getLinks(existingNode).size > 0)
                        throw createIOError("ENOTEMPTY");
                }
                else {
                    if (isDirectory(existingNode))
                        throw createIOError("EISDIR");
                }
                this._removeLink(newParent, newParentLinks, newBasename, existingNode, time);
            }
            this._replaceLink(oldParent, oldParentLinks, oldBasename, newParent, newParentLinks, newBasename, node, time);
        };
        /**
         * Make a symbolic link.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.symlinkSync = function (target, linkpath) {
            if (this.isReadonly)
                throw createIOError("EROFS");
            var _a = this._walk(this._resolve(linkpath), /*noFollow*/ true), parent = _a.parent, links = _a.links, existingNode = _a.node, basename = _a.basename;
            if (!parent)
                throw createIOError("EPERM");
            if (existingNode)
                throw createIOError("EEXIST");
            var time = this.time();
            var node = this._mknod(parent.dev, S_IFLNK, /*mode*/ 438, time);
            node.symlink = vpath.validate(target, 2016 /* RelativeOrAbsolute */);
            this._addLink(parent, links, basename, node, time);
        };
        /**
         * Resolve a pathname.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.realpathSync = function (path) {
            var realpath = this._walk(this._resolve(path)).realpath;
            return realpath;
        };
        FileSystem.prototype.readFileSync = function (path, encoding) {
            if (encoding === void 0) { encoding = null; }
            var node = this._walk(this._resolve(path)).node;
            if (!node)
                throw createIOError("ENOENT");
            if (isDirectory(node))
                throw createIOError("EISDIR");
            if (!isFile(node))
                throw createIOError("EBADF");
            var buffer = this._getBuffer(node).slice();
            return encoding ? buffer.toString(encoding) : buffer;
        };
        /**
         * Write to a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        FileSystem.prototype.writeFileSync = function (path, data, encoding) {
            if (encoding === void 0) { encoding = null; }
            if (this.isReadonly)
                throw createIOError("EROFS");
            var _a = this._walk(this._resolve(path), /*noFollow*/ false), parent = _a.parent, links = _a.links, existingNode = _a.node, basename = _a.basename;
            if (!parent)
                throw createIOError("EPERM");
            var time = this.time();
            var node = existingNode;
            if (!node) {
                node = this._mknod(parent.dev, S_IFREG, 438, time);
                this._addLink(parent, links, basename, node, time);
            }
            if (isDirectory(node))
                throw createIOError("EISDIR");
            if (!isFile(node))
                throw createIOError("EBADF");
            node.buffer = Buffer.isBuffer(data) ? data.slice() : Buffer.from("" + data, encoding || "utf8");
            node.size = node.buffer.byteLength;
            node.mtimeMs = time;
            node.ctimeMs = time;
        };
        FileSystem.prototype._mknod = function (dev, type, mode, time) {
            if (time === void 0) { time = this.time(); }
            return {
                dev: dev,
                ino: ++inoCount,
                mode: (mode & ~S_IFMT & ~18 & 4095) | (type & S_IFMT),
                atimeMs: time,
                mtimeMs: time,
                ctimeMs: time,
                birthtimeMs: time,
                nlink: 0
            };
        };
        FileSystem.prototype._addLink = function (parent, links, name, node, time) {
            if (time === void 0) { time = this.time(); }
            links.set(name, node);
            node.nlink++;
            node.ctimeMs = time;
            if (parent)
                parent.mtimeMs = time;
            if (!parent && !this._cwd)
                this._cwd = name;
        };
        FileSystem.prototype._removeLink = function (parent, links, name, node, time) {
            if (time === void 0) { time = this.time(); }
            links.delete(name);
            node.nlink--;
            node.ctimeMs = time;
            if (parent)
                parent.mtimeMs = time;
        };
        FileSystem.prototype._replaceLink = function (oldParent, oldLinks, oldName, newParent, newLinks, newName, node, time) {
            if (oldParent !== newParent) {
                this._removeLink(oldParent, oldLinks, oldName, node, time);
                this._addLink(newParent, newLinks, newName, node, time);
            }
            else {
                oldLinks.delete(oldName);
                oldLinks.set(newName, node);
                oldParent.mtimeMs = time;
                newParent.mtimeMs = time;
            }
        };
        FileSystem.prototype._getRootLinks = function () {
            if (!this._lazy.links) {
                this._lazy.links = new collections.SortedMap(this.stringComparer);
                if (this._shadowRoot) {
                    this._copyShadowLinks(this._shadowRoot._getRootLinks(), this._lazy.links);
                }
                this._lazy.links = this._lazy.links;
            }
            return this._lazy.links;
        };
        FileSystem.prototype._getLinks = function (node) {
            if (!node.links) {
                var links = new collections.SortedMap(this.stringComparer);
                var source = node.source, resolver = node.resolver;
                if (source && resolver) {
                    node.source = undefined;
                    node.resolver = undefined;
                    for (var _i = 0, _a = resolver.readdirSync(source); _i < _a.length; _i++) {
                        var name = _a[_i];
                        var path = vpath.combine(source, name);
                        var stats = resolver.statSync(path);
                        switch (stats.mode & S_IFMT) {
                            case S_IFDIR:
                                var dir = this._mknod(node.dev, S_IFDIR, 511);
                                dir.source = vpath.combine(source, name);
                                dir.resolver = resolver;
                                this._addLink(node, links, name, dir);
                                break;
                            case S_IFREG:
                                var file = this._mknod(node.dev, S_IFREG, 438);
                                file.source = vpath.combine(source, name);
                                file.resolver = resolver;
                                file.size = stats.size;
                                this._addLink(node, links, name, file);
                                break;
                        }
                    }
                }
                else if (this._shadowRoot && node.shadowRoot) {
                    this._copyShadowLinks(this._shadowRoot._getLinks(node.shadowRoot), links);
                }
                node.links = links;
            }
            return node.links;
        };
        FileSystem.prototype._getShadow = function (root) {
            var shadows = this._lazy.shadows || (this._lazy.shadows = new Map());
            var shadow = shadows.get(root.ino);
            if (!shadow) {
                shadow = {
                    dev: root.dev,
                    ino: root.ino,
                    mode: root.mode,
                    atimeMs: root.atimeMs,
                    mtimeMs: root.mtimeMs,
                    ctimeMs: root.ctimeMs,
                    birthtimeMs: root.birthtimeMs,
                    nlink: root.nlink,
                    shadowRoot: root
                };
                if (isSymlink(root))
                    shadow.symlink = root.symlink;
                shadows.set(shadow.ino, shadow);
            }
            return shadow;
        };
        FileSystem.prototype._copyShadowLinks = function (source, target) {
            var iterator = collections.getIterator(source);
            try {
                for (var i = collections.nextResult(iterator); i; i = collections.nextResult(iterator)) {
                    var _a = i.value, name = _a[0], root = _a[1];
                    target.set(name, this._getShadow(root));
                }
            }
            finally {
                collections.closeIterator(iterator);
            }
        };
        FileSystem.prototype._getSize = function (node) {
            if (node.buffer)
                return node.buffer.byteLength;
            if (node.size !== undefined)
                return node.size;
            if (node.source && node.resolver)
                return node.size = node.resolver.statSync(node.source).size;
            if (this._shadowRoot && node.shadowRoot)
                return node.size = this._shadowRoot._getSize(node.shadowRoot);
            return 0;
        };
        FileSystem.prototype._getBuffer = function (node) {
            if (!node.buffer) {
                var source = node.source, resolver = node.resolver;
                if (source && resolver) {
                    node.source = undefined;
                    node.resolver = undefined;
                    node.size = undefined;
                    node.buffer = resolver.readFileSync(source);
                }
                else if (this._shadowRoot && node.shadowRoot) {
                    node.buffer = this._shadowRoot._getBuffer(node.shadowRoot);
                }
                else {
                    node.buffer = Buffer.allocUnsafe(0);
                }
            }
            return node.buffer;
        };
        FileSystem.prototype._walk = function (path, noFollow, onError) {
            var links = this._getRootLinks();
            var parent;
            var components = vpath.parse(path);
            var step = 0;
            var depth = 0;
            var retry = false;
            while (true) {
                if (depth >= 40)
                    throw createIOError("ELOOP");
                var lastStep = step === components.length - 1;
                var basename = components[step];
                var node = links.get(basename);
                if (lastStep && (noFollow || !isSymlink(node))) {
                    return { realpath: vpath.format(components), basename: basename, parent: parent, links: links, node: node };
                }
                if (node === undefined) {
                    if (trapError(createIOError("ENOENT"), node))
                        continue;
                    return undefined;
                }
                if (isSymlink(node)) {
                    var dirname = vpath.format(components.slice(0, step));
                    var symlink = vpath.resolve(dirname, node.symlink);
                    links = this._getRootLinks();
                    parent = undefined;
                    components = vpath.parse(symlink).concat(components.slice(step + 1));
                    step = 0;
                    depth++;
                    retry = false;
                    continue;
                }
                if (isDirectory(node)) {
                    links = this._getLinks(node);
                    parent = node;
                    step++;
                    retry = false;
                    continue;
                }
                if (trapError(createIOError("ENOTDIR"), node))
                    continue;
                return undefined;
            }
            function trapError(error, node) {
                var realpath = vpath.format(components.slice(0, step + 1));
                var basename = components[step];
                var result = !retry && onError ? onError(error, { realpath: realpath, basename: basename, parent: parent, links: links, node: node }) : "throw";
                if (result === "stop")
                    return false;
                if (result === "retry") {
                    retry = true;
                    return true;
                }
                throw error;
            }
        };
        /**
         * Resolve a path relative to the current working directory.
         */
        FileSystem.prototype._resolve = function (path) {
            return this._cwd
                ? vpath.resolve(this._cwd, vpath.validate(path, 2016 /* RelativeOrAbsolute */ | 2048 /* AllowWildcard */))
                : vpath.validate(path, 2017 /* Absolute */ | 2048 /* AllowWildcard */);
        };
        FileSystem.prototype._applyFiles = function (files, dirname) {
            var deferred = [];
            this._applyFilesWorker(files, dirname, deferred);
            for (var _i = 0, deferred_1 = deferred; _i < deferred_1.length; _i++) {
                var _a = deferred_1[_i], entry = _a[0], path = _a[1];
                this.mkdirpSync(vpath.dirname(path));
                this.pushd(vpath.dirname(path));
                if (entry instanceof Symlink) {
                    if (this.stringComparer(vpath.dirname(path), path) === 0) {
                        throw new TypeError("Roots cannot be symbolic links.");
                    }
                    this.symlinkSync(entry.symlink, path);
                    this._applyFileExtendedOptions(path, entry);
                }
                else if (entry instanceof Link) {
                    if (this.stringComparer(vpath.dirname(path), path) === 0) {
                        throw new TypeError("Roots cannot be hard links.");
                    }
                    this.linkSync(entry.path, path);
                }
                else {
                    this.mountSync(entry.source, path, entry.resolver);
                    this._applyFileExtendedOptions(path, entry);
                }
                this.popd();
            }
        };
        FileSystem.prototype._applyFileExtendedOptions = function (path, entry) {
            var meta = entry.meta;
            if (meta !== undefined) {
                var filemeta = this.filemeta(path);
                for (var _i = 0, _a = Object.keys(meta); _i < _a.length; _i++) {
                    var key = _a[_i];
                    filemeta.set(key, meta[key]);
                }
            }
        };
        FileSystem.prototype._applyFilesWorker = function (files, dirname, deferred) {
            for (var _i = 0, _a = Object.keys(files); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = this._normalizeFileSetEntry(files[key]);
                var path = dirname ? vpath.resolve(dirname, key) : key;
                vpath.validate(path, 2017 /* Absolute */);
                if (value === null || value === undefined) {
                    if (this.stringComparer(vpath.dirname(path), path) === 0) {
                        throw new TypeError("Roots cannot be deleted.");
                    }
                    this.rimrafSync(path);
                }
                else if (value instanceof File) {
                    if (this.stringComparer(vpath.dirname(path), path) === 0) {
                        throw new TypeError("Roots cannot be files.");
                    }
                    this.mkdirpSync(vpath.dirname(path));
                    this.writeFileSync(path, value.data, value.encoding);
                    this._applyFileExtendedOptions(path, value);
                }
                else if (value instanceof Directory) {
                    this.mkdirpSync(path);
                    this._applyFileExtendedOptions(path, value);
                    this._applyFilesWorker(value.files, path, deferred);
                }
                else {
                    deferred.push([value, path]);
                }
            }
        };
        FileSystem.prototype._normalizeFileSetEntry = function (value) {
            if (value === undefined ||
                value === null ||
                value instanceof Directory ||
                value instanceof File ||
                value instanceof Link ||
                value instanceof Symlink ||
                value instanceof Mount) {
                return value;
            }
            return typeof value === "string" || Buffer.isBuffer(value) ? new File(value) : new Directory(value);
        };
        return FileSystem;
    }());
    vfs.FileSystem = FileSystem;
    function createResolver(host) {
        return {
            readdirSync: function (path) {
                var _a = host.getAccessibleFileSystemEntries(path), files = _a.files, directories = _a.directories;
                return directories.concat(files);
            },
            statSync: function (path) {
                if (host.directoryExists(path)) {
                    return { mode: S_IFDIR | 511, size: 0 };
                }
                else if (host.fileExists(path)) {
                    return { mode: S_IFREG | 438, size: host.getFileSize(path) };
                }
                else {
                    throw new Error("ENOENT: path does not exist");
                }
            },
            readFileSync: function (path) {
                return Buffer.from(host.readFile(path), "utf8"); // TODO: GH#18217
            }
        };
    }
    vfs.createResolver = createResolver;
    /**
     * Create a virtual file system from a physical file system using the following path mappings:
     *
     *  - `/.ts` is a directory mapped to `${workspaceRoot}/built/local`
     *  - `/.lib` is a directory mapped to `${workspaceRoot}/tests/lib`
     *  - `/.src` is a virtual directory to be used for tests.
     *
     * Unless overridden, `/.src` will be the current working directory for the virtual file system.
     */
    function createFromFileSystem(host, ignoreCase, _a) {
        var _b = _a === void 0 ? {} : _a, documents = _b.documents, cwd = _b.cwd;
        var fs = getBuiltLocal(host, ignoreCase).shadow();
        if (cwd) {
            fs.mkdirpSync(cwd);
            fs.chdir(cwd);
        }
        if (documents) {
            for (var _i = 0, documents_1 = documents; _i < documents_1.length; _i++) {
                var document = documents_1[_i];
                fs.mkdirpSync(vpath.dirname(document.file));
                fs.writeFileSync(document.file, document.text, "utf8");
                fs.filemeta(document.file).set("document", document);
                // Add symlinks
                var symlink = document.meta.get("symlink");
                if (symlink) {
                    for (var _c = 0, _d = symlink.split(",").map(function (link) { return link.trim(); }); _c < _d.length; _c++) {
                        var link = _d[_c];
                        fs.mkdirpSync(vpath.dirname(link));
                        fs.symlinkSync(document.file, link);
                        fs.filemeta(link).set("document", document);
                    }
                }
            }
        }
        return fs;
    }
    vfs.createFromFileSystem = createFromFileSystem;
    var Stats = /** @class */ (function () {
        function Stats(dev, ino, mode, nlink, rdev, size, blksize, blocks, atimeMs, mtimeMs, ctimeMs, birthtimeMs) {
            if (dev === void 0) { dev = 0; }
            if (ino === void 0) { ino = 0; }
            if (mode === void 0) { mode = 0; }
            if (nlink === void 0) { nlink = 0; }
            if (rdev === void 0) { rdev = 0; }
            if (size === void 0) { size = 0; }
            if (blksize === void 0) { blksize = 0; }
            if (blocks === void 0) { blocks = 0; }
            if (atimeMs === void 0) { atimeMs = 0; }
            if (mtimeMs === void 0) { mtimeMs = 0; }
            if (ctimeMs === void 0) { ctimeMs = 0; }
            if (birthtimeMs === void 0) { birthtimeMs = 0; }
            this.dev = dev;
            this.ino = ino;
            this.mode = mode;
            this.nlink = nlink;
            this.uid = 0;
            this.gid = 0;
            this.rdev = rdev;
            this.size = size;
            this.blksize = blksize;
            this.blocks = blocks;
            this.atimeMs = atimeMs;
            this.mtimeMs = mtimeMs;
            this.ctimeMs = ctimeMs;
            this.birthtimeMs = birthtimeMs;
            this.atime = new Date(this.atimeMs);
            this.mtime = new Date(this.mtimeMs);
            this.ctime = new Date(this.ctimeMs);
            this.birthtime = new Date(this.birthtimeMs);
        }
        Stats.prototype.isFile = function () { return (this.mode & S_IFMT) === S_IFREG; };
        Stats.prototype.isDirectory = function () { return (this.mode & S_IFMT) === S_IFDIR; };
        Stats.prototype.isSymbolicLink = function () { return (this.mode & S_IFMT) === S_IFLNK; };
        Stats.prototype.isBlockDevice = function () { return (this.mode & S_IFMT) === S_IFBLK; };
        Stats.prototype.isCharacterDevice = function () { return (this.mode & S_IFMT) === S_IFCHR; };
        Stats.prototype.isFIFO = function () { return (this.mode & S_IFMT) === S_IFIFO; };
        Stats.prototype.isSocket = function () { return (this.mode & S_IFMT) === S_IFSOCK; };
        return Stats;
    }());
    vfs.Stats = Stats;
    // tslint:disable-next-line:variable-name
    vfs.IOErrorMessages = Object.freeze({
        EACCES: "access denied",
        EIO: "an I/O error occurred",
        ENOENT: "no such file or directory",
        EEXIST: "file already exists",
        ELOOP: "too many symbolic links encountered",
        ENOTDIR: "no such directory",
        EISDIR: "path is a directory",
        EBADF: "invalid file descriptor",
        EINVAL: "invalid value",
        ENOTEMPTY: "directory not empty",
        EPERM: "operation not permitted",
        EROFS: "file system is read-only"
    });
    function createIOError(code, details) {
        if (details === void 0) { details = ""; }
        var err = new Error(code + ": " + vfs.IOErrorMessages[code] + " " + details);
        err.code = code;
        if (Error.captureStackTrace)
            Error.captureStackTrace(err, createIOError);
        return err;
    }
    vfs.createIOError = createIOError;
    /** Extended options for a directory in a `FileSet` */
    var Directory = /** @class */ (function () {
        function Directory(files, _a) {
            var meta = (_a === void 0 ? {} : _a).meta;
            this.files = files;
            this.meta = meta;
        }
        return Directory;
    }());
    vfs.Directory = Directory;
    /** Extended options for a file in a `FileSet` */
    var File = /** @class */ (function () {
        function File(data, _a) {
            var _b = _a === void 0 ? {} : _a, meta = _b.meta, encoding = _b.encoding;
            this.data = data;
            this.encoding = encoding;
            this.meta = meta;
        }
        return File;
    }());
    vfs.File = File;
    /** Extended options for a hard link in a `FileSet` */
    var Link = /** @class */ (function () {
        function Link(path) {
            this.path = path;
        }
        return Link;
    }());
    vfs.Link = Link;
    /** Extended options for a symbolic link in a `FileSet` */
    var Symlink = /** @class */ (function () {
        function Symlink(symlink, _a) {
            var meta = (_a === void 0 ? {} : _a).meta;
            this.symlink = symlink;
            this.meta = meta;
        }
        return Symlink;
    }());
    vfs.Symlink = Symlink;
    /** Extended options for mounting a virtual copy of an external file system via a `FileSet` */
    var Mount = /** @class */ (function () {
        function Mount(source, resolver, _a) {
            var meta = (_a === void 0 ? {} : _a).meta;
            this.source = source;
            this.resolver = resolver;
            this.meta = meta;
        }
        return Mount;
    }());
    vfs.Mount = Mount;
    function isFile(node) {
        return node !== undefined && (node.mode & S_IFMT) === S_IFREG;
    }
    function isDirectory(node) {
        return node !== undefined && (node.mode & S_IFMT) === S_IFDIR;
    }
    function isSymlink(node) {
        return node !== undefined && (node.mode & S_IFMT) === S_IFLNK;
    }
    var builtLocalHost;
    var builtLocalCI;
    var builtLocalCS;
    function getBuiltLocal(host, ignoreCase) {
        var _a;
        if (builtLocalHost !== host) {
            builtLocalCI = undefined;
            builtLocalCS = undefined;
            builtLocalHost = host;
        }
        if (!builtLocalCI) {
            var resolver = createResolver(host);
            builtLocalCI = new FileSystem(/*ignoreCase*/ true, {
                files: (_a = {},
                    _a[vfs.builtFolder] = new Mount(vpath.resolve(host.getWorkspaceRoot(), "built/local"), resolver),
                    _a[vfs.testLibFolder] = new Mount(vpath.resolve(host.getWorkspaceRoot(), "tests/lib"), resolver),
                    _a[vfs.projectsFolder] = new Mount(vpath.resolve(host.getWorkspaceRoot(), "tests/projects"), resolver),
                    _a[vfs.srcFolder] = {},
                    _a),
                cwd: vfs.srcFolder,
                meta: { defaultLibLocation: vfs.builtFolder }
            });
            builtLocalCI.makeReadonly();
        }
        if (ignoreCase)
            return builtLocalCI;
        if (!builtLocalCS) {
            builtLocalCS = builtLocalCI.shadow(/*ignoreCase*/ false);
            builtLocalCS.makeReadonly();
        }
        return builtLocalCS;
    }
})(vfs || (vfs = {}));
// tslint:enable:no-null-keyword
/**
 * Test harness compiler functionality.
 */
var compiler;
(function (compiler) {
    function readProject(host, project, existingOptions) {
        if (project) {
            project = vpath.isTsConfigFile(project) ? project : vpath.combine(project, "tsconfig.json");
        }
        else {
            project = host.vfs.scanSync(".", "ancestors-or-self", {
                accept: function (path, stats) { return stats.isFile() && host.vfs.stringComparer(vpath.basename(path), "tsconfig.json") === 0; }
            })[0];
        }
        if (project) {
            // TODO(rbuckton): Do we need to resolve this? Resolving breaks projects tests.
            // project = vpath.resolve(host.vfs.currentDirectory, project);
            // read the config file
            var readResult = ts.readConfigFile(project, function (path) { return host.readFile(path); });
            if (readResult.error) {
                return { file: project, errors: [readResult.error] };
            }
            // parse the config file
            var config = ts.parseJsonConfigFileContent(readResult.config, host, vpath.dirname(project), existingOptions);
            return { file: project, errors: config.errors, config: config };
        }
    }
    compiler.readProject = readProject;
    var CompilationResult = /** @class */ (function () {
        function CompilationResult(host, options, program, result, diagnostics) {
            this._inputs = [];
            this.host = host;
            this.program = program;
            this.result = result;
            this.diagnostics = diagnostics;
            this.options = program ? program.getCompilerOptions() : options;
            // collect outputs
            var js = this.js = new collections.SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
            var dts = this.dts = new collections.SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
            var maps = this.maps = new collections.SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
            for (var _i = 0, _a = this.host.outputs; _i < _a.length; _i++) {
                var document = _a[_i];
                if (vpath.isJavaScript(document.file) || ts.fileExtensionIs(document.file, ".json" /* Json */)) {
                    js.set(document.file, document);
                }
                else if (vpath.isDeclaration(document.file)) {
                    dts.set(document.file, document);
                }
                else if (vpath.isSourceMap(document.file)) {
                    maps.set(document.file, document);
                }
            }
            // correlate inputs and outputs
            this._inputsAndOutputs = new collections.SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
            if (program) {
                if (this.options.out || this.options.outFile) {
                    var outFile = vpath.resolve(this.vfs.cwd(), this.options.outFile || this.options.out);
                    var inputs = [];
                    for (var _b = 0, _c = program.getSourceFiles(); _b < _c.length; _b++) {
                        var sourceFile = _c[_b];
                        if (sourceFile) {
                            var input = new documents.TextDocument(sourceFile.fileName, sourceFile.text);
                            this._inputs.push(input);
                            if (!vpath.isDeclaration(sourceFile.fileName)) {
                                inputs.push(input);
                            }
                        }
                    }
                    var outputs = {
                        inputs: inputs,
                        js: js.get(outFile),
                        dts: dts.get(vpath.changeExtension(outFile, ".d.ts")),
                        map: maps.get(outFile + ".map")
                    };
                    if (outputs.js)
                        this._inputsAndOutputs.set(outputs.js.file, outputs);
                    if (outputs.dts)
                        this._inputsAndOutputs.set(outputs.dts.file, outputs);
                    if (outputs.map)
                        this._inputsAndOutputs.set(outputs.map.file, outputs);
                    for (var _d = 0, inputs_1 = inputs; _d < inputs_1.length; _d++) {
                        var input = inputs_1[_d];
                        this._inputsAndOutputs.set(input.file, outputs);
                    }
                }
                else {
                    for (var _e = 0, _f = program.getSourceFiles(); _e < _f.length; _e++) {
                        var sourceFile = _f[_e];
                        if (sourceFile) {
                            var input = new documents.TextDocument(sourceFile.fileName, sourceFile.text);
                            this._inputs.push(input);
                            if (!vpath.isDeclaration(sourceFile.fileName)) {
                                var extname = ts.getOutputExtension(sourceFile, this.options);
                                var outputs = {
                                    inputs: [input],
                                    js: js.get(this.getOutputPath(sourceFile.fileName, extname)),
                                    dts: dts.get(this.getOutputPath(sourceFile.fileName, ".d.ts")),
                                    map: maps.get(this.getOutputPath(sourceFile.fileName, extname + ".map"))
                                };
                                this._inputsAndOutputs.set(sourceFile.fileName, outputs);
                                if (outputs.js)
                                    this._inputsAndOutputs.set(outputs.js.file, outputs);
                                if (outputs.dts)
                                    this._inputsAndOutputs.set(outputs.dts.file, outputs);
                                if (outputs.map)
                                    this._inputsAndOutputs.set(outputs.map.file, outputs);
                            }
                        }
                    }
                }
            }
            this.diagnostics = diagnostics;
        }
        Object.defineProperty(CompilationResult.prototype, "vfs", {
            get: function () {
                return this.host.vfs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompilationResult.prototype, "inputs", {
            get: function () {
                return this._inputs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompilationResult.prototype, "outputs", {
            get: function () {
                return this.host.outputs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompilationResult.prototype, "traces", {
            get: function () {
                return this.host.traces;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompilationResult.prototype, "emitSkipped", {
            get: function () {
                return this.result && this.result.emitSkipped || false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompilationResult.prototype, "singleFile", {
            get: function () {
                return !!this.options.outFile || !!this.options.out;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompilationResult.prototype, "commonSourceDirectory", {
            get: function () {
                var common = this.program && this.program.getCommonSourceDirectory() || "";
                return common && vpath.combine(this.vfs.cwd(), common);
            },
            enumerable: true,
            configurable: true
        });
        CompilationResult.prototype.getInputsAndOutputs = function (path) {
            return this._inputsAndOutputs.get(vpath.resolve(this.vfs.cwd(), path));
        };
        CompilationResult.prototype.getInputs = function (path) {
            var outputs = this.getInputsAndOutputs(path);
            return outputs && outputs.inputs;
        };
        CompilationResult.prototype.getOutput = function (path, kind) {
            var outputs = this.getInputsAndOutputs(path);
            return outputs && outputs[kind];
        };
        CompilationResult.prototype.getSourceMapRecord = function () {
            if (this.result.sourceMaps && this.result.sourceMaps.length > 0) {
                return Harness.SourceMapRecorder.getSourceMapRecord(this.result.sourceMaps, this.program, Array.from(this.js.values()).filter(function (d) { return !ts.fileExtensionIs(d.file, ".json" /* Json */); }), Array.from(this.dts.values()));
            }
        };
        CompilationResult.prototype.getSourceMap = function (path) {
            if (this.options.noEmit || vpath.isDeclaration(path))
                return undefined;
            if (this.options.inlineSourceMap) {
                var document = this.getOutput(path, "js");
                return document && documents.SourceMap.fromSource(document.text);
            }
            if (this.options.sourceMap) {
                var document = this.getOutput(path, "map");
                return document && new documents.SourceMap(document.file, document.text);
            }
        };
        CompilationResult.prototype.getOutputPath = function (path, ext) {
            if (this.options.outFile || this.options.out) {
                path = vpath.resolve(this.vfs.cwd(), this.options.outFile || this.options.out);
            }
            else {
                path = vpath.resolve(this.vfs.cwd(), path);
                var outDir = ext === ".d.ts" ? this.options.declarationDir || this.options.outDir : this.options.outDir;
                if (outDir) {
                    var common = this.commonSourceDirectory;
                    if (common) {
                        path = vpath.relative(common, path, this.vfs.ignoreCase);
                        path = vpath.combine(vpath.resolve(this.vfs.cwd(), this.options.outDir), path);
                    }
                }
            }
            return vpath.changeExtension(path, ext);
        };
        CompilationResult.prototype.getNumberOfJsFiles = function () {
            var count = this.js.size;
            this.js.forEach(function (document) {
                if (ts.fileExtensionIs(document.file, ".json" /* Json */)) {
                    count--;
                }
            });
            return count;
        };
        return CompilationResult;
    }());
    compiler.CompilationResult = CompilationResult;
    function compileFiles(host, rootFiles, compilerOptions) {
        if (compilerOptions.project || !rootFiles || rootFiles.length === 0) {
            var project = readProject(host.parseConfigHost, compilerOptions.project, compilerOptions);
            if (project) {
                if (project.errors && project.errors.length > 0) {
                    return new CompilationResult(host, compilerOptions, /*program*/ undefined, /*result*/ undefined, project.errors);
                }
                if (project.config) {
                    rootFiles = project.config.fileNames;
                    compilerOptions = project.config.options;
                }
            }
            delete compilerOptions.project;
        }
        // establish defaults (aligns with old harness)
        if (compilerOptions.target === undefined)
            compilerOptions.target = 0 /* ES3 */;
        if (compilerOptions.newLine === undefined)
            compilerOptions.newLine = 0 /* CarriageReturnLineFeed */;
        if (compilerOptions.skipDefaultLibCheck === undefined)
            compilerOptions.skipDefaultLibCheck = true;
        if (compilerOptions.noErrorTruncation === undefined)
            compilerOptions.noErrorTruncation = true;
        var program = ts.createProgram(rootFiles || [], compilerOptions, host);
        var emitResult = program.emit();
        var errors = ts.getPreEmitDiagnostics(program);
        return new CompilationResult(host, compilerOptions, program, emitResult, errors);
    }
    compiler.compileFiles = compileFiles;
})(compiler || (compiler = {}));
var evaluator;
(function (evaluator) {
    var sourceFile = vpath.combine(vfs.srcFolder, "source.ts");
    function compile(sourceText, options) {
        var fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false);
        fs.writeFileSync(sourceFile, sourceText);
        var compilerOptions = __assign({ target: 1 /* ES5 */, module: ts.ModuleKind.CommonJS, lib: ["lib.esnext.d.ts", "lib.dom.d.ts"] }, options);
        var host = new fakes.CompilerHost(fs, compilerOptions);
        return compiler.compileFiles(host, [sourceFile], compilerOptions);
    }
    function noRequire(id) {
        throw new Error("Module '" + id + "' could not be found.");
    }
    // Define a custom "Symbol" constructor to attach missing built-in symbols without
    // modifying the global "Symbol" constructor
    // tslint:disable-next-line:variable-name
    var FakeSymbol = (function (description) { return Symbol(description); });
    FakeSymbol.prototype = Symbol.prototype;
    for (var _i = 0, _a = Object.getOwnPropertyNames(Symbol); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(FakeSymbol, key, Object.getOwnPropertyDescriptor(Symbol, key));
    }
    // Add "asyncIterator" if missing
    if (!ts.hasProperty(FakeSymbol, "asyncIterator"))
        Object.defineProperty(FakeSymbol, "asyncIterator", { value: Symbol.for("Symbol.asyncIterator"), configurable: true });
    function evaluate(result, globals) {
        globals = __assign({ Symbol: FakeSymbol }, globals);
        if (ts.some(result.diagnostics)) {
            assert.ok(/*value*/ false, "Syntax error in evaluation source text:\n" + ts.formatDiagnostics(result.diagnostics, {
                getCanonicalFileName: function (file) { return file; },
                getCurrentDirectory: function () { return ""; },
                getNewLine: function () { return "\n"; }
            }));
        }
        var output = result.getOutput(sourceFile, "js");
        assert.isDefined(output);
        var globalNames = [];
        var globalArgs = [];
        for (var name in globals) {
            if (ts.hasProperty(globals, name)) {
                globalNames.push(name);
                globalArgs.push(globals[name]);
            }
        }
        var evaluateText = "(function (module, exports, require, __dirname, __filename, " + globalNames.join(", ") + ") { " + output.text + " })";
        var evaluateThunk = eval(evaluateText);
        var module = { exports: {} };
        evaluateThunk.call.apply(evaluateThunk, [globals, module, module.exports, noRequire, vpath.dirname(output.file), output.file, FakeSymbol].concat(globalArgs));
        return module.exports;
    }
    function evaluateTypeScript(sourceText, options, globals) {
        return evaluate(compile(sourceText, options), globals);
    }
    evaluator.evaluateTypeScript = evaluateTypeScript;
})(evaluator || (evaluator = {}));
/**
 * Fake implementations of various compiler dependencies.
 */
var fakes;
(function (fakes) {
    var processExitSentinel = new Error("System exit");
    /**
     * A fake `ts.System` that leverages a virtual file system.
     */
    var System = /** @class */ (function () {
        function System(vfs, _a) {
            var _b = _a === void 0 ? {} : _a, executingFilePath = _b.executingFilePath, _c = _b.newLine, newLine = _c === void 0 ? "\r\n" : _c, env = _b.env;
            this.args = [];
            this.output = [];
            this.vfs = vfs.isReadonly ? vfs.shadow() : vfs;
            this.useCaseSensitiveFileNames = !this.vfs.ignoreCase;
            this.newLine = newLine;
            this._executingFilePath = executingFilePath;
            this._env = env;
        }
        System.prototype.write = function (message) {
            this.output.push(message);
        };
        System.prototype.readFile = function (path) {
            try {
                var content = this.vfs.readFileSync(path, "utf8");
                return content === undefined ? undefined : utils.removeByteOrderMark(content);
            }
            catch (_a) {
                return undefined;
            }
        };
        System.prototype.writeFile = function (path, data, writeByteOrderMark) {
            this.vfs.mkdirpSync(vpath.dirname(path));
            this.vfs.writeFileSync(path, writeByteOrderMark ? utils.addUTF8ByteOrderMark(data) : data);
        };
        System.prototype.deleteFile = function (path) {
            this.vfs.unlinkSync(path);
        };
        System.prototype.fileExists = function (path) {
            var stats = this._getStats(path);
            return stats ? stats.isFile() : false;
        };
        System.prototype.directoryExists = function (path) {
            var stats = this._getStats(path);
            return stats ? stats.isDirectory() : false;
        };
        System.prototype.createDirectory = function (path) {
            this.vfs.mkdirpSync(path);
        };
        System.prototype.getCurrentDirectory = function () {
            return this.vfs.cwd();
        };
        System.prototype.getDirectories = function (path) {
            var result = [];
            try {
                for (var _i = 0, _a = this.vfs.readdirSync(path); _i < _a.length; _i++) {
                    var file = _a[_i];
                    if (this.vfs.statSync(vpath.combine(path, file)).isDirectory()) {
                        result.push(file);
                    }
                }
            }
            catch ( /*ignore*/_b) { /*ignore*/ }
            return result;
        };
        System.prototype.readDirectory = function (path, extensions, exclude, include, depth) {
            var _this = this;
            return ts.matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), depth, function (path) { return _this.getAccessibleFileSystemEntries(path); });
        };
        System.prototype.getAccessibleFileSystemEntries = function (path) {
            var files = [];
            var directories = [];
            try {
                for (var _i = 0, _a = this.vfs.readdirSync(path); _i < _a.length; _i++) {
                    var file = _a[_i];
                    try {
                        var stats = this.vfs.statSync(vpath.combine(path, file));
                        if (stats.isFile()) {
                            files.push(file);
                        }
                        else if (stats.isDirectory()) {
                            directories.push(file);
                        }
                    }
                    catch ( /*ignored*/_b) { /*ignored*/ }
                }
            }
            catch ( /*ignored*/_c) { /*ignored*/ }
            return { files: files, directories: directories };
        };
        System.prototype.exit = function (exitCode) {
            this.exitCode = exitCode;
            throw processExitSentinel;
        };
        System.prototype.getFileSize = function (path) {
            var stats = this._getStats(path);
            return stats && stats.isFile() ? stats.size : 0;
        };
        System.prototype.resolvePath = function (path) {
            return vpath.resolve(this.vfs.cwd(), path);
        };
        System.prototype.getExecutingFilePath = function () {
            if (this._executingFilePath === undefined)
                return ts.notImplemented();
            return this._executingFilePath;
        };
        System.prototype.getModifiedTime = function (path) {
            var stats = this._getStats(path);
            return stats ? stats.mtime : undefined; // TODO: GH#18217
        };
        System.prototype.setModifiedTime = function (path, time) {
            this.vfs.utimesSync(path, time, time);
        };
        System.prototype.createHash = function (data) {
            return data;
        };
        System.prototype.realpath = function (path) {
            try {
                return this.vfs.realpathSync(path);
            }
            catch (_a) {
                return path;
            }
        };
        System.prototype.getEnvironmentVariable = function (name) {
            return (this._env && this._env[name]); // TODO: GH#18217
        };
        System.prototype._getStats = function (path) {
            try {
                return this.vfs.existsSync(path) ? this.vfs.statSync(path) : undefined;
            }
            catch (_a) {
                return undefined;
            }
        };
        return System;
    }());
    fakes.System = System;
    /**
     * A fake `ts.ParseConfigHost` that leverages a virtual file system.
     */
    var ParseConfigHost = /** @class */ (function () {
        function ParseConfigHost(sys) {
            if (sys instanceof vfs.FileSystem)
                sys = new System(sys);
            this.sys = sys;
        }
        Object.defineProperty(ParseConfigHost.prototype, "vfs", {
            get: function () {
                return this.sys.vfs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParseConfigHost.prototype, "useCaseSensitiveFileNames", {
            get: function () {
                return this.sys.useCaseSensitiveFileNames;
            },
            enumerable: true,
            configurable: true
        });
        ParseConfigHost.prototype.fileExists = function (fileName) {
            return this.sys.fileExists(fileName);
        };
        ParseConfigHost.prototype.directoryExists = function (directoryName) {
            return this.sys.directoryExists(directoryName);
        };
        ParseConfigHost.prototype.readFile = function (path) {
            return this.sys.readFile(path);
        };
        ParseConfigHost.prototype.readDirectory = function (path, extensions, excludes, includes, depth) {
            return this.sys.readDirectory(path, extensions, excludes, includes, depth);
        };
        return ParseConfigHost;
    }());
    fakes.ParseConfigHost = ParseConfigHost;
    /**
     * A fake `ts.CompilerHost` that leverages a virtual file system.
     */
    var CompilerHost = /** @class */ (function () {
        function CompilerHost(sys, options, setParentNodes) {
            if (options === void 0) { options = ts.getDefaultCompilerOptions(); }
            if (setParentNodes === void 0) { setParentNodes = false; }
            var _this = this;
            this.outputs = [];
            this.traces = [];
            this.shouldAssertInvariants = !Harness.lightMode;
            if (sys instanceof vfs.FileSystem)
                sys = new System(sys);
            this.sys = sys;
            this.defaultLibLocation = sys.vfs.meta.get("defaultLibLocation") || "";
            this._newLine = ts.getNewLineCharacter(options, function () { return _this.sys.newLine; });
            this._sourceFiles = new collections.SortedMap({ comparer: sys.vfs.stringComparer, sort: "insertion" });
            this._setParentNodes = setParentNodes;
            this._outputsMap = new collections.SortedMap(this.vfs.stringComparer);
        }
        Object.defineProperty(CompilerHost.prototype, "vfs", {
            get: function () {
                return this.sys.vfs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompilerHost.prototype, "parseConfigHost", {
            get: function () {
                return this._parseConfigHost || (this._parseConfigHost = new ParseConfigHost(this.sys));
            },
            enumerable: true,
            configurable: true
        });
        CompilerHost.prototype.getCurrentDirectory = function () {
            return this.sys.getCurrentDirectory();
        };
        CompilerHost.prototype.useCaseSensitiveFileNames = function () {
            return this.sys.useCaseSensitiveFileNames;
        };
        CompilerHost.prototype.getNewLine = function () {
            return this._newLine;
        };
        CompilerHost.prototype.getCanonicalFileName = function (fileName) {
            return this.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        };
        CompilerHost.prototype.deleteFile = function (fileName) {
            this.sys.deleteFile(fileName);
        };
        CompilerHost.prototype.fileExists = function (fileName) {
            return this.sys.fileExists(fileName);
        };
        CompilerHost.prototype.directoryExists = function (directoryName) {
            return this.sys.directoryExists(directoryName);
        };
        CompilerHost.prototype.getModifiedTime = function (fileName) {
            return this.sys.getModifiedTime(fileName);
        };
        CompilerHost.prototype.setModifiedTime = function (fileName, time) {
            return this.sys.setModifiedTime(fileName, time);
        };
        CompilerHost.prototype.getDirectories = function (path) {
            return this.sys.getDirectories(path);
        };
        CompilerHost.prototype.readDirectory = function (path, extensions, exclude, include, depth) {
            return this.sys.readDirectory(path, extensions, exclude, include, depth);
        };
        CompilerHost.prototype.readFile = function (path) {
            return this.sys.readFile(path);
        };
        CompilerHost.prototype.writeFile = function (fileName, content, writeByteOrderMark) {
            if (writeByteOrderMark)
                content = utils.addUTF8ByteOrderMark(content);
            this.sys.writeFile(fileName, content);
            var document = new documents.TextDocument(fileName, content);
            document.meta.set("fileName", fileName);
            this.vfs.filemeta(fileName).set("document", document);
            if (!this._outputsMap.has(document.file)) {
                this._outputsMap.set(document.file, this.outputs.length);
                this.outputs.push(document);
            }
            this.outputs[this._outputsMap.get(document.file)] = document;
        };
        CompilerHost.prototype.trace = function (s) {
            this.traces.push(s);
        };
        CompilerHost.prototype.realpath = function (path) {
            return this.sys.realpath(path);
        };
        CompilerHost.prototype.getDefaultLibLocation = function () {
            return vpath.resolve(this.getCurrentDirectory(), this.defaultLibLocation);
        };
        CompilerHost.prototype.getDefaultLibFileName = function (options) {
            return vpath.resolve(this.getDefaultLibLocation(), ts.getDefaultLibFileName(options));
        };
        CompilerHost.prototype.getSourceFile = function (fileName, languageVersion) {
            var canonicalFileName = this.getCanonicalFileName(vpath.resolve(this.getCurrentDirectory(), fileName));
            var existing = this._sourceFiles.get(canonicalFileName);
            if (existing)
                return existing;
            var content = this.readFile(canonicalFileName);
            if (content === undefined)
                return undefined;
            // A virtual file system may shadow another existing virtual file system. This
            // allows us to reuse a common virtual file system structure across multiple
            // tests. If a virtual file is a shadow, it is likely that the file will be
            // reused across multiple tests. In that case, we cache the SourceFile we parse
            // so that it can be reused across multiple tests to avoid the cost of
            // repeatedly parsing the same file over and over (such as lib.d.ts).
            var cacheKey = this.vfs.shadowRoot && "SourceFile[languageVersion=" + languageVersion + ",setParentNodes=" + this._setParentNodes + "]";
            if (cacheKey) {
                var meta = this.vfs.filemeta(canonicalFileName);
                var sourceFileFromMetadata = meta.get(cacheKey);
                if (sourceFileFromMetadata && sourceFileFromMetadata.getFullText() === content) {
                    this._sourceFiles.set(canonicalFileName, sourceFileFromMetadata);
                    return sourceFileFromMetadata;
                }
            }
            var parsed = ts.createSourceFile(fileName, content, languageVersion, this._setParentNodes || this.shouldAssertInvariants);
            if (this.shouldAssertInvariants) {
                Utils.assertInvariants(parsed, /*parent*/ undefined);
            }
            this._sourceFiles.set(canonicalFileName, parsed);
            if (cacheKey) {
                // store the cached source file on the unshadowed file with the same version.
                var stats = this.vfs.statSync(canonicalFileName);
                var fs = this.vfs;
                while (fs.shadowRoot) {
                    try {
                        var shadowRootStats = fs.shadowRoot.existsSync(canonicalFileName) ? fs.shadowRoot.statSync(canonicalFileName) : undefined; // TODO: GH#18217
                        if (shadowRootStats.dev !== stats.dev ||
                            shadowRootStats.ino !== stats.ino ||
                            shadowRootStats.mtimeMs !== stats.mtimeMs) {
                            break;
                        }
                        fs = fs.shadowRoot;
                    }
                    catch (_a) {
                        break;
                    }
                }
                if (fs !== this.vfs) {
                    fs.filemeta(canonicalFileName).set(cacheKey, parsed);
                }
            }
            return parsed;
        };
        return CompilerHost;
    }());
    fakes.CompilerHost = CompilerHost;
})(fakes || (fakes = {}));
var ts;
(function (ts) {
    var server;
    (function (server) {
        /* @internal */
        function extractMessage(message) {
            // Read the content length
            var contentLengthPrefix = "Content-Length: ";
            var lines = message.split(/\r?\n/);
            ts.Debug.assert(lines.length >= 2, "Malformed response: Expected 3 lines in the response.");
            var contentLengthText = lines[0];
            ts.Debug.assert(contentLengthText.indexOf(contentLengthPrefix) === 0, "Malformed response: Response text did not contain content-length header.");
            var contentLength = parseInt(contentLengthText.substring(contentLengthPrefix.length));
            // Read the body
            var responseBody = lines[2];
            // Verify content length
            ts.Debug.assert(responseBody.length + 1 === contentLength, "Malformed response: Content length did not match the response's body length.");
            return responseBody;
        }
        server.extractMessage = extractMessage;
        var SessionClient = /** @class */ (function () {
            function SessionClient(host) {
                this.host = host;
                this.sequence = 0;
                this.lineMaps = ts.createMap();
                this.messages = [];
                this.getCombinedCodeFix = ts.notImplemented;
                this.applyCodeActionCommand = ts.notImplemented;
            }
            SessionClient.prototype.onMessage = function (message) {
                this.messages.push(message);
            };
            SessionClient.prototype.writeMessage = function (message) {
                this.host.writeMessage(message);
            };
            SessionClient.prototype.getLineMap = function (fileName) {
                var lineMap = this.lineMaps.get(fileName);
                if (!lineMap) {
                    lineMap = ts.computeLineStarts(ts.getSnapshotText(this.host.getScriptSnapshot(fileName)));
                    this.lineMaps.set(fileName, lineMap);
                }
                return lineMap;
            };
            SessionClient.prototype.lineOffsetToPosition = function (fileName, lineOffset, lineMap) {
                lineMap = lineMap || this.getLineMap(fileName);
                return ts.computePositionOfLineAndCharacter(lineMap, lineOffset.line - 1, lineOffset.offset - 1);
            };
            SessionClient.prototype.positionToOneBasedLineOffset = function (fileName, position) {
                var lineOffset = ts.computeLineAndCharacterOfPosition(this.getLineMap(fileName), position);
                return {
                    line: lineOffset.line + 1,
                    offset: lineOffset.character + 1
                };
            };
            SessionClient.prototype.convertCodeEditsToTextChange = function (fileName, codeEdit) {
                return { span: this.decodeSpan(codeEdit, fileName), newText: codeEdit.newText };
            };
            SessionClient.prototype.processRequest = function (command, args) {
                var request = {
                    seq: this.sequence,
                    type: "request",
                    arguments: args,
                    command: command
                };
                this.sequence++;
                this.writeMessage(JSON.stringify(request));
                return request;
            };
            SessionClient.prototype.processResponse = function (request) {
                var foundResponseMessage = false;
                var response;
                while (!foundResponseMessage) {
                    var lastMessage = this.messages.shift();
                    ts.Debug.assert(!!lastMessage, "Did not receive any responses.");
                    var responseBody = extractMessage(lastMessage);
                    try {
                        response = JSON.parse(responseBody);
                        // the server may emit events before emitting the response. We
                        // want to ignore these events for testing purpose.
                        if (response.type === "response") {
                            foundResponseMessage = true;
                        }
                    }
                    catch (e) {
                        throw new Error("Malformed response: Failed to parse server response: " + lastMessage + ". \r\n  Error details: " + e.message);
                    }
                }
                // verify the sequence numbers
                ts.Debug.assert(response.request_seq === request.seq, "Malformed response: response sequence number did not match request sequence number.");
                // unmarshal errors
                if (!response.success) {
                    throw new Error("Error " + response.message);
                }
                ts.Debug.assert(!!response.body, "Malformed response: Unexpected empty response body.");
                return response;
            };
            SessionClient.prototype.openFile = function (file, fileContent, scriptKindName) {
                var args = { file: file, fileContent: fileContent, scriptKindName: scriptKindName };
                this.processRequest(server.CommandNames.Open, args);
            };
            SessionClient.prototype.closeFile = function (file) {
                var args = { file: file };
                this.processRequest(server.CommandNames.Close, args);
            };
            SessionClient.prototype.changeFile = function (fileName, start, end, insertString) {
                // clear the line map after an edit
                this.lineMaps.set(fileName, undefined); // TODO: GH#18217
                var args = __assign({}, this.createFileLocationRequestArgsWithEndLineAndOffset(fileName, start, end), { insertString: insertString });
                this.processRequest(server.CommandNames.Change, args);
            };
            SessionClient.prototype.toLineColumnOffset = function (fileName, position) {
                var _a = this.positionToOneBasedLineOffset(fileName, position), line = _a.line, offset = _a.offset;
                return { line: line, character: offset };
            };
            SessionClient.prototype.getQuickInfoAtPosition = function (fileName, position) {
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.Quickinfo, args);
                var response = this.processResponse(request);
                var body = response.body; // TODO: GH#18217
                return {
                    kind: body.kind,
                    kindModifiers: body.kindModifiers,
                    textSpan: this.decodeSpan(body, fileName),
                    displayParts: [{ kind: "text", text: body.displayString }],
                    documentation: [{ kind: "text", text: body.documentation }],
                    tags: body.tags
                };
            };
            SessionClient.prototype.getProjectInfo = function (file, needFileNameList) {
                var args = { file: file, needFileNameList: needFileNameList };
                var request = this.processRequest(server.CommandNames.ProjectInfo, args);
                var response = this.processResponse(request);
                return {
                    configFileName: response.body.configFileName,
                    fileNames: response.body.fileNames
                };
            };
            SessionClient.prototype.getCompletionsAtPosition = function (fileName, position, _preferences) {
                var _this = this;
                // Not passing along 'preferences' because server should already have those from the 'configure' command
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.Completions, args);
                var response = this.processResponse(request);
                return {
                    isGlobalCompletion: false,
                    isMemberCompletion: false,
                    isNewIdentifierLocation: false,
                    entries: response.body.map(function (entry) {
                        if (entry.replacementSpan !== undefined) {
                            var name = entry.name, kind = entry.kind, kindModifiers = entry.kindModifiers, sortText = entry.sortText, replacementSpan = entry.replacementSpan, hasAction = entry.hasAction, source = entry.source, isRecommended = entry.isRecommended;
                            // TODO: GH#241
                            var res = { name: name, kind: kind, kindModifiers: kindModifiers, sortText: sortText, replacementSpan: _this.decodeSpan(replacementSpan, fileName), hasAction: hasAction, source: source, isRecommended: isRecommended };
                            return res;
                        }
                        return entry; // TODO: GH#18217
                    })
                };
            };
            SessionClient.prototype.getCompletionEntryDetails = function (fileName, position, entryName, _options, source) {
                var _this = this;
                var args = __assign({}, this.createFileLocationRequestArgs(fileName, position), { entryNames: [{ name: entryName, source: source }] });
                var request = this.processRequest(server.CommandNames.CompletionDetails, args);
                var response = this.processResponse(request);
                ts.Debug.assert(response.body.length === 1, "Unexpected length of completion details response body.");
                var convertedCodeActions = ts.map(response.body[0].codeActions, function (_a) {
                    var description = _a.description, changes = _a.changes;
                    return ({ description: description, changes: _this.convertChanges(changes, fileName) });
                });
                return __assign({}, response.body[0], { codeActions: convertedCodeActions });
            };
            SessionClient.prototype.getCompletionEntrySymbol = function (_fileName, _position, _entryName) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getNavigateToItems = function (searchValue) {
                var _this = this;
                var args = {
                    searchValue: searchValue,
                    file: this.host.getScriptFileNames()[0]
                };
                var request = this.processRequest(server.CommandNames.Navto, args);
                var response = this.processResponse(request);
                return response.body.map(function (entry) { return ({
                    name: entry.name,
                    containerName: entry.containerName || "",
                    containerKind: entry.containerKind || "" /* unknown */,
                    kind: entry.kind,
                    kindModifiers: entry.kindModifiers,
                    matchKind: entry.matchKind,
                    isCaseSensitive: entry.isCaseSensitive,
                    fileName: entry.file,
                    textSpan: _this.decodeSpan(entry),
                }); });
            };
            SessionClient.prototype.getFormattingEditsForRange = function (file, start, end, _options) {
                var _this = this;
                var args = this.createFileLocationRequestArgsWithEndLineAndOffset(file, start, end);
                // TODO: handle FormatCodeOptions
                var request = this.processRequest(server.CommandNames.Format, args);
                var response = this.processResponse(request);
                return response.body.map(function (entry) { return _this.convertCodeEditsToTextChange(file, entry); }); // TODO: GH#18217
            };
            SessionClient.prototype.getFormattingEditsForDocument = function (fileName, options) {
                return this.getFormattingEditsForRange(fileName, 0, this.host.getScriptSnapshot(fileName).getLength(), options);
            };
            SessionClient.prototype.getFormattingEditsAfterKeystroke = function (fileName, position, key, _options) {
                var _this = this;
                var args = __assign({}, this.createFileLocationRequestArgs(fileName, position), { key: key });
                // TODO: handle FormatCodeOptions
                var request = this.processRequest(server.CommandNames.Formatonkey, args);
                var response = this.processResponse(request);
                return response.body.map(function (entry) { return _this.convertCodeEditsToTextChange(fileName, entry); }); // TODO: GH#18217
            };
            SessionClient.prototype.getDefinitionAtPosition = function (fileName, position) {
                var _this = this;
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.Definition, args);
                var response = this.processResponse(request);
                return response.body.map(function (entry) { return ({
                    containerKind: "" /* unknown */,
                    containerName: "",
                    fileName: entry.file,
                    textSpan: _this.decodeSpan(entry),
                    kind: "" /* unknown */,
                    name: ""
                }); });
            };
            SessionClient.prototype.getDefinitionAndBoundSpan = function (fileName, position) {
                var _this = this;
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.DefinitionAndBoundSpan, args);
                var response = this.processResponse(request);
                return {
                    definitions: response.body.definitions.map(function (entry) { return ({
                        containerKind: "" /* unknown */,
                        containerName: "",
                        fileName: entry.file,
                        textSpan: _this.decodeSpan(entry),
                        kind: "" /* unknown */,
                        name: ""
                    }); }),
                    textSpan: this.decodeSpan(response.body.textSpan, request.arguments.file)
                };
            };
            SessionClient.prototype.getTypeDefinitionAtPosition = function (fileName, position) {
                var _this = this;
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.TypeDefinition, args);
                var response = this.processResponse(request);
                return response.body.map(function (entry) { return ({
                    containerKind: "" /* unknown */,
                    containerName: "",
                    fileName: entry.file,
                    textSpan: _this.decodeSpan(entry),
                    kind: "" /* unknown */,
                    name: ""
                }); });
            };
            SessionClient.prototype.getImplementationAtPosition = function (fileName, position) {
                var _this = this;
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.Implementation, args);
                var response = this.processResponse(request);
                return response.body.map(function (entry) { return ({
                    fileName: entry.file,
                    textSpan: _this.decodeSpan(entry),
                    kind: "" /* unknown */,
                    displayParts: []
                }); });
            };
            SessionClient.prototype.findReferences = function (_fileName, _position) {
                // Not yet implemented.
                return [];
            };
            SessionClient.prototype.getReferencesAtPosition = function (fileName, position) {
                var _this = this;
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.References, args);
                var response = this.processResponse(request);
                return response.body.refs.map(function (entry) { return ({
                    fileName: entry.file,
                    textSpan: _this.decodeSpan(entry),
                    isWriteAccess: entry.isWriteAccess,
                    isDefinition: entry.isDefinition,
                }); });
            };
            SessionClient.prototype.getEmitOutput = function (_fileName) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getSyntacticDiagnostics = function (file) {
                return this.getDiagnostics(file, server.CommandNames.SyntacticDiagnosticsSync);
            };
            SessionClient.prototype.getSemanticDiagnostics = function (file) {
                return this.getDiagnostics(file, server.CommandNames.SemanticDiagnosticsSync);
            };
            SessionClient.prototype.getSuggestionDiagnostics = function (file) {
                return this.getDiagnostics(file, server.CommandNames.SuggestionDiagnosticsSync);
            };
            SessionClient.prototype.getDiagnostics = function (file, command) {
                var request = this.processRequest(command, { file: file, includeLinePosition: true });
                var response = this.processResponse(request);
                return response.body.map(function (entry) {
                    var category = ts.firstDefined(Object.keys(ts.DiagnosticCategory), function (id) {
                        return ts.isString(id) && entry.category === id.toLowerCase() ? ts.DiagnosticCategory[id] : undefined;
                    });
                    return {
                        file: undefined,
                        start: entry.start,
                        length: entry.length,
                        messageText: entry.message,
                        category: ts.Debug.assertDefined(category, "convertDiagnostic: category should not be undefined"),
                        code: entry.code,
                        reportsUnnecessary: entry.reportsUnnecessary,
                    };
                });
            };
            SessionClient.prototype.getCompilerOptionsDiagnostics = function () {
                return ts.notImplemented();
            };
            SessionClient.prototype.getRenameInfo = function (fileName, position, findInStrings, findInComments) {
                var args = __assign({}, this.createFileLocationRequestArgs(fileName, position), { findInStrings: findInStrings, findInComments: findInComments });
                var request = this.processRequest(server.CommandNames.Rename, args);
                var response = this.processResponse(request);
                var body = response.body; // TODO: GH#18217
                var locations = [];
                for (var _i = 0, _a = body.locs; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    var fileName_1 = entry.file;
                    for (var _b = 0, _c = entry.locs; _b < _c.length; _b++) {
                        var loc = _c[_b];
                        locations.push({ textSpan: this.decodeSpan(loc, fileName_1), fileName: fileName_1 });
                    }
                }
                return this.lastRenameEntry = {
                    canRename: body.info.canRename,
                    displayName: body.info.displayName,
                    fullDisplayName: body.info.fullDisplayName,
                    kind: body.info.kind,
                    kindModifiers: body.info.kindModifiers,
                    localizedErrorMessage: body.info.localizedErrorMessage,
                    triggerSpan: ts.createTextSpanFromBounds(position, position),
                    fileName: fileName,
                    position: position,
                    findInStrings: !!findInStrings,
                    findInComments: !!findInComments,
                    locations: locations,
                };
            };
            SessionClient.prototype.findRenameLocations = function (fileName, position, findInStrings, findInComments) {
                if (!this.lastRenameEntry ||
                    this.lastRenameEntry.fileName !== fileName ||
                    this.lastRenameEntry.position !== position ||
                    this.lastRenameEntry.findInStrings !== findInStrings ||
                    this.lastRenameEntry.findInComments !== findInComments) {
                    this.getRenameInfo(fileName, position, findInStrings, findInComments);
                }
                return this.lastRenameEntry.locations;
            };
            SessionClient.prototype.decodeNavigationBarItems = function (items, fileName, lineMap) {
                var _this = this;
                if (!items) {
                    return [];
                }
                return items.map(function (item) { return ({
                    text: item.text,
                    kind: item.kind,
                    kindModifiers: item.kindModifiers || "",
                    spans: item.spans.map(function (span) { return _this.decodeSpan(span, fileName, lineMap); }),
                    childItems: _this.decodeNavigationBarItems(item.childItems, fileName, lineMap),
                    indent: item.indent,
                    bolded: false,
                    grayed: false
                }); });
            };
            SessionClient.prototype.getNavigationBarItems = function (file) {
                var request = this.processRequest(server.CommandNames.NavBar, { file: file });
                var response = this.processResponse(request);
                var lineMap = this.getLineMap(file);
                return this.decodeNavigationBarItems(response.body, file, lineMap);
            };
            SessionClient.prototype.decodeNavigationTree = function (tree, fileName, lineMap) {
                var _this = this;
                return {
                    text: tree.text,
                    kind: tree.kind,
                    kindModifiers: tree.kindModifiers,
                    spans: tree.spans.map(function (span) { return _this.decodeSpan(span, fileName, lineMap); }),
                    nameSpan: tree.nameSpan && this.decodeSpan(tree.nameSpan, fileName, lineMap),
                    childItems: ts.map(tree.childItems, function (item) { return _this.decodeNavigationTree(item, fileName, lineMap); })
                };
            };
            SessionClient.prototype.getNavigationTree = function (file) {
                var request = this.processRequest(server.CommandNames.NavTree, { file: file });
                var response = this.processResponse(request);
                var lineMap = this.getLineMap(file);
                return this.decodeNavigationTree(response.body, file, lineMap); // TODO: GH#18217
            };
            SessionClient.prototype.decodeSpan = function (span, fileName, lineMap) {
                fileName = fileName || span.file;
                lineMap = lineMap || this.getLineMap(fileName);
                return ts.createTextSpanFromBounds(this.lineOffsetToPosition(fileName, span.start, lineMap), this.lineOffsetToPosition(fileName, span.end, lineMap));
            };
            SessionClient.prototype.getNameOrDottedNameSpan = function (_fileName, _startPos, _endPos) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getBreakpointStatementAtPosition = function (_fileName, _position) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getSignatureHelpItems = function (fileName, position) {
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.SignatureHelp, args);
                var response = this.processResponse(request);
                if (!response.body) {
                    return undefined; // TODO: GH#18217
                }
                var _a = response.body, items = _a.items, encodedApplicableSpan = _a.applicableSpan, selectedItemIndex = _a.selectedItemIndex, argumentIndex = _a.argumentIndex, argumentCount = _a.argumentCount;
                var applicableSpan = this.decodeSpan(encodedApplicableSpan, fileName);
                return { items: items, applicableSpan: applicableSpan, selectedItemIndex: selectedItemIndex, argumentIndex: argumentIndex, argumentCount: argumentCount };
            };
            SessionClient.prototype.getOccurrencesAtPosition = function (fileName, position) {
                var _this = this;
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.Occurrences, args);
                var response = this.processResponse(request);
                return response.body.map(function (entry) { return ({
                    fileName: entry.file,
                    textSpan: _this.decodeSpan(entry),
                    isWriteAccess: entry.isWriteAccess,
                    isDefinition: false
                }); });
            };
            SessionClient.prototype.getDocumentHighlights = function (fileName, position, filesToSearch) {
                var _this = this;
                var args = __assign({}, this.createFileLocationRequestArgs(fileName, position), { filesToSearch: filesToSearch });
                var request = this.processRequest(server.CommandNames.DocumentHighlights, args);
                var response = this.processResponse(request);
                return response.body.map(function (item) { return ({
                    fileName: item.file,
                    highlightSpans: item.highlightSpans.map(function (span) { return ({
                        textSpan: _this.decodeSpan(span, item.file),
                        kind: span.kind
                    }); }),
                }); });
            };
            SessionClient.prototype.getOutliningSpans = function (file) {
                var _this = this;
                var request = this.processRequest(server.CommandNames.GetOutliningSpans, { file: file });
                var response = this.processResponse(request);
                return response.body.map(function (item) { return ({
                    textSpan: _this.decodeSpan(item.textSpan, file),
                    hintSpan: _this.decodeSpan(item.hintSpan, file),
                    bannerText: item.bannerText,
                    autoCollapse: item.autoCollapse,
                    kind: item.kind
                }); });
            };
            SessionClient.prototype.getTodoComments = function (_fileName, _descriptors) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getDocCommentTemplateAtPosition = function (_fileName, _position) {
                return ts.notImplemented();
            };
            SessionClient.prototype.isValidBraceCompletionAtPosition = function (_fileName, _position, _openingBrace) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getJsxClosingTagAtPosition = function (_fileName, _position) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getSpanOfEnclosingComment = function (_fileName, _position, _onlyMultiLine) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getCodeFixesAtPosition = function (file, start, end, errorCodes) {
                var _this = this;
                var args = __assign({}, this.createFileRangeRequestArgs(file, start, end), { errorCodes: errorCodes });
                var request = this.processRequest(server.CommandNames.GetCodeFixes, args);
                var response = this.processResponse(request);
                return response.body.map(function (_a) {
                    var fixName = _a.fixName, description = _a.description, changes = _a.changes, commands = _a.commands, fixId = _a.fixId, fixAllDescription = _a.fixAllDescription;
                    return ({ fixName: fixName, description: description, changes: _this.convertChanges(changes, file), commands: commands, fixId: fixId, fixAllDescription: fixAllDescription });
                });
            };
            SessionClient.prototype.createFileLocationOrRangeRequestArgs = function (positionOrRange, fileName) {
                return typeof positionOrRange === "number"
                    ? this.createFileLocationRequestArgs(fileName, positionOrRange)
                    : this.createFileRangeRequestArgs(fileName, positionOrRange.pos, positionOrRange.end);
            };
            SessionClient.prototype.createFileLocationRequestArgs = function (file, position) {
                var _a = this.positionToOneBasedLineOffset(file, position), line = _a.line, offset = _a.offset;
                return { file: file, line: line, offset: offset };
            };
            SessionClient.prototype.createFileRangeRequestArgs = function (file, start, end) {
                var _a = this.positionToOneBasedLineOffset(file, start), startLine = _a.line, startOffset = _a.offset;
                var _b = this.positionToOneBasedLineOffset(file, end), endLine = _b.line, endOffset = _b.offset;
                return { file: file, startLine: startLine, startOffset: startOffset, endLine: endLine, endOffset: endOffset };
            };
            SessionClient.prototype.createFileLocationRequestArgsWithEndLineAndOffset = function (file, start, end) {
                var _a = this.positionToOneBasedLineOffset(file, start), line = _a.line, offset = _a.offset;
                var _b = this.positionToOneBasedLineOffset(file, end), endLine = _b.line, endOffset = _b.offset;
                return { file: file, line: line, offset: offset, endLine: endLine, endOffset: endOffset };
            };
            SessionClient.prototype.getApplicableRefactors = function (fileName, positionOrRange) {
                var args = this.createFileLocationOrRangeRequestArgs(positionOrRange, fileName);
                var request = this.processRequest(server.CommandNames.GetApplicableRefactors, args);
                var response = this.processResponse(request);
                return response.body; // TODO: GH#18217
            };
            SessionClient.prototype.getEditsForRefactor = function (fileName, _formatOptions, positionOrRange, refactorName, actionName) {
                var args = this.createFileLocationOrRangeRequestArgs(positionOrRange, fileName);
                args.refactor = refactorName;
                args.action = actionName;
                var request = this.processRequest(server.CommandNames.GetEditsForRefactor, args);
                var response = this.processResponse(request);
                if (!response.body) {
                    return { edits: [], renameFilename: undefined, renameLocation: undefined };
                }
                var edits = this.convertCodeEditsToTextChanges(response.body.edits);
                var renameFilename = response.body.renameFilename;
                var renameLocation;
                if (renameFilename !== undefined) {
                    renameLocation = this.lineOffsetToPosition(renameFilename, response.body.renameLocation); // TODO: GH#18217
                }
                return {
                    edits: edits,
                    renameFilename: renameFilename,
                    renameLocation: renameLocation
                };
            };
            SessionClient.prototype.organizeImports = function (_scope, _formatOptions) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getEditsForFileRename = function () {
                return ts.notImplemented();
            };
            SessionClient.prototype.convertCodeEditsToTextChanges = function (edits) {
                var _this = this;
                return edits.map(function (edit) {
                    var fileName = edit.fileName;
                    return {
                        fileName: fileName,
                        textChanges: edit.textChanges.map(function (t) { return _this.convertTextChangeToCodeEdit(t, fileName); })
                    };
                });
            };
            SessionClient.prototype.convertChanges = function (changes, fileName) {
                var _this = this;
                return changes.map(function (change) { return ({
                    fileName: change.fileName,
                    textChanges: change.textChanges.map(function (textChange) { return _this.convertTextChangeToCodeEdit(textChange, fileName); })
                }); });
            };
            SessionClient.prototype.convertTextChangeToCodeEdit = function (change, fileName) {
                return {
                    span: this.decodeSpan(change, fileName),
                    newText: change.newText ? change.newText : ""
                };
            };
            SessionClient.prototype.getBraceMatchingAtPosition = function (fileName, position) {
                var _this = this;
                var args = this.createFileLocationRequestArgs(fileName, position);
                var request = this.processRequest(server.CommandNames.Brace, args);
                var response = this.processResponse(request);
                return response.body.map(function (entry) { return _this.decodeSpan(entry, fileName); }); // TODO: GH#18217
            };
            SessionClient.prototype.getIndentationAtPosition = function (_fileName, _position, _options) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getSyntacticClassifications = function (_fileName, _span) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getSemanticClassifications = function (_fileName, _span) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getEncodedSyntacticClassifications = function (_fileName, _span) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getEncodedSemanticClassifications = function (_fileName, _span) {
                return ts.notImplemented();
            };
            SessionClient.prototype.getProgram = function () {
                throw new Error("SourceFile objects are not serializable through the server protocol.");
            };
            SessionClient.prototype.getNonBoundSourceFile = function (_fileName) {
                throw new Error("SourceFile objects are not serializable through the server protocol.");
            };
            SessionClient.prototype.getSourceFile = function (_fileName) {
                throw new Error("SourceFile objects are not serializable through the server protocol.");
            };
            SessionClient.prototype.cleanupSemanticCache = function () {
                throw new Error("cleanupSemanticCache is not available through the server layer.");
            };
            SessionClient.prototype.dispose = function () {
                throw new Error("dispose is not available through the server layer.");
            };
            return SessionClient;
        }());
        server.SessionClient = SessionClient;
    })(server = ts.server || (ts.server = {}));
})(ts || (ts = {}));
var RunnerBase = /** @class */ (function () {
    function RunnerBase() {
        // contains the tests to run
        this.tests = [];
        /** The working directory where tests are found. Needed for batch testing where the input path will differ from the output path inside baselines */
        this.workingDirectory = "";
    }
    /** Add a source file to the runner's list of tests that need to be initialized with initializeTests */
    RunnerBase.prototype.addTest = function (fileName) {
        this.tests.push(fileName);
    };
    RunnerBase.prototype.enumerateFiles = function (folder, regex, options) {
        return ts.map(Harness.IO.listFiles(Harness.userSpecifiedRoot + folder, regex, { recursive: (options ? options.recursive : false) }), ts.normalizeSlashes);
    };
    /** Replaces instances of full paths with fileNames only */
    RunnerBase.removeFullPaths = function (path) {
        // If its a full path (starts with "C:" or "/") replace with just the filename
        var fixedPath = /^(\w:|\/)/.test(path) ? ts.getBaseFileName(path) : path;
        // when running in the browser the 'full path' is the host name, shows up in error baselines
        var localHost = /http:\/localhost:\d+/g;
        fixedPath = fixedPath.replace(localHost, "");
        return fixedPath;
    };
    return RunnerBase;
}());
var Harness;
(function (Harness) {
    var SourceMapRecorder;
    (function (SourceMapRecorder) {
        var SourceMapDecoder;
        (function (SourceMapDecoder) {
            var sourceMapMappings;
            var sourceMapNames;
            var decodingIndex;
            var prevNameIndex;
            var decodeOfEncodedMapping;
            var errorDecodeOfEncodedMapping;
            function initializeSourceMapDecoding(sourceMapData) {
                sourceMapMappings = sourceMapData.sourceMapMappings;
                sourceMapNames = sourceMapData.sourceMapNames;
                decodingIndex = 0;
                prevNameIndex = 0;
                decodeOfEncodedMapping = {
                    emittedLine: 1,
                    emittedColumn: 1,
                    sourceLine: 1,
                    sourceColumn: 1,
                    sourceIndex: 0,
                };
                errorDecodeOfEncodedMapping = undefined;
            }
            SourceMapDecoder.initializeSourceMapDecoding = initializeSourceMapDecoding;
            function isSourceMappingSegmentEnd() {
                if (decodingIndex === sourceMapMappings.length) {
                    return true;
                }
                if (sourceMapMappings.charAt(decodingIndex) === ",") {
                    return true;
                }
                if (sourceMapMappings.charAt(decodingIndex) === ";") {
                    return true;
                }
                return false;
            }
            function decodeNextEncodedSourceMapSpan() {
                errorDecodeOfEncodedMapping = undefined;
                function createErrorIfCondition(condition, errormsg) {
                    if (errorDecodeOfEncodedMapping) {
                        // there was existing error:
                        return true;
                    }
                    if (condition) {
                        errorDecodeOfEncodedMapping = errormsg;
                    }
                    return condition;
                }
                function base64VLQFormatDecode() {
                    function base64FormatDecode() {
                        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(sourceMapMappings.charAt(decodingIndex));
                    }
                    var moreDigits = true;
                    var shiftCount = 0;
                    var value = 0;
                    for (; moreDigits; decodingIndex++) {
                        if (createErrorIfCondition(decodingIndex >= sourceMapMappings.length, "Error in decoding base64VLQFormatDecode, past the mapping string")) {
                            return undefined; // TODO: GH#18217
                        }
                        // 6 digit number
                        var currentByte = base64FormatDecode();
                        // If msb is set, we still have more bits to continue
                        moreDigits = (currentByte & 32) !== 0;
                        // least significant 5 bits are the next msbs in the final value.
                        value = value | ((currentByte & 31) << shiftCount);
                        shiftCount += 5;
                    }
                    // Least significant bit if 1 represents negative and rest of the msb is actual absolute value
                    if ((value & 1) === 0) {
                        // + number
                        value = value >> 1;
                    }
                    else {
                        // - number
                        value = value >> 1;
                        value = -value;
                    }
                    return value;
                }
                while (decodingIndex < sourceMapMappings.length) {
                    if (sourceMapMappings.charAt(decodingIndex) === ";") {
                        // New line
                        decodeOfEncodedMapping.emittedLine++;
                        decodeOfEncodedMapping.emittedColumn = 1;
                        decodingIndex++;
                        continue;
                    }
                    if (sourceMapMappings.charAt(decodingIndex) === ",") {
                        // Next entry is on same line - no action needed
                        decodingIndex++;
                        continue;
                    }
                    // Read the current span
                    // 1. Column offset from prev read jsColumn
                    decodeOfEncodedMapping.emittedColumn += base64VLQFormatDecode();
                    // Incorrect emittedColumn dont support this map
                    if (createErrorIfCondition(decodeOfEncodedMapping.emittedColumn < 1, "Invalid emittedColumn found")) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                    // Dont support reading mappings that dont have information about original source and its line numbers
                    if (createErrorIfCondition(isSourceMappingSegmentEnd(), "Unsupported Error Format: No entries after emitted column")) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                    // 2. Relative sourceIndex
                    decodeOfEncodedMapping.sourceIndex += base64VLQFormatDecode();
                    // Incorrect sourceIndex dont support this map
                    if (createErrorIfCondition(decodeOfEncodedMapping.sourceIndex < 0, "Invalid sourceIndex found")) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                    // Dont support reading mappings that dont have information about original source span
                    if (createErrorIfCondition(isSourceMappingSegmentEnd(), "Unsupported Error Format: No entries after sourceIndex")) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                    // 3. Relative sourceLine 0 based
                    decodeOfEncodedMapping.sourceLine += base64VLQFormatDecode();
                    // Incorrect sourceLine dont support this map
                    if (createErrorIfCondition(decodeOfEncodedMapping.sourceLine < 1, "Invalid sourceLine found")) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                    // Dont support reading mappings that dont have information about original source and its line numbers
                    if (createErrorIfCondition(isSourceMappingSegmentEnd(), "Unsupported Error Format: No entries after emitted Line")) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                    // 4. Relative sourceColumn 0 based
                    decodeOfEncodedMapping.sourceColumn += base64VLQFormatDecode();
                    // Incorrect sourceColumn dont support this map
                    if (createErrorIfCondition(decodeOfEncodedMapping.sourceColumn < 1, "Invalid sourceLine found")) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                    // 5. Check if there is name:
                    if (!isSourceMappingSegmentEnd()) {
                        prevNameIndex += base64VLQFormatDecode();
                        decodeOfEncodedMapping.nameIndex = prevNameIndex;
                        // Incorrect nameIndex dont support this map
                        if (createErrorIfCondition(decodeOfEncodedMapping.nameIndex < 0 || decodeOfEncodedMapping.nameIndex >= sourceMapNames.length, "Invalid name index for the source map entry")) {
                            return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                        }
                    }
                    // Dont support reading mappings that dont have information about original source and its line numbers
                    if (createErrorIfCondition(!isSourceMappingSegmentEnd(), "Unsupported Error Format: There are more entries after " + (decodeOfEncodedMapping.nameIndex === -1 ? "sourceColumn" : "nameIndex"))) {
                        return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                    }
                    // Populated the entry
                    return { error: errorDecodeOfEncodedMapping, sourceMapSpan: decodeOfEncodedMapping };
                }
                createErrorIfCondition(/*condition*/ true, "No encoded entry found");
                return undefined; // TODO: GH#18217
            }
            SourceMapDecoder.decodeNextEncodedSourceMapSpan = decodeNextEncodedSourceMapSpan;
            function hasCompletedDecoding() {
                return decodingIndex === sourceMapMappings.length;
            }
            SourceMapDecoder.hasCompletedDecoding = hasCompletedDecoding;
            function getRemainingDecodeString() {
                return sourceMapMappings.substr(decodingIndex);
            }
            SourceMapDecoder.getRemainingDecodeString = getRemainingDecodeString;
        })(SourceMapDecoder || (SourceMapDecoder = {}));
        var SourceMapSpanWriter;
        (function (SourceMapSpanWriter) {
            var sourceMapRecorder;
            var sourceMapSources;
            var sourceMapNames;
            var jsFile;
            var jsLineMap;
            var tsCode;
            var tsLineMap;
            var spansOnSingleLine;
            var prevWrittenSourcePos;
            var prevWrittenJsLine;
            var spanMarkerContinues;
            function initializeSourceMapSpanWriter(sourceMapRecordWriter, sourceMapData, currentJsFile) {
                sourceMapRecorder = sourceMapRecordWriter;
                sourceMapSources = sourceMapData.sourceMapSources;
                sourceMapNames = sourceMapData.sourceMapNames;
                jsFile = currentJsFile;
                jsLineMap = jsFile.lineStarts;
                spansOnSingleLine = [];
                prevWrittenSourcePos = 0;
                prevWrittenJsLine = 0;
                spanMarkerContinues = false;
                SourceMapDecoder.initializeSourceMapDecoding(sourceMapData);
                sourceMapRecorder.WriteLine("===================================================================");
                sourceMapRecorder.WriteLine("JsFile: " + sourceMapData.sourceMapFile);
                sourceMapRecorder.WriteLine("mapUrl: " + sourceMapData.jsSourceMappingURL);
                sourceMapRecorder.WriteLine("sourceRoot: " + sourceMapData.sourceMapSourceRoot);
                sourceMapRecorder.WriteLine("sources: " + sourceMapData.sourceMapSources);
                if (sourceMapData.sourceMapSourcesContent) {
                    sourceMapRecorder.WriteLine("sourcesContent: " + JSON.stringify(sourceMapData.sourceMapSourcesContent));
                }
                sourceMapRecorder.WriteLine("===================================================================");
            }
            SourceMapSpanWriter.initializeSourceMapSpanWriter = initializeSourceMapSpanWriter;
            function getSourceMapSpanString(mapEntry, getAbsentNameIndex) {
                var mapString = "Emitted(" + mapEntry.emittedLine + ", " + mapEntry.emittedColumn + ") Source(" + mapEntry.sourceLine + ", " + mapEntry.sourceColumn + ") + SourceIndex(" + mapEntry.sourceIndex + ")";
                if (mapEntry.nameIndex >= 0 && mapEntry.nameIndex < sourceMapNames.length) {
                    mapString += " name (" + sourceMapNames[mapEntry.nameIndex] + ")";
                }
                else {
                    if ((mapEntry.nameIndex && mapEntry.nameIndex !== -1) || getAbsentNameIndex) {
                        mapString += " nameIndex (" + mapEntry.nameIndex + ")";
                    }
                }
                return mapString;
            }
            function recordSourceMapSpan(sourceMapSpan) {
                // verify the decoded span is same as the new span
                var decodeResult = SourceMapDecoder.decodeNextEncodedSourceMapSpan();
                var decodeErrors;
                if (decodeResult.error
                    || decodeResult.sourceMapSpan.emittedLine !== sourceMapSpan.emittedLine
                    || decodeResult.sourceMapSpan.emittedColumn !== sourceMapSpan.emittedColumn
                    || decodeResult.sourceMapSpan.sourceLine !== sourceMapSpan.sourceLine
                    || decodeResult.sourceMapSpan.sourceColumn !== sourceMapSpan.sourceColumn
                    || decodeResult.sourceMapSpan.sourceIndex !== sourceMapSpan.sourceIndex
                    || decodeResult.sourceMapSpan.nameIndex !== sourceMapSpan.nameIndex) {
                    if (decodeResult.error) {
                        decodeErrors = ["!!^^ !!^^ There was decoding error in the sourcemap at this location: " + decodeResult.error];
                    }
                    else {
                        decodeErrors = ["!!^^ !!^^ The decoded span from sourcemap's mapping entry does not match what was encoded for this span:"];
                    }
                    decodeErrors.push("!!^^ !!^^ Decoded span from sourcemap's mappings entry: " + getSourceMapSpanString(decodeResult.sourceMapSpan, /*getAbsentNameIndex*/ true) + " Span encoded by the emitter:" + getSourceMapSpanString(sourceMapSpan, /*getAbsentNameIndex*/ true));
                }
                if (spansOnSingleLine.length && spansOnSingleLine[0].sourceMapSpan.emittedLine !== sourceMapSpan.emittedLine) {
                    // On different line from the one that we have been recording till now,
                    writeRecordedSpans();
                    spansOnSingleLine = [];
                }
                spansOnSingleLine.push({ sourceMapSpan: sourceMapSpan, decodeErrors: decodeErrors });
            }
            SourceMapSpanWriter.recordSourceMapSpan = recordSourceMapSpan;
            function recordNewSourceFileSpan(sourceMapSpan, newSourceFileCode) {
                assert.isTrue(spansOnSingleLine.length === 0 || spansOnSingleLine[0].sourceMapSpan.emittedLine !== sourceMapSpan.emittedLine, "new file source map span should be on new line. We currently handle only that scenario");
                recordSourceMapSpan(sourceMapSpan);
                assert.isTrue(spansOnSingleLine.length === 1);
                sourceMapRecorder.WriteLine("-------------------------------------------------------------------");
                sourceMapRecorder.WriteLine("emittedFile:" + jsFile.file);
                sourceMapRecorder.WriteLine("sourceFile:" + sourceMapSources[spansOnSingleLine[0].sourceMapSpan.sourceIndex]);
                sourceMapRecorder.WriteLine("-------------------------------------------------------------------");
                tsLineMap = ts.computeLineStarts(newSourceFileCode);
                tsCode = newSourceFileCode;
                prevWrittenSourcePos = 0;
            }
            SourceMapSpanWriter.recordNewSourceFileSpan = recordNewSourceFileSpan;
            function close() {
                // Write the lines pending on the single line
                writeRecordedSpans();
                if (!SourceMapDecoder.hasCompletedDecoding()) {
                    sourceMapRecorder.WriteLine("!!!! **** There are more source map entries in the sourceMap's mapping than what was encoded");
                    sourceMapRecorder.WriteLine("!!!! **** Remaining decoded string: " + SourceMapDecoder.getRemainingDecodeString());
                }
                // write remaining js lines
                writeJsFileLines(jsLineMap.length);
            }
            SourceMapSpanWriter.close = close;
            function getTextOfLine(line, lineMap, code) {
                var startPos = lineMap[line];
                var endPos = lineMap[line + 1];
                var text = code.substring(startPos, endPos);
                return line === 0 ? utils.removeByteOrderMark(text) : text;
            }
            function writeJsFileLines(endJsLine) {
                for (; prevWrittenJsLine < endJsLine; prevWrittenJsLine++) {
                    sourceMapRecorder.Write(">>>" + getTextOfLine(prevWrittenJsLine, jsLineMap, jsFile.text));
                }
            }
            function writeRecordedSpans() {
                var markerIds = [];
                function getMarkerId(markerIndex) {
                    var markerId = "";
                    if (spanMarkerContinues) {
                        assert.isTrue(markerIndex === 0);
                        markerId = "1->";
                    }
                    else {
                        markerId = "" + (markerIndex + 1);
                        if (markerId.length < 2) {
                            markerId = markerId + " ";
                        }
                        markerId += ">";
                    }
                    return markerId;
                }
                var prevEmittedCol;
                function iterateSpans(fn) {
                    prevEmittedCol = 1;
                    for (var i = 0; i < spansOnSingleLine.length; i++) {
                        fn(spansOnSingleLine[i], i);
                        prevEmittedCol = spansOnSingleLine[i].sourceMapSpan.emittedColumn;
                    }
                }
                function writeSourceMapIndent(indentLength, indentPrefix) {
                    sourceMapRecorder.Write(indentPrefix);
                    for (var i = 1; i < indentLength; i++) {
                        sourceMapRecorder.Write(" ");
                    }
                }
                function writeSourceMapMarker(currentSpan, index, endColumn, endContinues) {
                    if (endColumn === void 0) { endColumn = currentSpan.sourceMapSpan.emittedColumn; }
                    if (endContinues === void 0) { endContinues = false; }
                    var markerId = getMarkerId(index);
                    markerIds.push(markerId);
                    writeSourceMapIndent(prevEmittedCol, markerId);
                    for (var i = prevEmittedCol; i < endColumn; i++) {
                        sourceMapRecorder.Write("^");
                    }
                    if (endContinues) {
                        sourceMapRecorder.Write("->");
                    }
                    sourceMapRecorder.WriteLine("");
                    spanMarkerContinues = endContinues;
                }
                function writeSourceMapSourceText(currentSpan, index) {
                    var sourcePos = tsLineMap[currentSpan.sourceMapSpan.sourceLine - 1] + (currentSpan.sourceMapSpan.sourceColumn - 1);
                    var sourceText = "";
                    if (prevWrittenSourcePos < sourcePos) {
                        // Position that goes forward, get text
                        sourceText = tsCode.substring(prevWrittenSourcePos, sourcePos);
                    }
                    if (currentSpan.decodeErrors) {
                        // If there are decode errors, write
                        for (var _i = 0, _a = currentSpan.decodeErrors; _i < _a.length; _i++) {
                            var decodeError = _a[_i];
                            writeSourceMapIndent(prevEmittedCol, markerIds[index]);
                            sourceMapRecorder.WriteLine(decodeError);
                        }
                    }
                    var tsCodeLineMap = ts.computeLineStarts(sourceText);
                    for (var i = 0; i < tsCodeLineMap.length; i++) {
                        writeSourceMapIndent(prevEmittedCol, i === 0 ? markerIds[index] : "  >");
                        sourceMapRecorder.Write(getTextOfLine(i, tsCodeLineMap, sourceText));
                        if (i === tsCodeLineMap.length - 1) {
                            sourceMapRecorder.WriteLine("");
                        }
                    }
                    prevWrittenSourcePos = sourcePos;
                }
                function writeSpanDetails(currentSpan, index) {
                    sourceMapRecorder.WriteLine(markerIds[index] + getSourceMapSpanString(currentSpan.sourceMapSpan));
                }
                if (spansOnSingleLine.length) {
                    var currentJsLine = spansOnSingleLine[0].sourceMapSpan.emittedLine;
                    // Write js line
                    writeJsFileLines(currentJsLine);
                    // Emit markers
                    iterateSpans(writeSourceMapMarker);
                    var jsFileText = getTextOfLine(currentJsLine, jsLineMap, jsFile.text);
                    if (prevEmittedCol < jsFileText.length) {
                        // There is remaining text on this line that will be part of next source span so write marker that continues
                        writeSourceMapMarker(/*currentSpan*/ undefined, spansOnSingleLine.length, /*endColumn*/ jsFileText.length, /*endContinues*/ true); // TODO: GH#18217
                    }
                    // Emit Source text
                    iterateSpans(writeSourceMapSourceText);
                    // Emit column number etc
                    iterateSpans(writeSpanDetails);
                    sourceMapRecorder.WriteLine("---");
                }
            }
        })(SourceMapSpanWriter || (SourceMapSpanWriter = {}));
        function getSourceMapRecord(sourceMapDataList, program, jsFiles, declarationFiles) {
            var sourceMapRecorder = new Harness.Compiler.WriterAggregator();
            for (var i = 0; i < sourceMapDataList.length; i++) {
                var sourceMapData = sourceMapDataList[i];
                var prevSourceFile = void 0;
                var currentFile = void 0;
                if (ts.endsWith(sourceMapData.sourceMapFile, ".d.ts" /* Dts */)) {
                    if (sourceMapDataList.length > jsFiles.length) {
                        currentFile = declarationFiles[Math.floor(i / 2)]; // When both kinds of source map are present, they alternate js/dts
                    }
                    else {
                        currentFile = declarationFiles[i];
                    }
                }
                else {
                    if (sourceMapDataList.length > jsFiles.length) {
                        currentFile = jsFiles[Math.floor(i / 2)];
                    }
                    else {
                        currentFile = jsFiles[i];
                    }
                }
                SourceMapSpanWriter.initializeSourceMapSpanWriter(sourceMapRecorder, sourceMapData, currentFile);
                for (var _i = 0, _a = sourceMapData.sourceMapDecodedMappings; _i < _a.length; _i++) {
                    var decodedSourceMapping = _a[_i];
                    var currentSourceFile = program.getSourceFile(sourceMapData.inputSourceFileNames[decodedSourceMapping.sourceIndex]);
                    if (currentSourceFile !== prevSourceFile) {
                        SourceMapSpanWriter.recordNewSourceFileSpan(decodedSourceMapping, currentSourceFile.text);
                        prevSourceFile = currentSourceFile;
                    }
                    else {
                        SourceMapSpanWriter.recordSourceMapSpan(decodedSourceMapping);
                    }
                }
                SourceMapSpanWriter.close(); // If the last spans werent emitted, emit them
            }
            sourceMapRecorder.Close();
            return sourceMapRecorder.lines.join("\r\n");
        }
        SourceMapRecorder.getSourceMapRecord = getSourceMapRecord;
    })(SourceMapRecorder = Harness.SourceMapRecorder || (Harness.SourceMapRecorder = {}));
})(Harness || (Harness = {}));
// Block scoped definitions work poorly for global variables, temporarily enable var
/* tslint:disable:no-var-keyword */
// this will work in the browser via browserify
var _chai = require("chai");
var assert = _chai.assert;
{
    // chai's builtin `assert.isFalse` is featureful but slow - we don't use those features,
    // so we'll just overwrite it as an alterative to migrating a bunch of code off of chai
    assert.isFalse = function (expr, msg) { if (expr !== false)
        throw new Error(msg); };
    var assertDeepImpl_1 = assert.deepEqual;
    assert.deepEqual = function (a, b, msg) {
        if (ts.isArray(a) && ts.isArray(b)) {
            assertDeepImpl_1(arrayExtraKeysObject(a), arrayExtraKeysObject(b), "Array extra keys differ");
        }
        assertDeepImpl_1(a, b, msg);
        function arrayExtraKeysObject(a) {
            var obj = {};
            for (var key in a) {
                if (Number.isNaN(Number(key))) {
                    obj[key] = a[key];
                }
            }
            return obj;
        }
    };
}
var global = Function("return this").call(undefined);
/* tslint:enable:no-var-keyword prefer-const */
var Utils;
(function (Utils) {
    // Setup some globals based on the current environment
    var ExecutionEnvironment;
    (function (ExecutionEnvironment) {
        ExecutionEnvironment[ExecutionEnvironment["Node"] = 0] = "Node";
        ExecutionEnvironment[ExecutionEnvironment["Browser"] = 1] = "Browser";
    })(ExecutionEnvironment = Utils.ExecutionEnvironment || (Utils.ExecutionEnvironment = {}));
    function getExecutionEnvironment() {
        if (typeof window !== "undefined") {
            return 1 /* Browser */;
        }
        else {
            return 0 /* Node */;
        }
    }
    Utils.getExecutionEnvironment = getExecutionEnvironment;
    Utils.currentExecutionEnvironment = getExecutionEnvironment();
    // Thanks to browserify, Buffer is always available nowadays
    var Buffer = require("buffer").Buffer;
    function encodeString(s) {
        return Buffer.from(s).toString("utf8");
    }
    Utils.encodeString = encodeString;
    function byteLength(s, encoding) {
        // stub implementation if Buffer is not available (in-browser case)
        return Buffer.byteLength(s, encoding);
    }
    Utils.byteLength = byteLength;
    function evalFile(fileContents, fileName, nodeContext) {
        var environment = getExecutionEnvironment();
        switch (environment) {
            case 1 /* Browser */:
                eval(fileContents);
                break;
            case 0 /* Node */:
                var vm = require("vm");
                if (nodeContext) {
                    vm.runInNewContext(fileContents, nodeContext, fileName);
                }
                else {
                    vm.runInThisContext(fileContents, fileName);
                }
                break;
            default:
                throw new Error("Unknown context");
        }
    }
    Utils.evalFile = evalFile;
    /** Splits the given string on \r\n, or on only \n if that fails, or on only \r if *that* fails. */
    function splitContentByNewlines(content) {
        // Split up the input file by line
        // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
        // we have to use string-based splitting instead and try to figure out the delimiting chars
        var lines = content.split("\r\n");
        if (lines.length === 1) {
            lines = content.split("\n");
            if (lines.length === 1) {
                lines = content.split("\r");
            }
        }
        return lines;
    }
    Utils.splitContentByNewlines = splitContentByNewlines;
    /** Reads a file under /tests */
    function readTestFile(path) {
        if (path.indexOf("tests") < 0) {
            path = "tests/" + path;
        }
        var content;
        try {
            content = Harness.IO.readFile(Harness.userSpecifiedRoot + path);
        }
        catch (err) {
            return undefined;
        }
        return content;
    }
    Utils.readTestFile = readTestFile;
    function memoize(f, memoKey) {
        var cache = ts.createMap();
        return (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var key = memoKey.apply(void 0, args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            else {
                var value = f.apply(this, args);
                cache.set(key, value);
                return value;
            }
        });
    }
    Utils.memoize = memoize;
    Utils.canonicalizeForHarness = ts.createGetCanonicalFileName(/*caseSensitive*/ false); // This is done so tests work on windows _and_ linux
    function assertInvariants(node, parent) {
        if (node) {
            assert.isFalse(node.pos < 0, "node.pos < 0");
            assert.isFalse(node.end < 0, "node.end < 0");
            assert.isFalse(node.end < node.pos, "node.end < node.pos");
            assert.equal(node.parent, parent, "node.parent !== parent");
            if (parent) {
                // Make sure each child is contained within the parent.
                assert.isFalse(node.pos < parent.pos, "node.pos < parent.pos");
                assert.isFalse(node.end > parent.end, "node.end > parent.end");
            }
            ts.forEachChild(node, function (child) {
                assertInvariants(child, node);
            });
            // Make sure each of the children is in order.
            var currentPos_1 = 0;
            ts.forEachChild(node, function (child) {
                assert.isFalse(child.pos < currentPos_1, "child.pos < currentPos");
                currentPos_1 = child.end;
            }, function (array) {
                assert.isFalse(array.pos < node.pos, "array.pos < node.pos");
                assert.isFalse(array.end > node.end, "array.end > node.end");
                assert.isFalse(array.pos < currentPos_1, "array.pos < currentPos");
                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                    var item = array_1[_i];
                    assert.isFalse(item.pos < currentPos_1, "array[i].pos < currentPos");
                    currentPos_1 = item.end;
                }
                currentPos_1 = array.end;
            });
            var childNodesAndArrays_1 = [];
            ts.forEachChild(node, function (child) { childNodesAndArrays_1.push(child); }, function (array) { childNodesAndArrays_1.push(array); });
            for (var childName in node) {
                if (childName === "parent" || childName === "nextContainer" || childName === "modifiers" || childName === "externalModuleIndicator" ||
                    // for now ignore jsdoc comments
                    childName === "jsDocComment" || childName === "checkJsDirective" || childName === "commonJsModuleIndicator") {
                    continue;
                }
                var child = node[childName];
                if (isNodeOrArray(child)) {
                    assert.isFalse(childNodesAndArrays_1.indexOf(child) < 0, "Missing child when forEach'ing over node: " + ts.SyntaxKind[node.kind] + "-" + childName);
                }
            }
        }
    }
    Utils.assertInvariants = assertInvariants;
    function isNodeOrArray(a) {
        return a !== undefined && typeof a.pos === "number";
    }
    function convertDiagnostics(diagnostics) {
        return diagnostics.map(convertDiagnostic);
    }
    Utils.convertDiagnostics = convertDiagnostics;
    function convertDiagnostic(diagnostic) {
        return {
            start: diagnostic.start,
            length: diagnostic.length,
            messageText: ts.flattenDiagnosticMessageText(diagnostic.messageText, Harness.IO.newLine()),
            category: ts.diagnosticCategoryName(diagnostic, /*lowerCase*/ false),
            code: diagnostic.code
        };
    }
    function sourceFileToJSON(file) {
        return JSON.stringify(file, function (_, v) { return isNodeOrArray(v) ? serializeNode(v) : v; }, "    ");
        function getKindName(k) {
            if (ts.isString(k)) {
                return k;
            }
            // For some markers in SyntaxKind, we should print its original syntax name instead of
            // the marker name in tests.
            if (k === ts.SyntaxKind.FirstJSDocNode ||
                k === ts.SyntaxKind.LastJSDocNode ||
                k === ts.SyntaxKind.FirstJSDocTagNode ||
                k === ts.SyntaxKind.LastJSDocTagNode) {
                for (var kindName in ts.SyntaxKind) {
                    if (ts.SyntaxKind[kindName] === k) {
                        return kindName;
                    }
                }
            }
            return ts.SyntaxKind[k];
        }
        function getFlagName(flags, f) {
            if (f === 0) {
                return 0;
            }
            var result = "";
            ts.forEach(Object.getOwnPropertyNames(flags), function (v) {
                if (isFinite(v)) {
                    v = +v;
                    if (f === +v) {
                        result = flags[v];
                        return true;
                    }
                    else if ((f & v) > 0) {
                        if (result.length) {
                            result += " | ";
                        }
                        result += flags[v];
                        return false;
                    }
                }
            });
            return result;
        }
        function getNodeFlagName(f) { return getFlagName(ts.NodeFlags, f); }
        function serializeNode(n) {
            var o = { kind: getKindName(n.kind) };
            if (ts.containsParseError(n)) {
                o.containsParseError = true;
            }
            for (var _i = 0, _a = Object.getOwnPropertyNames(n); _i < _a.length; _i++) {
                var propertyName = _a[_i];
                switch (propertyName) {
                    case "parent":
                    case "symbol":
                    case "locals":
                    case "localSymbol":
                    case "kind":
                    case "id":
                    case "nodeCount":
                    case "symbolCount":
                    case "identifierCount":
                    case "scriptSnapshot":
                        // Blacklist of items we never put in the baseline file.
                        break;
                    case "originalKeywordKind":
                        o[propertyName] = getKindName(n[propertyName]);
                        break;
                    case "flags":
                        // Clear the flags that are produced by aggregating child values. That is ephemeral
                        // data we don't care about in the dump. We only care what the parser set directly
                        // on the AST.
                        var flags = n.flags & ~(65536 /* JavaScriptFile */ | 262144 /* HasAggregatedChildData */);
                        if (flags) {
                            o[propertyName] = getNodeFlagName(flags);
                        }
                        break;
                    case "parseDiagnostics":
                        o[propertyName] = convertDiagnostics(n[propertyName]);
                        break;
                    case "nextContainer":
                        if (n.nextContainer) {
                            o[propertyName] = { kind: n.nextContainer.kind, pos: n.nextContainer.pos, end: n.nextContainer.end };
                        }
                        break;
                    case "text":
                        // Include 'text' field for identifiers/literals, but not for source files.
                        if (n.kind !== 274 /* SourceFile */) {
                            o[propertyName] = n[propertyName];
                        }
                        break;
                    default:
                        o[propertyName] = n[propertyName];
                }
            }
            return o;
        }
    }
    Utils.sourceFileToJSON = sourceFileToJSON;
    function assertDiagnosticsEquals(array1, array2) {
        if (array1 === array2) {
            return;
        }
        assert(array1, "array1");
        assert(array2, "array2");
        assert.equal(array1.length, array2.length, "array1.length !== array2.length");
        for (var i = 0; i < array1.length; i++) {
            var d1 = array1[i];
            var d2 = array2[i];
            assert.equal(d1.start, d2.start, "d1.start !== d2.start");
            assert.equal(d1.length, d2.length, "d1.length !== d2.length");
            assert.equal(ts.flattenDiagnosticMessageText(d1.messageText, Harness.IO.newLine()), ts.flattenDiagnosticMessageText(d2.messageText, Harness.IO.newLine()), "d1.messageText !== d2.messageText");
            assert.equal(d1.category, d2.category, "d1.category !== d2.category");
            assert.equal(d1.code, d2.code, "d1.code !== d2.code");
        }
    }
    Utils.assertDiagnosticsEquals = assertDiagnosticsEquals;
    function assertStructuralEquals(node1, node2) {
        if (node1 === node2) {
            return;
        }
        assert(node1, "node1");
        assert(node2, "node2");
        assert.equal(node1.pos, node2.pos, "node1.pos !== node2.pos");
        assert.equal(node1.end, node2.end, "node1.end !== node2.end");
        assert.equal(node1.kind, node2.kind, "node1.kind !== node2.kind");
        // call this on both nodes to ensure all propagated flags have been set (and thus can be
        // compared).
        assert.equal(ts.containsParseError(node1), ts.containsParseError(node2));
        assert.equal(node1.flags & ~1408 /* ReachabilityAndEmitFlags */, node2.flags & ~1408 /* ReachabilityAndEmitFlags */, "node1.flags !== node2.flags");
        ts.forEachChild(node1, function (child1) {
            var childName = findChildName(node1, child1);
            var child2 = node2[childName];
            assertStructuralEquals(child1, child2);
        }, function (array1) {
            var childName = findChildName(node1, array1);
            var array2 = node2[childName];
            assertArrayStructuralEquals(array1, array2);
        });
    }
    Utils.assertStructuralEquals = assertStructuralEquals;
    function assertArrayStructuralEquals(array1, array2) {
        if (array1 === array2) {
            return;
        }
        assert(array1, "array1");
        assert(array2, "array2");
        assert.equal(array1.pos, array2.pos, "array1.pos !== array2.pos");
        assert.equal(array1.end, array2.end, "array1.end !== array2.end");
        assert.equal(array1.length, array2.length, "array1.length !== array2.length");
        for (var i = 0; i < array1.length; i++) {
            assertStructuralEquals(array1[i], array2[i]);
        }
    }
    function findChildName(parent, child) {
        for (var name in parent) {
            if (parent.hasOwnProperty(name) && parent[name] === child) {
                return name;
            }
        }
        throw new Error("Could not find child in parent");
    }
    var maxHarnessFrames = 1;
    function filterStack(error, stackTraceLimit) {
        if (stackTraceLimit === void 0) { stackTraceLimit = Infinity; }
        var stack = error.stack;
        if (stack) {
            var lines = stack.split(/\r\n?|\n/g);
            var filtered = [];
            var frameCount = 0;
            var harnessFrameCount = 0;
            for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
                var line = lines_2[_i];
                if (isStackFrame(line)) {
                    if (frameCount >= stackTraceLimit
                        || isMocha(line)
                        || isNode(line)) {
                        continue;
                    }
                    if (isHarness(line)) {
                        if (harnessFrameCount >= maxHarnessFrames) {
                            continue;
                        }
                        harnessFrameCount++;
                    }
                    line = line.replace(/\bfile:\/\/\/(.*?)(?=(:\d+)*($|\)))/, function (_, path) { return ts.sys.resolvePath(path); });
                    frameCount++;
                }
                filtered.push(line);
            }
            error.stack = filtered.join(Harness.IO.newLine());
        }
        return error;
    }
    Utils.filterStack = filterStack;
    function isStackFrame(line) {
        return /^\s+at\s/.test(line);
    }
    function isMocha(line) {
        return /[\\/](node_modules|components)[\\/]mocha(js)?[\\/]|[\\/]mocha\.js/.test(line);
    }
    function isNode(line) {
        return /\((timers|events|node|module)\.js:/.test(line);
    }
    function isHarness(line) {
        return /[\\/]src[\\/]harness[\\/]|[\\/]run\.js/.test(line);
    }
})(Utils || (Utils = {}));
var Harness;
(function (Harness) {
    // harness always uses one kind of new line
    // But note that `parseTestData` in `fourslash.ts` uses "\n"
    Harness.harnessNewLine = "\r\n";
    // Root for file paths that are stored in a virtual file system
    Harness.virtualFileSystemRoot = "/";
    function createNodeIO() {
        var fs, pathModule;
        if (require) {
            fs = require("fs");
            pathModule = require("path");
        }
        else {
            fs = pathModule = {};
        }
        function deleteFile(path) {
            try {
                fs.unlinkSync(path);
            }
            catch ( /*ignore*/_a) { /*ignore*/ }
        }
        function directoryName(path) {
            var dirPath = pathModule.dirname(path);
            // Node will just continue to repeat the root path, rather than return null
            return dirPath === path ? undefined : dirPath;
        }
        function enumerateTestFiles(runner) {
            return runner.enumerateTestFiles();
        }
        function listFiles(path, spec, options) {
            if (options === void 0) { options = {}; }
            function filesInFolder(folder) {
                var paths = [];
                for (var _i = 0, _a = fs.readdirSync(folder); _i < _a.length; _i++) {
                    var file = _a[_i];
                    var pathToFile = pathModule.join(folder, file);
                    var stat = fs.statSync(pathToFile);
                    if (options.recursive && stat.isDirectory()) {
                        paths = paths.concat(filesInFolder(pathToFile));
                    }
                    else if (stat.isFile() && (!spec || file.match(spec))) {
                        paths.push(pathToFile);
                    }
                }
                return paths;
            }
            return filesInFolder(path);
        }
        function getAccessibleFileSystemEntries(dirname) {
            try {
                var entries = fs.readdirSync(dirname || ".").sort(ts.sys.useCaseSensitiveFileNames ? ts.compareStringsCaseSensitive : ts.compareStringsCaseInsensitive);
                var files = [];
                var directories = [];
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    if (entry === "." || entry === "..")
                        continue;
                    var name = vpath.combine(dirname, entry);
                    try {
                        var stat = fs.statSync(name);
                        if (!stat)
                            continue;
                        if (stat.isFile()) {
                            files.push(entry);
                        }
                        else if (stat.isDirectory()) {
                            directories.push(entry);
                        }
                    }
                    catch ( /*ignore*/_a) { /*ignore*/ }
                }
                return { files: files, directories: directories };
            }
            catch (e) {
                return { files: [], directories: [] };
            }
        }
        function createDirectory(path) {
            try {
                fs.mkdirSync(path);
            }
            catch (e) {
                if (e.code === "ENOENT") {
                    createDirectory(vpath.dirname(path));
                    createDirectory(path);
                }
                else if (!ts.sys.directoryExists(path)) {
                    throw e;
                }
            }
        }
        return {
            newLine: function () { return Harness.harnessNewLine; },
            getCurrentDirectory: function () { return ts.sys.getCurrentDirectory(); },
            useCaseSensitiveFileNames: function () { return ts.sys.useCaseSensitiveFileNames; },
            resolvePath: function (path) { return ts.sys.resolvePath(path); },
            getFileSize: function (path) { return ts.sys.getFileSize(path); },
            readFile: function (path) { return ts.sys.readFile(path); },
            writeFile: function (path, content) { return ts.sys.writeFile(path, content); },
            directoryName: directoryName,
            getDirectories: function (path) { return ts.sys.getDirectories(path); },
            createDirectory: createDirectory,
            fileExists: function (path) { return ts.sys.fileExists(path); },
            directoryExists: function (path) { return ts.sys.directoryExists(path); },
            deleteFile: deleteFile,
            listFiles: listFiles,
            enumerateTestFiles: enumerateTestFiles,
            log: function (s) { return console.log(s); },
            args: function () { return ts.sys.args; },
            getExecutingFilePath: function () { return ts.sys.getExecutingFilePath(); },
            getWorkspaceRoot: function () { return vpath.resolve(__dirname, "../.."); },
            exit: function (exitCode) { return ts.sys.exit(exitCode); },
            readDirectory: function (path, extension, exclude, include, depth) { return ts.sys.readDirectory(path, extension, exclude, include, depth); },
            getAccessibleFileSystemEntries: getAccessibleFileSystemEntries,
            tryEnableSourceMapsForHost: function () { return ts.sys.tryEnableSourceMapsForHost && ts.sys.tryEnableSourceMapsForHost(); },
            getMemoryUsage: function () { return ts.sys.getMemoryUsage && ts.sys.getMemoryUsage(); },
            getEnvironmentVariable: function (name) { return ts.sys.getEnvironmentVariable(name); },
        };
    }
    function createBrowserIO() {
        var serverRoot = new URL("http://localhost:8888/");
        var HttpHeaders = /** @class */ (function (_super) {
            __extends(HttpHeaders, _super);
            function HttpHeaders(template) {
                var _this = _super.call(this, ts.compareStringsCaseInsensitive) || this;
                if (template) {
                    for (var key in template) {
                        if (ts.hasProperty(template, key)) {
                            _this.set(key, template[key]);
                        }
                    }
                }
                return _this;
            }
            HttpHeaders.combine = function (left, right) {
                if (!left && !right)
                    return undefined;
                var headers = new HttpHeaders();
                if (left)
                    left.forEach(function (value, key) { headers.set(key, value); });
                if (right)
                    right.forEach(function (value, key) { headers.set(key, value); });
                return headers;
            };
            HttpHeaders.prototype.has = function (key) {
                return _super.prototype.has.call(this, key.toLowerCase());
            };
            HttpHeaders.prototype.get = function (key) {
                return _super.prototype.get.call(this, key.toLowerCase());
            };
            HttpHeaders.prototype.set = function (key, value) {
                return _super.prototype.set.call(this, key.toLowerCase(), value);
            };
            HttpHeaders.prototype.delete = function (key) {
                return _super.prototype.delete.call(this, key.toLowerCase());
            };
            HttpHeaders.prototype.writeRequestHeaders = function (xhr) {
                this.forEach(function (values, key) {
                    if (key === "access-control-allow-origin" || key === "content-length")
                        return;
                    var value = Array.isArray(values) ? values.join(",") : values;
                    if (key === "content-type") {
                        xhr.overrideMimeType(value);
                        return;
                    }
                    xhr.setRequestHeader(key, value);
                });
            };
            HttpHeaders.readResponseHeaders = function (xhr) {
                var allHeaders = xhr.getAllResponseHeaders();
                var headers = new HttpHeaders();
                for (var _i = 0, _a = allHeaders.split(/\r\n/g); _i < _a.length; _i++) {
                    var header = _a[_i];
                    var colonIndex = header.indexOf(":");
                    if (colonIndex >= 0) {
                        var key = header.slice(0, colonIndex).trim();
                        var value = header.slice(colonIndex + 1).trim();
                        var values = value.split(",");
                        headers.set(key, values.length > 1 ? values : value);
                    }
                }
                return headers;
            };
            return HttpHeaders;
        }(collections.SortedMap));
        var HttpContent = /** @class */ (function () {
            function HttpContent(headers, content) {
                this.headers = headers instanceof HttpHeaders ? headers : new HttpHeaders(headers);
                this.content = content;
            }
            HttpContent.fromMediaType = function (mediaType, content) {
                return new HttpContent({ "Content-Type": mediaType }, content);
            };
            HttpContent.text = function (content) {
                return HttpContent.fromMediaType("text/plain", content);
            };
            HttpContent.json = function (content) {
                return HttpContent.fromMediaType("application/json", JSON.stringify(content));
            };
            HttpContent.readResponseContent = function (xhr) {
                if (typeof xhr.responseText === "string") {
                    return new HttpContent({
                        "Content-Type": xhr.getResponseHeader("Content-Type") || undefined,
                        "Content-Length": xhr.getResponseHeader("Content-Length") || undefined,
                    }, xhr.responseText);
                }
                return undefined;
            };
            HttpContent.prototype.writeRequestHeaders = function (xhr) {
                this.headers.writeRequestHeaders(xhr);
            };
            return HttpContent;
        }());
        var HttpRequestMessage = /** @class */ (function () {
            function HttpRequestMessage(method, url, headers, content) {
                this.method = method;
                this.url = typeof url === "string" ? new URL(url) : url;
                this.headers = headers instanceof HttpHeaders ? headers : new HttpHeaders(headers);
                this.content = content;
            }
            HttpRequestMessage.options = function (url) {
                return new HttpRequestMessage("OPTIONS", url);
            };
            HttpRequestMessage.head = function (url) {
                return new HttpRequestMessage("HEAD", url);
            };
            HttpRequestMessage.get = function (url) {
                return new HttpRequestMessage("GET", url);
            };
            HttpRequestMessage.delete = function (url) {
                return new HttpRequestMessage("DELETE", url);
            };
            HttpRequestMessage.put = function (url, content) {
                return new HttpRequestMessage("PUT", url, /*headers*/ undefined, content);
            };
            HttpRequestMessage.post = function (url, content) {
                return new HttpRequestMessage("POST", url, /*headers*/ undefined, content);
            };
            HttpRequestMessage.prototype.writeRequestHeaders = function (xhr) {
                this.headers.writeRequestHeaders(xhr);
                if (this.content) {
                    this.content.writeRequestHeaders(xhr);
                }
            };
            return HttpRequestMessage;
        }());
        var HttpResponseMessage = /** @class */ (function () {
            function HttpResponseMessage(statusCode, statusMessage, headers, content) {
                this.statusCode = statusCode;
                this.statusMessage = statusMessage;
                this.headers = headers instanceof HttpHeaders ? headers : new HttpHeaders(headers);
                this.content = content;
            }
            HttpResponseMessage.notFound = function () {
                return new HttpResponseMessage(404, "Not Found");
            };
            HttpResponseMessage.hasSuccessStatusCode = function (response) {
                return response.statusCode === 304 || (response.statusCode >= 200 && response.statusCode < 300);
            };
            HttpResponseMessage.readResponseMessage = function (xhr) {
                return new HttpResponseMessage(xhr.status, xhr.statusText, HttpHeaders.readResponseHeaders(xhr), HttpContent.readResponseContent(xhr));
            };
            return HttpResponseMessage;
        }());
        function send(request) {
            var xhr = new XMLHttpRequest();
            try {
                xhr.open(request.method, request.url.toString(), /*async*/ false);
                request.writeRequestHeaders(xhr);
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.send(request.content && request.content.content);
                while (xhr.readyState !== 4)
                    ; // block until ready
                return HttpResponseMessage.readResponseMessage(xhr);
            }
            catch (e) {
                return HttpResponseMessage.notFound();
            }
        }
        var caseSensitivity;
        function useCaseSensitiveFileNames() {
            if (!caseSensitivity) {
                var response = send(HttpRequestMessage.options(new URL("*", serverRoot)));
                var xCaseSensitivity = response.headers.get("X-Case-Sensitivity");
                caseSensitivity = xCaseSensitivity === "CS" ? "CS" : "CI";
            }
            return caseSensitivity === "CS";
        }
        function resolvePath(path) {
            var response = send(HttpRequestMessage.post(new URL("/api/resolve", serverRoot), HttpContent.text(path)));
            return HttpResponseMessage.hasSuccessStatusCode(response) && response.content ? response.content.content : undefined;
        }
        function getFileSize(path) {
            var response = send(HttpRequestMessage.head(new URL(path, serverRoot)));
            return HttpResponseMessage.hasSuccessStatusCode(response) ? +response.headers.get("Content-Length").toString() : 0;
        }
        function readFile(path) {
            var response = send(HttpRequestMessage.get(new URL(path, serverRoot)));
            return HttpResponseMessage.hasSuccessStatusCode(response) && response.content ? response.content.content : undefined;
        }
        function writeFile(path, contents) {
            send(HttpRequestMessage.put(new URL(path, serverRoot), HttpContent.text(contents)));
        }
        function fileExists(path) {
            var response = send(HttpRequestMessage.head(new URL(path, serverRoot)));
            return HttpResponseMessage.hasSuccessStatusCode(response);
        }
        function directoryExists(path) {
            var response = send(HttpRequestMessage.post(new URL("/api/directoryExists", serverRoot), HttpContent.text(path)));
            return hasJsonContent(response) && JSON.parse(response.content.content);
        }
        function deleteFile(path) {
            send(HttpRequestMessage.delete(new URL(path, serverRoot)));
        }
        function directoryName(path) {
            var url = new URL(path, serverRoot);
            return ts.getDirectoryPath(ts.normalizeSlashes(url.pathname || "/"));
        }
        function enumerateTestFiles(runner) {
            var response = send(HttpRequestMessage.post(new URL("/api/enumerateTestFiles", serverRoot), HttpContent.text(runner.kind())));
            return hasJsonContent(response) ? JSON.parse(response.content.content) : [];
        }
        function listFiles(dirname, spec, options) {
            if (spec || (options && !options.recursive)) {
                var results = Harness.IO.listFiles(dirname);
                if (spec) {
                    results = results.filter(function (file) { return spec.test(file); });
                }
                if (options && !options.recursive) {
                    results = results.filter(function (file) { return ts.getDirectoryPath(ts.normalizeSlashes(file)) === dirname; });
                }
                return results;
            }
            var response = send(HttpRequestMessage.post(new URL("/api/listFiles", serverRoot), HttpContent.text(dirname)));
            return hasJsonContent(response) ? JSON.parse(response.content.content) : [];
        }
        function readDirectory(path, extension, exclude, include, depth) {
            return ts.matchFiles(path, extension, exclude, include, useCaseSensitiveFileNames(), "", depth, getAccessibleFileSystemEntries);
        }
        function getAccessibleFileSystemEntries(dirname) {
            var response = send(HttpRequestMessage.post(new URL("/api/getAccessibleFileSystemEntries", serverRoot), HttpContent.text(dirname)));
            return hasJsonContent(response) ? JSON.parse(response.content.content) : { files: [], directories: [] };
        }
        function hasJsonContent(response) {
            return HttpResponseMessage.hasSuccessStatusCode(response)
                && !!response.content
                && /^application\/json(;.*)$/.test("" + response.content.headers.get("Content-Type"));
        }
        return {
            newLine: function () { return Harness.harnessNewLine; },
            getCurrentDirectory: function () { return ""; },
            useCaseSensitiveFileNames: useCaseSensitiveFileNames,
            resolvePath: resolvePath,
            getFileSize: getFileSize,
            readFile: readFile,
            writeFile: writeFile,
            directoryName: Utils.memoize(directoryName, function (path) { return path; }),
            getDirectories: function () { return []; },
            createDirectory: function () { },
            fileExists: fileExists,
            directoryExists: directoryExists,
            deleteFile: deleteFile,
            listFiles: Utils.memoize(listFiles, function (path, spec, options) { return path + "|" + spec + "|" + (options ? options.recursive === true : true); }),
            enumerateTestFiles: Utils.memoize(enumerateTestFiles, function (runner) { return runner.kind(); }),
            log: function (s) { return console.log(s); },
            args: function () { return []; },
            getExecutingFilePath: function () { return ""; },
            exit: function () { },
            readDirectory: readDirectory,
            getAccessibleFileSystemEntries: getAccessibleFileSystemEntries,
            getWorkspaceRoot: function () { return "/"; }
        };
    }
    function mockHash(s) {
        return "hash-" + s;
    }
    Harness.mockHash = mockHash;
    var environment = Utils.getExecutionEnvironment();
    switch (environment) {
        case 0 /* Node */:
            Harness.IO = createNodeIO();
            break;
        case 1 /* Browser */:
            Harness.IO = createBrowserIO();
            break;
        default:
            throw new Error("Unknown value '" + environment + "' for ExecutionEnvironment.");
    }
})(Harness || (Harness = {}));
if (Harness.IO.tryEnableSourceMapsForHost && /^development$/i.test(Harness.IO.getEnvironmentVariable("NODE_ENV"))) {
    Harness.IO.tryEnableSourceMapsForHost();
}
(function (Harness) {
    Harness.libFolder = "built/local/";
    var tcServicesFileName = ts.combinePaths(Harness.libFolder, Utils.getExecutionEnvironment() === 1 /* Browser */ ? "typescriptServicesInBrowserTest.js" : "typescriptServices.js");
    Harness.tcServicesFile = Harness.IO.readFile(tcServicesFileName) + (Utils.getExecutionEnvironment() !== 1 /* Browser */
        ? Harness.IO.newLine() + ("//# sourceURL=" + Harness.IO.resolvePath(tcServicesFileName))
        : "");
    // Settings
    Harness.userSpecifiedRoot = "";
    Harness.lightMode = false;
    /** Functionality for compiling TypeScript code */
    var Compiler;
    (function (Compiler) {
        /** Aggregate various writes into a single array of lines. Useful for passing to the
         *  TypeScript compiler to fill with source code or errors.
         */
        var WriterAggregator = /** @class */ (function () {
            function WriterAggregator() {
                this.lines = [];
                this.currentLine = undefined;
            }
            WriterAggregator.prototype.Write = function (str) {
                // out of memory usage concerns avoid using + or += if we're going to do any manipulation of this string later
                this.currentLine = [(this.currentLine || ""), str].join("");
            };
            WriterAggregator.prototype.WriteLine = function (str) {
                // out of memory usage concerns avoid using + or += if we're going to do any manipulation of this string later
                this.lines.push([(this.currentLine || ""), str].join(""));
                this.currentLine = undefined;
            };
            WriterAggregator.prototype.Close = function () {
                if (this.currentLine !== undefined) {
                    this.lines.push(this.currentLine);
                }
                this.currentLine = undefined;
            };
            WriterAggregator.prototype.reset = function () {
                this.lines = [];
                this.currentLine = undefined;
            };
            return WriterAggregator;
        }());
        Compiler.WriterAggregator = WriterAggregator;
        function createSourceFileAndAssertInvariants(fileName, sourceText, languageVersion) {
            // We'll only assert invariants outside of light mode.
            var shouldAssertInvariants = !Harness.lightMode;
            // Only set the parent nodes if we're asserting invariants.  We don't need them otherwise.
            var result = ts.createSourceFile(fileName, sourceText, languageVersion, /*setParentNodes:*/ shouldAssertInvariants);
            if (shouldAssertInvariants) {
                Utils.assertInvariants(result, /*parent:*/ undefined);
            }
            return result;
        }
        Compiler.createSourceFileAndAssertInvariants = createSourceFileAndAssertInvariants;
        Compiler.defaultLibFileName = "lib.d.ts";
        Compiler.es2015DefaultLibFileName = "lib.es2015.d.ts";
        // Cache of lib files from "built/local"
        var libFileNameSourceFileMap;
        function getDefaultLibrarySourceFile(fileName) {
            if (fileName === void 0) { fileName = Compiler.defaultLibFileName; }
            var _a;
            if (!isDefaultLibraryFile(fileName)) {
                return undefined;
            }
            if (!libFileNameSourceFileMap) {
                libFileNameSourceFileMap = ts.createMapFromTemplate((_a = {},
                    _a[Compiler.defaultLibFileName] = createSourceFileAndAssertInvariants(Compiler.defaultLibFileName, Harness.IO.readFile(Harness.libFolder + "lib.es5.d.ts"), /*languageVersion*/ 6 /* Latest */),
                    _a));
            }
            var sourceFile = libFileNameSourceFileMap.get(fileName);
            if (!sourceFile) {
                libFileNameSourceFileMap.set(fileName, sourceFile = createSourceFileAndAssertInvariants(fileName, Harness.IO.readFile(Harness.libFolder + fileName), 6 /* Latest */));
            }
            return sourceFile;
        }
        Compiler.getDefaultLibrarySourceFile = getDefaultLibrarySourceFile;
        function getDefaultLibFileName(options) {
            switch (options.target) {
                case 6 /* ESNext */:
                case 4 /* ES2017 */:
                    return "lib.es2017.d.ts";
                case 3 /* ES2016 */:
                    return "lib.es2016.d.ts";
                case 2 /* ES2015 */:
                    return Compiler.es2015DefaultLibFileName;
                default:
                    return Compiler.defaultLibFileName;
            }
        }
        Compiler.getDefaultLibFileName = getDefaultLibFileName;
        // Cache these between executions so we don't have to re-parse them for every test
        Compiler.fourslashFileName = "fourslash.ts";
        function getCanonicalFileName(fileName) {
            return fileName;
        }
        Compiler.getCanonicalFileName = getCanonicalFileName;
        // Additional options not already in ts.optionDeclarations
        var harnessOptionDeclarations = [
            { name: "allowNonTsExtensions", type: "boolean" },
            { name: "useCaseSensitiveFileNames", type: "boolean" },
            { name: "baselineFile", type: "string" },
            { name: "includeBuiltFile", type: "string" },
            { name: "fileName", type: "string" },
            { name: "libFiles", type: "string" },
            { name: "noErrorTruncation", type: "boolean" },
            { name: "suppressOutputPathCheck", type: "boolean" },
            { name: "noImplicitReferences", type: "boolean" },
            { name: "currentDirectory", type: "string" },
            { name: "symlink", type: "string" },
            // Emitted js baseline will print full paths for every output file
            { name: "fullEmitPaths", type: "boolean" }
        ];
        var optionsIndex;
        function getCommandLineOption(name) {
            if (!optionsIndex) {
                optionsIndex = ts.createMap();
                var optionDeclarations = harnessOptionDeclarations.concat(ts.optionDeclarations);
                for (var _i = 0, optionDeclarations_1 = optionDeclarations; _i < optionDeclarations_1.length; _i++) {
                    var option = optionDeclarations_1[_i];
                    optionsIndex.set(option.name.toLowerCase(), option);
                }
            }
            return optionsIndex.get(name.toLowerCase());
        }
        function setCompilerOptionsFromHarnessSetting(settings, options) {
            for (var name in settings) {
                if (settings.hasOwnProperty(name)) {
                    var value = settings[name];
                    if (value === undefined) {
                        throw new Error("Cannot have undefined value for compiler option '" + name + "'.");
                    }
                    var option = getCommandLineOption(name);
                    if (option) {
                        var errors = [];
                        options[option.name] = optionValue(option, value, errors);
                        if (errors.length > 0) {
                            throw new Error("Unknown value '" + value + "' for compiler option '" + name + "'.");
                        }
                    }
                    else {
                        throw new Error("Unknown compiler option '" + name + "'.");
                    }
                }
            }
        }
        Compiler.setCompilerOptionsFromHarnessSetting = setCompilerOptionsFromHarnessSetting;
        function optionValue(option, value, errors) {
            switch (option.type) {
                case "boolean":
                    return value.toLowerCase() === "true";
                case "string":
                    return value;
                case "number": {
                    var numverValue = parseInt(value, 10);
                    if (isNaN(numverValue)) {
                        throw new Error("Value must be a number, got: " + JSON.stringify(value));
                    }
                    return numverValue;
                }
                // If not a primitive, the possible types are specified in what is effectively a map of options.
                case "list":
                    return ts.parseListTypeOption(option, value, errors);
                default:
                    return ts.parseCustomTypeOption(option, value, errors);
            }
        }
        function compileFiles(inputFiles, otherFiles, harnessSettings, compilerOptions, 
        // Current directory is needed for rwcRunner to be able to use currentDirectory defined in json file
        currentDirectory) {
            var options = compilerOptions ? ts.cloneCompilerOptions(compilerOptions) : { noResolve: false };
            options.target = options.target || 0 /* ES3 */;
            options.newLine = options.newLine || 0 /* CarriageReturnLineFeed */;
            options.noErrorTruncation = true;
            options.skipDefaultLibCheck = typeof options.skipDefaultLibCheck === "undefined" ? true : options.skipDefaultLibCheck;
            if (typeof currentDirectory === "undefined") {
                currentDirectory = vfs.srcFolder;
            }
            // Parse settings
            if (harnessSettings) {
                setCompilerOptionsFromHarnessSetting(harnessSettings, options);
            }
            if (options.rootDirs) {
                options.rootDirs = ts.map(options.rootDirs, function (d) { return ts.getNormalizedAbsolutePath(d, currentDirectory); });
            }
            var useCaseSensitiveFileNames = options.useCaseSensitiveFileNames !== undefined ? options.useCaseSensitiveFileNames : true;
            var programFileNames = inputFiles.map(function (file) { return file.unitName; }).filter(function (fileName) { return !ts.fileExtensionIs(fileName, ".json" /* Json */); });
            // Files from built\local that are requested by test "@includeBuiltFiles" to be in the context.
            // Treat them as library files, so include them in build, but not in baselines.
            if (options.includeBuiltFile) {
                programFileNames.push(vpath.combine(vfs.builtFolder, options.includeBuiltFile));
            }
            // Files from tests\lib that are requested by "@libFiles"
            if (options.libFiles) {
                for (var _i = 0, _a = options.libFiles.split(","); _i < _a.length; _i++) {
                    var fileName = _a[_i];
                    programFileNames.push(vpath.combine(vfs.testLibFolder, fileName));
                }
            }
            var docs = inputFiles.concat(otherFiles).map(documents.TextDocument.fromTestFile);
            var fs = vfs.createFromFileSystem(Harness.IO, !useCaseSensitiveFileNames, { documents: docs, cwd: currentDirectory });
            var host = new fakes.CompilerHost(fs, options);
            return compiler.compileFiles(host, programFileNames, options);
        }
        Compiler.compileFiles = compileFiles;
        function prepareDeclarationCompilationContext(inputFiles, otherFiles, result, harnessSettings, options, 
        // Current directory is needed for rwcRunner to be able to use currentDirectory defined in json file
        currentDirectory) {
            if (options.declaration && result.diagnostics.length === 0) {
                if (options.emitDeclarationOnly) {
                    if (result.js.size > 0 || result.dts.size === 0) {
                        throw new Error("Only declaration files should be generated when emitDeclarationOnly:true");
                    }
                }
                else if (result.dts.size !== result.getNumberOfJsFiles()) {
                    throw new Error("There were no errors and declFiles generated did not match number of js files generated");
                }
            }
            var declInputFiles = [];
            var declOtherFiles = [];
            // if the .d.ts is non-empty, confirm it compiles correctly as well
            if (options.declaration && result.diagnostics.length === 0 && result.dts.size > 0) {
                ts.forEach(inputFiles, function (file) { return addDtsFile(file, declInputFiles); });
                ts.forEach(otherFiles, function (file) { return addDtsFile(file, declOtherFiles); });
                return { declInputFiles: declInputFiles, declOtherFiles: declOtherFiles, harnessSettings: harnessSettings, options: options, currentDirectory: currentDirectory || harnessSettings.currentDirectory };
            }
            function addDtsFile(file, dtsFiles) {
                if (vpath.isDeclaration(file.unitName)) {
                    dtsFiles.push(file);
                }
                else if (vpath.isTypeScript(file.unitName)) {
                    var declFile = findResultCodeFile(file.unitName);
                    if (declFile && !findUnit(declFile.file, declInputFiles) && !findUnit(declFile.file, declOtherFiles)) {
                        dtsFiles.push({ unitName: declFile.file, content: utils.removeByteOrderMark(declFile.text) });
                    }
                }
            }
            function findResultCodeFile(fileName) {
                var sourceFile = result.program.getSourceFile(fileName);
                assert(sourceFile, "Program has no source file with name '" + fileName + "'");
                // Is this file going to be emitted separately
                var sourceFileName;
                var outFile = options.outFile || options.out;
                if (!outFile) {
                    if (options.outDir) {
                        var sourceFilePath = ts.getNormalizedAbsolutePath(sourceFile.fileName, result.vfs.cwd());
                        sourceFilePath = sourceFilePath.replace(result.program.getCommonSourceDirectory(), "");
                        sourceFileName = ts.combinePaths(options.outDir, sourceFilePath);
                    }
                    else {
                        sourceFileName = sourceFile.fileName;
                    }
                }
                else {
                    // Goes to single --out file
                    sourceFileName = outFile;
                }
                var dTsFileName = ts.removeFileExtension(sourceFileName) + ".d.ts" /* Dts */;
                return result.dts.get(dTsFileName);
            }
            function findUnit(fileName, units) {
                return ts.forEach(units, function (unit) { return unit.unitName === fileName ? unit : undefined; });
            }
        }
        Compiler.prepareDeclarationCompilationContext = prepareDeclarationCompilationContext;
        function compileDeclarationFiles(context) {
            if (!context) {
                return;
            }
            var declInputFiles = context.declInputFiles, declOtherFiles = context.declOtherFiles, harnessSettings = context.harnessSettings, options = context.options, currentDirectory = context.currentDirectory;
            var output = compileFiles(declInputFiles, declOtherFiles, harnessSettings, options, currentDirectory);
            return { declInputFiles: declInputFiles, declOtherFiles: declOtherFiles, declResult: output };
        }
        Compiler.compileDeclarationFiles = compileDeclarationFiles;
        function minimalDiagnosticsToString(diagnostics, pretty) {
            var host = { getCanonicalFileName: getCanonicalFileName, getCurrentDirectory: function () { return ""; }, getNewLine: function () { return Harness.IO.newLine(); } };
            return (pretty ? ts.formatDiagnosticsWithColorAndContext : ts.formatDiagnostics)(diagnostics, host);
        }
        Compiler.minimalDiagnosticsToString = minimalDiagnosticsToString;
        function getErrorBaseline(inputFiles, diagnostics, pretty) {
            var _a;
            var outputLines = "";
            var gen = iterateErrorBaseline(inputFiles, diagnostics, { pretty: pretty });
            for (var _b = gen.next(), done = _b.done, value = _b.value; !done; _a = gen.next(), done = _a.done, value = _a.value, _a) {
                var content = value[1];
                outputLines += content;
            }
            return outputLines;
        }
        Compiler.getErrorBaseline = getErrorBaseline;
        Compiler.diagnosticSummaryMarker = "__diagnosticSummary";
        Compiler.globalErrorsMarker = "__globalErrors";
        function iterateErrorBaseline(inputFiles, diagnostics, options) {
            function newLine() {
                if (firstLine) {
                    firstLine = false;
                    return "";
                }
                return "\r\n";
            }
            function outputErrorText(error) {
                var message = ts.flattenDiagnosticMessageText(error.messageText, Harness.IO.newLine());
                var errLines = utils.removeTestPathPrefixes(message)
                    .split("\n")
                    .map(function (s) { return s.length > 0 && s.charAt(s.length - 1) === "\r" ? s.substr(0, s.length - 1) : s; })
                    .filter(function (s) { return s.length > 0; })
                    .map(function (s) { return "!!! " + ts.diagnosticCategoryName(error) + " TS" + error.code + ": " + s; });
                errLines.forEach(function (e) { return outputLines += (newLine() + e); });
                errorsReported++;
                // do not count errors from lib.d.ts here, they are computed separately as numLibraryDiagnostics
                // if lib.d.ts is explicitly included in input files and there are some errors in it (i.e. because of duplicate identifiers)
                // then they will be added twice thus triggering 'total errors' assertion with condition
                // 'totalErrorsReportedInNonLibraryFiles + numLibraryDiagnostics + numTest262HarnessDiagnostics, diagnostics.length
                if (!error.file || !isDefaultLibraryFile(error.file.fileName)) {
                    totalErrorsReportedInNonLibraryFiles++;
                }
            }
            var outputLines, totalErrorsReportedInNonLibraryFiles, errorsReported, firstLine, globalErrors, dupeCase, _loop_1, _i, _a, inputFile, numLibraryDiagnostics, numTest262HarnessDiagnostics;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        diagnostics = ts.sort(diagnostics, ts.compareDiagnostics);
                        outputLines = "";
                        totalErrorsReportedInNonLibraryFiles = 0;
                        errorsReported = 0;
                        firstLine = true;
                        return [4 /*yield*/, [Compiler.diagnosticSummaryMarker, utils.removeTestPathPrefixes(minimalDiagnosticsToString(diagnostics, options && options.pretty)) + Harness.IO.newLine() + Harness.IO.newLine(), diagnostics.length]];
                    case 1:
                        _b.sent();
                        globalErrors = diagnostics.filter(function (err) { return !err.file; });
                        globalErrors.forEach(outputErrorText);
                        return [4 /*yield*/, [Compiler.globalErrorsMarker, outputLines, errorsReported]];
                    case 2:
                        _b.sent();
                        outputLines = "";
                        errorsReported = 0;
                        dupeCase = ts.createMap();
                        _loop_1 = function (inputFile) {
                            var fileErrors, markedErrorCount, lineStarts, lines, isDupe;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fileErrors = diagnostics.filter(function (e) {
                                            var errFn = e.file;
                                            return !!errFn && ts.comparePaths(utils.removeTestPathPrefixes(errFn.fileName), utils.removeTestPathPrefixes(inputFile.unitName), options && options.currentDirectory || "", !(options && options.caseSensitive)) === 0 /* EqualTo */;
                                        });
                                        // Header
                                        outputLines += (newLine() + "==== " + inputFile.unitName + " (" + fileErrors.length + " errors) ====");
                                        markedErrorCount = 0;
                                        lineStarts = ts.computeLineStarts(inputFile.content);
                                        lines = inputFile.content.split("\n");
                                        if (lines.length === 1) {
                                            lines = lines[0].split("\r");
                                        }
                                        lines.forEach(function (line, lineIndex) {
                                            if (line.length > 0 && line.charAt(line.length - 1) === "\r") {
                                                line = line.substr(0, line.length - 1);
                                            }
                                            var thisLineStart = lineStarts[lineIndex];
                                            var nextLineStart;
                                            // On the last line of the file, fake the next line start number so that we handle errors on the last character of the file correctly
                                            if (lineIndex === lines.length - 1) {
                                                nextLineStart = inputFile.content.length;
                                            }
                                            else {
                                                nextLineStart = lineStarts[lineIndex + 1];
                                            }
                                            // Emit this line from the original file
                                            outputLines += (newLine() + "    " + line);
                                            fileErrors.forEach(function (errDiagnostic) {
                                                var err = errDiagnostic; // TODO: GH#18217
                                                // Does any error start or continue on to this line? Emit squiggles
                                                var end = ts.textSpanEnd(err);
                                                if ((end >= thisLineStart) && ((err.start < nextLineStart) || (lineIndex === lines.length - 1))) {
                                                    // How many characters from the start of this line the error starts at (could be positive or negative)
                                                    var relativeOffset = err.start - thisLineStart;
                                                    // How many characters of the error are on this line (might be longer than this line in reality)
                                                    var length = (end - err.start) - Math.max(0, thisLineStart - err.start);
                                                    // Calculate the start of the squiggle
                                                    var squiggleStart = Math.max(0, relativeOffset);
                                                    // TODO/REVIEW: this doesn't work quite right in the browser if a multi file test has files whose names are just the right length relative to one another
                                                    outputLines += (newLine() + "    " + line.substr(0, squiggleStart).replace(/[^\s]/g, " ") + new Array(Math.min(length, line.length - squiggleStart) + 1).join("~"));
                                                    // If the error ended here, or we're at the end of the file, emit its message
                                                    if ((lineIndex === lines.length - 1) || nextLineStart > end) {
                                                        // Just like above, we need to do a split on a string instead of on a regex
                                                        // because the JS engine does regexes wrong
                                                        outputErrorText(errDiagnostic);
                                                        markedErrorCount++;
                                                    }
                                                }
                                            });
                                        });
                                        // Verify we didn't miss any errors in this file
                                        assert.equal(markedErrorCount, fileErrors.length, "count of errors in " + inputFile.unitName);
                                        isDupe = dupeCase.has(sanitizeTestFilePath(inputFile.unitName));
                                        return [4 /*yield*/, [checkDuplicatedFileName(inputFile.unitName, dupeCase), outputLines, errorsReported]];
                                    case 1:
                                        _a.sent();
                                        if (isDupe && !(options && options.caseSensitive)) {
                                            // Case-duplicated files on a case-insensitive build will have errors reported in both the dupe and the original
                                            // thanks to the canse-insensitive path comparison on the error file path - We only want to count those errors once
                                            // for the assert below, so we subtract them here.
                                            totalErrorsReportedInNonLibraryFiles -= errorsReported;
                                        }
                                        outputLines = "";
                                        errorsReported = 0;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _a = inputFiles.filter(function (f) { return f.content !== undefined; });
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        inputFile = _a[_i];
                        return [5 /*yield**/, _loop_1(inputFile)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        numLibraryDiagnostics = ts.countWhere(diagnostics, function (diagnostic) {
                            return !!diagnostic.file && (isDefaultLibraryFile(diagnostic.file.fileName) || isBuiltFile(diagnostic.file.fileName));
                        });
                        numTest262HarnessDiagnostics = ts.countWhere(diagnostics, function (diagnostic) {
                            // Count an error generated from tests262-harness folder.This should only apply for test262
                            return !!diagnostic.file && diagnostic.file.fileName.indexOf("test262-harness") >= 0;
                        });
                        // Verify we didn't miss any errors in total
                        assert.equal(totalErrorsReportedInNonLibraryFiles + numLibraryDiagnostics + numTest262HarnessDiagnostics, diagnostics.length, "total number of errors");
                        return [2 /*return*/];
                }
            });
        }
        Compiler.iterateErrorBaseline = iterateErrorBaseline;
        function doErrorBaseline(baselinePath, inputFiles, errors, pretty) {
            Baseline.runBaseline(baselinePath.replace(/\.tsx?$/, ".errors.txt"), function () {
                if (!errors || (errors.length === 0)) {
                    /* tslint:disable:no-null-keyword */
                    return null;
                    /* tslint:enable:no-null-keyword */
                }
                return getErrorBaseline(inputFiles, errors, pretty);
            });
        }
        Compiler.doErrorBaseline = doErrorBaseline;
        function doTypeAndSymbolBaseline(baselinePath, program, allFiles, opts, multifile, skipTypeBaselines, skipSymbolBaselines) {
            // The full walker simulates the types that you would get from doing a full
            // compile.  The pull walker simulates the types you get when you just do
            // a type query for a random node (like how the LS would do it).  Most of the
            // time, these will be the same.  However, occasionally, they can be different.
            // Specifically, when the compiler internally depends on symbol IDs to order
            // things, then we may see different results because symbols can be created in a
            // different order with 'pull' operations, and thus can produce slightly differing
            // output.
            //
            // For example, with a full type check, we may see a type displayed as: number | string
            // But with a pull type check, we may see it as:                        string | number
            //
            // These types are equivalent, but depend on what order the compiler observed
            // certain parts of the program.
            var fullWalker = new TypeWriterWalker(program, /*fullTypeCheck*/ true);
            // Produce baselines.  The first gives the types for all expressions.
            // The second gives symbols for all identifiers.
            var typesError, symbolsError;
            try {
                checkBaseLines(/*isSymbolBaseLine*/ false);
            }
            catch (e) {
                typesError = e;
            }
            try {
                checkBaseLines(/*isSymbolBaseLine*/ true);
            }
            catch (e) {
                symbolsError = e;
            }
            if (typesError && symbolsError) {
                throw new Error(typesError.stack + Harness.IO.newLine() + symbolsError.stack);
            }
            if (typesError) {
                throw typesError;
            }
            if (symbolsError) {
                throw symbolsError;
            }
            return;
            function checkBaseLines(isSymbolBaseLine) {
                var fullExtension = isSymbolBaseLine ? ".symbols" : ".types";
                // When calling this function from rwc-runner, the baselinePath will have no extension.
                // As rwc test- file is stored in json which ".json" will get stripped off.
                // When calling this function from compiler-runner, the baselinePath will then has either ".ts" or ".tsx" extension
                var outputFileName = ts.endsWith(baselinePath, ".ts" /* Ts */) || ts.endsWith(baselinePath, ".tsx" /* Tsx */) ?
                    baselinePath.replace(/\.tsx?/, "") : baselinePath;
                if (!multifile) {
                    var fullBaseLine_1 = generateBaseLine(isSymbolBaseLine, isSymbolBaseLine ? skipSymbolBaselines : skipTypeBaselines);
                    Baseline.runBaseline(outputFileName + fullExtension, function () { return fullBaseLine_1; }, opts);
                }
                else {
                    Baseline.runMultifileBaseline(outputFileName, fullExtension, function () {
                        return iterateBaseLine(isSymbolBaseLine, isSymbolBaseLine ? skipSymbolBaselines : skipTypeBaselines);
                    }, opts);
                }
            }
            function generateBaseLine(isSymbolBaseline, skipBaseline) {
                var _a;
                var result = "";
                var gen = iterateBaseLine(isSymbolBaseline, skipBaseline);
                for (var _b = gen.next(), done = _b.done, value = _b.value; !done; _a = gen.next(), done = _a.done, value = _a.value, _a) {
                    var content = value[1];
                    result += content;
                }
                /* tslint:disable:no-null-keyword */
                return result || null;
                /* tslint:enable:no-null-keyword */
            }
            function iterateBaseLine(isSymbolBaseline, skipBaseline) {
                var _a, dupeCase, _i, allFiles_1, file, unitName, typeLines, codeLines, gen, lastIndexWritten, _b, done, result, typeOrSymbolString, formattedLine, _c, codeLines_1, codeLine;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (skipBaseline) {
                                return [2 /*return*/];
                            }
                            dupeCase = ts.createMap();
                            _i = 0, allFiles_1 = allFiles;
                            _d.label = 1;
                        case 1:
                            if (!(_i < allFiles_1.length)) return [3 /*break*/, 4];
                            file = allFiles_1[_i];
                            unitName = file.unitName;
                            typeLines = "=== " + unitName + " ===\r\n";
                            codeLines = ts.flatMap(file.content.split(/\r?\n/g), function (e) { return e.split(/[\r\u2028\u2029]/g); });
                            gen = isSymbolBaseline ? fullWalker.getSymbols(unitName) : fullWalker.getTypes(unitName);
                            lastIndexWritten = void 0;
                            for (_b = gen.next(), done = _b.done, result = _b.value; !done; _a = gen.next(), done = _a.done, result = _a.value, _a) {
                                if (isSymbolBaseline && !result.symbol) {
                                    return [2 /*return*/];
                                }
                                if (lastIndexWritten === undefined) {
                                    typeLines += codeLines.slice(0, result.line + 1).join("\r\n") + "\r\n";
                                }
                                else if (result.line !== lastIndexWritten) {
                                    if (!((lastIndexWritten + 1 < codeLines.length) && (codeLines[lastIndexWritten + 1].match(/^\s*[{|}]\s*$/) || codeLines[lastIndexWritten + 1].trim() === ""))) {
                                        typeLines += "\r\n";
                                    }
                                    typeLines += codeLines.slice(lastIndexWritten + 1, result.line + 1).join("\r\n") + "\r\n";
                                }
                                lastIndexWritten = result.line;
                                typeOrSymbolString = isSymbolBaseline ? result.symbol : result.type;
                                formattedLine = result.sourceText.replace(/\r?\n/g, "") + " : " + typeOrSymbolString;
                                typeLines += ">" + formattedLine + "\r\n";
                            }
                            // Preserve legacy behavior
                            if (lastIndexWritten === undefined) {
                                for (_c = 0, codeLines_1 = codeLines; _c < codeLines_1.length; _c++) {
                                    codeLine = codeLines_1[_c];
                                    typeLines += codeLine + "\r\nNo type information for this code.";
                                }
                            }
                            else {
                                if (lastIndexWritten + 1 < codeLines.length) {
                                    if (!((lastIndexWritten + 1 < codeLines.length) && (codeLines[lastIndexWritten + 1].match(/^\s*[{|}]\s*$/) || codeLines[lastIndexWritten + 1].trim() === ""))) {
                                        typeLines += "\r\n";
                                    }
                                    typeLines += codeLines.slice(lastIndexWritten + 1).join("\r\n");
                                }
                                typeLines += "\r\n";
                            }
                            return [4 /*yield*/, [checkDuplicatedFileName(unitName, dupeCase), utils.removeTestPathPrefixes(typeLines)]];
                        case 2:
                            _d.sent();
                            _d.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }
        }
        Compiler.doTypeAndSymbolBaseline = doTypeAndSymbolBaseline;
        function doSourcemapBaseline(baselinePath, options, result, harnessSettings) {
            var declMaps = ts.getAreDeclarationMapsEnabled(options);
            if (options.inlineSourceMap) {
                if (result.maps.size > 0 && !declMaps) {
                    throw new Error("No sourcemap files should be generated if inlineSourceMaps was set.");
                }
                return;
            }
            else if (options.sourceMap || declMaps) {
                if (result.maps.size !== (result.getNumberOfJsFiles() * (declMaps && options.sourceMap ? 2 : 1))) {
                    throw new Error("Number of sourcemap files should be same as js files.");
                }
                Baseline.runBaseline(baselinePath.replace(/\.tsx?/, ".js.map"), function () {
                    if ((options.noEmitOnError && result.diagnostics.length !== 0) || result.maps.size === 0) {
                        // We need to return null here or the runBaseLine will actually create a empty file.
                        // Baselining isn't required here because there is no output.
                        /* tslint:disable:no-null-keyword */
                        return null;
                        /* tslint:enable:no-null-keyword */
                    }
                    var sourceMapCode = "";
                    result.maps.forEach(function (sourceMap) {
                        sourceMapCode += fileOutput(sourceMap, harnessSettings);
                    });
                    return sourceMapCode;
                });
            }
        }
        Compiler.doSourcemapBaseline = doSourcemapBaseline;
        function doJsEmitBaseline(baselinePath, header, options, result, tsConfigFiles, toBeCompiled, otherFiles, harnessSettings) {
            if (!options.noEmit && !options.emitDeclarationOnly && result.js.size === 0 && result.diagnostics.length === 0) {
                throw new Error("Expected at least one js file to be emitted or at least one error to be created.");
            }
            // check js output
            Baseline.runBaseline(baselinePath.replace(/\.tsx?/, ".js" /* Js */), function () {
                var tsCode = "";
                var tsSources = otherFiles.concat(toBeCompiled);
                if (tsSources.length > 1) {
                    tsCode += "//// [" + header + "] ////\r\n\r\n";
                }
                for (var i = 0; i < tsSources.length; i++) {
                    tsCode += "//// [" + ts.getBaseFileName(tsSources[i].unitName) + "]\r\n";
                    tsCode += tsSources[i].content + (i < (tsSources.length - 1) ? "\r\n" : "");
                }
                var jsCode = "";
                result.js.forEach(function (file) {
                    jsCode += fileOutput(file, harnessSettings);
                });
                if (result.dts.size > 0) {
                    jsCode += "\r\n\r\n";
                    result.dts.forEach(function (declFile) {
                        jsCode += fileOutput(declFile, harnessSettings);
                    });
                }
                var declFileContext = prepareDeclarationCompilationContext(toBeCompiled, otherFiles, result, harnessSettings, options, /*currentDirectory*/ undefined);
                var declFileCompilationResult = compileDeclarationFiles(declFileContext);
                if (declFileCompilationResult && declFileCompilationResult.declResult.diagnostics.length) {
                    jsCode += "\r\n\r\n//// [DtsFileErrors]\r\n";
                    jsCode += "\r\n\r\n";
                    jsCode += getErrorBaseline(tsConfigFiles.concat(declFileCompilationResult.declInputFiles, declFileCompilationResult.declOtherFiles), declFileCompilationResult.declResult.diagnostics);
                }
                if (jsCode.length > 0) {
                    return tsCode + "\r\n\r\n" + jsCode;
                }
                else {
                    /* tslint:disable:no-null-keyword */
                    return null;
                    /* tslint:enable:no-null-keyword */
                }
            });
        }
        Compiler.doJsEmitBaseline = doJsEmitBaseline;
        function fileOutput(file, harnessSettings) {
            var fileName = harnessSettings.fullEmitPaths ? utils.removeTestPathPrefixes(file.file) : ts.getBaseFileName(file.file);
            return "//// [" + fileName + "]\r\n" + utils.removeTestPathPrefixes(file.text);
        }
        function collateOutputs(outputFiles) {
            var _a;
            var gen = iterateOutputs(outputFiles);
            // Emit them
            var result = "";
            for (var _b = gen.next(), done = _b.done, value = _b.value; !done; _a = gen.next(), done = _a.done, value = _a.value, _a) {
                // Some extra spacing if this isn't the first file
                if (result.length) {
                    result += "\r\n\r\n";
                }
                // FileName header + content
                var content = value[1];
                result += content;
            }
            return result;
        }
        Compiler.collateOutputs = collateOutputs;
        function iterateOutputs(outputFiles) {
            function cleanName(fn) {
                var lastSlash = ts.normalizeSlashes(fn).lastIndexOf("/");
                return fn.substr(lastSlash + 1).toLowerCase();
            }
            var files, dupeCase, _i, files_1, outputFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = Array.from(outputFiles);
                        files.slice().sort(function (a, b) { return ts.compareStringsCaseSensitive(cleanName(a.file), cleanName(b.file)); });
                        dupeCase = ts.createMap();
                        _i = 0, files_1 = files;
                        _a.label = 1;
                    case 1:
                        if (!(_i < files_1.length)) return [3 /*break*/, 4];
                        outputFile = files_1[_i];
                        return [4 /*yield*/, [checkDuplicatedFileName(outputFile.file, dupeCase), "/*====== " + outputFile.file + " ======*/\r\n" + utils.removeByteOrderMark(outputFile.text)]];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }
        Compiler.iterateOutputs = iterateOutputs;
        function checkDuplicatedFileName(resultName, dupeCase) {
            resultName = sanitizeTestFilePath(resultName);
            if (dupeCase.has(resultName)) {
                // A different baseline filename should be manufactured if the names differ only in case, for windows compat
                var count = 1 + dupeCase.get(resultName);
                dupeCase.set(resultName, count);
                resultName = resultName + ".dupe" + count;
            }
            else {
                dupeCase.set(resultName, 0);
            }
            return resultName;
        }
        function sanitizeTestFilePath(name) {
            var path = ts.toPath(ts.normalizeSlashes(name.replace(/[\^<>:"|?*%]/g, "_")).replace(/\.\.\//g, "__dotdot/"), "", Utils.canonicalizeForHarness);
            if (ts.startsWith(path, "/")) {
                return path.substring(1);
            }
            return path;
        }
        Compiler.sanitizeTestFilePath = sanitizeTestFilePath;
    })(Compiler = Harness.Compiler || (Harness.Compiler = {}));
    function splitVaryBySettingValue(text) {
        if (!text)
            return undefined;
        var entries = text.split(/,/).map(function (s) { return s.trim().toLowerCase(); }).filter(function (s) { return s.length > 0; });
        return entries && entries.length > 1 ? entries : undefined;
    }
    function computeFileBasedTestConfigurationVariations(configurations, variationState, varyByEntries, offset) {
        if (offset >= varyByEntries.length) {
            // make a copy of the current variation state
            configurations.push(__assign({}, variationState));
            return;
        }
        var _a = varyByEntries[offset], varyBy = _a[0], entries = _a[1];
        for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
            var entry = entries_2[_i];
            // set or overwrite the variation, then compute the next variation
            variationState[varyBy] = entry;
            computeFileBasedTestConfigurationVariations(configurations, variationState, varyByEntries, offset + 1);
        }
    }
    /**
     * Compute FileBasedTestConfiguration variations based on a supplied list of variable settings.
     */
    function getFileBasedTestConfigurations(settings, varyBy) {
        var varyByEntries;
        for (var _i = 0, varyBy_1 = varyBy; _i < varyBy_1.length; _i++) {
            var varyByKey = varyBy_1[_i];
            if (ts.hasProperty(settings, varyByKey)) {
                // we only consider variations when there are 2 or more variable entries.
                var entries = splitVaryBySettingValue(settings[varyByKey]);
                if (entries) {
                    if (!varyByEntries)
                        varyByEntries = [];
                    varyByEntries.push([varyByKey, entries]);
                }
            }
        }
        if (!varyByEntries)
            return undefined;
        var configurations = [];
        computeFileBasedTestConfigurationVariations(configurations, /*variationState*/ {}, varyByEntries, /*offset*/ 0);
        return configurations;
    }
    Harness.getFileBasedTestConfigurations = getFileBasedTestConfigurations;
    /**
     * Compute a description for this configuration based on its entries
     */
    function getFileBasedTestConfigurationDescription(configuration) {
        var name = "";
        if (configuration) {
            var keys = Object.keys(configuration).sort();
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (name)
                    name += ", ";
                name += "@" + key + ": " + configuration[key];
            }
        }
        return name;
    }
    Harness.getFileBasedTestConfigurationDescription = getFileBasedTestConfigurationDescription;
    var TestCaseParser;
    (function (TestCaseParser) {
        // Regex for parsing options in the format "@Alpha: Value of any sort"
        var optionRegex = /^[\/]{2}\s*@(\w+)\s*:\s*([^\r\n]*)/gm; // multiple matches on multiple lines
        function extractCompilerSettings(content) {
            var opts = {};
            var match;
            /* tslint:disable:no-null-keyword */
            while ((match = optionRegex.exec(content)) !== null) {
                /* tslint:enable:no-null-keyword */
                opts[match[1]] = match[2].trim();
            }
            return opts;
        }
        TestCaseParser.extractCompilerSettings = extractCompilerSettings;
        /** Given a test file containing // @FileName directives, return an array of named units of code to be added to an existing compiler instance */
        function makeUnitsFromTest(code, fileName, rootDir, settings) {
            if (settings === void 0) { settings = extractCompilerSettings(code); }
            // List of all the subfiles we've parsed out
            var testUnitData = [];
            var lines = Utils.splitContentByNewlines(code);
            // Stuff related to the subfile we're parsing
            var currentFileContent;
            var currentFileOptions = {};
            var currentFileName;
            var refs = [];
            for (var _i = 0, lines_3 = lines; _i < lines_3.length; _i++) {
                var line = lines_3[_i];
                var testMetaData = optionRegex.exec(line);
                if (testMetaData) {
                    // Comment line, check for global/file @options and record them
                    optionRegex.lastIndex = 0;
                    var metaDataName = testMetaData[1].toLowerCase();
                    currentFileOptions[testMetaData[1]] = testMetaData[2].trim();
                    if (metaDataName !== "filename") {
                        continue;
                    }
                    // New metadata statement after having collected some code to go with the previous metadata
                    if (currentFileName) {
                        // Store result file
                        var newTestFile = {
                            content: currentFileContent,
                            name: currentFileName,
                            fileOptions: currentFileOptions,
                            originalFilePath: fileName,
                            references: refs
                        };
                        testUnitData.push(newTestFile);
                        // Reset local data
                        currentFileContent = undefined;
                        currentFileOptions = {};
                        currentFileName = testMetaData[2].trim();
                        refs = [];
                    }
                    else {
                        // First metadata marker in the file
                        currentFileName = testMetaData[2].trim();
                    }
                }
                else {
                    // Subfile content line
                    // Append to the current subfile content, inserting a newline needed
                    if (currentFileContent === undefined) {
                        currentFileContent = "";
                    }
                    else if (currentFileContent !== "") {
                        // End-of-line
                        currentFileContent = currentFileContent + "\n";
                    }
                    currentFileContent = currentFileContent + line;
                }
            }
            // normalize the fileName for the single file case
            currentFileName = testUnitData.length > 0 || currentFileName ? currentFileName : ts.getBaseFileName(fileName);
            // EOF, push whatever remains
            var newTestFile2 = {
                content: currentFileContent || "",
                name: currentFileName,
                fileOptions: currentFileOptions,
                originalFilePath: fileName,
                references: refs
            };
            testUnitData.push(newTestFile2);
            // unit tests always list files explicitly
            var parseConfigHost = {
                useCaseSensitiveFileNames: false,
                readDirectory: function () { return []; },
                fileExists: function () { return true; },
                readFile: function (name) { return ts.forEach(testUnitData, function (data) { return data.name.toLowerCase() === name.toLowerCase() ? data.content : undefined; }); }
            };
            // check if project has tsconfig.json in the list of files
            var tsConfig;
            var tsConfigFileUnitData;
            for (var i = 0; i < testUnitData.length; i++) {
                var data = testUnitData[i];
                if (getConfigNameFromFileName(data.name)) {
                    var configJson = ts.parseJsonText(data.name, data.content);
                    assert.isTrue(configJson.endOfFileToken !== undefined);
                    var baseDir = ts.normalizePath(ts.getDirectoryPath(data.name));
                    if (rootDir) {
                        baseDir = ts.getNormalizedAbsolutePath(baseDir, rootDir);
                    }
                    tsConfig = ts.parseJsonSourceFileConfigFileContent(configJson, parseConfigHost, baseDir);
                    tsConfig.options.configFilePath = data.name;
                    tsConfigFileUnitData = data;
                    // delete entry from the list
                    ts.orderedRemoveItemAt(testUnitData, i);
                    break;
                }
            }
            return { settings: settings, testUnitData: testUnitData, tsConfig: tsConfig, tsConfigFileUnitData: tsConfigFileUnitData };
        }
        TestCaseParser.makeUnitsFromTest = makeUnitsFromTest;
    })(TestCaseParser = Harness.TestCaseParser || (Harness.TestCaseParser = {}));
    /** Support class for baseline files */
    var Baseline;
    (function (Baseline) {
        var noContent = "<no content>";
        function localPath(fileName, baselineFolder, subfolder) {
            if (baselineFolder === undefined) {
                return baselinePath(fileName, "local", "tests/baselines", subfolder);
            }
            else {
                return baselinePath(fileName, "local", baselineFolder, subfolder);
            }
        }
        Baseline.localPath = localPath;
        function referencePath(fileName, baselineFolder, subfolder) {
            if (baselineFolder === undefined) {
                return baselinePath(fileName, "reference", "tests/baselines", subfolder);
            }
            else {
                return baselinePath(fileName, "reference", baselineFolder, subfolder);
            }
        }
        function baselinePath(fileName, type, baselineFolder, subfolder) {
            if (subfolder !== undefined) {
                return Harness.userSpecifiedRoot + baselineFolder + "/" + subfolder + "/" + type + "/" + fileName;
            }
            else {
                return Harness.userSpecifiedRoot + baselineFolder + "/" + type + "/" + fileName;
            }
        }
        var fileCache = {};
        function generateActual(generateContent) {
            var actual = generateContent();
            if (actual === undefined) {
                throw new Error("The generated content was \"undefined\". Return \"null\" if no baselining is required.\"");
            }
            return actual;
        }
        function compareToBaseline(actual, relativeFileName, opts) {
            // actual is now either undefined (the generator had an error), null (no file requested),
            // or some real output of the function
            if (actual === undefined) {
                // Nothing to do
                return undefined; // TODO: GH#18217
            }
            var refFileName = referencePath(relativeFileName, opts && opts.Baselinefolder, opts && opts.Subfolder);
            /* tslint:disable:no-null-keyword */
            if (actual === null) {
                /* tslint:enable:no-null-keyword */
                actual = noContent;
            }
            var expected = "<no content>";
            if (Harness.IO.fileExists(refFileName)) {
                expected = Harness.IO.readFile(refFileName); // TODO: GH#18217
            }
            return { expected: expected, actual: actual };
        }
        function writeComparison(expected, actual, relativeFileName, actualFileName) {
            // For now this is written using TypeScript, because sys is not available when running old test cases.
            // But we need to move to sys once we have
            // Creates the directory including its parent if not already present
            function createDirectoryStructure(dirName) {
                if (fileCache[dirName] || Harness.IO.directoryExists(dirName)) {
                    fileCache[dirName] = true;
                    return;
                }
                var parentDirectory = Harness.IO.directoryName(dirName); // TODO: GH#18217
                if (parentDirectory !== "" && parentDirectory !== dirName) {
                    createDirectoryStructure(parentDirectory);
                }
                Harness.IO.createDirectory(dirName);
                fileCache[dirName] = true;
            }
            // Create folders if needed
            createDirectoryStructure(Harness.IO.directoryName(actualFileName)); // TODO: GH#18217
            // Delete the actual file in case it fails
            if (Harness.IO.fileExists(actualFileName)) {
                Harness.IO.deleteFile(actualFileName);
            }
            var encodedActual = Utils.encodeString(actual);
            if (expected !== encodedActual) {
                if (actual === noContent) {
                    Harness.IO.writeFile(actualFileName + ".delete", "");
                }
                else {
                    Harness.IO.writeFile(actualFileName, encodedActual);
                }
                throw new Error("The baseline file " + relativeFileName + " has changed.");
            }
        }
        function runBaseline(relativeFileName, generateContent, opts) {
            var actualFileName = localPath(relativeFileName, opts && opts.Baselinefolder, opts && opts.Subfolder);
            var actual = generateActual(generateContent);
            var comparison = compareToBaseline(actual, relativeFileName, opts);
            writeComparison(comparison.expected, comparison.actual, relativeFileName, actualFileName);
        }
        Baseline.runBaseline = runBaseline;
        function runMultifileBaseline(relativeFileBase, extension, generateContent, opts, referencedExtensions) {
            var _a;
            var gen = generateContent();
            var writtenFiles = ts.createMap();
            var errors = [];
            // tslint:disable-next-line:no-null-keyword
            if (gen !== null) {
                for (var _b = gen.next(), done = _b.done, value = _b.value; !done; _a = gen.next(), done = _a.done, value = _a.value, _a) {
                    var _c = value, name = _c[0], content = _c[1], count = _c[2];
                    if (count === 0)
                        continue; // Allow error reporter to skip writing files without errors
                    var relativeFileName = relativeFileBase + "/" + name + extension;
                    var actualFileName = localPath(relativeFileName, opts && opts.Baselinefolder, opts && opts.Subfolder);
                    var comparison = compareToBaseline(content, relativeFileName, opts);
                    try {
                        writeComparison(comparison.expected, comparison.actual, relativeFileName, actualFileName);
                    }
                    catch (e) {
                        errors.push(e);
                    }
                    writtenFiles.set(relativeFileName, true);
                }
            }
            var referenceDir = referencePath(relativeFileBase, opts && opts.Baselinefolder, opts && opts.Subfolder);
            var existing = Harness.IO.readDirectory(referenceDir, referencedExtensions || [extension]);
            if (extension === ".ts" || referencedExtensions && referencedExtensions.indexOf(".ts") > -1 && referencedExtensions.indexOf(".d.ts") === -1) {
                // special-case and filter .d.ts out of .ts results
                existing = existing.filter(function (f) { return !ts.endsWith(f, ".d.ts"); });
            }
            var missing = [];
            for (var _i = 0, existing_1 = existing; _i < existing_1.length; _i++) {
                var name = existing_1[_i];
                var localCopy = name.substring(referenceDir.length - relativeFileBase.length);
                if (!writtenFiles.has(localCopy)) {
                    missing.push(localCopy);
                }
            }
            if (missing.length) {
                for (var _d = 0, missing_1 = missing; _d < missing_1.length; _d++) {
                    var file = missing_1[_d];
                    Harness.IO.writeFile(localPath(file + ".delete", opts && opts.Baselinefolder, opts && opts.Subfolder), "");
                }
            }
            if (errors.length || missing.length) {
                var errorMsg = "";
                if (errors.length) {
                    errorMsg += "The baseline for " + relativeFileBase + " in " + errors.length + " files has changed:" + ("\n    " + errors.slice(0, 5).map(function (e) { return e.message; }).join("\n    ") + (errors.length > 5 ? "\n" + ("    and " + (errors.length - 5) + " more") : ""));
                }
                if (errors.length && missing.length) {
                    errorMsg += "\n";
                }
                if (missing.length) {
                    var writtenFilesArray = ts.arrayFrom(writtenFiles.keys());
                    errorMsg += "Baseline missing " + missing.length + " files:" + ("\n    " + missing.slice(0, 5).join("\n    ") + (missing.length > 5 ? "\n" + ("    and " + (missing.length - 5) + " more") : "") + "\n") + "Written " + writtenFiles.size + " files:" + ("\n    " + writtenFilesArray.slice(0, 5).join("\n    ") + (writtenFilesArray.length > 5 ? "\n" + ("    and " + (writtenFilesArray.length - 5) + " more") : ""));
                }
                throw new Error(errorMsg);
            }
        }
        Baseline.runMultifileBaseline = runMultifileBaseline;
    })(Baseline = Harness.Baseline || (Harness.Baseline = {}));
    function isDefaultLibraryFile(filePath) {
        // We need to make sure that the filePath is prefixed with "lib." not just containing "lib." and end with ".d.ts"
        var fileName = ts.getBaseFileName(ts.normalizeSlashes(filePath));
        return ts.startsWith(fileName, "lib.") && ts.endsWith(fileName, ".d.ts" /* Dts */);
    }
    Harness.isDefaultLibraryFile = isDefaultLibraryFile;
    function isBuiltFile(filePath) {
        return filePath.indexOf(Harness.libFolder) === 0 ||
            filePath.indexOf(vpath.addTrailingSeparator(vfs.builtFolder)) === 0;
    }
    Harness.isBuiltFile = isBuiltFile;
    function getDefaultLibraryFile(filePath, io) {
        var libFile = Harness.userSpecifiedRoot + Harness.libFolder + ts.getBaseFileName(ts.normalizeSlashes(filePath));
        return { unitName: libFile, content: io.readFile(libFile) };
    }
    Harness.getDefaultLibraryFile = getDefaultLibraryFile;
    function getConfigNameFromFileName(filename) {
        var flc = ts.getBaseFileName(filename).toLowerCase();
        return ts.find(["tsconfig.json", "jsconfig.json"], function (x) { return x === flc; });
    }
    Harness.getConfigNameFromFileName = getConfigNameFromFileName;
    if (Error)
        Error.stackTraceLimit = 100;
})(Harness || (Harness = {}));
var Harness;
(function (Harness) {
    var LanguageService;
    (function (LanguageService) {
        var ScriptInfo = /** @class */ (function () {
            function ScriptInfo(fileName, content, isRootFile) {
                this.fileName = fileName;
                this.content = content;
                this.isRootFile = isRootFile;
                this.version = 1;
                this.editRanges = [];
                this.setContent(content);
            }
            ScriptInfo.prototype.setContent = function (content) {
                this.content = content;
                this.lineMap = undefined;
            };
            ScriptInfo.prototype.getLineMap = function () {
                return this.lineMap || (this.lineMap = ts.computeLineStarts(this.content));
            };
            ScriptInfo.prototype.updateContent = function (content) {
                this.editRanges = [];
                this.setContent(content);
                this.version++;
            };
            ScriptInfo.prototype.editContent = function (start, end, newText) {
                // Apply edits
                var prefix = this.content.substring(0, start);
                var middle = newText;
                var suffix = this.content.substring(end);
                this.setContent(prefix + middle + suffix);
                // Store edit range + new length of script
                this.editRanges.push({
                    length: this.content.length,
                    textChangeRange: ts.createTextChangeRange(ts.createTextSpanFromBounds(start, end), newText.length)
                });
                // Update version #
                this.version++;
            };
            ScriptInfo.prototype.getTextChangeRangeBetweenVersions = function (startVersion, endVersion) {
                if (startVersion === endVersion) {
                    // No edits!
                    return ts.unchangedTextChangeRange;
                }
                var initialEditRangeIndex = this.editRanges.length - (this.version - startVersion);
                var lastEditRangeIndex = this.editRanges.length - (this.version - endVersion);
                var entries = this.editRanges.slice(initialEditRangeIndex, lastEditRangeIndex);
                return ts.collapseTextChangeRangesAcrossMultipleVersions(entries.map(function (e) { return e.textChangeRange; }));
            };
            return ScriptInfo;
        }());
        LanguageService.ScriptInfo = ScriptInfo;
        var ScriptSnapshot = /** @class */ (function () {
            function ScriptSnapshot(scriptInfo) {
                this.scriptInfo = scriptInfo;
                this.textSnapshot = scriptInfo.content;
                this.version = scriptInfo.version;
            }
            ScriptSnapshot.prototype.getText = function (start, end) {
                return this.textSnapshot.substring(start, end);
            };
            ScriptSnapshot.prototype.getLength = function () {
                return this.textSnapshot.length;
            };
            ScriptSnapshot.prototype.getChangeRange = function (oldScript) {
                var oldShim = oldScript;
                return this.scriptInfo.getTextChangeRangeBetweenVersions(oldShim.version, this.version);
            };
            return ScriptSnapshot;
        }());
        var ScriptSnapshotProxy = /** @class */ (function () {
            function ScriptSnapshotProxy(scriptSnapshot) {
                this.scriptSnapshot = scriptSnapshot;
            }
            ScriptSnapshotProxy.prototype.getText = function (start, end) {
                return this.scriptSnapshot.getText(start, end);
            };
            ScriptSnapshotProxy.prototype.getLength = function () {
                return this.scriptSnapshot.getLength();
            };
            ScriptSnapshotProxy.prototype.getChangeRange = function (oldScript) {
                var range = this.scriptSnapshot.getChangeRange(oldScript.scriptSnapshot);
                return range && JSON.stringify(range);
            };
            return ScriptSnapshotProxy;
        }());
        var DefaultHostCancellationToken = /** @class */ (function () {
            function DefaultHostCancellationToken() {
            }
            DefaultHostCancellationToken.prototype.isCancellationRequested = function () {
                return false;
            };
            DefaultHostCancellationToken.instance = new DefaultHostCancellationToken();
            return DefaultHostCancellationToken;
        }());
        var LanguageServiceAdapterHost = /** @class */ (function () {
            function LanguageServiceAdapterHost(cancellationToken, settings) {
                if (cancellationToken === void 0) { cancellationToken = DefaultHostCancellationToken.instance; }
                if (settings === void 0) { settings = ts.getDefaultCompilerOptions(); }
                this.cancellationToken = cancellationToken;
                this.settings = settings;
                this.sys = new fakes.System(new vfs.FileSystem(/*ignoreCase*/ true, { cwd: Harness.virtualFileSystemRoot }));
                this.scriptInfos = new collections.SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
            }
            Object.defineProperty(LanguageServiceAdapterHost.prototype, "vfs", {
                get: function () {
                    return this.sys.vfs;
                },
                enumerable: true,
                configurable: true
            });
            LanguageServiceAdapterHost.prototype.getNewLine = function () {
                return Harness.harnessNewLine;
            };
            LanguageServiceAdapterHost.prototype.getFilenames = function () {
                var fileNames = [];
                this.scriptInfos.forEach(function (scriptInfo) {
                    if (scriptInfo.isRootFile) {
                        // only include root files here
                        // usually it means that we won't include lib.d.ts in the list of root files so it won't mess the computation of compilation root dir.
                        fileNames.push(scriptInfo.fileName);
                    }
                });
                return fileNames;
            };
            LanguageServiceAdapterHost.prototype.getScriptInfo = function (fileName) {
                return this.scriptInfos.get(vpath.resolve(this.vfs.cwd(), fileName));
            };
            LanguageServiceAdapterHost.prototype.addScript = function (fileName, content, isRootFile) {
                this.vfs.mkdirpSync(vpath.dirname(fileName));
                this.vfs.writeFileSync(fileName, content);
                this.scriptInfos.set(vpath.resolve(this.vfs.cwd(), fileName), new ScriptInfo(fileName, content, isRootFile));
            };
            LanguageServiceAdapterHost.prototype.editScript = function (fileName, start, end, newText) {
                var script = this.getScriptInfo(fileName);
                if (script) {
                    script.editContent(start, end, newText);
                    this.vfs.mkdirpSync(vpath.dirname(fileName));
                    this.vfs.writeFileSync(fileName, script.content);
                    return;
                }
                throw new Error("No script with name '" + fileName + "'");
            };
            LanguageServiceAdapterHost.prototype.openFile = function (_fileName, _content, _scriptKindName) { };
            /**
             * @param line 0 based index
             * @param col 0 based index
             */
            LanguageServiceAdapterHost.prototype.positionToLineAndCharacter = function (fileName, position) {
                var script = this.getScriptInfo(fileName);
                assert.isOk(script);
                return ts.computeLineAndCharacterOfPosition(script.getLineMap(), position);
            };
            return LanguageServiceAdapterHost;
        }());
        LanguageService.LanguageServiceAdapterHost = LanguageServiceAdapterHost;
        /// Native adapter
        var NativeLanguageServiceHost = /** @class */ (function (_super) {
            __extends(NativeLanguageServiceHost, _super);
            function NativeLanguageServiceHost() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.installPackage = ts.notImplemented;
                _this.log = ts.noop;
                _this.trace = ts.noop;
                _this.error = ts.noop;
                return _this;
            }
            NativeLanguageServiceHost.prototype.isKnownTypesPackageName = function (name) {
                return !!this.typesRegistry && this.typesRegistry.has(name);
            };
            NativeLanguageServiceHost.prototype.getCompilationSettings = function () { return this.settings; };
            NativeLanguageServiceHost.prototype.getCancellationToken = function () { return this.cancellationToken; };
            NativeLanguageServiceHost.prototype.getDirectories = function (path) {
                return this.sys.getDirectories(path);
            };
            NativeLanguageServiceHost.prototype.getCurrentDirectory = function () { return Harness.virtualFileSystemRoot; };
            NativeLanguageServiceHost.prototype.getDefaultLibFileName = function () { return Harness.Compiler.defaultLibFileName; };
            NativeLanguageServiceHost.prototype.getScriptFileNames = function () {
                return this.getFilenames().filter(ts.isAnySupportedFileExtension);
            };
            NativeLanguageServiceHost.prototype.getScriptSnapshot = function (fileName) {
                var script = this.getScriptInfo(fileName);
                return script ? new ScriptSnapshot(script) : undefined;
            };
            NativeLanguageServiceHost.prototype.getScriptKind = function () { return 0 /* Unknown */; };
            NativeLanguageServiceHost.prototype.getScriptVersion = function (fileName) {
                var script = this.getScriptInfo(fileName);
                return script ? script.version.toString() : undefined; // TODO: GH#18217
            };
            NativeLanguageServiceHost.prototype.directoryExists = function (dirName) {
                return this.sys.directoryExists(dirName);
            };
            NativeLanguageServiceHost.prototype.fileExists = function (fileName) {
                return this.sys.fileExists(fileName);
            };
            NativeLanguageServiceHost.prototype.readDirectory = function (path, extensions, exclude, include, depth) {
                return this.sys.readDirectory(path, extensions, exclude, include, depth);
            };
            NativeLanguageServiceHost.prototype.readFile = function (path) {
                return this.sys.readFile(path);
            };
            NativeLanguageServiceHost.prototype.realpath = function (path) {
                return this.sys.realpath(path);
            };
            NativeLanguageServiceHost.prototype.getTypeRootsVersion = function () {
                return 0;
            };
            return NativeLanguageServiceHost;
        }(LanguageServiceAdapterHost));
        var NativeLanguageServiceAdapter = /** @class */ (function () {
            function NativeLanguageServiceAdapter(cancellationToken, options) {
                this.host = new NativeLanguageServiceHost(cancellationToken, options);
            }
            NativeLanguageServiceAdapter.prototype.getHost = function () { return this.host; };
            NativeLanguageServiceAdapter.prototype.getLanguageService = function () { return ts.createLanguageService(this.host); };
            NativeLanguageServiceAdapter.prototype.getClassifier = function () { return ts.createClassifier(); };
            NativeLanguageServiceAdapter.prototype.getPreProcessedFileInfo = function (fileName, fileContents) { return ts.preProcessFile(fileContents, /* readImportFiles */ true, ts.hasJavaScriptFileExtension(fileName)); };
            return NativeLanguageServiceAdapter;
        }());
        LanguageService.NativeLanguageServiceAdapter = NativeLanguageServiceAdapter;
        /// Shim adapter
        var ShimLanguageServiceHost = /** @class */ (function (_super) {
            __extends(ShimLanguageServiceHost, _super);
            function ShimLanguageServiceHost(preprocessToResolve, cancellationToken, options) {
                var _this = _super.call(this, cancellationToken, options) || this;
                _this.readDirectory = ts.notImplemented;
                _this.readDirectoryNames = ts.notImplemented;
                _this.readFileNames = ts.notImplemented;
                _this.nativeHost = new NativeLanguageServiceHost(cancellationToken, options);
                if (preprocessToResolve) {
                    var compilerOptions_1 = _this.nativeHost.getCompilationSettings();
                    var moduleResolutionHost_1 = {
                        fileExists: function (fileName) { return _this.getScriptInfo(fileName) !== undefined; },
                        readFile: function (fileName) {
                            var scriptInfo = _this.getScriptInfo(fileName);
                            return scriptInfo && scriptInfo.content;
                        }
                    };
                    _this.getModuleResolutionsForFile = function (fileName) {
                        var scriptInfo = _this.getScriptInfo(fileName);
                        var preprocessInfo = ts.preProcessFile(scriptInfo.content, /*readImportFiles*/ true);
                        var imports = {};
                        for (var _i = 0, _a = preprocessInfo.importedFiles; _i < _a.length; _i++) {
                            var module_1 = _a[_i];
                            var resolutionInfo = ts.resolveModuleName(module_1.fileName, fileName, compilerOptions_1, moduleResolutionHost_1);
                            if (resolutionInfo.resolvedModule) {
                                imports[module_1.fileName] = resolutionInfo.resolvedModule.resolvedFileName;
                            }
                        }
                        return JSON.stringify(imports);
                    };
                    _this.getTypeReferenceDirectiveResolutionsForFile = function (fileName) {
                        var scriptInfo = _this.getScriptInfo(fileName);
                        if (scriptInfo) {
                            var preprocessInfo = ts.preProcessFile(scriptInfo.content, /*readImportFiles*/ false);
                            var resolutions = {};
                            var settings = _this.nativeHost.getCompilationSettings();
                            for (var _i = 0, _a = preprocessInfo.typeReferenceDirectives; _i < _a.length; _i++) {
                                var typeReferenceDirective = _a[_i];
                                var resolutionInfo = ts.resolveTypeReferenceDirective(typeReferenceDirective.fileName, fileName, settings, moduleResolutionHost_1);
                                if (resolutionInfo.resolvedTypeReferenceDirective.resolvedFileName) {
                                    resolutions[typeReferenceDirective.fileName] = resolutionInfo.resolvedTypeReferenceDirective;
                                }
                            }
                            return JSON.stringify(resolutions);
                        }
                        else {
                            return "[]";
                        }
                    };
                }
                return _this;
            }
            ShimLanguageServiceHost.prototype.getFilenames = function () { return this.nativeHost.getFilenames(); };
            ShimLanguageServiceHost.prototype.getScriptInfo = function (fileName) { return this.nativeHost.getScriptInfo(fileName); };
            ShimLanguageServiceHost.prototype.addScript = function (fileName, content, isRootFile) { this.nativeHost.addScript(fileName, content, isRootFile); };
            ShimLanguageServiceHost.prototype.editScript = function (fileName, start, end, newText) { this.nativeHost.editScript(fileName, start, end, newText); };
            ShimLanguageServiceHost.prototype.positionToLineAndCharacter = function (fileName, position) { return this.nativeHost.positionToLineAndCharacter(fileName, position); };
            ShimLanguageServiceHost.prototype.getCompilationSettings = function () { return JSON.stringify(this.nativeHost.getCompilationSettings()); };
            ShimLanguageServiceHost.prototype.getCancellationToken = function () { return this.nativeHost.getCancellationToken(); };
            ShimLanguageServiceHost.prototype.getCurrentDirectory = function () { return this.nativeHost.getCurrentDirectory(); };
            ShimLanguageServiceHost.prototype.getDirectories = function (path) { return JSON.stringify(this.nativeHost.getDirectories(path)); };
            ShimLanguageServiceHost.prototype.getDefaultLibFileName = function () { return this.nativeHost.getDefaultLibFileName(); };
            ShimLanguageServiceHost.prototype.getScriptFileNames = function () { return JSON.stringify(this.nativeHost.getScriptFileNames()); };
            ShimLanguageServiceHost.prototype.getScriptSnapshot = function (fileName) {
                var nativeScriptSnapshot = this.nativeHost.getScriptSnapshot(fileName); // TODO: GH#18217
                return nativeScriptSnapshot && new ScriptSnapshotProxy(nativeScriptSnapshot);
            };
            ShimLanguageServiceHost.prototype.getScriptKind = function () { return this.nativeHost.getScriptKind(); };
            ShimLanguageServiceHost.prototype.getScriptVersion = function (fileName) { return this.nativeHost.getScriptVersion(fileName); };
            ShimLanguageServiceHost.prototype.getLocalizedDiagnosticMessages = function () { return JSON.stringify({}); };
            ShimLanguageServiceHost.prototype.fileExists = function (fileName) { return this.getScriptInfo(fileName) !== undefined; };
            ShimLanguageServiceHost.prototype.readFile = function (fileName) {
                var snapshot = this.nativeHost.getScriptSnapshot(fileName);
                return snapshot && ts.getSnapshotText(snapshot);
            };
            ShimLanguageServiceHost.prototype.log = function (s) { this.nativeHost.log(s); };
            ShimLanguageServiceHost.prototype.trace = function (s) { this.nativeHost.trace(s); };
            ShimLanguageServiceHost.prototype.error = function (s) { this.nativeHost.error(s); };
            ShimLanguageServiceHost.prototype.directoryExists = function () {
                // for tests pessimistically assume that directory always exists
                return true;
            };
            return ShimLanguageServiceHost;
        }(LanguageServiceAdapterHost));
        var ClassifierShimProxy = /** @class */ (function () {
            function ClassifierShimProxy(shim) {
                this.shim = shim;
            }
            ClassifierShimProxy.prototype.getEncodedLexicalClassifications = function (_text, _lexState, _classifyKeywordsInGenerics) {
                return ts.notImplemented();
            };
            ClassifierShimProxy.prototype.getClassificationsForLine = function (text, lexState, classifyKeywordsInGenerics) {
                var result = this.shim.getClassificationsForLine(text, lexState, classifyKeywordsInGenerics).split("\n");
                var entries = [];
                var i = 0;
                var position = 0;
                for (; i < result.length - 1; i += 2) {
                    var t = entries[i / 2] = {
                        length: parseInt(result[i]),
                        classification: parseInt(result[i + 1])
                    };
                    assert.isTrue(t.length > 0, "Result length should be greater than 0, got :" + t.length);
                    position += t.length;
                }
                var finalLexState = parseInt(result[result.length - 1]);
                assert.equal(position, text.length, "Expected cumulative length of all entries to match the length of the source. expected: " + text.length + ", but got: " + position);
                return {
                    finalLexState: finalLexState,
                    entries: entries
                };
            };
            return ClassifierShimProxy;
        }());
        function unwrapJSONCallResult(result) {
            var parsedResult = JSON.parse(result);
            if (parsedResult.error) {
                throw new Error("Language Service Shim Error: " + JSON.stringify(parsedResult.error));
            }
            else if (parsedResult.canceled) {
                throw new ts.OperationCanceledException();
            }
            return parsedResult.result;
        }
        var LanguageServiceShimProxy = /** @class */ (function () {
            function LanguageServiceShimProxy(shim) {
                this.shim = shim;
                this.getCombinedCodeFix = ts.notImplemented;
                this.applyCodeActionCommand = ts.notImplemented;
            }
            LanguageServiceShimProxy.prototype.cleanupSemanticCache = function () {
                this.shim.cleanupSemanticCache();
            };
            LanguageServiceShimProxy.prototype.getSyntacticDiagnostics = function (fileName) {
                return unwrapJSONCallResult(this.shim.getSyntacticDiagnostics(fileName));
            };
            LanguageServiceShimProxy.prototype.getSemanticDiagnostics = function (fileName) {
                return unwrapJSONCallResult(this.shim.getSemanticDiagnostics(fileName));
            };
            LanguageServiceShimProxy.prototype.getSuggestionDiagnostics = function (fileName) {
                return unwrapJSONCallResult(this.shim.getSuggestionDiagnostics(fileName));
            };
            LanguageServiceShimProxy.prototype.getCompilerOptionsDiagnostics = function () {
                return unwrapJSONCallResult(this.shim.getCompilerOptionsDiagnostics());
            };
            LanguageServiceShimProxy.prototype.getSyntacticClassifications = function (fileName, span) {
                return unwrapJSONCallResult(this.shim.getSyntacticClassifications(fileName, span.start, span.length));
            };
            LanguageServiceShimProxy.prototype.getSemanticClassifications = function (fileName, span) {
                return unwrapJSONCallResult(this.shim.getSemanticClassifications(fileName, span.start, span.length));
            };
            LanguageServiceShimProxy.prototype.getEncodedSyntacticClassifications = function (fileName, span) {
                return unwrapJSONCallResult(this.shim.getEncodedSyntacticClassifications(fileName, span.start, span.length));
            };
            LanguageServiceShimProxy.prototype.getEncodedSemanticClassifications = function (fileName, span) {
                return unwrapJSONCallResult(this.shim.getEncodedSemanticClassifications(fileName, span.start, span.length));
            };
            LanguageServiceShimProxy.prototype.getCompletionsAtPosition = function (fileName, position, preferences) {
                return unwrapJSONCallResult(this.shim.getCompletionsAtPosition(fileName, position, preferences));
            };
            LanguageServiceShimProxy.prototype.getCompletionEntryDetails = function (fileName, position, entryName, formatOptions, source, preferences) {
                return unwrapJSONCallResult(this.shim.getCompletionEntryDetails(fileName, position, entryName, JSON.stringify(formatOptions), source, preferences));
            };
            LanguageServiceShimProxy.prototype.getCompletionEntrySymbol = function () {
                throw new Error("getCompletionEntrySymbol not implemented across the shim layer.");
            };
            LanguageServiceShimProxy.prototype.getQuickInfoAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getQuickInfoAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getNameOrDottedNameSpan = function (fileName, startPos, endPos) {
                return unwrapJSONCallResult(this.shim.getNameOrDottedNameSpan(fileName, startPos, endPos));
            };
            LanguageServiceShimProxy.prototype.getBreakpointStatementAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getBreakpointStatementAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getSignatureHelpItems = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getSignatureHelpItems(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getRenameInfo = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getRenameInfo(fileName, position));
            };
            LanguageServiceShimProxy.prototype.findRenameLocations = function (fileName, position, findInStrings, findInComments) {
                return unwrapJSONCallResult(this.shim.findRenameLocations(fileName, position, findInStrings, findInComments));
            };
            LanguageServiceShimProxy.prototype.getDefinitionAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getDefinitionAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getDefinitionAndBoundSpan = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getDefinitionAndBoundSpan(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getTypeDefinitionAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getTypeDefinitionAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getImplementationAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getImplementationAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getReferencesAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getReferencesAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.findReferences = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.findReferences(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getOccurrencesAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getOccurrencesAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getDocumentHighlights = function (fileName, position, filesToSearch) {
                return unwrapJSONCallResult(this.shim.getDocumentHighlights(fileName, position, JSON.stringify(filesToSearch)));
            };
            LanguageServiceShimProxy.prototype.getNavigateToItems = function (searchValue) {
                return unwrapJSONCallResult(this.shim.getNavigateToItems(searchValue));
            };
            LanguageServiceShimProxy.prototype.getNavigationBarItems = function (fileName) {
                return unwrapJSONCallResult(this.shim.getNavigationBarItems(fileName));
            };
            LanguageServiceShimProxy.prototype.getNavigationTree = function (fileName) {
                return unwrapJSONCallResult(this.shim.getNavigationTree(fileName));
            };
            LanguageServiceShimProxy.prototype.getOutliningSpans = function (fileName) {
                return unwrapJSONCallResult(this.shim.getOutliningSpans(fileName));
            };
            LanguageServiceShimProxy.prototype.getTodoComments = function (fileName, descriptors) {
                return unwrapJSONCallResult(this.shim.getTodoComments(fileName, JSON.stringify(descriptors)));
            };
            LanguageServiceShimProxy.prototype.getBraceMatchingAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getBraceMatchingAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.getIndentationAtPosition = function (fileName, position, options) {
                return unwrapJSONCallResult(this.shim.getIndentationAtPosition(fileName, position, JSON.stringify(options)));
            };
            LanguageServiceShimProxy.prototype.getFormattingEditsForRange = function (fileName, start, end, options) {
                return unwrapJSONCallResult(this.shim.getFormattingEditsForRange(fileName, start, end, JSON.stringify(options)));
            };
            LanguageServiceShimProxy.prototype.getFormattingEditsForDocument = function (fileName, options) {
                return unwrapJSONCallResult(this.shim.getFormattingEditsForDocument(fileName, JSON.stringify(options)));
            };
            LanguageServiceShimProxy.prototype.getFormattingEditsAfterKeystroke = function (fileName, position, key, options) {
                return unwrapJSONCallResult(this.shim.getFormattingEditsAfterKeystroke(fileName, position, key, JSON.stringify(options)));
            };
            LanguageServiceShimProxy.prototype.getDocCommentTemplateAtPosition = function (fileName, position) {
                return unwrapJSONCallResult(this.shim.getDocCommentTemplateAtPosition(fileName, position));
            };
            LanguageServiceShimProxy.prototype.isValidBraceCompletionAtPosition = function (fileName, position, openingBrace) {
                return unwrapJSONCallResult(this.shim.isValidBraceCompletionAtPosition(fileName, position, openingBrace));
            };
            LanguageServiceShimProxy.prototype.getJsxClosingTagAtPosition = function () {
                throw new Error("Not supported on the shim.");
            };
            LanguageServiceShimProxy.prototype.getSpanOfEnclosingComment = function (fileName, position, onlyMultiLine) {
                return unwrapJSONCallResult(this.shim.getSpanOfEnclosingComment(fileName, position, onlyMultiLine));
            };
            LanguageServiceShimProxy.prototype.getCodeFixesAtPosition = function () {
                throw new Error("Not supported on the shim.");
            };
            LanguageServiceShimProxy.prototype.getCodeFixDiagnostics = function () {
                throw new Error("Not supported on the shim.");
            };
            LanguageServiceShimProxy.prototype.getEditsForRefactor = function () {
                throw new Error("Not supported on the shim.");
            };
            LanguageServiceShimProxy.prototype.getApplicableRefactors = function () {
                throw new Error("Not supported on the shim.");
            };
            LanguageServiceShimProxy.prototype.organizeImports = function (_scope, _formatOptions) {
                throw new Error("Not supported on the shim.");
            };
            LanguageServiceShimProxy.prototype.getEditsForFileRename = function () {
                throw new Error("Not supported on the shim.");
            };
            LanguageServiceShimProxy.prototype.getEmitOutput = function (fileName) {
                return unwrapJSONCallResult(this.shim.getEmitOutput(fileName));
            };
            LanguageServiceShimProxy.prototype.getProgram = function () {
                throw new Error("Program can not be marshaled across the shim layer.");
            };
            LanguageServiceShimProxy.prototype.getNonBoundSourceFile = function () {
                throw new Error("SourceFile can not be marshaled across the shim layer.");
            };
            LanguageServiceShimProxy.prototype.getSourceFile = function () {
                throw new Error("SourceFile can not be marshaled across the shim layer.");
            };
            LanguageServiceShimProxy.prototype.dispose = function () { this.shim.dispose({}); };
            return LanguageServiceShimProxy;
        }());
        var ShimLanguageServiceAdapter = /** @class */ (function () {
            function ShimLanguageServiceAdapter(preprocessToResolve, cancellationToken, options) {
                this.host = new ShimLanguageServiceHost(preprocessToResolve, cancellationToken, options);
                this.factory = new TypeScript.Services.TypeScriptServicesFactory();
            }
            ShimLanguageServiceAdapter.prototype.getHost = function () { return this.host; };
            ShimLanguageServiceAdapter.prototype.getLanguageService = function () { return new LanguageServiceShimProxy(this.factory.createLanguageServiceShim(this.host)); };
            ShimLanguageServiceAdapter.prototype.getClassifier = function () { return new ClassifierShimProxy(this.factory.createClassifierShim(this.host)); };
            ShimLanguageServiceAdapter.prototype.getPreProcessedFileInfo = function (fileName, fileContents) {
                var shimResult;
                var coreServicesShim = this.factory.createCoreServicesShim(this.host);
                shimResult = unwrapJSONCallResult(coreServicesShim.getPreProcessedFileInfo(fileName, ts.ScriptSnapshot.fromString(fileContents)));
                var convertResult = {
                    referencedFiles: [],
                    importedFiles: [],
                    ambientExternalModules: [],
                    isLibFile: shimResult.isLibFile,
                    typeReferenceDirectives: [],
                    libReferenceDirectives: []
                };
                ts.forEach(shimResult.referencedFiles, function (refFile) {
                    convertResult.referencedFiles.push({
                        fileName: refFile.path,
                        pos: refFile.position,
                        end: refFile.position + refFile.length
                    });
                });
                ts.forEach(shimResult.importedFiles, function (importedFile) {
                    convertResult.importedFiles.push({
                        fileName: importedFile.path,
                        pos: importedFile.position,
                        end: importedFile.position + importedFile.length
                    });
                });
                ts.forEach(shimResult.typeReferenceDirectives, function (typeRefDirective) {
                    convertResult.importedFiles.push({
                        fileName: typeRefDirective.path,
                        pos: typeRefDirective.position,
                        end: typeRefDirective.position + typeRefDirective.length
                    });
                });
                return convertResult;
            };
            return ShimLanguageServiceAdapter;
        }());
        LanguageService.ShimLanguageServiceAdapter = ShimLanguageServiceAdapter;
        // Server adapter
        var SessionClientHost = /** @class */ (function (_super) {
            __extends(SessionClientHost, _super);
            function SessionClientHost(cancellationToken, settings) {
                var _this = _super.call(this, cancellationToken, settings) || this;
                _this.onMessage = ts.noop;
                _this.writeMessage = ts.noop;
                return _this;
            }
            SessionClientHost.prototype.setClient = function (client) {
                this.client = client;
            };
            SessionClientHost.prototype.openFile = function (fileName, content, scriptKindName) {
                _super.prototype.openFile.call(this, fileName, content, scriptKindName);
                this.client.openFile(fileName, content, scriptKindName);
            };
            SessionClientHost.prototype.editScript = function (fileName, start, end, newText) {
                _super.prototype.editScript.call(this, fileName, start, end, newText);
                this.client.changeFile(fileName, start, end, newText);
            };
            return SessionClientHost;
        }(NativeLanguageServiceHost));
        var SessionServerHost = /** @class */ (function () {
            function SessionServerHost(host) {
                this.host = host;
                this.args = [];
                this.useCaseSensitiveFileNames = false;
                this.onMessage = ts.noop;
                this.writeMessage = ts.noop; // overridden
                this.writeFile = ts.noop;
                this.exit = ts.noop;
                this.close = ts.noop;
                this.newLine = this.host.getNewLine();
            }
            SessionServerHost.prototype.write = function (message) {
                this.writeMessage(message);
            };
            SessionServerHost.prototype.readFile = function (fileName) {
                if (ts.stringContains(fileName, Harness.Compiler.defaultLibFileName)) {
                    fileName = Harness.Compiler.defaultLibFileName;
                }
                var snapshot = this.host.getScriptSnapshot(fileName);
                return snapshot && ts.getSnapshotText(snapshot);
            };
            SessionServerHost.prototype.resolvePath = function (path) {
                return path;
            };
            SessionServerHost.prototype.fileExists = function (path) {
                return !!this.host.getScriptSnapshot(path);
            };
            SessionServerHost.prototype.directoryExists = function () {
                // for tests assume that directory exists
                return true;
            };
            SessionServerHost.prototype.getExecutingFilePath = function () {
                return "";
            };
            SessionServerHost.prototype.createDirectory = function (_directoryName) {
                return ts.notImplemented();
            };
            SessionServerHost.prototype.getCurrentDirectory = function () {
                return this.host.getCurrentDirectory();
            };
            SessionServerHost.prototype.getDirectories = function () {
                return [];
            };
            SessionServerHost.prototype.getEnvironmentVariable = function (name) {
                return ts.sys.getEnvironmentVariable(name);
            };
            SessionServerHost.prototype.readDirectory = function () { return ts.notImplemented(); };
            SessionServerHost.prototype.watchFile = function () {
                return { close: ts.noop };
            };
            SessionServerHost.prototype.watchDirectory = function () {
                return { close: ts.noop };
            };
            SessionServerHost.prototype.info = function (message) {
                this.host.log(message);
            };
            SessionServerHost.prototype.msg = function (message) {
                this.host.log(message);
            };
            SessionServerHost.prototype.loggingEnabled = function () {
                return true;
            };
            SessionServerHost.prototype.getLogFileName = function () {
                return undefined;
            };
            SessionServerHost.prototype.hasLevel = function () {
                return false;
            };
            SessionServerHost.prototype.startGroup = function () { throw ts.notImplemented(); };
            SessionServerHost.prototype.endGroup = function () { throw ts.notImplemented(); };
            SessionServerHost.prototype.perftrc = function (message) {
                return this.host.log(message);
            };
            SessionServerHost.prototype.setTimeout = function (callback, ms) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                return setTimeout(callback, ms, args);
            };
            SessionServerHost.prototype.clearTimeout = function (timeoutId) {
                clearTimeout(timeoutId);
            };
            SessionServerHost.prototype.setImmediate = function (callback, _ms) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                return setImmediate(callback, args);
            };
            SessionServerHost.prototype.clearImmediate = function (timeoutId) {
                clearImmediate(timeoutId);
            };
            SessionServerHost.prototype.createHash = function (s) {
                return Harness.mockHash(s);
            };
            SessionServerHost.prototype.require = function (_initialDir, _moduleName) {
                switch (_moduleName) {
                    // Adds to the Quick Info a fixed string and a string from the config file
                    // and replaces the first display part
                    case "quickinfo-augmeneter":
                        return {
                            module: function () { return ({
                                create: function (info) {
                                    var proxy = makeDefaultProxy(info);
                                    var langSvc = info.languageService;
                                    // tslint:disable-next-line only-arrow-functions
                                    proxy.getQuickInfoAtPosition = function () {
                                        var parts = langSvc.getQuickInfoAtPosition.apply(langSvc, arguments);
                                        if (parts.displayParts.length > 0) {
                                            parts.displayParts[0].text = "Proxied";
                                        }
                                        parts.displayParts.push({ text: info.config.message, kind: "punctuation" });
                                        return parts;
                                    };
                                    return proxy;
                                }
                            }); },
                            error: undefined
                        };
                    // Throws during initialization
                    case "create-thrower":
                        return {
                            module: function () { return ({
                                create: function () {
                                    throw new Error("I am not a well-behaved plugin");
                                }
                            }); },
                            error: undefined
                        };
                    // Adds another diagnostic
                    case "diagnostic-adder":
                        return {
                            module: function () { return ({
                                create: function (info) {
                                    var proxy = makeDefaultProxy(info);
                                    proxy.getSemanticDiagnostics = function (filename) {
                                        var prev = info.languageService.getSemanticDiagnostics(filename);
                                        var sourceFile = info.project.getSourceFile(ts.toPath(filename, /*basePath*/ undefined, ts.createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)));
                                        prev.push({
                                            category: ts.DiagnosticCategory.Warning,
                                            file: sourceFile,
                                            code: 9999,
                                            length: 3,
                                            messageText: "Plugin diagnostic",
                                            start: 0
                                        });
                                        return prev;
                                    };
                                    return proxy;
                                }
                            }); },
                            error: undefined
                        };
                    default:
                        return {
                            module: undefined,
                            error: new Error("Could not resolve module")
                        };
                }
                function makeDefaultProxy(info) {
                    // tslint:disable-next-line:no-null-keyword
                    var proxy = Object.create(/*prototype*/ null);
                    var langSvc = info.languageService;
                    var _loop_2 = function (k) {
                        // tslint:disable-next-line only-arrow-functions
                        proxy[k] = function () {
                            return langSvc[k].apply(langSvc, arguments);
                        };
                    };
                    for (var _i = 0, _a = Object.keys(langSvc); _i < _a.length; _i++) {
                        var k = _a[_i];
                        _loop_2(k);
                    }
                    return proxy;
                }
            };
            return SessionServerHost;
        }());
        var ServerLanguageServiceAdapter = /** @class */ (function () {
            function ServerLanguageServiceAdapter(cancellationToken, options) {
                // This is the main host that tests use to direct tests
                var clientHost = new SessionClientHost(cancellationToken, options);
                var client = new ts.server.SessionClient(clientHost);
                // This host is just a proxy for the clientHost, it uses the client
                // host to answer server queries about files on disk
                var serverHost = new SessionServerHost(clientHost);
                var opts = {
                    host: serverHost,
                    cancellationToken: ts.server.nullCancellationToken,
                    useSingleInferredProject: false,
                    useInferredProjectPerProjectRoot: false,
                    typingsInstaller: undefined,
                    byteLength: Utils.byteLength,
                    hrtime: process.hrtime,
                    logger: serverHost,
                    canUseEvents: true
                };
                var server = new ts.server.Session(opts);
                // Fake the connection between the client and the server
                serverHost.writeMessage = client.onMessage.bind(client);
                clientHost.writeMessage = server.onMessage.bind(server);
                // Wire the client to the host to get notifications when a file is open
                // or edited.
                clientHost.setClient(client);
                // Set the properties
                this.client = client;
                this.host = clientHost;
            }
            ServerLanguageServiceAdapter.prototype.getHost = function () { return this.host; };
            ServerLanguageServiceAdapter.prototype.getLanguageService = function () { return this.client; };
            ServerLanguageServiceAdapter.prototype.getClassifier = function () { throw new Error("getClassifier is not available using the server interface."); };
            ServerLanguageServiceAdapter.prototype.getPreProcessedFileInfo = function () { throw new Error("getPreProcessedFileInfo is not available using the server interface."); };
            return ServerLanguageServiceAdapter;
        }());
        LanguageService.ServerLanguageServiceAdapter = ServerLanguageServiceAdapter;
    })(LanguageService = Harness.LanguageService || (Harness.LanguageService = {}));
})(Harness || (Harness = {}));
var ts;
(function (ts) {
    var TestFSWithWatch;
    (function (TestFSWithWatch) {
        TestFSWithWatch.libFile = {
            path: "/a/lib/lib.d.ts",
            content: "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> {}"
        };
        TestFSWithWatch.safeList = {
            path: "/safeList.json",
            content: JSON.stringify({
                commander: "commander",
                express: "express",
                jquery: "jquery",
                lodash: "lodash",
                moment: "moment",
                chroma: "chroma-js"
            })
        };
        function getExecutingFilePathFromLibFile() {
            return ts.combinePaths(ts.getDirectoryPath(TestFSWithWatch.libFile.path), "tsc.js");
        }
        function createWatchedSystem(fileOrFolderList, params) {
            if (!params) {
                params = {};
            }
            var host = new TestServerHost(/*withSafelist*/ false, params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false, params.executingFilePath || getExecutingFilePathFromLibFile(), params.currentDirectory || "/", fileOrFolderList, params.newLine, params.useWindowsStylePaths, params.environmentVariables);
            return host;
        }
        TestFSWithWatch.createWatchedSystem = createWatchedSystem;
        function createServerHost(fileOrFolderList, params) {
            if (!params) {
                params = {};
            }
            var host = new TestServerHost(/*withSafelist*/ true, params.useCaseSensitiveFileNames !== undefined ? params.useCaseSensitiveFileNames : false, params.executingFilePath || getExecutingFilePathFromLibFile(), params.currentDirectory || "/", fileOrFolderList, params.newLine, params.useWindowsStylePaths, params.environmentVariables);
            return host;
        }
        TestFSWithWatch.createServerHost = createServerHost;
        function isFile(fileOrFolderOrSymLink) {
            return ts.isString(fileOrFolderOrSymLink.content);
        }
        function isSymLink(fileOrFolderOrSymLink) {
            return ts.isString(fileOrFolderOrSymLink.symLink);
        }
        function isFsFolder(s) {
            return s && ts.isArray(s.entries);
        }
        function isFsFile(s) {
            return s && ts.isString(s.content);
        }
        function isFsSymLink(s) {
            return s && ts.isString(s.symLink);
        }
        function invokeWatcherCallbacks(callbacks, invokeCallback) {
            if (callbacks) {
                // The array copy is made to ensure that even if one of the callback removes the callbacks,
                // we dont miss any callbacks following it
                var cbs = callbacks.slice();
                for (var _i = 0, cbs_1 = cbs; _i < cbs_1.length; _i++) {
                    var cb = cbs_1[_i];
                    invokeCallback(cb);
                }
            }
        }
        function getDiffInKeys(map, expectedKeys) {
            if (map.size === expectedKeys.length) {
                return "";
            }
            var notInActual = [];
            var duplicates = [];
            var seen = ts.createMap();
            ts.forEach(expectedKeys, function (expectedKey) {
                if (seen.has(expectedKey)) {
                    duplicates.push(expectedKey);
                    return;
                }
                seen.set(expectedKey, true);
                if (!map.has(expectedKey)) {
                    notInActual.push(expectedKey);
                }
            });
            var inActualNotExpected = [];
            map.forEach(function (_value, key) {
                if (!seen.has(key)) {
                    inActualNotExpected.push(key);
                }
                seen.set(key, true);
            });
            return "\n\nNotInActual: " + notInActual + "\nDuplicates: " + duplicates + "\nInActualButNotInExpected: " + inActualNotExpected;
        }
        function verifyMapSize(caption, map, expectedKeys) {
            assert.equal(map.size, expectedKeys.length, caption + ": incorrect size of map: Actual keys: " + ts.arrayFrom(map.keys()) + " Expected: " + expectedKeys + getDiffInKeys(map, expectedKeys));
        }
        TestFSWithWatch.verifyMapSize = verifyMapSize;
        function checkMapKeys(caption, map, expectedKeys) {
            verifyMapSize(caption, map, expectedKeys);
            for (var _i = 0, expectedKeys_1 = expectedKeys; _i < expectedKeys_1.length; _i++) {
                var name = expectedKeys_1[_i];
                assert.isTrue(map.has(name), caption + " is expected to contain " + name + ", actual keys: " + ts.arrayFrom(map.keys()));
            }
        }
        function checkMultiMapKeyCount(caption, actual, expectedKeysMapOrArray, eachKeyCount) {
            var expectedKeys = ts.isArray(expectedKeysMapOrArray) ? ts.arrayToMap(expectedKeysMapOrArray, function (s) { return s; }, function () { return eachKeyCount; }) : expectedKeysMapOrArray;
            verifyMapSize(caption, actual, ts.arrayFrom(expectedKeys.keys()));
            expectedKeys.forEach(function (count, name) {
                assert.isTrue(actual.has(name), caption + ": expected to contain " + name + ", actual keys: " + ts.arrayFrom(actual.keys()));
                assert.equal(actual.get(name).length, count, caption + ": Expected to be have " + count + " entries for " + name + ". Actual entry: " + JSON.stringify(actual.get(name)));
            });
        }
        TestFSWithWatch.checkMultiMapKeyCount = checkMultiMapKeyCount;
        function checkArray(caption, actual, expected) {
            assert.equal(actual.length, expected.length, caption + ": incorrect actual number of files, expected:\r\n" + expected.join("\r\n") + "\r\ngot: " + actual.join("\r\n"));
            for (var _i = 0, expected_1 = expected; _i < expected_1.length; _i++) {
                var f = expected_1[_i];
                assert.equal(true, ts.contains(actual, f), caption + ": expected to find " + f + " in " + actual);
            }
        }
        TestFSWithWatch.checkArray = checkArray;
        function checkWatchedFiles(host, expectedFiles) {
            checkMapKeys("watchedFiles", host.watchedFiles, expectedFiles);
        }
        TestFSWithWatch.checkWatchedFiles = checkWatchedFiles;
        function checkWatchedFilesDetailed(host, expectedFiles, eachFileWatchCount) {
            if (ts.isArray(expectedFiles)) {
                checkMultiMapKeyCount("watchedFiles", host.watchedFiles, expectedFiles, eachFileWatchCount);
            }
            else {
                checkMultiMapKeyCount("watchedFiles", host.watchedFiles, expectedFiles);
            }
        }
        TestFSWithWatch.checkWatchedFilesDetailed = checkWatchedFilesDetailed;
        function checkWatchedDirectories(host, expectedDirectories, recursive) {
            checkMapKeys("watchedDirectories" + (recursive ? " recursive" : ""), recursive ? host.watchedDirectoriesRecursive : host.watchedDirectories, expectedDirectories);
        }
        TestFSWithWatch.checkWatchedDirectories = checkWatchedDirectories;
        function checkWatchedDirectoriesDetailed(host, expectedDirectories, recursiveOrEachDirectoryWatchCount, recursive) {
            if (ts.isArray(expectedDirectories)) {
                checkMultiMapKeyCount("watchedDirectories" + (recursive ? " recursive" : ""), recursive ? host.watchedDirectoriesRecursive : host.watchedDirectories, expectedDirectories, recursiveOrEachDirectoryWatchCount);
            }
            else {
                recursive = recursiveOrEachDirectoryWatchCount;
                checkMultiMapKeyCount("watchedDirectories" + (recursive ? " recursive" : ""), recursive ? host.watchedDirectoriesRecursive : host.watchedDirectories, expectedDirectories);
            }
        }
        TestFSWithWatch.checkWatchedDirectoriesDetailed = checkWatchedDirectoriesDetailed;
        function checkOutputContains(host, expected) {
            var mapExpected = ts.arrayToSet(expected);
            var mapSeen = ts.createMap();
            for (var _i = 0, _a = host.getOutput(); _i < _a.length; _i++) {
                var f = _a[_i];
                assert.isUndefined(mapSeen.get(f), "Already found " + f + " in " + JSON.stringify(host.getOutput()));
                if (mapExpected.has(f)) {
                    mapExpected.delete(f);
                    mapSeen.set(f, true);
                }
            }
            assert.equal(mapExpected.size, 0, "Output has missing " + JSON.stringify(ts.arrayFrom(mapExpected.keys())) + " in " + JSON.stringify(host.getOutput()));
        }
        TestFSWithWatch.checkOutputContains = checkOutputContains;
        function checkOutputDoesNotContain(host, expectedToBeAbsent) {
            var mapExpectedToBeAbsent = ts.arrayToSet(expectedToBeAbsent);
            for (var _i = 0, _a = host.getOutput(); _i < _a.length; _i++) {
                var f = _a[_i];
                assert.isFalse(mapExpectedToBeAbsent.has(f), "Contains " + f + " in " + JSON.stringify(host.getOutput()));
            }
        }
        TestFSWithWatch.checkOutputDoesNotContain = checkOutputDoesNotContain;
        var Callbacks = /** @class */ (function () {
            function Callbacks() {
                this.map = [];
                this.nextId = 1;
            }
            Callbacks.prototype.getNextId = function () {
                return this.nextId;
            };
            Callbacks.prototype.register = function (cb, args) {
                var timeoutId = this.nextId;
                this.nextId++;
                this.map[timeoutId] = cb.bind.apply(cb, [/*this*/ undefined].concat(args));
                return timeoutId;
            };
            Callbacks.prototype.unregister = function (id) {
                if (typeof id === "number") {
                    delete this.map[id];
                }
            };
            Callbacks.prototype.count = function () {
                var n = 0;
                for (var _ in this.map) {
                    n++;
                }
                return n;
            };
            Callbacks.prototype.invoke = function (invokeKey) {
                if (invokeKey) {
                    this.map[invokeKey]();
                    delete this.map[invokeKey];
                    return;
                }
                // Note: invoking a callback may result in new callbacks been queued,
                // so do not clear the entire callback list regardless. Only remove the
                // ones we have invoked.
                for (var key in this.map) {
                    this.map[key]();
                    delete this.map[key];
                }
            };
            return Callbacks;
        }());
        var Tsc_WatchDirectory;
        (function (Tsc_WatchDirectory) {
            Tsc_WatchDirectory["WatchFile"] = "RecursiveDirectoryUsingFsWatchFile";
            Tsc_WatchDirectory["NonRecursiveWatchDirectory"] = "RecursiveDirectoryUsingNonRecursiveWatchDirectory";
            Tsc_WatchDirectory["DynamicPolling"] = "RecursiveDirectoryUsingDynamicPriorityPolling";
        })(Tsc_WatchDirectory = TestFSWithWatch.Tsc_WatchDirectory || (TestFSWithWatch.Tsc_WatchDirectory = {}));
        var timeIncrements = 1000;
        var TestServerHost = /** @class */ (function () {
            function TestServerHost(withSafeList, useCaseSensitiveFileNames, executingFilePath, currentDirectory, fileOrFolderorSymLinkList, newLine, useWindowsStylePath, environmentVariables) {
                if (newLine === void 0) { newLine = "\n"; }
                var _this = this;
                this.withSafeList = withSafeList;
                this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
                this.newLine = newLine;
                this.useWindowsStylePath = useWindowsStylePath;
                this.environmentVariables = environmentVariables;
                this.args = [];
                this.output = [];
                this.fs = ts.createMap();
                this.time = timeIncrements;
                this.timeoutCallbacks = new Callbacks();
                this.immediateCallbacks = new Callbacks();
                this.screenClears = [];
                this.watchedDirectories = ts.createMultiMap();
                this.watchedDirectoriesRecursive = ts.createMultiMap();
                this.watchedFiles = ts.createMultiMap();
                this.exitMessage = "System Exit";
                this.resolvePath = function (s) { return s; };
                this.getExecutingFilePath = function () { return _this.executingFilePath; };
                this.getCurrentDirectory = function () { return _this.currentDirectory; };
                this.getCanonicalFileName = ts.createGetCanonicalFileName(useCaseSensitiveFileNames);
                this.toPath = function (s) { return ts.toPath(s, currentDirectory, _this.getCanonicalFileName); };
                this.executingFilePath = this.getHostSpecificPath(executingFilePath);
                this.currentDirectory = this.getHostSpecificPath(currentDirectory);
                this.reloadFS(fileOrFolderorSymLinkList);
                this.dynamicPriorityWatchFile = this.environmentVariables && this.environmentVariables.get("TSC_WATCHFILE") === "DynamicPriorityPolling" ?
                    ts.createDynamicPriorityPollingWatchFile(this) :
                    undefined;
                var tscWatchDirectory = this.environmentVariables && this.environmentVariables.get("TSC_WATCHDIRECTORY");
                if (tscWatchDirectory === Tsc_WatchDirectory.WatchFile) {
                    var watchDirectory = function (directory, cb) { return _this.watchFile(directory, function () { return cb(directory); }, ts.PollingInterval.Medium); };
                    this.customRecursiveWatchDirectory = ts.createRecursiveDirectoryWatcher({
                        directoryExists: function (path) { return _this.directoryExists(path); },
                        getAccessibleSortedChildDirectories: function (path) { return _this.getDirectories(path); },
                        filePathComparer: this.useCaseSensitiveFileNames ? ts.compareStringsCaseSensitive : ts.compareStringsCaseInsensitive,
                        watchDirectory: watchDirectory,
                        realpath: function (s) { return _this.realpath(s); }
                    });
                }
                else if (tscWatchDirectory === Tsc_WatchDirectory.NonRecursiveWatchDirectory) {
                    var watchDirectory = function (directory, cb) { return _this.watchDirectory(directory, function (fileName) { return cb(fileName); }, /*recursive*/ false); };
                    this.customRecursiveWatchDirectory = ts.createRecursiveDirectoryWatcher({
                        directoryExists: function (path) { return _this.directoryExists(path); },
                        getAccessibleSortedChildDirectories: function (path) { return _this.getDirectories(path); },
                        filePathComparer: this.useCaseSensitiveFileNames ? ts.compareStringsCaseSensitive : ts.compareStringsCaseInsensitive,
                        watchDirectory: watchDirectory,
                        realpath: function (s) { return _this.realpath(s); }
                    });
                }
                else if (tscWatchDirectory === Tsc_WatchDirectory.DynamicPolling) {
                    var watchFile_1 = ts.createDynamicPriorityPollingWatchFile(this);
                    var watchDirectory = function (directory, cb) { return watchFile_1(directory, function () { return cb(directory); }, ts.PollingInterval.Medium); };
                    this.customRecursiveWatchDirectory = ts.createRecursiveDirectoryWatcher({
                        directoryExists: function (path) { return _this.directoryExists(path); },
                        getAccessibleSortedChildDirectories: function (path) { return _this.getDirectories(path); },
                        filePathComparer: this.useCaseSensitiveFileNames ? ts.compareStringsCaseSensitive : ts.compareStringsCaseInsensitive,
                        watchDirectory: watchDirectory,
                        realpath: function (s) { return _this.realpath(s); }
                    });
                }
            }
            TestServerHost.prototype.getNewLine = function () {
                return this.newLine;
            };
            TestServerHost.prototype.toNormalizedAbsolutePath = function (s) {
                return ts.getNormalizedAbsolutePath(s, this.currentDirectory);
            };
            TestServerHost.prototype.toFullPath = function (s) {
                return this.toPath(this.toNormalizedAbsolutePath(s));
            };
            TestServerHost.prototype.getHostSpecificPath = function (s) {
                if (this.useWindowsStylePath && s.startsWith(ts.directorySeparator)) {
                    return "c:/" + s.substring(1);
                }
                return s;
            };
            TestServerHost.prototype.now = function () {
                this.time += timeIncrements;
                return new Date(this.time);
            };
            TestServerHost.prototype.reloadFS = function (fileOrFolderOrSymLinkList, options) {
                var _this = this;
                var mapNewLeaves = ts.createMap();
                var isNewFs = this.fs.size === 0;
                fileOrFolderOrSymLinkList = fileOrFolderOrSymLinkList.concat(this.withSafeList ? TestFSWithWatch.safeList : []);
                var filesOrFoldersToLoad = !this.useWindowsStylePath ? fileOrFolderOrSymLinkList :
                    fileOrFolderOrSymLinkList.map(function (f) {
                        var result = ts.clone(f);
                        result.path = _this.getHostSpecificPath(f.path);
                        return result;
                    });
                for (var _i = 0, filesOrFoldersToLoad_1 = filesOrFoldersToLoad; _i < filesOrFoldersToLoad_1.length; _i++) {
                    var fileOrDirectory = filesOrFoldersToLoad_1[_i];
                    var path = this.toFullPath(fileOrDirectory.path);
                    mapNewLeaves.set(path, true);
                    // If its a change
                    var currentEntry = this.fs.get(path);
                    if (currentEntry) {
                        if (isFsFile(currentEntry)) {
                            if (isFile(fileOrDirectory)) {
                                // Update file
                                if (currentEntry.content !== fileOrDirectory.content) {
                                    this.modifyFile(fileOrDirectory.path, fileOrDirectory.content, options);
                                }
                            }
                            else {
                                // TODO: Changing from file => folder/Symlink
                            }
                        }
                        else if (isFsSymLink(currentEntry)) {
                            // TODO: update symlinks
                        }
                        else {
                            // Folder
                            if (isFile(fileOrDirectory)) {
                                // TODO: Changing from folder => file
                            }
                            else {
                                // Folder update: Nothing to do.
                                currentEntry.modifiedTime = this.now();
                            }
                        }
                    }
                    else {
                        this.ensureFileOrFolder(fileOrDirectory, options && options.ignoreWatchInvokedWithTriggerAsFileCreate);
                    }
                }
                if (!isNewFs) {
                    this.fs.forEach(function (fileOrDirectory, path) {
                        // If this entry is not from the new file or folder
                        if (!mapNewLeaves.get(path)) {
                            // Leaf entries that arent in new list => remove these
                            if (isFsFile(fileOrDirectory) || isFsSymLink(fileOrDirectory) || isFsFolder(fileOrDirectory) && fileOrDirectory.entries.length === 0) {
                                _this.removeFileOrFolder(fileOrDirectory, function (folder) { return !mapNewLeaves.get(folder.path); });
                            }
                        }
                    });
                }
            };
            TestServerHost.prototype.modifyFile = function (filePath, content, options) {
                var path = this.toFullPath(filePath);
                var currentEntry = this.fs.get(path);
                if (!currentEntry || !isFsFile(currentEntry)) {
                    throw new Error("file not present: " + filePath);
                }
                if (options && options.invokeFileDeleteCreateAsPartInsteadOfChange) {
                    this.removeFileOrFolder(currentEntry, ts.returnFalse);
                    this.ensureFileOrFolder({ path: filePath, content: content });
                }
                else {
                    currentEntry.content = content;
                    currentEntry.modifiedTime = this.now();
                    this.fs.get(ts.getDirectoryPath(currentEntry.path)).modifiedTime = this.now();
                    if (options && options.invokeDirectoryWatcherInsteadOfFileChanged) {
                        this.invokeDirectoryWatcher(ts.getDirectoryPath(currentEntry.fullPath), currentEntry.fullPath);
                    }
                    else {
                        this.invokeFileWatcher(currentEntry.fullPath, ts.FileWatcherEventKind.Changed);
                    }
                }
            };
            TestServerHost.prototype.renameFolder = function (folderName, newFolderName) {
                var fullPath = ts.getNormalizedAbsolutePath(folderName, this.currentDirectory);
                var path = this.toPath(fullPath);
                var folder = this.fs.get(path);
                ts.Debug.assert(!!folder);
                // Only remove the folder
                this.removeFileOrFolder(folder, ts.returnFalse, /*isRenaming*/ true);
                // Add updated folder with new folder name
                var newFullPath = ts.getNormalizedAbsolutePath(newFolderName, this.currentDirectory);
                var newFolder = this.toFsFolder(newFullPath);
                var newPath = newFolder.path;
                var basePath = ts.getDirectoryPath(path);
                ts.Debug.assert(basePath !== path);
                ts.Debug.assert(basePath === ts.getDirectoryPath(newPath));
                var baseFolder = this.fs.get(basePath);
                this.addFileOrFolderInFolder(baseFolder, newFolder);
                // Invoke watches for files in the folder as deleted (from old path)
                this.renameFolderEntries(folder, newFolder);
            };
            TestServerHost.prototype.renameFolderEntries = function (oldFolder, newFolder) {
                for (var _i = 0, _a = oldFolder.entries; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    this.fs.delete(entry.path);
                    this.invokeFileWatcher(entry.fullPath, ts.FileWatcherEventKind.Deleted);
                    entry.fullPath = ts.combinePaths(newFolder.fullPath, ts.getBaseFileName(entry.fullPath));
                    entry.path = this.toPath(entry.fullPath);
                    if (newFolder !== oldFolder) {
                        newFolder.entries.push(entry);
                    }
                    this.fs.set(entry.path, entry);
                    this.invokeFileWatcher(entry.fullPath, ts.FileWatcherEventKind.Created);
                    if (isFsFolder(entry)) {
                        this.renameFolderEntries(entry, entry);
                    }
                }
            };
            TestServerHost.prototype.ensureFileOrFolder = function (fileOrDirectoryOrSymLink, ignoreWatchInvokedWithTriggerAsFileCreate) {
                if (isFile(fileOrDirectoryOrSymLink)) {
                    var file = this.toFsFile(fileOrDirectoryOrSymLink);
                    // file may already exist when updating existing type declaration file
                    if (!this.fs.get(file.path)) {
                        var baseFolder = this.ensureFolder(ts.getDirectoryPath(file.fullPath));
                        this.addFileOrFolderInFolder(baseFolder, file, ignoreWatchInvokedWithTriggerAsFileCreate);
                    }
                }
                else if (isSymLink(fileOrDirectoryOrSymLink)) {
                    var symLink = this.toFsSymLink(fileOrDirectoryOrSymLink);
                    ts.Debug.assert(!this.fs.get(symLink.path));
                    var baseFolder = this.ensureFolder(ts.getDirectoryPath(symLink.fullPath));
                    this.addFileOrFolderInFolder(baseFolder, symLink, ignoreWatchInvokedWithTriggerAsFileCreate);
                }
                else {
                    var fullPath = ts.getNormalizedAbsolutePath(fileOrDirectoryOrSymLink.path, this.currentDirectory);
                    this.ensureFolder(fullPath);
                }
            };
            TestServerHost.prototype.ensureFolder = function (fullPath) {
                var path = this.toPath(fullPath);
                var folder = this.fs.get(path);
                if (!folder) {
                    folder = this.toFsFolder(fullPath);
                    var baseFullPath = ts.getDirectoryPath(fullPath);
                    if (fullPath !== baseFullPath) {
                        // Add folder in the base folder
                        var baseFolder = this.ensureFolder(baseFullPath);
                        this.addFileOrFolderInFolder(baseFolder, folder);
                    }
                    else {
                        // root folder
                        ts.Debug.assert(this.fs.size === 0);
                        this.fs.set(path, folder);
                    }
                }
                ts.Debug.assert(isFsFolder(folder));
                return folder;
            };
            TestServerHost.prototype.addFileOrFolderInFolder = function (folder, fileOrDirectory, ignoreWatch) {
                ts.insertSorted(folder.entries, fileOrDirectory, function (a, b) { return ts.compareStringsCaseSensitive(ts.getBaseFileName(a.path), ts.getBaseFileName(b.path)); });
                folder.modifiedTime = this.now();
                this.fs.set(fileOrDirectory.path, fileOrDirectory);
                if (ignoreWatch) {
                    return;
                }
                this.invokeFileWatcher(fileOrDirectory.fullPath, ts.FileWatcherEventKind.Created);
                this.invokeDirectoryWatcher(folder.fullPath, fileOrDirectory.fullPath);
            };
            TestServerHost.prototype.removeFileOrFolder = function (fileOrDirectory, isRemovableLeafFolder, isRenaming) {
                if (isRenaming === void 0) { isRenaming = false; }
                var basePath = ts.getDirectoryPath(fileOrDirectory.path);
                var baseFolder = this.fs.get(basePath);
                if (basePath !== fileOrDirectory.path) {
                    ts.Debug.assert(!!baseFolder);
                    baseFolder.modifiedTime = this.now();
                    ts.filterMutate(baseFolder.entries, function (entry) { return entry !== fileOrDirectory; });
                }
                this.fs.delete(fileOrDirectory.path);
                this.invokeFileWatcher(fileOrDirectory.fullPath, ts.FileWatcherEventKind.Deleted);
                if (isFsFolder(fileOrDirectory)) {
                    ts.Debug.assert(fileOrDirectory.entries.length === 0 || isRenaming);
                    var relativePath = this.getRelativePathToDirectory(fileOrDirectory.fullPath, fileOrDirectory.fullPath);
                    // Invoke directory and recursive directory watcher for the folder
                    // Here we arent invoking recursive directory watchers for the base folders
                    // since that is something we would want to do for both file as well as folder we are deleting
                    this.invokeWatchedDirectoriesCallback(fileOrDirectory.fullPath, relativePath);
                    this.invokeWatchedDirectoriesRecursiveCallback(fileOrDirectory.fullPath, relativePath);
                }
                if (basePath !== fileOrDirectory.path) {
                    if (baseFolder.entries.length === 0 && isRemovableLeafFolder(baseFolder)) {
                        this.removeFileOrFolder(baseFolder, isRemovableLeafFolder);
                    }
                    else {
                        this.invokeRecursiveDirectoryWatcher(baseFolder.fullPath, fileOrDirectory.fullPath);
                    }
                }
            };
            TestServerHost.prototype.removeFolder = function (folderPath, recursive) {
                var _this = this;
                var path = this.toFullPath(folderPath);
                var currentEntry = this.fs.get(path);
                ts.Debug.assert(isFsFolder(currentEntry));
                if (recursive && currentEntry.entries.length) {
                    var subEntries = currentEntry.entries.slice();
                    subEntries.forEach(function (fsEntry) {
                        if (isFsFolder(fsEntry)) {
                            _this.removeFolder(fsEntry.fullPath, recursive);
                        }
                        else {
                            _this.removeFileOrFolder(fsEntry, ts.returnFalse);
                        }
                    });
                }
                this.removeFileOrFolder(currentEntry, ts.returnFalse);
            };
            // For overriding the methods
            TestServerHost.prototype.invokeWatchedDirectoriesCallback = function (folderFullPath, relativePath) {
                var _this = this;
                invokeWatcherCallbacks(this.watchedDirectories.get(this.toPath(folderFullPath)), function (cb) { return _this.directoryCallback(cb, relativePath); });
            };
            TestServerHost.prototype.invokeWatchedDirectoriesRecursiveCallback = function (folderFullPath, relativePath) {
                var _this = this;
                invokeWatcherCallbacks(this.watchedDirectoriesRecursive.get(this.toPath(folderFullPath)), function (cb) { return _this.directoryCallback(cb, relativePath); });
            };
            TestServerHost.prototype.invokeFileWatcher = function (fileFullPath, eventKind, useFileNameInCallback) {
                invokeWatcherCallbacks(this.watchedFiles.get(this.toPath(fileFullPath)), function (_a) {
                    var cb = _a.cb, fileName = _a.fileName;
                    return cb(useFileNameInCallback ? fileName : fileFullPath, eventKind);
                });
            };
            TestServerHost.prototype.getRelativePathToDirectory = function (directoryFullPath, fileFullPath) {
                return ts.getRelativePathToDirectoryOrUrl(directoryFullPath, fileFullPath, this.currentDirectory, this.getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
            };
            /**
             * This will call the directory watcher for the folderFullPath and recursive directory watchers for this and base folders
             */
            TestServerHost.prototype.invokeDirectoryWatcher = function (folderFullPath, fileName) {
                var relativePath = this.getRelativePathToDirectory(folderFullPath, fileName);
                // Folder is changed when the directory watcher is invoked
                this.invokeFileWatcher(folderFullPath, ts.FileWatcherEventKind.Changed, /*useFileNameInCallback*/ true);
                this.invokeWatchedDirectoriesCallback(folderFullPath, relativePath);
                this.invokeRecursiveDirectoryWatcher(folderFullPath, fileName);
            };
            TestServerHost.prototype.directoryCallback = function (_a, relativePath) {
                var cb = _a.cb, directoryName = _a.directoryName;
                cb(ts.combinePaths(directoryName, relativePath));
            };
            /**
             * This will call the recursive directory watcher for this directory as well as all the base directories
             */
            TestServerHost.prototype.invokeRecursiveDirectoryWatcher = function (fullPath, fileName) {
                var relativePath = this.getRelativePathToDirectory(fullPath, fileName);
                this.invokeWatchedDirectoriesRecursiveCallback(fullPath, relativePath);
                var basePath = ts.getDirectoryPath(fullPath);
                if (this.getCanonicalFileName(fullPath) !== this.getCanonicalFileName(basePath)) {
                    this.invokeRecursiveDirectoryWatcher(basePath, fileName);
                }
            };
            TestServerHost.prototype.toFsEntry = function (path) {
                var fullPath = ts.getNormalizedAbsolutePath(path, this.currentDirectory);
                return {
                    path: this.toPath(fullPath),
                    fullPath: fullPath,
                    modifiedTime: this.now()
                };
            };
            TestServerHost.prototype.toFsFile = function (file) {
                var fsFile = this.toFsEntry(file.path);
                fsFile.content = file.content;
                fsFile.fileSize = file.fileSize;
                return fsFile;
            };
            TestServerHost.prototype.toFsSymLink = function (symLink) {
                var fsSymLink = this.toFsEntry(symLink.path);
                fsSymLink.symLink = ts.getNormalizedAbsolutePath(symLink.symLink, ts.getDirectoryPath(fsSymLink.fullPath));
                return fsSymLink;
            };
            TestServerHost.prototype.toFsFolder = function (path) {
                var fsFolder = this.toFsEntry(path);
                fsFolder.entries = []; // https://github.com/Microsoft/TypeScript/issues/19873
                return fsFolder;
            };
            TestServerHost.prototype.getRealFsEntry = function (isFsEntry, path, fsEntry) {
                if (fsEntry === void 0) { fsEntry = this.fs.get(path); }
                if (isFsEntry(fsEntry)) {
                    return fsEntry;
                }
                if (isFsSymLink(fsEntry)) {
                    return this.getRealFsEntry(isFsEntry, this.toPath(fsEntry.symLink));
                }
                if (fsEntry) {
                    // This fs entry is something else
                    return undefined;
                }
                var realpath = this.realpath(path);
                if (path !== realpath) {
                    return this.getRealFsEntry(isFsEntry, this.toPath(realpath));
                }
                return undefined;
            };
            TestServerHost.prototype.isFsFile = function (fsEntry) {
                return !!this.getRealFile(fsEntry.path, fsEntry);
            };
            TestServerHost.prototype.getRealFile = function (path, fsEntry) {
                return this.getRealFsEntry(isFsFile, path, fsEntry);
            };
            TestServerHost.prototype.isFsFolder = function (fsEntry) {
                return !!this.getRealFolder(fsEntry.path, fsEntry);
            };
            TestServerHost.prototype.getRealFolder = function (path, fsEntry) {
                if (fsEntry === void 0) { fsEntry = this.fs.get(path); }
                return this.getRealFsEntry(isFsFolder, path, fsEntry);
            };
            TestServerHost.prototype.fileExists = function (s) {
                var path = this.toFullPath(s);
                return !!this.getRealFile(path);
            };
            TestServerHost.prototype.getModifiedTime = function (s) {
                var path = this.toFullPath(s);
                var fsEntry = this.fs.get(path);
                return (fsEntry && fsEntry.modifiedTime); // TODO: GH#18217
            };
            TestServerHost.prototype.readFile = function (s) {
                var fsEntry = this.getRealFile(this.toFullPath(s));
                return fsEntry ? fsEntry.content : undefined;
            };
            TestServerHost.prototype.getFileSize = function (s) {
                var path = this.toFullPath(s);
                var entry = this.fs.get(path);
                if (isFsFile(entry)) {
                    return entry.fileSize ? entry.fileSize : entry.content.length;
                }
                return undefined; // TODO: GH#18217
            };
            TestServerHost.prototype.directoryExists = function (s) {
                var path = this.toFullPath(s);
                return !!this.getRealFolder(path);
            };
            TestServerHost.prototype.getDirectories = function (s) {
                var _this = this;
                var path = this.toFullPath(s);
                var folder = this.getRealFolder(path);
                if (folder) {
                    return ts.mapDefined(folder.entries, function (entry) { return _this.isFsFolder(entry) ? ts.getBaseFileName(entry.fullPath) : undefined; });
                }
                ts.Debug.fail(folder ? "getDirectories called on file" : "getDirectories called on missing folder");
                return [];
            };
            TestServerHost.prototype.readDirectory = function (path, extensions, exclude, include, depth) {
                var _this = this;
                return ts.matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), depth, function (dir) {
                    var directories = [];
                    var files = [];
                    var folder = _this.getRealFolder(_this.toPath(dir));
                    if (folder) {
                        folder.entries.forEach(function (entry) {
                            if (_this.isFsFolder(entry)) {
                                directories.push(ts.getBaseFileName(entry.fullPath));
                            }
                            else if (_this.isFsFile(entry)) {
                                files.push(ts.getBaseFileName(entry.fullPath));
                            }
                            else {
                                ts.Debug.fail("Unknown entry");
                            }
                        });
                    }
                    return { directories: directories, files: files };
                });
            };
            TestServerHost.prototype.watchDirectory = function (directoryName, cb, recursive) {
                if (recursive && this.customRecursiveWatchDirectory) {
                    return this.customRecursiveWatchDirectory(directoryName, cb, /*recursive*/ true);
                }
                var path = this.toFullPath(directoryName);
                var map = recursive ? this.watchedDirectoriesRecursive : this.watchedDirectories;
                var callback = {
                    cb: cb,
                    directoryName: directoryName
                };
                map.add(path, callback);
                return {
                    close: function () { return map.remove(path, callback); }
                };
            };
            TestServerHost.prototype.createHash = function (s) {
                return Harness.mockHash(s);
            };
            TestServerHost.prototype.createSHA256Hash = function (s) {
                return ts.sys.createSHA256Hash(s);
            };
            TestServerHost.prototype.watchFile = function (fileName, cb, pollingInterval) {
                var _this = this;
                if (this.dynamicPriorityWatchFile) {
                    return this.dynamicPriorityWatchFile(fileName, cb, pollingInterval);
                }
                var path = this.toFullPath(fileName);
                var callback = { fileName: fileName, cb: cb };
                this.watchedFiles.add(path, callback);
                return { close: function () { return _this.watchedFiles.remove(path, callback); } };
            };
            // TOOD: record and invoke callbacks to simulate timer events
            TestServerHost.prototype.setTimeout = function (callback, _time) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                return this.timeoutCallbacks.register(callback, args);
            };
            TestServerHost.prototype.getNextTimeoutId = function () {
                return this.timeoutCallbacks.getNextId();
            };
            TestServerHost.prototype.clearTimeout = function (timeoutId) {
                this.timeoutCallbacks.unregister(timeoutId);
            };
            TestServerHost.prototype.clearScreen = function () {
                this.screenClears.push(this.output.length);
            };
            TestServerHost.prototype.checkTimeoutQueueLengthAndRun = function (expected) {
                this.checkTimeoutQueueLength(expected);
                this.runQueuedTimeoutCallbacks();
            };
            TestServerHost.prototype.checkTimeoutQueueLength = function (expected) {
                var callbacksCount = this.timeoutCallbacks.count();
                assert.equal(callbacksCount, expected, "expected " + expected + " timeout callbacks queued but found " + callbacksCount + ".");
            };
            TestServerHost.prototype.runQueuedTimeoutCallbacks = function (timeoutId) {
                try {
                    this.timeoutCallbacks.invoke(timeoutId);
                }
                catch (e) {
                    if (e.message === this.exitMessage) {
                        return;
                    }
                    throw e;
                }
            };
            TestServerHost.prototype.runQueuedImmediateCallbacks = function (checkCount) {
                if (checkCount !== undefined) {
                    assert.equal(this.immediateCallbacks.count(), checkCount);
                }
                this.immediateCallbacks.invoke();
            };
            TestServerHost.prototype.setImmediate = function (callback, _time) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                return this.immediateCallbacks.register(callback, args);
            };
            TestServerHost.prototype.clearImmediate = function (timeoutId) {
                this.immediateCallbacks.unregister(timeoutId);
            };
            TestServerHost.prototype.createDirectory = function (directoryName) {
                var folder = this.toFsFolder(directoryName);
                // base folder has to be present
                var base = ts.getDirectoryPath(folder.path);
                var baseFolder = this.fs.get(base);
                ts.Debug.assert(isFsFolder(baseFolder));
                ts.Debug.assert(!this.fs.get(folder.path));
                this.addFileOrFolderInFolder(baseFolder, folder);
            };
            TestServerHost.prototype.writeFile = function (path, content) {
                var file = this.toFsFile({ path: path, content: content });
                // base folder has to be present
                var base = ts.getDirectoryPath(file.path);
                var folder = this.fs.get(base);
                ts.Debug.assert(isFsFolder(folder));
                this.addFileOrFolderInFolder(folder, file);
            };
            TestServerHost.prototype.write = function (message) {
                this.output.push(message);
            };
            TestServerHost.prototype.getOutput = function () {
                return this.output;
            };
            TestServerHost.prototype.clearOutput = function () {
                ts.clear(this.output);
                this.screenClears.length = 0;
            };
            TestServerHost.prototype.realpath = function (s) {
                var fullPath = this.toNormalizedAbsolutePath(s);
                var path = this.toPath(fullPath);
                if (ts.getDirectoryPath(path) === path) {
                    // Root
                    return s;
                }
                var dirFullPath = this.realpath(ts.getDirectoryPath(fullPath));
                var realFullPath = ts.combinePaths(dirFullPath, ts.getBaseFileName(fullPath));
                var fsEntry = this.fs.get(this.toPath(realFullPath));
                if (isFsSymLink(fsEntry)) {
                    return this.realpath(fsEntry.symLink);
                }
                return realFullPath;
            };
            TestServerHost.prototype.exit = function (exitCode) {
                this.exitCode = exitCode;
                throw new Error(this.exitMessage);
            };
            TestServerHost.prototype.getEnvironmentVariable = function (name) {
                return this.environmentVariables && this.environmentVariables.get(name) || "";
            };
            return TestServerHost;
        }());
        TestFSWithWatch.TestServerHost = TestServerHost;
    })(TestFSWithWatch = ts.TestFSWithWatch || (ts.TestFSWithWatch = {}));
})(ts || (ts = {}));
var FourSlash;
(function (FourSlash) {
    ts.disableIncrementalParsing = false;
    var FourSlashTestType;
    (function (FourSlashTestType) {
        FourSlashTestType[FourSlashTestType["Native"] = 0] = "Native";
        FourSlashTestType[FourSlashTestType["Shims"] = 1] = "Shims";
        FourSlashTestType[FourSlashTestType["ShimsWithPreprocess"] = 2] = "ShimsWithPreprocess";
        FourSlashTestType[FourSlashTestType["Server"] = 3] = "Server";
    })(FourSlashTestType = FourSlash.FourSlashTestType || (FourSlash.FourSlashTestType = {}));
    // Name of testcase metadata including ts.CompilerOptions properties that will be used by globalOptions
    // To add additional option, add property into the testOptMetadataNames, refer the property in either globalMetadataNames or fileMetadataNames
    // Add cases into convertGlobalOptionsToCompilationsSettings function for the compiler to acknowledge such option from meta data
    var MetadataOptionNames;
    (function (MetadataOptionNames) {
        MetadataOptionNames["baselineFile"] = "BaselineFile";
        MetadataOptionNames["emitThisFile"] = "emitThisFile";
        MetadataOptionNames["fileName"] = "Filename";
        MetadataOptionNames["resolveReference"] = "ResolveReference";
        MetadataOptionNames["symlink"] = "Symlink";
    })(MetadataOptionNames || (MetadataOptionNames = {}));
    // List of allowed metadata names
    var fileMetadataNames = ["Filename" /* fileName */, "emitThisFile" /* emitThisFile */, "ResolveReference" /* resolveReference */, "Symlink" /* symlink */];
    function convertGlobalOptionsToCompilerOptions(globalOptions) {
        var settings = { target: 1 /* ES5 */ };
        Harness.Compiler.setCompilerOptionsFromHarnessSetting(globalOptions, settings);
        return settings;
    }
    var TestCancellationToken = /** @class */ (function () {
        function TestCancellationToken() {
            this.numberOfCallsBeforeCancellation = TestCancellationToken.notCanceled;
        }
        TestCancellationToken.prototype.isCancellationRequested = function () {
            if (this.numberOfCallsBeforeCancellation < 0) {
                return false;
            }
            if (this.numberOfCallsBeforeCancellation > 0) {
                this.numberOfCallsBeforeCancellation--;
                return false;
            }
            return true;
        };
        TestCancellationToken.prototype.setCancelled = function (numberOfCalls) {
            if (numberOfCalls === void 0) { numberOfCalls = 0; }
            ts.Debug.assert(numberOfCalls >= 0);
            this.numberOfCallsBeforeCancellation = numberOfCalls;
        };
        TestCancellationToken.prototype.resetCancelled = function () {
            this.numberOfCallsBeforeCancellation = TestCancellationToken.notCanceled;
        };
        // 0 - cancelled
        // >0 - not cancelled
        // <0 - not cancelled and value denotes number of isCancellationRequested after which token become cancelled
        TestCancellationToken.notCanceled = -1;
        return TestCancellationToken;
    }());
    FourSlash.TestCancellationToken = TestCancellationToken;
    function verifyOperationIsCancelled(f) {
        try {
            f();
        }
        catch (e) {
            if (e instanceof ts.OperationCanceledException) {
                return;
            }
        }
        throw new Error("Operation should be cancelled");
    }
    FourSlash.verifyOperationIsCancelled = verifyOperationIsCancelled;
    // This function creates IScriptSnapshot object for testing getPreProcessedFileInfo
    // Return object may lack some functionalities for other purposes.
    function createScriptSnapShot(sourceText) {
        return ts.ScriptSnapshot.fromString(sourceText);
    }
    var TestState = /** @class */ (function () {
        function TestState(basePath, testType, testData) {
            var _a;
            var _this = this;
            this.basePath = basePath;
            this.testType = testType;
            this.testData = testData;
            // The current caret position in the active file
            this.currentCaretPosition = 0;
            // The position of the end of the current selection, or -1 if nothing is selected
            this.selectionEnd = -1;
            this.lastKnownMarker = "";
            // Whether or not we should format on keystrokes
            this.enableFormatting = true;
            this.inputFiles = ts.createMap(); // Map between inputFile's fileName and its content for easily looking up when resolving references
            this.alignmentForExtraInfo = 50;
            // Create a new Services Adapter
            this.cancellationToken = new TestCancellationToken();
            var compilationOptions = convertGlobalOptionsToCompilerOptions(this.testData.globalOptions);
            compilationOptions.skipDefaultLibCheck = true;
            // Initialize the language service with all the scripts
            var startResolveFileRef;
            var configFileName;
            for (var _i = 0, _b = testData.files; _i < _b.length; _i++) {
                var file = _b[_i];
                // Create map between fileName and its content for easily looking up when resolveReference flag is specified
                this.inputFiles.set(file.fileName, file.content);
                if (isConfig(file)) {
                    var configJson = ts.parseConfigFileTextToJson(file.fileName, file.content);
                    if (configJson.config === undefined) {
                        throw new Error("Failed to parse test " + file.fileName + ": " + configJson.error.messageText);
                    }
                    // Extend our existing compiler options so that we can also support tsconfig only options
                    if (configJson.config.compilerOptions) {
                        var baseDirectory = ts.normalizePath(ts.getDirectoryPath(file.fileName));
                        var tsConfig = ts.convertCompilerOptionsFromJson(configJson.config.compilerOptions, baseDirectory, file.fileName);
                        if (!tsConfig.errors || !tsConfig.errors.length) {
                            compilationOptions = ts.extend(compilationOptions, tsConfig.options);
                        }
                    }
                    configFileName = file.fileName;
                }
                if (!startResolveFileRef && file.fileOptions["ResolveReference" /* resolveReference */] === "true") {
                    startResolveFileRef = file;
                }
                else if (startResolveFileRef) {
                    // If entry point for resolving file references is already specified, report duplication error
                    throw new Error("There exists a Fourslash file which has resolveReference flag specified; remove duplicated resolveReference flag");
                }
            }
            if (configFileName) {
                var baseDir = ts.normalizePath(ts.getDirectoryPath(configFileName));
                var files_2 = (_a = {}, _a[baseDir] = {}, _a);
                this.inputFiles.forEach(function (data, path) {
                    var scriptInfo = new Harness.LanguageService.ScriptInfo(path, undefined, /*isRootFile*/ false); // TODO: GH#18217
                    files_2[path] = new vfs.File(data, { meta: { scriptInfo: scriptInfo } });
                });
                var fs = new vfs.FileSystem(/*ignoreCase*/ true, { cwd: baseDir, files: files_2 });
                var host = new fakes.ParseConfigHost(fs);
                var jsonSourceFile = ts.parseJsonText(configFileName, this.inputFiles.get(configFileName));
                compilationOptions = ts.parseJsonSourceFileConfigFileContent(jsonSourceFile, host, baseDir, compilationOptions, configFileName).options;
            }
            if (compilationOptions.typeRoots) {
                compilationOptions.typeRoots = compilationOptions.typeRoots.map(function (p) { return ts.getNormalizedAbsolutePath(p, _this.basePath); });
            }
            var languageServiceAdapter = this.getLanguageServiceAdapter(testType, this.cancellationToken, compilationOptions);
            this.languageServiceAdapterHost = languageServiceAdapter.getHost();
            this.languageService = memoWrap(languageServiceAdapter.getLanguageService(), this); // Wrap the LS to cache some expensive operations certain tests call repeatedly
            if (startResolveFileRef) {
                // Add the entry-point file itself into the languageServiceShimHost
                this.languageServiceAdapterHost.addScript(startResolveFileRef.fileName, startResolveFileRef.content, /*isRootFile*/ true);
                var resolvedResult = languageServiceAdapter.getPreProcessedFileInfo(startResolveFileRef.fileName, startResolveFileRef.content);
                var referencedFiles = resolvedResult.referencedFiles;
                var importedFiles = resolvedResult.importedFiles;
                // Add triple reference files into language-service host
                ts.forEach(referencedFiles, function (referenceFile) {
                    // Fourslash insert tests/cases/fourslash into inputFile.unitName so we will properly append the same base directory to refFile path
                    var referenceFilePath = _this.basePath + "/" + referenceFile.fileName;
                    _this.addMatchedInputFile(referenceFilePath, /* extensions */ undefined);
                });
                // Add import files into language-service host
                ts.forEach(importedFiles, function (importedFile) {
                    // Fourslash insert tests/cases/fourslash into inputFile.unitName and import statement doesn't require ".ts"
                    // so convert them before making appropriate comparison
                    var importedFilePath = _this.basePath + "/" + importedFile.fileName;
                    _this.addMatchedInputFile(importedFilePath, ts.getSupportedExtensions(compilationOptions));
                });
                // Check if no-default-lib flag is false and if so add default library
                if (!resolvedResult.isLibFile) {
                    this.languageServiceAdapterHost.addScript(Harness.Compiler.defaultLibFileName, Harness.Compiler.getDefaultLibrarySourceFile().text, /*isRootFile*/ false);
                }
            }
            else {
                // resolveReference file-option is not specified then do not resolve any files and include all inputFiles
                this.inputFiles.forEach(function (file, fileName) {
                    if (!Harness.isDefaultLibraryFile(fileName)) {
                        _this.languageServiceAdapterHost.addScript(fileName, file, /*isRootFile*/ true);
                    }
                });
                if (!compilationOptions.noLib) {
                    this.languageServiceAdapterHost.addScript(Harness.Compiler.defaultLibFileName, Harness.Compiler.getDefaultLibrarySourceFile().text, /*isRootFile*/ false);
                }
            }
            var _loop_3 = function (file) {
                ts.forEach(file.symlinks, function (link) {
                    _this.languageServiceAdapterHost.vfs.mkdirpSync(vpath.dirname(link));
                    _this.languageServiceAdapterHost.vfs.symlinkSync(file.fileName, link);
                });
            };
            for (var _c = 0, _d = testData.files; _c < _d.length; _c++) {
                var file = _d[_c];
                _loop_3(file);
            }
            this.formatCodeSettings = {
                baseIndentSize: 0,
                indentSize: 4,
                tabSize: 4,
                newLineCharacter: "\n",
                convertTabsToSpaces: true,
                indentStyle: ts.IndentStyle.Smart,
                insertSpaceAfterCommaDelimiter: true,
                insertSpaceAfterSemicolonInForStatements: true,
                insertSpaceBeforeAndAfterBinaryOperators: true,
                insertSpaceAfterConstructor: false,
                insertSpaceAfterKeywordsInControlFlowStatements: true,
                insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
                insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
                insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
                insertSpaceAfterTypeAssertion: false,
                placeOpenBraceOnNewLineForFunctions: false,
                placeOpenBraceOnNewLineForControlBlocks: false,
                insertSpaceBeforeTypeAnnotation: false
            };
            // Open the first file by default
            this.openFile(0);
            function memoWrap(ls, target) {
                var cacheableMembers = [
                    "getCompletionEntryDetails",
                    "getCompletionEntrySymbol",
                    "getQuickInfoAtPosition",
                    "getReferencesAtPosition",
                    "getDocumentHighlights",
                ];
                var proxy = {};
                var _loop_4 = function (k) {
                    var key = k;
                    if (cacheableMembers.indexOf(key) === -1) {
                        proxy[key] = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return ls[key].apply(ls, args);
                        };
                        return "continue";
                    }
                    var memo = Utils.memoize(function (_version, _active, _caret, _selectEnd, _marker) {
                        var args = [];
                        for (var _i = 5; _i < arguments.length; _i++) {
                            args[_i - 5] = arguments[_i];
                        }
                        return ls[key].apply(ls, args);
                    }, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return args.join("|,|");
                    });
                    proxy[key] = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return memo.apply(void 0, [target.languageServiceAdapterHost.getScriptInfo(target.activeFile.fileName).version,
                            target.activeFile.fileName,
                            target.currentCaretPosition,
                            target.selectionEnd,
                            target.lastKnownMarker].concat(args));
                    };
                };
                for (var k in ls) {
                    _loop_4(k);
                }
                return proxy;
            }
        }
        TestState.getDisplayPartsJson = function (displayParts) {
            var result = "";
            ts.forEach(displayParts, function (part) {
                if (result) {
                    result += ",\n    ";
                }
                else {
                    result = "[\n    ";
                }
                result += JSON.stringify(part);
            });
            if (result) {
                result += "\n]";
            }
            return result;
        };
        // Add input file which has matched file name with the given reference-file path.
        // This is necessary when resolveReference flag is specified
        TestState.prototype.addMatchedInputFile = function (referenceFilePath, extensions) {
            var inputFiles = this.inputFiles;
            var languageServiceAdapterHost = this.languageServiceAdapterHost;
            var didAdd = tryAdd(referenceFilePath);
            if (extensions && !didAdd) {
                ts.forEach(extensions, function (ext) { return tryAdd(referenceFilePath + ext); });
            }
            function tryAdd(path) {
                var inputFile = inputFiles.get(path);
                if (inputFile && !Harness.isDefaultLibraryFile(path)) {
                    languageServiceAdapterHost.addScript(path, inputFile, /*isRootFile*/ true);
                    return true;
                }
            }
        };
        TestState.prototype.getLanguageServiceAdapter = function (testType, cancellationToken, compilationOptions) {
            switch (testType) {
                case 0 /* Native */:
                    return new Harness.LanguageService.NativeLanguageServiceAdapter(cancellationToken, compilationOptions);
                case 1 /* Shims */:
                    return new Harness.LanguageService.ShimLanguageServiceAdapter(/*preprocessToResolve*/ false, cancellationToken, compilationOptions);
                case 2 /* ShimsWithPreprocess */:
                    return new Harness.LanguageService.ShimLanguageServiceAdapter(/*preprocessToResolve*/ true, cancellationToken, compilationOptions);
                case 3 /* Server */:
                    return new Harness.LanguageService.ServerLanguageServiceAdapter(cancellationToken, compilationOptions);
                default:
                    throw new Error("Unknown FourSlash test type: ");
            }
        };
        TestState.prototype.getFileContent = function (fileName) {
            var script = this.languageServiceAdapterHost.getScriptInfo(fileName);
            return script.content;
        };
        // Entry points from fourslash.ts
        TestState.prototype.goToMarker = function (name) {
            if (name === void 0) { name = ""; }
            var marker = ts.isString(name) ? this.getMarkerByName(name) : name;
            if (this.activeFile.fileName !== marker.fileName) {
                this.openFile(marker.fileName);
            }
            var content = this.getFileContent(marker.fileName);
            if (marker.position === -1 || marker.position > content.length) {
                throw new Error("Marker \"" + name + "\" has been invalidated by unrecoverable edits to the file.");
            }
            var mName = ts.isString(name) ? name : this.markerName(marker);
            this.lastKnownMarker = mName;
            this.goToPosition(marker.position);
        };
        TestState.prototype.goToEachMarker = function (markers, action) {
            assert(markers.length);
            for (var i = 0; i < markers.length; i++) {
                this.goToMarker(markers[i]);
                action(markers[i], i);
            }
        };
        TestState.prototype.goToEachRange = function (action) {
            var ranges = this.getRanges();
            assert(ranges.length);
            for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
                var range = ranges_1[_i];
                this.selectRange(range);
                action();
            }
        };
        TestState.prototype.markerName = function (m) {
            return ts.forEachEntry(this.testData.markerPositions, function (marker, name) {
                if (marker === m) {
                    return name;
                }
            });
        };
        TestState.prototype.goToPosition = function (pos) {
            this.currentCaretPosition = pos;
            this.selectionEnd = -1;
        };
        TestState.prototype.select = function (startMarker, endMarker) {
            var start = this.getMarkerByName(startMarker), end = this.getMarkerByName(endMarker);
            ts.Debug.assert(start.fileName === end.fileName);
            if (this.activeFile.fileName !== start.fileName) {
                this.openFile(start.fileName);
            }
            this.goToPosition(start.position);
            this.selectionEnd = end.position;
        };
        TestState.prototype.selectRange = function (range) {
            this.goToRangeStart(range);
            this.selectionEnd = range.end;
        };
        TestState.prototype.moveCaretRight = function (count) {
            if (count === void 0) { count = 1; }
            this.currentCaretPosition += count;
            this.currentCaretPosition = Math.min(this.currentCaretPosition, this.getFileContent(this.activeFile.fileName).length);
            this.selectionEnd = -1;
        };
        // Opens a file given its 0-based index or fileName
        TestState.prototype.openFile = function (indexOrName, content, scriptKindName) {
            var fileToOpen = this.findFile(indexOrName);
            fileToOpen.fileName = ts.normalizeSlashes(fileToOpen.fileName);
            this.activeFile = fileToOpen;
            // Let the host know that this file is now open
            this.languageServiceAdapterHost.openFile(fileToOpen.fileName, content, scriptKindName);
        };
        TestState.prototype.verifyErrorExistsBetweenMarkers = function (startMarkerName, endMarkerName, shouldExist) {
            var startMarker = this.getMarkerByName(startMarkerName);
            var endMarker = this.getMarkerByName(endMarkerName);
            var predicate = function (errorMinChar, errorLimChar, startPos, endPos) {
                return ((errorMinChar === startPos) && (errorLimChar === endPos)) ? true : false;
            };
            var exists = this.anyErrorInRange(predicate, startMarker, endMarker);
            if (exists !== shouldExist) {
                this.printErrorLog(shouldExist, this.getAllDiagnostics());
                throw new Error((shouldExist ? "Expected" : "Did not expect") + " failure between markers: '" + startMarkerName + "', '" + endMarkerName + "'");
            }
        };
        TestState.prototype.raiseError = function (message) {
            throw new Error(this.messageAtLastKnownMarker(message));
        };
        TestState.prototype.messageAtLastKnownMarker = function (message) {
            var locationDescription = this.lastKnownMarker ? this.lastKnownMarker : this.getLineColStringAtPosition(this.currentCaretPosition);
            return "At " + locationDescription + ": " + message;
        };
        TestState.prototype.assertionMessageAtLastKnownMarker = function (msg) {
            return "\nMarker: " + this.lastKnownMarker + "\nChecking: " + msg + "\n\n";
        };
        TestState.prototype.getDiagnostics = function (fileName, includeSuggestions) {
            if (includeSuggestions === void 0) { includeSuggestions = false; }
            return this.languageService.getSyntacticDiagnostics(fileName).concat(this.languageService.getSemanticDiagnostics(fileName), (includeSuggestions ? this.languageService.getSuggestionDiagnostics(fileName) : ts.emptyArray));
        };
        TestState.prototype.getAllDiagnostics = function () {
            var _this = this;
            return ts.flatMap(this.languageServiceAdapterHost.getFilenames(), function (fileName) {
                return ts.isAnySupportedFileExtension(fileName) ? _this.getDiagnostics(fileName) : [];
            });
        };
        TestState.prototype.verifyErrorExistsAfterMarker = function (markerName, shouldExist, after) {
            var marker = this.getMarkerByName(markerName);
            var predicate;
            if (after) {
                predicate = function (errorMinChar, errorLimChar, startPos) {
                    return ((errorMinChar >= startPos) && (errorLimChar >= startPos)) ? true : false;
                };
            }
            else {
                predicate = function (errorMinChar, errorLimChar, startPos) {
                    return ((errorMinChar <= startPos) && (errorLimChar <= startPos)) ? true : false;
                };
            }
            var exists = this.anyErrorInRange(predicate, marker);
            var diagnostics = this.getAllDiagnostics();
            if (exists !== shouldExist) {
                this.printErrorLog(shouldExist, diagnostics);
                throw new Error((shouldExist ? "Expected" : "Did not expect") + " failure at marker '" + markerName + "'");
            }
        };
        TestState.prototype.anyErrorInRange = function (predicate, startMarker, endMarker) {
            return this.getDiagnostics(startMarker.fileName).some(function (_a) {
                var start = _a.start, length = _a.length;
                return predicate(start, start + length, startMarker.position, endMarker === undefined ? undefined : endMarker.position);
            }); // TODO: GH#18217
        };
        TestState.prototype.printErrorLog = function (expectErrors, errors) {
            if (expectErrors) {
                Harness.IO.log("Expected error not found.  Error list is:");
            }
            else {
                Harness.IO.log("Unexpected error(s) found.  Error list is:");
            }
            for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
                var _a = errors_1[_i], start = _a.start, length = _a.length, messageText = _a.messageText, file = _a.file;
                Harness.IO.log("  " + this.formatRange(file, start, length) + // TODO: GH#18217
                    ", message: " + ts.flattenDiagnosticMessageText(messageText, Harness.IO.newLine()) + "\n");
            }
        };
        TestState.prototype.formatRange = function (file, start, length) {
            if (file) {
                return "from: " + this.formatLineAndCharacterOfPosition(file, start) + ", to: " + this.formatLineAndCharacterOfPosition(file, start + length);
            }
            return "global";
        };
        TestState.prototype.formatLineAndCharacterOfPosition = function (file, pos) {
            if (file) {
                var _a = ts.getLineAndCharacterOfPosition(file, pos), line = _a.line, character = _a.character;
                return line + ":" + character;
            }
            return "global";
        };
        TestState.prototype.formatPosition = function (file, pos) {
            if (file) {
                return file.fileName + "@" + pos;
            }
            return "global";
        };
        TestState.prototype.verifyNoErrors = function () {
            var _this = this;
            ts.forEachKey(this.inputFiles, function (fileName) {
                if (!ts.isAnySupportedFileExtension(fileName)
                    || !_this.getProgram().getCompilerOptions().allowJs && !ts.extensionIsTypeScript(ts.extensionFromPath(fileName)))
                    return;
                var errors = _this.getDiagnostics(fileName).filter(function (e) { return e.category !== ts.DiagnosticCategory.Suggestion; });
                if (errors.length) {
                    _this.printErrorLog(/*expectErrors*/ false, errors);
                    var error = errors[0];
                    _this.raiseError("Found an error: " + _this.formatPosition(error.file, error.start) + ": " + error.messageText);
                }
            });
        };
        TestState.prototype.verifyNumberOfErrorsInCurrentFile = function (expected) {
            var errors = this.getDiagnostics(this.activeFile.fileName);
            var actual = errors.length;
            if (actual !== expected) {
                this.printErrorLog(/*expectErrors*/ false, errors);
                var errorMsg = "Actual number of errors (" + actual + ") does not match expected number (" + expected + ")";
                Harness.IO.log(errorMsg);
                this.raiseError(errorMsg);
            }
        };
        TestState.prototype.verifyEval = function (expr, value) {
            var emit = this.languageService.getEmitOutput(this.activeFile.fileName);
            if (emit.outputFiles.length !== 1) {
                throw new Error("Expected exactly one output from emit of " + this.activeFile.fileName);
            }
            var evaluation = new Function(emit.outputFiles[0].text + ";\r\nreturn (" + expr + ");")();
            if (evaluation !== value) {
                this.raiseError("Expected evaluation of expression \"" + expr + "\" to equal \"" + value + "\", but got \"" + evaluation + "\"");
            }
        };
        TestState.prototype.verifyGoToDefinitionIs = function (endMarker) {
            var _this = this;
            this.verifyGoToXWorker(toArray(endMarker), function () { return _this.getGoToDefinition(); });
        };
        TestState.prototype.verifyGoToDefinition = function (arg0, endMarkerNames) {
            var _this = this;
            this.verifyGoToX(arg0, endMarkerNames, function () { return _this.getGoToDefinitionAndBoundSpan(); });
        };
        TestState.prototype.getGoToDefinition = function () {
            return this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        };
        TestState.prototype.getGoToDefinitionAndBoundSpan = function () {
            return this.languageService.getDefinitionAndBoundSpan(this.activeFile.fileName, this.currentCaretPosition);
        };
        TestState.prototype.verifyGoToType = function (arg0, endMarkerNames) {
            var _this = this;
            this.verifyGoToX(arg0, endMarkerNames, function () {
                return _this.languageService.getTypeDefinitionAtPosition(_this.activeFile.fileName, _this.currentCaretPosition);
            });
        };
        TestState.prototype.verifyGoToX = function (arg0, endMarkerNames, getDefs) {
            if (endMarkerNames) {
                this.verifyGoToXPlain(arg0, endMarkerNames, getDefs);
            }
            else if (ts.isArray(arg0)) {
                var pairs = arg0;
                for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
                    var _a = pairs_1[_i], start = _a[0], end = _a[1];
                    this.verifyGoToXPlain(start, end, getDefs);
                }
            }
            else {
                var obj = arg0;
                for (var startMarkerName in obj) {
                    if (ts.hasProperty(obj, startMarkerName)) {
                        this.verifyGoToXPlain(startMarkerName, obj[startMarkerName], getDefs);
                    }
                }
            }
        };
        TestState.prototype.verifyGoToXPlain = function (startMarkerNames, endMarkerNames, getDefs) {
            for (var _i = 0, _a = toArray(startMarkerNames); _i < _a.length; _i++) {
                var start = _a[_i];
                this.verifyGoToXSingle(start, endMarkerNames, getDefs);
            }
        };
        TestState.prototype.verifyGoToDefinitionForMarkers = function (markerNames) {
            var _this = this;
            for (var _i = 0, markerNames_1 = markerNames; _i < markerNames_1.length; _i++) {
                var markerName = markerNames_1[_i];
                this.verifyGoToXSingle(markerName + "Reference", markerName + "Definition", function () { return _this.getGoToDefinition(); });
            }
        };
        TestState.prototype.verifyGoToXSingle = function (startMarkerName, endMarkerNames, getDefs) {
            this.goToMarker(startMarkerName);
            this.verifyGoToXWorker(toArray(endMarkerNames), getDefs, startMarkerName);
        };
        TestState.prototype.verifyGoToXWorker = function (endMarkers, getDefs, startMarkerName) {
            var _this = this;
            var defs = getDefs();
            var definitions;
            var testName;
            if (!defs || ts.isArray(defs)) {
                definitions = defs || [];
                testName = "goToDefinitions";
            }
            else {
                this.verifyDefinitionTextSpan(defs, startMarkerName);
                definitions = defs.definitions; // TODO: GH#18217
                testName = "goToDefinitionsAndBoundSpan";
            }
            if (endMarkers.length !== definitions.length) {
                this.raiseError(testName + " failed - expected to find " + endMarkers.length + " definitions but got " + definitions.length);
            }
            ts.zipWith(endMarkers, definitions, function (endMarker, definition, i) {
                var marker = _this.getMarkerByName(endMarker);
                if (marker.fileName !== definition.fileName || marker.position !== definition.textSpan.start) {
                    _this.raiseError(testName + " failed for definition " + endMarker + " (" + i + "): expected " + marker.fileName + " at " + marker.position + ", got " + definition.fileName + " at " + definition.textSpan.start);
                }
            });
        };
        TestState.prototype.verifyDefinitionTextSpan = function (defs, startMarkerName) {
            var _this = this;
            var range = this.testData.ranges.find(function (range) { return _this.markerName(range.marker) === startMarkerName; });
            if (!range && !defs.textSpan) {
                return;
            }
            if (!range) {
                this.raiseError("goToDefinitionsAndBoundSpan failed - found a TextSpan " + JSON.stringify(defs.textSpan) + " when it wasn't expected.");
            }
            else if (defs.textSpan.start !== range.pos || defs.textSpan.length !== range.end - range.pos) {
                var expected = {
                    start: range.pos, length: range.end - range.pos
                };
                this.raiseError("goToDefinitionsAndBoundSpan failed - expected to find TextSpan " + JSON.stringify(expected) + " but got " + JSON.stringify(defs.textSpan));
            }
        };
        TestState.prototype.verifyGetEmitOutputForCurrentFile = function (expected) {
            var emit = this.languageService.getEmitOutput(this.activeFile.fileName);
            if (emit.outputFiles.length !== 1) {
                throw new Error("Expected exactly one output from emit of " + this.activeFile.fileName);
            }
            var actual = emit.outputFiles[0].text;
            if (actual !== expected) {
                this.raiseError("Expected emit output to be \"" + expected + "\", but got \"" + actual + "\"");
            }
        };
        TestState.prototype.verifyGetEmitOutputContentsForCurrentFile = function (expected) {
            var emit = this.languageService.getEmitOutput(this.activeFile.fileName);
            assert.equal(emit.outputFiles.length, expected.length, "Number of emit output files");
            ts.zipWith(emit.outputFiles, expected, function (outputFile, expected) {
                assert.equal(outputFile.name, expected.name, "FileName");
                assert.equal(outputFile.text, expected.text, "Content");
            });
        };
        TestState.prototype.verifyCompletionListCount = function (expectedCount, negative) {
            if (expectedCount === 0 && negative) {
                this.verifyCompletionListIsEmpty(/*negative*/ false);
                return;
            }
            var members = this.getCompletionListAtCaret();
            if (members) {
                var match = members.entries.length === expectedCount;
                if ((!match && !negative) || (match && negative)) {
                    this.raiseError("Member list count was " + members.entries.length + ". Expected " + expectedCount);
                }
            }
            else if (expectedCount) {
                this.raiseError("Member list count was 0. Expected " + expectedCount);
            }
        };
        TestState.prototype.verifyCompletionListItemsCountIsGreaterThan = function (count, negative) {
            var completions = this.getCompletionListAtCaret();
            var itemsCount = completions ? completions.entries.length : 0;
            if (negative) {
                if (itemsCount > count) {
                    this.raiseError("Expected completion list items count to not be greater than " + count + ", but is actually " + itemsCount);
                }
            }
            else {
                if (itemsCount <= count) {
                    this.raiseError("Expected completion list items count to be greater than " + count + ", but is actually " + itemsCount);
                }
            }
        };
        TestState.prototype.verifyCompletionListStartsWithItemsInOrder = function (items) {
            if (items.length === 0) {
                return;
            }
            var entries = this.getCompletionListAtCaret().entries;
            assert.isTrue(items.length <= entries.length, "Amount of expected items in completion list [ " + items.length + " ] is greater than actual number of items in list [ " + entries.length + " ]");
            ts.zipWith(entries, items, function (entry, item) {
                assert.equal(entry.name, item, "Unexpected item in completion list");
            });
        };
        TestState.prototype.noItemsWithSameNameButDifferentKind = function () {
            var completions = this.getCompletionListAtCaret();
            var uniqueItems = ts.createMap();
            for (var _i = 0, _a = completions.entries; _i < _a.length; _i++) {
                var item = _a[_i];
                var uniqueItem = uniqueItems.get(item.name);
                if (!uniqueItem) {
                    uniqueItems.set(item.name, item.kind);
                }
                else {
                    assert.equal(item.kind, uniqueItem, "Items should have the same kind, got " + item.kind + " and " + uniqueItem);
                }
            }
        };
        TestState.prototype.verifyCompletionListIsEmpty = function (negative) {
            var completions = this.getCompletionListAtCaret();
            if ((!completions || completions.entries.length === 0) && negative) {
                this.raiseError("Completion list is empty at caret at position " + this.activeFile.fileName + " " + this.currentCaretPosition);
            }
            else if (completions && completions.entries.length !== 0 && !negative) {
                this.raiseError("Completion list is not empty at caret at position " + this.activeFile.fileName + " " + this.currentCaretPosition + "\n" +
                    ("Completion List contains: " + stringify(completions.entries.map(function (e) { return e.name; }))));
            }
        };
        TestState.prototype.verifyCompletionListAllowsNewIdentifier = function (negative) {
            var completions = this.getCompletionListAtCaret();
            if ((completions && !completions.isNewIdentifierLocation) && !negative) {
                this.raiseError("Expected builder completion entry");
            }
            else if ((completions && completions.isNewIdentifierLocation) && negative) {
                this.raiseError("Un-expected builder completion entry");
            }
        };
        TestState.prototype.verifyCompletionListIsGlobal = function (expected) {
            var completions = this.getCompletionListAtCaret();
            if (completions && completions.isGlobalCompletion !== expected) {
                this.raiseError("verifyCompletionListIsGlobal failed - expected result to be " + completions.isGlobalCompletion);
            }
        };
        TestState.prototype.verifyCompletions = function (options) {
            if (options.marker === undefined) {
                this.verifyCompletionsWorker(options);
            }
            else {
                for (var _i = 0, _a = toArray(options.marker); _i < _a.length; _i++) {
                    var marker = _a[_i];
                    this.goToMarker(marker);
                    this.verifyCompletionsWorker(options);
                }
            }
        };
        TestState.prototype.verifyCompletionsWorker = function (options) {
            var actualCompletions = this.getCompletionListAtCaret(__assign({}, options.preferences, { triggerCharacter: options.triggerCharacter }));
            if (!actualCompletions) {
                if (options.exact === undefined)
                    return;
                this.raiseError("No completions at position '" + this.currentCaretPosition + "'.");
            }
            if (actualCompletions.isNewIdentifierLocation !== (options.isNewIdentifierLocation || false)) {
                this.raiseError("Expected 'isNewIdentifierLocation' to be " + (options.isNewIdentifierLocation || false) + ", got " + actualCompletions.isNewIdentifierLocation);
            }
            var actualByName = ts.createMap();
            var _loop_5 = function (entry) {
                if (actualByName.has(entry.name)) {
                    // TODO: GH#23587
                    if (entry.name !== "undefined" && entry.name !== "require")
                        this_1.raiseError("Duplicate (" + actualCompletions.entries.filter(function (a) { return a.name === entry.name; }).length + ") completions for " + entry.name);
                }
                else {
                    actualByName.set(entry.name, entry);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = actualCompletions.entries; _i < _a.length; _i++) {
                var entry = _a[_i];
                _loop_5(entry);
            }
            if ("exact" in options) {
                ts.Debug.assert(!("includes" in options) && !("excludes" in options));
                if (options.exact === undefined)
                    throw this.raiseError("Expected no completions");
                this.verifyCompletionsAreExactly(actualCompletions.entries, toArray(options.exact));
            }
            else {
                if (options.includes) {
                    for (var _b = 0, _c = toArray(options.includes); _b < _c.length; _b++) {
                        var include = _c[_b];
                        var name = typeof include === "string" ? include : include.name;
                        var found = actualByName.get(name);
                        if (!found)
                            throw this.raiseError("No completion " + name + " found");
                        this.verifyCompletionEntry(found, include);
                    }
                }
                if (options.excludes) {
                    for (var _d = 0, _e = toArray(options.excludes); _d < _e.length; _d++) {
                        var exclude = _e[_d];
                        if (typeof exclude === "string") {
                            if (actualByName.has(exclude)) {
                                this.raiseError("Did not expect to get a completion named " + exclude);
                            }
                        }
                        else {
                            var found = actualByName.get(exclude.name);
                            if (found && found.source === exclude.source) {
                                this.raiseError("Did not expect to get a completion named " + exclude.name + " with source " + exclude.source);
                            }
                        }
                    }
                }
            }
        };
        TestState.prototype.verifyCompletionEntry = function (actual, expected) {
            var _a = typeof expected === "string"
                ? { insertText: undefined, replacementSpan: undefined, hasAction: undefined, isRecommended: undefined, kind: undefined, text: undefined, documentation: undefined, sourceDisplay: undefined }
                : expected, insertText = _a.insertText, replacementSpan = _a.replacementSpan, hasAction = _a.hasAction, isRecommended = _a.isRecommended, kind = _a.kind, text = _a.text, documentation = _a.documentation, sourceDisplay = _a.sourceDisplay;
            if (actual.insertText !== insertText) {
                this.raiseError("Expected completion insert text to be " + insertText + ", got " + actual.insertText);
            }
            var convertedReplacementSpan = replacementSpan && ts.createTextSpanFromRange(replacementSpan);
            try {
                assert.deepEqual(actual.replacementSpan, convertedReplacementSpan);
            }
            catch (_b) {
                this.raiseError("Expected completion replacementSpan to be " + stringify(convertedReplacementSpan) + ", got " + stringify(actual.replacementSpan));
            }
            if (kind !== undefined)
                assert.equal(actual.kind, kind);
            assert.equal(actual.hasAction, hasAction);
            assert.equal(actual.isRecommended, isRecommended);
            if (text) {
                var actualDetails = this.getCompletionEntryDetails(actual.name, actual.source);
                assert.equal(ts.displayPartsToString(actualDetails.displayParts), text);
                assert.equal(ts.displayPartsToString(actualDetails.documentation), documentation || "");
                // TODO: GH#23587
                // assert.equal(actualDetails.kind, actual.kind);
                assert.equal(actualDetails.kindModifiers, actual.kindModifiers);
                assert.equal(actualDetails.source && ts.displayPartsToString(actualDetails.source), sourceDisplay);
            }
            else {
                assert(documentation === undefined && sourceDisplay === undefined, "If specifying completion details, should specify 'text'");
            }
        };
        TestState.prototype.verifyCompletionsAreExactly = function (actual, expected) {
            var _this = this;
            if (actual.length !== expected.length) {
                this.raiseError("Expected " + expected.length + " completions, got " + actual.length + " (" + actual.map(function (a) { return a.name; }) + ").");
            }
            ts.zipWith(actual, expected, function (completion, expectedCompletion, index) {
                var name = typeof expectedCompletion === "string" ? expectedCompletion : expectedCompletion.name;
                if (completion.name !== name) {
                    _this.raiseError("Expected completion at index " + index + " to be " + name + ", got " + completion.name);
                }
                _this.verifyCompletionEntry(completion, expectedCompletion);
            });
        };
        TestState.prototype.verifyCompletionsAt = function (markerName, expected, options) {
            this.verifyCompletions({
                marker: markerName,
                exact: expected,
                isNewIdentifierLocation: options && options.isNewIdentifierLocation,
                preferences: options,
                triggerCharacter: options && options.triggerCharacter,
            });
        };
        TestState.prototype.verifyCompletionListContains = function (entryId, text, documentation, kind, spanIndex, hasAction, options) {
            var completions = this.getCompletionListAtCaret(options);
            if (completions) {
                this.assertItemInCompletionList(completions.entries, entryId, text, documentation, kind, spanIndex, hasAction, options);
            }
            else {
                this.raiseError("No completions at position '" + this.currentCaretPosition + "' when looking for '" + JSON.stringify(entryId) + "'.");
            }
        };
        /**
         * Verify that the completion list does NOT contain the given symbol.
         * The symbol is considered matched with the symbol in the list if and only if all given parameters must matched.
         * When any parameter is omitted, the parameter is ignored during comparison and assumed that the parameter with
         * that property of the symbol in the list.
         * @param symbol the name of symbol
         * @param expectedText the text associated with the symbol
         * @param expectedDocumentation the documentation text associated with the symbol
         * @param expectedKind the kind of symbol (see ScriptElementKind)
         * @param spanIndex the index of the range that the completion item's replacement text span should match
         */
        TestState.prototype.verifyCompletionListDoesNotContain = function (entryId, expectedText, expectedDocumentation, expectedKind, spanIndex, options) {
            var _this = this;
            var replacementSpan;
            if (spanIndex !== undefined) {
                replacementSpan = this.getTextSpanForRangeAtIndex(spanIndex);
            }
            var completions = this.getCompletionListAtCaret(options);
            if (completions) {
                var filterCompletions = completions.entries.filter(function (e) { return e.name === entryId.name && e.source === entryId.source; });
                filterCompletions = expectedKind ? filterCompletions.filter(function (e) { return e.kind === expectedKind || (typeof expectedKind === "object" && e.kind === expectedKind.kind); }) : filterCompletions;
                filterCompletions = filterCompletions.filter(function (entry) {
                    var details = _this.getCompletionEntryDetails(entry.name);
                    var documentation = details && ts.displayPartsToString(details.documentation);
                    var text = details && ts.displayPartsToString(details.displayParts);
                    // If any of the expected values are undefined, assume that users don't
                    // care about them.
                    if (replacementSpan && !TestState.textSpansEqual(replacementSpan, entry.replacementSpan)) {
                        return false;
                    }
                    else if (expectedText && text !== expectedText) {
                        return false;
                    }
                    else if (expectedDocumentation && documentation !== expectedDocumentation) {
                        return false;
                    }
                    return true;
                });
                if (filterCompletions.length !== 0) {
                    // After filtered using all present criterion, if there are still symbol left in the list
                    // then these symbols must meet the criterion for Not supposed to be in the list. So we
                    // raise an error
                    var error = "Completion list did contain '" + JSON.stringify(entryId) + "'.";
                    var details = this.getCompletionEntryDetails(filterCompletions[0].name);
                    if (expectedText) {
                        error += "Expected text: " + expectedText + " to equal: " + ts.displayPartsToString(details.displayParts) + ".";
                    }
                    if (expectedDocumentation) {
                        error += "Expected documentation: " + expectedDocumentation + " to equal: " + ts.displayPartsToString(details.documentation) + ".";
                    }
                    if (expectedKind) {
                        error += "Expected kind: " + expectedKind + " to equal: " + filterCompletions[0].kind + ".";
                    }
                    else {
                        error += "kind: " + filterCompletions[0].kind + ".";
                    }
                    if (replacementSpan) {
                        var spanText = filterCompletions[0].replacementSpan ? stringify(filterCompletions[0].replacementSpan) : undefined;
                        error += "Expected replacement span: " + stringify(replacementSpan) + " to equal: " + spanText + ".";
                    }
                    this.raiseError(error);
                }
            }
        };
        TestState.prototype.verifyCompletionEntryDetails = function (entryName, expectedText, expectedDocumentation, kind, tags) {
            var _this = this;
            var details = this.getCompletionEntryDetails(entryName);
            assert(details, "no completion entry available");
            assert.equal(ts.displayPartsToString(details.displayParts), expectedText, this.assertionMessageAtLastKnownMarker("completion entry details text"));
            if (expectedDocumentation !== undefined) {
                assert.equal(ts.displayPartsToString(details.documentation), expectedDocumentation, this.assertionMessageAtLastKnownMarker("completion entry documentation"));
            }
            if (kind !== undefined) {
                assert.equal(details.kind, kind, this.assertionMessageAtLastKnownMarker("completion entry kind"));
            }
            if (tags !== undefined) {
                assert.equal(details.tags.length, tags.length, this.messageAtLastKnownMarker("QuickInfo tags"));
                ts.zipWith(tags, details.tags, function (expectedTag, actualTag) {
                    assert.equal(actualTag.name, expectedTag.name);
                    assert.equal(actualTag.text, expectedTag.text, _this.messageAtLastKnownMarker("QuickInfo tag " + actualTag.name));
                });
            }
        };
        TestState.prototype.getProgram = function () {
            return this._program || (this._program = this.languageService.getProgram()); // TODO: GH#18217
        };
        TestState.prototype.getChecker = function () {
            return this._checker || (this._checker = this.getProgram().getTypeChecker());
        };
        TestState.prototype.getSourceFile = function () {
            var fileName = this.activeFile.fileName;
            var result = this.getProgram().getSourceFile(fileName);
            if (!result) {
                throw new Error("Could not get source file " + fileName);
            }
            return result;
        };
        TestState.prototype.getNode = function () {
            return ts.getTouchingPropertyName(this.getSourceFile(), this.currentCaretPosition);
        };
        TestState.prototype.goToAndGetNode = function (range) {
            this.goToRangeStart(range);
            var node = this.getNode();
            this.verifyRange("touching property name", range, node);
            return node;
        };
        TestState.prototype.verifyRange = function (desc, expected, actual) {
            var actualStart = actual.getStart();
            var actualEnd = actual.getEnd();
            if (actualStart !== expected.pos || actualEnd !== expected.end) {
                this.raiseError(desc + " should be " + expected.pos + "-" + expected.end + ", got " + actualStart + "-" + actualEnd);
            }
        };
        TestState.prototype.verifySymbol = function (symbol, declarationRanges) {
            var _this = this;
            var declarations = symbol.declarations;
            if (declarations.length !== declarationRanges.length) {
                this.raiseError("Expected to get " + declarationRanges.length + " declarations, got " + declarations.length);
            }
            ts.zipWith(declarations, declarationRanges, function (decl, range) {
                _this.verifyRange("symbol declaration", range, decl);
            });
        };
        TestState.prototype.verifySymbolAtLocation = function (startRange, declarationRanges) {
            var node = this.goToAndGetNode(startRange);
            var symbol = this.getChecker().getSymbolAtLocation(node);
            if (!symbol) {
                this.raiseError("Could not get symbol at location");
            }
            this.verifySymbol(symbol, declarationRanges);
        };
        TestState.prototype.symbolsInScope = function (range) {
            var node = this.goToAndGetNode(range);
            return this.getChecker().getSymbolsInScope(node, 67216319 /* Value */ | 67901928 /* Type */ | 1920 /* Namespace */);
        };
        TestState.prototype.setTypesRegistry = function (map) {
            this.languageServiceAdapterHost.typesRegistry = ts.createMapFromTemplate(map);
        };
        TestState.prototype.verifyTypeOfSymbolAtLocation = function (range, symbol, expected) {
            var node = this.goToAndGetNode(range);
            var checker = this.getChecker();
            var type = checker.getTypeOfSymbolAtLocation(symbol, node);
            var actual = checker.typeToString(type);
            if (actual !== expected) {
                this.raiseError("Expected: '" + expected + "', actual: '" + actual + "'");
            }
        };
        TestState.prototype.verifyDocumentHighlightsRespectFilesList = function (files) {
            var startFile = this.activeFile.fileName;
            var _loop_6 = function (fileName) {
                var searchFileNames = startFile === fileName ? [startFile] : [startFile, fileName];
                var highlights = this_2.getDocumentHighlightsAtCurrentPosition(searchFileNames);
                if (!highlights.every(function (dh) { return ts.contains(searchFileNames, dh.fileName); })) {
                    this_2.raiseError("When asking for document highlights only in files " + searchFileNames + ", got document highlights in " + unique(highlights, function (dh) { return dh.fileName; }));
                }
            };
            var this_2 = this;
            for (var _i = 0, files_3 = files; _i < files_3.length; _i++) {
                var fileName = files_3[_i];
                _loop_6(fileName);
            }
        };
        TestState.prototype.verifyReferenceGroups = function (starts, parts) {
            var fullExpected = ts.map(parts, function (_a) {
                var definition = _a.definition, ranges = _a.ranges;
                return ({
                    definition: typeof definition === "string" ? definition : __assign({}, definition, { range: ts.createTextSpanFromRange(definition.range) }),
                    references: ranges.map(function (r) {
                        var _a = (r.marker && r.marker.data || {}), _b = _a.isWriteAccess, isWriteAccess = _b === void 0 ? false : _b, _c = _a.isDefinition, isDefinition = _c === void 0 ? false : _c, isInString = _a.isInString;
                        return __assign({ fileName: r.fileName, textSpan: ts.createTextSpanFromRange(r), isWriteAccess: isWriteAccess,
                            isDefinition: isDefinition }, (isInString ? { isInString: true } : undefined));
                    }),
                });
            });
            for (var _i = 0, _a = toArray(starts); _i < _a.length; _i++) {
                var start = _a[_i];
                if (typeof start === "string") {
                    this.goToMarker(start);
                }
                else {
                    this.goToRangeStart(start);
                }
                var fullActual = ts.map(this.findReferencesAtCaret(), function (_a, i) {
                    var definition = _a.definition, references = _a.references;
                    var text = definition.displayParts.map(function (d) { return d.text; }).join("");
                    return {
                        definition: fullExpected.length > i && typeof fullExpected[i].definition === "string" ? text : { text: text, range: definition.textSpan },
                        references: references,
                    };
                });
                this.assertObjectsEqual(fullActual, fullExpected);
                if (parts) {
                    this.verifyDocumentHighlightsRespectFilesList(unique(ts.flatMap(parts, function (p) { return p.ranges; }), function (r) { return r.fileName; }));
                }
            }
        };
        TestState.prototype.verifyNoReferences = function (markerNameOrRange) {
            if (markerNameOrRange) {
                if (ts.isString(markerNameOrRange)) {
                    this.goToMarker(markerNameOrRange);
                }
                else {
                    this.goToRangeStart(markerNameOrRange);
                }
            }
            var refs = this.getReferencesAtCaret();
            if (refs && refs.length) {
                this.raiseError("Expected getReferences to fail, but saw references: " + stringify(refs));
            }
        };
        // Necessary to have this function since `findReferences` isn't implemented in `client.ts`
        TestState.prototype.verifyGetReferencesForServerTest = function (expected) {
            var refs = this.getReferencesAtCaret();
            assert.deepEqual(refs, expected);
        };
        TestState.prototype.verifySingleReferenceGroup = function (definition, ranges) {
            ranges = ranges || this.getRanges();
            this.verifyReferenceGroups(ranges, [{ definition: definition, ranges: ranges }]);
        };
        TestState.prototype.assertObjectsEqual = function (fullActual, fullExpected, msgPrefix) {
            var _this = this;
            if (msgPrefix === void 0) { msgPrefix = ""; }
            var recur = function (actual, expected, path) {
                var fail = function (msg) {
                    _this.raiseError(msgPrefix + " At " + path + ": " + msg + "\nExpected: " + stringify(fullExpected) + "\nActual: " + stringify(fullActual));
                };
                if ((actual === undefined) !== (expected === undefined)) {
                    fail("Expected " + expected + ", got " + actual);
                }
                for (var key in actual) {
                    if (ts.hasProperty(actual, key)) {
                        var ak = actual[key], ek = expected[key];
                        if (typeof ak === "object" && typeof ek === "object") {
                            recur(ak, ek, path ? path + "." + key : key);
                        }
                        else if (ak !== ek) {
                            fail("Expected '" + key + "' to be '" + ek + "', got '" + ak + "'");
                        }
                    }
                }
                for (var key in expected) {
                    if (ts.hasProperty(expected, key)) {
                        if (!ts.hasProperty(actual, key)) {
                            fail(msgPrefix + "Missing property '" + key + "'");
                        }
                    }
                }
            };
            if (fullActual === undefined || fullExpected === undefined) {
                if (fullActual === fullExpected) {
                    return;
                }
                this.raiseError(msgPrefix + "\nExpected: " + stringify(fullExpected) + "\nActual: " + stringify(fullActual));
            }
            recur(fullActual, fullExpected, "");
        };
        TestState.prototype.verifyDisplayPartsOfReferencedSymbol = function (expected) {
            var referencedSymbols = this.findReferencesAtCaret();
            if (referencedSymbols.length === 0) {
                this.raiseError("No referenced symbols found at current caret position");
            }
            else if (referencedSymbols.length > 1) {
                this.raiseError("More than one referenced symbol found");
            }
            assert.equal(TestState.getDisplayPartsJson(referencedSymbols[0].definition.displayParts), TestState.getDisplayPartsJson(expected), this.messageAtLastKnownMarker("referenced symbol definition display parts"));
        };
        TestState.prototype.getCompletionListAtCaret = function (options) {
            return this.languageService.getCompletionsAtPosition(this.activeFile.fileName, this.currentCaretPosition, options);
        };
        TestState.prototype.getCompletionEntryDetails = function (entryName, source, preferences) {
            return this.languageService.getCompletionEntryDetails(this.activeFile.fileName, this.currentCaretPosition, entryName, this.formatCodeSettings, source, preferences);
        };
        TestState.prototype.getReferencesAtCaret = function () {
            return this.languageService.getReferencesAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        };
        TestState.prototype.findReferencesAtCaret = function () {
            return this.languageService.findReferences(this.activeFile.fileName, this.currentCaretPosition);
        };
        TestState.prototype.getSyntacticDiagnostics = function (expected) {
            var diagnostics = this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
            this.testDiagnostics(expected, diagnostics, "error");
        };
        TestState.prototype.getSemanticDiagnostics = function (expected) {
            var diagnostics = this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
            this.testDiagnostics(expected, diagnostics, "error");
        };
        TestState.prototype.getSuggestionDiagnostics = function (expected) {
            this.testDiagnostics(expected, this.languageService.getSuggestionDiagnostics(this.activeFile.fileName), "suggestion");
        };
        TestState.prototype.testDiagnostics = function (expected, diagnostics, category) {
            var _this = this;
            assert.deepEqual(ts.realizeDiagnostics(diagnostics, "\n"), expected.map(function (e) { return (__assign({ message: e.message, category: category, code: e.code }, ts.createTextSpanFromRange(e.range || _this.getRanges()[0]), { reportsUnnecessary: e.reportsUnnecessary })); }));
        };
        TestState.prototype.verifyQuickInfoAt = function (markerName, expectedText, expectedDocumentation) {
            this.goToMarker(markerName);
            this.verifyQuickInfoString(expectedText, expectedDocumentation);
        };
        TestState.prototype.verifyQuickInfos = function (namesAndTexts) {
            for (var name in namesAndTexts) {
                if (ts.hasProperty(namesAndTexts, name)) {
                    var text = namesAndTexts[name];
                    if (ts.isArray(text)) {
                        assert(text.length === 2);
                        var expectedText = text[0], expectedDocumentation = text[1];
                        this.verifyQuickInfoAt(name, expectedText, expectedDocumentation);
                    }
                    else {
                        this.verifyQuickInfoAt(name, text);
                    }
                }
            }
        };
        TestState.prototype.verifyQuickInfoString = function (expectedText, expectedDocumentation) {
            if (expectedDocumentation === "") {
                throw new Error("Use 'undefined' instead");
            }
            var actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            var actualQuickInfoText = actualQuickInfo ? ts.displayPartsToString(actualQuickInfo.displayParts) : "";
            var actualQuickInfoDocumentation = actualQuickInfo ? ts.displayPartsToString(actualQuickInfo.documentation) : "";
            assert.equal(actualQuickInfoText, expectedText, this.messageAtLastKnownMarker("quick info text"));
            assert.equal(actualQuickInfoDocumentation, expectedDocumentation || "", this.assertionMessageAtLastKnownMarker("quick info doc"));
        };
        TestState.prototype.verifyQuickInfoDisplayParts = function (kind, kindModifiers, textSpan, displayParts, documentation, tags) {
            var _this = this;
            var actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            assert.equal(actualQuickInfo.kind, kind, this.messageAtLastKnownMarker("QuickInfo kind"));
            assert.equal(actualQuickInfo.kindModifiers, kindModifiers, this.messageAtLastKnownMarker("QuickInfo kindModifiers"));
            assert.equal(JSON.stringify(actualQuickInfo.textSpan), JSON.stringify(textSpan), this.messageAtLastKnownMarker("QuickInfo textSpan"));
            assert.equal(TestState.getDisplayPartsJson(actualQuickInfo.displayParts), TestState.getDisplayPartsJson(displayParts), this.messageAtLastKnownMarker("QuickInfo displayParts"));
            assert.equal(TestState.getDisplayPartsJson(actualQuickInfo.documentation), TestState.getDisplayPartsJson(documentation), this.messageAtLastKnownMarker("QuickInfo documentation"));
            assert.equal(actualQuickInfo.tags.length, tags.length, this.messageAtLastKnownMarker("QuickInfo tags"));
            ts.zipWith(tags, actualQuickInfo.tags, function (expectedTag, actualTag) {
                assert.equal(expectedTag.name, actualTag.name);
                assert.equal(expectedTag.text, actualTag.text, _this.messageAtLastKnownMarker("QuickInfo tag " + actualTag.name));
            });
        };
        TestState.prototype.verifyRangesAreRenameLocations = function (options) {
            if (ts.isArray(options)) {
                this.verifyRenameLocations(options, options);
            }
            else {
                var ranges = options && options.ranges || this.getRanges();
                this.verifyRenameLocations(ranges, __assign({ ranges: ranges }, options));
            }
        };
        TestState.prototype.verifyRenameLocations = function (startRanges, options) {
            var _this = this;
            var findInStrings, findInComments, ranges;
            if (ts.isArray(options)) {
                findInStrings = findInComments = false;
                ranges = options;
            }
            else {
                findInStrings = !!options.findInStrings;
                findInComments = !!options.findInComments;
                ranges = options.ranges;
            }
            var _loop_7 = function (startRange) {
                this_3.goToRangeStart(startRange);
                var renameInfo = this_3.languageService.getRenameInfo(this_3.activeFile.fileName, this_3.currentCaretPosition);
                if (!renameInfo.canRename) {
                    this_3.raiseError("Expected rename to succeed, but it actually failed.");
                    return "break";
                }
                var references = this_3.languageService.findRenameLocations(this_3.activeFile.fileName, this_3.currentCaretPosition, findInStrings, findInComments);
                ranges = ranges || this_3.getRanges();
                if (!references) {
                    if (ranges.length !== 0) {
                        this_3.raiseError("Expected " + ranges.length + " rename locations; got none.");
                    }
                    return { value: void 0 };
                }
                if (ranges.length !== references.length) {
                    this_3.raiseError("Rename location count does not match result.\n\nExpected: " + stringify(ranges) + "\n\nActual:" + stringify(references));
                }
                ranges = ranges.sort(function (r1, r2) { return r1.pos - r2.pos; });
                references = references.sort(function (r1, r2) { return r1.textSpan.start - r2.textSpan.start; });
                ts.zipWith(references, ranges, function (reference, range) {
                    if (reference.textSpan.start !== range.pos || ts.textSpanEnd(reference.textSpan) !== range.end) {
                        _this.raiseError("Rename location results do not match.\n\nExpected: " + stringify(ranges) + "\n\nActual:" + stringify(references));
                    }
                });
            };
            var this_3 = this;
            for (var _i = 0, _a = toArray(startRanges); _i < _a.length; _i++) {
                var startRange = _a[_i];
                var state_1 = _loop_7(startRange);
                if (typeof state_1 === "object")
                    return state_1.value;
                if (state_1 === "break")
                    break;
            }
        };
        TestState.prototype.verifyQuickInfoExists = function (negative) {
            var actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (negative) {
                if (actualQuickInfo) {
                    this.raiseError("verifyQuickInfoExists failed. Expected quick info NOT to exist");
                }
            }
            else {
                if (!actualQuickInfo) {
                    this.raiseError("verifyQuickInfoExists failed. Expected quick info to exist");
                }
            }
        };
        TestState.prototype.verifyNoSignatureHelp = function (markers) {
            if (markers.length) {
                for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
                    var marker = markers_1[_i];
                    this.goToMarker(marker);
                    this.verifyNoSignatureHelp(ts.emptyArray);
                }
                return;
            }
            var actual = this.getSignatureHelp();
            if (actual) {
                this.raiseError("Expected no signature help, but got \"" + stringify(actual) + "\"");
            }
        };
        TestState.prototype.verifySignatureHelp = function (optionses) {
            for (var _i = 0, optionses_1 = optionses; _i < optionses_1.length; _i++) {
                var options = optionses_1[_i];
                if (options.marker === undefined) {
                    this.verifySignatureHelpWorker(options);
                }
                else {
                    for (var _a = 0, _b = toArray(options.marker); _a < _b.length; _a++) {
                        var marker = _b[_a];
                        this.goToMarker(marker);
                        this.verifySignatureHelpWorker(options);
                    }
                }
            }
        };
        TestState.prototype.verifySignatureHelpWorker = function (options) {
            var _this = this;
            var help = this.getSignatureHelp();
            var selectedItem = help.items[help.selectedItemIndex];
            // Argument index may exceed number of parameters
            var currentParameter = selectedItem.parameters[help.argumentIndex];
            assert.equal(help.items.length, options.overloadsCount || 1, this.assertionMessageAtLastKnownMarker("signature help overloads count"));
            assert.equal(ts.displayPartsToString(selectedItem.documentation), options.docComment || "", this.assertionMessageAtLastKnownMarker("current signature help doc comment"));
            if (options.text !== undefined) {
                assert.equal(ts.displayPartsToString(selectedItem.prefixDisplayParts) +
                    selectedItem.parameters.map(function (p) { return ts.displayPartsToString(p.displayParts); }).join(ts.displayPartsToString(selectedItem.separatorDisplayParts)) +
                    ts.displayPartsToString(selectedItem.suffixDisplayParts), options.text);
            }
            if (options.parameterName !== undefined) {
                assert.equal(currentParameter.name, options.parameterName);
            }
            if (options.parameterSpan !== undefined) {
                assert.equal(ts.displayPartsToString(currentParameter.displayParts), options.parameterSpan);
            }
            if (currentParameter) {
                assert.equal(ts.displayPartsToString(currentParameter.documentation), options.parameterDocComment || "", this.assertionMessageAtLastKnownMarker("current parameter Help DocComment"));
            }
            if (options.parameterCount !== undefined) {
                assert.equal(selectedItem.parameters.length, options.parameterCount);
            }
            if (options.argumentCount !== undefined) {
                assert.equal(help.argumentCount, options.argumentCount);
            }
            assert.equal(selectedItem.isVariadic, !!options.isVariadic);
            var actualTags = selectedItem.tags;
            assert.equal(actualTags.length, (options.tags || ts.emptyArray).length, this.assertionMessageAtLastKnownMarker("signature help tags"));
            ts.zipWith((options.tags || ts.emptyArray), actualTags, function (expectedTag, actualTag) {
                assert.equal(expectedTag.name, actualTag.name);
                assert.equal(expectedTag.text, actualTag.text, _this.assertionMessageAtLastKnownMarker("signature help tag " + actualTag.name));
            });
            var allKeys = [
                "marker",
                "overloadsCount",
                "docComment",
                "text",
                "parameterName",
                "parameterSpan",
                "parameterDocComment",
                "parameterCount",
                "isVariadic",
                "tags",
                "argumentCount",
            ];
            for (var key in options) {
                ts.Debug.assert(ts.contains(allKeys, key));
            }
        };
        TestState.prototype.validate = function (name, expected, actual) {
            if (expected && expected !== actual) {
                this.raiseError("Expected " + name + " '" + expected + "'.  Got '" + actual + "' instead.");
            }
        };
        TestState.prototype.verifyRenameInfoSucceeded = function (displayName, fullDisplayName, kind, kindModifiers) {
            var renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
            if (!renameInfo.canRename) {
                this.raiseError("Rename did not succeed");
            }
            this.validate("displayName", displayName, renameInfo.displayName);
            this.validate("fullDisplayName", fullDisplayName, renameInfo.fullDisplayName);
            this.validate("kind", kind, renameInfo.kind);
            this.validate("kindModifiers", kindModifiers, renameInfo.kindModifiers);
            if (this.getRanges().length !== 1) {
                this.raiseError("Expected a single range to be selected in the test file.");
            }
            var expectedRange = this.getRanges()[0];
            if (renameInfo.triggerSpan.start !== expectedRange.pos ||
                ts.textSpanEnd(renameInfo.triggerSpan) !== expectedRange.end) {
                this.raiseError("Expected triggerSpan [" + expectedRange.pos + "," + expectedRange.end + ").  Got [" +
                    renameInfo.triggerSpan.start + "," + ts.textSpanEnd(renameInfo.triggerSpan) + ") instead.");
            }
        };
        TestState.prototype.verifyRenameInfoFailed = function (message) {
            var renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
            if (renameInfo.canRename) {
                this.raiseError("Rename was expected to fail");
            }
            this.validate("error", message, renameInfo.localizedErrorMessage);
        };
        TestState.prototype.spanInfoToString = function (spanInfo, prefixString) {
            var resultString = "SpanInfo: " + JSON.stringify(spanInfo);
            if (spanInfo) {
                var spanString = this.activeFile.content.substr(spanInfo.start, spanInfo.length);
                var spanLineMap = ts.computeLineStarts(spanString);
                for (var i = 0; i < spanLineMap.length; i++) {
                    if (!i) {
                        resultString += "\n";
                    }
                    resultString += prefixString + spanString.substring(spanLineMap[i], spanLineMap[i + 1]);
                }
                resultString += "\n" + prefixString + ":=> (" + this.getLineColStringAtPosition(spanInfo.start) + ") to (" + this.getLineColStringAtPosition(ts.textSpanEnd(spanInfo)) + ")";
            }
            return resultString;
        };
        TestState.prototype.baselineCurrentFileLocations = function (getSpanAtPos) {
            var _this = this;
            var fileLineMap = ts.computeLineStarts(this.activeFile.content);
            var nextLine = 0;
            var resultString = "";
            var currentLine;
            var previousSpanInfo;
            var startColumn;
            var length;
            var prefixString = "    >";
            var pos = 0;
            var addSpanInfoString = function () {
                if (previousSpanInfo) {
                    resultString += currentLine;
                    var thisLineMarker = ts.repeatString(" ", startColumn) + ts.repeatString("~", length);
                    thisLineMarker += ts.repeatString(" ", _this.alignmentForExtraInfo - thisLineMarker.length - prefixString.length + 1);
                    resultString += thisLineMarker;
                    resultString += "=> Pos: (" + (pos - length) + " to " + (pos - 1) + ") ";
                    resultString += " " + previousSpanInfo;
                    previousSpanInfo = undefined;
                }
            };
            for (; pos < this.activeFile.content.length; pos++) {
                if (pos === 0 || pos === fileLineMap[nextLine]) {
                    nextLine++;
                    addSpanInfoString();
                    if (resultString.length) {
                        resultString += "\n--------------------------------";
                    }
                    currentLine = "\n" + nextLine.toString() + ts.repeatString(" ", 3 - nextLine.toString().length) + ">" + this.activeFile.content.substring(pos, fileLineMap[nextLine]) + "\n    ";
                    startColumn = 0;
                    length = 0;
                }
                var spanInfo = this.spanInfoToString(getSpanAtPos(pos), prefixString);
                if (previousSpanInfo && previousSpanInfo !== spanInfo) {
                    addSpanInfoString();
                    previousSpanInfo = spanInfo;
                    startColumn = startColumn + length;
                    length = 1;
                }
                else {
                    previousSpanInfo = spanInfo;
                    length++;
                }
            }
            addSpanInfoString();
            return resultString;
        };
        TestState.prototype.getBreakpointStatementLocation = function (pos) {
            return this.languageService.getBreakpointStatementAtPosition(this.activeFile.fileName, pos);
        };
        TestState.prototype.baselineCurrentFileBreakpointLocations = function () {
            var _this = this;
            var baselineFile = this.testData.globalOptions["BaselineFile" /* baselineFile */];
            if (!baselineFile) {
                baselineFile = this.activeFile.fileName.replace(this.basePath + "/breakpointValidation", "bpSpan");
                baselineFile = baselineFile.replace(".ts" /* Ts */, ".baseline");
            }
            Harness.Baseline.runBaseline(baselineFile, function () {
                return _this.baselineCurrentFileLocations(function (pos) { return _this.getBreakpointStatementLocation(pos); });
            });
        };
        TestState.prototype.baselineGetEmitOutput = function (insertResultsIntoVfs) {
            var _this = this;
            // Find file to be emitted
            var emitFiles = []; // List of FourSlashFile that has emitThisFile flag on
            var allFourSlashFiles = this.testData.files;
            for (var _i = 0, allFourSlashFiles_1 = allFourSlashFiles; _i < allFourSlashFiles_1.length; _i++) {
                var file = allFourSlashFiles_1[_i];
                if (file.fileOptions["emitThisFile" /* emitThisFile */] === "true") {
                    // Find a file with the flag emitThisFile turned on
                    emitFiles.push(file);
                }
            }
            // If there is not emiThisFile flag specified in the test file, throw an error
            if (emitFiles.length === 0) {
                this.raiseError("No emitThisFile is specified in the test file");
            }
            Harness.Baseline.runBaseline(this.testData.globalOptions["BaselineFile" /* baselineFile */], function () {
                var resultString = "";
                // Loop through all the emittedFiles and emit them one by one
                emitFiles.forEach(function (emitFile) {
                    var emitOutput = _this.languageService.getEmitOutput(emitFile.fileName);
                    // Print emitOutputStatus in readable format
                    resultString += "EmitSkipped: " + emitOutput.emitSkipped + Harness.IO.newLine();
                    if (emitOutput.emitSkipped) {
                        resultString += "Diagnostics:" + Harness.IO.newLine();
                        var diagnostics = ts.getPreEmitDiagnostics(_this.languageService.getProgram()); // TODO: GH#18217
                        for (var _i = 0, diagnostics_1 = diagnostics; _i < diagnostics_1.length; _i++) {
                            var diagnostic = diagnostics_1[_i];
                            if (!ts.isString(diagnostic.messageText)) {
                                var chainedMessage = diagnostic.messageText;
                                var indentation = " ";
                                while (chainedMessage) {
                                    resultString += indentation + chainedMessage.messageText + Harness.IO.newLine();
                                    chainedMessage = chainedMessage.next;
                                    indentation = indentation + " ";
                                }
                            }
                            else {
                                resultString += "  " + diagnostic.messageText + Harness.IO.newLine();
                            }
                        }
                    }
                    for (var _a = 0, _b = emitOutput.outputFiles; _a < _b.length; _a++) {
                        var outputFile = _b[_a];
                        var fileName = "FileName : " + outputFile.name + Harness.IO.newLine();
                        resultString = resultString + fileName + outputFile.text;
                        if (insertResultsIntoVfs) {
                            _this.languageServiceAdapterHost.addScript(ts.getNormalizedAbsolutePath(outputFile.name, "/"), outputFile.text, /*isRootFile*/ true);
                        }
                    }
                    resultString += Harness.IO.newLine();
                });
                return resultString;
            });
        };
        TestState.prototype.baselineQuickInfo = function () {
            var _this = this;
            var baselineFile = this.testData.globalOptions["BaselineFile" /* baselineFile */];
            if (!baselineFile) {
                baselineFile = ts.getBaseFileName(this.activeFile.fileName).replace(".ts" /* Ts */, ".baseline");
            }
            Harness.Baseline.runBaseline(baselineFile, function () { return stringify(_this.testData.markers.map(function (marker) { return ({
                marker: marker,
                quickInfo: _this.languageService.getQuickInfoAtPosition(marker.fileName, marker.position)
            }); })); });
        };
        TestState.prototype.printBreakpointLocation = function (pos) {
            Harness.IO.log("\n**Pos: " + pos + " " + this.spanInfoToString(this.getBreakpointStatementLocation(pos), "  "));
        };
        TestState.prototype.printBreakpointAtCurrentLocation = function () {
            this.printBreakpointLocation(this.currentCaretPosition);
        };
        TestState.prototype.printCurrentParameterHelp = function () {
            var help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            Harness.IO.log(stringify(help));
        };
        TestState.prototype.printCurrentQuickInfo = function () {
            var quickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            Harness.IO.log("Quick Info: " + quickInfo.displayParts.map(function (part) { return part.text; }).join(""));
        };
        TestState.prototype.printErrorList = function () {
            var syntacticErrors = this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
            var semanticErrors = this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
            var errorList = ts.concatenate(syntacticErrors, semanticErrors);
            Harness.IO.log("Error list (" + errorList.length + " errors)");
            if (errorList.length) {
                errorList.forEach(function (err) {
                    Harness.IO.log("start: " + err.start +
                        ", length: " + err.length +
                        ", message: " + ts.flattenDiagnosticMessageText(err.messageText, Harness.IO.newLine()));
                });
            }
        };
        TestState.prototype.printCurrentFileState = function (showWhitespace, makeCaretVisible) {
            for (var _i = 0, _a = this.testData.files; _i < _a.length; _i++) {
                var file = _a[_i];
                var active = (this.activeFile === file);
                Harness.IO.log("=== Script (" + file.fileName + ") " + (active ? "(active, cursor at |)" : "") + " ===");
                var content = this.getFileContent(file.fileName);
                if (active) {
                    content = content.substr(0, this.currentCaretPosition) + (makeCaretVisible ? "|" : "") + content.substr(this.currentCaretPosition);
                }
                if (showWhitespace) {
                    content = makeWhitespaceVisible(content);
                }
                Harness.IO.log(content);
            }
        };
        TestState.prototype.printCurrentSignatureHelp = function () {
            var help = this.getSignatureHelp();
            Harness.IO.log(stringify(help.items[help.selectedItemIndex]));
        };
        TestState.prototype.getSignatureHelp = function () {
            return this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
        };
        TestState.prototype.printCompletionListMembers = function (preferences) {
            var completions = this.getCompletionListAtCaret(preferences);
            this.printMembersOrCompletions(completions);
        };
        TestState.prototype.printMembersOrCompletions = function (info) {
            if (info === undefined) {
                return "No completion info.";
            }
            var entries = info.entries;
            function pad(s, length) {
                return s + new Array(length - s.length + 1).join(" ");
            }
            function max(arr, selector) {
                return arr.reduce(function (prev, x) { return Math.max(prev, selector(x)); }, 0);
            }
            var longestNameLength = max(entries, function (m) { return m.name.length; });
            var longestKindLength = max(entries, function (m) { return m.kind.length; });
            entries.sort(function (m, n) { return m.sortText > n.sortText ? 1 : m.sortText < n.sortText ? -1 : m.name > n.name ? 1 : m.name < n.name ? -1 : 0; });
            var membersString = entries.map(function (m) { return pad(m.name, longestNameLength) + " " + pad(m.kind, longestKindLength) + " " + m.kindModifiers + " " + (m.isRecommended ? "recommended " : "") + (m.source === undefined ? "" : m.source); }).join("\n");
            Harness.IO.log(membersString);
        };
        TestState.prototype.printContext = function () {
            ts.forEach(this.languageServiceAdapterHost.getFilenames(), Harness.IO.log);
        };
        TestState.prototype.deleteChar = function (count) {
            if (count === void 0) { count = 1; }
            var offset = this.currentCaretPosition;
            var ch = "";
            var checkCadence = (count >> 2) + 1;
            for (var i = 0; i < count; i++) {
                this.editScriptAndUpdateMarkers(this.activeFile.fileName, offset, offset + 1, ch);
                if (i % checkCadence === 0) {
                    this.checkPostEditInvariants();
                }
                // Handle post-keystroke formatting
                if (this.enableFormatting) {
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeSettings);
                    if (edits.length) {
                        offset += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
                    }
                }
            }
            this.checkPostEditInvariants();
        };
        TestState.prototype.replace = function (start, length, text) {
            this.editScriptAndUpdateMarkers(this.activeFile.fileName, start, start + length, text);
            this.checkPostEditInvariants();
        };
        TestState.prototype.deleteCharBehindMarker = function (count) {
            if (count === void 0) { count = 1; }
            var offset = this.currentCaretPosition;
            var ch = "";
            var checkCadence = (count >> 2) + 1;
            for (var i = 0; i < count; i++) {
                this.currentCaretPosition--;
                offset--;
                this.editScriptAndUpdateMarkers(this.activeFile.fileName, offset, offset + 1, ch);
                if (i % checkCadence === 0) {
                    this.checkPostEditInvariants();
                }
                // Don't need to examine formatting because there are no formatting changes on backspace.
            }
            this.checkPostEditInvariants();
        };
        // Enters lines of text at the current caret position
        TestState.prototype.type = function (text, highFidelity) {
            if (highFidelity === void 0) { highFidelity = false; }
            var offset = this.currentCaretPosition;
            var prevChar = " ";
            var checkCadence = (text.length >> 2) + 1;
            for (var i = 0; i < text.length; i++) {
                var ch = text.charAt(i);
                this.editScriptAndUpdateMarkers(this.activeFile.fileName, offset, offset, ch);
                if (highFidelity) {
                    this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, offset);
                }
                this.currentCaretPosition++;
                offset++;
                if (highFidelity) {
                    if (ch === "(" || ch === ",") {
                        /* Signature help*/
                        this.languageService.getSignatureHelpItems(this.activeFile.fileName, offset);
                    }
                    else if (prevChar === " " && /A-Za-z_/.test(ch)) {
                        /* Completions */
                        this.languageService.getCompletionsAtPosition(this.activeFile.fileName, offset, ts.defaultPreferences);
                    }
                    if (i % checkCadence === 0) {
                        this.checkPostEditInvariants();
                    }
                }
                // Handle post-keystroke formatting
                if (this.enableFormatting) {
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeSettings);
                    if (edits.length) {
                        offset += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
                    }
                }
            }
            this.checkPostEditInvariants();
        };
        // Enters text as if the user had pasted it
        TestState.prototype.paste = function (text) {
            var start = this.currentCaretPosition;
            this.editScriptAndUpdateMarkers(this.activeFile.fileName, this.currentCaretPosition, this.currentCaretPosition, text);
            this.checkPostEditInvariants();
            var offset = this.currentCaretPosition += text.length;
            // Handle formatting
            if (this.enableFormatting) {
                var edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, offset, this.formatCodeSettings);
                if (edits.length) {
                    this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
                }
            }
            this.checkPostEditInvariants();
        };
        TestState.prototype.checkPostEditInvariants = function () {
            if (this.testType !== 0 /* Native */) {
                // getSourcefile() results can not be serialized. Only perform these verifications
                // if running against a native LS object.
                return;
            }
            var incrementalSourceFile = this.languageService.getNonBoundSourceFile(this.activeFile.fileName);
            Utils.assertInvariants(incrementalSourceFile, /*parent:*/ undefined);
            var incrementalSyntaxDiagnostics = incrementalSourceFile.parseDiagnostics;
            // Check syntactic structure
            var content = this.getFileContent(this.activeFile.fileName);
            var referenceSourceFile = ts.createLanguageServiceSourceFile(this.activeFile.fileName, createScriptSnapShot(content), 6 /* Latest */, /*version:*/ "0", /*setNodeParents:*/ false);
            var referenceSyntaxDiagnostics = referenceSourceFile.parseDiagnostics;
            Utils.assertDiagnosticsEquals(incrementalSyntaxDiagnostics, referenceSyntaxDiagnostics);
            Utils.assertStructuralEquals(incrementalSourceFile, referenceSourceFile);
        };
        /**
         * @returns The number of characters added to the file as a result of the edits.
         * May be negative.
         */
        TestState.prototype.applyEdits = function (fileName, edits, isFormattingEdit) {
            // We get back a set of edits, but langSvc.editScript only accepts one at a time. Use this to keep track
            // of the incremental offset from each edit to the next. We assume these edit ranges don't overlap
            // Copy this so we don't ruin someone else's copy
            edits = JSON.parse(JSON.stringify(edits));
            // Get a snapshot of the content of the file so we can make sure any formatting edits didn't destroy non-whitespace characters
            var oldContent = this.getFileContent(fileName);
            var runningOffset = 0;
            for (var i = 0; i < edits.length; i++) {
                var edit = edits[i];
                var offsetStart = edit.span.start;
                var offsetEnd = offsetStart + edit.span.length;
                this.editScriptAndUpdateMarkers(fileName, offsetStart, offsetEnd, edit.newText);
                var editDelta = edit.newText.length - edit.span.length;
                if (offsetStart <= this.currentCaretPosition) {
                    if (offsetEnd <= this.currentCaretPosition) {
                        // The entirety of the edit span falls before the caret position, shift the caret accordingly
                        this.currentCaretPosition += editDelta;
                    }
                    else {
                        // The span being replaced includes the caret position, place the caret at the beginning of the span
                        this.currentCaretPosition = offsetStart;
                    }
                }
                runningOffset += editDelta;
                // Update positions of any future edits affected by this change
                for (var j = i + 1; j < edits.length; j++) {
                    if (edits[j].span.start >= edits[i].span.start) {
                        edits[j].span.start += editDelta;
                    }
                }
            }
            if (isFormattingEdit) {
                var newContent = this.getFileContent(fileName);
                if (this.removeWhitespace(newContent) !== this.removeWhitespace(oldContent)) {
                    this.raiseError("Formatting operation destroyed non-whitespace content");
                }
            }
            return runningOffset;
        };
        TestState.prototype.copyFormatOptions = function () {
            return ts.clone(this.formatCodeSettings);
        };
        TestState.prototype.setFormatOptions = function (formatCodeOptions) {
            var oldFormatCodeOptions = this.formatCodeSettings;
            this.formatCodeSettings = ts.toEditorSettings(formatCodeOptions);
            return oldFormatCodeOptions;
        };
        TestState.prototype.formatDocument = function () {
            var edits = this.languageService.getFormattingEditsForDocument(this.activeFile.fileName, this.formatCodeSettings);
            this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
        };
        TestState.prototype.formatSelection = function (start, end) {
            var edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, end, this.formatCodeSettings);
            this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
        };
        TestState.prototype.formatOnType = function (pos, key) {
            var edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, pos, key, this.formatCodeSettings);
            this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
        };
        TestState.prototype.editScriptAndUpdateMarkers = function (fileName, editStart, editEnd, newText) {
            this.languageServiceAdapterHost.editScript(fileName, editStart, editEnd, newText);
            for (var _i = 0, _a = this.testData.markers; _i < _a.length; _i++) {
                var marker = _a[_i];
                if (marker.fileName === fileName) {
                    marker.position = updatePosition(marker.position);
                }
            }
            for (var _b = 0, _c = this.testData.ranges; _b < _c.length; _b++) {
                var range = _c[_b];
                if (range.fileName === fileName) {
                    range.pos = updatePosition(range.pos);
                    range.end = updatePosition(range.end);
                }
            }
            function updatePosition(position) {
                if (position > editStart) {
                    if (position < editEnd) {
                        // Inside the edit - mark it as invalidated (?)
                        return -1;
                    }
                    else {
                        // Move marker back/forward by the appropriate amount
                        return position + (editStart - editEnd) + newText.length;
                    }
                }
                else {
                    return position;
                }
            }
        };
        TestState.prototype.removeWhitespace = function (text) {
            return text.replace(/\s/g, "");
        };
        TestState.prototype.goToBOF = function () {
            this.goToPosition(0);
        };
        TestState.prototype.goToEOF = function () {
            var len = this.getFileContent(this.activeFile.fileName).length;
            this.goToPosition(len);
        };
        TestState.prototype.goToRangeStart = function (_a) {
            var fileName = _a.fileName, pos = _a.pos;
            this.openFile(fileName);
            this.goToPosition(pos);
        };
        TestState.prototype.goToTypeDefinition = function (definitionIndex) {
            var definitions = this.languageService.getTypeDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (!definitions || !definitions.length) {
                this.raiseError("goToTypeDefinition failed - expected to find at least one definition location but got 0");
            }
            if (definitionIndex >= definitions.length) {
                this.raiseError("goToTypeDefinition failed - definitionIndex value (" + definitionIndex + ") exceeds definition list size (" + definitions.length + ")");
            }
            var definition = definitions[definitionIndex];
            this.openFile(definition.fileName);
            this.currentCaretPosition = definition.textSpan.start;
        };
        TestState.prototype.verifyTypeDefinitionsCount = function (negative, expectedCount) {
            var assertFn = negative ? assert.notEqual : assert.equal;
            var definitions = this.languageService.getTypeDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            var actualCount = definitions && definitions.length || 0;
            assertFn(actualCount, expectedCount, this.messageAtLastKnownMarker("Type definitions Count"));
        };
        TestState.prototype.verifyImplementationListIsEmpty = function (negative) {
            var implementations = this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (negative) {
                assert.isTrue(implementations && implementations.length > 0, "Expected at least one implementation but got 0");
            }
            else {
                assert.isUndefined(implementations, "Expected implementation list to be empty but implementations returned");
            }
        };
        TestState.prototype.verifyGoToDefinitionName = function (expectedName, expectedContainerName) {
            var definitions = this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            var actualDefinitionName = definitions && definitions.length ? definitions[0].name : "";
            var actualDefinitionContainerName = definitions && definitions.length ? definitions[0].containerName : "";
            assert.equal(actualDefinitionName, expectedName, this.messageAtLastKnownMarker("Definition Info Name"));
            assert.equal(actualDefinitionContainerName, expectedContainerName, this.messageAtLastKnownMarker("Definition Info Container Name"));
        };
        TestState.prototype.goToImplementation = function () {
            var implementations = this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (!implementations || !implementations.length) {
                this.raiseError("goToImplementation failed - expected to find at least one implementation location but got 0");
            }
            if (implementations.length > 1) {
                this.raiseError("goToImplementation failed - more than 1 implementation returned (" + implementations.length + ")");
            }
            var implementation = implementations[0];
            this.openFile(implementation.fileName);
            this.currentCaretPosition = implementation.textSpan.start;
        };
        TestState.prototype.verifyRangesInImplementationList = function (markerName) {
            this.goToMarker(markerName);
            var implementations = this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (!implementations || !implementations.length) {
                this.raiseError("verifyRangesInImplementationList failed - expected to find at least one implementation location but got 0");
            }
            var duplicate = findDuplicatedElement(implementations, implementationsAreEqual);
            if (duplicate) {
                var textSpan = duplicate.textSpan, fileName = duplicate.fileName;
                var end = textSpan.start + textSpan.length;
                this.raiseError("Duplicate implementations returned for range (" + textSpan.start + ", " + end + ") in " + fileName);
            }
            var ranges = this.getRanges();
            if (!ranges || !ranges.length) {
                this.raiseError("verifyRangesInImplementationList failed - expected to find at least one range in test source");
            }
            var unsatisfiedRanges = [];
            var delayedErrors = [];
            var _loop_8 = function (range) {
                var length = range.end - range.pos;
                var matchingImpl = ts.find(implementations, function (impl) {
                    return range.fileName === impl.fileName && range.pos === impl.textSpan.start && length === impl.textSpan.length;
                });
                if (matchingImpl) {
                    if (range.marker && range.marker.data) {
                        var expected = range.marker.data;
                        if (expected.displayParts) {
                            if (!ts.arrayIsEqualTo(expected.displayParts, matchingImpl.displayParts, displayPartIsEqualTo)) {
                                delayedErrors.push("Mismatched display parts: expected " + JSON.stringify(expected.displayParts) + ", actual " + JSON.stringify(matchingImpl.displayParts));
                            }
                        }
                        else if (expected.parts) {
                            var actualParts = matchingImpl.displayParts.map(function (p) { return p.text; });
                            if (!ts.arrayIsEqualTo(expected.parts, actualParts)) {
                                delayedErrors.push("Mismatched non-tagged display parts: expected " + JSON.stringify(expected.parts) + ", actual " + JSON.stringify(actualParts));
                            }
                        }
                        if (expected.kind !== undefined) {
                            if (expected.kind !== matchingImpl.kind) {
                                delayedErrors.push("Mismatched kind: expected " + JSON.stringify(expected.kind) + ", actual " + JSON.stringify(matchingImpl.kind));
                            }
                        }
                    }
                    matchingImpl.matched = true;
                }
                else {
                    unsatisfiedRanges.push(range);
                }
            };
            for (var _i = 0, ranges_2 = ranges; _i < ranges_2.length; _i++) {
                var range = ranges_2[_i];
                _loop_8(range);
            }
            if (delayedErrors.length) {
                this.raiseError(delayedErrors.join("\n"));
            }
            var unmatchedImplementations = implementations.filter(function (impl) { return !impl.matched; });
            if (unmatchedImplementations.length || unsatisfiedRanges.length) {
                var error = "Not all ranges or implementations are satisfied";
                if (unsatisfiedRanges.length) {
                    error += "\nUnsatisfied ranges:";
                    for (var _a = 0, unsatisfiedRanges_1 = unsatisfiedRanges; _a < unsatisfiedRanges_1.length; _a++) {
                        var range = unsatisfiedRanges_1[_a];
                        error += "\n    (" + range.pos + ", " + range.end + ") in " + range.fileName + ": " + this.rangeText(range);
                    }
                }
                if (unmatchedImplementations.length) {
                    error += "\nUnmatched implementations:";
                    for (var _b = 0, unmatchedImplementations_1 = unmatchedImplementations; _b < unmatchedImplementations_1.length; _b++) {
                        var impl = unmatchedImplementations_1[_b];
                        var end = impl.textSpan.start + impl.textSpan.length;
                        error += "\n    (" + impl.textSpan.start + ", " + end + ") in " + impl.fileName + ": " + this.getFileContent(impl.fileName).slice(impl.textSpan.start, end);
                    }
                }
                this.raiseError(error);
            }
            function implementationsAreEqual(a, b) {
                return a.fileName === b.fileName && TestState.textSpansEqual(a.textSpan, b.textSpan);
            }
            function displayPartIsEqualTo(a, b) {
                return a.kind === b.kind && a.text === b.text;
            }
        };
        TestState.prototype.getMarkers = function () {
            //  Return a copy of the list
            return this.testData.markers.slice(0);
        };
        TestState.prototype.getMarkerNames = function () {
            return ts.arrayFrom(this.testData.markerPositions.keys());
        };
        TestState.prototype.getRanges = function () {
            return this.testData.ranges;
        };
        TestState.prototype.rangesByText = function () {
            var result = ts.createMultiMap();
            for (var _i = 0, _a = this.getRanges(); _i < _a.length; _i++) {
                var range = _a[_i];
                var text = this.rangeText(range);
                result.add(text, range);
            }
            return result;
        };
        TestState.prototype.rangeText = function (_a) {
            var fileName = _a.fileName, pos = _a.pos, end = _a.end;
            return this.getFileContent(fileName).slice(pos, end);
        };
        TestState.prototype.verifyCaretAtMarker = function (markerName) {
            if (markerName === void 0) { markerName = ""; }
            var pos = this.getMarkerByName(markerName);
            if (pos.fileName !== this.activeFile.fileName) {
                throw new Error("verifyCaretAtMarker failed - expected to be in file \"" + pos.fileName + "\", but was in file \"" + this.activeFile.fileName + "\"");
            }
            if (pos.position !== this.currentCaretPosition) {
                throw new Error("verifyCaretAtMarker failed - expected to be at marker \"/*" + markerName + "*/, but was at position " + this.currentCaretPosition + "(" + this.getLineColStringAtPosition(this.currentCaretPosition) + ")");
            }
        };
        TestState.prototype.getIndentation = function (fileName, position, indentStyle, baseIndentSize) {
            var formatOptions = ts.clone(this.formatCodeSettings);
            formatOptions.indentStyle = indentStyle;
            formatOptions.baseIndentSize = baseIndentSize;
            return this.languageService.getIndentationAtPosition(fileName, position, formatOptions);
        };
        TestState.prototype.verifyIndentationAtCurrentPosition = function (numberOfSpaces, indentStyle, baseIndentSize) {
            if (indentStyle === void 0) { indentStyle = ts.IndentStyle.Smart; }
            if (baseIndentSize === void 0) { baseIndentSize = 0; }
            var actual = this.getIndentation(this.activeFile.fileName, this.currentCaretPosition, indentStyle, baseIndentSize);
            var lineCol = this.getLineColStringAtPosition(this.currentCaretPosition);
            if (actual !== numberOfSpaces) {
                this.raiseError("verifyIndentationAtCurrentPosition failed at " + lineCol + " - expected: " + numberOfSpaces + ", actual: " + actual);
            }
        };
        TestState.prototype.verifyIndentationAtPosition = function (fileName, position, numberOfSpaces, indentStyle, baseIndentSize) {
            if (indentStyle === void 0) { indentStyle = ts.IndentStyle.Smart; }
            if (baseIndentSize === void 0) { baseIndentSize = 0; }
            var actual = this.getIndentation(fileName, position, indentStyle, baseIndentSize);
            var lineCol = this.getLineColStringAtPosition(position);
            if (actual !== numberOfSpaces) {
                this.raiseError("verifyIndentationAtPosition failed at " + lineCol + " - expected: " + numberOfSpaces + ", actual: " + actual);
            }
        };
        TestState.prototype.verifyCurrentLineContent = function (text) {
            var actual = this.getCurrentLineContent();
            if (actual !== text) {
                throw new Error("verifyCurrentLineContent\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: \"" + actual + "\"");
            }
        };
        TestState.prototype.verifyCurrentFileContent = function (text) {
            this.verifyFileContent(this.activeFile.fileName, text);
        };
        TestState.prototype.verifyFileContent = function (fileName, text) {
            var actual = this.getFileContent(fileName);
            if (actual !== text) {
                throw new Error("verifyFileContent failed:\n" + showTextDiff(text, actual));
            }
        };
        TestState.prototype.verifyTextAtCaretIs = function (text) {
            var actual = this.getFileContent(this.activeFile.fileName).substring(this.currentCaretPosition, this.currentCaretPosition + text.length);
            if (actual !== text) {
                throw new Error("verifyTextAtCaretIs\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: \"" + actual + "\"");
            }
        };
        TestState.prototype.verifyCurrentNameOrDottedNameSpanText = function (text) {
            var span = this.languageService.getNameOrDottedNameSpan(this.activeFile.fileName, this.currentCaretPosition, this.currentCaretPosition);
            if (!span) {
                return this.raiseError("verifyCurrentNameOrDottedNameSpanText\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: undefined");
            }
            var actual = this.getFileContent(this.activeFile.fileName).substring(span.start, ts.textSpanEnd(span));
            if (actual !== text) {
                this.raiseError("verifyCurrentNameOrDottedNameSpanText\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: \"" + actual + "\"");
            }
        };
        TestState.prototype.getNameOrDottedNameSpan = function (pos) {
            return this.languageService.getNameOrDottedNameSpan(this.activeFile.fileName, pos, pos);
        };
        TestState.prototype.baselineCurrentFileNameOrDottedNameSpans = function () {
            var _this = this;
            Harness.Baseline.runBaseline(this.testData.globalOptions["BaselineFile" /* baselineFile */], function () {
                return _this.baselineCurrentFileLocations(function (pos) {
                    return _this.getNameOrDottedNameSpan(pos);
                });
            });
        };
        TestState.prototype.printNameOrDottedNameSpans = function (pos) {
            Harness.IO.log(this.spanInfoToString(this.getNameOrDottedNameSpan(pos), "**"));
        };
        TestState.prototype.verifyClassifications = function (expected, actual, sourceFileText) {
            var _this = this;
            if (actual.length !== expected.length) {
                this.raiseError("verifyClassifications failed - expected total classifications to be " + expected.length +
                    ", but was " + actual.length +
                    jsonMismatchString());
            }
            ts.zipWith(expected, actual, function (expectedClassification, actualClassification) {
                var expectedType = expectedClassification.classificationType;
                if (expectedType !== actualClassification.classificationType) {
                    _this.raiseError("verifyClassifications failed - expected classifications type to be " +
                        expectedType + ", but was " +
                        actualClassification.classificationType +
                        jsonMismatchString());
                }
                var expectedSpan = expectedClassification.textSpan;
                var actualSpan = actualClassification.textSpan;
                if (expectedSpan) {
                    var expectedLength = expectedSpan.end - expectedSpan.start;
                    if (expectedSpan.start !== actualSpan.start || expectedLength !== actualSpan.length) {
                        _this.raiseError("verifyClassifications failed - expected span of text to be " +
                            "{start=" + expectedSpan.start + ", length=" + expectedLength + "}, but was " +
                            "{start=" + actualSpan.start + ", length=" + actualSpan.length + "}" +
                            jsonMismatchString());
                    }
                }
                var actualText = _this.activeFile.content.substr(actualSpan.start, actualSpan.length);
                if (expectedClassification.text !== actualText) {
                    _this.raiseError("verifyClassifications failed - expected classified text to be " +
                        expectedClassification.text + ", but was " +
                        actualText +
                        jsonMismatchString());
                }
            });
            function jsonMismatchString() {
                var showActual = actual.map(function (_a) {
                    var classificationType = _a.classificationType, textSpan = _a.textSpan;
                    return ({ classificationType: classificationType, text: sourceFileText.slice(textSpan.start, textSpan.start + textSpan.length) });
                });
                return Harness.IO.newLine() +
                    "expected: '" + Harness.IO.newLine() + stringify(expected) + "'" + Harness.IO.newLine() +
                    "actual:   '" + Harness.IO.newLine() + stringify(showActual) + "'";
            }
        };
        TestState.prototype.verifyProjectInfo = function (expected) {
            var _this = this;
            if (this.testType === 3 /* Server */) {
                var actual = this.languageService.getProjectInfo(this.activeFile.fileName, 
                /* needFileNameList */ true);
                assert.equal(expected.join(","), actual.fileNames.map(function (file) {
                    return file.replace(_this.basePath + "/", "");
                }).join(","));
            }
        };
        TestState.prototype.verifySemanticClassifications = function (expected) {
            var actual = this.languageService.getSemanticClassifications(this.activeFile.fileName, ts.createTextSpan(0, this.activeFile.content.length));
            this.verifyClassifications(expected, actual, this.activeFile.content);
        };
        TestState.prototype.verifySyntacticClassifications = function (expected) {
            var actual = this.languageService.getSyntacticClassifications(this.activeFile.fileName, ts.createTextSpan(0, this.activeFile.content.length));
            this.verifyClassifications(expected, actual, this.activeFile.content);
        };
        TestState.prototype.printOutliningSpans = function () {
            var spans = this.languageService.getOutliningSpans(this.activeFile.fileName);
            Harness.IO.log("Outlining spans (" + spans.length + " items)");
            Harness.IO.log(stringify(spans));
        };
        TestState.prototype.verifyOutliningSpans = function (spans, kind) {
            var _this = this;
            var actual = this.languageService.getOutliningSpans(this.activeFile.fileName);
            if (actual.length !== spans.length) {
                this.raiseError("verifyOutliningSpans failed - expected total spans to be " + spans.length + ", but was " + actual.length);
            }
            ts.zipWith(spans, actual, function (expectedSpan, actualSpan, i) {
                if (expectedSpan.pos !== actualSpan.textSpan.start || expectedSpan.end !== ts.textSpanEnd(actualSpan.textSpan)) {
                    return _this.raiseError("verifyOutliningSpans failed - span " + (i + 1) + " expected: (" + expectedSpan.pos + "," + expectedSpan.end + "),  actual: (" + actualSpan.textSpan.start + "," + ts.textSpanEnd(actualSpan.textSpan) + ")");
                }
                if (kind !== undefined && actualSpan.kind !== kind) {
                    return _this.raiseError("verifyOutliningSpans failed - span " + (i + 1) + " expected kind: ('" + kind + "'),  actual: ('" + actualSpan.kind + "')");
                }
            });
        };
        TestState.prototype.verifyTodoComments = function (descriptors, spans) {
            var _this = this;
            var actual = this.languageService.getTodoComments(this.activeFile.fileName, descriptors.map(function (d) { return { text: d, priority: 0 }; }));
            if (actual.length !== spans.length) {
                this.raiseError("verifyTodoComments failed - expected total spans to be " + spans.length + ", but was " + actual.length);
            }
            ts.zipWith(spans, actual, function (expectedSpan, actualComment, i) {
                var actualCommentSpan = ts.createTextSpan(actualComment.position, actualComment.message.length);
                if (expectedSpan.pos !== actualCommentSpan.start || expectedSpan.end !== ts.textSpanEnd(actualCommentSpan)) {
                    _this.raiseError("verifyOutliningSpans failed - span " + (i + 1) + " expected: (" + expectedSpan.pos + "," + expectedSpan.end + "),  actual: (" + actualCommentSpan.start + "," + ts.textSpanEnd(actualCommentSpan) + ")");
                }
            });
        };
        /**
         * Finds and applies a code action corresponding to the supplied parameters.
         * If index is undefined, applies the unique code action available.
         * @param errorCode The error code that generated the code action.
         * @param index The nth (0-index-based) codeaction available generated by errorCode.
         */
        TestState.prototype.getAndApplyCodeActions = function (errorCode, index) {
            var fileName = this.activeFile.fileName;
            this.applyCodeActions(this.getCodeFixes(fileName, errorCode), index);
        };
        TestState.prototype.applyCodeActionFromCompletion = function (markerName, options) {
            this.goToMarker(markerName);
            var details = this.getCompletionEntryDetails(options.name, options.source, options.preferences);
            var codeActions = details.codeActions;
            if (codeActions.length !== 1) {
                this.raiseError("Expected one code action, got " + codeActions.length);
            }
            if (codeActions[0].description !== options.description) {
                this.raiseError("Expected description to be:\n" + options.description + "\ngot:\n" + codeActions[0].description);
            }
            this.applyCodeActions(codeActions);
            this.verifyNewContent(options, ts.flatMap(codeActions, function (a) { return a.changes.map(function (c) { return c.fileName; }); }));
        };
        TestState.prototype.verifyRangeIs = function (expectedText, includeWhiteSpace) {
            var ranges = this.getRanges();
            if (ranges.length !== 1) {
                this.raiseError("Exactly one range should be specified in the testfile.");
            }
            var actualText = this.rangeText(ranges[0]);
            var result = includeWhiteSpace
                ? actualText === expectedText
                : this.removeWhitespace(actualText) === this.removeWhitespace(expectedText);
            if (!result) {
                this.raiseError("Actual range text doesn't match expected text.\n" + showTextDiff(expectedText, actualText));
            }
        };
        /**
         * Compares expected text to the text that would be in the sole range
         * (ie: [|...|]) in the file after applying the codefix sole codefix
         * in the source file.
         */
        TestState.prototype.verifyRangeAfterCodeFix = function (expectedText, includeWhiteSpace, errorCode, index) {
            this.getAndApplyCodeActions(errorCode, index);
            this.verifyRangeIs(expectedText, includeWhiteSpace);
        };
        TestState.prototype.verifyCodeFixAll = function (_a) {
            var _this = this;
            var fixId = _a.fixId, fixAllDescription = _a.fixAllDescription, newFileContent = _a.newFileContent, expectedCommands = _a.commands;
            var fixWithId = ts.find(this.getCodeFixes(this.activeFile.fileName), function (a) { return a.fixId === fixId; });
            ts.Debug.assert(fixWithId !== undefined, "No available code fix has that group id.", function () {
                return "Expected '" + fixId + "'. Available action ids: " + ts.mapDefined(_this.getCodeFixes(_this.activeFile.fileName), function (a) { return a.fixId; });
            });
            ts.Debug.assertEqual(fixWithId.fixAllDescription, fixAllDescription);
            var _b = this.languageService.getCombinedCodeFix({ type: "file", fileName: this.activeFile.fileName }, fixId, this.formatCodeSettings, ts.defaultPreferences), changes = _b.changes, commands = _b.commands;
            assert.deepEqual(commands, expectedCommands);
            assert(changes.every(function (c) { return c.fileName === _this.activeFile.fileName; }), "TODO: support testing codefixes that touch multiple files");
            this.applyChanges(changes);
            this.verifyCurrentFileContent(newFileContent);
        };
        /**
         * Applies fixes for the errors in fileName and compares the results to
         * expectedContents after all fixes have been applied.
         *
         * Note: applying one codefix may generate another (eg: remove duplicate implements
         * may generate an extends -> interface conversion fix).
         * @param expectedContents The contents of the file after the fixes are applied.
         * @param fileName The file to check. If not supplied, the current open file is used.
         */
        TestState.prototype.verifyFileAfterCodeFix = function (expectedContents, fileName) {
            fileName = fileName ? fileName : this.activeFile.fileName;
            this.applyCodeActions(this.getCodeFixes(fileName));
            var actualContents = this.getFileContent(fileName);
            if (this.removeWhitespace(actualContents) !== this.removeWhitespace(expectedContents)) {
                this.raiseError("Actual text doesn't match expected text. Actual:\n" + actualContents + "\n\nExpected:\n" + expectedContents);
            }
        };
        TestState.prototype.verifyCodeFix = function (options) {
            var fileName = this.activeFile.fileName;
            var actions = this.getCodeFixes(fileName, options.errorCode, options.preferences);
            var index = options.index;
            if (index === undefined) {
                if (!(actions && actions.length === 1)) {
                    this.raiseError("Should find exactly one codefix, but " + (actions ? actions.length : "none") + " found. " + (actions ? actions.map(function (a) { return Harness.IO.newLine() + " \"" + a.description + "\""; }) : ""));
                }
                index = 0;
            }
            else {
                if (!(actions && actions.length >= index + 1)) {
                    this.raiseError("Should find at least " + (index + 1) + " codefix(es), but " + (actions ? actions.length : "none") + " found.");
                }
            }
            var action = actions[index];
            assert.equal(action.description, options.description);
            for (var _i = 0, _a = action.changes; _i < _a.length; _i++) {
                var change = _a[_i];
                this.applyEdits(change.fileName, change.textChanges, /*isFormattingEdit*/ false);
            }
            this.verifyNewContent(options, action.changes.map(function (c) { return c.fileName; }));
        };
        TestState.prototype.verifyNewContent = function (options, changedFiles) {
            var assertedChangedFiles = !options.newFileContent || typeof options.newFileContent === "string"
                ? [this.activeFile.fileName]
                : ts.getOwnKeys(options.newFileContent);
            assert.deepEqual(assertedChangedFiles, changedFiles);
            if (options.newFileContent !== undefined) {
                assert(!options.newRangeContent);
                if (typeof options.newFileContent === "string") {
                    this.verifyCurrentFileContent(options.newFileContent);
                }
                else {
                    for (var fileName in options.newFileContent) {
                        this.verifyFileContent(fileName, options.newFileContent[fileName]);
                    }
                }
            }
            else {
                this.verifyRangeIs(options.newRangeContent, /*includeWhitespace*/ true);
            }
        };
        /**
         * Rerieves a codefix satisfying the parameters, or undefined if no such codefix is found.
         * @param fileName Path to file where error should be retrieved from.
         */
        TestState.prototype.getCodeFixes = function (fileName, errorCode, preferences) {
            var _this = this;
            if (preferences === void 0) { preferences = ts.defaultPreferences; }
            var diagnosticsForCodeFix = this.getDiagnostics(fileName, /*includeSuggestions*/ true).map(function (diagnostic) { return ({
                start: diagnostic.start,
                length: diagnostic.length,
                code: diagnostic.code
            }); });
            return ts.flatMap(ts.deduplicate(diagnosticsForCodeFix, ts.equalOwnProperties), function (diagnostic) {
                if (errorCode !== undefined && errorCode !== diagnostic.code) {
                    return;
                }
                return _this.languageService.getCodeFixesAtPosition(fileName, diagnostic.start, diagnostic.start + diagnostic.length, [diagnostic.code], _this.formatCodeSettings, preferences);
            });
        };
        TestState.prototype.applyCodeActions = function (actions, index) {
            if (index === undefined) {
                if (!(actions && actions.length === 1)) {
                    this.raiseError("Should find exactly one codefix, but " + (actions ? actions.length : "none") + " found. " + (actions ? actions.map(function (a) { return Harness.IO.newLine() + " \"" + a.description + "\""; }) : ""));
                }
                index = 0;
            }
            else {
                if (!(actions && actions.length >= index + 1)) {
                    this.raiseError("Should find at least " + (index + 1) + " codefix(es), but " + (actions ? actions.length : "none") + " found.");
                }
            }
            this.applyChanges(actions[index].changes);
        };
        TestState.prototype.applyChanges = function (changes) {
            for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
                var change = changes_1[_i];
                this.applyEdits(change.fileName, change.textChanges, /*isFormattingEdit*/ false);
            }
        };
        TestState.prototype.verifyImportFixAtPosition = function (expectedTextArray, errorCode, preferences) {
            var _this = this;
            var fileName = this.activeFile.fileName;
            var ranges = this.getRanges().filter(function (r) { return r.fileName === fileName; });
            if (ranges.length > 1) {
                this.raiseError("Exactly one range should be specified in the testfile.");
            }
            var range = ts.firstOrUndefined(ranges);
            var codeFixes = this.getCodeFixes(fileName, errorCode, preferences).filter(function (f) { return f.fixId === undefined; }); // TODO: GH#20315 filter out those that use the import fix ID;
            if (codeFixes.length === 0) {
                if (expectedTextArray.length !== 0) {
                    this.raiseError("No codefixes returned.");
                }
                return;
            }
            var actualTextArray = [];
            var scriptInfo = this.languageServiceAdapterHost.getScriptInfo(fileName);
            var originalContent = scriptInfo.content;
            for (var _i = 0, codeFixes_1 = codeFixes; _i < codeFixes_1.length; _i++) {
                var codeFix = codeFixes_1[_i];
                ts.Debug.assert(codeFix.changes.length === 1);
                var change = ts.first(codeFix.changes);
                ts.Debug.assert(change.fileName === fileName);
                this.applyEdits(change.fileName, change.textChanges, /*isFormattingEdit*/ false);
                var text = range ? this.rangeText(range) : this.getFileContent(this.activeFile.fileName);
                actualTextArray.push(text);
                scriptInfo.updateContent(originalContent);
            }
            if (expectedTextArray.length !== actualTextArray.length) {
                this.raiseError("Expected " + expectedTextArray.length + " import fixes, got " + actualTextArray.length);
            }
            ts.zipWith(expectedTextArray, actualTextArray, function (expected, actual, index) {
                if (expected !== actual) {
                    _this.raiseError("Import fix at index " + index + " doesn't match.\n" + showTextDiff(expected, actual));
                }
            });
        };
        TestState.prototype.verifyDocCommentTemplate = function (expected) {
            var name = "verifyDocCommentTemplate";
            var actual = this.languageService.getDocCommentTemplateAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (expected === undefined) {
                if (actual) {
                    this.raiseError(name + " failed - expected no template but got {newText: \"" + actual.newText + "\", caretOffset: " + actual.caretOffset + "}");
                }
                return;
            }
            else {
                if (actual === undefined) {
                    this.raiseError(name + " failed - expected the template {newText: \"" + expected.newText + "\", caretOffset: \"" + expected.caretOffset + "\"} but got nothing instead");
                }
                if (actual.newText !== expected.newText) {
                    this.raiseError(name + " failed for expected insertion.\n" + showTextDiff(expected.newText, actual.newText));
                }
                if (actual.caretOffset !== expected.caretOffset) {
                    this.raiseError(name + " failed - expected caretOffset: " + expected.caretOffset + "\nactual caretOffset:" + actual.caretOffset);
                }
            }
        };
        TestState.prototype.verifyBraceCompletionAtPosition = function (negative, openingBrace) {
            var openBraceMap = ts.createMapFromTemplate({
                "(": 40 /* openParen */,
                "{": 123 /* openBrace */,
                "[": 91 /* openBracket */,
                "'": 39 /* singleQuote */,
                '"': 34 /* doubleQuote */,
                "`": 96 /* backtick */,
                "<": 60 /* lessThan */
            });
            var charCode = openBraceMap.get(openingBrace);
            if (!charCode) {
                throw this.raiseError("Invalid openingBrace '" + openingBrace + "' specified.");
            }
            var position = this.currentCaretPosition;
            var validBraceCompletion = this.languageService.isValidBraceCompletionAtPosition(this.activeFile.fileName, position, charCode);
            if (!negative && !validBraceCompletion) {
                this.raiseError(position + " is not a valid brace completion position for " + openingBrace);
            }
            if (negative && validBraceCompletion) {
                this.raiseError(position + " is a valid brace completion position for " + openingBrace);
            }
        };
        TestState.prototype.verifyJsxClosingTag = function (map) {
            for (var markerName in map) {
                this.goToMarker(markerName);
                var actual = this.languageService.getJsxClosingTagAtPosition(this.activeFile.fileName, this.currentCaretPosition);
                assert.deepEqual(actual, map[markerName]);
            }
        };
        TestState.prototype.verifyMatchingBracePosition = function (bracePosition, expectedMatchPosition) {
            var actual = this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, bracePosition);
            if (actual.length !== 2) {
                this.raiseError("verifyMatchingBracePosition failed - expected result to contain 2 spans, but it had " + actual.length);
            }
            var actualMatchPosition = -1;
            if (bracePosition === actual[0].start) {
                actualMatchPosition = actual[1].start;
            }
            else if (bracePosition === actual[1].start) {
                actualMatchPosition = actual[0].start;
            }
            else {
                this.raiseError("verifyMatchingBracePosition failed - could not find the brace position: " + bracePosition + " in the returned list: (" + actual[0].start + "," + ts.textSpanEnd(actual[0]) + ") and (" + actual[1].start + "," + ts.textSpanEnd(actual[1]) + ")");
            }
            if (actualMatchPosition !== expectedMatchPosition) {
                this.raiseError("verifyMatchingBracePosition failed - expected: " + actualMatchPosition + ",  actual: " + expectedMatchPosition);
            }
        };
        TestState.prototype.verifyNoMatchingBracePosition = function (bracePosition) {
            var actual = this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, bracePosition);
            if (actual.length !== 0) {
                this.raiseError("verifyNoMatchingBracePosition failed - expected: 0 spans, actual: " + actual.length);
            }
        };
        TestState.prototype.verifySpanOfEnclosingComment = function (negative, onlyMultiLineDiverges) {
            var expected = !negative;
            var position = this.currentCaretPosition;
            var fileName = this.activeFile.fileName;
            var actual = !!this.languageService.getSpanOfEnclosingComment(fileName, position, /*onlyMultiLine*/ false);
            var actualOnlyMultiLine = !!this.languageService.getSpanOfEnclosingComment(fileName, position, /*onlyMultiLine*/ true);
            if (expected !== actual || onlyMultiLineDiverges === (actual === actualOnlyMultiLine)) {
                this.raiseError("verifySpanOfEnclosingComment failed:\n                position: '" + position + "'\n                fileName: '" + fileName + "'\n                onlyMultiLineDiverges: '" + onlyMultiLineDiverges + "'\n                actual: '" + actual + "'\n                actualOnlyMultiLine: '" + actualOnlyMultiLine + "'\n                expected: '" + expected + "'.");
            }
        };
        /*
            Check number of navigationItems which match both searchValue and matchKind,
            if a filename is passed in, limit the results to that file.
            Report an error if expected value and actual value do not match.
        */
        TestState.prototype.verifyNavigationItemsCount = function (expected, searchValue, matchKind, fileName) {
            var items = this.languageService.getNavigateToItems(searchValue, /*maxResultCount*/ undefined, fileName);
            var actual = 0;
            // Count only the match that match the same MatchKind
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (!matchKind || item.matchKind === matchKind) {
                    actual++;
                }
            }
            if (expected !== actual) {
                this.raiseError("verifyNavigationItemsCount failed - found: " + actual + " navigation items, expected: " + expected + ".");
            }
        };
        /*
            Verify that returned navigationItems from getNavigateToItems have matched searchValue, matchKind, and kind.
            Report an error if getNavigateToItems does not find any matched searchValue.
        */
        TestState.prototype.verifyNavigationItemsListContains = function (name, kind, searchValue, matchKind, fileName, parentName) {
            var items = this.languageService.getNavigateToItems(searchValue);
            if (!items || items.length === 0) {
                this.raiseError("verifyNavigationItemsListContains failed - found 0 navigation items, expected at least one.");
            }
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var item = items_2[_i];
                if (item && item.name === name && item.kind === kind &&
                    (matchKind === undefined || item.matchKind === matchKind) &&
                    (fileName === undefined || item.fileName === fileName) &&
                    (parentName === undefined || item.containerName === parentName)) {
                    return;
                }
            }
            // if there was an explicit match kind specified, then it should be validated.
            if (matchKind !== undefined) {
                var missingItem = { name: name, kind: kind, searchValue: searchValue, matchKind: matchKind, fileName: fileName, parentName: parentName };
                this.raiseError("verifyNavigationItemsListContains failed - could not find the item: " + stringify(missingItem) + " in the returned list: (" + stringify(items) + ")");
            }
        };
        TestState.prototype.verifyNavigationBar = function (json, options) {
            this.verifyNavigationTreeOrBar(json, this.languageService.getNavigationBarItems(this.activeFile.fileName), "Bar", options);
        };
        TestState.prototype.verifyNavigationTree = function (json, options) {
            this.verifyNavigationTreeOrBar(json, this.languageService.getNavigationTree(this.activeFile.fileName), "Tree", options);
        };
        TestState.prototype.verifyNavigationTreeOrBar = function (json, tree, name, options) {
            if (JSON.stringify(tree, replacer) !== JSON.stringify(json)) {
                this.raiseError("verifyNavigation" + name + " failed - expected: " + stringify(json) + ", got: " + stringify(tree, replacer));
            }
            function replacer(key, value) {
                switch (key) {
                    case "spans":
                    case "nameSpan":
                        return options && options.checkSpans ? value : undefined;
                    case "start":
                    case "length":
                        // Never omit the values in a span, even if they are 0.
                        return value;
                    case "childItems":
                        return !value || value.length === 0 ? undefined : value;
                    default:
                        // Omit falsy values, those are presumed to be the default.
                        return value || undefined;
                }
            }
        };
        TestState.prototype.printNavigationItems = function (searchValue) {
            var items = this.languageService.getNavigateToItems(searchValue);
            Harness.IO.log("NavigationItems list (" + items.length + " items)");
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var item = items_3[_i];
                Harness.IO.log("name: " + item.name + ", kind: " + item.kind + ", parentName: " + item.containerName + ", fileName: " + item.fileName);
            }
        };
        TestState.prototype.printNavigationBar = function () {
            var items = this.languageService.getNavigationBarItems(this.activeFile.fileName);
            Harness.IO.log("Navigation bar (" + items.length + " items)");
            for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
                var item = items_4[_i];
                Harness.IO.log(ts.repeatString(" ", item.indent) + "name: " + item.text + ", kind: " + item.kind + ", childItems: " + item.childItems.map(function (child) { return child.text; }));
            }
        };
        TestState.prototype.getOccurrencesAtCurrentPosition = function () {
            return this.languageService.getOccurrencesAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        };
        TestState.prototype.verifyOccurrencesAtPositionListContains = function (fileName, start, end, isWriteAccess) {
            var occurrences = this.getOccurrencesAtCurrentPosition();
            if (!occurrences || occurrences.length === 0) {
                return this.raiseError("verifyOccurrencesAtPositionListContains failed - found 0 references, expected at least one.");
            }
            for (var _i = 0, occurrences_1 = occurrences; _i < occurrences_1.length; _i++) {
                var occurrence = occurrences_1[_i];
                if (occurrence && occurrence.fileName === fileName && occurrence.textSpan.start === start && ts.textSpanEnd(occurrence.textSpan) === end) {
                    if (typeof isWriteAccess !== "undefined" && occurrence.isWriteAccess !== isWriteAccess) {
                        this.raiseError("verifyOccurrencesAtPositionListContains failed - item isWriteAccess value does not match, actual: " + occurrence.isWriteAccess + ", expected: " + isWriteAccess + ".");
                    }
                    return;
                }
            }
            var missingItem = { fileName: fileName, start: start, end: end, isWriteAccess: isWriteAccess };
            this.raiseError("verifyOccurrencesAtPositionListContains failed - could not find the item: " + stringify(missingItem) + " in the returned list: (" + stringify(occurrences) + ")");
        };
        TestState.prototype.verifyOccurrencesAtPositionListCount = function (expectedCount) {
            var occurrences = this.getOccurrencesAtCurrentPosition();
            var actualCount = occurrences ? occurrences.length : 0;
            if (expectedCount !== actualCount) {
                this.raiseError("verifyOccurrencesAtPositionListCount failed - actual: " + actualCount + ", expected:" + expectedCount);
            }
        };
        TestState.prototype.getDocumentHighlightsAtCurrentPosition = function (fileNamesToSearch) {
            var _this = this;
            var filesToSearch = fileNamesToSearch.map(function (name) { return ts.combinePaths(_this.basePath, name); });
            return this.languageService.getDocumentHighlights(this.activeFile.fileName, this.currentCaretPosition, filesToSearch);
        };
        TestState.prototype.verifyRangesAreOccurrences = function (isWriteAccess) {
            var ranges = this.getRanges();
            for (var _i = 0, ranges_3 = ranges; _i < ranges_3.length; _i++) {
                var r = ranges_3[_i];
                this.goToRangeStart(r);
                this.verifyOccurrencesAtPositionListCount(ranges.length);
                for (var _a = 0, ranges_4 = ranges; _a < ranges_4.length; _a++) {
                    var range = ranges_4[_a];
                    this.verifyOccurrencesAtPositionListContains(range.fileName, range.pos, range.end, isWriteAccess);
                }
            }
        };
        TestState.prototype.verifyRangesWithSameTextAreRenameLocations = function () {
            var _this = this;
            this.rangesByText().forEach(function (ranges) { return _this.verifyRangesAreRenameLocations(ranges); });
        };
        TestState.prototype.verifyRangesWithSameTextAreDocumentHighlights = function () {
            var _this = this;
            this.rangesByText().forEach(function (ranges) { return _this.verifyRangesAreDocumentHighlights(ranges, /*options*/ undefined); });
        };
        TestState.prototype.verifyDocumentHighlightsOf = function (startRange, ranges, options) {
            var fileNames = options && options.filesToSearch || unique(ranges, function (range) { return range.fileName; });
            this.goToRangeStart(startRange);
            this.verifyDocumentHighlights(ranges, fileNames);
        };
        TestState.prototype.verifyRangesAreDocumentHighlights = function (ranges, options) {
            ranges = ranges || this.getRanges();
            var fileNames = options && options.filesToSearch || unique(ranges, function (range) { return range.fileName; });
            for (var _i = 0, ranges_5 = ranges; _i < ranges_5.length; _i++) {
                var range = ranges_5[_i];
                this.goToRangeStart(range);
                this.verifyDocumentHighlights(ranges, fileNames);
            }
        };
        TestState.prototype.verifyNoDocumentHighlights = function (startRange) {
            this.goToRangeStart(startRange);
            var documentHighlights = this.getDocumentHighlightsAtCurrentPosition([this.activeFile.fileName]);
            var numHighlights = ts.length(documentHighlights);
            if (numHighlights > 0) {
                this.raiseError("verifyNoDocumentHighlights failed - unexpectedly got " + numHighlights + " highlights");
            }
        };
        TestState.prototype.verifyDocumentHighlights = function (expectedRanges, fileNames) {
            var _this = this;
            if (fileNames === void 0) { fileNames = [this.activeFile.fileName]; }
            fileNames = ts.map(fileNames, ts.normalizePath);
            var documentHighlights = this.getDocumentHighlightsAtCurrentPosition(fileNames) || [];
            for (var _i = 0, documentHighlights_1 = documentHighlights; _i < documentHighlights_1.length; _i++) {
                var dh = documentHighlights_1[_i];
                if (fileNames.indexOf(dh.fileName) === -1) {
                    this.raiseError("verifyDocumentHighlights failed - got highlights in unexpected file name " + dh.fileName);
                }
            }
            var _loop_9 = function (fileName) {
                var expectedRangesInFile = expectedRanges.filter(function (r) { return ts.normalizePath(r.fileName) === fileName; });
                var highlights = ts.find(documentHighlights, function (dh) { return dh.fileName === fileName; });
                var spansInFile = highlights ? highlights.highlightSpans.sort(function (s1, s2) { return s1.textSpan.start - s2.textSpan.start; }) : [];
                if (expectedRangesInFile.length !== spansInFile.length) {
                    this_4.raiseError("verifyDocumentHighlights failed - In " + fileName + ", expected " + expectedRangesInFile.length + " highlights, got " + spansInFile.length);
                }
                ts.zipWith(expectedRangesInFile, spansInFile, function (expectedRange, span) {
                    if (span.textSpan.start !== expectedRange.pos || ts.textSpanEnd(span.textSpan) !== expectedRange.end) {
                        _this.raiseError("verifyDocumentHighlights failed - span does not match, actual: " + stringify(span.textSpan) + ", expected: " + expectedRange.pos + "--" + expectedRange.end);
                    }
                });
            };
            var this_4 = this;
            for (var _a = 0, fileNames_1 = fileNames; _a < fileNames_1.length; _a++) {
                var fileName = fileNames_1[_a];
                _loop_9(fileName);
            }
        };
        TestState.prototype.verifyCodeFixAvailable = function (negative, expected) {
            assert(!negative || !expected);
            var codeFixes = this.getCodeFixes(this.activeFile.fileName);
            var actuals = codeFixes.map(function (fix) { return ({ description: fix.description, commands: fix.commands }); });
            this.assertObjectsEqual(actuals, negative ? ts.emptyArray : expected);
        };
        TestState.prototype.verifyApplicableRefactorAvailableAtMarker = function (negative, markerName) {
            var isAvailable = this.getApplicableRefactors(this.getMarkerByName(markerName).position).length > 0;
            if (negative && isAvailable) {
                this.raiseError("verifyApplicableRefactorAvailableAtMarker failed - expected no refactor at marker " + markerName + " but found some.");
            }
            if (!negative && !isAvailable) {
                this.raiseError("verifyApplicableRefactorAvailableAtMarker failed - expected a refactor at marker " + markerName + " but found none.");
            }
        };
        TestState.prototype.getSelection = function () {
            return {
                pos: this.currentCaretPosition,
                end: this.selectionEnd === -1 ? this.currentCaretPosition : this.selectionEnd
            };
        };
        TestState.prototype.verifyRefactorAvailable = function (negative, name, actionName) {
            var refactors = this.getApplicableRefactors(this.getSelection());
            refactors = refactors.filter(function (r) { return r.name === name && (actionName === undefined || r.actions.some(function (a) { return a.name === actionName; })); });
            var isAvailable = refactors.length > 0;
            if (negative) {
                if (isAvailable) {
                    this.raiseError("verifyApplicableRefactorAvailableForRange failed - expected no refactor but found: " + refactors.map(function (r) { return r.name; }).join(", "));
                }
            }
            else {
                if (!isAvailable) {
                    this.raiseError("verifyApplicableRefactorAvailableForRange failed - expected a refactor but found none.");
                }
                if (refactors.length > 1) {
                    this.raiseError(refactors.length + " available refactors both have name " + name + " and action " + actionName);
                }
            }
        };
        TestState.prototype.verifyRefactor = function (_a) {
            var name = _a.name, actionName = _a.actionName, refactors = _a.refactors;
            var actualRefactors = this.getApplicableRefactors(this.getSelection()).filter(function (r) { return r.name === name && r.actions.some(function (a) { return a.name === actionName; }); });
            this.assertObjectsEqual(actualRefactors, refactors);
        };
        TestState.prototype.verifyApplicableRefactorAvailableForRange = function (negative) {
            var ranges = this.getRanges();
            if (!(ranges && ranges.length === 1)) {
                throw new Error("Exactly one refactor range is allowed per test.");
            }
            var isAvailable = this.getApplicableRefactors(ts.first(ranges)).length > 0;
            if (negative && isAvailable) {
                this.raiseError("verifyApplicableRefactorAvailableForRange failed - expected no refactor but found some.");
            }
            if (!negative && !isAvailable) {
                this.raiseError("verifyApplicableRefactorAvailableForRange failed - expected a refactor but found none.");
            }
        };
        TestState.prototype.applyRefactor = function (_a) {
            var refactorName = _a.refactorName, actionName = _a.actionName, actionDescription = _a.actionDescription, newContentWithRenameMarker = _a.newContent;
            var range = this.getSelection();
            var refactors = this.getApplicableRefactors(range);
            var refactorsWithName = refactors.filter(function (r) { return r.name === refactorName; });
            if (refactorsWithName.length === 0) {
                this.raiseError("The expected refactor: " + refactorName + " is not available at the marker location.\nAvailable refactors: " + refactors.map(function (r) { return r.name; }));
            }
            var action = ts.firstDefined(refactorsWithName, function (refactor) { return refactor.actions.find(function (a) { return a.name === actionName; }); });
            if (!action) {
                throw this.raiseError("The expected action: " + actionName + " is not included in: " + ts.flatMap(refactorsWithName, function (r) { return r.actions.map(function (a) { return a.name; }); }));
            }
            if (action.description !== actionDescription) {
                this.raiseError("Expected action description to be " + JSON.stringify(actionDescription) + ", got: " + JSON.stringify(action.description));
            }
            var editInfo = this.languageService.getEditsForRefactor(this.activeFile.fileName, this.formatCodeSettings, range, refactorName, actionName, ts.defaultPreferences);
            for (var _i = 0, _b = editInfo.edits; _i < _b.length; _i++) {
                var edit = _b[_i];
                this.applyEdits(edit.fileName, edit.textChanges, /*isFormattingEdit*/ false);
            }
            var _c = parseNewContent(), renamePosition = _c.renamePosition, newContent = _c.newContent;
            this.verifyCurrentFileContent(newContent);
            if (renamePosition === undefined) {
                if (editInfo.renameLocation !== undefined) {
                    this.raiseError("Did not expect a rename location, got " + editInfo.renameLocation);
                }
            }
            else {
                // TODO: test editInfo.renameFilename value
                assert.isDefined(editInfo.renameFilename);
                if (renamePosition !== editInfo.renameLocation) {
                    this.raiseError("Expected rename position of " + renamePosition + ", but got " + editInfo.renameLocation);
                }
            }
            function parseNewContent() {
                var renamePosition = newContentWithRenameMarker.indexOf("/*RENAME*/");
                if (renamePosition === -1) {
                    return { renamePosition: undefined, newContent: newContentWithRenameMarker };
                }
                else {
                    var newContent_1 = newContentWithRenameMarker.slice(0, renamePosition) + newContentWithRenameMarker.slice(renamePosition + "/*RENAME*/".length);
                    return { renamePosition: renamePosition, newContent: newContent_1 };
                }
            }
        };
        TestState.prototype.noMoveToNewFile = function () {
            for (var _i = 0, _a = this.getRanges(); _i < _a.length; _i++) {
                var range = _a[_i];
                for (var _b = 0, _c = this.getApplicableRefactors(range, { allowTextChangesInNewFiles: true }); _b < _c.length; _b++) {
                    var refactor = _c[_b];
                    if (refactor.name === "Move to a new file") {
                        ts.Debug.fail("Did not expect to get 'move to a new file' refactor");
                    }
                }
            }
        };
        TestState.prototype.moveToNewFile = function (options) {
            assert(this.getRanges().length === 1);
            var range = this.getRanges()[0];
            var refactor = ts.find(this.getApplicableRefactors(range, { allowTextChangesInNewFiles: true }), function (r) { return r.name === "Move to a new file"; });
            assert(refactor.actions.length === 1);
            var action = ts.first(refactor.actions);
            assert(action.name === "Move to a new file" && action.description === "Move to a new file");
            var editInfo = this.languageService.getEditsForRefactor(this.activeFile.fileName, this.formatCodeSettings, range, refactor.name, action.name, options.preferences || ts.defaultPreferences);
            this.testNewFileContents(editInfo.edits, options.newFileContents);
        };
        TestState.prototype.testNewFileContents = function (edits, newFileContents) {
            var _loop_10 = function (edit) {
                var newContent = newFileContents[edit.fileName];
                if (newContent === undefined) {
                    this_5.raiseError("There was an edit in " + edit.fileName + " but new content was not specified.");
                }
                if (this_5.testData.files.some(function (f) { return f.fileName === edit.fileName; })) {
                    this_5.applyEdits(edit.fileName, edit.textChanges, /*isFormattingEdit*/ false);
                    this_5.openFile(edit.fileName);
                    this_5.verifyCurrentFileContent(newContent);
                }
                else {
                    assert(edit.textChanges.length === 1);
                    var change = ts.first(edit.textChanges);
                    assert.deepEqual(change.span, ts.createTextSpan(0, 0));
                    assert.equal(change.newText, newContent, "Content for " + edit.fileName);
                }
            };
            var this_5 = this;
            for (var _i = 0, edits_1 = edits; _i < edits_1.length; _i++) {
                var edit = edits_1[_i];
                _loop_10(edit);
            }
            var _loop_11 = function (fileName) {
                assert(edits.some(function (e) { return e.fileName === fileName; }));
            };
            for (var fileName in newFileContents) {
                _loop_11(fileName);
            }
        };
        TestState.prototype.verifyFileAfterApplyingRefactorAtMarker = function (markerName, expectedContent, refactorNameToApply, actionName, formattingOptions) {
            formattingOptions = formattingOptions || this.formatCodeSettings;
            var markerPos = this.getMarkerByName(markerName).position;
            var applicableRefactors = this.languageService.getApplicableRefactors(this.activeFile.fileName, markerPos, ts.defaultPreferences);
            var applicableRefactorToApply = ts.find(applicableRefactors, function (refactor) { return refactor.name === refactorNameToApply; });
            if (!applicableRefactorToApply) {
                this.raiseError("The expected refactor: " + refactorNameToApply + " is not available at the marker location.");
            }
            var editInfo = this.languageService.getEditsForRefactor(this.activeFile.fileName, formattingOptions, markerPos, refactorNameToApply, actionName, ts.defaultPreferences);
            for (var _i = 0, _a = editInfo.edits; _i < _a.length; _i++) {
                var edit = _a[_i];
                this.applyEdits(edit.fileName, edit.textChanges, /*isFormattingEdit*/ false);
            }
            var actualContent = this.getFileContent(this.activeFile.fileName);
            if (actualContent !== expectedContent) {
                this.raiseError("verifyFileAfterApplyingRefactors failed:\n" + showTextDiff(expectedContent, actualContent));
            }
        };
        TestState.prototype.printAvailableCodeFixes = function () {
            var codeFixes = this.getCodeFixes(this.activeFile.fileName);
            Harness.IO.log(stringify(codeFixes));
        };
        // Get the text of the entire line the caret is currently at
        TestState.prototype.getCurrentLineContent = function () {
            var text = this.getFileContent(this.activeFile.fileName);
            var pos = this.currentCaretPosition;
            var startPos = pos, endPos = pos;
            while (startPos > 0) {
                var ch = text.charCodeAt(startPos - 1);
                if (ch === 13 /* carriageReturn */ || ch === 10 /* lineFeed */) {
                    break;
                }
                startPos--;
            }
            while (endPos < text.length) {
                var ch = text.charCodeAt(endPos);
                if (ch === 13 /* carriageReturn */ || ch === 10 /* lineFeed */) {
                    break;
                }
                endPos++;
            }
            return text.substring(startPos, endPos);
        };
        TestState.prototype.assertItemInCompletionList = function (items, entryId, text, documentation, kind, spanIndex, hasAction, options) {
            var _this = this;
            var eq = function (a, b, msg) {
                assert.deepEqual(a, b, _this.assertionMessageAtLastKnownMarker(msg + " for " + stringify(entryId)));
            };
            var matchingItems = items.filter(function (item) { return item.name === entryId.name && item.source === entryId.source; });
            if (matchingItems.length === 0) {
                var itemsString = items.map(function (item) { return stringify({ name: item.name, source: item.source, kind: item.kind }); }).join(",\n");
                this.raiseError("Expected \"" + stringify({ entryId: entryId, text: text, documentation: documentation, kind: kind }) + "\" to be in list [" + itemsString + "]");
            }
            else if (matchingItems.length > 1) {
                this.raiseError("Found duplicate completion items for " + stringify(entryId));
            }
            var item = matchingItems[0];
            if (documentation !== undefined || text !== undefined || entryId.source !== undefined) {
                var details = this.getCompletionEntryDetails(item.name, item.source);
                if (documentation !== undefined) {
                    eq(ts.displayPartsToString(details.documentation), documentation, "completion item documentation");
                }
                if (text !== undefined) {
                    eq(ts.displayPartsToString(details.displayParts), text, "completion item detail text");
                }
                if (entryId.source === undefined) {
                    eq(options && options.sourceDisplay, /*b*/ undefined, "source display");
                }
                else {
                    eq(details.source, [ts.textPart(options.sourceDisplay)], "source display");
                }
            }
            if (kind !== undefined) {
                if (typeof kind === "string") {
                    eq(item.kind, kind, "completion item kind");
                }
                else {
                    if (kind.kind) {
                        eq(item.kind, kind.kind, "completion item kind");
                    }
                    if (kind.kindModifiers !== undefined) {
                        eq(item.kindModifiers, kind.kindModifiers, "completion item kindModifiers");
                    }
                }
            }
            if (spanIndex !== undefined) {
                var span = this.getTextSpanForRangeAtIndex(spanIndex);
                assert.isTrue(TestState.textSpansEqual(span, item.replacementSpan), this.assertionMessageAtLastKnownMarker(stringify(span) + " does not equal " + stringify(item.replacementSpan) + " replacement span for " + stringify(entryId)));
            }
            eq(item.hasAction, hasAction, "hasAction");
            eq(item.isRecommended, options && options.isRecommended, "isRecommended");
            eq(item.insertText, options && options.insertText, "insertText");
            eq(item.replacementSpan, options && options.replacementSpan && ts.createTextSpanFromRange(options.replacementSpan), "replacementSpan");
        };
        TestState.prototype.findFile = function (indexOrName) {
            if (typeof indexOrName === "number") {
                var index = indexOrName;
                if (index >= this.testData.files.length) {
                    throw new Error("File index (" + index + ") in openFile was out of range. There are only " + this.testData.files.length + " files in this test.");
                }
                else {
                    return this.testData.files[index];
                }
            }
            else if (ts.isString(indexOrName)) {
                var name_1 = ts.normalizePath(indexOrName);
                // names are stored in the compiler with this relative path, this allows people to use goTo.file on just the fileName
                name_1 = name_1.indexOf("/") === -1 ? (this.basePath + "/" + name_1) : name_1;
                var availableNames_1 = [];
                var result = ts.forEach(this.testData.files, function (file) {
                    var fn = ts.normalizePath(file.fileName);
                    if (fn) {
                        if (fn === name_1) {
                            return file;
                        }
                        availableNames_1.push(fn);
                    }
                });
                if (!result) {
                    throw new Error("No test file named \"" + name_1 + "\" exists. Available file names are: " + availableNames_1.join(", "));
                }
                return result;
            }
            else {
                return ts.Debug.assertNever(indexOrName);
            }
        };
        TestState.prototype.getLineColStringAtPosition = function (position) {
            var pos = this.languageServiceAdapterHost.positionToLineAndCharacter(this.activeFile.fileName, position);
            return "line " + (pos.line + 1) + ", col " + pos.character;
        };
        TestState.prototype.getTextSpanForRangeAtIndex = function (index) {
            var ranges = this.getRanges();
            if (ranges.length > index) {
                return ts.createTextSpanFromRange(ranges[index]);
            }
            else {
                throw this.raiseError("Supplied span index: " + index + " does not exist in range list of size: " + ranges.length);
            }
        };
        TestState.prototype.getMarkerByName = function (markerName) {
            var markerPos = this.testData.markerPositions.get(markerName);
            if (markerPos === undefined) {
                throw new Error("Unknown marker \"" + markerName + "\" Available markers: " + this.getMarkerNames().map(function (m) { return "\"" + m + "\""; }).join(", "));
            }
            else {
                return markerPos;
            }
        };
        TestState.prototype.setCancelled = function (numberOfCalls) {
            this.cancellationToken.setCancelled(numberOfCalls);
        };
        TestState.prototype.resetCancelled = function () {
            this.cancellationToken.resetCancelled();
        };
        TestState.textSpansEqual = function (a, b) {
            return !!a && !!b && a.start === b.start && a.length === b.length;
        };
        TestState.prototype.getEditsForFileRename = function (options) {
            var changes = this.languageService.getEditsForFileRename(options.oldPath, options.newPath, this.formatCodeSettings, ts.defaultPreferences);
            this.testNewFileContents(changes, options.newFileContents);
        };
        TestState.prototype.getApplicableRefactors = function (positionOrRange, preferences) {
            if (preferences === void 0) { preferences = ts.defaultPreferences; }
            return this.languageService.getApplicableRefactors(this.activeFile.fileName, positionOrRange, preferences) || ts.emptyArray;
        };
        return TestState;
    }());
    FourSlash.TestState = TestState;
    function runFourSlashTest(basePath, testType, fileName) {
        var content = Harness.IO.readFile(fileName);
        runFourSlashTestContent(basePath, testType, content, fileName);
    }
    FourSlash.runFourSlashTest = runFourSlashTest;
    function runFourSlashTestContent(basePath, testType, content, fileName) {
        // Give file paths an absolute path for the virtual file system
        var absoluteBasePath = ts.combinePaths(Harness.virtualFileSystemRoot, basePath);
        var absoluteFileName = ts.combinePaths(Harness.virtualFileSystemRoot, fileName);
        // Parse out the files and their metadata
        var testData = parseTestData(absoluteBasePath, content, absoluteFileName);
        var state = new TestState(absoluteBasePath, testType, testData);
        var output = ts.transpileModule(content, { reportDiagnostics: true });
        if (output.diagnostics.length > 0) {
            throw new Error("Syntax error in " + absoluteBasePath + ": " + output.diagnostics[0].messageText);
        }
        runCode(output.outputText, state);
    }
    FourSlash.runFourSlashTestContent = runFourSlashTestContent;
    function runCode(code, state) {
        // Compile and execute the test
        var wrappedCode = "(function(test, goTo, verify, edit, debug, format, cancellation, classification, verifyOperationIsCancelled) {\n" + code + "\n})";
        try {
            var test_1 = new FourSlashInterface.Test(state);
            var goTo = new FourSlashInterface.GoTo(state);
            var verify = new FourSlashInterface.Verify(state);
            var edit = new FourSlashInterface.Edit(state);
            var debug = new FourSlashInterface.Debug(state);
            var format = new FourSlashInterface.Format(state);
            var cancellation = new FourSlashInterface.Cancellation(state);
            var f = eval(wrappedCode);
            f(test_1, goTo, verify, edit, debug, format, cancellation, FourSlashInterface.Classification, verifyOperationIsCancelled);
        }
        catch (err) {
            throw err;
        }
    }
    function chompLeadingSpace(content) {
        var lines = content.split("\n");
        for (var _i = 0, lines_4 = lines; _i < lines_4.length; _i++) {
            var line = lines_4[_i];
            if ((line.length !== 0) && (line.charAt(0) !== " ")) {
                return content;
            }
        }
        return lines.map(function (s) { return s.substr(1); }).join("\n");
    }
    function parseTestData(basePath, contents, fileName) {
        // Regex for parsing options in the format "@Alpha: Value of any sort"
        var optionRegex = /^\s*@(\w+): (.*)\s*/;
        // List of all the subfiles we've parsed out
        var files = [];
        // Global options
        var globalOptions = {};
        // Marker positions
        // Split up the input file by line
        // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
        // we have to string-based splitting instead and try to figure out the delimiting chars
        var lines = contents.split("\n");
        var markerPositions = ts.createMap();
        var markers = [];
        var ranges = [];
        // Stuff related to the subfile we're parsing
        var currentFileContent;
        var currentFileName = fileName;
        var currentFileSymlinks;
        var currentFileOptions = {};
        function nextFile() {
            if (currentFileContent === undefined)
                return;
            var file = parseFileContent(currentFileContent, currentFileName, markerPositions, markers, ranges);
            file.fileOptions = currentFileOptions;
            file.symlinks = currentFileSymlinks;
            // Store result file
            files.push(file);
            currentFileContent = undefined;
            currentFileOptions = {};
            currentFileName = fileName;
            currentFileSymlinks = undefined;
        }
        for (var _i = 0, lines_5 = lines; _i < lines_5.length; _i++) {
            var line = lines_5[_i];
            if (line.length > 0 && line.charAt(line.length - 1) === "\r") {
                line = line.substr(0, line.length - 1);
            }
            if (line.substr(0, 4) === "////") {
                var text = line.substr(4);
                currentFileContent = currentFileContent === undefined ? text : currentFileContent + "\n" + text;
            }
            else if (line.substr(0, 2) === "//") {
                // Comment line, check for global/file @options and record them
                var match = optionRegex.exec(line.substr(2));
                if (match) {
                    var _a = match.slice(1), key = _a[0], value = _a[1];
                    if (!ts.contains(fileMetadataNames, key)) {
                        // Check if the match is already existed in the global options
                        if (globalOptions[key] !== undefined) {
                            throw new Error("Global option '" + key + "' already exists");
                        }
                        globalOptions[key] = value;
                    }
                    else {
                        switch (key) {
                            case "Filename" /* fileName */:
                                // Found an @FileName directive, if this is not the first then create a new subfile
                                nextFile();
                                currentFileName = ts.isRootedDiskPath(value) ? value : basePath + "/" + value;
                                currentFileOptions[key] = value;
                                break;
                            case "Symlink" /* symlink */:
                                currentFileSymlinks = ts.append(currentFileSymlinks, value);
                                break;
                            default:
                                // Add other fileMetadata flag
                                currentFileOptions[key] = value;
                        }
                    }
                }
            }
            // Previously blank lines between fourslash content caused it to be considered as 2 files,
            // Remove this behavior since it just causes errors now
            else if (line !== "") {
                // Code line, terminate current subfile if there is one
                nextFile();
            }
        }
        // @Filename is the only directive that can be used in a test that contains tsconfig.json file.
        var config = ts.find(files, isConfig);
        if (config) {
            var directive = getNonFileNameOptionInFileList(files);
            if (!directive) {
                directive = getNonFileNameOptionInObject(globalOptions);
            }
            if (directive) {
                throw Error("It is not allowed to use " + config.fileName + " along with directive '" + directive + "'");
            }
        }
        return {
            markerPositions: markerPositions,
            markers: markers,
            globalOptions: globalOptions,
            files: files,
            ranges: ranges
        };
    }
    function isConfig(file) {
        return Harness.getConfigNameFromFileName(file.fileName) !== undefined;
    }
    function getNonFileNameOptionInFileList(files) {
        return ts.forEach(files, function (f) { return getNonFileNameOptionInObject(f.fileOptions); });
    }
    function getNonFileNameOptionInObject(optionObject) {
        for (var option in optionObject) {
            if (option !== "Filename" /* fileName */) {
                return option;
            }
        }
        return undefined;
    }
    var State;
    (function (State) {
        State[State["none"] = 0] = "none";
        State[State["inSlashStarMarker"] = 1] = "inSlashStarMarker";
        State[State["inObjectMarker"] = 2] = "inObjectMarker";
    })(State || (State = {}));
    function reportError(fileName, line, col, message) {
        var errorMessage = fileName + "(" + line + "," + col + "): " + message;
        throw new Error(errorMessage);
    }
    function recordObjectMarker(fileName, location, text, markerMap, markers) {
        var markerValue;
        try {
            // Attempt to parse the marker value as JSON
            markerValue = JSON.parse("{ " + text + " }");
        }
        catch (e) {
            reportError(fileName, location.sourceLine, location.sourceColumn, "Unable to parse marker text " + e.message);
        }
        if (markerValue === undefined) {
            reportError(fileName, location.sourceLine, location.sourceColumn, "Object markers can not be empty");
            return undefined;
        }
        var marker = {
            fileName: fileName,
            position: location.position,
            data: markerValue
        };
        // Object markers can be anonymous
        if (markerValue.name) {
            markerMap.set(markerValue.name, marker);
        }
        markers.push(marker);
        return marker;
    }
    function recordMarker(fileName, location, name, markerMap, markers) {
        var marker = {
            fileName: fileName,
            position: location.position
        };
        // Verify markers for uniqueness
        if (markerMap.has(name)) {
            var message = "Marker '" + name + "' is duplicated in the source file contents.";
            reportError(marker.fileName, location.sourceLine, location.sourceColumn, message);
            return undefined;
        }
        else {
            markerMap.set(name, marker);
            markers.push(marker);
            return marker;
        }
    }
    function parseFileContent(content, fileName, markerMap, markers, ranges) {
        content = chompLeadingSpace(content);
        // Any slash-star comment with a character not in this string is not a marker.
        var validMarkerChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$1234567890_";
        /// The file content (minus metacharacters) so far
        var output = "";
        /// The current marker (or maybe multi-line comment?) we're parsing, possibly
        var openMarker;
        /// A stack of the open range markers that are still unclosed
        var openRanges = [];
        /// A list of ranges we've collected so far */
        var localRanges = [];
        /// The latest position of the start of an unflushed plain text area
        var lastNormalCharPosition = 0;
        /// The total number of metacharacters removed from the file (so far)
        var difference = 0;
        /// The fourslash file state object we are generating
        var state = 0 /* none */;
        /// Current position data
        var line = 1;
        var column = 1;
        var flush = function (lastSafeCharIndex) {
            output = output + content.substr(lastNormalCharPosition, lastSafeCharIndex === undefined ? undefined : lastSafeCharIndex - lastNormalCharPosition);
        };
        if (content.length > 0) {
            var previousChar = content.charAt(0);
            for (var i = 1; i < content.length; i++) {
                var currentChar = content.charAt(i);
                switch (state) {
                    case 0 /* none */:
                        if (previousChar === "[" && currentChar === "|") {
                            // found a range start
                            openRanges.push({
                                position: (i - 1) - difference,
                                sourcePosition: i - 1,
                                sourceLine: line,
                                sourceColumn: column,
                            });
                            // copy all text up to marker position
                            flush(i - 1);
                            lastNormalCharPosition = i + 1;
                            difference += 2;
                        }
                        else if (previousChar === "|" && currentChar === "]") {
                            // found a range end
                            var rangeStart = openRanges.pop();
                            if (!rangeStart) {
                                throw reportError(fileName, line, column, "Found range end with no matching start.");
                            }
                            var range = {
                                fileName: fileName,
                                pos: rangeStart.position,
                                end: (i - 1) - difference,
                                marker: rangeStart.marker
                            };
                            localRanges.push(range);
                            // copy all text up to range marker position
                            flush(i - 1);
                            lastNormalCharPosition = i + 1;
                            difference += 2;
                        }
                        else if (previousChar === "/" && currentChar === "*") {
                            // found a possible marker start
                            state = 1 /* inSlashStarMarker */;
                            openMarker = {
                                position: (i - 1) - difference,
                                sourcePosition: i - 1,
                                sourceLine: line,
                                sourceColumn: column,
                            };
                        }
                        else if (previousChar === "{" && currentChar === "|") {
                            // found an object marker start
                            state = 2 /* inObjectMarker */;
                            openMarker = {
                                position: (i - 1) - difference,
                                sourcePosition: i - 1,
                                sourceLine: line,
                                sourceColumn: column,
                            };
                            flush(i - 1);
                        }
                        break;
                    case 2 /* inObjectMarker */:
                        // Object markers are only ever terminated by |} and have no content restrictions
                        if (previousChar === "|" && currentChar === "}") {
                            // Record the marker
                            var objectMarkerNameText = content.substring(openMarker.sourcePosition + 2, i - 1).trim();
                            var marker = recordObjectMarker(fileName, openMarker, objectMarkerNameText, markerMap, markers);
                            if (openRanges.length > 0) {
                                openRanges[openRanges.length - 1].marker = marker;
                            }
                            // Set the current start to point to the end of the current marker to ignore its text
                            lastNormalCharPosition = i + 1;
                            difference += i + 1 - openMarker.sourcePosition;
                            // Reset the state
                            openMarker = undefined;
                            state = 0 /* none */;
                        }
                        break;
                    case 1 /* inSlashStarMarker */:
                        if (previousChar === "*" && currentChar === "/") {
                            // Record the marker
                            // start + 2 to ignore the */, -1 on the end to ignore the * (/ is next)
                            var markerNameText = content.substring(openMarker.sourcePosition + 2, i - 1).trim();
                            var marker = recordMarker(fileName, openMarker, markerNameText, markerMap, markers);
                            if (openRanges.length > 0) {
                                openRanges[openRanges.length - 1].marker = marker;
                            }
                            // Set the current start to point to the end of the current marker to ignore its text
                            flush(openMarker.sourcePosition);
                            lastNormalCharPosition = i + 1;
                            difference += i + 1 - openMarker.sourcePosition;
                            // Reset the state
                            openMarker = undefined;
                            state = 0 /* none */;
                        }
                        else if (validMarkerChars.indexOf(currentChar) < 0) {
                            if (currentChar === "*" && i < content.length - 1 && content.charAt(i + 1) === "/") {
                                // The marker is about to be closed, ignore the 'invalid' char
                            }
                            else {
                                // We've hit a non-valid marker character, so we were actually in a block comment
                                // Bail out the text we've gathered so far back into the output
                                flush(i);
                                lastNormalCharPosition = i;
                                openMarker = undefined;
                                state = 0 /* none */;
                            }
                        }
                        break;
                }
                if (currentChar === "\n" && previousChar === "\r") {
                    // Ignore trailing \n after a \r
                    continue;
                }
                else if (currentChar === "\n" || currentChar === "\r") {
                    line++;
                    column = 1;
                    continue;
                }
                column++;
                previousChar = currentChar;
            }
        }
        // Add the remaining text
        flush(/*lastSafeCharIndex*/ undefined);
        if (openRanges.length > 0) {
            var openRange = openRanges[0];
            reportError(fileName, openRange.sourceLine, openRange.sourceColumn, "Unterminated range.");
        }
        if (openMarker) {
            reportError(fileName, openMarker.sourceLine, openMarker.sourceColumn, "Unterminated marker.");
        }
        // put ranges in the correct order
        localRanges = localRanges.sort(function (a, b) { return a.pos < b.pos ? -1 : 1; });
        localRanges.forEach(function (r) { ranges.push(r); });
        return {
            content: output,
            fileOptions: {},
            version: 0,
            fileName: fileName,
        };
    }
    function stringify(data, replacer) {
        return JSON.stringify(data, replacer, 2);
    }
    /** Collects an array of unique outputs. */
    function unique(inputs, getOutput) {
        var set = ts.createMap();
        for (var _i = 0, inputs_2 = inputs; _i < inputs_2.length; _i++) {
            var input = inputs_2[_i];
            var out = getOutput(input);
            set.set(out, true);
        }
        return ts.arrayFrom(set.keys());
    }
    function toArray(x) {
        return ts.isArray(x) ? x : [x];
    }
    function makeWhitespaceVisible(text) {
        return text.replace(/ /g, "\u00B7").replace(/\r/g, "\u00B6").replace(/\n/g, "\u2193\n").replace(/\t/g, "\u2192\   ");
    }
    function showTextDiff(expected, actual) {
        // Only show whitespace if the difference is whitespace-only.
        if (differOnlyByWhitespace(expected, actual)) {
            expected = makeWhitespaceVisible(expected);
            actual = makeWhitespaceVisible(actual);
        }
        return "Expected:\n" + expected + "\nActual:\n" + actual;
    }
    function differOnlyByWhitespace(a, b) {
        return stripWhitespace(a) === stripWhitespace(b);
    }
    function stripWhitespace(s) {
        return s.replace(/\s/g, "");
    }
    function findDuplicatedElement(a, equal) {
        for (var i = 0; i < a.length; i++) {
            for (var j = i + 1; j < a.length; j++) {
                if (equal(a[i], a[j])) {
                    return a[i];
                }
            }
        }
    }
})(FourSlash || (FourSlash = {}));
var FourSlashInterface;
(function (FourSlashInterface) {
    var Test = /** @class */ (function () {
        function Test(state) {
            this.state = state;
        }
        Test.prototype.markers = function () {
            return this.state.getMarkers();
        };
        Test.prototype.markerNames = function () {
            return this.state.getMarkerNames();
        };
        Test.prototype.marker = function (name) {
            return this.state.getMarkerByName(name);
        };
        Test.prototype.markerName = function (m) {
            return this.state.markerName(m);
        };
        Test.prototype.ranges = function () {
            return this.state.getRanges();
        };
        Test.prototype.spans = function () {
            return this.ranges().map(function (r) { return ts.createTextSpan(r.pos, r.end - r.pos); });
        };
        Test.prototype.rangesByText = function () {
            return this.state.rangesByText();
        };
        Test.prototype.markerByName = function (s) {
            return this.state.getMarkerByName(s);
        };
        Test.prototype.symbolsInScope = function (range) {
            return this.state.symbolsInScope(range);
        };
        Test.prototype.setTypesRegistry = function (map) {
            this.state.setTypesRegistry(map);
        };
        return Test;
    }());
    FourSlashInterface.Test = Test;
    var GoTo = /** @class */ (function () {
        function GoTo(state) {
            this.state = state;
        }
        // Moves the caret to the specified marker,
        // or the anonymous marker ('/**/') if no name
        // is given
        GoTo.prototype.marker = function (name) {
            this.state.goToMarker(name);
        };
        GoTo.prototype.eachMarker = function (a, b) {
            var _this = this;
            var markers = typeof a === "function" ? this.state.getMarkers() : a.map(function (m) { return _this.state.getMarkerByName(m); });
            this.state.goToEachMarker(markers, typeof a === "function" ? a : b);
        };
        GoTo.prototype.rangeStart = function (range) {
            this.state.goToRangeStart(range);
        };
        GoTo.prototype.eachRange = function (action) {
            this.state.goToEachRange(action);
        };
        GoTo.prototype.bof = function () {
            this.state.goToBOF();
        };
        GoTo.prototype.eof = function () {
            this.state.goToEOF();
        };
        GoTo.prototype.implementation = function () {
            this.state.goToImplementation();
        };
        GoTo.prototype.position = function (position, fileNameOrIndex) {
            if (fileNameOrIndex !== undefined) {
                this.file(fileNameOrIndex);
            }
            this.state.goToPosition(position);
        };
        // Opens a file, given either its index as it
        // appears in the test source, or its filename
        // as specified in the test metadata
        GoTo.prototype.file = function (indexOrName, content, scriptKindName) {
            this.state.openFile(indexOrName, content, scriptKindName);
        };
        GoTo.prototype.select = function (startMarker, endMarker) {
            this.state.select(startMarker, endMarker);
        };
        GoTo.prototype.selectRange = function (range) {
            this.state.selectRange(range);
        };
        return GoTo;
    }());
    FourSlashInterface.GoTo = GoTo;
    var VerifyNegatable = /** @class */ (function () {
        function VerifyNegatable(state, negative) {
            if (negative === void 0) { negative = false; }
            this.state = state;
            this.negative = negative;
            this.allowedClassElementKeywords = [
                "public",
                "private",
                "protected",
                "static",
                "abstract",
                "readonly",
                "get",
                "set",
                "constructor",
                "async"
            ];
            this.allowedConstructorParameterKeywords = [
                "public",
                "private",
                "protected",
                "readonly",
            ];
            if (!negative) {
                this.not = new VerifyNegatable(state, true);
            }
        }
        VerifyNegatable.prototype.completionListCount = function (expectedCount) {
            this.state.verifyCompletionListCount(expectedCount, this.negative);
        };
        // Verifies the completion list contains the specified symbol. The
        // completion list is brought up if necessary
        VerifyNegatable.prototype.completionListContains = function (entryId, text, documentation, kind, spanIndex, hasAction, options) {
            if (typeof entryId === "string") {
                entryId = { name: entryId, source: undefined };
            }
            if (this.negative) {
                this.state.verifyCompletionListDoesNotContain(entryId, text, documentation, kind, spanIndex, options);
            }
            else {
                this.state.verifyCompletionListContains(entryId, text, documentation, kind, spanIndex, hasAction, options);
            }
        };
        // Verifies the completion list items count to be greater than the specified amount. The
        // completion list is brought up if necessary
        VerifyNegatable.prototype.completionListItemsCountIsGreaterThan = function (count) {
            this.state.verifyCompletionListItemsCountIsGreaterThan(count, this.negative);
        };
        VerifyNegatable.prototype.assertHasRanges = function (ranges) {
            assert(ranges.length !== 0, "Array of ranges is expected to be non-empty");
        };
        VerifyNegatable.prototype.completionListIsEmpty = function () {
            this.state.verifyCompletionListIsEmpty(this.negative);
        };
        VerifyNegatable.prototype.completionListContainsClassElementKeywords = function () {
            for (var _i = 0, _a = this.allowedClassElementKeywords; _i < _a.length; _i++) {
                var keyword = _a[_i];
                this.completionListContains(keyword, keyword, /*documentation*/ undefined, "keyword");
            }
        };
        VerifyNegatable.prototype.completionListContainsConstructorParameterKeywords = function () {
            for (var _i = 0, _a = this.allowedConstructorParameterKeywords; _i < _a.length; _i++) {
                var keyword = _a[_i];
                this.completionListContains(keyword, keyword, /*documentation*/ undefined, "keyword");
            }
        };
        VerifyNegatable.prototype.completionListIsGlobal = function (expected) {
            this.state.verifyCompletionListIsGlobal(expected);
        };
        VerifyNegatable.prototype.completionListAllowsNewIdentifier = function () {
            this.state.verifyCompletionListAllowsNewIdentifier(this.negative);
        };
        VerifyNegatable.prototype.noSignatureHelp = function () {
            var markers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                markers[_i] = arguments[_i];
            }
            this.state.verifyNoSignatureHelp(markers);
        };
        VerifyNegatable.prototype.signatureHelp = function () {
            var options = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                options[_i] = arguments[_i];
            }
            this.state.verifySignatureHelp(options);
        };
        VerifyNegatable.prototype.errorExistsBetweenMarkers = function (startMarker, endMarker) {
            this.state.verifyErrorExistsBetweenMarkers(startMarker, endMarker, !this.negative);
        };
        VerifyNegatable.prototype.errorExistsAfterMarker = function (markerName) {
            if (markerName === void 0) { markerName = ""; }
            this.state.verifyErrorExistsAfterMarker(markerName, !this.negative, /*after*/ true);
        };
        VerifyNegatable.prototype.errorExistsBeforeMarker = function (markerName) {
            if (markerName === void 0) { markerName = ""; }
            this.state.verifyErrorExistsAfterMarker(markerName, !this.negative, /*after*/ false);
        };
        VerifyNegatable.prototype.quickInfoExists = function () {
            this.state.verifyQuickInfoExists(this.negative);
        };
        VerifyNegatable.prototype.typeDefinitionCountIs = function (expectedCount) {
            this.state.verifyTypeDefinitionsCount(this.negative, expectedCount);
        };
        VerifyNegatable.prototype.implementationListIsEmpty = function () {
            this.state.verifyImplementationListIsEmpty(this.negative);
        };
        VerifyNegatable.prototype.isValidBraceCompletionAtPosition = function (openingBrace) {
            this.state.verifyBraceCompletionAtPosition(this.negative, openingBrace);
        };
        VerifyNegatable.prototype.jsxClosingTag = function (map) {
            this.state.verifyJsxClosingTag(map);
        };
        VerifyNegatable.prototype.isInCommentAtPosition = function (onlyMultiLineDiverges) {
            this.state.verifySpanOfEnclosingComment(this.negative, onlyMultiLineDiverges);
        };
        VerifyNegatable.prototype.codeFix = function (options) {
            this.state.verifyCodeFix(options);
        };
        VerifyNegatable.prototype.codeFixAvailable = function (options) {
            this.state.verifyCodeFixAvailable(this.negative, options);
        };
        VerifyNegatable.prototype.applicableRefactorAvailableAtMarker = function (markerName) {
            this.state.verifyApplicableRefactorAvailableAtMarker(this.negative, markerName);
        };
        VerifyNegatable.prototype.applicableRefactorAvailableForRange = function () {
            this.state.verifyApplicableRefactorAvailableForRange(this.negative);
        };
        VerifyNegatable.prototype.refactor = function (options) {
            this.state.verifyRefactor(options);
        };
        VerifyNegatable.prototype.refactorAvailable = function (name, actionName) {
            this.state.verifyRefactorAvailable(this.negative, name, actionName);
        };
        return VerifyNegatable;
    }());
    FourSlashInterface.VerifyNegatable = VerifyNegatable;
    var Verify = /** @class */ (function (_super) {
        __extends(Verify, _super);
        function Verify(state) {
            return _super.call(this, state) || this;
        }
        Verify.prototype.completionsAt = function (markerName, completions, options) {
            this.state.verifyCompletionsAt(markerName, completions, options);
        };
        Verify.prototype.completions = function () {
            var optionsArray = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                optionsArray[_i] = arguments[_i];
            }
            for (var _a = 0, optionsArray_1 = optionsArray; _a < optionsArray_1.length; _a++) {
                var options = optionsArray_1[_a];
                this.state.verifyCompletions(options);
            }
        };
        Verify.prototype.quickInfoIs = function (expectedText, expectedDocumentation) {
            this.state.verifyQuickInfoString(expectedText, expectedDocumentation);
        };
        Verify.prototype.quickInfoAt = function (markerName, expectedText, expectedDocumentation) {
            this.state.verifyQuickInfoAt(markerName, expectedText, expectedDocumentation);
        };
        Verify.prototype.quickInfos = function (namesAndTexts) {
            this.state.verifyQuickInfos(namesAndTexts);
        };
        Verify.prototype.caretAtMarker = function (markerName) {
            this.state.verifyCaretAtMarker(markerName);
        };
        Verify.prototype.indentationIs = function (numberOfSpaces) {
            this.state.verifyIndentationAtCurrentPosition(numberOfSpaces);
        };
        Verify.prototype.indentationAtPositionIs = function (fileName, position, numberOfSpaces, indentStyle, baseIndentSize) {
            if (indentStyle === void 0) { indentStyle = ts.IndentStyle.Smart; }
            if (baseIndentSize === void 0) { baseIndentSize = 0; }
            this.state.verifyIndentationAtPosition(fileName, position, numberOfSpaces, indentStyle, baseIndentSize);
        };
        Verify.prototype.textAtCaretIs = function (text) {
            this.state.verifyTextAtCaretIs(text);
        };
        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        Verify.prototype.eval = function (expr, value) {
            this.state.verifyEval(expr, value);
        };
        Verify.prototype.currentLineContentIs = function (text) {
            this.state.verifyCurrentLineContent(text);
        };
        Verify.prototype.currentFileContentIs = function (text) {
            this.state.verifyCurrentFileContent(text);
        };
        Verify.prototype.goToDefinitionIs = function (endMarkers) {
            this.state.verifyGoToDefinitionIs(endMarkers);
        };
        Verify.prototype.goToDefinition = function (arg0, endMarkerName) {
            this.state.verifyGoToDefinition(arg0, endMarkerName);
        };
        Verify.prototype.goToType = function (arg0, endMarkerName) {
            this.state.verifyGoToType(arg0, endMarkerName);
        };
        Verify.prototype.goToDefinitionForMarkers = function () {
            var markerNames = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                markerNames[_i] = arguments[_i];
            }
            this.state.verifyGoToDefinitionForMarkers(markerNames);
        };
        Verify.prototype.goToDefinitionName = function (name, containerName) {
            this.state.verifyGoToDefinitionName(name, containerName);
        };
        Verify.prototype.verifyGetEmitOutputForCurrentFile = function (expected) {
            this.state.verifyGetEmitOutputForCurrentFile(expected);
        };
        Verify.prototype.verifyGetEmitOutputContentsForCurrentFile = function (expected) {
            this.state.verifyGetEmitOutputContentsForCurrentFile(expected);
        };
        Verify.prototype.symbolAtLocation = function (startRange) {
            var declarationRanges = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                declarationRanges[_i - 1] = arguments[_i];
            }
            this.state.verifySymbolAtLocation(startRange, declarationRanges);
        };
        Verify.prototype.typeOfSymbolAtLocation = function (range, symbol, expected) {
            this.state.verifyTypeOfSymbolAtLocation(range, symbol, expected);
        };
        Verify.prototype.referenceGroups = function (starts, parts) {
            this.state.verifyReferenceGroups(starts, parts);
        };
        Verify.prototype.noReferences = function (markerNameOrRange) {
            this.state.verifyNoReferences(markerNameOrRange);
        };
        Verify.prototype.getReferencesForServerTest = function (expected) {
            this.state.verifyGetReferencesForServerTest(expected);
        };
        Verify.prototype.singleReferenceGroup = function (definition, ranges) {
            this.state.verifySingleReferenceGroup(definition, ranges);
        };
        Verify.prototype.findReferencesDefinitionDisplayPartsAtCaretAre = function (expected) {
            this.state.verifyDisplayPartsOfReferencedSymbol(expected);
        };
        Verify.prototype.noErrors = function () {
            this.state.verifyNoErrors();
        };
        Verify.prototype.numberOfErrorsInCurrentFile = function (expected) {
            this.state.verifyNumberOfErrorsInCurrentFile(expected);
        };
        Verify.prototype.baselineCurrentFileBreakpointLocations = function () {
            this.state.baselineCurrentFileBreakpointLocations();
        };
        Verify.prototype.baselineCurrentFileNameOrDottedNameSpans = function () {
            this.state.baselineCurrentFileNameOrDottedNameSpans();
        };
        Verify.prototype.baselineGetEmitOutput = function (insertResultsIntoVfs) {
            this.state.baselineGetEmitOutput(insertResultsIntoVfs);
        };
        Verify.prototype.baselineQuickInfo = function () {
            this.state.baselineQuickInfo();
        };
        Verify.prototype.nameOrDottedNameSpanTextIs = function (text) {
            this.state.verifyCurrentNameOrDottedNameSpanText(text);
        };
        Verify.prototype.outliningSpansInCurrentFile = function (spans, kind) {
            this.state.verifyOutliningSpans(spans, kind);
        };
        Verify.prototype.todoCommentsInCurrentFile = function (descriptors) {
            this.state.verifyTodoComments(descriptors, this.state.getRanges());
        };
        Verify.prototype.matchingBracePositionInCurrentFile = function (bracePosition, expectedMatchPosition) {
            this.state.verifyMatchingBracePosition(bracePosition, expectedMatchPosition);
        };
        Verify.prototype.noMatchingBracePositionInCurrentFile = function (bracePosition) {
            this.state.verifyNoMatchingBracePosition(bracePosition);
        };
        Verify.prototype.docCommentTemplateAt = function (marker, expectedOffset, expectedText) {
            this.state.goToMarker(marker);
            this.state.verifyDocCommentTemplate({ newText: expectedText.replace(/\r?\n/g, "\r\n"), caretOffset: expectedOffset });
        };
        Verify.prototype.noDocCommentTemplateAt = function (marker) {
            this.state.goToMarker(marker);
            this.state.verifyDocCommentTemplate(/*expected*/ undefined);
        };
        Verify.prototype.rangeAfterCodeFix = function (expectedText, includeWhiteSpace, errorCode, index) {
            this.state.verifyRangeAfterCodeFix(expectedText, includeWhiteSpace, errorCode, index);
        };
        Verify.prototype.codeFixAll = function (options) {
            this.state.verifyCodeFixAll(options);
        };
        Verify.prototype.fileAfterApplyingRefactorAtMarker = function (markerName, expectedContent, refactorNameToApply, actionName, formattingOptions) {
            this.state.verifyFileAfterApplyingRefactorAtMarker(markerName, expectedContent, refactorNameToApply, actionName, formattingOptions);
        };
        Verify.prototype.rangeIs = function (expectedText, includeWhiteSpace) {
            this.state.verifyRangeIs(expectedText, includeWhiteSpace);
        };
        Verify.prototype.getAndApplyCodeFix = function (errorCode, index) {
            this.state.getAndApplyCodeActions(errorCode, index);
        };
        Verify.prototype.applyCodeActionFromCompletion = function (markerName, options) {
            this.state.applyCodeActionFromCompletion(markerName, options);
        };
        Verify.prototype.importFixAtPosition = function (expectedTextArray, errorCode, preferences) {
            this.state.verifyImportFixAtPosition(expectedTextArray, errorCode, preferences);
        };
        Verify.prototype.navigationBar = function (json, options) {
            this.state.verifyNavigationBar(json, options);
        };
        Verify.prototype.navigationTree = function (json, options) {
            this.state.verifyNavigationTree(json, options);
        };
        Verify.prototype.navigationItemsListCount = function (count, searchValue, matchKind, fileName) {
            this.state.verifyNavigationItemsCount(count, searchValue, matchKind, fileName);
        };
        Verify.prototype.navigationItemsListContains = function (name, kind, searchValue, matchKind, fileName, parentName) {
            this.state.verifyNavigationItemsListContains(name, kind, searchValue, matchKind, fileName, parentName);
        };
        Verify.prototype.occurrencesAtPositionContains = function (range, isWriteAccess) {
            this.state.verifyOccurrencesAtPositionListContains(range.fileName, range.pos, range.end, isWriteAccess);
        };
        Verify.prototype.occurrencesAtPositionCount = function (expectedCount) {
            this.state.verifyOccurrencesAtPositionListCount(expectedCount);
        };
        Verify.prototype.rangesAreOccurrences = function (isWriteAccess) {
            this.state.verifyRangesAreOccurrences(isWriteAccess);
        };
        Verify.prototype.rangesWithSameTextAreRenameLocations = function () {
            this.state.verifyRangesWithSameTextAreRenameLocations();
        };
        Verify.prototype.rangesAreRenameLocations = function (options) {
            this.state.verifyRangesAreRenameLocations(options);
        };
        Verify.prototype.rangesAreDocumentHighlights = function (ranges, options) {
            this.state.verifyRangesAreDocumentHighlights(ranges, options);
        };
        Verify.prototype.rangesWithSameTextAreDocumentHighlights = function () {
            this.state.verifyRangesWithSameTextAreDocumentHighlights();
        };
        Verify.prototype.documentHighlightsOf = function (startRange, ranges, options) {
            this.state.verifyDocumentHighlightsOf(startRange, ranges, options);
        };
        Verify.prototype.noDocumentHighlights = function (startRange) {
            this.state.verifyNoDocumentHighlights(startRange);
        };
        Verify.prototype.completionEntryDetailIs = function (entryName, text, documentation, kind, tags) {
            this.state.verifyCompletionEntryDetails(entryName, text, documentation, kind, tags);
        };
        /**
         * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
         */
        Verify.prototype.syntacticClassificationsAre = function () {
            var classifications = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classifications[_i] = arguments[_i];
            }
            this.state.verifySyntacticClassifications(classifications);
        };
        /**
         * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
         */
        Verify.prototype.semanticClassificationsAre = function () {
            var classifications = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classifications[_i] = arguments[_i];
            }
            this.state.verifySemanticClassifications(classifications);
        };
        Verify.prototype.renameInfoSucceeded = function (displayName, fullDisplayName, kind, kindModifiers) {
            this.state.verifyRenameInfoSucceeded(displayName, fullDisplayName, kind, kindModifiers);
        };
        Verify.prototype.renameInfoFailed = function (message) {
            this.state.verifyRenameInfoFailed(message);
        };
        Verify.prototype.renameLocations = function (startRanges, options) {
            this.state.verifyRenameLocations(startRanges, options);
        };
        Verify.prototype.verifyQuickInfoDisplayParts = function (kind, kindModifiers, textSpan, displayParts, documentation, tags) {
            this.state.verifyQuickInfoDisplayParts(kind, kindModifiers, textSpan, displayParts, documentation, tags);
        };
        Verify.prototype.getSyntacticDiagnostics = function (expected) {
            this.state.getSyntacticDiagnostics(expected);
        };
        Verify.prototype.getSemanticDiagnostics = function (expected) {
            this.state.getSemanticDiagnostics(expected);
        };
        Verify.prototype.getSuggestionDiagnostics = function (expected) {
            this.state.getSuggestionDiagnostics(expected);
        };
        Verify.prototype.ProjectInfo = function (expected) {
            this.state.verifyProjectInfo(expected);
        };
        Verify.prototype.allRangesAppearInImplementationList = function (markerName) {
            this.state.verifyRangesInImplementationList(markerName);
        };
        Verify.prototype.getEditsForFileRename = function (options) {
            this.state.getEditsForFileRename(options);
        };
        Verify.prototype.moveToNewFile = function (options) {
            this.state.moveToNewFile(options);
        };
        Verify.prototype.noMoveToNewFile = function () {
            this.state.noMoveToNewFile();
        };
        return Verify;
    }(VerifyNegatable));
    FourSlashInterface.Verify = Verify;
    var Edit = /** @class */ (function () {
        function Edit(state) {
            this.state = state;
        }
        Edit.prototype.backspace = function (count) {
            this.state.deleteCharBehindMarker(count);
        };
        Edit.prototype.deleteAtCaret = function (times) {
            this.state.deleteChar(times);
        };
        Edit.prototype.replace = function (start, length, text) {
            this.state.replace(start, length, text);
        };
        Edit.prototype.paste = function (text) {
            this.state.paste(text);
        };
        Edit.prototype.insert = function (text) {
            this.insertLines(text);
        };
        Edit.prototype.insertLine = function (text) {
            this.insertLines(text + "\n");
        };
        Edit.prototype.insertLines = function () {
            var lines = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                lines[_i] = arguments[_i];
            }
            this.state.type(lines.join("\n"));
        };
        Edit.prototype.moveRight = function (count) {
            this.state.moveCaretRight(count);
        };
        Edit.prototype.moveLeft = function (count) {
            if (typeof count === "undefined") {
                count = 1;
            }
            this.state.moveCaretRight(count * -1);
        };
        Edit.prototype.enableFormatting = function () {
            this.state.enableFormatting = true;
        };
        Edit.prototype.disableFormatting = function () {
            this.state.enableFormatting = false;
        };
        Edit.prototype.applyRefactor = function (options) {
            this.state.applyRefactor(options);
        };
        return Edit;
    }());
    FourSlashInterface.Edit = Edit;
    var Debug = /** @class */ (function () {
        function Debug(state) {
            this.state = state;
        }
        Debug.prototype.printCurrentParameterHelp = function () {
            this.state.printCurrentParameterHelp();
        };
        Debug.prototype.printCurrentFileState = function () {
            this.state.printCurrentFileState(/*showWhitespace*/ false, /*makeCaretVisible*/ true);
        };
        Debug.prototype.printCurrentFileStateWithWhitespace = function () {
            this.state.printCurrentFileState(/*showWhitespace*/ true, /*makeCaretVisible*/ true);
        };
        Debug.prototype.printCurrentFileStateWithoutCaret = function () {
            this.state.printCurrentFileState(/*showWhitespace*/ false, /*makeCaretVisible*/ false);
        };
        Debug.prototype.printCurrentQuickInfo = function () {
            this.state.printCurrentQuickInfo();
        };
        Debug.prototype.printCurrentSignatureHelp = function () {
            this.state.printCurrentSignatureHelp();
        };
        Debug.prototype.printCompletionListMembers = function (options) {
            this.state.printCompletionListMembers(options);
        };
        Debug.prototype.printAvailableCodeFixes = function () {
            this.state.printAvailableCodeFixes();
        };
        Debug.prototype.printBreakpointLocation = function (pos) {
            this.state.printBreakpointLocation(pos);
        };
        Debug.prototype.printBreakpointAtCurrentLocation = function () {
            this.state.printBreakpointAtCurrentLocation();
        };
        Debug.prototype.printNameOrDottedNameSpans = function (pos) {
            this.state.printNameOrDottedNameSpans(pos);
        };
        Debug.prototype.printErrorList = function () {
            this.state.printErrorList();
        };
        Debug.prototype.printNavigationItems = function (searchValue) {
            if (searchValue === void 0) { searchValue = ".*"; }
            this.state.printNavigationItems(searchValue);
        };
        Debug.prototype.printNavigationBar = function () {
            this.state.printNavigationBar();
        };
        Debug.prototype.printContext = function () {
            this.state.printContext();
        };
        Debug.prototype.printOutliningSpans = function () {
            this.state.printOutliningSpans();
        };
        return Debug;
    }());
    FourSlashInterface.Debug = Debug;
    var Format = /** @class */ (function () {
        function Format(state) {
            this.state = state;
        }
        Format.prototype.document = function () {
            this.state.formatDocument();
        };
        Format.prototype.copyFormatOptions = function () {
            return this.state.copyFormatOptions();
        };
        Format.prototype.setFormatOptions = function (options) {
            return this.state.setFormatOptions(options);
        };
        Format.prototype.selection = function (startMarker, endMarker) {
            this.state.formatSelection(this.state.getMarkerByName(startMarker).position, this.state.getMarkerByName(endMarker).position);
        };
        Format.prototype.onType = function (posMarker, key) {
            this.state.formatOnType(this.state.getMarkerByName(posMarker).position, key);
        };
        Format.prototype.setOption = function (name, value) {
            this.state.formatCodeSettings[name] = value;
        };
        return Format;
    }());
    FourSlashInterface.Format = Format;
    var Cancellation = /** @class */ (function () {
        function Cancellation(state) {
            this.state = state;
        }
        Cancellation.prototype.resetCancelled = function () {
            this.state.resetCancelled();
        };
        Cancellation.prototype.setCancelled = function (numberOfCalls) {
            if (numberOfCalls === void 0) { numberOfCalls = 0; }
            this.state.setCancelled(numberOfCalls);
        };
        return Cancellation;
    }());
    FourSlashInterface.Cancellation = Cancellation;
    var Classification;
    (function (Classification) {
        function comment(text, position) {
            return getClassification("comment" /* comment */, text, position);
        }
        Classification.comment = comment;
        function identifier(text, position) {
            return getClassification("identifier" /* identifier */, text, position);
        }
        Classification.identifier = identifier;
        function keyword(text, position) {
            return getClassification("keyword" /* keyword */, text, position);
        }
        Classification.keyword = keyword;
        function numericLiteral(text, position) {
            return getClassification("number" /* numericLiteral */, text, position);
        }
        Classification.numericLiteral = numericLiteral;
        function operator(text, position) {
            return getClassification("operator" /* operator */, text, position);
        }
        Classification.operator = operator;
        function stringLiteral(text, position) {
            return getClassification("string" /* stringLiteral */, text, position);
        }
        Classification.stringLiteral = stringLiteral;
        function whiteSpace(text, position) {
            return getClassification("whitespace" /* whiteSpace */, text, position);
        }
        Classification.whiteSpace = whiteSpace;
        function text(text, position) {
            return getClassification("text" /* text */, text, position);
        }
        Classification.text = text;
        function punctuation(text, position) {
            return getClassification("punctuation" /* punctuation */, text, position);
        }
        Classification.punctuation = punctuation;
        function docCommentTagName(text, position) {
            return getClassification("doc comment tag name" /* docCommentTagName */, text, position);
        }
        Classification.docCommentTagName = docCommentTagName;
        function className(text, position) {
            return getClassification("class name" /* className */, text, position);
        }
        Classification.className = className;
        function enumName(text, position) {
            return getClassification("enum name" /* enumName */, text, position);
        }
        Classification.enumName = enumName;
        function interfaceName(text, position) {
            return getClassification("interface name" /* interfaceName */, text, position);
        }
        Classification.interfaceName = interfaceName;
        function moduleName(text, position) {
            return getClassification("module name" /* moduleName */, text, position);
        }
        Classification.moduleName = moduleName;
        function typeParameterName(text, position) {
            return getClassification("type parameter name" /* typeParameterName */, text, position);
        }
        Classification.typeParameterName = typeParameterName;
        function parameterName(text, position) {
            return getClassification("parameter name" /* parameterName */, text, position);
        }
        Classification.parameterName = parameterName;
        function typeAliasName(text, position) {
            return getClassification("type alias name" /* typeAliasName */, text, position);
        }
        Classification.typeAliasName = typeAliasName;
        function jsxOpenTagName(text, position) {
            return getClassification("jsx open tag name" /* jsxOpenTagName */, text, position);
        }
        Classification.jsxOpenTagName = jsxOpenTagName;
        function jsxCloseTagName(text, position) {
            return getClassification("jsx close tag name" /* jsxCloseTagName */, text, position);
        }
        Classification.jsxCloseTagName = jsxCloseTagName;
        function jsxSelfClosingTagName(text, position) {
            return getClassification("jsx self closing tag name" /* jsxSelfClosingTagName */, text, position);
        }
        Classification.jsxSelfClosingTagName = jsxSelfClosingTagName;
        function jsxAttribute(text, position) {
            return getClassification("jsx attribute" /* jsxAttribute */, text, position);
        }
        Classification.jsxAttribute = jsxAttribute;
        function jsxText(text, position) {
            return getClassification("jsx text" /* jsxText */, text, position);
        }
        Classification.jsxText = jsxText;
        function jsxAttributeStringLiteralValue(text, position) {
            return getClassification("jsx attribute string literal value" /* jsxAttributeStringLiteralValue */, text, position);
        }
        Classification.jsxAttributeStringLiteralValue = jsxAttributeStringLiteralValue;
        function getClassification(classificationType, text, position) {
            var textSpan = position === undefined ? undefined : { start: position, end: position + text.length };
            return { classificationType: classificationType, text: text, textSpan: textSpan };
        }
    })(Classification = FourSlashInterface.Classification || (FourSlashInterface.Classification = {}));
})(FourSlashInterface || (FourSlashInterface = {}));
var TypeWriterWalker = /** @class */ (function () {
    function TypeWriterWalker(program, fullTypeCheck) {
        this.program = program;
        // Consider getting both the diagnostics checker and the non-diagnostics checker to verify
        // they are consistent.
        this.checker = fullTypeCheck
            ? program.getDiagnosticsProducingTypeChecker()
            : program.getTypeChecker();
    }
    TypeWriterWalker.prototype.getSymbols = function (fileName) {
        var _a, sourceFile, gen, _b, done, value;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    sourceFile = this.program.getSourceFile(fileName);
                    this.currentSourceFile = sourceFile;
                    gen = this.visitNode(sourceFile, /*isSymbolWalk*/ true);
                    _b = gen.next(), done = _b.done, value = _b.value;
                    _c.label = 1;
                case 1:
                    if (!!done) return [3 /*break*/, 4];
                    return [4 /*yield*/, value];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _a = gen.next(), done = _a.done, value = _a.value, _a;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    TypeWriterWalker.prototype.getTypes = function (fileName) {
        var _a, sourceFile, gen, _b, done, value;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    sourceFile = this.program.getSourceFile(fileName);
                    this.currentSourceFile = sourceFile;
                    gen = this.visitNode(sourceFile, /*isSymbolWalk*/ false);
                    _b = gen.next(), done = _b.done, value = _b.value;
                    _c.label = 1;
                case 1:
                    if (!!done) return [3 /*break*/, 4];
                    return [4 /*yield*/, value];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _a = gen.next(), done = _a.done, value = _a.value, _a;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    TypeWriterWalker.prototype.visitNode = function (node, isSymbolWalk) {
        var _a, result, children, _i, children_1, child, gen, _b, done, value;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(ts.isExpressionNode(node) || node.kind === 71 /* Identifier */ || ts.isDeclarationName(node))) return [3 /*break*/, 2];
                    result = this.writeTypeOrSymbol(node, isSymbolWalk);
                    if (!result) return [3 /*break*/, 2];
                    return [4 /*yield*/, result];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2:
                    children = [];
                    ts.forEachChild(node, function (child) { return void children.push(child); });
                    _i = 0, children_1 = children;
                    _c.label = 3;
                case 3:
                    if (!(_i < children_1.length)) return [3 /*break*/, 8];
                    child = children_1[_i];
                    gen = this.visitNode(child, isSymbolWalk);
                    _b = gen.next(), done = _b.done, value = _b.value;
                    _c.label = 4;
                case 4:
                    if (!!done) return [3 /*break*/, 7];
                    return [4 /*yield*/, value];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _a = gen.next(), done = _a.done, value = _a.value, _a;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [2 /*return*/];
            }
        });
    };
    TypeWriterWalker.prototype.writeTypeOrSymbol = function (node, isSymbolWalk) {
        var actualPos = ts.skipTrivia(this.currentSourceFile.text, node.pos);
        var lineAndCharacter = this.currentSourceFile.getLineAndCharacterOfPosition(actualPos);
        var sourceText = ts.getSourceTextOfNodeFromSourceFile(this.currentSourceFile, node);
        if (!isSymbolWalk) {
            // Workaround to ensure we output 'C' instead of 'typeof C' for base class expressions
            // let type = this.checker.getTypeAtLocation(node);
            var type = node.parent && ts.isExpressionWithTypeArgumentsInClassExtendsClause(node.parent) && this.checker.getTypeAtLocation(node.parent) || this.checker.getTypeAtLocation(node);
            var typeString = type ? this.checker.typeToString(type, node.parent, 1 /* NoTruncation */ | 1048576 /* AllowUniqueESSymbolType */) : "No type information available!";
            return {
                line: lineAndCharacter.line,
                syntaxKind: node.kind,
                sourceText: sourceText,
                type: typeString
            };
        }
        var symbol = this.checker.getSymbolAtLocation(node);
        if (!symbol) {
            return;
        }
        var symbolString = "Symbol(" + this.checker.symbolToString(symbol, node.parent);
        if (symbol.declarations) {
            var count = 0;
            for (var _i = 0, _a = symbol.declarations; _i < _a.length; _i++) {
                var declaration = _a[_i];
                if (count >= 5) {
                    symbolString += " ... and " + (symbol.declarations.length - count) + " more";
                    break;
                }
                count++;
                symbolString += ", ";
                if (declaration.__symbolTestOutputCache) {
                    symbolString += declaration.__symbolTestOutputCache;
                    continue;
                }
                var declSourceFile = declaration.getSourceFile();
                var declLineAndCharacter = declSourceFile.getLineAndCharacterOfPosition(declaration.pos);
                var fileName = ts.getBaseFileName(declSourceFile.fileName);
                var isLibFile = /lib(.*)\.d\.ts/i.test(fileName);
                var declText = "Decl(" + fileName + ", " + (isLibFile ? "--" : declLineAndCharacter.line) + ", " + (isLibFile ? "--" : declLineAndCharacter.character) + ")";
                symbolString += declText;
                declaration.__symbolTestOutputCache = declText;
            }
        }
        symbolString += ")";
        return {
            line: lineAndCharacter.line,
            syntaxKind: node.kind,
            sourceText: sourceText,
            symbol: symbolString
        };
    };
    return TypeWriterWalker;
}());
var Playback;
(function (Playback) {
    var recordLog;
    var replayLog;
    var replayFilesRead;
    var recordLogFileNameBase = "";
    function memoize(func) {
        var lookup = {};
        var run = (function (s) {
            if (lookup.hasOwnProperty(s))
                return lookup[s];
            return lookup[s] = func(s);
        });
        run.reset = function () {
            lookup = undefined; // TODO: GH#18217
        };
        return run;
    }
    function createEmptyLog() {
        return {
            timestamp: (new Date()).toString(),
            arguments: [],
            currentDirectory: "",
            filesRead: [],
            directoriesRead: [],
            filesWritten: [],
            filesDeleted: [],
            filesAppended: [],
            fileExists: [],
            filesFound: [],
            dirs: [],
            dirExists: [],
            dirsCreated: [],
            pathsResolved: [],
            executingPath: ""
        };
    }
    function newStyleLogIntoOldStyleLog(log, host, baseName) {
        for (var _i = 0, _a = log.filesAppended; _i < _a.length; _i++) {
            var file = _a[_i];
            if (file.contentsPath) {
                file.contents = host.readFile(ts.combinePaths(baseName, file.contentsPath));
                delete file.contentsPath;
            }
        }
        for (var _b = 0, _c = log.filesWritten; _b < _c.length; _b++) {
            var file = _c[_b];
            if (file.contentsPath) {
                file.contents = host.readFile(ts.combinePaths(baseName, file.contentsPath));
                delete file.contentsPath;
            }
        }
        for (var _d = 0, _e = log.filesRead; _d < _e.length; _d++) {
            var file = _e[_d];
            var result = file.result; // TODO: GH#18217
            if (result.contentsPath) {
                // `readFile` strips away a BOM (and actually reinerprets the file contents according to the correct encoding)
                // - but this has the unfortunate sideeffect of removing the BOM from any outputs based on the file, so we readd it here.
                result.contents = (result.bom || "") + host.readFile(ts.combinePaths(baseName, result.contentsPath));
                delete result.contentsPath;
            }
        }
        return log;
    }
    Playback.newStyleLogIntoOldStyleLog = newStyleLogIntoOldStyleLog;
    var canonicalizeForHarness = ts.createGetCanonicalFileName(/*caseSensitive*/ false); // This is done so tests work on windows _and_ linux
    function sanitizeTestFilePath(name) {
        var path = ts.toPath(ts.normalizeSlashes(name.replace(/[\^<>:"|?*%]/g, "_")).replace(/\.\.\//g, "__dotdot/"), "", canonicalizeForHarness);
        if (ts.startsWith(path, "/")) {
            return path.substring(1);
        }
        return path;
    }
    function oldStyleLogIntoNewStyleLog(log, writeFile, baseTestName) {
        if (log.filesAppended) {
            for (var _i = 0, _a = log.filesAppended; _i < _a.length; _i++) {
                var file = _a[_i];
                if (file.contents !== undefined) {
                    file.contentsPath = ts.combinePaths("appended", sanitizeTestFilePath(file.path));
                    writeFile(ts.combinePaths(baseTestName, file.contentsPath), file.contents);
                    delete file.contents;
                }
            }
        }
        if (log.filesWritten) {
            for (var _b = 0, _c = log.filesWritten; _b < _c.length; _b++) {
                var file = _c[_b];
                if (file.contents !== undefined) {
                    file.contentsPath = ts.combinePaths("written", sanitizeTestFilePath(file.path));
                    writeFile(ts.combinePaths(baseTestName, file.contentsPath), file.contents);
                    delete file.contents;
                }
            }
        }
        if (log.filesRead) {
            for (var _d = 0, _e = log.filesRead; _d < _e.length; _d++) {
                var file = _e[_d];
                var result = file.result; // TODO: GH#18217
                var contents = result.contents;
                if (contents !== undefined) {
                    result.contentsPath = ts.combinePaths("read", sanitizeTestFilePath(file.path));
                    writeFile(ts.combinePaths(baseTestName, result.contentsPath), contents);
                    var len = contents.length;
                    if (len >= 2 && contents.charCodeAt(0) === 0xfeff) {
                        result.bom = "\ufeff";
                    }
                    if (len >= 2 && contents.charCodeAt(0) === 0xfffe) {
                        result.bom = "\ufffe";
                    }
                    if (len >= 3 && contents.charCodeAt(0) === 0xefbb && contents.charCodeAt(1) === 0xbf) {
                        result.bom = "\uefbb\xbf";
                    }
                    delete result.contents;
                }
            }
        }
        return log;
    }
    Playback.oldStyleLogIntoNewStyleLog = oldStyleLogIntoNewStyleLog;
    function initWrapper(wrapper, underlying) {
        ts.forEach(Object.keys(underlying), function (prop) {
            wrapper[prop] = underlying[prop];
        });
        wrapper.startReplayFromString = function (logString) {
            wrapper.startReplayFromData(JSON.parse(logString));
        };
        wrapper.startReplayFromData = function (log) {
            replayLog = log;
            // Remove non-found files from the log (shouldn't really need them, but we still record them for diagnostic purposes)
            replayLog.filesRead = replayLog.filesRead.filter(function (f) { return f.result.contents !== undefined; });
            replayFilesRead = ts.createMap();
            for (var _i = 0, _a = replayLog.filesRead; _i < _a.length; _i++) {
                var file = _a[_i];
                replayFilesRead.set(ts.normalizeSlashes(file.path).toLowerCase(), file);
            }
        };
        wrapper.endReplay = function () {
            replayLog = undefined;
            replayFilesRead = undefined;
        };
        wrapper.startRecord = function (fileNameBase) {
            recordLogFileNameBase = fileNameBase;
            recordLog = createEmptyLog();
            recordLog.useCaseSensitiveFileNames = typeof underlying.useCaseSensitiveFileNames === "function" ? underlying.useCaseSensitiveFileNames() : underlying.useCaseSensitiveFileNames;
            if (typeof underlying.args !== "function") {
                recordLog.arguments = underlying.args;
            }
        };
        wrapper.startReplayFromFile = function (logFn) {
            wrapper.startReplayFromString(underlying.readFile(logFn));
        };
        wrapper.endRecord = function () {
            if (recordLog !== undefined) {
                var i_1 = 0;
                var getBase = function () { return recordLogFileNameBase + i_1; };
                while (underlying.fileExists(ts.combinePaths(getBase(), "test.json")))
                    i_1++;
                var newLog = oldStyleLogIntoNewStyleLog(recordLog, function (path, str) { return underlying.writeFile(path, str); }, getBase());
                underlying.writeFile(ts.combinePaths(getBase(), "test.json"), JSON.stringify(newLog, null, 4)); // tslint:disable-line:no-null-keyword
                var syntheticTsconfig = generateTsconfig(newLog);
                if (syntheticTsconfig) {
                    underlying.writeFile(ts.combinePaths(getBase(), "tsconfig.json"), JSON.stringify(syntheticTsconfig, null, 4)); // tslint:disable-line:no-null-keyword
                }
                recordLog = undefined;
            }
        };
        function generateTsconfig(newLog) {
            if (newLog.filesRead.some(function (file) { return /tsconfig.+json$/.test(file.path); })) {
                return;
            }
            var files = [];
            for (var _i = 0, _a = newLog.filesRead; _i < _a.length; _i++) {
                var file = _a[_i];
                var result = file.result;
                if (result.contentsPath &&
                    Harness.isDefaultLibraryFile(result.contentsPath) &&
                    /\.[tj]s$/.test(result.contentsPath)) {
                    files.push(result.contentsPath);
                }
            }
            return { compilerOptions: ts.parseCommandLine(newLog.arguments).options, files: files };
        }
        wrapper.fileExists = recordReplay(wrapper.fileExists, underlying)(function (path) { return callAndRecord(underlying.fileExists(path), recordLog.fileExists, { path: path }); }, memoize(function (path) {
            // If we read from the file, it must exist
            if (findFileByPath(path, /*throwFileNotFoundError*/ false)) {
                return true;
            }
            else {
                return findResultByFields(replayLog.fileExists, { path: path }, /*defaultValue*/ false);
            }
        }));
        wrapper.getExecutingFilePath = function () {
            if (replayLog !== undefined) {
                return replayLog.executingPath;
            }
            else if (recordLog !== undefined) {
                return recordLog.executingPath = underlying.getExecutingFilePath();
            }
            else {
                return underlying.getExecutingFilePath();
            }
        };
        wrapper.getCurrentDirectory = function () {
            if (replayLog !== undefined) {
                return replayLog.currentDirectory || "";
            }
            else if (recordLog !== undefined) {
                return recordLog.currentDirectory = underlying.getCurrentDirectory();
            }
            else {
                return underlying.getCurrentDirectory();
            }
        };
        wrapper.resolvePath = recordReplay(wrapper.resolvePath, underlying)(function (path) { return callAndRecord(underlying.resolvePath(path), recordLog.pathsResolved, { path: path }); }, memoize(function (path) { return findResultByFields(replayLog.pathsResolved, { path: path }, !ts.isRootedDiskPath(ts.normalizeSlashes(path)) && replayLog.currentDirectory ? replayLog.currentDirectory + "/" + path : ts.normalizeSlashes(path)); }));
        wrapper.readFile = recordReplay(wrapper.readFile, underlying)(function (path) {
            var result = underlying.readFile(path);
            var logEntry = { path: path, codepage: 0, result: { contents: result, codepage: 0 } };
            recordLog.filesRead.push(logEntry);
            return result;
        }, memoize(function (path) { return findFileByPath(path, /*throwFileNotFoundError*/ true).contents; }));
        wrapper.readDirectory = recordReplay(wrapper.readDirectory, underlying)(function (path, extensions, exclude, include, depth) {
            var result = underlying.readDirectory(path, extensions, exclude, include, depth);
            recordLog.directoriesRead.push({ path: path, extensions: extensions, exclude: exclude, include: include, depth: depth, result: result });
            return result;
        }, function (path) {
            // Because extensions is an array of all allowed extension, we will want to merge each of the replayLog.directoriesRead into one
            // if each of the directoriesRead has matched path with the given path (directory with same path but different extension will considered
            // different entry).
            // TODO (yuisu): We can certainly remove these once we recapture the RWC using new API
            var normalizedPath = ts.normalizePath(path).toLowerCase();
            return ts.flatMap(replayLog.directoriesRead, function (directory) {
                if (ts.normalizeSlashes(directory.path).toLowerCase() === normalizedPath) {
                    return directory.result;
                }
            });
        });
        wrapper.writeFile = recordReplay(wrapper.writeFile, underlying)(function (path, contents) { return callAndRecord(underlying.writeFile(path, contents), recordLog.filesWritten, { path: path, contents: contents, bom: false }); }, function () { return noOpReplay("writeFile"); });
        wrapper.exit = function (exitCode) {
            if (recordLog !== undefined) {
                wrapper.endRecord();
            }
            underlying.exit(exitCode);
        };
        wrapper.useCaseSensitiveFileNames = function () {
            if (replayLog !== undefined) {
                return !!replayLog.useCaseSensitiveFileNames;
            }
            return typeof underlying.useCaseSensitiveFileNames === "function" ? underlying.useCaseSensitiveFileNames() : underlying.useCaseSensitiveFileNames;
        };
    }
    function recordReplay(original, underlying) {
        function createWrapper(record, replay) {
            // tslint:disable-next-line only-arrow-functions
            return (function () {
                if (replayLog !== undefined) {
                    return replay.apply(undefined, arguments);
                }
                else if (recordLog !== undefined) {
                    return record.apply(undefined, arguments);
                }
                else {
                    return original.apply(underlying, arguments);
                }
            });
        }
        return createWrapper;
    }
    function callAndRecord(underlyingResult, logArray, logEntry) {
        if (underlyingResult !== undefined) {
            logEntry.result = underlyingResult;
        }
        logArray.push(logEntry);
        return underlyingResult;
    }
    function findResultByFields(logArray, expectedFields, defaultValue) {
        var predicate = function (entry) {
            return Object.getOwnPropertyNames(expectedFields).every(function (name) { return entry[name] === expectedFields[name]; });
        };
        var results = logArray.filter(function (entry) { return predicate(entry); });
        if (results.length === 0) {
            if (defaultValue !== undefined) {
                return defaultValue;
            }
            else {
                throw new Error("No matching result in log array for: " + JSON.stringify(expectedFields));
            }
        }
        return results[0].result;
    }
    function findFileByPath(expectedPath, throwFileNotFoundError) {
        var normalizedName = ts.normalizePath(expectedPath).toLowerCase();
        // Try to find the result through normal fileName
        var result = replayFilesRead.get(normalizedName);
        if (result) {
            return result.result;
        }
        // If we got here, we didn't find a match
        if (throwFileNotFoundError) {
            throw new Error("No matching result in log array for path: " + expectedPath);
        }
        else {
            return undefined;
        }
    }
    function noOpReplay(_name) {
        // console.log("Swallowed write operation during replay: " + name);
    }
    function wrapIO(underlying) {
        var wrapper = {};
        initWrapper(wrapper, underlying);
        wrapper.directoryName = notSupported;
        wrapper.createDirectory = notSupported;
        wrapper.directoryExists = notSupported;
        wrapper.deleteFile = notSupported;
        wrapper.listFiles = notSupported;
        return wrapper;
        function notSupported() {
            throw new Error("NotSupported");
        }
    }
    Playback.wrapIO = wrapIO;
    function wrapSystem(underlying) {
        var wrapper = {};
        initWrapper(wrapper, underlying);
        return wrapper;
    }
    Playback.wrapSystem = wrapSystem;
})(Playback || (Playback = {}));
//# sourceMappingURL=harness.js.map