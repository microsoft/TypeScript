//// [tests/cases/compiler/declarationEmitStripInternalExpandoFunction.ts] ////

//// [declarationEmitStripInternalExpandoFunction.ts]
/** @internal */
export function internalFn(): string {
    return "hello";
}
internalFn.debugFlag = true;

export function publicFn(): void {}
publicFn.metadata = "public";


//// [declarationEmitStripInternalExpandoFunction.js]
/** @internal */
export function internalFn() {
    return "hello";
}
internalFn.debugFlag = true;
export function publicFn() { }
publicFn.metadata = "public";


//// [declarationEmitStripInternalExpandoFunction.d.ts]
export declare function publicFn(): void;
export declare namespace publicFn {
    var metadata: string;
}
