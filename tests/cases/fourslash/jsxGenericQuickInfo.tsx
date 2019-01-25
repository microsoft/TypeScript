/// <reference path="fourslash.ts" />
//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// interface Props<T> {
////   items: T[];
////   renderItem: (item: T) => string;
//// }
//// class Component<T> {
////   constructor(props: Props<T>) {}
////   props: Props<T>;
//// }
//// var b = new Component({items: [0, 1, 2], render/*0*/Item: it/*1*/em => item.toFixed()});
//// var c = <Component items={[0, 1, 2]} render/*2*/Item={it/*3*/em => item.toFixed()}
verify.quickInfoAt("0", "(property) Props<number>.renderItem: (item: number) => string");
verify.quickInfoAt("1", "(parameter) item: number");
verify.quickInfoAt("2", "(JSX attribute) Props<number>.renderItem: (item: number) => string");
verify.quickInfoAt("3", "(parameter) item: number");
