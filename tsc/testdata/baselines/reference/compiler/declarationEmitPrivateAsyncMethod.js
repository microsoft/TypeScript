//// [tests/cases/compiler/declarationEmitPrivateAsyncMethod.ts] ////

//// [a.ts]
export class C {
    /**
     * Non Async function
     */
    private a(): void {
    }

    /**
     * Async function
     */
    private async b(): Promise<void> {
    }
}


//// [a.js]
export class C {
    /**
     * Non Async function
     */
    a() {
    }
    /**
     * Async function
     */
    async b() {
    }
}


//// [a.d.ts]
export declare class C {
    /**
     * Non Async function
     */
    private a;
    /**
     * Async function
     */
    private b;
}
