//// [tests/cases/compiler/classStaticPropertyTypeGuard.ts] ////

//// [classStaticPropertyTypeGuard.ts]
// Repro from #8923

class A {
    private static _a: string | undefined;

    public get a(): string {
        if (A._a) {
            return A._a; // is possibly null or undefined.
        }
        return A._a = 'helloworld';
    }
}

//// [classStaticPropertyTypeGuard.js]
class A {
    static _a;
    get a() {
        if (A._a) {
            return A._a;
        }
        return A._a = 'helloworld';
    }
}
