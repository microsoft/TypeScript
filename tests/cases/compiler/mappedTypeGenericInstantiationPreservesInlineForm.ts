// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// repro from #53109

export const test1 = <T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}) => {}

export function test2<T = Record<string, never>>(schema: {
    [K in keyof Required<T>]: T[K];
}) {};
