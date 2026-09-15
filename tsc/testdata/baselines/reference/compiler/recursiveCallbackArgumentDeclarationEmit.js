//// [tests/cases/compiler/recursiveCallbackArgumentDeclarationEmit.ts] ////

//// [recursiveCallbackArgumentDeclarationEmit.ts]
export interface Schema<O> { readonly out: O }
export type Shape = Record<string, Schema<any> | (() => Schema<any>)>;
type Resolve<T> = T extends () => infer R ? R : T;
export type Infer<S extends Shape> = { [K in keyof S]: Resolve<S[K]> extends Schema<infer O> ? O : never };

export declare function object<S extends Shape>(shape: S): Schema<Infer<S>>;
export declare function array<T extends Schema<any>>(el: T): Schema<T["out"][]>;
export declare function string(): Schema<string>;
export declare function lazy<T extends Schema<any>>(fn: () => T): T;

export const Category = object({
    name: string(),
    subcategories: lazy(() => array(Category)),
});


//// [recursiveCallbackArgumentDeclarationEmit.js]
export const Category = object({
    name: string(),
    subcategories: lazy(() => array(Category)),
});


//// [recursiveCallbackArgumentDeclarationEmit.d.ts]
export interface Schema<O> {
    readonly out: O;
}
export type Shape = Record<string, Schema<any> | (() => Schema<any>)>;
type Resolve<T> = T extends () => infer R ? R : T;
export type Infer<S extends Shape> = {
    [K in keyof S]: Resolve<S[K]> extends Schema<infer O> ? O : never;
};
export declare function object<S extends Shape>(shape: S): Schema<Infer<S>>;
export declare function array<T extends Schema<any>>(el: T): Schema<T["out"][]>;
export declare function string(): Schema<string>;
export declare function lazy<T extends Schema<any>>(fn: () => T): T;
export declare const Category: Schema<Infer<{
    name: Schema<string>;
    subcategories: Schema<Infer</*elided*/ any>[]>;
}>>;
export {};
