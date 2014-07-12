//// [staticMethodReferencingTypeArgument1.js]
var Editor;
(function (Editor) {
    var List = (function () {
        function List(isHead, data) {
            this.isHead = isHead;
            this.data = data;
        }
        List.MakeHead = function () {
            var entry = new List(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        };
        return List;
    })();
    Editor.List = List;
})(Editor || (Editor = {}));
