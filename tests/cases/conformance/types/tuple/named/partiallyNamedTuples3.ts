// @strict: true
// @lib: esnext

declare const tuple: [number, name: string, boolean, value: number, string];

const output = ((...args) => args)(...tuple);
