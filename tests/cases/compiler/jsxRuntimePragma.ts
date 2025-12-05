// @jsx: react,react-jsx,react-jsxdev,preserve
// @filename: one.tsx
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime classic */
import * as React from "react";
export const HelloWorld = () => <h1>Hello world</h1>;
export const frag = <><div></div></>;
export const selfClosing = <img src="./image.png" />;
// @filename: two.tsx
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime automatic */
export const HelloWorld = () => <h1>Hello world</h1>;
export const frag = <><div></div></>;
export const selfClosing = <img src="./image.png" />;
// @filename: three.tsx
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime classic */
/* @jsxRuntime automatic */
export const HelloWorld = () => <h1>Hello world</h1>;
export const frag = <><div></div></>;
export const selfClosing = <img src="./image.png" />;
// @filename: four.tsx
/// <reference path="/.lib/react16.d.ts" />
/* @jsxRuntime automatic */
/* @jsxRuntime classic */
import * as React from "react";
export const HelloWorld = () => <h1>Hello world</h1>;
export const frag = <><div></div></>;
export const selfClosing = <img src="./image.png" />;
// @filename: index.ts
export * as one from "./one.js";
export * as two from "./two.js";
export * as three from "./three.js";
export * as four from "./four.js";