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

//// [indexSignatureMustHaveTypeAnnotation.js]
class C {
    [x];
}
class C2 {
}
