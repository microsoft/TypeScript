//// [listFailure.js]
var Editor;
(function (Editor) {
    var Buffer = (function () {
        function Buffer() {
            this.lines = ListMakeHead();
        }
        Buffer.prototype.addLine = function (lineText) {
            var line = new Line();
            var lineEntry = this.lines.add(line);

            return lineEntry;
        };
        return Buffer;
    })();
    Editor.Buffer = Buffer;

    function ListRemoveEntry(entry) {
        return entry;
    }
    Editor.ListRemoveEntry = ListRemoveEntry;

    function ListMakeHead() {
        return null;
    }
    Editor.ListMakeHead = ListMakeHead;

    function ListMakeEntry(data) {
        return null;
    }
    Editor.ListMakeEntry = ListMakeEntry;

    var List = (function () {
        function List() {
        }
        List.prototype.add = function (data) {
            this.next = ListMakeEntry(data);
            return this.next;
        };

        List.prototype.popEntry = function (head) {
            return (ListRemoveEntry(this.next));
        };
        return List;
    })();

    var Line = (function () {
        function Line() {
        }
        return Line;
    })();
    Editor.Line = Line;
})(Editor || (Editor = {}));
