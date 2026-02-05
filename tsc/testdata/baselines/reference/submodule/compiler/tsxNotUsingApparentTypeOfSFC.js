//// [tests/cases/compiler/tsxNotUsingApparentTypeOfSFC.tsx] ////

//// [tsxNotUsingApparentTypeOfSFC.tsx]
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

//// [tsxNotUsingApparentTypeOfSFC.js]
/// <reference path="/.lib/react16.d.ts" />
import React from 'react';
function test(wrappedProps) {
    let MySFC = function (props) {
        return React.createElement(React.Fragment, null, "hello");
    };
    class MyComponent extends React.Component {
        render() {
            return React.createElement(React.Fragment, null, "hello");
        }
    }
    let x = React.createElement(MySFC, null); // should error
    let y = React.createElement(MyComponent, null); // should error
    let z = React.createElement(MySFC, Object.assign({}, wrappedProps)); // should work
    let q = React.createElement(MyComponent, Object.assign({}, wrappedProps)); // should work
}
