type Test<T> = [T] extends [any[]] ? { array: Test<T[0]> } : { notArray: T };
declare const x: Test<number[]>;
const y: { array: { notArray: number } } = x; // Error
declare const a: Test<number>;
const b: { notArray: number } = a; // Works