//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithCallSignaturesWithOptionalParameters.ts] ////

//// [subtypingWithCallSignaturesWithOptionalParameters.ts]
// call signatures in derived types must have the same or fewer optional parameters as the base type

interface Base { 
    a: () => number;
    a2: (x?: number) => number;
    a3: (x: number) => number;
    a4: (x: number, y?: number) => number;
    a5: (x?: number, y?: number) => number;
}

interface I1 extends Base {
    a: () => number; // ok, same number of required params
}

interface I2 extends Base {
    a: (x?: number) => number; // ok, same number of required params
}

interface I3 extends Base {
    a: (x: number) => number; // error, too many required params
}


interface I4 extends Base {
    a2: () => number; // ok, same number of required params
}

interface I5 extends Base {
    a2: (x?: number) => number; // ok, same number of required params
}

interface I6 extends Base {
    a2: (x: number) => number; // ok, same number of params
}


interface I7 extends Base {
    a3: () => number; // ok, fewer required params
}

interface I8 extends Base {
    a3: (x?: number) => number; // ok, fewer required params
}

interface I9 extends Base {
    a3: (x: number) => number; // ok, same number of required params
}

interface I10 extends Base {
    a3: (x: number, y: number) => number;  // error, too many required params
}


interface I11 extends Base {
    a4: () => number; // ok, fewer required params
}

interface I12 extends Base {
    a4: (x?: number, y?: number) => number; // ok, fewer required params
}

interface I13 extends Base {
    a4: (x: number) => number; // ok, same number of required params
}

interface I14 extends Base {
    a4: (x: number, y: number) => number;  // ok, same number of params
}


interface I15 extends Base {
    a5: () => number; // ok, fewer required params
}

interface I16 extends Base {
    a5: (x?: number, y?: number) => number; // ok, fewer required params
}

interface I17 extends Base {
    a5: (x: number) => number; // ok, all present params match
}

interface I18 extends Base {
    a5: (x: number, y: number) => number;  // ok, same number of params
}

//// [subtypingWithCallSignaturesWithOptionalParameters.js]
// call signatures in derived types must have the same or fewer optional parameters as the base type
