//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-missingEmitHelpers-staticComputedGetter.ts] ////

//// [main.ts]
export {}

declare var dec: any;
declare var x: any;

// needs: __esDecorate, __runInitializers, __propKey
class C {
    @dec static get [x]() { return 1; }
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
    @dec
    static get [x]() { return 1; }
}
