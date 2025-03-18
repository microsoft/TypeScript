//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractInheritance2.ts] ////

//// [classAbstractInheritance2.ts]
abstract class A {
    abstract m1(): number;
    abstract m2(): number;
    abstract m3(): number;
    abstract m4(): number;
    abstract m5(): number;
    abstract m6(): number;
}

class B extends A { }
const C = class extends A {}


//// [classAbstractInheritance2.js]
class A {
}
class B extends A {
}
const C = class extends A {
};
