/// <reference path="fourslash.ts" />

//// var object: {
////     (bar: any): any;
////     new (bar: any): any;
////     [bar: any]: any;
////     bar: any;
////     foo(bar: any): any;
//// };
////object./**/

goTo.marker();
verify.memberListContains("bar", 'any');
verify.memberListContains("foo", '(bar: any): any');
