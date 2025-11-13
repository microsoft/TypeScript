// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62204

declare function TestConfig<
  const TConfig extends { a?: any; b?: any; c?: any },
>(
  config: TConfig,
  test: keyof Omit<TConfig, "a" | "b"> extends never ? true : false,
): void;

TestConfig(
  {
    a: "hello",
    b: function () {
      return "123";
    },
  },
  true,
);

declare function TestConfig_2<
  const TConfig extends { a?: any; b?: (arg: number) => unknown; c?: any },
>(
  config: TConfig,
  test: keyof Omit<TConfig, "a" | "b"> extends never ? true : false,
): void;

TestConfig_2(
  {
    a: "hello",
    b: (arg) => {
      return "123";
    },
  },
  true,
);

// https://github.com/microsoft/TypeScript/issues/47599#issuecomment-2919401231
type KeysMatchingType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
type ExtractItems<R, IK extends keyof R> = R[IK] extends readonly (infer T)[]
  ? T
  : never;
type StreamPaginatedDataProps<R, IK, TK> = {
  callback: (limit: number, offset: number) => Promise<R>;
  responseKeys: { items: IK; total: TK };
  limit?: number;
};

declare function streamPaginatedData<
  R,
  const IK extends KeysMatchingType<R, readonly unknown[]>,
  const TK extends KeysMatchingType<R, number>,
>({
  callback,
  responseKeys,
  limit,
}: StreamPaginatedDataProps<R, IK, TK>): AsyncGenerator<
  ExtractItems<R, IK>,
  void,
  unknown
>;

const sampleData = [
  { location: { name: "New York" } },
  { location: { name: "Tokyo" } },
] as const;

streamPaginatedData({
  callback: async (a, b) => ({
    someCount: sampleData.length,
    abra: sampleData,
  }),
  responseKeys: { total: "someCount", items: "abra" },
})

// https://github.com/microsoft/TypeScript/issues/47599#issuecomment-2132658606
interface Base {
  x: string;
}
interface Foo extends Base {
  y: number;
}

type Fn<T> = (t: T) => void;
declare const FooFn: Fn<Foo>;

type Baz = <R extends Base, F extends Fn<R>>(arg: {
  x: (bar: Foo) => R;
  y?: F[];
}) => R;

declare const baz: Baz;
const R1 = baz({ x: (ctx) => ctx });
const R2 = baz({ x: (ctx) => ctx, y: [FooFn] });

// https://github.com/microsoft/TypeScript/issues/55489
type NonStringIterable<T> = T extends string
  ? never
  : T extends Iterable<any>
  ? T
  : never;

declare function doSomething<T>(value: NonStringIterable<T>): T;

const o = { foo() {} };

doSomething("value"); // error
doSomething(["v"]);
doSomething([o]);
doSomething([{ foo() {} }]);

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
  target: "$test4",
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

type SetType_2<Options> = {
  [key: `data${number}`]: Record<string, (arg: number) => void>;
  target?: ExtractFields<Options>;
};

declare function test55124_2<OptionsData extends SetType_2<OptionsData>>(
  options: OptionsData,
): void;

test55124_2({
  target: "$test4",
  data1: {
    $test1: () => {},
    $test2: () => {},
  },
  data2: {
    $test3: () => {},
    $test4: () => {},
    $test5: (arg) => {},
  },
});

// https://github.com/microsoft/TypeScript/issues/54438
interface Entity {
  id: number;
  name: string;
}

type Fn54438<T> = (params: Record<string, unknown>) => T[];

declare function test54438<T, K extends keyof T>(fn: Fn54438<T>, key: K): T;

test54438(() => [] as Entity[], "id");
test54438((params: Record<string, unknown>) => [] as Entity[], "name");
test54438((params: unknown) => [] as Entity[], "id");
test54438((params) => [] as Entity[], "id");

export declare const serve: <Req>(props: {
  bindings: Extract<NoInfer<Req>, string>;
  fetch: (event: unknown) => Generator<Req>;
}) => unknown;

declare const bar: () => Generator<"SendMessage">;

serve({
  bindings: "SendMessage" as const,
  fetch: function* (a) {
    yield* bar();
  },
});