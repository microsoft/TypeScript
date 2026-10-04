//// [tests/cases/conformance/jsx/tsxErrorRecovery3.tsx] ////

//// [file1.tsx]
declare namespace JSX { interface Element { } }

<div></div>
<div></div>

//// [file2.tsx]
var x = <div></div><div></div>


//// [file1.js]
"use strict";
React.createElement("div", null)
    ,
        React.createElement("div", null);
//// [file2.js]
"use strict";
var x = (React.createElement("div", null), React.createElement("div", null));
