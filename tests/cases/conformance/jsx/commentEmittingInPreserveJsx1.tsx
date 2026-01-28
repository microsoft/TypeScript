// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
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