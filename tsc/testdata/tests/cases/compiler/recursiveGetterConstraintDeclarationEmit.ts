// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

export interface Schema<O> { output: O; }
export type Shape = Record<string, Schema<unknown>>;
export interface ObjectSchema<S extends Shape> extends Schema<{ [K in keyof S]: S[K]["output"] }> {
    shape: S;
}
export declare function object<S extends Shape>(shape: S): ObjectSchema<S>;

export const node = object({
    name: { output: "" },
    get next() { return node; },
});

export type Output = typeof node.output;
export const nestedName: string = node.output.next.next.name;
