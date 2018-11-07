/// <reference path='fourslash.ts' />

//// function /*z*/square/*y*/(arg: number) {
////     return arg*arg;
////     function foo (parm: number) { const loc = 42; return loc + parm; }
//// }
//// function bar (parm: number, loc: number) {
////     const someValue = square(2);
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar (parm: number, loc: number) {
    const arg = 2;
    function foo(parm: number) { const loc = 42; return loc + parm; }
    const someValue = arg * arg;
}`
});
