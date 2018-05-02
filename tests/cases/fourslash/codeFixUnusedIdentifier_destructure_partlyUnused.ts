/// <reference path='fourslash.ts' />

// @noUnusedLocals: true

////{
////    const { x, y } = o;
////    x;
////}
////{
////    const { x, y } = o;
////    y;
////}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`{
    const { x } = o;
    x;
}
{
    const { y } = o;
    y;
}`,
});
