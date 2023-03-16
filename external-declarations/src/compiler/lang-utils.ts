import { MapLike, SortedArray, SortedReadonlyArray } from "typescript";


export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K] };


/** @internal */
export type EqualityComparer<T> = (a: T, b: T) => boolean;

/** @internal */
export type Comparer<T> = (a: T, b: T) => Comparison;

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



/** @internal */
export function concatenate<T>(array1: T[], array2: T[]): T[];
/** @internal */
export function concatenate<T>(array1: readonly T[], array2: readonly T[]): readonly T[];
/** @internal */
export function concatenate<T>(array1: T[] | undefined, array2: T[] | undefined): T[];
/** @internal */
export function concatenate<T>(array1: readonly T[] | undefined, array2: readonly T[] | undefined): readonly T[];
/** @internal */
export function concatenate<T>(array1: undefined | readonly T[], array2: undefined | readonly T[]): undefined | T[] | readonly T[] {
    if (!some(array2)) return array1;
    if (!some(array1)) return array2;
    return [...array1, ...array2];
}


/** @internal */
export function some<T>(array: readonly T[] | undefined): array is readonly T[];
/** @internal */
export function some<T>(array: readonly T[] | undefined, predicate: (value: T) => boolean): boolean;
/** @internal */
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


/** @internal */
export function stringContains(str: string, substring: string): boolean {
    return str.indexOf(substring) !== -1;
}


/**
 * Filters an array by a predicate function. Returns the same array instance if the predicate is
 * true for all elements, otherwise returns a new array instance containing the filtered subset.
 *
 * @internal
 */
 export function filter<T, U extends T>(array: T[], f: (x: T) => x is U): U[];
 /** @internal */
 export function filter<T>(array: T[], f: (x: T) => boolean): T[];
 /** @internal */
 export function filter<T, U extends T>(array: readonly T[], f: (x: T) => x is U): readonly U[];
 /** @internal */
 export function filter<T, U extends T>(array: readonly T[], f: (x: T) => boolean): readonly T[];
 /** @internal */
 export function filter<T, U extends T>(array: T[] | undefined, f: (x: T) => x is U): U[] | undefined;
 /** @internal */
 export function filter<T>(array: T[] | undefined, f: (x: T) => boolean): T[] | undefined;
 /** @internal */
 export function filter<T, U extends T>(array: readonly T[] | undefined, f: (x: T) => x is U): readonly U[] | undefined;
 /** @internal */
 export function filter<T, U extends T>(array: readonly T[] | undefined, f: (x: T) => boolean): readonly T[] | undefined;
 /** @internal */
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

 /**
 * @return Whether the value was added.
 *
 * @internal
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

/** @internal */
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


/** @internal */
export const enum Comparison {
    LessThan    = -1,
    EqualTo     = 0,
    GreaterThan = 1
}
export function equateValues<T>(a: T, b: T) {
    return a === b;
}

/** @internal */
export function length(array: readonly any[] | undefined): number {
    return array ? array.length : 0;
}

    
/**
 * Flattens an array containing a mix of array or non-array elements.
 *
 * @param array The array to flatten.
 *
 * @internal
 */
 export function flatten<T>(array: T[][] | readonly (T | readonly T[] | undefined)[]): T[] {
    const result: T[] = [];
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
 * Tests whether a value is an array.
 *
 * @internal
 */
 export function isArray(value: any): value is readonly unknown[] {
    return Array.isArray ? Array.isArray(value) : value instanceof Array;
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
 *
 * @internal
 */
 export function addRange<T>(to: T[], from: readonly T[] | undefined, start?: number, end?: number): T[];
 /** @internal */
 export function addRange<T>(to: T[] | undefined, from: readonly T[] | undefined, start?: number, end?: number): T[] | undefined;
 /** @internal */
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
 * Gets the actual offset into an array for a relative offset. Negative offsets indicate a
 * position offset from the end of the array.
 */
function toOffset(array: readonly any[], offset: number) {
    return offset < 0 ? array.length + offset : offset;
}


/** @internal */
export function map<T, U>(array: readonly T[], f: (x: T, i: number) => U): U[];
/** @internal */
export function map<T, U>(array: readonly T[] | undefined, f: (x: T, i: number) => U): U[] | undefined;
/** @internal */
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

 

/**
 * Compacts an array, removing any falsey elements.
 *
 * @internal
 */
 export function compact<T>(array: (T | undefined | null | false | 0 | "")[]): T[];
 /** @internal */
 export function compact<T>(array: readonly (T | undefined | null | false | 0 | "")[]): readonly T[];
 // ESLint thinks these can be combined with the above - they cannot; they'd produce higher-priority inferences and prevent the falsey types from being stripped
 /** @internal */
 export function compact<T>(array: T[]): T[]; // eslint-disable-line @typescript-eslint/unified-signatures
 /** @internal */
 export function compact<T>(array: readonly T[]): readonly T[]; // eslint-disable-line @typescript-eslint/unified-signatures
 /** @internal */
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
 * Maps an array. If the mapped value is an array, it is spread into the result.
 *
 * @param array The array to map.
 * @param mapfn The callback used to map the result into one or more values.
 *
 * @internal
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

/** @internal */
export const emptyArray: never[] = [] as never[];



/**
 * Appends a value to an array, returning the array.
 *
 * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
 * is created if `value` was appended.
 * @param value The value to append to the array. If `value` is `undefined`, nothing is
 * appended.
 *
 * @internal
 */
 export function append<TArray extends any[] | undefined, TValue extends NonNullable<TArray>[number] | undefined>(to: TArray, value: TValue): [undefined, undefined] extends [TArray, TValue] ? TArray : NonNullable<TArray>[number][];
 /** @internal */
 export function append<T>(to: T[], value: T | undefined): T[];
 /** @internal */
 export function append<T>(to: T[] | undefined, value: T): T[];
 /** @internal */
 export function append<T>(to: T[] | undefined, value: T | undefined): T[] | undefined;
 /** @internal */
 export function append<T>(to: Push<T>, value: T | undefined): void;
 /** @internal */
 export function append<T>(to: T[], value: T | undefined): T[] | undefined {
     if (value === undefined) return to;
     if (to === undefined) return [value];
     to.push(value);
     return to;
 }
 
/** Array that is only intended to be pushed to, never read. */
export interface Push<T> {
    push(...values: T[]): void;
    /** @internal */ readonly length: number;
}


/**
 * Stable sort of an array. Elements equal to each other maintain their relative position in the array.
 *
 * @internal
 */
 export function stableSort<T>(array: readonly T[], comparer: Comparer<T>): SortedReadonlyArray<T> {
    const indices = indicesOf(array);
    stableSortIndices(array, indices, comparer);
    return indices.map(i => array[i]) as SortedArray<T> as SortedReadonlyArray<T>;
}
function selectIndex(_: unknown, i: number) {
    return i;
}

function stableSortIndices<T>(array: readonly T[], indices: number[], comparer: Comparer<T>) {
    // sort indices by value then position
    indices.sort((x, y) => comparer(array[x], array[y]) || compareValues(x, y));
}

/**
 * Works like Array.prototype.find, returning `undefined` if no element satisfying the predicate is found.
 *
 * @internal
 */
 export function find<T, U extends T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => element is U, startIndex?: number): U | undefined;
 /** @internal */
 export function find<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): T | undefined;
 /** @internal */
 export function find<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): T | undefined {
     if (array === undefined) return undefined;
     for (let i = startIndex ?? 0; i < array.length; i++) {
         const value = array[i];
         if (predicate(value, i)) {
             return value;
         }
     }
     return undefined;
 }
 

/**
 * Returns the last element of an array if non-empty, `undefined` otherwise.
 *
 * @internal
 */
 export function lastOrUndefined<T>(array: readonly T[] | undefined): T | undefined {
    return array === undefined || array.length === 0 ? undefined : array[array.length - 1];
}

/** @internal */
export function last<T>(array: readonly T[]): T {
    return array[array.length - 1];
}

/** @internal */
export function indicesOf(array: readonly unknown[]): number[] {
    return array.map(selectIndex);
}

/** @internal */
export function findLastIndex<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): number {
    if (array === undefined) return -1;
    for (let i = startIndex ?? array.length - 1; i >= 0; i--) {
        if (predicate(array[i], i)) {
            return i;
        }
    }
    return -1;
}

/**
 * Compare the equality of two strings using a case-sensitive ordinal comparison.
 *
 * Case-sensitive comparisons compare both strings one code-point at a time using the integer
 * value of each code-point after applying `toUpperCase` to each string. We always map both
 * strings to their upper-case form as some unicode characters do not properly round-trip to
 * lowercase (such as `ẞ` (German sharp capital s)).
 *
 * @internal
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
 *
 * @internal
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
 *
 * @internal
 */
export function compareValues(a: number | undefined, b: number | undefined): Comparison {
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
 *
 * @internal
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
 *
 * @internal
 */
 export function compareStringsCaseSensitive(a: string | undefined, b: string | undefined): Comparison {
    return compareComparableValues(a, b);
}

/** @internal */
export function getStringComparer(ignoreCase?: boolean) {
    return ignoreCase ? compareStringsCaseInsensitive : compareStringsCaseSensitive;
}


/**
 * Iterates through `array` by index and performs the callback on each element of array until the callback
 * returns a falsey value, then returns false.
 * If no such value is found, the callback is applied to each element of array and `true` is returned.
 *
 * @internal
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


/** @internal */
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


/**
 * Shims `Array.from`.
 *
 * @internal
 */
 export function arrayFrom<T, U>(iterator: Iterator<T> | IterableIterator<T>, map: (t: T) => U): U[];
 /** @internal */
 export function arrayFrom<T>(iterator: Iterator<T> | IterableIterator<T>): T[];
 /** @internal */
 export function arrayFrom<T, U>(iterator: Iterator<T> | IterableIterator<T>, map?: (t: T) => U): (T | U)[] {
     const result: (T | U)[] = [];
     for (let iterResult = iterator.next(); !iterResult.done; iterResult = iterator.next()) {
         result.push(map ? map(iterResult.value) : iterResult.value);
     }
     return result;
 }
 
 /** @internal */
export function startsWith(str: string, prefix: string): boolean {
    return str.lastIndexOf(prefix, 0) === 0;
}


/** @internal */
export function endsWith(str: string, suffix: string): boolean {
    const expectedPos = str.length - suffix.length;
    return expectedPos >= 0 && str.indexOf(suffix, expectedPos) === expectedPos;
}

/** @internal */
export function removeSuffix(str: string, suffix: string): string {
    return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : str;
}

/** @internal */
export function tryRemoveSuffix(str: string, suffix: string): string | undefined {
    return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : undefined;
}


/**
 * Returns lower case string
 *
 * @internal
 */
 export function toLowerCase(x: string) {
    return x.toLowerCase();
}


/**
 * Returns its argument.
 *
 * @internal
 */
 export function identity<T>(x: T) {
    return x;
}


/**
 * Remove an item from an array, moving everything to its right one space left.
 *
 * @internal
 */
 export function orderedRemoveItem<T>(array: T[], item: T): boolean {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            orderedRemoveItemAt(array, i);
            return true;
        }
    }
    return false;
}


/**
 * Remove an item by index from an array, moving everything to its right one space left.
 *
 * @internal
 */
 export function orderedRemoveItemAt<T>(array: T[], index: number): void {
    // This seems to be faster than either `array.splice(i, 1)` or `array.copyWithin(i, i+ 1)`.
    for (let i = index; i < array.length - 1; i++) {
        array[i] = array[i + 1];
    }
    array.pop();
}

export function getEntries<T>(obj: MapLike<T>): [string, T][] {
    return obj ? _entries(obj) : [];
}

const _entries = Object.entries || (<T>(obj: MapLike<T>) => {
    const keys = getOwnKeys(obj);
    const result: [string, T][] = Array(keys.length);
    for (let i = 0; i < keys.length; i++) {
        result[i] = [keys[i], obj[keys[i]]];
    }
    return result;
});

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Gets the owned, enumerable property keys of a map-like.
 *
 * @internal
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

/** @internal */
export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined;
/** @internal */
export function tryCast<T>(value: T, test: (value: T) => boolean): T | undefined;
/** @internal */
export function tryCast<T>(value: T, test: (value: T) => boolean): T | undefined {
    return value !== undefined && test(value) ? value : undefined;
}


/**
 * Like `forEach`, but suitable for use with numbers and strings (which may be falsy).
 *
 * @internal
 */
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

/**
 * True is greater than false.
 *
 * @internal
 */
 export function compareBooleans(a: boolean, b: boolean): Comparison {
    return compareValues(a ? 1 : 0, b ? 1 : 0);
}

/**
 * Tests whether a value is string
 *
 * @internal
 */
 export function isString(text: unknown): text is string {
    return typeof text === "string";
}
/** @internal */
export function isNumber(x: unknown): x is number {
    return typeof x === "number";
}


/**
 * patternOrStrings contains both patterns (containing "*") and regular strings.
 * Return an exact match if possible, or a pattern match, or undefined.
 * (These are verified by verifyCompilerOptions to have 0 or 1 "*" characters.)
 *
 * @internal
 */
 export function matchPatternOrExact(patternOrStrings: readonly (string | Pattern)[], candidate: string): string | Pattern | undefined {
    const patterns: Pattern[] = [];
    for (const patternOrString of patternOrStrings) {
        if (patternOrString === candidate) {
            return candidate;
        }

        if (!isString(patternOrString)) {
            patterns.push(patternOrString);
        }
    }

    return findBestPatternMatch(patterns, _ => _, candidate);
}

/**
 * Represents a "prefix*suffix" pattern.
 *
 * @internal
 */
 export interface Pattern {
    prefix: string;
    suffix: string;
}


/**
 * Return the object corresponding to the best pattern to match `candidate`.
 *
 * @internal
 */
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

/** @internal */
export function isPatternMatch({ prefix, suffix }: Pattern, candidate: string) {
    return candidate.length >= prefix.length + suffix.length &&
        startsWith(candidate, prefix) &&
        endsWith(candidate, suffix);
}

/** @internal */
export function tryParsePatterns(paths: MapLike<string[]>): (string | Pattern)[] {
    return mapDefined(getOwnKeys(paths), path => tryParsePattern(path));
}
/**
 * Returns the input if there are no stars, a pattern if there is exactly one,
 * and undefined if there are more.
 *
 * @internal
 */
export function tryParsePattern(pattern: string): string | Pattern | undefined {
    const indexOfStar = pattern.indexOf("*");
    if (indexOfStar === -1) {
        return pattern;
    }
    return pattern.indexOf("*", indexOfStar + 1) !== -1
        ? undefined
        : {
            prefix: pattern.substr(0, indexOfStar),
            suffix: pattern.substr(indexOfStar + 1)
        };
}


/** @internal */
export function min<T>(items: readonly [T, ...T[]], compare: Comparer<T>): T;
/** @internal */
export function min<T>(items: readonly T[], compare: Comparer<T>): T | undefined;
/** @internal */
export function min<T>(items: readonly T[], compare: Comparer<T>): T | undefined {
    return reduceLeft(items, (x, y) => compare(x, y) === Comparison.LessThan ? x : y);
}

/** @internal */
export function reduceLeft<T, U>(array: readonly T[] | undefined, f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
/** @internal */
export function reduceLeft<T>(array: readonly T[], f: (memo: T, value: T, i: number) => T): T | undefined;
/** @internal */
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

export const trimString = (s: string) => s.trim();

/**
 * Unlike `pushIfUnique`, this can take `undefined` as an input, and returns a new array.
 *
 * @internal
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

export function isNullOrUndefined(x: any): x is null | undefined {
    return x === undefined || x === null; // eslint-disable-line no-null/no-null
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
 *
 * @internal
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
 *
 * @internal
 */
export function binarySearchKey<T, U>(array: readonly T[], key: U, keySelector: (v: T, i: number) => U, keyComparer: Comparer<U>, offset?: number): number {
    if (!some(array)) {
        return -1;
    }

    let low = offset || 0;
    let high = array.length - 1;
    while (low <= high) {
        const middle = low + ((high - low) >> 1);
        const midKey = keySelector(array[middle], middle);
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


/**
 * Works like Array.prototype.findIndex, returning `-1` if no element satisfying the predicate is found.
 *
 * @internal
 */
 export function findIndex<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): number {
    if (array === undefined) return -1;
    for (let i = startIndex ?? 0; i < array.length; i++) {
        if (predicate(array[i], i)) {
            return i;
        }
    }
    return -1;
}


/** @internal */
export function clone<T>(object: T): T {
    const result: any = {};
    for (const id in object) {
        if (hasOwnProperty.call(object, id)) {
            result[id] = (object as any)[id];
        }
    }
    return result;
}