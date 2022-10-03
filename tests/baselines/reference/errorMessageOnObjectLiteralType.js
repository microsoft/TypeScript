//// [errorMessageOnObjectLiteralType.ts]
var x: {
    a: string;
    b: number;
};
x.getOwnPropertyNamess();
Object.getOwnPropertyNamess(null);

//// [errorMessageOnObjectLiteralType.js]
var x;
x.getOwnPropertyNamess();
Object.getOwnPropertyNamess(null);
