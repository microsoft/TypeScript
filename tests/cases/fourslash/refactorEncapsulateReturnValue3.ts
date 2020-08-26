/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/foo/*b*/ () {
////         return 42;
////     }
//// }
//// declare const a: A;
//// a.foo();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Encapsulate return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `class A {
    foo () {
        return { /*RENAME*/value: 42 };
    }
}
declare const a: A;
a.foo().value;`,
});
