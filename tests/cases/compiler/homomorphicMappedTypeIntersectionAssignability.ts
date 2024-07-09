// @strict: true
function f<TType>(
    a: { weak?: string } & Readonly<TType> & { name: "ok" },
    b: Readonly<TType & { name: string }>,
    c: Readonly<TType> & { name: string }) {
    c = a; // Works
    b = a; // Should also work
}
