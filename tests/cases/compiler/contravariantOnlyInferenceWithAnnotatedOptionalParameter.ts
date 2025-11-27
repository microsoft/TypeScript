// @strict: true
// @noEmit: true

// repro https://github.com/microsoft/TypeScript/issues/55394

declare function filter<T>(predicate: (value: T, index: number) => boolean): T;
const a = filter((pose?: number) => true);
const b = filter((pose?: number, _?: number) => true);
