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

// repro from https://github.com/microsoft/TypeScript/issues/55049

type evaluate<t> = { [k in keyof t]: t[k] } & unknown

export type entryOf<o> = evaluate<
    { [k in keyof o]-?: [k, o[k] & ({} | null)] }[o extends readonly unknown[]
        ? keyof o & number
        : keyof o]
>

export type entriesOf<o extends object> = evaluate<entryOf<o>[]>

export const entriesOf = <o extends object>(o: o) =>
    Object.entries(o) as entriesOf<o>


//// [declarationEmitMappedTypePreservesTypeParameterConstraint.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entriesOf = exports.buildSchema = void 0;
const buildSchema = (version) => (({}));
exports.buildSchema = buildSchema;
const entriesOf = (o) => Object.entries(o);
exports.entriesOf = entriesOf;


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
}>, undefined extends V ? never : "version"> extends infer T extends unknown ? { [k in keyof T]: addQuestionMarks<baseObjectOutputType<{
    version: ZodLiteral<V>;
}>, undefined extends V ? never : "version">[k]; } : never;
type evaluate<t> = {
    [k in keyof t]: t[k];
} & unknown;
export type entryOf<o> = evaluate<{
    [k in keyof o]-?: [k, o[k] & ({} | null)];
}[o extends readonly unknown[] ? keyof o & number : keyof o]>;
export type entriesOf<o extends object> = evaluate<entryOf<o>[]>;
export declare const entriesOf: <o extends object>(o: o) => ({ [k_1 in keyof o]-?: [k_1, o[k_1] & ({} | null)]; }[o extends readonly unknown[] ? keyof o & number : keyof o] extends infer T extends unknown ? { [k in keyof T]: { [k_1 in keyof o]-?: [k_1, o[k_1] & ({} | null)]; }[o extends readonly unknown[] ? keyof o & number : keyof o][k]; } : never)[];
export {};


//// [DtsFileErrors]


declarationEmitMappedTypePreservesTypeParameterConstraint.d.ts(24,98): error TS2536: Type 'k' cannot be used to index type 'addQuestionMarks<baseObjectOutputType<{ version: ZodLiteral<V>; }>, undefined extends V ? never : "version">'.
declarationEmitMappedTypePreservesTypeParameterConstraint.d.ts(34,226): error TS2536: Type 'k' cannot be used to index type '{ [k_1 in keyof o]-?: [k_1, o[k_1] & ({} | null)]; }[o extends readonly unknown[] ? keyof o & number : keyof o]'.


==== declarationEmitMappedTypePreservesTypeParameterConstraint.d.ts (2 errors) ====
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
    }>, undefined extends V ? never : "version"> extends infer T extends unknown ? { [k in keyof T]: addQuestionMarks<baseObjectOutputType<{
                                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        version: ZodLiteral<V>;
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }>, undefined extends V ? never : "version">[k]; } : never;
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2536: Type 'k' cannot be used to index type 'addQuestionMarks<baseObjectOutputType<{ version: ZodLiteral<V>; }>, undefined extends V ? never : "version">'.
    type evaluate<t> = {
        [k in keyof t]: t[k];
    } & unknown;
    export type entryOf<o> = evaluate<{
        [k in keyof o]-?: [k, o[k] & ({} | null)];
    }[o extends readonly unknown[] ? keyof o & number : keyof o]>;
    export type entriesOf<o extends object> = evaluate<entryOf<o>[]>;
    export declare const entriesOf: <o extends object>(o: o) => ({ [k_1 in keyof o]-?: [k_1, o[k_1] & ({} | null)]; }[o extends readonly unknown[] ? keyof o & number : keyof o] extends infer T extends unknown ? { [k in keyof T]: { [k_1 in keyof o]-?: [k_1, o[k_1] & ({} | null)]; }[o extends readonly unknown[] ? keyof o & number : keyof o][k]; } : never)[];
                                                                                                                                                                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2536: Type 'k' cannot be used to index type '{ [k_1 in keyof o]-?: [k_1, o[k_1] & ({} | null)]; }[o extends readonly unknown[] ? keyof o & number : keyof o]'.
    export {};
    