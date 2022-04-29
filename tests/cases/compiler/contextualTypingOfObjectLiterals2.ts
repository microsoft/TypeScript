interface Foo {
    foo: (t: string) => string;
}
function f2(args: Foo) { }
f2({ foo: s => s.hmm }) // 's' should be 'string', so this should be an error