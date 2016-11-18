//// [asyncGenerators.classMethod.4.es2017.ts]
class C {
    async * f(await) {}
}

//// [asyncGenerators.classMethod.4.es2017.js]
class C {
    async *f() { }
}
await;
{ }
