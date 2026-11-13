//// [tests/cases/compiler/noFlakyDiagnosticsBindingPatternInFunctionType1.ts] ////

//// [noFlakyDiagnosticsBindingPatternInFunctionType1.ts]
class Base<T> {}
export class C extends Base<{ e: ({ a: boolean }) => void }> {}


//// [noFlakyDiagnosticsBindingPatternInFunctionType1.js]
class Base {
}
export class C extends Base {
}


//// [noFlakyDiagnosticsBindingPatternInFunctionType1.d.ts]
declare class Base<T> {
}
export declare class C extends Base<{
    e: ({ a: boolean }: {
        a: any;
    }) => void;
}> {
}
export {};
