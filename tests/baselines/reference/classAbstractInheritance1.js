//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractInheritance1.ts] ////

//// [classAbstractInheritance1.ts]
abstract class A {}

abstract class B extends A {}

class C extends A {}

abstract class AA {
    abstract foo();
}

abstract class BB extends AA {}

class CC extends AA {}

class DD extends BB {}

abstract class EE extends BB {}

class FF extends CC {}

abstract class GG extends CC {}

//// [classAbstractInheritance1.js]
class A {
}
class B extends A {
}
class C extends A {
}
class AA {
}
class BB extends AA {
}
class CC extends AA {
}
class DD extends BB {
}
class EE extends BB {
}
class FF extends CC {
}
class GG extends CC {
}
