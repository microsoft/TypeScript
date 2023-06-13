//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-nonStaticPrivate.ts] ////

//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) get #method1() { return 0; }
    @dec(2) set #method1(value) {}
}


//// [esDecorators-classDeclaration-accessors-nonStaticPrivate.js]
class C {
    @dec(1)
    get #method1() { return 0; }
    @dec(2)
    set #method1(value) { }
}
