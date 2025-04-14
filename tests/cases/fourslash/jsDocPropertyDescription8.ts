///<reference path="fourslash.ts" />

//// class SymbolClass {
////     /** Something generic */
////     static [p: symbol]: any;
//// }
//// function symbolClass(e: typeof SymbolClass) {
////     console.log(e./*symbolClass*/anything);
//// }

verify.quickInfoAt("symbolClass", "any");