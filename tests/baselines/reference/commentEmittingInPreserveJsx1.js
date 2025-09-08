//// [tests/cases/conformance/jsx/commentEmittingInPreserveJsx1.tsx] ////

//// [file.tsx]
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
    "Hi"}
    // Another not Comment
</div>;
<div>
    /* Not Comment */
    {
    //Comment just Fine
    "Hi"}
</div>;
export {};
