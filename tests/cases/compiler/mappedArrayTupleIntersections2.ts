// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59849

type IdentitySpread<t extends readonly unknown[]> = [...{ [i in keyof t]: t[i] }];

type Result1 = IdentitySpread<{ name: string } & string[]>;
type Result2 = IdentitySpread<(string | number)[] & ['foo', string, 42]>;
type Result3 = IdentitySpread<[string | boolean, string | symbol, ...number[]] & ['foo', string, 43]>;
type Result4 = IdentitySpread<[string | boolean, boolean, ...number[]] & ['foo', string, 44]>;

type Box<T> = { value: T };
type BoxedSpread<t extends readonly unknown[]> = [...{ [i in keyof t]: Box<t[i]> }];

type Result5 = BoxedSpread<{ name: string } & string[]>;
type Result6 = BoxedSpread<(string | number)[] & ['foo', string, 42]>;
type Result7 = BoxedSpread<[string | boolean, string | symbol, ...number[]] & ['foo', string, 43]>;
type Result8 = BoxedSpread<[string | boolean, boolean, ...number[]] & ['foo', string, 44]>;
