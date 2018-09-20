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
"head" + 10 + "\nmiddle" + 
/* Multi-
 * line
 * comment
 */
20 + "\ntail";
