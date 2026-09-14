//// [tests/cases/conformance/es2026/jsonRawJSON3.ts] ////

//// [jsonRawJSON3.ts]
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


//// [jsonRawJSON3.js]
export const a = JSON.rawJSON("1");
export const b = { a };
export const c = [a];
export function f1() {
    return JSON.rawJSON("null");
}
export function f2(x) {
    return JSON.isRawJSON(x) ? x : undefined;
}
export function f3(x) {
    return x.rawJSON;
}
export class C {
    a = JSON.rawJSON("true");
}


//// [jsonRawJSON3.d.ts]
export declare const a: RawJSON;
export declare const b: {
    a: RawJSON;
};
export declare const c: RawJSON[];
export declare function f1(): RawJSON;
export declare function f2(x: unknown): RawJSON | undefined;
export declare function f3(x: RawJSON): string;
export declare class C {
    readonly a: RawJSON;
}
