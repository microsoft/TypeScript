/// <reference path="fourslash.ts" />

// @strict: true

//// function Builder<I>(def: I) {
////   return def;
//// }
////
//// interface IThing {
////   doThing: (args: { value: object }) => string
////   doAnotherThing: () => void
//// }
////
//// Builder<IThing>({
////   doThing(args: { value: object }) {
////     const { v/*1*/alue } = this.[|args|]
////     return `${value}`
////   },
////   doAnotherThing() { },
//// })

verify.quickInfoAt("1", "const value: any");
verify.getSemanticDiagnostics([{
  message: "Property 'args' does not exist on type 'IThing'.",
  code: 2339,
}]);
