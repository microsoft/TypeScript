//// [tests/cases/compiler/jsxInferenceProducesLiteralAsExpected.tsx] ////

//// [jsxInferenceProducesLiteralAsExpected.tsx]
import React = require("react");
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
class TestObject {
    a: string = '';
    b: number = 1;
    c: () => void = () => { };
}
interface TestProps<T> {
    model: T;
    foo: FunctionPropertyNames<T>;
}
function Test<T>(props: TestProps<T>) { return <></>; }
const model = new TestObject();

const el1 = <Test model={model} foo="c" />;
const el2 = <Test<TestObject> model={model} foo="c" />;

//// [jsxInferenceProducesLiteralAsExpected.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class TestObject {
    a = '';
    b = 1;
    c = () => { };
}
function Test(props) { return <></>; }
const model = new TestObject();
const el1 = <Test model={model} foo="c"/>;
const el2 = <Test model={model} foo="c"/>;
