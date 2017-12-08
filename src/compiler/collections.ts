/// <reference path="types.ts" />

/* @internal */
namespace ts {
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

    export const emptyArray: never[] = [] as never[];
    export const emptyMap: ReadonlyMap<never> = createMap<never>();

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

    export function indexOf<T>(array: ReadonlyArray<T>, value: T): number {
        if (array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
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
        return { next };
        function next(): { value: U, done: false } | { value: never, done: true } {
            const iterRes = iter.next();
            return iterRes.done ? iterRes : { value: mapFn(iterRes.value), done: false };
        }
    }

    // Maps from T to T and avoids allocation if all elements map to themselves
    export function sameMap<T>(array: T[], f: (x: T, i: number) => T): T[];
    export function sameMap<T>(array: ReadonlyArray<T>, f: (x: T, i: number) => T): ReadonlyArray<T>;
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

    export function mapDefined<T, U>(array: ReadonlyArray<T> | undefined, mapFn: (x: T, i: number) => U | undefined): U[] {
        const result: U[] = [];
        if (array) {
            for (let i = 0; i < array.length; i++) {
                const item = array[i];
                const mapped = mapFn(item, i);
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
            // Note: we need the following type assertion because of GH #17069
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
    export function arrayToMap<T, U>(array: ReadonlyArray<T>, makeKey: (value: T) => string, makeValue?: (value: T) => U): Map<T | U> {
        const result = createMap<T | U>();
        for (const value of array) {
            result.set(makeKey(value), makeValue ? makeValue(value) : value);
        }
        return result;
    }

    export function arrayToNumericMap<T>(array: ReadonlyArray<T>, makeKey: (value: T) => number): T[];
    export function arrayToNumericMap<T, V>(array: ReadonlyArray<T>, makeKey: (value: T) => number, makeValue: (value: T) => V): V[];
    export function arrayToNumericMap<T, V>(array: ReadonlyArray<T>, makeKey: (value: T) => number, makeValue?: (value: T) => V): V[] {
        const result: V[] = [];
        for (const value of array) {
            result[makeKey(value)] = makeValue ? makeValue(value) : value as any as V;
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

    export function cloneMap<T>(map: UnderscoreEscapedMap<T>): UnderscoreEscapedMap<T>;
    export function cloneMap<T>(map: ReadonlyMap<T>): Map<T>;
    export function cloneMap<T>(map: ReadonlyMap<T> | UnderscoreEscapedMap<T>): Map<T> | UnderscoreEscapedMap<T> {
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

    export function toArray<T>(value: T | ReadonlyArray<T>): ReadonlyArray<T>;
    export function toArray<T>(value: T | T[]): T[];
    export function toArray<T>(value: T | T[]): T[] {
        return isArray(value) ? value : [value];
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
}
