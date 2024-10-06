// @strict: true
// @noEmit: true

type Request<TSchema extends Schema> = {
  query: TSchema["query"];
};

type Schema = { query?: unknown; body?: unknown };

declare function route<TSchema extends Schema>(obj: {
  pre: (a: TSchema) => void;
  schema: TSchema;
  handle: (req: Request<TSchema>) => void;
}): void;

const validate = (_: { query?: unknown; body?: unknown }) => {};

route({
  pre: validate,
  schema: {
    query: "",
  },
  handle: (req) => {
    const test: string = req.query;
  },
});

export {};
