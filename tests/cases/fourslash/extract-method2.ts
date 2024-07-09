/// <reference path='fourslash.ts' />

//// namespace NS {
////     class Q {
////         foo() {
////             console.log('100');
////             const m = 10, j = "hello", k = {x: "what"};
////             const q = /*start*/m + j + k/*end*/;
////         }
////     }
//// }
goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_3",
    actionDescription: "Extract to function in global scope",
    newContent:
`namespace NS {
    class Q {
        foo() {
            console.log('100');
            const m = 10, j = "hello", k = {x: "what"};
            const q = /*RENAME*/newFunction(m, j, k);
        }
    }
}

function newFunction(m: number, j: string, k: { x: string; }) {
    return m + j + k;
}
`
});
