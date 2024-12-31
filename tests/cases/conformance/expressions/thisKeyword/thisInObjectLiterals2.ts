// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/54723

interface State {
  value: string;
  matches(value: string): boolean;
}

declare function macthesState(state: { value: string }, value: string): boolean;
declare function isState(state: unknown): state is State;

function test(config: unknown, prevConfig: unknown) {
  if (isState(config)) {
    return {
      ...config,
      matches: isState(prevConfig)
        ? prevConfig.matches
        : function (value: string) {
            return macthesState(this, value);
          },
    };
  }

  return config;
}

function test2(config: State) {
  return {
    ...config,
    matches: function (value: string) {
      return macthesState(this, value);
    },
  };
}