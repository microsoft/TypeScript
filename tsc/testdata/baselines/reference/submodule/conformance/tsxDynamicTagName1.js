//// [tests/cases/conformance/jsx/tsxDynamicTagName1.tsx] ////

//// [tsxDynamicTagName1.tsx]
var CustomTag = "h1";
<CustomTag> Hello World </CustomTag>  // No error

//// [tsxDynamicTagName1.jsx]
"use strict";
var CustomTag = "h1";
<CustomTag> Hello World </CustomTag>; // No error
