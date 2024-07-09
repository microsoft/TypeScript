// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

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