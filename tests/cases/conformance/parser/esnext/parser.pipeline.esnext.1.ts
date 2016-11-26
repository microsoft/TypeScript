// @target: esnext
// @noEmit: true
// @lib: es2015
// single argument
declare function f1(x: number): string;
1 |> f1;
1 |> f1(?);
(1) |> f1;
(1) |> f1(?);
// multiple argument
declare function f2(x: number, y: number): string;
(1, 2) |> f2;
(1, 2) |> f2(?, ?);
// multiple steps
declare function f3(x: string): boolean;
declare function f4(x: string, y: number): boolean;
1 |> f1 |> f3;
1 |> f1(?) |> f3;
1 |> f1 |> f3(?);
1 |> f1(?) |> f3(?);
(1 |> f1(?), 2) |> f4;
// use case
declare function map<T, U>(source: Iterable<T>, cb: (value: T) => U): Iterable<U>;
declare function filter<T>(source: Iterable<T>, cb: (value: T) => boolean): Iterable<T>;
declare function reduce<T>(source: Iterable<T>, cb: (memo: T, value: T) => T, initial: T): T;
[1, 2, 3]
    |> map(?, x => x * 2)
    |> filter(?, x => x > 2)
    |> reduce(?, (x, y) => x + y, 0);