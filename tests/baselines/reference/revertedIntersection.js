//// [tests/cases/compiler/revertedIntersection.ts] ////

//// [revertedIntersection.ts]
type StateConfig<TAction extends string> = {
  entry?: TAction
  states?: Record<string, StateConfig<TAction>>;
};

type StateSchema = {
  states?: Record<string, StateSchema>;
};

declare function createMachine<
  TConfig extends StateConfig<TAction>,
  TAction extends string = TConfig["entry"] extends string ? TConfig["entry"] : string,
>(config: { [K in keyof TConfig & keyof StateConfig<TAction>]: TConfig[K] }): [TAction, TConfig];

const inferredParams1 = createMachine({
  entry: "foo",
  states: {
    a: {
      entry: "bar",
    },
  },
  extra: 12,
});

const inferredParams2 = createMachine({
  entry: "foo",
  states: {
    a: {
      entry: "foo",
    },
  },
  extra: 12,
});


// -----------------------------------------------------------------------------------------

const checkType = <T>() => <U extends T>(value: { [K in keyof U & keyof T]: U[K] }) => value;

const checked = checkType<{x: number, y: string}>()({
  x: 1 as number,
  y: "y",
  z: "z", // undesirable property z is *not* allowed
});

checked;
  // ^?

// -----------------------------------------------------------------------------------------

interface Stuff {
    field: number;
    anotherField: string;
}

function doStuffWithStuff<T extends Stuff>(s: { [K in keyof T & keyof Stuff]: T[K] } ): T {
    if(Math.random() > 0.5) {
      return s as T
    } else {
      return s
    }
}

doStuffWithStuff({ field: 1, anotherField: 'a', extra: 123 })

function doStuffWithStuffArr<T extends Stuff>(arr: { [K in keyof T & keyof Stuff]: T[K] }[]): T[] {
    if(Math.random() > 0.5) {
      return arr as T[]
    } else {
      return arr
    }
}

doStuffWithStuffArr([
    { field: 1, anotherField: 'a', extra: 123 },
])

// -----------------------------------------------------------------------------------------

type XNumber = { x: number }

declare function foo<T extends XNumber>(props: {[K in keyof T & keyof XNumber]: T[K]}): void;

function bar(props: {x: number, y: string}) {
  return foo(props); // no error because lack of excess property check by design
}

foo({x: 1, y: 'foo'});

foo({...{x: 1, y: 'foo'}}); // no error because lack of excess property check by design

//// [revertedIntersection.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var inferredParams1 = createMachine({
    entry: "foo",
    states: {
        a: {
            entry: "bar",
        },
    },
    extra: 12,
});
var inferredParams2 = createMachine({
    entry: "foo",
    states: {
        a: {
            entry: "foo",
        },
    },
    extra: 12,
});
// -----------------------------------------------------------------------------------------
var checkType = function () { return function (value) { return value; }; };
var checked = checkType()({
    x: 1,
    y: "y",
    z: "z", // undesirable property z is *not* allowed
});
checked;
function doStuffWithStuff(s) {
    if (Math.random() > 0.5) {
        return s;
    }
    else {
        return s;
    }
}
doStuffWithStuff({ field: 1, anotherField: 'a', extra: 123 });
function doStuffWithStuffArr(arr) {
    if (Math.random() > 0.5) {
        return arr;
    }
    else {
        return arr;
    }
}
doStuffWithStuffArr([
    { field: 1, anotherField: 'a', extra: 123 },
]);
function bar(props) {
    return foo(props); // no error because lack of excess property check by design
}
foo({ x: 1, y: 'foo' });
foo(__assign({ x: 1, y: 'foo' })); // no error because lack of excess property check by design
