/// <reference path='fourslash.ts' />

//// type K = "foo" | "bar";
//// interface Foo { }
//// interface Bar<T> { bar: T; }
//// interface SomeType<T> extends Foo, Bar<T> {
////     a: number;
////     b: T;
////     readonly [prop: K]: any;
//// }

verify.codeFix({
    description: `Convert 'SomeType' to mapped object type`,
    newFileContent: `type K = "foo" | "bar";
interface Foo { }
interface Bar<T> { bar: T; }
type SomeType<T> = Foo & Bar<T> & {
    readonly [prop in K]: any;
} & {
    a: number;
    b: T;
};`
})
