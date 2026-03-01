//// [tests/cases/compiler/es6ExportDefaultClassDeclaration.ts] ////

//// [es6ExportDefaultClassDeclaration.ts]
export default class C {
    method() { }
}


//// [es6ExportDefaultClassDeclaration.js]
export default class C {
    method() { }
}


//// [es6ExportDefaultClassDeclaration.d.ts]
export default class C {
    method(): void;
}
