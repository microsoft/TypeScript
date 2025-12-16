// @strict: true
// @noEmit: true

type ExtractEvent<
  TEvent extends { type: string },
  TEventType extends TEvent["type"]
> = TEvent extends {
  type: TEventType;
}
  ? TEvent
  : never;

type TransitionConfig<TContext, TEvent extends { type: string }> = {
  actions?: {
    type: string;
  };
};

type IntersectedTransitionConfigMap<TContext, TEvent extends { type: string }> = {
  [K in TEvent["type"]]?: TransitionConfig<TContext, ExtractEvent<TEvent, K>>;
} & {
  "*": TransitionConfig<TContext, TEvent>;
};

type TransitionConfigMap<TContext, TEvent extends { type: string }> = {
  [K in TEvent["type"] | "*"]?: K extends "*"
    ? TransitionConfig<TContext, TEvent>
    : TransitionConfig<TContext, ExtractEvent<TEvent, K>>;
};

export function genericFn<TEvent extends { type: string }>() {
  const wildcardTransitionConfig = {
    "*": { actions: { type: "someAction" } },
  } as const;

  // this should be assignable, in the same way as the following assignment is OK
  let test: TransitionConfigMap<
    { counter: number },
    { type: TEvent["type"] }
  > = {} as typeof wildcardTransitionConfig;

  // concrete prop is assignable to the concrete prop of this mapped type
  test["*"] = {} as typeof wildcardTransitionConfig["*"];

  // similar intersected type accepts this concrete object
  let test2: IntersectedTransitionConfigMap<
    { counter: number },
    { type: TEvent["type"] }
  > = {} as typeof wildcardTransitionConfig;
}
