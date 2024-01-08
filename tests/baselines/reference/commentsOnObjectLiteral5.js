//// [tests/cases/compiler/commentsOnObjectLiteral5.ts] ////

//// [commentsOnObjectLiteral5.ts]
const a = {
    p0: 0, // Comment 0
    p1: 0, /* Comment 1
    A multiline comment. */
    p2: 0, // Comment 2
};


//// [commentsOnObjectLiteral5.js]
var a = {
    p0: 0, // Comment 0
    p1: 0, /* Comment 1
    A multiline comment. */
    p2: 0, // Comment 2
};
