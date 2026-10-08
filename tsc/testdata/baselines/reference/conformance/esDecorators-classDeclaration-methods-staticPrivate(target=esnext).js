//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #method1() {}
}

@dec
class D {
    static #method1() {}
}

@dec
class E {
    static #a() {}
    #a() {}
    #b() {}
    static #b() {}
    static #c = 0;
    #c = 0;
    #d = 0;
    static #d = 0;
    static get #e() { return 0; }
    set #e(value: number) {}
    get #f() { return 0; }
    static set #f(value: number) {}
}


//// [esDecorators-classDeclaration-methods-staticPrivate.js]
"use strict";
class C {
    @dec
    static #method1() { }
}
@dec
class D {
    static #method1() { }
}
@dec
class E {
    static #a() { }
    #a() { }
    #b() { }
    static #b() { }
    static #c = 0;
    #c = 0;
    #d = 0;
    static #d = 0;
    static get #e() { return 0; }
    set #e(value) { }
    get #f() { return 0; }
    static set #f(value) { }
}
