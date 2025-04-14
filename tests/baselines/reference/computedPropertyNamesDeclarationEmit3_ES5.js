//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesDeclarationEmit3_ES5.ts] ////

//// [computedPropertyNamesDeclarationEmit3_ES5.ts]
interface I {
    ["" + ""](): void;
}

//// [computedPropertyNamesDeclarationEmit3_ES5.js]


//// [computedPropertyNamesDeclarationEmit3_ES5.d.ts]
interface I {
}
