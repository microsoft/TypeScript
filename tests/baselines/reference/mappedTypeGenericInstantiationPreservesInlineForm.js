//// [tests/cases/compiler/mappedTypeGenericInstantiationPreservesInlineForm.ts] ////

//// [mappedTypeGenericInstantiationPreservesInlineForm.ts]
// repro from #53109

export const test1 = <T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}) => {}

export function test2<T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}) {};




//// [mappedTypeGenericInstantiationPreservesInlineForm.d.ts]
export declare const test1: <T = Record<string, never>>(schema: { [K in keyof Required<T>]: T[K]; }) => void;
export declare function test2<T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}): void;
