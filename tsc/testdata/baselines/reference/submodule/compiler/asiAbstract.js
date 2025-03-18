//// [tests/cases/compiler/asiAbstract.ts] ////

//// [asiAbstract.ts]
abstract
class NonAbstractClass {
  abstract s();
}

class C2 {
    abstract
    nonAbstractFunction() {
    }
}

class C3 {
    abstract
}


//// [asiAbstract.js]
abstract;
class NonAbstractClass {
}
class C2 {
    abstract;
    nonAbstractFunction() {
    }
}
class C3 {
    abstract;
}
