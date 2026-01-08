// @strict: true
// @noEmit: true

interface ZodType {
  optional: "true" | "false";
  output: any;
}

interface ZodString extends ZodType {
  optional: "false";
  output: string;
}

type ZodShape = Record<string, any>;
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type InferObjectType<Shape extends ZodShape> = Prettify<
  {
    [k in keyof Shape as Shape[k] extends { optional: "true" }
      ? k
      : never]?: Shape[k]["output"];
  } & {
    [k in keyof Shape as Shape[k] extends { optional: "true" }
      ? never
      : k]: Shape[k]["output"];
  }
>;
interface ZodObject<T extends ZodShape> extends ZodType {
  optional: "false";
  output: InferObjectType<T>;
}

interface ZodOptional<T extends ZodType> extends ZodType {
  optional: "true";
  output: T["output"] | undefined;
}

declare function object<T extends ZodShape>(shape: T): ZodObject<T>;
declare function string(): ZodString;
declare function optional<T extends ZodType>(schema: T): ZodOptional<T>;

const Category = object({
  name: string(),
  get parent() {
    return optional(Category);
  },
});

export const name = Category.output.parent?.parent?.parent?.parent?.name;
