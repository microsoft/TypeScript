//// [tests/cases/compiler/bindingPatternOmittedExpressionNesting.ts] ////

//// [bindingPatternOmittedExpressionNesting.ts]
export let [,,[,[],,[],]] = undefined as any;

//// [bindingPatternOmittedExpressionNesting.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
[, , [, [], , []]] = undefined;
