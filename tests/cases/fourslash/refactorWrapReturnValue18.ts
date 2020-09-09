/// <reference path='fourslash.ts' />

//// function /*a*/foo/*b*/<T> (): T {
////     return {} as any as T;
//// }
//// foo();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Wrap return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `function foo<T> (): {
    /*RENAME*/value: T;
} {
    return { value: ({} as any as T) };
}
foo().value;`,
});

