/// <reference path='fourslash.ts' />
// @strict: true
//// /*1*/m({ foo: /*2*/$("foo") });
//// m({ foo: /*3*/$("foo") });
//// declare const m: <S extends string>(s: { [_ in S]: { $: NoInfer<S> } }) => void
//// declare const $: <S, T extends S>(s: T) => { $: S }
//// type NoInfer<T> = [T][T extends any ? 0 : never];

verify.quickInfoAt("1", `const m: <"foo">(s: {
    foo: {
        $: "foo";
    };
}) => void`);

// the exact generic type params are not important in this test (they could change with changes to the inference algorithm)
// it's important though that they both display the same types
verify.quickInfoAt("2", `const $: <unknown, string>(s: string) => {
    $: unknown;
}`);
verify.quickInfoAt("3", `const $: <unknown, string>(s: string) => {
    $: unknown;
}`);
