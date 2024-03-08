// @strict: true
// @noEmit: true

// repro #46310

export interface TypegenDisabled {
  "@@xstate/typegen": false;
}
export interface TypegenEnabled {
  "@@xstate/typegen": true;
}

type ActionFunction<TEvent extends { type: string }> = (event: TEvent) => void;

declare function createMachine<
  TTypesMeta extends TypegenEnabled | TypegenDisabled = TypegenDisabled
>(
  config: {
    types?: TTypesMeta;
  },
  implementations: TTypesMeta extends TypegenEnabled
    ? ActionFunction<{ type: "test" }>
    : ActionFunction<{ type: string }>
): void;

createMachine({}, (ev) => {
  ev.type; // should be `string`
});
