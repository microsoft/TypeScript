//// [tests/cases/conformance/statements/labeledStatements/labeledStatementExportDeclarationNoCrash1.ts] ////

//// [labeledStatementExportDeclarationNoCrash1.ts]
// https://github.com/microsoft/TypeScript/issues/59372

export const box: string
subTitle:
export const title: string


//// [labeledStatementExportDeclarationNoCrash1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.box = void 0;
subTitle: export const title;
