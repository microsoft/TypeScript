/// <reference path='fourslash.ts' />

//// type K = "foo" | "bar";
//// interface Foo { }
//// interface Bar { }
//// interface SomeType extends Foo, Bar {
////     a: number;
////     [prop: K]: any;
//// }

verify.codeFix({
    description: `Convert 'SomeType' to mapped object type`,
    newFileContent: `type K = "foo" | "bar";
interface Foo { }
interface Bar { }
type SomeType = Foo & Bar & {
    [prop in K]: any;
} & {
    a: number;
};`
})
