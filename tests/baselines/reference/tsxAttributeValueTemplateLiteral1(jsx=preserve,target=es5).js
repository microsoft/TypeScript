//// [file.tsx]
import React = require('react');

interface Prop {
    foo: string,
}

function Comp(p: Prop) {
    return <div>{p.foo}</div>;
}

const a = 42;

<Comp foo=`foo` />;
<Comp foo=`foo${a}` />;
<Comp foo=`foo${a}foo` />;


tests/cases/conformance/jsx/template/file.jsx(9,16): error TS1003: Identifier expected.
tests/cases/conformance/jsx/template/file.jsx(9,23): error TS1003: Identifier expected.
tests/cases/conformance/jsx/template/file.jsx(9,27): error TS1109: Expression expected.
tests/cases/conformance/jsx/template/file.jsx(9,28): error TS1109: Expression expected.
tests/cases/conformance/jsx/template/file.jsx(10,16): error TS1003: Identifier expected.
tests/cases/conformance/jsx/template/file.jsx(10,23): error TS1003: Identifier expected.
tests/cases/conformance/jsx/template/file.jsx(10,34): error TS1109: Expression expected.
tests/cases/conformance/jsx/template/file.jsx(10,35): error TS1109: Expression expected.


==== tests/cases/conformance/jsx/template/file.jsx (8 errors) ====
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require("react");
    function Comp(p) {
        return <div>{p.foo}</div>;
    }
    var a = 42;
    <Comp foo="foo"/>;
    <Comp foo="foo".concat(a)/>;
                   ~
!!! error TS1003: Identifier expected.
                          ~
!!! error TS1003: Identifier expected.
                              ~
!!! error TS1109: Expression expected.
                               ~
!!! error TS1109: Expression expected.
    <Comp foo="foo".concat(a, "foo")/>;
                   ~
!!! error TS1003: Identifier expected.
                          ~
!!! error TS1003: Identifier expected.
                                     ~
!!! error TS1109: Expression expected.
                                      ~
!!! error TS1109: Expression expected.
    