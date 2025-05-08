// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61676

type Definitions = {
  onFoo: [arg: number];
  onBar: [arg: string];
};

type SomeCallbacks = {
  [K in keyof Definitions]: (...args: Definitions[K]) => void;
};

const wrapCallback = <K extends keyof SomeCallbacks>(
  source: SomeCallbacks,
  target: SomeCallbacks,
  key: K,
) => {
  const callback = source[key];

  target[key] = (...args) => {
    if (Math.random() > 0.5) {
      return callback(...args);
    }
  };
};

function wrapAll(callbacks: SomeCallbacks): SomeCallbacks {
  const wrapped = {} as SomeCallbacks;
  for (let key in callbacks) {
    wrapCallback(callbacks, wrapped, key as keyof SomeCallbacks);
  }
  return wrapped;
}
