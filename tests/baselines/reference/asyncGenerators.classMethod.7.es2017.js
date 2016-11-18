//// [asyncGenerators.classMethod.7.es2017.ts]
class C {
    async * f(a = yield) {}
}

//// [asyncGenerators.classMethod.7.es2017.js]
class C {
    async *f(a = yield) { }
}
