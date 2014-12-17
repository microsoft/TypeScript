/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/// <reference path="lib.core.d.ts" />

/////////////////////////////
/// IE10 ECMAScript Extensions
/////////////////////////////

/**
  * Represents a raw buffer of binary data, which is used to store data for the 
  * different typed arrays. ArrayBuffers cannot be read from or written to directly, 
  * but can be passed to a typed array or DataView Object to interpret the raw 
  * buffer as needed. 
  */
interface ArrayBuffer {
    /**
      * Read-only. The length of the ArrayBuffer (in bytes).
      */
    byteLength: number;

    /**
      * Returns a section of an ArrayBuffer.
      */
    slice(begin:number, end?:number): ArrayBuffer;
}

declare var ArrayBuffer: {
    prototype: ArrayBuffer;
    new (byteLength: number): ArrayBuffer;
}

interface ArrayBufferView {
    buffer: ArrayBuffer;
    byteOffset: number;
    byteLength: number;
}

/**
  * A typed array of 8-bit integer values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Int8Array extends ArrayBufferView {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The length of the array.
      */
    length: number;

    [index: number]: number;

    /**
      * Gets the element at the specified index.
      * @param index The index at which to get the element of the array.
      */
    get(index: number): number;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Int8Array, offset?: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: number[], offset?: number): void;

    /**
      * Gets a new Int8Array view of the ArrayBuffer store for this array, referencing the elements at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int8Array;
}
declare var Int8Array: {
    prototype: Int8Array;
    new (length: number): Int8Array;
    new (array: Int8Array): Int8Array;
    new (array: number[]): Int8Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int8Array;
    BYTES_PER_ELEMENT: number;
}

/**
  * A typed array of 8-bit unsigned integer values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Uint8Array extends ArrayBufferView {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The length of the array.
      */
    length: number;
    [index: number]: number;

    /**
      * Gets the element at the specified index.
      * @param index The index at which to get the element of the array.
      */
    get(index: number): number;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Uint8Array, offset?: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: number[], offset?: number): void;

    /**
      * Gets a new Uint8Array view of the ArrayBuffer Object store for this array, specifying the first and last members of the subarray. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint8Array;
}
declare var Uint8Array: {
    prototype: Uint8Array;
    new (length: number): Uint8Array;
    new (array: Uint8Array): Uint8Array;
    new (array: number[]): Uint8Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint8Array;
    BYTES_PER_ELEMENT: number;
}

/**
  * A typed array of 16-bit integer values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Int16Array extends ArrayBufferView {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The length of the array.
      */
    length: number;
    [index: number]: number;

    /**
      * Gets the element at the specified index.
      * @param index The index at which to get the element of the array.
      */
    get(index: number): number;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Int16Array, offset?: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: number[], offset?: number): void;

    /**
      * Gets a new Int16Array view of the ArrayBuffer Object store for this array, specifying the first and last members of the subarray. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int16Array;
}
declare var Int16Array: {
    prototype: Int16Array;
    new (length: number): Int16Array;
    new (array: Int16Array): Int16Array;
    new (array: number[]): Int16Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int16Array;
    BYTES_PER_ELEMENT: number;
}

/**
  * A typed array of 16-bit unsigned integer values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Uint16Array extends ArrayBufferView {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The length of the array.
      */
    length: number;
    [index: number]: number;

    /**
      * Gets the element at the specified index.
      * @param index The index at which to get the element of the array.
      */
    get(index: number): number;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Uint16Array, offset?: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: number[], offset?: number): void;

    /**
      * Gets a new Uint16Array view of the ArrayBuffer Object store for this array, specifying the first and last members of the subarray.
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint16Array;
}
declare var Uint16Array: {
    prototype: Uint16Array;
    new (length: number): Uint16Array;
    new (array: Uint16Array): Uint16Array;
    new (array: number[]): Uint16Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint16Array;
    BYTES_PER_ELEMENT: number;
}

/**
  * A typed array of 32-bit integer values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Int32Array extends ArrayBufferView {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The length of the array.
      */
    length: number;
    [index: number]: number;

    /**
      * Gets the element at the specified index.
      * @param index The index at which to get the element of the array.
      */
    get(index: number): number;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Int32Array, offset?: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: number[], offset?: number): void;

    /**
      * Gets a new Int32Array view of the ArrayBuffer Object store for this array, specifying the first and last members of the subarray. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int32Array;
}
declare var Int32Array: {
    prototype: Int32Array;
    new (length: number): Int32Array;
    new (array: Int32Array): Int32Array;
    new (array: number[]): Int32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int32Array;
    BYTES_PER_ELEMENT: number;
}

/**
  * A typed array of 32-bit unsigned integer values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Uint32Array extends ArrayBufferView {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The length of the array.
      */
    length: number;
    [index: number]: number;

    /**
      * Gets the element at the specified index.
      * @param index The index at which to get the element of the array.
      */
    get(index: number): number;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Uint32Array, offset?: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: number[], offset?: number): void;

    /**
      * Gets a new Int8Array view of the ArrayBuffer Object store for this array, specifying the first and last members of the subarray. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint32Array;
}
declare var Uint32Array: {
    prototype: Uint32Array;
    new (length: number): Uint32Array;
    new (array: Uint32Array): Uint32Array;
    new (array: number[]): Uint32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint32Array;
    BYTES_PER_ELEMENT: number;
}

/**
  * A typed array of 32-bit float values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Float32Array extends ArrayBufferView {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The length of the array.
      */
    length: number;
    [index: number]: number;

    /**
      * Gets the element at the specified index.
      * @param index The index at which to get the element of the array.
      */
    get(index: number): number;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Float32Array, offset?: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: number[], offset?: number): void;

    /**
      * Gets a new Float32Array view of the ArrayBuffer Object store for this array, specifying the first and last members of the subarray. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Float32Array;
}
declare var Float32Array: {
    prototype: Float32Array;
    new (length: number): Float32Array;
    new (array: Float32Array): Float32Array;
    new (array: number[]): Float32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Float32Array;
    BYTES_PER_ELEMENT: number;
}

/**
  * A typed array of 64-bit float values. The contents are initialized to 0. If the requested number of bytes could not be allocated an exception is raised.
  */
interface Float64Array extends ArrayBufferView {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The length of the array.
      */
    length: number;
    [index: number]: number;

    /**
      * Gets the element at the specified index.
      * @param index The index at which to get the element of the array.
      */
    get(index: number): number;

    /**
      * Sets a value or an array of values.
      * @param index The index of the location to set.
      * @param value The value to set.
      */
    set(index: number, value: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: Float64Array, offset?: number): void;

    /**
      * Sets a value or an array of values.
      * @param array A typed or untyped array of values to set.
      * @param offset The index in the current array at which the values are to be written.
      */
    set(array: number[], offset?: number): void;

    /**
      * Gets a new Float64Array view of the ArrayBuffer Object store for this array, specifying the first and last members of the subarray. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Float64Array;
}
declare var Float64Array: {
    prototype: Float64Array;
    new (length: number): Float64Array;
    new (array: Float64Array): Float64Array;
    new (array: number[]): Float64Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Float64Array;
    BYTES_PER_ELEMENT: number;
}

/**
  * You can use a DataView object to read and write the different kinds of binary data to any location in the ArrayBuffer. 
  */
interface DataView extends ArrayBufferView {
    /**
      * Gets the Int8 value at the specified byte offset from the start of the view. There is no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt8(byteOffset: number): number;

    /**
      * Gets the Uint8 value at the specified byte offset from the start of the view. There is no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint8(byteOffset: number): number;

    /**
      * Gets the Int16 value at the specified byte offset from the start of the view. There is no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt16(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Uint16 value at the specified byte offset from the start of the view. There is no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint16(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Int32 value at the specified byte offset from the start of the view. There is no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Uint32 value at the specified byte offset from the start of the view. There is no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Float32 value at the specified byte offset from the start of the view. There is no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getFloat32(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Gets the Float64 value at the specified byte offset from the start of the view. There is no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getFloat64(byteOffset: number, littleEndian?: boolean): number;

    /**
      * Stores an Int8 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      */
    setInt8(byteOffset: number, value: number): void;

    /**
      * Stores an Uint8 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      */
    setUint8(byteOffset: number, value: number): void;

    /**
      * Stores an Int16 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, otherwise a little-endian value should be written.
      */
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Uint16 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, otherwise a little-endian value should be written.
      */
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Int32 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, otherwise a little-endian value should be written.
      */
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Uint32 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, otherwise a little-endian value should be written.
      */
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Float32 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, otherwise a little-endian value should be written.
      */
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
      * Stores an Float64 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, otherwise a little-endian value should be written.
      */
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;
}
declare var DataView: {
    prototype: DataView;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): DataView;
}

/////////////////////////////
/// IE11 ECMAScript Extensions
/////////////////////////////

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): Map<K, V>;
    size: number;
}
declare var Map: {
    new <K, V>(): Map<K, V>;
    prototype: Map<any, any>;
}

interface WeakMap<K, V> {
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): WeakMap<K, V>;
}
declare var WeakMap: {
    new <K, V>(): WeakMap<K, V>;
    prototype: WeakMap<any, any>;
}

interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    size: number;
}
declare var Set: {
    new <T>(): Set<T>;
    prototype: Set<any>;
}
/////////////////////////////
/// ECMAScript Internationalization API 
/////////////////////////////

declare module Intl {
    interface CollatorOptions {
        usage?: string;
        localeMatcher?: string;
        numeric?: boolean;
        caseFirst?: string;
        sensitivity?: string;
        ignorePunctuation?: boolean;
    }

    interface ResolvedCollatorOptions {
        locale: string;
        usage: string;
        sensitivity: string;
        ignorePunctuation: boolean;
        collation: string;
        caseFirst: string;
        numeric: boolean;
    }

    interface Collator {
        compare(x: string, y: string): number;
        resolvedOptions(): ResolvedCollatorOptions;
    }
    var Collator: {
        new (locales?: string[], options?: CollatorOptions): Collator;
        new (locale?: string, options?: CollatorOptions): Collator;
        (locales?: string[], options?: CollatorOptions): Collator;
        (locale?: string, options?: CollatorOptions): Collator;
        supportedLocalesOf(locales: string[], options?: CollatorOptions): string[];
        supportedLocalesOf(locale: string, options?: CollatorOptions): string[];
    }

    interface NumberFormatOptions {
        localeMatcher?: string;
        style?: string;
        currency?: string;
        currencyDisplay?: string;
        useGrouping?: boolean;
    }

    interface ResolvedNumberFormatOptions {
        locale: string;
        numberingSystem: string;
        style: string;
        currency?: string;
        currencyDisplay?: string;
        minimumintegerDigits: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
        useGrouping: boolean;
    }

    interface NumberFormat {
        format(value: number): string;
        resolvedOptions(): ResolvedNumberFormatOptions;
    }
    var NumberFormat: {
        new (locales?: string[], options?: NumberFormatOptions): Collator;
        new (locale?: string, options?: NumberFormatOptions): Collator;
        (locales?: string[], options?: NumberFormatOptions): Collator;
        (locale?: string, options?: NumberFormatOptions): Collator;
        supportedLocalesOf(locales: string[], options?: NumberFormatOptions): string[];
        supportedLocalesOf(locale: string, options?: NumberFormatOptions): string[];
    }

    interface DateTimeFormatOptions {
        localeMatcher?: string;
        weekday?: string;
        era?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
        timeZoneName?: string;
        formatMatcher?: string;
        hour12: boolean;
    }

    interface ResolvedDateTimeFormatOptions {
        locale: string;
        calendar: string;
        numberingSystem: string;
        timeZone: string;
        hour12?: boolean;
        weekday?: string;
        era?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
        timeZoneName?: string;
    }

    interface DateTimeFormat {
        format(date: number): string;
        resolvedOptions(): ResolvedDateTimeFormatOptions;
    }
    var DateTimeFormat: {
        new (locales?: string[], options?: DateTimeFormatOptions): Collator;
        new (locale?: string, options?: DateTimeFormatOptions): Collator;
        (locales?: string[], options?: DateTimeFormatOptions): Collator;
        (locale?: string, options?: DateTimeFormatOptions): Collator;
        supportedLocalesOf(locales: string[], options?: DateTimeFormatOptions): string[];
        supportedLocalesOf(locale: string, options?: DateTimeFormatOptions): string[];
    }
}

interface String {
    /**
      * Determines whether two strings are equivalent in the current locale.
      * @param that String to compare to target string
      * @param locales An array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
      * @param options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.
      */
    localeCompare(that: string, locales: string[], options?: Intl.CollatorOptions): number;

    /**
      * Determines whether two strings are equivalent in the current locale.
      * @param that String to compare to target string
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
      * @param options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.
      */
    localeCompare(that: string, locale: string, options?: Intl.CollatorOptions): number;
}

interface Number {
    /**
      * Converts a number to a string by using the current or specified locale. 
      * @param locales An array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locales?: string[], options?: Intl.NumberFormatOptions): string;

    /**
      * Converts a number to a string by using the current or specified locale. 
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locale?: string, options?: Intl.NumberFormatOptions): string;
}

interface Date {
    /**
      * Converts a date to a string by using the current or specified locale.  
      * @param locales An array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locales?: string[], options?: Intl.DateTimeFormatOptions): string;

    /**
      * Converts a date to a string by using the current or specified locale.  
      * @param locale Locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used.
      * @param options An object that contains one or more properties that specify comparison options.
      */
    toLocaleString(locale?: string, options?: Intl.DateTimeFormatOptions): string;
}

/////////////////////////////
/// IE Worker APIs
/////////////////////////////


interface Console {
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    profile(reportName?: string): void;
    assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
    msIsIndependentlyComposed(element: any): boolean;
    clear(): void;
    dir(value?: any, ...optionalParams: any[]): void;
    profileEnd(): void;
    count(countTitle?: string): void;
    groupEnd(): void;
    time(timerName?: string): void;
    timeEnd(timerName?: string): void;
    trace(): void;
    group(groupTitle?: string): void;
    dirxml(value: any): void;
    debug(message?: string, ...optionalParams: any[]): void;
    groupCollapsed(groupTitle?: string): void;
    select(element: any): void;
}
declare var Console: {
    prototype: Console;
    new(): Console;
}

interface NavigatorID {
    appVersion: string;
    appName: string;
    userAgent: string;
    platform: string;
    product: string;
    vendor: string;
}

interface EventTarget {
    removeEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
    dispatchEvent(evt: Event): boolean;
}

interface MessageEvent extends Event {
    source: any;
    origin: string;
    data: any;
    ports: any;
    initMessageEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, dataArg: any, originArg: string, lastEventIdArg: string, sourceArg: any): void;
}
declare var MessageEvent: {
    prototype: MessageEvent;
    new(): MessageEvent;
}

interface XMLHttpRequest extends EventTarget {
    responseBody: any;
    status: number;
    readyState: number;
    responseText: string;
    responseXML: any;
    ontimeout: (ev: Event) => any;
    statusText: string;
    onreadystatechange: (ev: Event) => any;
    timeout: number;
    onload: (ev: Event) => any;
    response: any;
    withCredentials: boolean;
    onprogress: (ev: ProgressEvent) => any;
    onabort: (ev: any) => any;
    responseType: string;
    onloadend: (ev: ProgressEvent) => any;
    upload: XMLHttpRequestEventTarget;
    onerror: (ev: ErrorEvent) => any;
    onloadstart: (ev: Event) => any;
    msCaching: string;
    open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
    send(data?: any): void;
    abort(): void;
    getAllResponseHeaders(): string;
    setRequestHeader(header: string, value: string): void;
    getResponseHeader(header: string): string;
    msCachingEnabled(): boolean;
    overrideMimeType(mime: string): void;
    LOADING: number;
    DONE: number;
    UNSENT: number;
    OPENED: number;
    HEADERS_RECEIVED: number;
    addEventListener(type: "timeout", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "readystatechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: any) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var XMLHttpRequest: {
    prototype: XMLHttpRequest;
    new(): XMLHttpRequest;
    LOADING: number;
    DONE: number;
    UNSENT: number;
    OPENED: number;
    HEADERS_RECEIVED: number;
    create(): XMLHttpRequest;
}

interface EventListener {
    (evt: Event): void;
}

interface EventException {
    code: number;
    message: string;
    name: string;
    toString(): string;
    DISPATCH_REQUEST_ERR: number;
    UNSPECIFIED_EVENT_TYPE_ERR: number;
}
declare var EventException: {
    prototype: EventException;
    new(): EventException;
    DISPATCH_REQUEST_ERR: number;
    UNSPECIFIED_EVENT_TYPE_ERR: number;
}

interface NavigatorOnLine {
    onLine: boolean;
}

interface Event {
    timeStamp: number;
    defaultPrevented: boolean;
    isTrusted: boolean;
    currentTarget: EventTarget;
    cancelBubble: boolean;
    target: EventTarget;
    eventPhase: number;
    cancelable: boolean;
    type: string;
    srcElement: any;
    bubbles: boolean;
    initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
    preventDefault(): void;
    CAPTURING_PHASE: number;
    AT_TARGET: number;
    BUBBLING_PHASE: number;
}
declare var Event: {
    prototype: Event;
    new(): Event;
    CAPTURING_PHASE: number;
    AT_TARGET: number;
    BUBBLING_PHASE: number;
}

interface ImageData {
    width: number;
    data: number[];
    height: number;
}
declare var ImageData: {
    prototype: ImageData;
    new(): ImageData;
}

interface DOMException {
    code: number;
    message: string;
    name: string;
    toString(): string;
    HIERARCHY_REQUEST_ERR: number;
    NO_MODIFICATION_ALLOWED_ERR: number;
    INVALID_MODIFICATION_ERR: number;
    NAMESPACE_ERR: number;
    INVALID_CHARACTER_ERR: number;
    TYPE_MISMATCH_ERR: number;
    ABORT_ERR: number;
    INVALID_STATE_ERR: number;
    SECURITY_ERR: number;
    NETWORK_ERR: number;
    WRONG_DOCUMENT_ERR: number;
    QUOTA_EXCEEDED_ERR: number;
    INDEX_SIZE_ERR: number;
    DOMSTRING_SIZE_ERR: number;
    SYNTAX_ERR: number;
    SERIALIZE_ERR: number;
    VALIDATION_ERR: number;
    NOT_FOUND_ERR: number;
    URL_MISMATCH_ERR: number;
    PARSE_ERR: number;
    NO_DATA_ALLOWED_ERR: number;
    NOT_SUPPORTED_ERR: number;
    INVALID_ACCESS_ERR: number;
    INUSE_ATTRIBUTE_ERR: number;
    INVALID_NODE_TYPE_ERR: number;
    DATA_CLONE_ERR: number;
    TIMEOUT_ERR: number;
}
declare var DOMException: {
    prototype: DOMException;
    new(): DOMException;
    HIERARCHY_REQUEST_ERR: number;
    NO_MODIFICATION_ALLOWED_ERR: number;
    INVALID_MODIFICATION_ERR: number;
    NAMESPACE_ERR: number;
    INVALID_CHARACTER_ERR: number;
    TYPE_MISMATCH_ERR: number;
    ABORT_ERR: number;
    INVALID_STATE_ERR: number;
    SECURITY_ERR: number;
    NETWORK_ERR: number;
    WRONG_DOCUMENT_ERR: number;
    QUOTA_EXCEEDED_ERR: number;
    INDEX_SIZE_ERR: number;
    DOMSTRING_SIZE_ERR: number;
    SYNTAX_ERR: number;
    SERIALIZE_ERR: number;
    VALIDATION_ERR: number;
    NOT_FOUND_ERR: number;
    URL_MISMATCH_ERR: number;
    PARSE_ERR: number;
    NO_DATA_ALLOWED_ERR: number;
    NOT_SUPPORTED_ERR: number;
    INVALID_ACCESS_ERR: number;
    INUSE_ATTRIBUTE_ERR: number;
    INVALID_NODE_TYPE_ERR: number;
    DATA_CLONE_ERR: number;
    TIMEOUT_ERR: number;
}

interface ErrorEvent extends Event {
    colno: number;
    filename: string;
    error: any;
    lineno: number;
    message: string;
    initErrorEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, messageArg: string, filenameArg: string, linenoArg: number): void;
}
declare var ErrorEvent: {
    prototype: ErrorEvent;
    new(): ErrorEvent;
}

interface MSStreamReader extends MSBaseReader {
    error: DOMError;
    readAsArrayBuffer(stream: MSStream, size?: number): void;
    readAsBlob(stream: MSStream, size?: number): void;
    readAsDataURL(stream: MSStream, size?: number): void;
    readAsText(stream: MSStream, encoding?: string, size?: number): void;
}
declare var MSStreamReader: {
    prototype: MSStreamReader;
    new(): MSStreamReader;
}

interface MessageChannel {
    port2: MessagePort;
    port1: MessagePort;
}
declare var MessageChannel: {
    prototype: MessageChannel;
    new(): MessageChannel;
}

interface DOMError {
    name: string;
    toString(): string;
}
declare var DOMError: {
    prototype: DOMError;
    new(): DOMError;
}

interface CloseEvent extends Event {
    wasClean: boolean;
    reason: string;
    code: number;
    initCloseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, wasCleanArg: boolean, codeArg: number, reasonArg: string): void;
}
declare var CloseEvent: {
    prototype: CloseEvent;
    new(): CloseEvent;
}

interface WebSocket extends EventTarget {
    protocol: string;
    readyState: number;
    bufferedAmount: number;
    onopen: (ev: Event) => any;
    extensions: string;
    onmessage: (ev: MessageEvent) => any;
    onclose: (ev: CloseEvent) => any;
    onerror: (ev: ErrorEvent) => any;
    binaryType: string;
    url: string;
    close(code?: number, reason?: string): void;
    send(data: any): void;
    OPEN: number;
    CLOSING: number;
    CONNECTING: number;
    CLOSED: number;
    addEventListener(type: "open", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "close", listener: (ev: CloseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var WebSocket: {
    prototype: WebSocket;
    new(url: string, protocols?: string): WebSocket;
    new(url: string, protocols?: string[]): WebSocket;
    OPEN: number;
    CLOSING: number;
    CONNECTING: number;
    CLOSED: number;
}

interface ProgressEvent extends Event {
    loaded: number;
    lengthComputable: boolean;
    total: number;
    initProgressEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, lengthComputableArg: boolean, loadedArg: number, totalArg: number): void;
}
declare var ProgressEvent: {
    prototype: ProgressEvent;
    new(): ProgressEvent;
}

interface IDBObjectStore {
    indexNames: DOMStringList;
    name: string;
    transaction: IDBTransaction;
    keyPath: string;
    count(key?: any): IDBRequest;
    add(value: any, key?: any): IDBRequest;
    clear(): IDBRequest;
    createIndex(name: string, keyPath: string, optionalParameters?: any): IDBIndex;
    put(value: any, key?: any): IDBRequest;
    openCursor(range?: any, direction?: string): IDBRequest;
    deleteIndex(indexName: string): void;
    index(name: string): IDBIndex;
    get(key: any): IDBRequest;
    delete(key: any): IDBRequest;
}
declare var IDBObjectStore: {
    prototype: IDBObjectStore;
    new(): IDBObjectStore;
}

interface IDBVersionChangeEvent extends Event {
    newVersion: number;
    oldVersion: number;
}
declare var IDBVersionChangeEvent: {
    prototype: IDBVersionChangeEvent;
    new(): IDBVersionChangeEvent;
}

interface IDBIndex {
    unique: boolean;
    name: string;
    keyPath: string;
    objectStore: IDBObjectStore;
    count(key?: any): IDBRequest;
    getKey(key: any): IDBRequest;
    openKeyCursor(range?: IDBKeyRange, direction?: string): IDBRequest;
    get(key: any): IDBRequest;
    openCursor(range?: IDBKeyRange, direction?: string): IDBRequest;
}
declare var IDBIndex: {
    prototype: IDBIndex;
    new(): IDBIndex;
}

interface FileList {
    length: number;
    item(index: number): File;
    [index: number]: File;
}
declare var FileList: {
    prototype: FileList;
    new(): FileList;
}

interface IDBCursor {
    source: any;
    direction: string;
    key: any;
    primaryKey: any;
    advance(count: number): void;
    delete(): IDBRequest;
    continue(key?: any): void;
    update(value: any): IDBRequest;
    PREV: string;
    PREV_NO_DUPLICATE: string;
    NEXT: string;
    NEXT_NO_DUPLICATE: string;
}
declare var IDBCursor: {
    prototype: IDBCursor;
    new(): IDBCursor;
    PREV: string;
    PREV_NO_DUPLICATE: string;
    NEXT: string;
    NEXT_NO_DUPLICATE: string;
}

interface File extends Blob {
    lastModifiedDate: any;
    name: string;
}
declare var File: {
    prototype: File;
    new(): File;
}

interface IDBCursorWithValue extends IDBCursor {
    value: any;
}
declare var IDBCursorWithValue: {
    prototype: IDBCursorWithValue;
    new(): IDBCursorWithValue;
}

interface XMLHttpRequestEventTarget extends EventTarget {
    onprogress: (ev: ProgressEvent) => any;
    onerror: (ev: ErrorEvent) => any;
    onload: (ev: Event) => any;
    ontimeout: (ev: Event) => any;
    onabort: (ev: any) => any;
    onloadstart: (ev: Event) => any;
    onloadend: (ev: ProgressEvent) => any;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeout", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: any) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var XMLHttpRequestEventTarget: {
    prototype: XMLHttpRequestEventTarget;
    new(): XMLHttpRequestEventTarget;
}

interface MSBaseReader extends EventTarget {
    onprogress: (ev: ProgressEvent) => any;
    readyState: number;
    onabort: (ev: any) => any;
    onloadend: (ev: ProgressEvent) => any;
    onerror: (ev: ErrorEvent) => any;
    onload: (ev: Event) => any;
    onloadstart: (ev: Event) => any;
    result: any;
    abort(): void;
    LOADING: number;
    EMPTY: number;
    DONE: number;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: any) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}

interface IDBKeyRange {
    upper: any;
    upperOpen: boolean;
    lower: any;
    lowerOpen: boolean;
}
declare var IDBKeyRange: {
    prototype: IDBKeyRange;
    new(): IDBKeyRange;
    bound(lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean): IDBKeyRange;
    only(value: any): IDBKeyRange;
    lowerBound(bound: any, open?: boolean): IDBKeyRange;
    upperBound(bound: any, open?: boolean): IDBKeyRange;
}

interface WindowConsole {
    console: Console;
}

interface IDBTransaction extends EventTarget {
    oncomplete: (ev: Event) => any;
    db: IDBDatabase;
    mode: string;
    error: DOMError;
    onerror: (ev: ErrorEvent) => any;
    onabort: (ev: any) => any;
    abort(): void;
    objectStore(name: string): IDBObjectStore;
    READ_ONLY: string;
    VERSION_CHANGE: string;
    READ_WRITE: string;
    addEventListener(type: "complete", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: any) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var IDBTransaction: {
    prototype: IDBTransaction;
    new(): IDBTransaction;
    READ_ONLY: string;
    VERSION_CHANGE: string;
    READ_WRITE: string;
}

interface WindowBase64 {
    btoa(rawString: string): string;
    atob(encodedString: string): string;
}

interface IDBDatabase extends EventTarget {
    version: string;
    name: string;
    objectStoreNames: DOMStringList;
    onerror: (ev: ErrorEvent) => any;
    onabort: (ev: any) => any;
    createObjectStore(name: string, optionalParameters?: any): IDBObjectStore;
    close(): void;
    transaction(storeNames: any, mode?: string): IDBTransaction;
    deleteObjectStore(name: string): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: any) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var IDBDatabase: {
    prototype: IDBDatabase;
    new(): IDBDatabase;
}

interface DOMStringList {
    length: number;
    contains(str: string): boolean;
    item(index: number): string;
    [index: number]: string;
}
declare var DOMStringList: {
    prototype: DOMStringList;
    new(): DOMStringList;
}

interface IDBOpenDBRequest extends IDBRequest {
    onupgradeneeded: (ev: IDBVersionChangeEvent) => any;
    onblocked: (ev: Event) => any;
    addEventListener(type: "success", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "upgradeneeded", listener: (ev: IDBVersionChangeEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blocked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var IDBOpenDBRequest: {
    prototype: IDBOpenDBRequest;
    new(): IDBOpenDBRequest;
}

interface MSUnsafeFunctionCallback {
    (): any;
}

interface IDBRequest extends EventTarget {
    source: any;
    onsuccess: (ev: Event) => any;
    error: DOMError;
    transaction: IDBTransaction;
    onerror: (ev: ErrorEvent) => any;
    readyState: string;
    result: any;
    addEventListener(type: "success", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var IDBRequest: {
    prototype: IDBRequest;
    new(): IDBRequest;
}

interface MessagePort extends EventTarget {
    onmessage: (ev: MessageEvent) => any;
    close(): void;
    postMessage(message?: any, ports?: any): void;
    start(): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var MessagePort: {
    prototype: MessagePort;
    new(): MessagePort;
}

interface FileReader extends MSBaseReader {
    error: DOMError;
    readAsArrayBuffer(blob: Blob): void;
    readAsDataURL(blob: Blob): void;
    readAsText(blob: Blob, encoding?: string): void;
}
declare var FileReader: {
    prototype: FileReader;
    new(): FileReader;
}

interface BlobPropertyBag {
    type?: string;
    endings?: string;
}

interface Blob {
    type: string;
    size: number;
    msDetachStream(): any;
    slice(start?: number, end?: number, contentType?: string): Blob;
    msClose(): void;
}
declare var Blob: {
    prototype: Blob;
    new (blobParts?: any[], options?: BlobPropertyBag): Blob;
}

interface MSStream {
    type: string;
    msDetachStream(): any;
    msClose(): void;
}
declare var MSStream: {
    prototype: MSStream;
    new(): MSStream;
}

interface MSBlobBuilder {
    append(data: any, endings?: string): void;
    getBlob(contentType?: string): Blob;
}
declare var MSBlobBuilder: {
    prototype: MSBlobBuilder;
    new(): MSBlobBuilder;
}

interface IDBFactory {
    open(name: string, version?: number): IDBOpenDBRequest;
    cmp(first: any, second: any): number;
    deleteDatabase(name: string): IDBOpenDBRequest;
}
declare var IDBFactory: {
    prototype: IDBFactory;
    new(): IDBFactory;
}

interface AbstractWorker extends EventTarget {
    onerror: (ev: ErrorEvent) => any;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}

interface MSApp {
    createFileFromStorageFile(storageFile: any): File;
    createBlobFromRandomAccessStream(type: string, seeker: any): Blob;
    createStreamFromInputStream(type: string, inputStream: any): MSStream;
    terminateApp(exceptionObject: any): void;
    createDataPackage(object: any): any;
    execUnsafeLocalFunction(unsafeFunction: MSUnsafeFunctionCallback): any;
    getHtmlPrintDocumentSource(htmlDoc: any): any;
    addPublicLocalApplicationUri(uri: string): void;
    createDataPackageFromSelection(): any;
    getViewOpener(): MSAppView;
    suppressSubdownloadCredentialPrompts(suppress: boolean): void;
    execAsyncAtPriority(asynchronousCallback: MSExecAtPriorityFunctionCallback, priority: string, ...args: any[]): void;
    isTaskScheduledAtPriorityOrHigher(priority: string): boolean;
    execAtPriority(synchronousCallback: MSExecAtPriorityFunctionCallback, priority: string, ...args: any[]): any;
    createNewView(uri: string): MSAppView;
    getCurrentPriority(): string;
    NORMAL: string;
    HIGH: string;
    IDLE: string;
    CURRENT: string;
}
declare var MSApp: MSApp;

interface Worker extends AbstractWorker {
    onmessage: (ev: MessageEvent) => any;
    postMessage(message: any, ports?: any): void;
    terminate(): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
}
declare var Worker: {
    prototype: Worker;
    new(stringUrl: string): Worker;
}

interface MSExecAtPriorityFunctionCallback {
    (...args: any[]): any;
}

interface MSAppView {
    viewId: number;
    close(): void;
    postMessage(message: any, targetOrigin: string, ports?: any): void;
}
declare var MSAppView: {
    prototype: MSAppView;
    new(): MSAppView;
}

interface WorkerLocation {
    hash: string;
    protocol: string;
    search: string;
    href: string;
    hostname: string;
    port: string;
    pathname: string;
    host: string;
    toString(): string;
}
declare var WorkerLocation: {
    prototype: WorkerLocation;
    new(): WorkerLocation;
}

interface FileReaderSync {
    readAsArrayBuffer(blob: Blob): any;
    readAsDataURL(blob: Blob): string;
    readAsText(blob: Blob, encoding?: string): string;
}
declare var FileReaderSync: {
    prototype: FileReaderSync;
    new(): FileReaderSync;
}

interface WorkerGlobalScope extends EventTarget, DedicatedWorkerGlobalScope, WindowConsole, WorkerUtils {
    location: WorkerLocation;
    self: WorkerGlobalScope;
    onerror: (ev: ErrorEvent) => any;
    msWriteProfilerMark(profilerMarkName: string): void;
    close(): void;
    toString(): string;
}
declare var WorkerGlobalScope: {
    prototype: WorkerGlobalScope;
    new(): WorkerGlobalScope;
}

interface DedicatedWorkerGlobalScope {
    onmessage: (ev: MessageEvent) => any;
    postMessage(data: any): void;
}

interface WorkerNavigator extends NavigatorID, NavigatorOnLine {
}
declare var WorkerNavigator: {
    prototype: WorkerNavigator;
    new(): WorkerNavigator;
}

interface WorkerUtils extends WindowBase64 {
    navigator: WorkerNavigator;
    msIndexedDB: IDBFactory;
    indexedDB: IDBFactory;
    clearImmediate(handle: number): void;
    importScripts(...urls: string[]): void;
    clearTimeout(handle: number): void;
    setImmediate(handler: any, ...args: any[]): number;
    setTimeout(handler: any, timeout?: any, ...args: any[]): number;
    clearInterval(handle: number): void;
    setInterval(handler: any, timeout?: any, ...args: any[]): number;
}


declare var location: WorkerLocation;
declare var self: WorkerGlobalScope;
declare var onerror: (ev: ErrorEvent) => any;
declare function msWriteProfilerMark(profilerMarkName: string): void;
declare function close(): void;
declare function toString(): string;
declare function removeEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
declare function addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
declare function dispatchEvent(evt: Event): boolean;
declare var onmessage: (ev: MessageEvent) => any;
declare function postMessage(data: any): void;
declare var console: Console;
declare var navigator: WorkerNavigator;
declare var msIndexedDB: IDBFactory;
declare var indexedDB: IDBFactory;
declare function clearImmediate(handle: number): void;
declare function importScripts(...urls: string[]): void;
declare function clearTimeout(handle: number): void;
declare function setImmediate(handler: any, ...args: any[]): number;
declare function setTimeout(handler: any, timeout?: any, ...args: any[]): number;
declare function clearInterval(handle: number): void;
declare function setInterval(handler: any, timeout?: any, ...args: any[]): number;
declare function btoa(rawString: string): string;
declare function atob(encodedString: string): string;
