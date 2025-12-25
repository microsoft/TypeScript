// @strict: true
// @declaration: true

type Options<TContext> = {
  onStart?: (arg: number) => TContext;
  onEnd?: (context: TContext) => void;
};

function create<TContext>(builder: (arg: boolean) => Options<TContext>) {
  return builder(true);
}

create((arg) => ({
  onStart: (arg) => ({ time: new Date() }),
  onEnd: (context) => {},
}));

type Schema = Record<string, unknown>;

type StepFunction<TSchema extends Schema = Schema> = (anything: unknown) => {
  readonly schema: (thing: number) => TSchema;
  readonly toAnswers?: (keys: keyof TSchema) => unknown;
};

function step<TSchema extends Schema = Schema>(
  stepVal: StepFunction<TSchema>,
): StepFunction<TSchema> {
  return stepVal;
}

const stepResult = step((_something) => ({
  schema: (thing) => ({
    attribute: "anything",
  }),
  toAnswers: (keys) => {
    type Test = string extends typeof keys ? never : "true";
    const test: Test = "true"; // ok
    return { test };
  },
}));

type Fn1<T, T2> = (anything: unknown) => {
  produce: (arg: number) => T;
  consume: (arg: T) => (anything: unknown) => {
    produce2: (arg: number) => T2;
    consume2: (arg: T2) => void;
  };
};

declare function test1<T, T2>(fn: Fn1<T, T2>): [T, T2];

const res1 = test1((_something) => ({
  produce: (input) => "foo",
  consume: (arg) => {
    return (_something) => ({
      produce2: (input) => 42,
      consume2: (arg2) => {},
    });
  },
}));

const res2 = test1((_something) => ({
  produce: (input) => "foo",
  consume: (arg) => {
    return () => ({
      produce2: (input) => 42,
      consume2: (arg2) => {},
    });
  },
}));
