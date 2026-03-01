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
"use strict";
class A {
    myMethod() { }
}
class B extends A {
}
class C extends B {
    myMethod() { }
}
