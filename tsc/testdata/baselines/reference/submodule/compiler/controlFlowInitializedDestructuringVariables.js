//// [tests/cases/compiler/controlFlowInitializedDestructuringVariables.ts] ////

//// [controlFlowInitializedDestructuringVariables.ts]
declare const obj: { a?: string, b?: number };
const {
    a = "0",
    b = +a,
} = obj;


//// [controlFlowInitializedDestructuringVariables.js]
const { a = "0", b = +a, } = obj;
