/// <reference path='fourslash.ts' />

// https://github.com/microsoft/TypeScript/issues/58599

//// type Book = any;
////
//// class IsbnSyntaxError extends Error {}
////
//// /**
////  * @throws {@link IsbnSyntaxError}
////  * This exception is thrown if the input is not a valid ISBN number.
////  */
//// function fetchBookByIsbn/**/(isbnCode: string): Book {}

verify.baselineQuickInfo();
