//// [tests/cases/compiler/comparisonReverseMappedTypes.ts] ////

//// [comparisonReverseMappedTypes.ts]
declare function unbox<T>(value: { [K in keyof T]: { value: T[K] } }): T;

declare const strings: { value: { value: string } };
declare const numbers: { value: { value: number } };
declare const booleans: { value: { value: boolean } };

export const values = [unbox(numbers), unbox(strings), unbox(booleans)];
export const reversed = [unbox(booleans), unbox(strings), unbox(numbers)];

declare function identity<T>(value: { [K in keyof T]: T[K] }): T;
declare const nested: { value: { value: string } };
export const sameSource = [identity(nested), unbox(nested)];


//// [comparisonReverseMappedTypes.js]
export const values = [unbox(numbers), unbox(strings), unbox(booleans)];
export const reversed = [unbox(booleans), unbox(strings), unbox(numbers)];
export const sameSource = [identity(nested), unbox(nested)];


//// [comparisonReverseMappedTypes.d.ts]
export declare const values: ({
    value: string;
} | {
    value: number;
} | {
    value: boolean;
})[];
export declare const reversed: ({
    value: string;
} | {
    value: number;
} | {
    value: boolean;
})[];
export declare const sameSource: ({
    value: string;
} | {
    value: {
        value: string;
    };
})[];
