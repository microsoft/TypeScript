// @strict: true
// @noEmit: true

declare function test<T extends unknown[], T2 extends unknown[]>(
  a: [
    ...{
      [K in keyof T]: {
        produce: (seed: string) => T[K];
      };
    }
  ],
  b: [
    ...{
      [K in keyof T2]: {
        consume: (arg: T[K & keyof T]) => T2[K];
      };
    }
  ]
): void;

test(
  [
    {
      produce: () => "",
    },
    {
      produce: () => 42,
    },
  ],
  [
    {
      consume: (arg) => {
        const received: string = arg;
        return received;
      },
    },
    {
      consume: (arg) => {
        const received: number = arg;
        return received;
      },
    },
  ]
);
