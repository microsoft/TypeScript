/// <reference path='fourslash.ts' />

//// class testClass {
////     /*a*/static foo/*b*/(actual: number) {
////         return actual;
////     }
//// }
//// const x = testClass.foo;
//// [1].map(x);
//// const y = testClass["foo"];
//// [2].map(y);





goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: 
`class testClass {
    static foo({ actual }: { actual: number; }) {
        return actual;
    }
}
const x = testClass.foo;
[1].map(x);
const y = testClass["foo"];
[2].map(y);`
});