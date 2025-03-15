// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59937

type Ref<T> = {
  current: T;
};

type FunctionComponent<P> = (props: P) => unknown;

type ComponentProps<T extends FunctionComponent<any>> =
  T extends FunctionComponent<infer P> ? P : {};

type PropsWithoutRef<P> = P extends any
  ? "ref" extends keyof P
    ? Omit<P, "ref">
    : P
  : P;

type ComponentPropsWithoutRef<T extends FunctionComponent<any>> =
  PropsWithoutRef<ComponentProps<T>>;

declare function forwardRef<T, P>(
  component: (props: P, ref: Ref<T>) => unknown,
): (props: P & { ref?: Ref<T> }) => unknown;

const ComponentWithForwardRef = forwardRef(
  <T extends FunctionComponent<any>>(
    props: ComponentPropsWithoutRef<T>,
    ref: Ref<HTMLElement>,
  ) => {
    return null;
  },
);

type Test<T> = T extends { component?: infer Component }
  ? Component extends FunctionComponent<any>
    ? ComponentProps<Component>
    : never
  : never;

// the first one here has a chance to pollute the cache
type Result1 = ComponentProps<typeof ComponentWithForwardRef>;
// that could be incorrectly reused by this one
type Result2 = Test<{ component: typeof ComponentWithForwardRef }>; // no `T` leak

// same as ComponentWithForwardRef above but using a resolved signature instead of a direct inferred result of `forwardRef`
declare const ComponentWithForwardRef2: <T extends FunctionComponent<any>>(
  props: PropsWithoutRef<ComponentProps<T>> & {
    className?: string;
    as?: T | undefined;
  } & {
    ref?: Ref<HTMLElement> | undefined;
  },
) => unknown;

type Result3 = ComponentProps<typeof ComponentWithForwardRef2>;
type Result4 = Test<{ component: typeof ComponentWithForwardRef2 }>;
