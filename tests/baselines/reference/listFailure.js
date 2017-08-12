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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
        __names(Buffer.prototype, ["addLine"]);
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
        __names(List.prototype, ["add", "popEntry"]);
        return List;
    }());
    var Line = (function () {
        function Line() {
        }
        return Line;
    }());
    Editor.Line = Line;
})(Editor || (Editor = {}));
