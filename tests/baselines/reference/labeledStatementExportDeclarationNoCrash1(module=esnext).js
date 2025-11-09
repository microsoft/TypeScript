//// [tests/cases/conformance/statements/labeledStatements/labeledStatementExportDeclarationNoCrash1.ts] ////

//// [labeledStatementExportDeclarationNoCrash1.ts]
// https://github.com/microsoft/TypeScript/issues/59372

export const box: string
subTitle:
export const title: string


//// [labeledStatementExportDeclarationNoCrash1.js]
// https://github.com/microsoft/TypeScript/issues/59372
export var box;
subTitle: export var title;
