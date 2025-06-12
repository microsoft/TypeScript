//// [tests/cases/compiler/jsFileCompilationEmitDeclarations.ts] ////

//// [a.ts]
class c {
}

//// [b.js]
function foo() {
}


//// [out.js]
class c {
}
function foo() {
}


//// [out.d.ts]
declare class c {
}
declare function foo(): void;
