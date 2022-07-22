// @strict: true
// @declaration: true

// Repro from #49988

declare function isObject(value: unknown): value is Record<string, unknown>;
const obj = {};
if (isObject(obj)) {
    obj['attr'];
}
