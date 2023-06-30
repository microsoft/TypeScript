/// <reference path="fourslash.ts" />

////export function fn(x: number, y: number) {
////    /*a*/switch (x) {
////        case 1:
////            if (y) {
////                break;
////            }
////            x--;
////            break;
////    }/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in module scope",
    newContent:
`export function fn(x: number, y: number) {
    x = /*RENAME*/newFunction(x, y);
}

function newFunction(x: number, y: number) {
    switch (x) {
        case 1:
            if (y) {
                break;
            }
            x--;
            break;
    }
    return x;
}
`
});
