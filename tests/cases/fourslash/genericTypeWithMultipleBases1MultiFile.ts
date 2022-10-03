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

verify.completions({
    marker: "",
    includes: [
        { name: "watch", text: "(property) iBaseScope.watch: () => void" },
        { name: "moveUp", text: "(property) iMover.moveUp: () => void" },
        { name: "family", text: "(property) iScope<number>.family: number" },
    ],
});
