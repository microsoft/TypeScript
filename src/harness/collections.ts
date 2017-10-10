/// <reference path="./harness.ts" />
namespace Collections {
    import compareValues = ts.compareValues;
    import binarySearch = ts.binarySearch;
    import removeAt = ts.orderedRemoveItemAt;

    const caseInsensitiveComparisonCollator = typeof Intl === "object" ? new Intl.Collator(/*locales*/ undefined, { usage: "sort", sensitivity: "accent" }) : undefined;
    const caseSensitiveComparisonCollator = typeof Intl === "object" ? new Intl.Collator(/*locales*/ undefined, { usage: "sort", sensitivity: "variant" }) : undefined;

    export function compareStrings(a: string | undefined, b: string | undefined, ignoreCase?: boolean) {
        if (a === b) return 0;
        if (a === undefined) return -1;
        if (b === undefined) return +1;
        const collator = ignoreCase ? caseInsensitiveComparisonCollator : caseSensitiveComparisonCollator;
        if (collator) {
            return collator.compare(a, b);
        }
        else if (ignoreCase) {
            a = a.toUpperCase();
            b = b.toUpperCase();
        }
        return a < b ? -1 : a > b ? +1 : 0;
    }

    export namespace compareStrings {
        export function caseSensitive(a: string | undefined, b: string | undefined) {
            return compareStrings(a, b, /*ignoreCase*/ false);
        }

        export function caseInsensitive(a: string | undefined, b: string | undefined) {
            return compareStrings(a, b, /*ignoreCase*/ true);
        }
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
     * A collection of key/value pairs sorted by key.
     */
    export class KeyedCollection<K, V> {
        private _comparer: (a: K, b: K) => number;
        private _keys: K[] = [];
        private _values: V[] = [];
        private _order: number[] = [];
        private _version = 0;
        private _copyOnWrite = false;

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
                this.writePreamble();
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
            for (let i = 0; i < order.length; i++) {
                callback(values[order[i]], keys[order[i]], this);
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
                .sort((x, y) => compareValues(this._order[x], this._order[y]));
        }
    }

    const undefinedSentinel = {};

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
            return this._map[key] !== undefined;
        }

        public get(key: string): any {
            const value = this._map[key];
            return value === undefinedSentinel ? undefined : value;
        }

        public set(key: string, value: any): this {
            this._map[key] = value === undefined ? undefinedSentinel : value;
            this._size = -1;
            this._version++;
            return this;
        }

        public delete(key: string): boolean {
            if (this._map[key] !== undefined) {
                delete this._map[key];
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
                callback(this._map[key], key, this);
            }
        }
    }
}