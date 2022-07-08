///<reference path="fourslash.ts" />

//// export interface StringExample {
////    /** Something generic */
////   [p: string]: any;
////    /** Something specific */
////    property: number;
//// }

//// function stringExample(e: StringExample) {
////   console.log(e./*property*/property); // works, shows type and description on hover
////   console.log(e./*string*/anything); // shows type of property but not description on hover
//// }

////export interface SymbolExample {
////  /** Something generic */
////    [key: symbol]: string;
////}

//// function symbolExample(e: SymbolExample) {
////   console.log(e./*symbol*/anything);
//// }

////export interface LiteralExample {
////  /** Something generic */
////    [key: `data-${string}`]: string;
////}

//// function literalExample(e: LiteralExample) {
////    console.log(e./*literal*/anything);
//// }

////export interface MultipleExample {
////  /** Something generic */
////    [key: string | number | symbol]: string;
////}

//// function multipleExample(e: MultipleExample) {
////    console.log(e./*multiple*/anything);
//// }

////export interface Multiple1Example {
////  /** Something generic */
////    [key: number | symbol | `data-${string}` | `data-${number}`]: string;
////}

//// function multiple1Example(e: Multiple1Example) {
////    console.log(e./*multiple1*/anything);
//// }

verify.quickInfoAt("property", "(property) StringExample.property: number",'Something specific')
verify.quickInfoAt("string", "(index) StringExample[string]: any","Something generic")
verify.quickInfoAt("literal", "(index) LiteralExample[`data-${string}`]: string","Something generic")
verify.quickInfoAt("symbol", "(index) SymbolExample[symbol]: string","Something generic")
verify.quickInfoAt("multiple", "(index) MultipleExample[string | number | symbol]: string","Something generic")
verify.quickInfoAt("multiple1", "(index) Multiple1Example[number | symbol | `data-${string}` | `data-${number}`]: string","Something generic")