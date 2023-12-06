//// [tests/cases/compiler/inheritSameNamePropertiesWithDifferentOptionality.ts] ////

//// [inheritSameNamePropertiesWithDifferentOptionality.ts]
interface C {
    x?: number;
}

interface C2 {
    x: number;
}

interface A extends C, C2 { // error
    y: string;
}

//// [inheritSameNamePropertiesWithDifferentOptionality.js]
