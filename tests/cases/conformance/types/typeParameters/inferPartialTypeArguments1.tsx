// @jsx: react
declare module JSX {
    interface Element {}
}
declare namespace React {
    export function createElement(x: any, p: any, ...children: any[]): JSX.Element;
}
 class Foo<T, U> {
    constructor(public prop1: T, public prop2: U) {}
}
 function foo<T, U>(x: T, y: U): [T, U] { return [x, y]; }
 function tag<T, U>(x: TemplateStringsArray, ...args: (T | U)[]) { return args; }
 interface ComponentProps<T, U> {
    x: T;
    y: U;
    cb(props: this): void;
}
 function Component<T, U>(x: ComponentProps<T, U>) {
    return <h></h>;
}

const instance1 = new Foo<number,>(0, "");
const result1 = foo<number,>(0, "");
// const tagged1 = tag<number, _>`tags ${12} ${""}`; // Because of how union inference works, this won't actually work
const jsx1 = <Component<number,> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;

const instance2 = new Foo<, string>(0, "");
const result2 = foo<, string>(0, "");
const tagged2 = tag<, string>`tags ${12} ${""}`; // this will, though! Just because the `*` comes first!
const jsx2 = <Component<, string> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;

const instance3 = new Foo<,>(0, "");
const result3 = foo<,>(0, "");
const tagged3 = tag<,>`tags ${12} ${""}`;
const jsx3 = <Component<,> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;

// with trailing comma
const instance4 = new Foo<,,>(0, "");
const result4 = foo<,,>(0, "");
const tagged4 = tag<,,>`tags ${12} ${""}`;
const jsx4 = <Component<,,> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;

declare function stillDefaultsIfNoInference<X, A = string, B = number, C = boolean>(arg: { a?: A, b?: B, c?: C, x?: X}): { a: A, b: B, c: C, x: X };
const result5 = stillDefaultsIfNoInference<, , , object> ({ b: "test" }); // expect result1 type is {a: string, b: string, c: object, x: {}

class Foo2<A extends {x: string} = {x: string, y: number}, B = number> {
    constructor(public a?: A, public b?: B) {}
}
const x = new Foo2<, string>();
x.a.x;
x.a.y;
x.b;