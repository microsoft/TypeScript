import * as ts from "./_namespaces/ts.js";

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

    public get size(): number {
        return this._keys.length;
    }

    public get comparer(): (a: K, b: K) => number {
        return this._comparer;
    }

    public get [Symbol.toStringTag]() {
        return "SortedMap";
    }

    public has(key: K): boolean {
        return ts.binarySearch(this._keys, key, ts.identity, this._comparer) >= 0;
    }

    public get(key: K): V | undefined {
        const index = ts.binarySearch(this._keys, key, ts.identity, this._comparer);
        return index >= 0 ? this._values[index] : undefined;
    }

    public getEntry(key: K): [K, V] | undefined {
        const index = ts.binarySearch(this._keys, key, ts.identity, this._comparer);
        return index >= 0 ? [this._keys[index], this._values[index]] : undefined;
    }

    public set(key: K, value: V): this {
        const index = ts.binarySearch(this._keys, key, ts.identity, this._comparer);
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

    public delete(key: K): boolean {
        const index = ts.binarySearch(this._keys, key, ts.identity, this._comparer);
        if (index >= 0) {
            this.writePreamble();
            ts.orderedRemoveItemAt(this._keys, index);
            ts.orderedRemoveItemAt(this._values, index);
            if (this._order) ts.orderedRemoveItemAt(this._order, index);
            this.writePostScript();
            return true;
        }
        return false;
    }

    public clear(): void {
        if (this.size > 0) {
            this.writePreamble();
            this._keys.length = 0;
            this._values.length = 0;
            if (this._order) this._order.length = 0;
            this.writePostScript();
        }
    }

    public forEach(callback: (value: V, key: K, collection: this) => void, thisArg?: any): void {
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

    public *keys(): Generator<K, undefined, unknown> {
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
                yield* keys;
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
        return undefined;
    }

    public *values(): Generator<V, undefined, unknown> {
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
                yield* values;
            }
        }
        finally {
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }
        return undefined;
    }

    public *entries(): Generator<[K, V], undefined, unknown> {
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
        return undefined;
    }

    public [Symbol.iterator](): Generator<[K, V], undefined, unknown> {
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

function insertAt<T>(array: T[], index: number, value: T): void {
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
    private _map: { [key: string]: any; };
    private _version = 0;
    private _size = -1;
    private _parentVersion: number | undefined;

    constructor(parent?: Metadata) {
        this._parent = parent;
        this._map = Object.create(parent ? parent._map : null); // eslint-disable-line no-restricted-syntax
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

    public get parent(): Metadata | undefined {
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
        this._map = Object.create(this._parent ? this._parent._map : null); // eslint-disable-line no-restricted-syntax
        this._size = -1;
        this._version++;
    }

    public forEach(callback: (value: any, key: string, map: this) => void): void {
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
