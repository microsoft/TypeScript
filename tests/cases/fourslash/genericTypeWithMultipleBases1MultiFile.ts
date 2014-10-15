/// <reference path='fourslash.ts'/>

// @Filename: genericTypeWithMultipleBases_0.ts
////interface iBaseScope {
////    watch: () => void;
////}
// @Filename: genericTypeWithMultipleBases_1.ts
////interface iMover {
////    moveUp: () => void;
////}
// @Filename: genericTypeWithMultipleBases_2.ts
////interface iScope<TModel> extends iBaseScope, iMover {
////    family: TModel;
////}
// @Filename: genericTypeWithMultipleBases_3.ts
////var x: iScope<number>;
// @Filename: genericTypeWithMultipleBases_4.ts
////x./**/

goTo.marker();
verify.completionListContains('watch', '(property) iBaseScope.watch: () => void');
verify.completionListContains('moveUp', '(property) iMover.moveUp: () => void');
verify.completionListContains('family', '(property) iScope<number>.family: number');
