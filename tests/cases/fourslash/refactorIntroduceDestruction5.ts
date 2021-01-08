/// <reference path='fourslash.ts' />

//// declare const u: { type: 'number'; payload: number } | { type: 'string', payload: number }
//// if(/*a*/u/*b*/.type === "number") {
////     u.payload.toExponential
//// } else {
////     u.payload.toFixed
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `declare const u: { type: 'number'; payload: number } | { type: 'string', payload: number }
const { type, payload } = u
if(type === "number") {
    payload.toExponential
} else {
    payload.toFixed
}`,
});
