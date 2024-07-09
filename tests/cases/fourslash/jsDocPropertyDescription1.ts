///<reference path="fourslash.ts" />

//// interface StringExample {
////     /** Something generic */
////     [p: string]: any; 
////     /** Something specific */
////     property: number;
//// }
//// function stringExample(e: StringExample) {
////     console.log(e./*property*/property);
////     console.log(e./*string*/anything); 
//// }

verify.quickInfoAt("property", "(property) StringExample.property: number", 'Something specific');
verify.quickInfoAt("string", "(index) StringExample[string]: any", "Something generic");