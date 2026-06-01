//// [tests/cases/compiler/isolatedDeclarationsThisParameterWithCapturedGeneric.ts] ////

//// [isolatedDeclarationsThisParameterWithCapturedGeneric.ts]
export function fromProviders<T>() {
  return {
    tearDown(this: {state: T}): void {}
  };
}

//// [isolatedDeclarationsThisParameterWithCapturedGeneric.js]
export function fromProviders() {
    return {
        tearDown() { }
    };
}


//// [isolatedDeclarationsThisParameterWithCapturedGeneric.d.ts]
export declare function fromProviders<T>(): {
    tearDown(this: {
        state: T;
    }): void;
};
