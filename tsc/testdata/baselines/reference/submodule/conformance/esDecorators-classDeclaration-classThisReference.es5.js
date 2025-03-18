//// [tests/cases/conformance/esDecorators/classDeclaration/classThisReference/esDecorators-classDeclaration-classThisReference.es5.ts] ////

//// [esDecorators-classDeclaration-classThisReference.es5.ts]
declare let dec: any;

@dec
class C {
    static { this; }
    static x: any = this;
    static m() { this; }
    static get g() { return this; }
}


//// [esDecorators-classDeclaration-classThisReference.es5.js]
@dec
class C {
    static { this; }
    static x = this;
    static m() { this; }
    static get g() { return this; }
}
