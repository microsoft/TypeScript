/// <reference path='fourslash.ts' />

//// type K = "foo" | "bar";
//// type SomeType = {
////     [prop: K]: any;
//// }

verify.codeFix({
    description: `Convert 'SomeType' to mapped object type`,
    newFileContent: `type K = "foo" | "bar";
type SomeType = {
    [prop in K]: any;
};`
})
