//// [tests/cases/compiler/inheritSameNamePropertiesWithDifferentVisibility.ts] ////

//// [inheritSameNamePropertiesWithDifferentVisibility.ts]
class C {
    public x: number;
}

class C2 {
    private x: number;
}

interface A extends C, C2 { // error
    y: string;
}

//// [inheritSameNamePropertiesWithDifferentVisibility.js]
class C {
    x;
}
class C2 {
    x;
}
