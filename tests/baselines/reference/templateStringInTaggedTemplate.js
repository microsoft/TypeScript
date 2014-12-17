//// [templateStringInTaggedTemplate.ts]
`I AM THE ${ `${ `TAG` } ` } PORTION`    `I ${ "AM" } THE TEMPLATE PORTION`

//// [templateStringInTaggedTemplate.js]
"I AM THE " + "" + "TAG" + " " + " PORTION" "I " + "AM" + " THE TEMPLATE PORTION";
