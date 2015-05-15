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

interface ArrayBufferConstructor {
    prototype: ArrayBuffer;
    new (byteLength: number): ArrayBuffer;
    isView(arg: any): boolean;
}
declare var ArrayBuffer: ArrayBufferConstructor;

interface ArrayBufferView {
    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;
}

interface DataView {
    buffer: ArrayBuffer;
    byteLength: number;
    byteOffset: number;
    /**
      * Gets the Float32 value at the specified byte offset from the start of the view. There is 
      * no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getFloat32(byteOffset: number, littleEndian: boolean): number;

    /**
      * Gets the Float64 value at the specified byte offset from the start of the view. There is
      * no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getFloat64(byteOffset: number, littleEndian: boolean): number;

    /**
      * Gets the Int8 value at the specified byte offset from the start of the view. There is 
      * no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt8(byteOffset: number): number;

    /**
      * Gets the Int16 value at the specified byte offset from the start of the view. There is 
      * no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt16(byteOffset: number, littleEndian: boolean): number;
    /**
      * Gets the Int32 value at the specified byte offset from the start of the view. There is 
      * no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getInt32(byteOffset: number, littleEndian: boolean): number;

    /**
      * Gets the Uint8 value at the specified byte offset from the start of the view. There is 
      * no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint8(byteOffset: number): number;

    /**
      * Gets the Uint16 value at the specified byte offset from the start of the view. There is 
      * no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint16(byteOffset: number, littleEndian: boolean): number;

    /**
      * Gets the Uint32 value at the specified byte offset from the start of the view. There is 
      * no alignment constraint; multi-byte values may be fetched from any offset. 
      * @param byteOffset The place in the buffer at which the value should be retrieved.
      */
    getUint32(byteOffset: number, littleEndian: boolean): number;

    /**
      * Stores an Float32 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, 
      * otherwise a little-endian value should be written.
      */
    setFloat32(byteOffset: number, value: number, littleEndian: boolean): void;

    /**
      * Stores an Float64 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, 
      * otherwise a little-endian value should be written.
      */
    setFloat64(byteOffset: number, value: number, littleEndian: boolean): void;

    /**
      * Stores an Int8 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      */
    setInt8(byteOffset: number, value: number): void;

    /**
      * Stores an Int16 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, 
      * otherwise a little-endian value should be written.
      */
    setInt16(byteOffset: number, value: number, littleEndian: boolean): void;

    /**
      * Stores an Int32 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, 
      * otherwise a little-endian value should be written.
      */
    setInt32(byteOffset: number, value: number, littleEndian: boolean): void;

    /**
      * Stores an Uint8 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      */
    setUint8(byteOffset: number, value: number): void;

    /**
      * Stores an Uint16 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, 
      * otherwise a little-endian value should be written.
      */
    setUint16(byteOffset: number, value: number, littleEndian: boolean): void;

    /**
      * Stores an Uint32 value at the specified byte offset from the start of the view. 
      * @param byteOffset The place in the buffer at which the value should be set.
      * @param value The value to set.
      * @param littleEndian If false or undefined, a big-endian value should be written, 
      * otherwise a little-endian value should be written.
      */
    setUint32(byteOffset: number, value: number, littleEndian: boolean): void;
}

interface DataViewConstructor {
    new (buffer: ArrayBuffer, byteOffset?: number, byteLength?: number): DataView;
}
declare var DataView: DataViewConstructor;

/**
  * A typed array of 8-bit integer values. The contents are initialized to 0. If the requested 
  * number of bytes could not be allocated an exception is raised.
  */
interface Int8Array {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): Int8Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls 
      * the callbackfn function for each element in array1 until the callbackfn returns false, 
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as 
        * length+start where length is the length of the array. 
        * @param end index to stop filling the array at. If end is negative, it is treated as 
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Int8Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function. 
      * @param callbackfn A function that accepts up to three arguments. The filter method calls 
      * the callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): Int8Array;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int8Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the 
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the 
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that 
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int8Array) => number, thisArg?: any): Int8Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument 
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls 
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an 
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array) => number, initialValue?: number): number;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array. 
      */
    reverse(): Int8Array;

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
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int8Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the 
      * callbackfn function for each element in array1 until the callbackfn returns true, or until 
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int8Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If 
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): Int8Array;

    /**
      * Gets a new Int8Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int8Array;

    /**
      * Converts a number to a string by using the current locale. 
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}
interface Int8ArrayConstructor {
    prototype: Int8Array;
    new (length: number): Int8Array;
    new (array: Int8Array): Int8Array;
    new (array: number[]): Int8Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int8Array;

    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int8Array;
}
declare var Int8Array: Int8ArrayConstructor;

/**
  * A typed array of 8-bit unsigned integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint8Array {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): Uint8Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls 
      * the callbackfn function for each element in array1 until the callbackfn returns false, 
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint8Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as 
        * length+start where length is the length of the array. 
        * @param end index to stop filling the array at. If end is negative, it is treated as 
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Uint8Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function. 
      * @param callbackfn A function that accepts up to three arguments. The filter method calls 
      * the callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint8Array) => boolean, thisArg?: any): Uint8Array;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the 
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the 
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that 
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any): Uint8Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument 
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls 
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an 
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue?: number): number;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array. 
      */
    reverse(): Uint8Array;

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
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint8Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the 
      * callbackfn function for each element in array1 until the callbackfn returns true, or until 
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint8Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If 
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): Uint8Array;

    /**
      * Gets a new Uint8Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint8Array;

    /**
      * Converts a number to a string by using the current locale. 
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint8ArrayConstructor {
    prototype: Uint8Array;
    new (length: number): Uint8Array;
    new (array: Uint8Array): Uint8Array;
    new (array: number[]): Uint8Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint8Array;

    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint8Array;
}
declare var Uint8Array: Uint8ArrayConstructor;

/**
  * A typed array of 16-bit signed integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Int16Array {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): Int16Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls 
      * the callbackfn function for each element in array1 until the callbackfn returns false, 
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int16Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as 
        * length+start where length is the length of the array. 
        * @param end index to stop filling the array at. If end is negative, it is treated as 
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Int16Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function. 
      * @param callbackfn A function that accepts up to three arguments. The filter method calls 
      * the callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int16Array) => boolean, thisArg?: any): Int16Array;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int16Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the 
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the 
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that 
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int16Array) => number, thisArg?: any): Int16Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument 
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls 
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an 
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array) => number, initialValue?: number): number;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array. 
      */
    reverse(): Int16Array;

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
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int16Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the 
      * callbackfn function for each element in array1 until the callbackfn returns true, or until 
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int16Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If 
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): Int16Array;

    /**
      * Gets a new Int16Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int16Array;

    /**
      * Converts a number to a string by using the current locale. 
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Int16ArrayConstructor {
    prototype: Int16Array;
    new (length: number): Int16Array;
    new (array: Int16Array): Int16Array;
    new (array: number[]): Int16Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int16Array;

    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int16Array;
}
declare var Int16Array: Int16ArrayConstructor;

/**
  * A typed array of 16-bit unsigned integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint16Array {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): Uint16Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls 
      * the callbackfn function for each element in array1 until the callbackfn returns false, 
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint16Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as 
        * length+start where length is the length of the array. 
        * @param end index to stop filling the array at. If end is negative, it is treated as 
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Uint16Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function. 
      * @param callbackfn A function that accepts up to three arguments. The filter method calls 
      * the callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint16Array) => boolean, thisArg?: any): Uint16Array;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint16Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the 
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the 
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that 
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint16Array) => number, thisArg?: any): Uint16Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument 
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls 
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an 
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array) => number, initialValue?: number): number;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array. 
      */
    reverse(): Uint16Array;

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
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint16Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the 
      * callbackfn function for each element in array1 until the callbackfn returns true, or until 
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint16Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If 
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): Uint16Array;

    /**
      * Gets a new Uint16Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint16Array;

    /**
      * Converts a number to a string by using the current locale. 
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint16ArrayConstructor {
    prototype: Uint16Array;
    new (length: number): Uint16Array;
    new (array: Uint16Array): Uint16Array;
    new (array: number[]): Uint16Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint16Array;

    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint16Array;
}
declare var Uint16Array: Uint16ArrayConstructor;
/**
  * A typed array of 32-bit signed integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Int32Array {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): Int32Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls 
      * the callbackfn function for each element in array1 until the callbackfn returns false, 
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Int32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as 
        * length+start where length is the length of the array. 
        * @param end index to stop filling the array at. If end is negative, it is treated as 
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Int32Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function. 
      * @param callbackfn A function that accepts up to three arguments. The filter method calls 
      * the callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Int32Array) => boolean, thisArg?: any): Int32Array;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Int32Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the 
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the 
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that 
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Int32Array) => number, thisArg?: any): Int32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument 
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls 
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an 
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array) => number, initialValue?: number): number;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array. 
      */
    reverse(): Int32Array;

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
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Int32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the 
      * callbackfn function for each element in array1 until the callbackfn returns true, or until 
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Int32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If 
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): Int32Array;

    /**
      * Gets a new Int32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Int32Array;

    /**
      * Converts a number to a string by using the current locale. 
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Int32ArrayConstructor {
    prototype: Int32Array;
    new (length: number): Int32Array;
    new (array: Int32Array): Int32Array;
    new (array: number[]): Int32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Int32Array;

    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Int32Array;
}
declare var Int32Array: Int32ArrayConstructor;

/**
  * A typed array of 32-bit unsigned integer values. The contents are initialized to 0. If the 
  * requested number of bytes could not be allocated an exception is raised.
  */
interface Uint32Array {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): Uint32Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls 
      * the callbackfn function for each element in array1 until the callbackfn returns false, 
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Uint32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as 
        * length+start where length is the length of the array. 
        * @param end index to stop filling the array at. If end is negative, it is treated as 
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Uint32Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function. 
      * @param callbackfn A function that accepts up to three arguments. The filter method calls 
      * the callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Uint32Array) => boolean, thisArg?: any): Uint32Array;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Uint32Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the 
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the 
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that 
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Uint32Array) => number, thisArg?: any): Uint32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument 
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls 
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an 
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array) => number, initialValue?: number): number;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array. 
      */
    reverse(): Uint32Array;

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
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Uint32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the 
      * callbackfn function for each element in array1 until the callbackfn returns true, or until 
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Uint32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If 
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): Uint32Array;

    /**
      * Gets a new Uint32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Uint32Array;

    /**
      * Converts a number to a string by using the current locale. 
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Uint32ArrayConstructor {
    prototype: Uint32Array;
    new (length: number): Uint32Array;
    new (array: Uint32Array): Uint32Array;
    new (array: number[]): Uint32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Uint32Array;

    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Uint32Array;
}
declare var Uint32Array: Uint32ArrayConstructor;

/**
  * A typed array of 32-bit float values. The contents are initialized to 0. If the requested number
  * of bytes could not be allocated an exception is raised.
  */
interface Float32Array {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): Float32Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls 
      * the callbackfn function for each element in array1 until the callbackfn returns false, 
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Float32Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as 
        * length+start where length is the length of the array. 
        * @param end index to stop filling the array at. If end is negative, it is treated as 
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Float32Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function. 
      * @param callbackfn A function that accepts up to three arguments. The filter method calls 
      * the callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Float32Array) => boolean, thisArg?: any): Float32Array;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Float32Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the 
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the 
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that 
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Float32Array) => number, thisArg?: any): Float32Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument 
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls 
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an 
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array) => number, initialValue?: number): number;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array. 
      */
    reverse(): Float32Array;

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
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Float32Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the 
      * callbackfn function for each element in array1 until the callbackfn returns true, or until 
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Float32Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If 
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): Float32Array;

    /**
      * Gets a new Float32Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Float32Array;

    /**
      * Converts a number to a string by using the current locale. 
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Float32ArrayConstructor {
    prototype: Float32Array;
    new (length: number): Float32Array;
    new (array: Float32Array): Float32Array;
    new (array: number[]): Float32Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Float32Array;

    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Float32Array;
}
declare var Float32Array: Float32ArrayConstructor;

/**
  * A typed array of 64-bit float values. The contents are initialized to 0. If the requested 
  * number of bytes could not be allocated an exception is raised.
  */
interface Float64Array {
    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * The ArrayBuffer instance referenced by the array. 
      */
    buffer: ArrayBuffer;

    /**
      * The length in bytes of the array.
      */
    byteLength: number;

    /**
      * The offset in bytes of the array.
      */
    byteOffset: number;

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): Float64Array;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls 
      * the callbackfn function for each element in array1 until the callbackfn returns false, 
      * or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function.
      * If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: number, index: number, array: Float64Array) => boolean, thisArg?: any): boolean;

    /**
        * Returns the this object after filling the section identified by start and end with value
        * @param value value to fill array section with
        * @param start index to start filling the array at. If start is negative, it is treated as 
        * length+start where length is the length of the array. 
        * @param end index to stop filling the array at. If end is negative, it is treated as 
        * length+end.
        */
    fill(value: number, start?: number, end?: number): Float64Array;

    /**
      * Returns the elements of an array that meet the condition specified in a callback function. 
      * @param callbackfn A function that accepts up to three arguments. The filter method calls 
      * the callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    filter(callbackfn: (value: number, index: number, array: Float64Array) => boolean, thisArg?: any): Float64Array;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: number, index: number, obj: Array<number>) => boolean, thisArg?: any): number;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: number) => boolean, thisArg?: any): number;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: number, index: number, array: Float64Array) => void, thisArg?: any): void;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
      *  search starts at index 0.
      */
    indexOf(searchElement: number, fromIndex?: number): number;

    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the 
      * resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;

    /**
      * Returns the index of the last occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the 
      * search starts at index 0.
      */
    lastIndexOf(searchElement: number, fromIndex?: number): number;

    /**
      * The length of the array.
      */
    length: number;

    /**
      * Calls a defined callback function on each element of an array, and returns an array that 
      * contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the 
      * callbackfn function one time for each element in the array. 
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    map(callbackfn: (value: number, index: number, array: Float64Array) => number, thisArg?: any): Float64Array;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduce(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number, initialValue?: number): number;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of 
      * the callback function is the accumulated result, and is provided as an argument in the next 
      * call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the 
      * callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument 
      * instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls 
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an 
      * argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array) => number, initialValue?: number): number;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. 
      * The return value of the callback function is the accumulated result, and is provided as an 
      * argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
      * the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start 
      * the accumulation. The first call to the callbackfn function provides this value as an argument
      * instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array) => U, initialValue: U): U;

    /**
      * Reverses the elements in an Array. 
      */
    reverse(): Float64Array;

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
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): Float64Array;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the 
      * callbackfn function for each element in array1 until the callbackfn returns true, or until 
      * the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
      * If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: number, index: number, array: Float64Array) => boolean, thisArg?: any): boolean;

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If 
      * omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: number, b: number) => number): Float64Array;

    /**
      * Gets a new Float64Array view of the ArrayBuffer store for this array, referencing the elements
      * at begin, inclusive, up to end, exclusive. 
      * @param begin The index of the beginning of the array.
      * @param end The index of the end of the array.
      */
    subarray(begin: number, end?: number): Float64Array;

    /**
      * Converts a number to a string by using the current locale. 
      */
    toLocaleString(): string;

    /**
      * Returns a string representation of an array.
      */
    toString(): string;

    [index: number]: number;
}

interface Float64ArrayConstructor {
    prototype: Float64Array;
    new (length: number): Float64Array;
    new (array: Float64Array): Float64Array;
    new (array: number[]): Float64Array;
    new (buffer: ArrayBuffer, byteOffset?: number, length?: number): Float64Array;

    /**
      * The size in bytes of each element in the array. 
      */
    BYTES_PER_ELEMENT: number;

    /**
      * Returns a new array from a set of elements.
      * @param items A set of elements to include in the new array object.
      */
    of(...items: number[]): Float64Array;
}
declare var Float64Array: Float64ArrayConstructor;/////////////////////////////
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
        hour12?: boolean;
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

interface EventListener {
    (evt: Event): void;
}

interface Blob {
    size: number;
    type: string;
    msClose(): void;
    msDetachStream(): any;
    slice(start?: number, end?: number, contentType?: string): Blob;
}

declare var Blob: {
    prototype: Blob;
    new (blobParts?: any[], options?: BlobPropertyBag): Blob;
}

interface CloseEvent extends Event {
    code: number;
    reason: string;
    wasClean: boolean;
    initCloseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, wasCleanArg: boolean, codeArg: number, reasonArg: string): void;
}

declare var CloseEvent: {
    prototype: CloseEvent;
    new(): CloseEvent;
}

interface Console {
    assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
    clear(): void;
    count(countTitle?: string): void;
    debug(message?: string, ...optionalParams: any[]): void;
    dir(value?: any, ...optionalParams: any[]): void;
    dirxml(value: any): void;
    error(message?: any, ...optionalParams: any[]): void;
    group(groupTitle?: string): void;
    groupCollapsed(groupTitle?: string): void;
    groupEnd(): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    msIsIndependentlyComposed(element: any): boolean;
    profile(reportName?: string): void;
    profileEnd(): void;
    select(element: any): void;
    time(timerName?: string): void;
    timeEnd(timerName?: string): void;
    trace(): void;
    warn(message?: any, ...optionalParams: any[]): void;
}

declare var Console: {
    prototype: Console;
    new(): Console;
}

interface DOMError {
    name: string;
    toString(): string;
}

declare var DOMError: {
    prototype: DOMError;
    new(): DOMError;
}

interface DOMException {
    code: number;
    message: string;
    name: string;
    toString(): string;
    ABORT_ERR: number;
    DATA_CLONE_ERR: number;
    DOMSTRING_SIZE_ERR: number;
    HIERARCHY_REQUEST_ERR: number;
    INDEX_SIZE_ERR: number;
    INUSE_ATTRIBUTE_ERR: number;
    INVALID_ACCESS_ERR: number;
    INVALID_CHARACTER_ERR: number;
    INVALID_MODIFICATION_ERR: number;
    INVALID_NODE_TYPE_ERR: number;
    INVALID_STATE_ERR: number;
    NAMESPACE_ERR: number;
    NETWORK_ERR: number;
    NOT_FOUND_ERR: number;
    NOT_SUPPORTED_ERR: number;
    NO_DATA_ALLOWED_ERR: number;
    NO_MODIFICATION_ALLOWED_ERR: number;
    PARSE_ERR: number;
    QUOTA_EXCEEDED_ERR: number;
    SECURITY_ERR: number;
    SERIALIZE_ERR: number;
    SYNTAX_ERR: number;
    TIMEOUT_ERR: number;
    TYPE_MISMATCH_ERR: number;
    URL_MISMATCH_ERR: number;
    VALIDATION_ERR: number;
    WRONG_DOCUMENT_ERR: number;
}

declare var DOMException: {
    prototype: DOMException;
    new(): DOMException;
    ABORT_ERR: number;
    DATA_CLONE_ERR: number;
    DOMSTRING_SIZE_ERR: number;
    HIERARCHY_REQUEST_ERR: number;
    INDEX_SIZE_ERR: number;
    INUSE_ATTRIBUTE_ERR: number;
    INVALID_ACCESS_ERR: number;
    INVALID_CHARACTER_ERR: number;
    INVALID_MODIFICATION_ERR: number;
    INVALID_NODE_TYPE_ERR: number;
    INVALID_STATE_ERR: number;
    NAMESPACE_ERR: number;
    NETWORK_ERR: number;
    NOT_FOUND_ERR: number;
    NOT_SUPPORTED_ERR: number;
    NO_DATA_ALLOWED_ERR: number;
    NO_MODIFICATION_ALLOWED_ERR: number;
    PARSE_ERR: number;
    QUOTA_EXCEEDED_ERR: number;
    SECURITY_ERR: number;
    SERIALIZE_ERR: number;
    SYNTAX_ERR: number;
    TIMEOUT_ERR: number;
    TYPE_MISMATCH_ERR: number;
    URL_MISMATCH_ERR: number;
    VALIDATION_ERR: number;
    WRONG_DOCUMENT_ERR: number;
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

interface ErrorEvent extends Event {
    colno: number;
    error: any;
    filename: string;
    lineno: number;
    message: string;
    initErrorEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, messageArg: string, filenameArg: string, linenoArg: number): void;
}

declare var ErrorEvent: {
    prototype: ErrorEvent;
    new(): ErrorEvent;
}

interface Event {
    bubbles: boolean;
    cancelBubble: boolean;
    cancelable: boolean;
    currentTarget: EventTarget;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    returnValue: boolean;
    srcElement: any;
    target: EventTarget;
    timeStamp: number;
    type: string;
    initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    AT_TARGET: number;
    BUBBLING_PHASE: number;
    CAPTURING_PHASE: number;
}

declare var Event: {
    prototype: Event;
    new(type: string, eventInitDict?: EventInit): Event;
    AT_TARGET: number;
    BUBBLING_PHASE: number;
    CAPTURING_PHASE: number;
}

interface EventTarget {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var EventTarget: {
    prototype: EventTarget;
    new(): EventTarget;
}

interface File extends Blob {
    lastModifiedDate: any;
    name: string;
}

declare var File: {
    prototype: File;
    new(): File;
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

interface FileReader extends EventTarget, MSBaseReader {
    error: DOMError;
    readAsArrayBuffer(blob: Blob): void;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): void;
    readAsText(blob: Blob, encoding?: string): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var FileReader: {
    prototype: FileReader;
    new(): FileReader;
}

interface IDBCursor {
    direction: string;
    key: any;
    primaryKey: any;
    source: any;
    advance(count: number): void;
    continue(key?: any): void;
    delete(): IDBRequest;
    update(value: any): IDBRequest;
    NEXT: string;
    NEXT_NO_DUPLICATE: string;
    PREV: string;
    PREV_NO_DUPLICATE: string;
}

declare var IDBCursor: {
    prototype: IDBCursor;
    new(): IDBCursor;
    NEXT: string;
    NEXT_NO_DUPLICATE: string;
    PREV: string;
    PREV_NO_DUPLICATE: string;
}

interface IDBCursorWithValue extends IDBCursor {
    value: any;
}

declare var IDBCursorWithValue: {
    prototype: IDBCursorWithValue;
    new(): IDBCursorWithValue;
}

interface IDBDatabase extends EventTarget {
    name: string;
    objectStoreNames: DOMStringList;
    onabort: (ev: Event) => any;
    onerror: (ev: Event) => any;
    version: string;
    close(): void;
    createObjectStore(name: string, optionalParameters?: any): IDBObjectStore;
    deleteObjectStore(name: string): void;
    transaction(storeNames: any, mode?: string): IDBTransaction;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBDatabase: {
    prototype: IDBDatabase;
    new(): IDBDatabase;
}

interface IDBFactory {
    cmp(first: any, second: any): number;
    deleteDatabase(name: string): IDBOpenDBRequest;
    open(name: string, version?: number): IDBOpenDBRequest;
}

declare var IDBFactory: {
    prototype: IDBFactory;
    new(): IDBFactory;
}

interface IDBIndex {
    keyPath: string;
    name: string;
    objectStore: IDBObjectStore;
    unique: boolean;
    count(key?: any): IDBRequest;
    get(key: any): IDBRequest;
    getKey(key: any): IDBRequest;
    openCursor(range?: IDBKeyRange, direction?: string): IDBRequest;
    openKeyCursor(range?: IDBKeyRange, direction?: string): IDBRequest;
}

declare var IDBIndex: {
    prototype: IDBIndex;
    new(): IDBIndex;
}

interface IDBKeyRange {
    lower: any;
    lowerOpen: boolean;
    upper: any;
    upperOpen: boolean;
}

declare var IDBKeyRange: {
    prototype: IDBKeyRange;
    new(): IDBKeyRange;
    bound(lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean): IDBKeyRange;
    lowerBound(bound: any, open?: boolean): IDBKeyRange;
    only(value: any): IDBKeyRange;
    upperBound(bound: any, open?: boolean): IDBKeyRange;
}

interface IDBObjectStore {
    indexNames: DOMStringList;
    keyPath: string;
    name: string;
    transaction: IDBTransaction;
    add(value: any, key?: any): IDBRequest;
    clear(): IDBRequest;
    count(key?: any): IDBRequest;
    createIndex(name: string, keyPath: string, optionalParameters?: any): IDBIndex;
    delete(key: any): IDBRequest;
    deleteIndex(indexName: string): void;
    get(key: any): IDBRequest;
    index(name: string): IDBIndex;
    openCursor(range?: any, direction?: string): IDBRequest;
    put(value: any, key?: any): IDBRequest;
}

declare var IDBObjectStore: {
    prototype: IDBObjectStore;
    new(): IDBObjectStore;
}

interface IDBOpenDBRequest extends IDBRequest {
    onblocked: (ev: Event) => any;
    onupgradeneeded: (ev: IDBVersionChangeEvent) => any;
    addEventListener(type: "blocked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "success", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "upgradeneeded", listener: (ev: IDBVersionChangeEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBOpenDBRequest: {
    prototype: IDBOpenDBRequest;
    new(): IDBOpenDBRequest;
}

interface IDBRequest extends EventTarget {
    error: DOMError;
    onerror: (ev: Event) => any;
    onsuccess: (ev: Event) => any;
    readyState: string;
    result: any;
    source: any;
    transaction: IDBTransaction;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "success", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBRequest: {
    prototype: IDBRequest;
    new(): IDBRequest;
}

interface IDBTransaction extends EventTarget {
    db: IDBDatabase;
    error: DOMError;
    mode: string;
    onabort: (ev: Event) => any;
    oncomplete: (ev: Event) => any;
    onerror: (ev: Event) => any;
    abort(): void;
    objectStore(name: string): IDBObjectStore;
    READ_ONLY: string;
    READ_WRITE: string;
    VERSION_CHANGE: string;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "complete", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBTransaction: {
    prototype: IDBTransaction;
    new(): IDBTransaction;
    READ_ONLY: string;
    READ_WRITE: string;
    VERSION_CHANGE: string;
}

interface IDBVersionChangeEvent extends Event {
    newVersion: number;
    oldVersion: number;
}

declare var IDBVersionChangeEvent: {
    prototype: IDBVersionChangeEvent;
    new(): IDBVersionChangeEvent;
}

interface ImageData {
    data: number[];
    height: number;
    width: number;
}

declare var ImageData: {
    prototype: ImageData;
    new(): ImageData;
}

interface MSApp {
    clearTemporaryWebDataAsync(): MSAppAsyncOperation;
    createBlobFromRandomAccessStream(type: string, seeker: any): Blob;
    createDataPackage(object: any): any;
    createDataPackageFromSelection(): any;
    createFileFromStorageFile(storageFile: any): File;
    createStreamFromInputStream(type: string, inputStream: any): MSStream;
    execAsyncAtPriority(asynchronousCallback: MSExecAtPriorityFunctionCallback, priority: string, ...args: any[]): void;
    execAtPriority(synchronousCallback: MSExecAtPriorityFunctionCallback, priority: string, ...args: any[]): any;
    getCurrentPriority(): string;
    getHtmlPrintDocumentSourceAsync(htmlDoc: any): any;
    getViewId(view: any): any;
    isTaskScheduledAtPriorityOrHigher(priority: string): boolean;
    pageHandlesAllApplicationActivations(enabled: boolean): void;
    suppressSubdownloadCredentialPrompts(suppress: boolean): void;
    terminateApp(exceptionObject: any): void;
    CURRENT: string;
    HIGH: string;
    IDLE: string;
    NORMAL: string;
}
declare var MSApp: MSApp;

interface MSBlobBuilder {
    append(data: any, endings?: string): void;
    getBlob(contentType?: string): Blob;
}

declare var MSBlobBuilder: {
    prototype: MSBlobBuilder;
    new(): MSBlobBuilder;
}

interface MSStream {
    type: string;
    msClose(): void;
    msDetachStream(): any;
}

declare var MSStream: {
    prototype: MSStream;
    new(): MSStream;
}

interface MSStreamReader extends EventTarget, MSBaseReader {
    error: DOMError;
    readAsArrayBuffer(stream: MSStream, size?: number): void;
    readAsBinaryString(stream: MSStream, size?: number): void;
    readAsBlob(stream: MSStream, size?: number): void;
    readAsDataURL(stream: MSStream, size?: number): void;
    readAsText(stream: MSStream, encoding?: string, size?: number): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var MSStreamReader: {
    prototype: MSStreamReader;
    new(): MSStreamReader;
}

interface MessageChannel {
    port1: MessagePort;
    port2: MessagePort;
}

declare var MessageChannel: {
    prototype: MessageChannel;
    new(): MessageChannel;
}

interface MessageEvent extends Event {
    data: any;
    origin: string;
    ports: any;
    source: any;
    initMessageEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, dataArg: any, originArg: string, lastEventIdArg: string, sourceArg: any): void;
}

declare var MessageEvent: {
    prototype: MessageEvent;
    new(): MessageEvent;
}

interface MessagePort extends EventTarget {
    onmessage: (ev: MessageEvent) => any;
    close(): void;
    postMessage(message?: any, ports?: any): void;
    start(): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var MessagePort: {
    prototype: MessagePort;
    new(): MessagePort;
}

interface ProgressEvent extends Event {
    lengthComputable: boolean;
    loaded: number;
    total: number;
    initProgressEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, lengthComputableArg: boolean, loadedArg: number, totalArg: number): void;
}

declare var ProgressEvent: {
    prototype: ProgressEvent;
    new(): ProgressEvent;
}

interface WebSocket extends EventTarget {
    binaryType: string;
    bufferedAmount: number;
    extensions: string;
    onclose: (ev: CloseEvent) => any;
    onerror: (ev: Event) => any;
    onmessage: (ev: MessageEvent) => any;
    onopen: (ev: Event) => any;
    protocol: string;
    readyState: number;
    url: string;
    close(code?: number, reason?: string): void;
    send(data: any): void;
    CLOSED: number;
    CLOSING: number;
    CONNECTING: number;
    OPEN: number;
    addEventListener(type: "close", listener: (ev: CloseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "open", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var WebSocket: {
    prototype: WebSocket;
    new(url: string, protocols?: string): WebSocket;
    new(url: string, protocols?: any): WebSocket;
    CLOSED: number;
    CLOSING: number;
    CONNECTING: number;
    OPEN: number;
}

interface Worker extends EventTarget, AbstractWorker {
    onmessage: (ev: MessageEvent) => any;
    postMessage(message: any, ports?: any): void;
    terminate(): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var Worker: {
    prototype: Worker;
    new(stringUrl: string): Worker;
}

interface XMLHttpRequest extends EventTarget, XMLHttpRequestEventTarget {
    msCaching: string;
    onreadystatechange: (ev: ProgressEvent) => any;
    readyState: number;
    response: any;
    responseBody: any;
    responseText: string;
    responseType: string;
    responseXML: any;
    status: number;
    statusText: string;
    timeout: number;
    upload: XMLHttpRequestUpload;
    withCredentials: boolean;
    abort(): void;
    getAllResponseHeaders(): string;
    getResponseHeader(header: string): string;
    msCachingEnabled(): boolean;
    open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
    overrideMimeType(mime: string): void;
    send(data?: string): void;
    send(data?: any): void;
    setRequestHeader(header: string, value: string): void;
    DONE: number;
    HEADERS_RECEIVED: number;
    LOADING: number;
    OPENED: number;
    UNSENT: number;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "readystatechange", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "timeout", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var XMLHttpRequest: {
    prototype: XMLHttpRequest;
    new(): XMLHttpRequest;
    DONE: number;
    HEADERS_RECEIVED: number;
    LOADING: number;
    OPENED: number;
    UNSENT: number;
    create(): XMLHttpRequest;
}

interface AbstractWorker {
    onerror: (ev: Event) => any;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface MSBaseReader {
    onabort: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onload: (ev: Event) => any;
    onloadend: (ev: ProgressEvent) => any;
    onloadstart: (ev: Event) => any;
    onprogress: (ev: ProgressEvent) => any;
    readyState: number;
    result: any;
    abort(): void;
    DONE: number;
    EMPTY: number;
    LOADING: number;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface NavigatorID {
    appName: string;
    appVersion: string;
    platform: string;
    product: string;
    productSub: string;
    userAgent: string;
    vendor: string;
    vendorSub: string;
}

interface NavigatorOnLine {
    onLine: boolean;
}

interface WindowBase64 {
    atob(encodedString: string): string;
    btoa(rawString: string): string;
}

interface WindowConsole {
    console: Console;
}

interface XMLHttpRequestEventTarget {
    onabort: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onload: (ev: Event) => any;
    onloadend: (ev: ProgressEvent) => any;
    onloadstart: (ev: Event) => any;
    onprogress: (ev: ProgressEvent) => any;
    ontimeout: (ev: ProgressEvent) => any;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "timeout", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface FileReaderSync {
    readAsArrayBuffer(blob: Blob): any;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): string;
    readAsText(blob: Blob, encoding?: string): string;
}

declare var FileReaderSync: {
    prototype: FileReaderSync;
    new(): FileReaderSync;
}

interface WorkerGlobalScope extends EventTarget, WorkerUtils, DedicatedWorkerGlobalScope, WindowConsole {
    location: WorkerLocation;
    onerror: (ev: Event) => any;
    self: WorkerGlobalScope;
    close(): void;
    msWriteProfilerMark(profilerMarkName: string): void;
    toString(): string;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var WorkerGlobalScope: {
    prototype: WorkerGlobalScope;
    new(): WorkerGlobalScope;
}

interface WorkerLocation {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    toString(): string;
}

declare var WorkerLocation: {
    prototype: WorkerLocation;
    new(): WorkerLocation;
}

interface WorkerNavigator extends Object, NavigatorID, NavigatorOnLine {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var WorkerNavigator: {
    prototype: WorkerNavigator;
    new(): WorkerNavigator;
}

interface DedicatedWorkerGlobalScope {
    onmessage: (ev: MessageEvent) => any;
    postMessage(data: any): void;
    addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface WorkerUtils extends Object, WindowBase64 {
    indexedDB: IDBFactory;
    msIndexedDB: IDBFactory;
    navigator: WorkerNavigator;
    clearImmediate(handle: number): void;
    clearInterval(handle: number): void;
    clearTimeout(handle: number): void;
    importScripts(...urls: string[]): void;
    setImmediate(handler: any, ...args: any[]): number;
    setInterval(handler: any, timeout?: any, ...args: any[]): number;
    setTimeout(handler: any, timeout?: any, ...args: any[]): number;
}


interface NodeListOf<TNode extends Node> extends NodeList {
    length: number;
    item(index: number): TNode;
    [index: number]: TNode;
}

interface BlobPropertyBag {
    type?: string;
    endings?: string;
}

interface EventListenerObject {
    handleEvent(evt: Event): void;
}

declare type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

interface ErrorEventHandler {
    (event: Event, source?: string, fileno?: number, columnNumber?: number): void;
    (event: string, source?: string, fileno?: number, columnNumber?: number): void;
}
interface PositionCallback {
    (position: Position): void;
}
interface PositionErrorCallback {
    (error: PositionError): void;
}
interface MediaQueryListListener {
    (mql: MediaQueryList): void;
}
interface MSLaunchUriCallback {
    (): void;
}
interface FrameRequestCallback {
    (time: number): void;
}
interface MutationCallback {
    (mutations: MutationRecord[], observer: MutationObserver): void;
}
interface DecodeSuccessCallback {
    (decodedData: AudioBuffer): void;
}
interface DecodeErrorCallback {
    (): void;
}
interface FunctionStringCallback {
    (data: string): void;
}
declare var location: WorkerLocation;
declare var onerror: (ev: Event) => any;
declare var self: WorkerGlobalScope;
declare function close(): void;
declare function msWriteProfilerMark(profilerMarkName: string): void;
declare function toString(): string;
declare function addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
declare function dispatchEvent(evt: Event): boolean;
declare function removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
declare var indexedDB: IDBFactory;
declare var msIndexedDB: IDBFactory;
declare var navigator: WorkerNavigator;
declare function clearImmediate(handle: number): void;
declare function clearInterval(handle: number): void;
declare function clearTimeout(handle: number): void;
declare function importScripts(...urls: string[]): void;
declare function setImmediate(handler: any, ...args: any[]): number;
declare function setInterval(handler: any, timeout?: any, ...args: any[]): number;
declare function setTimeout(handler: any, timeout?: any, ...args: any[]): number;
declare function atob(encodedString: string): string;
declare function btoa(rawString: string): string;
declare var onmessage: (ev: MessageEvent) => any;
declare function postMessage(data: any): void;
declare var console: Console;
declare function addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: "message", listener: (ev: MessageEvent) => any, useCapture?: boolean): void;
declare function addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;