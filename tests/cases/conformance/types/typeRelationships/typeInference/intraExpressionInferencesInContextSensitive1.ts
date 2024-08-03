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

create((arg: boolean) => ({
  onStart: () => ({ time: new Date() }),
  onEnd: (context) => {},
}));

create(() => ({
  onStart: () => ({ time: new Date() }),
  onEnd: (context) => {},
}));

create((arg) => ({
  onStart: () => ({ time: new Date() }),
  onEnd: (context) => {},
}));

// https://github.com/microsoft/TypeScript/issues/57021

type Schema = Record<string, unknown>;

type StepFunction<TSchema extends Schema = Schema> = (anything: unknown) => {
  readonly schema: TSchema;
  readonly toAnswers?: (keys: keyof TSchema) => unknown;
};

function step1<TSchema extends Schema = Schema>(
  stepVal: StepFunction<TSchema>,
): StepFunction<TSchema> {
  return stepVal;
}

const stepResult1 = step1((_something) => ({
  schema: {
    attribute: "anything",
  },
  toAnswers: (keys) => {
    type Test = string extends typeof keys ? never : "true";
    const test: Test = "true"; // ok
    return { test };
  },
}));

type StepFunction2<TSchema extends Schema = Schema> = (anything: unknown) => {
  readonly schema: (thing: number) => TSchema;
  readonly toAnswers?: (keys: keyof TSchema) => unknown;
};

function step2<TSchema extends Schema = Schema>(
  stepVal: StepFunction2<TSchema>,
): StepFunction2<TSchema> {
  return stepVal;
}

const stepResult2 = step2((_something) => ({
  schema: (thing) => ({
    attribute: "anything",
  }),
  toAnswers: (keys) => {
    type Test = string extends typeof keys ? never : "true";
    const test: Test = "true"; // ok
    return { test };
  },
}));
