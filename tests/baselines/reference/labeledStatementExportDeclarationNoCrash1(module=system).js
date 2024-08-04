//// [tests/cases/conformance/statements/labeledStatements/labeledStatementExportDeclarationNoCrash1.ts] ////

//// [labeledStatementExportDeclarationNoCrash1.ts]
// https://github.com/microsoft/TypeScript/issues/59372

export const box: string
subTitle:
export const title: string


//// [labeledStatementExportDeclarationNoCrash1.js]
// https://github.com/microsoft/TypeScript/issues/59372
System.register([], function (exports_1, context_1) {
    "use strict";
    var box, title;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            subTitle: ;
        }
    };
});
