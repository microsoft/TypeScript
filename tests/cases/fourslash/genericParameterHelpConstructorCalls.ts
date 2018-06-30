/// <reference path="fourslash.ts"/>

////interface IFoo { }
////
////class testClass<T extends IFoo, U, M extends IFoo> {
////    constructor(a:T, b:U, c:M){ }
////}
////
////// Constructor calls
////new testClass</*constructor1*/
////new testClass<IFoo, /*constructor2*/
////new testClass</*constructor3*/>(null, null, null)
////new testClass<,,/*constructor4*/>(null, null, null)
////new testClass<IFoo,/*constructor5*/IFoo,IFoo>(null, null, null)

verify.signatureHelp(
    // TODO: GH#23631
    /*
    {
        marker: "constructor1",
        text: "testClass<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): testClass<T, U, M>",
        parameterName: "T",
        parameterSpan: "T extends IFoo",
    },
    {
        marker: "constructor2",
        parameterName: "U",
        parameterSpan: "U",
    },
    */
   { marker: "constructor3", parameterName: "T", parameterSpan: "T extends IFoo" },
   { marker: "constructor4", parameterName: "M", parameterSpan: "M extends IFoo" },
   { marker: "constructor5", parameterName: "U", parameterSpan: "U" },
);
