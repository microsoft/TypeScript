"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
class SortedMap {
    constructor(comparer, iterable) {
        this._keys = [];
        this._values = [];
        this._version = 0;
        this._copyOnWrite = false;
        this._comparer = typeof comparer === "object" ? comparer.comparer : comparer;
        this._order = typeof comparer === "object" && comparer.sort === "insertion" ? [] : undefined;
        if (iterable) {
            for (const [key, value] of iterable) {
                this.set(key, value);
            }
        }
    }
    get size() {
        return this._keys.length;
    }
    get [Symbol.toStringTag]() {
        return "SortedMap";
    }
    has(key) {
        return binarySearch(this._keys, key, functions_1.identity, this._comparer) >= 0;
    }
    get(key) {
        const index = binarySearch(this._keys, key, functions_1.identity, this._comparer);
        return index >= 0 ? this._values[index] : undefined;
    }
    set(key, value) {
        const index = binarySearch(this._keys, key, functions_1.identity, this._comparer);
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
    }
    delete(key) {
        const index = binarySearch(this._keys, key, functions_1.identity, this._comparer);
        if (index >= 0) {
            this.writePreamble();
            removeAt(this._keys, index);
            removeAt(this._values, index);
            if (this._order)
                removeAt(this._order, index);
            this.writePostScript();
            return true;
        }
        return false;
    }
    clear() {
        if (this.size > 0) {
            this.writePreamble();
            this._keys.length = 0;
            this._values.length = 0;
            if (this._order)
                this._order.length = 0;
            this.writePostScript();
        }
    }
    forEach(callback, thisArg) {
        const keys = this._keys;
        const values = this._values;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    callback.call(thisArg, values[i], keys[i], this);
                }
            }
            else {
                for (let i = 0; i < keys.length; i++) {
                    callback.call(thisArg, values[i], keys[i], this);
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }
    *keys() {
        const keys = this._keys;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    yield keys[i];
                }
            }
            else {
                for (let i = 0; i < keys.length; i++) {
                    yield keys[i];
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }
    *values() {
        const values = this._values;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    yield values[i];
                }
            }
            else {
                for (let i = 0; i < values.length; i++) {
                    yield values[i];
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }
    *entries() {
        const keys = this._keys;
        const values = this._values;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    yield [keys[i], values[i]];
                }
            }
            else {
                for (let i = 0; i < keys.length; i++) {
                    yield [keys[i], values[i]];
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    writePreamble() {
        if (this._copyOnWrite) {
            this._keys = this._keys.slice();
            this._values = this._values.slice();
            if (this._order)
                this._order = this._order.slice();
            this._copyOnWrite = false;
        }
    }
    writePostScript() {
        this._version++;
    }
    getIterationOrder() {
        if (this._order) {
            const order = this._order;
            return this._order
                .map((_, i) => i)
                .sort((x, y) => order[x] - order[y]);
        }
        return undefined;
    }
}
exports.SortedMap = SortedMap;
class SortedSet {
    constructor(comparer, iterable) {
        this._values = [];
        this._version = 0;
        this._copyOnWrite = false;
        this._comparer = typeof comparer === "object" ? comparer.comparer : comparer;
        this._order = typeof comparer === "object" && comparer.sort === "insertion" ? [] : undefined;
        if (iterable) {
            for (const value of iterable) {
                this.add(value);
            }
        }
    }
    get size() {
        return this._values.length;
    }
    get [Symbol.toStringTag]() {
        return "SortedSet";
    }
    has(value) {
        return binarySearch(this._values, value, functions_1.identity, this._comparer) >= 0;
    }
    add(value) {
        const index = binarySearch(this._values, value, functions_1.identity, this._comparer);
        if (index < 0) {
            this.writePreamble();
            insertAt(this._values, ~index, value);
            if (this._order)
                insertAt(this._order, ~index, this._version);
            this.writePostScript();
        }
        return this;
    }
    delete(value) {
        const index = binarySearch(this._values, value, functions_1.identity, this._comparer);
        if (index >= 0) {
            this.writePreamble();
            removeAt(this._values, index);
            if (this._order)
                removeAt(this._order, index);
            this.writePostScript();
            return true;
        }
        return false;
    }
    clear() {
        if (this.size > 0) {
            this.writePreamble();
            this._values.length = 0;
            if (this._order)
                this._order.length = 0;
            this.writePostScript();
        }
    }
    forEach(callback, thisArg) {
        const values = this._values;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    callback.call(thisArg, values[i], values[i], this);
                }
            }
            else {
                for (const value of values) {
                    callback.call(thisArg, value, value, this);
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }
    keys() {
        return this.values();
    }
    *values() {
        const values = this._values;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    yield values[i];
                }
            }
            else {
                for (const value of values) {
                    yield value;
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }
    *entries() {
        const values = this._values;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    yield [values[i], values[i]];
                }
            }
            else {
                for (const value of values) {
                    yield [value, value];
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }
    [Symbol.iterator]() {
        return this.values();
    }
    writePreamble() {
        if (this._copyOnWrite) {
            this._values = this._values.slice();
            if (this._order)
                this._order = this._order.slice();
            this._copyOnWrite = false;
        }
    }
    writePostScript() {
        this._version++;
    }
    getIterationOrder() {
        if (this._order) {
            const order = this._order;
            return this._order
                .map((_, i) => i)
                .sort((x, y) => order[x] - order[y]);
        }
        return undefined;
    }
}
exports.SortedSet = SortedSet;
function binarySearch(array, value, keySelector, keyComparer, offset) {
    if (!array || array.length === 0) {
        return -1;
    }
    let low = offset || 0;
    let high = array.length - 1;
    const key = keySelector(value);
    while (low <= high) {
        const middle = low + ((high - low) >> 1);
        const midKey = keySelector(array[middle]);
        const result = keyComparer(midKey, key);
        if (result < 0) {
            low = middle + 1;
        }
        else if (result > 0) {
            high = middle - 1;
        }
        else {
            return middle;
        }
    }
    return ~low;
}
exports.binarySearch = binarySearch;
function removeAt(array, index) {
    if (index < 0 || index >= array.length) {
        return;
    }
    else if (index === 0) {
        array.shift();
    }
    else if (index === array.length - 1) {
        array.pop();
    }
    else {
        for (let i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.length--;
    }
}
exports.removeAt = removeAt;
function insertAt(array, index, value) {
    if (index === 0) {
        array.unshift(value);
    }
    else if (index === array.length) {
        array.push(value);
    }
    else {
        for (let i = array.length; i > index; i--) {
            array[i] = array[i - 1];
        }
        array[index] = value;
    }
}
exports.insertAt = insertAt;
/**
 * A collection of metadata that supports inheritance.
 */
class Metadata {
    constructor(parent) {
        this._version = 0;
        this._size = -1;
        this._parent = parent;
        this._map = Object.create(parent ? parent._map : null); // tslint:disable-line:no-null-keyword
    }
    get size() {
        if (this._size === -1 || (this._parent && this._parent._version !== this._parentVersion)) {
            let size = 0;
            for (const _ in this._map)
                size++;
            this._size = size;
            if (this._parent) {
                this._parentVersion = this._parent._version;
            }
        }
        return this._size;
    }
    get parent() {
        return this._parent;
    }
    has(key) {
        return this._map[Metadata._escapeKey(key)] !== undefined;
    }
    get(key) {
        const value = this._map[Metadata._escapeKey(key)];
        return value === Metadata._undefinedValue ? undefined : value;
    }
    set(key, value) {
        this._map[Metadata._escapeKey(key)] = value === undefined ? Metadata._undefinedValue : value;
        this._size = -1;
        this._version++;
        return this;
    }
    delete(key) {
        const escapedKey = Metadata._escapeKey(key);
        if (this._map[escapedKey] !== undefined) {
            delete this._map[escapedKey];
            this._size = -1;
            this._version++;
            return true;
        }
        return false;
    }
    clear() {
        this._map = Object.create(this._parent ? this._parent._map : null); // tslint:disable-line:no-null-keyword
        this._size = -1;
        this._version++;
    }
    forEach(callback) {
        for (const key in this._map) {
            callback(this._map[key], Metadata._unescapeKey(key), this);
        }
    }
    static _escapeKey(text) {
        return (text.length >= 2 && text.charAt(0) === "_" && text.charAt(1) === "_" ? "_" + text : text);
    }
    static _unescapeKey(text) {
        return (text.length >= 3 && text.charAt(0) === "_" && text.charAt(1) === "_" && text.charAt(2) === "_" ? text.slice(1) : text);
    }
}
Metadata._undefinedValue = {};
exports.Metadata = Metadata;

//# sourceMappingURL=collections.js.map
