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
"use strict";
exports.__esModule = true;
var React = require("react");
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
