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

// Does not reference valid param

const instance1 = new Foo<number, Q = string>(0, "");
const result1 = foo<number, Q = string>(0, "");
const tagged1 = tag<number, Q = string>`tags ${12} ${""}`;
const jsx1 = <Component<number, Q = string> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;
type A = Foo<number, Q = string>;

// Duplicates positional

const instance2 = new Foo<number, T = string>(0, "");
const result2 = foo<number, T = string>(0, "");
const tagged2 = tag<number, T = string>`tags ${12} ${""}`;
const jsx2 = <Component<number, T = string> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;
type B = Foo<number, T = string>;

// Duplicates other named

const instance3 = new Foo<T = number, T = string>(0, "");
const result3 = foo<T = number, T = string>(0, "");
const tagged3 = tag<T = number, T = string>`tags ${12} ${""}`;
const jsx3 = <Component<T = number, T = string> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;
type C = Foo<T = number, T = string>;

// Too many arguments

const instance4 = new Foo<T = number, U = string, W = never>(0, "");
const result4 = foo<T = number, U = string, W = never>(0, "");
const tagged4 = tag<T = number, U = string, W = never>`tags ${12} ${""}`;
const jsx4 = <Component<T = number, U = string, W = never> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;
type D = Foo<T = number, U = string, W = never>;

// Positional after named

const instance5 = new Foo<U = string, number>(0, "");
const result5 = foo<U = string, number>(0, "");
const tagged5 = tag<U = string, number>`tags ${12} ${""}`;
const jsx5 = <Component<U = string, number> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;
type E = Foo<U = string, number>;

// Typespace only - does not provide enough arguments
type F = Foo<U = number>;
