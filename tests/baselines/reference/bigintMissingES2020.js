//// [bigintMissingES2020.ts]
declare function test<A, B extends A>(): void;

test<{t?: string}, object>();
test<{t?: string}, bigint>();

// should have global error when bigint is used but ES2020 lib is not present


//// [bigintMissingES2020.js]
test();
test();
// should have global error when bigint is used but ES2020 lib is not present
