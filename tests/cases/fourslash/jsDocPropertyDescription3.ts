///<reference path="fourslash.ts" />

//// interface LiteralExample {
////     /** Something generic */
////     [key: `data-${string}`]: string;
////      /** Something else */
////     [key: `prefix${number}`]: number;
//// }
//// function literalExample(e: LiteralExample) {
////     console.log(e./*literal*/anything);
//// }

verify.quickInfoAt("literal", "any");