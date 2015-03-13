/// <reference path="fourslash.ts" />

//// 
//// //_modes. // produces an internal error - please implement in derived class
//// 
//// module editor {
////  import modes = _modes;
////  
////  var i : modes.IMode;
////   
////  // If you just use p1:modes, the compiler accepts it - should be an error
////  class Bg {
////      constructor(p1: modes, p2: modes.Mode) {// should be an error on p2 - it's not exported
////      /*1*/}
////     
////  }
//// }
//// 

edit.disableFormatting();

goTo.marker('1');

edit.insert("         var x:modes.Mode;\n");
