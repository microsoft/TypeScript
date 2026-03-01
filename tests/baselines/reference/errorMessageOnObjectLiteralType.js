//// [tests/cases/compiler/errorMessageOnObjectLiteralType.ts] ////

//// [errorMessageOnObjectLiteralType.ts]
declare var x: {
    a: string;
    b: number;
};
x.getOwnPropertyNamess();
Object.getOwnPropertyNamess(null);

//// [errorMessageOnObjectLiteralType.js]
"use strict";
x.getOwnPropertyNamess();
Object.getOwnPropertyNamess(null);
