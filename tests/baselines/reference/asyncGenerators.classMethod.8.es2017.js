//// [asyncGenerators.classMethod.8.es2017.ts]
class C {
    async * f() {
        async function * g() {
        }
    }
}

//// [asyncGenerators.classMethod.8.es2017.js]
class C {
    async *f() {
        async function* g() {
        }
    }
}
