// @strict: true
type A = { [index: string]: number | null };
declare const value: A;
if (value.foo !== null) {
    value.foo.toExponential()
}
