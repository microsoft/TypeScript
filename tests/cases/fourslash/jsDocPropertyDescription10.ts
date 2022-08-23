///<reference path="fourslash.ts" />

//// class MultipleClass {
////     /** Something generic */
////     [key: number | symbol | `data-${string}` | `data-${number}`]: string;
////     [key: string]: string;
//// }
//// function multipleClass(e: typeof MultipleClass) {
////     console.log(e./*multipleClass*/anything);
////     console.log(e./*multipleClass1*/something);
//// }

verify.quickInfoAt("multipleClass", "any");
