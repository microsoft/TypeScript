/// <reference path='fourslash.ts' />

//// class testClass {
////     /*a*/static foo/*b*/(actual: number) {
////         return actual;
////     }
//// }
//// [1].map(testClass.foo);
//// [2].map(testClass["foo"]);


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
[1].map(testClass.foo);
[2].map(testClass["foo"]);`
});