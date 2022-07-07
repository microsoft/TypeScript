//// [inferTypeConstraintInstantiationCircularity.ts]
type AMappedType<T> = { [KeyType in keyof T]: number };

type HasM = {
  m: number;
};

// Simplified repro from #48059

interface X1<
  T extends HasM,
  Output = AMappedType<{ s: number; } & { [k in keyof T]: number; }>
> {
  tee: T;
  output: Output;
}

type F1<T> = T extends X1<infer U> ? U : never;

// With default inlined

interface X2<
  T extends HasM,
  Output
> {
  tee: T;
  output: Output;
}

type F2<T> = T extends X2<infer U, AMappedType<{ s: number; } & { [k in keyof (infer U)]: number; }>> ? U : never;

// Original repro

type Simplify<T> = {[KeyType in keyof T]: T[KeyType]};

type optionalKeys<T extends object> = {
    [k in keyof T]: undefined extends T[k] ? k : never;
}[keyof T];

type requiredKeys<T extends object> = Exclude<keyof T, optionalKeys<T>>;

export type addQuestionMarks<T extends object> = {
    [k in optionalKeys<T>]?: T[k];
} & {
    [k in requiredKeys<T>]: T[k];
};

type ZodRawShape = {
    [k: string]: ZodType<any>;
};

interface ZodType<Output> {
  _type: Output;
}

interface ZodObject<
  T extends ZodRawShape,
  Output = Simplify<
    {
      [k in optionalKeys<T>]?: T[k];
    } & {
      [k in requiredKeys<T>]: T[k];
    }
  >
> extends ZodType<Output> {
  readonly _shape: T;
}

type MyObject<T> = T extends ZodObject<infer U>
  ? U extends ZodRawShape
    ? U
    : never
  : never;

//// [inferTypeConstraintInstantiationCircularity.js]
"use strict";
exports.__esModule = true;
