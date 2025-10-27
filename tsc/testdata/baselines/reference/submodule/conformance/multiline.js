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
Object.defineProperty(exports, "__esModule", { value: true });
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComponent = MyComponent;
const React = __importStar(require("react"));
function MyComponent(props) {
    return React.createElement("div", null);
}
let x = (React.createElement("div", null,
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: 100 }),
    React.createElement(MyComponent, { foo: "hooray" })));
