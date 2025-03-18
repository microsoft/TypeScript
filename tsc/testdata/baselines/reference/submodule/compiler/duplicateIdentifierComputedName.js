//// [tests/cases/compiler/duplicateIdentifierComputedName.ts] ////

//// [duplicateIdentifierComputedName.ts]
class C {
    ["a"]: string;
    ["a"]: string;
}


//// [duplicateIdentifierComputedName.js]
class C {
    ["a"];
    ["a"];
}
