/// <reference path='fourslash.ts' />

////type Either<T> = { val: T } | Error;
////interface I {
////    x: Either<Either<string>>;
////    foo(x: Either<Either<string>>): void;
////}
////class C implements I {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I"],
    index: 1,
    newFileContent:
`type Either<T> = { val: T } | Error;
interface I {
    x: Either<Either<string>>;
    foo(x: Either<Either<string>>): void;
}
class C implements I {
    x: Either<Either<string>>;
    foo(x: Either<Either<string>>): void {
        throw new Error("Method not implemented.");
    }
}`,
});
