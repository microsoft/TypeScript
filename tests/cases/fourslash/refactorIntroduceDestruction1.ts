/// <reference path='fourslash.ts' />

//// declare const un: { type: 'number'; payload: number } | { type: 'string', payload: number }
//// if(/*a*/un/*b*/.type === "number") {
////     un.payload.toExponential
//// } else {
////     un.payload.toFixed
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `declare const un: { type: 'number'; payload: number } | { type: 'string', payload: number }
const { type, payload } = un
if(type === "number") {
    payload.toExponential
} else {
    payload.toFixed
}`,
});
