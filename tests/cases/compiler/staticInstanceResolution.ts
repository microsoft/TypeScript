// @target: es2015
// @lib: es5
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