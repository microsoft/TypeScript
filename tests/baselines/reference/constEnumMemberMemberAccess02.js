//// [constEnumMemberMemberAccess02.ts]

const enum Foo {
    A
}

Foo.A["toString"]();

//// [constEnumMemberMemberAccess02.js]
0["toString"]();
