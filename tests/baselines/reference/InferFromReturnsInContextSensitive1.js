//// [tests/cases/conformance/types/typeRelationships/typeInference/InferFromReturnsInContextSensitive1.ts] ////

//// [InferFromReturnsInContextSensitive1.ts]
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


//// [InferFromReturnsInContextSensitive1.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/60720
function create(builder) {
    return builder(true);
}
create(function (arg) { return ({
    onStart: function () { return ({ time: new Date() }); },
    onEnd: function (context) { },
}); });
function step1(stepVal) {
    return stepVal;
}
var stepResult1 = step1(function (_something) { return ({
    schema: {
        attribute: "anything",
    },
    toAnswers: function (keys) {
        var test = "true"; // ok
        return { test: test };
    },
}); });


//// [InferFromReturnsInContextSensitive1.d.ts]
type Options<TContext> = {
    onStart?: () => TContext;
    onEnd?: (context: TContext) => void;
};
declare function create<TContext>(builder: (arg: boolean) => Options<TContext>): Options<TContext>;
type Schema = Record<string, unknown>;
type StepFunction<TSchema extends Schema = Schema> = (anything: unknown) => {
    readonly schema: TSchema;
    readonly toAnswers?: (keys: keyof TSchema) => unknown;
};
declare function step1<TSchema extends Schema = Schema>(stepVal: StepFunction<TSchema>): StepFunction<TSchema>;
declare const stepResult1: StepFunction<{
    attribute: string;
}>;
