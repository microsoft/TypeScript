//// [tests/cases/compiler/implicitAnyAnyReturningFunction.ts] ////

//// [implicitAnyAnyReturningFunction.ts]
function A() {
    return <any>"";
}

function B() {
    var someLocal: any = {};
    return someLocal;
}

class C {
    public A() {
        return <any>"";
    }

    public B() {
        var someLocal: any = {};
        return someLocal;
    }
}


//// [implicitAnyAnyReturningFunction.js]
function A() {
    return "";
}
function B() {
    var someLocal = {};
    return someLocal;
}
class C {
    A() {
        return "";
    }
    B() {
        var someLocal = {};
        return someLocal;
    }
}
