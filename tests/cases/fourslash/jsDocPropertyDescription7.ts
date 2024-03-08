///<reference path="fourslash.ts" />

//// class StringClass {
////     /** Something generic */
////     static [p: string]: any;
//// }
//// function stringClass(e: typeof StringClass) {
////     console.log(e./*stringClass*/anything);
//// }

verify.quickInfoAt("stringClass", "(index) StringClass[string]: any", "Something generic");