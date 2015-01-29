//// [computedPropertyNamesDeclarationEmit5.ts]
var v = {
    ["" + ""]: 0,
    ["" + ""]() { },
    get ["" + ""]() { return 0; },
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit5.js]
var v = {
    ["" + ""]: 0,
    ["" + ""]() {
    },
    get ["" + ""]() {
        return 0;
    },
    set ["" + ""](x) {
    }
};


//// [computedPropertyNamesDeclarationEmit5.d.ts]
declare var v: {};
