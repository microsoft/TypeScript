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
exports.__esModule = true;
var React = require("react");
var TestObject = /** @class */ (function () {
    function TestObject() {
        this.a = '';
        this.b = 1;
        this.c = function () { };
    }
    return TestObject;
}());
function Test(props) { return React.createElement(React.Fragment, null); }
var model = new TestObject();
var el1 = React.createElement(Test, { model: model, foo: "c" });
var el2 = React.createElement(Test, { model: model, foo: "c" });
