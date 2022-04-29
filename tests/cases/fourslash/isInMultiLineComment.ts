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
verify.not.isInCommentAtPosition();

goTo.position(firstCommentStart + 1);
verify.isInCommentAtPosition();
goTo.position(firstCommentEnd - 1);
verify.isInCommentAtPosition();

goTo.position(firstCommentEnd);
verify.not.isInCommentAtPosition();

const multilineJsDocStart = firstCommentEnd + 1;
const multilineJsDocEnd = multilineJsDocStart + 49;

goTo.position(multilineJsDocStart);
verify.not.isInCommentAtPosition();
goTo.position(multilineJsDocStart + 1);
verify.isInCommentAtPosition();
goTo.position(multilineJsDocEnd - 1);
verify.isInCommentAtPosition();
goTo.position(multilineJsDocEnd);
verify.not.isInCommentAtPosition();

const singleLineCommentStart = multilineJsDocEnd + 1;

goTo.position(singleLineCommentStart + 1);
verify.isInCommentAtPosition(/*onlyMultiLineDiverges*/ true);

const postNodeCommentStart = singleLineCommentStart + 16;

goTo.position(postNodeCommentStart);
verify.not.isInCommentAtPosition();
goTo.position(postNodeCommentStart + 1);
verify.isInCommentAtPosition();
