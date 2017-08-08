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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Comment = (function () {
    function Comment() {
    }
    Comment.prototype.getDocCommentText = function () {
    };
    Comment.getDocCommentText = function (comments) {
        comments[0].getDocCommentText();
        var c;
        c.getDocCommentText();
    };
    __names(Comment.prototype, ["getDocCommentText"]);
    return Comment;
}());
