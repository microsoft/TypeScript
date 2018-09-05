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
////
////interface I<T> {}
////let i: I</*interface*/>;
////
////type Ty<T> = T;
////let t: Ty</*typeAlias*/>;

verify.signatureHelp(
    {
        marker: ["type1", "type2", "type3"],
        text: "testClass<T extends IFoo, U, M extends IFoo>",
        parameterName: "T",
        parameterSpan: "T extends IFoo",
        triggerReason: { kind: "characterTyped", triggerCharacter: "<" },
    },
    {
        marker: "type4",
        parameterName: "M",
        parameterSpan: "M extends IFoo",
        triggerReason: { kind: "characterTyped", triggerCharacter: "," },
    },
    {
        marker: "interface",
        text: "I<T>",
        parameterName: "T",
        parameterSpan: "T",
    },
    {
        marker: "typeAlias",
        text: "Ty<T>",
        parameterName: "T",
        parameterSpan: "T",
    },
);
