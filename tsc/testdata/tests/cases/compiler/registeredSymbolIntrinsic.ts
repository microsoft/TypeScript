// @target: es2015
// @noEmit: true

const foo = Symbol.for("foo");
const fooAgain = Symbol.for("foo");
const bar = Symbol.for("bar");

let sameStringKey: typeof foo = fooAgain;
let registeredStringKey: RegisteredSymbol<"foo"> = foo;
let registeredBarKey: RegisteredSymbol<"bar"> = bar;
let widenedSymbol: symbol = foo;

declare const key: string;
let registeredString: RegisteredSymbol<string> = Symbol.for(key);

interface WithRegisteredKeys {
    [foo]: string;
    [bar]: number;
}
