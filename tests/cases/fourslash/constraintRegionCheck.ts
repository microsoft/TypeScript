/// <reference path="fourslash.ts" />

// @strict: true
// @Filename: index.ts

//// export {};
//// interface JsonArray extends Array<JsonValue> {}
//// interface JsonObject {
////   [prop: string]: JsonValue;
//// }
//// type JsonValue = boolean | string | number | JsonArray | JsonObject | null;
//// type Cons<T extends JsonValue> = T;
//// [|function foo<I extends any>(): Cons<I> {
////   return {} as any;
//// }|]
//// /*e*/

const [r0] = test.ranges();
// Baseline
const expected = test.getSemanticDiagnostics();

// Reset checker
goTo.marker("e");
edit.insert("  ");

verify.getRegionSemanticDiagnostics([r0], expected);
verify.getSemanticDiagnostics(expected);