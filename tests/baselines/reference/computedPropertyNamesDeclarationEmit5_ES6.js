//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesDeclarationEmit5_ES6.ts] ////

//// [computedPropertyNamesDeclarationEmit5_ES6.ts]
var v = {
    ["" + ""]: 0,
    ["" + ""]() { },
    get ["" + ""]() { return 0; },
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit5_ES6.js]
var v = {
    ["" + ""]: 0,
    ["" + ""]() { },
    get ["" + ""]() { return 0; },
    set ["" + ""](x) { }
};


//// [computedPropertyNamesDeclarationEmit5_ES6.d.ts]
declare var v: {
    [x: string]: any;
};
