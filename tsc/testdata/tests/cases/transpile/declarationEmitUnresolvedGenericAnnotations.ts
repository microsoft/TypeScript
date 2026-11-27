// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

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
