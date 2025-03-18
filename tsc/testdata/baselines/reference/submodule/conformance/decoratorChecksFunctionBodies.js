//// [tests/cases/conformance/decorators/class/decoratorChecksFunctionBodies.ts] ////

//// [decoratorChecksFunctionBodies.ts]
// from #2971
function func(s: string): void {
}

class A {
    @((x, p, d) => {
        var a = 3;
        func(a);
        return d;
    })
    m() {

    }
}

//// [decoratorChecksFunctionBodies.js]
function func(s) {
}
class A {
    @((x, p, d) => {
        var a = 3;
        func(a);
        return d;
    })
    m() {
    }
}
