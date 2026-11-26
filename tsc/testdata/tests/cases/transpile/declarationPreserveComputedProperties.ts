// @declaration: true
// @isolatedDeclarations: true
// @strict: true
// @target: esnext

// @filename: keys.ts
export const prop: unique symbol = Symbol();
export const method: unique symbol = Symbol();
export const accessor: unique symbol = Symbol();
export const dotted: unique symbol = Symbol();
export const stringKey: string = "key";
export const numberKey: number = 0;

// @filename: main.ts
import { prop, method, accessor, stringKey, numberKey } from "./keys";
import * as keys from "./keys";

const localKey: unique symbol = Symbol();
const literalKey = "literal";

export class MyClass {
    static readonly [keys.method] = true;
    [prop] = (): number => Math.random();
    [keys.dotted]: number = 1;
    [localKey] = 1;
    [literalKey] = 1;
    [stringKey]: number = 1;
    [numberKey]: number = 1;
    [method](value: number): number { return value; }
    get [accessor](): number { return 1; }
    set [accessor](value: number) {}
}

export const object = {
    [prop]: 1,
    [keys.method](value: number): number { return value; },
    get [accessor](): number { return 1; },
    set [accessor](value: number) {},
    [localKey]: true,
    [literalKey]: "value",
    [stringKey]: 1,
    [numberKey]: 1,
};

export const readonlyObject = {
    [keys.prop]: 1,
    nested: { [localKey]: true },
} as const;

export function makeObject() {
    return { [keys.prop]: 1, nested: { [localKey]: true } };
}
