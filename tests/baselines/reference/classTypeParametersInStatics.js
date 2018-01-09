//// [classTypeParametersInStatics.ts]
module Editor {


    export class List<T> {
        public next: List<T>;
        public prev: List<T>;

        constructor(public isHead: boolean, public data: T) {
        
        }

        public static MakeHead(): List<T> { // should error
            var entry: List<T> = new List<T>(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }        

        public static MakeHead2<T>(): List<T> { // should not error
            var entry: List<T> = new List<T>(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }  

        public static MakeHead3<U>(): List<U> { // should not error
            var entry: List<U> = new List<U>(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }  
    }
}

//// [classTypeParametersInStatics.js]
var Editor;
(function (Editor) {
    var List = /** @class */ (function () {
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
        List.MakeHead2 = function () {
            var entry = new List(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        };
        List.MakeHead3 = function () {
            var entry = new List(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        };
        return List;
    }());
    Editor.List = List;
})(Editor || (Editor = {}));
