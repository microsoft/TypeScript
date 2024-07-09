/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    constructor() {}
////}

verify.codeFix({
    description: "Add missing 'super()' call",
    newFileContent:
`class Base{
}
class C extends Base{
    constructor() {
        super();
    }
}`,
});
