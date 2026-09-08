//// [tests/cases/compiler/recursiveGetterConstraintDeclarationEmit.ts] ////

//// [recursiveGetterConstraintDeclarationEmit.ts]
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




//// [recursiveGetterConstraintDeclarationEmit.d.ts]
export interface Schema<O> {
    output: O;
}
export type Shape = Record<string, Schema<unknown>>;
export interface ObjectSchema<S extends Shape> extends Schema<{
    [K in keyof S]: S[K]["output"];
}> {
    shape: S;
}
export declare function object<S extends Shape>(shape: S): ObjectSchema<S>;
export declare const node: any;
export type Output = typeof node.output;
export declare const nestedName: string;
