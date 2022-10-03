/// <reference path='fourslash.ts'/>

////export interface iBaseScope {
////    watch: () => void;
////}
////export interface iMover {
////    moveUp: () => void;
////}
////export interface iScope<TModel> extends iBaseScope, iMover {
////    family: TModel;
////}
////var x: iScope<number>;
////x./**/

verify.completions({
    marker: "",
    exact: [
        { name: "family", text: "(property) iScope<number>.family: number" },
        { name: "moveUp", text: "(property) iMover.moveUp: () => void" },
        { name: "watch", text: "(property) iBaseScope.watch: () => void" },
    ],
});
