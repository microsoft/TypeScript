//// [tests/cases/compiler/declarationEmitDefaultExport3.ts] ////

//// [declarationEmitDefaultExport3.ts]
export default function foo() {
    return ""
}

//// [declarationEmitDefaultExport3.js]
export default function foo() {
    return "";
}


//// [declarationEmitDefaultExport3.d.ts]
export default function foo(): string;
