//// [typeArgumentListsWithnamedTypeArguments.tsx]
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

// In order

const instance1 = new Foo<T = number, U = string>(0, "");
const result1 = foo<T = number, U = string>(0, "");
const tagged1 = tag<T = number, U = string>`tags ${12} ${""}`;
const jsx1 = <Component<T = number, U = string> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;

// Out of order

const instance2 = new Foo<U = string, T = number>(0, "");
const result2 = foo<U = string, T = number>(0, "");
const tagged2 = tag<U = string, T = number>`tags ${12} ${""}`;
const jsx2 = <Component<U = string, T = number> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;

// With positional

const instance3 = new Foo<number, U = string>(0, "");
const result3 = foo<number, U = string>(0, "");
const tagged3 = tag<number, U = string>`tags ${12} ${""}`;
const jsx3 = <Component<number, U = string> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;

// With partial inference

const instance4 = new Foo<U = string>(0, "");
const result4 = foo<U = string>(0, "");
const tagged4 = tag<U = string>`tags ${12} ${""}`;
const jsx4 = <Component<U = string> x={12} y="" cb={props => void (props.x.toFixed() + props.y.toUpperCase())} />;


//// [typeArgumentListsWithnamedTypeArguments.js]
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
// In order
var instance1 = new Foo(0, "");
var result1 = foo(0, "");
var tagged1 = tag(__makeTemplateObject(["tags ", " ", ""], ["tags ", " ", ""]), 12, "");
var jsx1 = React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } });
// Out of order
var instance2 = new Foo(0, "");
var result2 = foo(0, "");
var tagged2 = tag(__makeTemplateObject(["tags ", " ", ""], ["tags ", " ", ""]), 12, "");
var jsx2 = React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } });
// With positional
var instance3 = new Foo(0, "");
var result3 = foo(0, "");
var tagged3 = tag(__makeTemplateObject(["tags ", " ", ""], ["tags ", " ", ""]), 12, "");
var jsx3 = React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } });
// With partial inference
var instance4 = new Foo(0, "");
var result4 = foo(0, "");
var tagged4 = tag(__makeTemplateObject(["tags ", " ", ""], ["tags ", " ", ""]), 12, "");
var jsx4 = React.createElement(Component, { x: 12, y: "", cb: function (props) { return void (props.x.toFixed() + props.y.toUpperCase()); } });
