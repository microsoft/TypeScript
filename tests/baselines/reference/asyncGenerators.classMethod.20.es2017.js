//// [asyncGenerators.classMethod.20.es2017.ts]
class C {
    async * f() {
        var x: yield;
    }
}

//// [asyncGenerators.classMethod.20.es2017.js]
class C {
    async *f() {
        var x;
    }
}
