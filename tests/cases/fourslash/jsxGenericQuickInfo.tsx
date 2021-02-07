/// <reference path="fourslash.ts" />
//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// interface PropsA<T> {
////     /** comments for A */
////     name: 'A',
////     items: T[];
////     renderItem: (item: T) => string;
//// }
//// interface PropsB<T> {
////     /** comments for B */
////     name: 'B',
////     items: T[];
////     renderItem: (item: T) => string;
//// }
//// class Component<T> {
////     constructor(props: PropsA<T> | PropsB<T>) {}
////     props: PropsA<T> | PropsB<T>;
//// }   
//// var b = new Component({items: [0, 1, 2], render/*0*/Item: it/*1*/em => item.toFixed(), name/*2*/: 'A',});
//// var c = <Component items={[0, 1, 2]} render/*3*/Item={it/*4*/em => item.toFixed()} name/*5*/="A" />


verify.quickInfoAt("0", "(property) PropsA<number>.renderItem: (item: number) => string");
verify.quickInfoAt("1", "(parameter) item: number");
verify.quickInfoAt("2", `(property) PropsA<T>.name: "A"`, 'comments for A');
verify.quickInfoAt("3", "(JSX attribute) PropsA<number>.renderItem: (item: number) => string");
verify.quickInfoAt("4", "(parameter) item: number");
verify.quickInfoAt("5", `(JSX attribute) PropsA<T>.name: "A"`, 'comments for A');
