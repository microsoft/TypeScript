//// [declarationEmitUnresolvedGenericAnnotations.ts] ////
import type { Box, Schema } from "./external";

export const identity = <T extends Schema>(value: Box<T>): Box<T> => value;
export const nullable = <T>(value: Box<T> | null): Box<T> | null => value;
export const conditional = <T>(value: T): T extends string ? Box<T> : T => null!;
export const mapped = <T>(value: T): { [K in keyof T]: Box<T[K]> } => null!;

export const methods = {
    identity<T extends Schema>(value: Box<T>): Box<T> {
        return value;
    },
    conditional<T>(value: T): T extends string ? Box<T> : T {
        return null!;
    }
};

export class Container<T extends Schema> {
    value: Box<T>;

    constructor(value: Box<T>) {
        this.value = value;
    }

    map<U extends Schema>(value: Box<U>): Box<U> {
        return value;
    }
}
//// [declarationEmitUnresolvedGenericAnnotations.d.ts] ////
import type { Box, Schema } from "./external";
export declare const identity: <T extends Schema>(value: Box<T>) => Box<T>;
export declare const nullable: <T>(value: Box<T> | null) => Box<T> | null;
export declare const conditional: <T>(value: T) => T extends string ? Box<T> : T;
export declare const mapped: <T>(value: T) => { [K in keyof T]: Box<T[K]>; };
export declare const methods: {
    identity<T extends Schema>(value: Box<T>): Box<T>;
    conditional<T>(value: T): T extends string ? Box<T> : T;
};
export declare class Container<T extends Schema> {
    value: Box<T>;
    constructor(value: Box<T>);
    map<U extends Schema>(value: Box<U>): Box<U>;
}
