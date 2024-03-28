//// [tests/cases/compiler/declarationEmitTypeParamMergedWithPrivate.ts] ////

//// [declarationEmitTypeParamMergedWithPrivate.ts]
export class Test<T> {
    private get T(): T {
        throw "";
    }

    public test(): T {
        return null as any;
    }
}

//// [declarationEmitTypeParamMergedWithPrivate.js]
export class Test {
    get T() {
        throw "";
    }
    test() {
        return null;
    }
}


//// [declarationEmitTypeParamMergedWithPrivate.d.ts]
export declare class Test<T> {
    private get T();
    test(): T;
}
