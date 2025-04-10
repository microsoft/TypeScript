export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined {
    return value !== undefined && test(value) ? value : undefined;
}

export function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut {
    if (value !== undefined && test(value)) return value;

    throw new Error(`Invalid cast. The supplied value ${value} did not pass the test '${test.name}'.`);
}
