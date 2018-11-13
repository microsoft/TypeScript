/// <reference path='fourslash.ts' />

////abstract class A<T> {
////    abstract f(x: T): T;
////}
////
////class C<U> extends A<U> {}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A<T> {
    abstract f(x: T): T;
}

class C<U> extends A<U> {
    f(x: U): U {
        throw new Error("Method not implemented.");
    }
}`
});
