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
create(function (arg) { return ({
    onEnd: function (context) { },
    onStart: function () { return ({ time: new Date() }); },
}); });
function step(stepVal) {
    return stepVal;
}
var stepResult1 = step(function (_something) { return ({
    schema: {
        attribute: "anything",
    },
    toAnswers: function (keys) {
        var test = "true"; // ok
        return { test: test };
    },
}); });
var stepResult2 = step(function (_something) { return ({
    toAnswers: function (keys) {
        var test = "true"; // ok
        return { test: test };
    },
    schema: {
        attribute: "anything",
    },
}); });
var res1 = test1(function (_something) { return ({
    stuff: "foo",
    consume: function (arg) {
        return function (_something) { return ({
            stuff2: 42,
            consume2: function (arg2) { },
        }); };
    },
}); });
var res2 = test1(function (_something) { return ({
    consume: function (arg) {
        return function (_something) { return ({
            consume2: function (arg2) { },
            stuff2: 42,
        }); };
    },
    stuff: "foo",
}); });
var res3 = test1(function (_something) { return ({
    stuff: "foo",
    consume: function () {
        return function (_something) { return ({
            stuff2: 42,
            consume2: function (arg2) { },
        }); };
    },
}); });
var res4 = test1(function (_something) { return ({
    consume: function () {
        return function (_something) { return ({
            consume2: function (arg2) { },
            stuff2: 42,
        }); };
    },
    stuff: "foo",
}); });
var res5 = test1(function (_something) { return ({
    stuff: "foo",
    consume: function () {
        return function () { return ({
            stuff2: 42,
            consume2: function (arg2) { },
        }); };
    },
}); });
var res6 = test1(function (_something) { return ({
    consume: function () {
        return function () { return ({
            consume2: function (arg2) { },
            stuff2: 42,
        }); };
    },
    stuff: "foo",
}); });
var res7 = test1(function (_something) { return ({
    stuff: "foo",
    consume: function () {
        return function () { return ({
            stuff2: 42,
            consume2: function () { },
        }); };
    },
}); });
var res8 = test1(function (_something) { return ({
    consume: function () {
        return function () { return ({
            consume2: function () { },
            stuff2: 42,
        }); };
    },
    stuff: "foo",
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
declare function step<TSchema extends Schema = Schema>(stepVal: StepFunction<TSchema>): StepFunction<TSchema>;
declare const stepResult1: StepFunction<{
    attribute: string;
}>;
declare const stepResult2: StepFunction<{
    attribute: string;
}>;
type Fn1<T, T2> = (anything: unknown) => {
    stuff: T;
    consume: (arg: T) => (anything: unknown) => {
        stuff2: T2;
        consume2: (arg: T2) => void;
    };
};
declare function test1<T, T2>(fn: Fn1<T, T2>): [T, T2];
declare const res1: [string, number];
declare const res2: [string, number];
declare const res3: [string, number];
declare const res4: [string, number];
declare const res5: [string, number];
declare const res6: [string, number];
declare const res7: [string, number];
declare const res8: [string, number];
