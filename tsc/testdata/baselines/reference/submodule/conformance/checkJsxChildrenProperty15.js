//// [tests/cases/conformance/jsx/checkJsxChildrenProperty15.tsx] ////

//// [file.tsx]
import React = require('react');

const Tag = (x: {}) => <div></div>;

// OK
const k1 = <Tag />;
const k2 = <Tag></Tag>;

// Not OK (excess children)
const k3 = <Tag children={<div></div>} />;
const k4 = <Tag key="1"><div></div></Tag>;
const k5 = <Tag key="1"><div></div><div></div></Tag>;


//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Tag = (x) => <div></div>;
// OK
const k1 = <Tag />;
const k2 = <Tag></Tag>;
// Not OK (excess children)
const k3 = <Tag children={<div></div>}/>;
const k4 = <Tag key="1"><div></div></Tag>;
const k5 = <Tag key="1"><div></div><div></div></Tag>;
