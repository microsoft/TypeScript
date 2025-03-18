//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesDeclarationEmit1_ES5.ts] ////

//// [computedPropertyNamesDeclarationEmit1_ES5.ts]
class C {
    ["" + ""]() { }
    get ["" + ""]() { return 0; }
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit1_ES5.js]
class C {
    ["" + ""]() { }
    get ["" + ""]() { return 0; }
    set ["" + ""](x) { }
}
