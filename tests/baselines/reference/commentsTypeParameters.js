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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function (a) {
    };
    C.staticmethod = function (a) {
    };
    C.prototype.privatemethod = function (a) {
    };
    C.privatestaticmethod = function (a) {
    };
    return C;
}());
function compare(a, b) {
    return a === b;
}


//// [commentsTypeParameters.d.ts]
declare class C</**docComment for type parameter*/ T> {
    method</**docComment of method type parameter */ U extends T>(a: U): void;
    static staticmethod</**docComment of method type parameter */ U>(a: U): void;
    private privatemethod;
    private static privatestaticmethod;
}
declare function compare</**type*/ T>(a: T, b: T): boolean;
