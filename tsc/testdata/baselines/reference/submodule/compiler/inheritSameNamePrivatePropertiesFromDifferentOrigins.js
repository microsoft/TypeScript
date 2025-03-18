//// [tests/cases/compiler/inheritSameNamePrivatePropertiesFromDifferentOrigins.ts] ////

//// [inheritSameNamePrivatePropertiesFromDifferentOrigins.ts]
class C {
    private x: number;
}

class C2 {
    private x: number;
}

interface A extends C, C2 { // error
    y: string;
}

//// [inheritSameNamePrivatePropertiesFromDifferentOrigins.js]
class C {
    x;
}
class C2 {
    x;
}
