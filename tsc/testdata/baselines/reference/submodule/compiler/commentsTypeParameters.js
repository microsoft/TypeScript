//// [tests/cases/compiler/commentsTypeParameters.ts] ////

//// [commentsTypeParameters.ts]
class C</**docComment for type parameter*/ T> {
    method</**docComment of method type parameter */ U extends T>(a: U) {
    }
    static staticmethod</**docComment of method type parameter */ U>(a: U) {
    }

    private privatemethod</**docComment of method type parameter */ U extends T>(a: U) {
    }
    private static privatestaticmethod</**docComment of method type parameter */ U>(a: U) {
    }
}

function compare</**type*/T>(a: T, b: T) {
    return a === b;
}

//// [commentsTypeParameters.js]
class C {
    method(a) {
    }
    static staticmethod(a) {
    }
    privatemethod(a) {
    }
    static privatestaticmethod(a) {
    }
}
function compare(a, b) {
    return a === b;
}
