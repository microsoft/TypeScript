//// [tests/cases/compiler/methodSignatureHandledDeclarationKindForSymbol.ts] ////

//// [methodSignatureHandledDeclarationKindForSymbol.ts]
interface Foo {
    bold(): string;
}

interface Foo {
    bold: string;
}



//// [methodSignatureHandledDeclarationKindForSymbol.js]
