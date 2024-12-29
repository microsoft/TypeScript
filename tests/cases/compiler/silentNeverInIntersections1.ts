// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60864

class Variable<U, S extends string> {
  constructor(public s: S) {}
  u!: U;
}

function mkGeneric<U, S extends string>(s: S) {
  return new Variable<U, S>(s);
}

type ExactArgNames<GenericType, Constraint> = GenericType & {
  [K in keyof GenericType]: K extends keyof Constraint ? GenericType[K] : never;
};

type AllowVariables<T> =
  | Variable<T, any>
  | { [K in keyof T]: Variable<T[K], any> | T[K] };

type TestArgs = {
  someArg: number;
};

type TestArgsWithVars = AllowVariables<TestArgs>;

function takesGeneric<V extends AllowVariables<TestArgs>>(
  a: ExactArgNames<V, TestArgs>,
): void {}

let v = takesGeneric({ someArg: mkGeneric("x") });
