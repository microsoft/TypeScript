// @strict: true
// @target: es2015
// @noEmit: true

function write<T extends Record<string, unknown>>(values: Partial<T>, key: string) {
    (values[key] as unknown) = 0;
}
