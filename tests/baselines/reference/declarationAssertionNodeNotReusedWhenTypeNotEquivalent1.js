//// [tests/cases/compiler/declarationAssertionNodeNotReusedWhenTypeNotEquivalent1.ts] ////

//// [declarationAssertionNodeNotReusedWhenTypeNotEquivalent1.ts]
type Wrapper<T> = {
  _type: T;
};

declare function stringWrapper(): Wrapper<string>;

declare function objWrapper<T extends Record<string, Wrapper<any>>>(
  obj: T,
): Wrapper<T>;

const value = objWrapper({
  prop1: stringWrapper() as Wrapper<"hello">,
});

type Unwrap<T> = T extends Wrapper<any>
  ? T["_type"] extends Record<string, Wrapper<any>>
    ? { [Key in keyof T["_type"]]: Unwrap<T["_type"][Key]> }
    : T["_type"]
  : never;

declare function unwrap<T>(wrapper: T): Unwrap<T>;

export const unwrapped = unwrap(value);




//// [declarationAssertionNodeNotReusedWhenTypeNotEquivalent1.d.ts]
export declare const unwrapped: {
    prop1: "hello";
};
