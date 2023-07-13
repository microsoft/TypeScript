//// [tests/cases/conformance/es2020/bigintMissingES2020.ts] ////

//// [bigintMissingES2020.ts]
declare function test<A, B extends A>(): void;

test<{t?: string}, object>();
test<{t?: string}, bigint>();

// no error when bigint is used even when ES2020 lib is not present


//// [bigintMissingES2020.js]
test();
test();
// no error when bigint is used even when ES2020 lib is not present
