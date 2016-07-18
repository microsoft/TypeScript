interface Ra<T> {
    /**
      * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
      */
    length: number;
    /**
      * Returns a string representation of an array.
      */
    toString(this: this): string;
    toLocaleString(this: this): string;
    /**
      * Appends new elements to an array, and returns the new length of the array.
      * @param items New elements of the Array.
      */
    push(this: this, ...items: T[]): number;
    /**
      * Removes the last element from an array and returns it.
      */
    pop(this: this): T | undefined;
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat(this: this, ...items: (T | T[])[]): T[];
    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
      */
    join(this: this, separator?: string): string;
    /**
      * Reverses the elements in an Array.
      */
    reverse(this: this): T[];
    /**
      * Removes the first element from an array and returns it.
      */
    shift(this: this): T | undefined;
    /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(this: this, start?: number, end?: number): T[];
    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(this: this, compareFn?: (a: T, b: T) => number): this;
    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      */
    splice(this: this, start: number): T[];
    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      * @param deleteCount The number of elements to remove.
      * @param items Elements to insert into the array in place of the deleted elements.
      */
    splice(this: this, start: number, deleteCount: number, ...items: T[]): T[];
    /**
      * Inserts new elements at the start of an array.
      * @param items  Elements to insert at the start of the Array.
      */
    unshift(this: this, ...items: T[]): number;
    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
      */
    indexOf(this: this, searchElement: T, fromIndex?: number): number;
    /**
      * Returns the index of the last occurrence of a specified value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
      */
    lastIndexOf(this: this, searchElement: T, fromIndex?: number): number;
    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    every(this: this, callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    some(this: this, callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    forEach(this: this, callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    /**
      * Calls a defined callback function on each element of an array, and returns an array that contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    map<U>(this: this, callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    filter(this: this, callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce(this: this, callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce<U>(this: this, callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight(this: this, callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    /**
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight<U>(this: this, callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    [n: number]: T;
}
interface Singleton<T> extends Ra<T> {
    0: T;
}
class Bro<T> implements Singleton<T> {
    0: T;
    constructor(init: T) {
        this[0] = init;
    }
    length: number = 12;
    toString(this: this): string { return '' }
    toLocaleString(this: this): string { return '' }
    push(this: this, ...items: T[]): number { return 0; }
    pop(this: this): T | undefined { return this[0] }
    concat(this: this, ...items: (T | Bro<T>)[]): Bro<T> { return this }
    join(this: this, separator?: string): string { return '' }
    reverse(this: this): Bro<T> { return this } ;
    shift(this: this): T | undefined { return undefined };
    slice(this: this, start?: number, end?: number): Bro<T> { return this }
    sort(this: this, compareFn?: (a: T, b: T) => number): this { return this };
    splice(this: this, start: number, deleteCount?: number, ...items: T[]): Bro<T> { return this };
    unshift(this: this, ...items: T[]): number { return 0 }
    indexOf(this: this, searchElement: T, fromIndex?: number): number { return 0 }
    lastIndexOf(this: this, searchElement: T, fromIndex?: number): number { return 0 }
    every(this: this, callbackfn: (value: T, index: number, array: Bro<T>) => boolean, thisArg?: any): boolean { return false }
    some(this: this, callbackfn: (value: T, index: number, array: Bro<T>) => boolean, thisArg?: any): boolean { return false }
    forEach(this: this, callbackfn: (value: T, index: number, array: Bro<T>) => void, thisArg?: any): void { }
    map<U>(this: this, callbackfn: (value: T, index: number, array: Bro<T>) => U, thisArg?: any): Bro<U> { return undefined }
    filter(this: this, callbackfn: (value: T, index: number, array: Bro<T>) => any, thisArg?: any): Bro<T> { return this };

    reduce(this: this, callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: Bro<T>) => T, initialValue?: T): T { return this[0] }

    reduceRight(this: this, callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: Bro<T>) => T, initialValue?: T): T { return this[0] }

    [n: number]: T;
}

function f<T extends Singleton<(p1: number) => number>>(p: T): void { }

var v = f([x => x]);
