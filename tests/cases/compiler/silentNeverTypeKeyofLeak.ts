// @strict: true
// @noEmit: true

// Repro from #62824

// Minimal repro: silentNeverType leaks through keyof in mapped types
// when a nested generic call has no inference candidates during the
// outer call's inference pass.

type Fn<T> = (arg: T) => void;

declare function fn1<T>(): Fn<T>;

declare function fn2<T>(
  ac: Fn<{
    [K in keyof T & string]: T[K];
  }>,
): void;

fn2(fn1());

// Shorter repro from issue
type Values<T> = T[keyof T];

interface ParameterizedObject {
  type: string;
  params?: unknown;
}

type ActionFunction<TParams, TAction extends ParameterizedObject> = {
  (params: TParams): void;
  _out_TAction?: TAction;
};

type ToParameterizedObject<TParameterizedMap> = Values<{
  [K in keyof TParameterizedMap & string]: {
    type: K;
    params: TParameterizedMap[K];
  };
}>;

declare function enqueueActions<TParams, TAction extends ParameterizedObject>(
  collect: (params: TParams) => void,
): ActionFunction<TParams, TAction>;

declare function setup<TActions>(actions: {
  [K in keyof TActions]: ActionFunction<
    TActions[K],
    ToParameterizedObject<TActions>
  >;
}): void;

setup({
  doStuff: enqueueActions((params: number) => {}),
});
