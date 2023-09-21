//// [tests/cases/compiler/reverseMappedTypeIntersectionConstraint.ts] ////

//// [reverseMappedTypeIntersectionConstraint.ts]
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

// -----------------------------------------------------------------------------------------

type NoErrWithOptProps = { x: number, y?: string }

declare function baz<T extends NoErrWithOptProps>(props: {[K in keyof T & keyof NoErrWithOptProps]: T[K]}): void;

baz({x: 1});
baz({x: 1, z: 123});
baz({x: 1, y: 'foo'});
baz({x: 1, y: 'foo', z: 123});

// -----------------------------------------------------------------------------------------

interface WithNestedProp {
  prop: string;
  nested: {
    prop: string;
  }
}

declare function withNestedProp<T extends WithNestedProp>(props: {[K in keyof T & keyof WithNestedProp]: T[K]}): T;

const wnp = withNestedProp({prop: 'foo', nested: { prop: 'bar' }, extra: 10 });
//    ^?

// -----------------------------------------------------------------------------------------

type IsLiteralString<T extends string> = string extends T ? false : true;

type DeepWritable<T> = T extends Function ? T : { -readonly [K in keyof T]: DeepWritable<T[K]> }

interface ProvidedActor {
  src: string;
  logic: () => Promise<unknown>;
}

interface InferenceSource<TActor extends ProvidedActor> {
  types?: {
    actors?: TActor;
  };
}

type DistributeActors<TActor> = TActor extends { src: infer TSrc }
  ? {
      src: TSrc;
    }
  : never;

interface MachineConfig<TActor extends ProvidedActor> {
  types?: {
    actors?: TActor;
  };
  invoke: IsLiteralString<TActor["src"]> extends true
    ? DistributeActors<TActor>
    : {
        src: string;
      };
}

type NoExtra<T> = {
  [K in keyof T]: K extends keyof MachineConfig<any> ? T[K] : never
}

declare function createMachine2<
  TConfig extends MachineConfig<TActor>,
  TActor extends ProvidedActor = TConfig extends { types: { actors: ProvidedActor} } ? TConfig["types"]["actors"] : ProvidedActor,
>(config: {[K in keyof MachineConfig<any> & keyof TConfig]: TConfig[K] }): TConfig;

const child = () => Promise.resolve("foo");

const config = createMachine2({
   // ^?
  types: {} as {
    actors: {
      src: "str";
      logic: typeof child;
    };
  },
  invoke: {
    src: "str",
  },
  extra: 10
});



const config2 = createMachine2({
  invoke: {
    src: "whatever" as const,
  },
  extra: 10
});

config2
// ^?


//// [reverseMappedTypeIntersectionConstraint.js]
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
baz({ x: 1 });
baz({ x: 1, z: 123 });
baz({ x: 1, y: 'foo' });
baz({ x: 1, y: 'foo', z: 123 });
var wnp = withNestedProp({ prop: 'foo', nested: { prop: 'bar' }, extra: 10 });
var child = function () { return Promise.resolve("foo"); };
var config = createMachine2({
    // ^?
    types: {},
    invoke: {
        src: "str",
    },
    extra: 10
});
var config2 = createMachine2({
    invoke: {
        src: "whatever",
    },
    extra: 10
});
config2;
// ^?
