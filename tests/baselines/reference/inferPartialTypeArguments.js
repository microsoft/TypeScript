//// [inferPartialTypeArguments.tsx]
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


//// [inferPartialTypeArguments.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo(prop1, prop2) {
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
    return Foo;
}());
function foo(x, y) {
    return [x, y];
}
function Component(x) {
    return React.createElement("h", null);
}
var instance1 = new Foo(0, "");
var result1 = foo(0, "");
var jsx1 = (React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } }));
var result4 = stillDefaultsIfNoInference({ b: "test" });
var Foo2 = /** @class */ (function () {
    function Foo2(a, b) {
        this.a = a;
        this.b = b;
    }
    return Foo2;
}());
var x = new Foo2('test', { x: 'foo', z: 100 });
x.a;
x.b.x;
x.b.z;


//// [inferPartialTypeArguments.d.ts]
declare module JSX {
    interface Element {
    }
    interface IntrinsicElements {
        h: {};
    }
}
declare namespace React {
    function createElement(x: any, p: any, ...children: any[]): JSX.Element;
}
declare class Foo<T, preferinfer U> {
    prop1: T;
    prop2: U;
    constructor(prop1: T, prop2: U);
}
declare function foo<T, preferinfer U>(x: T, y: U): [T, U];
interface ComponentProps<T, U> {
    x: T;
    y: U;
    cb(props: this): void;
}
declare function Component<T, preferinfer U>(x: ComponentProps<T, U>): JSX.Element;
declare const instance1: Foo<number, string>;
declare const result1: [number, string];
declare const jsx1: JSX.Element;
declare function stillDefaultsIfNoInference<X, preferinfer A = string, preferinfer B = number, preferinfer C = boolean>(arg: {
    a?: A;
    b?: B;
    c?: C;
    x?: X;
}): {
    a: A;
    b: B;
    c: C;
    x: X;
};
declare const result4: {
    a: string;
    b: string;
    c: boolean;
    x: object;
};
declare class Foo2<A = number, preferinfer B extends {
    x: string;
} = {
    x: string;
    y: number;
}> {
    a: A;
    b: B;
    constructor(a: A, b: B);
}
declare const x: Foo2<string, {
    x: string;
    z: number;
}>;
