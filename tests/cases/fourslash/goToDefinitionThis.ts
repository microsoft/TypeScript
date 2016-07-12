/// <reference path='fourslash.ts'/>

// @noLib: true
////function f(/*fnDecl*/this: number) {
////    return /*fnUse*/this;
////}
/////*cls*/class C {
////    constructor() { return /*clsUse*/this; }
////    get self(/*getterDecl*/this: number) { return /*getterUse*/this; }
////}

function verifyDefinition(a, b) {
    goTo.marker(a);
    goTo.definition();
    verify.caretAtMarker(b);
}

verifyDefinition("fnUse", "fnDecl");
verifyDefinition("clsUse", "cls");
verifyDefinition("getterUse", "getterDecl");
