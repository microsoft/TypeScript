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

interface Uint8Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Uint8Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Uint8Array.from([11, 2, 22, 1]);
   * myNums.toSorted((a, b) => a - b) // Uint8Array(4) [1, 2, 11, 22]
   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Uint8Array;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Uint8Array;
}

interface Uint8ClampedArray {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Uint8ClampedArray;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Uint8ClampedArray.from([11, 2, 22, 1]);
   * myNums.toSorted((a, b) => a - b) // Uint8ClampedArray(4) [1, 2, 11, 22]
   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Uint8ClampedArray;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Uint8ClampedArray;
}

interface Int8Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Int8Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Int8Array.from([11, 2, -22, 1]);
   * myNums.toSorted((a, b) => a - b) // Int8Array(4) [-22, 1, 2, 11]

   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Int8Array;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Int8Array;
}

interface Uint16Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Uint16Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Uint16Array.from([11, 2, 22, 1]);
   * myNums.toSorted((a, b) => a - b) // Uint16Array(4) [1, 2, 11, 22]
   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Uint16Array;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Uint16Array;
}

interface Int16Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Int16Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Int16Array.from([11, 2, -22, 1]);
   * myNums.toSorted((a, b) => a - b) // Int16Array(4) [-22, 1, 2, 11]
   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Int16Array;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Int16Array;
}

interface Uint32Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Uint32Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Uint32Array.from([11, 2, 22, 1]);
   * myNums.toSorted((a, b) => a - b) // Uint32Array(4) [1, 2, 11, 22]
   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Uint32Array;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Uint32Array;
}

interface Int32Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Int32Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Int32Array.from([11, 2, -22, 1]);
   * myNums.toSorted((a, b) => a - b) // Int32Array(4) [-22, 1, 2, 11]
   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Int32Array;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Int32Array;
}

interface Float32Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Float32Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Float32Array.from([11.25, 2, -22.5, 1]);
   * myNums.toSorted((a, b) => a - b) // Float32Array(4) [-22.5, 1, 2, 11.5]
   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Float32Array;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Float32Array;
}

interface Float64Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): Float64Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = Float64Array.from([11.25, 2, -22.5, 1]);
   * myNums.toSorted((a, b) => a - b) // Float64Array(4) [-22.5, 1, 2, 11.5]
   * ```
   */
  toSorted(compareFn?: (a: number, b: number) => number): Float64Array;

  /**
   * Copies the array and inserts the given number at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: number): Float64Array;
}

interface BigUint64Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): BigUint64Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = BigUint64Array.from([11n, 2n, 22n, 1n]);
   * myNums.toSorted((a, b) => Number(a - b)) // BigUint64Array(4) [1n, 2n, 11n, 22n]
   * ```
   */
  toSorted(compareFn?: (a: bigint, b: bigint) => number): BigUint64Array;

  /**
   * Copies the array and inserts the given bigint at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: bigint): BigUint64Array;
}

interface BigInt64Array {
  /**
   * Copies the array and returns the copy with the elements in reverse order.
   */
  toReversed(): BigInt64Array;

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * const myNums = BigInt64Array.from([11n, 2n, -22n, 1n]);
   * myNums.toSorted((a, b) => Number(a - b)) // BigInt64Array(4) [-22n, 1n, 2n, 11n]
   * ```
   */
  toSorted(compareFn?: (a: bigint, b: bigint) => number): BigInt64Array;

  /**
   * Copies the array and inserts the given bigint at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with(index: number, value: bigint): BigInt64Array;
}
