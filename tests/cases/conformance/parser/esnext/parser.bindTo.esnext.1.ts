// @target: esnext
// @noEmit: true
// @lib: es2015
// single argument
declare function f1(this: number): string;
1 :: f1;
1 :: f1();
// multiple steps
declare function f2(this: string): boolean;
1 :: f1() :: f2();
// use cases
declare function map<T, U>(this: Iterable<T>, cb: (value: T) => U): Iterable<U>;
declare function filter<T>(this: Iterable<T>, cb: (value: T) => boolean): Iterable<T>;
declare function reduce<T>(this: Iterable<T>, cb: (memo: T, value: T) => T, initial: T): T;
[1, 2, 3]
    :: map(x => x * 2)
    :: filter(x => x > 2)
    :: reduce((x, y) => x + y, 0);
