function Foo(s: string);
function Foo(n: number) { }

interface Foo {
    [s: string]: string;
    prop: number;
}