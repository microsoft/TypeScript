///<reference path="fourslash.ts" />

//// class LiteralClass {
////     /** Something generic */
////     static [key: `prefix${string}`]: any;
////     /** Something else */
////     static [key: `prefix${number}`]: number;
//// }
//// function literalClass(e: typeof LiteralClass) {
////     console.log(e./*literal1Class*/prefixMember); 
////     console.log(e./*literal2Class*/anything);
////     console.log(e./*literal3Class*/prefix0);
//// }

verify.quickInfoAt("literal1Class", "(index) LiteralClass[`prefix${string}`]: any", "Something generic");
verify.quickInfoAt("literal2Class", "any");
verify.quickInfoAt("literal3Class", "(index) LiteralClass[`prefix${string}` | `prefix${number}`]: any", "Something generic\nSomething else")