//// [tests/cases/compiler/staticMethodReferencingTypeArgument1.ts] ////

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
    class List {
        isHead;
        data;
        next;
        prev;
        constructor(isHead, data) {
            this.isHead = isHead;
            this.data = data;
        }
        static MakeHead() {
            var entry = new List(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }
    }
    Editor.List = List;
})(Editor || (Editor = {}));
