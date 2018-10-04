//// [listFailure.ts]
module Editor {

    export class Buffer {
    	lines: List<Line> = ListMakeHead<Line>();
        
        addLine(lineText: string): List<Line> {
            
            var line: Line = new Line();
            var lineEntry = this.lines.add(line);

            return lineEntry;
        }    
    }
    
    export function ListRemoveEntry<U>(entry: List<U>): List<U> { 
    	return entry;
    }

    export function ListMakeHead<U>(): List<U> {
		return null;
    }

    export function ListMakeEntry<U>(data: U): List<U> {
		return null;
    }    

    class List<T> { 
        public next: List<T>; 

        add(data: T): List<T> {
            this.next = ListMakeEntry(data);
            return this.next;
        }

        popEntry(head: List<T>): List<T> {
            return (ListRemoveEntry(this.next));
        }      
    }

	export class Line {}
}

//// [listFailure.js]
var Editor;
(function (Editor) {
    var Buffer = /** @class */ (function () {
        function Buffer() {
            this.lines = ListMakeHead();
        }
        Buffer.prototype.addLine = function (lineText) {
            var line = new Line();
            var lineEntry = this.lines.add(line);
            return lineEntry;
        };
        return Buffer;
    }());
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
    var List = /** @class */ (function () {
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
    }());
    var Line = /** @class */ (function () {
        function Line() {
        }
        return Line;
    }());
    Editor.Line = Line;
})(Editor || (Editor = {}));
