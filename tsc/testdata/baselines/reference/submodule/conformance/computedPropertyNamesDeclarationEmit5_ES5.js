//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesDeclarationEmit5_ES5.ts] ////

//// [computedPropertyNamesDeclarationEmit5_ES5.ts]
var v = {
    ["" + ""]: 0,
    ["" + ""]() { },
    get ["" + ""]() { return 0; },
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit5_ES5.js]
var v = {
    ["" + ""]: 0,
    ["" + ""]() { },
    get ["" + ""]() { return 0; },
    set ["" + ""](x) { }
};
