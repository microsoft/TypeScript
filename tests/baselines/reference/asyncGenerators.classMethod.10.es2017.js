//// [asyncGenerators.classMethod.10.es2017.ts]
class C {
    async * f() {
        async function * await() {
        }
    }
}

//// [asyncGenerators.classMethod.10.es2017.js]
class C {
    async *f() {
        async function* () { }
        await ();
        {
        }
    }
}
