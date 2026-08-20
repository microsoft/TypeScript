// @target: es2019
// @lib: dom,es2019
declare function test<A, B extends A>(): void;

test<{t?: string}, object>();
test<{t?: string}, bigint>();

// no error when bigint is used even when ES2020 lib is not present
