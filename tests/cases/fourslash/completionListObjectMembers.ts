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
verify.completionListContains("bar", '(property) bar: any');
verify.completionListContains("foo", '(method) foo(bar: any): any');
