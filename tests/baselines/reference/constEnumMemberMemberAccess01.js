//// [constEnumMemberMemberAccess01.ts]
const enum Foo {
    A
}

Foo.A["toString"]();

//// [constEnumMemberMemberAccess01.js]
0 /* A */["toString"]();
