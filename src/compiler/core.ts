/* @internal */
namespace ts {
    type GetIteratorCallback = <I extends readonly any[] | ReadonlySet<any> | ReadonlyMap<any, any> | undefined>(iterable: I) => Iterator<
        I extends ReadonlyMap<infer K, infer V> ? [K, V] :
        I extends ReadonlySet<infer T> ? T :
        I extends readonly (infer T)[] ? T :
        I extends undefined ? undefined :
        never>;

    function getCollectionImplementation<
        K1 extends MatchingKeys<typeof NativeCollections, () => any>,
        K2 extends MatchingKeys<typeof ShimCollections, (getIterator?: GetIteratorCallback) => ReturnType<(typeof NativeCollections)[K1]>>
    >(name: string, nativeFactory: K1, shimFactory: K2): NonNullable<ReturnType<(typeof NativeCollections)[K1]>> {
        // NOTE: ts.ShimCollections will be defined for typescriptServices.js but not for tsc.js, so we must test for it.
        const constructor = NativeCollections[nativeFactory]() ?? ShimCollections?.[shimFactory](getIterator);
        if (constructor) return constructor as NonNullable<ReturnType<(typeof NativeCollections)[K1]>>;
        throw new Error(`TypeScript requires an environment that provides a compatible native ${name} implementation.`);
    }

    export const Map = getCollectionImplementation("Map", "tryGetNativeMap", "createMapShim");
    export const Set = getCollectionImplementation("Set", "tryGetNativeSet", "createSetShim");

    export function getIterator<I extends readonly any[] | ReadonlySet<any> | ReadonlyMap<any, any> | undefined>(iterable: I): Iterator<
        I extends ReadonlyMap<infer K, infer V> ? [K, V] :
        I extends ReadonlySet<infer T> ? T :
        I extends readonly (infer T)[] ? T :
        I extends undefined ? undefined :
        never>;
    export function getIterator<K, V>(iterable: ReadonlyMap<K, V>): Iterator<[K, V]>;
    export function getIterator<K, V>(iterable: ReadonlyMap<K, V> | undefined): Iterator<[K, V]> | undefined;
    export function getIterator<T>(iterable: readonly T[] | ReadonlySet<T>): Iterator<T>;
    export function getIterator<T>(iterable: readonly T[] | ReadonlySet<T> | undefined): Iterator<T> | undefined;
    export function getIterator(iterable: readonly any[] | ReadonlySet<any> | ReadonlyMap<any, any> | undefined): Iterator<any> | undefined {
        if (iterable) {
            if (isArray(iterable)) return arrayIterator(iterable);
            if (iterable instanceof Map) return iterable.entries();
            if (iterable instanceof Set) return iterable.values();
            throw new Error("Iteration not supported.");
        }
    }

    export const emptyArray: never[] = [] as never[];
    export const emptyMap: ReadonlyMap<never, never> = new Map<never, never>();
    export const emptySet: ReadonlySet<never> = new Set<never>();

    /**
     * Create a new map.
     * @deprecated Use `new Map()` instead.
     */
    export function createMap<K, V>(): Map<K, V> {
        return new Map<K, V>();
    }

    /**
     * Create a new map from a template object is provided, the map will copy entries from it.
     * @deprecated Use `new Map(getEntries(template))` instead.
     */
    export function createMapFromTemplate<T>(template: MapLike<T>): Map<string, T> {
        const map = new Map<string, T>();

        // Copies keys/values from template. Note that for..in will not throw if
        // template is undefined, and instead will just exit the loop.
        for (const key in template) {
            if (hasOwnProperty.call(template, key)) {
                map.set(key, template[key]);
            }
        }

        return map;
    }

    export function length(array: readonly any[] | undefined): number {
        return array ? array.length : 0;
    }

    /**
     * Iterates through 'array' by index and performs the callback on each element of array until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, the callback is applied to each element of array and undefined is returned.
     */
    export function forEach<T, U>(array: readonly T[] | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
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

    /**
     * Like `forEach`, but iterates in reverse order.
     */
    export function forEachRight<T, U>(array: readonly T[] | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
        if (array) {
            for (let i = array.length - 1; i >= 0; i--) {
                const result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }

    /** Like `forEach`, but suitable for use with numbers and strings (which may be falsy). */
    export function firstDefined<T, U>(array: readonly T[] | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
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
            const iterResult = iter.next();
            if (iterResult.done) {
                return undefined;
            }
            const result = callback(iterResult.value);
            if (result !== undefined) {
                return result;
            }
        }
    }

    export function reduceLeftIterator<T, U>(iterator: Iterator<T> | undefined, f: (memo: U, value: T, i: number) => U, initial: U): U {
        let result = initial;
        if (iterator) {
            for (let step = iterator.next(), pos = 0; !step.done; step = iterator.next(), pos++) {
                result = f(result, step.value, pos);
            }
        }
        return result;
    }

    export function zipWith<T, U, V>(arrayA: readonly T[], arrayB: readonly U[], callback: (a: T, b: U, index: number) => V): V[] {
        const result: V[] = [];
        Debug.assertEqual(arrayA.length, arrayB.length);
        for (let i = 0; i < arrayA.length; i++) {
            result.push(callback(arrayA[i], arrayB[i], i));
        }
        return result;
    }

    export function zipToIterator<T, U>(arrayA: readonly T[], arrayB: readonly U[]): Iterator<[T, U]> {
        Debug.assertEqual(arrayA.length, arrayB.length);
        let i = 0;
        return {
            next() {
                if (i === arrayA.length) {
                    return { value: undefined as never, done: true };
                }
                i++;
                return { value: [arrayA[i - 1], arrayB[i - 1]] as [T, U], done: false };
            }
        };
    }

    export function zipToMap<K, V>(keys: readonly K[], values: readonly V[]): Map<K, V> {
        Debug.assert(keys.length === values.length);
        const map = new Map<K, V>();
        for (let i = 0; i < keys.length; ++i) {
            map.set(keys[i], values[i]);
        }
        return map;
    }

    /**
     * Creates a new array with `element` interspersed in between each element of `input`
     * if there is more than 1 value in `input`. Otherwise, returns the existing array.
     */
    export function intersperse<T>(input: T[], element: T): T[] {
        if (input.length <= 1) {
            return input;
        }
        const result: T[] = [];
        for (let i = 0, n = input.length; i < n; i++) {
            if (i) result.push(element);
            result.push(input[i]);
        }
        return result;
    }

    /**
     * Iterates through `array` by index and performs the callback on each element of array until the callback
     * returns a falsey value, then returns false.
     * If no such value is found, the callback is applied to each element of array and `true` is returned.
     */
    export function every<T>(array: readonly T[] | undefined, callback: (element: T, index: number) => boolean): boolean {
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
    export function find<T, U extends T>(array: readonly T[], predicate: (element: T, index: number) => element is U): U | undefined;
    export function find<T>(array: readonly T[], predicate: (element: T, index: number) => boolean): T | undefined;
    export function find<T>(array: readonly T[], predicate: (element: T, index: number) => boolean): T | undefined {
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }

    export function findLast<T, U extends T>(array: readonly T[], predicate: (element: T, index: number) => element is U): U | undefined;
    export function findLast<T>(array: readonly T[], predicate: (element: T, index: number) => boolean): T | undefined;
    export function findLast<T>(array: readonly T[], predicate: (element: T, index: number) => boolean): T | undefined {
        for (let i = array.length - 1; i >= 0; i--) {
            const value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }

    /** Works like Array.prototype.findIndex, returning `-1` if no element satisfying the predicate is found. */
    export function findIndex<T>(array: readonly T[], predicate: (element: T, index: number) => boolean, startIndex?: number): number {
        for (let i = startIndex || 0; i < array.length; i++) {
            if (predicate(array[i], i)) {
                return i;
            }
        }
        return -1;
    }

    export function findLastIndex<T>(array: readonly T[], predicate: (element: T, index: number) => boolean, startIndex?: number): number {
        for (let i = startIndex === undefined ? array.length - 1 : startIndex; i >= 0; i--) {
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
    export function findMap<T, U>(array: readonly T[], callback: (element: T, index: number) => U | undefined): U {
        for (let i = 0; i < array.length; i++) {
            const result = callback(array[i], i);
            if (result) {
                return result;
            }
        }
        return Debug.fail();
    }

    export function contains<T>(array: readonly T[] | undefined, value: T, equalityComparer: EqualityComparer<T> = equateValues): boolean {
        if (array) {
            for (const v of array) {
                if (equalityComparer(v, value)) {
                    return true;
                }
            }
        }
        return false;
    }

    export function arraysEqual<T>(a: readonly T[], b: readonly T[], equalityComparer: EqualityComparer<T> = equateValues): boolean {
        return a.length === b.length && a.every((x, i) => equalityComparer(x, b[i]));
    }

    export function indexOfAnyCharCode(text: string, charCodes: readonly number[], start?: number): number {
        for (let i = start || 0; i < text.length; i++) {
            if (contains(charCodes, text.charCodeAt(i))) {
                return i;
            }
        }
        return -1;
    }

    export function countWhere<T>(array: readonly T[], predicate: (x: T, i: number) => boolean): number {
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
    export function filter<T, U extends T>(array: readonly T[], f: (x: T) => x is U): readonly U[];
    export function filter<T, U extends T>(array: readonly T[], f: (x: T) => boolean): readonly T[];
    export function filter<T, U extends T>(array: T[] | undefined, f: (x: T) => x is U): U[] | undefined;
    export function filter<T>(array: T[] | undefined, f: (x: T) => boolean): T[] | undefined;
    export function filter<T, U extends T>(array: readonly T[] | undefined, f: (x: T) => x is U): readonly U[] | undefined;
    export function filter<T, U extends T>(array: readonly T[] | undefined, f: (x: T) => boolean): readonly T[] | undefined;
    export function filter<T>(array: readonly T[] | undefined, f: (x: T) => boolean): readonly T[] | undefined {
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

    export function map<T, U>(array: readonly T[], f: (x: T, i: number) => U): U[];
    export function map<T, U>(array: readonly T[] | undefined, f: (x: T, i: number) => U): U[] | undefined;
    export function map<T, U>(array: readonly T[] | undefined, f: (x: T, i: number) => U): U[] | undefined {
        let result: U[] | undefined;
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
                return iterRes.done ? iterRes as { done: true, value: never } : { value: mapFn(iterRes.value), done: false };
            }
        };
    }

    // Maps from T to T and avoids allocation if all elements map to themselves
    export function sameMap<T>(array: T[], f: (x: T, i: number) => T): T[];
    export function sameMap<T>(array: readonly T[], f: (x: T, i: number) => T): readonly T[];
    export function sameMap<T>(array: T[] | undefined, f: (x: T, i: number) => T): T[] | undefined;
    export function sameMap<T>(array: readonly T[] | undefined, f: (x: T, i: number) => T): readonly T[] | undefined;
    export function sameMap<T>(array: readonly T[] | undefined, f: (x: T, i: number) => T): readonly T[] | undefined {
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
    export function flatten<T>(array: T[][] | readonly (T | readonly T[] | undefined)[]): T[] {
        const result = [];
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
        return result;
    }

    /**
     * Maps an array. If the mapped value is an array, it is spread into the result.
     *
     * @param array The array to map.
     * @param mapfn The callback used to map the result into one or more values.
     */
    export function flatMap<T, U>(array: readonly T[] | undefined, mapfn: (x: T, i: number) => U | readonly U[] | undefined): readonly U[] {
        let result: U[] | undefined;
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const v = mapfn(array[i], i);
                if (v) {
                    if (isArray(v)) {
                        result = addRange(result, v);
                    }
                    else {
                        result = append(result, v);
                    }
                }
            }
        }
        return result || emptyArray;
    }

    export function flatMapToMutable<T, U>(array: readonly T[] | undefined, mapfn: (x: T, i: number) => U | readonly U[] | undefined): U[] {
        const result: U[] = [];
        if (array) {
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

    export function flatMapIterator<T, U>(iter: Iterator<T>, mapfn: (x: T) => readonly U[] | Iterator<U> | undefined): Iterator<U> {
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
                        return iterRes as { done: true, value: never };
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
    export function sameFlatMap<T>(array: T[], mapfn: (x: T, i: number) => T | readonly T[]): T[];
    export function sameFlatMap<T>(array: readonly T[], mapfn: (x: T, i: number) => T | readonly T[]): readonly T[];
    export function sameFlatMap<T>(array: T[], mapfn: (x: T, i: number) => T | T[]): T[] {
        let result: T[] | undefined;
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

    export function mapAllOrFail<T, U>(array: readonly T[], mapFn: (x: T, i: number) => U | undefined): U[] | undefined {
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

    export function mapDefined<T, U>(array: readonly T[] | undefined, mapFn: (x: T, i: number) => U | undefined): U[] {
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
                        return res as { done: true, value: never };
                    }
                    const value = mapFn(res.value);
                    if (value !== undefined) {
                        return { value, done: false };
                    }
                }
            }
        };
    }

    export function mapDefinedEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1>, f: (key: K1, value: V1) => readonly [K2, V2] | undefined): Map<K2, V2>;
    export function mapDefinedEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1> | undefined, f: (key: K1, value: V1) => readonly [K2 | undefined, V2 | undefined] | undefined): Map<K2, V2> | undefined;
    export function mapDefinedEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1> | undefined, f: (key: K1, value: V1) => readonly [K2 | undefined, V2 | undefined] | undefined): Map<K2, V2> | undefined {
        if (!map) {
            return undefined;
        }

        const result = new Map<K2, V2>();
        map.forEach((value, key) => {
            const entry = f(key, value);
            if (entry !== undefined) {
                const [newKey, newValue] = entry;
                if (newKey !== undefined && newValue !== undefined) {
                    result.set(newKey, newValue);
                }
            }
        });

        return result;
    }

    export function mapDefinedValues<V1, V2>(set: ReadonlySet<V1>, f: (value: V1) => V2 | undefined): Set<V2>;
    export function mapDefinedValues<V1, V2>(set: ReadonlySet<V1> | undefined, f: (value: V1) => V2 | undefined): Set<V2> | undefined;
    export function mapDefinedValues<V1, V2>(set: ReadonlySet<V1> | undefined, f: (value: V1) => V2 | undefined): Set<V2> | undefined {
        if (set) {
            const result = new Set<V2>();
            set.forEach(value => {
                const newValue = f(value);
                if (newValue !== undefined) {
                    result.add(newValue);
                }
            });
            return result;
        }
    }

    export function getOrUpdate<K, V>(map: Map<K, V>, key: K, callback: () => V) {
        if (map.has(key)) {
            return map.get(key)!;
        }
        const value = callback();
        map.set(key, value);
        return value;
    }

    export function tryAddToSet<T>(set: Set<T>, value: T) {
        if (!set.has(value)) {
            set.add(value);
            return true;
        }
        return false;
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
     * Maps contiguous spans of values with the same key.
     *
     * @param array The array to map.
     * @param keyfn A callback used to select the key for an element.
     * @param mapfn A callback used to map a contiguous chunk of values to a single value.
     */
    export function spanMap<T, K, U>(array: readonly T[], keyfn: (x: T, i: number) => K, mapfn: (chunk: T[], key: K, start: number, end: number) => U): U[];
    export function spanMap<T, K, U>(array: readonly T[] | undefined, keyfn: (x: T, i: number) => K, mapfn: (chunk: T[], key: K, start: number, end: number) => U): U[] | undefined;
    export function spanMap<T, K, U>(array: readonly T[] | undefined, keyfn: (x: T, i: number) => K, mapfn: (chunk: T[], key: K, start: number, end: number) => U): U[] | undefined {
        let result: U[] | undefined;
        if (array) {
            result = [];
            const len = array.length;
            let previousKey: K | undefined;
            let key: K | undefined;
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
                    const v = mapfn(array.slice(start, pos), previousKey!, start, pos);
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

    export function mapEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1>, f: (key: K1, value: V1) => readonly [K2, V2]): Map<K2, V2>;
    export function mapEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1> | undefined, f: (key: K1, value: V1) => readonly [K2, V2]): Map<K2, V2> | undefined;
    export function mapEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1> | undefined, f: (key: K1, value: V1) => readonly [K2, V2]): Map<K2, V2> | undefined {
        if (!map) {
            return undefined;
        }

        const result = new Map<K2, V2>();
        map.forEach((value, key) => {
            const [newKey, newValue] = f(key, value);
            result.set(newKey, newValue);
        });
        return result;
    }

    export function some<T>(array: readonly T[] | undefined): array is readonly T[];
    export function some<T>(array: readonly T[] | undefined, predicate: (value: T) => boolean): boolean;
    export function some<T>(array: readonly T[] | undefined, predicate?: (value: T) => boolean): boolean {
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

    /** Calls the callback with (start, afterEnd) index pairs for each range where 'pred' is true. */
    export function getRangesWhere<T>(arr: readonly T[], pred: (t: T) => boolean, cb: (start: number, afterEnd: number) => void): void {
        let start: number | undefined;
        for (let i = 0; i < arr.length; i++) {
            if (pred(arr[i])) {
                start = start === undefined ? i : start;
            }
            else {
                if (start !== undefined) {
                    cb(start, i);
                    start = undefined;
                }
            }
        }
        if (start !== undefined) cb(start, arr.length);
    }

    export function concatenate<T>(array1: T[], array2: T[]): T[];
    export function concatenate<T>(array1: readonly T[], array2: readonly T[]): readonly T[];
    export function concatenate<T>(array1: T[] | undefined, array2: T[] | undefined): T[];
    export function concatenate<T>(array1: readonly T[] | undefined, array2: readonly T[] | undefined): readonly T[];
    export function concatenate<T>(array1: T[], array2: T[]): T[] {
        if (!some(array2)) return array1;
        if (!some(array1)) return array2;
        return [...array1, ...array2];
    }

    function selectIndex(_: unknown, i: number) {
        return i;
    }

    export function indicesOf(array: readonly unknown[]): number[] {
        return array.map(selectIndex);
    }

    function deduplicateRelational<T>(array: readonly T[], equalityComparer: EqualityComparer<T>, comparer: Comparer<T>) {
        // Perform a stable sort of the array. This ensures the first entry in a list of
        // duplicates remains the first entry in the result.
        const indices = indicesOf(array);
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

    function deduplicateEquality<T>(array: readonly T[], equalityComparer: EqualityComparer<T>) {
        const result: T[] = [];
        for (const item of array) {
            pushIfUnique(result, item, equalityComparer);
        }
        return result;
    }

    /**
     * Deduplicates an unsorted array.
     * @param equalityComparer An `EqualityComparer` used to determine if two values are duplicates.
     * @param comparer An optional `Comparer` used to sort entries before comparison, though the
     * result will remain in the original order in `array`.
     */
    export function deduplicate<T>(array: readonly T[], equalityComparer: EqualityComparer<T>, comparer?: Comparer<T>): T[] {
        return array.length === 0 ? [] :
            array.length === 1 ? array.slice() :
            comparer ? deduplicateRelational(array, equalityComparer, comparer) :
            deduplicateEquality(array, equalityComparer);
    }

    /**
     * Deduplicates an array that has already been sorted.
     */
    function deduplicateSorted<T>(array: SortedReadonlyArray<T>, comparer: EqualityComparer<T> | Comparer<T>): SortedReadonlyArray<T> {
        if (array.length === 0) return emptyArray as any as SortedReadonlyArray<T>;

        let last = array[0];
        const deduplicated: T[] = [last];
        for (let i = 1; i < array.length; i++) {
            const next = array[i];
            switch (comparer(next, last)) {
                // equality comparison
                case true:

                // relational comparison
                // falls through
                case Comparison.EqualTo:
                    continue;

                case Comparison.LessThan:
                    // If `array` is sorted, `next` should **never** be less than `last`.
                    return Debug.fail("Array is unsorted.");
            }

            deduplicated.push(last = next);
        }

        return deduplicated as any as SortedReadonlyArray<T>;
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

    export function sortAndDeduplicate<T>(array: readonly string[]): SortedReadonlyArray<string>;
    export function sortAndDeduplicate<T>(array: readonly T[], comparer: Comparer<T>, equalityComparer?: EqualityComparer<T>): SortedReadonlyArray<T>;
    export function sortAndDeduplicate<T>(array: readonly T[], comparer?: Comparer<T>, equalityComparer?: EqualityComparer<T>): SortedReadonlyArray<T> {
        return deduplicateSorted(sort(array, comparer), equalityComparer || comparer || compareStringsCaseSensitive as any as Comparer<T>);
    }

    export function arrayIsEqualTo<T>(array1: readonly T[] | undefined, array2: readonly T[] | undefined, equalityComparer: (a: T, b: T, index: number) => boolean = equateValues): boolean {
        if (!array1 || !array2) {
            return array1 === array2;
        }

        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (!equalityComparer(array1[i], array2[i], i)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Compacts an array, removing any falsey elements.
     */
    export function compact<T>(array: (T | undefined | null | false | 0 | "")[]): T[];
    export function compact<T>(array: readonly (T | undefined | null | false | 0 | "")[]): readonly T[];
    // ESLint thinks these can be combined with the above - they cannot; they'd produce higher-priority inferences and prevent the falsey types from being stripped
    export function compact<T>(array: T[]): T[]; // eslint-disable-line @typescript-eslint/unified-signatures
    export function compact<T>(array: readonly T[]): readonly T[]; // eslint-disable-line @typescript-eslint/unified-signatures
    export function compact<T>(array: T[]): T[] {
        let result: T[] | undefined;
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

    export function sum<T extends Record<K, number>, K extends string>(array: readonly T[], prop: K): number {
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
    export function append<TArray extends any[] | undefined, TValue extends NonNullable<TArray>[number] | undefined>(to: TArray, value: TValue): [undefined, undefined] extends [TArray, TValue] ? TArray : NonNullable<TArray>[number][];
    export function append<T>(to: T[], value: T | undefined): T[];
    export function append<T>(to: T[] | undefined, value: T): T[];
    export function append<T>(to: T[] | undefined, value: T | undefined): T[] | undefined;
    export function append<T>(to: Push<T>, value: T | undefined): void;
    export function append<T>(to: T[], value: T | undefined): T[] | undefined {
        if (value === undefined) return to;
        if (to === undefined) return [value];
        to.push(value);
        return to;
    }

    /**
     * Combines two arrays, values, or undefineds into the smallest container that can accommodate the resulting set:
     *
     * ```
     * undefined -> undefined -> undefined
     * T -> undefined -> T
     * T -> T -> T[]
     * T[] -> undefined -> T[] (no-op)
     * T[] -> T -> T[]         (append)
     * T[] -> T[] -> T[]       (concatenate)
     * ```
     */
    export function combine<T>(xs: T | readonly T[] | undefined, ys: T | readonly T[] | undefined): T | readonly T[] | undefined;
    export function combine<T>(xs: T | T[] | undefined, ys: T | T[] | undefined): T | T[] | undefined;
    export function combine<T>(xs: T | T[] | undefined, ys: T | T[] | undefined) {
        if (xs === undefined) return ys;
        if (ys === undefined) return xs;
        if (isArray(xs)) return isArray(ys) ? concatenate(xs, ys) : append(xs, ys);
        if (isArray(ys)) return append(ys, xs);
        return [xs, ys];
    }

    /**
     * Gets the actual offset into an array for a relative offset. Negative offsets indicate a
     * position offset from the end of the array.
     */
    function toOffset(array: readonly any[], offset: number) {
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
    export function addRange<T>(to: T[], from: readonly T[] | undefined, start?: number, end?: number): T[];
    export function addRange<T>(to: T[] | undefined, from: readonly T[] | undefined, start?: number, end?: number): T[] | undefined;
    export function addRange<T>(to: T[] | undefined, from: readonly T[] | undefined, start?: number, end?: number): T[] | undefined {
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

    function stableSortIndices<T>(array: readonly T[], indices: number[], comparer: Comparer<T>) {
        // sort indices by value then position
        indices.sort((x, y) => comparer(array[x], array[y]) || compareValues(x, y));
    }

    /**
     * Returns a new sorted array.
     */
    export function sort<T>(array: readonly T[], comparer?: Comparer<T>): SortedReadonlyArray<T> {
        return (array.length === 0 ? array : array.slice().sort(comparer)) as SortedReadonlyArray<T>;
    }

    export function arrayIterator<T>(array: readonly T[]): Iterator<T> {
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

    export function arrayReverseIterator<T>(array: readonly T[]): Iterator<T> {
        let i = array.length;
        return {
            next: () => {
                if (i === 0) {
                    return { value: undefined as never, done: true };
                }
                else {
                    i--;
                    return { value: array[i], done: false };
                }
            }
        };
    }

    /**
     * Stable sort of an array. Elements equal to each other maintain their relative position in the array.
     */
    export function stableSort<T>(array: readonly T[], comparer: Comparer<T>): SortedReadonlyArray<T> {
        const indices = indicesOf(array);
        stableSortIndices(array, indices, comparer);
        return indices.map(i => array[i]) as SortedArray<T> as SortedReadonlyArray<T>;
    }

    export function rangeEquals<T>(array1: readonly T[], array2: readonly T[], pos: number, end: number) {
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
    export function elementAt<T>(array: readonly T[] | undefined, offset: number): T | undefined {
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
    export function firstOrUndefined<T>(array: readonly T[]): T | undefined {
        return array.length === 0 ? undefined : array[0];
    }

    export function first<T>(array: readonly T[]): T {
        Debug.assert(array.length !== 0);
        return array[0];
    }

    /**
     * Returns the last element of an array if non-empty, `undefined` otherwise.
     */
    export function lastOrUndefined<T>(array: readonly T[]): T | undefined {
        return array.length === 0 ? undefined : array[array.length - 1];
    }

    export function last<T>(array: readonly T[]): T {
        Debug.assert(array.length !== 0);
        return array[array.length - 1];
    }

    /**
     * Returns the only element of an array if it contains only one element, `undefined` otherwise.
     */
    export function singleOrUndefined<T>(array: readonly T[] | undefined): T | undefined {
        return array && array.length === 1
            ? array[0]
            : undefined;
    }

    /**
     * Returns the only element of an array if it contains only one element; otherwise, returns the
     * array.
     */
    export function singleOrMany<T>(array: T[]): T | T[];
    export function singleOrMany<T>(array: readonly T[]): T | readonly T[];
    export function singleOrMany<T>(array: T[] | undefined): T | T[] | undefined;
    export function singleOrMany<T>(array: readonly T[] | undefined): T | readonly T[] | undefined;
    export function singleOrMany<T>(array: readonly T[] | undefined): T | readonly T[] | undefined {
        return array && array.length === 1
            ? array[0]
            : array;
    }

    export function replaceElement<T>(array: readonly T[], index: number, value: T): T[] {
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
    export function binarySearch<T, U>(array: readonly T[], value: T, keySelector: (v: T) => U, keyComparer: Comparer<U>, offset?: number): number {
        return binarySearchKey(array, keySelector(value), keySelector, keyComparer, offset);
    }

    /**
     * Performs a binary search, finding the index at which an object with `key` occurs in `array`.
     * If no such index is found, returns the 2's-complement of first index at which
     * `array[index]` exceeds `key`.
     * @param array A sorted array whose first element must be no larger than number
     * @param key The key to be searched for in the array.
     * @param keySelector A callback used to select the search key from each element of `array`.
     * @param keyComparer A callback used to compare two keys in a sorted array.
     * @param offset An offset into `array` at which to start the search.
     */
    export function binarySearchKey<T, U>(array: readonly T[], key: U, keySelector: (v: T) => U, keyComparer: Comparer<U>, offset?: number): number {
        if (!some(array)) {
            return -1;
        }

        let low = offset || 0;
        let high = array.length - 1;
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

    export function reduceLeft<T, U>(array: readonly T[] | undefined, f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
    export function reduceLeft<T>(array: readonly T[], f: (memo: T, value: T, i: number) => T): T | undefined;
    export function reduceLeft<T>(array: T[], f: (memo: T, value: T, i: number) => T, initial?: T, start?: number, count?: number): T | undefined {
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
                    result = initial!;
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

    export function getAllKeys(obj: object): string[] {
        const result: string[] = [];
        do {
            const names = Object.getOwnPropertyNames(obj);
            for (const name of names) {
                pushIfUnique(result, name);
            }
        } while (obj = Object.getPrototypeOf(obj));
        return result;
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

    const _entries = Object.entries ? Object.entries : <T>(obj: MapLike<T>) => {
        const keys = getOwnKeys(obj);
        const result: [string, T][] = Array(keys.length);
        for (const key of keys) {
            result.push([key, obj[key]]);
        }
        return result;
    };

    export function getEntries<T>(obj: MapLike<T>): [string, T][] {
        return obj ? _entries(obj) : [];
    }

    export function arrayOf<T>(count: number, f: (index: number) => T): T[] {
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            result[i] = f(i);
        }
        return result;
    }

    /** Shims `Array.from`. */
    export function arrayFrom<T, U>(iterator: Iterator<T> | IterableIterator<T>, map: (t: T) => U): U[];
    export function arrayFrom<T>(iterator: Iterator<T> | IterableIterator<T>): T[];
    export function arrayFrom<T, U>(iterator: Iterator<T> | IterableIterator<T>, map?: (t: T) => U): (T | U)[] {
        const result: (T | U)[] = [];
        for (let iterResult = iterator.next(); !iterResult.done; iterResult = iterator.next()) {
            result.push(map ? map(iterResult.value) : iterResult.value);
        }
        return result;
    }


    export function assign<T extends object>(t: T, ...args: (T | undefined)[]) {
        for (const arg of args) {
            if (arg === undefined) continue;
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
    export function equalOwnProperties<T>(left: MapLike<T> | undefined, right: MapLike<T> | undefined, equalityComparer: EqualityComparer<T> = equateValues) {
        if (left === right) return true;
        if (!left || !right) return false;
        for (const key in left) {
            if (hasOwnProperty.call(left, key)) {
                if (!hasOwnProperty.call(right, key)) return false;
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
    export function arrayToMap<K, V>(array: readonly V[], makeKey: (value: V) => K | undefined): Map<K, V>;
    export function arrayToMap<K, V1, V2>(array: readonly V1[], makeKey: (value: V1) => K | undefined, makeValue: (value: V1) => V2): Map<K, V2>;
    export function arrayToMap<T>(array: readonly T[], makeKey: (value: T) => string | undefined): Map<string, T>;
    export function arrayToMap<T, U>(array: readonly T[], makeKey: (value: T) => string | undefined, makeValue: (value: T) => U): Map<string, U>;
    export function arrayToMap<K, V1, V2>(array: readonly V1[], makeKey: (value: V1) => K | undefined, makeValue: (value: V1) => V1 | V2 = identity): Map<K, V1 | V2> {
        const result = new Map<K, V1 | V2>();
        for (const value of array) {
            const key = makeKey(value);
            if (key !== undefined) result.set(key, makeValue(value));
        }
        return result;
    }

    export function arrayToNumericMap<T>(array: readonly T[], makeKey: (value: T) => number): T[];
    export function arrayToNumericMap<T, U>(array: readonly T[], makeKey: (value: T) => number, makeValue: (value: T) => U): U[];
    export function arrayToNumericMap<T, U>(array: readonly T[], makeKey: (value: T) => number, makeValue: (value: T) => T | U = identity): (T | U)[] {
        const result: (T | U)[] = [];
        for (const value of array) {
            result[makeKey(value)] = makeValue(value);
        }
        return result;
    }

    export function arrayToMultiMap<K, V>(values: readonly V[], makeKey: (value: V) => K): MultiMap<K, V>;
    export function arrayToMultiMap<K, V, U>(values: readonly V[], makeKey: (value: V) => K, makeValue: (value: V) => U): MultiMap<K, U>;
    export function arrayToMultiMap<K, V, U>(values: readonly V[], makeKey: (value: V) => K, makeValue: (value: V) => V | U = identity): MultiMap<K, V | U> {
        const result = createMultiMap<K, V | U>();
        for (const value of values) {
            result.add(makeKey(value), makeValue(value));
        }
        return result;
    }

    export function group<T, K>(values: readonly T[], getGroupId: (value: T) => K): readonly (readonly T[])[];
    export function group<T, K, R>(values: readonly T[], getGroupId: (value: T) => K, resultSelector: (values: readonly T[]) => R): R[];
    export function group<T>(values: readonly T[], getGroupId: (value: T) => string): readonly (readonly T[])[];
    export function group<T, R>(values: readonly T[], getGroupId: (value: T) => string, resultSelector: (values: readonly T[]) => R): R[];
    export function group<T, K>(values: readonly T[], getGroupId: (value: T) => K, resultSelector: (values: readonly T[]) => readonly T[] = identity): readonly (readonly T[])[] {
        return arrayFrom(arrayToMultiMap(values, getGroupId).values(), resultSelector);
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

    /**
     * Creates a new object by adding the own properties of `second`, then the own properties of `first`.
     *
     * NOTE: This means that if a property exists in both `first` and `second`, the property in `first` will be chosen.
     */
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

    export function copyProperties<T1 extends T2, T2>(first: T1, second: T2) {
        for (const id in second) {
            if (hasOwnProperty.call(second, id)) {
                (first as any)[id] = second[id];
            }
        }
    }

    export function maybeBind<T, A extends any[], R>(obj: T, fn: ((this: T, ...args: A) => R) | undefined): ((...args: A) => R) | undefined {
        return fn ? fn.bind(obj) : undefined;
    }

    export interface MultiMap<K, V> extends Map<K, V[]> {
        /**
         * Adds the value to an array of values associated with the key, and returns the array.
         * Creates the array if it does not already exist.
         */
        add(key: K, value: V): V[];
        /**
         * Removes a value from an array of values associated with the key.
         * Does not preserve the order of those values.
         * Does nothing if `key` is not in `map`, or `value` is not in `map[key]`.
         */
        remove(key: K, value: V): void;
    }

    export function createMultiMap<K, V>(): MultiMap<K, V>;
    export function createMultiMap<V>(): MultiMap<string, V>;
    export function createMultiMap<K, V>(): MultiMap<K, V> {
        const map = new Map<K, V[]>() as MultiMap<K, V>;
        map.add = multiMapAdd;
        map.remove = multiMapRemove;
        return map;
    }
    function multiMapAdd<K, V>(this: MultiMap<K, V>, key: K, value: V) {
        let values = this.get(key);
        if (values) {
            values.push(value);
        }
        else {
            this.set(key, values = [value]);
        }
        return values;
    }
    function multiMapRemove<K, V>(this: MultiMap<K, V>, key: K, value: V) {
        const values = this.get(key);
        if (values) {
            unorderedRemoveItem(values, value);
            if (!values.length) {
                this.delete(key);
            }
        }
    }

    export interface UnderscoreEscapedMultiMap<T> extends UnderscoreEscapedMap<T[]> {
        /**
         * Adds the value to an array of values associated with the key, and returns the array.
         * Creates the array if it does not already exist.
         */
        add(key: __String, value: T): T[];
        /**
         * Removes a value from an array of values associated with the key.
         * Does not preserve the order of those values.
         * Does nothing if `key` is not in `map`, or `value` is not in `map[key]`.
         */
        remove(key: __String, value: T): void;
    }

    export function createUnderscoreEscapedMultiMap<T>(): UnderscoreEscapedMultiMap<T> {
        return createMultiMap() as UnderscoreEscapedMultiMap<T>;
    }

    /**
     * Tests whether a value is an array.
     */
    export function isArray(value: any): value is readonly {}[] {
        return Array.isArray ? Array.isArray(value) : value instanceof Array;
    }

    export function toArray<T>(value: T | T[]): T[];
    export function toArray<T>(value: T | readonly T[]): readonly T[];
    export function toArray<T>(value: T | T[]): T[] {
        return isArray(value) ? value : [value];
    }

    /**
     * Tests whether a value is string
     */
    export function isString(text: unknown): text is string {
        return typeof text === "string";
    }
    export function isNumber(x: unknown): x is number {
        return typeof x === "number";
    }

    export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined;
    export function tryCast<T>(value: T, test: (value: T) => boolean): T | undefined;
    export function tryCast<T>(value: T, test: (value: T) => boolean): T | undefined {
        return value !== undefined && test(value) ? value : undefined;
    }

    export function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut {
        if (value !== undefined && test(value)) return value;

        return Debug.fail(`Invalid cast. The supplied value ${value} did not pass the test '${Debug.getFunctionName(test)}'.`);
    }

    /** Does nothing. */
    export function noop(_?: {} | null | undefined): void { }

    /** Do nothing and return false */
    export function returnFalse(): false { return false; }

    /** Do nothing and return true */
    export function returnTrue(): true { return true; }

    /** Do nothing and return undefined */
    export function returnUndefined(): undefined { return undefined; }

    /** Returns its argument. */
    export function identity<T>(x: T) { return x; }

    /** Returns lower case string */
    export function toLowerCase(x: string) { return x.toLowerCase(); }

    // We convert the file names to lower case as key for file name on case insensitive file system
    // While doing so we need to handle special characters (eg \u0130) to ensure that we dont convert
    // it to lower case, fileName with its lowercase form can exist along side it.
    // Handle special characters and make those case sensitive instead
    //
    // |-#--|-Unicode--|-Char code-|-Desc-------------------------------------------------------------------|
    // | 1. | i        | 105       | Ascii i                                                                |
    // | 2. | I        | 73        | Ascii I                                                                |
    // |-------- Special characters ------------------------------------------------------------------------|
    // | 3. | \u0130   | 304       | Uppper case I with dot above                                           |
    // | 4. | i,\u0307 | 105,775   | i, followed by 775: Lower case of (3rd item)                           |
    // | 5. | I,\u0307 | 73,775    | I, followed by 775: Upper case of (4th item), lower case is (4th item) |
    // | 6. | \u0131   | 305       | Lower case i without dot, upper case is I (2nd item)                   |
    // | 7. | \u00DF   | 223       | Lower case sharp s                                                     |
    //
    // Because item 3 is special where in its lowercase character has its own
    // upper case form we cant convert its case.
    // Rest special characters are either already in lower case format or
    // they have corresponding upper case character so they dont need special handling
    //
    // But to avoid having to do string building for most common cases, also ignore
    // a-z, 0-9, \u0131, \u00DF, \, /, ., : and space
    const fileNameLowerCaseRegExp = /[^\u0130\u0131\u00DFa-z0-9\\/:\-_\. ]+/g;
    /**
     * Case insensitive file systems have descripencies in how they handle some characters (eg. turkish Upper case I with dot on top - \u0130)
     * This function is used in places where we want to make file name as a key on these systems
     * It is possible on mac to be able to refer to file name with I with dot on top as a fileName with its lower case form
     * But on windows we cannot. Windows can have fileName with I with dot on top next to its lower case and they can not each be referred with the lowercase forms
     * Technically we would want this function to be platform sepcific as well but
     * our api has till now only taken caseSensitive as the only input and just for some characters we dont want to update API and ensure all customers use those api
     * We could use upper case and we would still need to deal with the descripencies but
     * we want to continue using lower case since in most cases filenames are lowercasewe and wont need any case changes and avoid having to store another string for the key
     * So for this function purpose, we go ahead and assume character I with dot on top it as case sensitive since its very unlikely to use lower case form of that special character
     */
    export function toFileNameLowerCase(x: string) {
        return fileNameLowerCaseRegExp.test(x) ?
            x.replace(fileNameLowerCaseRegExp, toLowerCase) :
            x;
    }

    /** Throws an error because a function is not implemented. */
    export function notImplemented(): never {
        throw new Error("Not implemented");
    }

    export function memoize<T>(callback: () => T): () => T {
        let value: T;
        return () => {
            if (callback) {
                value = callback();
                callback = undefined!;
            }
            return value;
        };
    }

    /** A version of `memoize` that supports a single primitive argument */
    export function memoizeOne<A extends string | number | boolean | undefined, T>(callback: (arg: A) => T): (arg: A) => T {
        const map = new Map<string, T>();
        return (arg: A) => {
            const key = `${typeof arg}:${arg}`;
            let value = map.get(key);
            if (value === undefined && !map.has(key)) {
                value = callback(arg);
                map.set(key, value);
            }
            return value!;
        };
    }

    /**
     * High-order function, composes functions. Note that functions are composed inside-out;
     * for example, `compose(a, b)` is the equivalent of `x => b(a(x))`.
     *
     * @param args The functions to compose.
     */
    export function compose<T>(...args: ((t: T) => T)[]): (t: T) => T;
    export function compose<T>(a: (t: T) => T, b: (t: T) => T, c: (t: T) => T, d: (t: T) => T, e: (t: T) => T): (t: T) => T {
        if (!!e) {
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
    export type AnyConstructor = new (...args: unknown[]) => unknown;

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

    function compareComparableValues(a: string | undefined, b: string | undefined): Comparison;
    function compareComparableValues(a: number | undefined, b: number | undefined): Comparison;
    function compareComparableValues(a: string | number | undefined, b: string | number | undefined) {
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
    export function compareValues(a: number | undefined, b: number | undefined): Comparison {
        return compareComparableValues(a, b);
    }

    /**
     * Compare two TextSpans, first by `start`, then by `length`.
     */
    export function compareTextSpans(a: Partial<TextSpan> | undefined, b: Partial<TextSpan> | undefined): Comparison {
        return compareValues(a?.start, b?.start) || compareValues(a?.length, b?.length);
    }

    export function min<T>(a: T, b: T, compare: Comparer<T>): T {
        return compare(a, b) === Comparison.LessThan ? a : b;
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
    export function compareStringsCaseSensitive(a: string | undefined, b: string | undefined): Comparison {
        return compareComparableValues(a, b);
    }

    export function getStringComparer(ignoreCase?: boolean) {
        return ignoreCase ? compareStringsCaseInsensitive : compareStringsCaseSensitive;
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
            // lowercase (such as `Ã¡ÂºÅ¾` (German sharp capital s)).
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

    export function setUILocale(value: string | undefined) {
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

    export function compareProperties<T, K extends keyof T>(a: T | undefined, b: T | undefined, key: K, comparer: Comparer<T[K]>): Comparison {
        return a === b ? Comparison.EqualTo :
            a === undefined ? Comparison.LessThan :
            b === undefined ? Comparison.GreaterThan :
            comparer(a[key], b[key]);
    }

    /** True is greater than false. */
    export function compareBooleans(a: boolean, b: boolean): Comparison {
        return compareValues(a ? 1 : 0, b ? 1 : 0);
    }

    /**
     * Given a name and a list of names that are *not* equal to the name, return a spelling suggestion if there is one that is close enough.
     * Names less than length 3 only check for case-insensitive equality, not Levenshtein distance.
     *
     * If there is a candidate that's the same except for case, return that.
     * If there is a candidate that's within one edit of the name, return that.
     * Otherwise, return the candidate with the smallest Levenshtein distance,
     *    except for candidates:
     *      * With no name
     *      * Whose length differs from the target name by more than 0.34 of the length of the name.
     *      * Whose levenshtein distance is more than 0.4 of the length of the name
     *        (0.4 allows 1 substitution/transposition for every 5 characters,
     *         and 1 insertion/deletion at 3 characters)
     */
    export function getSpellingSuggestion<T>(name: string, candidates: T[], getName: (candidate: T) => string | undefined): T | undefined {
        const maximumLengthDifference = Math.min(2, Math.floor(name.length * 0.34));
        let bestDistance = Math.floor(name.length * 0.4) + 1; // If the best result isn't better than this, don't bother.
        let bestCandidate: T | undefined;
        let justCheckExactMatches = false;
        const nameLowerCase = name.toLowerCase();
        for (const candidate of candidates) {
            const candidateName = getName(candidate);
            if (candidateName !== undefined && Math.abs(candidateName.length - nameLowerCase.length) <= maximumLengthDifference) {
                const candidateNameLowerCase = candidateName.toLowerCase();
                if (candidateNameLowerCase === nameLowerCase) {
                    if (candidateName === name) {
                        continue;
                    }
                    return candidate;
                }
                if (justCheckExactMatches) {
                    continue;
                }
                if (candidateName.length < 3) {
                    // Don't bother, user would have noticed a 2-character name having an extra character
                    continue;
                }
                // Only care about a result better than the best so far.
                const distance = levenshteinWithMax(nameLowerCase, candidateNameLowerCase, bestDistance - 1);
                if (distance === undefined) {
                    continue;
                }
                if (distance < 3) {
                    justCheckExactMatches = true;
                    bestCandidate = candidate;
                }
                else {
                    Debug.assert(distance < bestDistance); // Else `levenshteinWithMax` should return undefined
                    bestDistance = distance;
                    bestCandidate = candidate;
                }
            }
        }
        return bestCandidate;
    }

    function levenshteinWithMax(s1: string, s2: string, max: number): number | undefined {
        let previous = new Array(s2.length + 1);
        let current = new Array(s2.length + 1);
        /** Represents any value > max. We don't care about the particular value. */
        const big = max + 1;

        for (let i = 0; i <= s2.length; i++) {
            previous[i] = i;
        }

        for (let i = 1; i <= s1.length; i++) {
            const c1 = s1.charCodeAt(i - 1);
            const minJ = i > max ? i - max : 1;
            const maxJ = s2.length > max + i ? max + i : s2.length;
            current[0] = i;
            /** Smallest value of the matrix in the ith column. */
            let colMin = i;
            for (let j = 1; j < minJ; j++) {
                current[j] = big;
            }
            for (let j = minJ; j <= maxJ; j++) {
                const dist = c1 === s2.charCodeAt(j - 1)
                    ? previous[j - 1]
                    : Math.min(/*delete*/ previous[j] + 1, /*insert*/ current[j - 1] + 1, /*substitute*/ previous[j - 1] + 2);
                current[j] = dist;
                colMin = Math.min(colMin, dist);
            }
            for (let j = maxJ + 1; j <= s2.length; j++) {
                current[j] = big;
            }
            if (colMin > max) {
                // Give up -- everything in this column is > max and it can't get better in future columns.
                return undefined;
            }

            const temp = previous;
            previous = current;
            current = temp;
        }

        const res = previous[s2.length];
        return res > max ? undefined : res;
    }

    export function endsWith(str: string, suffix: string): boolean {
        const expectedPos = str.length - suffix.length;
        return expectedPos >= 0 && str.indexOf(suffix, expectedPos) === expectedPos;
    }

    export function removeSuffix(str: string, suffix: string): string {
        return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : str;
    }

    export function tryRemoveSuffix(str: string, suffix: string): string | undefined {
        return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : undefined;
    }

    export function stringContains(str: string, substring: string): boolean {
        return str.indexOf(substring) !== -1;
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
    export function unorderedRemoveItem<T>(array: T[], item: T) {
        return unorderedRemoveFirstItemWhere(array, element => element === item);
    }

    /** Remove the *first* element satisfying `predicate`. */
    function unorderedRemoveFirstItemWhere<T>(array: T[], predicate: (element: T) => boolean) {
        for (let i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                unorderedRemoveItemAt(array, i);
                return true;
            }
        }
        return false;
    }

    export type GetCanonicalFileName = (fileName: string) => string;
    export function createGetCanonicalFileName(useCaseSensitiveFileNames: boolean): GetCanonicalFileName {
        return useCaseSensitiveFileNames ? identity : toFileNameLowerCase;
    }

    /** Represents a "prefix*suffix" pattern. */
    export interface Pattern {
        prefix: string;
        suffix: string;
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
    export function findBestPatternMatch<T>(values: readonly T[], getPattern: (value: T) => Pattern, candidate: string): T | undefined {
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

    export function startsWith(str: string, prefix: string): boolean {
        return str.lastIndexOf(prefix, 0) === 0;
    }

    export function removePrefix(str: string, prefix: string): string {
        return startsWith(str, prefix) ? str.substr(prefix.length) : str;
    }

    export function tryRemovePrefix(str: string, prefix: string, getCanonicalFileName: GetCanonicalFileName = identity): string | undefined {
        return startsWith(getCanonicalFileName(str), getCanonicalFileName(prefix)) ? str.substring(prefix.length) : undefined;
    }

    function isPatternMatch({ prefix, suffix }: Pattern, candidate: string) {
        return candidate.length >= prefix.length + suffix.length &&
            startsWith(candidate, prefix) &&
            endsWith(candidate, suffix);
    }

    export function and<T>(f: (arg: T) => boolean, g: (arg: T) => boolean) {
        return (arg: T) => f(arg) && g(arg);
    }

    export function or<T extends unknown[]>(...fs: ((...args: T) => boolean)[]): (...args: T) => boolean {
        return (...args) => {
            for (const f of fs) {
                if (f(...args)) {
                    return true;
                }
            }
            return false;
        };
    }

    export function not<T extends unknown[]>(fn: (...args: T) => boolean): (...args: T) => boolean {
        return (...args) => !fn(...args);
    }

    export function assertType<T>(_: T): void { }

    export function singleElementArray<T>(t: T | undefined): T[] | undefined {
        return t === undefined ? undefined : [t];
    }

    export function enumerateInsertsAndDeletes<T, U>(newItems: readonly T[], oldItems: readonly U[], comparer: (a: T, b: U) => Comparison, inserted: (newItem: T) => void, deleted: (oldItem: U) => void, unchanged?: (oldItem: U, newItem: T) => void) {
        unchanged = unchanged || noop;
        let newIndex = 0;
        let oldIndex = 0;
        const newLen = newItems.length;
        const oldLen = oldItems.length;
        let hasChanges = false;
        while (newIndex < newLen && oldIndex < oldLen) {
            const newItem = newItems[newIndex];
            const oldItem = oldItems[oldIndex];
            const compareResult = comparer(newItem, oldItem);
            if (compareResult === Comparison.LessThan) {
                inserted(newItem);
                newIndex++;
                hasChanges = true;
            }
            else if (compareResult === Comparison.GreaterThan) {
                deleted(oldItem);
                oldIndex++;
                hasChanges = true;
            }
            else {
                unchanged(oldItem, newItem);
                newIndex++;
                oldIndex++;
            }
        }
        while (newIndex < newLen) {
            inserted(newItems[newIndex++]);
            hasChanges = true;
        }
        while (oldIndex < oldLen) {
            deleted(oldItems[oldIndex++]);
            hasChanges = true;
        }
        return hasChanges;
    }

    export function fill<T>(length: number, cb: (index: number) => T): T[] {
        const result = Array<T>(length);
        for (let i = 0; i < length; i++) {
            result[i] = cb(i);
        }
        return result;
    }

    export function cartesianProduct<T>(arrays: readonly T[][]) {
        const result: T[][] = [];
        cartesianProductWorker(arrays, result, /*outer*/ undefined, 0);
        return result;
    }

    function cartesianProductWorker<T>(arrays: readonly (readonly T[])[], result: (readonly T[])[], outer: readonly T[] | undefined, index: number) {
        for (const element of arrays[index]) {
            let inner: T[];
            if (outer) {
                inner = outer.slice();
                inner.push(element);
            }
            else {
                inner = [element];
            }
            if (index === arrays.length - 1) {
                result.push(inner);
            }
            else {
                cartesianProductWorker(arrays, result, inner, index + 1);
            }
        }
    }

    export function padLeft(s: string, length: number) {
        while (s.length < length) {
            s = " " + s;
        }
        return s;
    }

    export function padRight(s: string, length: number) {
        while (s.length < length) {
            s = s + " ";
        }

        return s;
    }
}
