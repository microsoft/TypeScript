//// [tests/cases/compiler/interfaceOnly.ts] ////

//// [interfaceOnly.ts]
interface foo {
    foo();
    f2 (f: ()=> void);
}

//// [interfaceOnly.js]
