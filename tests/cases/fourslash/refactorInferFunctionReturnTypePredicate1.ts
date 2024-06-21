/// <reference path='fourslash.ts' />

//// function /*a*//*b*/isString(value: unknown) {
////   return typeof value === "string";
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`function isString(value: unknown): value is string {
  return typeof value === "string";
}`
});
