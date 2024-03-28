/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function foo() {
////    class Foo { function bar() { } }
////    return Foo;
////}

// @Filename: /b.ts
////import * as a from "./a";
////const /*a*/foo/*b*/ = a.foo();
////new foo.bar();

goTo.file("/b.ts");
goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `import * as a from "./a";
new (a.foo()).bar();`
});
