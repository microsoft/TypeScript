/// <reference path="types.ts"/>
/// <reference path="performance.ts" />

namespace ts {
    // WARNING: The script `configureNightly.ts` uses a regexp to parse out these values.
    // If changing the text in this section, be sure to test `configureNightly` too.
    export const versionMajorMinor = "2.8";
    /** The version of the TypeScript compiler release */
    export const version = `${versionMajorMinor}.0-dev`;
}

namespace ts {
    export function isExternalModuleNameRelative(moduleName: string): boolean {
        // TypeScript 1.0 spec (April 2014): 11.2.1
        // An external module name is "relative" if the first term is "." or "..".
        // Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
        return pathIsRelative(moduleName) || isRootedDiskPath(moduleName);
    }

    export function sortAndDeduplicateDiagnostics(diagnostics: ReadonlyArray<Diagnostic>): Diagnostic[] {
        return sortAndDeduplicate(diagnostics, compareDiagnostics);
    }
}

/* @internal */
namespace ts {
    export const emptyArray: never[] = [] as never[];
    export function closeFileWatcher(watcher: FileWatcher) {
        watcher.close();
    }

    /** Create a MapLike with good performance. */
    function createDictionaryObject<T>(): MapLike<T> {
        const map = Object.create(/*prototype*/ null); // tslint:disable-line:no-null-keyword

        // Using 'delete' on an object causes V8 to put the object in dictionary mode.
        // This disables creation of hidden classes, which are expensive when an object is
        // constantly changing shape.
        map.__ = undefined;
        delete map.__;

        return map;
    }

    /** Create a new map. If a template object is provided, the map will copy entries from it. */
    export function createMap<T>(): Map<T> {
        return new MapCtr<T>();
    }

    /** Create a new escaped identifier map. */
    export function createUnderscoreEscapedMap<T>(): UnderscoreEscapedMap<T> {
        return new MapCtr<T>() as UnderscoreEscapedMap<T>;
    }

    export function createSymbolTable(symbols?: ReadonlyArray<Symbol>): SymbolTable {
        const result = createMap<Symbol>() as SymbolTable;
        if (symbols) {
            for (const symbol of symbols) {
                result.set(symbol.escapedName, symbol);
            }
        }
        return result;
    }

    export function createMapFromTemplate<T>(template?: MapLike<T>): Map<T> {
        const map: Map<T> = new MapCtr<T>();

        // Copies keys/values from template. Note that for..in will not throw if
        // template is undefined, and instead will just exit the loop.
        for (const key in template) {
            if (hasOwnProperty.call(template, key)) {
                map.set(key, template[key]);
            }
        }

        return map;
    }

    // The global Map object. This may not be available, so we must test for it.
    declare const Map: { new <T>(): Map<T> } | undefined;
    // Internet Explorer's Map doesn't support iteration, so don't use it.
    // tslint:disable-next-line no-in-operator variable-name
    const MapCtr = typeof Map !== "undefined" && "entries" in Map.prototype ? Map : shimMap();

    // Keep the class inside a function so it doesn't get compiled if it's not used.
    function shimMap(): { new <T>(): Map<T> } {

        class MapIterator<T, U extends (string | T | [string, T])> {
            private data: MapLike<T>;
            private keys: ReadonlyArray<string>;
            private index = 0;
            private selector: (data: MapLike<T>, key: string) => U;
            constructor(data: MapLike<T>, selector: (data: MapLike<T>, key: string) => U) {
                this.data = data;
                this.selector = selector;
                this.keys = Object.keys(data);
            }

            public next(): { value: U, done: false } | { value: never, done: true } {
                const index = this.index;
                if (index < this.keys.length) {
                    this.index++;
                    return { value: this.selector(this.data, this.keys[index]), done: false };
                }
                return { value: undefined as never, done: true };
            }
        }

        return class <T> implements Map<T> {
            private data = createDictionaryObject<T>();
            public size = 0;

            get(key: string): T {
                return this.data[key];
            }

            set(key: string, value: T): this {
                if (!this.has(key)) {
                    this.size++;
                }
                this.data[key] = value;
                return this;
            }

            has(key: string): boolean {
                // tslint:disable-next-line:no-in-operator
                return key in this.data;
            }

            delete(key: string): boolean {
                if (this.has(key)) {
                    this.size--;
                    delete this.data[key];
                    return true;
                }
                return false;
            }

            clear(): void {
                this.data = createDictionaryObject<T>();
                this.size = 0;
            }

            keys() {
                return new MapIterator(this.data, (_data, key) => key);
            }

            values() {
                return new MapIterator(this.data, (data, key) => data[key]);
            }

            entries() {
                return new MapIterator(this.data, (data, key) => [key, data[key]] as [string, T]);
            }

            forEach(action: (value: T, key: string) => void): void {
                for (const key in this.data) {
                    action(this.data[key], key);
                }
            }
        };
    }

    export function toPath(fileName: string, basePath: string, getCanonicalFileName: (path: string) => string): Path {
        const nonCanonicalizedPath = isRootedDiskPath(fileName)
            ? normalizePath(fileName)
            : getNormalizedAbsolutePath(fileName, basePath);
        return <Path>getCanonicalFileName(nonCanonicalizedPath);
    }

    export function length(array: ReadonlyArray<any>) {
        return array ? array.length : 0;
    }

    /**
     * Iterates through 'array' by index and performs the callback on each element of array until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, the callback is applied to each element of array and undefined is returned.
     */
    export function forEach<T, U>(array: ReadonlyArray<T> | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }

    /** Like `forEach`, but suitable for use with numbers and strings (which may be falsy). */
    export function firstDefined<T, U>(array: ReadonlyArray<T> | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
        if (array === undefined) {
            return undefined;
        }

        for (let i = 0; i < array.length; i++) {
            const result = callback(array[i], i);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }

    export function firstDefinedIterator<T, U>(iter: Iterator<T>, callback: (element: T) => U | undefined): U | undefined {
        while (true) {
            const { value, done } = iter.next();
            if (done) {
                return undefined;
            }
            const result = callback(value);
            if (result !== undefined) {
                return result;
            }
        }
    }

    /**
     * Iterates through the parent chain of a node and performs the callback on each parent until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
     * At that point findAncestor returns undefined.
     */
    export function findAncestor<T extends Node>(node: Node, callback: (element: Node) => element is T): T | undefined;
    export function findAncestor(node: Node, callback: (element: Node) => boolean | "quit"): Node | undefined;
    export function findAncestor(node: Node, callback: (element: Node) => boolean | "quit"): Node {
        while (node) {
            const result = callback(node);
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

    export function zipWith<T, U, V>(arrayA: ReadonlyArray<T>, arrayB: ReadonlyArray<U>, callback: (a: T, b: U, index: number) => V): V[] {
        const result: V[] = [];
        Debug.assertEqual(arrayA.length, arrayB.length);
        for (let i = 0; i < arrayA.length; i++) {
            result.push(callback(arrayA[i], arrayB[i], i));
        }
        return result;
    }

    export function zipToIterator<T, U>(arrayA: ReadonlyArray<T>, arrayB: ReadonlyArray<U>): Iterator<[T, U]> {
        Debug.assertEqual(arrayA.length, arrayB.length);
        let i = 0;
        return {
            next() {
                if (i === arrayA.length) {
                    return { value: undefined as never, done: true };
                }
                i++;
                return { value: [arrayA[i - 1], arrayB[i - 1]], done: false };
            }
        };
    }

    export function zipToMap<T>(keys: ReadonlyArray<string>, values: ReadonlyArray<T>): Map<T> {
        Debug.assert(keys.length === values.length);
        const map = createMap<T>();
        for (let i = 0; i < keys.length; ++i) {
            map.set(keys[i], values[i]);
        }
        return map;
    }

    /**
     * Iterates through `array` by index and performs the callback on each element of array until the callback
     * returns a falsey value, then returns false.
     * If no such value is found, the callback is applied to each element of array and `true` is returned.
     */
    export function every<T>(array: ReadonlyArray<T>, callback: (element: T, index: number) => boolean): boolean {
        if (array) {
            for (let i = 0; i < array.length; i++) {
                if (!callback(array[i], i)) {
                    return false;
                }
            }
        }

        return true;
    }

    /** Works like Array.prototype.find, returning `undefined` if no element satisfying the predicate is found. */
    export function find<T, U extends T>(array: ReadonlyArray<T>, predicate: (element: T, index: number) => element is U): U | undefined;
    export function find<T>(array: ReadonlyArray<T>, predicate: (element: T, index: number) => boolean): T | undefined;
    export function find<T>(array: ReadonlyArray<T>, predicate: (element: T, index: number) => boolean): T | undefined {
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }

    export function findLast<T, U extends T>(array: ReadonlyArray<T>, predicate: (element: T, index: number) => element is U): U | undefined;
    export function findLast<T>(array: ReadonlyArray<T>, predicate: (element: T, index: number) => boolean): T | undefined;
    export function findLast<T>(array: ReadonlyArray<T>, predicate: (element: T, index: number) => boolean): T | undefined {
        for (let i = array.length - 1; i >= 0; i--) {
            const value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }

    /** Works like Array.prototype.findIndex, returning `-1` if no element satisfying the predicate is found. */
    export function findIndex<T>(array: ReadonlyArray<T>, predicate: (element: T, index: number) => boolean): number {
        for (let i = 0; i < array.length; i++) {
            if (predicate(array[i], i)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Returns the first truthy result of `callback`, or else fails.
     * This is like `forEach`, but never returns undefined.
     */
    export function findMap<T, U>(array: ReadonlyArray<T>, callback: (element: T, index: number) => U | undefined): U {
        for (let i = 0; i < array.length; i++) {
            const result = callback(array[i], i);
            if (result) {
                return result;
            }
        }
        Debug.fail();
    }

    export function contains<T>(array: ReadonlyArray<T>, value: T, equalityComparer: EqualityComparer<T> = equateValues): boolean {
        if (array) {
            for (const v of array) {
                if (equalityComparer(v, value)) {
                    return true;
                }
            }
        }
        return false;
    }

    export function arraysEqual<T>(a: ReadonlyArray<T>, b: ReadonlyArray<T>, equalityComparer: EqualityComparer<T> = equateValues): boolean {
        return a.length === b.length && a.every((x, i) => equalityComparer(x, b[i]));
    }

    export function indexOfAnyCharCode(text: string, charCodes: ReadonlyArray<number>, start?: number): number {
        for (let i = start || 0; i < text.length; i++) {
            if (contains(charCodes, text.charCodeAt(i))) {
                return i;
            }
        }
        return -1;
    }

    export function countWhere<T>(array: ReadonlyArray<T>, predicate: (x: T, i: number) => boolean): number {
        let count = 0;
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const v = array[i];
                if (predicate(v, i)) {
                    count++;
                }
            }
        }
        return count;
    }

    /**
     * Filters an array by a predicate function. Returns the same array instance if the predicate is
     * true for all elements, otherwise returns a new array instance containing the filtered subset.
     */
    export function filter<T, U extends T>(array: T[], f: (x: T) => x is U): U[];
    export function filter<T>(array: T[], f: (x: T) => boolean): T[];
    export function filter<T, U extends T>(array: ReadonlyArray<T>, f: (x: T) => x is U): ReadonlyArray<U>;
    export function filter<T, U extends T>(array: ReadonlyArray<T>, f: (x: T) => boolean): ReadonlyArray<T>;
    export function filter<T>(array: T[], f: (x: T) => boolean): T[] {
        if (array) {
            const len = array.length;
            let i = 0;
            while (i < len && f(array[i])) i++;
            if (i < len) {
                const result = array.slice(0, i);
                i++;
                while (i < len) {
                    const item = array[i];
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

    export function filterMutate<T>(array: T[], f: (x: T, i: number, array: T[]) => boolean): void {
        let outIndex = 0;
        for (let i = 0; i < array.length; i++) {
            if (f(array[i], i, array)) {
                array[outIndex] = array[i];
                outIndex++;
            }
        }
        array.length = outIndex;
    }

    export function clear(array: {}[]): void {
        array.length = 0;
    }

    export function map<T, U>(array: ReadonlyArray<T>, f: (x: T, i: number) => U): U[] {
        let result: U[];
        if (array) {
            result = [];
            for (let i = 0; i < array.length; i++) {
                result.push(f(array[i], i));
            }
        }
        return result;
    }


    export function mapIterator<T, U>(iter: Iterator<T>, mapFn: (x: T) => U): Iterator<U> {
        return {
            next() {
                const iterRes = iter.next();
                return iterRes.done ? iterRes : { value: mapFn(iterRes.value), done: false };
            }
        };
    }

    // Maps from T to T and avoids allocation if all elements map to themselves
    export function sameMap<T>(array: T[], f: (x: T, i: number) => T): T[];
    export function sameMap<T>(array: ReadonlyArray<T>, f: (x: T, i: number) => T): ReadonlyArray<T>;
    export function sameMap<T>(array: T[], f: (x: T, i: number) => T): T[] {
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const item = array[i];
                const mapped = f(item, i);
                if (item !== mapped) {
                    const result = array.slice(0, i);
                    result.push(mapped);
                    for (i++; i < array.length; i++) {
                        result.push(f(array[i], i));
                    }
                    return result;
                }
            }
        }
        return array;
    }

    /**
     * Flattens an array containing a mix of array or non-array elements.
     *
     * @param array The array to flatten.
     */
    export function flatten<T>(array: ReadonlyArray<T | ReadonlyArray<T>>): T[] {
        let result: T[];
        if (array) {
            result = [];
            for (const v of array) {
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

    /**
     * Maps an array. If the mapped value is an array, it is spread into the result.
     *
     * @param array The array to map.
     * @param mapfn The callback used to map the result into one or more values.
     */
    export function flatMap<T, U>(array: ReadonlyArray<T> | undefined, mapfn: (x: T, i: number) => U | ReadonlyArray<U> | undefined): U[] | undefined {
        let result: U[];
        if (array) {
            result = [];
            for (let i = 0; i < array.length; i++) {
                const v = mapfn(array[i], i);
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

    export function flatMapIterator<T, U>(iter: Iterator<T>, mapfn: (x: T) => U[] | Iterator<U> | undefined): Iterator<U> {
        const first = iter.next();
        if (first.done) {
            return emptyIterator;
        }
        let currentIter = getIterator(first.value);
        return {
            next() {
                while (true) {
                    const currentRes = currentIter.next();
                    if (!currentRes.done) {
                        return currentRes;
                    }
                    const iterRes = iter.next();
                    if (iterRes.done) {
                        return iterRes;
                    }
                    currentIter = getIterator(iterRes.value);
                }
            },
        };

        function getIterator(x: T): Iterator<U> {
            const res = mapfn(x);
            return res === undefined ? emptyIterator : isArray(res) ? arrayIterator(res) : res;
        }
    }

    /**
     * Maps an array. If the mapped value is an array, it is spread into the result.
     * Avoids allocation if all elements map to themselves.
     *
     * @param array The array to map.
     * @param mapfn The callback used to map the result into one or more values.
     */
    export function sameFlatMap<T>(array: T[], mapfn: (x: T, i: number) => T | ReadonlyArray<T>): T[];
    export function sameFlatMap<T>(array: ReadonlyArray<T>, mapfn: (x: T, i: number) => T | ReadonlyArray<T>): ReadonlyArray<T>;
    export function sameFlatMap<T>(array: T[], mapfn: (x: T, i: number) => T | T[]): T[] {
        let result: T[];
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const item = array[i];
                const mapped = mapfn(item, i);
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

    export function mapAllOrFail<T, U>(array: ReadonlyArray<T>, mapFn: (x: T, i: number) => U | undefined): U[] | undefined {
        const result: U[] = [];
        for (let i = 0; i < array.length; i++) {
            const mapped = mapFn(array[i], i);
            if (mapped === undefined) {
                return undefined;
            }
            result.push(mapped);
        }
        return result;
    }

    export function mapDefined<T, U>(array: ReadonlyArray<T> | undefined, mapFn: (x: T, i: number) => U | undefined): U[] {
        const result: U[] = [];
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const mapped = mapFn(array[i], i);
                if (mapped !== undefined) {
                    result.push(mapped);
                }
            }
        }
        return result;
    }

    export function mapDefinedIterator<T, U>(iter: Iterator<T>, mapFn: (x: T) => U | undefined): Iterator<U> {
        return {
            next() {
                while (true) {
                    const res = iter.next();
                    if (res.done) {
                        return res;
                    }
                    const value = mapFn(res.value);
                    if (value !== undefined) {
                        return { value, done: false };
                    }
                }
            }
        };
    }

    export const emptyIterator: Iterator<never> = { next: () => ({ value: undefined as never, done: true }) };

    export function singleIterator<T>(value: T): Iterator<T> {
        let done = false;
        return {
            next() {
                const wasDone = done;
                done = true;
                return wasDone ? { value: undefined as never, done: true } : { value, done: false };
            }
        };
    }

    /**
     * Computes the first matching span of elements and returns a tuple of the first span
     * and the remaining elements.
     */
    export function span<T>(array: ReadonlyArray<T>, f: (x: T, i: number) => boolean): [T[], T[]] {
        if (array) {
            for (let i = 0; i < array.length; i++) {
                if (!f(array[i], i)) {
                    return [array.slice(0, i), array.slice(i)];
                }
            }
            return [array.slice(0), []];
        }

        return undefined;
    }

    /**
     * Maps contiguous spans of values with the same key.
     *
     * @param array The array to map.
     * @param keyfn A callback used to select the key for an element.
     * @param mapfn A callback used to map a contiguous chunk of values to a single value.
     */
    export function spanMap<T, K, U>(array: ReadonlyArray<T>, keyfn: (x: T, i: number) => K, mapfn: (chunk: T[], key: K, start: number, end: number) => U): U[] {
        let result: U[];
        if (array) {
            result = [];
            const len = array.length;
            let previousKey: K;
            let key: K;
            let start = 0;
            let pos = 0;
            while (start < len) {
                while (pos < len) {
                    const value = array[pos];
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
                    const v = mapfn(array.slice(start, pos), previousKey, start, pos);
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

    export function mapEntries<T, U>(map: ReadonlyMap<T>, f: (key: string, value: T) => [string, U]): Map<U> {
        if (!map) {
            return undefined;
        }

        const result = createMap<U>();
        map.forEach((value, key) => {
            const [newKey, newValue] = f(key, value);
            result.set(newKey, newValue);
        });
        return result;
    }

    export function some<T>(array: ReadonlyArray<T>, predicate?: (value: T) => boolean): boolean {
        if (array) {
            if (predicate) {
                for (const v of array) {
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

    export function concatenate<T>(array1: T[], array2: T[]): T[];
    export function concatenate<T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>): ReadonlyArray<T>;
    export function concatenate<T>(array1: T[], array2: T[]): T[] {
        if (!some(array2)) return array1;
        if (!some(array1)) return array2;
        return [...array1, ...array2];
    }

    function deduplicateRelational<T>(array: ReadonlyArray<T>, equalityComparer: EqualityComparer<T>, comparer: Comparer<T>) {
        // Perform a stable sort of the array. This ensures the first entry in a list of
        // duplicates remains the first entry in the result.
        const indices = array.map((_, i) => i);
        stableSortIndices(array, indices, comparer);

        let last = array[indices[0]];
        const deduplicated: number[] = [indices[0]];
        for (let i = 1; i < indices.length; i++) {
            const index = indices[i];
            const item = array[index];
            if (!equalityComparer(last, item)) {
                deduplicated.push(index);
                last = item;
            }
        }

        // restore original order
        deduplicated.sort();
        return deduplicated.map(i => array[i]);
    }

    function deduplicateEquality<T>(array: ReadonlyArray<T>, equalityComparer: EqualityComparer<T>) {
        const result: T[] = [];
        for (const item of array) {
            pushIfUnique(result, item, equalityComparer);
        }
        return result;
    }

    /**
     * Deduplicates an unsorted array.
     * @param equalityComparer An optional `EqualityComparer` used to determine if two values are duplicates.
     * @param comparer An optional `Comparer` used to sort entries before comparison, though the
     * result will remain in the original order in `array`.
     */
    export function deduplicate<T>(array: ReadonlyArray<T>, equalityComparer: EqualityComparer<T>, comparer?: Comparer<T>): T[] {
        return !array ? undefined :
            array.length === 0 ? [] :
            array.length === 1 ? array.slice() :
            comparer ? deduplicateRelational(array, equalityComparer, comparer) :
            deduplicateEquality(array, equalityComparer);
    }

    /**
     * Deduplicates an array that has already been sorted.
     */
    function deduplicateSorted<T>(array: ReadonlyArray<T>, comparer: EqualityComparer<T> | Comparer<T>) {
        if (!array) return undefined;
        if (array.length === 0) return [];

        let last = array[0];
        const deduplicated: T[] = [last];
        for (let i = 1; i < array.length; i++) {
            const next = array[i];
            switch (comparer(next, last)) {
                // equality comparison
                case true:

                // relational comparison
                case Comparison.EqualTo:
                    continue;

                case Comparison.LessThan:
                    // If `array` is sorted, `next` should **never** be less than `last`.
                    return Debug.fail("Array is unsorted.");
            }

            deduplicated.push(last = next);
        }

        return deduplicated;
    }

    export function insertSorted<T>(array: SortedArray<T>, insert: T, compare: Comparer<T>): void {
        if (array.length === 0) {
            array.push(insert);
            return;
        }

        const insertIndex = binarySearch(array, insert, identity, compare);
        if (insertIndex < 0) {
            array.splice(~insertIndex, 0, insert);
        }
    }

    export function sortAndDeduplicate<T>(array: ReadonlyArray<T>, comparer: Comparer<T>, equalityComparer?: EqualityComparer<T>) {
        return deduplicateSorted(sort(array, comparer), equalityComparer || comparer);
    }

    export function arrayIsEqualTo<T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>, equalityComparer: (a: T, b: T) => boolean = equateValues): boolean {
        if (!array1 || !array2) {
            return array1 === array2;
        }

        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (!equalityComparer(array1[i], array2[i])) {
                return false;
            }
        }

        return true;
    }

    export function changesAffectModuleResolution(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean {
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

    /**
     * Compacts an array, removing any falsey elements.
     */
    export function compact<T>(array: T[]): T[];
    export function compact<T>(array: ReadonlyArray<T>): ReadonlyArray<T>;
    export function compact<T>(array: T[]): T[] {
        let result: T[];
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const v = array[i];
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

    /**
     * Gets the relative complement of `arrayA` with respect to `arrayB`, returning the elements that
     * are not present in `arrayA` but are present in `arrayB`. Assumes both arrays are sorted
     * based on the provided comparer.
     */
    export function relativeComplement<T>(arrayA: T[] | undefined, arrayB: T[] | undefined, comparer: Comparer<T>): T[] | undefined {
        if (!arrayB || !arrayA || arrayB.length === 0 || arrayA.length === 0) return arrayB;
        const result: T[] = [];
        loopB: for (let offsetA = 0, offsetB = 0; offsetB < arrayB.length; offsetB++) {
            if (offsetB > 0) {
                // Ensure `arrayB` is properly sorted.
                Debug.assertGreaterThanOrEqual(comparer(arrayB[offsetB], arrayB[offsetB - 1]), Comparison.EqualTo);
            }

            loopA: for (const startA = offsetA; offsetA < arrayA.length; offsetA++) {
                if (offsetA > startA) {
                    // Ensure `arrayA` is properly sorted. We only need to perform this check if
                    // `offsetA` has changed since we entered the loop.
                    Debug.assertGreaterThanOrEqual(comparer(arrayA[offsetA], arrayA[offsetA - 1]), Comparison.EqualTo);
                }

                switch (comparer(arrayB[offsetB], arrayA[offsetA])) {
                    case Comparison.LessThan:
                        // If B is less than A, B does not exist in arrayA. Add B to the result and
                        // move to the next element in arrayB without changing the current position
                        // in arrayA.
                        result.push(arrayB[offsetB]);
                        continue loopB;
                    case Comparison.EqualTo:
                        // If B is equal to A, B exists in arrayA. Move to the next element in
                        // arrayB without adding B to the result or changing the current position
                        // in arrayA.
                        continue loopB;
                    case Comparison.GreaterThan:
                        // If B is greater than A, we need to keep looking for B in arrayA. Move to
                        // the next element in arrayA and recheck.
                        continue loopA;
                }
            }
        }
        return result;
    }

    export function sum<T extends Record<K, number>, K extends string>(array: ReadonlyArray<T>, prop: K): number {
        let result = 0;
        for (const v of array) {
            // TODO: Remove the following type assertion once the fix for #17069 is merged
            result += v[prop] as number;
        }
        return result;
    }

    /**
     * Appends a value to an array, returning the array.
     *
     * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
     * is created if `value` was appended.
     * @param value The value to append to the array. If `value` is `undefined`, nothing is
     * appended.
     */
    export function append<T>(to: T[] | undefined, value: T | undefined): T[] | undefined {
        if (value === undefined) return to;
        if (to === undefined) return [value];
        to.push(value);
        return to;
    }

    /**
     * Gets the actual offset into an array for a relative offset. Negative offsets indicate a
     * position offset from the end of the array.
     */
    function toOffset(array: ReadonlyArray<any>, offset: number) {
        return offset < 0 ? array.length + offset : offset;
    }

    /**
     * Appends a range of value to an array, returning the array.
     *
     * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
     * is created if `value` was appended.
     * @param from The values to append to the array. If `from` is `undefined`, nothing is
     * appended. If an element of `from` is `undefined`, that element is not appended.
     * @param start The offset in `from` at which to start copying values.
     * @param end The offset in `from` at which to stop copying values (non-inclusive).
     */
    export function addRange<T>(to: T[] | undefined, from: ReadonlyArray<T> | undefined, start?: number, end?: number): T[] | undefined {
        if (from === undefined || from.length === 0) return to;
        if (to === undefined) return from.slice(start, end);
        start = start === undefined ? 0 : toOffset(from, start);
        end = end === undefined ? from.length : toOffset(from, end);
        for (let i = start; i < end && i < from.length; i++) {
            if (from[i] !== undefined) {
                to.push(from[i]);
            }
        }
        return to;
    }

    /**
     * @return Whether the value was added.
     */
    export function pushIfUnique<T>(array: T[], toAdd: T, equalityComparer?: EqualityComparer<T>): boolean {
        if (contains(array, toAdd, equalityComparer)) {
            return false;
        }
        else {
            array.push(toAdd);
            return true;
        }
    }

    /**
     * Unlike `pushIfUnique`, this can take `undefined` as an input, and returns a new array.
     */
    export function appendIfUnique<T>(array: T[] | undefined, toAdd: T, equalityComparer?: EqualityComparer<T>): T[] {
        if (array) {
            pushIfUnique(array, toAdd, equalityComparer);
            return array;
        }
        else {
            return [toAdd];
        }
    }

    function stableSortIndices<T>(array: ReadonlyArray<T>, indices: number[], comparer: Comparer<T>) {
        // sort indices by value then position
        indices.sort((x, y) => comparer(array[x], array[y]) || compareValues(x, y));
    }

    /**
     * Returns a new sorted array.
     */
    export function sort<T>(array: ReadonlyArray<T>, comparer: Comparer<T>) {
        return array.slice().sort(comparer);
    }

    export function best<T>(iter: Iterator<T>, isBetter: (a: T, b: T) => boolean): T | undefined {
        const x = iter.next();
        if (x.done) {
            return undefined;
        }
        let best = x.value;
        while (true) {
            const { value, done } = iter.next();
            if (done) {
                return best;
            }
            if (isBetter(value, best)) {
                best = value;
            }
        }
    }

    export function arrayIterator<T>(array: ReadonlyArray<T>): Iterator<T> {
        let i = 0;
        return { next: () => {
            if (i === array.length) {
                return { value: undefined as never, done: true };
            }
            else {
                i++;
                return { value: array[i - 1], done: false };
            }
        }};
    }

    /**
     * Stable sort of an array. Elements equal to each other maintain their relative position in the array.
     */
    export function stableSort<T>(array: ReadonlyArray<T>, comparer: Comparer<T>) {
        const indices = array.map((_, i) => i);
        stableSortIndices(array, indices, comparer);
        return indices.map(i => array[i]);
    }

    export function rangeEquals<T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>, pos: number, end: number) {
        while (pos < end) {
            if (array1[pos] !== array2[pos]) {
                return false;
            }
            pos++;
        }
        return true;
    }

    /**
     * Returns the element at a specific offset in an array if non-empty, `undefined` otherwise.
     * A negative offset indicates the element should be retrieved from the end of the array.
     */
    export function elementAt<T>(array: ReadonlyArray<T> | undefined, offset: number): T | undefined {
        if (array) {
            offset = toOffset(array, offset);
            if (offset < array.length) {
                return array[offset];
            }
        }
        return undefined;
    }

    /**
     * Returns the first element of an array if non-empty, `undefined` otherwise.
     */
    export function firstOrUndefined<T>(array: ReadonlyArray<T>): T | undefined {
        return elementAt(array, 0);
    }

    export function first<T>(array: ReadonlyArray<T>): T {
        Debug.assert(array.length !== 0);
        return array[0];
    }

    /**
     * Returns the last element of an array if non-empty, `undefined` otherwise.
     */
    export function lastOrUndefined<T>(array: ReadonlyArray<T>): T | undefined {
        return elementAt(array, -1);
    }

    export function last<T>(array: ReadonlyArray<T>): T {
        Debug.assert(array.length !== 0);
        return array[array.length - 1];
    }

    /**
     * Returns the only element of an array if it contains only one element, `undefined` otherwise.
     */
    export function singleOrUndefined<T>(array: ReadonlyArray<T>): T | undefined {
        return array && array.length === 1
            ? array[0]
            : undefined;
    }

    /**
     * Returns the only element of an array if it contains only one element; otheriwse, returns the
     * array.
     */
    export function singleOrMany<T>(array: T[]): T | T[];
    export function singleOrMany<T>(array: ReadonlyArray<T>): T | ReadonlyArray<T>;
    export function singleOrMany<T>(array: T[]): T | T[] {
        return array && array.length === 1
            ? array[0]
            : array;
    }

    export function replaceElement<T>(array: ReadonlyArray<T>, index: number, value: T): T[] {
        const result = array.slice(0);
        result[index] = value;
        return result;
    }

    /**
     * Performs a binary search, finding the index at which `value` occurs in `array`.
     * If no such index is found, returns the 2's-complement of first index at which
     * `array[index]` exceeds `value`.
     * @param array A sorted array whose first element must be no larger than number
     * @param value The value to be searched for in the array.
     * @param keySelector A callback used to select the search key from `value` and each element of
     * `array`.
     * @param keyComparer A callback used to compare two keys in a sorted array.
     * @param offset An offset into `array` at which to start the search.
     */
    export function binarySearch<T, U>(array: ReadonlyArray<T>, value: T, keySelector: (v: T) => U, keyComparer: Comparer<U>, offset?: number): number {
        if (!array || array.length === 0) {
            return -1;
        }

        let low = offset || 0;
        let high = array.length - 1;
        const key = keySelector(value);
        while (low <= high) {
            const middle = low + ((high - low) >> 1);
            const midKey = keySelector(array[middle]);
            switch (keyComparer(midKey, key)) {
                case Comparison.LessThan:
                    low = middle + 1;
                    break;
                case Comparison.EqualTo:
                    return middle;
                case Comparison.GreaterThan:
                    high = middle - 1;
                    break;
            }
        }

        return ~low;
    }

    export function reduceLeft<T, U>(array: ReadonlyArray<T>, f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
    export function reduceLeft<T>(array: ReadonlyArray<T>, f: (memo: T, value: T, i: number) => T): T;
    export function reduceLeft<T>(array: T[], f: (memo: T, value: T, i: number) => T, initial?: T, start?: number, count?: number): T {
        if (array && array.length > 0) {
            const size = array.length;
            if (size > 0) {
                let pos = start === undefined || start < 0 ? 0 : start;
                const end = count === undefined || pos + count > size - 1 ? size - 1 : pos + count;
                let result: T;
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

    const hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * Indicates whether a map-like contains an own property with the specified key.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    export function hasProperty(map: MapLike<any>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    /**
     * Gets the value of an owned property in a map-like.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    export function getProperty<T>(map: MapLike<T>, key: string): T | undefined {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }

    /**
     * Gets the owned, enumerable property keys of a map-like.
     */
    export function getOwnKeys<T>(map: MapLike<T>): string[] {
        const keys: string[] = [];
        for (const key in map) {
            if (hasOwnProperty.call(map, key)) {
                keys.push(key);
            }
        }

        return keys;
    }

    export function getOwnValues<T>(sparseArray: T[]): T[] {
        const values: T[] = [];
        for (const key in sparseArray) {
            if (hasOwnProperty.call(sparseArray, key)) {
                values.push(sparseArray[key]);
            }
        }

        return values;
    }

    /** Shims `Array.from`. */
    export function arrayFrom<T, U>(iterator: Iterator<T>, map: (t: T) => U): U[];
    export function arrayFrom<T>(iterator: Iterator<T>): T[];
    export function arrayFrom(iterator: Iterator<any>, map?: (t: any) => any): any[] {
        const result: any[] = [];
        for (let { value, done } = iterator.next(); !done; { value, done } = iterator.next()) {
            result.push(map ? map(value) : value);
        }
        return result;
    }

    /**
     * Calls `callback` for each entry in the map, returning the first truthy result.
     * Use `map.forEach` instead for normal iteration.
     */
    export function forEachEntry<T, U>(map: ReadonlyUnderscoreEscapedMap<T>, callback: (value: T, key: __String) => U | undefined): U | undefined;
    export function forEachEntry<T, U>(map: ReadonlyMap<T>, callback: (value: T, key: string) => U | undefined): U | undefined;
    export function forEachEntry<T, U>(map: ReadonlyUnderscoreEscapedMap<T> | ReadonlyMap<T>, callback: (value: T, key: (string & __String)) => U | undefined): U | undefined {
        const iterator = map.entries();
        for (let { value: pair, done } = iterator.next(); !done; { value: pair, done } = iterator.next()) {
            const [key, value] = pair;
            const result = callback(value, key as (string & __String));
            if (result) {
                return result;
            }
        }
        return undefined;
    }

    /** `forEachEntry` for just keys. */
    export function forEachKey<T>(map: ReadonlyUnderscoreEscapedMap<{}>, callback: (key: __String) => T | undefined): T | undefined;
    export function forEachKey<T>(map: ReadonlyMap<{}>, callback: (key: string) => T | undefined): T | undefined;
    export function forEachKey<T>(map: ReadonlyUnderscoreEscapedMap<{}> | ReadonlyMap<{}>, callback: (key: string & __String) => T | undefined): T | undefined {
        const iterator = map.keys();
        for (let { value: key, done } = iterator.next(); !done; { value: key, done } = iterator.next()) {
            const result = callback(key as string & __String);
            if (result) {
                return result;
            }
        }
        return undefined;
    }

    /** Copy entries from `source` to `target`. */
    export function copyEntries<T>(source: ReadonlyUnderscoreEscapedMap<T>, target: UnderscoreEscapedMap<T>): void;
    export function copyEntries<T>(source: ReadonlyMap<T>, target: Map<T>): void;
    export function copyEntries<T, U extends UnderscoreEscapedMap<T> | Map<T>>(source: U, target: U): void {
        (source as Map<T>).forEach((value, key) => {
            (target as Map<T>).set(key, value);
        });
    }

    export function assign<T1 extends MapLike<{}>, T2, T3>(t: T1, arg1: T2, arg2: T3): T1 & T2 & T3;
    export function assign<T1 extends MapLike<{}>, T2>(t: T1, arg1: T2): T1 & T2;
    export function assign<T1 extends MapLike<{}>>(t: T1, ...args: any[]): any;
    export function assign<T1 extends MapLike<{}>>(t: T1, ...args: any[]) {
        for (const arg of args) {
            for (const p in arg) {
                if (hasProperty(arg, p)) {
                    t[p] = arg[p];
                }
            }
        }
        return t;
    }

    /**
     * Performs a shallow equality comparison of the contents of two map-likes.
     *
     * @param left A map-like whose properties should be compared.
     * @param right A map-like whose properties should be compared.
     */
    export function equalOwnProperties<T>(left: MapLike<T>, right: MapLike<T>, equalityComparer: EqualityComparer<T> = equateValues) {
        if (left === right) return true;
        if (!left || !right) return false;
        for (const key in left) {
            if (hasOwnProperty.call(left, key)) {
                if (!hasOwnProperty.call(right, key) === undefined) return false;
                if (!equalityComparer(left[key], right[key])) return false;
            }
        }

        for (const key in right) {
            if (hasOwnProperty.call(right, key)) {
                if (!hasOwnProperty.call(left, key)) return false;
            }
        }

        return true;
    }

    /**
     * Creates a map from the elements of an array.
     *
     * @param array the array of input elements.
     * @param makeKey a function that produces a key for a given element.
     *
     * This function makes no effort to avoid collisions; if any two elements produce
     * the same key with the given 'makeKey' function, then the element with the higher
     * index in the array will be the one associated with the produced key.
     */
    export function arrayToMap<T>(array: ReadonlyArray<T>, makeKey: (value: T) => string): Map<T>;
    export function arrayToMap<T, U>(array: ReadonlyArray<T>, makeKey: (value: T) => string, makeValue: (value: T) => U): Map<U>;
    export function arrayToMap<T, U>(array: ReadonlyArray<T>, makeKey: (value: T) => string, makeValue: (value: T) => T | U = identity): Map<T | U> {
        const result = createMap<T | U>();
        for (const value of array) {
            result.set(makeKey(value), makeValue(value));
        }
        return result;
    }

    export function arrayToNumericMap<T>(array: ReadonlyArray<T>, makeKey: (value: T) => number): T[];
    export function arrayToNumericMap<T, U>(array: ReadonlyArray<T>, makeKey: (value: T) => number, makeValue: (value: T) => U): U[];
    export function arrayToNumericMap<T, U>(array: ReadonlyArray<T>, makeKey: (value: T) => number, makeValue: (value: T) => T | U = identity): (T | U)[] {
        const result: (T | U)[] = [];
        for (const value of array) {
            result[makeKey(value)] = makeValue(value);
        }
        return result;
    }

    /**
     * Creates a set from the elements of an array.
     *
     * @param array the array of input elements.
     */
    export function arrayToSet(array: ReadonlyArray<string>): Map<true>;
    export function arrayToSet<T>(array: ReadonlyArray<T>, makeKey: (value: T) => string): Map<true>;
    export function arrayToSet(array: ReadonlyArray<any>, makeKey?: (value: any) => string): Map<true> {
        return arrayToMap<any, true>(array, makeKey || (s => s), () => true);
    }

    export function arrayToMultiMap<T>(values: ReadonlyArray<T>, makeKey: (value: T) => string): MultiMap<T>;
    export function arrayToMultiMap<T, U>(values: ReadonlyArray<T>, makeKey: (value: T) => string, makeValue: (value: T) => U): MultiMap<U>;
    export function arrayToMultiMap<T, U>(values: ReadonlyArray<T>, makeKey: (value: T) => string, makeValue: (value: T) => T | U = identity): MultiMap<T | U> {
        const result = createMultiMap<T | U>();
        for (const value of values) {
            result.add(makeKey(value), makeValue(value));
        }
        return result;
    }

    export function group<T>(values: ReadonlyArray<T>, getGroupId: (value: T) => string): ReadonlyArray<ReadonlyArray<T>> {
        return arrayFrom(arrayToMultiMap(values, getGroupId).values());
    }

    export function cloneMap(map: SymbolTable): SymbolTable;
    export function cloneMap<T>(map: ReadonlyMap<T>): Map<T>;
    export function cloneMap<T>(map: ReadonlyUnderscoreEscapedMap<T>): UnderscoreEscapedMap<T>;
    export function cloneMap<T>(map: ReadonlyMap<T> | ReadonlyUnderscoreEscapedMap<T> | SymbolTable): Map<T> | UnderscoreEscapedMap<T> | SymbolTable {
        const clone = createMap<T>();
        copyEntries(map as Map<T>, clone);
        return clone;
    }

    export function clone<T>(object: T): T {
        const result: any = {};
        for (const id in object) {
            if (hasOwnProperty.call(object, id)) {
                result[id] = (<any>object)[id];
            }
        }
        return result;
    }

    export function extend<T1, T2>(first: T1, second: T2): T1 & T2 {
        const result: T1 & T2 = <any>{};
        for (const id in second) {
            if (hasOwnProperty.call(second, id)) {
                (result as any)[id] = (second as any)[id];
            }
        }

        for (const id in first) {
            if (hasOwnProperty.call(first, id)) {
                (result as any)[id] = (first as any)[id];
            }
        }

        return result;
    }

    export interface MultiMap<T> extends Map<T[]> {
        /**
         * Adds the value to an array of values associated with the key, and returns the array.
         * Creates the array if it does not already exist.
         */
        add(key: string, value: T): T[];
        /**
         * Removes a value from an array of values associated with the key.
         * Does not preserve the order of those values.
         * Does nothing if `key` is not in `map`, or `value` is not in `map[key]`.
         */
        remove(key: string, value: T): void;
    }

    export function createMultiMap<T>(): MultiMap<T> {
        const map = createMap<T[]>() as MultiMap<T>;
        map.add = multiMapAdd;
        map.remove = multiMapRemove;
        return map;
    }
    function multiMapAdd<T>(this: MultiMap<T>, key: string, value: T) {
        let values = this.get(key);
        if (values) {
            values.push(value);
        }
        else {
            this.set(key, values = [value]);
        }
        return values;
    }
    function multiMapRemove<T>(this: MultiMap<T>, key: string, value: T) {
        const values = this.get(key);
        if (values) {
            unorderedRemoveItem(values, value);
            if (!values.length) {
                this.delete(key);
            }
        }
    }

    /**
     * Tests whether a value is an array.
     */
    export function isArray(value: any): value is ReadonlyArray<{}> {
        return Array.isArray ? Array.isArray(value) : value instanceof Array;
    }

    export function toArray<T>(value: T | T[]): T[];
    export function toArray<T>(value: T | ReadonlyArray<T>): ReadonlyArray<T>;
    export function toArray<T>(value: T | T[]): T[] {
        return isArray(value) ? value : [value];
    }

    /**
     * Tests whether a value is string
     */
    export function isString(text: any): text is string {
        return typeof text === "string";
    }

    export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined {
        return value !== undefined && test(value) ? value : undefined;
    }

    export function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut {
        if (value !== undefined && test(value)) return value;

        if (value && typeof (value as any).kind === "number") {
            Debug.fail(`Invalid cast. The supplied ${Debug.showSyntaxKind(value as any as Node)} did not pass the test '${Debug.getFunctionName(test)}'.`);
        }
        else {
            Debug.fail(`Invalid cast. The supplied value did not pass the test '${Debug.getFunctionName(test)}'.`);
        }
    }

    /** Does nothing. */
    export function noop(_?: {} | null | undefined): void { } // tslint:disable-line no-empty

    /** Do nothing and return false */
    export function returnFalse(): false { return false; }

    /** Do nothing and return true */
    export function returnTrue(): true { return true; }

    /** Returns its argument. */
    export function identity<T>(x: T) { return x; }

    /** Returns lower case string */
    export function toLowerCase(x: string) { return x.toLowerCase(); }

    /** Throws an error because a function is not implemented. */
    export function notImplemented(): never {
        throw new Error("Not implemented");
    }

    export function memoize<T>(callback: () => T): () => T {
        let value: T;
        return () => {
            if (callback) {
                value = callback();
                callback = undefined;
            }
            return value;
        };
    }

    /**
     * High-order function, creates a function that executes a function composition.
     * For example, `chain(a, b)` is the equivalent of `x => ((a', b') => y => b'(a'(y)))(a(x), b(x))`
     *
     * @param args The functions to chain.
     */
    export function chain<T, U>(...args: ((t: T) => (u: U) => U)[]): (t: T) => (u: U) => U;
    export function chain<T, U>(a: (t: T) => (u: U) => U, b: (t: T) => (u: U) => U, c: (t: T) => (u: U) => U, d: (t: T) => (u: U) => U, e: (t: T) => (u: U) => U): (t: T) => (u: U) => U {
        if (e) {
            const args: ((t: T) => (u: U) => U)[] = [];
            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            return t => compose(...map(args, f => f(t)));
        }
        else if (d) {
            return t => compose(a(t), b(t), c(t), d(t));
        }
        else if (c) {
            return t => compose(a(t), b(t), c(t));
        }
        else if (b) {
            return t => compose(a(t), b(t));
        }
        else if (a) {
            return t => compose(a(t));
        }
        else {
            return _ => u => u;
        }
    }

    /**
     * High-order function, composes functions. Note that functions are composed inside-out;
     * for example, `compose(a, b)` is the equivalent of `x => b(a(x))`.
     *
     * @param args The functions to compose.
     */
    export function compose<T>(...args: ((t: T) => T)[]): (t: T) => T;
    export function compose<T>(a: (t: T) => T, b: (t: T) => T, c: (t: T) => T, d: (t: T) => T, e: (t: T) => T): (t: T) => T {
        if (e) {
            const args: ((t: T) => T)[] = [];
            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            return t => reduceLeft(args, (u, f) => f(u), t);
        }
        else if (d) {
            return t => d(c(b(a(t))));
        }
        else if (c) {
            return t => c(b(a(t)));
        }
        else if (b) {
            return t => b(a(t));
        }
        else if (a) {
            return t => a(t);
        }
        else {
            return t => t;
        }
    }

    export function formatStringFromArgs(text: string, args: { [index: number]: string; }, baseIndex?: number): string {
        baseIndex = baseIndex || 0;

        return text.replace(/{(\d+)}/g, (_match, index?) => args[+index + baseIndex]);
    }

    export let localizedDiagnosticMessages: MapLike<string>;

    export function getLocaleSpecificMessage(message: DiagnosticMessage) {
        return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
    }

    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: (string | number)[]): Diagnostic;
    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage): Diagnostic {
        Debug.assertGreaterThanOrEqual(start, 0);
        Debug.assertGreaterThanOrEqual(length, 0);

        if (file) {
            Debug.assertLessThanOrEqual(start, file.text.length);
            Debug.assertLessThanOrEqual(start + length, file.text.length);
        }

        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 4) {
            text = formatStringFromArgs(text, arguments, 4);
        }

        return {
            file,
            start,
            length,

            messageText: text,
            category: message.category,
            code: message.code,
        };
    }

    /* internal */
    export function formatMessage(_dummy: any, message: DiagnosticMessage): string {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }

        return text;
    }

    export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: (string | number)[]): Diagnostic;
    export function createCompilerDiagnostic(message: DiagnosticMessage): Diagnostic {
        let text = getLocaleSpecificMessage(message);

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

    export function createCompilerDiagnosticFromMessageChain(chain: DiagnosticMessageChain): Diagnostic {
        return {
            file: undefined,
            start: undefined,
            length: undefined,

            code: chain.code,
            category: chain.category,
            messageText: chain.next ? chain : chain.messageText
        };
    }

    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage, ...args: string[]): DiagnosticMessageChain;
    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage): DiagnosticMessageChain {
        let text = getLocaleSpecificMessage(message);

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

    export function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): DiagnosticMessageChain {
        let lastChain = headChain;
        while (lastChain.next) {
            lastChain = lastChain.next;
        }

        lastChain.next = tailChain;
        return headChain;
    }

    export function equateValues<T>(a: T, b: T) {
        return a === b;
    }

    /**
     * Compare the equality of two strings using a case-sensitive ordinal comparison.
     *
     * Case-sensitive comparisons compare both strings one code-point at a time using the integer
     * value of each code-point after applying `toUpperCase` to each string. We always map both
     * strings to their upper-case form as some unicode characters do not properly round-trip to
     * lowercase (such as `ẞ` (German sharp capital s)).
     */
    export function equateStringsCaseInsensitive(a: string, b: string) {
        return a === b
            || a !== undefined
            && b !== undefined
            && a.toUpperCase() === b.toUpperCase();
    }

    /**
     * Compare the equality of two strings using a case-sensitive ordinal comparison.
     *
     * Case-sensitive comparisons compare both strings one code-point at a time using the
     * integer value of each code-point.
     */
    export function equateStringsCaseSensitive(a: string, b: string) {
        return equateValues(a, b);
    }

    function compareComparableValues(a: string, b: string): Comparison;
    function compareComparableValues(a: number, b: number): Comparison;
    function compareComparableValues(a: string | number, b: string | number) {
        return a === b ? Comparison.EqualTo :
            a === undefined ? Comparison.LessThan :
            b === undefined ? Comparison.GreaterThan :
            a < b ? Comparison.LessThan :
            Comparison.GreaterThan;
    }

    /**
     * Compare two numeric values for their order relative to each other.
     * To compare strings, use any of the `compareStrings` functions.
     */
    export function compareValues(a: number, b: number) {
        return compareComparableValues(a, b);
    }

    /**
     * Compare two strings using a case-insensitive ordinal comparison.
     *
     * Ordinal comparisons are based on the difference between the unicode code points of both
     * strings. Characters with multiple unicode representations are considered unequal. Ordinal
     * comparisons provide predictable ordering, but place "a" after "B".
     *
     * Case-insensitive comparisons compare both strings one code-point at a time using the integer
     * value of each code-point after applying `toUpperCase` to each string. We always map both
     * strings to their upper-case form as some unicode characters do not properly round-trip to
     * lowercase (such as `ẞ` (German sharp capital s)).
     */
    export function compareStringsCaseInsensitive(a: string, b: string) {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        a = a.toUpperCase();
        b = b.toUpperCase();
        return a < b ? Comparison.LessThan : a > b ? Comparison.GreaterThan : Comparison.EqualTo;
    }

    /**
     * Compare two strings using a case-sensitive ordinal comparison.
     *
     * Ordinal comparisons are based on the difference between the unicode code points of both
     * strings. Characters with multiple unicode representations are considered unequal. Ordinal
     * comparisons provide predictable ordering, but place "a" after "B".
     *
     * Case-sensitive comparisons compare both strings one code-point at a time using the integer
     * value of each code-point.
     */
    export function compareStringsCaseSensitive(a: string, b: string) {
        return compareComparableValues(a, b);
    }

    /**
     * Creates a string comparer for use with string collation in the UI.
     */
    const createUIStringComparer = (() => {
        let defaultComparer: Comparer<string> | undefined;
        let enUSComparer: Comparer<string> | undefined;

        const stringComparerFactory = getStringComparerFactory();
        return createStringComparer;

        function compareWithCallback(a: string | undefined, b: string | undefined, comparer: (a: string, b: string) => number) {
            if (a === b) return Comparison.EqualTo;
            if (a === undefined) return Comparison.LessThan;
            if (b === undefined) return Comparison.GreaterThan;
            const value = comparer(a, b);
            return value < 0 ? Comparison.LessThan : value > 0 ? Comparison.GreaterThan : Comparison.EqualTo;
        }

        function createIntlCollatorStringComparer(locale: string | undefined): Comparer<string> {
            // Intl.Collator.prototype.compare is bound to the collator. See NOTE in
            // http://www.ecma-international.org/ecma-402/2.0/#sec-Intl.Collator.prototype.compare
            const comparer = new Intl.Collator(locale, { usage: "sort", sensitivity: "variant" }).compare;
            return (a, b) => compareWithCallback(a, b, comparer);
        }

        function createLocaleCompareStringComparer(locale: string | undefined): Comparer<string> {
            // if the locale is not the default locale (`undefined`), use the fallback comparer.
            if (locale !== undefined) return createFallbackStringComparer();

            return (a, b) => compareWithCallback(a, b, compareStrings);

            function compareStrings(a: string, b: string) {
                return a.localeCompare(b);
            }
        }

        function createFallbackStringComparer(): Comparer<string> {
            // An ordinal comparison puts "A" after "b", but for the UI we want "A" before "b".
            // We first sort case insensitively.  So "Aaa" will come before "baa".
            // Then we sort case sensitively, so "aaa" will come before "Aaa".
            //
            // For case insensitive comparisons we always map both strings to their
            // upper-case form as some unicode characters do not properly round-trip to
            // lowercase (such as `ẞ` (German sharp capital s)).
            return (a, b) => compareWithCallback(a, b, compareDictionaryOrder);

            function compareDictionaryOrder(a: string, b: string) {
                return compareStrings(a.toUpperCase(), b.toUpperCase()) || compareStrings(a, b);
            }

            function compareStrings(a: string, b: string) {
                return a < b ? Comparison.LessThan : a > b ? Comparison.GreaterThan : Comparison.EqualTo;
            }
        }

        function getStringComparerFactory() {
            // If the host supports Intl, we use it for comparisons using the default locale.
            if (typeof Intl === "object" && typeof Intl.Collator === "function") {
                return createIntlCollatorStringComparer;
            }

            // If the host does not support Intl, we fall back to localeCompare.
            // localeCompare in Node v0.10 is just an ordinal comparison, so don't use it.
            if (typeof String.prototype.localeCompare === "function" &&
                typeof String.prototype.toLocaleUpperCase === "function" &&
                "a".localeCompare("B") < 0) {
                return createLocaleCompareStringComparer;
            }

            // Otherwise, fall back to ordinal comparison:
            return createFallbackStringComparer;
        }

        function createStringComparer(locale: string | undefined) {
            // Hold onto common string comparers. This avoids constantly reallocating comparers during
            // tests.
            if (locale === undefined) {
                return defaultComparer || (defaultComparer = stringComparerFactory(locale));
            }
            else if (locale === "en-US") {
                return enUSComparer || (enUSComparer = stringComparerFactory(locale));
            }
            else {
                return stringComparerFactory(locale);
            }
        }
    })();

    let uiComparerCaseSensitive: Comparer<string> | undefined;
    let uiLocale: string | undefined;

    export function getUILocale() {
        return uiLocale;
    }

    export function setUILocale(value: string) {
        if (uiLocale !== value) {
            uiLocale = value;
            uiComparerCaseSensitive = undefined;
        }
    }

    /**
     * Compare two strings in a using the case-sensitive sort behavior of the UI locale.
     *
     * Ordering is not predictable between different host locales, but is best for displaying
     * ordered data for UI presentation. Characters with multiple unicode representations may
     * be considered equal.
     *
     * Case-sensitive comparisons compare strings that differ in base characters, or
     * accents/diacritic marks, or case as unequal.
     */
    export function compareStringsCaseSensitiveUI(a: string, b: string) {
        const comparer = uiComparerCaseSensitive || (uiComparerCaseSensitive = createUIStringComparer(uiLocale));
        return comparer(a, b);
    }

    export function compareProperties<T, K extends keyof T>(a: T, b: T, key: K, comparer: Comparer<T[K]>) {
        return a === b ? Comparison.EqualTo :
            a === undefined ? Comparison.LessThan :
            b === undefined ? Comparison.GreaterThan :
            comparer(a[key], b[key]);
    }

    function getDiagnosticFileName(diagnostic: Diagnostic): string {
        return diagnostic.file ? diagnostic.file.fileName : undefined;
    }

    export function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): Comparison {
        return compareStringsCaseSensitive(getDiagnosticFileName(d1), getDiagnosticFileName(d2)) ||
            compareValues(d1.start, d2.start) ||
            compareValues(d1.length, d2.length) ||
            compareValues(d1.code, d2.code) ||
            compareMessageText(d1.messageText, d2.messageText) ||
            Comparison.EqualTo;
    }

    /** True is greater than false. */
    export function compareBooleans(a: boolean, b: boolean): Comparison {
        return compareValues(a ? 1 : 0, b ? 1 : 0);
    }

    function compareMessageText(text1: string | DiagnosticMessageChain, text2: string | DiagnosticMessageChain): Comparison {
        while (text1 && text2) {
            // We still have both chains.
            const string1 = isString(text1) ? text1 : text1.messageText;
            const string2 = isString(text2) ? text2 : text2.messageText;

            const res = compareStringsCaseSensitive(string1, string2);
            if (res) {
                return res;
            }

            text1 = isString(text1) ? undefined : text1.next;
            text2 = isString(text2) ? undefined : text2.next;
        }

        if (!text1 && !text2) {
            // if the chains are done, then these messages are the same.
            return Comparison.EqualTo;
        }

        // We still have one chain remaining.  The shorter chain should come first.
        return text1 ? Comparison.GreaterThan : Comparison.LessThan;
    }

    export function normalizeSlashes(path: string): string {
        return path.replace(/\\/g, "/");
    }

    /**
     * Returns length of path root (i.e. length of "/", "x:/", "//server/share/, file:///user/files")
     */
    export function getRootLength(path: string): number {
        if (path.charCodeAt(0) === CharacterCodes.slash) {
            if (path.charCodeAt(1) !== CharacterCodes.slash) return 1;
            const p1 = path.indexOf("/", 2);
            if (p1 < 0) return 2;
            const p2 = path.indexOf("/", p1 + 1);
            if (p2 < 0) return p1 + 1;
            return p2 + 1;
        }
        if (path.charCodeAt(1) === CharacterCodes.colon) {
            if (path.charCodeAt(2) === CharacterCodes.slash || path.charCodeAt(2) === CharacterCodes.backslash) return 3;
        }
        // Per RFC 1738 'file' URI schema has the shape file://<host>/<path>
        // if <host> is omitted then it is assumed that host value is 'localhost',
        // however slash after the omitted <host> is not removed.
        // file:///folder1/file1 - this is a correct URI
        // file://folder2/file2 - this is an incorrect URI
        if (path.lastIndexOf("file:///", 0) === 0) {
            return "file:///".length;
        }
        const idx = path.indexOf("://");
        if (idx !== -1) {
            return idx + "://".length;
        }
        return 0;
    }

    /**
     * Internally, we represent paths as strings with '/' as the directory separator.
     * When we make system calls (eg: LanguageServiceHost.getDirectory()),
     * we expect the host to correctly handle paths in our specified format.
     */
    export const directorySeparator = "/";
    const directorySeparatorCharCode = CharacterCodes.slash;
    function getNormalizedParts(normalizedSlashedPath: string, rootLength: number): string[] {
        const parts = normalizedSlashedPath.substr(rootLength).split(directorySeparator);
        const normalized: string[] = [];
        for (const part of parts) {
            if (part !== ".") {
                if (part === ".." && normalized.length > 0 && lastOrUndefined(normalized) !== "..") {
                    normalized.pop();
                }
                else {
                    // A part may be an empty string (which is 'falsy') if the path had consecutive slashes,
                    // e.g. "path//file.ts".  Drop these before re-joining the parts.
                    if (part) {
                        normalized.push(part);
                    }
                }
            }
        }

        return normalized;
    }

    export function normalizePath(path: string): string {
        return normalizePathAndParts(path).path;
    }

    export function normalizePathAndParts(path: string): { path: string, parts: string[] } {
        path = normalizeSlashes(path);
        const rootLength = getRootLength(path);
        const root = path.substr(0, rootLength);
        const parts = getNormalizedParts(path, rootLength);
        if (parts.length) {
            const joinedParts = root + parts.join(directorySeparator);
            return { path: pathEndsWithDirectorySeparator(path) ? joinedParts + directorySeparator : joinedParts, parts };
        }
        else {
            return { path: root, parts };
        }
    }

    /** A path ending with '/' refers to a directory only, never a file. */
    export function pathEndsWithDirectorySeparator(path: string): boolean {
        return path.charCodeAt(path.length - 1) === directorySeparatorCharCode;
    }

    /**
     * Returns the path except for its basename. Eg:
     *
     * /path/to/file.ext -> /path/to
     */
    export function getDirectoryPath(path: Path): Path;
    export function getDirectoryPath(path: string): string;
    export function getDirectoryPath(path: string): string {
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(directorySeparator)));
    }

    export function isUrl(path: string) {
        return path && !isRootedDiskPath(path) && stringContains(path, "://");
    }

    export function pathIsRelative(path: string): boolean {
        return /^\.\.?($|[\\/])/.test(path);
    }

    export function getEmitScriptTarget(compilerOptions: CompilerOptions) {
        return compilerOptions.target || ScriptTarget.ES3;
    }

    export function getEmitModuleKind(compilerOptions: CompilerOptions) {
        return typeof compilerOptions.module === "number" ?
            compilerOptions.module :
            getEmitScriptTarget(compilerOptions) >= ScriptTarget.ES2015 ? ModuleKind.ES2015 : ModuleKind.CommonJS;
    }

    export function getEmitModuleResolutionKind(compilerOptions: CompilerOptions) {
        let moduleResolution = compilerOptions.moduleResolution;
        if (moduleResolution === undefined) {
            moduleResolution = getEmitModuleKind(compilerOptions) === ModuleKind.CommonJS ? ModuleResolutionKind.NodeJs : ModuleResolutionKind.Classic;
        }
        return moduleResolution;
    }

    export function getAllowSyntheticDefaultImports(compilerOptions: CompilerOptions) {
        const moduleKind = getEmitModuleKind(compilerOptions);
        return compilerOptions.allowSyntheticDefaultImports !== undefined
            ? compilerOptions.allowSyntheticDefaultImports
            : compilerOptions.esModuleInterop
                ? moduleKind !== ModuleKind.None && moduleKind < ModuleKind.ES2015
                : moduleKind === ModuleKind.System;
    }

    export type StrictOptionName = "noImplicitAny" | "noImplicitThis" | "strictNullChecks" | "strictFunctionTypes" | "strictPropertyInitialization" | "alwaysStrict";

    export function getStrictOptionValue(compilerOptions: CompilerOptions, flag: StrictOptionName): boolean {
        return compilerOptions[flag] === undefined ? compilerOptions.strict : compilerOptions[flag];
    }

    export function hasZeroOrOneAsteriskCharacter(str: string): boolean {
        let seenAsterisk = false;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) === CharacterCodes.asterisk) {
                if (!seenAsterisk) {
                    seenAsterisk = true;
                }
                else {
                    // have already seen asterisk
                    return false;
                }
            }
        }
        return true;
    }

    export function isRootedDiskPath(path: string) {
        return path && getRootLength(path) !== 0;
    }

    export function convertToRelativePath(absoluteOrRelativePath: string, basePath: string, getCanonicalFileName: (path: string) => string): string {
        return !isRootedDiskPath(absoluteOrRelativePath)
            ? absoluteOrRelativePath
            : getRelativePathToDirectoryOrUrl(basePath, absoluteOrRelativePath, basePath, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
    }

    function normalizedPathComponents(path: string, rootLength: number) {
        const normalizedParts = getNormalizedParts(path, rootLength);
        return [path.substr(0, rootLength)].concat(normalizedParts);
    }

    export function getNormalizedPathComponents(path: string, currentDirectory: string) {
        path = normalizeSlashes(path);
        let rootLength = getRootLength(path);
        if (rootLength === 0) {
            // If the path is not rooted it is relative to current directory
            path = combinePaths(normalizeSlashes(currentDirectory), path);
            rootLength = getRootLength(path);
        }

        return normalizedPathComponents(path, rootLength);
    }

    export function getNormalizedAbsolutePath(fileName: string, currentDirectory: string) {
        return getNormalizedPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
    }

    export function getNormalizedPathFromPathComponents(pathComponents: ReadonlyArray<string>) {
        if (pathComponents && pathComponents.length) {
            return pathComponents[0] + pathComponents.slice(1).join(directorySeparator);
        }
    }

    function getNormalizedPathComponentsOfUrl(url: string) {
        // Get root length of http://www.website.com/folder1/folder2/
        // In this example the root is: http://www.website.com/
        // normalized path components should be ["http://www.website.com/", "folder1", "folder2"]

        const urlLength = url.length;
        // Initial root length is http:// part
        let rootLength = url.indexOf("://") + "://".length;
        while (rootLength < urlLength) {
            // Consume all immediate slashes in the protocol
            // eg.initial rootlength is just file:// but it needs to consume another "/" in file:///
            if (url.charCodeAt(rootLength) === CharacterCodes.slash) {
                rootLength++;
            }
            else {
                // non slash character means we continue proceeding to next component of root search
                break;
            }
        }

        // there are no parts after http:// just return current string as the pathComponent
        if (rootLength === urlLength) {
            return [url];
        }

        // Find the index of "/" after website.com so the root can be http://www.website.com/ (from existing http://)
        const indexOfNextSlash = url.indexOf(directorySeparator, rootLength);
        if (indexOfNextSlash !== -1) {
            // Found the "/" after the website.com so the root is length of http://www.website.com/
            // and get components after the root normally like any other folder components
            rootLength = indexOfNextSlash + 1;
            return normalizedPathComponents(url, rootLength);
        }
        else {
            // Can't find the host assume the rest of the string as component
            // but make sure we append "/" to it as root is not joined using "/"
            // eg. if url passed in was http://website.com we want to use root as [http://website.com/]
            // so that other path manipulations will be correct and it can be merged with relative paths correctly
            return [url + directorySeparator];
        }
    }

    function getNormalizedPathOrUrlComponents(pathOrUrl: string, currentDirectory: string) {
        if (isUrl(pathOrUrl)) {
            return getNormalizedPathComponentsOfUrl(pathOrUrl);
        }
        else {
            return getNormalizedPathComponents(pathOrUrl, currentDirectory);
        }
    }

    export function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: GetCanonicalFileName, isAbsolutePathAnUrl: boolean) {
        const pathComponents = getNormalizedPathOrUrlComponents(relativeOrAbsolutePath, currentDirectory);
        const directoryComponents = getNormalizedPathOrUrlComponents(directoryPathOrUrl, currentDirectory);
        if (directoryComponents.length > 1 && lastOrUndefined(directoryComponents) === "") {
            // If the directory path given was of type test/cases/ then we really need components of directory to be only till its name
            // that is ["test", "cases", ""] needs to be actually ["test", "cases"]
            directoryComponents.pop();
        }

        // Find the component that differs
        let joinStartIndex: number;
        for (joinStartIndex = 0; joinStartIndex < pathComponents.length && joinStartIndex < directoryComponents.length; joinStartIndex++) {
            if (getCanonicalFileName(directoryComponents[joinStartIndex]) !== getCanonicalFileName(pathComponents[joinStartIndex])) {
                break;
            }
        }

        // Get the relative path
        if (joinStartIndex) {
            let relativePath = "";
            const relativePathComponents = pathComponents.slice(joinStartIndex, pathComponents.length);
            for (; joinStartIndex < directoryComponents.length; joinStartIndex++) {
                if (directoryComponents[joinStartIndex] !== "") {
                    relativePath = relativePath + ".." + directorySeparator;
                }
            }

            return relativePath + relativePathComponents.join(directorySeparator);
        }

        // Cant find the relative path, get the absolute path
        let absolutePath = getNormalizedPathFromPathComponents(pathComponents);
        if (isAbsolutePathAnUrl && isRootedDiskPath(absolutePath)) {
            absolutePath = "file:///" + absolutePath;
        }

        return absolutePath;
    }

    export function getBaseFileName(path: string) {
        if (path === undefined) {
            return undefined;
        }
        const i = path.lastIndexOf(directorySeparator);
        return i < 0 ? path : path.substring(i + 1);
    }

    export function combinePaths(path1: string, path2: string): string {
        if (!(path1 && path1.length)) return path2;
        if (!(path2 && path2.length)) return path1;
        if (getRootLength(path2) !== 0) return path2;
        if (path1.charAt(path1.length - 1) === directorySeparator) return path1 + path2;
        return path1 + directorySeparator + path2;
    }

    /**
     * Removes a trailing directory separator from a path.
     * @param path The path.
     */
    export function removeTrailingDirectorySeparator(path: Path): Path;
    export function removeTrailingDirectorySeparator(path: string): string;
    export function removeTrailingDirectorySeparator(path: string) {
        if (path.charAt(path.length - 1) === directorySeparator) {
            return path.substr(0, path.length - 1);
        }

        return path;
    }

    /**
     * Adds a trailing directory separator to a path, if it does not already have one.
     * @param path The path.
     */
    export function ensureTrailingDirectorySeparator(path: string) {
        if (path.charAt(path.length - 1) !== directorySeparator) {
            return path + directorySeparator;
        }

        return path;
    }

    export function comparePaths(a: string, b: string, currentDirectory: string, ignoreCase?: boolean) {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        a = removeTrailingDirectorySeparator(a);
        b = removeTrailingDirectorySeparator(b);
        const aComponents = getNormalizedPathComponents(a, currentDirectory);
        const bComponents = getNormalizedPathComponents(b, currentDirectory);
        const sharedLength = Math.min(aComponents.length, bComponents.length);
        const comparer = ignoreCase ? compareStringsCaseInsensitive : compareStringsCaseSensitive;
        for (let i = 0; i < sharedLength; i++) {
            const result = comparer(aComponents[i], bComponents[i]);
            if (result !== Comparison.EqualTo) {
                return result;
            }
        }

        return compareValues(aComponents.length, bComponents.length);
    }

    export function containsPath(parent: string, child: string, currentDirectory: string, ignoreCase?: boolean) {
        if (parent === undefined || child === undefined) return false;
        if (parent === child) return true;
        parent = removeTrailingDirectorySeparator(parent);
        child = removeTrailingDirectorySeparator(child);
        if (parent === child) return true;
        const parentComponents = getNormalizedPathComponents(parent, currentDirectory);
        const childComponents = getNormalizedPathComponents(child, currentDirectory);
        if (childComponents.length < parentComponents.length) {
            return false;
        }

        const equalityComparer = ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive;
        for (let i = 0; i < parentComponents.length; i++) {
            if (!equalityComparer(parentComponents[i], childComponents[i])) {
                return false;
            }
        }

        return true;
    }

    export function startsWith(str: string, prefix: string): boolean {
        return str.lastIndexOf(prefix, 0) === 0;
    }

    export function removePrefix(str: string, prefix: string): string {
        return startsWith(str, prefix) ? str.substr(prefix.length) : str;
    }

    export function endsWith(str: string, suffix: string): boolean {
        const expectedPos = str.length - suffix.length;
        return expectedPos >= 0 && str.indexOf(suffix, expectedPos) === expectedPos;
    }

    export function removeSuffix(str: string, suffix: string): string {
        return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : str;
    }

    export function stringContains(str: string, substring: string): boolean {
        return str.indexOf(substring) !== -1;
    }

    export function hasExtension(fileName: string): boolean {
        return stringContains(getBaseFileName(fileName), ".");
    }

    export function fileExtensionIs(path: string, extension: string): boolean {
        return path.length > extension.length && endsWith(path, extension);
    }

    export function fileExtensionIsOneOf(path: string, extensions: ReadonlyArray<string>): boolean {
        for (const extension of extensions) {
            if (fileExtensionIs(path, extension)) {
                return true;
            }
        }

        return false;
    }

    // Reserved characters, forces escaping of any non-word (or digit), non-whitespace character.
    // It may be inefficient (we could just match (/[-[\]{}()*+?.,\\^$|#\s]/g), but this is future
    // proof.
    const reservedCharacterPattern = /[^\w\s\/]/g;
    const wildcardCharCodes = [CharacterCodes.asterisk, CharacterCodes.question];

    export const commonPackageFolders: ReadonlyArray<string> = ["node_modules", "bower_components", "jspm_packages"];

    const implicitExcludePathRegexPattern = `(?!(${commonPackageFolders.join("|")})(/|$))`;

    interface WildcardMatcher {
        singleAsteriskRegexFragment: string;
        doubleAsteriskRegexFragment: string;
        replaceWildcardCharacter: (match: string) => string;
    }

    const filesMatcher: WildcardMatcher = {
        /**
         * Matches any single directory segment unless it is the last segment and a .min.js file
         * Breakdown:
         *  [^./]                   # matches everything up to the first . character (excluding directory seperators)
         *  (\\.(?!min\\.js$))?     # matches . characters but not if they are part of the .min.js file extension
         */
        singleAsteriskRegexFragment: "([^./]|(\\.(?!min\\.js$))?)*",
        /**
         * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
         * files or directories, does not match subdirectories that start with a . character
         */
        doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
        replaceWildcardCharacter: match => replaceWildcardCharacter(match, filesMatcher.singleAsteriskRegexFragment)
    };

    const directoriesMatcher: WildcardMatcher = {
        singleAsteriskRegexFragment: "[^/]*",
        /**
         * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
         * files or directories, does not match subdirectories that start with a . character
         */
        doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
        replaceWildcardCharacter: match => replaceWildcardCharacter(match, directoriesMatcher.singleAsteriskRegexFragment)
    };

    const excludeMatcher: WildcardMatcher = {
        singleAsteriskRegexFragment: "[^/]*",
        doubleAsteriskRegexFragment: "(/.+?)?",
        replaceWildcardCharacter: match => replaceWildcardCharacter(match, excludeMatcher.singleAsteriskRegexFragment)
    };

    const wildcardMatchers = {
        files: filesMatcher,
        directories: directoriesMatcher,
        exclude: excludeMatcher
    };

    export function getRegularExpressionForWildcard(specs: ReadonlyArray<string>, basePath: string, usage: "files" | "directories" | "exclude"): string | undefined {
        const patterns = getRegularExpressionsForWildcards(specs, basePath, usage);
        if (!patterns || !patterns.length) {
            return undefined;
        }

        const pattern = patterns.map(pattern => `(${pattern})`).join("|");
        // If excluding, match "foo/bar/baz...", but if including, only allow "foo".
        const terminator = usage === "exclude" ? "($|/)" : "$";
        return `^(${pattern})${terminator}`;
    }

    function getRegularExpressionsForWildcards(specs: ReadonlyArray<string>, basePath: string, usage: "files" | "directories" | "exclude"): string[] | undefined {
        if (specs === undefined || specs.length === 0) {
            return undefined;
        }

        return flatMap(specs, spec =>
            spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]));
    }

    /**
     * An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space) if its last component has no extension,
     * and does not contain any glob characters itself.
     */
    export function isImplicitGlob(lastPathComponent: string): boolean {
        return !/[.*?]/.test(lastPathComponent);
    }

    function getSubPatternFromSpec(spec: string, basePath: string, usage: "files" | "directories" | "exclude", { singleAsteriskRegexFragment, doubleAsteriskRegexFragment, replaceWildcardCharacter }: WildcardMatcher): string | undefined {
        let subpattern = "";
        let hasWrittenComponent = false;
        const components = getNormalizedPathComponents(spec, basePath);
        const lastComponent = lastOrUndefined(components);
        if (usage !== "exclude" && lastComponent === "**") {
            return undefined;
        }

        // getNormalizedPathComponents includes the separator for the root component.
        // We need to remove to create our regex correctly.
        components[0] = removeTrailingDirectorySeparator(components[0]);

        if (isImplicitGlob(lastComponent)) {
            components.push("**", "*");
        }

        let optionalCount = 0;
        for (let component of components) {
            if (component === "**") {
                subpattern += doubleAsteriskRegexFragment;
            }
            else {
                if (usage === "directories") {
                    subpattern += "(";
                    optionalCount++;
                }

                if (hasWrittenComponent) {
                    subpattern += directorySeparator;
                }

                if (usage !== "exclude") {
                    let componentPattern = "";
                    // The * and ? wildcards should not match directories or files that start with . if they
                    // appear first in a component. Dotted directories and files can be included explicitly
                    // like so: **/.*/.*
                    if (component.charCodeAt(0) === CharacterCodes.asterisk) {
                        componentPattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                        component = component.substr(1);
                    }
                    else if (component.charCodeAt(0) === CharacterCodes.question) {
                        componentPattern += "[^./]";
                        component = component.substr(1);
                    }

                    componentPattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);

                    // Patterns should not include subfolders like node_modules unless they are
                    // explicitly included as part of the path.
                    //
                    // As an optimization, if the component pattern is the same as the component,
                    // then there definitely were no wildcard characters and we do not need to
                    // add the exclusion pattern.
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

    function replaceWildcardCharacter(match: string, singleAsteriskRegexFragment: string) {
        return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
    }

    export interface FileSystemEntries {
        readonly files: ReadonlyArray<string>;
        readonly directories: ReadonlyArray<string>;
    }

    export interface FileMatcherPatterns {
        /** One pattern for each "include" spec. */
        includeFilePatterns: ReadonlyArray<string>;
        /** One pattern matching one of any of the "include" specs. */
        includeFilePattern: string;
        includeDirectoryPattern: string;
        excludePattern: string;
        basePaths: ReadonlyArray<string>;
    }

    export function getFileMatcherPatterns(path: string, excludes: ReadonlyArray<string>, includes: ReadonlyArray<string>, useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);
        const absolutePath = combinePaths(currentDirectory, path);

        return {
            includeFilePatterns: map(getRegularExpressionsForWildcards(includes, absolutePath, "files"), pattern => `^${pattern}$`),
            includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
            includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
            excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
            basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
        };
    }

    export function matchFiles(path: string, extensions: ReadonlyArray<string>, excludes: ReadonlyArray<string>, includes: ReadonlyArray<string>, useCaseSensitiveFileNames: boolean, currentDirectory: string, depth: number | undefined, getFileSystemEntries: (path: string) => FileSystemEntries): string[] {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);

        const patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);

        const regexFlag = useCaseSensitiveFileNames ? "" : "i";
        const includeFileRegexes = patterns.includeFilePatterns && patterns.includeFilePatterns.map(pattern => new RegExp(pattern, regexFlag));
        const includeDirectoryRegex = patterns.includeDirectoryPattern && new RegExp(patterns.includeDirectoryPattern, regexFlag);
        const excludeRegex = patterns.excludePattern && new RegExp(patterns.excludePattern, regexFlag);

        // Associate an array of results with each include regex. This keeps results in order of the "include" order.
        // If there are no "includes", then just put everything in results[0].
        const results: string[][] = includeFileRegexes ? includeFileRegexes.map(() => []) : [[]];

        for (const basePath of patterns.basePaths) {
            visitDirectory(basePath, combinePaths(currentDirectory, basePath), depth);
        }

        return flatten<string>(results);

        function visitDirectory(path: string, absolutePath: string, depth: number | undefined) {
            const { files, directories } = getFileSystemEntries(path);

            for (const current of sort(files, compareStringsCaseSensitive)) {
                const name = combinePaths(path, current);
                const absoluteName = combinePaths(absolutePath, current);
                if (extensions && !fileExtensionIsOneOf(name, extensions)) continue;
                if (excludeRegex && excludeRegex.test(absoluteName)) continue;
                if (!includeFileRegexes) {
                    results[0].push(name);
                }
                else {
                    const includeIndex = findIndex(includeFileRegexes, re => re.test(absoluteName));
                    if (includeIndex !== -1) {
                        results[includeIndex].push(name);
                    }
                }
            }

            if (depth !== undefined) {
                depth--;
                if (depth === 0) {
                    return;
                }
            }

            for (const current of sort(directories, compareStringsCaseSensitive)) {
                const name = combinePaths(path, current);
                const absoluteName = combinePaths(absolutePath, current);
                if ((!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
                    (!excludeRegex || !excludeRegex.test(absoluteName))) {
                    visitDirectory(name, absoluteName, depth);
                }
            }
        }
    }

    /**
     * Computes the unique non-wildcard base paths amongst the provided include patterns.
     */
    function getBasePaths(path: string, includes: ReadonlyArray<string>, useCaseSensitiveFileNames: boolean) {
        // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
        const basePaths: string[] = [path];

        if (includes) {
            // Storage for literal base paths amongst the include patterns.
            const includeBasePaths: string[] = [];
            for (const include of includes) {
                // We also need to check the relative paths by converting them to absolute and normalizing
                // in case they escape the base path (e.g "..\somedirectory")
                const absolute: string = isRootedDiskPath(include) ? include : normalizePath(combinePaths(path, include));
                // Append the literal and canonical candidate base paths.
                includeBasePaths.push(getIncludeBasePath(absolute));
            }

            // Sort the offsets array using either the literal or canonical path representations.
            includeBasePaths.sort(useCaseSensitiveFileNames ? compareStringsCaseSensitive : compareStringsCaseInsensitive);

            // Iterate over each include base path and include unique base paths that are not a
            // subpath of an existing base path
            for (const includeBasePath of includeBasePaths) {
                if (every(basePaths, basePath => !containsPath(basePath, includeBasePath, path, !useCaseSensitiveFileNames))) {
                    basePaths.push(includeBasePath);
                }
            }
        }

        return basePaths;
    }

    function getIncludeBasePath(absolute: string): string {
        const wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
        if (wildcardOffset < 0) {
            // No "*" or "?" in the path
            return !hasExtension(absolute)
                ? absolute
                : removeTrailingDirectorySeparator(getDirectoryPath(absolute));
        }
        return absolute.substring(0, absolute.lastIndexOf(directorySeparator, wildcardOffset));
    }

    export function ensureScriptKind(fileName: string, scriptKind: ScriptKind | undefined): ScriptKind {
        // Using scriptKind as a condition handles both:
        // - 'scriptKind' is unspecified and thus it is `undefined`
        // - 'scriptKind' is set and it is `Unknown` (0)
        // If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
        // to get the ScriptKind from the file name. If it cannot be resolved
        // from the file name then the default 'TS' script kind is returned.
        return scriptKind || getScriptKindFromFileName(fileName) || ScriptKind.TS;
    }

    export function getScriptKindFromFileName(fileName: string): ScriptKind {
        const ext = fileName.substr(fileName.lastIndexOf("."));
        switch (ext.toLowerCase()) {
            case Extension.Js:
                return ScriptKind.JS;
            case Extension.Jsx:
                return ScriptKind.JSX;
            case Extension.Ts:
                return ScriptKind.TS;
            case Extension.Tsx:
                return ScriptKind.TSX;
            case Extension.Json:
                return ScriptKind.JSON;
            default:
                return ScriptKind.Unknown;
        }
    }

    /**
     *  List of supported extensions in order of file resolution precedence.
     */
    export const supportedTypeScriptExtensions: ReadonlyArray<Extension> = [Extension.Ts, Extension.Tsx, Extension.Dts];
    /** Must have ".d.ts" first because if ".ts" goes first, that will be detected as the extension instead of ".d.ts". */
    export const supportedTypescriptExtensionsForExtractExtension: ReadonlyArray<Extension> = [Extension.Dts, Extension.Ts, Extension.Tsx];
    export const supportedJavascriptExtensions: ReadonlyArray<Extension> = [Extension.Js, Extension.Jsx];
    const allSupportedExtensions: ReadonlyArray<Extension> = [...supportedTypeScriptExtensions, ...supportedJavascriptExtensions];

    export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: ReadonlyArray<JsFileExtensionInfo>): ReadonlyArray<string> {
        const needAllExtensions = options && options.allowJs;
        if (!extraFileExtensions || extraFileExtensions.length === 0 || !needAllExtensions) {
            return needAllExtensions ? allSupportedExtensions : supportedTypeScriptExtensions;
        }
        return deduplicate(
            [...allSupportedExtensions, ...extraFileExtensions.map(e => e.extension)],
            equateStringsCaseSensitive,
            compareStringsCaseSensitive
        );
    }

    export function hasJavaScriptFileExtension(fileName: string) {
        return forEach(supportedJavascriptExtensions, extension => fileExtensionIs(fileName, extension));
    }

    export function hasTypeScriptFileExtension(fileName: string) {
        return forEach(supportedTypeScriptExtensions, extension => fileExtensionIs(fileName, extension));
    }

    export function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions, extraFileExtensions?: ReadonlyArray<JsFileExtensionInfo>) {
        if (!fileName) { return false; }

        for (const extension of getSupportedExtensions(compilerOptions, extraFileExtensions)) {
            if (fileExtensionIs(fileName, extension)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Extension boundaries by priority. Lower numbers indicate higher priorities, and are
     * aligned to the offset of the highest priority extension in the
     * allSupportedExtensions array.
     */
    export const enum ExtensionPriority {
        TypeScriptFiles = 0,
        DeclarationAndJavaScriptFiles = 2,

        Highest = TypeScriptFiles,
        Lowest = DeclarationAndJavaScriptFiles,
    }

    export function getExtensionPriority(path: string, supportedExtensions: ReadonlyArray<string>): ExtensionPriority {
        for (let i = supportedExtensions.length - 1; i >= 0; i--) {
            if (fileExtensionIs(path, supportedExtensions[i])) {
                return adjustExtensionPriority(<ExtensionPriority>i, supportedExtensions);
            }
        }

        // If its not in the list of supported extensions, this is likely a
        // TypeScript file with a non-ts extension
        return ExtensionPriority.Highest;
    }

    /**
     * Adjusts an extension priority to be the highest priority within the same range.
     */
    export function adjustExtensionPriority(extensionPriority: ExtensionPriority, supportedExtensions: ReadonlyArray<string>): ExtensionPriority {
        if (extensionPriority < ExtensionPriority.DeclarationAndJavaScriptFiles) {
            return ExtensionPriority.TypeScriptFiles;
        }
        else if (extensionPriority < supportedExtensions.length) {
            return ExtensionPriority.DeclarationAndJavaScriptFiles;
        }
        else {
            return supportedExtensions.length;
        }
    }

    /**
     * Gets the next lowest extension priority for a given priority.
     */
    export function getNextLowestExtensionPriority(extensionPriority: ExtensionPriority, supportedExtensions: ReadonlyArray<string>): ExtensionPriority {
        if (extensionPriority < ExtensionPriority.DeclarationAndJavaScriptFiles) {
            return ExtensionPriority.DeclarationAndJavaScriptFiles;
        }
        else {
            return supportedExtensions.length;
        }
    }

    const extensionsToRemove = [Extension.Dts, Extension.Ts, Extension.Js, Extension.Tsx, Extension.Jsx];
    export function removeFileExtension(path: string): string {
        for (const ext of extensionsToRemove) {
            const extensionless = tryRemoveExtension(path, ext);
            if (extensionless !== undefined) {
                return extensionless;
            }
        }
        return path;
    }

    export function tryRemoveExtension(path: string, extension: string): string | undefined {
        return fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
    }

    export function removeExtension(path: string, extension: string): string {
        return path.substring(0, path.length - extension.length);
    }

    export function changeExtension<T extends string | Path>(path: T, newExtension: string): T {
        return <T>(removeFileExtension(path) + newExtension);
    }

    /**
     * Takes a string like "jquery-min.4.2.3" and returns "jquery"
     */
    export function removeMinAndVersionNumbers(fileName: string) {
        // Match a "." or "-" followed by a version number or 'min' at the end of the name
        const trailingMinOrVersion = /[.-]((min)|(\d+(\.\d+)*))$/;

        // The "min" or version may both be present, in either order, so try applying the above twice.
        return fileName.replace(trailingMinOrVersion, "").replace(trailingMinOrVersion, "");
    }

    export interface ObjectAllocator {
        getNodeConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos?: number, end?: number) => Token<TKind>;
        getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos?: number, end?: number) => Identifier;
        getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos?: number, end?: number) => SourceFile;
        getSymbolConstructor(): new (flags: SymbolFlags, name: __String) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
        getSourceMapSourceConstructor(): new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => SourceMapSource;
    }

    function Symbol(this: Symbol, flags: SymbolFlags, name: __String) {
        this.flags = flags;
        this.escapedName = name;
        this.declarations = undefined;
        this.valueDeclaration = undefined;
        this.id = undefined;
        this.mergeId = undefined;
        this.parent = undefined;
    }

    function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
        this.flags = flags;
        if (Debug.isDebugging) {
            this.checker = checker;
        }
    }

    function Signature() {} // tslint:disable-line no-empty

    function Node(this: Node, kind: SyntaxKind, pos: number, end: number) {
        this.pos = pos;
        this.end = end;
        this.kind = kind;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.modifierFlagsCache = ModifierFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined;
        this.original = undefined;
    }

    function SourceMapSource(this: SourceMapSource, fileName: string, text: string, skipTrivia?: (pos: number) => number) {
        this.fileName = fileName;
        this.text = text;
        this.skipTrivia = skipTrivia || (pos => pos);
    }

    export let objectAllocator: ObjectAllocator = {
        getNodeConstructor: () => <any>Node,
        getTokenConstructor: () => <any>Node,
        getIdentifierConstructor: () => <any>Node,
        getSourceFileConstructor: () => <any>Node,
        getSymbolConstructor: () => <any>Symbol,
        getTypeConstructor: () => <any>Type,
        getSignatureConstructor: () => <any>Signature,
        getSourceMapSourceConstructor: () => <any>SourceMapSource,
    };

    export const enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }

    /**
     * Safer version of `Function` which should not be called.
     * Every function should be assignable to this, but this should not be assignable to every function.
     */
    export type AnyFunction = (...args: never[]) => void;

    export namespace Debug {
        export let currentAssertionLevel = AssertionLevel.None;
        export let isDebugging = false;

        export function shouldAssert(level: AssertionLevel): boolean {
            return currentAssertionLevel >= level;
        }

        export function assert(expression: boolean, message?: string, verboseDebugInfo?: string | (() => string), stackCrawlMark?: AnyFunction): void {
            if (!expression) {
                if (verboseDebugInfo) {
                    message += "\r\nVerbose Debug Information: " + (typeof verboseDebugInfo === "string" ? verboseDebugInfo : verboseDebugInfo());
                }
                fail(message ? "False expression: " + message : "False expression.", stackCrawlMark || assert);
            }
        }

        export function assertEqual<T>(a: T, b: T, msg?: string, msg2?: string): void {
            if (a !== b) {
                const message = msg ? msg2 ? `${msg} ${msg2}` : msg : "";
                fail(`Expected ${a} === ${b}. ${message}`);
            }
        }

        export function assertLessThan(a: number, b: number, msg?: string): void {
            if (a >= b) {
                fail(`Expected ${a} < ${b}. ${msg || ""}`);
            }
        }

        export function assertLessThanOrEqual(a: number, b: number): void {
            if (a > b) {
                fail(`Expected ${a} <= ${b}`);
            }
        }

        export function assertGreaterThanOrEqual(a: number, b: number): void {
            if (a < b) {
                fail(`Expected ${a} >= ${b}`);
            }
        }

        export function fail(message?: string, stackCrawlMark?: AnyFunction): never {
            debugger;
            const e = new Error(message ? `Debug Failure. ${message}` : "Debug Failure.");
            if ((<any>Error).captureStackTrace) {
                (<any>Error).captureStackTrace(e, stackCrawlMark || fail);
            }
            throw e;
        }

        export function assertDefined<T>(value: T | null | undefined, message?: string): T {
            assert(value !== undefined && value !== null, message);
            return value;
        }

        export function assertEachDefined<T, A extends ReadonlyArray<T>>(value: A, message: string): A {
            for (const v of value) {
                assertDefined(v, message);
            }
            return value;
        }

        export function assertNever(member: never, message?: string, stackCrawlMark?: AnyFunction): never {
            return fail(message || `Illegal value: ${member}`, stackCrawlMark || assertNever);
        }

        export function getFunctionName(func: AnyFunction) {
            if (typeof func !== "function") {
                return "";
            }
            else if (func.hasOwnProperty("name")) {
                return (<any>func).name;
            }
            else {
                const text = Function.prototype.toString.call(func);
                const match = /^function\s+([\w\$]+)\s*\(/.exec(text);
                return match ? match[1] : "";
            }
        }

        export function showSymbol(symbol: Symbol): string {
            const symbolFlags = (ts as any).SymbolFlags;
            return `{ flags: ${symbolFlags ? showFlags(symbol.flags, symbolFlags) : symbol.flags}; declarations: ${map(symbol.declarations, showSyntaxKind)} }`;
        }

        function showFlags(flags: number, flagsEnum: { [flag: number]: string }): string {
            const out = [];
            for (let pow = 0; pow <= 30; pow++) {
                const n = 1 << pow;
                if (flags & n) {
                    out.push(flagsEnum[n]);
                }
            }
            return out.join("|");
        }

        export function showSyntaxKind(node: Node): string {
            const syntaxKind = (ts as any).SyntaxKind;
            return syntaxKind ? syntaxKind[node.kind] : node.kind.toString();
        }
    }

    /** Remove an item from an array, moving everything to its right one space left. */
    export function orderedRemoveItem<T>(array: T[], item: T): boolean {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) {
                orderedRemoveItemAt(array, i);
                return true;
            }
        }
        return false;
    }

    /** Remove an item by index from an array, moving everything to its right one space left. */
    export function orderedRemoveItemAt<T>(array: T[], index: number): void {
        // This seems to be faster than either `array.splice(i, 1)` or `array.copyWithin(i, i+ 1)`.
        for (let i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.pop();
    }

    export function unorderedRemoveItemAt<T>(array: T[], index: number): void {
        // Fill in the "hole" left at `index`.
        array[index] = array[array.length - 1];
        array.pop();
    }

    /** Remove the *first* occurrence of `item` from the array. */
    export function unorderedRemoveItem<T>(array: T[], item: T): void {
        unorderedRemoveFirstItemWhere(array, element => element === item);
    }

    /** Remove the *first* element satisfying `predicate`. */
    function unorderedRemoveFirstItemWhere<T>(array: T[], predicate: (element: T) => boolean): void {
        for (let i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                unorderedRemoveItemAt(array, i);
                break;
            }
        }
    }

    export type GetCanonicalFileName = (fileName: string) => string;
    export function createGetCanonicalFileName(useCaseSensitiveFileNames: boolean): GetCanonicalFileName {
        return useCaseSensitiveFileNames ? identity : toLowerCase;
    }

    /**
     * patternStrings contains both pattern strings (containing "*") and regular strings.
     * Return an exact match if possible, or a pattern match, or undefined.
     * (These are verified by verifyCompilerOptions to have 0 or 1 "*" characters.)
     */
    export function matchPatternOrExact(patternStrings: ReadonlyArray<string>, candidate: string): string | Pattern | undefined {
        const patterns: Pattern[] = [];
        for (const patternString of patternStrings) {
            const pattern = tryParsePattern(patternString);
            if (pattern) {
                patterns.push(pattern);
            }
            else if (patternString === candidate) {
                // pattern was matched as is - no need to search further
                return patternString;
            }
        }

        return findBestPatternMatch(patterns, _ => _, candidate);
    }

    export function patternText({ prefix, suffix }: Pattern): string {
        return `${prefix}*${suffix}`;
    }

    /**
     * Given that candidate matches pattern, returns the text matching the '*'.
     * E.g.: matchedText(tryParsePattern("foo*baz"), "foobarbaz") === "bar"
     */
    export function matchedText(pattern: Pattern, candidate: string): string {
        Debug.assert(isPatternMatch(pattern, candidate));
        return candidate.substring(pattern.prefix.length, candidate.length - pattern.suffix.length);
    }

    /** Return the object corresponding to the best pattern to match `candidate`. */
    export function findBestPatternMatch<T>(values: ReadonlyArray<T>, getPattern: (value: T) => Pattern, candidate: string): T | undefined {
        let matchedValue: T | undefined;
        // use length of prefix as betterness criteria
        let longestMatchPrefixLength = -1;

        for (const v of values) {
            const pattern = getPattern(v);
            if (isPatternMatch(pattern, candidate) && pattern.prefix.length > longestMatchPrefixLength) {
                longestMatchPrefixLength = pattern.prefix.length;
                matchedValue = v;
            }
        }

        return matchedValue;
    }

    function isPatternMatch({ prefix, suffix }: Pattern, candidate: string) {
        return candidate.length >= prefix.length + suffix.length &&
            startsWith(candidate, prefix) &&
            endsWith(candidate, suffix);
    }

    export function tryParsePattern(pattern: string): Pattern | undefined {
        // This should be verified outside of here and a proper error thrown.
        Debug.assert(hasZeroOrOneAsteriskCharacter(pattern));
        const indexOfStar = pattern.indexOf("*");
        return indexOfStar === -1 ? undefined : {
            prefix: pattern.substr(0, indexOfStar),
            suffix: pattern.substr(indexOfStar + 1)
        };
    }

    export function positionIsSynthesized(pos: number): boolean {
        // This is a fast way of testing the following conditions:
        //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
        return !(pos >= 0);
    }

    /** True if an extension is one of the supported TypeScript extensions. */
    export function extensionIsTypeScript(ext: Extension): boolean {
        return ext === Extension.Ts || ext === Extension.Tsx || ext === Extension.Dts;
    }

    /**
     * Gets the extension from a path.
     * Path must have a valid extension.
     */
    export function extensionFromPath(path: string): Extension {
        const ext = tryGetExtensionFromPath(path);
        if (ext !== undefined) {
            return ext;
        }
        Debug.fail(`File ${path} has unknown extension.`);
    }

    export function isAnySupportedFileExtension(path: string): boolean {
        return tryGetExtensionFromPath(path) !== undefined;
    }

    export function tryGetExtensionFromPath(path: string): Extension | undefined {
        return find<Extension>(supportedTypescriptExtensionsForExtractExtension, e => fileExtensionIs(path, e)) || find(supportedJavascriptExtensions, e => fileExtensionIs(path, e));
    }

    // Retrieves any string from the final "." onwards from a base file name.
    // Unlike extensionFromPath, which throws an exception on unrecognized extensions.
    export function getAnyExtensionFromPath(path: string): string | undefined {
        const baseFileName = getBaseFileName(path);
        const extensionIndex = baseFileName.lastIndexOf(".");
        if (extensionIndex >= 0) {
            return baseFileName.substring(extensionIndex);
        }
    }

    export function isCheckJsEnabledForFile(sourceFile: SourceFile, compilerOptions: CompilerOptions) {
        return sourceFile.checkJsDirective ? sourceFile.checkJsDirective.enabled : compilerOptions.checkJs;
    }

    export function and<T>(f: (arg: T) => boolean, g: (arg: T) => boolean) {
        return (arg: T) => f(arg) && g(arg);
    }

    export function or<T>(f: (arg: T) => boolean, g: (arg: T) => boolean) {
        return (arg: T) => f(arg) || g(arg);
    }

    export function assertTypeIsNever(_: never): void { } // tslint:disable-line no-empty

    export const emptyFileSystemEntries: FileSystemEntries = {
        files: emptyArray,
        directories: emptyArray
    };

    export function singleElementArray<T>(t: T | undefined): T[] | undefined {
        return t === undefined ? undefined : [t];
    }

    export function enumerateInsertsAndDeletes<T, U>(newItems: ReadonlyArray<T>, oldItems: ReadonlyArray<U>, comparer: (a: T, b: U) => Comparison, inserted: (newItem: T) => void, deleted: (oldItem: U) => void, unchanged?: (oldItem: U, newItem: T) => void) {
        unchanged = unchanged || noop;
        let newIndex = 0;
        let oldIndex = 0;
        const newLen = newItems.length;
        const oldLen = oldItems.length;
        while (newIndex < newLen && oldIndex < oldLen) {
            const newItem = newItems[newIndex];
            const oldItem = oldItems[oldIndex];
            const compareResult = comparer(newItem, oldItem);
            if (compareResult === Comparison.LessThan) {
                inserted(newItem);
                newIndex++;
            }
            else if (compareResult === Comparison.GreaterThan) {
                deleted(oldItem);
                oldIndex++;
            }
            else {
                unchanged(oldItem, newItem);
                newIndex++;
                oldIndex++;
            }
        }
        while (newIndex < newLen) {
            inserted(newItems[newIndex++]);
        }
        while (oldIndex < oldLen) {
            deleted(oldItems[oldIndex++]);
        }
    }
}
