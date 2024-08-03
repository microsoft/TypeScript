//// [tests/cases/conformance/types/typeRelationships/typeInference/intraExpressionInferencesInContextSensitive1.ts] ////

//// [intraExpressionInferencesInContextSensitive1.ts]
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


//// [intraExpressionInferencesInContextSensitive1.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/60720
function create(builder) {
    return builder(true);
}
create(function (arg) { return ({
    onStart: function () { return ({ time: new Date() }); },
    onEnd: function (context) { },
}); });
create(function () { return ({
    onStart: function () { return ({ time: new Date() }); },
    onEnd: function (context) { },
}); });
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
function step2(stepVal) {
    return stepVal;
}
var stepResult2 = step2(function (_something) { return ({
    schema: function (thing) { return ({
        attribute: "anything",
    }); },
    toAnswers: function (keys) {
        var test = "true"; // ok
        return { test: test };
    },
}); });


//// [intraExpressionInferencesInContextSensitive1.d.ts]
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
type StepFunction2<TSchema extends Schema = Schema> = (anything: unknown) => {
    readonly schema: (thing: number) => TSchema;
    readonly toAnswers?: (keys: keyof TSchema) => unknown;
};
declare function step2<TSchema extends Schema = Schema>(stepVal: StepFunction2<TSchema>): StepFunction2<TSchema>;
declare const stepResult2: StepFunction2<{
    attribute: string;
}>;
