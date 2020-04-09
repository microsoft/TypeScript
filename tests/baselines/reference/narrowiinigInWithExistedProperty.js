//// [narrowiinigInWithExistedProperty.ts]
interface A {
    a: number
}

interface B {
    b: number
}

interface C {
    c: number
}

declare const foo: A | B | C;
declare const bar: unknown;

if ('a' in foo) {
    foo.a
} else if ('b' in foo) {
    foo.b
} else if ('c' in foo) {
    foo.c
} else if ('d' in foo) {
    foo.d
}

if ('a' in bar) {
    bar.a
}

//// [narrowiinigInWithExistedProperty.js]
"use strict";
if ('a' in foo) {
    foo.a;
}
else if ('b' in foo) {
    foo.b;
}
else if ('c' in foo) {
    foo.c;
}
else if ('d' in foo) {
    foo.d;
}
if ('a' in bar) {
    bar.a;
}
