// @strict: true
// @lib: esnext
// @noEmit: true

interface FastifyTypeProvider {
  readonly input: unknown;
  readonly output: unknown;
}

export interface FastifyTypeProviderDefault extends FastifyTypeProvider {}

type CallTypeProvider<F extends FastifyTypeProvider, I> = (F & {
  input: I;
})["output"];
type UndefinedToUnknown<T> = [T] extends [undefined] ? unknown : T;

interface RouteGenericInterface {
  Querystring?: unknown;
}

interface FastifySchema {
  querystring?: unknown;
  headers?: unknown;
}

interface FastifyRequestType<Querystring = unknown> {
  query: Querystring;
}

type ResolveRequestQuerystring<
  TypeProvider extends FastifyTypeProvider,
  SchemaCompiler extends FastifySchema,
> = UndefinedToUnknown<
  CallTypeProvider<TypeProvider, SchemaCompiler["querystring"]>
>;

interface ResolveFastifyRequestType<
  TypeProvider extends FastifyTypeProvider,
  SchemaCompiler extends FastifySchema,
> {
  query: ResolveRequestQuerystring<TypeProvider, SchemaCompiler>;
}

interface FastifyRequest<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  RequestType extends FastifyRequestType = ResolveFastifyRequestType<
    TypeProvider,
    SchemaCompiler
  >,
> {
  query: RequestType["query"];
}

interface RouteOptions<
  RouteGeneric extends RouteGenericInterface,
  SchemaCompiler extends FastifySchema,
  TypeProvider extends FastifyTypeProvider,
> {
  schema?: SchemaCompiler;
  onRequest?: (
    request: FastifyRequest<RouteGeneric, SchemaCompiler, TypeProvider>,
  ) => void;
  method: "GET" | "POST";
  url: string;
  handler: (
    request: FastifyRequest<RouteGeneric, SchemaCompiler, TypeProvider>,
  ) => void;
}

interface FastifyInstance<TypeProvider extends FastifyTypeProvider> {
  route<
    RouteGeneric extends RouteGenericInterface,
    SchemaCompiler extends FastifySchema,
  >(
    opts: RouteOptions<RouteGeneric, SchemaCompiler, TypeProvider>,
  ): void;
}

type Type<Output> = {
  _output: Output;
};

declare function string(): Type<string>;

interface ZodTypeProvider extends FastifyTypeProvider {
  output: this["input"] extends { _output: unknown }
    ? this["input"]["_output"]
    : never;
}

const verifyAuth =
  <T extends FastifyRequest>() =>
  (req: T) => {};

declare const server: FastifyInstance<ZodTypeProvider>;

server.route({
  url: "/config",
  method: "GET",
  schema: {
    querystring: string(),
  },
  onRequest: verifyAuth(),
  handler: async (req) => {
    const query: string = req.query;
  },
});

interface Container<V> {
  v: V;
}

declare function makeWith<Key, Value>(options: {
  readonly lookup: (key: Key) => Value;
  readonly timeToLive: (exit: Container<Value>) => number;
}): [Key, Value];

declare function fn<A, R>(fn: (arg: A) => R): (arg: A) => R;

const result1 = makeWith({
  lookup: fn((key: string) => key),
  timeToLive: () => 10,
});

const result2 = makeWith({
  lookup: fn((key: string) => key),
  timeToLive: (exit) => exit.v.length,
});

// https://github.com/microsoft/TypeScript/issues/53776
function deferQuery<TData>({}: {
  queryFn: () => Promise<TData>;
  onSuccess: (data: TData) => void;
}) {}

export function decorate<TParams extends unknown[], TResult>(
  func: (...params: TParams) => Promise<TResult>,
  ...params: TParams
): () => Promise<TResult> {
  return () => {
    return func(...params);
  };
}

type ArbitraryData = {
  property: string;
};

export function getArbitraryData(_id: number): Promise<ArbitraryData[]> {
  return Promise.resolve([{ property: "123" }]);
}

deferQuery({
  queryFn: decorate(getArbitraryData, 10),
  onSuccess(data) {
    data.forEach((item) => {});
  },
});

const getData = decorate(getArbitraryData, 10);
deferQuery({
  queryFn: getData,
  onSuccess(data) {
    data.forEach((item) => {});
  },
});

// https://github.com/microsoft/TypeScript/issues/52114
export type ActionReducer<State> = (state: State | undefined) => State;

export function createReducer<State>(
  initialState: State,
): ActionReducer<State> {
  return {} as any;
}

export function createFeature<State>(config: {
  reducer: ActionReducer<State>;
  selectors: (state: State) => unknown;
}) {}

createFeature({
  reducer: createReducer(""),
  selectors: (state) => ({}),
});

const reducer = createReducer(true);
createFeature({
  reducer,
  selectors: (state) => ({}),
});

export {};
