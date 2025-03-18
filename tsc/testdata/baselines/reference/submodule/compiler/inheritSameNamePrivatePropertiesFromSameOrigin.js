//// [tests/cases/compiler/inheritSameNamePrivatePropertiesFromSameOrigin.ts] ////

//// [inheritSameNamePrivatePropertiesFromSameOrigin.ts]
class B {
    private x: number;
}
class C extends B { }

class C2 extends B { }

interface A extends C, C2 { // ok
    y: string;
}

//// [inheritSameNamePrivatePropertiesFromSameOrigin.js]
class B {
    x;
}
class C extends B {
}
class C2 extends B {
}
