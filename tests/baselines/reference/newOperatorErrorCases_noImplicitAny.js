//// [newOperatorErrorCases_noImplicitAny.ts]
function fnNumber(this: void): number { return 90; }
new fnNumber(); // Error

function fnVoid(this: void): void {}
new fnVoid(); // Error

function functionVoidNoThis(): void {}
new functionVoidNoThis(); // Error


//// [newOperatorErrorCases_noImplicitAny.js]
function fnNumber() { return 90; }
new fnNumber(); // Error
function fnVoid() { }
new fnVoid(); // Error
function functionVoidNoThis() { }
new functionVoidNoThis(); // Error
