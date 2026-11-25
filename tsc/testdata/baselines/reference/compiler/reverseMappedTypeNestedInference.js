//// [tests/cases/compiler/reverseMappedTypeNestedInference.ts] ////

//// [reverseMappedTypeNestedInference.ts]
declare const sv: (input: unknown) => string | undefined;

declare function d3<T>(input: { [K in keyof T]: { [J in keyof T[K]]: { [L in keyof T[K][J]]: (i: unknown) => T[K][J][L] } } }): T;
export const r3 = d3({ a: { b: { c: sv } } });

declare function d4<T>(input: { [K in keyof T]: { [J in keyof T[K]]: { [L in keyof T[K][J]]: { [M in keyof T[K][J][L]]: (i: unknown) => T[K][J][L][M] } } } }): T;
export const r4 = d4({ a: { b: { c: { d: sv } } } });

type Deep2<T> = { [K in keyof T]: { [J in keyof T[K]]: Deep2<T[K][J]> | ((i: unknown) => T[K][J]) } };
declare function dd<T>(input: Deep2<T>): T;
export const rd = dd({ a: { b: { c: { d: sv } } } });

declare function dk<T, U extends keyof T>(input: { [K in keyof T]: { [J in keyof T[K]]: (i: unknown) => T[K][J] } }, k: U): T[U];
export const rk = dk({ a: { b: sv } }, "a");

declare function revTuple<V extends unknown[]>(x: { [K in keyof V]: { [J in keyof V[K]]: () => V[K][J] } }): V;
export const rt = revTuple([{ a: () => 1 }, { b: () => "s" }] as const);


//// [reverseMappedTypeNestedInference.js]
export const r3 = d3({ a: { b: { c: sv } } });
export const r4 = d4({ a: { b: { c: { d: sv } } } });
export const rd = dd({ a: { b: { c: { d: sv } } } });
export const rk = dk({ a: { b: sv } }, "a");
export const rt = revTuple([{ a: () => 1 }, { b: () => "s" }]);


//// [reverseMappedTypeNestedInference.d.ts]
export declare const r3: {
    a: {
        b: {
            c: string | undefined;
        };
    };
};
export declare const r4: {
    a: {
        b: {
            c: {
                d: string | undefined;
            };
        };
    };
};
export declare const rd: {
    a: {
        b: {
            c: {
                d: string | undefined;
            };
        };
    };
};
export declare const rk: {
    b: string | undefined;
};
export declare const rt: [{
    readonly a: number;
}, {
    readonly b: string;
}];
