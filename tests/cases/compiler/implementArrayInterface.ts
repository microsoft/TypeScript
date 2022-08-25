// @lib: esnext

declare class MyArray<T> implements Array<T> {
    toString(): string;
    toLocaleString(): string;
    valueOf(): T[];
    concat<U extends T[]>(...items: U[]): T[];
    concat(...items: T[]): T[];
    join(separator?: string): string;
    pop(): T;
    push(...items: T[]): number;
    reverse(): T[];
    shift(): T;
    slice(start?: number, end?: number): T[];
    sort(compareFn?: (a: T, b: T) => number): T[];
    splice(start: number): T[];
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    unshift(...items: T[]): number;

    indexOf(searchElement: T, fromIndex?: number): number;
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    find(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T | undefined;
    findIndex(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): number;
    fill(value: T, start?: number, end?: number): T[];
    copyWithin(target: number, start: number, end?: number): T[];
    [Symbol.iterator](): IterableIterator<T>;
    entries(): IterableIterator<[number, T]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<T>;
    [Symbol.unscopables]: any;
    includes(searchElement: T, fromIndex?: number): boolean;
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U | U[], thisArg?: any): U[]
    flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[]
    at(index: number): T | undefined;

    length: number;

    [n: number]: T;
}
