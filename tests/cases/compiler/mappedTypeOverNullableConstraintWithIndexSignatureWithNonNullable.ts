// @noEmit: true
// @strict: true

interface StateSchema {
  states?: {
    [key: string]: StateSchema;
  };
}

declare class StateNode<TStateSchema extends StateSchema> {
  schema: TStateSchema;
}

type StateNodesConfig<TStateSchema extends StateSchema> = {
  [K in keyof TStateSchema["states"]]: StateNode<NonNullable<TStateSchema["states"]>[K]>;
};
