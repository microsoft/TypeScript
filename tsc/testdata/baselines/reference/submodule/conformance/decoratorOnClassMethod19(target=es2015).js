//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod19.ts] ////

//// [decoratorOnClassMethod19.ts]
// https://github.com/microsoft/TypeScript/issues/48515
declare var decorator: any;

class C1 {
    #x

    @decorator((x: C1) => x.#x)
    y() {}
}

class C2 {
    #x

    y(@decorator((x: C2) => x.#x) p) {}
}


//// [decoratorOnClassMethod19.js]
class C1 {
    #x;
    @decorator((x) => x.#x)
    y() { }
}
class C2 {
    #x;
    y(p) { }
}
