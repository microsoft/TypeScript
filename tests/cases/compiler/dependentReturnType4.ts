// @strict: true
// @noEmit: true
// @target: ES2022
// @exactOptionalPropertyTypes: true

// Test narrowing through `hasOwnProperty` calls
declare const rand: { a?: never };
type MissingType = typeof rand.a;
declare function takesString(x: string): void;
function hasOwnP<T extends string | MissingType>(obj: { a?: T }): T extends string ? 1 : T extends undefined ? 2 : 1 | 2 {
    if (obj.hasOwnProperty("a")) {
        takesString(obj.a);
        return 1;
    }
    return 2;
}