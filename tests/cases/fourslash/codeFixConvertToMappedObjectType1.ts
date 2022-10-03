/// <reference path='fourslash.ts' />

//// type K = "foo" | "bar";
//// interface SomeType {
////     a: string;
////     [prop: K]: any;
//// }

verify.codeFix({
    description: `Convert 'SomeType' to mapped object type`,
    newFileContent: `type K = "foo" | "bar";
type SomeType = {
    [prop in K]: any;
} & {
    a: string;
};`
})
