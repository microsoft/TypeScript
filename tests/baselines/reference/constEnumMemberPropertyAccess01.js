//// [constEnumMemberPropertyAccess01.ts]
const enum Foo {
    A
}

Foo.A.toString();

//// [constEnumMemberPropertyAccess01.js]
0 /* A */.toString();
