/// <reference path='fourslash.ts' />

//// type Either<T> = { val: T } | Error;
//// interface I {
////     x: Either<Either<string>>;
////     foo(x: Either<Either<string>>): void;
//// }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    x: Either<Either<string>>;
    foo(x: Either<Either<string>>): void {
        throw new Error("Method not implemented.");
    }
`);

