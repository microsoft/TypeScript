/// <reference path='fourslash.ts' />

////type Either<T> = { val: T } | Error;
////interface I {
////    x: Either<Either<string>>;
////    foo(x: Either<Either<string>>): void;
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    // TODO: GH#18445
    newFileContent:
`type Either<T> = { val: T } | Error;
interface I {
    x: Either<Either<string>>;
    foo(x: Either<Either<string>>): void;
}
class C implements I {\r
    x: Either<Either<string>>;\r
    foo(x: Either<Either<string>>): void {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});
