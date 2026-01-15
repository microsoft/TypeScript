// @target: esnext, es2022, es2015
// @experimentaldecorators: true
// @emitdecoratormetadata: true

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
