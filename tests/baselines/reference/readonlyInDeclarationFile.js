//// [readonlyInDeclarationFile.ts]

interface Foo {
    readonly x: number;
    readonly [x: string]: Object;
}

class C {
    protected readonly y: number;
    readonly [x: string]: Object;
    private static readonly a = "foo"; 
    protected static readonly b = "foo"; 
    public static readonly c = "foo"; 
}

var z: {
    readonly a: string;
    readonly [x: string]: Object;
}

function f() {
    return {
        get x() { return 1; },
        get y() { return 1; },
        set y(value) { }
    }
}

function g() {
    var x: {
        readonly a: string;
        readonly [x: string]: Object;
    }
    return x;
}

//// [readonlyInDeclarationFile.js]
var C = (function () {
    function C() {
    }
    C.a = "foo";
    C.b = "foo";
    C.c = "foo";
    return C;
}());
var z;
function f() {
    return {
        get x() { return 1; },
        get y() { return 1; },
        set y(value) { }
    };
}
function g() {
    var x;
    return x;
}


//// [readonlyInDeclarationFile.d.ts]
interface Foo {
    readonly x: number;
    readonly [x: string]: Object;
}
declare class C {
    protected readonly y: number;
    readonly [x: string]: Object;
    private static readonly a;
    protected static readonly b: string;
    static readonly c: string;
}
declare var z: {
    readonly a: string;
    readonly [x: string]: Object;
};
declare function f(): {
    readonly x: number;
    y: number;
};
declare function g(): {
    readonly [x: string]: Object;
    readonly a: string;
};
