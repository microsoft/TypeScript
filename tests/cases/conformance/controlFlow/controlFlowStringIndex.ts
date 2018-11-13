// @strict: true
type A = {
    other: number | null;
    [index: string]: number | null
};
declare const value: A;
if (value.foo !== null) {
    value.foo.toExponential()
    value.other // should still be number | null
    value.bar // should still be number | null
}
