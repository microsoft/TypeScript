// @strict: true
// @noEmit: true

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type FieldValues = Record<string, any>;

type PathImpl<
  K extends string | number,
  V,
  TraversedTypes,
> = V extends Primitive
  ? `${K}`
  : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V>}`;

type PathInternal<T, TraversedTypes = T> = {
  [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>;
}[keyof T];

type Path<T> = T extends any ? PathInternal<T> : never;

type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

type PathValue<T, P extends Path<T>> = T extends any
  ? P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? R extends Path<T[K]>
        ? PathValue<T[K], R>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : never
  : never;

type FieldPathValue<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> = PathValue<TFieldValues, TFieldPath>;

type UseControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
};

declare function useController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName>,
): { name: TName; values: TFieldValues };

export const { name, values } = useController({
  name: "test",
  defaultValue: "",
});
