// @strict: true

type Source = "a" | "b" | "c" | "d" | 1 | 2 | 3 | 4;
type Candidate = "b" | "d" | 1 | 3;

declare const source: Source;
declare function isCandidate(value: Source): value is Candidate;

if (isCandidate(source)) {
    source;
}
