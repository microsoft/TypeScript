// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63132

type KeyMap<T> = keyof T extends PropertyKey ? { [K in keyof T]: K } : never;
type X = KeyMap<number>;

type U = { a?: number; b: string } | { b: string; readonly c: boolean };
type MapStringOnly<T> = keyof T extends string ? { [K in keyof T]: [T[K]] } : never;
type Y = MapStringOnly<U>;
