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

interface Array<T> {
  /**
   * Copies the array and returns the copied array with all of its elements reversed.
   */
  toReversed(): T[];

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * [11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
   * ```
   */
  toSorted(compareFn?: (a: T, b: T) => number): T[];

  /**
   * Copies an array and removes elements while, if necessary, inserting new elements in their place, returning the remaining elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   * @returns A copy of the original array with the remaining elements.
   */
  toSpliced<F>(start: number, deleteCount: number, ...items: F[]): (T | F)[];

  /**
   * Copies an array and removes elements while returning the remaining elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @returns A copy of the original array with the remaining elements.
   */
  toSpliced(start: number, deleteCount?: number): T[];

  /**
   * Copies the array and inserts the given value at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with<F>(index: number, value: F): (T | F)[];
}

interface ReadonlyArray<T> {
  /**
   * Copies the array and returns the copied array with all of its elements reversed.
   */
  toReversed(): T[];

  /**
   * Copies and sorts the array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * [11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
   * ```
   */
  toSorted(compareFn?: (a: T, b: T) => number): T[];

  /**
   * Copies an array and removes elements while, if necessary, inserting new elements in their place, returning the remaining elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   * @returns A copy of the original array with the remaining elements.
   */
  toSpliced<F>(start: number, deleteCount: number, ...items: F[]): (T | F)[];

  /**
   * Copies an array and removes elements while returning the remaining elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @returns A copy of the original array with the remaining elements.
   */
  toSpliced(start: number, deleteCount?: number): T[];

  /**
   * Copies the array and inserts the given value at the provided index.
   * @param index The index to insert the value at.
   * @param value The value to insert into the copied array.
   * @returns A copy of the original array with the inserted value.
   */
  with<F>(index: number, value: F): (T | F)[];
}
