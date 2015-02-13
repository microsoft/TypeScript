//// [templateStringInTaggedTemplate.ts]
`I AM THE ${ `${ `TAG` } ` } PORTION`    `I ${ "AM" } THE TEMPLATE PORTION`

//// [templateStringInTaggedTemplate.js]
(_a = ["I ", " THE TEMPLATE PORTION"], _a.raw = ["I ", " THE TEMPLATE PORTION"], ("I AM THE " + "TAG" + " " + " PORTION")(_a, "AM"));
var _a;
