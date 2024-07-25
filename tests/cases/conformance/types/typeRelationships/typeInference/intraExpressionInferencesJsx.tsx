// @strict: true
// @jsx: react-jsx
// @noEmit: true

/// <reference path="/.lib/react16.d.ts" />

// repro from #52798

type A = {
  a: boolean;
};

type B = {
  b: string;
};

type C = {
  c: number;
};

type Animations = {
  [key: string]: { value: number } & (
    | ({ kind: "a"; func?(): Partial<A> } & A)
    | ({ kind: "b"; func?(): Partial<B> } & B)
    | ({ kind: "c"; func?(): Partial<C> } & C)
  );
};

type StyleParam<T extends Animations> = Record<keyof T, string>;

type AnimatedViewProps<T extends Animations> = {
  style: (animationsValues: StyleParam<T>) => string;
  animations: T;
};

const Component = <T extends Animations>({
  animations,
  style,
}: AnimatedViewProps<T>) => <></>;

<Component
  animations={{
    test: {
      kind: "a",
      value: 1,
      a: true,
    },
  }}
  style={(anim) => {
    return "";
  }}
/>;
<Component
  animations={{
    test: {
      kind: "a",
      value: 1,
      a: true,
      func() {
        return {
          a: true,
        };
      },
    },
  }}
  style={(anim) => {
    return "";
  }}
/>;
<Component
  animations={{
    test: {
      kind: "a",
      value: 1,
      a: true,
      func: () => {
        return {
          a: true,
        };
      },
    },
  }}
  style={(anim) => {
    return "";
  }}
/>;

// repro from #52786

interface Props<T> {
  a: (x: string) => T;
  b: (arg: T) => void;
}

function Foo<T>(props: Props<T>) {
  return <div />;
}

<Foo
  a={() => 10}
  b={(arg) => { arg.toString(); }}
/>;

<Foo
  a={(x) => 10}
  b={(arg) => { arg.toString(); }}
/>;

<Foo {...{
  a: (x) => 10,
  b: (arg) => { arg.toString(); },
}} />;
