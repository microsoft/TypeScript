/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    constructor() {}
////}

verify.codeFix({
    description: "Add missing 'super()' call",
    // TODO: GH#18445
    newFileContent:
`class Base{
}
class C extends Base{
    constructor() {\r
        super();\r
    }
}`,
});
