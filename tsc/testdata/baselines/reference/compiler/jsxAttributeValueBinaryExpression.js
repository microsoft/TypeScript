//// [tests/cases/compiler/jsxAttributeValueBinaryExpression.tsx] ////

//// [jsxAttributeValueBinaryExpression.tsx]
<X a=<b/><c/> />


//// [jsxAttributeValueBinaryExpression.jsx]
"use strict";
<X a=<b />, <c />/>;
