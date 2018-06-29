// @strict: true

export declare let x: null | { foo: { bar: string | null } | undefined } | undefined;
export declare let y: { foo: { bar: number | undefined } };

x = y;

y = x;
