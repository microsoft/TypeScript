/// <reference path='fourslash.ts' />

//// const item = {
////     a: {
////         b: {
////             c: 1
////         }
////     }
//// }
//// /*a*/item.a/*b*/.b.c // left of b.c
//// item.a.b.c // another reference

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: "Convert access to destruction",
    newContent: `const item = {
    a: {
        b: {
            c: 1
        }
    }
}
const { b } = item.a
b.c // left of b.c
b.c // another reference`,
});


