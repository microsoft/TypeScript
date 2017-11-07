/// <reference path="./harness.ts" />
namespace collections {
    // NOTE: Some of the functions here duplicate functionality from compiler/core.ts. They have been added
    //       to reduce the number of direct dependencies on compiler and services to eventually break away
    //       from depending directly on the compiler to speed up compilation time.

    import binarySearch = ts.binarySearch;

    function compareValues(a: string | number, b: string | number): number {
        if (a === b) return 0;
        if (a === undefined) return -1;
        if (b === undefined) return +1;
        return a < b ? -1 : +1;
    }

    export function compareNumbers(a: number, b: number): number {
        return compareValues(a, b);
    }

    export function compareStrings(a: string, b: string, ignoreCase: boolean): number {
        return ignoreCase
            ? compareStringsCaseInsensitive(a, b)
            : compareStringsCaseSensitive(a, b);
    }

    export function compareStringsCaseSensitive(a: string, b: string): number {
        return compareValues(a, b);
    }

    export function compareStringsCaseInsensitive(a: string, b: string): number {
        if (a === b) return 0;
        if (a === undefined) return -1;
        if (b === undefined) return +1;
        a = a.toUpperCase();
        b = b.toUpperCase();
        return a < b ? -1 : a > b ? +1 : 0;
    }

    export function equateStringsCaseSensitive(a: string, b: string): boolean {
        return a === b;
    }

    export function equateStringsCaseInsensitive(a: string, b: string): boolean {
        return a === b
            || a !== undefined
            && b !== undefined
            && a.toUpperCase() === b.toUpperCase();
    }

    function removeAt<T>(array: T[], index: number): void {
        for (let i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.pop();
    }

    function insertAt<T>(array: T[], index: number, value: T) {
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
     * A collection of key/value pairs internally sorted by key.
     */
    export class KeyedCollection<K, V> {
        private _comparer: (a: K, b: K) => number;
        private _keys: K[] = [];
        private _values: V[] = [];
        private _order: number[] = [];
        private _version = 0;
        private _copyOnWrite = false;

        constructor(comparer: (a: K, b: K) => number) {
            this._comparer = comparer;
        }

        public get size() {
            return this._keys.length;
        }

        public has(key: K) {
            return binarySearch(this._keys, key, ts.identity, this._comparer) >= 0;
        }

        public get(key: K) {
            const index = binarySearch(this._keys, key, ts.identity, this._comparer);
            return index >= 0 ? this._values[index] : undefined;
        }

        public set(key: K, value: V) {
            const index = binarySearch(this._keys, key, ts.identity, this._comparer);
            if (index >= 0) {
                this._values[index] = value;
            }
            else {
                this.writePreamble();
                insertAt(this._keys, ~index, key);
                insertAt(this._values, ~index, value);
                insertAt(this._order, ~index, this._version);
                this._version++;
            }
            return this;
        }

        public delete(key: K) {
            const index = binarySearch(this._keys, key, ts.identity, this._comparer);
            if (index >= 0) {
                this.writePreamble();
                removeAt(this._keys, index);
                removeAt(this._values, index);
                removeAt(this._order, index);
                this._version++;
                return true;
            }
            return false;
        }

        public clear() {
            if (this.size > 0) {
                this.writePreamble();
                this._keys.length = 0;
                this._values.length = 0;
                this._order.length = 0;
                this._version = 0;
            }
        }

        public forEach(callback: (value: V, key: K, collection: this) => void) {
            const keys = this._keys;
            const values = this._values;
            const order = this.getInsertionOrder();
            const version = this._version;
            this._copyOnWrite = true;
            for (const index of order) {
                callback(values[index], keys[index], this);
            }
            if (version === this._version) {
                this._copyOnWrite = false;
            }
        }

        private writePreamble() {
            if (this._copyOnWrite) {
                this._keys = this._keys.slice();
                this._values = this._values.slice();
                this._order = this._order.slice();
                this._copyOnWrite = false;
            }
        }

        private getInsertionOrder() {
            return this._order
                .map((_, i) => i)
                .sort((x, y) => compareNumbers(this._order[x], this._order[y]));
        }
    }

    const undefinedSentinel = {};

    function escapeKey(text: string) {
        return (text.length >= 2 && text.charAt(0) === "_" && text.charAt(1) === "_" ? "_" + text : text);
    }

    function unescapeKey(text: string) {
        return (text.length >= 3 && text.charAt(0) === "_" && text.charAt(1) === "_" && text.charAt(2) === "_" ? text.slice(1) : text);
    }

    /**
     * A collection of metadata that supports inheritance.
     */
    export class Metadata {
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

        public has(key: string): boolean {
            return this._map[escapeKey(key)] !== undefined;
        }

        public get(key: string): any {
            const value = this._map[escapeKey(key)];
            return value === undefinedSentinel ? undefined : value;
        }

        public set(key: string, value: any): this {
            this._map[escapeKey(key)] = value === undefined ? undefinedSentinel : value;
            this._size = -1;
            this._version++;
            return this;
        }

        public delete(key: string): boolean {
            const escapedKey = escapeKey(key);
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
                callback(this._map[key], unescapeKey(key), this);
            }
        }
    }
}