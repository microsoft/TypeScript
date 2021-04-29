/// <reference path='fourslash.ts' />

//// /*start*/let value: string;
//// switch (Date.now()) {
////     case 1:
////         value = 'foo';
////         break;
////     default:
////         value = 'bar';
////         break;
//// }/*end*/
////
//// console.log(value);

goTo.select("start", "end");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent:
`let value: string = /*RENAME*/newFunction();

console.log(value);

function newFunction() {
    let value: string;
    switch (Date.now()) {
        case 1:
            value = 'foo';
            break;
        default:
            value = 'bar';
            break;
    }
    return value;
}
`
});
