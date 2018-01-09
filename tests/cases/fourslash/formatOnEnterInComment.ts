/// <reference path="fourslash.ts"/>

////   /**
////    * /*1*/
////    */

goTo.marker("1");
edit.insertLine("");
verify.currentFileContentIs(
`  /**
   * 

   */`
);