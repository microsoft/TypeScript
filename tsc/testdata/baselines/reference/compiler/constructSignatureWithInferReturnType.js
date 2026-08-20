//// [tests/cases/compiler/constructSignatureWithInferReturnType.ts] ////

//// [constructSignatureWithInferReturnType.ts]
type ExtractReturn<T> = T extends { new(): infer R } ? R : never;


//// [constructSignatureWithInferReturnType.js]
"use strict";


//// [constructSignatureWithInferReturnType.d.ts]
type ExtractReturn<T> = T extends {
    new (): infer R;
} ? R : never;
