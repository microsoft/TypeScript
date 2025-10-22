// @strict: true
// @noEmit: true

type EventPayloads = {
  completeSprint: {
    automationId: string;
    spaceId: string;
  };
  sendMessage: {
    message: string;
  };
};

type Nested = {
  bar: {
    a: string;
  };
  baz: {
    b: string;
  };
};

type CompletedEvent<T extends keyof EventPayloads, Z extends keyof Nested> = {
  [E in T]: {
    type: E;
    payload: {
      [K in Z]: {
        other: string;
        nested: Nested[K];
      };
    }[Z];
    appName: string;
  };
}[T];

function overwriteAppName<
  U extends keyof EventPayloads,
  Z extends keyof Nested,
>(scheduled: CompletedEvent<U, Z>): CompletedEvent<U, Z> {
  const { appName, type, ...rest } = scheduled;
  const { other, ...restrest } = rest.payload;

  rest.payload.nested = restrest.nested; // ok
  restrest.nested = rest.payload.nested; // ok

  return {
    type,
    payload: {
      ...restrest,
      other,
    },
    appName: "test",
  };
}
