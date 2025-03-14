/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
////export type X = { x: number };
////export function f(x: X): void {}

// @Filename: /b.ts
////import { f } from "./a";
/////*1*/f({ x: 1 });

// @Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// interface OptionProp {
////     propx: 2
//// }
//// class Opt extends React.Component<OptionProp, {}> {
////     render() {
////         return <div>Hello</div>;
////     }
//// }
//// const obj1: OptionProp = {
////     propx: 2
//// }
//// let y1 = <Opt/*2*/ propx={2} />;

// @Filename: a.ts
//// interface Foo/*3*/<T extends Date> {
////     prop: T
//// }
//// class Bar/*4*/<T extends Date> implements Foo<T> {
////     prop!: T
//// }

// @Filename: c.ts
//// class c5b { public foo() { } }
//// namespace c5b/*5*/ { export var y = 2; }

verify.baselineQuickInfo({
    "1": [0, 1],
    "2": [0, 1, 2],
    "3": [0, 1],
    "4": [0, 1, 2],
    "5": [0, 1, 2],
});