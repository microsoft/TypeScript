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
class Comment {
    getDocCommentText() {
    }
    static getDocCommentText(comments) {
        comments[0].getDocCommentText();
        var c;
        c.getDocCommentText();
    }
}
