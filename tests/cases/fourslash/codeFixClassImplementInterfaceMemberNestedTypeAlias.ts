/// <reference path='fourslash.ts' />

////type Either<T> = { val: T } | Error;
////interface I {
////    x: Either<Either<string>>;
////    foo(x: Either<Either<string>>): void;
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
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
