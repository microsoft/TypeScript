// @strict: true
// @exactOptionalPropertyTypes: true, false
// @noEmit: true

// repro from #52494

declare const someVal: Required<{
    fn?(key: string): string | null;
}>;
someVal.fn("");

declare const someVal2: Required<{
    fn?: (key: string) => string | null;
}>;
someVal2.fn("");
