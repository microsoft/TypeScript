// @strict: true
// @noEmit: true

type ObjectType<Source> = {
  kind: "object";
  __source: (source: Source) => void;
};

type Field<Source, Key extends string> = {
  __key: (key: Key) => void;
  __source: (source: Source) => void;
};

declare const object: <Source>() => <
  Fields extends {
    [Key in keyof Fields]: Field<Source, Key & string>;
  }
>(config: {
  name: string;
  fields: Fields | (() => Fields);
}) => ObjectType<Source>;

type InferValueFromObjectType<Type extends ObjectType<any>> =
  Type extends ObjectType<infer Source> ? Source : never;

type FieldResolver<Source, TType extends ObjectType<any>> = (
  source: Source
) => InferValueFromObjectType<TType>;

type FieldFuncArgs<Source, Type extends ObjectType<any>> = {
  type: Type;
  resolve: FieldResolver<Source, Type>;
};

declare const field: <Source, Type extends ObjectType<any>, Key extends string>(
  field: FieldFuncArgs<Source, Type>
) => Field<Source, Key>;

type Something = { foo: number };

// inference fails here, but ideally should not
const A = object<Something>()({
  name: "A",
  fields: () => ({
    a: field({
      type: A,
      resolve() {
        return {
          foo: 100,
        };
      },
    }),
  }),
});
