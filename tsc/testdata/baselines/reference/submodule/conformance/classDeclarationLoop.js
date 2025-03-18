//// [tests/cases/conformance/classes/classDeclarations/classDeclarationLoop.ts] ////

//// [classDeclarationLoop.ts]
const arr = [];
for (let i = 0; i < 10; ++i) {
    class C {
        prop = i;
    }
    arr.push(C);
}


//// [classDeclarationLoop.js]
const arr = [];
for (let i = 0; i < 10; ++i) {
    class C {
        prop = i;
    }
    arr.push(C);
}
