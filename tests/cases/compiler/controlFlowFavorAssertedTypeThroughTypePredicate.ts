// @noEmit: true
// @strict: true

// repro 49988#issuecomment-1192016929

declare function isObject(value: unknown): value is Record<string, unknown>;

declare const obj1: {};
obj1;  // {}
if (isObject(obj1)) {
    obj1;  // Record<string, unknown>
    obj1['attr'];
}
obj1;  // Record<string, unknown>

declare const obj2: {} | undefined;
obj2;  // {} | undefined
if (isObject(obj2)) {
    obj2;  // Record<string, unknown>
    obj2['attr'];
}
obj2;  // Record<string, unknown> | undefined
