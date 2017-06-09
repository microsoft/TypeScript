/// <reference path="fourslash.ts" />

//// /* x */
//// /** x */
//// // x
//// let x = 1;


for (let i = 1; i < 7; ++i) {
    goTo.position(i);
    verify.isInMultiLineCommentAtPosition();
}

for (let i = 0; i < 2; ++i) {
    goTo.position(i * 7);
    verify.not.isInMultiLineCommentAtPosition();
}

const jsDocStart = 8;

for (let i = 1; i < 8; ++i) {
    goTo.position(jsDocStart + i);
    verify.isInMultiLineCommentAtPosition();
}

for (let i = 0; i < 2; ++i) {
    goTo.position(jsDocStart + i * 8);
    verify.not.isInMultiLineCommentAtPosition();
}

const singleLineCommentStart = 17;

for (let i = 0; i < 5; ++i) {
    goTo.position(singleLineCommentStart + i);
    verify.not.isInMultiLineCommentAtPosition();
}
