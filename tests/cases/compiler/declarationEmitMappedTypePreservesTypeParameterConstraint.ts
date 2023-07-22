// @strict: true
// @declaration: true
// @lib: esnext

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
