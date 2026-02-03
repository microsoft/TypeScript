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


//// [implicitAnyAnyReturningFunction.d.ts]
declare function A(): any;
declare function B(): any;
declare class C {
    A(): any;
    B(): any;
}
