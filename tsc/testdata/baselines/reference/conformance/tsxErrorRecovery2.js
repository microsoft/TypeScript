//// [tests/cases/conformance/jsx/tsxErrorRecovery2.tsx] ////

//// [file1.tsx]
declare namespace JSX { interface Element { } }

<div></div>
<div></div>

//// [file2.tsx]
var x = <div></div><div></div>


//// [file1.jsx]
"use strict";
<div></div>
    ,
        <div></div>;
//// [file2.jsx]
"use strict";
var x = (<div></div>, <div></div>);
