// @strict: true
// @noEmit: true

type FieldValues = Record<string, any>;

type UseControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends keyof TFieldValues = keyof TFieldValues,
> = {
  name: TName;
  defaultValue?: TFieldValues[TName];
};

declare function useController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends keyof TFieldValues = keyof TFieldValues,
>(
  props: UseControllerProps<TFieldValues, TName>,
): { name: TName; values: TFieldValues };

export const { name, values } = useController({
  name: "test",
  defaultValue: "",
});

declare function fn1<T, U>(arg: T[keyof T & keyof U], u: U): T;

const res1 = fn1("foo", { prop: 42 });
