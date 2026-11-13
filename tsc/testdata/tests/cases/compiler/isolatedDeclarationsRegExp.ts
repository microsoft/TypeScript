// @isolatedDeclarations: true
// @declaration: true
// @strict: true
// @target: esnext

// @filename: regexp.ts
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

// @filename: shadowed.ts
class RegExp {
    exec(): void {}
}
export const local: RegExp = new RegExp();
export const global = /not the local class/;

// @filename: typeShadowed.ts
type RegExp = string;
export const alias: RegExp = "";
export const globalType = /not the alias/;
