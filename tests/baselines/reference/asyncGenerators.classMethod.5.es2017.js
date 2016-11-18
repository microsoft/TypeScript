//// [asyncGenerators.classMethod.5.es2017.ts]
class C {
    async * f(yield) {}
}

//// [asyncGenerators.classMethod.5.es2017.js]
class C {
    async *f() { }
}
yield;
{ }
