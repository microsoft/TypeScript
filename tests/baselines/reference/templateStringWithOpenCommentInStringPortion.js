//// [tests/cases/conformance/es6/templates/templateStringWithOpenCommentInStringPortion.ts] ////

//// [templateStringWithOpenCommentInStringPortion.ts]
` /**head  ${ 10 } // still middle  ${ 20 } /* still tail `

//// [templateStringWithOpenCommentInStringPortion.js]
` /**head  ${10} // still middle  ${20} /* still tail `;
