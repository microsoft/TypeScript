/// <reference path="fourslash.ts" />

// @Filename: /node_modules/react/index.d.ts
//// export interface ComponentType {}
//// export interface ComponentProps {}
//// export declare function useState<T>(initialState: T): [T, (newState: T) => void];
//// export declare function useEffect(callback: () => void, deps: any[]): void;

// @Filename: /main.ts
//// import type { ComponentType } from "react";
//// import { useState } from "react";
////
//// export function Component({ prop } : { prop: ComponentType }) {
////     const codeIsUnimportant = useState(1);
////     useEffect/*1*/(() => {}, []);
//// }

// @Filename: /main2.ts
//// import { useState } from "react";
//// import type { ComponentType } from "react";
////
//// type _ = ComponentProps/*2*/;

goTo.marker("1");
verify.importFixAtPosition([
`import type { ComponentType } from "react";
import { useEffect, useState } from "react";

export function Component({ prop } : { prop: ComponentType }) {
    const codeIsUnimportant = useState(1);
    useEffect(() => {}, []);
}`,
]);

goTo.marker("2");
verify.importFixAtPosition([
`import { useState } from "react";
import type { ComponentProps, ComponentType } from "react";

type _ = ComponentProps;`,
]);
