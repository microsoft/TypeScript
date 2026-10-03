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
let dynamic = Symbol.for(key);
let invalidDynamicKey: typeof foo = dynamic;

declare const unionKey: "foo" | "bar";
let registeredUnion: RegisteredSymbol<"foo" | "bar"> = Symbol.for(unionKey);
let invalidUnionKey: typeof foo = registeredUnion;

interface WithRegisteredKeys {
    [foo]: string;
    [bar]: number;
}
