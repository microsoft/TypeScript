//// [tests/cases/conformance/statements/labeledStatements/labeledStatementExportDeclarationNoCrash1.ts] ////

//// [labeledStatementExportDeclarationNoCrash1.ts]
// https://github.com/microsoft/TypeScript/issues/59372

export const box: string
subTitle:
export const title: string


//// [labeledStatementExportDeclarationNoCrash1.js]
export const box;
subTitle: export const title;
