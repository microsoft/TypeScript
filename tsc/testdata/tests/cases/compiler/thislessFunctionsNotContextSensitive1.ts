// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62204

declare function TestConfig<const TConfig extends { a?: any; b?: any; c?: any }>(
  config: TConfig,
  test: keyof Omit<TConfig, "a" | "b"> extends never ? true : false,
): void;

TestConfig(
  {
    a: "hello",
    b: function () {
      return 123;
    },
  },
  true,
);

TestConfig(
  {
    a: "hello",
    b: function () {
      return 123;
    },
  },
  false, // error
);

// https://github.com/microsoft/TypeScript/issues/60986
interface SubscribeFieldOptions<Event> {
  subscribe: () => Event;
  resolve: (event: Event) => number;
}

declare function defineOptions<Event>(
  options: SubscribeFieldOptions<Event>,
): void;

defineOptions({
  resolve: (event) => event, // number
  subscribe() {
    return 123;
  },
});

defineOptions({
  resolve: (event) => event, // number
  subscribe: function () {
    return 123;
  },
});

// https://github.com/microsoft/TypeScript/issues/58630

export type StateFunction<State> = (s: State, ...args: any[]) => any;

export type VuexStoreOptions<State, Modules> = {
  state?: State | (() => State) | { (): State };
  mutations?: Record<string, StateFunction<State>>;
  modules?: {
    [k in keyof Modules]: VuexStoreOptions<Modules[k], never>;
  };
};

export function createStore<
  State extends Record<string, unknown>,
  Modules extends Record<string, Record<string, unknown>>,
>(options: VuexStoreOptions<State, Modules>) {}

const store = createStore({
  state() {
    return { bar2: 1 };
  },
  mutations: { inc: (state123) => state123.bar2++ },
  modules: {
    foo: {
      state() {
        return { bar2: 1 };
      },
      mutations: { inc: (state) => state.bar2++ },
    },
  },
});

// https://github.com/microsoft/TypeScript/issues/57572

type C = <Methods, Attached = (methods: Methods) => void>(options: {
  methods: Methods;
  attached: Attached;
}) => any;

var Component: C = () => {};

Component({
  attached(methods) {
    methods.bbb(); // ok
  },
  methods: {
    bbb() {},
  },
});

Component({
  attached(methods) {
    methods.bbb(); // ok
  },
  methods: {
    bbb: () => {},
  },
});

// https://github.com/microsoft/TypeScript/issues/56067

declare function create56067<
  State extends Record<string, any>,
  Data extends Record<string, any>,
  Actions extends (state: State, data: Data) => Record<string, any>,
>(args: { getState: () => State; actions: Actions; getData: () => Data }): void;

create56067({
  getState() {
    return { a: 1 };
  },
  getData: () => {
    return { b: 2 };
  },
  actions(state, data) {
    state // { a: number }
    data; // { b: number }
    return {
      z: 1,
    };
  },
});

// https://github.com/microsoft/TypeScript/issues/55489
type NonStringIterable<T> = 
  T extends string ? never : T extends Iterable<any> ? T : never;

declare function doSomething<T>(value: NonStringIterable<T>): T;

const o = { foo() {} };

doSomething('value'); // error
doSomething(['v']); // ok
doSomething([o]); // ok
doSomething([{ foo() {} }]); // ok

// https://github.com/microsoft/TypeScript/issues/55124
type Values<T> = T[keyof T];
type ExtractFields<Options> = Values<{
  [K in keyof Options]: Options[K] extends object ? keyof Options[K] : never;
}>;
type SetType<Options> = {
  [key: string]: any;
  target?: ExtractFields<Options>;
};

declare function test55124<OptionsData extends SetType<OptionsData>>(
  options: OptionsData,
): void;

test55124({
  target: "$test4", // ok
  data1: {
    $test1: 111,
    $test2: null,
  },
  data2: {
    $test3: {},
    $test4: () => {},
    $test5() {},
  },
});

test55124({
  target: "$test6", // error
  data1: {
    $test1: 111,
    $test2: null,
  },
  data2: {
    $test3: {},
    $test4: () => {},
    $test5() {},
  },
});

// https://github.com/microsoft/TypeScript/issues/53924
function test53924<T = unknown>(options: { a: (c: T) => void; b: () => T }) {}

test53924({
  a: (c) => {
    c; // number;
  },
  b: () => 123,
});

test53924({
  b: () => 123,
  a: (c) => {
    return c; // number
  },
});

test53924({
  b() {
    return 123;
  },
  a(c) {
    return c; // number
  },
});

test53924({
  a(c) {
    return c; // number
  },
  b() {
    return 123;
  },
});

// https://github.com/microsoft/TypeScript/issues/50258
declare function monitor<T extends (...args: any) => any>(
  extractor: (...args: Parameters<T>) => Record<string, unknown>,
  executor: T,
): (...args: Parameters<T>) => ReturnType<T>;

monitor(
  (p) => ({ p }), // { p: number }
  (p: number) => p,
);
monitor(
  (p) => ({ p }), // { p: number }
  function (p: number) {
    return p;
  },
);
