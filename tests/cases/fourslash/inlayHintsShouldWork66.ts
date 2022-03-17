/// <reference path="fourslash.ts" />

////interface IFoo {
////    bar(x?: boolean): void;
////}
////
////const a: IFoo = {
////    bar: function (x?/**/): void {
////        throw new Error("Function not implemented.");
////    }
////}

const [marker] = test.markers();
verify.getInlayHints([
    {
        text: ': boolean',
        position: marker.position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
