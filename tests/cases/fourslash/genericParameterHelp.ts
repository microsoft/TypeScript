/// <reference path="fourslash.ts"/>

////interface IFoo { }
////
////function testFunction<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): M {
////    return null;
////}
////
////// Function calls
////testFunction</*1*/
////testFunction<any, /*2*/
////testFunction<any, any, any>(/*3*/
////testFunction<any, any,/*4*/ any>(null, null, null);
////testFunction<, ,/*5*/>(null, null, null);

verify.signatureHelp(
    // TODO: GH#23631
    /*
    {
        marker: "1",
        text: "testFunction<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): M",
        parameterCount: 3,
        parameterName: "T",
        parameterSpan: "T extends IFoo",
    },
    { marker: "2", parameterName: "U", parameterSpan: "U" },
    */
    { marker: "3", parameterName: "a", parameterSpan: "a: any" },
    { marker: "4", parameterName: "M", parameterSpan: "M extends IFoo" },
    { marker: "5", parameterName: "M", parameterSpan: "M extends IFoo" },
);
