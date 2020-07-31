/// <reference path='fourslash.ts' />

//// declare const u: { type: 'number'; payload: number } | { type: 'string', payload: number }
//// if(/*a*/u/*b*/.type === "number") {
////     u.payload.toExponential
//// } else {
////     u.payload.toFixed
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `declare const u: { type: 'number'; payload: number } | { type: 'string', payload: number }
const { type, payload } = u
if(type === "number") {
    payload.toExponential
} else {
    payload.toFixed
}`,
});
