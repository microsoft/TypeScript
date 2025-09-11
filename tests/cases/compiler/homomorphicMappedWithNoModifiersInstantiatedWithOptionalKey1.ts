// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59987

type requiredKeyOf<o> = {
  [k in keyof o]-?: o extends { [_ in k]-?: o[k] } ? k : never;
}[keyof o];

type declared = {
  bar?: number;
} & {
  foo?: "default";
};

type requiredDeclaredKey = requiredKeyOf<declared>; // never

type distill<t> = t extends object ? distillMappable<t> : t;

type distillMappable<o> = {
  [k in keyof o as k extends inferredDefaultKeyOf<o> ? never : k]: distill<
    o[k]
  >;
} & {
  [k in inferredDefaultKeyOf<o>]?: distill<o[k]>;
};

type inferredDefaultKeyOf<o> = {
  [k in keyof o]: o[k] extends "default" ? k : never;
}[keyof o];

type distilled = distill<{
  foo: "default";
  bar?: number;
}>;

type requiredDistilledKey = requiredKeyOf<distilled>; // never

// simplified repro of the above
type IndirectKeys<T> = { [K in keyof T]: K }[keyof T];
type MappedBasedOnIndirectKeys<T> = {
  [K in IndirectKeys<T>]: unknown;
};
type AcceptPropertyKey<K extends PropertyKey> = K;
type Result = AcceptPropertyKey<keyof MappedBasedOnIndirectKeys<{ a?: string; b: number }>>; // "a" | "b"
