// @strict: true
// @declaration: true
// @jsx: react

declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    h: {}
  }
}
declare namespace React {
  export function createElement(
    x: any,
    p: any,
    ...children: any[]
  ): JSX.Element;
}
class Foo<T, preferinfer U> {
  constructor(public prop1: T, public prop2: U) {}
}
function foo<T, preferinfer U>(x: T, y: U): [T, U] {
  return [x, y];
}
interface ComponentProps<T, U> {
  x: T;
  y: U;
  cb(props: this): void;
}
function Component<T, preferinfer U>(x: ComponentProps<T, U>) {
  return <h></h>;
}

const instance1 = new Foo<number>(0, "");
const result1 = foo<number>(0, "");
const jsx1 = (
  <Component<number>
    x={12}
    y=""
    cb={(props) => void (props.x.toFixed() + props.y.toUpperCase())}
  />
);

declare function stillDefaultsIfNoInference<
  X,
  preferinfer A = string,
  preferinfer B = number,
  preferinfer C = boolean
>(arg: { a?: A; b?: B; c?: C; x?: X }): { a: A; b: B; c: C; x: X };
const result4 = stillDefaultsIfNoInference<object>({ b: "test" });

class Foo2<A = number, preferinfer B extends { x: string } = { x: string; y: number }> {
  constructor(public a: A, public b: B) {}
}
const x = new Foo2<string>('test', { x: 'foo', z: 100 });
x.a;
x.b.x;
x.b.z;
