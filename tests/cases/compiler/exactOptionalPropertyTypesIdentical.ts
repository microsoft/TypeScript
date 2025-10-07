// @strictNullChecks: true
// @exactOptionalPropertyTypes: true

export let a: <T>() => T extends {a?: string} ? 0 : 1 = null!;
export let b: <T>() => T extends {a?: string | undefined} ? 0 : 1 = a;
