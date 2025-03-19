//// [tests/cases/compiler/classWithDuplicateIdentifier.ts] ////

//// [classWithDuplicateIdentifier.ts]
class C {
    a(): number { return 0; } // error: duplicate identifier
    a: number;
}
class K {
    b: number; // error: duplicate identifier
    b(): number { return 0; }
}
class D {
    c: number;
    c: string;
}


//// [classWithDuplicateIdentifier.js]
class C {
    a() { return 0; } // error: duplicate identifier
    a;
}
class K {
    b; // error: duplicate identifier
    b() { return 0; }
}
class D {
    c;
    c;
}
