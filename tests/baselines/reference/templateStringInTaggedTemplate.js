//// [tests/cases/conformance/es6/templates/templateStringInTaggedTemplate.ts] ////

//// [templateStringInTaggedTemplate.ts]
`I AM THE ${ `${ `TAG` } ` } PORTION`    `I ${ "AM" } THE TEMPLATE PORTION`

//// [templateStringInTaggedTemplate.js]
"use strict";
`I AM THE ${`${`TAG`} `} PORTION` `I ${"AM"} THE TEMPLATE PORTION`;
