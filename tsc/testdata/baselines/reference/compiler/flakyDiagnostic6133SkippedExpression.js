//// [tests/cases/compiler/flakyDiagnostic6133SkippedExpression.ts] ////

//// [flakyDiagnostic6133SkippedExpression.ts]
const unused = { value: 1 };
export enum Example {
    [unused.value] = 0
}


//// [flakyDiagnostic6133SkippedExpression.js]
const unused = { value: 1 };
export var Example;
(function (Example) {
    Example[Example[unused.value] = 0] = unused.value;
})(Example || (Example = {}));


//// [flakyDiagnostic6133SkippedExpression.d.ts]
export declare enum Example {
    [unused.value] = 0
}
