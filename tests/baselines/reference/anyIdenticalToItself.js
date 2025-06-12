//// [tests/cases/compiler/anyIdenticalToItself.ts] ////

//// [anyIdenticalToItself.ts]
function foo(x: any);
function foo(x: any);
function foo(x: any, y: number) { }

class C {
    get X(): any {
        var y: any;
        return y;
    }
    set X(v: any) {
    }
}

//// [anyIdenticalToItself.js]
function foo(x, y) { }
class C {
    get X() {
        var y;
        return y;
    }
    set X(v) {
    }
}
