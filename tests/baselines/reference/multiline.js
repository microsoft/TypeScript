//// [tests/cases/conformance/directives/multiline.tsx] ////

//// [a.ts]
export const texts: string[] = [];

/**
 @ts-ignore */
texts.push(100);

/**
 @ts-expect-error */
texts.push(100);

/**
 @ts-expect-error */
texts.push("100");

//// [b.tsx]
import * as React from "react";

export function MyComponent(props: { foo: string }) {
  return <div />;
}

let x = (
  <div>
    {/*
   @ts-ignore */}
    <MyComponent foo={100} />

    {/*@ts-ignore*/}
    <MyComponent foo={100} />

    {/*
   @ts-expect-error */}
    <MyComponent foo={100} />

    {/*
   // @ts-expect-error */}
    <MyComponent foo={100} />

    {/*
   * @ts-expect-error */}
    <MyComponent foo={100} />

    {/*@ts-expect-error*/}
    <MyComponent foo={100} />

    {/*
   @ts-expect-error */}
    <MyComponent foo={"hooray"} />
  </div>
);


//// [a.js]
"use strict";
exports.__esModule = true;
exports.texts = void 0;
exports.texts = [];
/**
 @ts-ignore */
exports.texts.push(100);
/**
 @ts-expect-error */
exports.texts.push(100);
/**
 @ts-expect-error */
exports.texts.push("100");
//// [b.js]
"use strict";
exports.__esModule = true;
exports.MyComponent = void 0;
var React = require("react");
function MyComponent(props) {
    return React.createElement("div", null);
}
exports.MyComponent = MyComponent;
var x = (React.createElement("div", null,
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: "hooray" })));
