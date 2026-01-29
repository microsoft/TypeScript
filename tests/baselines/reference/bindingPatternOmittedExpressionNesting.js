//// [tests/cases/compiler/bindingPatternOmittedExpressionNesting.ts] ////

//// [bindingPatternOmittedExpressionNesting.ts]
export let [,,[,[],,[],]] = undefined as any;

//// [bindingPatternOmittedExpressionNesting.js]
export let [, , [, [], , [],]] = undefined;


//// [bindingPatternOmittedExpressionNesting.d.ts]
export {};
