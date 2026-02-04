//// [tests/cases/conformance/controlFlow/dependentDestructuredVariablesNoCrash3.ts] ////

//// [dependentDestructuredVariablesNoCrash3.ts]
// https://github.com/microsoft/TypeScript/issues/63093

const [r0Def, r0, r1Def, as, string, r1, r2, r3Def, r3]: boolean = (test as number < string > ).ranges();


//// [dependentDestructuredVariablesNoCrash3.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/63093
const [r0Def, r0, r1Def, as, string, r1, r2, r3Def, r3] = (test < string > ).ranges();


//// [dependentDestructuredVariablesNoCrash3.d.ts]
declare const r0Def: any, r0: any, r1Def: any, as: any, string: any, r1: any, r2: any, r3Def: any, r3: any;
