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
"head".concat(// single line comment
10, "\nmiddle").concat(
/* Multi-
 * line
 * comment
 */
20
// closing comment
, "\ntail");
