//// [tests/cases/compiler/comparisonAnonymousMappedTypes.ts] ////

//// [comparisonAnonymousMappedTypes.ts]
declare function mapped<T>(): { [K in "value"]: T };
declare function object<T>(): { value: T };
declare function homomorphic<T>(): { [K in keyof T]: T[K] };

export const mappedValues = [mapped<number>(), mapped<string>(), mapped<boolean>()];
export const objectValues = [object<number>(), object<string>(), object<boolean>()];
export const reversedMappedValues = [mapped<boolean>(), mapped<string>(), mapped<number>()];

interface StringValue { value: string }
interface NumberValue { value: number }
interface BooleanValue { value: boolean }

export const homomorphicValues = [
    homomorphic<NumberValue>(),
    homomorphic<StringValue>(),
    homomorphic<BooleanValue>()
];
export const reversedHomomorphicValues = [
    homomorphic<BooleanValue>(),
    homomorphic<StringValue>(),
    homomorphic<NumberValue>()
];


//// [comparisonAnonymousMappedTypes.js]
export const mappedValues = [mapped(), mapped(), mapped()];
export const objectValues = [object(), object(), object()];
export const reversedMappedValues = [mapped(), mapped(), mapped()];
export const homomorphicValues = [
    homomorphic(),
    homomorphic(),
    homomorphic()
];
export const reversedHomomorphicValues = [
    homomorphic(),
    homomorphic(),
    homomorphic()
];


//// [comparisonAnonymousMappedTypes.d.ts]
export declare const mappedValues: ({
    value: string;
} | {
    value: number;
} | {
    value: boolean;
})[];
export declare const objectValues: ({
    value: string;
} | {
    value: number;
} | {
    value: boolean;
})[];
export declare const reversedMappedValues: ({
    value: string;
} | {
    value: number;
} | {
    value: boolean;
})[];
export declare const homomorphicValues: ({
    value: boolean;
} | {
    value: number;
} | {
    value: string;
})[];
export declare const reversedHomomorphicValues: ({
    value: boolean;
} | {
    value: number;
} | {
    value: string;
})[];
