// @target: esnext
// @lib: es2025,es2026.json
// @module: esnext
// @declaration: true
// @strict: true

export const a = JSON.rawJSON("1");
export const b = { a };
export const c = [a];

export function f1() {
    return JSON.rawJSON("null");
}

export function f2(x: unknown) {
    return JSON.isRawJSON(x) ? x : undefined;
}

export function f3(x: RawJSON): string {
    return x.rawJSON;
}

export class C {
    readonly a = JSON.rawJSON("true");
}
