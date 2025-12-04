// @strict: true
// @noEmit: true

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

setup({
  doStuff: enqueueActions((params: number) => {}),
  doOtherStuff: (params: string) => {},
});

setup({
  doStuff: enqueueActions((params: number) => {}),
  doOtherStuff: (params) => {},
});