/// <reference path='fourslash.ts' />

//// type K = "foo" | "bar";
//// interface Foo { }
//// interface Bar<T> { bar: T; }
//// interface SomeType extends Foo, Bar<number> {
////     a: number;
////     [prop: K]: any;
//// }

verify.codeFix({
    description: `Convert 'SomeType' to mapped object type`,
    newFileContent: `type K = "foo" | "bar";
interface Foo { }
interface Bar<T> { bar: T; }
type SomeType = Foo & Bar<number> & {
    [prop in K]: any;
} & {
    a: number;
};`
})
