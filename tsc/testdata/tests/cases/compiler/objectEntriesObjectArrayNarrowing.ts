// @target: es2017
// @strict: true

declare const record: object;
for (const [, value] of Object.entries(record)) {
    if (Array.isArray(value)) {
        value.forEach(() => {});
    }
}
