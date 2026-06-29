// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63568

type Type = { values: string };

type Wrapped<T extends Type> = { values: T["values"] };

type FromObject<Context extends Record<string, Type>, Props extends Context, Shape extends Record<keyof Props, Type> = {
  [Key in keyof Props]: Wrapped<FromSchema<Context, Props[Key]>>;
}> = Shape;

type FromSchema<Context extends Record<string, Type>, S> =
  S extends Type ? FromSchema<Context, Context[keyof Context]> : never;

// https://github.com/microsoft/typescript-go/issues/4463

type JSONSchema =
  | boolean
  | Readonly<{
      items?: JSONSchema;
      additionalItems?: JSONSchema;
      properties?: JSONSchema;
      additionalProperties?: JSONSchema;
    }>;

// Stands in for json-schema-to-ts's ParseSchema; its only role here is to impose the
// `extends JSONSchema` constraint on whatever type it is handed.
type ParseSchema<SCHEMA extends JSONSchema> = unknown;

type RemoveInvalidAdditionalItems<SCHEMA extends JSONSchema> = SCHEMA extends Readonly<{
  items: JSONSchema;
}>
  ? SCHEMA extends Readonly<{ additionalItems: JSONSchema }>
    ? SCHEMA
    : SCHEMA & Readonly<{ additionalItems: true }>
  : SCHEMA extends boolean
    ? SCHEMA
    : Omit<SCHEMA, "additionalItems">;

type RemoveInvalidAdditionalProperties<SCHEMA extends JSONSchema> = SCHEMA extends Readonly<{
  additionalProperties: JSONSchema;
}>
  ? SCHEMA extends Readonly<{ properties: JSONSchema }>
    ? SCHEMA
    : SCHEMA & Readonly<{ properties: {} }>
  : SCHEMA extends boolean
    ? SCHEMA
    : Omit<SCHEMA, "additionalProperties">;

type MergeSubSchema<
  SUB_SCHEMA extends JSONSchema,
  CLEANED_SUB_SCHEMA extends JSONSchema = RemoveInvalidAdditionalProperties<
    RemoveInvalidAdditionalItems<SUB_SCHEMA>
  >,
> = Omit<JSONSchema, keyof CLEANED_SUB_SCHEMA> & CLEANED_SUB_SCHEMA;

// The failing site: MergeSubSchema<SUB_SCHEMAS_HEAD> is rejected as not satisfying
// the `extends JSONSchema` constraint on ParseSchema.
type RecurseOnAllOfSchema<SUB_SCHEMAS extends readonly JSONSchema[]> =
  SUB_SCHEMAS extends readonly [infer SUB_SCHEMAS_HEAD]
    ? SUB_SCHEMAS_HEAD extends JSONSchema
      ? ParseSchema<MergeSubSchema<SUB_SCHEMAS_HEAD>>
      : never
    : never;
