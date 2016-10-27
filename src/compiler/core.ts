/// <reference path="types.ts"/>
/// <reference path="performance.ts" />

/* @internal */
namespace ts {
    /**
     * Ternary values are defined such that
     * x & y is False if either x or y is False.
     * x & y is Maybe if either x or y is Maybe, but neither x or y is False.
     * x & y is True if both x and y are True.
     * x | y is False if both x and y are False.
     * x | y is Maybe if either x or y is Maybe, but neither x or y is True.
     * x | y is True if either x or y is True.
     */
    export const enum Ternary {
        False = 0,
        Maybe = 1,
        True = -1
    }

    const createObject = Object.create;

    // More efficient to create a collator once and use its `compare` than to call `a.localeCompare(b)` many times.
    export const collator: { compare(a: string, b: string): number } = typeof Intl === "object" && typeof Intl.Collator === "function" ? new Intl.Collator() : undefined;

    export function createMap<T>(template?: MapLike<T>): Map<T> {
        const map: Map<T> = createObject(null); // tslint:disable-line:no-null-keyword

        // Using 'delete' on an object causes V8 to put the object in dictionary mode.
        // This disables creation of hidden classes, which are expensive when an object is
        // constantly changing shape.
        map["__"] = undefined;
        delete map["__"];

        // Copies keys/values from template. Note that for..in will not throw if
        // template is undefined, and instead will just exit the loop.
        for (const key in template) if (hasOwnProperty.call(template, key)) {
            map[key] = template[key];
        }

        return map;
    }

    export function createFileMap<T>(keyMapper?: (key: string) => string): FileMap<T> {
        let files = createMap<T>();
        return {
            get,
            set,
            contains,
            remove,
            forEachValue: forEachValueInMap,
            getKeys,
            clear,
        };

        function forEachValueInMap(f: (key: Path, value: T) => void) {
            for (const key in files) {
                f(<Path>key, files[key]);
            }
        }

        function getKeys() {
            const keys: Path[] = [];
            for (const key in files) {
                keys.push(<Path>key);
            }
            return keys;
        }

        // path should already be well-formed so it does not need to be normalized
        function get(path: Path): T {
            return files[toKey(path)];
        }

        function set(path: Path, value: T) {
            files[toKey(path)] = value;
        }

        function contains(path: Path) {
            return toKey(path) in files;
        }

        function remove(path: Path) {
            const key = toKey(path);
            delete files[key];
        }

        function clear() {
            files = createMap<T>();
        }

        function toKey(path: Path): string {
            return keyMapper ? keyMapper(path) : path;
        }
    }

    export function toPath(fileName: string, basePath: string, getCanonicalFileName: (path: string) => string): Path {
        const nonCanonicalizedPath = isRootedDiskPath(fileName)
            ? normalizePath(fileName)
            : getNormalizedAbsolutePath(fileName, basePath);
        return <Path>getCanonicalFileName(nonCanonicalizedPath);
    }

    export const enum Comparison {
        LessThan    = -1,
        EqualTo     = 0,
        GreaterThan = 1
    }

    /**
     * Iterates through 'array' by index and performs the callback on each element of array until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, the callback is applied to each element of array and undefined is returned.
     */
    export function forEach<T, U>(array: T[] | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                const result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }

    /**
     * Iterates through `array` by index and performs the callback on each element of array until the callback
     * returns a falsey value, then returns false.
     * If no such value is found, the callback is applied to each element of array and `true` is returned.
     */
    export function every<T>(array: T[], callback: (element: T, index: number) => boolean): boolean {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                if (!callback(array[i], i)) {
                    return false;
                }
            }
        }

        return true;
    }

    /** Works like Array.prototype.find, returning `undefined` if no element satisfying the predicate is found. */
    export function find<T>(array: T[], predicate: (element: T, index: number) => boolean): T | undefined {
        for (let i = 0, len = array.length; i < len; i++) {
            const value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }

    /**
     * Returns the first truthy result of `callback`, or else fails.
     * This is like `forEach`, but never returns undefined.
     */
    export function findMap<T, U>(array: T[], callback: (element: T, index: number) => U | undefined): U {
        for (let i = 0, len = array.length; i < len; i++) {
            const result = callback(array[i], i);
            if (result) {
                return result;
            }
        }
        Debug.fail();
    }

    export function contains<T>(array: T[], value: T): boolean {
        if (array) {
            for (const v of array) {
                if (v === value) {
                    return true;
                }
            }
        }
        return false;
    }

    export function indexOf<T>(array: T[], value: T): number {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }

    export function indexOfAnyCharCode(text: string, charCodes: number[], start?: number): number {
        for (let i = start || 0, len = text.length; i < len; i++) {
            if (contains(charCodes, text.charCodeAt(i))) {
                return i;
            }
        }
        return -1;
    }

    export function countWhere<T>(array: T[], predicate: (x: T, i: number) => boolean): number {
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

    export function removeWhere<T>(array: T[], f: (x: T) => boolean): boolean {
        let outIndex = 0;
        for (const item of array) {
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

    export function filterMutate<T>(array: T[], f: (x: T) => boolean): void {
        let outIndex = 0;
        for (const item of array) {
            if (f(item)) {
                array[outIndex] = item;
                outIndex++;
            }
        }
        array.length = outIndex;
    }

    export function map<T, U>(array: T[], f: (x: T, i: number) => U): U[] {
        let result: U[];
        if (array) {
            result = [];
            for (let i = 0; i < array.length; i++) {
                result.push(f(array[i], i));
            }
        }
        return result;
    }

    // Maps from T to T and avoids allocation if all elements map to themselves
    export function sameMap<T>(array: T[], f: (x: T, i: number) => T): T[] {
        let result: T[];
        if (array) {
            for (let i = 0; i < array.length; i++) {
                if (result) {
                    result.push(f(array[i], i));
                }
                else {
                    const item = array[i];
                    const mapped = f(item, i);
                    if (item !== mapped) {
                        result = array.slice(0, i);
                        result.push(mapped);
                    }
                }
            }
        }
        return result || array;
    }

    /**
     * Flattens an array containing a mix of array or non-array elements.
     *
     * @param array The array to flatten.
     */
    export function flatten<T>(array: (T | T[])[]): T[] {
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
    export function flatMap<T, U>(array: T[], mapfn: (x: T, i: number) => U | U[]): U[] {
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

    /**
     * Computes the first matching span of elements and returns a tuple of the first span
     * and the remaining elements.
     */
    export function span<T>(array: T[], f: (x: T, i: number) => boolean): [T[], T[]] {
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
    export function spanMap<T, K, U>(array: T[], keyfn: (x: T, i: number) => K, mapfn: (chunk: T[], key: K, start: number, end: number) => U): U[] {
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

    export function mapObject<T, U>(object: MapLike<T>, f: (key: string, x: T) => [string, U]): MapLike<U> {
        let result: MapLike<U>;
        if (object) {
            result = {};
            for (const v of getOwnKeys(object)) {
                const [key, value]: [string, U] = f(v, object[v]) || [undefined, undefined];
                if (key !== undefined) {
                    result[key] = value;
                }
            }
        }
        return result;
    }

    export function some<T>(array: T[], predicate?: (value: T) => boolean): boolean {
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

    export function concatenate<T>(array1: T[], array2: T[]): T[] {
        if (!array2 || !array2.length) return array1;
        if (!array1 || !array1.length) return array2;
        return [...array1, ...array2];
    }

    // TODO: fixme (N^2) - add optional comparer so collection can be sorted before deduplication.
    export function deduplicate<T>(array: T[], areEqual?: (a: T, b: T) => boolean): T[] {
        let result: T[];
        if (array) {
            result = [];
            loop: for (const item of array) {
                for (const res of result) {
                    if (areEqual ? areEqual(res, item) : res === item) {
                        continue loop;
                    }
                }
                result.push(item);
            }
        }
        return result;
    }

    export function arrayIsEqualTo<T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>, equaler?: (a: T, b: T) => boolean): boolean {
        if (!array1 || !array2) {
            return array1 === array2;
        }

        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            const equals = equaler ? equaler(array1[i], array2[i]) : array1[i] === array2[i];
            if (!equals) {
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

    export function sum(array: any[], prop: string): number {
        let result = 0;
        for (const v of array) {
            result += v[prop];
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
        if (to === undefined) to = [];
        to.push(value);
        return to;
    }

    /**
     * Appends a range of value to an array, returning the array.
     *
     * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
     * is created if `value` was appended.
     * @param from The values to append to the array. If `from` is `undefined`, nothing is
     * appended. If an element of `from` is `undefined`, that element is not appended.
     */
    export function addRange<T>(to: T[] | undefined, from: T[] | undefined): T[] | undefined {
        if (from === undefined) return to;
        for (const v of from) {
            to = append(to, v);
        }
        return to;
    }

    export function rangeEquals<T>(array1: T[], array2: T[], pos: number, end: number) {
        while (pos < end) {
            if (array1[pos] !== array2[pos]) {
                return false;
            }
            pos++;
        }
        return true;
    }

    /**
     * Returns the first element of an array if non-empty, `undefined` otherwise.
     */
    export function firstOrUndefined<T>(array: T[]): T {
        return array && array.length > 0
            ? array[0]
            : undefined;
    }

    /**
     * Returns the last element of an array if non-empty, `undefined` otherwise.
     */
    export function lastOrUndefined<T>(array: T[]): T {
        return array && array.length > 0
            ? array[array.length - 1]
            : undefined;
    }

    /**
     * Returns the only element of an array if it contains only one element, `undefined` otherwise.
     */
    export function singleOrUndefined<T>(array: T[]): T {
        return array && array.length === 1
            ? array[0]
            : undefined;
    }

    /**
     * Returns the only element of an array if it contains only one element; otheriwse, returns the
     * array.
     */
    export function singleOrMany<T>(array: T[]): T | T[] {
        return array && array.length === 1
            ? array[0]
            : array;
    }

    export function replaceElement<T>(array: T[], index: number, value: T): T[] {
        const result = array.slice(0);
        result[index] = value;
        return result;
    }

    /**
     * Performs a binary search, finding the index at which 'value' occurs in 'array'.
     * If no such index is found, returns the 2's-complement of first index at which
     * number[index] exceeds number.
     * @param array A sorted array whose first element must be no larger than number
     * @param number The value to be searched for in the array.
     */
    export function binarySearch<T>(array: T[], value: T, comparer?: (v1: T, v2: T) => number): number {
        if (!array || array.length === 0) {
            return -1;
        }

        let low = 0;
        let high = array.length - 1;
        comparer = comparer !== undefined
            ? comparer
            : (v1, v2) => (v1 < v2 ? -1 : (v1 > v2 ? 1 : 0));

        while (low <= high) {
            const middle = low + ((high - low) >> 1);
            const midValue = array[middle];

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

    export function reduceLeft<T, U>(array: T[], f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
    export function reduceLeft<T>(array: T[], f: (memo: T, value: T, i: number) => T): T;
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

    export function reduceRight<T, U>(array: T[], f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
    export function reduceRight<T>(array: T[], f: (memo: T, value: T, i: number) => T): T;
    export function reduceRight<T>(array: T[], f: (memo: T, value: T, i: number) => T, initial?: T, start?: number, count?: number): T {
        if (array) {
            const size = array.length;
            if (size > 0) {
                let pos = start === undefined || start > size - 1 ? size - 1 : start;
                const end = count === undefined || pos - count < 0 ? 0 : pos - count;
                let result: T;
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

    const hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * Indicates whether a map-like contains an own property with the specified key.
     *
     * NOTE: This is intended for use only with MapLike<T> objects. For Map<T> objects, use
     *       the 'in' operator.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    export function hasProperty<T>(map: MapLike<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    /**
     * Gets the value of an owned property in a map-like.
     *
     * NOTE: This is intended for use only with MapLike<T> objects. For Map<T> objects, use
     *       an indexer.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    export function getProperty<T>(map: MapLike<T>, key: string): T | undefined {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }

    /**
     * Gets the owned, enumerable property keys of a map-like.
     *
     * NOTE: This is intended for use with MapLike<T> objects. For Map<T> objects, use
     *       Object.keys instead as it offers better performance.
     *
     * @param map A map-like.
     */
    export function getOwnKeys<T>(map: MapLike<T>): string[] {
        const keys: string[] = [];
        for (const key in map) if (hasOwnProperty.call(map, key)) {
            keys.push(key);
        }
        return keys;
    }

    /**
     * Enumerates the properties of a Map<T>, invoking a callback and returning the first truthy result.
     *
     * @param map A map for which properties should be enumerated.
     * @param callback A callback to invoke for each property.
     */
    export function forEachProperty<T, U>(map: Map<T>, callback: (value: T, key: string) => U): U {
        let result: U;
        for (const key in map) {
            if (result = callback(map[key], key)) break;
        }
        return result;
    }

    /**
     * Returns true if a Map<T> has some matching property.
     *
     * @param map A map whose properties should be tested.
     * @param predicate An optional callback used to test each property.
     */
    export function someProperties<T>(map: Map<T>, predicate?: (value: T, key: string) => boolean) {
        for (const key in map) {
            if (!predicate || predicate(map[key], key)) return true;
        }
        return false;
    }

    /**
     * Performs a shallow copy of the properties from a source Map<T> to a target MapLike<T>
     *
     * @param source A map from which properties should be copied.
     * @param target A map to which properties should be copied.
     */
    export function copyProperties<T>(source: Map<T>, target: MapLike<T>): void {
        for (const key in source) {
            target[key] = source[key];
        }
    }

    export function assign<T1 extends MapLike<{}>, T2, T3>(t: T1, arg1: T2, arg2: T3): T1 & T2 & T3;
    export function assign<T1 extends MapLike<{}>, T2>(t: T1, arg1: T2): T1 & T2;
    export function assign<T1 extends MapLike<{}>>(t: T1, ...args: any[]): any;
    export function assign<T1 extends MapLike<{}>>(t: T1, ...args: any[]) {
        for (const arg of args) {
            for (const p of getOwnKeys(arg)) {
                t[p] = arg[p];
            }
        }
        return t;
    }

    /**
     * Reduce the properties of a map.
     *
     * NOTE: This is intended for use with Map<T> objects. For MapLike<T> objects, use
     *       reduceOwnProperties instead as it offers better runtime safety.
     *
     * @param map The map to reduce
     * @param callback An aggregation function that is called for each entry in the map
     * @param initial The initial value for the reduction.
     */
    export function reduceProperties<T, U>(map: Map<T>, callback: (aggregate: U, value: T, key: string) => U, initial: U): U {
        let result = initial;
        for (const key in map) {
            result = callback(result, map[key], String(key));
        }
        return result;
    }

    /**
     * Reduce the properties defined on a map-like (but not from its prototype chain).
     *
     * NOTE: This is intended for use with MapLike<T> objects. For Map<T> objects, use
     *       reduceProperties instead as it offers better performance.
     *
     * @param map The map-like to reduce
     * @param callback An aggregation function that is called for each entry in the map
     * @param initial The initial value for the reduction.
     */
    export function reduceOwnProperties<T, U>(map: MapLike<T>, callback: (aggregate: U, value: T, key: string) => U, initial: U): U {
        let result = initial;
        for (const key in map) if (hasOwnProperty.call(map, key)) {
            result = callback(result, map[key], String(key));
        }
        return result;
    }

    /**
     * Performs a shallow equality comparison of the contents of two map-likes.
     *
     * @param left A map-like whose properties should be compared.
     * @param right A map-like whose properties should be compared.
     */
    export function equalOwnProperties<T>(left: MapLike<T>, right: MapLike<T>, equalityComparer?: (left: T, right: T) => boolean) {
        if (left === right) return true;
        if (!left || !right) return false;
        for (const key in left) if (hasOwnProperty.call(left, key)) {
            if (!hasOwnProperty.call(right, key) === undefined) return false;
            if (equalityComparer ? !equalityComparer(left[key], right[key]) : left[key] !== right[key]) return false;
        }
        for (const key in right) if (hasOwnProperty.call(right, key)) {
            if (!hasOwnProperty.call(left, key)) return false;
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
    export function arrayToMap<T>(array: T[], makeKey: (value: T) => string): Map<T>;
    export function arrayToMap<T, U>(array: T[], makeKey: (value: T) => string, makeValue: (value: T) => U): Map<U>;
    export function arrayToMap<T, U>(array: T[], makeKey: (value: T) => string, makeValue?: (value: T) => U): Map<T | U> {
        const result = createMap<T | U>();
        for (const value of array) {
            result[makeKey(value)] = makeValue ? makeValue(value) : value;
        }
        return result;
    }

    export function isEmpty<T>(map: Map<T>) {
        for (const id in map) {
            if (hasProperty(map, id)) {
                return false;
            }
        }
        return true;
    }

    export function cloneMap<T>(map: Map<T>) {
        const clone = createMap<T>();
        copyProperties(map, clone);
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
        for (const id in second) if (hasOwnProperty.call(second, id)) {
            (result as any)[id] = (second as any)[id];
        }
        for (const id in first) if (hasOwnProperty.call(first, id)) {
            (result as any)[id] = (first as any)[id];
        }
        return result;
    }

    /**
     * Adds the value to an array of values associated with the key, and returns the array.
     * Creates the array if it does not already exist.
     */
    export function multiMapAdd<V>(map: Map<V[]>, key: string | number, value: V): V[] {
        const values = map[key];
        if (values) {
            values.push(value);
            return values;
        }
        else {
            return map[key] = [value];
        }
    }

    /**
     * Removes a value from an array of values associated with the key.
     * Does not preserve the order of those values.
     * Does nothing if `key` is not in `map`, or `value` is not in `map[key]`.
     */
    export function multiMapRemove<V>(map: Map<V[]>, key: string, value: V): void {
        const values = map[key];
        if (values) {
            unorderedRemoveItem(values, value);
            if (!values.length) {
                delete map[key];
            }
        }
    }

    /**
     * Tests whether a value is an array.
     */
    export function isArray(value: any): value is any[] {
        return Array.isArray ? Array.isArray(value) : value instanceof Array;
    }

    /** Does nothing. */
    export function noop(): void {}

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

            return t => reduceLeft<(t: T) => T, T>(args, (u, f) => f(u), t);
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

    function formatStringFromArgs(text: string, args: { [index: number]: string; }, baseIndex?: number): string {
        baseIndex = baseIndex || 0;

        return text.replace(/{(\d+)}/g, (_match, index?) => args[+index + baseIndex]);
    }

    export let localizedDiagnosticMessages: Map<string> = undefined;

    export function getLocaleSpecificMessage(message: DiagnosticMessage) {
        return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
    }

    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: (string | number)[]): Diagnostic;
    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage): Diagnostic {
        const end = start + length;

        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);

        if (file) {
            Debug.assert(start <= file.text.length, `start must be within the bounds of the file. ${start} > ${file.text.length}`);
            Debug.assert(end <= file.text.length, `end must be the bounds of the file. ${end} > ${file.text.length}`);
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

    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage, ...args: any[]): DiagnosticMessageChain;
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

    export function compareValues<T>(a: T, b: T): Comparison {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        return a < b ? Comparison.LessThan : Comparison.GreaterThan;
    }

    export function compareStrings(a: string, b: string, ignoreCase?: boolean): Comparison {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        if (ignoreCase) {
            if (collator && String.prototype.localeCompare) {
                // accent means a ≠ b, a ≠ á, a = A
                const result = a.localeCompare(b, /*locales*/ undefined, { usage: "sort", sensitivity: "accent" });
                return result < 0 ? Comparison.LessThan : result > 0 ? Comparison.GreaterThan : Comparison.EqualTo;
            }

            a = a.toUpperCase();
            b = b.toUpperCase();
            if (a === b) return Comparison.EqualTo;
        }

        return a < b ? Comparison.LessThan : Comparison.GreaterThan;
    }

    export function compareStringsCaseInsensitive(a: string, b: string) {
        return compareStrings(a, b, /*ignoreCase*/ true);
    }

    function getDiagnosticFileName(diagnostic: Diagnostic): string {
        return diagnostic.file ? diagnostic.file.fileName : undefined;
    }

    export function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): Comparison {
        return compareValues(getDiagnosticFileName(d1), getDiagnosticFileName(d2)) ||
            compareValues(d1.start, d2.start) ||
            compareValues(d1.length, d2.length) ||
            compareValues(d1.code, d2.code) ||
            compareMessageText(d1.messageText, d2.messageText) ||
            Comparison.EqualTo;
    }

    function compareMessageText(text1: string | DiagnosticMessageChain, text2: string | DiagnosticMessageChain): Comparison {
        while (text1 && text2) {
            // We still have both chains.
            const string1 = typeof text1 === "string" ? text1 : text1.messageText;
            const string2 = typeof text2 === "string" ? text2 : text2.messageText;

            const res = compareValues(string1, string2);
            if (res) {
                return res;
            }

            text1 = typeof text1 === "string" ? undefined : text1.next;
            text2 = typeof text2 === "string" ? undefined : text2.next;
        }

        if (!text1 && !text2) {
            // if the chains are done, then these messages are the same.
            return Comparison.EqualTo;
        }

        // We still have one chain remaining.  The shorter chain should come first.
        return text1 ? Comparison.GreaterThan : Comparison.LessThan;
    }

    export function sortAndDeduplicateDiagnostics(diagnostics: Diagnostic[]): Diagnostic[] {
        return deduplicateSortedDiagnostics(diagnostics.sort(compareDiagnostics));
    }

    export function deduplicateSortedDiagnostics(diagnostics: Diagnostic[]): Diagnostic[] {
        if (diagnostics.length < 2) {
            return diagnostics;
        }

        const newDiagnostics = [diagnostics[0]];
        let previousDiagnostic = diagnostics[0];
        for (let i = 1; i < diagnostics.length; i++) {
            const currentDiagnostic = diagnostics[i];
            const isDupe = compareDiagnostics(currentDiagnostic, previousDiagnostic) === Comparison.EqualTo;
            if (!isDupe) {
                newDiagnostics.push(currentDiagnostic);
                previousDiagnostic = currentDiagnostic;
            }
        }

        return newDiagnostics;
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
            if (path.charCodeAt(2) === CharacterCodes.slash) return 3;
            return 2;
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
        path = normalizeSlashes(path);
        const rootLength = getRootLength(path);
        const root = path.substr(0, rootLength);
        const normalized = getNormalizedParts(path, rootLength);
        if (normalized.length) {
            const joinedParts = root + normalized.join(directorySeparator);
            return pathEndsWithDirectorySeparator(path) ? joinedParts + directorySeparator : joinedParts;
        }
        else {
            return root;
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
    export function getDirectoryPath(path: string): any {
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(directorySeparator)));
    }

    export function isUrl(path: string) {
        return path && !isRootedDiskPath(path) && path.indexOf("://") !== -1;
    }

    export function isExternalModuleNameRelative(moduleName: string): boolean {
        // TypeScript 1.0 spec (April 2014): 11.2.1
        // An external module name is "relative" if the first term is "." or "..".
        return /^\.\.?($|[\\/])/.test(moduleName);
    }

    export function getEmitScriptTarget(compilerOptions: CompilerOptions) {
        return compilerOptions.target || ScriptTarget.ES3;
    }

    export function getEmitModuleKind(compilerOptions: CompilerOptions) {
        return typeof compilerOptions.module === "number" ?
            compilerOptions.module :
            getEmitScriptTarget(compilerOptions) >= ScriptTarget.ES2015 ? ModuleKind.ES2015 : ModuleKind.CommonJS;
    }

    /* @internal */
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
        return getRootLength(path) !== 0;
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

    export function getNormalizedPathFromPathComponents(pathComponents: string[]) {
        if (pathComponents && pathComponents.length) {
            return pathComponents[0] + pathComponents.slice(1).join(directorySeparator);
        }
    }

    function getNormalizedPathComponentsOfUrl(url: string) {
        // Get root length of http://www.website.com/folder1/folder2/
        // In this example the root is:  http://www.website.com/
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
            // but make sure we append "/"  to it as root is not joined using "/"
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

    export function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: (fileName: string) => string, isAbsolutePathAnUrl: boolean) {
        const pathComponents = getNormalizedPathOrUrlComponents(relativeOrAbsolutePath, currentDirectory);
        const directoryComponents = getNormalizedPathOrUrlComponents(directoryPathOrUrl, currentDirectory);
        if (directoryComponents.length > 1 && lastOrUndefined(directoryComponents) === "") {
            // If the directory path given was of type test/cases/ then we really need components of directory to be only till its name
            // that is  ["test", "cases", ""] needs to be actually ["test", "cases"]
            directoryComponents.length--;
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

    export function combinePaths(path1: string, path2: string) {
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
        for (let i = 0; i < sharedLength; i++) {
            const result = compareStrings(aComponents[i], bComponents[i], ignoreCase);
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

        for (let i = 0; i < parentComponents.length; i++) {
            const result = compareStrings(parentComponents[i], childComponents[i], ignoreCase);
            if (result !== Comparison.EqualTo) {
                return false;
            }
        }

        return true;
    }

    /* @internal */
    export function startsWith(str: string, prefix: string): boolean {
        return str.lastIndexOf(prefix, 0) === 0;
    }

    /* @internal */
    export function endsWith(str: string, suffix: string): boolean {
        const expectedPos = str.length - suffix.length;
        return expectedPos >= 0 && str.indexOf(suffix, expectedPos) === expectedPos;
    }

    export function fileExtensionIs(path: string, extension: string): boolean {
        return path.length > extension.length && endsWith(path, extension);
    }

    export function fileExtensionIsAny(path: string, extensions: string[]): boolean {
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

    /**
     * Matches any single directory segment unless it is the last segment and a .min.js file
     * Breakdown:
     *  [^./]                   # matches everything up to the first . character (excluding directory seperators)
     *  (\\.(?!min\\.js$))?     # matches . characters but not if they are part of the .min.js file extension
     */
    const singleAsteriskRegexFragmentFiles = "([^./]|(\\.(?!min\\.js$))?)*";
    const singleAsteriskRegexFragmentOther = "[^/]*";

    export function getRegularExpressionForWildcard(specs: string[], basePath: string, usage: "files" | "directories" | "exclude") {
        if (specs === undefined || specs.length === 0) {
            return undefined;
        }

        const replaceWildcardCharacter = usage === "files" ? replaceWildCardCharacterFiles : replaceWildCardCharacterOther;
        const singleAsteriskRegexFragment = usage === "files" ? singleAsteriskRegexFragmentFiles : singleAsteriskRegexFragmentOther;

        /**
         * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
         * files or directories, does not match subdirectories that start with a . character
         */
        const doubleAsteriskRegexFragment = usage === "exclude" ? "(/.+?)?" : "(/[^/.][^/]*)*?";

        let pattern = "";
        let hasWrittenSubpattern = false;
        spec: for (const spec of specs) {
            if (!spec) {
                continue;
            }

            let subpattern = "";
            let hasRecursiveDirectoryWildcard = false;
            let hasWrittenComponent = false;
            const components = getNormalizedPathComponents(spec, basePath);
            if (usage !== "exclude" && components[components.length - 1] === "**") {
                continue spec;
            }

            // getNormalizedPathComponents includes the separator for the root component.
            // We need to remove to create our regex correctly.
            components[0] = removeTrailingDirectorySeparator(components[0]);

            let optionalCount = 0;
            for (let component of components) {
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
                        subpattern += directorySeparator;
                    }

                    if (usage !== "exclude") {
                        // The * and ? wildcards should not match directories or files that start with . if they
                        // appear first in a component. Dotted directories and files can be included explicitly
                        // like so: **/.*/.*
                        if (component.charCodeAt(0) === CharacterCodes.asterisk) {
                            subpattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                            component = component.substr(1);
                        }
                        else if (component.charCodeAt(0) === CharacterCodes.question) {
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

    function replaceWildCardCharacterFiles(match: string) {
        return replaceWildcardCharacter(match, singleAsteriskRegexFragmentFiles);
    }

    function replaceWildCardCharacterOther(match: string) {
        return replaceWildcardCharacter(match, singleAsteriskRegexFragmentOther);
    }

    function replaceWildcardCharacter(match: string, singleAsteriskRegexFragment: string) {
        return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
    }

    export interface FileSystemEntries {
        files: string[];
        directories: string[];
    }

    export interface FileMatcherPatterns {
        includeFilePattern: string;
        includeDirectoryPattern: string;
        excludePattern: string;
        basePaths: string[];
    }

    export function getFileMatcherPatterns(path: string, excludes: string[], includes: string[], useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);
        const absolutePath = combinePaths(currentDirectory, path);

        return {
            includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
            includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
            excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
            basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
        };
    }

    export function matchFiles(path: string, extensions: string[], excludes: string[], includes: string[], useCaseSensitiveFileNames: boolean, currentDirectory: string, getFileSystemEntries: (path: string) => FileSystemEntries): string[] {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);

        const patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);

        const regexFlag = useCaseSensitiveFileNames ? "" : "i";
        const includeFileRegex = patterns.includeFilePattern && new RegExp(patterns.includeFilePattern, regexFlag);
        const includeDirectoryRegex = patterns.includeDirectoryPattern && new RegExp(patterns.includeDirectoryPattern, regexFlag);
        const excludeRegex = patterns.excludePattern && new RegExp(patterns.excludePattern, regexFlag);

        const result: string[] = [];
        for (const basePath of patterns.basePaths) {
            visitDirectory(basePath, combinePaths(currentDirectory, basePath));
        }
        return result;

        function visitDirectory(path: string, absolutePath: string) {
            const { files, directories } = getFileSystemEntries(path);

            for (const current of files) {
                const name = combinePaths(path, current);
                const absoluteName = combinePaths(absolutePath, current);
                if ((!extensions || fileExtensionIsAny(name, extensions)) &&
                    (!includeFileRegex || includeFileRegex.test(absoluteName)) &&
                    (!excludeRegex || !excludeRegex.test(absoluteName))) {
                    result.push(name);
                }
            }

            for (const current of directories) {
                const name = combinePaths(path, current);
                const absoluteName = combinePaths(absolutePath, current);
                if ((!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
                    (!excludeRegex || !excludeRegex.test(absoluteName))) {
                    visitDirectory(name, absoluteName);
                }
            }
        }
    }

    /**
     * Computes the unique non-wildcard base paths amongst the provided include patterns.
     */
    function getBasePaths(path: string, includes: string[], useCaseSensitiveFileNames: boolean) {
        // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
        const basePaths: string[] = [path];
        if (includes) {
            // Storage for literal base paths amongst the include patterns.
            const includeBasePaths: string[] = [];
            for (const include of includes) {
                // We also need to check the relative paths by converting them to absolute and normalizing
                // in case they escape the base path (e.g "..\somedirectory")
                const absolute: string = isRootedDiskPath(include) ? include : normalizePath(combinePaths(path, include));

                const wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
                const includeBasePath = wildcardOffset < 0
                    ? removeTrailingDirectorySeparator(getDirectoryPath(absolute))
                    : absolute.substring(0, absolute.lastIndexOf(directorySeparator, wildcardOffset));

                // Append the literal and canonical candidate base paths.
                includeBasePaths.push(includeBasePath);
            }

            // Sort the offsets array using either the literal or canonical path representations.
            includeBasePaths.sort(useCaseSensitiveFileNames ? compareStrings : compareStringsCaseInsensitive);

            // Iterate over each include base path and include unique base paths that are not a
            // subpath of an existing base path
            include: for (let i = 0; i < includeBasePaths.length; i++) {
                const includeBasePath = includeBasePaths[i];
                for (let j = 0; j < basePaths.length; j++) {
                    if (containsPath(basePaths[j], includeBasePath, path, !useCaseSensitiveFileNames)) {
                        continue include;
                    }
                }

                basePaths.push(includeBasePath);
            }
        }

        return basePaths;
    }

    export function ensureScriptKind(fileName: string, scriptKind?: ScriptKind): ScriptKind {
        // Using scriptKind as a condition handles both:
        // - 'scriptKind' is unspecified and thus it is `undefined`
        // - 'scriptKind' is set and it is `Unknown` (0)
        // If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
        // to get the ScriptKind from the file name. If it cannot be resolved
        // from the file name then the default 'TS' script kind is returned.
        return (scriptKind || getScriptKindFromFileName(fileName)) || ScriptKind.TS;
    }

    export function getScriptKindFromFileName(fileName: string): ScriptKind {
        const ext = fileName.substr(fileName.lastIndexOf("."));
        switch (ext.toLowerCase()) {
            case ".js":
                return ScriptKind.JS;
            case ".jsx":
                return ScriptKind.JSX;
            case ".ts":
                return ScriptKind.TS;
            case ".tsx":
                return ScriptKind.TSX;
            default:
                return ScriptKind.Unknown;
        }
    }

    /**
     *  List of supported extensions in order of file resolution precedence.
     */
    export const supportedTypeScriptExtensions = [".ts", ".tsx", ".d.ts"];
    /** Must have ".d.ts" first because if ".ts" goes first, that will be detected as the extension instead of ".d.ts". */
    export const supportedTypescriptExtensionsForExtractExtension = [".d.ts", ".ts", ".tsx"];
    export const supportedJavascriptExtensions = [".js", ".jsx"];
    const allSupportedExtensions = supportedTypeScriptExtensions.concat(supportedJavascriptExtensions);

    export function getSupportedExtensions(options?: CompilerOptions): string[] {
        return options && options.allowJs ? allSupportedExtensions : supportedTypeScriptExtensions;
    }

    export function hasJavaScriptFileExtension(fileName: string) {
        return forEach(supportedJavascriptExtensions, extension => fileExtensionIs(fileName, extension));
    }

    export function hasTypeScriptFileExtension(fileName: string) {
        return forEach(supportedTypeScriptExtensions, extension => fileExtensionIs(fileName, extension));
    }

    export function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions) {
        if (!fileName) { return false; }

        for (const extension of getSupportedExtensions(compilerOptions)) {
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
        Limit = 5,

        Highest = TypeScriptFiles,
        Lowest = DeclarationAndJavaScriptFiles,
    }

    export function getExtensionPriority(path: string, supportedExtensions: string[]): ExtensionPriority {
        for (let i = supportedExtensions.length - 1; i >= 0; i--) {
            if (fileExtensionIs(path, supportedExtensions[i])) {
                return adjustExtensionPriority(<ExtensionPriority>i);
            }
        }

        // If its not in the list of supported extensions, this is likely a
        // TypeScript file with a non-ts extension
        return ExtensionPriority.Highest;
    }

    /**
     * Adjusts an extension priority to be the highest priority within the same range.
     */
    export function adjustExtensionPriority(extensionPriority: ExtensionPriority): ExtensionPriority {
        if (extensionPriority < ExtensionPriority.DeclarationAndJavaScriptFiles) {
            return ExtensionPriority.TypeScriptFiles;
        }
        else if (extensionPriority < ExtensionPriority.Limit) {
            return ExtensionPriority.DeclarationAndJavaScriptFiles;
        }
        else {
            return ExtensionPriority.Limit;
        }
    }

    /**
     * Gets the next lowest extension priority for a given priority.
     */
    export function getNextLowestExtensionPriority(extensionPriority: ExtensionPriority): ExtensionPriority {
        if (extensionPriority < ExtensionPriority.DeclarationAndJavaScriptFiles) {
            return ExtensionPriority.DeclarationAndJavaScriptFiles;
        }
        else {
            return ExtensionPriority.Limit;
        }
    }

    const extensionsToRemove = [".d.ts", ".ts", ".js", ".tsx", ".jsx"];
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

    export function isJsxOrTsxExtension(ext: string): boolean {
        return ext === ".jsx" || ext === ".tsx";
    }

    export function changeExtension<T extends string | Path>(path: T, newExtension: string): T {
        return <T>(removeFileExtension(path) + newExtension);
    }

    export interface ObjectAllocator {
        getNodeConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos?: number, end?: number) => Token<TKind>;
        getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos?: number, end?: number) => Identifier;
        getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos?: number, end?: number) => SourceFile;
        getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
    }

    function Symbol(this: Symbol, flags: SymbolFlags, name: string) {
        this.flags = flags;
        this.name = name;
        this.declarations = undefined;
    }

    function Type(this: Type, _checker: TypeChecker, flags: TypeFlags) {
        this.flags = flags;
    }

    function Signature() {
    }

    function Node(this: Node, kind: SyntaxKind, pos: number, end: number) {
        this.id = 0;
        this.kind = kind;
        this.pos = pos;
        this.end = end;
        this.flags = NodeFlags.None;
        this.modifierFlagsCache = ModifierFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined;
        this.original = undefined;
    }

    export let objectAllocator: ObjectAllocator = {
        getNodeConstructor: () => <any>Node,
        getTokenConstructor: () => <any>Node,
        getIdentifierConstructor: () => <any>Node,
        getSourceFileConstructor: () => <any>Node,
        getSymbolConstructor: () => <any>Symbol,
        getTypeConstructor: () => <any>Type,
        getSignatureConstructor: () => <any>Signature
    };

    export const enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }

    export namespace Debug {
        export let currentAssertionLevel = AssertionLevel.None;

        export function shouldAssert(level: AssertionLevel): boolean {
            return currentAssertionLevel >= level;
        }

        export function assert(expression: boolean, message?: string, verboseDebugInfo?: () => string): void {
            if (!expression) {
                let verboseDebugString = "";
                if (verboseDebugInfo) {
                    verboseDebugString = "\r\nVerbose Debug Information: " + verboseDebugInfo();
                }
                debugger;
                throw new Error("Debug Failure. False expression: " + (message || "") + verboseDebugString);
            }
        }

        export function fail(message?: string): void {
            Debug.assert(/*expression*/ false, message);
        }
    }

    /** Remove an item from an array, moving everything to its right one space left. */
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

    export function createGetCanonicalFileName(useCaseSensitiveFileNames: boolean): (fileName: string) => string {
        return useCaseSensitiveFileNames
            ? ((fileName) => fileName)
            : ((fileName) => fileName.toLowerCase());
    }

    /**
     * patternStrings contains both pattern strings (containing "*") and regular strings.
     * Return an exact match if possible, or a pattern match, or undefined.
     * (These are verified by verifyCompilerOptions to have 0 or 1 "*" characters.)
     */
    /* @internal */
    export function matchPatternOrExact(patternStrings: string[], candidate: string): string | Pattern | undefined {
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

    /* @internal */
    export function patternText({prefix, suffix}: Pattern): string {
        return `${prefix}*${suffix}`;
    }

    /**
     * Given that candidate matches pattern, returns the text matching the '*'.
     * E.g.: matchedText(tryParsePattern("foo*baz"), "foobarbaz") === "bar"
     */
    /* @internal */
    export function matchedText(pattern: Pattern, candidate: string): string {
        Debug.assert(isPatternMatch(pattern, candidate));
        return candidate.substr(pattern.prefix.length, candidate.length - pattern.suffix.length);
    }

    /** Return the object corresponding to the best pattern to match `candidate`. */
    /* @internal */
    export function findBestPatternMatch<T>(values: T[], getPattern: (value: T) => Pattern, candidate: string): T | undefined {
        let matchedValue: T | undefined = undefined;
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

    function isPatternMatch({prefix, suffix}: Pattern, candidate: string) {
        return candidate.length >= prefix.length + suffix.length &&
            startsWith(candidate, prefix) &&
            endsWith(candidate, suffix);
    }

    /* @internal */
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
}
