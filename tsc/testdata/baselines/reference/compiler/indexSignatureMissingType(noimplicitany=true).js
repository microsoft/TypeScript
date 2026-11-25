//// [tests/cases/compiler/indexSignatureMissingType.ts] ////

//// [indexSignatureMissingType.ts]
export interface I {
    [key: string];
}

export class C {
    readonly [key: number];
}

export type T = {
    [key: string]
    property: number;
};

export interface NumberIndex { [key: number]; }
export interface SymbolIndex { [key: symbol]; }
export interface TemplateIndex { [key: `prefix-${string}`]; }
export interface ExplicitAny { [key: string]: any; }
export interface ExplicitUnknown { [key: string]: unknown; }

declare const value: I;
export const asNumber: number = value.anyKey;
export const asString: string = value.anyKey;
export const indexedValue = value.anyKey;

declare const instance: C;
declare const numbers: NumberIndex;
declare const symbols: SymbolIndex;
declare const templates: TemplateIndex;
export const classValue = instance[0];
export const numberValue = numbers[0];
export const symbolValue = symbols[Symbol.iterator];
export const templateValue = templates["prefix-foo"];
instance[0] = 1;

interface OptionalParameter {
    [key?: string];
}

interface RestParameter {
    [...key: string[]];
}

interface MultipleParameters {
    [key: string, other: number];
}

interface InvalidKey {
    [key: boolean];
}

// @ts-ignore
interface Ignored { [key: string]; }

// @ts-expect-error
interface Expected { [key: boolean]; }


//// [indexSignatureMissingType.js]
export class C {
}
export const asNumber = value.anyKey;
export const asString = value.anyKey;
export const indexedValue = value.anyKey;
export const classValue = instance[0];
export const numberValue = numbers[0];
export const symbolValue = symbols[Symbol.iterator];
export const templateValue = templates["prefix-foo"];
instance[0] = 1;


//// [indexSignatureMissingType.d.ts]
export interface I {
    [key: string]: any;
}
export declare class C {
    readonly [key: number]: any;
}
export type T = {
    [key: string]: any;
    property: number;
};
export interface NumberIndex {
    [key: number]: any;
}
export interface SymbolIndex {
    [key: symbol]: any;
}
export interface TemplateIndex {
    [key: `prefix-${string}`]: any;
}
export interface ExplicitAny {
    [key: string]: any;
}
export interface ExplicitUnknown {
    [key: string]: unknown;
}
export declare const asNumber: number;
export declare const asString: string;
export declare const indexedValue: any;
export declare const classValue: any;
export declare const numberValue: any;
export declare const symbolValue: any;
export declare const templateValue: any;
