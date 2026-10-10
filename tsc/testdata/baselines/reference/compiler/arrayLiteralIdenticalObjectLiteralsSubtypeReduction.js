//// [tests/cases/compiler/arrayLiteralIdenticalObjectLiteralsSubtypeReduction.ts] ////

//// [data.json]
[
    { "code": "#f3dc00", "label": "526-G", "name": "Saharagelb" },
    { "code": "#f6ca00", "label": "527-G", "name": "Buttergelb" },
    { "name": "Primelgelb", "label": "504-G", "code": "#ffbe00" },
    { "name": "Rapsgelb", "label": 505, "code": "#ffb000" },
    { "code": "#ff9a00", "label": "506-G", "name": "Maisgelb" },
    { "code": "#ff8200", "label": "507-G", "name": null },
    { "code": "#ff6c00", "label": "508-G", "name": null, "extra": true },
    { "name": "Orangegelb", "label": 509, "code": "#ff5a00" }
]

//// [main.ts]
// https://github.com/microsoft/TypeScript/issues/48364
import data from "./data.json";

export const fromJson = data;

declare const o: { x: number };
declare const n: number;

export const differentOrder = [{ a: 1, b: "" }, { b: "", a: 1 }, { a: 2, b: "x" }];
export const optionalProperties = [{ a: 1, b: n > 0 ? "" : undefined }, { a: 2, b: n > 0 ? "x" : undefined }];
export const spreads = [{ ...o }, { ...o }, { ...o, y: "" }];
export const methods = [{ m() { return 1; } }, { m() { return 2; } }, { m() { return ""; } }];
export const accessors = [{ get a() { return 1; } }, { get a() { return 2; } }, { a: 3 }];
export const constAssertion = [{ a: 1 }, { a: 1 }, { a: 2 }] as const;


//// [main.js]
// https://github.com/microsoft/TypeScript/issues/48364
import data from "./data.json";
export const fromJson = data;
export const differentOrder = [{ a: 1, b: "" }, { b: "", a: 1 }, { a: 2, b: "x" }];
export const optionalProperties = [{ a: 1, b: n > 0 ? "" : undefined }, { a: 2, b: n > 0 ? "x" : undefined }];
export const spreads = [{ ...o }, { ...o }, { ...o, y: "" }];
export const methods = [{ m() { return 1; } }, { m() { return 2; } }, { m() { return ""; } }];
export const accessors = [{ get a() { return 1; } }, { get a() { return 2; } }, { a: 3 }];
export const constAssertion = [{ a: 1 }, { a: 1 }, { a: 2 }];


//// [main.d.ts]
export declare const fromJson: ({
    code: string;
    label: string;
    name: string;
    extra?: undefined;
} | {
    name: string;
    label: number;
    code: string;
    extra?: undefined;
} | {
    code: string;
    label: string;
    name: null;
    extra?: undefined;
} | {
    code: string;
    label: string;
    name: null;
    extra: boolean;
})[];
export declare const differentOrder: {
    a: number;
    b: string;
}[];
export declare const optionalProperties: {
    a: number;
    b: string | undefined;
}[];
export declare const spreads: ({
    x: number;
} | {
    x: number;
    y: string;
})[];
export declare const methods: ({
    m(): number;
} | {
    m(): string;
})[];
export declare const accessors: {
    readonly a: number;
}[];
export declare const constAssertion: readonly [{
    readonly a: 1;
}, {
    readonly a: 1;
}, {
    readonly a: 2;
}];
