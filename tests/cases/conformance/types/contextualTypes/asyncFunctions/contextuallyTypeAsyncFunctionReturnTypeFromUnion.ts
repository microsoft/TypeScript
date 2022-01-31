// @target: esnext
// @strict: true
// @noEmit: true

declare class StateMachine<T> {
  onDone: (a: T) => void;
}

declare function createMachine<T>(implementations: {
  services: Record<string, () => Promise<T> | StateMachine<T>>;
}): void;

createMachine<{ count: number }>({
  services: {
    test: async () => Promise.reject("some err"),
    async test2() {
      return Promise.reject("some err");
    },
  },
});

function fn1(): () => Promise<{ count: number }> | StateMachine<{ count: number }> {
  return async () => Promise.reject('some err')
}
