//// [tests/cases/compiler/indirectDiscriminantAndExcessProperty.ts] ////

//// [indirectDiscriminantAndExcessProperty.ts]
export type Blah =
    | { type: "foo", abc: string }
    | { type: "bar", xyz: number, extra: any };

declare function thing(blah: Blah): void;

let foo1 = "foo";
thing({
    type: foo1,
    abc: "hello!"
});

let foo2 = "foo";
thing({
    type: foo2,
    abc: "hello!",
    extra: 123,
});

let bar = "bar";
thing({
    type: bar,
    xyz: 123,
    extra: 123,
});


//// [indirectDiscriminantAndExcessProperty.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo1 = "foo";
thing({
    type: foo1,
    abc: "hello!"
});
var foo2 = "foo";
thing({
    type: foo2,
    abc: "hello!",
    extra: 123,
});
var bar = "bar";
thing({
    type: bar,
    xyz: 123,
    extra: 123,
});
