///<reference path="fourslash.ts" />

//// class MultipleClass {
////     /** Something generic */
////     [key: number | symbol | `data-${string}` | `data-${number}`]: string;
//// }
//// function multipleClass(e: typeof MultipleClass) {
////     console.log(e./*multipleClass*/anything);
//// }

verify.quickInfoAt("multipleClass", "any");
