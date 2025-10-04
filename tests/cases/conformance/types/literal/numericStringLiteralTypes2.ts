// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55383

type LiteralType = string | number | boolean;
type ValueGetter<ValueType extends LiteralType = LiteralType> = () => ValueType;

type Schema = SchemaArray | SchemaObject | LiteralType;
type SchemaArray = Array<SchemaObject | SchemaArray | LiteralType>;
type SchemaObject = {
  [key: string]: SchemaObject | SchemaArray | LiteralType;
};

type InferValuesFromSchema<S extends Schema> = S extends LiteralType
  ? ValueGetter<S>
  : S extends SchemaArray
  ? {
      [K in keyof S]: InferValuesFromSchema<S[K]>; // `S[K]` should satisfy the required `Schema` constraint here
    }
  : S extends SchemaObject
  ? {
      [K in keyof S]: InferValuesFromSchema<S[K]>;
    }
  : never;
