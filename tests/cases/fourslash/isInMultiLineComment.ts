/// <reference path="fourslash.ts" />

//// /* x */
//// /**
////   * @param this doesn't make sense here.
////   */
//// // x
//// let x = 1; /*
////             *

const firstCommentStart = 0;
const firstCommentEnd = 7;
goTo.position(firstCommentStart);
verify.not.isInMultiLineCommentAtPosition();

goTo.position(firstCommentStart + 1);
verify.isInMultiLineCommentAtPosition();
goTo.position(firstCommentEnd - 1);
verify.isInMultiLineCommentAtPosition();

goTo.position(firstCommentEnd);
verify.not.isInMultiLineCommentAtPosition();

const multilineJsDocStart = firstCommentEnd + 1;
const multilineJsDocEnd = multilineJsDocStart + 49;

goTo.position(multilineJsDocStart);
verify.not.isInMultiLineCommentAtPosition();
goTo.position(multilineJsDocStart + 1);
verify.isInMultiLineCommentAtPosition();
goTo.position(multilineJsDocEnd - 1);
verify.isInMultiLineCommentAtPosition();
goTo.position(multilineJsDocEnd);
verify.not.isInMultiLineCommentAtPosition();

const singleLineCommentStart = multilineJsDocEnd + 1;

goTo.position(singleLineCommentStart + 1);
verify.not.isInMultiLineCommentAtPosition();

const postNodeCommentStart = singleLineCommentStart + 16;

goTo.position(postNodeCommentStart);
verify.not.isInMultiLineCommentAtPosition();
goTo.position(postNodeCommentStart + 1);
verify.isInMultiLineCommentAtPosition();
