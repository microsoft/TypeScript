// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58833

interface Config<T> {
  context: T;
  invoke: {
    (x: T): void;
    exec: (x: T) => void;
  };
}

declare function create<T>(config: Config<T>): void;

declare function myInvoke<T>(i: { exec: (x: T) => void }): {
  (x: T): void;
  exec: (x: T) => void;
};

create({
  context: { count: 10 },
  invoke: myInvoke({
    exec: (x) => {
      x.count.toFixed(2);
    },
  }),
});

declare function myInvoke2<T>(i: { exec: (x: T) => void }): {
  (x: T): void;
} & typeof i;

create({
  context: { count: 20 },
  invoke: myInvoke2({
    exec: (x) => {
      x.count.toFixed(2);
    },
  }),
});
