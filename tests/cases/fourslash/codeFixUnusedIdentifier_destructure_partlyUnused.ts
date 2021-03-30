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
////{
////    const { x, y, z } = o;
////    y;
////}
////{
////    const { x, y, z } = o;
////    x; z;
////}
////{
////    const [x, y] = o;
////    x;
////}
////{
////    const [x, y] = o;
////    y;
////}
////{
////    const [x, y, z] = o;
////    y;
////}
////{
////    const [x, y, z] = o;
////    x; z;
////}


verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent:
`{
    const { x } = o;
    x;
}
{
    const { y } = o;
    y;
}
{
    const { y } = o;
    y;
}
{
    const { x, z } = o;
    x; z;
}
{
    const [x, y] = o;
    x;
}
{
    const [x, y] = o;
    y;
}
{
    const [x, y, z] = o;
    y;
}
{
    const [x, y, z] = o;
    x; z;
}`,
});
