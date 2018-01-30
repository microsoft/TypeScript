import { identity } from "./functions";

export interface SortOptions<T> {
    comparer: (a: T, b: T) => number;
    sort: "insertion" | "comparison";
}

export class SortedMap<K, V> {
    private _comparer: (a: K, b: K) => number;
    private _keys: K[] = [];
    private _values: V[] = [];
    private _order: number[] | undefined;
    private _version = 0;
    private _copyOnWrite = false;

    constructor(comparer: ((a: K, b: K) => number) | SortOptions<K>, iterable?: Iterable<[K, V]>) {
        this._comparer = typeof comparer === "object" ? comparer.comparer : comparer;
        this._order = typeof comparer === "object" && comparer.sort === "insertion" ? [] : undefined;
        if (iterable) {
            for (const [key, value] of iterable) {
                this.set(key, value);
            }
        }
    }

    public get size() {
        return this._keys.length;
    }

    public get [Symbol.toStringTag]() {
        return "SortedMap";
    }

    public has(key: K) {
        return binarySearch(this._keys, key, identity, this._comparer) >= 0;
    }

    public get(key: K) {
        const index = binarySearch(this._keys, key, identity, this._comparer);
        return index >= 0 ? this._values[index] : undefined;
    }

    public set(key: K, value: V) {
        const index = binarySearch(this._keys, key, identity, this._comparer);
        if (index >= 0) {
            this._values[index] = value;
        }
        else {
            this.writePreamble();
            insertAt(this._keys, ~index, key);
            insertAt(this._values, ~index, value);
            if (this._order) insertAt(this._order, ~index, this._version);
            this.writePostScript();
        }
        return this;
    }

    public delete(key: K) {
        const index = binarySearch(this._keys, key, identity, this._comparer);
        if (index >= 0) {
            this.writePreamble();
            removeAt(this._keys, index);
            removeAt(this._values, index);
            if (this._order) removeAt(this._order, index);
            this.writePostScript();
            return true;
        }
        return false;
    }

    public clear() {
        if (this.size > 0) {
            this.writePreamble();
            this._keys.length = 0;
            this._values.length = 0;
            if (this._order) this._order.length = 0;
            this.writePostScript();
        }
    }

    public forEach(callback: (value: V, key: K, collection: this) => void, thisArg?: any) {
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

    public * keys() {
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

    public * values() {
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

    public * entries() {
        const keys = this._keys;
        const values = this._values;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    yield [keys[i], values[i]] as [K, V];
                }
            }
            else {
                for (let i = 0; i < keys.length; i++) {
                    yield [keys[i], values[i]] as [K, V];
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }

    public [Symbol.iterator]() {
        return this.entries();
    }

    private writePreamble() {
        if (this._copyOnWrite) {
            this._keys = this._keys.slice();
            this._values = this._values.slice();
            if (this._order) this._order = this._order.slice();
            this._copyOnWrite = false;
        }
    }

    private writePostScript() {
        this._version++;
    }

    private getIterationOrder() {
        if (this._order) {
            const order = this._order;
            return this._order
                .map((_, i) => i)
                .sort((x, y) => order[x] - order[y]);
        }
        return undefined;
    }
}

export class SortedSet<T> {
    private _comparer: (a: T, b: T) => number;
    private _values: T[] = [];
    private _order: number[] | undefined;
    private _version = 0;
    private _copyOnWrite = false;

    constructor(comparer: ((a: T, b: T) => number) | SortOptions<T>, iterable?: Iterable<T>) {
        this._comparer = typeof comparer === "object" ? comparer.comparer : comparer;
        this._order = typeof comparer === "object" && comparer.sort === "insertion" ? [] : undefined;

        if (iterable) {
            for (const value of iterable) {
                this.add(value);
            }
        }
    }

    public get size() {
        return this._values.length;
    }

    public get [Symbol.toStringTag]() {
        return "SortedSet";
    }

    public has(value: T) {
        return binarySearch(this._values, value, identity, this._comparer) >= 0;
    }

    public add(value: T) {
        const index = binarySearch(this._values, value, identity, this._comparer);
        if (index < 0) {
            this.writePreamble();
            insertAt(this._values, ~index, value);
            if (this._order) insertAt(this._order, ~index, this._version);
            this.writePostScript();
        }
        return this;
    }

    public delete(value: T) {
        const index = binarySearch(this._values, value, identity, this._comparer);
        if (index >= 0) {
            this.writePreamble();
            removeAt(this._values, index);
            if (this._order) removeAt(this._order, index);
            this.writePostScript();
            return true;
        }
        return false;
    }

    public clear() {
        if (this.size > 0) {
            this.writePreamble();
            this._values.length = 0;
            if (this._order) this._order.length = 0;
            this.writePostScript();
        }
    }

    public forEach(callback: (value: T, key: T, collection: this) => void, thisArg?: any) {
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

    public keys() {
        return this.values();
    }

    public * values() {
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

    public * entries() {
        const values = this._values;
        const indices = this.getIterationOrder();
        const version = this._version;
        this._copyOnWrite = true;
        try {
            if (indices) {
                for (const i of indices) {
                    yield [values[i], values[i]] as [T, T];
                }
            }
            else {
                for (const value of values) {
                    yield [value, value] as [T, T];
                }
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
    }

    public [Symbol.iterator]() {
        return this.values();
    }

    private writePreamble() {
        if (this._copyOnWrite) {
            this._values = this._values.slice();
            if (this._order) this._order = this._order.slice();
            this._copyOnWrite = false;
        }
    }

    private writePostScript() {
        this._version++;
    }

    private getIterationOrder() {
        if (this._order) {
            const order = this._order;
            return this._order
                .map((_, i) => i)
                .sort((x, y) => order[x] - order[y]);
        }
        return undefined;
    }
}

export function binarySearch<T, U>(array: ReadonlyArray<T>, value: T, keySelector: (v: T) => U, keyComparer: (a: U, b: U) => number, offset?: number): number {
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

export function removeAt<T>(array: T[], index: number): void {
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

export function insertAt<T>(array: T[], index: number, value: T): void {
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

/**
 * A collection of metadata that supports inheritance.
 */
export class Metadata {
    private static readonly _undefinedValue = {};
    private _parent: Metadata | undefined;
    private _map: { [key: string]: any };
    private _version = 0;
    private _size = -1;
    private _parentVersion: number | undefined;

    constructor(parent?: Metadata) {
        this._parent = parent;
        this._map = Object.create(parent ? parent._map : null); // tslint:disable-line:no-null-keyword
    }

    public get size(): number {
        if (this._size === -1 || (this._parent && this._parent._version !== this._parentVersion)) {
            let size = 0;
            for (const _ in this._map) size++;
            this._size = size;
            if (this._parent) {
                this._parentVersion = this._parent._version;
            }
        }
        return this._size;
    }

    public get parent() {
        return this._parent;
    }

    public has(key: string): boolean {
        return this._map[Metadata._escapeKey(key)] !== undefined;
    }

    public get(key: string): any {
        const value = this._map[Metadata._escapeKey(key)];
        return value === Metadata._undefinedValue ? undefined : value;
    }

    public set(key: string, value: any): this {
        this._map[Metadata._escapeKey(key)] = value === undefined ? Metadata._undefinedValue : value;
        this._size = -1;
        this._version++;
        return this;
    }

    public delete(key: string): boolean {
        const escapedKey = Metadata._escapeKey(key);
        if (this._map[escapedKey] !== undefined) {
            delete this._map[escapedKey];
            this._size = -1;
            this._version++;
            return true;
        }
        return false;
    }

    public clear(): void {
        this._map = Object.create(this._parent ? this._parent._map : null); // tslint:disable-line:no-null-keyword
        this._size = -1;
        this._version++;
    }

    public forEach(callback: (value: any, key: string, map: this) => void) {
        for (const key in this._map) {
            callback(this._map[key], Metadata._unescapeKey(key), this);
        }
    }

    private static _escapeKey(text: string) {
        return (text.length >= 2 && text.charAt(0) === "_" && text.charAt(1) === "_" ? "_" + text : text);
    }

    private static _unescapeKey(text: string) {
        return (text.length >= 3 && text.charAt(0) === "_" && text.charAt(1) === "_" && text.charAt(2) === "_" ? text.slice(1) : text);
    }
}