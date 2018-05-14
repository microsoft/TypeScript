/// <reference path="fourslash.ts"/>

////interface IFoo { }
////
////class testClass<T extends IFoo, U, M extends IFoo> {
////    constructor(a:T, b:U, c:M){ }
////}
////
////// Generic types
////testClass</*type1*/
////var x : testClass</*type2*/
////class Bar<T> extends testClass</*type3*/
////var x : testClass<,, /*type4*/any>;

// TODO: GH#23631

if (false) {
    verify.signatureHelp(
        {
            marker: ["type1", "type2", "type3"],
            text: "testClass<T extends IFoo, U, M extends IFoo>",
            parameterName: "T",
            parameterSpan: "T extends IFoo",
        },
        {
            marker: "type4",
            parameterName: "M",
            parameterSpan: "M extends IFoo",
        }
    );
}
