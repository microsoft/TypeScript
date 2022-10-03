//// [contextualTypingOfObjectLiterals2.ts]
interface Foo {
    foo: (t: string) => string;
}
function f2(args: Foo) { }
f2({ foo: s => s.hmm }) // 's' should be 'string', so this should be an error

//// [contextualTypingOfObjectLiterals2.js]
function f2(args) { }
f2({ foo: function (s) { return s.hmm; } }); // 's' should be 'string', so this should be an error
