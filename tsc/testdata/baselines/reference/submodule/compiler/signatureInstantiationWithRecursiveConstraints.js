//// [tests/cases/compiler/signatureInstantiationWithRecursiveConstraints.ts] ////

//// [signatureInstantiationWithRecursiveConstraints.ts]
// Repro from #17148

class Foo {
  myFunc<T extends Foo>(arg: T) {}
}

class Bar {
  myFunc<T extends Bar>(arg: T) {}
}

const myVar: Foo = new Bar();


//// [signatureInstantiationWithRecursiveConstraints.js]
// Repro from #17148
class Foo {
    myFunc(arg) { }
}
class Bar {
    myFunc(arg) { }
}
const myVar = new Bar();
