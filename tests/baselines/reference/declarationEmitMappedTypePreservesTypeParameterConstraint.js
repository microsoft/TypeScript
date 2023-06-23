//// [tests/cases/compiler/declarationEmitMappedTypePreservesTypeParameterConstraint.ts] ////

//// [declarationEmitMappedTypePreservesTypeParameterConstraint.ts]
// repro from https://github.com/microsoft/TypeScript/issues/54560

declare type requiredKeys<T extends object> = {
  [k in keyof T]: undefined extends T[k] ? never : k;
}[keyof T];

declare type addQuestionMarks<
  T extends object,
  R extends keyof T = requiredKeys<T>
> = Pick<Required<T>, R> & Partial<T>;

declare type identity<T> = T;

declare type flatten<T> = identity<{
  [k in keyof T]: T[k];
}>;

export declare abstract class ZodType<Output = any> {
  readonly _output: Output;
}

export declare class ZodLiteral<T> extends ZodType<T> {}

export declare type ZodTypeAny = ZodType<any>;

export declare type baseObjectOutputType<Shape extends ZodRawShape> = {
  [k in keyof Shape]: Shape[k]["_output"];
};

export declare type objectOutputType<Shape extends ZodRawShape> = flatten<
  addQuestionMarks<baseObjectOutputType<Shape>>
>;

export declare type ZodRawShape = {
  [k: string]: ZodTypeAny;
};

export const buildSchema = <V extends string>(
  version: V
): objectOutputType<{
  version: ZodLiteral<V>;
}> => ({} as any);


//// [declarationEmitMappedTypePreservesTypeParameterConstraint.js]
"use strict";
// repro from https://github.com/microsoft/TypeScript/issues/54560
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSchema = void 0;
var buildSchema = function (version) { return ({}); };
exports.buildSchema = buildSchema;


//// [declarationEmitMappedTypePreservesTypeParameterConstraint.d.ts]
declare type requiredKeys<T extends object> = {
    [k in keyof T]: undefined extends T[k] ? never : k;
}[keyof T];
declare type addQuestionMarks<T extends object, R extends keyof T = requiredKeys<T>> = Pick<Required<T>, R> & Partial<T>;
declare type identity<T> = T;
declare type flatten<T> = identity<{
    [k in keyof T]: T[k];
}>;
export declare abstract class ZodType<Output = any> {
    readonly _output: Output;
}
export declare class ZodLiteral<T> extends ZodType<T> {
}
export declare type ZodTypeAny = ZodType<any>;
export declare type baseObjectOutputType<Shape extends ZodRawShape> = {
    [k in keyof Shape]: Shape[k]["_output"];
};
export declare type objectOutputType<Shape extends ZodRawShape> = flatten<addQuestionMarks<baseObjectOutputType<Shape>>>;
export declare type ZodRawShape = {
    [k: string]: ZodTypeAny;
};
export declare const buildSchema: <V extends string>(version: V) => addQuestionMarks<baseObjectOutputType<{
    version: ZodLiteral<V>;
}>, undefined extends V ? never : "version"> extends infer T ? { [K in keyof T]: T[K]; } : never;
export {};
