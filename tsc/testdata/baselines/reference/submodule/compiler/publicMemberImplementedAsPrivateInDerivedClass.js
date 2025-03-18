//// [tests/cases/compiler/publicMemberImplementedAsPrivateInDerivedClass.ts] ////

//// [publicMemberImplementedAsPrivateInDerivedClass.ts]
interface Qux {
 Bar: number;
}
class Foo implements Qux {
 private Bar: number;
}


//// [publicMemberImplementedAsPrivateInDerivedClass.js]
class Foo {
    Bar;
}
