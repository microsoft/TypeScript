//// [noImplicitAnyFunctions.ts]
declare function f1();

declare function f2(): any;

function f3(x) {
}

function f4(x: any) {
    return x;
}

function f5(x: any): any {
    return x;
}

function f6(x: string, y: number);
function f6(x: string, y: string): any;
function f6(x: string, y) {
    return null;
}

//// [noImplicitAnyFunctions.js]
function f3(x) {
}
function f4(x) {
    return x;
}
function f5(x) {
    return x;
}
function f6(x, y) {
    return null;
}
