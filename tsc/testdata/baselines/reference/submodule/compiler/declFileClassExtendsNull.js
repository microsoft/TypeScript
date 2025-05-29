//// [tests/cases/compiler/declFileClassExtendsNull.ts] ////

//// [declFileClassExtendsNull.ts]
class ExtendsNull extends null {
}

//// [declFileClassExtendsNull.js]
class ExtendsNull extends null {
}


//// [declFileClassExtendsNull.d.ts]
declare class ExtendsNull extends null {
}
