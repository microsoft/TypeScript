/// <reference path='fourslash.ts' />

//// type K = "foo" | "bar";
//// interface Foo { }
//// interface SomeType extends Foo {
////     [prop: K]: any;
//// }

verify.codeFix({
    description: `Convert 'SomeType' to mapped object type`,
    newFileContent: `type K = "foo" | "bar";
interface Foo { }
type SomeType = Foo & {
    [prop in K]: any;
};`
})
