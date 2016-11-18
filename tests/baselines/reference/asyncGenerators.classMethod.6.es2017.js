//// [asyncGenerators.classMethod.6.es2017.ts]
class C {
    async * f(a = await 1) {}
}

//// [asyncGenerators.classMethod.6.es2017.js]
class C {
    async *f(a = await 1) { }
}
