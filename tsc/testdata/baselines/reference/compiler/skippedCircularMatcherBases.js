//// [tests/cases/compiler/skippedCircularMatcherBases.ts] ////

//// [matchers.d.ts]
interface Expect extends Matchers {}
interface MatcherResult<Result> {}
interface Matchers {
    containing(value: string): unknown;
}
interface Matchers extends MatcherResult<ReturnType<typeof expect.containing>> {}
declare const expect: Expect;

//// [main.ts]
expect.containing("value");


//// [main.js]
"use strict";
expect.containing("value");
