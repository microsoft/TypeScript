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

goTo.marker();
verify.completionListContains('watch', '(property) iBaseScope.watch: () => void');
verify.completionListContains('moveUp', '(property) iMover.moveUp: () => void');
verify.completionListContains('family', '(property) iScope<number>.family: number');