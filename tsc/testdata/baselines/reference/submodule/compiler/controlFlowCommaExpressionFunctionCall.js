//// [tests/cases/compiler/controlFlowCommaExpressionFunctionCall.ts] ////

//// [controlFlowCommaExpressionFunctionCall.ts]
const otherValue = () => true;
const value : number | string = null as any;

function isNumber(obj: any): obj is number {
    return true; // method implementation irrelevant
}

// Bad case - fails
if (isNumber((otherValue(), value))) {
    const b = value; // string | number , but should be number
}

//// [controlFlowCommaExpressionFunctionCall.js]
const otherValue = () => true;
const value = null;
function isNumber(obj) {
    return true;
}
if (isNumber((otherValue(), value))) {
    const b = value;
}
