// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62720

type TypeFunction<ReturnType = unknown> = (...args: any[]) => ReturnType;
type Flags = {
  [flagName: string]: {
    type: TypeFunction;
    default?: unknown;
  };
};
type TypeFlag<Schemas extends Flags> = {
  [flag in keyof Schemas]: Schemas[flag] extends { type: TypeFunction<infer T> }
    ? T
    : never;
};

declare function fn1<Options extends Flags>(
  options: Options,
): TypeFlag<Options>;

const result1 = fn1({
  booleanFlag: { type: Boolean },
  booleanFlagDefault: {
    type: Boolean,
    default: false,
  },
});
result1.booleanFlag; // boolean
result1.booleanFlagDefault; // boolean

declare function fn2<Options extends Flags>(
  options: Readonly<Options>,
): TypeFlag<Options>;

const result2 = fn2({
  booleanFlag: { type: Boolean },
  booleanFlagDefault: {
    type: Boolean,
    default: false,
  },
});
result2.booleanFlag; // boolean
result2.booleanFlagDefault; // boolean

declare function fn3<Options extends Flags>(
  options: Readonly<Options>,
): Options;

const result3 = fn3({
  booleanFlag: { type: Boolean },
  booleanFlagDefault: {
    type: Boolean,
    default: false, // no cursed EPC failure here
  },
});

declare function takeType(arg: { type: unknown }): void;
takeType(result3.booleanFlagDefault);
