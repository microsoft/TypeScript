/// <reference path="fourslash.ts" />

////interface IFoo {
////    bar(x?: boolean): void;
////}
////
////const a: IFoo = {
////    bar: function (x?): void {
////        throw new Error("Function not implemented.");
////    }
////}

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
