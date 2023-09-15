//// [tests/cases/compiler/parenthesisDoesNotBlockAliasSymbolCreation.ts] ////

//// [parenthesisDoesNotBlockAliasSymbolCreation.ts]
export type InvalidKeys<K extends string|number|symbol> = { [P in K]? : never };
export type InvalidKeys2<K extends string|number|symbol> = (
    { [P in K]? : never }
);

export type A<T> = (
    T & InvalidKeys<"a">
);
export type A2<T> = (
    T & InvalidKeys2<"a">
);

export const a = null as A<{ x : number }>;
export const a2 = null as A2<{ x : number }>;
export const a3 = null as { x : number } & InvalidKeys<"a">;
export const a4 = null as { x : number } & InvalidKeys2<"a">;


//// [parenthesisDoesNotBlockAliasSymbolCreation.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a4 = exports.a3 = exports.a2 = exports.a = void 0;
exports.a = null;
exports.a2 = null;
exports.a3 = null;
exports.a4 = null;


//// [parenthesisDoesNotBlockAliasSymbolCreation.d.ts]
export type InvalidKeys<K extends string | number | symbol> = {
    [P in K]?: never;
};
export type InvalidKeys2<K extends string | number | symbol> = ({
    [P in K]?: never;
});
export type A<T> = (T & InvalidKeys<"a">);
export type A2<T> = (T & InvalidKeys2<"a">);
export declare const a: A<{
    x: number;
}>;
export declare const a2: A2<{
    x: number;
}>;
export declare const a3: {
    x: number;
} & InvalidKeys<"a">;
export declare const a4: {
    x: number;
} & InvalidKeys2<"a">;
