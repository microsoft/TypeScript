//// [tests/cases/conformance/directives/multiline.tsx] ////

//// [a.ts]
/**
 @ts-ignore */
export let x: string = 100;

/**
 @ts-expect-error */
export let y: string = 100;

/**
 @ts-expect-error */
export let ok = 100;

//// [b.tsx]
import * as React from "react";

export function MyComponent(props: { foo: string }) {
  return <div />;
}

let x = (
  <div>
    {/*
   @ts-ignore */}
    <MyComponent foo={100} />;
  </div>
);

let y = (
  <div>
    {/*
   @ts-expect-error */}
    <MyComponent foo={100} />;
  </div>
);

let ok = (
  <div>
    {/*
   @ts-expect-error */}
    <MyComponent foo={"hooray"} />;
  </div>
);


//// [a.js]
"use strict";
exports.__esModule = true;
exports.ok = exports.y = exports.x = void 0;
/**
 @ts-ignore */
exports.x = 100;
/**
 @ts-expect-error */
exports.y = 100;
/**
 @ts-expect-error */
exports.ok = 100;
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
    ";"));
var y = (React.createElement("div", null,
    React.createElement(MyComponent, { foo: 100 }),
    ";"));
var ok = (React.createElement("div", null,
    React.createElement(MyComponent, { foo: "hooray" }),
    ";"));
