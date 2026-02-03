//// [tests/cases/compiler/inheritanceGrandParentPrivateMemberCollision.ts] ////

//// [inheritanceGrandParentPrivateMemberCollision.ts]
class A {
    private myMethod() { }
}

class B extends A { }

class C extends B {
    private myMethod() { }
}


//// [inheritanceGrandParentPrivateMemberCollision.js]
class A {
    myMethod() { }
}
class B extends A {
}
class C extends B {
    myMethod() { }
}
