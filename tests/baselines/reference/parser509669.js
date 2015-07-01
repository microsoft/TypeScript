//// [parser509669.ts]
function foo():any {
 return ():void {};
}

//// [parser509669.js]
function foo() {
    return function () { };
}
