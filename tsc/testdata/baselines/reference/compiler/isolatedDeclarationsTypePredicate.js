//// [tests/cases/compiler/isolatedDeclarationsTypePredicate.ts] ////

//// [isolatedDeclarationsTypePredicate.ts]
export function isString(value: unknown) {
  return typeof value === "string";
}

export function isExplicitString(value: unknown): value is string {
  return typeof value === "string";
}


//// [isolatedDeclarationsTypePredicate.js]
export function isString(value) {
    return typeof value === "string";
}
export function isExplicitString(value) {
    return typeof value === "string";
}


//// [isolatedDeclarationsTypePredicate.d.ts]
export declare function isString(value: unknown): value is string;
export declare function isExplicitString(value: unknown): value is string;
