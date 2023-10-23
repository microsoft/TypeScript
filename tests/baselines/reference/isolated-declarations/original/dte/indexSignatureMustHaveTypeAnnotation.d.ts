//// [tests/cases/compiler/indexSignatureMustHaveTypeAnnotation.ts] ////

//// [indexSignatureMustHaveTypeAnnotation.ts]
interface I {
    // Used to be indexer, now it is a computed property
    [x]: string;
    [x: string];
}

class C {
    // Used to be indexer, now it is a computed property
    [x]: string
    
}

class C2 {
    [x: string]
}

/// [Declarations] ////



//// [/.src/indexSignatureMustHaveTypeAnnotation.d.ts]
interface I {
    [x]: string;
    [x: string]: any;
}
declare class C {
    [x]: string;
}
declare class C2 {
    [x: string]: any;
}
