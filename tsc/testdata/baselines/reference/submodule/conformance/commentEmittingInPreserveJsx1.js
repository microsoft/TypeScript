//// [tests/cases/conformance/jsx/commentEmittingInPreserveJsx1.tsx] ////

//// [file.tsx]
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

<div>
    // Not Comment
</div>;

<div>
    // Not Comment
    {
        //Comment just Fine
    }
    // Another not Comment
</div>;

<div>
    // Not Comment
    {
        //Comment just Fine
        "Hi"
    }
    // Another not Comment
</div>;

<div>
    /* Not Comment */
    {
        //Comment just Fine
        "Hi"
    }
</div>;

//// [file.jsx]
"use strict";
/// <reference path="/.lib/react.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
<div>
    // Not Comment
</div>;
<div>
    // Not Comment
    
    // Another not Comment
</div>;
<div>
    // Not Comment
    {
    //Comment just Fine
    "Hi"}
    // Another not Comment
</div>;
<div>
    /* Not Comment */
    {
    //Comment just Fine
    "Hi"}
</div>;
