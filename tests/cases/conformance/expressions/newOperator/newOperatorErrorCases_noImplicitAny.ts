// @noImplicitAny: true

function fnNumber(this: void): number { return 90; }
new fnNumber(); // Error

function fnVoid(this: void): void {}
new fnVoid(); // Error

function functionVoidNoThis(): void {}
new functionVoidNoThis(); // Error
