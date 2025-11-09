// @strict: true
// @noEmit: true

type NoExcessProperties<T, U> = T & {
  readonly [K in Exclude<keyof U, keyof T>]: never;
};

interface Effect<out A> {
  readonly EffectTypeId: {
    readonly _A: (_: never) => A;
  };
}

declare function pipe<A, B>(a: A, ab: (a: A) => B): B;

interface RepeatOptions<A> {
  until?: (_: A) => boolean;
}

declare const repeat: {
  <O extends NoExcessProperties<RepeatOptions<A>, O>, A>(
    options: O,
  ): (self: Effect<A>) => Effect<A>;
};

pipe(
  {} as Effect<boolean>,
  repeat({
    until: (x) => {
      return x; // boolean
    },
  }),
);
