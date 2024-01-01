// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/pull/55714#issuecomment-1715151081

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type Data = Record<string, unknown>;
type DefaultFactory<T> = (props: Data) => T | null | undefined;
type ComponentObjectPropsOptions<P = Data> = {
  [K in keyof P]: Prop<P[K]> | null;
};
interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: D | DefaultFactory<D> | null | undefined | object;
  validator?(value: unknown): boolean;
}
type PropMethod<T, TConstructor = any> = [T] extends [
  ((...args: any) => any) | undefined,
]
  ? {
      new (): TConstructor;
      (): T;
      readonly prototype: TConstructor;
    }
  : never;
type PropConstructor<T = any> =
  | {
      new (...args: any[]): T & {};
    }
  | {
      (): T;
    }
  | PropMethod<T>;
type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
type InferPropType<T> = [T] extends [null]
  ? any // null & true would fail to infer
  : [T] extends [{ type: null | true }]
  ? // As TS issue https://github.com/Microsoft/TypeScript/issues/14829
    // somehow `ObjectConstructor` when inferred from { (): T } becomes `any`
    // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
    any
  : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
  ? Record<string, any>
  : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
  ? boolean
  : [T] extends [DateConstructor | { type: DateConstructor }]
  ? Date
  : [T] extends [(infer U)[] | { type: (infer U)[] }]
  ? U extends DateConstructor
    ? Date | InferPropType<U>
    : InferPropType<U>
  : [T] extends [Prop<infer V, infer D>]
  ? unknown extends V
    ? IfAny<V, V, D>
    : V
  : T;

type PartialKeys<T> = { [P in keyof T]?: unknown };

type AppendDefault<
  T extends ComponentObjectPropsOptions,
  D extends PartialKeys<T>,
> = {
  [P in keyof T]-?: unknown extends D[P]
    ? T[P]
    : T[P] extends Record<string, unknown>
    ? Omit<T[P], "type" | "default"> & {
        type: PropType<MergeDefault<T[P], D[P]>>;
        default: MergeDefault<T[P], D[P]>;
      }
    : {
        type: PropType<MergeDefault<T[P], D[P]>>;
        default: MergeDefault<T[P], D[P]>;
      };
};

type MergeDefault<T, D> = unknown extends D
  ? InferPropType<T>
  : NonNullable<InferPropType<T>> | D;

declare const makeVSelectionControlProps: <
  Defaults extends PartialKeys<{
    trueValue: null;
    falseValue: null;
    value: null;
  }> = {},
>(
  defaults?: Defaults | undefined,
) => AppendDefault<
  {
    trueValue: null;
    falseValue: null;
    value: null;
  },
  Defaults
>;

type Test1 = ReturnType<typeof makeVSelectionControlProps>;
