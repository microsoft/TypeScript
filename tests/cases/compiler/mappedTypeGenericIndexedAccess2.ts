// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60675

type EventPayloads = {
  completeSprint: {
    automationId: string;
    spaceId: string;
  };
  sendMessage: {
    message: string;
  };
};

type CompletedEvent<T extends keyof EventPayloads> = {
  [E in T]: {
    type: E;
    payload: EventPayloads[E];
    appName: string;
  };
}[T];

function overwriteAppName<T extends keyof EventPayloads>(
  scheduled: CompletedEvent<T>,
): CompletedEvent<T> {
  const { appName, ...rest } = scheduled;

  scheduled.payload = rest.payload // ok
  rest.payload = scheduled.payload // ok

  // ok
  return {
    ...rest,
    appName: "test",
  };
}
