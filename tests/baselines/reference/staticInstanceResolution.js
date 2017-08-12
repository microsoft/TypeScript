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
var Comment = (function () {
    function Comment() {
    }
    var proto_1 = Comment.prototype;
    proto_1.getDocCommentText = function () {
    };
    Comment.getDocCommentText = function (comments) {
        comments[0].getDocCommentText();
        var c;
        c.getDocCommentText();
    };
    return Comment;
}());
