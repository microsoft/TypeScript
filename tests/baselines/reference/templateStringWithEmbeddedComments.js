//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedComments.ts] ////

//// [templateStringWithEmbeddedComments.ts]
`head${ // single line comment
10
}
middle${
/* Multi-
 * line
 * comment
 */
 20
 // closing comment
}
tail`;

//// [templateStringWithEmbeddedComments.js]
`head${ // single line comment
10}
middle${
/* Multi-
 * line
 * comment
 */
20
// closing comment
}
tail`;
