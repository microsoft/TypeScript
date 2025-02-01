// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58508

type PathSegment = object[];

type Handle<TData> = {
  crumbBuilder: (data: TData) => PathSegment[];
};

type Loader<TData> = (args: {
  params: Record<string, string>;
}) => Promise<TData>;

type RouteHandler<TData = any> =
  | {
      handle: Handle<never>;
      loader?: never;
    }
  | {
      handle: Handle<TData>;
      loader: Loader<TData>;
    };

const routeHandlerWithoutLoader = {
  handle: {
    crumbBuilder: (data) => [],
  },
} satisfies RouteHandler;

const routeHandler = {
  loader: async (args) => {
    return args.params.userId;
  },
  handle: {
    crumbBuilder: (data) => [],
  },
} satisfies RouteHandler<string>;
