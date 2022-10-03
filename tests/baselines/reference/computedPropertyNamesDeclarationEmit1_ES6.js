//// [computedPropertyNamesDeclarationEmit1_ES6.ts]
class C {
    ["" + ""]() { }
    get ["" + ""]() { return 0; }
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit1_ES6.js]
class C {
    ["" + ""]() { }
    get ["" + ""]() { return 0; }
    set ["" + ""](x) { }
}


//// [computedPropertyNamesDeclarationEmit1_ES6.d.ts]
declare class C {
}
