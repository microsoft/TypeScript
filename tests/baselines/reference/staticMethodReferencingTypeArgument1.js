//// [staticMethodReferencingTypeArgument1.ts]
module Editor {
    export class List<T> {
        next: List<T>;
        prev: List<T>;

        constructor(public isHead: boolean, public data: T) {
        }

        static MakeHead(): List<T> {
            var entry: List<T> = new List<T>(true, null); // can't access T here
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }
    }
}

//// [staticMethodReferencingTypeArgument1.js]
var Editor;
(function (Editor) {
    var List = /** @class */ (function () {
        function List(isHead, data) {
            this.isHead = isHead;
            this.data = data;
        }
        List.MakeHead = function () {
            var entry = new List(true, null); // can't access T here
            entry.prev = entry;
            entry.next = entry;
            return entry;
        };
        return List;
    }());
    Editor.List = List;
})(Editor || (Editor = {}));
