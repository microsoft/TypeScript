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

export {};
