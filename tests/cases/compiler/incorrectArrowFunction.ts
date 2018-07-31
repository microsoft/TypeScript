declare const foo;

interface Foo {
    a: number
}

true || () => 1;
true || a => 1;
true || (a) => 2;
true || foo => 1;
true || (a: number) => 1;
true || ({ a }: Foo) => 1;
true || async () => 1;
true || async a => 1;
true || async => 1;

true || (() => 1);
true || (a => 1);
true || ((a) => 2);
true || (foo => 1);
true || ((a: number) => 1);
true || (({ a }: Foo) => 1);
true || (async () => 1);
true || (async a => 1);
true || (async => 1);
(() => 1) || (() => 2);

true || (false);
true || false;
true || foo;
