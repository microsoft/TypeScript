// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62824

type Values<T> = T[keyof T];

type MachineContext = Record<string, any>;

interface ParameterizedObject {
  type: string;
  params?: unknown;
}

type ActionFunction<
  TContext extends MachineContext,
  TParams extends ParameterizedObject["params"] | undefined,
  TAction extends ParameterizedObject,
> = {
  (ctx: TContext, params: TParams): void;
  _out_TAction?: TAction;
};

type ToParameterizedObject<
  TParameterizedMap extends Record<
    string,
    ParameterizedObject["params"] | undefined
  >,
> = Values<{
  [K in keyof TParameterizedMap & string]: {
    type: K;
    params: TParameterizedMap[K];
  };
}>;

type CollectActions<
  TContext extends MachineContext,
  TParams extends ParameterizedObject["params"] | undefined,
> = (
  {
    context,
    enqueue,
  }: {
    context: TContext;
    enqueue: (action: () => void) => void;
  },
  params: TParams,
) => void;

declare function enqueueActions<
  TContext extends MachineContext,
  TParams extends ParameterizedObject["params"] | undefined,
  TAction extends ParameterizedObject = ParameterizedObject,
>(
  collect: CollectActions<TContext, TParams>,
): ActionFunction<TContext, TParams, TAction>;

declare function setup<
  TContext extends MachineContext,
  TActions extends Record<
    string,
    ParameterizedObject["params"] | undefined
  > = {},
>({
  types,
  actions,
}: {
  types?: { context?: TContext };
  actions?: {
    [K in keyof TActions]: ActionFunction<
      TContext,
      TActions[K],
      ToParameterizedObject<TActions>
    >;
  };
}): void;

setup({
  actions: {
    doStuff: enqueueActions((_, params: number) => {}),
  },
});

setup({
  actions: {
    doStuff: enqueueActions((_, params: number) => {}),
    doOtherStuff: (_, params: string) => {},
  },
});

setup({
  actions: {
    doStuff: enqueueActions((_, params: number) => {}),
    doOtherStuff: (_: any, params: string) => {},
  },
});
