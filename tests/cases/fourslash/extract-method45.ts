/// <reference path="fourslash.ts" />

////export function fn(m: number) {
////    const mode = m >= 0 ? "a" : "b";
////    let result: number = 0;
////
////    if (mode === "a") {
////        /*a*/for (let i = 0; i < 10; i++) {
////            const rand = Math.random();
////            if (rand > 0.5) {
////                result = rand;
////                break;
////            }
////        }/*b*/
////    }
////    else {
////        result = 0;
////    }
////
////    return result;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in module scope",
    newContent:
`export function fn(m: number) {
    const mode = m >= 0 ? "a" : "b";
    let result: number = 0;

    if (mode === "a") {
        result = /*RENAME*/newFunction(result);
    }
    else {
        result = 0;
    }

    return result;
}

function newFunction(result: number) {
    for (let i = 0; i < 10; i++) {
        const rand = Math.random();
        if (rand > 0.5) {
            result = rand;
            break;
        }
    }
    return result;
}
`
});
