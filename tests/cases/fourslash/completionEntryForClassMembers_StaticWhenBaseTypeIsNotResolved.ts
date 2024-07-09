/// <reference path="fourslash.ts" />

// @Filename: /node_modules/@types/react/index.d.ts
//// export = React;
//// export as namespace React;
//// declare namespace React {
////     function createElement(): any;
////     interface Component<P = {}, S = {}, SS = any> { }
////     class Component<P, S> {
////         static contextType?: any;
////         context: any;
////         constructor(props: Readonly<P>);
////         setState<K extends keyof S>(
////             state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
////             callback?: () => void
////         ): void;
////     }
//// }

// @Filename: /a.ts
//// import React from 'react'
//// class Slider extends React.Component {
////     static defau/**/ltProps = {
////         onMouseDown: () => { },
////         onMouseUp: () => { },
////         unit: 'px',
////     }
////     handleChange = () => 10;
//// }

verify.completions({
    marker: "",
    isNewIdentifierLocation: true,
    exact: completion.classElementKeywords,
});