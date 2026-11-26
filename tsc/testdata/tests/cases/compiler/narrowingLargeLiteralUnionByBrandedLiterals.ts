// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/65620

type D = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Key = `k.${D}${D}${D}${"0" | "1" | "2" | "3"}`; // 4,000 string literals

declare function assertBox<T>(t: T): asserts t is NonNullable<T> & { value: T };
declare const key: Key | undefined;
assertBox(key);
key.value;
