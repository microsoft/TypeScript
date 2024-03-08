/// <reference path="fourslash.ts" />

////enum E {
////    A
////}
////let obj: Record<E, any> = {}

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newFileContent:
`enum E {
    A
}
let obj: Record<E, any> = {
    [E.A]: undefined
}`,
});
