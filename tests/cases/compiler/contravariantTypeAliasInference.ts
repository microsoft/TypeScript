// @strict: true

type Func1<T> = (x: T) => void;
type Func2<T> = ((x: T) => void) | undefined;

declare let f1: Func1<string>;
declare let f2: Func1<"a">;

declare function foo<T>(f1: Func1<T>, f2: Func1<T>): void;

foo(f1, f2);

declare let g1: Func2<string>;
declare let g2: Func2<"a">;

declare function bar<T>(g1: Func2<T>, g2: Func2<T>): void;

bar(f1, f2);
bar(g1, g2);
