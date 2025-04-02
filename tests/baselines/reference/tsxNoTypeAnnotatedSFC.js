//// [tests/cases/compiler/tsxNoTypeAnnotatedSFC.tsx] ////

//// [tsxNoTypeAnnotatedSFC.tsx]
// not _actually_ making react available in this test to regression test #22948
import * as React from 'react';

const Test123 = () => <div/>;

function testComponent(props) {
    return <Test123 {...props}/>;
}

//// [tsxNoTypeAnnotatedSFC.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// not _actually_ making react available in this test to regression test #22948
var React = require("react");
var Test123 = function () { return <div />; };
function testComponent(props) {
    return <Test123 {...props}/>;
}
