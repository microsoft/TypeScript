//// [tests/cases/conformance/types/typeRelationships/typeInference/intraExpressionInferencesInContextSensitive1.ts] ////

//// [intraExpressionInferencesInContextSensitive1.ts]
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


//// [intraExpressionInferencesInContextSensitive1.js]
"use strict";
function create(builder) {
    return builder(true);
}
create(function (arg) { return ({
    onStart: function (arg) { return ({ time: new Date() }); },
    onEnd: function (context) { },
}); });
function step(stepVal) {
    return stepVal;
}
var stepResult = step(function (_something) { return ({
    schema: function (thing) { return ({
        attribute: "anything",
    }); },
    toAnswers: function (keys) {
        var test = "true"; // ok
        return { test: test };
    },
}); });
var res1 = test1(function (_something) { return ({
    produce: function (input) { return "foo"; },
    consume: function (arg) {
        return function (_something) { return ({
            produce2: function (input) { return 42; },
            consume2: function (arg2) { },
        }); };
    },
}); });
var res2 = test1(function (_something) { return ({
    produce: function (input) { return "foo"; },
    consume: function (arg) {
        return function () { return ({
            produce2: function (input) { return 42; },
            consume2: function (arg2) { },
        }); };
    },
}); });


//// [intraExpressionInferencesInContextSensitive1.d.ts]
type Options<TContext> = {
    onStart?: (arg: number) => TContext;
    onEnd?: (context: TContext) => void;
};
declare function create<TContext>(builder: (arg: boolean) => Options<TContext>): Options<TContext>;
type Schema = Record<string, unknown>;
type StepFunction<TSchema extends Schema = Schema> = (anything: unknown) => {
    readonly schema: (thing: number) => TSchema;
    readonly toAnswers?: (keys: keyof TSchema) => unknown;
};
declare function step<TSchema extends Schema = Schema>(stepVal: StepFunction<TSchema>): StepFunction<TSchema>;
declare const stepResult: StepFunction<{
    attribute: string;
}>;
type Fn1<T, T2> = (anything: unknown) => {
    produce: (arg: number) => T;
    consume: (arg: T) => (anything: unknown) => {
        produce2: (arg: number) => T2;
        consume2: (arg: T2) => void;
    };
};
declare function test1<T, T2>(fn: Fn1<T, T2>): [T, T2];
declare const res1: [string, number];
declare const res2: [string, number];
