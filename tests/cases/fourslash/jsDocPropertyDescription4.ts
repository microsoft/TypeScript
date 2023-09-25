///<reference path="fourslash.ts" />

//// interface MultipleExample {
////     /** Something generic */
////     [key: string | number | symbol]: string;
//// }
//// function multipleExample(e: MultipleExample) {
////     console.log(e./*multiple*/anything);
//// }

verify.quickInfoAt("multiple", "(index) MultipleExample[string | number | symbol]: string", "Something generic");