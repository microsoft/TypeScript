import { compareValues, binarySearch, insertAt, removeAt } from "./utils";

export class KeyedCollection<K, V> {
    private _comparer: (a: K, b: K) => number;
    private _keys: K[] = [];
    private _values: V[] = [];
    private _order: number[] = [];
    private _version = 0;

    constructor(comparer: (a: K, b: K) => number = compareValues) {
        this._comparer = comparer;
    }

    public get size() {
        return this._keys.length;
    }

    public has(key: K) {
        return binarySearch(this._keys, key, this._comparer) >= 0;
    }

    public get(key: K) {
        const index = binarySearch(this._keys, key, this._comparer);
        return index >= 0 ? this._values[index] : undefined;
    }

    public set(key: K, value: V) {
        const index = binarySearch(this._keys, key, this._comparer);
        if (index >= 0) {
            this._values[index] = value;
        }
        else {
            insertAt(this._keys, ~index, key);
            insertAt(this._values, ~index, value);
            insertAt(this._order, ~index, this._version);
            this._version++;
        }
        return this;
    }

    public delete(key: K) {
        const index = binarySearch(this._keys, key, this._comparer);
        if (index >= 0) {
            removeAt(this._keys, index);
            removeAt(this._values, index);
            removeAt(this._order, index);
            this._version++;
            return true;
        }
        return false;
    }

    public clear() {
        this._keys.length = 0;
        this._values.length = 0;
        this._order.length = 0;
        this._version = 0;
    }

    public forEach(callback: (value: V, key: K, collection: this) => void) {
        let order = this.getInsertionOrder();
        let version = this._version;
        for (let i = 0; i < order.length; i++) {
            callback(this._values[order[i]], this._keys[order[i]], this);
            if (version !== this._version) {
                order = this.getInsertionOrder();
                version = this._version;
            }
        }
    }

    private getInsertionOrder() {
        return this._order
            .map((_, i) => i)
            .sort((x, y) => compareValues(this._order[x], this._order[y]));
    }
}

const undefinedSentinel = {};

export class Metadata {
    private _parent: Metadata | undefined;
    private _map: { [key: string]: any };
    private _version = 0;
    private _size: number | undefined;
    private _parentVersion: number | undefined;

    constructor(parent?: Metadata) {
        this._parent = parent;
        this._map = Object.create(parent ? parent._map : null); // tslint:disable-line:no-null-keyword
    }

    public get size(): number {
        if (this._size === undefined || (this._parent && this._parent._version !== this._parentVersion)) {
            let size = 0;
            for (const _ in this._map) size++;
            this._size = size;
            if (this._parent) {
                this._parentVersion = this._parent._version;
            }
        }
        return this._size;
    }

    public has(key: string): boolean {
        return this._map[key] !== undefined;
    }

    public get(key: string): any {
        const value = this._map[key];
        return value === undefinedSentinel ? undefined : value;
    }

    public set(key: string, value: any): this {
        this._map[key] = value === undefined ? undefinedSentinel : value;
        this._version++;
        this._size = undefined;
        return this;
    }

    public delete(key: string): boolean {
        if (this._map[key] !== undefined) {
            delete this._map[key];
            this._version++;
            this._size = undefined;
            return true;
        }
        return false;
    }

    public clear(): void {
        this._map = Object.create(this._parent ? this._parent._map : null); // tslint:disable-line:no-null-keyword
        this._version++;
        this._size = undefined;
    }

    public forEach(callback: (value: any, key: string, map: this) => void) {
        for (const key in this._map) {
            callback(this._map[key], key, this);
        }
    }
}