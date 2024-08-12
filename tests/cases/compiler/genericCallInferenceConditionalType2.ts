// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59490

type ComponentProps<T> = T extends (props: infer P) => unknown ? P : never;

declare function wrapComponent<P>(
  component: (props: P) => unknown,
): (props: P) => unknown;

const WrappedComponent = wrapComponent(
  <T extends string = "span">(props: {
    as?: T | undefined;
    className?: string;
  }) => {
    return null;
  },
);

type RetrievedProps = ComponentProps<typeof WrappedComponent>;

declare const f: <T>(f: (x: T) => unknown) => (x: T) => unknown
declare const g: <T extends unknown = string>(x: { foo: T }) => unknown

const h = f(g)

type FirstParameter<T> = T extends (x: infer P) => unknown ? P : unknown
type X = FirstParameter<typeof h>['foo']
