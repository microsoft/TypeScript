//// [inferPartialTypeArguments1.tsx]
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

//// [inferPartialTypeArguments1.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var Foo = /** @class */ (function () {
    function Foo(prop1, prop2) {
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
    return Foo;
}());
function foo(x, y) { return [x, y]; }
function tag(x) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return args;
}
function Component(x) {
    return React.createElement("h", null);
}
var instance1 = new Foo(0, "");
var result1 = foo(0, "");
// const tagged1 = tag<number, _>`tags ${12} ${""}`; // Because of how union inference works, this won't actually work
var jsx1 = React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } });
var instance2 = new Foo(0, "");
var result2 = foo(0, "");
var tagged2 = tag(__makeTemplateObject(["tags ", " ", ""], ["tags ", " ", ""]), 12, ""); // this will, though! Just because the `*` comes first!
var jsx2 = React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } });
var instance3 = new Foo(0, "");
var result3 = foo(0, "");
var tagged3 = tag(__makeTemplateObject(["tags ", " ", ""], ["tags ", " ", ""]), 12, "");
var jsx3 = React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } });
// with trailing comma
var instance4 = new Foo(0, "");
var result4 = foo(0, "");
var tagged4 = tag(__makeTemplateObject(["tags ", " ", ""], ["tags ", " ", ""]), 12, "");
var jsx4 = React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } });
var result5 = stillDefaultsIfNoInference({ b: "test" }); // expect result1 type is {a: string, b: string, c: object, x: {}
var Foo2 = /** @class */ (function () {
    function Foo2(a, b) {
        this.a = a;
        this.b = b;
    }
    return Foo2;
}());
var x = new Foo2();
x.a.x;
x.a.y;
x.b;
