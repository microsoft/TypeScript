//// [keys.ts] ////
export const prop: unique symbol = Symbol();
export const method: unique symbol = Symbol();
export const accessor: unique symbol = Symbol();
export const dotted: unique symbol = Symbol();
export const stringKey: string = "key";
export const numberKey: number = 0;
//// [main.ts] ////
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
//// [keys.d.ts] ////
export declare const prop: unique symbol;
export declare const method: unique symbol;
export declare const accessor: unique symbol;
export declare const dotted: unique symbol;
export declare const stringKey: string;
export declare const numberKey: number;
//// [main.d.ts] ////
import { prop, method, accessor, stringKey, numberKey } from "./keys";
import * as keys from "./keys";
declare const localKey: unique symbol;
declare const literalKey = "literal";
export declare class MyClass {
    static readonly [keys.method] = true;
    [prop]: () => number;
    [keys.dotted]: number;
    [localKey]: number;
    [literalKey]: number;
    [stringKey]: number;
    [numberKey]: number;
    [method](value: number): number;
    get [accessor](): number;
    set [accessor](value: number);
}
export declare const object: {
    [prop]: number;
    [keys.method](value: number): number;
    get [accessor](): number;
    set [accessor](value: number);
    [localKey]: boolean;
    [literalKey]: string;
    [stringKey]: number;
    [numberKey]: number;
};
export declare const readonlyObject: {
    readonly [keys.prop]: 1;
    readonly nested: {
        readonly [localKey]: true;
    };
};
export declare function makeObject(): {
    [keys.prop]: number;
    nested: {
        [localKey]: boolean;
    };
};
export {};
