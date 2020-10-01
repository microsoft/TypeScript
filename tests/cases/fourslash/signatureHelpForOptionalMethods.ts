// #39672
// <reference path='fourslash.ts'/>
// @strict: true

//// interface Obj {
////     optionalMethod?: (current: any) => any;
//// };
////
//// const o: Obj = {
////   optionalMethod(/*1*/) {
////     return {};
////   }
//// };

verify.signatureHelp(
  {
      marker: "1",
      text: 'optionalMethod(current: any): any',
      parameterName: "current",
      parameterSpan: "current: any",
  },
);
