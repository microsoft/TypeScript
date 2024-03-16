// @strict: true
// @lib: esnext

type StateConfig<TAction extends string> = {
  entry?: TAction
  states?: Record<string, StateConfig<TAction>>;
};

declare function createMachine<
  TConfig extends StateConfig<TAction>,
  TAction extends string = TConfig["entry"] extends string ? TConfig["entry"] : string,
>(config: { [K in keyof TConfig & keyof StateConfig<any>]: TConfig[K] }): [TAction, TConfig];

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

const stuff1 = doStuffWithStuff({ field: 1, anotherField: 'a', extra: 123 })

function doStuffWithStuffArr<T extends Stuff>(arr: { [K in keyof T & keyof Stuff]: T[K] }[]): T[] {
    if(Math.random() > 0.5) {
      return arr as T[]
    } else {
      return arr
    }
}

const stuff2 = doStuffWithStuffArr([
    { field: 1, anotherField: 'a', extra: 123 },
])

// -----------------------------------------------------------------------------------------

type XNumber = { x: number }

declare function foo<T extends XNumber>(props: {[K in keyof T & keyof XNumber]: T[K]}): T;

function bar(props: {x: number, y: string}) {
  return foo(props); // no error because lack of excess property check by design
}

const foo1 = foo({x: 1, y: 'foo'});

const foo2 = foo({...{x: 1, y: 'foo'}}); // no error because lack of excess property check by design

// -----------------------------------------------------------------------------------------

type NoErrWithOptProps = { x: number, y?: string }

declare function baz<T extends NoErrWithOptProps>(props: {[K in keyof T & keyof NoErrWithOptProps]: T[K]}): T;

const baz1 = baz({x: 1});
const baz2 = baz({x: 1, z: 123});
const baz3 = baz({x: 1, y: 'foo'});
const baz4 = baz({x: 1, y: 'foo', z: 123});

// -----------------------------------------------------------------------------------------

interface WithNestedProp {
  prop: string;
  nested: {
    prop: string;
  }
}

declare function withNestedProp<T extends WithNestedProp>(props: {[K in keyof T & keyof WithNestedProp]: T[K]}): T;

const wnp = withNestedProp({prop: 'foo', nested: { prop: 'bar' }, extra: 10 });

// -----------------------------------------------------------------------------------------

type IsLiteralString<T extends string> = string extends T ? false : true;

interface ProvidedActor {
  src: string;
  logic: () => Promise<unknown>;
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

declare function createXMachine<
  const TConfig extends MachineConfig<TActor>,
  TActor extends ProvidedActor = TConfig extends { types: { actors: ProvidedActor} } ? TConfig["types"]["actors"] : ProvidedActor,
>(config: {[K in keyof MachineConfig<any> & keyof TConfig]: TConfig[K] }): TConfig;

const child = () => Promise.resolve("foo");

const config = createXMachine({
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

const config2 = createXMachine({
  invoke: {
    src: "whatever",
  },
  extra: 10
});

declare function fn1<T extends Record<string, number>>(obj: {
  [K in keyof T & "a"]: T[K];
}): T;
const obj1 = {
  a: 42,
  b: true,
};
const result1 = fn1(obj1);

declare function fn2<T extends Record<string, number>>(obj: {
  [K in (keyof T & "a") | "b"]: T[K];
}): T;
const obj2 = {
  a: 42,
  b: 100,
  c: true,
};
const result2 = fn2(obj2);

declare function fn3<T1, T2>(obj: {
  [K in keyof T1 & keyof T2]: {
    v1: T1[K];
    v2: T2[K];
  };
}): [T1, T2];

const result3 = fn3({
  a: {
    v1: "foo",
    v2: 100,
  },
  b: {
    v1: true,
    v2: null,
  },
});

declare function fn4<T, E extends Record<string, number>>(arg: {
  [K in keyof T & keyof E]: {
    data: T[K];
    onSuccess: (data: T[K]) => void;
    error: E[K];
    onError: (data: E[K]) => void;
  };
}): [T, E];

const result4 = fn4({
  a: {
    data: "foo",
    onSuccess: (dataArg) => {
      dataArg;
    },
    error: 404,
    onError: (errorArg) => {
      errorArg;
    },
  },
  b: {
    data: true,
    onSuccess: (dataArg) => {
      dataArg;
    },
    error: 500,
    onError: (errorArg) => {
      errorArg;
    },
  },
});
