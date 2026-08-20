//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #method1() {}
}


//// [esDecorators-classDeclaration-methods-nonStaticPrivate.js]
"use strict";
class C {
    @dec
    #method1() { }
}
