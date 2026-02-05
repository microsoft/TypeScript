//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesDeclarationEmit2_ES5.ts] ////

//// [computedPropertyNamesDeclarationEmit2_ES5.ts]
class C {
    static ["" + ""]() { }
    static get ["" + ""]() { return 0; }
    static set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit2_ES5.js]
"use strict";
class C {
    static ["" + ""]() { }
    static get ["" + ""]() { return 0; }
    static set ["" + ""](x) { }
}


//// [computedPropertyNamesDeclarationEmit2_ES5.d.ts]
declare class C {
}
