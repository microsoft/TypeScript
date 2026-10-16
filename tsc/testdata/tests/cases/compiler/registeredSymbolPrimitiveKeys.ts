// @target: es2020
// @strict: true
// @noEmit: true

type Assert<T extends true> = T;
type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends
    (<T>() => T extends B ? 1 : 2) ? true : false;

type AcceptedKeys = Assert<Equal<SymbolForKey, string | number | bigint | boolean | null | undefined>>;

const numberKey: RegisteredSymbol<1> = Symbol.for(1);
const bigintKey: RegisteredSymbol<1n> = Symbol.for(1n);
const stringKey: RegisteredSymbol<"1"> = Symbol.for("1");
const sameNumber: typeof stringKey = numberKey;
const sameBigint: typeof numberKey = bigintKey;
const sameString: typeof bigintKey = stringKey;
// @ts-expect-error A different canonical string has a different symbol.
const differentNumber: typeof numberKey = Symbol.for(2);
// @ts-expect-error ToString does not parse numeric strings.
const leadingZero: typeof numberKey = Symbol.for("01");

const zero: RegisteredSymbol<0> = Symbol.for(0);
const negativeZero: typeof zero = Symbol.for(-0);
const bigZero: typeof zero = Symbol.for(0n);
const largeNumber: RegisteredSymbol<1e21> = Symbol.for(1e21);
const largeString: RegisteredSymbol<"1e+21"> = largeNumber;
const negativeBigint: RegisteredSymbol<-1n> = Symbol.for(-1n);
const negativeString: RegisteredSymbol<"-1"> = negativeBigint;
const hugeBigint: RegisteredSymbol<9007199254740993n> = Symbol.for(9007199254740993n);
const hugeString: RegisteredSymbol<"9007199254740993"> = hugeBigint;

const trueKey: RegisteredSymbol<true> = Symbol.for(true);
const trueString: RegisteredSymbol<"true"> = trueKey;
const falseKey: RegisteredSymbol<false> = Symbol.for(false);
const falseString: RegisteredSymbol<"false"> = falseKey;
const nullKey: RegisteredSymbol<null> = Symbol.for(null);
const nullString: RegisteredSymbol<"null"> = nullKey;
const undefinedKey: RegisteredSymbol<undefined> = Symbol.for(undefined);
const undefinedString: RegisteredSymbol<"undefined"> = undefinedKey;
// @ts-expect-error null and undefined have different registry keys.
const differentNullish: typeof nullKey = undefinedKey;

declare const mixedKey: 1 | "2";
const mixed: RegisteredSymbol<"1" | 2n> = Symbol.for(mixedKey);
declare const aliasedKey: 1 | "1";
const aliased: RegisteredSymbol<"1"> = Symbol.for(aliasedKey);
declare const nullOrString: null | "null";
const aliasedNull: RegisteredSymbol<"null"> = Symbol.for(nullOrString);

declare const arbitraryNumber: number;
declare const arbitraryBigint: bigint;
declare const arbitraryBoolean: boolean;
const broadNumber: symbol = Symbol.for(arbitraryNumber);
const broadBigint: symbol = Symbol.for(arbitraryBigint);
const broadBoolean: symbol = Symbol.for(arbitraryBoolean);
const eitherBoolean: RegisteredSymbol<"true" | "false"> = Symbol.for(arbitraryBoolean);
declare const wideUnion: string | 1;
const broadUnion: symbol = Symbol.for(wideUnion);
// @ts-expect-error A broad number cannot have the identity of one registry key.
const unsoundNumber: typeof stringKey = Symbol.for(arbitraryNumber);
// @ts-expect-error A union containing arbitrary strings cannot have one identity.
const unsoundUnion: typeof stringKey = Symbol.for(wideUnion);

function fromGeneric<K extends SymbolForKey>(key: K): RegisteredSymbol<K> {
    return Symbol.for(key);
}
const genericNumber: RegisteredSymbol<"1"> = fromGeneric(1);

// @ts-expect-error A symbol primitive cannot be converted by ToString.
Symbol.for(Symbol());
// @ts-expect-error Object conversion can throw or depend on mutable methods.
Symbol.for({});
// @ts-expect-error A symbol is not a safe registry key.
type InvalidKey = RegisteredSymbol<symbol>;
