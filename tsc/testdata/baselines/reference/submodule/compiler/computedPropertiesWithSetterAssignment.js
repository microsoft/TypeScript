//// [tests/cases/compiler/computedPropertiesWithSetterAssignment.ts] ////

//// [a.ts]
const k = Symbol();

const enum Props {
    k = 'k',
}

interface Foo {
    get k(): Set<string>;
    set k(v: Iterable<string>);

    get [k](): Set<string>;
    set [k](v: Iterable<string>);
}

declare const foo: Foo;

foo.k = ['foo'];
foo['k'] = ['foo'];
foo[Props.k] = ['foo'];
foo[k] = ['foo'];


//// [a.js]
"use strict";
const k = Symbol();
foo.k = ['foo'];
foo['k'] = ['foo'];
foo["k" /* Props.k */] = ['foo'];
foo[k] = ['foo'];
