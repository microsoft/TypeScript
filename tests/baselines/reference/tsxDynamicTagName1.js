//// [tsxDynamicTagName1.tsx]
var CustomTag = "h1";
<CustomTag> Hello World </CustomTag>  // No error

//// [tsxDynamicTagName1.jsx]
var CustomTag = "h1";
<CustomTag> Hello World </CustomTag>; // No error
