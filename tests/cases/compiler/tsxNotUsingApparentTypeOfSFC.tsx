// @jsx: react
// @strict: true
// @esModuleInterop: true
/// <reference path="/.lib/react16.d.ts" />

import React from 'react';

function test<P>(wrappedProps: P) {
    let MySFC = function(props: P) {
        return <>hello</>;
    };
    class MyComponent extends React.Component<P> {
        render() {
            return <>hello</>;
        }
    }
    let x = <MySFC />;  // should error
    let y = <MyComponent />;  // should error

    let z = <MySFC {...wrappedProps} /> // should work
    let q = <MyComponent {...wrappedProps} /> // should work
}