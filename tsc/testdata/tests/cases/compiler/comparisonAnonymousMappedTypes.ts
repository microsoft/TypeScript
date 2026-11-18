// @strict: true
// @declaration: true

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
