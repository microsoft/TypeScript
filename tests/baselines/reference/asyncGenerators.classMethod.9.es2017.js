//// [asyncGenerators.classMethod.9.es2017.ts]
class C {
    async * f() {
        async function * yield() {
        }
    }
}

//// [asyncGenerators.classMethod.9.es2017.js]
class C {
    async *f() {
        async function* () { }
        yield () => {
        };
    }
}
