//// [tests/cases/compiler/duplicateIdentifierRelatedSpans3.ts] ////

//// [file1.ts]
interface TopLevel {
    duplicate1: () => string;
    duplicate2: () => string;
    duplicate3: () => string;
}
//// [file2.ts]
interface TopLevel {
    duplicate1(): number;
    duplicate2(): number;
    duplicate3(): number;
}


//// [file1.js]
//// [file2.js]
