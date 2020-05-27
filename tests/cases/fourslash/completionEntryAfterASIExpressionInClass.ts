/// <reference path='fourslash.ts'/>

//// class Parent {
////   protected shouldWork() {
////       console.log();
////   }
//// }
//// 
//// class Child extends Parent {
////             // this assumes ASI, but on next line wants to  
////   x = () => 1
////   shoul/*insideid*/ 
//// }
////
//// class ChildTwo extends Parent {
////             // this assumes ASI, but on next line wants to  
////   x = () => 1
////   /*root*/ //nothing
//// }

verify.completions({ marker: ["insideid", "root"], includes: "shouldWork", isNewIdentifierLocation: true });
