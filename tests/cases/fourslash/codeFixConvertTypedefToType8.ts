/// <reference path='fourslash.ts' />

//// class Example {
////   /**
////    * List of items to be rendered in the bar chart
////    * @typedef {{ count: number }} Counter
////    * @returns {Counter}
////    */
////   get something() {
////     return { count: 0 };
////   }
//// }
////

verify.codeFix({
  description: ts.Diagnostics.Convert_typedef_to_TypeScript_type.message,
  index: 0,
  newFileContent: 
`type Counter = { count: number; };
class Example {
  /**
   * List of items to be rendered in the bar chart
   * 
   * @returns {Counter}
   */
  get something() {
    return { count: 0 };
  }
}
`,
});
