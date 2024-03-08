///<reference path="fourslash.ts" />

//// type SymbolAlias = {
////     /** Something generic */
////     [p: symbol]: string;
//// }
//// function symbolAlias(e: SymbolAlias) {
////     console.log(e./*symbolAlias*/anything);
//// }

verify.quickInfoAt("symbolAlias", "any");