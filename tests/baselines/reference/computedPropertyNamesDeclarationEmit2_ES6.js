//// [computedPropertyNamesDeclarationEmit2_ES6.ts]
class C {
    static ["" + ""]() { }
    static get ["" + ""]() { return 0; }
    static set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit2_ES6.js]
class C {
    static ["" + ""]() { }
    static get ["" + ""]() { return 0; }
    static set ["" + ""](x) { }
}


//// [computedPropertyNamesDeclarationEmit2_ES6.d.ts]
declare class C {
}
