// @target: es5
// @declaration: true

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