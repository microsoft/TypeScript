/// <reference path="fourslash.ts" />

//// interface State {
////     name: string;
////     length: number;
////     foo?: number;
//// }
//// 
//// let ss: partial State;
//// if (ss.name/*1*/) {
////     ss/*2*/
//// }

goTo.marker('1');
edit.insert('.');
verify.completionListContains('substr');
edit.backspace();
goTo.marker('2');
edit.insert('.');
verify.completionListContains('name');
verify.completionListContains('length');
verify.completionListContains('foo');
