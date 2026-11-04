// @skipLibCheck: true
// @strict: true

// @filename: matchers.d.ts
interface Expect extends Matchers {}
interface MatcherResult<Result> {}
interface Matchers {
    containing(value: string): unknown;
}
interface Matchers extends MatcherResult<ReturnType<typeof expect.containing>> {}
declare const expect: Expect;

// @filename: main.ts
expect.containing("value");
