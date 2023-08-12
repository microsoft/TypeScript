//// [tests/cases/compiler/staticInstanceResolution.ts] ////

//// [staticInstanceResolution.ts]
class Comment {

    public getDocCommentText()
    {

    }

    static getDocCommentText(comments: Comment[])
    {
        comments[0].getDocCommentText();
        var c: Comment;
        c.getDocCommentText();
    }
}

//// [staticInstanceResolution.js]
var Comment = /** @class */ (function () {
    function Comment() {
    }
    Comment.prototype.getDocCommentText = function () {
    };
    Comment.getDocCommentText = function (comments) {
        comments[0].getDocCommentText();
        var c;
        c.getDocCommentText();
    };
    return Comment;
}());
