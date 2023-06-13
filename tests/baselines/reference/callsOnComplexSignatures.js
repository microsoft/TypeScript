//// [tests/cases/compiler/callsOnComplexSignatures.tsx] ////

//// [callsOnComplexSignatures.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React from "react";

// Simple calls from real usecases
function test1() {
    type stringType1 = "foo" | "bar";
    type stringType2 = "baz" | "bar";

    interface Temp1 {
        getValue(name: stringType1): number;
    }

    interface Temp2 {
        getValue(name: stringType2): string;
    }

    function test(t: Temp1 | Temp2) {
        const z = t.getValue("bar"); // Should be fine
    }
}

function test2() {
    interface Messages {
        readonly foo: (options: { [key: string]: any, b: number }) => string;
        readonly bar: (options: { [key: string]: any, a: string }) => string;
    }

    const messages: Messages = {
        foo: (options) => "Foo",
        bar: (options) => "Bar",
    };

    const test1 = (type: "foo" | "bar") =>
        messages[type]({ a: "A", b: 0 });
}

function test3(items: string[] | number[]) {
    items.forEach(item => console.log(item));
}

function test4(
    arg1: ((...objs: {x: number}[]) => number) | ((...objs: {y: number}[]) => number),
    arg2: ((a: {x: number}, b: object) => number) | ((a: object, b: {x: number}) => number),
    arg3: ((a: {x: number}, ...objs: {y: number}[]) => number) | ((...objs: {x: number}[]) => number),
    arg4: ((a?: {x: number}, b?: {x: number}) => number) | ((a?: {y: number}) => number),
    arg5: ((a?: {x: number}, ...b: {x: number}[]) => number) | ((a?: {y: number}) => number),
    arg6: ((a?: {x: number}, b?: {x: number}) => number) | ((...a: {y: number}[]) => number),
) {
    arg1();
    arg1({x: 0, y: 0});
    arg1({x: 0, y: 0}, {x: 1, y: 1});

    arg2({x: 0}, {x: 0});

    arg3({x: 0});
    arg3({x: 0}, {x: 0, y: 0});
    arg3({x: 0}, {x: 0, y: 0}, {x: 0, y: 0});

    arg4();
    arg4({x: 0, y: 0});
    arg4({x: 0, y: 0}, {x: 0});

    arg5();
    arg5({x: 0, y: 0});
    arg5({x: 0, y: 0}, {x: 0});

    arg6();
    arg6({x: 0, y: 0});
    arg6({x: 0, y: 0}, {x: 0, y: 0});
    arg6({x: 0, y: 0}, {x: 0, y: 0}, {y: 0});
}

// JSX Tag names
function test5() {
    // Pair of non-like intrinsics
    function render(url?: string): React.ReactNode {
        const Tag = url ? 'a' : 'button';
        return <Tag>test</Tag>;
    }

    // Union of all intrinsics and components of `any`
    function App(props: { component:React.ReactType }) {
        const Comp: React.ReactType = props.component;
        return (<Comp />);
    }

    // custom components with non-subset props
    function render2() {
        interface P1 {
            p?: boolean;
            c?: string;
        }
        interface P2 {
            p?: boolean;
            c?: any;
            d?: any;
        }

        var C: React.ComponentType<P1> | React.ComponentType<P2> = null as any;

        const a = <C p={true} />;
    }
}


//// [callsOnComplexSignatures.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var react_1 = __importDefault(require("react"));
// Simple calls from real usecases
function test1() {
    function test(t) {
        var z = t.getValue("bar"); // Should be fine
    }
}
function test2() {
    var messages = {
        foo: function (options) { return "Foo"; },
        bar: function (options) { return "Bar"; },
    };
    var test1 = function (type) {
        return messages[type]({ a: "A", b: 0 });
    };
}
function test3(items) {
    items.forEach(function (item) { return console.log(item); });
}
function test4(arg1, arg2, arg3, arg4, arg5, arg6) {
    arg1();
    arg1({ x: 0, y: 0 });
    arg1({ x: 0, y: 0 }, { x: 1, y: 1 });
    arg2({ x: 0 }, { x: 0 });
    arg3({ x: 0 });
    arg3({ x: 0 }, { x: 0, y: 0 });
    arg3({ x: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 });
    arg4();
    arg4({ x: 0, y: 0 });
    arg4({ x: 0, y: 0 }, { x: 0 });
    arg5();
    arg5({ x: 0, y: 0 });
    arg5({ x: 0, y: 0 }, { x: 0 });
    arg6();
    arg6({ x: 0, y: 0 });
    arg6({ x: 0, y: 0 }, { x: 0, y: 0 });
    arg6({ x: 0, y: 0 }, { x: 0, y: 0 }, { y: 0 });
}
// JSX Tag names
function test5() {
    // Pair of non-like intrinsics
    function render(url) {
        var Tag = url ? 'a' : 'button';
        return react_1.default.createElement(Tag, null, "test");
    }
    // Union of all intrinsics and components of `any`
    function App(props) {
        var Comp = props.component;
        return (react_1.default.createElement(Comp, null));
    }
    // custom components with non-subset props
    function render2() {
        var C = null;
        var a = react_1.default.createElement(C, { p: true });
    }
}
