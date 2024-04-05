//// [tests/cases/conformance/es6/templates/templateStringWithOpenCommentInStringPortionES6.ts] ////

//// [templateStringWithOpenCommentInStringPortionES6.ts]
` /**head  ${ 10 } // still middle  ${ 20 } /* still tail `

//// [templateStringWithOpenCommentInStringPortionES6.js]
` /**head  ${10} // still middle  ${20} /* still tail `;
