//// [tests/cases/compiler/isolatedDeclarationsRegExp.ts] ////

//// [regexp.ts]
export const re = /ab+c/gi;
export let reLet = /x/;
export var reVar = /y/d;

export const obj = {
    /** A pattern */
    pattern: /\d+/,
    nested: { inner: /[a-z]/u },
};

export const constObj = {
    pattern: /\d+/,
    list: [/a/, /b/],
} as const;

export function returnsRegExp() {
    return /ret/;
}

export const arrow = () => /arrow/;

export class C {
    field = /field/;
    optionalField? = /optional/;
    static staticField = /static/;
}

export function withDefault(pattern = /default/, flags: string): void {}
export const arrowWithDefault = (pattern = /default/, count: number): void => {};

//// [shadowed.ts]
class RegExp {
    exec(): void {}
}
export const local: RegExp = new RegExp();
export const global = /not the local class/;

//// [typeShadowed.ts]
type RegExp = string;
export const alias: RegExp = "";
export const globalType = /not the alias/;


//// [regexp.js]
export const re = /ab+c/gi;
export let reLet = /x/;
export var reVar = /y/d;
export const obj = {
    /** A pattern */
    pattern: /\d+/,
    nested: { inner: /[a-z]/u },
};
export const constObj = {
    pattern: /\d+/,
    list: [/a/, /b/],
};
export function returnsRegExp() {
    return /ret/;
}
export const arrow = () => /arrow/;
export class C {
    field = /field/;
    optionalField = /optional/;
    static staticField = /static/;
}
export function withDefault(pattern = /default/, flags) { }
export const arrowWithDefault = (pattern = /default/, count) => { };
//// [shadowed.js]
class RegExp {
    exec() { }
}
export const local = new RegExp();
export const global = /not the local class/;
//// [typeShadowed.js]
export const alias = "";
export const globalType = /not the alias/;


//// [regexp.d.ts]
export declare const re: RegExp;
export declare let reLet: RegExp;
export declare var reVar: RegExp;
export declare const obj: {
    /** A pattern */
    pattern: RegExp;
    nested: {
        inner: RegExp;
    };
};
export declare const constObj: {
    readonly pattern: RegExp;
    readonly list: readonly [RegExp, RegExp];
};
export declare function returnsRegExp(): RegExp;
export declare const arrow: () => RegExp;
export declare class C {
    field: RegExp;
    optionalField?: RegExp | undefined;
    static staticField: RegExp;
}
export declare function withDefault(pattern: RegExp | undefined, flags: string): void;
export declare const arrowWithDefault: (pattern: RegExp | undefined, count: number) => void;
//// [shadowed.d.ts]
declare class RegExp {
    exec(): void;
}
export declare const local: RegExp;
export declare const global: globalThis.RegExp;
export {};
//// [typeShadowed.d.ts]
type RegExp = string;
export declare const alias: RegExp;
export declare const globalType: globalThis.RegExp;
export {};
