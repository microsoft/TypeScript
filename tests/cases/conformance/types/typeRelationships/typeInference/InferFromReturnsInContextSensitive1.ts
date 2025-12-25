// @strict: true
// @declaration: true

// https://github.com/microsoft/TypeScript/issues/60720

type Options<TContext> = {
  onStart?: () => TContext;
  onEnd?: (context: TContext) => void;
};

function create<TContext>(builder: (arg: boolean) => Options<TContext>) {
  return builder(true);
}

create((arg) => ({
  onStart: () => ({ time: new Date() }),
  onEnd: (context) => {},
}));

create((arg) => ({
  onEnd: (context) => {},
  onStart: () => ({ time: new Date() }),
}));

// https://github.com/microsoft/TypeScript/issues/57021

type Schema = Record<string, unknown>;

type StepFunction<TSchema extends Schema = Schema> = (anything: unknown) => {
  readonly schema: TSchema;
  readonly toAnswers?: (keys: keyof TSchema) => unknown;
};

function step<TSchema extends Schema = Schema>(
  stepVal: StepFunction<TSchema>,
): StepFunction<TSchema> {
  return stepVal;
}

const stepResult1 = step((_something) => ({
  schema: {
    attribute: "anything",
  },
  toAnswers: (keys) => {
    type Test = string extends typeof keys ? never : "true";
    const test: Test = "true"; // ok
    return { test };
  },
}));

const stepResult2 = step((_something) => ({
  toAnswers: (keys) => {
    type Test = string extends typeof keys ? never : "true";
    const test: Test = "true"; // ok
    return { test };
  },
  schema: {
    attribute: "anything",
  },
}));

type Fn1<T, T2> = (anything: unknown) => {
  stuff: T;
  consume: (arg: T) => (anything: unknown) => {
    stuff2: T2;
    consume2: (arg: T2) => void;
  };
};

declare function test1<T, T2>(fn: Fn1<T, T2>): [T, T2];

const res1 = test1((_something) => ({
  stuff: "foo",
  consume: (arg) => {
    return (_something) => ({
      stuff2: 42,
      consume2: (arg2) => {},
    });
  },
}));

const res2 = test1((_something) => ({
  consume: (arg) => {
    return (_something) => ({
      consume2: (arg2) => {},
      stuff2: 42,
    });
  },
  stuff: "foo",
}));

const res3 = test1((_something) => ({
  stuff: "foo",
  consume: () => {
    return (_something) => ({
      stuff2: 42,
      consume2: (arg2) => {},
    });
  },
}));

const res4 = test1((_something) => ({
  consume: () => {
    return (_something) => ({
      consume2: (arg2) => {},
      stuff2: 42,
    });
  },
  stuff: "foo",
}));

const res5 = test1((_something) => ({
  stuff: "foo",
  consume: () => {
    return () => ({
      stuff2: 42,
      consume2: (arg2) => {},
    });
  },
}));

const res6 = test1((_something) => ({
  consume: () => {
    return () => ({
      consume2: (arg2) => {},
      stuff2: 42,
    });
  },
  stuff: "foo",
}));

const res7 = test1((_something) => ({
  stuff: "foo",
  consume: () => {
    return () => ({
      stuff2: 42,
      consume2: () => {},
    });
  },
}));

const res8 = test1((_something) => ({
  consume: () => {
    return () => ({
      consume2: () => {},
      stuff2: 42,
    });
  },
  stuff: "foo",
}));
