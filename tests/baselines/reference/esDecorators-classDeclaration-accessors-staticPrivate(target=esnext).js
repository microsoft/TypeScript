//// [tests/cases/conformance/esDecorators/classDeclaration/accessors/esDecorators-classDeclaration-accessors-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-accessors-staticPrivate.ts]
declare let dec: any;

class C {
    @dec(1) static get #method1() { return 0; }
    @dec(2) static set #method1(value) {}
}

@dec
class D {
    static get #method1() { return 0; }
    static set #method1(value) {}
    static {
        this.#method1;
        this.#method1 = 1;
    }
}


//// [esDecorators-classDeclaration-accessors-staticPrivate.js]
class C {
    @dec(1)
    static get #method1() { return 0; }
    @dec(2)
    static set #method1(value) { }
}
@dec
class D {
    static get #method1() { return 0; }
    static set #method1(value) { }
    static {
        this.#method1;
        this.#method1 = 1;
    }
}
