interface Foo {
    a: string;
    b: number;
};

interface Bar {
    b: string;
}

interface Other {
    totallyUnrelatedProperty: number;
}

export let x = { a: '', b: '' };

declare function f(x: Foo | Other): any;

f(x);
f({ a: '', b: '' })

declare function g(x: Bar | Other): any;

g(x);
g({ a: '', b: '' })

declare function h(x: Foo | Bar | Other): any;

h(x);
h({ a: '', b: '' })
