// @strict: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3488

export function cast<T>(value: T): {
    as: <K extends T>() => null extends T ? K | null : undefined extends T ? K | undefined : K;
} {
    return {
        as: <K extends T>(): null extends T ? K | null : undefined extends T ? K | undefined : K => {
            return value as K;
        },
    };
}
